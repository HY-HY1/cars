"use client";

import { useState } from "react";

export function BillingPortalButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openPortal() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Could not open billing portal.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={openPortal}
        disabled={loading}
        className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
      >
        {loading ? "Opening…" : "Manage Billing →"}
      </button>
      {error && (
        <p className="mt-2 text-xs text-red-400">
          {error.includes("portal") || error.includes("configuration")
            ? "Billing portal not configured yet. Contact support."
            : error}
        </p>
      )}
    </div>
  );
}
