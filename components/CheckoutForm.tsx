"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { PaymentStep } from "@/components/checkout/payment-step";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { stripeAppearance } from "@/lib/stripe-appearance";

type CheckoutFormProps = {
  publishableKey: string;
  returnUrl: string;
};

export function CheckoutForm({ publishableKey, returnUrl }: CheckoutFormProps) {
  const stripePromise = useMemo(
    () => loadStripe(publishableKey),
    [publishableKey],
  );

  const [email, setEmail] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = (await res.json()) as {
        clientSecret?: string;
        error?: string;
        hint?: string;
      };

      if (!res.ok || !data.clientSecret) {
        const msg = [data.error, data.hint].filter(Boolean).join(" ");
        throw new Error(msg || "Checkout failed");
      }

      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setIsLoading(false);
    }
  }

  if (!clientSecret) {
    return (
      <form onSubmit={handleEmailSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="checkout-email">Email</Label>
          <Input
            id="checkout-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="text-xs text-zinc-500">
            No account needed. Payment is completed securely on this page.
          </p>
        </div>

        {error ? (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Preparing payment…
            </>
          ) : (
            "Continue to payment"
          )}
        </Button>
      </form>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: stripeAppearance,
        fonts: [
          {
            cssSrc:
              "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap",
          },
        ],
      }}
    >
      <PaymentStep
        email={email.trim()}
        returnUrl={returnUrl}
        onBack={() => {
          setClientSecret(null);
          setError(null);
        }}
      />
    </Elements>
  );
}
