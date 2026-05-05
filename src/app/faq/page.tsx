import type { Metadata } from "next";
import { faqs } from "@/data/site";
import { FAQPageSchema, BreadcrumbSchema } from "@/components/seo";
import FaqClient from "./FaqClient";

/**
 * /faq — server wrapper for the FAQ accordion (FaqClient).
 *
 * Why split: FaqClient uses Radix Accordion which requires `"use client"`,
 * but Next.js disallows `metadata` exports from client components. The server
 * shell here owns metadata + FAQPage JSON-LD + Breadcrumb schema.
 *
 * Per market-intelligence.md §6 AEO content gap list, every faqs[] entry
 * matches a question Google AI Overviews surfaces in the contractor /
 * remodeling category — so FAQPage schema here directly feeds AI Overview
 * citations.
 */

export const metadata: Metadata = {
  title: "FAQ: Cost, License, Process | Anjo Services in Methuen MA",
  description:
    "Honest answers to the questions homeowners actually ask. Kitchen remodel cost in Methuen, MA HIC and CSL licensing, permit handling, timeline, and how we finish what other contractors started.",
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    url: "https://anjoservices.com/faq",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title: "FAQ: Cost, License, Process | Anjo Services in Methuen MA",
    description:
      "Honest answers to questions homeowners actually ask. Cost, license, permits, timelines, finishing abandoned projects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ: Cost, License, Process | Anjo Services in Methuen MA",
    description:
      "Cost, license, permits, timelines, finishing abandoned projects.",
  },
};

export default function FaqPage() {
  return (
    <>
      <FAQPageSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />
      <FaqClient />
    </>
  );
}
