import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#e8ff47]">
        404
      </p>
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white">
        Page not found
      </h1>
      <p className="mb-10 max-w-sm text-sm leading-relaxed text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-xl bg-[#e8ff47] px-6 py-3 text-sm font-bold text-black transition hover:brightness-110 active:scale-95"
        >
          Back to home
        </Link>
        <Link
          href="/contact"
          className="rounded-xl border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200"
        >
          Contact support
        </Link>
      </div>
    </div>
  );
}
