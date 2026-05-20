"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Shield,
  User,
} from "lucide-react";

import { signOut } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const navItems = [
  { label: "Overview", href: "/dashboard", exact: true, Icon: LayoutDashboard },
  { label: "Billing",  href: "/dashboard/billing",  Icon: CreditCard },
  { label: "Profile",  href: "/dashboard/profile",  Icon: User },
  { label: "Security", href: "/dashboard/security", Icon: Shield },
];

const playbookModules = [
  { id: "m1", label: "Welcome & Orientation",      href: "/dashboard/playbook/1" },
  { id: "m2", label: "Finding Undervalued Cars",   href: "/dashboard/playbook/2" },
  { id: "m3", label: "Evaluating Before You Buy",  href: "/dashboard/playbook/3" },
  { id: "m4", label: "Negotiation",                href: "/dashboard/playbook/4" },
  { id: "m5", label: "Preparing the Car for Sale", href: "/dashboard/playbook/5" },
  { id: "m6", label: "Listing & Selling",          href: "/dashboard/playbook/6" },
  { id: "m7", label: "Scaling Up",                 href: "/dashboard/playbook/7" },
  { id: "m8", label: "Legal & Compliance",         href: "/dashboard/playbook/8" },
];

export function AppSidebar({ email, name }: { email: string; name: string | null }) {
  const pathname = usePathname();
  const displayName = name ?? email.split("@")[0];
  const [playbookOpen, setPlaybookOpen] = useState(
    pathname.startsWith("/dashboard/playbook"),
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2.5 px-1 py-1">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#e8ff47] text-[10px] font-black text-black">
            CF
          </div>
          <span className="truncate text-sm font-semibold">FlipPro</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map(({ label, href, exact, Icon }) => {
              const isActive = exact ? pathname === href : pathname.startsWith(href);
              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    render={<Link href={href} />}
                    isActive={isActive}
                    tooltip={label}
                  >
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Course</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible open={playbookOpen} onOpenChange={setPlaybookOpen}>
              <SidebarMenuItem>
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton
                      isActive={!playbookOpen && pathname.startsWith("/dashboard/playbook")}
                      tooltip="Playbook"
                    />
                  }
                >
                  <BookOpen />
                  <span>Playbook</span>
                  <ChevronRight
                    className={cn(
                      "ml-auto size-4 shrink-0 transition-transform duration-200",
                      playbookOpen && "rotate-90",
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {playbookModules.map(({ id, label, href }) => (
                      <SidebarMenuSubItem key={id}>
                        <SidebarMenuSubButton
                          render={<Link href={href} />}
                          isActive={pathname === href}
                        >
                          <span>{label}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-1 pb-1">
          <div className="mb-3 min-w-0 px-2">
            <p className="truncate text-xs font-medium opacity-70">{displayName}</p>
            <p className="truncate text-[11px] opacity-30">{email}</p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs opacity-40 transition-colors hover:bg-sidebar-accent hover:opacity-70"
            >
              <LogOut className="size-3.5" />
              Log out
            </button>
          </form>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
