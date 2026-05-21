import { AccessLocked } from "@/components/dashboard/access-locked";
import { LessonHeader, LessonNavigation, PlaybookLesson } from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 6 — Negotiation" };

export default async function Module6Page() {
  const { user } = await requireUser("/dashboard/playbook/6");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="06"
        tag="Core"
        title="Negotiation"
        duration="20 min"
        description="How to message sellers, build leverage, make your offer, and walk away when you need to."
      />

      {/* TODO: content */}

      <LessonNavigation
        prev={{ title: "Worked Flip Examples", href: "/dashboard/playbook/5" }}
        next={{ title: "Inspection System", href: "/dashboard/playbook/7" }}
      />
    </PlaybookLesson>
  );
}
