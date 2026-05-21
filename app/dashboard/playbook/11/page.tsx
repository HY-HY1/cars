import { AccessLocked } from "@/components/dashboard/access-locked";
import { LessonHeader, LessonNavigation, PlaybookLesson } from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 11 — Selling Cars" };

export default async function Module11Page() {
  const { user } = await requireUser("/dashboard/playbook/11");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="11"
        tag="Core"
        title="Selling Cars"
        duration="20 min"
        description="Writing listings that get enquiries, pricing for a fast sale, handling buyers, and completing the handover safely."
      />

      {/* TODO: content */}

      <LessonNavigation
        prev={{ title: "Adding Value", href: "/dashboard/playbook/10" }}
        next={{ title: "Accounting, Tax & Legal", href: "/dashboard/playbook/12" }}
      />
    </PlaybookLesson>
  );
}
