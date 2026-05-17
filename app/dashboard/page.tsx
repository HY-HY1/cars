import Link from "next/link";

import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";
import { normalizeEmail } from "@/lib/customers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const { user } = await requireUser("/dashboard");
  const email = user.email ?? "";
  const normalized = normalizeEmail(email);

  const admin = supabaseAdmin();

  const [{ hasAccess, customer }, { data: onboarding }] = await Promise.all([
    resolveAccess(user.id, email),
    admin
      .from("onboarding")
      .select("name, completed_at")
      .eq("email", normalized)
      .not("completed_at", "is", null)
      .maybeSingle(),
  ]);

  const displayName = onboarding?.name ?? email.split("@")[0];
  const onboardingDone = !!onboarding?.completed_at;

  return (
    <div className="mx-auto max-w-3xl p-6 md:p-8">

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-syne text-2xl font-extrabold text-white md:text-3xl">
          Hey, {displayName}
        </h1>
        <p className="mt-1 text-sm text-white/40">{email}</p>
      </div>

      {/* Purchase status banner */}
      {hasAccess ? (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm">✓</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-emerald-400">Account active</p>
            <p className="text-xs text-white/40">Your purchase is confirmed and all content is unlocked.</p>
          </div>
          <Link
            href="/dashboard/playbook"
            className="shrink-0 rounded-lg bg-[#e8ff47] px-4 py-1.5 text-xs font-bold text-black transition hover:brightness-110"
          >
            Open Playbook →
          </Link>
        </div>
      ) : (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-sm">⚠</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-400">No active purchase</p>
            <p className="text-xs text-white/40">Complete your purchase to unlock full access.</p>
          </div>
          <Link
            href="/product"
            className="shrink-0 rounded-lg bg-white/10 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-white/15"
          >
            Get access →
          </Link>
        </div>
      )}

      {/* Onboarding card */}
      <div className={`mb-4 rounded-xl border px-4 py-4 ${
        onboardingDone
          ? "border-white/6 bg-white/2"
          : "border-[rgba(232,255,71,0.15)] bg-[rgba(232,255,71,0.04)]"
      }`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-lg">{onboardingDone ? "✅" : "📋"}</span>
            <div>
              <p className={`text-sm font-semibold ${onboardingDone ? "text-white/70" : "text-white"}`}>
                {onboardingDone ? "Profile complete" : "Complete your profile"}
              </p>
              <p className="mt-0.5 text-xs text-white/40">
                {onboardingDone
                  ? `Hi ${onboarding?.name ?? "there"} — thanks for filling this in. We use it to personalise your tips.`
                  : "Tell us about your goals and situation so we can send you relevant tips and suggestions."}
              </p>
            </div>
          </div>

          {onboardingDone ? (
            <Link
              href={`/onboarding?email=${encodeURIComponent(email)}`}
              className="shrink-0 text-xs text-white/30 underline underline-offset-2 hover:text-white/60"
            >
              Update answers
            </Link>
          ) : (
            <Link
              href={`/onboarding?email=${encodeURIComponent(email)}`}
              className="shrink-0 rounded-lg bg-[#e8ff47] px-4 py-1.5 text-xs font-bold text-black transition hover:brightness-110"
            >
              Start now →
            </Link>
          )}
        </div>
      </div>

      {/* Section cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <SectionCard href="/dashboard/billing" icon="💳" title="Billing"
          desc={hasAccess ? "Purchase active" : "No purchase"}
          status={hasAccess ? "active" : "locked"} />
        <SectionCard href="/dashboard/profile" icon="👤" title="Profile"
          desc={onboardingDone ? (onboarding?.name ?? "View profile") : "Not set up"}
          status="neutral" />
        <SectionCard href="/dashboard/security" icon="🔒" title="Security"
          desc="Password & sessions" status="neutral" />
      </div>

      {/* Account info */}
      <div className="mt-4 rounded-2xl border border-white/6 bg-white/2 p-5">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
          Account
        </h2>
        <dl className="space-y-3 text-sm">
          <Row label="Email">{email}</Row>
          <Row label="Name">
            {onboarding?.name
              ? onboarding.name
              : <span className="italic text-white/25">Not set — complete onboarding</span>}
          </Row>
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

function SectionCard({ href, icon, title, desc, status }: {
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
        status === "locked" ? "text-amber-400" : "text-white/35"
      }`}>{desc}</p>
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
