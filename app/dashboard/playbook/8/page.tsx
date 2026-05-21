import { AccessLocked } from "@/components/dashboard/access-locked";
import { LessonHeader, LessonNavigation, PlaybookLesson } from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 8 — Transport & Insurance" };

export default async function Module8Page() {
  const { user } = await requireUser("/dashboard/playbook/8");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="08"
        tag="Essential"
        title="Transport & Insurance"
        duration="15 min"
        description="Temporary insurance, trade plates, getting a car home without an MOT — the logistics sorted."
      />

      {/* TODO: content */}

      <LessonNavigation
        prev={{ title: "Inspection System", href: "/dashboard/playbook/7" }}
        next={{ title: "Repairs & Connections", href: "/dashboard/playbook/9" }}
      />
    </PlaybookLesson>
  );
}
