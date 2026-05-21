import { AccessLocked } from "@/components/dashboard/access-locked";
import { LessonHeader, LessonNavigation, PlaybookLesson } from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 12 — Accounting, Tax & Legal" };

export default async function Module12Page() {
  const { user } = await requireUser("/dashboard/playbook/12");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="12"
        tag="Essential"
        title="Accounting, Tax & Legal"
        duration="15 min"
        description="Bookkeeping, HMRC, the private seller vs. trader line, and how to stay organised between flips."
      />

      {/* TODO: content */}

      <LessonNavigation
        prev={{ title: "Selling Cars", href: "/dashboard/playbook/11" }}
        next={{ title: "First Flip Action Plan", href: "/dashboard/playbook/13" }}
      />
    </PlaybookLesson>
  );
}
