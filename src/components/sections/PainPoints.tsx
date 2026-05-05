"use client";

/**
 * PainPoints — Homepage section #2 per design-system.md §11 + app/page.tsx
 * rhythm map.
 *
 * Tone: light. Purpose: empathy. NO CTAs (template rule — empathy only).
 * Layout: 2x2 grid of 4 cards from /data/site.ts painPoints[].
 * Each card: emoji + headline + body. ScaleIn staggered.
 * Hover: 1px var(--primary-muted) border.
 *
 * Emojis already locked in painPoints[]: 👻 💸 🧹 🌙 (per design-system §11
 * row 2 + CLAUDE.md Code Standards icon rule).
 */

import { painPoints } from "@/data/site";
import { ScaleIn } from "@/components/animations";

export default function PainPoints() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--bg-base)",
        color: "var(--text-primary-light)",
      }}
      aria-label="Common contractor pain points we fix"
    >
      {/* Static gradient overlay (light section) — no motion to keep budget */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: "var(--bg-light-overlay-radial)" }}
      />

      <div
        className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-24"
        style={{ maxWidth: "var(--container-default)", zIndex: 1 }}
      >
        <div className="text-center" style={{ marginBottom: "var(--space-2xl)" }}>
          <p
            className="text-eyebrow font-display"
            style={{
              color: "var(--primary)",
              marginBottom: "var(--space-sm)",
            }}
          >
            We hear it every week
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-h2)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "var(--text-primary-light)",
              maxWidth: "32ch",
              margin: "0 auto",
            }}
          >
            Four things every homeowner in this corridor has dealt with.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {painPoints.map((pain, i) => (
            <ScaleIn key={pain.headline} delay={i * 0.08} from={0.95}>
              <article
                className="h-full p-6 md:p-8 transition-colors"
                style={{
                  background: "var(--bg-card-light)",
                  border: "1px solid var(--border-card-light)",
                  borderRadius: "var(--radius-lg)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary-muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-card-light)";
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "2.25rem",
                    lineHeight: 1,
                    display: "inline-block",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  {pain.emoji}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "var(--text-h4)",
                    lineHeight: 1.25,
                    color: "var(--text-primary-light)",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  {pain.headline}
                </h3>
                <p
                  className="font-body text-body"
                  style={{
                    color: "var(--text-secondary-light)",
                    lineHeight: 1.6,
                  }}
                >
                  {pain.body}
                </p>
              </article>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  );
}
