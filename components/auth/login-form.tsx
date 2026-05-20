"use client";

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
  const [showCodeEntry, setShowCodeEntry] = useState(false);
  const [otpState, sendOtp, otpPending] = useActionState(sendLoginOtp, {});
  const [verifyState, verifyOtp, verifyPending] = useActionState(verifyLoginOtp, {});
  const [passwordState, signInPassword, passwordPending] = useActionState(
    signInWithPassword,
    {},
  );

  useEffect(() => {
    if (otpState.success) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep("otp");
      setShowCodeEntry(false);
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
              ? "We've sent you a sign-in link — just click it."
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
            {otpPending ? "Sending link…" : "Send sign-in link"}
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
        <div className="space-y-5">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-5 space-y-1">
            <p className="text-sm font-medium text-zinc-100">Check your inbox</p>
            <p className="text-sm text-zinc-400">
              We sent a sign-in link to <span className="text-zinc-200">{email}</span>. Click it to
              access your account — no code needed.
            </p>
          </div>

          {!showCodeEntry ? (
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setShowCodeEntry(true)}
            >
              Enter code instead
            </Button>
          ) : (
            <form action={verifyOtp} className="space-y-4">
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="next" value={nextPath} />
              <div className="space-y-2">
                <Label htmlFor="token">6-digit code</Label>
                <Input
                  id="token"
                  name="token"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="123456"
                  autoFocus
                />
              </div>

              {error ? <p className="text-sm text-red-400">{error}</p> : null}

              <Button type="submit" size="lg" className="w-full" disabled={verifyPending}>
                {verifyPending ? "Verifying…" : "Verify code"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setShowCodeEntry(false)}
              >
                Back
              </Button>
            </form>
          )}

          <Button type="button" variant="ghost" className="w-full" onClick={() => setStep("email")}>
            Use a different email
          </Button>
        </div>
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
            Use sign-in link instead
          </Button>
        </form>
      ) : null}

      {/* <p className="text-center text-sm text-zinc-500 sm:text-left">
        <Link href="/checkout" className="text-zinc-300 underline-offset-4 hover:underline">
          Back to checkout
        </Link>
      </p> */}
    </div>
  );
}
