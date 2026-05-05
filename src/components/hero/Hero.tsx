"use client";

/**
 * Hero — assembles the 3-layer stack per CLAUDE.md Hero Architecture Rule.
 *
 * Layer 1: HeroParticles (canvas red+amber embers, behind everything)
 * Layer 2: AnjoCanvas   (coffered-ceiling reveal — niche-specific brand canvas)
 * Layer 3: Framer Motion stagger text (eyebrow → H1 → subheadline → CTAs)
 *
 * Two-column split (desktop): text left lg:w-1/2, canvas right lg:w-1/2.
 * Mobile: flex-col, text first, canvas below — fully renders the hero
 * (eyebrow + H1 + subheadline + 2 CTAs + trust copy) above the fold at 390x667.
 *
 * Right panel container uses `style={{ height: "clamp(340px, 50vw, 540px)" }}`
 * per template. No photo in hero ever (anti-pattern #12). H1 = siteConfig.tagline
 * always with `.hero-shimmer`. Primary CTA → /booking, secondary → /quiz.
 *
 * Variants use `[0, 0, 0.2, 1] as const` cubic-bezier tuples (Error #8b — never
 * a Variants string). 'use client' is the FIRST token (Error #9).
 */

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { siteConfig, hero } from "@/data/site";
import HeroParticles from "./HeroParticles";
import AnjoCanvas from "./AnjoCanvas";

const easeOut = [0, 0, 0.2, 1] as const;

const eyebrowV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay: 0 },
  },
};

const h1V: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, delay: 0.05 },
  },
};

const subV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, delay: 0.2 },
  },
};

const ctaV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut, delay: 0.35 },
  },
};

const trustV: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay: 0.5 },
  },
};

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--bg-dark-base)",
        color: "var(--text-primary)",
      }}
      aria-label="Hero"
    >
      {/* Layer 1 — full-bleed particle canvas behind everything */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <HeroParticles />
        {/* Mandatory radial overlay per design-system.md §2 + dark-section rule */}
        <div
          className="absolute inset-0"
          style={{
            background: "var(--bg-dark-overlay-radial)",
          }}
        />
      </div>

      <div
        className="relative w-full mx-auto px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24"
        style={{
          maxWidth: "var(--container-wide)",
          zIndex: 10,
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-12">
          {/* Text column */}
          <motion.div
            className="relative w-full lg:w-1/2"
            initial="hidden"
            animate="show"
            style={{ zIndex: 10 }}
          >
            <motion.p
              variants={eyebrowV}
              className="text-eyebrow font-display"
              style={{
                color: "var(--accent)",
                marginBottom: "var(--space-md)",
              }}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={h1V}
              className="hero-shimmer font-display text-display font-black"
              style={{
                color: "var(--text-primary)",
                marginBottom: "var(--space-md)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
              }}
            >
              {siteConfig.tagline}
            </motion.h1>

            <motion.p
              variants={subV}
              className="font-body text-body-lg"
              style={{
                color: "var(--text-secondary)",
                marginBottom: "var(--space-lg)",
                maxWidth: "44ch",
              }}
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              variants={ctaV}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              style={{ marginBottom: "var(--space-md)" }}
            >
              <Link
                href={siteConfig.ctaPrimary.href}
                className="inline-flex items-center justify-center font-display font-bold uppercase"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-primary)",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "var(--radius-md)",
                  letterSpacing: "0.06em",
                  transition: "background 180ms ease, transform 180ms ease",
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
                {siteConfig.ctaPrimary.label}
              </Link>

              <Link
                href={siteConfig.ctaSecondaryQuiz.href}
                className="inline-flex items-center justify-center font-display font-bold uppercase"
                style={{
                  background: "transparent",
                  color: "var(--text-primary)",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--primary)",
                  letterSpacing: "0.06em",
                  transition: "background 180ms ease",
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
                {siteConfig.ctaSecondaryQuiz.label}
              </Link>
            </motion.div>

            <motion.p
              variants={trustV}
              className="font-mono text-meta"
              style={{ color: "var(--text-muted)" }}
            >
              {hero.trustCopy}
            </motion.p>
          </motion.div>

          {/* Canvas column (Layer 2) */}
          <div
            className="relative w-full lg:w-1/2"
            style={{
              height: "clamp(340px, 50vw, 540px)",
              zIndex: 5,
            }}
            aria-hidden="true"
          >
            <AnjoCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
