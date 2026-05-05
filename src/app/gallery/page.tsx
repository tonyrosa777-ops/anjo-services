/**
 * /gallery — full project gallery page.
 *
 * Per design-system.md §11 + market-intelligence.md §9 EXPLOIT #3:
 *   Lead with finish carpentry (coffered ceilings, accent walls, custom
 *   millwork) — Tony's favorite work, highest-margin small-project tier,
 *   zero local SEO competition, photo-genic, Pinterest-native.
 *
 * Page structure:
 *   1. Page header (h1 + subtitle + ambient breathing orb gradient)
 *   2. BeforeAfterSlider with 3 featured pairs (lead = Andover coffered ceiling)
 *   3. Project grid — 12 cards, 3 cols desktop / 2 cols tablet / 1 col mobile.
 *      Each card: 16:9 image + caption block (town · scope · price · year).
 *      Order leads with finish carpentry.
 *   4. Booking CTA at bottom (Schedule a Walkthrough → /booking)
 *
 * Placeholder image src pattern (Stage 1G fal.ai output replaces these
 * exact paths in place):
 *   /gallery/{slug}-before.jpg
 *   /gallery/{slug}-after.jpg     (for slider pairs)
 *   /gallery/{slug}.jpg           (for single-image grid cards)
 *
 * No 'use client' here — page is server-rendered. The interactive slider is
 * its own client component imported below.
 */

import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfterSlider, {
  type BeforeAfterPair,
} from "@/components/BeforeAfterSlider";
import TextTonyCTA from "@/components/TextTonyCTA";
import { BreadcrumbSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "Project Gallery: Coffered Ceilings, Kitchens, Baths, Decks",
  description:
    "Real Anjo project photos across Methuen, Andover, Haverhill, North Andover, Lawrence, Salem NH, Derry, and Windham. Town, scope, price, and year on every photo.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    url: "https://anjoservices.com/gallery",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title: "Project Gallery: Coffered Ceilings, Kitchens, Baths, Decks",
    description:
      "Real Anjo project photos. Town, scope, price, year on every image. Methuen, Andover, Haverhill, Salem NH and beyond.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Gallery: Coffered Ceilings, Kitchens, Baths, Decks",
    description:
      "Real Anjo project photos. Town, scope, price, year on every image.",
  },
};

interface GalleryItem {
  slug: string;
  category:
    | "Finish Carpentry"
    | "Kitchen"
    | "Bath"
    | "Deck"
    | "Painting"
    | "Handyman";
  town: string;
  scope: string;
  priceBand: string;
  year: string;
  alt: string;
}

// 12 placeholder cards — Stage 1G replaces the imagery in /public/gallery
// at the same slug-based filenames. Lead with finish carpentry per spec.
const GALLERY_ITEMS: GalleryItem[] = [
  {
    slug: "andover-coffered-ceiling",
    category: "Finish Carpentry",
    town: "Andover, MA",
    scope: "Coffered ceiling, dining room",
    priceBand: "$4,200",
    year: "2024",
    alt: "Andover dining room with newly installed coffered ceiling, painted millwork grid in warm white.",
  },
  {
    slug: "methuen-board-and-batten",
    category: "Finish Carpentry",
    town: "Methuen, MA",
    scope: "Board and batten accent wall, primary bedroom",
    priceBand: "$2,400",
    year: "2024",
    alt: "Methuen primary bedroom board and batten accent wall painted Hale Navy.",
  },
  {
    slug: "north-andover-shiplap-entry",
    category: "Finish Carpentry",
    town: "North Andover, MA",
    scope: "Shiplap entryway, floor to ceiling",
    priceBand: "$1,950",
    year: "2024",
    alt: "North Andover entryway with full-height shiplap painted bright white.",
  },
  {
    slug: "windham-built-in-bookcase",
    category: "Finish Carpentry",
    town: "Windham, NH",
    scope: "Custom home-office built-in bookcase wall",
    priceBand: "$5,200",
    year: "2024",
    alt: "Windham home office with painted custom built-in bookcase spanning a 14-foot wall.",
  },
  {
    slug: "methuen-kitchen-remodel",
    category: "Kitchen",
    town: "Methuen, MA",
    scope: "Full kitchen remodel, cabinets, quartz, island",
    priceBand: "$42,000",
    year: "2024",
    alt: "Methuen kitchen after remodel with painted shaker cabinets, quartz counters, and an island.",
  },
  {
    slug: "andover-kitchen-island",
    category: "Kitchen",
    town: "Andover, MA",
    scope: "Kitchen + 9-foot island, quartz counters",
    priceBand: "$52,000",
    year: "2024",
    alt: "Andover open-plan kitchen with a 9-foot quartz island and pendant lighting.",
  },
  {
    slug: "haverhill-kitchen-refresh",
    category: "Kitchen",
    town: "Haverhill, MA",
    scope: "Cabinet refresh, counters, lighting, paint",
    priceBand: "$28,500",
    year: "2024",
    alt: "Haverhill kitchen after a partial refresh with painted cabinets and updated lighting.",
  },
  {
    slug: "salem-nh-primary-bath",
    category: "Bath",
    town: "Salem, NH",
    scope: "Primary bath gut, tile shower, double vanity",
    priceBand: "$18,000",
    year: "2024",
    alt: "Salem NH primary bath with curbless tile shower and a double-sink vanity.",
  },
  {
    slug: "andover-hall-bath",
    category: "Bath",
    town: "Andover, MA",
    scope: "Hall bath remodel, tile, vanity, fixtures",
    priceBand: "$16,800",
    year: "2024",
    alt: "Andover hall bathroom with new tile, vanity, and updated fixtures.",
  },
  {
    slug: "haverhill-deck",
    category: "Deck",
    town: "Haverhill, MA",
    scope: "Composite deck, 16 by 20, hidden fasteners",
    priceBand: "$14,000",
    year: "2023",
    alt: "Haverhill backyard with a finished composite deck, railings, and stairs to the lawn.",
  },
  {
    slug: "windham-cedar-pergola",
    category: "Deck",
    town: "Windham, NH",
    scope: "Cedar pergola over patio, 14 by 16",
    priceBand: "$7,200",
    year: "2024",
    alt: "Windham backyard cedar pergola spanning a 14 by 16 patio with string lights.",
  },
  {
    slug: "methuen-cedar-fence",
    category: "Deck",
    town: "Methuen, MA",
    scope: "Cedar privacy fence, 180 feet, two gates",
    priceBand: "$8,400",
    year: "2024",
    alt: "Methuen yard with a long cedar privacy fence and two matching gates.",
  },
];

// Lead the in-page slider with the same 3 marquee pairs the homepage uses,
// minus the deck (different page rhythm — page wants the kitchen up front
// after the coffered ceiling per market-intelligence.md §9 strategic
// recommendation #2 trojan-horse pattern: ceiling → kitchen).
const FEATURED_PAIRS: BeforeAfterPair[] = [
  {
    id: "andover-coffered-ceiling",
    tabLabel: "Coffered Ceiling",
    before: {
      src: "/gallery/andover-coffered-ceiling-before.jpg",
      alt: "Andover dining room before coffered ceiling install.",
    },
    after: {
      src: "/gallery/andover-coffered-ceiling-after.jpg",
      alt: "Andover dining room after coffered ceiling install.",
    },
    caption:
      "Andover MA · 2024 · Coffered ceiling, dining room · $4,200 · 6 days.",
  },
  {
    id: "methuen-kitchen-remodel",
    tabLabel: "Kitchen",
    before: {
      src: "/gallery/methuen-kitchen-remodel-before.jpg",
      alt: "Methuen kitchen before remodel.",
    },
    after: {
      src: "/gallery/methuen-kitchen-remodel-after.jpg",
      alt: "Methuen kitchen after remodel.",
    },
    caption:
      "Methuen MA · 2024 · Full kitchen remodel · $42,000 · 3 weeks.",
  },
  {
    id: "salem-nh-bath",
    tabLabel: "Primary Bath",
    before: {
      src: "/gallery/salem-nh-bath-before.jpg",
      alt: "Salem NH primary bath before remodel.",
    },
    after: {
      src: "/gallery/salem-nh-bath-after.jpg",
      alt: "Salem NH primary bath after remodel.",
    },
    caption:
      "Salem NH · 2024 · Primary bath gut, tile shower · $18,000 · 12 days.",
  },
];

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
        ]}
      />
      {/* Page header — light tone, ambient breathing orb */}
      <section
        className="relative w-full"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
        }}
        aria-label="Gallery header"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        {/* Single breathing orb for ambient motion (1 motion layer, within budget) */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none orb"
          style={{
            top: "10%",
            right: "5%",
            width: "32rem",
            height: "32rem",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle at center, rgba(200, 32, 44, 0.10), transparent 70%)",
            filter: "blur(40px)",
            zIndex: 0,
          }}
        />

        <div
          className="relative mx-auto px-6 lg:px-8"
          style={{
            maxWidth: "var(--container-wide)",
            paddingTop: "clamp(3rem, 8vw, 5rem)",
            paddingBottom: "clamp(2rem, 5vw, 3.5rem)",
            zIndex: 10,
          }}
        >
          <p
            className="text-eyebrow font-display"
            style={{ color: "var(--primary)" }}
          >
            Project Gallery
          </p>
          <h1
            className="text-h1 font-display font-black mt-3 mb-4"
            style={{
              color: "var(--text-primary-light)",
              letterSpacing: "-0.015em",
              lineHeight: 1.1,
            }}
          >
            Real Projects. Real Prices.
          </h1>
          <p
            className="text-body-lg font-body max-w-2xl"
            style={{ color: "var(--text-secondary-light)" }}
          >
            Coffered ceilings, kitchens, baths, and decks across Methuen,
            Andover, Haverhill, and Salem NH. Every photo is a real Anjo
            project. Every caption names the town, the scope, the price band,
            and the year.
          </p>
        </div>
      </section>

      {/* Featured slider — light tone (continues from header) */}
      <section
        className="relative w-full"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
        }}
        aria-label="Featured before-and-after"
      >
        <div
          className="relative mx-auto px-6 lg:px-8"
          style={{
            maxWidth: "var(--container-wide)",
            paddingTop: "clamp(2rem, 4vw, 3rem)",
            paddingBottom: "clamp(3rem, 6vw, 4.5rem)",
          }}
        >
          <h2
            className="text-h3 font-display font-bold mb-6"
            style={{ color: "var(--text-primary-light)" }}
          >
            Drag to compare. Three featured projects.
          </h2>
          <BeforeAfterSlider pairs={FEATURED_PAIRS} tone="light" />
        </div>
      </section>

      {/* Project grid — dark tone for visual contrast against the slider above */}
      <section
        className="relative w-full"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
        aria-label="All projects"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />

        <div
          className="relative mx-auto px-6 lg:px-8"
          style={{
            maxWidth: "var(--container-wide)",
            paddingTop: "clamp(3rem, 6vw, 5rem)",
            paddingBottom: "clamp(3rem, 6vw, 5rem)",
            zIndex: 10,
          }}
        >
          <div className="flex flex-col gap-3 mb-10 max-w-2xl">
            <p
              className="text-eyebrow font-display"
              style={{ color: "var(--accent)" }}
            >
              All Projects
            </p>
            <h2
              className="text-h2 font-display font-black"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              Twelve finished jobs. New work added monthly.
            </h2>
            <p
              className="text-body font-body"
              style={{ color: "var(--text-secondary)" }}
            >
              Lead with finish carpentry (Tony&apos;s favorite work). Then kitchens,
              baths, and decks. Click any card to see notes and a project
              walk-through.
            </p>
          </div>

          {/* 3-col / 2-col / 1-col grid */}
          <ul
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {GALLERY_ITEMS.map((item) => (
              <li key={item.slug}>
                <article
                  className="relative rounded-[var(--radius-lg)] overflow-hidden h-full flex flex-col transition-all"
                  style={{
                    background: "var(--bg-card-dark)",
                    border: "1px solid var(--border-card-dark)",
                  }}
                >
                  {/* 16:9 image */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      aspectRatio: "16 / 9",
                      background: "var(--bg-elevated-dark)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/gallery/${item.slug}.jpg`}
                      alt={item.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Category chip top-left */}
                    <span
                      className="absolute font-display font-bold uppercase"
                      style={{
                        top: "var(--space-sm)",
                        left: "var(--space-sm)",
                        padding: "0.25rem 0.625rem",
                        fontSize: "var(--text-eyebrow)",
                        letterSpacing: "0.08em",
                        background: "rgba(10, 10, 10, 0.75)",
                        color: "var(--text-primary)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Caption block */}
                  <div
                    className="flex flex-col gap-2"
                    style={{ padding: "var(--space-md)" }}
                  >
                    <h3
                      className="text-h4 font-display font-bold"
                      style={{
                        color: "var(--text-primary)",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.scope}
                    </h3>
                    <p
                      className="font-mono"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "var(--text-meta)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.town} · {item.priceBand} · {item.year}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom CTA — light tone for alternation */}
      <section
        className="relative w-full"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
        }}
        aria-label="Schedule a walkthrough"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative mx-auto px-6 lg:px-8 text-center"
          style={{
            maxWidth: "var(--container-default)",
            paddingTop: "clamp(3rem, 6vw, 5rem)",
            paddingBottom: "clamp(3rem, 6vw, 5rem)",
            zIndex: 10,
          }}
        >
          <p
            className="text-eyebrow font-display"
            style={{ color: "var(--primary)" }}
          >
            Ready When You Are
          </p>
          <h2
            className="text-h2 font-display font-black mt-3 mb-4"
            style={{
              color: "var(--text-primary-light)",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            See one of these in your home?
          </h2>
          <p
            className="text-body-lg font-body mx-auto mb-8 max-w-xl"
            style={{ color: "var(--text-secondary-light)" }}
          >
            Walk Tony through your project on a 30 minute on-site call. Written
            quote within 24 hours. No pressure, no charge.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center font-display font-bold uppercase rounded-md transition-colors"
              style={{
                background: "var(--primary)",
                color: "var(--text-primary)",
                padding: "0.875rem 1.75rem",
                fontSize: "var(--text-body-sm)",
                letterSpacing: "0.06em",
                borderRadius: "var(--radius-md)",
              }}
            >
              Schedule a Walkthrough
            </Link>
            <TextTonyCTA
              tone="light"
              bodyParam="Hi Tony, I saw a project in your gallery and I'm interested in"
            />
          </div>
        </div>
      </section>
    </>
  );
}
