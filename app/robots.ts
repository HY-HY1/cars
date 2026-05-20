import type { MetadataRoute } from "next";

import { getBaseUrl } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/checkout/", "/onboarding/", "/auth/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
