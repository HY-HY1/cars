import Image from "next/image";
import Link from "next/link";

import { getCheckoutProduct, formatPrice } from "@/lib/stripe-product";

export async function generateMetadata() {
  const product = await getCheckoutProduct();
  return {
    title: `${product.name} — Car Flipping Playbook`,
    description:
      "The complete beginner system for sourcing undervalued cars and reselling for profit in the UK market.",
  };
}

// ── Static content ─────────────────────────────────────────

const includes = [
  {
    icon: "🎬",
    title: "Core Training Modules (8 Lessons)",
    desc: "Step-by-step walkthrough of sourcing, evaluating, negotiating, purchasing, and reselling used cars in the UK.",
    tag: "Core",
    tagColor: "bg-[rgba(232,255,71,0.1)] text-[#e8ff47]",
  },
  {
    icon: "📋",
    title: "Inspection Checklist (40+ Points)",
    desc: "Structured checklist covering mechanical, cosmetic, and documentation checks before purchase.",
    tag: "Included",
    tagColor: "bg-[rgba(29,158,117,0.12)] text-[#1D9E75]",
  },
  {
    icon: "💬",
    title: "Negotiation Frameworks",
    desc: "Pre-written scripts and structures to help communicate and negotiate pricing with sellers.",
    tag: "Included",
    tagColor: "bg-[rgba(83,74,183,0.12)] text-[#7b74e8]",
  },
  {
    icon: "📊",
    title: "Profit Estimation Framework",
    desc: "Simple method for estimating purchase cost, resale value, and potential margin before committing.",
    tag: "Included",
    tagColor: "bg-[rgba(186,117,23,0.12)] text-[#BA7517]",
  },
  {
    icon: "📍",
    title: "Sourcing Overview (UK Market)",
    desc: "Where used cars are commonly found and how to filter listings effectively.",
    tag: "Included",
    tagColor: "bg-[rgba(232,255,71,0.1)] text-[#e8ff47]",
  },
  {
    icon: "🧾",
    title: "Listing Templates",
    desc: "Structured templates for writing clear, effective resale listings.",
    tag: "Included",
    tagColor: "bg-[rgba(29,158,117,0.12)] text-[#1D9E75]",
  },
];

const steps = [
  {
    n: "01",
    title: "Find potential vehicles",
    desc: "Search UK marketplaces and identify cars that may be undervalued relative to market pricing.",
  },
  {
    n: "02",
    title: "Evaluate and negotiate",
    desc: "Use the inspection checklist and negotiation frameworks to assess condition and agree purchase price.",
  },
  {
    n: "03",
    title: "Resell the vehicle",
    desc: "List the car using structured templates designed to improve clarity and buyer response.",
  },
];

const faqs = [
  {
    q: "Is this suitable for beginners?",
    a: "Yes. The system is designed to guide someone from zero understanding to completing their first deal step-by-step.",
  },
  {
    q: "How much starting capital is needed?",
    a: "Typically £1,000–£3,000 depending on the type of vehicle targeted.",
  },
  {
    q: "Do you guarantee profit?",
    a: "No. This is an educational product focused on process and decision-making, not guaranteed outcomes.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. A 30-day money-back guarantee is included if you're not satisfied.",
  },
];

// ── Page ───────────────────────────────────────────────────

export default async function ProductPage() {
  const product = await getCheckoutProduct();
  const price = formatPrice(product.amountCents, product.currency);
  const comparePrice = formatPrice(19700, product.currency);
  const savings = Math.round((19700 - product.amountCents) / 100);

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <div className="border-b border-white/[0.06] bg-[#0d0d0d]">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-xs text-white/35">
          <Link href="/" className="transition hover:text-white/70">Home</Link>
          <span>/</span>
          <span className="text-white/60">Car Flipping Playbook</span>
        </div>
      </div>

      {/* ── Main two-column ─────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:flex lg:items-start lg:gap-14">

        {/* ── LEFT: content ─────────────────────────────────── */}
        <div className="min-w-0 flex-1 space-y-12">

          {/* Product header */}
          <div className="border-b border-white/[0.06] pb-10">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[rgba(232,255,71,0.1)] px-3 py-1 text-xs font-bold tracking-wide text-[#e8ff47]">
                60% OFF
              </span>
              <span className="text-xs text-white/35">Limited time · One-time payment</span>
            </div>

            <h1 className="font-syne mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl xl:text-5xl">
              The Complete Car Flipping System
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-white/55">
              A beginner-friendly playbook for finding undervalued cars, negotiating
              the price down, and reselling for profit — built around the UK used car market.
            </p>

            {/* Mobile-only purchase button */}
            <div className="mt-6 lg:hidden">
              <Link
                href="/checkout"
                className="block w-full rounded-xl bg-[#e8ff47] py-4 text-center text-base font-bold text-[#0a0a0a] transition hover:brightness-110 active:scale-95"
              >
                Get Instant Access — {price}
              </Link>
              <p className="mt-2 text-center text-xs text-white/35">
                🔒 Secure · ⚡ Instant access · ↺ 30-day guarantee
              </p>
            </div>
          </div>

          {/* What's included */}
          <div>
            <h2 className="font-syne mb-6 text-xl font-bold text-white">
              What&apos;s included
            </h2>
            <div className="divide-y divide-white/[0.05] rounded-2xl border border-white/[0.07] overflow-hidden">
              {includes.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 bg-white/[0.02] px-5 py-5 transition hover:bg-white/[0.035]"
                >
                  <span className="mt-0.5 shrink-0 text-xl">{item.icon}</span>
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-white/90">{item.title}</h3>
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-white/45">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div>
            <h2 className="font-syne mb-6 text-xl font-bold text-white">
              How it works
            </h2>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={step.n} className="flex gap-5">
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(232,255,71,0.25)] bg-[rgba(232,255,71,0.07)] text-sm font-bold text-[#e8ff47]">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="mt-2 w-px flex-1 bg-white/[0.07]" />
                    )}
                  </div>
                  <div className="pb-6">
                    <h3 className="mb-1 text-sm font-semibold text-white">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-white/45">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-syne mb-6 text-xl font-bold text-white">
              Common questions
            </h2>
            <div className="space-y-3">
              {faqs.map((item) => (
                <div key={item.q} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-4">
                  <h3 className="mb-1.5 text-sm font-semibold text-white">{item.q}</h3>
                  <p className="text-sm leading-relaxed text-white/45">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee (left-column version) */}
          <div className="flex items-start gap-5 rounded-2xl border border-[rgba(232,255,71,0.12)] bg-[rgba(232,255,71,0.04)] p-6">
            <span className="text-3xl leading-none">↺</span>
            <div>
              <h3 className="mb-1 font-semibold text-white">30-Day Money-Back Guarantee</h3>
              <p className="text-sm leading-relaxed text-white/50">
                Try the complete system for 30 days. If you&apos;re genuinely not satisfied — for any
                reason — reach out and we&apos;ll refund you in full.
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: sticky purchase card ───────────────────── */}
        <div className="mt-10 hidden shrink-0 lg:mt-0 lg:block lg:w-80 xl:w-96">
          <div className="sticky top-6 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#111]">

            {/* Product image strip */}
            <div className="relative h-44 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80"
                alt="Car Flipping Playbook"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="rounded-lg bg-[#e8ff47] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                  60% OFF
                </span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="font-syne mb-1 text-lg font-extrabold text-white">
                Car Flipping Playbook
              </h2>
              <p className="mb-5 text-xs text-white/40">Instant digital access · Lifetime updates</p>

              {/* Price */}
              <div className="mb-5 flex items-end gap-3">
                <span className="text-base text-white/25 line-through">{comparePrice}</span>
                <span className="font-syne text-4xl font-extrabold text-white">{price}</span>
              </div>

              <div className="mb-5 flex items-center gap-2 rounded-xl border border-[rgba(232,255,71,0.15)] bg-[rgba(232,255,71,0.06)] px-3 py-2.5">
                <span className="text-[#e8ff47]">🎉</span>
                <span className="text-xs text-[#e8ff47]">
                  You save <strong>£{savings}</strong> today
                </span>
              </div>

              {/* CTA */}
              <Link
                href="/checkout"
                className="block w-full rounded-xl bg-[#e8ff47] py-3.5 text-center text-sm font-bold text-[#0a0a0a] shadow-[0_0_30px_rgba(232,255,71,0.18)] transition hover:brightness-110 hover:shadow-[0_0_50px_rgba(232,255,71,0.3)] active:scale-[0.98]"
              >
                Get Instant Access
              </Link>

              <div className="mt-3 flex flex-wrap justify-center gap-3 text-[11px] text-white/30">
                <span>🔒 Secure</span>
                <span>⚡ Instant access</span>
                <span>↺ 30-day guarantee</span>
              </div>

              {/* Mini includes */}
              <div className="mt-6 border-t border-white/[0.06] pt-5">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-white/30">
                  What you get
                </p>
                <ul className="space-y-2">
                  {includes.map((item) => (
                    <li key={item.title} className="flex items-start gap-2.5 text-xs text-white/55">
                      <span className="mt-px shrink-0 text-[#e8ff47]">✓</span>
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-5">
                {[
                  { value: "£800", label: "Avg. profit/flip" },
                  { value: "29+", label: "Cars resold" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-white/[0.03] p-3 text-center">
                    <p className="font-syne text-lg font-bold text-[#e8ff47]">{s.value}</p>
                    <p className="text-[10px] text-white/35">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom CTA bar ──────────────────────────────────── */}
      <div className="border-t border-white/[0.06] bg-[#0d0d0d] px-6 py-10 text-center">
        <p className="mb-1 text-xs text-white/35 uppercase tracking-widest font-semibold">One-time payment · No subscription</p>
        <div className="mb-5 mt-4 flex items-end justify-center gap-3">
          <span className="text-base text-white/25 line-through">{comparePrice}</span>
          <span className="font-syne text-4xl font-extrabold text-white">{price}</span>
          <span className="mb-1 rounded-md bg-[rgba(232,255,71,0.1)] px-2 py-1 text-xs font-semibold text-[#e8ff47]">
            Save £{savings}
          </span>
        </div>
        <Link
          href="/checkout"
          className="inline-block rounded-xl bg-[#e8ff47] px-12 py-4 text-base font-bold text-[#0a0a0a] shadow-[0_0_40px_rgba(232,255,71,0.2)] transition hover:brightness-110 hover:shadow-[0_0_60px_rgba(232,255,71,0.35)] active:scale-95"
        >
          Get Instant Access — 60% Off Today
        </Link>
        <p className="mt-3 text-xs text-white/30">🔒 Secure checkout · ⚡ Instant access · ↺ 30-day guarantee · 📦 Lifetime updates</p>
      </div>
    </div>
  );
}
