import { PasswordForm } from "@/components/auth/password-form";
import { LogoutButton } from "@/components/auth/logout-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireUser } from "@/lib/auth/require-user";

export const metadata = {
  title: "Account",
};

export default async function AccountPage() {
  await requireUser("/account");

  return (
    <div className="min-h-full bg-zinc-950 px-6 py-12 text-zinc-50">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Account</h1>
            <p className="mt-2 text-zinc-400">Optional password for faster sign-in</p>
          </div>
          <LogoutButton />
        </header>

        <Card className="border-zinc-800">
          <CardHeader>
            <CardTitle>Set a password</CardTitle>
            <CardDescription>
              You can keep using email codes, or add a password to log in without a code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
