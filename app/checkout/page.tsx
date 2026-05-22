import { CheckIcon } from "lucide-react";

import { CheckoutForm } from "@/components/CheckoutForm";
import { CheckoutCountdown } from "@/components/checkout/checkout-countdown";
import { CheckoutSplash } from "@/components/checkout/checkout-splash";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBaseUrl } from "@/lib/env";
import { offer, discountLabel } from "@/lib/offer";
import { formatPrice, getCheckoutProduct } from "@/lib/stripe-product";
import { getStripePublishableKey } from "@/lib/stripe";

export async function generateMetadata() {
  const product = await getCheckoutProduct();
  return {
    title: "Checkout",
    description: `Purchase ${product.name}`,
  };
}

const includes = [
  "8-module video course — full A-to-Z system",
  "40-point inspection checklist",
  "Negotiation scripts (ready to use)",
  "Profit calculator spreadsheet",
  "UK sourcing & listing guides",
  "Lifetime updates included",
];

const trustSignals = [
  { icon: "↺", label: "30-day money-back guarantee" },
  { icon: "🔒", label: "Secure payment via Stripe" },
  { icon: "⚡", label: "Instant access after payment" },
];

export default async function CheckoutPage() {
  const product = await getCheckoutProduct();
  const publishableKey = getStripePublishableKey();
  const returnUrl = `${getBaseUrl()}/success`;

  const salePrice = formatPrice(product.amountCents, product.currency);
  const regularPrice = formatPrice(offer.regularPricePence, product.currency);
  const savings = Math.round((offer.regularPricePence - product.amountCents) / 100);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-50">
      <CheckoutSplash />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-start lg:gap-14 lg:py-16">

        {/* ── Left: order details ─────────────────────────── */}
        <aside className="space-y-5 lg:w-[42%] lg:sticky lg:top-8">

          {/* Breadcrumb */}
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Secure checkout
          </p>

          {/* Product + pricing */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-zinc-100">{product.name}</p>
                <p className="mt-0.5 text-xs text-zinc-500">Instant access · Lifetime updates</p>
              </div>
              <span className="shrink-0 rounded-md bg-[rgba(232,255,71,0.12)] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#e8ff47]">
                {discountLabel}
              </span>
            </div>

            <div className="flex items-end gap-2.5">
              <span className="text-xs text-zinc-600 line-through">{regularPrice}</span>
              <span className="font-syne text-3xl font-extrabold tracking-tight text-white">{salePrice}</span>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-[rgba(232,255,71,0.12)] bg-[rgba(232,255,71,0.06)] px-3 py-2">
              <span className="text-sm">🎉</span>
              <span className="text-xs text-[#e8ff47]">
                You&apos;re saving <strong> £{savings} </strong> with today&apos;s price
              </span>
            </div>
          </div>

          {/* Countdown */} 
          <CheckoutCountdown regularPrice={regularPrice} />

          {/* What's included */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
              What&apos;s included
            </p>
            <ul className="space-y-2.5">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-[#e8ff47]" />
                  <span className="text-xs leading-relaxed text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust signals */}
          <ul className="space-y-2">
            {trustSignals.map(({ icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-xs text-zinc-500">
                <span>{icon}</span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* ── Right: payment form ─────────────────────────── */}
        <div className="flex-1">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardHeader className="pb-4">
              <CardTitle className="font-syne text-lg text-zinc-50">Complete your order</CardTitle>
              <CardDescription className="text-zinc-400">
                One-time payment · No subscription · No hidden fees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CheckoutForm publishableKey={publishableKey} returnUrl={returnUrl} />
            </CardContent>
          </Card>

          <p className="mt-4 text-center text-xs text-zinc-600">
            By completing your purchase you agree to our{" "}
            <a href="/terms" className="underline underline-offset-2 hover:text-zinc-400 transition-colors">
              terms
            </a>{" "}
            and{" "}
            <a href="/refunds" className="underline underline-offset-2 hover:text-zinc-400 transition-colors">
              refund policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
