"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  sendLoginOtp,
  signInWithPassword,
  verifyLoginOtp,
} from "@/lib/auth/actions";

type LoginFormProps = {
  defaultEmail?: string;
  nextPath?: string;
};

export function LoginForm({ defaultEmail = "", nextPath = "/dashboard" }: LoginFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [otpState, sendOtp, otpPending] = useActionState(sendLoginOtp, {});
  const [verifyState, verifyOtp, verifyPending] = useActionState(verifyLoginOtp, {});
  const [passwordState, signInPassword, passwordPending] = useActionState(
    signInWithPassword,
    {},
  );

  useEffect(() => {
    if (otpState.success) {
      setStep("otp");
    }
  }, [otpState.success]);

  const error = otpState.error ?? verifyState.error ?? passwordState.error;

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
          {step === "password" ? "Log in with password" : "Access your account"}
        </h1>
        <p className="text-sm text-zinc-400">
          {step === "email"
            ? "Already purchased? Enter the same email you used at checkout."
            : step === "otp"
              ? "Enter the 6-digit code we sent to your email."
              : "Use the password you set after your first OTP login."}
        </p>
      </div>

      {step === "email" ? (
        <form action={sendOtp} className="space-y-5">
          <input type="hidden" name="next" value={nextPath} />
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          {otpState.success ? (
            <p className="text-sm text-emerald-400">{otpState.success}</p>
          ) : null}

          <Button type="submit" size="lg" className="w-full" disabled={otpPending}>
            {otpPending ? "Sending code…" : "Send login code"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => setStep("password")}
          >
            I have a password
          </Button>
        </form>
      ) : null}

      {step === "otp" ? (
        <form action={verifyOtp} className="space-y-5">
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="next" value={nextPath} />
          <div className="space-y-2">
            <Label htmlFor="token">Verification code</Label>
            <Input
              id="token"
              name="token"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="123456"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <Button type="submit" size="lg" className="w-full" disabled={verifyPending}>
            {verifyPending ? "Verifying…" : "Verify and continue"}
          </Button>

          <Button type="button" variant="ghost" className="w-full" onClick={() => setStep("email")}>
            Use a different email
          </Button>
        </form>
      ) : null}

      {step === "password" ? (
        <form action={signInPassword} className="space-y-5">
          <input type="hidden" name="next" value={nextPath} />
          <div className="space-y-2">
            <Label htmlFor="pw-email">Email</Label>
            <Input
              id="pw-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required minLength={8} />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <Button type="submit" size="lg" className="w-full" disabled={passwordPending}>
            {passwordPending ? "Logging in…" : "Log in"}
          </Button>

          <Button type="button" variant="ghost" className="w-full" onClick={() => setStep("email")}>
            Use email code instead
          </Button>
        </form>
      ) : null}

      <p className="text-center text-sm text-zinc-500 sm:text-left">
        <Link href="/checkout" className="text-zinc-300 underline-offset-4 hover:underline">
          Back to checkout
        </Link>
      </p>
    </div>
  );
}
