import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig, serviceAreas } from "@/data/site";
import { serviceAreaDescriptions } from "@/data/serviceAreaDescriptions";
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
  const stateName = area.state === "MA" ? "MA" : "NH";
  return {
    title: `Home Improvement Contractor in ${area.city}, ${stateName} | Anjo Services, LLC`,
    description: `Licensed contractor serving ${area.city}, ${stateName}. Kitchen remodels, bath remodels, finish carpentry, decks, painting, handyman. Free quote in 24 hours. Call ${siteConfig.phone}.`,
    alternates: { canonical: `/service-areas/${area.slug}` },
  };
}

export default async function CityPage({ params }: { params: Params }) {
  const { city } = await params;
  const area = serviceAreas.find((a) => a.slug === city);
  if (!area) notFound();

  const description = serviceAreaDescriptions[area.slug];

  return <CityPageClient area={area} description={description} />;
}
