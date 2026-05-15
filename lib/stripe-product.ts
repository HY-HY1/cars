import "server-only";

import { cache } from "react";
import type Stripe from "stripe";

import { getStripe } from "@/lib/stripe";

/** Stripe Product to sell at checkout. Override with STRIPE_PRODUCT_ID in env. */
export const STRIPE_PRODUCT_ID =
  process.env.STRIPE_PRODUCT_ID ?? "prod_UWRP1PJKTRpiXa";

export type CheckoutProduct = {
  stripeProductId: string;
  stripePriceId: string;
  name: string;
  description: string | null;
  amountCents: number;
  currency: string;
};

async function resolvePrice(
  stripe: Stripe,
  product: Stripe.Product,
): Promise<Stripe.Price> {
  if (product.default_price) {
    if (typeof product.default_price === "string") {
      return stripe.prices.retrieve(product.default_price);
    }
    return product.default_price;
  }

  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
    limit: 1,
  });

  const price = prices.data[0];
  if (!price) {
    throw new Error(
      `No active price found for Stripe product ${product.id}. Add a one-time price in the Stripe Dashboard.`,
    );
  }

  return price;
}

export const getCheckoutProduct = cache(async (): Promise<CheckoutProduct> => {
  const stripe = getStripe();

  const product = await stripe.products.retrieve(STRIPE_PRODUCT_ID, {
    expand: ["default_price"],
  });

  const price = await resolvePrice(stripe, product);

  if (price.type !== "one_time") {
    throw new Error(
      `Price ${price.id} is recurring. This checkout only supports one-time prices.`,
    );
  }

  if (price.unit_amount == null) {
    throw new Error(
      `Price ${price.id} has no fixed unit amount. Use a standard one-time price.`,
    );
  }

  return {
    stripeProductId: product.id,
    stripePriceId: price.id,
    name: product.name,
    description: product.description,
    amountCents: price.unit_amount,
    currency: price.currency,
  };
});

export function formatPrice(amountCents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);
}
