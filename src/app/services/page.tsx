/**
 * /services — Services index.
 *
 * Page Header Standard per CLAUDE.md:
 *   Fragment root, ambient breathing-orb (not full hero canvas), h1 with
 *   `hero-shimmer font-display text-h1`.
 *
 * Below the page header: 6-card grid in services[] order — finish-carpentry
 * leads. Each card: emoji + name + positioning + priceRange chip + link to
 * /services/[slug]. Final CTA → /booking.
 *
 * Per market-intelligence.md §9 directive #2 + design-system.md §11:
 * order LOCKED, finish-carpentry leads.
 *
 * Page is a server component for static SEO. Card hover effects + ScaleIn
 * animation handled inside the inline ServiceCard subcomponent.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { services, siteConfig } from "@/data/site";
import { ScaleIn } from "@/components/animations";
import { BreadcrumbSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "Services: Six Services, One Contractor | Anjo Services",
  description:
    "Finish carpentry, kitchen remodels, bathroom remodels, decks, painting, handyman. Real prices on every page. Methuen MA + North Shore MA + southern NH since 2018.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "https://anjoservices.com/services",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title: "Services: Six Services, One Contractor | Anjo Services",
    description:
      "Finish carpentry, kitchen remodels, bath remodels, decks, painting, handyman. Real prices, real photos, real Tony.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services: Six Services, One Contractor | Anjo Services",
    description:
      "Finish carpentry, kitchens, baths, decks, painting, handyman. Real prices on every page.",
  },
};

export default function ServicesIndexPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />
      {/* ─── Page Header (ambient orbs, NOT full hero canvas) ──────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
        aria-label="Services overview"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        {/* Ambient breathing orbs — interior page minimum per CLAUDE.md
            Homepage Section Architecture Rule (Animation depth) */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none orb"
          style={{
            top: "10%",
            left: "8%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,32,44,0.20) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute pointer-events-none orb-2"
          style={{
            top: "30%",
            right: "10%",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,176,76,0.15) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />

        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-24"
          style={{ maxWidth: "var(--container-wide)", zIndex: 1 }}
        >
          <div className="text-center">
            <p
              className="text-eyebrow font-display"
              style={{
                color: "var(--accent)",
                marginBottom: "var(--space-sm)",
              }}
            >
              Methuen, MA · since {siteConfig.yearFounded}
            </p>
            <h1
              className="hero-shimmer font-display text-h1"
              style={{
                color: "var(--text-primary)",
                marginBottom: "var(--space-md)",
              }}
            >
              Six Services. One Contractor.
            </h1>
            <p
              className="font-body text-body-lg"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "52ch",
                margin: "0 auto",
              }}
            >
              {/* [DEMO COPY — pending client review] */}
              Finish carpentry leads, the way Tony likes it. Every service has
              real prices, real photos, and the same person on the phone who
              shows up at your door.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Services Grid ─────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
        }}
        aria-label="Service list"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-24"
          style={{ maxWidth: "var(--container-wide)", zIndex: 1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScaleIn key={service.slug} delay={i * 0.06} from={0.96}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full p-7 transition-colors"
                  style={{
                    background: "var(--bg-card-light)",
                    border: "1px solid var(--border-card-light)",
                    borderRadius: "var(--radius-lg)",
                    textDecoration: "none",
                    color: "var(--text-primary-light)",
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
                    {service.emoji}
                  </span>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: "var(--text-h3)",
                      lineHeight: 1.25,
                      color: "var(--text-primary-light)",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    {service.name}
                  </h2>
                  <p
                    className="font-body text-body"
                    style={{
                      color: "var(--text-secondary-light)",
                      lineHeight: 1.6,
                      marginBottom: "var(--space-md)",
                    }}
                  >
                    {service.positioning}
                  </p>
                  <span
                    className="inline-block font-mono text-meta"
                    style={{
                      color: "var(--primary)",
                      background: "var(--primary-soft)",
                      border: "1px solid rgba(200, 32, 44, 0.25)",
                      padding: "0.35rem 0.65rem",
                      borderRadius: "var(--radius-sm)",
                      letterSpacing: "0.02em",
                      marginBottom: "var(--space-md)",
                    }}
                  >
                    {service.priceRange}
                  </span>
                  <div
                    className="font-display text-body-sm"
                    style={{
                      color: "var(--primary)",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    See Examples & Pricing →
                  </div>
                </Link>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
        aria-label="Schedule a walkthrough"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-20 text-center"
          style={{ maxWidth: "var(--container-narrow)", zIndex: 1 }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-h2)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
              marginBottom: "var(--space-md)",
            }}
          >
            {/* [DEMO COPY — pending client review] */}
            Ready to see your project on this list?
          </h2>
          <p
            className="font-body text-body-lg"
            style={{
              color: "var(--text-secondary)",
              maxWidth: "44ch",
              margin: "0 auto var(--space-lg)",
            }}
          >
            {/* [DEMO COPY — pending client review] */}
            Send the Pinterest photo or the punch list to Tony. Written quote in
            your inbox in 24 hours.
          </p>
          <Link
            href={siteConfig.ctaPrimary.href}
            className="inline-flex items-center justify-center font-display font-bold uppercase"
            style={{
              background: "var(--primary)",
              color: "var(--text-primary)",
              padding: "0.95rem 1.85rem",
              borderRadius: "var(--radius-md)",
              letterSpacing: "0.06em",
              textDecoration: "none",
            }}
          >
            {siteConfig.ctaPrimary.label}
          </Link>
        </div>
      </section>
    </>
  );
}
