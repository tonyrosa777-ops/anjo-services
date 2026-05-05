"use client";

/**
 * BlogPostClient — Renders the article body in a 70/30 split.
 *
 * Layout per agent file Section 6 + website-build-template.md §Section 6:
 *
 *   1. Page header section: category chip + h1 (hero-shimmer) + meta row +
 *      headerImage below
 *   2. 70/30 split body:
 *        - 70% left: BlogBlock[].map (renders each block per kind)
 *        - 30% right (sticky): TOC, author card, related articles
 *   3. End-of-post CTA card: "Find Your Project" → /quiz +
 *                            "Schedule a Free Walkthrough" → /booking
 *
 * TOC parses body for h2/h3 ids and highlights the active section on scroll
 * via IntersectionObserver. Markdown-style [text](href) inline links inside
 * `kind: "p"` blocks are rendered as <Link> elements.
 *
 * NO newsletter signup, NO email capture (per build-log Pattern #32).
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import type { BlogArticle, BlogBlock } from "@/data/blog";

type Props = {
  article: BlogArticle;
  related: BlogArticle[];
};

const CATEGORY_EMOJI: Record<string, string> = {
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

// Parse Markdown-style [text](href) inline links inside paragraph text.
// Returns an array of strings and Link elements.
function renderInlineLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    if (href.startsWith("/") || href.startsWith("#")) {
      parts.push(
        <Link
          key={`link-${key++}`}
          href={href}
          style={{
            color: "var(--primary)",
            fontWeight: 600,
            textDecoration: "underline",
            textUnderlineOffset: "0.2em",
            textDecorationColor: "rgba(200, 32, 44, 0.4)",
          }}
        >
          {label}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={`link-${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--primary)",
            fontWeight: 600,
            textDecoration: "underline",
            textUnderlineOffset: "0.2em",
            textDecorationColor: "rgba(200, 32, 44, 0.4)",
          }}
        >
          {label}
        </a>,
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p
          className="font-body"
          style={{
            fontSize: "var(--text-body-lg)",
            lineHeight: 1.7,
            color: "var(--text-primary-light)",
            marginBottom: "var(--space-md)",
          }}
        >
          {renderInlineLinks(block.text)}
        </p>
      );
    case "h2":
      return (
        <h2
          id={block.id}
          className="font-display"
          style={{
            fontSize: "var(--text-h2)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "var(--text-primary-light)",
            marginTop: "var(--space-2xl)",
            marginBottom: "var(--space-md)",
            scrollMarginTop: "7rem",
          }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={block.id}
          className="font-display"
          style={{
            fontSize: "var(--text-h3)",
            lineHeight: 1.25,
            color: "var(--text-primary-light)",
            marginTop: "var(--space-xl)",
            marginBottom: "var(--space-sm)",
            scrollMarginTop: "7rem",
          }}
        >
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul
          className="font-body"
          style={{
            fontSize: "var(--text-body-lg)",
            lineHeight: 1.7,
            color: "var(--text-primary-light)",
            marginBottom: "var(--space-md)",
            paddingLeft: "1.5rem",
            listStyle: "disc",
          }}
        >
          {block.items.map((item, i) => (
            <li key={i} style={{ marginBottom: "var(--space-2xs)" }}>
              {renderInlineLinks(item)}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          className="font-body"
          style={{
            fontSize: "var(--text-body-lg)",
            lineHeight: 1.7,
            color: "var(--text-primary-light)",
            marginBottom: "var(--space-md)",
            paddingLeft: "1.5rem",
            listStyle: "decimal",
          }}
        >
          {block.items.map((item, i) => (
            <li key={i} style={{ marginBottom: "var(--space-2xs)" }}>
              {renderInlineLinks(item)}
            </li>
          ))}
        </ol>
      );
    case "callout": {
      const isWarning = block.tone === "warning";
      return (
        <aside
          role="note"
          style={{
            background: isWarning
              ? "rgba(200, 32, 44, 0.06)"
              : "rgba(232, 176, 76, 0.08)",
            border: `1px solid ${isWarning ? "rgba(200, 32, 44, 0.30)" : "rgba(232, 176, 76, 0.30)"}`,
            borderLeft: `4px solid ${isWarning ? "var(--primary)" : "var(--accent)"}`,
            borderRadius: "var(--radius-md)",
            padding: "var(--space-md) var(--space-lg)",
            marginTop: "var(--space-lg)",
            marginBottom: "var(--space-lg)",
          }}
        >
          <p
            className="font-display"
            style={{
              fontSize: "var(--text-h4)",
              lineHeight: 1.25,
              fontWeight: 800,
              color: isWarning ? "var(--primary)" : "var(--text-primary-light)",
              marginBottom: "var(--space-2xs)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {isWarning ? "⚠ " : "💡 "}
            {block.title}
          </p>
          <p
            className="font-body"
            style={{
              fontSize: "var(--text-body)",
              lineHeight: 1.6,
              color: "var(--text-secondary-light)",
              margin: 0,
            }}
          >
            {renderInlineLinks(block.text)}
          </p>
        </aside>
      );
    }
    case "quote":
      return (
        <blockquote
          style={{
            borderLeft: "4px solid var(--primary)",
            paddingLeft: "var(--space-md)",
            margin: "var(--space-lg) 0",
            fontStyle: "normal",
          }}
        >
          <p
            className="font-display"
            style={{
              fontSize: "var(--text-h3)",
              lineHeight: 1.3,
              color: "var(--text-primary-light)",
              fontWeight: 700,
              marginBottom: "var(--space-2xs)",
            }}
          >
            &ldquo;{block.text}&rdquo;
          </p>
          {block.cite && (
            <cite
              className="font-mono text-meta"
              style={{
                color: "var(--text-muted-light)",
                fontStyle: "normal",
              }}
            >
              {block.cite}
            </cite>
          )}
        </blockquote>
      );
  }
}

function TableOfContents({
  headings,
  activeId,
}: {
  headings: Array<{ id: string; text: string; level: 2 | 3 }>;
  activeId: string | null;
}) {
  if (headings.length === 0) return null;
  return (
    <nav
      aria-label="Table of contents"
      style={{
        background: "var(--bg-card-light)",
        border: "1px solid var(--border-card-light)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-md)",
      }}
    >
      <p
        className="text-eyebrow font-display"
        style={{
          color: "var(--primary)",
          marginBottom: "var(--space-sm)",
        }}
      >
        On this page
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <li
              key={h.id}
              style={{
                paddingLeft: h.level === 3 ? "1rem" : 0,
                marginBottom: "0.4rem",
              }}
            >
              <a
                href={`#${h.id}`}
                className="font-body text-body-sm"
                style={{
                  color: active
                    ? "var(--primary)"
                    : "var(--text-secondary-light)",
                  textDecoration: "none",
                  fontWeight: active ? 600 : 400,
                  borderLeft: active
                    ? "2px solid var(--primary)"
                    : "2px solid transparent",
                  paddingLeft: "0.5rem",
                  display: "block",
                  transition: "color 150ms ease",
                  lineHeight: 1.4,
                }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function BlogPostClient({ article, related }: Props) {
  const headings: Array<{ id: string; text: string; level: 2 | 3 }> = article
    .body
    .filter(
      (b): b is Extract<BlogBlock, { kind: "h2" | "h3" }> =>
        b.kind === "h2" || b.kind === "h3",
    )
    .map((b) => ({
      id: b.id,
      text: b.text,
      level: (b.kind === "h2" ? 2 : 3) as 2 | 3,
    }));

  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) setActiveId(id);
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  return (
    <>
      {/* ─── 1. Page Header ─────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
        aria-label="Article header"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
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
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-20"
          style={{ maxWidth: "var(--container-default)", zIndex: 1 }}
        >
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-meta"
            style={{
              color: "var(--text-muted)",
              marginBottom: "var(--space-md)",
            }}
          >
            <Link
              href="/blog"
              style={{ color: "var(--text-muted)", textDecoration: "none" }}
            >
              Blog
            </Link>
            <span aria-hidden="true" style={{ margin: "0 0.5rem" }}>
              ›
            </span>
            <span style={{ color: "var(--text-secondary)" }}>
              {article.category}
            </span>
          </nav>

          <span
            className="inline-block font-mono text-meta"
            style={{
              color: "var(--accent)",
              background: "rgba(232, 176, 76, 0.08)",
              border: "1px solid rgba(232, 176, 76, 0.25)",
              padding: "0.3rem 0.7rem",
              borderRadius: "var(--radius-sm)",
              letterSpacing: "0.04em",
              marginBottom: "var(--space-md)",
              textTransform: "uppercase",
            }}
          >
            <span aria-hidden="true" style={{ marginRight: "0.4rem" }}>
              {CATEGORY_EMOJI[article.category]}
            </span>
            {article.category}
          </span>

          <h1
            className="hero-shimmer font-display text-h1"
            style={{
              color: "var(--text-primary)",
              marginBottom: "var(--space-md)",
              maxWidth: "26ch",
            }}
          >
            {article.title}
          </h1>

          <div
            className="flex flex-wrap items-center gap-3 font-mono text-meta"
            style={{
              color: "var(--text-muted)",
              marginBottom: "var(--space-lg)",
            }}
          >
            <span>{article.author.name}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readMinutes} min read</span>
          </div>

          {/* Header image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "42%",
              background:
                "linear-gradient(135deg, rgba(200,32,44,0.18) 0%, rgba(232,176,76,0.10) 60%, rgba(255,255,255,0.04) 100%)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--border-card-dark)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.headerImage}
              alt={article.title}
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
                fontSize: "5rem",
                opacity: 0.45,
                pointerEvents: "none",
              }}
              aria-hidden="true"
            >
              {CATEGORY_EMOJI[article.category]}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. 70/30 Split Body ──────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
        }}
        aria-label="Article body"
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
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1fr)_320px] gap-10 lg:gap-14">
            {/* ─── Article Body ───────────────────────────────────────── */}
            <article
              style={{
                maxWidth: "min(100%, 720px)",
              }}
            >
              {article.body.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}

              {/* End-of-post CTA card */}
              <div
                style={{
                  background: "var(--bg-card-light)",
                  border: "1px solid var(--border-card-light)",
                  borderLeft: "4px solid var(--primary)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-lg)",
                  marginTop: "var(--space-2xl)",
                }}
              >
                <p
                  className="text-eyebrow font-display"
                  style={{
                    color: "var(--primary)",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  Next step
                </p>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "var(--text-h3)",
                    lineHeight: 1.2,
                    color: "var(--text-primary-light)",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  Ready to talk about your project?
                </h3>
                <p
                  className="font-body text-body-lg"
                  style={{
                    color: "var(--text-secondary-light)",
                    lineHeight: 1.55,
                    marginBottom: "var(--space-md)",
                  }}
                >
                  Take the 6 question quiz to find your project, or schedule
                  a free walkthrough. Tony does the walkthrough himself.
                  Written quote within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/quiz"
                    className="inline-flex items-center justify-center font-display font-bold uppercase"
                    style={{
                      background: "var(--primary)",
                      color: "var(--text-primary)",
                      padding: "0.85rem 1.5rem",
                      borderRadius: "var(--radius-md)",
                      letterSpacing: "0.06em",
                      textDecoration: "none",
                    }}
                  >
                    Find Your Project
                  </Link>
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center font-display font-bold uppercase"
                    style={{
                      background: "transparent",
                      color: "var(--text-primary-light)",
                      padding: "0.85rem 1.5rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--primary)",
                      letterSpacing: "0.06em",
                      textDecoration: "none",
                    }}
                  >
                    Schedule a Free Walkthrough
                  </Link>
                </div>
              </div>
            </article>

            {/* ─── Sticky Sidebar ─────────────────────────────────────── */}
            <aside
              style={{
                position: "sticky",
                top: "7rem",
                alignSelf: "start",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-md)",
                maxHeight: "calc(100vh - 8rem)",
                overflowY: "auto",
              }}
              className="hidden lg:flex"
            >
              <TableOfContents headings={headings} activeId={activeId} />

              {/* Author card */}
              <div
                style={{
                  background: "var(--bg-card-light)",
                  border: "1px solid var(--border-card-light)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-md)",
                }}
              >
                <p
                  className="text-eyebrow font-display"
                  style={{
                    color: "var(--primary)",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  About the author
                </p>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, var(--primary) 0%, var(--primary-muted) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    marginBottom: "var(--space-sm)",
                  }}
                  aria-hidden="true"
                >
                  TS
                </div>
                <p
                  className="font-display"
                  style={{
                    fontSize: "var(--text-h4)",
                    lineHeight: 1.2,
                    color: "var(--text-primary-light)",
                    fontWeight: 800,
                    marginBottom: "var(--space-2xs)",
                  }}
                >
                  {article.author.name}
                </p>
                <p
                  className="font-mono text-meta"
                  style={{
                    color: "var(--text-muted-light)",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  {article.author.role}
                </p>
                <p
                  className="font-body text-body-sm"
                  style={{
                    color: "var(--text-secondary-light)",
                    lineHeight: 1.55,
                  }}
                >
                  Working contractor in Methuen MA since 2018. Kitchen, bath,
                  finish carpentry, and the small stuff. {siteConfig.phone}.
                </p>
              </div>

              {/* Related articles */}
              {related.length > 0 && (
                <div
                  style={{
                    background: "var(--bg-card-light)",
                    border: "1px solid var(--border-card-light)",
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-md)",
                  }}
                >
                  <p
                    className="text-eyebrow font-display"
                    style={{
                      color: "var(--primary)",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    Related reading
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-sm)",
                    }}
                  >
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/blog/${r.slug}`}
                          className="font-display"
                          style={{
                            display: "block",
                            color: "var(--text-primary-light)",
                            textDecoration: "none",
                            fontSize: "var(--text-body)",
                            lineHeight: 1.3,
                            fontWeight: 700,
                          }}
                        >
                          {r.title}
                        </Link>
                        <p
                          className="font-mono text-meta"
                          style={{
                            color: "var(--text-muted-light)",
                            marginTop: "0.25rem",
                          }}
                        >
                          {r.category} · {r.readMinutes} min
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>

          {/* Mobile-only related list (sidebar is hidden on mobile) */}
          {related.length > 0 && (
            <div
              className="lg:hidden"
              style={{
                marginTop: "var(--space-2xl)",
                paddingTop: "var(--space-xl)",
                borderTop: "1px solid var(--border-card-light)",
              }}
            >
              <p
                className="text-eyebrow font-display"
                style={{
                  color: "var(--primary)",
                  marginBottom: "var(--space-md)",
                }}
              >
                Related reading
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-md)",
                }}
              >
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      style={{
                        display: "block",
                        textDecoration: "none",
                        background: "var(--bg-card-light)",
                        border: "1px solid var(--border-card-light)",
                        borderRadius: "var(--radius-md)",
                        padding: "var(--space-md)",
                      }}
                    >
                      <p
                        className="font-display"
                        style={{
                          color: "var(--text-primary-light)",
                          fontSize: "var(--text-body)",
                          lineHeight: 1.3,
                          fontWeight: 700,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {r.title}
                      </p>
                      <p
                        className="font-mono text-meta"
                        style={{ color: "var(--text-muted-light)" }}
                      >
                        {r.category} · {r.readMinutes} min
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
