"use client";

/**
 * ServicesSection — Homepage section #3 per design-system.md §11 + app/page.tsx
 * rhythm map.
 *
 * Tone: dark. Purpose: education.
 * Layout: "What we build" eyebrow + h2 + 6-card grid.
 * Order LOCKED — finish-carpentry leads (services[] order from /data/site.ts).
 * Same card shape as /services index, slightly compact.
 * CTA: "See all services with pricing" → /services
 */

import Link from "next/link";
import { services } from "@/data/site";
import { ScaleIn } from "@/components/animations";

export default function ServicesSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--bg-dark-base)",
        color: "var(--text-primary)",
      }}
      aria-label="What we build"
    >
      {/* Mandatory radial overlay — never flat solid */}
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
            What we build
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-h2)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
              maxWidth: "26ch",
              margin: "0 auto",
            }}
          >
            Six services. One contractor. Real prices on every page.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, i) => (
            <ScaleIn key={service.slug} delay={i * 0.06} from={0.96}>
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full p-6 transition-colors"
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
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "2rem",
                    lineHeight: 1,
                    display: "inline-block",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  {service.emoji}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "var(--text-h4)",
                    lineHeight: 1.25,
                    color: "var(--text-primary)",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-body text-body-sm"
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.55,
                    marginBottom: "var(--space-md)",
                  }}
                >
                  {service.positioning}
                </p>
                <span
                  className="inline-block font-mono text-meta"
                  style={{
                    color: "var(--accent)",
                    background: "rgba(232, 176, 76, 0.08)",
                    border: "1px solid rgba(232, 176, 76, 0.25)",
                    padding: "0.35rem 0.65rem",
                    borderRadius: "var(--radius-sm)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {service.priceRange}
                </span>
              </Link>
            </ScaleIn>
          ))}
        </div>

        <div
          className="text-center"
          style={{ marginTop: "var(--space-2xl)" }}
        >
          <Link
            href="/services"
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
            See All Services with Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
