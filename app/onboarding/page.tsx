import { redirect } from "next/navigation";

import { checkOnboardingAccess } from "@/lib/onboarding/access";
import { normalizeEmail } from "@/lib/customers";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

import { OnboardingForm } from "./onboarding-form";

type OnboardingPageProps = {
  searchParams: Promise<{ email?: string }>;
};

export const metadata = { title: "Tell us about yourself" };

export default async function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const { email: emailParam } = await searchParams;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const email = user?.email ?? emailParam ?? "";
  if (!email) redirect("/checkout");

  const hasAccess = await checkOnboardingAccess(email);
  if (!hasAccess) redirect("/checkout?blocked=onboarding");

  // Fetch any existing answers so the form pre-fills on update
  const admin = supabaseAdmin();
  const { data: existing } = await admin
    .from("onboarding")
    .select("name, age_range, employment, capital_range, weekly_hours, experience, goal, target_monthly, notes")
    .eq("email", normalizeEmail(email))
    .maybeSingle();

  return <OnboardingForm email={email} initialValues={existing ?? undefined} />;
}
