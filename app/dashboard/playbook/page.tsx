import Link from "next/link";

import { AccessLocked } from "@/components/dashboard/access-locked";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Playbook — Dashboard" };

// ── Module data ─────────────────────────────────────────────

const modules = [
  {
    id: "m1",
    number: "01",
    href: "/dashboard/playbook/1",
    title: "Welcome & Expectations",
    duration: "15 min",
    tag: "Start here",
    lessons: [
      "What you can realistically earn flipping cars in the UK",
      "How much capital you need to get started",
      "The risks every beginner should understand",
      "How much time it actually takes",
      "The most common reasons beginners fail — and how to avoid them",
    ],
  },
  {
    id: "m2",
    number: "02",
    href: "/dashboard/playbook/2",
    title: "Understanding the Market",
    duration: "20 min",
    tag: "Core",
    lessons: [
      "Which cars sell quickly and for profit",
      "The best beginner-friendly flips by budget",
      "Cars to avoid as a beginner",
      "How mileage affects price and buyer psychology",
      "Reading demand — what's moving and what's sitting",
    ],
  },
  {
    id: "m3",
    number: "03",
    href: "/dashboard/playbook/3",
    title: "Sourcing Deals",
    duration: "25 min",
    tag: "Core",
    lessons: [
      "Finding deals on Facebook Marketplace",
      "Using AutoTrader and Gumtree effectively",
      "How to use Copart and salvage auctions",
      "Spotting undervalued listings before anyone else",
      "Understanding seller psychology — urgency, motivation, flexibility",
    ],
  },
  {
    id: "m4",
    number: "04",
    href: "/dashboard/playbook/4",
    title: "Vehicle Evaluation",
    duration: "30 min",
    tag: "Core",
    lessons: [
      "Reading MOT history — what the data tells you",
      "VIN and HPI checks explained",
      "CAT N and CAT S cars — risks and opportunities",
      "Interpreting service history and spotting gaps",
      "Understanding ownership history and what it means",
      "Estimating repair costs before you buy",
    ],
  },
  {
    id: "m5",
    number: "05",
    href: "/dashboard/playbook/5",
    title: "Worked Flip Examples",
    duration: "25 min",
    tag: "Core",
    lessons: [
      "Full breakdown: VW Polo flip (budget buy)",
      "Full breakdown: BMW 120d flip (mid-range)",
      "Cost-by-cost analysis: what actually ate the margin",
      "Calculating ROI on a real deal",
      "Mistakes made and what they cost",
    ],
  },
  {
    id: "m6",
    number: "06",
    href: "/dashboard/playbook/6",
    title: "Negotiation",
    duration: "20 min",
    tag: "Core",
    lessons: [
      "How to message a seller without killing the deal",
      "Building leverage before you make an offer",
      "Pricing your offer — how low is too low?",
      "Handling counter-offers and pushback",
      "When and how to walk away cleanly",
      "Scripts you can copy and adapt",
    ],
  },
  {
    id: "m7",
    number: "07",
    href: "/dashboard/playbook/7",
    title: "Inspection System",
    duration: "25 min",
    tag: "Core",
    lessons: [
      "Mechanical checks every beginner must do",
      "Bodywork inspection — what to look for and where",
      "How to conduct a proper test drive",
      "Red flags that mean walk away immediately",
      "Using the printable inspection checklist on the day",
    ],
  },
  {
    id: "m8",
    number: "08",
    href: "/dashboard/playbook/8",
    title: "Transport & Insurance",
    duration: "15 min",
    tag: "Essential",
    lessons: [
      "Temporary insurance options explained",
      "Trade plates — what they are and when you need them",
      "How to transport a car with no MOT legally",
      "Getting the car home after purchase",
    ],
  },
  {
    id: "m9",
    number: "09",
    href: "/dashboard/playbook/9",
    title: "Repairs & Connections",
    duration: "20 min",
    tag: "Essential",
    lessons: [
      "Finding a reliable local bodyshop",
      "Working with mechanics — how to get fair quotes",
      "Sourcing parts cheaper via eBay, scrapyards and dealers",
      "Deciding what to fix yourself vs. outsource",
      "Building your network of tradespeople over time",
    ],
  },
  {
    id: "m10",
    number: "10",
    href: "/dashboard/playbook/10",
    title: "Adding Value",
    duration: "20 min",
    tag: "Core",
    lessons: [
      "Full valet process — what to do yourself and what to pay for",
      "Cheap cosmetic fixes that increase sale price",
      "Photography that sells cars faster",
      "Presentation — what buyers notice before they speak to you",
    ],
  },
  {
    id: "m11",
    number: "11",
    href: "/dashboard/playbook/11",
    title: "Selling Cars",
    duration: "20 min",
    tag: "Core",
    lessons: [
      "Writing a listing that gets enquiries",
      "How to price your car for a fast sale",
      "Understanding buyer psychology",
      "Avoiding scams and time-wasters",
      "Safe handover — paperwork, payment and V5C transfer",
    ],
  },
  {
    id: "m12",
    number: "12",
    href: "/dashboard/playbook/12",
    title: "Accounting, Tax & Legal",
    duration: "15 min",
    tag: "Essential",
    lessons: [
      "Basic bookkeeping for car flippers",
      "When HMRC starts taking notice — the rules",
      "Private seller vs. trader — where the legal line is",
      "Cash flow management between flips",
      "Staying organised for tax time",
    ],
  },
  {
    id: "m13",
    number: "13",
    href: "/dashboard/playbook/13",
    title: "First Flip Action Plan",
    duration: "15 min",
    tag: "Start here",
    lessons: [
      "Your exact action steps for the next 7 days",
      "The beginner roadmap from zero to first offer",
      "How to find your first deal using everything you've learned",
    ],
  },
];

const totalMinutes = modules.reduce(
  (acc, m) => acc + Number(m.duration.replace(" min", "")),
  0,
);

const tagColor: Record<string, string> = {
  "Start here": "bg-[rgba(232,255,71,0.1)] text-[#e8ff47]",
  "Core":       "bg-[rgba(29,158,117,0.12)] text-[#1D9E75]",
  "Advanced":   "bg-[rgba(83,74,183,0.12)] text-[#7b74e8]",
  "Essential":  "bg-[rgba(186,117,23,0.12)] text-[#BA7517]",
};

// ── Page ────────────────────────────────────────────────────

export default async function PlaybookPage() {
  const { user } = await requireUser("/dashboard/playbook");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <div className="max-w-3xl p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8ff47]">
          Course content
        </p>
        <h1 className="mt-1.5 font-syne text-2xl font-extrabold text-white md:text-3xl">
          Car Flipping Playbook
        </h1>
        <p className="mt-1.5 text-sm text-white/40">
          {modules.length} modules &middot; {totalMinutes} min total
        </p>
      </div>

      {/* Progress bar (static for now) */}
      <div className="mb-8 rounded-2xl border border-white/7 bg-white/3 p-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-white/40">Your progress</span>
          <span className="font-medium text-white/60">0 / {modules.length} modules</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/6">
          <div className="h-1.5 w-0 rounded-full bg-[#e8ff47]" />
        </div>
      </div>

      {/* Modules accordion */}
      <Accordion className="space-y-3">
        {modules.map((mod) => (
          <AccordionItem
            key={mod.id}
            value={mod.id}
            className="rounded-2xl border border-white/7 bg-white/3 px-5 py-1"
          >
            <AccordionTrigger className="py-4 hover:no-underline">
              <div className="flex items-center gap-4 text-left">
                <span className="font-syne text-lg font-extrabold text-white/15 tabular-nums">
                  {mod.number}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-white/90">
                      {mod.title}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tagColor[mod.tag]}`}
                    >
                      {mod.tag}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-white/35">{mod.duration}</p>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <ul className="mb-4 space-y-2 border-t border-white/5 pt-4">
                {mod.lessons.map((lesson, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/55">
                    <span className="mt-px text-xs font-bold tabular-nums text-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {lesson}
                  </li>
                ))}
              </ul>
              <Link
                href={mod.href}
                className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-[rgba(232,255,71,0.08)] px-3 py-1.5 text-xs font-semibold text-[#e8ff47] transition-colors hover:bg-[rgba(232,255,71,0.14)]"
              >
                Open module →
              </Link>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
