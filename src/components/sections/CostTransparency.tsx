"use client";

/**
 * CostTransparency — Homepage section #6 per design-system.md §11 +
 * app/page.tsx rhythm map.
 *
 * Tone: light. Purpose: education + commerce.
 * Eyebrow: "What does it cost?"
 * H2: "Real prices on real projects."
 * Below: 3 mini-cards showing mid-range bands ONLY:
 *   Kitchen $35K-$45K · Bath $15K-$22K · Coffered Ceiling $3.5K-$5.5K
 * NO full table on the homepage — that lives on /services/cost.
 * CTA: "See all 6 service ranges →" → /services/cost
 *
 * Source: market-intelligence.md §4 typical ranges (mid-range column).
 */

import Link from "next/link";
import { ScaleIn } from "@/components/animations";

// [DEMO COPY — pending client review]
// Mid-range bands quoted from market-intelligence.md §4 + the language Tony's
// existing reviews use ("most of ours land at..."). Three teaser bands only.
const teaserBands = [
  {
    emoji: "🍳",
    serviceName: "Kitchen Remodels",
    range: "$35K to $45K",
    note: "Where most of our Methuen and Andover kitchens land. New cabinets, quartz, lighting, paint, three to four weeks.",
  },
  {
    emoji: "🛁",
    serviceName: "Bathroom Remodels",
    range: "$15K to $22K",
    note: "Tear out, tile a curbed shower, new vanity, lighting, fan, permits. Ten to fourteen working days.",
  },
  {
    emoji: "🪚",
    serviceName: "Coffered Ceiling",
    range: "$3.5K to $5.5K",
    note: "12 by 14 dining room, MDF beam grid, painted on site. Three to five working days.",
  },
] as const;

export default function CostTransparency() {
  return (
    <section
      className="surface-light w-full"
      data-motion="aurora"
      data-texture="paper"
      aria-label="Real prices on real projects"
    >
      <div
        className="surface-content w-full mx-auto px-6 lg:px-8 py-16 md:py-24"
        style={{ maxWidth: "var(--container-default)" }}
      >
        <div className="text-center" style={{ marginBottom: "var(--space-2xl)" }}>
          <p
            className="text-eyebrow font-display"
            style={{
              color: "var(--primary)",
              marginBottom: "var(--space-sm)",
            }}
          >
            What does it cost?
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-h2)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "var(--text-primary-light)",
              maxWidth: "24ch",
              margin: "0 auto",
            }}
          >
            Real prices on real projects.
          </h2>
          <p
            className="font-body text-body-lg"
            style={{
              color: "var(--text-secondary-light)",
              maxWidth: "52ch",
              margin: "var(--space-md) auto 0",
            }}
          >
            {/* [DEMO COPY — pending client review] */}
            Every other contractor in the corridor hides behind a contact form. We
            publish ranges, in writing, in 24 hours. Here are three to anchor on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {teaserBands.map((band, i) => (
            <ScaleIn key={band.serviceName} delay={i * 0.08} from={0.95}>
              <article
                className="h-full p-6 md:p-7"
                style={{
                  background: "var(--bg-card-light)",
                  border: "1px solid var(--border-card-light)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "2rem",
                    lineHeight: 1,
                    display: "inline-block",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  {band.emoji}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "var(--text-h4)",
                    lineHeight: 1.25,
                    color: "var(--text-primary-light)",
                    marginBottom: "var(--space-2xs)",
                  }}
                >
                  {band.serviceName}
                </h3>
                <p
                  className="font-mono"
                  style={{
                    fontSize: "var(--text-h3)",
                    color: "var(--primary)",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  {band.range}
                </p>
                <p
                  className="font-body text-body-sm"
                  style={{
                    color: "var(--text-secondary-light)",
                    lineHeight: 1.55,
                  }}
                >
                  {band.note}
                </p>
              </article>
            </ScaleIn>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: "var(--space-2xl)" }}>
          <Link
            href="/services/cost"
            className="inline-flex items-center justify-center font-display font-bold uppercase"
            style={{
              background: "var(--primary)",
              color: "var(--text-primary)",
              padding: "0.875rem 1.75rem",
              borderRadius: "var(--radius-md)",
              letterSpacing: "0.06em",
              transition: "background 180ms ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--primary-muted)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--primary)";
            }}
          >
            See All 6 Service Ranges →
          </Link>
        </div>
      </div>
    </section>
  );
}
