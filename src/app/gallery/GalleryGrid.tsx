"use client";

/**
 * GalleryGrid — sticky filter chip bar + animated 3-col grid.
 *
 * Pattern derived from Placed-Right-Fence/web/src/app/gallery/GalleryGrid.tsx:
 *   - Per-category arrays + interleaved "All" view
 *   - AnimatePresence with mode="popLayout" for filter transitions
 *   - Mixed aspect ratios (4:3 + square) for masonry rhythm
 *   - Sticky filter bar at the top of the section
 *
 * Anjo brand translation:
 *   - Squared chips (rounded-md) per design-system.md line 505 — pill
 *     buttons signal SaaS, not working contractor.
 *   - Active chip: --primary red bg, --text-primary white text
 *   - Cards: --bg-card-dark base, --border-card-dark border, --accent
 *     amber category eyebrow
 *   - Hover overlay: red gradient with the scope label
 *
 * Section tone is dark to alternate against the light slider above.
 */

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ALL_GALLERY_ITEMS,
  GALLERY_BY_CATEGORY,
  GALLERY_FILTERS,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/gallery";

type FilterValue = "all" | GalleryCategory;

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <article
      className="relative overflow-hidden h-full flex flex-col group transition-all"
      style={{
        background: "var(--bg-card-dark)",
        border: "1px solid var(--border-card-dark)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <div
        className={`relative w-full overflow-hidden ${item.aspectClass}`}
        style={{ background: "var(--bg-elevated-dark)" }}
      >
        <Image
          src={`/gallery/${item.slug}.jpg`}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover overlay — dark gradient with the scope spelled out */}
        <div
          className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(to top, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.6) 40%, transparent 70%)",
          }}
        >
          <p
            className="font-display font-bold"
            style={{
              color: "var(--text-primary)",
              fontSize: "var(--text-body-sm)",
              lineHeight: 1.3,
              letterSpacing: "0.01em",
            }}
          >
            {item.scope}
          </p>
        </div>
        {/* Category chip — top-left, always visible */}
        <span
          className="absolute font-display font-bold uppercase"
          style={{
            top: "var(--space-sm)",
            left: "var(--space-sm)",
            padding: "0.25rem 0.625rem",
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "0.08em",
            background: "rgba(10, 10, 10, 0.78)",
            color: "var(--text-primary)",
            borderRadius: "var(--radius-sm)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
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
          className="font-display font-bold"
          style={{
            color: "var(--text-primary)",
            fontSize: "var(--text-h4)",
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
  );
}

export default function GalleryGrid() {
  const [active, setActive] = useState<FilterValue>("all");

  const visible: GalleryItem[] =
    active === "all" ? ALL_GALLERY_ITEMS : GALLERY_BY_CATEGORY[active];

  return (
    <>
      {/* Sticky filter chip bar — clears the fixed nav (6rem mobile / 5rem
          scrolled; layout pads main with pt-24 lg:pt-28) */}
      <section
        className="sticky z-30"
        style={{
          top: "5rem",
          background: "var(--bg-dark-base)",
          borderBottom: "1px solid var(--border-card-dark)",
          paddingTop: "var(--space-md)",
          paddingBottom: "var(--space-md)",
        }}
        aria-label="Filter projects by category"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-dark-overlay-radial)", opacity: 0.5 }}
        />
        <div
          className="relative mx-auto px-6 lg:px-8"
          style={{ maxWidth: "var(--container-wide)" }}
        >
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Project category"
          >
            {GALLERY_FILTERS.map((filter) => {
              const isActive = filter.value === active;
              return (
                <button
                  key={filter.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(filter.value)}
                  className="font-display font-bold uppercase whitespace-nowrap transition-all shrink-0 cursor-pointer"
                  style={{
                    background: isActive
                      ? "var(--primary)"
                      : "transparent",
                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                    border: isActive
                      ? "1px solid var(--primary)"
                      : "1px solid var(--border-card-dark)",
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--text-eyebrow)",
                    letterSpacing: "0.08em",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "var(--primary)";
                      e.currentTarget.style.color = "var(--text-primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor =
                        "var(--border-card-dark)";
                      e.currentTarget.style.color = "var(--text-secondary)";
                    }
                  }}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Animated grid */}
      <section
        className="relative w-full"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
          paddingTop: "var(--space-2xl)",
          paddingBottom: "var(--space-2xl)",
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
          style={{ maxWidth: "var(--container-wide)" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((item) => (
                <motion.div
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <GalleryCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Footer note */}
          <p
            className="font-body text-center mx-auto mt-12"
            style={{
              color: "var(--text-muted)",
              fontSize: "var(--text-body-sm)",
              maxWidth: "44ch",
            }}
          >
            New projects added monthly. Town, scope, price band, and year on
            every photo.
          </p>
        </div>
      </section>
    </>
  );
}
