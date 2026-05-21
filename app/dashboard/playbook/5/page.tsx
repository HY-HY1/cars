import { AccessLocked } from "@/components/dashboard/access-locked";
import { LessonHeader, LessonNavigation, PlaybookLesson } from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 5 — Worked Flip Examples" };

export default async function Module5Page() {
  const { user } = await requireUser("/dashboard/playbook/5");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="05"
        tag="Core"
        title="Worked Flip Examples"
        duration="25 min"
        description="Two real flips broken down cost by cost — what worked, what didn't, and what the margin actually looked like."
      />

      {/* TODO: content */}

      <LessonNavigation
        prev={{ title: "Vehicle Evaluation", href: "/dashboard/playbook/4" }}
        next={{ title: "Negotiation", href: "/dashboard/playbook/6" }}
      />
    </PlaybookLesson>
  );
}
