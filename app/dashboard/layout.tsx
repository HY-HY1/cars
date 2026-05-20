import { AppSidebar } from "@/components/dashboard/sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { requireUser } from "@/lib/auth/require-user";
import { normalizeEmail } from "@/lib/customers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireUser("/dashboard");

  const admin = supabaseAdmin();
  const { data: onboarding } = await admin
    .from("onboarding")
    .select("name")
    .eq("email", normalizeEmail(user.email ?? ""))
    .not("completed_at", "is", null)
    .maybeSingle();

  return (
    <SidebarProvider>
      <AppSidebar email={user.email ?? ""} name={onboarding?.name ?? null} />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-sidebar-border px-4 md:hidden">
          <SidebarTrigger className="-ml-1" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
