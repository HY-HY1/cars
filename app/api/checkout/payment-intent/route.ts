import { NextResponse } from "next/server";

import { getCheckoutProduct } from "@/lib/stripe-product";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      name?: string;
    };

    const email = body.email?.trim();
    const name = body.name?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const product = await getCheckoutProduct();
    const stripe = getStripe();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.amountCents,
      currency: product.currency,
      automatic_payment_methods: { enabled: true },
      receipt_email: email,
      description: product.name,
      metadata: {
        stripe_product_id: product.stripeProductId,
        stripe_price_id: product.stripePriceId,
        customer_name: name,
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
    console.error("[payment-intent]", err);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 },
    );
  }
}
