import { AccessLocked } from "@/components/dashboard/access-locked";
import { LessonHeader, LessonNavigation, PlaybookLesson } from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 9 — Repairs & Connections" };

export default async function Module9Page() {
  const { user } = await requireUser("/dashboard/playbook/9");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="09"
        tag="Essential"
        title="Repairs & Connections"
        duration="20 min"
        description="Finding bodyshops and mechanics, sourcing cheap parts, and building the network that makes flipping faster."
      />

      {/* TODO: content */}

      <LessonNavigation
        prev={{ title: "Transport & Insurance", href: "/dashboard/playbook/8" }}
        next={{ title: "Adding Value", href: "/dashboard/playbook/10" }}
      />
    </PlaybookLesson>
  );
}
