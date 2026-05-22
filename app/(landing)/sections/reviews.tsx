"use client"

import { motion } from "framer-motion"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useEffect, useState } from "react"

import HeadingBadge from "@/components/common"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  useCarousel,
} from "@/components/ui/carousel"

type Review = {
  name: string
  location: string
  initials: string
  color: string
  stars: number
  quote: string
  profit: string
  days: number
}

const reviews: Review[] = [
  {
    name: "Jamie T.",
    location: "Manchester",
    initials: "JT",
    color: "#1D9E75",
    stars: 5,
    quote:
      "Bought and sold my first Golf locally. Ended up making just over £650 after fees and a couple of small fixes.",
    profit: "650",
    days: 18,
  },
  {
    name: "Priya S.",
    location: "Birmingham",
    initials: "PS",
    color: "#534AB7",
    stars: 5,
    quote:
      "The inspection checklist genuinely helped. Avoided one bad car and made around £850 on the next deal.",
    profit: "850",
    days: 21,
  },
  {
    name: "Dan R.",
    location: "Leeds",
    initials: "DR",
    color: "#D85A30",
    stars: 4,
    quote:
      "Nothing life changing, but I've done two flips now and made roughly £1.4k total profit.",
    profit: "1,400",
    days: 34,
  },
  {
    name: "Sophie M.",
    location: "Bristol",
    initials: "SM",
    color: "#BA7517",
    stars: 5,
    quote:
      "Sold my first car after about two weeks. Made around £500 profit which covered insurance and some savings.",
    profit: "500",
    days: 15,
  },
  {
    name: "Chris B.",
    location: "Newcastle",
    initials: "CB",
    color: "#185FA5",
    stars: 4,
    quote:
      "Started with basically no experience. First flip made about £700 after sorting a few issues.",
    profit: "700",
    days: 20,
  },
  {
    name: "Aisha K.",
    location: "London",
    initials: "AK",
    color: "#993556",
    stars: 5,
    quote:
      "Still early on but the sourcing process makes a lot more sense now. Averaging a few hundred profit per car.",
    profit: "600",
    days: 17,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? "text-[#e8ff47]" : "text-white/15"}>★</span>
      ))}
    </div>
  )
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <motion.div
      whileHover={{ y: -5, borderColor: "rgba(232,255,71,0.2)" }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="flex h-full flex-col rounded-2xl border border-white/8 bg-[#111] p-5 select-none"
    >
      <div className="mb-3 font-serif text-4xl leading-none text-[#e8ff47]/15">&ldquo;</div>

      <Stars count={r.stars} />

      <p className="mt-3 flex-1 text-sm italic leading-relaxed text-white/60">
        {r.quote}
      </p>

      <p className="mt-4 text-xl font-extrabold tracking-tight text-[#e8ff47]">
        +£{r.profit}
      </p>

      <div className="mt-4 flex items-center gap-3 border-t border-white/6 pt-4">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{ background: `${r.color}25`, color: r.color }}
        >
          {r.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{r.name}</p>
          <p className="text-xs text-white/35">{r.location} · sold in {r.days} days</p>
        </div>
      </div>
    </motion.div>
  )
}

// Must live inside <Carousel> to access context
function CarouselNav({
  current,
  count,
  onDotClick,
}: {
  current: number
  count: number
  onDotClick: (i: number) => void
}) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

  return (
    <div className="mt-8 flex items-center justify-between">
      <div className="flex gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            aria-label={`Go to page ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === current
                ? "w-6 bg-[#e8ff47]"
                : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous"
          className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:border-[#e8ff47]/30 hover:bg-[#e8ff47]/10 hover:text-[#e8ff47] disabled:cursor-not-allowed disabled:opacity-25"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next"
          className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:border-[#e8ff47]/30 hover:bg-[#e8ff47]/10 hover:text-[#e8ff47] disabled:cursor-not-allowed disabled:opacity-25"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}

export default function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <section className="bg-[#0a0a0a] px-6 py-24 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-12 text-center"
      >
        <HeadingBadge>TESTIMONIALS</HeadingBadge>
        <h2 className="font-syne text-3xl font-bold md:text-4xl">
          Real people, real results
        </h2>
        <p className="mt-2 text-sm text-white/40">
          A simple system people use to flip their first car.
        </p>
      </motion.div>

      <div className="mx-auto max-w-5xl">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            slidesToScroll: 3,
            breakpoints: {
              "(max-width: 1023px)": { slidesToScroll: 2 },
              "(max-width: 639px)":  { slidesToScroll: 1 },
            },
          }}
          className="w-full cursor-grab active:cursor-grabbing"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((r) => (
              <CarouselItem key={r.name} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                <ReviewCard r={r} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNav
            current={current}
            count={count}
            onDotClick={(i) => api?.scrollTo(i)}
          />
        </Carousel>
      </div>
    </section>
  )
}
