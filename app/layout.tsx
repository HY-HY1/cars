import type { Metadata } from "next";
import { Geist_Mono, Inter, Montserrat, Poppins, Syne } from "next/font/google";

import { LayoutShell } from "@/components/layout/layout-shell";

import "./globals.css";

// ── Body font options — switch in globals.css ───────────────
const inter       = Inter({      variable: "--font-inter",       subsets: ["latin"] });
const poppins     = Poppins({    variable: "--font-poppins",     subsets: ["latin"], weight: ["400", "500", "600"] });
const montserrat  = Montserrat({ variable: "--font-montserrat",  subsets: ["latin"] });

const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const syne = Syne({ variable: "--font-syne", subsets: ["latin"], weight: ["700", "800"] });

export const metadata: Metadata = {
  title: "Cars",
  description: "Practical car flipping education for beginners",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable} ${geistMono.variable} ${syne.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-[#0a0a0a]">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
