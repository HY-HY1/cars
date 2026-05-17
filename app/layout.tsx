import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";

import { LayoutShell } from "@/components/layout/layout-shell";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
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
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-[#0a0a0a]">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
