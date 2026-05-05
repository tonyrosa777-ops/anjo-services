import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo";
import BlogIndexClient from "./BlogIndexClient";

/**
 * /blog — Blog index server wrapper.
 *
 * Per market-intelligence.md §6, the blog is the AEO content hub. Every
 * article targets a question Google AI Overviews surfaces. This index page
 * is the entry point.
 *
 * Server component: owns metadata + Breadcrumb schema. Renders the client
 * island that handles category-tab filtering interactivity.
 */

export const metadata: Metadata = {
  title:
    "The Anjo Blog | Real Prices, Real Process, Real Methuen",
  description:
    "Cost guides, hire-smart checklists, and finish-carpentry walkthroughs from Tony Squillini. Kitchen remodel cost in Methuen MA, Massachusetts contractor licensing, and how to find a contractor who actually shows up.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "https://anjoservices.com/blog",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title: "The Anjo Blog | Real Prices, Real Process, Real Methuen",
    description:
      "Cost guides, hire-smart checklists, and finish-carpentry walkthroughs from Tony Squillini. Methuen, Andover, Haverhill, Salem NH.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Anjo Blog | Real Prices, Real Process, Real Methuen",
    description:
      "Cost guides, hire-smart checklists, and finish-carpentry walkthroughs from Tony Squillini.",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />
      <BlogIndexClient />
    </>
  );
}
