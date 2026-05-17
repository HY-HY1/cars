import "server-only";

import nodemailer from "nodemailer";

export function getEmailClient() {
  const port = Number(process.env.SMTP_PORT ?? 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // true = SSL (port 465), false = STARTTLS (port 587)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      // Needed for Gmail app passwords in some environments
      rejectUnauthorized: true,
    },
  });
}

export const FROM = process.env.SMTP_FROM ?? "Harvey <noreply@example.com>";
