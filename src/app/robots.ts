import type { MetadataRoute } from "next";

/**
 * robots.ts — Anjo Services, LLC.
 *
 * Disallow rules:
 *   /api/*   — Next.js route handlers (never crawled).
 *   /studio  — reserved for Stage 1G Sanity studio mount; never expose.
 *   /pricing — Optimus internal sales tool, deleted before launch but
 *              defense-in-depth: blocked here too in case the route lingers
 *              in any deployed snapshot.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio", "/pricing"],
      },
    ],
    sitemap: "https://anjoservices.com/sitemap.xml",
    host: "https://anjoservices.com",
  };
}
