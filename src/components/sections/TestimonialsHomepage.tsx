"use client";

/**
 * TestimonialsHomepage — homepage section #7 (dark tone).
 *
 * Per design-system.md §11 row 6 (3-4 featured quotes + See All CTA →
 * /testimonials). The first 4 testimonials in /data/site.ts are the [REAL]
 * verbatim Anjo review fragments per the content-writer's output, so we
 * surface those exactly.
 *
 * Layout: 2-col grid on tablet, 4-col on desktop. Each card shows star row,
 * quote, name, identifier (town + service), and the project stat. Below
 * the grid: "See All 36 Testimonials →" route link to /testimonials.
 *
 * Dark tone background per Homepage Section Architecture Rule. Single
 * breathing orb keeps motion budget at 1 layer.
 */

import Link from "next/link";
import { testimonials } from "@/data/site";
import { FadeUp, StaggerContainer, staggerItem } from "@/components/animations";
import { motion } from "framer-motion";

const FEATURED_COUNT = 4; // first 4 = real Anjo review fragments

export default function TestimonialsHomepage() {
  const featured = testimonials.slice(0, FEATURED_COUNT);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-dark-base)",
        color: "var(--text-primary)",
        paddingTop: "var(--space-3xl)",
        paddingBottom: "var(--space-3xl)",
      }}
      aria-label="Testimonials"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--bg-dark-overlay-radial)" }}
      />
      <div
        aria-hidden="true"
        className="orb-2 absolute pointer-events-none"
        style={{
          bottom: "10%",
          left: "8%",
          width: "30rem",
          height: "30rem",
          background:
            "radial-gradient(circle, rgba(232,176,76,0.25) 0%, transparent 60%)",
          filter: "blur(55px)",
        }}
      />

      <div
        className="relative z-10 mx-auto px-6 lg:px-8"
        style={{ maxWidth: "var(--container-wide)" }}
      >
        <FadeUp>
          <div
            className="flex flex-col items-center text-center"
            style={{ marginBottom: "var(--space-2xl)" }}
          >
            <p
              className="text-eyebrow font-display"
              style={{
                color: "var(--accent)",
                marginBottom: "var(--space-sm)",
              }}
            >
              Real names. Real towns. Real projects.
            </p>
            <h2
              className="font-display text-h2 font-bold"
              style={{
                color: "var(--text-primary)",
                marginBottom: "var(--space-sm)",
                letterSpacing: "-0.01em",
              }}
            >
              What homeowners say about Tony
            </h2>
            <p
              className="font-body text-body-lg"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "62ch",
              }}
            >
              Fair prices. 5 stars. 5 years of work in this corridor.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          staggerDelay={0.08}
        >
          {featured.map((t, i) => (
            <motion.article
              key={`${t.name}-${i}`}
              variants={staggerItem}
              className="flex flex-col p-6 lg:p-7 h-full"
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
                  fontSize: "1rem",
                  marginBottom: "var(--space-sm)",
                }}
              >
                {"★".repeat(t.rating)}
              </div>
              <blockquote
                className="font-body text-body"
                style={{
                  color: "var(--text-primary)",
                  marginBottom: "var(--space-md)",
                  flex: "1 1 auto",
                }}
              >
                {t.quote}
              </blockquote>
              <footer
                className="flex flex-col gap-1"
                style={{
                  borderTop: "1px solid var(--border-card-dark)",
                  paddingTop: "var(--space-sm)",
                }}
              >
                <span
                  className="font-display font-bold"
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "var(--text-body)",
                  }}
                >
                  {t.name}
                </span>
                <span
                  className="font-mono"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "var(--text-meta)",
                  }}
                >
                  {t.identifier}
                </span>
                {t.stat && (
                  <span
                    className="font-mono"
                    style={{
                      color: "var(--accent)",
                      fontSize: "var(--text-meta)",
                    }}
                  >
                    {t.stat}
                  </span>
                )}
              </footer>
            </motion.article>
          ))}
        </StaggerContainer>

        <FadeUp>
          <div
            className="flex justify-center"
            style={{ marginTop: "var(--space-2xl)" }}
          >
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 font-display font-bold uppercase"
              style={{
                color: "var(--text-primary)",
                fontSize: "var(--text-eyebrow)",
                letterSpacing: "0.08em",
                padding: "0.875rem 1.5rem",
                border: "1px solid var(--primary)",
                borderRadius: "var(--radius-md)",
                background: "transparent",
              }}
            >
              See All {testimonials.length} Testimonials →
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
