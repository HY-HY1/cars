import HeadingBadge from "@/components/common";

const rows = [
  {
    topic: "Finding your first car",
    without: "Scrolling AutoTrader for hours with no idea what you're looking for. End up overpaying or walking away empty-handed.",
    with: "A repeatable sourcing system that filters for undervalued cars fast. You know exactly what to search and why.",
  },
  {
    topic: "Knowing if it's a good deal",
    without: "Gut feel. Maybe you ask a mate. You buy, then realise you paid £1,500 over market.",
    with: "A profit estimation framework you run in minutes. If the numbers don't work, you walk. Simple.",
  },
  {
    topic: "Inspecting the car",
    without: "You check it looks okay and hope for the best. One hidden fault later and your margin is gone.",
    with: "40-point inspection checklist. Mechanical, cosmetic, paperwork. Nothing gets missed.",
  },
  {
    topic: "Negotiating the price",
    without: "Awkward. You ask for £200 off, they say no, you pay full asking. Every time.",
    with: "Pre-written negotiation scripts. You know exactly what to say — and most sellers move.",
  },
  {
    topic: "Selling it quickly",
    without: "You write three lines, take a photo in the dark, and wonder why nobody's calling.",
    with: "Structured listing templates and photography guidance built to get serious enquiries fast.",
  },
  {
    topic: "Understanding the legal side",
    without: "Vague awareness that V5Cs exist. One mistake and you're selling a car you don't legally own.",
    with: "Clear breakdown of V5C transfers, private vs. trader rules, and when HMRC cares about your profits.",
  },
  {
    topic: "Time to first profit",
    without: "Weeks of trial and error. Possibly months. Possibly a loss on your first car.",
    with: "Most students find their first deal within 2–4 weeks by following the sourcing system from day one.",
  },
  {
    topic: "Knowing what to do next",
    without: "You've sold one car. Now what? No system. Back to square one.",
    with: "A repeatable process you can run again and again — and a clear path to scaling capital.",
  },
];

export function ComparisonSection() {
  return (
    <section className="bg-[#0d0d0d] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 max-w-xl">
          <HeadingBadge>The difference</HeadingBadge>
          <h2 className="font-syne text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            With the playbook vs. without
          </h2>
          <p className="mt-3 text-sm text-white/45">
            Most people who try to flip cars without a system lose money on their first deal —
            or give up before they make one. Here&apos;s what that actually looks like.
          </p>
        </div>

        {/* Column headers */}
        <div className="mb-3 hidden grid-cols-[1fr_1fr_1fr] gap-4 lg:grid">
          <div />
          <div className="rounded-xl border border-red-500/15 bg-red-500/5 px-5 py-3 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-red-400">Without the playbook</p>
          </div>
          <div className="rounded-xl border border-[rgba(232,255,71,0.2)] bg-[rgba(232,255,71,0.05)] px-5 py-3 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#e8ff47]">With the playbook</p>
          </div>
        </div>

        {/* Rows */}
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_1fr]"
            >
              {/* Topic */}
              <div className="flex items-center rounded-xl border border-white/6 bg-white/2 px-5 py-4">
                <p className="text-sm font-semibold text-white/70">{row.topic}</p>
              </div>

              {/* Without */}
              <div className="relative rounded-xl border border-red-500/10 bg-red-500/4 px-5 py-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-red-500/50 lg:hidden">
                  Without
                </p>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-xs font-bold text-red-500/50">✕</span>
                  <p className="text-sm leading-relaxed text-white/45">{row.without}</p>
                </div>
              </div>

              {/* With */}
              <div className="relative rounded-xl border border-[rgba(232,255,71,0.1)] bg-[rgba(232,255,71,0.03)] px-5 py-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#e8ff47]/50 lg:hidden">
                  With the playbook
                </p>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-xs font-bold text-[#e8ff47]">✓</span>
                  <p className="text-sm leading-relaxed text-white/75">{row.with}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="mt-10 rounded-2xl border border-[rgba(232,255,71,0.12)] bg-[rgba(232,255,71,0.04)] p-6 text-center">
          <p className="text-sm font-semibold text-white">
            The difference isn&apos;t talent. It&apos;s having a system.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/45">
            Every person making consistent money flipping cars is following a repeatable process —
            not winging it. This playbook gives you that process.
          </p>
        </div>
      </div>
    </section>
  );
}
