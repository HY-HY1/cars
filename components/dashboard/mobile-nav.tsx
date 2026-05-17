"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Overview",  href: "/dashboard",          exact: true },
  { label: "Billing",   href: "/dashboard/billing" },
  { label: "Profile",   href: "/dashboard/profile" },
  { label: "Security",  href: "/dashboard/security" },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="flex border-b border-white/6 bg-[#0d0d0d] md:hidden">
      {tabs.map((tab) => {
        const isActive = tab.exact
          ? pathname === tab.href
          : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex-1 py-3 text-center text-xs font-medium transition-colors border-b-2 ${
              isActive
                ? "border-[#e8ff47] text-[#e8ff47]"
                : "border-transparent text-white/40 hover:text-white/70"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
