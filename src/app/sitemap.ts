import type { MetadataRoute } from "next";
import { services, serviceAreas } from "@/data/site";

/**
 * sitemap.ts — Anjo Services, LLC.
 *
 * Per CLAUDE.md SEO Rule + Page Wiring Rule, every public page is enumerated
 * here with priority + changeFrequency tuned to its conversion role.
 *
 * EXCLUSIONS (intentional):
 *   - /pricing      — Optimus internal sales tool, deleted before launch
 *                     per CLAUDE.md Always-Built Features Rule. The
 *                     pre-launch-auditor flags any sitemap entry for
 *                     /pricing as a hard FAIL.
 *   - /api/*        — API route handlers, never crawled.
 *   - /studio       — reserved for Stage 1G Sanity studio mount.
 *   - /blog/*       — Stage 1G adds blog routes; sitemap regenerated then.
 *
 * Priority + changeFrequency rationale (market-intelligence §6 SEO weighting):
 *   1.00  /                    — homepage, primary entry
 *   0.90  /services            — services index, conversion hub
 *   0.90  /booking             — final conversion path
 *   0.85  /services/[slug]     — six service detail pages
 *   0.85  /services/cost       — high-leverage cost-transparency page
 *   0.80  /about               — founder trust
 *   0.80  /contact             — secondary conversion path
 *   0.80  /service-areas       — service-area index
 *   0.75  /service-areas/[city] — nine city landing pages (local SEO)
 *   0.70  /quiz                — lead funnel
 *   0.70  /faq                 — AEO answer-bait surface
 *   0.70  /testimonials        — verbal social proof
 *   0.70  /gallery             — visual social proof
 */

const BASE = "https://anjoservices.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/services/cost`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/service-areas`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/quiz`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/booking`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/testimonials`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/gallery`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Six per-service detail pages (services[] order locked: finish-carpentry leads).
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Nine per-city landing pages from serviceAreas[].
  const cityRoutes: MetadataRoute.Sitemap = serviceAreas.map((a) => ({
    url: `${BASE}/service-areas/${a.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // /pricing is INTENTIONALLY EXCLUDED — Optimus internal sales tool, deleted
  // before launch per CLAUDE.md Always-Built Features Rule. Do not add it.

  return [...staticRoutes, ...serviceRoutes, ...cityRoutes];
}
