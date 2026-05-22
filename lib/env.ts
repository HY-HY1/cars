function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getSupabaseUrl(): string {
  return required(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  );
}

export function getSupabaseAnonKey(): string {
  return required(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SB_PUBLIC_KEY,
  );
}

export function getSupabaseServiceRoleKey(): string {
  return required(
    "SUPABASE_SERVICE_ROLE_KEY",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SB_PRIVATE_KEY,
  );
}

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
}

export function getStripeWebhookSecret(): string {
  return required(
    "STRIPE_WEBHOOK_SECRET",
    process.env.STRIPE_WEBHOOK_SECRET,
  );
}

export function getCronSecret(): string {
  return required("CRON_SECRET", process.env.CRON_SECRET);
}

export function getResendAudienceId(type: "subscribers" | "customers"): string {
  const name =
    type === "subscribers"
      ? "RESEND_AUDIENCE_SUBSCRIBERS_ID"
      : "RESEND_AUDIENCE_CUSTOMERS_ID";
  return required(name, process.env[name]);
}
