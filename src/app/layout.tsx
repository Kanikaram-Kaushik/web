import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import { AuthProvider } from "@/components/auth/AuthProvider";
import AuthQueryListener from "@/components/auth/AuthQueryListener";
import { ThemeProvider } from "next-themes";
import AppProviders from "@/components/providers/AppProviders";
import { Suspense } from "react";
import { NewsletterPopup } from "@/components/NewsletterPopup";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "DesignBHK Discovery",
    template: "%s | DesignBHK Discovery",
  },
  description: "Discover interior designers, architects, and inspirations curated for modern living.",
  metadataBase: new URL("https://designbhk.example"),
  openGraph: {
    title: "DesignBHK Discovery",
    description: "Explore interior designers, studios, and inspiration for every room, style, and mood.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AppProviders>
            <AuthProvider>
              <SiteShell>{children}</SiteShell>
              <Suspense fallback={null}>
                <AuthQueryListener />
                <NewsletterPopup />
              </Suspense>
            </AuthProvider>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
