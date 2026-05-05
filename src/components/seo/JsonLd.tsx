/**
 * JsonLd.tsx — Generic JSON-LD <script> wrapper.
 *
 * Used by every schema component (GeneralContractor, Service, BreadcrumbList,
 * FAQPage). Serializes the schema object safely and emits a single
 * <script type="application/ld+json"> tag.
 *
 * Why dangerouslySetInnerHTML over JSON.stringify in {children}:
 *   React would otherwise HTML-escape JSON characters, which Google's
 *   Rich Results Test rejects as malformed. Standard pattern across
 *   Next.js SEO docs.
 *
 * The script intentionally renders inline (not deferred) so server-side
 * crawlers see it on the initial HTML payload.
 */

type SchemaInput = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ schema, id }: { schema: SchemaInput; id?: string }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default JsonLd;
