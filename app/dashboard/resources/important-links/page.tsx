import { ExternalLinkIcon } from "lucide-react";

import { AccessLocked } from "@/components/dashboard/access-locked";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Important Links — Resources" };

// ── Link data ───────────────────────────────────────────────
// Add new links here. Group them into categories.

type LinkItem = {
  title: string;
  description: string;
  href: string;
};

type LinkCategory = {
  id: string;
  icon: string;
  title: string;
  links: LinkItem[];
};

const linkCategories: LinkCategory[] = [
  {
    id: "checks",
    icon: "🔍",
    title: "Vehicle Checks",
    links: [
      {
        title: "DVLA MOT History Checker",
        description: "Full MOT history for any UK registered vehicle — free.",
        href: "https://www.gov.uk/check-mot-history",
      },
      {
        title: "DVLA Vehicle Enquiry Service",
        description: "Check tax status, MOT expiry and basic vehicle details.",
        href: "https://www.vehicleenquiry.service.gov.uk",
      },
      {
        title: "HPI Check",
        description: "Check for outstanding finance, write-offs, stolen status and more.",
        href: "https://www.hpicheck.com",
      },
      {
        title: "Cazana / Motorway Valuation",
        description: "Free vehicle valuation based on real market data.",
        href: "https://www.motorway.co.uk/sell-my-car",
      },
    ],
  },
  {
    id: "sourcing",
    icon: "🔎",
    title: "Sourcing Platforms",
    links: [
      {
        title: "AutoTrader",
        description: "The UK's largest car marketplace. Best for volume and filters.",
        href: "https://www.autotrader.co.uk",
      },
      {
        title: "Facebook Marketplace",
        description: "Private sellers, cash deals, motivated vendors.",
        href: "https://www.facebook.com/marketplace/category/vehicles",
      },
      {
        title: "Gumtree Cars",
        description: "Older stock, less competition, local deals.",
        href: "https://www.gumtree.com/cars",
      },
      {
        title: "Copart UK",
        description: "Salvage and insurance write-off auctions.",
        href: "https://www.copart.co.uk",
      },
      {
        title: "BCA Auctions",
        description: "UK's largest vehicle remarketing company.",
        href: "https://www.bca.co.uk",
      },
    ],
  },
  {
    id: "parts",
    icon: "🔧",
    title: "Parts & Repairs",
    links: [
      {
        title: "eBay Motors",
        description: "Used and new parts — often significantly cheaper than dealers.",
        href: "https://www.ebay.co.uk/b/Car-Parts/bn_7002220971",
      },
      {
        title: "GSF Car Parts",
        description: "Trade-priced parts for most UK vehicles.",
        href: "https://www.gsfcarparts.com",
      },
      {
        title: "Euro Car Parts",
        description: "Next-day delivery on a huge range of parts.",
        href: "https://www.eurocarparts.com",
      },
      {
        title: "My Scrap Car (Scrapyards)",
        description: "Find local scrapyards to source cheap used parts.",
        href: "https://www.myscrapcar.co.uk/scrap-yards",
      },
    ],
  },
  {
    id: "insurance",
    icon: "🛡️",
    title: "Insurance & Transport",
    links: [
      {
        title: "Dayinsure",
        description: "Temporary car insurance from 1 hour to 28 days.",
        href: "https://www.dayinsure.com",
      },
      {
        title: "Veygo",
        description: "Flexible short-term car insurance for test drives and transit.",
        href: "https://www.veygo.com",
      },
      {
        title: "uShip UK",
        description: "Compare quotes for vehicle transport across the UK.",
        href: "https://www.uship.com/uk",
      },
    ],
  },
  {
    id: "legal",
    icon: "⚖️",
    title: "Legal & Tax",
    links: [
      {
        title: "HMRC — Self Assessment",
        description: "Register for self assessment if you flip cars as a business.",
        href: "https://www.gov.uk/self-assessment-tax-returns",
      },
      {
        title: "DVLA — Transfer Ownership (V5C)",
        description: "Official guide to transferring vehicle ownership after a sale.",
        href: "https://www.gov.uk/sold-bought-vehicle",
      },
      {
        title: "Citizens Advice — Buying and Selling Cars",
        description: "Your legal rights as a private seller in the UK.",
        href: "https://www.citizensadvice.org.uk/consumer/cars/buying-a-car",
      },
    ],
  },
];

// ── Page ────────────────────────────────────────────────────

export default async function ImportantLinksPage() {
  const { user } = await requireUser("/dashboard/resources/important-links");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  const totalLinks = linkCategories.reduce((acc, c) => acc + c.links.length, 0);

  return (
    <div className="max-w-3xl p-6 md:p-8">
      {/* Header */}
      <div className="mb-10 border-b border-white/6 pb-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8ff47]">
          Resources
        </p>
        <h1 className="font-syne text-2xl font-extrabold text-white md:text-3xl">
          Important Links
        </h1>
        <p className="mt-2 text-sm text-white/40">
          {linkCategories.length} categories &middot; {totalLinks} links — every tool and platform you&apos;ll use regularly.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {linkCategories.map((cat) => (
          <div key={cat.id} id={cat.id} className="scroll-mt-6">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="text-lg">{cat.icon}</span>
              <h2 className="font-syne text-base font-bold text-white">{cat.title}</h2>
            </div>

            <div className="space-y-2">
              {cat.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-white/7 bg-white/3 px-4 py-3.5 transition-all hover:border-white/12 hover:bg-white/5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white/80 group-hover:text-white">
                      {link.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/35">
                      {link.description}
                    </p>
                  </div>
                  <ExternalLinkIcon className="size-3.5 shrink-0 text-white/20 transition-colors group-hover:text-white/50" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
