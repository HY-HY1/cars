import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa";

const navigation = [
  {
    title: "Playbook",
    links: [
      { name: "What You Learn", href: "/#features" },
      { name: "How It Works", href: "/#process" },
      { name: "Success Stories", href: "/#testimonials" },
      { name: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Refund Policy", href: "/refunds" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export function Footer7() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">

          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="mb-5 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Ascend Autos logo"
                width={36}
                height={36}
                className="size-9 rounded-full object-cover"
              />
              <span className="text-xl font-bold tracking-tight">Ascend Autos</span>
            </Link>
                        <div className="mb-4 flex gap-4">
              <a href="https://discord.gg/XjTkKqzg3" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="text-zinc-500 transition hover:text-white">
                <FaDiscord className="h-5 w-5" />
              </a>
              <a href="https://tiktok.com/@yourhandle" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-zinc-500 transition hover:text-white">
                <FaTiktok className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-zinc-500 transition hover:text-white">
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              A step-by-step system for finding undervalued cars and reselling
              for profit in the UK market.
            </p>

          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-10">
            {navigation.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-zinc-400 transition hover:text-white"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-zinc-800 pt-8 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ascendancy Auto. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="/terms" className="transition hover:text-zinc-400">Terms</a>
            <a href="/privacy" className="transition hover:text-zinc-400">Privacy</a>
            <a href="/refunds" className="transition hover:text-zinc-400">Refunds</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
