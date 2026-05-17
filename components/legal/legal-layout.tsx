import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export interface TocItem {
  id: string;
  title: string;
}

export function LegalPageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">{children}</div>
    </div>
  );
}

export function LegalHeader({
  title,
  subtitle,
  effectiveDate,
  lastUpdated,
}: {
  title: string;
  subtitle?: string;
  effectiveDate: string;
  lastUpdated?: string;
}) {
  return (
    <header className="mb-14">
      <span className="inline-block text-xs font-medium uppercase tracking-widest text-zinc-500 border border-zinc-800 rounded-full px-3 py-1 mb-5">
        Legal
      </span>
      <h1 className="font-syne text-4xl lg:text-5xl font-bold text-zinc-50 mb-4 leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-zinc-400 text-lg leading-7 mb-6 max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
        <span>Effective {effectiveDate}</span>
        {lastUpdated && (
          <>
            <span className="text-zinc-700">·</span>
            <span>Last updated {lastUpdated}</span>
          </>
        )}
      </div>
      <Separator className="mt-8 bg-zinc-800" />
    </header>
  );
}

export function LegalTableOfContents({ items }: { items: TocItem[] }) {
  return (
    <Card className="mb-14 bg-zinc-900 border-0 ring-1 ring-zinc-800">
      <CardHeader className="border-b border-zinc-800 pb-3">
        <CardTitle className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Table of Contents
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ol className="grid sm:grid-cols-2 gap-y-2 gap-x-8">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="flex items-start gap-2.5 text-sm text-zinc-400 hover:text-zinc-50 transition-colors group"
              >
                <span className="font-mono text-zinc-600 text-xs pt-0.5 shrink-0 group-hover:text-zinc-500 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-mono text-sm text-zinc-600 shrink-0 select-none">
          {String(number).padStart(2, "0")}
        </span>
        <h2 className="font-syne text-xl font-bold text-zinc-50">{title}</h2>
      </div>
      <div className="pl-9 space-y-4">{children}</div>
      <Separator className="mt-10 bg-zinc-900" />
    </section>
  );
}

export function LegalSubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-zinc-200 font-semibold text-sm">{title}</h3>
      {children}
    </div>
  );
}

export function LegalBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-zinc-400 leading-7 text-sm", className)}>
      {children}
    </p>
  );
}

export function LegalList({
  items,
  ordered = false,
}: {
  items: React.ReactNode[];
  ordered?: boolean;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={cn(
        "text-zinc-400 text-sm leading-7 space-y-1.5 pl-4",
        ordered ? "list-decimal" : "list-disc"
      )}
    >
      {items.map((item, i) => (
        <li key={i} className="pl-1">
          {item}
        </li>
      ))}
    </Tag>
  );
}

export function LegalCallout({
  title,
  children,
  variant = "default",
}: {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "warning" | "info";
}) {
  const styles = {
    default: "border-l-zinc-600 bg-zinc-900/60",
    warning: "border-l-amber-500/60 bg-amber-950/20",
    info: "border-l-blue-500/60 bg-blue-950/20",
  };

  return (
    <div className={cn("border-l-2 pl-4 py-3 rounded-r-md", styles[variant])}>
      {title && (
        <p className="text-zinc-300 font-semibold text-xs uppercase tracking-wider mb-1.5">
          {title}
        </p>
      )}
      <p className="text-zinc-400 text-sm leading-6">{children}</p>
    </div>
  );
}

export function LegalContactFooter({ email }: { email?: string }) {
  return (
    <footer className="mt-16 pt-8 border-t border-zinc-900 text-center">
      <p className="text-zinc-500 text-sm">
        Questions about this policy?{" "}
        <a
          href={email ? `mailto:${email}` : "/contact"}
          className="text-zinc-300 underline underline-offset-2 hover:text-zinc-50 transition-colors"
        >
          Contact us
        </a>
      </p>
    </footer>
  );
}
