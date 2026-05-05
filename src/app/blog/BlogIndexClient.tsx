"use client";

/**
 * BlogIndexClient — interactive blog index with category tabs + grid filter.
 *
 * Layout per agent file Section 4:
 *   1. Page Header (Fragment root, hero-shimmer h1 "The Anjo Blog", ambient orbs)
 *   2. Featured post hero card (FEATURED_SLUG full-width)
 *   3. Category tabs (All + per-category) — client-state filter
 *   4. Article grid (3-col desktop / 1-col mobile) — filtered by tab
 *   5. Bottom CTA section ("Want a quote in plain English?" → /booking)
 *
 * No newsletter signup, no email capture (per build-log Pattern #32 — quiz +
 * book over newsletter). All animation respects prefers-reduced-motion via
 * the existing animation primitives in @/components/animations.
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  blogArticles,
  blogCategories,
  getArticleBySlug,
  FEATURED_SLUG,
  type BlogArticle,
  type BlogCategory,
} from "@/data/blog";
import { ScaleIn, FadeUp } from "@/components/animations";

type Tab = "All" | BlogCategory;

const CATEGORY_EMOJI: Record<BlogCategory, string> = {
  "Cost Guides": "💸",
  "Hire Smart": "📋",
  "Project Process": "🛠️",
  "Finish Carpentry": "🪚",
  "Permits & Law": "⚖️",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group block h-full overflow-hidden transition-colors"
      style={{
        background: "var(--bg-card-dark)",
        border: "1px solid var(--border-card-dark)",
        borderRadius: "var(--radius-lg)",
        textDecoration: "none",
        color: "var(--text-primary)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-card-dark)";
      }}
    >
      {/* 16:9 image container with gradient + emoji fallback */}
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%",
          background:
            "linear-gradient(135deg, rgba(200,32,44,0.18) 0%, rgba(232,176,76,0.10) 60%, rgba(255,255,255,0.04) 100%)",
          borderBottom: "1px solid var(--border-card-dark)",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.cardImage}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            opacity: 0.45,
            pointerEvents: "none",
          }}
        >
          {CATEGORY_EMOJI[article.category]}
        </div>
      </div>
      <div
        style={{
          padding: "var(--space-md) var(--space-md) var(--space-lg)",
        }}
      >
        <span
          className="inline-block font-mono text-meta"
          style={{
            color: "var(--accent)",
            background: "rgba(232, 176, 76, 0.08)",
            border: "1px solid rgba(232, 176, 76, 0.25)",
            padding: "0.25rem 0.55rem",
            borderRadius: "var(--radius-sm)",
            letterSpacing: "0.04em",
            marginBottom: "var(--space-sm)",
            textTransform: "uppercase",
          }}
        >
          {article.category}
        </span>
        <h3
          className="font-display"
          style={{
            fontSize: "var(--text-h4)",
            lineHeight: 1.25,
            color: "var(--text-primary)",
            marginTop: "var(--space-sm)",
            marginBottom: "var(--space-sm)",
          }}
        >
          {article.title}
        </h3>
        <p
          className="font-body text-body-sm"
          style={{
            color: "var(--text-secondary)",
            lineHeight: 1.55,
            marginBottom: "var(--space-md)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.excerpt}
        </p>
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "var(--space-sm)" }}
        >
          <span
            className="font-mono text-meta"
            style={{ color: "var(--text-muted)" }}
          >
            {article.author.name}
          </span>
          <span
            className="font-mono text-meta"
            style={{ color: "var(--text-muted)" }}
          >
            {article.readMinutes} min read
          </span>
        </div>
        <span
          className="font-display text-body-sm"
          style={{
            color: "var(--primary)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Read article →
        </span>
      </div>
    </Link>
  );
}

export default function BlogIndexClient() {
  const [tab, setTab] = useState<Tab>("All");
  const featured = getArticleBySlug(FEATURED_SLUG);

  // Articles in the grid: exclude the featured one (it has its own hero card),
  // sorted by publishedAt desc.
  const filtered = useMemo(() => {
    const base = blogArticles
      .filter((a) => a.slug !== FEATURED_SLUG)
      .slice()
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime(),
      );
    return tab === "All" ? base : base.filter((a) => a.category === tab);
  }, [tab]);

  return (
    <>
      {/* ─── 1. Page Header ─────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
        aria-label="Blog index header"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        {/* Ambient breathing orbs (per design-system §11 + Animation depth rule) */}
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
            top: "30%",
            right: "8%",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,176,76,0.15) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />

        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-24"
          style={{ maxWidth: "var(--container-default)", zIndex: 1 }}
        >
          <div className="text-center md:text-left">
            <p
              className="text-eyebrow font-display"
              style={{
                color: "var(--accent)",
                marginBottom: "var(--space-sm)",
              }}
            >
              Field notes from Methuen
            </p>
            <h1
              className="hero-shimmer font-display text-h1"
              style={{
                color: "var(--text-primary)",
                marginBottom: "var(--space-md)",
                maxWidth: "20ch",
              }}
            >
              The Anjo Blog
            </h1>
            <p
              className="font-body text-body-lg"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "60ch",
              }}
            >
              Real prices, real process, real Methuen. Cost guides,
              hire-smart checklists, and finish-carpentry walkthroughs in
              plain trade voice.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. Featured Article Hero Card ─────────────────────────────── */}
      {featured && (
        <section
          className="relative w-full overflow-hidden"
          style={{
            background: "var(--bg-base)",
            color: "var(--text-primary-light)",
          }}
          aria-label="Featured article"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{ background: "var(--bg-light-overlay-radial)" }}
          />
          <div
            className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-20"
            style={{ maxWidth: "var(--container-wide)", zIndex: 1 }}
          >
            <p
              className="text-eyebrow font-display"
              style={{
                color: "var(--primary)",
                marginBottom: "var(--space-md)",
              }}
            >
              Featured · Most-asked question this corridor
            </p>

            <Link
              href={`/blog/${featured.slug}`}
              className="group block"
              style={{
                textDecoration: "none",
                color: "var(--text-primary-light)",
              }}
            >
              <div
                className="grid md:grid-cols-2 gap-6 md:gap-10 items-center"
                style={{
                  background: "var(--bg-card-light)",
                  border: "1px solid var(--border-card-light)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-md)",
                  transition: "border-color 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "var(--border-card-light)";
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%",
                    background:
                      "linear-gradient(135deg, rgba(200,32,44,0.18) 0%, rgba(232,176,76,0.10) 60%, rgba(232,229,223,0.4) 100%)",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.headerImage}
                    alt=""
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "4rem",
                      opacity: 0.45,
                      pointerEvents: "none",
                    }}
                  >
                    {CATEGORY_EMOJI[featured.category]}
                  </div>
                </div>

                <div>
                  <span
                    className="inline-block font-mono text-meta"
                    style={{
                      color: "var(--primary)",
                      background: "var(--primary-soft)",
                      border: "1px solid rgba(200, 32, 44, 0.30)",
                      padding: "0.25rem 0.55rem",
                      borderRadius: "var(--radius-sm)",
                      letterSpacing: "0.04em",
                      marginBottom: "var(--space-sm)",
                      textTransform: "uppercase",
                    }}
                  >
                    {featured.category}
                  </span>
                  <h2
                    className="font-display"
                    style={{
                      fontSize: "var(--text-h2)",
                      lineHeight: 1.15,
                      color: "var(--text-primary-light)",
                      marginBottom: "var(--space-md)",
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    className="font-body text-body-lg"
                    style={{
                      color: "var(--text-secondary-light)",
                      lineHeight: 1.55,
                      marginBottom: "var(--space-md)",
                    }}
                  >
                    {featured.excerpt}
                  </p>
                  <div
                    className="flex items-center gap-3 font-mono text-meta"
                    style={{
                      color: "var(--text-muted-light)",
                      marginBottom: "var(--space-md)",
                    }}
                  >
                    <span>{featured.author.name}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatDate(featured.publishedAt)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featured.readMinutes} min read</span>
                  </div>
                  <span
                    className="font-display"
                    style={{
                      color: "var(--primary)",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Read article →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ─── 3. Category Tabs ─────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
        aria-label="Filter articles by category"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-12 md:py-16"
          style={{ maxWidth: "var(--container-wide)", zIndex: 1 }}
        >
          <div
            role="tablist"
            aria-label="Article categories"
            className="flex flex-wrap gap-3 justify-center md:justify-start"
            style={{ marginBottom: "var(--space-2xl)" }}
          >
            {(["All", ...blogCategories] as Tab[]).map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t)}
                  className="font-display"
                  style={{
                    background: active
                      ? "var(--primary)"
                      : "transparent",
                    color: active
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                    border: `1px solid ${active ? "var(--primary)" : "var(--border-card-dark)"}`,
                    borderRadius: "var(--radius-md)",
                    padding: "0.55rem 1.05rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontSize: "var(--text-meta)",
                    cursor: "pointer",
                    transition:
                      "background 180ms ease, color 180ms ease, border-color 180ms ease",
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* ─── 4. Article Grid ───────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((a, i) => (
              <ScaleIn key={a.slug} delay={i * 0.06} from={0.96}>
                <ArticleCard article={a} />
              </ScaleIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <p
              className="font-body text-body"
              style={{
                color: "var(--text-secondary)",
                textAlign: "center",
                padding: "var(--space-2xl) 0",
              }}
            >
              No articles in this category yet. More coming soon.
            </p>
          )}
        </div>
      </section>

      {/* ─── 5. Bottom CTA ────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
        }}
        aria-label="Schedule a walkthrough"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        {/* Animated gradient breathing orb (per Homepage Section Architecture
            Rule — never static). */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none orb"
          style={{
            top: "20%",
            left: "20%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,32,44,0.10) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute pointer-events-none orb-2"
          style={{
            bottom: "10%",
            right: "15%",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,176,76,0.10) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-20 text-center"
          style={{ maxWidth: "var(--container-narrow)", zIndex: 1 }}
        >
          <FadeUp>
            <h2
              className="font-display"
              style={{
                fontSize: "var(--text-h2)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "var(--text-primary-light)",
                marginBottom: "var(--space-md)",
              }}
            >
              Want a quote in plain English?
            </h2>
            <p
              className="font-body text-body-lg"
              style={{
                color: "var(--text-secondary-light)",
                maxWidth: "44ch",
                margin: "0 auto var(--space-lg)",
              }}
            >
              Schedule a 30 minute on-site walkthrough. Written quote within
              24 hours. Tony does the walkthrough himself.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center font-display font-bold uppercase"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-primary)",
                  padding: "0.95rem 1.85rem",
                  borderRadius: "var(--radius-md)",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                }}
              >
                Schedule a Walkthrough →
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center font-display font-bold uppercase"
                style={{
                  background: "transparent",
                  color: "var(--text-primary-light)",
                  padding: "0.95rem 1.85rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--primary)",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                }}
              >
                Find My Project
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
