/**
 * site.ts — Anjo Services, LLC content source of truth.
 *
 * Per CLAUDE.md Code Standards: ALL copy lives here. Zero hard-coded strings
 * in components. The content-writer agent (Stage 1D) fills the empty arrays
 * and headline copy. The frontend-developer (Stage 1E) imports from this
 * file and never invents copy inline.
 *
 * Filled values below are sourced directly from initial-business-data.md +
 * market-intelligence.md. Empty arrays are placeholders for the content-writer
 * agent — DO NOT fill them here. The agent reads design-system.md and
 * market-intelligence.md to write in the correct voice.
 */

export type ServiceArea = {
  city: string;
  state: "MA" | "NH";
  slug: string;
  population: number;
  distance: string;
  description: string;
};

export type Service = {
  slug: string;
  name: string;
  emoji: string;
  positioning: string;
  priceRange: string;
};

export type PainPoint = {
  emoji: string;
  headline: string;
  body: string;
};

export type Stat = {
  emoji: string;
  value: string;
  label: string;
};

export type Testimonial = {
  name: string;
  identifier: string;
  rating: 5;
  quote: string;
  service: string;
  stat?: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type QuizOption = {
  emoji: string;
  label: string;
  type: "andover-upgrader" | "solo-homeowner" | "storm-recovery" | "ghosted-rebuilder";
};

export type QuizStep = {
  question: string;
  options: QuizOption[];
};

export const siteConfig = {
  name: "Anjo Services, LLC",
  legalName: "Anjo Services, LLC",
  ownerName: "Tony Squillini",
  baseCity: "Methuen, MA",
  serviceAreaCorridor: "North Shore MA + southern NH",
  yearFounded: 2018,
  tenureYears: 7,
  domain: "anjoservices.com",
  url: "https://anjoservices.com",
  phone: "(978) 216-6455",
  phoneHref: "tel:+19782166455",
  smsHref: "sms:+19782166455",
  email: "", // [DEMO COPY — pending client review]
  // Placeholder tagline until content-writer Stage 1D rewrites per market-intelligence §7
  // ("Working contractor. Real prices. North Shore MA & southern NH since 2018.")
  tagline: "Real work. Real prices. North Shore MA & southern NH since 2018.",
  ctaPrimary: { label: "Schedule a Walkthrough", href: "/booking" },
  ctaSecondaryQuiz: { label: "Find My Project", href: "/quiz" },
  ctaTextTony: { label: "Text Tony", href: "sms:+19782166455" },
  // Trust signals to surface above the fold (market-intelligence §7)
  // License numbers populated when client provides them (Phase 0 blocker #3)
  trust: {
    licenseHIC: "", // pending client confirmation — MA HIC number
    licenseCSL: "", // pending client confirmation — MA CSL number
    licenseNH: "", // pending client confirmation — NH license if any
    yearsInBusiness: 7,
    googleReviewsCount: 0, // pending Trustindex/GuildQuality embed
    googleReviewsAvg: 0,
  },
};

export const hero = {
  eyebrow: "Methuen, MA · since 2018",
  // H1 = siteConfig.tagline always (Hero Architecture Rule)
  // Subheadline carries emotional hook — content-writer rewrites Stage 1D
  subheadline:
    "Owner-led. Same hands every visit. Kitchens, baths, finish carpentry, decks, paint, and the small things that drive you crazy on a Sunday afternoon.",
  trustCopy:
    "Licensed MA + NH · Insured · Quote within 24 hours", // [DEMO COPY — confirm license numbers on receipt]
};

// Filled by content-writer Stage 1D — trade-authority voice, audience persona match
export const painPoints: PainPoint[] = [];
export const services: Service[] = [];
export const stats: Stat[] = [];
export const testimonials: Testimonial[] = []; // 36 — never fewer
export const faqs: FaqItem[] = [];
export const quizSteps: QuizStep[] = [];

// Service-area cities (8–12 per market-intelligence.md §6 + design-system.md Section 11)
// Descriptions written by content-writer Stage 1D — kept empty here so agent
// has a clean target to fill. Population + distance from Methuen are static
// facts the agent can verify and lock in.
export const serviceAreas: ServiceArea[] = [
  { city: "Methuen",       state: "MA", slug: "methuen-ma",       population: 53000, distance: "0 miles",   description: "" },
  { city: "Andover",       state: "MA", slug: "andover-ma",       population: 36500, distance: "5 miles",   description: "" },
  { city: "Haverhill",     state: "MA", slug: "haverhill-ma",     population: 67000, distance: "5 miles",   description: "" },
  { city: "North Andover", state: "MA", slug: "north-andover-ma", population: 31300, distance: "6 miles",   description: "" },
  { city: "Lawrence",      state: "MA", slug: "lawrence-ma",      population: 89000, distance: "3 miles",   description: "" },
  { city: "Salem",         state: "NH", slug: "salem-nh",         population: 30100, distance: "8 miles",   description: "" },
  { city: "Derry",         state: "NH", slug: "derry-nh",         population: 34300, distance: "13 miles",  description: "" },
  { city: "Windham",       state: "NH", slug: "windham-nh",       population: 15700, distance: "10 miles",  description: "" },
  { city: "Londonderry",   state: "NH", slug: "londonderry-nh",   population: 26700, distance: "15 miles",  description: "" },
];

// Schema.org structured data (per market-intelligence §6: GeneralContractor preferred)
export const schema = {
  type: "GeneralContractor" as const,
  parentType: "HomeAndConstructionBusiness",
  priceRange: "$$",
  founder: { "@type": "Person", name: "Tony Squillini" },
  foundingDate: "2018",
  areaServed: serviceAreas.map((a) => ({ "@type": "City", name: `${a.city}, ${a.state}` })),
};
