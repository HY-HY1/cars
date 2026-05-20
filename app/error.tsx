"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-red-400">
        Something went wrong
      </p>
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white">
        Unexpected error
      </h1>
      <p className="mb-10 max-w-sm text-sm leading-relaxed text-zinc-400">
        An error occurred loading this page. Try again — if it keeps happening,
        contact support.
      </p>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="rounded-xl bg-[#e8ff47] px-6 py-3 text-sm font-bold text-black transition hover:brightness-110 active:scale-95"
        >
          Try again
        </button>
        <a
          href="/contact"
          className="rounded-xl border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200"
        >
          Contact support
        </a>
      </div>
      {error.digest ? (
        <p className="mt-8 font-mono text-[11px] text-zinc-700">
          Error ID: {error.digest}
        </p>
      ) : null}
    </div>
  );
}
