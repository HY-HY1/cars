import { AccessLocked } from "@/components/dashboard/access-locked";
import { LessonHeader, LessonNavigation, PlaybookLesson } from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 4 — Vehicle Evaluation" };

export default async function Module4Page() {
  const { user } = await requireUser("/dashboard/playbook/4");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="04"
        tag="Core"
        title="Vehicle Evaluation"
        duration="30 min"
        description="MOT history, HPI checks, CAT cars, service records — everything you check before making an offer."
      />

      {/* TODO: content */}

      <LessonNavigation
        prev={{ title: "Sourcing Deals", href: "/dashboard/playbook/3" }}
        next={{ title: "Worked Flip Examples", href: "/dashboard/playbook/5" }}
      />
    </PlaybookLesson>
  );
}
