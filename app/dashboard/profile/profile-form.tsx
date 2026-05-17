"use client";

import { useActionState } from "react";

import { updateProfile } from "@/lib/profile/actions";

export function ProfileForm({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const [state, action, pending] = useActionState(updateProfile, {});

  return (
    <form action={action} className="space-y-5">
      {/* Full name */}
      <div>
        <label htmlFor="full_name" className="mb-1.5 block text-xs font-medium text-white/50">
          Full name
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          defaultValue={initialName}
          placeholder="e.g. James Wilson"
          className="w-full rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-[#e8ff47]/40 focus:bg-white/6"
        />
      </div>

      {/* Email — read-only */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/50">
          Email address
        </label>
        <div className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            readOnly
            className="w-full rounded-xl border border-white/6 bg-white/2 px-4 py-2.5 text-sm text-white/40 outline-none cursor-not-allowed"
          />
          <span className="shrink-0 rounded-lg border border-white/6 px-2.5 py-2 text-[10px] font-semibold uppercase tracking-wide text-white/25">
            Read only
          </span>
        </div>
        <p className="mt-1.5 text-[11px] text-white/25">
          Email is set by your login method and cannot be changed here.
        </p>
      </div>

      {/* Feedback */}
      {state.error && (
        <p className="text-xs text-red-400">{state.error}</p>
      )}
      {state.success && (
        <p className="text-xs text-emerald-400">Profile updated successfully.</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-white/8 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/12 hover:text-white disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
