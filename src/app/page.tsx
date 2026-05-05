/**
 * Homepage — Anjo Services, LLC.
 *
 * ─── Section rhythm map (locked per design-system.md §11 + CLAUDE.md
 *     Homepage Section Architecture Rule). Three columns: section / tone /
 *     purpose. Wave 2 agents add sections 2–10. Section 1 (Hero) and 11
 *     (Footer, rendered via app/layout.tsx) are owned by Wave 1.
 *
 *  #  | Section                                | Tone  | Purpose
 *  ── | ────────────────────────────────────── | ───── | ──────────────────────────
 *   1 | Hero (3-layer canvas + stagger text +  | dark  | conversion (primary CTAs)
 *     | Schedule Walkthrough / Find My Project |       |
 *     | CTAs)                                   |       |
 *   2 | Pain Points (4-pain grid)              | light | empathy
 *   3 | Services (3-col grid, finish carpentry | dark  | education
 *     | leads)                                  |       |
 *   4 | Featured Project Gallery (before/after | light | social proof (visual)
 *     | slider, coffered ceiling lead)         |       |
 *   5 | About Tony (photo + tenure + license   | dark  | trust + founder
 *     | numbers)                                |       |
 *   6 | Cost Transparency Teaser (3-card cost  | light | education + commerce
 *     | preview → /services/cost)              |       |
 *   7 | Testimonials (3–4 featured + See All   | dark  | social proof (verbal)
 *     | CTA)                                    |       |
 *   8 | Quiz CTA (8 quick questions → /quiz)   | light | conversion (mid-page nudge)
 *   9 | Blog Preview (3 featured articles)     | dark  | content preview
 *  10 | Booking Calendar Teaser (inline custom | light | conversion (final, single
 *     | BookingCalendar)                        |       | bottom-of-page CTA)
 *  11 | Footer (logo + nav + license + Text    | dark  | nav
 *     | Tony + social — rendered in layout.tsx) |       |
 *
 * Dark/light alternation verification:
 *   dark → light → dark → light → dark → light → dark → light → dark → light → dark
 *   Eleven sections, perfect alternation, ZERO adjacent same-tone.
 *
 * Purpose-level dedup verification:
 *   Pain Points (empathy) → Services (education) → Gallery (visual proof) →
 *   About (founder trust) → Cost (commerce) → Testimonials (verbal proof,
 *   separated from Gallery by 2 sections) → Quiz (mid-page conversion,
 *   journey format) → Blog (content) → Booking (final direct conversion).
 *   Hero (conversion) and Booking (conversion) are bookends with 9 sections
 *   between — not adjacent. Quiz CTA and Booking CTA both serve conversion
 *   but use different formats (journey vs. direct calendar) and are
 *   separated by Blog Preview. ZERO adjacent same-purpose.
 *
 * Motion budget verification (Performance budget — max 3 active motion
 * layers visible in any viewport simultaneously):
 *   Above the fold = Hero (1) + Pain Points breathing orb (2) — within budget.
 *   Mid-page scroll never exceeds 2 motion layers because adjacent sections
 *   rotate motion vocabulary (mesh drift / aurora sweep / grain shimmer).
 */

import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import PainPoints from "@/components/sections/PainPoints";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturedGallery from "@/components/sections/FeaturedGallery";
import AboutTeaser from "@/components/sections/AboutTeaser";
import CostTransparency from "@/components/sections/CostTransparency";
import TestimonialsHomepage from "@/components/sections/TestimonialsHomepage";
import QuizCTA from "@/components/sections/QuizCTA";
import BlogPreview from "@/components/sections/BlogPreview";
import BookingTeaser from "@/components/sections/BookingTeaser";
import { GeneralContractorSchema } from "@/components/seo";

export const metadata: Metadata = {
  // Per layout.tsx the title template is "%s | Anjo Services, LLC". Setting
  // `title.absolute` here so the homepage shows the full positioning line
  // without doubling the brand name.
  title: {
    absolute:
      "Anjo Services, LLC: General Contracting & Handyman | Methuen, MA",
  },
  description:
    "Real prices. Real photos. Real Tony on the phone. Owner-led general contracting and handyman work across Methuen, Andover, Haverhill, and Salem NH since 2018.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://anjoservices.com/",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title:
      "Anjo Services, LLC: General Contracting & Handyman | Methuen, MA",
    description:
      "Real prices. Real photos. Real Tony on the phone. Methuen, MA + North Shore + southern NH since 2018.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Anjo Services, LLC: General Contracting & Handyman | Methuen, MA",
    description:
      "Real prices. Real photos. Real Tony on the phone. Methuen, MA + North Shore + southern NH since 2018.",
  },
};

export default function HomePage() {
  return (
    <>
      <GeneralContractorSchema />
      {/* 1 — Hero (dark) */}
      <Hero />
      {/* 2 — Pain Points (light) */}
      <PainPoints />
      {/* 3 — Services (dark) */}
      <ServicesSection />
      {/* 4 — Featured Project Gallery before/after slider (light) */}
      <FeaturedGallery />
      {/* 5 — About Tony (dark) */}
      <AboutTeaser />
      {/* 6 — Cost Transparency teaser (light) */}
      <CostTransparency />
      {/* 7 — Testimonials (dark) */}
      <TestimonialsHomepage />
      {/* 8 — Quiz CTA (light) */}
      <QuizCTA />
      {/* 9 — Blog Preview (dark) */}
      <BlogPreview />
      {/* 10 — Booking Calendar Teaser (light) — single bottom-of-page conversion */}
      <BookingTeaser />
      {/* 11 — Footer (dark) is rendered globally in app/layout.tsx */}
    </>
  );
}
