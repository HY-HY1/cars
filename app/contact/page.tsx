import type { Metadata } from "next";

import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact — Car Flipping Playbook",
  description: "Get in touch with any questions about the Car Flipping Playbook.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-20 text-white">
      <div className="mx-auto max-w-xl">
        <div className="mb-10 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8ff47]">
            Get in touch
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Contact us
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            Have a question about the playbook, your purchase, or anything else? Fill in the form
            and we&apos;ll get back to you.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
