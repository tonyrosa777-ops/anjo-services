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
 *   - Renders <ServicePageClient detail={...} service={...} />
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/data/site";
import { serviceDetails, type ServiceSlug } from "@/data/serviceDetails";
import ServicePageClient from "./ServicePageClient";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const detail = (serviceDetails as Record<string, (typeof serviceDetails)[ServiceSlug]>)[slug];
  if (!service || !detail) return {};

  return {
    title: `${service.name} in Methuen, MA + North Shore`,
    description: detail.heroSubhead.slice(0, 158),
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

  return <ServicePageClient service={service} detail={detail} />;
}
