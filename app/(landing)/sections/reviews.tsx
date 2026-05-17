"use client"

import HeadingBadge from "@/components/common"
import { useState } from "react"

type Tag = "all" | "beginner" | "profit" | "fast"

type Review = {
  name: string
  location: string
  initials: string
  color: string
  stars: number
  quote: string
  profit: string
  tag: Exclude<Tag, "all">
  tagLabel: string
  days: number
}

const reviews: Review[] = [
  {
    name: "Jamie T.",
    location: "Manchester",
    initials: "JT",
    color: "#1D9E75",
    stars: 5,
    quote: "Flipped my first car after a few weeks. Didn’t expect it to actually work but made £1,900 profit on a Golf.",
    profit: "1,900",
    tag: "beginner",
    tagLabel: "First flip",
    days: 11,
  },
  {
    name: "Priya S.",
    location: "Birmingham",
    initials: "PS",
    color: "#534AB7",
    stars: 5,
    quote: "Second flip made £2,400. The checklist stopped me buying a bad deal early on.",
    profit: "2,400",
    tag: "profit",
    tagLabel: "Profit",
    days: 14,
  },
  {
    name: "Dan R.",
    location: "Leeds",
    initials: "DR",
    color: "#D85A30",
    stars: 5,
    quote: "Made £3k across a couple of flips. Nothing crazy, just consistent sourcing and negotiation.",
    profit: "3,000",
    tag: "profit",
    tagLabel: "Profit",
    days: 8,
  },
  {
    name: "Sophie M.",
    location: "Bristol",
    initials: "SM",
    color: "#BA7517",
    stars: 5,
    quote: "Sold my first car in under a week for about £1,200 profit. Way faster than expected.",
    profit: "1,200",
    tag: "fast",
    tagLabel: "<10 days",
    days: 7,
  },
  {
    name: "Chris B.",
    location: "Newcastle",
    initials: "CB",
    color: "#185FA5",
    stars: 4,
    quote: "Had zero experience. First flip made around £1,500 after following the inspection steps.",
    profit: "1,500",
    tag: "beginner",
    tagLabel: "First flip",
    days: 9,
  },
  {
    name: "Aisha K.",
    location: "London",
    initials: "AK",
    color: "#993556",
    stars: 5,
    quote: "Done a few flips now averaging about £2k profit each. Works if you stay consistent.",
    profit: "2,000",
    tag: "profit",
    tagLabel: "Consistent",
    days: 12,
  },
]

const PER_PAGE = 3

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-[#e8ff47]" : "text-white/15"}>
          ★
        </span>
      ))}
    </div>
  )
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-5">
      <Stars count={r.stars} />

      <p className="mt-3 mb-4 text-sm italic text-white/70">
        "{r.quote}"
      </p>

      <div className="mb-4 text-xs font-semibold text-[#e8ff47]">
        +£{r.profit} profit
      </div>

      <div className="flex items-center gap-3 border-t border-white/[0.06] pt-3">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
          style={{ background: `${r.color}20`, color: r.color }}
        >
          {r.initials}
        </div>

        <div>
          <p className="text-sm font-medium text-white">{r.name}</p>
          <p className="text-xs text-white/40">
            {r.location} · {r.days} days
          </p>
        </div>

        <span className="ml-auto text-[11px] text-white/40">
          {r.tagLabel}
        </span>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const [page, setPage] = useState(0)

  const pages = [
    reviews.slice(0, 3),
    reviews.slice(3, 6),
  ]

  const current = pages[page]

  return (
    <section className="bg-[#0d0d0d] px-6 py-20 text-white">
      {/* Header */}
      <div className="mb-10 text-center">
        <HeadingBadge>
          TESTIMONIALS
        </HeadingBadge>
        <h2 className="text-3xl font-syne font-bold md:text-4xl">
          Real people, real results
        </h2>
        <p className="mt-2 text-sm text-white/40">
          Simple system people use to flip their first car.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {current.map((r) => (
          <ReviewCard key={r.name} r={r} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`h-2 rounded-full transition-all ${
              i === page ? "w-6 bg-[#e8ff47]" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  )
}