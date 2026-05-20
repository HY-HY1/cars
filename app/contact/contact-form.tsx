"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitContact } from "@/lib/contact/actions";

const SUBJECTS = [
  "General question",
  "Purchase issue",
  "Technical support",
  "Refund request",
  "Other",
];

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, {});

  if (state.success) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-8 py-10 text-center">
        <p className="mb-2 text-2xl">✓</p>
        <p className="mb-1 text-base font-semibold text-zinc-100">Message sent</p>
        <p className="text-sm text-zinc-400">We&apos;ll get back to you as soon as possible.</p>
        <Button
          type="button"
          variant="ghost"
          className="mt-6"
          onClick={() => window.location.reload()}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Select name="subject">
          <SelectTrigger id="subject">
            <SelectValue placeholder="Select a topic…" />
          </SelectTrigger>
          <SelectContent>
            {SUBJECTS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
        />
      </div>

      {state.error ? <p className="text-sm text-red-400">{state.error}</p> : null}

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
