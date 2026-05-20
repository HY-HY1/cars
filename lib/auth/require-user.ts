import "server-only";

import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { isDevBypass } from "@/lib/dev";
import { createClient } from "@/lib/supabase/server";

const DEV_USER: User = {
  id: "dev-00000000-0000-0000-0000-000000000000",
  email: "dev@local.test",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString(),
};

/** Requires an authenticated session (OTP or password). Guest checkout does not use this. */
export async function requireUser(nextPath?: string) {
  const supabase = await createClient();

  if (isDevBypass()) {
    return { supabase, user: DEV_USER };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const params = nextPath ? `?next=${encodeURIComponent(nextPath)}` : "";
    redirect(`/login${params}`);
  }

  return { supabase, user };
}
