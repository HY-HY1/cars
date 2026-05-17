import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

/** Requires an authenticated session (OTP or password). Guest checkout does not use this. */
export async function requireUser(nextPath?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const params = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
    redirect(`/login${params}`);
  }

  return { supabase, user };
}
