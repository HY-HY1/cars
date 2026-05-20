"use client"

import { motion } from "framer-motion"
import HeadingBadge from "@/components/common"

// Replace these with your TikTok video IDs.
// The ID is the number at the end of the video URL:
//   https://www.tiktok.com/@yourhandle/video/7234567890123456789
//                                             ^^^^^^^^^^^^^^^^^^^
const TIKTOK_VIDEO_IDS = [
  "7620886156854447382",
  "REPLACE_WITH_VIDEO_ID_2",
  "REPLACE_WITH_VIDEO_ID_3",
]

// Your TikTok handle (with @), used for the follow link
const TIKTOK_HANDLE = "@yourhandle"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.73a8.18 8.18 0 0 0 4.79 1.52V6.81a4.85 4.85 0 0 1-1.02-.12Z" />
    </svg>
  )
}

function VideoCard({ id, index }: { id: string; index: number }) {
  const isValidId = /^\d{10,}$/.test(id)

  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-white/7"
      style={{ aspectRatio: "9 / 16" }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {isValidId ? (
        <iframe
          src={`https://www.tiktok.com/embed/v2/${id}`}
          className="h-full w-full border-none"
          allow="encrypted-media"
          allowFullScreen
          title={`TikTok video ${index + 1}`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-white/3">
          <TikTokIcon className="h-10 w-10 text-white/20" />
          <p className="px-4 text-center text-xs text-white/25">
            Replace <code className="text-white/40">REPLACE_WITH_VIDEO_ID_{index + 1}</code> in{" "}
            <code className="text-white/40">TikTokVideos.tsx</code>
          </p>
        </div>
      )}
    </motion.div>
  )
}

export function TikTokSection() {
  return (
    <section className="bg-[#0d0d0d] px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-12 flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <HeadingBadge>On TikTok</HeadingBadge>
          <h2
            className="text-4xl font-extrabold text-white md:text-5xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Watch Real Flips{" "}
            <span className="text-[#e8ff47]">Happen Live</span>
          </h2>
          <p className="max-w-lg text-base text-white/50">
            Follow along as our community flips cars using the exact system
            you&apos;ll get access to — raw, unfiltered, and profitable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TIKTOK_VIDEO_IDS.map((id, i) => (
            <VideoCard key={i} id={id} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href={`https://www.tiktok.com/${TIKTOK_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/60 transition-colors hover:border-white/20 hover:bg-white/8 hover:text-white"
          >
            <TikTokIcon className="h-4 w-4" />
            Follow us on TikTok
          </a>
        </motion.div>
      </div>
    </section>
  )
}
