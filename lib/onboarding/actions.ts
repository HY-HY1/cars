"use server";

import { checkOnboardingAccess } from "@/lib/onboarding/access";
import { normalizeEmail } from "@/lib/customers";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export type OnboardingState = {
  error?: string;
  success?: boolean;
};

export async function saveOnboarding(
  _prev: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const email = normalizeEmail(String(formData.get("email") ?? ""));

  if (!email) return { error: "Email is required." };

  // Server-side purchase gate — prevents forged submissions
  const hasAccess = await checkOnboardingAccess(email);
  if (!hasAccess) {
    return { error: "No active purchase found for this email." };
  }

  const admin = supabaseAdmin();

  // Look up customer row to link
  const { data: customer } = await admin
    .from("customers")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  const payload = {
    email,
    customer_id:    customer?.id ?? null,
    completed_at:   new Date().toISOString(),
    name:           String(formData.get("name") ?? ""),
    age_range:      String(formData.get("age_range") ?? ""),
    employment:     String(formData.get("employment") ?? ""),
    capital_range:  String(formData.get("capital_range") ?? ""),
    weekly_hours:   String(formData.get("weekly_hours") ?? ""),
    experience:     String(formData.get("experience") ?? ""),
    goal:           String(formData.get("goal") ?? ""),
    target_monthly: String(formData.get("target_monthly") ?? ""),
    notes:          String(formData.get("notes") ?? ""),
  };

  // Check for an existing row — update it rather than inserting a duplicate
  const { data: existing } = await admin
    .from("onboarding")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  const { error } = existing
    ? await admin.from("onboarding").update(payload).eq("id", existing.id)
    : await admin.from("onboarding").insert(payload);

  if (error) {
    console.error("[onboarding] save failed", error);
    return { error: "Failed to save. Please try again." };
  }

  return { success: true };
}
