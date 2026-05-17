import { NextResponse } from "next/server";

import { getStripeWebhookSecret } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { handlePaymentIntentSucceeded } from "@/lib/stripe/webhook";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      getStripeWebhookSecret(),
    );
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        await handlePaymentIntentSucceeded(event.data.object);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error(`[stripe-webhook] handler error for ${event.type}`, err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
