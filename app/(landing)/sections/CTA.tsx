const reassurance = [
  "🔒 Secure checkout",
  "⚡ Instant access",
  "↺ 30-day guarantee",
  "📦 Lifetime updates",
];

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] mt-20 px-6 py-36 text-center">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(232,255,71,0.06)] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e8ff47]">
          Limited time offer
        </p>

        <h2 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
          Ready to flip your{" "}
          <span className="text-[#e8ff47]">first car?</span>
        </h2>

        <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/50">
          Join the students already making £800+ per flip. Get the complete system today — 60% off the regular price.
        </p>

        <a
          href="/product"
          className="inline-block rounded-xl bg-[#e8ff47] px-10 py-4 text-base font-bold text-[#0a0a0a] shadow-[0_0_40px_rgba(232,255,71,0.25)] transition-all hover:brightness-110 hover:shadow-[0_0_60px_rgba(232,255,71,0.4)] active:scale-95"
        >
          Get Instant Access — 60% Off Today
        </a>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs text-white/30">
          {reassurance.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
