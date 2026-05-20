import { getBaseUrl } from "@/lib/env";

// ── HTML escape ─────────────────────────────────────────────

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ── Shared wrapper ──────────────────────────────────────────

function wrap(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title></title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:8px;overflow:hidden;">
          ${body}
          <tr>
            <td style="padding:24px 32px;background:#f9f9f9;border-top:1px solid #e8e8e8;">
              <p style="margin:0;font-size:12px;color:#999;line-height:1.6;">
                Car Flipping Playbook &mdash; you're receiving this because you made a purchase.<br />
                Questions? Reply directly to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── 1. Personal thank-you ───────────────────────────────────

export function thankYouHtml(_email: string): string {
  return wrap(`
    <tr>
      <td style="padding:40px 32px 0;">
        <p style="margin:0 0 24px;font-size:15px;color:#111;line-height:1.7;">Hey,</p>
        <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">
          Just a quick note from me — thank you for picking up the Car Flipping Playbook.
          It genuinely means a lot.
        </p>
        <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">
          I built this because I was frustrated by how much noise is out there — vague advice,
          unrealistic promises, no real system. What you've got is the actual process: how to
          find cars priced below market, how to negotiate, how to prep them quickly, and how
          to sell fast.
        </p>
        <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">
          It works when you apply it consistently. Most people who actually follow the sourcing
          system find their first deal within a few weeks.
        </p>
        <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">
          If you have any questions as you go through it — whether that's about a specific car
          you're looking at, a negotiation situation, or anything else — just reply to this
          email. I read every reply personally.
        </p>
        <p style="margin:0 0 8px;font-size:15px;color:#333;line-height:1.7;">
          Speak soon,
        </p>
        <p style="margin:0 0 32px;font-size:15px;color:#111;font-weight:600;line-height:1.7;">
          Harvey
        </p>
        <p style="margin:0 0 32px;font-size:13px;color:#888;line-height:1.6;font-style:italic;">
          P.S. Your access link and everything that's included is in the next email — check your inbox now.
        </p>
      </td>
    </tr>
  `);
}

export function thankYouText(_email: string): string {
  return `Hey,

Just a quick note from me — thank you for picking up the Car Flipping Playbook.

I built this because I was frustrated by how much noise is out there — vague advice, unrealistic promises, no real system. What you've got is the actual process.

If you have any questions as you go through it, just reply to this email. I read every reply personally.

Speak soon,
Harvey

P.S. Your access link is in the next email — check your inbox now.`;
}

// ── 2. Resources / access delivery ─────────────────────────

const RESOURCES_URL = process.env.RESOURCES_URL ?? ""; // Set in .env.local

export function resourcesHtml(email: string): string {
  const base = getBaseUrl();
  const loginUrl = `${base}/login?email=${encodeURIComponent(email)}&next=/dashboard`;
  const hasResources = Boolean(RESOURCES_URL);

  return wrap(`
    <tr>
      <td style="padding:0;background:#0a0a0a;text-align:center;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:32px;text-align:center;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#e8ff47;">
                Purchase confirmed
              </p>
              <h1 style="margin:8px 0 0;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;">
                You&rsquo;re in. Here&rsquo;s everything.
              </h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:32px;">

        <p style="margin:0 0 24px;font-size:15px;color:#333;line-height:1.7;">
          Hi,<br /><br />
          Your payment is confirmed and your access is ready. Here&rsquo;s everything you need.
        </p>

        <!-- What's included -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border:1px solid #e8e8e8;border-radius:6px;overflow:hidden;">
          <tr>
            <td style="padding:14px 18px;background:#f9f9f9;border-bottom:1px solid #e8e8e8;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#666;">
                What&rsquo;s included
              </p>
            </td>
          </tr>
          ${[
            "8-Module Video Course",
            "40-Point Inspection Checklist",
            "Negotiation Scripts",
            "Profit Calculator",
            "UK Sourcing Guide",
            "Listing Templates",
          ]
            .map(
              (item) => `
          <tr>
            <td style="padding:10px 18px;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0;font-size:14px;color:#333;line-height:1.5;">
                <span style="color:#16a34a;font-weight:700;margin-right:8px;">&#10003;</span>${item}
              </p>
            </td>
          </tr>`,
            )
            .join("")}
        </table>

        <!-- Primary CTA -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
          <tr>
            <td align="center">
              <a href="${loginUrl}"
                 style="display:inline-block;background:#e8ff47;color:#0a0a0a;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:8px;letter-spacing:0.01em;">
                Access your dashboard &rarr;
              </a>
            </td>
          </tr>
        </table>
        <p style="margin:0 0 28px;text-align:center;font-size:12px;color:#999;">
          Log in with: ${email}
        </p>

        ${
          hasResources
            ? `<!-- Resources link -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border:1px solid #e8e8e8;border-radius:6px;">
          <tr>
            <td style="padding:18px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#666;">
                Additional resources
              </p>
              <p style="margin:8px 0 12px;font-size:14px;color:#333;line-height:1.6;">
                Supplementary materials, templates and extras are here:
              </p>
              <a href="${RESOURCES_URL}"
                 style="font-size:14px;color:#2563eb;text-decoration:underline;word-break:break-all;">
                ${RESOURCES_URL}
              </a>
            </td>
          </tr>
        </table>`
            : ""
        }

        <!-- How to access -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr>
            <td>
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#111;text-transform:uppercase;letter-spacing:0.08em;">
                How to access
              </p>
              <p style="margin:0 0 6px;font-size:14px;color:#555;line-height:1.6;">
                1. Click the button above (or go to ${base}/dashboard)
              </p>
              <p style="margin:0 0 6px;font-size:14px;color:#555;line-height:1.6;">
                2. Log in with <strong>${email}</strong>
              </p>
              <p style="margin:0;font-size:14px;color:#555;line-height:1.6;">
                3. Everything is available immediately in your dashboard
              </p>
            </td>
          </tr>
        </table>

        <p style="margin:0;font-size:14px;color:#555;line-height:1.7;">
          Any issues accessing your purchase, just reply to this email and I&rsquo;ll sort it out straight away.
          <br /><br />
          Harvey
        </p>

      </td>
    </tr>
  `);
}

export function resourcesText(email: string): string {
  const base = getBaseUrl();
  return `Your Car Flipping Playbook purchase is confirmed.

What's included:
- 8-Module Video Course
- 40-Point Inspection Checklist
- Negotiation Scripts
- Profit Calculator
- UK Sourcing Guide
- Listing Templates

Access your dashboard: ${base}/dashboard
Log in with: ${email}
${RESOURCES_URL ? `\nAdditional resources: ${RESOURCES_URL}\n` : ""}
Any issues, reply to this email.

Harvey`;
}

// ── 3. Contact enquiry notification (internal) ──────────────

type ContactData = {
  name: string;
  email: string;
  subject: string | null;
  message: string;
};

export function contactEnquiryHtml(data: ContactData): string {
  const subjectRow = data.subject
    ? `<tr>
        <td style="padding:10px 16px;background:#f9f9f9;border-bottom:1px solid #e8e8e8;width:90px;vertical-align:top;">
          <p style="margin:0;font-size:12px;font-weight:600;color:#666;">Subject</p>
        </td>
        <td style="padding:10px 16px;border-bottom:1px solid #e8e8e8;">
          <p style="margin:0;font-size:14px;color:#333;">${esc(data.subject)}</p>
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="padding:24px 32px;background:#0a0a0a;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#e8ff47;">
                Car Flipping Playbook
              </p>
              <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#ffffff;">
                New contact enquiry
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid #e8e8e8;border-radius:6px;overflow:hidden;">
                <tr>
                  <td style="padding:10px 16px;background:#f9f9f9;border-bottom:1px solid #e8e8e8;width:90px;vertical-align:top;">
                    <p style="margin:0;font-size:12px;font-weight:600;color:#666;">Name</p>
                  </td>
                  <td style="padding:10px 16px;border-bottom:1px solid #e8e8e8;">
                    <p style="margin:0;font-size:14px;color:#333;">${esc(data.name)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#f9f9f9;border-bottom:1px solid #e8e8e8;vertical-align:top;">
                    <p style="margin:0;font-size:12px;font-weight:600;color:#666;">Email</p>
                  </td>
                  <td style="padding:10px 16px;border-bottom:1px solid #e8e8e8;">
                    <p style="margin:0;font-size:14px;color:#333;">
                      <a href="mailto:${esc(data.email)}" style="color:#2563eb;">${esc(data.email)}</a>
                    </p>
                  </td>
                </tr>
                ${subjectRow}
              </table>

              <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
              <div style="background:#f9f9f9;border:1px solid #e8e8e8;border-radius:6px;padding:16px 18px;">
                <p style="margin:0;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;">${esc(data.message)}</p>
              </div>

              <p style="margin:20px 0 0;font-size:13px;color:#999;">
                Reply directly to this email to respond to ${esc(data.name)}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function contactEnquiryText(data: ContactData): string {
  return `New contact enquiry — Car Flipping Playbook

From: ${data.name} <${data.email}>
${data.subject ? `Subject: ${data.subject}\n` : ""}
Message:
${data.message}

---
Reply directly to this email to respond.`;
}

// ── 4. Contact confirmation (to the sender) ─────────────────

export function contactConfirmationHtml(data: ContactData): string {
  return wrap(`
    <tr>
      <td style="padding:40px 32px 0;">
        <p style="margin:0 0 24px;font-size:15px;color:#111;line-height:1.7;">Hi ${esc(data.name)},</p>
        <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.7;">
          Thanks for getting in touch — I've received your message and will get back to you as
          soon as possible, usually within a day or two.
        </p>
        <p style="margin:0 0 24px;font-size:15px;color:#333;line-height:1.7;">
          For reference, here's what you sent:
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border:1px solid #e8e8e8;border-radius:6px;overflow:hidden;">
          ${data.subject ? `<tr>
            <td style="padding:10px 18px;background:#f9f9f9;border-bottom:1px solid #e8e8e8;">
              <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#666;">Subject</p>
              <p style="margin:4px 0 0;font-size:14px;color:#333;">${esc(data.subject)}</p>
            </td>
          </tr>` : ""}
          <tr>
            <td style="padding:10px 18px;">
              <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#666;">Message</p>
              <p style="margin:4px 0 0;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;">${esc(data.message)}</p>
            </td>
          </tr>
        </table>

        <p style="margin:0 0 8px;font-size:15px;color:#333;line-height:1.7;">
          Speak soon,
        </p>
        <p style="margin:0 0 40px;font-size:15px;color:#111;font-weight:600;line-height:1.7;">
          Harvey
        </p>
      </td>
    </tr>
  `);
}

export function contactConfirmationText(data: ContactData): string {
  return `Hi ${data.name},

Thanks for getting in touch — I've received your message and will get back to you as soon as possible, usually within a day or two.

For reference, here's what you sent:
${data.subject ? `\nSubject: ${data.subject}\n` : ""}
Message:
${data.message}

Speak soon,
Harvey`;
}
