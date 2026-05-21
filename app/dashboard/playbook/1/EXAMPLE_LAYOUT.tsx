import { AccessLocked } from "@/components/dashboard/access-locked";
import {
  LessonBody,
  LessonCallout,
  LessonChecklist,
  LessonDivider,
  LessonHeader,
  LessonKeyTakeaway,
  LessonList,
  LessonNavigation,
  LessonQuote,
  LessonResource,
  LessonResourceGroup,
  LessonSection,
  LessonSteps,
  LessonSubSection,
  LessonVideo,
  PlaybookLesson,
} from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 1 — Welcome & Orientation" };

export default async function Module1Page() {
  const { user } = await requireUser("/dashboard/playbook/1");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="01"
        tag="Start here"
        title="Welcome & Orientation"
        duration="12 min"
        description="How the playbook is structured, what to expect in your first 30 days, and the mindset that separates profitable flippers from people who give up after one bad viewing."
      />

      {/* ── Intro video ───────────────────────────────────── */}
      <LessonVideo
        source={{ type: "youtube", id: "xrMElkNY8Rk" }}
        caption="Module 1 — Welcome & Orientation (12 min)"
      />

      {/* ── Section 1 ─────────────────────────────────────── */}
      <LessonSection number={1} title="How this playbook is structured">
        <LessonBody>
          The playbook runs across 8 modules, each building on the last. You
          don&apos;t need to rush through it — most people complete one module
          per sitting and start applying it before moving on.
        </LessonBody>

        <LessonList
          items={[
            "Modules 1–2 cover mindset, sourcing and finding deals",
            "Modules 3–4 cover evaluation, inspection and negotiation",
            "Modules 5–6 cover preparation, listing and selling",
            "Modules 7–8 cover scaling up and staying legal",
          ]}
        />

        <LessonCallout variant="tip" title="How to get the most out of this">
          Watch each video once through, then use the written breakdown below to
          go deeper. The checklists and downloads are designed to be used in the
          field — not just read.
        </LessonCallout>
      </LessonSection>

      {/* ── Section 2 ─────────────────────────────────────── */}
      <LessonSection number={2} title="What to expect in your first 30 days">
        <LessonBody>
          Most people who follow the system consistently find their first deal
          within 3–4 weeks. Here&apos;s a realistic breakdown of what that
          looks like.
        </LessonBody>

        <LessonSteps
          steps={[
            {
              title: "Week 1 — Learn the system",
              description:
                "Complete modules 1–3. Don&apos;t look at cars yet. Understand the process first.",
            },
            {
              title: "Week 2 — Start sourcing daily",
              description:
                "Spend 20–30 minutes each morning running your search routine. Build the habit before you act on it.",
            },
            {
              title: "Week 3 — Book your first viewings",
              description:
                "You&apos;ll have seen enough listings by now to spot real deals. Book 2–3 viewings this week.",
            },
            {
              title: "Week 4 — Make your first offer",
              description:
                "Whether or not it leads to a purchase, the practice of negotiating is the whole point of week 4.",
            },
          ]}
        />

        <LessonCallout variant="warning" title="Don't skip ahead">
          The biggest mistake new flippers make is buying a car before
          they&apos;ve internalised the inspection process. Module 3 exists for
          a reason. Finish it before you view anything.
        </LessonCallout>
      </LessonSection>

      {/* ── Section 3 ─────────────────────────────────────── */}
      <LessonSection number={3} title="Tools and accounts to set up">
        <LessonBody>
          Before you start sourcing, get these in place. They take under an
          hour total and you&apos;ll use all of them.
        </LessonBody>

        <LessonSubSection title="Free accounts">
          <LessonChecklist
            items={[
              "AutoTrader — create a free account (saves your searches)",
              "Facebook Marketplace — use your personal account",
              "Gumtree — no account needed to browse",
              "HPI Check — bookmark it, don't pay until you need it",
              "MOT history checker — gov.uk/check-mot-history (free)",
            ]}
          />
        </LessonSubSection>

        <LessonSubSection title="Paid (when you need them)">
          <LessonChecklist
            items={[
              "HPI check — ~£10 per car. Never skip this.",
              "Vehicle valuation — cap.co.uk or WhatCar — optional but useful",
            ]}
          />
        </LessonSubSection>

        <LessonCallout variant="info" title="On budget">
          You don&apos;t need to buy anything before your first car. The
          inspection checklist is free, the search tools are free, and the HPI
          check only comes when you&apos;re serious about a specific car.
        </LessonCallout>
      </LessonSection>

      {/* ── Section 4 ─────────────────────────────────────── */}
      <LessonSection number={4} title="The right mindset">
        <LessonBody>
          Car flipping is not passive income and it&apos;s not a get-rich-quick
          scheme. It&apos;s a skill — and like any skill, the first few
          attempts feel awkward. That&apos;s normal.
        </LessonBody>

        <LessonQuote attribution="What this playbook is built around">
          You make your money when you buy the car, not when you sell it.
        </LessonQuote>

        <LessonBody>
          Every decision in this system — from which cars to search for, to how
          you negotiate, to when you walk away — flows from that single
          principle. If you buy right, the sale takes care of itself.
        </LessonBody>

        <LessonDivider />

        <LessonSubSection title="What separates people who succeed">
          <LessonList
            items={[
              "They run the search routine every single day, not when they feel like it",
              "They walk away from marginal deals — patience is the edge",
              "They treat every viewing as practice, not just a buying decision",
              "They reinvest profit rather than spending it",
            ]}
          />
        </LessonSubSection>

        <LessonCallout variant="key">
          The people who make consistent money flipping cars are not smarter or
          luckier than you. They are more consistent. Show up daily, follow the
          process, and the deals come.
        </LessonCallout>
      </LessonSection>

      {/* ── Key takeaway ──────────────────────────────────── */}
      <LessonKeyTakeaway>
        Before moving to Module 2: set up your free accounts, bookmark the MOT
        checker and HPI check, and commit to a daily 20-minute sourcing window.
        The habit is more important than the first deal.
      </LessonKeyTakeaway>

      {/* ── Resources ─────────────────────────────────────── */}
      <LessonResourceGroup title="Module 1 downloads">
        <LessonResource
          title="30-Day Quick Start Plan"
          description="Week-by-week breakdown you can print out"
          href="/downloads/30-day-plan.pdf"
          type="pdf"
        />
        <LessonResource
          title="Tools & Accounts Checklist"
          description="Everything to set up before Module 2"
          href="/downloads/tools-checklist.pdf"
          type="checklist"
        />
        <LessonResource
          title="Free MOT History Checker"
          href="https://www.gov.uk/check-mot-history"
          type="link"
          external
        />
      </LessonResourceGroup>

      {/* ── Navigation ────────────────────────────────────── */}
      <LessonNavigation
        next={{ title: "Finding Undervalued Cars", href: "/dashboard/playbook/2" }}
      />
    </PlaybookLesson>
  );
}
