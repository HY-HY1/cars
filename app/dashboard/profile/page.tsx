import { requireUser } from "@/lib/auth/require-user";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { ProfileForm } from "./profile-form";

export const metadata = { title: "Profile — Dashboard" };

export default async function ProfilePage() {
  const { user } = await requireUser("/dashboard/profile");

  const admin = supabaseAdmin();
  const { data: profile } = await admin
    .from("profiles")
    .select("full_name, created_at")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="mx-auto max-w-2xl p-6 md:p-8">
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8ff47]">
          Account
        </p>
        <h1 className="mt-1 font-syne text-2xl font-extrabold text-white md:text-3xl">
          Profile
        </h1>
      </div>

      {/* Personal information */}
      <section className="mb-4 rounded-2xl border border-white/6 bg-white/2 p-6">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/30">
          Personal information
        </h2>
        <ProfileForm
          initialName={profile?.full_name ?? ""}
          email={user.email ?? ""}
        />
      </section>

      {/* Read-only info */}
      <section className="rounded-2xl border border-white/6 bg-white/2 p-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
          Account details
        </h2>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-white/40">User ID</dt>
            <dd className="font-mono text-xs text-white/30">{user.id.slice(0, 20)}…</dd>
          </div>
          {profile?.created_at && (
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/40">Member since</dt>
              <dd className="text-sm text-white/60">
                {new Date(profile.created_at).toLocaleDateString("en-GB", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </dd>
            </div>
          )}
        </dl>
      </section>
    </div>
  );
}
