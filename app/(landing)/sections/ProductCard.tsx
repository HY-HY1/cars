"use client"

import { useState } from "react"

import { CheckoutForm } from "@/components/CheckoutForm"
import { formatPrice } from "@/lib/format-price"
import HeadingBadge from "@/components/common"

// ── Types ──────────────────────────────────────────────────
type Product = {
  name: string
  description: string
  badge: string
  price: number
  compareAtPrice: number
  currency: string
}

type ProductCardProps = {
  product: Product
  publishableKey: string
  returnUrl: string
}

type CheckoutPanelProps = {
  price: string
  comparePrice: string
  savings: number
  publishableKey: string
  returnUrl: string
  onBack: () => void
}

type ProductDetailsProps = {
  formattedPrice: string
  formattedComparePrice: string
  savings: number
  onCheckout: () => void
}

// ── Static content ─────────────────────────────────────────
const includes = [
  {
    icon: "🎬",
    iconBg: "bg-[rgba(232,255,71,0.1)]",
    title: "8-module video course",
    desc: "Complete step-by-step process from sourcing undervalued cars to reselling for profit.",
    tag: "Core",
  },
  {
    icon: "📋",
    iconBg: "bg-[rgba(29,158,117,0.12)]",
    title: "Inspection checklist",
    desc: "40+ point checklist to avoid expensive mistakes and bad deals.",
    tag: "Bonus",
  },
  {
    icon: "💬",
    iconBg: "bg-[rgba(83,74,183,0.12)]",
    title: "Negotiation scripts",
    desc: "Simple scripts used to negotiate hundreds off asking prices.",
    tag: "Bonus",
  },
  {
    icon: "📊",
    iconBg: "bg-[rgba(186,117,23,0.12)]",
    title: "Profit calculator",
    desc: "Quickly calculate realistic margins before buying any car.",
    tag: "Bonus",
  },
]

// ── Feature card ───────────────────────────────────────────
function FeatureCard({
  icon,
  iconBg,
  title,
  desc,
  tag,
}: (typeof includes)[number]) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all hover:border-[rgba(232,255,71,0.18)] hover:bg-[rgba(232,255,71,0.04)]">
      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-lg ${iconBg}`}
      >
        {icon}
      </div>

      <div className="mb-3 inline-flex rounded-md bg-[rgba(232,255,71,0.08)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#e8ff47]">
        {tag}
      </div>

      <h4 className="mb-2 text-sm font-semibold text-white/90">
        {title}
      </h4>

      <p className="text-xs leading-relaxed text-white/40">
        {desc}
      </p>
    </div>
  )
}

// ── Order summary ──────────────────────────────────────────
type OrderSummaryProps = {
  name: string
  price: string
  comparePrice: string
  savings: number
}

export function OrderSummary({
  name,
  price,
  comparePrice,
  savings,
}: OrderSummaryProps) {
  return (
    <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-white/30">
        Order summary
      </p>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white/90">
            {name}
          </p>
          <p className="text-xs text-white/40">
            Instant access · Lifetime updates
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-white/25 line-through">
            {comparePrice}
          </p>
          <p className="font-syne text-xl font-extrabold text-white">
            {price}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-xl border border-[rgba(232,255,71,0.15)] bg-[rgba(232,255,71,0.06)] px-3 py-2">
        <span className="text-[#e8ff47]">🎉</span>
        <span className="text-xs text-[#e8ff47]">
          You're saving <strong>£{savings}</strong> today
        </span>
      </div>
    </div>
  )
}

// ── Checkout panel ─────────────────────────────────────────
function CheckoutPanel({
  price,
  comparePrice,
  savings,
  publishableKey,
  returnUrl,
  onBack,
}: CheckoutPanelProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 border-none bg-transparent p-0 text-sm text-white/40 transition hover:text-white/80 cursor-pointer"
      >
        ← Back to product
      </button>

      <OrderSummary
        name="FlipPro Complete System"
        price={price}
        comparePrice={comparePrice}
        savings={savings}
      />

      <CheckoutForm
        publishableKey={publishableKey}
        returnUrl={returnUrl}
      />
    </div>
  )
}

// ── Product details ────────────────────────────────────────
function ProductDetails({
  formattedPrice,
  formattedComparePrice,
  savings,
  onCheckout,
}: ProductDetailsProps) {
  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="mb-8">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
          What you get
        </p>

        <h3 className="font-syne text-3xl font-extrabold tracking-tight text-white">
          A practical system designed to make flipping cars repeatable
        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
          No fluff. No unrealistic promises. Just the exact frameworks,
          checklists, and systems used to consistently find margin in
          the UK used car market.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {includes.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>

      <div className="border-t border-white/[0.06] pt-6">
        <div className="mb-5 flex items-end gap-3">
          <span className="text-lg text-white/20 line-through">
            {formattedComparePrice}
          </span>

          <span className="font-syne text-5xl font-extrabold tracking-tight text-white">
            {formattedPrice}
          </span>

          <span className="mb-1 rounded-md bg-[rgba(232,255,71,0.1)] px-2 py-1 text-xs font-semibold text-[#e8ff47]">
            Save £{savings}
          </span>
        </div>

        <button
          onClick={onCheckout}
          className="w-full rounded-2xl bg-[#e8ff47] py-4 text-sm font-bold text-black transition-all hover:brightness-110 active:scale-[0.99] border-none cursor-pointer"
        >
          Get Instant Access
        </button>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-white/30">
          <span>🔒 Secure checkout</span>
          <span>⚡ Instant access</span>
          <span>↺ 30-day guarantee</span>
        </div>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────
export default function ProductCard({
  product,
  publishableKey,
  returnUrl,
}: ProductCardProps) {
  const [checkoutVisible, setCheckoutVisible] = useState(false)

  const formattedPrice = formatPrice(
    product.price,
    product.currency
  )

  const formattedComparePrice = formatPrice(
    product.compareAtPrice,
    product.currency
  )

  const savings =
    (product.compareAtPrice - product.price) / 100

  return (
    <section
      className="bg-[#0d0d0d] px-6 py-24 text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >


      {/* Header */}
      <div className="mb-14 text-center">
        <HeadingBadge>
          THE COMPLETE SYSTEM
        </HeadingBadge>
        <h2 className="font-syne mx-auto max-w-3xl text-4xl font-bold tracking-tight text-white md:text-5xl">
          Everything you need to flip your first profitable car
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/40">
          {product.description}
        </p>
      </div>

      {/* Main card */}
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111] md:grid-cols-[1fr_2fr]">

        {/* Left */}
        <div className="border-b border-white/[0.06] bg-[#121212] p-8 md:border-b-0 md:border-r">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]">
            <img
              src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=80"
              alt={product.name}
              className="aspect-[4/5] h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute left-4 top-4 rounded-lg bg-[#e8ff47] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
              {product.badge}
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-syne text-2xl font-extrabold text-white">
                {product.name}
              </p>

              <p className="mt-1 text-sm text-white/60">
                Complete Car Flipping System
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { value: "300+", label: "Cars flipped" },
              { value: "1.4k+", label: "Students" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
              >
                <p className="text-2xl font-bold text-[#e8ff47]">
                  {stat.value}
                </p>

                <p className="text-xs text-white/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col p-8 md:p-10">
          {checkoutVisible ? (
            <CheckoutPanel
              price={formattedPrice}
              comparePrice={formattedComparePrice}
              savings={savings}
              publishableKey={publishableKey}
              returnUrl={returnUrl}
              onBack={() => setCheckoutVisible(false)}
            />
          ) : (
            <ProductDetails
              formattedPrice={formattedPrice}
              formattedComparePrice={formattedComparePrice}
              savings={savings}
              onCheckout={() => setCheckoutVisible(true)}
            />
          )}
        </div>
      </div>
    </section>
  )
}