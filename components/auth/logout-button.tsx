"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/actions";

export function LogoutButton() {
  return (
    <form action={signOut}>
      <Button type="submit" variant="outline" size="sm">
        Log out
      </Button>
    </form>
  );
}
