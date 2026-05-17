import { NextResponse } from "next/server";

import { sendPurchaseEmails } from "@/lib/email/send";

// Dev-only route — remove before production or guard with an admin secret
export async function GET(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const to = searchParams.get("to");

  if (!to) {
    return NextResponse.json({ error: "Pass ?to=your@email.com" }, { status: 400 });
  }

  try {
    await sendPurchaseEmails(to);
    return NextResponse.json({ ok: true, message: `Emails sent to ${to}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[test-email]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
