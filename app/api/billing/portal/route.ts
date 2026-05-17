import { NextResponse } from "next/server";

import { getBaseUrl } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { normalizeEmail } from "@/lib/customers";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = supabaseAdmin();
  const email = normalizeEmail(user.email ?? "");

  // Find stripe_customer_id — try auth_user_id first, fall back to email
  let stripeCustomerId: string | null = null;

  const { data: byUserId } = await admin
    .from("customers")
    .select("stripe_customer_id")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  stripeCustomerId = byUserId?.stripe_customer_id ?? null;

  if (!stripeCustomerId && email) {
    const { data: byEmail } = await admin
      .from("customers")
      .select("stripe_customer_id")
      .eq("email", email)
      .maybeSingle();
    stripeCustomerId = byEmail?.stripe_customer_id ?? null;
  }

  if (!stripeCustomerId) {
    return NextResponse.json(
      { error: "No billing account found for this user." },
      { status: 404 },
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${getBaseUrl()}/dashboard/billing`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to open billing portal";
    console.error("[billing-portal]", err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
