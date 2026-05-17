"use client"

import { StatCard } from "./statCard"
import { FlipCard } from "./flipCard"
import { flips, reassuranceItems } from "./data"

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 pt-24 pb-20 text-center">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[rgba(232,255,71,0.04)] blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[rgba(232,255,71,0.02)] blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating car — left */}
      <div
        className="pointer-events-none absolute hidden lg:block"
        style={{
          left: "-120px",
          top: "50%",
          transform: "translateY(-50%) rotate(-12deg)",
        }}
      >
        <img
          src="/120d/after.JPG"
          alt=""
          className="w-[340px] opacity-[0.13] rounded-xl cursor-pointer mix-blend-luminosity"
          style={{ filter: "grayscale(30%)" }}
        />
      </div>

      {/* Floating car — right */}
      <div
        className="pointer-events-none absolute hidden scale-100 lg:block"
        style={{
          right: "-120px",
          top: "50%",
          transform: "translateY(-50%) rotate(12deg)",
        }}
      >
        <img
          src="/120d/before.jpg"
          alt=""
          className="w-[340px] opacity-[0.13] rounded-xl mix-blend-luminosity"
          style={{ filter: "grayscale(30%)", transform: "scaleX(-1)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(232,255,71,0.2)] bg-[rgba(232,255,71,0.06)] px-4 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#e8ff47]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#e8ff47]">
            £23,000+ flipped by students in 2024
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-7xl">
          Turn{" "}
          <span className="relative inline-block text-[#e8ff47]">
            Used Cars
            <svg
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 300 8"
              fill="none"
            >
              <path
                d="M0 6 Q75 1 150 5 Q225 9 300 4"
                stroke="#e8ff47"
                strokeWidth="2.5"
                opacity="0.5"
              />
            </svg>
          </span>{" "}
          Into a <span className="text-[#e8ff47]">£2,000–£5,000</span>
          <br />Side Income — Every Month
        </h1>

        {/* Subtext */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/55 md:text-xl">
          A beginner-friendly system for sourcing undervalued cars, negotiating
          the price down, and reselling for profit —{" "}
          <strong className="font-semibold text-white/80">
            no dealership, no huge capital, no experience needed.
          </strong>
        </p>

        {/* CTA */}
        <div className="mb-14 flex flex-col items-center gap-3 sm:flex-col sm:justify-center">
          <button className="group relative overflow-hidden rounded-xl bg-[#e8ff47] px-8 py-4 text-base font-bold text-[#0a0a0a] shadow-[0_0_40px_rgba(232,255,71,0.25)] transition-all hover:brightness-110 hover:shadow-[0_0_60px_rgba(232,255,71,0.4)] active:scale-95 border-none cursor-pointer">
            Start Flipping Cars — 60% Off Today
          </button>
          <p className="text-xs text-white/35">
            🔒 Secure checkout · Instant access · 30-day guarantee
          </p>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard value="£23k+" label="Total profit flipped" sub="by our students" />
          <StatCard value="29+" label="Cars resold" sub="across the UK" />
          <StatCard value="14" label="Students enrolled" sub="since launch" />
          <StatCard value="£800" label="Avg. profit per flip" sub="student average" />
        </div>

        {/* Flips */}
        <div className="text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
            Recent student flips
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {flips.map((f) => (
              <FlipCard key={f.car} {...f} />
            ))}
          </div>
        </div>

        {/* Reassurance */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-white/35">
          {reassuranceItems.map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="text-[#e8ff47]">✓</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}