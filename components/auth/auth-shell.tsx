import type { ReactNode } from "react";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full items-center justify-center bg-zinc-950 px-6 py-16">
      {children}
    </div>
  );
}
