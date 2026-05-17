import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";
import { BillingPortalButton } from "./portal-button";

export const metadata = { title: "Billing — Dashboard" };

export default async function BillingPage() {
  const { user } = await requireUser("/dashboard/billing");
  const { hasAccess, source, customer } = await resolveAccess(user.id, user.email ?? "");

  const purchaseDate = customer?.created_at
    ? new Date(customer.created_at).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      })
    : null;

  return (
    <div className="mx-auto max-w-2xl p-6 md:p-8">
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8ff47]">
          Account
        </p>
        <h1 className="mt-1 font-syne text-2xl font-extrabold text-white md:text-3xl">
          Billing
        </h1>
      </div>

      {/* Status card */}
      <section className="mb-4 rounded-2xl border border-white/6 bg-white/2 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/30">
              Purchase status
            </p>
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${hasAccess ? "bg-emerald-400" : "bg-amber-400"}`} />
              <span className={`text-lg font-semibold ${hasAccess ? "text-emerald-400" : "text-amber-400"}`}>
                {hasAccess ? "Active" : "Inactive"}
              </span>
            </div>
            {hasAccess && (
              <p className="mt-1 text-xs text-white/35">
                Car Flipping Playbook · One-time purchase
              </p>
            )}
          </div>
          {hasAccess && <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">Paid</span>}
        </div>

        {hasAccess && (
          <dl className="mt-5 space-y-3 border-t border-white/6 pt-5 text-sm">
            {purchaseDate && (
              <Row label="Purchase date" value={purchaseDate} />
            )}
            {customer?.stripe_customer_id && (
              <Row
                label="Customer ref"
                value={
                  <span className="font-mono text-xs text-white/40">
                    {customer.stripe_customer_id}
                  </span>
                }
              />
            )}
            <Row
              label="Verified via"
              value={
                <span className="capitalize text-white/50">
                  {source.replace(/_/g, " ")}
                </span>
              }
            />
          </dl>
        )}
      </section>

      {/* Manage billing */}
      {hasAccess ? (
        <section className="rounded-2xl border border-white/6 bg-white/2 p-6">
          <h2 className="mb-1 text-sm font-semibold text-white">Manage billing</h2>
          <p className="mb-4 text-xs leading-relaxed text-white/40">
            View receipts, update your payment method, or download invoices via
            the Stripe customer portal.
          </p>
          <BillingPortalButton />
        </section>
      ) : (
        <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
          <h2 className="mb-1 text-sm font-semibold text-amber-400">No active purchase</h2>
          <p className="mb-4 text-xs leading-relaxed text-white/40">
            You don&apos;t have an active purchase. Get the Car Flipping Playbook to unlock full access.
          </p>
          <a
            href="/product"
            className="inline-block rounded-xl bg-[#e8ff47] px-5 py-2 text-sm font-bold text-black transition hover:brightness-110"
          >
            Get instant access →
          </a>
        </section>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-white/40">{label}</dt>
      <dd className="font-medium text-white/70">{value}</dd>
    </div>
  );
}
