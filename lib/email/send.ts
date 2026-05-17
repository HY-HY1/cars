import "server-only";

import { FROM, getEmailClient } from "./client";
import {
  resourcesHtml,
  resourcesText,
  thankYouHtml,
  thankYouText,
} from "./templates";

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
