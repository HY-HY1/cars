import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCheckoutProduct } from "@/lib/stripe-product";
import { getStripe } from "@/lib/stripe";

type SuccessPageProps = {
  searchParams: Promise<{ payment_intent?: string; redirect_status?: string }>;
};

export const metadata = {
  title: "Order confirmed",
  description: "Your purchase was successful",
};

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const product = await getCheckoutProduct();
  const params = await searchParams;
  const paymentIntentId = params.payment_intent;
  const redirectStatus = params.redirect_status;

  let status: "succeeded" | "processing" | "failed" | "unknown" = "unknown";

  if (paymentIntentId && redirectStatus === "succeeded") {
    try {
      const stripe = getStripe();
      const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (intent.status === "succeeded") status = "succeeded";
      else if (intent.status === "processing") status = "processing";
      else if (intent.status === "requires_payment_method") status = "failed";
    } catch {
      status = redirectStatus === "succeeded" ? "succeeded" : "unknown";
    }
  } else if (redirectStatus === "failed") {
    status = "failed";
  }

  const titles: Record<typeof status, string> = {
    succeeded: "You're in",
    processing: "Payment processing",
    failed: "Payment incomplete",
    unknown: "Thanks for your order",
  };

  const descriptions: Record<typeof status, string> = {
    succeeded: `Your ${product.name} is confirmed. Check your inbox for access details.`,
    processing:
      "Your payment is still processing. We'll email you when it's complete.",
    failed: "Your payment did not go through. You can try again from checkout.",
    unknown: "If you completed payment, you'll receive a confirmation email shortly.",
  };

  return (
    <div className="flex min-h-full items-center justify-center bg-zinc-950 px-6 py-16">
      <Card className="w-full max-w-lg border-zinc-800">
        <CardHeader className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            {status === "succeeded" ? "Order confirmed" : "Checkout"}
          </p>
          <CardTitle className="mt-2 text-2xl">{titles[status]}</CardTitle>
          <CardDescription className="text-base">{descriptions[status]}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          {status === "failed" ? (
            <Button asChild size="lg">
              <Link href="/checkout">Try again</Link>
            </Button>
          ) : (
            <Button asChild size="lg">
              <Link href="/">Back to home</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
