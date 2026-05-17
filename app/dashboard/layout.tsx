import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Sidebar } from "@/components/dashboard/sidebar";
import { requireUser } from "@/lib/auth/require-user";
import { normalizeEmail } from "@/lib/customers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireUser("/dashboard");

  // Get name from onboarding table (only source of full name in actual schema)
  const admin = supabaseAdmin();
  const { data: onboarding } = await admin
    .from("onboarding")
    .select("name")
    .eq("email", normalizeEmail(user.email ?? ""))
    .not("completed_at", "is", null)
    .maybeSingle();

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-white">
      <div className="hidden md:flex md:shrink-0">
        <Sidebar email={user.email ?? ""} name={onboarding?.name ?? null} />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileNav />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
