import "server-only";

import type Stripe from "stripe";

import {
  getCustomerByEmail,
  getCustomerById,
  normalizeEmail,
} from "@/lib/customers";
import { sendPurchaseEmails } from "@/lib/email/send";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function activateCustomerPurchase(params: {
  customerId: string;
  stripeCustomerId: string | null;
  email: string | null;
}): Promise<{ emailAddress: string | null; alreadySentEmail: boolean }> {
  const admin = supabaseAdmin();
  const { customerId, stripeCustomerId, email } = params;

  let customer = await getCustomerById(customerId);

  // No customer row yet — create one (brand new guest who never touched the site)
  if (!customer && email) {
    const normalized = normalizeEmail(email);
    const { error } = await admin.from("customers").insert({
      email: normalized,
      stripe_customer_id: stripeCustomerId,
      purchase_status: "active",
    });
    if (error) throw new Error(`Failed to create fallback customer: ${error.message}`);
    return { emailAddress: normalized, alreadySentEmail: false };
  }

  if (!customer) {
    throw new Error(`Customer not found: ${customerId}`);
  }

  const alreadySentEmail = Boolean((customer as Record<string, unknown>).welcome_email_sent_at);

  // Always update activation fields — idempotent
  const { error: updateError } = await admin
    .from("customers")
    .update({
      purchase_status: "active",
      ...(stripeCustomerId ? { stripe_customer_id: stripeCustomerId } : {}),
      ...(email ? { email: normalizeEmail(email) } : {}),
    })
    .eq("id", customer.id);

  if (updateError) throw new Error(`Failed to update customer: ${updateError.message}`);

  return {
    emailAddress: email ?? customer.email,
    alreadySentEmail,
  };
}

export async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent,
) {
  const stripeCustomerId =
    typeof paymentIntent.customer === "string"
      ? paymentIntent.customer
      : (paymentIntent.customer?.id ?? null);

  const email = paymentIntent.receipt_email ?? null;

  let customerId: string | null =
    paymentIntent.metadata?.supabase_customer_id ?? null;

  if (!customerId && email) {
    const byEmail = await getCustomerByEmail(email);
    customerId = byEmail?.id ?? null;
  }

  if (!customerId) {
    throw new Error(
      "payment_intent.succeeded: missing supabase_customer_id and email fallback",
    );
  }

  const { emailAddress, alreadySentEmail } = await activateCustomerPurchase({
    customerId,
    stripeCustomerId,
    email,
  });

  if (alreadySentEmail) {
    console.log("[webhook] welcome emails already sent for", emailAddress, "— skipping");
    return;
  }

  if (!emailAddress) {
    console.error("[webhook] no email address — cannot send welcome emails");
    return;
  }

  try {
    await sendPurchaseEmails(emailAddress);

    // Mark emails as sent so retries don't resend
    const admin = supabaseAdmin();
    await admin
      .from("customers")
      .update({ welcome_email_sent_at: new Date().toISOString() } as Record<string, unknown>)
      .eq("email", normalizeEmail(emailAddress));

    console.log("[webhook] welcome emails sent to", emailAddress);
  } catch (err) {
    console.error("[webhook] email send failed:", err);
    // Don't throw — purchase is activated, email failure shouldn't fail the webhook
  }
}
