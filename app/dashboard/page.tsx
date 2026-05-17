import Link from "next/link";

import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const { user } = await requireUser("/dashboard");
  const email = user.email ?? "";

  const admin = supabaseAdmin();
  const [{ hasAccess, customer }, { data: profile }] = await Promise.all([
    resolveAccess(user.id, email),
    admin.from("profiles").select("full_name, created_at").eq("id", user.id).maybeSingle(),
  ]);

  const displayName = profile?.full_name ?? email.split("@")[0];
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-GB", { month: "long", year: "numeric" })
    : null;

  return (
    <div className="mx-auto max-w-3xl p-6 md:p-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-syne text-2xl font-extrabold text-white md:text-3xl">
          Hey, {displayName}
        </h1>
        <p className="mt-1 text-sm text-white/40">
          {email}{memberSince ? ` · Member since ${memberSince}` : ""}
        </p>
      </div>

      {/* Status banner */}
      {hasAccess ? (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm">✓</span>
          <div>
            <p className="text-sm font-semibold text-emerald-400">Account active</p>
            <p className="text-xs text-white/40">Your purchase is confirmed and all content is unlocked.</p>
          </div>
          <Link href="/dashboard/playbook" className="ml-auto shrink-0 rounded-lg bg-[#e8ff47] px-4 py-1.5 text-xs font-bold text-black transition hover:brightness-110">
            Open Playbook →
          </Link>
        </div>
      ) : (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-sm">⚠</span>
          <div>
            <p className="text-sm font-semibold text-amber-400">No active purchase</p>
            <p className="text-xs text-white/40">Complete your purchase to unlock full access.</p>
          </div>
          <Link href="/product" className="ml-auto shrink-0 rounded-lg bg-white/10 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-white/15">
            Get access →
          </Link>
        </div>
      )}

      {/* Section cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <SectionCard
          href="/dashboard/billing"
          icon="💳"
          title="Billing"
          desc={hasAccess ? "Purchase active" : "No purchase"}
          status={hasAccess ? "active" : "locked"}
        />
        <SectionCard
          href="/dashboard/profile"
          icon="👤"
          title="Profile"
          desc={profile?.full_name ? profile.full_name : "Add your name"}
          status="neutral"
        />
        <SectionCard
          href="/dashboard/security"
          icon="🔒"
          title="Security"
          desc="Password & sessions"
          status="neutral"
        />
      </div>

      {/* Account info */}
      <div className="mt-6 rounded-2xl border border-white/6 bg-white/2 p-5">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
          Account
        </h2>
        <dl className="space-y-3 text-sm">
          <Row label="Email">{email}</Row>
          <Row label="Name">{profile?.full_name ?? <span className="text-white/30 italic">Not set</span>}</Row>
          <Row label="User ID">
            <span className="font-mono text-xs text-white/30">{user.id.slice(0, 16)}…</span>
          </Row>
          {customer?.stripe_customer_id && (
            <Row label="Customer ref">
              <span className="font-mono text-xs text-white/30">{customer.stripe_customer_id}</span>
            </Row>
          )}
        </dl>
      </div>
    </div>
  );
}

function SectionCard({
  href, icon, title, desc, status,
}: {
  href: string; icon: string; title: string; desc: string;
  status: "active" | "locked" | "neutral";
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/6 bg-white/2 p-5 transition hover:border-white/10 hover:bg-white/4"
    >
      <div className="mb-3 text-xl">{icon}</div>
      <p className="text-sm font-semibold text-white/80 group-hover:text-white">{title}</p>
      <p className={`mt-1 text-xs ${
        status === "active" ? "text-emerald-400" :
        status === "locked" ? "text-amber-400" :
        "text-white/35"
      }`}>
        {desc}
      </p>
    </Link>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-white/40">{label}</dt>
      <dd className="font-medium text-white/80">{children}</dd>
    </div>
  );
}
