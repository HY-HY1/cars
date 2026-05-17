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

// ── Static module content ───────────────────────────────────

const modules = [
  {
    id: "m1",
    number: "01",
    title: "Welcome & Orientation",
    duration: "12 min",
    tag: "Start here",
    lessons: [
      "How this playbook is structured",
      "What to expect in your first 30 days",
      "Tools and accounts to set up before you begin",
      "The mindset behind profitable flipping",
    ],
  },
  {
    id: "m2",
    number: "02",
    title: "Finding Undervalued Cars",
    duration: "34 min",
    tag: "Core",
    lessons: [
      "Which platforms to use — AutoTrader, Facebook Marketplace, Gumtree",
      "Search filters that surface deals others miss",
      "Reading between the lines on listings",
      "Price vs. value: spotting the gap",
      "Building a daily sourcing routine",
    ],
  },
  {
    id: "m3",
    number: "03",
    title: "Evaluating Before You Buy",
    duration: "28 min",
    tag: "Core",
    lessons: [
      "The 40-point pre-purchase inspection walkthrough",
      "Mechanical red flags and what they cost",
      "Checking V5C, service history and MOT",
      "HPI check and why it matters",
      "Estimating repair costs accurately",
    ],
  },
  {
    id: "m4",
    number: "04",
    title: "Negotiation",
    duration: "22 min",
    tag: "Core",
    lessons: [
      "How to open the negotiation without offending",
      "Using inspection findings to justify a lower offer",
      "Scripts for common seller responses",
      "Walking away — and when to come back",
      "Locking in the deal and staying firm",
    ],
  },
  {
    id: "m5",
    number: "05",
    title: "Preparing the Car for Sale",
    duration: "18 min",
    tag: "Core",
    lessons: [
      "Full valet process — what to do yourself vs. pay for",
      "Minor cosmetic repairs that pay for themselves",
      "Photography: lighting, angles, and what buyers want to see",
      "Writing a listing that gets enquiries",
    ],
  },
  {
    id: "m6",
    number: "06",
    title: "Listing & Selling",
    duration: "24 min",
    tag: "Core",
    lessons: [
      "Choosing the right platform for your car",
      "Pricing strategy — starting high vs. realistic",
      "Handling buyer enquiries and test drives",
      "Safe transaction methods and paperwork",
      "Handing over and completing the sale",
    ],
  },
  {
    id: "m7",
    number: "07",
    title: "Scaling Up",
    duration: "20 min",
    tag: "Advanced",
    lessons: [
      "Reinvesting profits to move into higher-margin cars",
      "Running multiple cars at once",
      "Building a reputation for repeat buyers",
      "When to consider trading status",
    ],
  },
  {
    id: "m8",
    number: "08",
    title: "Legal & Compliance",
    duration: "16 min",
    tag: "Essential",
    lessons: [
      "Private seller vs. trader — where the line is",
      "V5C transfers and common mistakes",
      "Insurance considerations between purchase and sale",
      "HMRC and tax on profits",
      "When you need to register as a trader",
    ],
  },
];

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
    <div className="p-6 md:p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8ff47]">
          Course content
        </p>
        <h1 className="mt-1.5 font-syne text-2xl font-extrabold text-white md:text-3xl">
          Car Flipping Playbook
        </h1>
        <p className="mt-1.5 text-sm text-white/40">
          {modules.length} modules &middot;{" "}
          {modules.reduce(
            (acc, m) => acc + Number(m.duration.replace(" min", "")),
            0,
          )}{" "}
          min total
        </p>
      </div>

      {/* Progress bar (static for now) */}
      <div className="mb-8 rounded-2xl border border-white/[0.07] bg-white/3 p-4">
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
            className="rounded-2xl border border-white/[0.07] bg-white/3 px-5 py-1 not-last:border-b-0"
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
              <ul className="mb-2 space-y-2 border-t border-white/5 pt-4">
                {mod.lessons.map((lesson, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/55">
                    <span className="mt-px text-xs font-bold tabular-nums text-white/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {lesson}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
