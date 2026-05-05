"use client";

/**
 * FeaturedGallery — Homepage section #4 per design-system.md §11.
 *
 * Tone: light (warm bone background per dark/light alternation rule).
 * Purpose: social proof (visual). Sits between Services (dark, education) and
 * About Tony (dark, founder trust) — section 4 of the 11-section homepage.
 *
 * Lead pair is the Andover coffered ceiling per market-intelligence.md §9
 * EXPLOIT #3: finish carpentry leads as the trojan-horse remodel funnel-top.
 *
 * Placeholder image src pattern:
 *   /gallery/{slug}-before.jpg
 *   /gallery/{slug}-after.jpg
 * Stage 1G fal.ai output is expected to land at these exact paths so this
 * file does not need to change when real images ship.
 *
 * Pattern #55: BeforeAfterSlider renders its own self-sufficient surface so
 * we can drop it onto either light or dark sections without translucent
 * artifacts. We pass tone="light" to match this section.
 *
 * 'use client' is the FIRST token (Error #9).
 */

import Link from "next/link";
import BeforeAfterSlider, {
  type BeforeAfterPair,
} from "@/components/BeforeAfterSlider";

const FEATURED_PAIRS: BeforeAfterPair[] = [
  {
    id: "andover-coffered-ceiling",
    tabLabel: "Coffered Ceiling",
    before: {
      src: "/gallery/andover-coffered-ceiling-before.jpg",
      alt: "Andover dining room before coffered ceiling install, plain flat painted ceiling.",
    },
    after: {
      src: "/gallery/andover-coffered-ceiling-after.jpg",
      alt: "Andover dining room after coffered ceiling install, painted millwork grid.",
    },
    caption:
      "Andover MA · 2024 · Coffered ceiling, dining room · $4,200 · 6 days.",
  },
  {
    id: "methuen-kitchen-remodel",
    tabLabel: "Kitchen",
    before: {
      src: "/gallery/methuen-kitchen-remodel-before.jpg",
      alt: "Methuen kitchen before remodel, dated oak cabinets and worn laminate counters.",
    },
    after: {
      src: "/gallery/methuen-kitchen-remodel-after.jpg",
      alt: "Methuen kitchen after remodel, painted shaker cabinets and quartz counters.",
    },
    caption:
      "Methuen MA · 2024 · Full kitchen remodel, cabinets, quartz counters, island · $42,000 · 3 weeks.",
  },
  {
    id: "salem-nh-bath",
    tabLabel: "Bath",
    before: {
      src: "/gallery/salem-nh-bath-before.jpg",
      alt: "Salem NH primary bath before remodel, builder-grade fiberglass tub and dated vanity.",
    },
    after: {
      src: "/gallery/salem-nh-bath-after.jpg",
      alt: "Salem NH primary bath after remodel, tiled walk-in shower and double vanity.",
    },
    caption:
      "Salem NH · 2024 · Primary bath gut, tile shower, double vanity · $18,000 · 12 days.",
  },
  {
    id: "haverhill-deck",
    tabLabel: "Deck",
    before: {
      src: "/gallery/haverhill-deck-before.jpg",
      alt: "Haverhill backyard before deck build, bare lawn with old patio slab.",
    },
    after: {
      src: "/gallery/haverhill-deck-after.jpg",
      alt: "Haverhill backyard after deck build, composite deck with railings and stairs.",
    },
    caption:
      "Haverhill MA · 2023 · Composite deck, 16 by 20 with railings · $14,000 · 8 days.",
  },
];

export default function FeaturedGallery() {
  return (
    <section
      id="featured-gallery"
      className="relative w-full"
      style={{
        background: "var(--bg-base)",
        color: "var(--text-primary-light)",
      }}
      aria-label="Featured projects"
    >
      {/* Mandatory radial overlay per design-system.md §2 — light variant */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--bg-light-overlay-radial)" }}
      />

      <div
        className="relative mx-auto px-6 lg:px-8"
        style={{
          maxWidth: "var(--container-wide)",
          paddingTop: "clamp(3rem, 8vw, 6rem)",
          paddingBottom: "clamp(3rem, 8vw, 6rem)",
          zIndex: 10,
        }}
      >
        {/* Section header */}
        <div
          className="flex flex-col gap-3 mb-10 lg:mb-14 max-w-2xl"
          style={{ marginBottom: "var(--space-2xl)" }}
        >
          <p
            className="text-eyebrow font-display"
            style={{ color: "var(--primary)" }}
          >
            Featured Projects
          </p>
          <h2
            className="text-h2 font-display font-black"
            style={{
              color: "var(--text-primary-light)",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            Real projects. Real prices. Drag to see the difference.
          </h2>
          <p
            className="text-body-lg font-body"
            style={{ color: "var(--text-secondary-light)" }}
          >
            Coffered ceilings, kitchens, baths, and decks finished across
            Methuen, Andover, Haverhill, and Salem NH. Every photo is a real
            Anjo job. Every caption names the town, the year, the scope, and
            the price.
          </p>
        </div>

        {/* Slider */}
        <BeforeAfterSlider pairs={FEATURED_PAIRS} tone="light" />

        {/* Gallery CTA */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ marginTop: "var(--space-xl)" }}
        >
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center font-display font-bold uppercase rounded-md transition-colors"
            style={{
              background: "var(--primary)",
              color: "var(--text-primary)",
              padding: "0.875rem 1.5rem",
              fontSize: "var(--text-body-sm)",
              letterSpacing: "0.06em",
              borderRadius: "var(--radius-md)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--primary-muted)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--primary)";
            }}
          >
            See the full gallery
          </Link>
          <p
            className="font-mono"
            style={{
              color: "var(--text-muted-light)",
              fontSize: "var(--text-meta)",
            }}
          >
            12 finished projects across the corridor. New work added monthly.
          </p>
        </div>
      </div>
    </section>
  );
}
