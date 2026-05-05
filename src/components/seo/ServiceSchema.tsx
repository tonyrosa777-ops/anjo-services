/**
 * ServiceSchema.tsx — Per-service JSON-LD.
 *
 * Renders on each /services/[slug] page. The provider field links by @id
 * back to the homepage GeneralContractor entity (see GeneralContractorSchema)
 * so Google understands all six Service nodes share one provider org.
 *
 * Price extraction policy [DEMO COPY — pending exact-pricing confirmation]:
 *   We parse min/max from the FIRST and LAST PriceBand on the ServiceDetail.
 *   The market-intelligence.md §4 ranges are the source of truth; price band
 *   values may shift slightly post-client-review without breaking schema.
 *   If parsing fails (no numeric content found), the offer is omitted —
 *   per Schema field policy "omit over invent."
 */

import type { Service } from "@/data/site";
import type { ServiceDetail } from "@/data/serviceDetails";
import { JsonLd } from "./JsonLd";
import { ANJO_ORG_ID } from "./GeneralContractorSchema";

/**
 * Pulls a USD numeric value out of strings like "$1,500", "$25K", "$130K+",
 * "$3,500 to $5,500", etc.  Returns null if no number found.
 *
 * "K" is interpreted as ×1000.
 */
function parseUsdValue(token: string): number | null {
  const cleaned = token.replace(/[$,\s+]/g, "").toLowerCase();
  const match = cleaned.match(/^([0-9.]+)(k)?/);
  if (!match) return null;
  const base = parseFloat(match[1]);
  if (!isFinite(base)) return null;
  return match[2] === "k" ? base * 1000 : base;
}

/**
 * Returns [min, max] across every priceBands[].range string by tokenizing
 * on " to " and "-". Returns null if the bands produce no usable numbers.
 */
function extractPriceRange(detail: ServiceDetail): { min: number; max: number } | null {
  const values: number[] = [];
  for (const band of detail.priceBands) {
    const tokens = band.range.split(/\s+to\s+|–|—|-/i);
    for (const token of tokens) {
      const v = parseUsdValue(token.trim());
      if (v !== null) values.push(v);
    }
  }
  if (values.length === 0) return null;
  return { min: Math.min(...values), max: Math.max(...values) };
}

export function ServiceSchema({
  service,
  detail,
}: {
  service: Service;
  detail: ServiceDetail;
}) {
  const range = extractPriceRange(detail);

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: detail.heroSubhead,
    url: `https://anjoservices.com/services/${service.slug}`,
    areaServed: [
      { "@type": "State", name: "Massachusetts" },
      { "@type": "State", name: "New Hampshire" },
    ],
    provider: {
      "@id": ANJO_ORG_ID,
    },
  };

  if (range) {
    schema.offers = {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: range.min,
        maxPrice: range.max,
      },
    };
  }

  return <JsonLd schema={schema} />;
}

export default ServiceSchema;
