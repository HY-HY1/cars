import Link from "next/link";

import { Confetti } from "@/components/ui/confetti";
import { getCheckoutProduct } from "@/lib/stripe-product";
import { getStripe } from "@/lib/stripe";

type SuccessPageProps = {
  searchParams: Promise<{
    payment_intent?: string;
    redirect_status?: string;
  }>;
};

export const metadata = {
  title: "Order confirmed",
};

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const product = await getCheckoutProduct();
  const params = await searchParams;
  const paymentIntentId = params.payment_intent;
  const redirectStatus = params.redirect_status;

  let status: "succeeded" | "processing" | "failed" | "unknown" = "unknown";
  let customerEmail: string | null = null;

  if (paymentIntentId) {
    try {
      const stripe = getStripe();
      const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
      customerEmail = intent.receipt_email ?? null;

      if (redirectStatus === "succeeded" || intent.status === "succeeded") {
        status = "succeeded";
      } else if (intent.status === "processing") {
        status = "processing";
      } else if (
        intent.status === "requires_payment_method" ||
        redirectStatus === "failed"
      ) {
        status = "failed";
      }
    } catch {
      status = redirectStatus === "succeeded" ? "succeeded" : "unknown";
    }
  }

  const onboardingHref = customerEmail
    ? `/onboarding?email=${encodeURIComponent(customerEmail)}`
    : "/onboarding";

  const loginHref = customerEmail
    ? `/login?email=${encodeURIComponent(customerEmail)}&next=/dashboard`
    : "/login?next=/dashboard";

  if (status === "failed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-16 text-zinc-50">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <p className="text-4xl mb-4">✗</p>
          <h1 className="text-2xl font-semibold mb-2">Payment incomplete</h1>
          <p className="text-zinc-400 mb-6 text-sm">Your payment did not go through. You can try again from checkout.</p>
          <Link href="/checkout" className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90">
            Try again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 py-16 text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {status === "succeeded" && <Confetti />}

      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[600px] rounded-full bg-[rgba(232,255,71,0.05)] blur-[120px]" />
      </div>

      <div className="relative w-full max-w-lg space-y-6 text-center">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(232,255,71,0.3)] bg-[rgba(232,255,71,0.08)] text-3xl">
          {status === "succeeded" ? "🎉" : status === "processing" ? "⏳" : "✓"}
        </div>

        {/* Heading */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e8ff47]">
            {status === "succeeded" ? "Purchase confirmed" : "Checkout"}
          </p>
          <h1 className="font-syne mt-2 text-3xl font-extrabold text-white md:text-4xl">
            {status === "succeeded" && "You're in. Welcome!"}
            {status === "processing" && "Payment processing…"}
            {status === "unknown"    && "Thanks for your order"}
          </h1>
          <p className="mt-3 text-base text-white/50">
            {status === "succeeded" &&
              `${product.name} is yours. Check your inbox for access details.`}
            {status === "processing" &&
              "Your payment is still processing. We'll email you when it's complete."}
            {status === "unknown" &&
              "If you completed payment, you'll receive a confirmation email shortly."}
          </p>
        </div>

        {status === "succeeded" && (
          <>
            {/* Onboarding CTA */}
            <div className="rounded-2xl border border-[rgba(232,255,71,0.15)] bg-[rgba(232,255,71,0.05)] p-6 text-left">
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-[rgba(232,255,71,0.12)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#e8ff47]">
                  Step 2
                </span>
                <span className="text-xs text-white/40">Takes ~60 seconds</span>
              </div>
              <h2 className="font-syne mb-1 text-lg font-bold text-white">
                Tell us about yourself
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-white/50">
                Answer a few quick questions so we can send you personalised
                tips, car suggestions, and strategies matched to your goals
                and budget.
              </p>
              <Link
                href={onboardingHref}
                className="inline-block rounded-xl bg-[#e8ff47] px-8 py-3 text-sm font-bold text-[#0a0a0a] transition hover:brightness-110 active:scale-95"
              >
                Personalise my experience →
              </Link>
            </div>

            {/* Secondary actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={loginHref}
                className="rounded-xl border border-white/10 bg-white/4 px-6 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/7 hover:text-white"
              >
                Create account / Log in
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-white/10 bg-white/4 px-6 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/7 hover:text-white"
              >
                Back to home
              </Link>
            </div>
          </>
        )}

        {status !== "succeeded" && (
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href={loginHref} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
              Create account / Log in
            </Link>
            <Link href="/" className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium transition hover:bg-muted">
              Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
