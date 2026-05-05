/**
 * GeneralContractorSchema.tsx — Homepage-only entity schema.
 *
 * Per market-intelligence.md §6, GeneralContractor is preferred over the
 * generic LocalBusiness type because it ranks better in industry SERPs.
 * Multi-typed as ["GeneralContractor", "HomeAndConstructionBusiness"] to
 * give AI Overviews a parent fallback type.
 *
 * Renders ONCE on the homepage (`/`) only. The @id ("https://anjoservices.com/#org")
 * is the canonical reference that Service schemas on /services/[slug] pages
 * link back to via { provider: { "@id": "https://anjoservices.com/#org" } }.
 *
 * Field policy (per agent file Schema field policy — omit over invent):
 *   - DO NOT include aggregateRating or review (Anjo has zero verified
 *     on-site reviews; below 25-review threshold per market-intelligence.md
 *     §6 — would look thin and invite manual-review flags).
 *   - DO NOT include streetAddress (no published street address per
 *     initial-business-data.md §1).
 *   - DO NOT include sameAs links until client confirms social profiles
 *     (Wave 1 flag — initial-business-data.md §5 ⚠️ NOT FOUND).
 *   - email omitted (siteConfig.email is empty / pending client review).
 *
 * Hours [DEMO COPY — confirm with client]:
 *   Schema requires concrete openingHoursSpecification. The actual Anjo
 *   story is the SMS auto-responder running 24/7 with a real-reply window
 *   weekdays 7am-8pm; Saturday is "available by text." For schema we publish
 *   a Mon-Fri 07:00-20:00 + Saturday 08:00-17:00 block, marked DEMO COPY
 *   pending client confirmation of exact hours.
 */

import {
  siteConfig,
  serviceAreas,
  type ServiceArea,
} from "@/data/site";
import { JsonLd } from "./JsonLd";

const ORG_ID = "https://anjoservices.com/#org";

export function GeneralContractorSchema() {
  const areaServed = serviceAreas.map((a: ServiceArea) => ({
    "@type": "City",
    name: `${a.city}, ${a.state}`,
  }));

  // [DEMO COPY — confirm with client]
  const openingHoursSpecification = [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
  ];

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    image: `${siteConfig.url}/Logo.webp`,
    logo: `${siteConfig.url}/Logo.webp`,
    telephone: "+19782166455",
    priceRange: "$$",
    slogan: siteConfig.tagline,
    foundingDate: "2018",
    founder: {
      "@type": "Person",
      name: siteConfig.ownerName,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Methuen",
      addressRegion: "MA",
      addressCountry: "US",
    },
    areaServed,
    openingHoursSpecification,
    // sameAs intentionally omitted — pending client confirmation of social profiles.
  };

  return <JsonLd schema={schema} id="anjo-org-schema" />;
}

export default GeneralContractorSchema;
export const ANJO_ORG_ID = ORG_ID;
