import { redirect } from "next/navigation";

import { checkOnboardingAccess } from "@/lib/onboarding/access";
import { createClient } from "@/lib/supabase/server";

import { OnboardingForm } from "./onboarding-form";

type OnboardingPageProps = {
  searchParams: Promise<{ email?: string }>;
};

export const metadata = {
  title: "Tell us about yourself",
};

export default async function OnboardingPage({
  searchParams,
}: OnboardingPageProps) {
  const { email: emailParam } = await searchParams;

  // If the user is authenticated, always use their verified auth email.
  // Never trust the ?email= param for a logged-in user — it could be spoofed.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email ?? emailParam ?? "";

  if (!email) {
    redirect("/checkout");
  }

  const hasAccess = await checkOnboardingAccess(email);

  if (!hasAccess) {
    // No active purchase — send to checkout with a clear reason
    redirect("/checkout?blocked=onboarding");
  }

  return <OnboardingForm email={email} />;
}
