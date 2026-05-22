import HeadingBadge from "@/components/common";

const steps = [
  {
    n: "01",
    icon: "💳",
    title: "Complete purchase",
    desc: "One-time payment — no subscription. Checkout takes under 2 minutes. Your details are never stored on our servers.",
    detail: "Secure checkout via Stripe",
  },
  {
    n: "02",
    icon: "📧",
    title: "Check your inbox",
    desc: "Two emails land immediately: with your access link with everything included. Just Log In",
    detail: "Arrives within 60 seconds",
  },
  {
    n: "03",
    icon: "🔑",
    title: "Create your account",
    desc: "Click the link in your email, enter your address, and you're in. No password to remember — we use a magic login code.",
    detail: "No password needed",
  },
  {
    n: "04",
    icon: "📲",
    title: "Access your dashboard",
    desc: "Everything lives in your private dashboard. Works on phone, tablet, and desktop — access it anywhere, any time.",
    detail: "Mobile friendly",
  },
  {
    n: "05",
    icon: "📦",
    title: "Get free updates forever",
    desc: "As the market changes and new strategies are added, your copy updates automatically. Pay once, benefit indefinitely.",
    detail: "Lifetime updates included",
  },
  {
    n: "06",
    icon: "🚗",
    title: "Find your first flip",
    desc: "Start with Module 1, run the sourcing system, and work your first deal. Most people identify a viable car within weeks.",
    detail: "Start the same day",
  },
];

const faqs = [
  {
    q: "Is access really instant?",
    a: "Yes. The moment payment clears, the emails are sent. Your dashboard is live before you leave the checkout page.",
  },
  {
    q: "What if I lose the email?",
    a: "Log in at any time using your email address — we send you a fresh access code. Nothing gets lost.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes. The dashboard and all content is fully responsive. Read it on your phone between jobs.",
  },
  {
    q: "What's the refund policy?",
    a: "30 days, no questions. If it's not what you expected, email us and we'll refund in full.",
  },
];

export function PurchaseProcess() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-14 max-w-xl">
          <HeadingBadge>After you buy</HeadingBadge>
          <h2 className="font-syne text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            What happens after purchase
          </h2>
          <p className="mt-3 text-sm text-white/45">
            No waiting. No complicated setup. Here&apos;s exactly what the next few minutes look like.
          </p>
        </div>

        {/* Steps + FAQs side by side on desktop */}
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">

          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.n} className="flex gap-5">
                {/* Connector */}
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(232,255,71,0.25)] bg-[rgba(232,255,71,0.07)] text-base">
                    {step.icon}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="my-1 w-px flex-1 bg-white/6" />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-8 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/30">
                      {step.detail}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/45">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ sidebar */}
          <div className="space-y-3">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Common questions
            </p>

            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-white/7 bg-white/3 p-5"
              >
                <p className="mb-2 text-sm font-semibold text-white/90">{item.q}</p>
                <p className="text-xs leading-relaxed text-white/45">{item.a}</p>
              </div>
            ))}

            {/* Guarantee */}
            <div className="rounded-2xl border border-[rgba(232,255,71,0.12)] bg-[rgba(232,255,71,0.04)] p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-base">↺</span>
                <p className="text-sm font-semibold text-white">30-day guarantee</p>
              </div>
              <p className="text-xs leading-relaxed text-white/45">
                Not what you expected? Email us within 30 days for a full refund — no forms, no hassle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
