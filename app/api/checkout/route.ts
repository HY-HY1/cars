import { NextResponse } from "next/server";

import { getOrCreateCustomerByEmail, normalizeEmail } from "@/lib/customers";
import { getCheckoutProduct } from "@/lib/stripe-product";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email ? normalizeEmail(body.email) : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const customer = await getOrCreateCustomerByEmail(email);

    if (!customer.stripe_customer_id) {
      return NextResponse.json(
        { error: "Stripe customer not ready. Please try again." },
        { status: 500 },
      );
    }

    const product = await getCheckoutProduct();
    const stripe = getStripe();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.amountCents,
      currency: product.currency,
      customer: customer.stripe_customer_id,
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
      description: product.name,
      metadata: {
        supabase_customer_id: customer.id,
        stripe_product_id: product.stripeProductId,
        stripe_price_id: product.stripePriceId,
      },
    });

    if (!paymentIntent.client_secret) {
      return NextResponse.json(
        { error: "Failed to initialize payment" },
        { status: 500 },
      );
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("[checkout]", err);
    const message = err instanceof Error ? err.message : "Checkout failed";
    const isDev = process.env.NODE_ENV === "development";
    const hint =
      message.includes("customers") && message.includes("schema cache")
        ? "Run supabase/migrations/20260515100000_customers.sql in the Supabase SQL Editor."
        : undefined;

    return NextResponse.json(
      {
        error: isDev ? message : "Unable to start checkout. Please try again.",
        ...(isDev && hint ? { hint } : {}),
      },
      { status: 500 },
    );
  }
}
