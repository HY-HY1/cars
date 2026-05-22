import "server-only";

import { getResendAudienceId } from "@/lib/env";
import { getResendClient } from "./client";

export async function addSubscriber(email: string): Promise<void> {
  const resend = getResendClient();
  const audienceId = getResendAudienceId("subscribers");
  await resend.contacts.create({ email, audienceId, unsubscribed: false });
}

export async function addCustomer(email: string): Promise<void> {
  const resend = getResendClient();
  // Customers go into both audiences
  const [subscribersId, customersId] = [
    getResendAudienceId("subscribers"),
    getResendAudienceId("customers"),
  ];
  await Promise.all([
    resend.contacts.create({ email, audienceId: subscribersId, unsubscribed: false }),
    resend.contacts.create({ email, audienceId: customersId, unsubscribed: false }),
  ]);
}

type SyncResult = { synced: number; errors: number };

export async function syncAllContacts(
  rows: { email: string; purchase_status: string | null }[],
): Promise<SyncResult> {
  const resend = getResendClient();
  const subscribersId = getResendAudienceId("subscribers");
  const customersId = getResendAudienceId("customers");

  let synced = 0;
  let errors = 0;

  for (const row of rows) {
    try {
      const ops: Promise<unknown>[] = [
        resend.contacts.create({ email: row.email, audienceId: subscribersId, unsubscribed: false }),
      ];
      if (row.purchase_status === "active") {
        ops.push(
          resend.contacts.create({ email: row.email, audienceId: customersId, unsubscribed: false }),
        );
      }
      await Promise.all(ops);
      synced++;
    } catch {
      errors++;
    }
  }

  return { synced, errors };
}
