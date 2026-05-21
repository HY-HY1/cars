import { AccessLocked } from "@/components/dashboard/access-locked";
import { LessonHeader, LessonNavigation, PlaybookLesson } from "@/components/playbook/playbook-layout";
import { requireUser } from "@/lib/auth/require-user";
import { resolveAccess } from "@/lib/auth/resolve-access";

export const metadata = { title: "Module 2 — Understanding the Market" };

export default async function Module2Page() {
  const { user } = await requireUser("/dashboard/playbook/2");
  const { hasAccess } = await resolveAccess(user.id, user.email ?? "");

  if (!hasAccess) return <AccessLocked />;

  return (
    <PlaybookLesson>
      <LessonHeader
        module="02"
        tag="Core"
        title="Understanding the Market"
        duration="20 min"
        description="Which cars sell, which cars sit, and how to read demand before you spend a penny."
      />

      {/* TODO: content */}

      <LessonNavigation
        prev={{ title: "Welcome & Expectations", href: "/dashboard/playbook/1" }}
        next={{ title: "Sourcing Deals", href: "/dashboard/playbook/3" }}
      />
    </PlaybookLesson>
  );
}
