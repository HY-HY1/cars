"use client";

import { useEffect, useState } from "react";

type Phase = "in" | "out" | "done";

export function CheckoutSplash() {
  const [phase, setPhase] = useState<Phase>("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), 800);
    const t2 = setTimeout(() => setPhase("done"), 1150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 transition-all duration-300 ${
        phase === "out"
          ? "pointer-events-none scale-[1.015] opacity-0"
          : "scale-100 opacity-100"
      }`}
    >
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-72 w-72 rounded-full bg-[rgba(232,255,71,0.05)] blur-[100px]" />
      </div>

      <div className="relative flex flex-col items-center gap-6 text-center">
        {/* spinner */}
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-[2.5px] border-white/7" />
          <div
            className="absolute inset-0 animate-spin rounded-full border-[2.5px] border-transparent border-t-[#e8ff47]"
            style={{ animationDuration: "650ms" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-lg">
            🔒
          </div>
        </div>

        <div>
          <p className="font-syne text-base font-semibold text-white/80">
            Car Flipping Playbook
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8ff47]">
            Secure Checkout
          </p>
        </div>

        {/* pulsing dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1 w-1 animate-pulse rounded-full bg-zinc-600"
              style={{ animationDelay: `${i * 180}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
