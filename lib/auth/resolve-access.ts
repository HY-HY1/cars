import "server-only";

import type { Customer } from "@/types/database";
import { isDevBypass } from "@/lib/dev";
import { normalizeEmail } from "@/lib/customers";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export type AccessSource =
  | "supabase_auth_id"
  | "supabase_email"
  | "stripe_customer"
  | "stripe_email"
  | "none";

export type AccessResult = {
  hasAccess: boolean;
  source: AccessSource;
  customer: Customer | null;
};

export async function resolveAccess(
  userId: string,
  email: string,
): Promise<AccessResult> {
  if (isDevBypass()) {
    return { hasAccess: true, source: "none", customer: null };
  }

  const admin = supabaseAdmin();
  const normalized = normalizeEmail(email);

  // ── 1. Supabase by auth_user_id (fast path) ──────────────
  const { data: byAuthId } = await admin
    .from("customers")
    .select("*")
    .eq("auth_user_id", userId)
    .maybeSingle();

  if (byAuthId?.purchase_status === "active") {
    return { hasAccess: true, source: "supabase_auth_id", customer: byAuthId };
  }

  // ── 2. Supabase by email ──────────────────────────────────
  let customer: Customer | null = byAuthId;

  if (!customer) {
    const { data: byEmail } = await admin
      .from("customers")
      .select("*")
      .eq("email", normalized)
      .maybeSingle();

    if (byEmail) {
      customer = byEmail;
      // Auto-link auth user if not yet linked
      if (!byEmail.auth_user_id) {
        await admin
          .from("customers")
          .update({ auth_user_id: userId, has_account: true })
          .eq("id", byEmail.id);
        customer = { ...byEmail, auth_user_id: userId, has_account: true };
      }
    }
  }

  if (customer?.purchase_status === "active") {
    return { hasAccess: true, source: "supabase_email", customer };
  }

  // ── 3. Stripe verification ────────────────────────────────
  const stripe = getStripe();

  // 3a. Check by stripe_customer_id
  if (customer?.stripe_customer_id) {
    const { data: paymentIntents } = await stripe.paymentIntents.list({
      customer: customer.stripe_customer_id,
      limit: 10,
    });

    const succeeded = paymentIntents.some((pi) => pi.status === "succeeded");

    if (succeeded) {
      await admin
        .from("customers")
        .update({ purchase_status: "active" })
        .eq("id", customer.id);
      customer = { ...customer, purchase_status: "active" };
      return { hasAccess: true, source: "stripe_customer", customer };
    }
  }

  // 3b. Search Stripe by receipt_email
  try {
    const results = await stripe.paymentIntents.search({
      query: `receipt_email:"${normalized}" AND status:"succeeded"`,
      limit: 1,
    });

    if (results.data.length > 0) {
      const pi = results.data[0];
      const stripeCustomerId =
        typeof pi.customer === "string"
          ? pi.customer
          : (pi.customer?.id ?? null);

      if (customer) {
        await admin
          .from("customers")
          .update({
            purchase_status: "active",
            ...(stripeCustomerId ? { stripe_customer_id: stripeCustomerId } : {}),
          })
          .eq("id", customer.id);
        customer = {
          ...customer,
          purchase_status: "active",
          stripe_customer_id: stripeCustomerId ?? customer.stripe_customer_id,
        };
      } else {
        const { data: created } = await admin
          .from("customers")
          .insert({
            email: normalized,
            auth_user_id: userId,
            has_account: true,
            purchase_status: "active",
            ...(stripeCustomerId ? { stripe_customer_id: stripeCustomerId } : {}),
          })
          .select()
          .single();
        customer = created;
      }

      return { hasAccess: true, source: "stripe_email", customer };
    }
  } catch {
    // paymentIntents.search requires Stripe account with search enabled — gracefully skip
  }

  return { hasAccess: false, source: "none", customer };
}
