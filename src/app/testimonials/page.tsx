import type { Metadata } from "next";
import TestimonialsClient from "./TestimonialsClient";
import { BreadcrumbSchema } from "@/components/seo";

/**
 * /testimonials — server wrapper.
 *
 * The testimonials grid is interactive (URL-state pagination + service filter
 * via React `use(searchParams)`) so the rendering body lives in
 * TestimonialsClient. The server shell here owns metadata + Breadcrumb schema.
 *
 * AggregateRating / Review schema are intentionally OMITTED per
 * market-intelligence.md §6 + agent-file Schema field policy: Anjo has zero
 * verified on-site reviews and is below the 25-review threshold; thin review
 * schema invites manual-review penalties.
 */

export const metadata: Metadata = {
  title:
    "36 Anjo Services Reviews from Methuen, Andover, and Salem NH",
  description:
    "Real homeowner reviews of Anjo Services projects across Methuen, Andover, Haverhill, North Andover, Lawrence, Salem NH, Derry, Windham, and Londonderry. Town, scope, project value on every review.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    type: "website",
    url: "https://anjoservices.com/testimonials",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title:
      "36 Anjo Services Reviews from Methuen, Andover, and Salem NH",
    description:
      "Real homeowner reviews. Town, scope, project value on every review. Methuen MA + North Shore + southern NH.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "36 Anjo Services Reviews from Methuen, Andover, and Salem NH",
    description:
      "Real reviews with town, scope, and project value on every entry.",
  },
};

type SearchParams = { [key: string]: string | string[] | undefined };

export default function TestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Testimonials", url: "/testimonials" },
        ]}
      />
      <TestimonialsClient searchParams={searchParams} />
    </>
  );
}
