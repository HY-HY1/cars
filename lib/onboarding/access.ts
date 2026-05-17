import "server-only";

import { normalizeEmail } from "@/lib/customers";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * Confirms the email has an active purchase.
 * Checks Supabase first (fast), then falls back to Stripe directly so users
 * aren't blocked when the webhook hasn't fired yet (race on the success page).
 * Activates the DB row if Stripe confirms payment, so future checks are instant.
 */
export async function checkOnboardingAccess(email: string): Promise<boolean> {
  if (!email) {
    console.error("[onboarding-access] no email provided");
    return false;
  }

  const admin = supabaseAdmin();
  const normalized = normalizeEmail(email);

  const { data: customer, error: dbError } = await admin
    .from("customers")
    .select("id, purchase_status, stripe_customer_id")
    .eq("email", normalized)
    .maybeSingle();

  console.error("[onboarding-access] email:", normalized);
  console.error("[onboarding-access] db error:", dbError?.message ?? "none");
  console.error("[onboarding-access] customer:", JSON.stringify(customer));

  // Fast path — DB already confirmed
  if (customer?.purchase_status === "active") return true;

  // Fallback — check Stripe directly (handles webhook delay + missing stripe_customer_id)
  const stripe = getStripe();

  // 1. By stripe_customer_id if we have it
  if (customer?.stripe_customer_id) {
    try {
      const list = await stripe.paymentIntents.list({
        customer: customer.stripe_customer_id,
        limit: 10,
      });
      if (list.data.some((pi) => pi.status === "succeeded")) {
        await admin
          .from("customers")
          .update({ purchase_status: "active" })
          .eq("id", customer.id);
        return true;
      }
    } catch (e) {
      console.error("[onboarding-access] stripe list error:", e);
    }
  }

  // 2. No stripe_customer_id in DB — search Stripe by email to find the customer,
  //    then check their payment intents. This covers cases where the customer row
  //    was created by OTP login before the checkout stored the Stripe ID.
  try {
    const customerSearch = await stripe.customers.search({
      query: `email:"${normalized}"`,
      limit: 5,
    });
    console.error("[onboarding-access] stripe customer search found:", customerSearch.data.length);

    for (const stripeCustomer of customerSearch.data) {
      const intents = await stripe.paymentIntents.list({
        customer: stripeCustomer.id,
        limit: 10,
      });
      console.error("[onboarding-access] intents for", stripeCustomer.id, ":", intents.data.map(pi => pi.status));

      if (intents.data.some((pi) => pi.status === "succeeded")) {
        // Backfill the missing stripe_customer_id and activate
        if (customer) {
          await admin
            .from("customers")
            .update({
              purchase_status: "active",
              stripe_customer_id: stripeCustomer.id,
            })
            .eq("id", customer.id);
        }
        return true;
      }
    }
  } catch (e) {
    console.error("[onboarding-access] stripe customer search error:", e);
  }

  console.error("[onboarding-access] all checks failed — blocking");
  return false;
}

export type OnboardingStatus = {
  completed: boolean;
  completedAt: string | null;
};

/** Returns whether the email has a completed onboarding row. */
export async function getOnboardingStatus(
  email: string,
): Promise<OnboardingStatus> {
  if (!email) return { completed: false, completedAt: null };
  const admin = supabaseAdmin();
  const { data } = await admin
    .from("onboarding")
    .select("completed_at")
    .eq("email", normalizeEmail(email))
    .not("completed_at", "is", null)
    .maybeSingle();
  return {
    completed: !!data,
    completedAt: data?.completed_at ?? null,
  };
}
