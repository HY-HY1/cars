import { ExternalLinkIcon } from "lucide-react";

import { AccessLocked } from "@/components/dashboard/access-locked";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Tools & Resources — Dashboard" };

// ── Data ────────────────────────────────────────────────────

type ToolLink = {
  title: string;
  url: string;
  description: string;
};

type Section = {
  id: string;
  icon: string;
  label: string;       // short — for sticky nav
  title: string;       // full — for section heading
  subtitle: string;    // after the dash
  links: ToolLink[];
};

const sections: Section[] = [
  {
    id: "marketplaces",
    icon: "🔎",
    label: "Marketplaces",
    title: "Marketplaces",
    subtitle: "Finding Cars",
    links: [
      { title: "Facebook Marketplace", url: "https://www.facebook.com/marketplace",     description: "Main source for private undervalued cars"      },
      { title: "AutoTrader",           url: "https://www.autotrader.co.uk",              description: "Retail listings and price benchmarking"         },
      { title: "Gumtree Cars",         url: "https://www.gumtree.com/cars",              description: "Mixed quality, occasional bargains"             },
      { title: "eBay Motors UK",       url: "https://www.ebay.co.uk/motors",             description: "Auctions and private listings"                  },
    ],
  },
  {
    id: "auctions",
    icon: "🏷️",
    label: "Auction Houses",
    title: "Auction Houses",
    subtitle: "High Profit Deals",
    links: [
      { title: "ASM Auto Auctions", url: "https://auctions.asm-autos.co.uk", description: "Salvage and trade stock, good for flips"         },
      { title: "Copart UK",         url: "https://www.copart.co.uk",         description: "Category S/N salvage vehicles"                   },
      { title: "BCA Auctions",      url: "https://www.bca.co.uk",            description: "Dealer-only stock, higher competition"           },
      { title: "Manheim UK",        url: "https://www.manheim.co.uk",        description: "Trade auctions requiring access"                 },
    ],
  },
  {
    id: "history",
    icon: "🔍",
    label: "History Checks",
    title: "Vehicle History Checks",
    subtitle: "Due Diligence",
    links: [
      { title: "GOV MOT Check",    url: "https://www.gov.uk/check-mot-history",           description: "Free MOT history and mileage tracking"   },
      { title: "HPI Check",        url: "https://www.hpicheck.com",                       description: "Finance, theft, and write-off checks"    },
      { title: "Total Car Check",  url: "https://totalcarcheck.co.uk",                    description: "Full vehicle history reports"            },
      { title: "CarVertical",      url: "https://www.carvertical.com",                    description: "VIN-based history reports"               },
    ],
  },
  {
    id: "valuations",
    icon: "💷",
    label: "Valuations",
    title: "Valuation Tools",
    subtitle: "Pricing Cars Correctly",
    links: [
      { title: "CAP HPI",           url: "https://www.cap-hpi.com",                      description: "Trade valuations used by the industry"   },
      { title: "WhatCar Valuation", url: "https://www.whatcar.com/car-valuation",         description: "Retail pricing estimates"                },
      { title: "Parkers",           url: "https://www.parkers.co.uk",                     description: "Specs, valuations, running costs"        },
    ],
  },
  {
    id: "legal",
    icon: "⚖️",
    label: "Legal & DVLA",
    title: "Legal & DVLA Tools",
    subtitle: "Official Government Services",
    links: [
      { title: "DVLA Vehicle Info",  url: "https://www.gov.uk/get-vehicle-information-from-dvla", description: "Tax, MOT, registration data"   },
      { title: "Vehicle Tax Check",  url: "https://www.gov.uk/check-vehicle-tax",                 description: "Tax status confirmation"        },
    ],
  },
  {
    id: "transport",
    icon: "🚗",
    label: "Transport & Insurance",
    title: "Transport & Insurance",
    subtitle: "Moving Cars Legally",
    links: [
      { title: "Tempcover",              url: "https://www.tempcover.com",                                   description: "Temporary car insurance"           },
      { title: "Cuvva",                  url: "https://www.cuvva.com",                                       description: "Hourly/daily insurance cover"       },
      { title: "AA Vehicle Inspections", url: "https://www.theaa.com/vehicle-inspection",                   description: "Pre-purchase inspections"          },
      { title: "RAC Vehicle Inspections",url: "https://www.rac.co.uk/buying-a-car/vehicle-inspections",     description: "Alternative inspection service"    },
    ],
  },
  {
    id: "research",
    icon: "📖",
    label: "Research",
    title: "Research & Reliability",
    subtitle: "Know Before You Buy",
    links: [
      { title: "Honest John",    url: "https://www.honestjohn.co.uk",  description: "Real-world issues and reliability reviews"  },
      { title: "Parkers Reviews",url: "https://www.parkers.co.uk",     description: "Specs and ownership costs"                  },
      { title: "Check Reg",      url: "https://www.checkreg.net",      description: "Vehicle specification lookup"               },
    ],
  },
];

function hostname(url: string) {
  try { return new URL(url).hostname.replace("www.", ""); }
  catch { return url; }
}

const totalLinks = sections.reduce((acc, s) => acc + s.links.length, 0);

// ── Page ────────────────────────────────────────────────────

export default async function ToolsPage() {
  const { user } = await requireUser("/dashboard/resources/tools");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <div className="min-h-screen p-6 md:p-8">

      {/* Header */}
      <div className="mb-10 max-w-2xl border-b border-white/6 pb-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8ff47]">
          Resources
        </p>
        <h1 className="font-syne text-2xl font-extrabold text-white md:text-3xl">
          Tools & Resources
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-white/40">
          All the essential websites you&apos;ll use to find, check, value and sell cars.
          <span className="ml-2 font-mono text-[11px] text-white/20">{sections.length} categories · {totalLinks} links</span>
        </p>
      </div>

      {/* Two-column layout on desktop */}
      <div className="flex gap-12">

        {/* Sticky sidebar nav — desktop only */}
        <aside className="hidden w-44 shrink-0 lg:block">
          <div className="sticky top-8">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/25">
              Sections
            </p>
            <nav className="space-y-0.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-white/40 transition-colors hover:bg-white/4 hover:text-white/80"
                >
                  <span className="text-sm">{s.icon}</span>
                  <span>{s.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1 space-y-12">
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-8">

              {/* Section header */}
              <div className="mb-5 flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg">
                  {section.icon}
                </div>
                <div>
                  <h2 className="font-syne text-base font-bold text-white">
                    {section.title}
                  </h2>
                  <p className="text-xs text-white/35">{section.subtitle} · {section.links.length} links</p>
                </div>
              </div>

              {/* Link cards — 2 col on md+ */}
              <div className="grid gap-2 md:grid-cols-2">
                {section.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 rounded-xl border border-white/7 bg-[#111] px-4 py-4 transition-all hover:border-[rgba(232,255,71,0.18)] hover:bg-[#151515]"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white/85 transition-colors group-hover:text-white">
                        {link.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-white/40">
                        {link.description}
                      </p>
                      <p className="mt-2 font-mono text-[10px] text-white/20">
                        {hostname(link.url)}
                      </p>
                    </div>
                    <ExternalLinkIcon className="mt-0.5 size-3.5 shrink-0 text-white/15 transition-colors group-hover:text-[#e8ff47]/60" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
