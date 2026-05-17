import { LoginForm } from "@/components/auth/login-form";

type LoginPageProps = {
  searchParams: Promise<{ email?: string; next?: string }>;
};

export const metadata = {
  title: "Log in",
  description: "Access your purchase with a one-time email code",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { email, next } = await searchParams;

  return (
    <LoginForm defaultEmail={email ?? ""} nextPath={next ?? "/dashboard"} />
  );
}
