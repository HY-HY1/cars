import Link from "next/link";

import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";
import { getOnboardingStatus } from "@/lib/onboarding/access";
import { signOut } from "@/lib/auth/actions";

export const metadata = { title: "Settings — Dashboard" };

export default async function SettingsPage() {
  const { user } = await requireUser("/dashboard/settings");
  const email = user.email ?? "";

  const [{ hasAccess, customer }, onboarding] = await Promise.all([
    resolveAccess(user.id, email),
    getOnboardingStatus(email),
  ]);

  const displayName = email.split("@")[0];

  return (
    <div className="p-6 md:p-8 max-w-2xl space-y-6">
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8ff47]">
          Account
        </p>
        <h1 className="mt-1.5 font-syne text-2xl font-extrabold text-white md:text-3xl">
          Settings
        </h1>
      </div>

      {/* Account info */}
      <section className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
          Account details
        </h2>
        <div className="space-y-4">
          <Row label="Display name" value={displayName} />
          <Row label="Email" value={email} />
          <Row
            label="Account ID"
            value={
              <span className="font-mono text-xs text-white/30">{user.id.slice(0, 16)}…</span>
            }
          />
        </div>
      </section>

      {/* Purchase status */}
      <section className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
          Purchase
        </h2>
        <div className="space-y-4">
          <Row
            label="Status"
            value={
              hasAccess ? (
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              ) : (
                <span className="text-white/40">No active purchase</span>
              )
            }
          />
          {customer?.stripe_customer_id && (
            <Row
              label="Stripe customer"
              value={
                <span className="font-mono text-xs text-white/30">
                  {customer.stripe_customer_id}
                </span>
              }
            />
          )}
        </div>

        {!hasAccess && (
          <div className="mt-4 border-t border-white/[0.06] pt-4">
            <Link
              href="/product"
              className="inline-block rounded-xl bg-[#e8ff47] px-5 py-2 text-sm font-bold text-[#0a0a0a] transition hover:brightness-110"
            >
              Get instant access →
            </Link>
          </div>
        )}
      </section>

      {/* Profile / Onboarding */}
      <section className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
          Your profile
        </h2>
        <div className="space-y-4">
          <Row
            label="Onboarding"
            value={
              onboarding.completed ? (
                <span className="text-emerald-400">Complete</span>
              ) : (
                <span className="text-amber-400">Not completed</span>
              )
            }
          />
          {onboarding.completedAt && (
            <Row
              label="Completed"
              value={new Date(onboarding.completedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
          )}
        </div>
        <div className="mt-4 border-t border-white/[0.06] pt-4">
          <Link
            href={`/onboarding?email=${encodeURIComponent(email)}`}
            className="text-sm font-medium text-[#e8ff47] hover:underline underline-offset-2"
          >
            {onboarding.completed ? "Update your profile →" : "Complete onboarding →"}
          </Link>
        </div>
      </section>

      {/* Danger zone */}
      <section className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
          Session
        </h2>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-xl border border-white/[0.08] px-5 py-2 text-sm font-medium text-white/50 transition hover:border-white/20 hover:text-white/80"
          >
            Log out of this account
          </button>
        </form>
      </section>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-white/40">{label}</span>
      <span className="font-medium text-white/80">{value}</span>
    </div>
  );
}
