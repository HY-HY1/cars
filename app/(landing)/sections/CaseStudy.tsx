"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import HeadingBadge from "@/components/common";

// ── Media ──────────────────────────────────────────────────
type MediaItem = { src: string; type: "video" | "image"; label: string };

const heroVideo: MediaItem = {
  src: "/120d/comparison.MOV",
  type: "video",
  label: "Full comparison",
};

const gallery: MediaItem[] = [
  { src: "/120d/before.JPG", type: "image", label: "Before" },
  { src: "/120d/after.JPG", type: "image", label: "After" },
];

// ── Static content ─────────────────────────────────────────
const timeline = [
  {
    step: "01",
    title: "Found on auction",
    desc: "Identified a 2019 BMW 120D listed on auction platforms below typical retail value due to its condition and category status.",
  },
  {
    step: "02",
    title: "Purchase breakdown",
    desc: "Purchased for £6,500 with approximately £600 in auction + admin fees. Total acquisition cost: ~£7,100.",
  },
  {
    step: "03",
    title: "Repair + preparation",
    desc: "Invested ~£1,000 into mechanical and cosmetic repairs, plus a full valet and light restoration work to improve presentation.",
  },
  {
    step: "04",
    title: "Current position",
    desc: "Vehicle is now fully prepared and estimated at ~£10,000 market value (Category N). Not yet sold — value uplift is based on condition and comparable listings.",
  },
];

// ── Lightbox ───────────────────────────────────────────────
function Lightbox({
  item,
  onClose,
}: {
  item: MediaItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
      >
        ✕
      </button>

      <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        {item.type === "video" ? (
          <video
            src={item.src}
            controls
            autoPlay
            playsInline
            className="max-h-[88vh] w-auto rounded-xl"
          />
        ) : (
          <img
            src={item.src}
            alt={item.label}
            className="max-h-[88vh] max-w-[88vw] rounded-xl object-contain"
          />
        )}

        <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
          {item.label}
        </div>
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────
export function CaseStudySection() {
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

  return (
    <>
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}

      <section className="bg-[#0d0d0d] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-12">
            <HeadingBadge>Live Example</HeadingBadge>

            <h2 className="font-syne text-3xl font-extrabold tracking-tight md:text-4xl">
              A real flip, start to current stage
            </h2>

            <p className="mt-3 max-w-lg text-sm text-white/45">
              2019 BMW 120D — purchased at auction, repaired and prepared for resale
              using the exact process taught in the playbook.
            </p>
          </div>

          {/* Layout */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">

            {/* ── MEDIA ─────────────────────────────── */}
            <div className="flex shrink-0 flex-row gap-3 lg:w-105 xl:w-120">

              {/* Video */}
              <button
                onClick={() => setLightboxItem(heroVideo)}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111]"
                style={{ aspectRatio: "9 / 16", flex: "0 0 auto", width: "55%" }}
              >
                <video
                  src="/120d/comparison.MOV"
                  preload="metadata"
                  playsInline
                  muted
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20" />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10">
                    <svg className="ml-1 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-white/70">
                    Watch comparison
                  </span>
                </div>
              </button>

              {/* Images */}
              <div className="flex flex-1 flex-col gap-3">
                {gallery.map((item) => (
                  <button
                    key={item.src}
                    onClick={() => setLightboxItem(item)}
                    className="group relative flex-1 overflow-hidden rounded-xl border border-white/[0.07] bg-[#111]"
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10" />

                    <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] uppercase text-white/80">
                      {item.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── DETAILS ───────────────────────────── */}
            <div className="flex flex-1 flex-col gap-5">

              {/* Summary */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[rgba(232,255,71,0.1)] px-2 py-0.5 text-[10px] font-bold uppercase text-[#e8ff47]">
                    Active project
                  </span>
                  <span className="text-[11px] text-white/30">
                    West Midlands · Category N
                  </span>
                </div>

                <h3 className="font-syne mt-2 text-2xl font-extrabold">
                  2019 BMW 120D
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Bought at auction for £6,500 with ~£600 fees. Approximately £1,000 spent
                  on mechanical and cosmetic repairs, including preparation and detailing.
                  <br /><br />
                  The vehicle is now estimated at ~£10,000 based on comparable listings.
                  It has not yet been sold — the current value reflects post-repair condition
                  and market positioning rather than realised profit.
                </p>

                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-4">
                  {[
                    { label: "Purchase", value: "£6,500" },
                    { label: "Total cost", value: "~£8,100" },
                    { label: "Est. value", value: "~£10,000", accent: true },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-white/[0.03] p-3 text-center">
                      <p className={`font-syne text-lg font-extrabold ${s.accent ? "text-[#e8ff47]" : "text-white"}`}>
                        {s.value}
                      </p>
                      <p className="mt-0.5 text-[10px] text-white/35">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Process breakdown
                </p>

                {timeline.map((t, i) => (
                  <div key={t.step} className="flex gap-4">
                    <div className="flex shrink-0 flex-col items-center">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(232,255,71,0.3)] bg-[rgba(232,255,71,0.07)] text-[10px] font-bold text-[#e8ff47]">
                        {t.step}
                      </div>
                      {i < timeline.length - 1 && (
                        <div className="my-1 w-px flex-1 bg-white/[0.06]" />
                      )}
                    </div>

                    <div className={i < timeline.length - 1 ? "pb-5" : ""}>
                      <p className="text-sm font-semibold">{t.title}</p>
                      <p className="mt-0.5 text-xs text-white/40">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-[rgba(232,255,71,0.12)] bg-[rgba(232,255,71,0.04)] p-5">
                <p className="text-sm font-semibold">
                  Want the system behind this process?
                </p>

                <p className="mt-1 text-xs text-white/45">
                  The playbook contains the exact frameworks used for sourcing, evaluation,
                  negotiation, and resale preparation.
                </p>

                <Link
                  href="/product"
                  className="mt-4 inline-block rounded-xl bg-[#e8ff47] px-6 py-2.5 text-sm font-bold text-black"
                >
                  View Playbook →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}