"use client";

import { usePathname } from "next/navigation";

import { Footer7 } from "./footer";
import Navbar from "./navbar";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer7 />}
    </>
  );
}
