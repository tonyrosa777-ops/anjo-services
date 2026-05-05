"use client";

/**
 * FaqClient — Renders the /faq page body. Lives as a client component because
 * Radix Accordion uses React state internals. The server component wrapper
 * (page.tsx) emits metadata + FAQPage JSON-LD + Breadcrumb JSON-LD around it.
 */

import * as Accordion from "@radix-ui/react-accordion";
import { siteConfig, faqs } from "@/data/site";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export default function FaqClient() {
  return (
    <>
      {/* ─── Page Header — sitewide dark+radial pattern. NEVER a saturated
          red full-width panel (feedback_dark-page-headers-not-red.md). ── */}
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
          <p
            className="text-eyebrow font-display"
            style={{
              color: "rgba(255,255,255,0.85)",
              marginBottom: "var(--space-md)",
            }}
          >
            Cost · License · Process · Trust
          </p>
          <h1
            className="hero-shimmer font-display text-h1 font-bold"
            style={{
              color: "var(--text-primary)",
              marginBottom: "var(--space-md)",
            }}
          >
            Frequently Asked Questions
          </h1>
          <p
            className="font-body text-body-lg"
            style={{
              color: "rgba(245,245,242,0.92)",
              maxWidth: "60ch",
            }}
          >
            Honest answers to the questions homeowners actually ask at 9pm
            Tuesday. If yours is not here, text Tony directly at{" "}
            {siteConfig.phone}.
          </p>
        </div>
      </section>

      {/* ─── Accordion body ────────────────────────────────────────────── */}
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
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <Accordion.Root
            type="single"
            collapsible
            className="flex flex-col gap-3"
          >
            {faqs.map((faq) => {
              const id = slugify(faq.q);
              return (
                <Accordion.Item
                  key={id}
                  value={id}
                  id={id}
                  className="overflow-hidden"
                  style={{
                    background: "var(--bg-card-light)",
                    border: "1px solid var(--border-card-light)",
                    borderRadius: "var(--radius-lg)",
                  }}
                >
                  <Accordion.Header asChild>
                    <h3
                      className="font-display"
                      style={{
                        margin: 0,
                        fontSize: "var(--text-h4)",
                        lineHeight: 1.3,
                      }}
                    >
                      <Accordion.Trigger
                        className="group w-full flex items-start justify-between text-left gap-4 px-5 py-5 lg:px-7 lg:py-6 cursor-pointer"
                        style={{
                          color: "var(--text-primary-light)",
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          letterSpacing: "-0.005em",
                        }}
                      >
                        <span>{faq.q}</span>
                        <span
                          aria-hidden="true"
                          className="shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                          style={{
                            color: "var(--primary)",
                            fontSize: "1.25rem",
                            lineHeight: 1,
                            paddingTop: "0.25rem",
                          }}
                        >
                          ⌄
                        </span>
                      </Accordion.Trigger>
                    </h3>
                  </Accordion.Header>
                  <Accordion.Content
                    className="overflow-hidden"
                    style={{
                      borderTop: "1px solid var(--border-card-light)",
                    }}
                  >
                    <div
                      className="px-5 py-5 lg:px-7 lg:py-6 font-body text-body-lg"
                      style={{
                        color: "var(--text-secondary-light)",
                      }}
                    >
                      {faq.a}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
        </div>
      </section>

      {/* ─── Final CTA: Text Tony ──────────────────────────────────────── */}
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
          <h2
            className="font-display text-h2 font-bold"
            style={{
              color: "var(--text-primary)",
              marginBottom: "var(--space-md)",
            }}
          >
            Still have questions?
          </h2>
          <p
            className="font-body text-body-lg"
            style={{
              color: "var(--text-secondary)",
              marginBottom: "var(--space-lg)",
            }}
          >
            Text Tony at {siteConfig.phone}. Auto-reply confirms we got it.
            Real reply by 8am, no matter when you sent it.
          </p>
          <a
            href={siteConfig.smsHref}
            className="inline-flex items-center justify-center font-display font-bold uppercase"
            style={{
              background: "var(--primary)",
              color: "var(--text-primary)",
              padding: "0.875rem 1.5rem",
              borderRadius: "var(--radius-md)",
              letterSpacing: "0.06em",
            }}
          >
            💬 Text Tony at {siteConfig.phone}
          </a>
        </div>
      </section>
    </>
  );
}
