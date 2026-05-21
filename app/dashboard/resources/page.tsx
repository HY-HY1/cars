import Link from "next/link";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";

import { AccessLocked } from "@/components/dashboard/access-locked";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Resources — Dashboard" };

// ── Resource data ───────────────────────────────────────────
// Add new resources here. href can be a /downloads/ path or external URL.

type ResourceType = "pdf" | "spreadsheet" | "template" | "checklist" | "link";

type Resource = {
  title: string;
  description: string;
  href: string;
  type: ResourceType;
};

type Category = {
  id: string;
  icon: string;
  title: string;
  description: string;
  resources: Resource[];
};

const categories: Category[] = [
  {
    id: "checklists",
    icon: "✅",
    title: "Checklists",
    description: "Print-ready checklists to use on viewings and before you buy.",
    resources: [
      {
        title: "40-Point Inspection Checklist",
        description: "Walk through every check at a viewing. Never miss a red flag.",
        href: "/downloads/inspection-checklist.pdf",
        type: "checklist",
      },
      {
        title: "Pre-Purchase Due Diligence Checklist",
        description: "MOT history, HPI, service records — everything to verify before buying.",
        href: "/downloads/pre-purchase-checklist.pdf",
        type: "checklist",
      },
    ],
  },
  {
    id: "calculators",
    icon: "📊",
    title: "Calculators",
    description: "Spreadsheets to work out profit, repair costs and ROI before you commit.",
    resources: [
      {
        title: "Profit Calculator",
        description: "Enter purchase price, repair costs and target sale price — see your margin.",
        href: "/downloads/profit-calculator.xlsx",
        type: "spreadsheet",
      },
      {
        title: "Repair Cost Estimator",
        description: "Track and estimate likely repair costs on a specific car.",
        href: "/downloads/repair-estimator.xlsx",
        type: "spreadsheet",
      },
    ],
  },
  {
    id: "scripts",
    icon: "💬",
    title: "Scripts & Templates",
    description: "Copy-paste messages and templates that save time and get results.",
    resources: [
      {
        title: "Negotiation Scripts",
        description: "Opening messages, counter-offer responses, and walk-away scripts.",
        href: "/downloads/negotiation-scripts.pdf",
        type: "template",
      },
      {
        title: "Listing Template",
        description: "Proven structure for AutoTrader, Facebook Marketplace and Gumtree listings.",
        href: "/downloads/listing-template.pdf",
        type: "template",
      },
    ],
  },
  {
    id: "guides",
    icon: "📖",
    title: "Guides & References",
    description: "Reference material to keep on hand while sourcing and selling.",
    resources: [
      {
        title: "UK Sourcing Guide",
        description: "Platform-by-platform strategies for finding undervalued stock.",
        href: "/downloads/sourcing-guide.pdf",
        type: "pdf",
      },
      {
        title: "Common Repair Cost Reference",
        description: "Typical UK mechanic and bodyshop prices for the most common repairs.",
        href: "/downloads/repair-costs.pdf",
        type: "pdf",
      },
      {
        title: "Free MOT History Checker",
        description: "Check any UK car's full MOT history — official DVLA tool.",
        href: "https://www.gov.uk/check-mot-history",
        type: "link",
      },
      {
        title: "DVLA Vehicle Enquiry",
        description: "Verify tax, MOT and basic vehicle details from the DVLA.",
        href: "https://www.vehicleenquiry.service.gov.uk",
        type: "link",
      },
    ],
  },
];

const typeIcon: Record<ResourceType, string> = {
  pdf:         "📄",
  spreadsheet: "📊",
  template:    "📝",
  checklist:   "✅",
  link:        "🔗",
};

// ── Page ────────────────────────────────────────────────────

export default async function ResourcesPage() {
  const { user } = await requireUser("/dashboard/resources");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  const totalResources = categories.reduce((acc, c) => acc + c.resources.length, 0);

  return (
    <div className="max-w-3xl p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8ff47]">
          Downloads & references
        </p>
        <h1 className="mt-1.5 font-syne text-2xl font-extrabold text-white md:text-3xl">
          Resources
        </h1>
        <p className="mt-1.5 text-sm text-white/40">
          {categories.length} categories &middot; {totalResources} resources
        </p>
      </div>

      {/* Categories accordion */}
      <Accordion className="space-y-3">
        {categories.map((cat) => (
          <AccordionItem
            key={cat.id}
            value={cat.id}
            id={cat.id}
            className="scroll-mt-6 rounded-2xl border border-white/7 bg-white/3 px-5 py-1"
          >
            <AccordionTrigger className="py-4 hover:no-underline">
              <div className="flex items-center gap-4 text-left">
                <span className="text-xl">{cat.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white/90">{cat.title}</p>
                  <p className="mt-0.5 text-xs text-white/35">
                    {cat.resources.length} {cat.resources.length === 1 ? "resource" : "resources"} &middot; {cat.description}
                  </p>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <ul className="mb-3 space-y-2 border-t border-white/5 pt-4">
                {cat.resources.map((res) => {
                  const isExternal = res.href.startsWith("http");
                  return (
                    <li key={res.title}>
                      <Link
                        href={res.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-3 rounded-xl border border-white/6 bg-white/3 px-4 py-3 transition-all hover:border-white/12 hover:bg-white/5"
                      >
                        <span className="text-lg">{typeIcon[res.type]}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white/80 group-hover:text-white">
                            {res.title}
                          </p>
                          <p className="mt-0.5 text-xs text-white/35">{res.description}</p>
                        </div>
                        {isExternal ? (
                          <ExternalLinkIcon className="size-3.5 shrink-0 text-white/20 group-hover:text-white/40" />
                        ) : (
                          <DownloadIcon className="size-3.5 shrink-0 text-white/20 group-hover:text-white/40" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
