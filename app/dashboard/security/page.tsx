import { requireUser } from "@/lib/auth/require-user";
import { ResetPasswordButton } from "./reset-button";
import { signOut } from "@/lib/auth/actions";

export const metadata = { title: "Security — Dashboard" };

export default async function SecurityPage() {
  const { user } = await requireUser("/dashboard/security");

  return (
    <div className="mx-auto max-w-2xl p-6 md:p-8">
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e8ff47]">
          Account
        </p>
        <h1 className="mt-1 font-syne text-2xl font-extrabold text-white md:text-3xl">
          Security
        </h1>
      </div>

      {/* Password */}
      <section className="mb-4 rounded-2xl border border-white/6 bg-white/2 p-6">
        <h2 className="mb-1 text-sm font-semibold text-white">Password</h2>
        <p className="mb-5 text-xs leading-relaxed text-white/40">
          We&apos;ll send a reset link to <strong className="text-white/60">{user.email}</strong>.
          If you signed up with a magic link and have never set a password, this
          will let you create one.
        </p>
        <ResetPasswordButton />
      </section>

      {/* Sessions */}
      <section className="mb-4 rounded-2xl border border-white/6 bg-white/2 p-6">
        <h2 className="mb-1 text-sm font-semibold text-white">Sessions</h2>
        <p className="mb-5 text-xs leading-relaxed text-white/40">
          Logging out will end your current session. You can log back in with
          the email code at any time.
        </p>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-xl border border-white/8 px-5 py-2 text-sm font-medium text-white/60 transition hover:border-white/15 hover:text-white/90"
          >
            Log out
          </button>
        </form>
      </section>

      {/* Account info */}
      <section className="rounded-2xl border border-white/6 bg-white/2 p-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
          Authentication
        </h2>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-white/40">Login method</dt>
            <dd className="text-white/60">Email code (OTP)</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-white/40">Email</dt>
            <dd className="text-white/60">{user.email}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-white/40">Last sign in</dt>
            <dd className="text-white/60">
              {user.last_sign_in_at
                ? new Date(user.last_sign_in_at).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  })
                : "—"}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
