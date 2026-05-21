import { AccessLocked } from "@/components/dashboard/access-locked";
import { LessonHeader, LessonNavigation, PlaybookLesson } from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 3 — Sourcing Deals" };

export default async function Module3Page() {
  const { user } = await requireUser("/dashboard/playbook/3");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="03"
        tag="Core"
        title="Sourcing Deals"
        duration="25 min"
        description="Where to find undervalued cars, how to search effectively, and how to read a seller."
      />

      {/* TODO: content */}

      <LessonNavigation
        prev={{ title: "Understanding the Market", href: "/dashboard/playbook/2" }}
        next={{ title: "Vehicle Evaluation", href: "/dashboard/playbook/4" }}
      />
    </PlaybookLesson>
  );
}
