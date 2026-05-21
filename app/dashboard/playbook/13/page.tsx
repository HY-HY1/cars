import { AccessLocked } from "@/components/dashboard/access-locked";
import { LessonHeader, LessonNavigation, PlaybookLesson } from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 13 — First Flip Action Plan" };

export default async function Module13Page() {
  const { user } = await requireUser("/dashboard/playbook/13");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="13"
        tag="Start here"
        title="First Flip Action Plan"
        duration="15 min"
        description="Your exact next steps — a day-by-day roadmap from zero to your first offer."
      />

      {/* TODO: content */}

      <LessonNavigation
        prev={{ title: "Accounting, Tax & Legal", href: "/dashboard/playbook/12" }}
      />
    </PlaybookLesson>
  );
}
