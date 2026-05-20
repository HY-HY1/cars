import "server-only";

import { FROM, getEmailClient } from "./client";
import {
  contactConfirmationHtml,
  contactConfirmationText,
  contactEnquiryHtml,
  contactEnquiryText,
  resourcesHtml,
  resourcesText,
  thankYouHtml,
  thankYouText,
} from "./templates";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

type ContactData = { name: string; email: string; subject: string | null; message: string };

export async function sendContactEnquiryEmail(data: ContactData): Promise<void> {
  if (!CONTACT_EMAIL) {
    console.warn("CONTACT_EMAIL not set — skipping contact notification email");
    return;
  }
  const transporter = getEmailClient();
  await transporter.sendMail({
    from: FROM,
    to: CONTACT_EMAIL,
    replyTo: `${data.name} <${data.email}>`,
    subject: `Contact enquiry — ${data.name}`,
    text: contactEnquiryText(data),
    html: contactEnquiryHtml(data),
  });
}

export async function sendContactConfirmationEmail(data: ContactData): Promise<void> {
  const transporter = getEmailClient();
  await transporter.sendMail({
    from: FROM,
    to: data.email,
    subject: "We've received your message — Car Flipping Playbook",
    text: contactConfirmationText(data),
    html: contactConfirmationHtml(data),
  });
}

export async function sendPurchaseEmails(email: string): Promise<void> {
  const transporter = getEmailClient();

  // Send sequentially so the personal thank-you always arrives first
  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: "A personal note from me",
    text: thankYouText(email),
    html: thankYouHtml(email),
  });

  await transporter.sendMail({
    from: FROM,
    to: email,
    subject: "Your Car Flipping Playbook — access inside 🚀",
    text: resourcesText(email),
    html: resourcesHtml(email),
  });
}
