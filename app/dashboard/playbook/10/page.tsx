import { AccessLocked } from "@/components/dashboard/access-locked";
import { LessonHeader, LessonNavigation, PlaybookLesson } from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 10 — Adding Value" };

export default async function Module10Page() {
  const { user } = await requireUser("/dashboard/playbook/10");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="10"
        tag="Core"
        title="Adding Value"
        duration="20 min"
        description="Detailing, cosmetic fixes, photography and presentation — the cheap work that adds hundreds to your sale price."
      />

      {/* TODO: content */}

      <LessonNavigation
        prev={{ title: "Repairs & Connections", href: "/dashboard/playbook/9" }}
        next={{ title: "Selling Cars", href: "/dashboard/playbook/11" }}
      />
    </PlaybookLesson>
  );
}
