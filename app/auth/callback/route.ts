import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

import { linkCustomerToAuthUser } from "@/lib/customers";
import { getBaseUrl, getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const baseUrl = getBaseUrl();
    const redirectTo = new URL(next.startsWith("/") ? next : "/dashboard", baseUrl);
    const response = NextResponse.redirect(redirectTo);

    const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      if (data.user?.email) {
        try {
          await linkCustomerToAuthUser(data.user.id, data.user.email);
        } catch {
          // non-fatal: user is still logged in even if customer linking fails
        }
      }
      return response;
    }
  }

  return NextResponse.redirect(new URL("/login?error=auth_callback", origin));
}
