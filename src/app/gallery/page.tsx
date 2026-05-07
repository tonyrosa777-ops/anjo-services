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
 *   3. <GalleryGrid /> — sticky filter chips + animated 3-col grid covering
 *      all 6 Anjo offerings (54 items total: 9 per category). Pattern derived
 *      from Placed-Right-Fence/web/src/app/gallery/GalleryGrid.tsx.
 *   4. Booking CTA at bottom (Schedule a Walkthrough → /booking)
 *
 * Items live in /data/gallery.ts. Image src pattern:
 *   /gallery/{slug}.jpg              — single grid card
 *   /gallery/{slug}-before.jpg       — slider before (3 pairs only)
 *   /gallery/{slug}-after.jpg        — slider after (3 pairs only)
 *
 * Page is server-rendered. The interactive slider and the filter grid are
 * client components imported below.
 */

import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfterSlider, {
  type BeforeAfterPair,
} from "@/components/BeforeAfterSlider";
import TextTonyCTA from "@/components/TextTonyCTA";
import { BreadcrumbSchema } from "@/components/seo";
import GalleryGrid from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Project Gallery: Finish Carpentry, Kitchens, Baths, Decks, Painting, Handyman",
  description:
    "Real Anjo project photos across Methuen, Andover, Haverhill, North Andover, Lawrence, Salem NH, Derry, and Windham. Filter by category. Town, scope, price, and year on every photo.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    url: "https://anjoservices.com/gallery",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title:
      "Project Gallery: Finish Carpentry, Kitchens, Baths, Decks, Painting, Handyman",
    description:
      "Real Anjo project photos. Town, scope, price, year on every image. Methuen, Andover, Haverhill, Salem NH and beyond.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Project Gallery: Finish Carpentry, Kitchens, Baths, Decks, Painting, Handyman",
    description:
      "Real Anjo project photos. Town, scope, price, year on every image.",
  },
};

// Lead the in-page slider with the same 3 marquee pairs the homepage uses.
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
            Finish carpentry, kitchens, baths, decks, painting, and honey-do
            jobs across Methuen, Andover, Haverhill, North Andover, Lawrence,
            Salem NH, Derry, and Windham. Filter by category. Every caption
            names the town, the scope, the price band, and the year.
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

      {/* Filter chips + animated grid — dark tone for contrast */}
      <GalleryGrid />

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
