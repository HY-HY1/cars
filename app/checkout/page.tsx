import { CheckoutForm } from "@/components/CheckoutForm";
import { CheckoutSplash } from "@/components/checkout/checkout-splash";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBaseUrl } from "@/lib/env";
import { formatPrice, getCheckoutProduct } from "@/lib/stripe-product";
import { getStripePublishableKey } from "@/lib/stripe";
import ProductCard, { OrderSummary } from "../(landing)/sections/ProductCard";

export async function generateMetadata() {
  const product = await getCheckoutProduct();
  return {
    title: "Checkout",
    description: `Purchase ${product.name}`,
  };
}

export default async function CheckoutPage() {
  const product = await getCheckoutProduct();
  const publishableKey = getStripePublishableKey();
  const returnUrl = `${getBaseUrl()}/checkout/success?payment_intent={PAYMENT_INTENT_ID}`;

  return (
    <div className="min-h-full bg-zinc-950 text-zinc-50 max-w-5xl m-auto">
      <CheckoutSplash />
      <div>
        <OrderSummary savings={100} comparePrice="100" price="19.99"/>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12 lg:flex-row lg:gap-16 lg:py-16">
        
        <aside className="lg:w-[42%] lg:pt-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Guest checkout
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            {product.name}
          </h1>
          {product.description ? (
            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
              {product.description}
            </p>
          ) : null}

          <dl className="mt-10 space-y-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-zinc-400">Subtotal</dt>
              <dd className="text-sm font-medium text-zinc-200">
                {formatPrice(product.amountCents, product.currency)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-sm text-zinc-400">Delivery</dt>
              <dd className="text-sm font-medium text-zinc-200">Instant digital access</dd>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <dt className="text-base font-medium text-zinc-200">Total due today</dt>
              <dd className="text-xl font-semibold tracking-tight text-zinc-50">
                {formatPrice(product.amountCents, product.currency)}
              </dd>
            </div>
          </dl>
        </aside>

        <Card className="flex-1 border-zinc-800 bg-zinc-950">
          <CardHeader>
            <CardTitle className="text-xl">Checkout</CardTitle>
            <CardDescription>
              Enter your email, then pay with card or wallet — all on this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CheckoutForm publishableKey={publishableKey} returnUrl={returnUrl} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
