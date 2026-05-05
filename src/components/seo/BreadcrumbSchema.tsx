/**
 * BreadcrumbSchema.tsx — BreadcrumbList JSON-LD.
 *
 * Applied to every interior page. Items are passed deepest-page LAST
 * (parent-to-child order) per Google's documented BreadcrumbList shape:
 * position 1 = root (Home), position N = current page.
 *
 * Caller passes absolute paths from site root; this component prefixes the
 * canonical origin to produce fully-qualified URLs.
 */

import { JsonLd } from "./JsonLd";

const BASE = "https://anjoservices.com";

export type BreadcrumbItem = {
  name: string;
  /** Absolute path from site root, e.g. "/services/finish-carpentry". */
  url: string;
};

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const itemListElement = items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: item.url.startsWith("http") ? item.url : `${BASE}${item.url}`,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return <JsonLd schema={schema} />;
}

export default BreadcrumbSchema;
