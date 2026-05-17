"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/lib/profile/actions";

export function ResetPasswordButton() {
  const [state, action, pending] = useActionState(requestPasswordReset, {});

  if (state.success) {
    return (
      <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">
        Reset link sent — check your inbox.
      </p>
    );
  }

  return (
    <div>
      <form action={action}>
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl border border-white/8 px-5 py-2 text-sm font-medium text-white/60 transition hover:border-white/15 hover:text-white/90 disabled:opacity-50"
        >
          {pending ? "Sending…" : "Send password reset email"}
        </button>
      </form>
      {state.error && (
        <p className="mt-2 text-xs text-red-400">{state.error}</p>
      )}
    </div>
  );
}
