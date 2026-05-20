"use client";

import { useEffect, useState } from "react";

function getSecondsUntilMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CheckoutCountdown({ regularPrice }: { regularPrice: string }) {
  const [secs, setSecs] = useState(getSecondsUntilMidnight);

  useEffect(() => {
    const id = setInterval(() => setSecs(getSecondsUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-[rgba(232,255,71,0.2)] bg-[rgba(232,255,71,0.05)] px-3.5 py-2.5">
      <span className="text-sm">⏳</span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#e8ff47]/70">
          Sale ends tonight
        </p>
        <p className="text-xs text-white/50">
          Price returns to{" "}
          <span className="font-medium text-white/70">{regularPrice}</span> in{" "}
          <span className="font-mono font-semibold text-white/90">
            {pad(h)}h {pad(m)}m {pad(s)}s
          </span>
        </p>
      </div>
    </div>
  );
}
