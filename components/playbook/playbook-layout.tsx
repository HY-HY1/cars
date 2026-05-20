import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  DownloadIcon,
  ExternalLinkIcon,
  InfoIcon,
  LightbulbIcon,
  StarIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

// ─────────────────────────────────────────────────────────────
// PAGE WRAPPER
// ─────────────────────────────────────────────────────────────

/** Outer container for a lesson page. Wraps all lesson content. */
export function PlaybookLesson({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-3xl px-6 py-10 pb-24">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LESSON HEADER
// ─────────────────────────────────────────────────────────────

type LessonTag = "Start here" | "Core" | "Advanced" | "Essential" | "Bonus";

const tagStyles: Record<LessonTag, string> = {
  "Start here": "bg-[rgba(232,255,71,0.1)] text-[#e8ff47]",
  "Core":       "bg-[rgba(29,158,117,0.12)] text-[#1D9E75]",
  "Advanced":   "bg-[rgba(83,74,183,0.12)] text-[#7b74e8]",
  "Essential":  "bg-[rgba(186,117,23,0.12)] text-[#BA7517]",
  "Bonus":      "bg-[rgba(185,28,28,0.12)] text-[#f87171]",
};

/**
 * Lesson header — module number, tag, title, duration, description.
 *
 * @example
 * <LessonHeader
 *   module="02"
 *   tag="Core"
 *   title="Finding Undervalued Cars"
 *   duration="34 min"
 *   description="Learn how to source deals others miss..."
 * />
 */
export function LessonHeader({
  module,
  tag,
  title,
  duration,
  description,
}: {
  module: string;
  tag: LessonTag;
  title: string;
  duration: string;
  description?: string;
}) {
  return (
    <header className="mb-10 border-b border-white/6 pb-10">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-white/25">Module {module}</span>
        <span className="text-white/15">·</span>
        <span
          className={cn(
            "rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            tagStyles[tag],
          )}
        >
          {tag}
        </span>
        <span className="text-white/15">·</span>
        <span className="text-xs text-white/30">{duration}</span>
      </div>
      <h1 className="font-syne text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
          {description}
        </p>
      )}
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// VIDEO
// ─────────────────────────────────────────────────────────────

type VideoSource =
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string }
  | { type: "loom"; id: string }
  | { type: "url"; src: string };

function buildVideoSrc(source: VideoSource): string {
  switch (source.type) {
    case "youtube":
      return `https://www.youtube-nocookie.com/embed/${source.id}`;
    case "vimeo":
      return `https://player.vimeo.com/video/${source.id}?dnt=1`;
    case "loom":
      return `https://www.loom.com/embed/${source.id}`;
    case "url":
      return source.src;
  }
}

/**
 * Embedded video — supports YouTube, Vimeo, Loom, or a direct URL.
 * Renders a 16:9 responsive iframe (or <video> for direct URLs).
 *
 * @example
 * <LessonVideo source={{ type: "youtube", id: "dQw4w9WgXcQ" }} />
 * <LessonVideo source={{ type: "loom", id: "abc123" }} caption="Walkthrough of the sourcing process" />
 * <LessonVideo source={{ type: "url", src: "/videos/module-2-intro.mp4" }} />
 */
export function LessonVideo({
  source,
  caption,
  className,
}: {
  source: VideoSource;
  caption?: string;
  className?: string;
}) {
  const content =
    source.type === "url" ? (
      <video
        src={source.src}
        controls
        className="h-full w-full rounded-xl object-cover"
      />
    ) : (
      <iframe
        src={buildVideoSrc(source)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full rounded-xl"
      />
    );

  return (
    <figure className={cn("mb-8", className)}>
      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/8 bg-zinc-900">
        {content}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-white/30">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTIONS & HEADINGS
// ─────────────────────────────────────────────────────────────

/**
 * A numbered content section. Use for major topic blocks within a lesson.
 *
 * @example
 * <LessonSection number={1} title="Where to look">
 *   <LessonBody>AutoTrader is the largest...</LessonBody>
 * </LessonSection>
 */
export function LessonSection({
  number,
  title,
  children,
}: {
  number?: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="mb-5 flex items-baseline gap-3">
        {number !== undefined && (
          <span className="shrink-0 select-none font-mono text-sm text-white/20">
            {String(number).padStart(2, "0")}
          </span>
        )}
        <h2 className="font-syne text-xl font-bold text-white">{title}</h2>
      </div>
      <div className={cn("space-y-4", number !== undefined && "pl-9")}>
        {children}
      </div>
      <Separator className="mt-10 bg-white/5" />
    </section>
  );
}

/**
 * A sub-heading within a section. Use for grouping related content.
 *
 * @example
 * <LessonSubSection title="AutoTrader filters">
 *   <LessonBody>Set the mileage filter to...</LessonBody>
 * </LessonSubSection>
 */
export function LessonSubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white/80">{title}</h3>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BODY TEXT
// ─────────────────────────────────────────────────────────────

/**
 * A body paragraph. Standard prose text for lesson explanations.
 *
 * @example
 * <LessonBody>
 *   Most sellers on Facebook Marketplace are private individuals...
 * </LessonBody>
 */
export function LessonBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm leading-7 text-white/55", className)}>
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────
// LISTS
// ─────────────────────────────────────────────────────────────

/**
 * A bulleted or numbered list of plain text items.
 *
 * @example
 * <LessonList items={["AutoTrader", "Facebook Marketplace", "Gumtree"]} />
 * <LessonList ordered items={["Check the V5C", "Run an HPI check", "Inspect in daylight"]} />
 */
export function LessonList({
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
        "space-y-2 pl-4 text-sm leading-7 text-white/55",
        ordered ? "list-decimal" : "list-disc",
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

/**
 * A checklist — items rendered with a tick icon. Good for "things to do before..."
 *
 * @example
 * <LessonChecklist items={["Bring a torch", "Wear old clothes", "Have your checklist printed"]} />
 */
export function LessonChecklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-white/55">
          <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-[#1D9E75]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP-BY-STEP
// ─────────────────────────────────────────────────────────────

type Step = {
  title: string;
  description?: string;
};

/**
 * A numbered step-by-step process block. Good for walkthroughs and procedures.
 *
 * @example
 * <LessonSteps steps={[
 *   { title: "Open AutoTrader", description: "Go to autotrader.co.uk..." },
 *   { title: "Set your search radius to 30 miles" },
 *   { title: "Filter by private sellers only" },
 * ]} />
 */
export function LessonSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(232,255,71,0.1)] font-mono text-xs font-bold text-[#e8ff47]">
            {i + 1}
          </span>
          <div className="pt-0.5">
            <p className="text-sm font-semibold text-white/80">{step.title}</p>
            {step.description && (
              <p className="mt-1 text-sm leading-relaxed text-white/45">
                {step.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

// ─────────────────────────────────────────────────────────────
// CALLOUTS
// ─────────────────────────────────────────────────────────────

type CalloutVariant = "tip" | "warning" | "info" | "key";

const calloutConfig: Record<
  CalloutVariant,
  { icon: React.ReactNode; border: string; bg: string; titleColor: string }
> = {
  tip: {
    icon: <LightbulbIcon className="size-4" />,
    border: "border-l-[#1D9E75]/50",
    bg: "bg-[rgba(29,158,117,0.06)]",
    titleColor: "text-[#1D9E75]",
  },
  warning: {
    icon: <AlertTriangleIcon className="size-4" />,
    border: "border-l-amber-500/50",
    bg: "bg-amber-950/20",
    titleColor: "text-amber-400",
  },
  info: {
    icon: <InfoIcon className="size-4" />,
    border: "border-l-blue-500/40",
    bg: "bg-blue-950/15",
    titleColor: "text-blue-400",
  },
  key: {
    icon: <StarIcon className="size-4" />,
    border: "border-l-[#e8ff47]/40",
    bg: "bg-[rgba(232,255,71,0.04)]",
    titleColor: "text-[#e8ff47]",
  },
};

/**
 * A highlighted callout box. Draws attention to tips, warnings, key points, or extra context.
 *
 * Variants:
 * - `tip`     — green, for helpful tips and pro advice
 * - `warning` — amber, for mistakes to avoid or things to watch out for
 * - `info`    — blue, for additional background or context
 * - `key`     — yellow (brand), for the single most important point in a section
 *
 * @example
 * <LessonCallout variant="tip" title="Pro tip">
 *   Listings with fewer than 5 photos are often hiding something.
 * </LessonCallout>
 *
 * <LessonCallout variant="warning">
 *   Never transfer money before viewing the car in person.
 * </LessonCallout>
 */
export function LessonCallout({
  variant = "info",
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}) {
  const config = calloutConfig[variant];
  return (
    <div
      className={cn(
        "rounded-r-xl border-l-2 py-3 pl-4 pr-4",
        config.border,
        config.bg,
      )}
    >
      <div className={cn("mb-1.5 flex items-center gap-2 font-semibold text-xs uppercase tracking-wide", config.titleColor)}>
        {config.icon}
        {title ?? variant.charAt(0).toUpperCase() + variant.slice(1)}
      </div>
      <p className="text-sm leading-6 text-white/55">{children}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// IMAGES
// ─────────────────────────────────────────────────────────────

/**
 * A single full-width image with an optional caption.
 * Use `alt` to describe the image for accessibility and SEO.
 *
 * @example
 * <LessonImage
 *   src="/images/module-2/autotrader-filters.png"
 *   alt="AutoTrader search page with filters applied"
 *   caption="Use these exact filters to surface the best deals"
 * />
 */
export function LessonImage({
  src,
  alt,
  caption,
  aspectRatio = "video",
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  /** Aspect ratio of the image container. Default: "video" (16:9) */
  aspectRatio?: "video" | "square" | "wide" | "auto";
  className?: string;
}) {
  const ratioClass = {
    video: "aspect-video",
    square: "aspect-square",
    wide: "aspect-[3/1]",
    auto: "",
  }[aspectRatio];

  return (
    <figure className={cn("mb-6", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-white/8 bg-zinc-900",
          ratioClass,
        )}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-white/30">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * A responsive grid of 2 or 3 images. Good for before/after comparisons or
 * showing multiple examples side by side.
 *
 * @example
 * <LessonImageGrid
 *   cols={2}
 *   images={[
 *     { src: "/images/bad-listing.png", alt: "Bad listing example", caption: "What to avoid" },
 *     { src: "/images/good-listing.png", alt: "Good listing example", caption: "What good looks like" },
 *   ]}
 * />
 */
export function LessonImageGrid({
  images,
  cols = 2,
  className,
}: {
  images: { src: string; alt: string; caption?: string }[];
  cols?: 2 | 3;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "mb-6 grid gap-3",
        cols === 2 ? "grid-cols-2" : "grid-cols-3",
        className,
      )}
    >
      {images.map((img, i) => (
        <div key={i}>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/8 bg-zinc-900">
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </div>
          {img.caption && (
            <p className="mt-1 text-center text-xs text-white/30">{img.caption}</p>
          )}
        </div>
      ))}
    </figure>
  );
}

// ─────────────────────────────────────────────────────────────
// PULL QUOTE
// ─────────────────────────────────────────────────────────────

/**
 * A pull quote — a short, impactful statement set apart from body text.
 * Good for memorable rules of thumb or key principles.
 *
 * @example
 * <LessonQuote attribution="Module 2">
 *   You make your money when you buy the car, not when you sell it.
 * </LessonQuote>
 */
export function LessonQuote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <blockquote className="my-6 border-l-2 border-[#e8ff47]/40 py-2 pl-5">
      <p className="font-syne text-lg font-semibold leading-snug text-white/80 italic">
        &ldquo;{children}&rdquo;
      </p>
      {attribution && (
        <cite className="mt-2 block text-xs not-italic text-white/30">
          — {attribution}
        </cite>
      )}
    </blockquote>
  );
}

// ─────────────────────────────────────────────────────────────
// KEY TAKEAWAY
// ─────────────────────────────────────────────────────────────

/**
 * A summarised key takeaway — use at the end of a section or lesson
 * to reinforce the most important point.
 *
 * @example
 * <LessonKeyTakeaway>
 *   Always view a car in daylight. Artificial lighting hides paint defects and rust.
 * </LessonKeyTakeaway>
 */
export function LessonKeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-[rgba(232,255,71,0.15)] bg-[rgba(232,255,71,0.04)] px-5 py-4">
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#e8ff47]/60">
        Key takeaway
      </p>
      <p className="text-sm leading-relaxed text-white/70">{children}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RESOURCES
// ─────────────────────────────────────────────────────────────

type ResourceType = "pdf" | "spreadsheet" | "template" | "link" | "checklist";

const resourceIcon: Record<ResourceType, string> = {
  pdf: "📄",
  spreadsheet: "📊",
  template: "📝",
  checklist: "✅",
  link: "🔗",
};

/**
 * A single downloadable or linked resource.
 *
 * @example
 * <LessonResource
 *   title="40-Point Inspection Checklist"
 *   description="Print this out before every viewing"
 *   href="/downloads/inspection-checklist.pdf"
 *   type="checklist"
 * />
 */
export function LessonResource({
  title,
  description,
  href,
  type = "link",
  external = false,
}: {
  title: string;
  description?: string;
  href: string;
  type?: ResourceType;
  /** Opens in new tab. Auto-true for external URLs. */
  external?: boolean;
}) {
  const isExternal = external || href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/3 px-4 py-3.5 transition-all hover:border-white/15 hover:bg-white/5"
    >
      <span className="text-2xl">{resourceIcon[type]}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-white/80 group-hover:text-white">
          {title}
        </p>
        {description && (
          <p className="mt-0.5 text-xs text-white/35">{description}</p>
        )}
      </div>
      {isExternal ? (
        <ExternalLinkIcon className="size-4 shrink-0 text-white/20 group-hover:text-white/40" />
      ) : (
        <DownloadIcon className="size-4 shrink-0 text-white/20 group-hover:text-white/40" />
      )}
    </a>
  );
}

/**
 * A grouped list of resources with a section heading.
 *
 * @example
 * <LessonResourceGroup title="Downloads for this module">
 *   <LessonResource title="Inspection checklist" href="..." type="checklist" />
 *   <LessonResource title="Profit calculator" href="..." type="spreadsheet" />
 * </LessonResourceGroup>
 */
export function LessonResourceGroup({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-8">
      {title && (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-white/30">
          {title}
        </p>
      )}
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DIVIDER
// ─────────────────────────────────────────────────────────────

/**
 * A subtle visual divider. Use between distinct content blocks
 * when a full `LessonSection` boundary is too heavy.
 */
export function LessonDivider({ className }: { className?: string }) {
  return <Separator className={cn("my-8 bg-white/5", className)} />;
}

// ─────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────

type NavLink = { title: string; href: string };

/**
 * Previous / next lesson navigation. Place at the very bottom of the lesson.
 *
 * @example
 * <LessonNavigation
 *   prev={{ title: "Welcome & Orientation", href: "/dashboard/playbook/m1" }}
 *   next={{ title: "Evaluating Before You Buy", href: "/dashboard/playbook/m3" }}
 * />
 */
export function LessonNavigation({
  prev,
  next,
}: {
  prev?: NavLink;
  next?: NavLink;
}) {
  return (
    <nav className="mt-16 flex items-center justify-between gap-4 border-t border-white/6 pt-8">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex max-w-[45%] items-center gap-2 text-left text-sm text-white/40 transition-colors hover:text-white/80"
        >
          <ArrowLeftIcon className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
          <span className="truncate">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex max-w-[45%] items-center gap-2 text-right text-sm text-white/40 transition-colors hover:text-white/80"
        >
          <span className="truncate">{next.title}</span>
          <ArrowRightIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
