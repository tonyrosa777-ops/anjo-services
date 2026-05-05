"use client";

/**
 * /testimonials — paginated 9-per-page grid of all 36 reviews.
 *
 * Hard constraints (CLAUDE.md Always-Built Features Rule + Error #31):
 *   - 36 testimonials total. 9 per page exactly. 4 pages exactly.
 *   - Grid is 3 columns × 3 rows. NEVER 8 per page (orphan-row failure).
 *   - ZERO em dashes anywhere on the page.
 *
 * URL state (Next 16 — searchParams is a Promise, accessed via React `use`):
 *   ?page=1..4         — pagination
 *   ?service=<slug>    — optional filter by service slug from services[]
 *
 * Layout:
 *   - Page Header (per Page Header Standard, ambient orbs, h1 = .hero-shimmer
 *     font-display text-h1 font-bold, "Testimonials").
 *   - Featured quote: full-width large type. Picks the first testimonial
 *     (index 0 = the [REAL] Sarah K. fragment — first 4 are the verified
 *     real Anjo reviews per content-writer markup).
 *   - Filter chips: All + one chip per service slug present in testimonials,
 *     each showing the count.
 *   - Grid: 9 per page, 3-col × 3-row.
 *   - Pagination controls.
 *   - Booking CTA teaser at bottom with breathing-orb ambient (per Page Header
 *     Standard interior-page ambient — never static).
 */

import { use, useMemo } from "react";
import Link from "next/link";
import { siteConfig, services, testimonials } from "@/data/site";
import type { Testimonial } from "@/data/site";

const PAGE_SIZE = 9; // 9 per page × 4 pages = 36 — Error #31 lock

type SearchParams = { [key: string]: string | string[] | undefined };

export default function TestimonialsClient({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = use(searchParams);
  const rawPage = typeof sp.page === "string" ? parseInt(sp.page, 10) : 1;
  const rawService = typeof sp.service === "string" ? sp.service : "";

  // Filter chip definitions: All + every service slug, with counts based on
  // the testimonials[].service field.
  const filterChips = useMemo(() => {
    const chips: { slug: string; label: string; count: number; emoji: string }[] = [
      {
        slug: "",
        label: "All",
        count: testimonials.length,
        emoji: "📋",
      },
    ];
    for (const svc of services) {
      const count = testimonials.filter((t) => t.service === svc.slug).length;
      if (count > 0) {
        chips.push({
          slug: svc.slug,
          label: svc.name,
          count,
          emoji: svc.emoji,
        });
      }
    }
    return chips;
  }, []);

  // Filter testimonials by service (or pass through if no filter).
  const filtered = useMemo(() => {
    if (!rawService) return testimonials;
    return testimonials.filter((t) => t.service === rawService);
  }, [rawService]);

  // Pagination math — locked to 9 per page.
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, isNaN(rawPage) ? 1 : rawPage), totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  // Featured quote = first testimonial (already the [REAL] Sarah K. quote)
  const featured: Testimonial = testimonials[0];

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
            36 reviews · {siteConfig.serviceAreaCorridor}
          </p>
          <h1
            className="hero-shimmer font-display text-h1 font-bold"
            style={{
              color: "var(--text-primary)",
              marginBottom: "var(--space-md)",
            }}
          >
            What homeowners say
          </h1>
          <p
            className="font-body text-body-lg"
            style={{
              color: "rgba(245,245,242,0.92)",
              maxWidth: "60ch",
            }}
          >
            Real names, real towns, real prices attached. Filter by project
            type below. Every review reflects a job Tony ran himself.
          </p>
        </div>
      </section>

      {/* ─── Featured quote ────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-2xl)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative z-10 mx-auto px-6 lg:px-8"
          style={{ maxWidth: "var(--container-default)" }}
        >
          <figure
            className="p-8 lg:p-12"
            style={{
              background: "var(--bg-card-light)",
              border: "1px solid var(--border-card-light)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <span
              aria-hidden="true"
              className="text-5xl block"
              style={{
                color: "var(--primary)",
                lineHeight: 1,
                marginBottom: "var(--space-sm)",
              }}
            >
              ❝
            </span>
            <blockquote
              className="font-display"
              style={{
                color: "var(--text-primary-light)",
                fontSize: "var(--text-h2)",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
                fontWeight: 700,
                marginBottom: "var(--space-lg)",
              }}
            >
              {featured.quote}
            </blockquote>
            <figcaption className="flex flex-col gap-1">
              <span
                className="font-display font-bold"
                style={{
                  color: "var(--text-primary-light)",
                  fontSize: "var(--text-body-lg)",
                }}
              >
                {featured.name}
              </span>
              <span
                className="font-mono"
                style={{
                  color: "var(--text-muted-light)",
                  fontSize: "var(--text-meta)",
                }}
              >
                {featured.identifier}
              </span>
              {featured.stat && (
                <span
                  className="font-mono"
                  style={{
                    color: "var(--primary)",
                    fontSize: "var(--text-meta)",
                  }}
                >
                  {featured.stat}
                </span>
              )}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ─── Filter chips + paginated 3x3 grid ─────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
          paddingTop: "var(--space-2xl)",
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
          style={{ maxWidth: "var(--container-wide)" }}
        >
          {/* Filter chips */}
          <div
            className="flex flex-wrap gap-2"
            style={{ marginBottom: "var(--space-xl)" }}
            role="group"
            aria-label="Filter testimonials by service type"
          >
            {filterChips.map((chip) => {
              const isActive = chip.slug === rawService;
              const href = chip.slug
                ? `/testimonials?service=${chip.slug}`
                : `/testimonials`;
              return (
                <Link
                  key={chip.slug || "all"}
                  href={href}
                  scroll={false}
                  className="inline-flex items-center gap-2 transition-colors"
                  style={{
                    background: isActive
                      ? "var(--primary)"
                      : "var(--bg-card-light)",
                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-primary-light)",
                    border: isActive
                      ? "1px solid var(--primary)"
                      : "1px solid var(--border-card-light)",
                    borderRadius: "999px",
                    padding: "0.5rem 1rem",
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-body-sm)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                  }}
                  aria-pressed={isActive}
                >
                  <span aria-hidden="true">{chip.emoji}</span>
                  <span>{chip.label}</span>
                  <span
                    style={{
                      color: isActive
                        ? "rgba(255,255,255,0.85)"
                        : "var(--text-muted-light)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 500,
                    }}
                  >
                    {chip.count}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Empty state */}
          {pageItems.length === 0 ? (
            <p
              className="font-body text-body-lg"
              style={{ color: "var(--text-secondary-light)" }}
            >
              No reviews yet for that service. Check back soon, or text Tony
              at {siteConfig.phone}.
            </p>
          ) : (
            <>
              {/* Grid: 3-col × 3-row, 9 per page (Error #31 lock) */}
              <ul
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
                aria-label={`Reviews page ${page} of ${totalPages}`}
              >
                {pageItems.map((t, i) => (
                  <li
                    key={`${t.name}-${start + i}`}
                    className="flex flex-col p-6 lg:p-7"
                    style={{
                      background: "var(--bg-card-light)",
                      border: "1px solid var(--border-card-light)",
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
                        color: "var(--text-primary-light)",
                        marginBottom: "var(--space-md)",
                        flex: "1 1 auto",
                      }}
                    >
                      {t.quote}
                    </blockquote>
                    <footer
                      className="flex flex-col gap-1"
                      style={{
                        borderTop: "1px solid var(--border-card-light)",
                        paddingTop: "var(--space-sm)",
                      }}
                    >
                      <span
                        className="font-display font-bold"
                        style={{
                          color: "var(--text-primary-light)",
                          fontSize: "var(--text-body)",
                        }}
                      >
                        {t.name}
                      </span>
                      <span
                        className="font-mono"
                        style={{
                          color: "var(--text-muted-light)",
                          fontSize: "var(--text-meta)",
                        }}
                      >
                        {t.identifier}
                      </span>
                      {t.stat && (
                        <span
                          className="font-mono"
                          style={{
                            color: "var(--primary)",
                            fontSize: "var(--text-meta)",
                          }}
                        >
                          {t.stat}
                        </span>
                      )}
                    </footer>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Testimonials pagination"
                  className="flex items-center justify-center gap-2 flex-wrap"
                  style={{ marginTop: "var(--space-2xl)" }}
                >
                  <PageLink
                    page={page - 1}
                    service={rawService}
                    disabled={page <= 1}
                    label="‹ Prev"
                  />
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <PageLink
                        key={p}
                        page={p}
                        service={rawService}
                        active={p === page}
                        label={String(p)}
                      />
                    ),
                  )}
                  <PageLink
                    page={page + 1}
                    service={rawService}
                    disabled={page >= totalPages}
                    label="Next ›"
                  />
                </nav>
              )}
            </>
          )}
        </div>
      </section>

      {/* ─── Booking CTA teaser with breathing orb ambient ─────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        {/* Breathing orb ambient — Page Header Standard interior-page rule */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="orb absolute"
            style={{
              top: "20%",
              left: "20%",
              width: "32rem",
              height: "32rem",
              background:
                "radial-gradient(circle, rgba(200,32,44,0.5) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="orb-2 absolute"
            style={{
              bottom: "10%",
              right: "15%",
              width: "26rem",
              height: "26rem",
              background:
                "radial-gradient(circle, rgba(232,176,76,0.3) 0%, transparent 60%)",
              filter: "blur(55px)",
            }}
          />
        </div>

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
            Want to be the next 5-star review?
          </h2>
          <p
            className="font-body text-body-lg"
            style={{
              color: "var(--text-secondary)",
              marginBottom: "var(--space-lg)",
            }}
          >
            Pick a 30 minute on-site walkthrough with Tony. Quote in writing
            within 24 hours. No pressure.
          </p>
          <Link
            href={siteConfig.ctaPrimary.href}
            className="inline-flex items-center justify-center font-display font-bold uppercase"
            style={{
              background: "var(--primary)",
              color: "var(--text-primary)",
              padding: "0.875rem 1.5rem",
              borderRadius: "var(--radius-md)",
              letterSpacing: "0.06em",
            }}
          >
            {siteConfig.ctaPrimary.label}
          </Link>
        </div>
      </section>
    </>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────────── */

function PageLink({
  page,
  service,
  active = false,
  disabled = false,
  label,
}: {
  page: number;
  service: string;
  active?: boolean;
  disabled?: boolean;
  label: string;
}) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (service) params.set("service", service);
  const href = `/testimonials?${params.toString()}`;

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "2.5rem",
    padding: "0.5rem 0.875rem",
    borderRadius: "var(--radius-md)",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "var(--text-body-sm)",
    letterSpacing: "0.04em",
  };

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        style={{
          ...baseStyle,
          background: "transparent",
          color: "var(--text-muted-light)",
          border: "1px solid var(--border-card-light)",
          opacity: 0.5,
          cursor: "not-allowed",
        }}
      >
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      style={{
        ...baseStyle,
        background: active ? "var(--primary)" : "transparent",
        color: active ? "var(--text-primary)" : "var(--text-primary-light)",
        border: active
          ? "1px solid var(--primary)"
          : "1px solid var(--border-card-light)",
      }}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
