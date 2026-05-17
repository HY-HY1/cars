import { useState, useEffect } from "react";

function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  let diff = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
  const h = Math.floor(diff / 3600);
  diff %= 3600;
  const m = Math.floor(diff / 60);
  const s = diff % 60;
  return { h, m, s };
}

const pad = (n: number) => String(n).padStart(2, "0");

function Segment({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="min-w-[30px] text-center text-xl font-medium leading-none tabular-nums text-[#e8ff47]">
        {pad(value)}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-white/35">
        {label}
      </span>
    </div>
  );
}

export default function AnnouncementBar() {
  const [time, setTime] = useState(getTimeUntilMidnight());
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative flex flex-wrap items-center justify-center gap-5 border-b border-white/[0.06] bg-[#0a0a0a] px-12 py-2.5">

      {/* Message */}
      <div className="flex items-center gap-2.5">
        <span className="rounded bg-[#e8ff47] px-2 py-0.5 text-[11px] font-medium uppercase tracking-widest text-[#0a0a0a]">
          Sale
        </span>
        <span className="text-[15px] font-medium text-white/90">
          60% off — ends at midnight
        </span>
      </div>

      {/* Countdown */}
      <div className="flex items-center gap-2" aria-label="Time remaining">
        <Segment value={time.h} label="hrs" />
        <span className="mb-2.5 text-lg font-light text-white/30">:</span>
        <Segment value={time.m} label="min" />
        <span className="mb-2.5 text-lg font-light text-white/30">:</span>
        <Segment value={time.s} label="sec" />
      </div>

      {/* Dismiss */}
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded px-1.5 py-1 text-xl leading-none text-white/35 transition-colors hover:text-white/80"
      >
        ×
      </button>
    </div>
  );
}