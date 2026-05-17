import React from "react";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Playbook",
    links: [
      { name: "What You Learn", href: "#features" },
      { name: "How It Works", href: "#process" },
      { name: "Success Stories", href: "#testimonials" },
      { name: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Beginner Guide", href: "#" },
      { name: "Car Checklist", href: "#" },
      { name: "Profit Calculator", href: "#" },
      { name: "Support", href: "#" },
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

const defaultSocialLinks = [
  {
    icon: <FaInstagram className="size-5" />,
    href: "#",
    label: "Instagram",
  },
  {
    icon: <FaTiktok className="size-5" />,
    href: "#",
    label: "TikTok",
  },
  {
    icon: <FaYoutube className="size-5" />,
    href: "#",
    label: "YouTube",
  },
  {
    icon: <FaDiscord className="size-5" />,
    href: "#",
    label: "Discord",
  },
];

const defaultLegalLinks = [
  { name: "Terms", href: "/terms" },
  { name: "Privacy", href: "/privacy" },
  { name: "Refunds", href: "/refunds" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "Ascendancy Auto logo",
    title: "Ascend Autos",
  },
  sections = defaultSections,
  description = "Learn how to source, negotiate, and flip cars profitably with a step-by-step system built for beginners in the UK.",
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} Ascendancy Auto. All rights reserved.`,
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <footer className="border-t bg-black py-20 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between">
          {/* Left Side */}
          <div className="max-w-md">
            <a
              href={logo.url}
              className="mb-5 flex items-center gap-3"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                className="h-10 w-10 rounded-full object-cover"
              />
              <h2 className="text-2xl font-bold tracking-tight">
                {logo.title}
              </h2>
            </a>

            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              {description}
            </p>

            <ul className="flex items-center gap-5 text-zinc-400">
              {socialLinks.map((social, idx) => (
                <li key={idx}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="transition hover:text-white"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
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

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-zinc-800 pt-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>{copyright}</p>

          <ul className="flex flex-wrap gap-5">
            {legalLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};