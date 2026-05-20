"use server";

import { sendContactConfirmationEmail, sendContactEnquiryEmail } from "@/lib/email/send";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export type ContactActionState = {
  error?: string;
  success?: boolean;
};

export async function submitContact(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim();

  if (!name) return { error: "Please enter your name." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!message) return { error: "Please enter a message." };
  if (message.length > 5000) return { error: "Message must be under 5000 characters." };

  const db = supabaseAdmin();
  const { error: dbError } = await db
    .from("contact_enquiries")
    .insert({ name, email, subject, message });

  if (dbError) {
    console.error("[contact] insert error:", dbError);
    return { error: "Something went wrong. Please try again." };
  }

  await Promise.all([
    sendContactEnquiryEmail({ name, email, subject, message }),
    sendContactConfirmationEmail({ name, email, subject, message }),
  ]);

  return { success: true };
}
