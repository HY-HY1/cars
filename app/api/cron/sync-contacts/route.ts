import { NextRequest, NextResponse } from "next/server";

import { getCronSecret } from "@/lib/env";
import { syncAllContacts } from "@/lib/resend/contacts";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(req: NextRequest): Promise<NextResponse> {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${getCronSecret()}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from("customers")
    .select("email, purchase_status");

  if (error) {
    console.error("[cron/sync-contacts] DB error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = await syncAllContacts(data ?? []);
  console.log("[cron/sync-contacts] done:", result);

  return NextResponse.json({ ok: true, ...result });
}
