/**
 * /services/[slug] — Server component for individual service detail pages.
 *
 * Per Next.js 16 App Router (project uses next 16.2.4 — see AGENTS.md
 * "this is NOT the Next.js you know"): `params` is a Promise.
 *
 * Pattern per project-prime.md Stage 1E section 19D:
 *   - generateStaticParams from services[] in /data/site.ts
 *   - generateMetadata per-service title + description from serviceDetails
 *   - notFound() for invalid slugs
 *   - Renders <ServicePageClient detail={...} service={...} /> + JSON-LD
 *
 * Schemas emitted (per market-intelligence.md §6 + agent file Step 2):
 *   - ServiceSchema    — Service entity, links to homepage GeneralContractor
 *                        via @id, with offers/priceSpecification from
 *                        serviceDetails.priceBands
 *   - FAQPageSchema    — per-service FAQ items, feeds AI Overview citations
 *   - BreadcrumbSchema — Home > Services > [Service Name]
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/site";
import { serviceDetails, type ServiceSlug } from "@/data/serviceDetails";
import {
  ServiceSchema,
  FAQPageSchema,
  BreadcrumbSchema,
} from "@/components/seo";
import ServicePageClient from "./ServicePageClient";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return services.map((s) => ({ slug: s.slug }));
}

// Per-service description overrides keep meta unique across all six slugs.
// Source: market-intelligence.md §4 pricing intel + §6 keywords. Each is
// <=160 chars and includes one primary or long-tail keyword for that service.
const META_BY_SLUG: Record<string, { title: string; description: string }> = {
  "finish-carpentry": {
    title:
      "Finish Carpentry & Accent Walls in Methuen MA + Andover | Anjo Services",
    description:
      "Coffered ceilings, board and batten, shiplap, custom millwork. $1,500 to $5,500 typical. Three to six day turnaround across Methuen, Andover, and southern NH.",
  },
  "kitchen-remodels": {
    title:
      "Kitchen Remodels in Methuen MA + North Shore | Anjo Services",
    description:
      "Most Methuen and Andover kitchens land $35K to $45K. Real prices, written 24-hour quote, three to four week turnaround. Permitted, inspected, warrantied.",
  },
  "bathroom-remodels": {
    title:
      "Bathroom Remodels in Methuen MA + Salem NH | Anjo Services",
    description:
      "Tile shower, vanity, fixtures, lighting. Tear-out to final caulk in 9 to 14 working days. $12K to $28K typical across Methuen, Andover, Haverhill, and Salem NH.",
  },
  "decks-fences-pergolas": {
    title:
      "Decks, Fences & Pergolas in North Shore MA + NH | Anjo Services",
    description:
      "Composite, cedar, pressure-treated. Footings inspected, posts plumb, gates that latch. $5K to $25K typical. Methuen, Andover, Haverhill, Salem NH, Windham NH.",
  },
  "interior-exterior-painting": {
    title:
      "Interior + Exterior Painting in Methuen MA + Andover | Anjo Services",
    description:
      "Whole-house interior, single accent room, exterior siding and trim. Sherwin-Williams or Benjamin Moore, two coats minimum. $4K to $9K interior typical.",
  },
  "handyman-honey-do": {
    title:
      "Handyman & Honey-Do in Methuen MA + Salem NH | Anjo Services",
    description:
      "Flat rates, no hourly mystery. TV mount $185, ceiling fan $245, half-day $350, full-day $850. Same person every visit across Methuen, Andover, and Salem NH.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const detail = (serviceDetails as Record<string, (typeof serviceDetails)[ServiceSlug]>)[slug];
  if (!service || !detail) return {};

  const meta = META_BY_SLUG[slug] ?? {
    title: `${service.name} in Methuen MA + North Shore | Anjo Services`,
    description: detail.heroSubhead.slice(0, 158),
  };

  const url = `https://anjoservices.com/services/${slug}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: "Anjo Services, LLC",
      locale: "en_US",
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const detail = (serviceDetails as Record<string, (typeof serviceDetails)[ServiceSlug]>)[slug];
  if (!service || !detail) notFound();

  return (
    <>
      <ServiceSchema service={service} detail={detail} />
      <FAQPageSchema items={detail.serviceFaqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: service.name, url: `/services/${service.slug}` },
        ]}
      />
      <ServicePageClient service={service} detail={detail} />
    </>
  );
}
