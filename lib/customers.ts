import "server-only";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getStripe } from "@/lib/stripe";
import type { Customer } from "@/types/database";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const admin = supabaseAdmin();
  const normalized = normalizeEmail(email);

  const { data, error } = await admin
    .from("customers")
    .select("*")
    .eq("email", normalized)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load customer: ${error.message}`);
  }

  return data;
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from("customers")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load customer: ${error.message}`);
  }

  return data;
}

/**
 * Find or create a guest customer and ensure a Stripe customer exists.
 * Reuses the same row when the email was used before.
 */
export async function getOrCreateCustomerByEmail(email: string): Promise<Customer> {
  const admin = supabaseAdmin();
  const stripe = getStripe();
  const normalized = normalizeEmail(email);

  let customer = await getCustomerByEmail(normalized);

  if (!customer) {
    const { data, error } = await admin
      .from("customers")
      .insert({ email: normalized })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        customer = await getCustomerByEmail(normalized);
        if (!customer) {
          throw new Error("Customer conflict; retry checkout");
        }
      } else {
        throw new Error(`Failed to create customer: ${error.message}`);
      }
    } else {
      customer = data;
    }
  }

  if (customer.stripe_customer_id) {
    return customer;
  }

  const stripeCustomer = await stripe.customers.create({
    email: normalized,
    metadata: {
      supabase_customer_id: customer.id,
    },
  });

  const { data: updated, error: updateError } = await admin
    .from("customers")
    .update({ stripe_customer_id: stripeCustomer.id })
    .eq("id", customer.id)
    .select()
    .single();

  if (updateError || !updated) {
    throw new Error(
      `Failed to save Stripe customer id: ${updateError?.message ?? "unknown"}`,
    );
  }

  return updated;
}

/** Link an auth user to an existing guest customer row (same email). */
export async function linkCustomerToAuthUser(
  authUserId: string,
  email: string,
): Promise<Customer> {
  const admin = supabaseAdmin();
  const normalized = normalizeEmail(email);

  const existing = await getCustomerByEmail(normalized);

  if (existing) {
    if (existing.auth_user_id && existing.auth_user_id !== authUserId) {
      throw new Error("This email is already linked to another account.");
    }

    const { data, error } = await admin
      .from("customers")
      .update({
        auth_user_id: authUserId,
        has_account: true,
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to link customer: ${error?.message ?? "unknown"}`);
    }

    return data;
  }

  const { data, error } = await admin
    .from("customers")
    .insert({
      email: normalized,
      auth_user_id: authUserId,
      has_account: true,
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(`Failed to create linked customer: ${error?.message ?? "unknown"}`);
  }

  return data;
}
