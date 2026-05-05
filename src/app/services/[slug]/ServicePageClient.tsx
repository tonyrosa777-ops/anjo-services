"use client";

/**
 * ServicePageClient — Renders the per-service detail layout per
 * website-build-template.md §Section 4 individual service pages:
 *
 *   1. Page header (Fragment root, h1 = hero-shimmer font-display text-h1,
 *      ambient breathing-orb — NOT full hero canvas)
 *   2. "What you get" grid
 *   3. "Who it's for" persona cards
 *   4. "How it works" numbered steps
 *   5. Service-specific testimonials (filtered from site.ts testimonials[]
 *      where service === slug)
 *   6. Service FAQs (Radix accordion)
 *   7. Final CTA → /booking
 *
 * Per CLAUDE.md Page Header Standard + Animation depth subsection.
 */

import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import type { Service } from "@/data/site";
import { siteConfig, testimonials } from "@/data/site";
import type { ServiceDetail } from "@/data/serviceDetails";
import { ScaleIn, FadeUp } from "@/components/animations";

type Props = {
  service: Service;
  detail: ServiceDetail;
};

export default function ServicePageClient({ service, detail }: Props) {
  const serviceTestimonials = testimonials
    .filter((t) => t.service === service.slug)
    .slice(0, 3);

  return (
    <>
      {/* ─── 1. Page Header (ambient orbs, NOT full hero canvas) ───────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
        aria-label={`${service.name} overview`}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        {/* Ambient breathing orbs */}
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
            top: "30%",
            right: "8%",
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
          style={{ maxWidth: "var(--container-default)", zIndex: 1 }}
        >
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-meta"
            style={{ color: "var(--text-muted)", marginBottom: "var(--space-md)" }}
          >
            <Link
              href="/services"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              Services
            </Link>
            <span style={{ margin: "0 0.5rem", color: "var(--text-muted)" }}>
              ›
            </span>
            <span style={{ color: "var(--text-secondary)" }}>{service.name}</span>
          </nav>

          <div className="text-center md:text-left">
            <p
              className="text-eyebrow font-display"
              style={{
                color: "var(--accent)",
                marginBottom: "var(--space-sm)",
              }}
            >
              <span aria-hidden="true" style={{ marginRight: "0.5rem" }}>
                {service.emoji}
              </span>
              {detail.heroEyebrow}
            </p>
            <h1
              className="hero-shimmer font-display text-h1"
              style={{
                color: "var(--text-primary)",
                marginBottom: "var(--space-md)",
                maxWidth: "20ch",
              }}
            >
              {detail.heroH1}
            </h1>
            <p
              className="font-body text-body-lg"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "60ch",
                marginBottom: "var(--space-lg)",
              }}
            >
              {detail.heroSubhead}
            </p>

            <div
              className="inline-block font-mono text-meta"
              style={{
                color: "var(--primary)",
                background: "var(--primary-soft)",
                border: "1px solid rgba(200, 32, 44, 0.30)",
                padding: "0.4rem 0.7rem",
                borderRadius: "var(--radius-sm)",
                letterSpacing: "0.02em",
                marginBottom: "var(--space-lg)",
              }}
            >
              {service.priceRange}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={siteConfig.ctaPrimary.href}
                className="inline-flex items-center justify-center font-display font-bold uppercase"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-primary)",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "var(--radius-md)",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                }}
              >
                {siteConfig.ctaPrimary.label}
              </Link>
              <Link
                href={siteConfig.ctaTextTony.href}
                className="inline-flex items-center justify-center font-display font-bold uppercase"
                style={{
                  background: "transparent",
                  color: "var(--text-primary)",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--primary)",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                }}
              >
                {siteConfig.ctaTextTony.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. What You Get ──────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
        }}
        aria-label="What you get"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-20"
          style={{ maxWidth: "var(--container-default)", zIndex: 1 }}
        >
          <div className="text-center" style={{ marginBottom: "var(--space-2xl)" }}>
            <p
              className="text-eyebrow font-display"
              style={{ color: "var(--primary)", marginBottom: "var(--space-sm)" }}
            >
              What you get
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "var(--text-h2)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "var(--text-primary-light)",
              }}
            >
              The work, in plain terms.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {detail.whatYouGet.map((item, i) => (
              <ScaleIn key={item.headline} delay={i * 0.06} from={0.96}>
                <article
                  className="h-full p-6"
                  style={{
                    background: "var(--bg-card-light)",
                    border: "1px solid var(--border-card-light)",
                    borderRadius: "var(--radius-lg)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: "1.85rem",
                      lineHeight: 1,
                      display: "inline-block",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    {item.emoji}
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
                    {item.headline}
                  </h3>
                  <p
                    className="font-body text-body-sm"
                    style={{
                      color: "var(--text-secondary-light)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.body}
                  </p>
                </article>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Who It's For ──────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
        aria-label="Who this service is for"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-20"
          style={{ maxWidth: "var(--container-default)", zIndex: 1 }}
        >
          <div className="text-center" style={{ marginBottom: "var(--space-2xl)" }}>
            <p
              className="text-eyebrow font-display"
              style={{ color: "var(--accent)", marginBottom: "var(--space-sm)" }}
            >
              Who it&apos;s for
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "var(--text-h2)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "var(--text-primary)",
              }}
            >
              Three homeowners we hear from every week.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {detail.whoItsFor.map((persona, i) => (
              <ScaleIn key={persona.persona} delay={i * 0.08} from={0.95}>
                <article
                  className="h-full p-6"
                  style={{
                    background: "var(--bg-card-dark)",
                    border: "1px solid var(--border-card-dark)",
                    borderRadius: "var(--radius-lg)",
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
                    {persona.emoji}
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
                    {persona.persona}
                  </h3>
                  <p
                    className="font-body text-body-sm"
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {persona.description}
                  </p>
                </article>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. How It Works ──────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
        }}
        aria-label="How it works"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-20"
          style={{ maxWidth: "var(--container-default)", zIndex: 1 }}
        >
          <div className="text-center" style={{ marginBottom: "var(--space-2xl)" }}>
            <p
              className="text-eyebrow font-display"
              style={{ color: "var(--primary)", marginBottom: "var(--space-sm)" }}
            >
              How it works
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "var(--text-h2)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "var(--text-primary-light)",
              }}
            >
              From your text to the final walkthrough.
            </h2>
          </div>

          <ol
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            style={{ listStyle: "none", padding: 0 }}
          >
            {detail.howItWorks.map((step, i) => (
              <FadeUp key={step.title} delay={i * 0.06}>
                <li
                  className="h-full p-6"
                  style={{
                    background: "var(--bg-card-light)",
                    border: "1px solid var(--border-card-light)",
                    borderRadius: "var(--radius-lg)",
                  }}
                >
                  <div
                    className="flex items-center gap-3"
                    style={{ marginBottom: "var(--space-sm)" }}
                  >
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "var(--text-meta)",
                        color: "var(--primary)",
                        background: "var(--primary-soft)",
                        border: "1px solid rgba(200, 32, 44, 0.25)",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "var(--radius-sm)",
                        letterSpacing: "0.06em",
                        fontWeight: 700,
                      }}
                    >
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{ fontSize: "1.5rem", lineHeight: 1 }}
                    >
                      {step.emoji}
                    </span>
                  </div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "var(--text-h4)",
                      lineHeight: 1.25,
                      color: "var(--text-primary-light)",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-body text-body-sm"
                    style={{
                      color: "var(--text-secondary-light)",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.body}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 5. Service-Specific Testimonials ─────────────────────────── */}
      {serviceTestimonials.length > 0 && (
        <section
          className="relative w-full overflow-hidden"
          style={{
            background: "var(--bg-dark-base)",
            color: "var(--text-primary)",
          }}
          aria-label="Reviews for this service"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{ background: "var(--bg-dark-overlay-radial)" }}
          />
          <div
            className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-20"
            style={{ maxWidth: "var(--container-wide)", zIndex: 1 }}
          >
            <div className="text-center" style={{ marginBottom: "var(--space-2xl)" }}>
              <p
                className="text-eyebrow font-display"
                style={{ color: "var(--accent)", marginBottom: "var(--space-sm)" }}
              >
                Real reviews, this service
              </p>
              <h2
                className="font-display"
                style={{
                  fontSize: "var(--text-h2)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  color: "var(--text-primary)",
                }}
              >
                What homeowners told us after.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {serviceTestimonials.map((t, i) => (
                <ScaleIn key={t.name + i} delay={i * 0.08} from={0.95}>
                  <article
                    className="h-full p-6 flex flex-col"
                    style={{
                      background: "var(--bg-card-dark)",
                      border: "1px solid var(--border-card-dark)",
                      borderRadius: "var(--radius-lg)",
                    }}
                  >
                    <div
                      aria-label={`${t.rating} out of 5 stars`}
                      style={{
                        color: "var(--accent)",
                        marginBottom: "var(--space-sm)",
                        letterSpacing: "0.15em",
                        fontSize: "1.05rem",
                      }}
                    >
                      ★★★★★
                    </div>
                    <p
                      className="font-body text-body"
                      style={{
                        color: "var(--text-primary)",
                        lineHeight: 1.55,
                        marginBottom: "var(--space-md)",
                        flexGrow: 1,
                      }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div>
                      <p
                        className="font-display"
                        style={{
                          color: "var(--text-primary)",
                          fontWeight: 700,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {t.name}
                      </p>
                      <p
                        className="font-mono text-meta"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {t.identifier}
                      </p>
                      {t.stat && (
                        <p
                          className="font-mono text-meta"
                          style={{
                            color: "var(--accent)",
                            marginTop: "var(--space-2xs)",
                          }}
                        >
                          {t.stat}
                        </p>
                      )}
                    </div>
                  </article>
                </ScaleIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 6. Service FAQs (Radix Accordion) ────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
        }}
        aria-label="Frequently asked questions"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-20"
          style={{ maxWidth: "var(--container-narrow)", zIndex: 1 }}
        >
          <div className="text-center" style={{ marginBottom: "var(--space-2xl)" }}>
            <p
              className="text-eyebrow font-display"
              style={{ color: "var(--primary)", marginBottom: "var(--space-sm)" }}
            >
              Service FAQs
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "var(--text-h2)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "var(--text-primary-light)",
              }}
            >
              Real questions homeowners ask.
            </h2>
          </div>

          <Accordion.Root
            type="single"
            collapsible
            className="flex flex-col gap-3"
          >
            {detail.serviceFaqs.map((faq, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                style={{
                  background: "var(--bg-card-light)",
                  border: "1px solid var(--border-card-light)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                }}
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className="font-display"
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "1.05rem 1.25rem",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "var(--text-h4)",
                      lineHeight: 1.3,
                      fontWeight: 700,
                      color: "var(--text-primary-light)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ flex: 1 }}>{faq.q}</span>
                    <span
                      aria-hidden="true"
                      style={{
                        color: "var(--primary)",
                        fontSize: "1.1rem",
                        transition: "transform 200ms ease",
                      }}
                    >
                      +
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                  style={{
                    padding: "0 1.25rem 1.05rem",
                    color: "var(--text-secondary-light)",
                    lineHeight: 1.6,
                  }}
                >
                  <p className="font-body text-body">{faq.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* ─── 7. Final CTA ─────────────────────────────────────────────── */}
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
            Ready to start your {service.name.toLowerCase()}?
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
            Send the photo, the punch list, or the question. Tony replies
            personally by 8am next morning.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
            <Link
              href={siteConfig.ctaTextTony.href}
              className="inline-flex items-center justify-center font-display font-bold uppercase"
              style={{
                background: "transparent",
                color: "var(--text-primary)",
                padding: "0.95rem 1.85rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--primary)",
                letterSpacing: "0.06em",
                textDecoration: "none",
              }}
            >
              {siteConfig.ctaTextTony.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
