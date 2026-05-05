"use client";

/**
 * /service-areas/[city]/CityPageClient.tsx — Anjo Services, LLC.
 *
 * 4-section city page per project-prime.md Stage 1E SECTION 1-4:
 *   1. Hero (breadcrumb + H1 + intro + CTAs).
 *   2. City Info (2-col grid: copy + trust checklist | Google Maps iframe + info card).
 *   3. Services Available in {City} (6-card grid → /services/[slug]).
 *   4. City FAQ accordion (3 FAQs from serviceAreaDescriptions or parameterized fallback).
 * Plus a final full-width "Schedule a 30-minute walkthrough in {City}" CTA.
 *
 * Google Maps iframe per build-log Pattern #11 — no API key needed:
 *   https://maps.google.com/maps?q=City,ST&output=embed&hl=en
 *
 * Reads ServiceArea + services from /data/site.ts (read-only) and
 * ServiceAreaDescription from /data/serviceAreaDescriptions.ts.
 *
 * Page Header Standard adapted: breadcrumb above H1, Fragment root, hero-shimmer
 * H1, ambient orbs in header. Interior pages use text-h1, never text-display.
 *
 * ZERO em dashes in copy strings.
 */

import { useState } from "react";
import Link from "next/link";
import { siteConfig, services } from "@/data/site";
import type { ServiceArea } from "@/data/site";
import type { ServiceAreaDescription } from "@/data/serviceAreaDescriptions";
import { FadeUp, SlideIn } from "@/components/animations";

type Props = {
  area: ServiceArea;
  description?: ServiceAreaDescription;
};

const TRUST_BULLETS = [
  { emoji: "✅", text: "Licensed in MA + NH" },
  { emoji: "🛡️", text: "Insured (general liability + workers comp)" },
  { emoji: "⚡", text: "Written quote within 24 hours" },
  { emoji: "🧹", text: "Daily clean job site, every day" },
  { emoji: "🤝", text: "We finish what other contractors started" },
];

function fallbackCityFaqs(city: string, state: "MA" | "NH") {
  return [
    {
      q: `Do you offer free walkthroughs in ${city}, ${state}?`,
      a: `Yes. Every ${city} project starts with a 30 minute on-site walkthrough at no charge. We measure, take photos, and follow up with a written quote within 24 hours, line items included.`,
    },
    {
      q: `How much does a typical project cost in ${city}, ${state}?`,
      a: `Most ${city} kitchens we finish land between $35,000 and $45,000. Most baths land between $15,000 and $22,000. Finish carpentry projects like coffered ceilings and accent walls run $1,500 to $5,500. Final cost depends on scope. We publish line items in writing.`,
    },
    {
      q: `What areas of ${city} do you serve?`,
      a: `We serve every neighborhood in ${city}, ${state}. From the on-site walkthrough to final inspection, the same crew runs your job. No travel fee anywhere within ${city} city limits.`,
    },
  ];
}

export default function CityPageClient({ area, description }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const stateName = area.state;
  const intro = description?.intro || area.description;
  const populationContext =
    description?.populationContext ||
    `${area.city} has a population of about ${area.population.toLocaleString()}, with a housing mix that ranges from older homes near the downtown core to newer construction in the surrounding subdivisions.`;
  const distanceFromBase =
    description?.distanceFromBase ||
    `${area.distance} from Anjo's Methuen base. Comfortable drive, predictable timing, no surprise traffic.`;
  const cityFaqs =
    description?.cityFaqs && description.cityFaqs.length > 0
      ? description.cityFaqs
      : fallbackCityFaqs(area.city, stateName);

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${area.city}, ${stateName}`
  )}&output=embed&hl=en`;

  return (
    <>
      {/* ─── SECTION 1 — Hero (sitewide dark+radial page-header pattern;
          NEVER a saturated red full-width panel — feedback_dark-page-
          headers-not-red.md). ───────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
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
              "radial-gradient(circle, rgba(200,32,44,0.18) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute pointer-events-none orb-2"
          style={{
            bottom: "5%",
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
          className="relative z-10 mx-auto px-6 lg:px-8"
          style={{ maxWidth: "var(--container-default)" }}
        >
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono"
            style={{
              color: "rgba(255,255,255,0.78)",
              fontSize: "var(--text-meta)",
              marginBottom: "var(--space-md)",
            }}
          >
            <Link
              href="/service-areas"
              className="transition-colors"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              Service Areas
            </Link>
            <span aria-hidden="true">›</span>
            <span style={{ color: "rgba(255,255,255,0.95)" }}>
              {area.city}, {stateName}
            </span>
          </nav>

          <p
            className="text-eyebrow font-display"
            style={{
              color: "rgba(255,255,255,0.85)",
              marginBottom: "var(--space-2xs)",
            }}
          >
            📍 Now serving {area.city}, {stateName}
          </p>
          <h1
            className="hero-shimmer font-display text-h1 font-bold"
            style={{
              color: "var(--text-primary)",
              marginBottom: "var(--space-md)",
            }}
          >
            Home Improvement Contractor in {area.city}, {stateName}
          </h1>
          <p
            className="font-body text-body-lg"
            style={{
              color: "rgba(245,245,242,0.92)",
              maxWidth: "60ch",
              marginBottom: "var(--space-lg)",
            }}
          >
            {intro}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href={siteConfig.ctaPrimary.href}
              className="inline-flex items-center justify-center font-display font-bold uppercase"
              style={{
                background: "var(--bg-dark-base)",
                color: "var(--text-primary)",
                padding: "0.875rem 1.5rem",
                borderRadius: "var(--radius-md)",
                letterSpacing: "0.06em",
              }}
            >
              Get a Free Estimate in {area.city}
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center justify-center gap-2 font-display font-bold uppercase"
              style={{
                background: "transparent",
                color: "var(--text-primary)",
                padding: "0.875rem 1.5rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255,255,255,0.45)",
                letterSpacing: "0.06em",
              }}
            >
              📞 {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 — City Info (2-col: copy + map) ──────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative z-10 mx-auto px-6 lg:px-8"
          style={{ maxWidth: "var(--container-default)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Left — copy + trust checklist */}
            <SlideIn direction="left">
              <p
                className="text-eyebrow font-display"
                style={{
                  color: "var(--primary)",
                  marginBottom: "var(--space-2xs)",
                }}
              >
                Local contractor
              </p>
              <h2
                className="font-display text-h2 font-bold"
                style={{
                  color: "var(--text-primary-light)",
                  marginBottom: "var(--space-md)",
                }}
              >
                Your Local Contractor in {area.city}
              </h2>

              <div className="flex flex-col gap-4">
                <p
                  className="font-body text-body-lg"
                  style={{ color: "var(--text-primary-light)" }}
                >
                  {intro}
                </p>
                <p
                  className="font-body text-body"
                  style={{ color: "var(--text-secondary-light)" }}
                >
                  {populationContext}
                </p>
              </div>

              <ul
                className="flex flex-col gap-2.5"
                style={{ marginTop: "var(--space-lg)" }}
              >
                {TRUST_BULLETS.map((b) => (
                  <li
                    key={b.text}
                    className="flex items-center gap-3"
                    style={{
                      color: "var(--text-primary-light)",
                      fontSize: "var(--text-body)",
                    }}
                  >
                    <span aria-hidden="true" className="text-lg">
                      {b.emoji}
                    </span>
                    <span className="font-body">{b.text}</span>
                  </li>
                ))}
              </ul>
            </SlideIn>

            {/* Right — Google Maps iframe + info card */}
            <SlideIn direction="right">
              <div
                className="rounded-2xl overflow-hidden shadow-md h-64"
                style={{ border: "1px solid var(--border-card-light)" }}
              >
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${area.city}, ${stateName} map`}
                />
              </div>

              <div
                className="mt-5 p-5 lg:p-6"
                style={{
                  background: "var(--bg-card-light)",
                  border: "1px solid var(--border-card-light)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span aria-hidden="true">📍</span>
                  <p
                    className="font-display font-bold"
                    style={{
                      color: "var(--text-primary-light)",
                      fontSize: "var(--text-h4)",
                    }}
                  >
                    Serving {area.city}, {stateName}
                  </p>
                </div>
                <dl className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt
                      className="font-mono"
                      style={{
                        color: "var(--text-muted-light)",
                        fontSize: "var(--text-meta)",
                      }}
                    >
                      Distance from base
                    </dt>
                    <dd
                      className="font-display font-bold"
                      style={{
                        color: "var(--text-primary-light)",
                        fontSize: "var(--text-body)",
                      }}
                    >
                      {area.distance}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt
                      className="font-mono"
                      style={{
                        color: "var(--text-muted-light)",
                        fontSize: "var(--text-meta)",
                      }}
                    >
                      Population
                    </dt>
                    <dd
                      className="font-display font-bold"
                      style={{
                        color: "var(--text-primary-light)",
                        fontSize: "var(--text-body)",
                      }}
                    >
                      {area.population.toLocaleString()}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt
                      className="font-mono"
                      style={{
                        color: "var(--text-muted-light)",
                        fontSize: "var(--text-meta)",
                      }}
                    >
                      Drive
                    </dt>
                    <dd
                      className="font-body"
                      style={{
                        color: "var(--text-secondary-light)",
                        fontSize: "var(--text-body-sm)",
                        textAlign: "right",
                        maxWidth: "60%",
                      }}
                    >
                      {distanceFromBase}
                    </dd>
                  </div>
                </dl>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3 — Services Available in {City} ───────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        <div
          className="relative z-10 mx-auto px-6 lg:px-8"
          style={{ maxWidth: "var(--container-wide)" }}
        >
          <FadeUp>
            <p
              className="text-eyebrow font-display text-center"
              style={{
                color: "var(--accent)",
                marginBottom: "var(--space-2xs)",
              }}
            >
              What we build
            </p>
            <h2
              className="font-display text-h2 font-bold text-center"
              style={{
                color: "var(--text-primary)",
                marginBottom: "var(--space-xl)",
              }}
            >
              Services Available in {area.city}
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {services.map((svc, i) => (
              <FadeUp key={svc.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/services/${svc.slug}`}
                  className="group block h-full"
                >
                  <div
                    className="h-full p-6 transition-colors"
                    style={{
                      background: "var(--bg-card-dark)",
                      border: "1px solid var(--border-card-dark)",
                      borderRadius: "var(--radius-lg)",
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span aria-hidden="true" className="text-3xl">
                        {svc.emoji}
                      </span>
                      <div className="flex-1">
                        <h3
                          className="font-display font-bold"
                          style={{
                            color: "var(--text-primary)",
                            fontSize: "var(--text-h4)",
                            lineHeight: 1.25,
                          }}
                        >
                          {svc.name}
                        </h3>
                      </div>
                      <span
                        aria-hidden="true"
                        className="font-display font-bold transition-transform group-hover:translate-x-1"
                        style={{ color: "var(--primary)" }}
                      >
                        →
                      </span>
                    </div>
                    <p
                      className="font-body"
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "var(--text-body-sm)",
                        lineHeight: 1.55,
                        marginBottom: "var(--space-sm)",
                      }}
                    >
                      {svc.positioning}
                    </p>
                    <p
                      className="font-mono"
                      style={{
                        color: "var(--accent)",
                        fontSize: "var(--text-meta)",
                      }}
                    >
                      {svc.priceRange}
                    </p>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4 — City FAQ accordion ──────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-elevated)",
          color: "var(--text-primary-light)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative z-10 mx-auto px-6 lg:px-8"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <FadeUp>
            <p
              className="text-eyebrow font-display text-center"
              style={{
                color: "var(--primary)",
                marginBottom: "var(--space-2xs)",
              }}
            >
              FAQ
            </p>
            <h2
              className="font-display text-h2 font-bold text-center"
              style={{
                color: "var(--text-primary-light)",
                marginBottom: "var(--space-xl)",
              }}
            >
              {area.city}, {stateName} questions, answered.
            </h2>
          </FadeUp>

          <div className="flex flex-col gap-3">
            {cityFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={`${area.slug}-faq-${i}`}
                  style={{
                    background: "var(--bg-card-light)",
                    border: "1px solid var(--border-card-light)",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`${area.slug}-faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
                    style={{ color: "var(--text-primary-light)" }}
                  >
                    <span
                      className="font-display font-bold"
                      style={{ fontSize: "var(--text-body)" }}
                    >
                      {faq.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="transition-transform"
                      style={{
                        color: "var(--primary)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        fontSize: "0.85em",
                      }}
                    >
                      ▾
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={`${area.slug}-faq-panel-${i}`}
                      className="px-5 pb-5 font-body"
                      style={{
                        color: "var(--text-secondary-light)",
                        fontSize: "var(--text-body-sm)",
                        lineHeight: 1.65,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Final CTA — full-width walkthrough ──────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        <div
          className="relative z-10 mx-auto px-6 lg:px-8 text-center"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <FadeUp>
            <h2
              className="font-display text-h2 font-bold"
              style={{
                color: "var(--text-primary)",
                marginBottom: "var(--space-md)",
              }}
            >
              Schedule a 30-minute walkthrough in {area.city}.
            </h2>
            <p
              className="font-body text-body-lg"
              style={{
                color: "var(--text-secondary)",
                marginBottom: "var(--space-lg)",
              }}
            >
              Pick a time. Tony shows up with a tape and a notepad. Quote in
              writing within 24 hours. No high-pressure pitch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href={siteConfig.ctaPrimary.href}
                className="inline-flex items-center justify-center font-display font-bold uppercase"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-primary)",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "var(--radius-md)",
                  letterSpacing: "0.06em",
                }}
              >
                {siteConfig.ctaPrimary.label}
              </Link>
              <a
                href={siteConfig.smsHref}
                className="inline-flex items-center justify-center font-display font-bold uppercase"
                style={{
                  background: "transparent",
                  color: "var(--text-primary)",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--primary)",
                  letterSpacing: "0.06em",
                }}
              >
                💬 {siteConfig.ctaTextTony.label}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
