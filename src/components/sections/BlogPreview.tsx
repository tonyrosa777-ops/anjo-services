"use client";

/**
 * BlogPreview — Homepage section #9 per design-system.md §11 + app/page.tsx
 * rhythm map.
 *
 * Tone: dark. Purpose: content preview.
 * Layout: 3 placeholder blog cards in a horizontal row.
 * Each card: 16:9 placeholder image, category chip, title, 2-sentence excerpt,
 * "Read more" link → /blog/[slug].
 *
 * Three placeholder titles aligned with market-intelligence.md §6 AEO gaps:
 *   1. "How much does a kitchen remodel cost in Methuen MA in 2025?"
 *   2. "What questions to ask before hiring a contractor in MA"
 *   3. "Coffered ceiling installation: 4 styles for a 1980s colonial."
 *
 * Image paths: /blog/placeholder-{slug}-card.jpg — Stage 1G fal.ai will
 * replace these with real images. Until then we render a styled placeholder.
 *
 * All copy marked [DEMO COPY — pending blog Stage 1G].
 */

import Link from "next/link";
import { ScaleIn } from "@/components/animations";

type BlogCard = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  imageSrc: string;
};

// [DEMO COPY — pending blog Stage 1G]
const placeholderPosts: BlogCard[] = [
  {
    slug: "kitchen-remodel-cost-methuen-ma-2025",
    category: "Pricing",
    title: "How much does a kitchen remodel cost in Methuen MA in 2025?",
    excerpt:
      "Most of our Methuen, Andover, and Haverhill kitchens land between $35,000 and $45,000. Here is the line-item breakdown of where the dollars actually go.",
    imageSrc: "/blog/placeholder-kitchen-remodel-cost-methuen-ma-2025-card.jpg",
  },
  {
    slug: "questions-to-ask-before-hiring-contractor-ma",
    category: "Hiring Guide",
    title: "What questions to ask before hiring a contractor in MA",
    excerpt:
      "Three signals tell you whether a contractor will actually show up. License lookup, written line items, and a real address you can drive past. The rest is marketing.",
    imageSrc:
      "/blog/placeholder-questions-to-ask-before-hiring-contractor-ma-card.jpg",
  },
  {
    slug: "coffered-ceiling-styles-1980s-colonial",
    category: "Finish Carpentry",
    title: "Coffered ceiling installation: 4 styles for a 1980s colonial.",
    excerpt:
      "Square grid, beam-and-flat, recessed panel, or shadow box. Photos from real Methuen and Andover dining rooms with prices and lead times attached.",
    imageSrc: "/blog/placeholder-coffered-ceiling-styles-1980s-colonial-card.jpg",
  },
];

export default function BlogPreview() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--bg-dark-base)",
        color: "var(--text-primary)",
      }}
      aria-label="Latest from the blog"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "var(--bg-dark-overlay-radial)" }}
      />

      <div
        className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-24"
        style={{ maxWidth: "var(--container-wide)", zIndex: 1 }}
      >
        <div className="text-center" style={{ marginBottom: "var(--space-2xl)" }}>
          <p
            className="text-eyebrow font-display"
            style={{
              color: "var(--accent)",
              marginBottom: "var(--space-sm)",
            }}
          >
            From the field notes
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-h2)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
              maxWidth: "30ch",
              margin: "0 auto",
            }}
          >
            What we tell every homeowner before the walkthrough.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {placeholderPosts.map((post, i) => (
            <ScaleIn key={post.slug} delay={i * 0.08} from={0.96}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full overflow-hidden transition-colors"
                style={{
                  background: "var(--bg-card-dark)",
                  border: "1px solid var(--border-card-dark)",
                  borderRadius: "var(--radius-lg)",
                  textDecoration: "none",
                  color: "var(--text-primary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-card-dark)";
                }}
              >
                {/* 16:9 placeholder — fal.ai will replace at Stage 1G */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%",
                    background:
                      "linear-gradient(135deg, rgba(200,32,44,0.18) 0%, rgba(232,176,76,0.10) 60%, rgba(255,255,255,0.04) 100%)",
                    borderBottom: "1px solid var(--border-card-dark)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                      opacity: 0.45,
                    }}
                  >
                    {post.category === "Finish Carpentry"
                      ? "🪚"
                      : post.category === "Pricing"
                        ? "💸"
                        : "📋"}
                  </div>
                </div>
                <div style={{ padding: "var(--space-md) var(--space-md) var(--space-lg)" }}>
                  <span
                    className="inline-block font-mono text-meta"
                    style={{
                      color: "var(--accent)",
                      background: "rgba(232, 176, 76, 0.08)",
                      border: "1px solid rgba(232, 176, 76, 0.25)",
                      padding: "0.25rem 0.55rem",
                      borderRadius: "var(--radius-sm)",
                      letterSpacing: "0.04em",
                      marginBottom: "var(--space-sm)",
                      textTransform: "uppercase",
                    }}
                  >
                    {post.category}
                  </span>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "var(--text-h4)",
                      lineHeight: 1.25,
                      color: "var(--text-primary)",
                      marginTop: "var(--space-sm)",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="font-body text-body-sm"
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.55,
                      marginBottom: "var(--space-md)",
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <span
                    className="font-display text-body-sm"
                    style={{
                      color: "var(--primary)",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    Read more →
                  </span>
                </div>
              </Link>
            </ScaleIn>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: "var(--space-2xl)" }}>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center font-display font-bold uppercase"
            style={{
              background: "transparent",
              color: "var(--text-primary)",
              padding: "0.875rem 1.75rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--primary)",
              letterSpacing: "0.06em",
              transition: "background 180ms ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--primary-soft)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "transparent";
            }}
          >
            All Articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
