import { requireUser } from "@/lib/auth/require-user";
import { normalizeEmail } from "@/lib/customers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ProfileForm } from "./profile-form";

export const metadata = { title: "Profile — Dashboard" };

export default async function ProfilePage() {
  const { user } = await requireUser("/dashboard/profile");

  const admin = supabaseAdmin();
  const { data: onboarding } = await admin
    .from("onboarding")
    .select("name, age_range, employment, goal, completed_at")
    .eq("email", normalizeEmail(user.email ?? ""))
    .not("completed_at", "is", null)
    .maybeSingle();

  return (
    <div className="mx-auto max-w-2xl p-6 md:p-8">
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8ff47]">Account</p>
        <h1 className="mt-1 font-syne text-2xl font-extrabold text-white md:text-3xl">Profile</h1>
      </div>

      {onboarding ? (
        <>
          {/* Edit name */}
          <section className="mb-4 rounded-2xl border border-white/6 bg-white/2 p-6">
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/30">
              Personal information
            </h2>
            <ProfileForm initialName={onboarding.name ?? ""} email={user.email ?? ""} />
          </section>

          {/* Onboarding summary — read-only */}
          <section className="rounded-2xl border border-white/6 bg-white/2 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30">
                Onboarding answers
              </h2>
              <a
                href={`/onboarding?email=${encodeURIComponent(user.email ?? "")}`}
                className="text-xs text-white/30 underline underline-offset-2 hover:text-white/60"
              >
                Update
              </a>
            </div>
            <dl className="space-y-3 text-sm">
              {onboarding.age_range && (
                <Row label="Age range">{onboarding.age_range.replace(/-/g, "–")}</Row>
              )}
              {onboarding.employment && (
                <Row label="Employment">{onboarding.employment.replace(/_/g, " ")}</Row>
              )}
              {onboarding.goal && (
                <Row label="Goal">{onboarding.goal.replace(/_/g, " ")}</Row>
              )}
              {onboarding.completed_at && (
                <Row label="Completed">
                  {new Date(onboarding.completed_at).toLocaleDateString("en-GB", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </Row>
              )}
            </dl>
          </section>
        </>
      ) : (
        /* Not yet onboarded */
        <section className="rounded-2xl border border-[rgba(232,255,71,0.15)] bg-[rgba(232,255,71,0.04)] p-6 text-center">
          <p className="mb-2 text-sm font-semibold text-white">No profile yet</p>
          <p className="mb-5 text-xs text-white/45">
            Complete the onboarding questionnaire to set up your profile and get personalised tips.
          </p>
          <a
            href={`/onboarding?email=${encodeURIComponent(user.email ?? "")}`}
            className="inline-block rounded-xl bg-[#e8ff47] px-6 py-2.5 text-sm font-bold text-black transition hover:brightness-110"
          >
            Complete onboarding →
          </a>
        </section>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="capitalize text-white/40">{label}</dt>
      <dd className="capitalize text-white/70">{children}</dd>
    </div>
  );
}
