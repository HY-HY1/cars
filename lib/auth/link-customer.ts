import "server-only";

import { linkCustomerToAuthUser } from "@/lib/customers";
import { createClient } from "@/lib/supabase/server";

export async function linkSessionCustomer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return;

  await linkCustomerToAuthUser(user.id, user.email);
}
