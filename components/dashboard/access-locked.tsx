import Link from "next/link";

export function AccessLocked() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/4">
          <svg className="h-7 w-7 text-white/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>

        <h2 className="mb-2 text-lg font-semibold text-white">Access Locked</h2>
        <p className="mb-6 text-sm leading-relaxed text-white/45">
          You don&apos;t have an active purchase. Get the Car Flipping Playbook to unlock full access.
        </p>

        <Link
          href="/product"
          className="inline-block rounded-xl bg-[#e8ff47] px-6 py-2.5 text-sm font-bold text-[#0a0a0a] transition hover:brightness-110 active:scale-95"
        >
          Get instant access
        </Link>

        <p className="mt-4 text-xs text-white/25">
          Already purchased?{" "}
          <Link href="/login" className="underline underline-offset-2 hover:text-white/50">
            Log in with the same email
          </Link>
        </p>
      </div>
    </div>
  );
}
