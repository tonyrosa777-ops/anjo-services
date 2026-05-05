/**
 * FAQPageSchema.tsx — FAQPage JSON-LD.
 *
 * Applied to:
 *   - /faq                    (full faqs[] from site.ts)
 *   - /services/[slug]        (per-service serviceFaqs from serviceDetails)
 *   - /services/cost          (10 AEO question-format gaps from
 *                              market-intelligence.md §6 — these are the
 *                              questions Google AI Overviews surface; matching
 *                              FAQ schema feeds AI Overview citations)
 *
 * Each item renders as { @type: "Question", name, acceptedAnswer: { @type:
 * "Answer", text } }. Answers are emitted as plain text (Google does not
 * crawl HTML inside FAQPage answer text — markup is stripped).
 */

import { JsonLd } from "./JsonLd";

export type FaqSchemaItem = {
  q: string;
  a: string;
};

export function FAQPageSchema({ items }: { items: FaqSchemaItem[] }) {
  if (!items || items.length === 0) return null;

  const mainEntity = items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };

  return <JsonLd schema={schema} />;
}

export default FAQPageSchema;
