"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { signOut } from "@/lib/auth/actions";

type NavItem = {
  label: string;
  href: string;
  exact?: boolean;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
    exact: true,
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Billing",
    href: "/dashboard/billing",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: "Security",
    href: "/dashboard/security",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export function Sidebar({ email, name }: { email: string; name: string | null }) {
  const pathname = usePathname();
  const displayName = name ?? email.split("@")[0];

  return (
    <aside className="flex h-full w-56 flex-col border-r border-white/6 bg-[#0d0d0d]">
      {/* Brand */}
      <div className="flex h-14 items-center gap-2.5 border-b border-white/6 px-5">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#e8ff47] text-[10px] font-black text-black">
          CF
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white/80">FlipPro</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">
          Account
        </p>
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[rgba(232,255,71,0.08)] text-[#e8ff47]"
                    : "text-white/50 hover:bg-white/4 hover:text-white/80"
                }`}
              >
                <span className={isActive ? "text-[#e8ff47]" : "text-white/30"}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Playbook shortcut */}
        <div className="mt-6">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">
            Course
          </p>
          <Link
            href="/dashboard/playbook"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/50 transition-all hover:bg-white/4 hover:text-white/80"
          >
            <span className="text-white/30">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            Playbook
          </Link>
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-white/6 px-4 py-4">
        <div className="mb-3 min-w-0">
          <p className="truncate text-xs font-medium text-white/70">{displayName}</p>
          <p className="truncate text-[11px] text-white/30">{email}</p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-white/40 transition-colors hover:bg-white/4 hover:text-white/70"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
