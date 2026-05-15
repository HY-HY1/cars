"use client";

import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type PaymentStepProps = {
  returnUrl: string;
  name: string;
  email: string;
  onBack: () => void;
};

export function PaymentStep({ returnUrl, name, email, onBack }: PaymentStepProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
        payment_method_data: {
          billing_details: {
            name,
            email,
          },
        },
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message ?? "Payment failed. Please try again.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <LinkAuthenticationElement options={{ defaultValues: { email } }} />

      <Separator />

      <section className="space-y-3">
        <h3 className="text-sm font-medium text-zinc-300">Payment method</h3>
        <PaymentElement
          options={{
            layout: "tabs",
            fields: {
              billingDetails: {
                name: "never",
                email: "never",
              },
            },
          }}
        />
      </section>

      <Separator />

      <section className="space-y-3">
        <h3 className="text-sm font-medium text-zinc-300">Billing address</h3>
        <AddressElement
          options={{
            mode: "billing",
            defaultValues: { name },
          }}
        />
      </section>

      {message ? (
        <p className="text-sm text-red-400" role="alert">
          {message}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            Processing…
          </>
        ) : (
          "Complete purchase"
        )}
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="w-full"
        disabled={isLoading}
        onClick={onBack}
      >
        Back to details
      </Button>
    </form>
  );
}
