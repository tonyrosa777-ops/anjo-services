import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, serviceAreas } from "@/data/site";
import { serviceAreaDescriptions } from "@/data/serviceAreaDescriptions";
import { BreadcrumbSchema } from "@/components/seo";
import CityPageClient from "./CityPageClient";

/**
 * /service-areas/[city] — server component.
 *
 * Per Next 16 conventions, params is a Promise that must be awaited.
 * generateStaticParams produces 9 prerendered routes (one per ServiceArea).
 *
 * Per project-prime.md Stage 1E step 19.C:
 *   - find area by slug
 *   - notFound() on miss
 *   - render <CityPageClient area={...} description={...} />
 *
 * Schema emitted: BreadcrumbSchema only. City pages surface multiple services
 * (no single Service entity is the page subject) so per agent file Step 2,
 * Service schema lives on /services/[slug] pages instead.
 */

type Params = Promise<{ city: string }>;

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) return {};
  const stateName = area.state;
  const title = `Home Improvement Contractor in ${area.city}, ${stateName} | Anjo Services`;
  const description = `Licensed contractor in ${area.city}, ${stateName}. Kitchen remodels, bath remodels, finish carpentry, decks, painting, handyman. Free written quote within 24 hours. Call ${siteConfig.phone}.`;
  const url = `https://anjoservices.com/service-areas/${area.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${area.slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: "Anjo Services, LLC",
      locale: "en_US",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CityPage({ params }: { params: Params }) {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) notFound();

  const description = serviceAreaDescriptions[area.slug];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
          {
            name: `${area.city}, ${area.state}`,
            url: `/service-areas/${area.slug}`,
          },
        ]}
      />
      <CityPageClient area={area} description={description} />
    </>
  );
}
