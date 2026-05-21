import { AccessLocked } from "@/components/dashboard/access-locked";
import { LessonHeader, LessonNavigation, PlaybookLesson } from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 7 — Inspection System" };

export default async function Module7Page() {
  const { user } = await requireUser("/dashboard/playbook/7");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="07"
        tag="Core"
        title="Inspection System"
        duration="25 min"
        description="The full inspection process — mechanical, bodywork, test drive, and the red flags that mean walk away."
      />

      {/* TODO: content */}

      <LessonNavigation
        prev={{ title: "Negotiation", href: "/dashboard/playbook/6" }}
        next={{ title: "Transport & Insurance", href: "/dashboard/playbook/8" }}
      />
    </PlaybookLesson>
  );
}
