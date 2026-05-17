"use server";

import { normalizeEmail } from "@/lib/customers";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export type ProfileState = { error?: string; success?: boolean };

/** Updates the name stored in the onboarding row for this user's email. */
export async function updateProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const fullName = String(formData.get("full_name") ?? "").trim();
  if (!fullName) return { error: "Name cannot be empty." };
  if (fullName.length > 80) return { error: "Name is too long." };

  const admin = supabaseAdmin();
  const email = normalizeEmail(user.email ?? "");

  const { error } = await admin
    .from("onboarding")
    .update({ name: fullName })
    .eq("email", email);

  if (error) {
    console.error("[profile] update failed:", error);
    return { error: "Failed to save. Please try again." };
  }

  return { success: true };
}

export async function requestPasswordReset(): Promise<ProfileState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return { error: "No email address on this account." };

  const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
  });

  if (error) return { error: error.message };
  return { success: true };
}
