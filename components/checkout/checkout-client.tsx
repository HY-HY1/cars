"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useMemo, useState } from "react";

import { CustomerDetailsForm } from "@/components/checkout/customer-details-form";
import { PaymentStep } from "@/components/checkout/payment-step";
import { stripeAppearance } from "@/lib/stripe-appearance";

type CheckoutClientProps = {
  publishableKey: string;
  returnUrl: string;
};

export function CheckoutClient({ publishableKey, returnUrl }: CheckoutClientProps) {
  const stripePromise = useMemo(
    () => loadStripe(publishableKey),
    [publishableKey],
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const createPaymentIntent = useCallback(
    async (details: { email: string; name: string }) => {
      const res = await fetch("/api/checkout/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = (await res.json()) as { clientSecret?: string; error?: string };

      if (!res.ok || !data.clientSecret) {
        throw new Error(data.error ?? "Failed to initialize payment");
      }

      return data.clientSecret;
    },
    [],
  );

  async function handleDetailsSubmit(details: { email: string; name: string }) {
    setName(details.name);
    setEmail(details.email);
    const secret = await createPaymentIntent(details);
    setClientSecret(secret);
  }

  if (!clientSecret) {
    return <CustomerDetailsForm onSubmit={handleDetailsSubmit} />;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: stripeAppearance,
      }}
    >
      <PaymentStep
        returnUrl={returnUrl}
        name={name}
        email={email}
        onBack={() => setClientSecret(null)}
      />
    </Elements>
  );
}
