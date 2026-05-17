import HeadingBadge from "@/components/common";

const fits = [
  {
    icon: "💼",
    title: "You have a 9–5 and want extra income",
    desc: "You don't want a second job. You want something you control — that earns while you still work.",
  },
  {
    icon: "🎯",
    title: "You have £1,000–£10,000 to put to work",
    desc: "You have capital sitting idle and want it doing something. Flipping turns savings into compounding returns.",
  },
  {
    icon: "🔰",
    title: "You've never bought or sold a car before",
    desc: "No experience needed. The system is built from scratch for complete beginners.",
  },
  {
    icon: "⏱️",
    title: "You can commit a few hours a week",
    desc: "Most flips take 5–10 hours of actual work spread over 1–2 weeks. You don't need to go full time.",
  },
  {
    icon: "📈",
    title: "You want something that scales",
    desc: "Start with one car. Reinvest the profit. Run two. Then three. The model compounds.",
  },
  {
    icon: "🇬🇧",
    title: "You're based in the UK",
    desc: "Every strategy, platform, and legal consideration inside is specific to the UK used car market.",
  },
];

const doesNotFit = [
  "Looking for a get-rich-quick scheme with no effort",
  "Not willing to put in the time to inspect and source properly",
  "Expecting guaranteed profit on every car",
  "Outside the UK — the market specifics won't apply",
];

export function WhoIsItFor() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 max-w-xl">
          <HeadingBadge>Right fit</HeadingBadge>
          <h2 className="font-syne text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Who is this for?
          </h2>
          <p className="mt-3 text-sm text-white/45">
            This isn&apos;t for everyone. Here&apos;s who it actually works for — and who it doesn&apos;t.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* This IS for you */}
          <div className="grid gap-3 sm:grid-cols-2">
            {fits.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition hover:border-white/[0.12]"
              >
                <span className="mt-0.5 shrink-0 text-xl leading-none">{item.icon}</span>
                <div>
                  <p className="mb-1.5 text-sm font-semibold text-white/90">{item.title}</p>
                  <p className="text-xs leading-relaxed text-white/40">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* This is NOT for you */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
              Not a good fit if…
            </p>
            <ul className="space-y-4">
              {doesNotFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-px h-4 w-4 shrink-0 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-[10px] text-red-400 font-bold leading-none">
                    ✕
                  </span>
                  <span className="text-sm leading-relaxed text-white/50">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-white/[0.06] pt-6">
              <p className="text-xs leading-relaxed text-white/30">
                If you&apos;re willing to follow a process, put in the hours, and treat it like a
                real business — even part-time — this works.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
