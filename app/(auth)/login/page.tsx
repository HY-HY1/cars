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
    <div className="min-h-[40vh] ">
      <div className="h- mt-10">
        <LoginForm defaultEmail={email ?? ""} nextPath={next ?? "/dashboard"} />
      </div>
    </div>
  );
}
