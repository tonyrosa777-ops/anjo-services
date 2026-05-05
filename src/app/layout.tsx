import type { Metadata } from "next";
import { Saira_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation, Footer } from "@/components/layout";

const sairaCondensed = Saira_Condensed({
  variable: "--font-saira-condensed",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://anjoservices.com"),
  title: {
    default: "Anjo Services, LLC: General Contracting & Handyman | Methuen, MA",
    template: "%s | Anjo Services, LLC",
  },
  description:
    "Working contractor. Real prices. North Shore MA & southern NH since 2018. Kitchen + bath remodels, finish carpentry, decks, painting, handyman.",
  openGraph: {
    type: "website",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sairaCondensed.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navigation />
        {/* pt-24 lg:pt-28 clears the fixed navbar (Error #40 — interior pages
            previously hidden under the nav). Matches nav height: 6rem default,
            5rem scrolled — using 6rem mobile / 7rem desktop padding gives a
            comfortable buffer below the bottom border. */}
        <main className="flex-1 pt-24 lg:pt-28">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
