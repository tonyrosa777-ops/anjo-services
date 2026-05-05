"use client";

/**
 * BeforeAfterSlider — drag-to-reveal slider for project galleries.
 *
 * Per market-intelligence.md §5 Gap 4 + §9 Gallery directive:
 *   "Zero before/after project galleries across the entire competitive field.
 *    The single most powerful trust signal in home improvement."
 *
 * Adapted from c:\Projects\Xpertise-Painting\website\components\BeforeAfter.tsx
 * with two changes:
 *   1. Accepts real image src URLs (Stage 1G fal.ai output) instead of CSS
 *      gradient backgrounds.
 *   2. Caption shape per design-system.md §11: town + year + scope + price band.
 *
 * Interaction:
 *   - Drag the handle (mouse or touch) to reveal the AFTER image from
 *     beneath the BEFORE image.
 *   - clipPath: inset(0 ${100 - pos}% 0 0) on the BEFORE layer reveals AFTER
 *     to the right of the handle as `pos` increases.
 *   - Touch event handlers call preventDefault() on touchmove to prevent
 *     mobile page-scroll-jacking while dragging.
 *
 * Pattern #55 self-sufficient surface: solid bg, visible border, shadow on
 * dark variant. Drops cleanly onto either light or dark sections.
 *
 * 'use client' is the FIRST token (Error #9).
 */

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export interface BeforeAfterImage {
  src: string;
  alt: string;
}

export interface BeforeAfterPair {
  id: string;
  before: BeforeAfterImage;
  after: BeforeAfterImage;
  /** Caption text shown below the slider. Format suggestion: "Andover MA · 2024 · $4,200 coffered ceiling · 6 days." */
  caption: string;
  /** Optional short tab label for the project selector strip (defaults to caption first segment). */
  tabLabel?: string;
}

interface BeforeAfterSliderProps {
  pairs: BeforeAfterPair[];
  /** Surface tone of the section the slider is dropped into. Drives card chrome. */
  tone?: "dark" | "light";
  className?: string;
}

export default function BeforeAfterSlider({
  pairs,
  tone = "light",
  className,
}: BeforeAfterSliderProps) {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = Math.min(activeIndex, Math.max(0, pairs.length - 1));
  const active = pairs[safeIndex];

  if (!active) {
    // No pairs supplied — render nothing rather than crash. Callers that
    // ship 0 pairs are misconfigured but we don't take down the page.
    return null;
  }

  return (
    <div
      className={["w-full", className ?? ""].filter(Boolean).join(" ")}
      data-tone={tone}
    >
      <Slider key={active.id} pair={active} tone={tone} />

      {/* Caption */}
      <p
        className="font-mono mt-4"
        style={{
          color:
            tone === "light"
              ? "var(--text-secondary-light)"
              : "var(--text-secondary)",
          fontSize: "var(--text-meta)",
          lineHeight: 1.5,
        }}
      >
        {active.caption}
      </p>

      {/* Project selector tab strip */}
      {pairs.length > 1 && (
        <div
          className="flex flex-wrap gap-2 mt-5"
          role="tablist"
          aria-label="Featured projects"
        >
          {pairs.map((pair, i) => {
            const isActive = i === safeIndex;
            const tabLabel = pair.tabLabel ?? deriveTabLabel(pair.caption);
            return (
              <button
                key={pair.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${baseId}-panel`}
                onClick={() => setActiveIndex(i)}
                className="font-display font-bold uppercase rounded-md transition-all"
                style={{
                  padding: "0.5rem 0.875rem",
                  fontSize: "var(--text-eyebrow)",
                  letterSpacing: "0.08em",
                  background: isActive
                    ? "var(--primary)"
                    : tone === "light"
                      ? "var(--bg-card-light)"
                      : "var(--bg-card-dark)",
                  color: isActive
                    ? "var(--text-primary)"
                    : tone === "light"
                      ? "var(--text-secondary-light)"
                      : "var(--text-secondary)",
                  border: isActive
                    ? "1px solid var(--primary)"
                    : tone === "light"
                      ? "1px solid var(--border-card-light)"
                      : "1px solid var(--border-card-dark)",
                }}
              >
                {tabLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function deriveTabLabel(caption: string): string {
  // Take the first " · " segment. Falls back to first 24 chars.
  const first = caption.split("·")[0]?.trim();
  if (first && first.length > 0) return first;
  return caption.slice(0, 24);
}

/**
 * Inner Slider — owns the drag-reveal state for a single pair.
 *
 * Mounting/unmounting per-pair (via `key={active.id}` above) resets the
 * handle position to 50% on tab switch, which matches the user's mental
 * model that each project is its own reveal.
 */
function Slider({
  pair,
  tone,
}: {
  pair: BeforeAfterPair;
  tone: "dark" | "light";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [pos, setPos] = useState(50); // percentage 0..100

  const getPercent = useCallback((clientX: number): number => {
    const el = containerRef.current;
    if (!el) return 50;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return 50;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  }, []);

  // Mouse handlers — onMouseDown starts drag, window-level move/up so the
  // user can drag past the container without losing the gesture.
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    setPos(getPercentFromEvent(e.clientX));
    function getPercentFromEvent(clientX: number) {
      const el = containerRef.current;
      if (!el) return 50;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0) return 50;
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      return (x / rect.width) * 100;
    }
  }, []);

  // Touch handlers — onTouchStart starts drag. The window-level touchmove
  // handler MUST call preventDefault() to stop mobile page-scroll-jacking
  // while the user is dragging (per spec "must call preventDefault() on
  // touchmove to prevent page-scroll-jacking on mobile").
  //
  // Because Chrome treats `touchstart`/`touchmove` as passive by default
  // when registered via React props, we attach the move listener to window
  // via addEventListener with `{ passive: false }` so preventDefault works.
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      draggingRef.current = true;
      const touch = e.touches[0];
      if (touch) setPos(getPercent(touch.clientX));
    },
    [getPercent],
  );

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!draggingRef.current) return;
      setPos(getPercent(e.clientX));
    }
    function onMouseUp() {
      draggingRef.current = false;
    }
    function onTouchMove(e: TouchEvent) {
      if (!draggingRef.current) return;
      // CRITICAL: prevent the page from scrolling while the user is dragging
      // the slider on mobile. Requires { passive: false } on the listener.
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) setPos(getPercent(touch.clientX));
    }
    function onTouchEnd() {
      draggingRef.current = false;
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [getPercent]);

  // Keyboard accessibility — left/right arrows move the slider in 5% steps,
  // home/end snap to 0/100. The handle button is the focus target.
  const onHandleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  }, []);

  // Pattern #55 self-sufficient surface — solid background under the images
  // so cropped/transparent PNGs don't bleed onto whatever section the
  // slider is dropped into.
  const surfaceStyle: CSSProperties =
    tone === "light"
      ? {
          background: "var(--bg-card-light)",
          border: "1px solid var(--border-card-light)",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.06)",
        }
      : {
          background: "var(--primary)",
          border: "1px solid var(--border-card-dark)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
        };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)] cursor-col-resize select-none"
      style={surfaceStyle}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* AFTER (base layer, z-0) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pair.after.src}
        alt={pair.after.alt}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* AFTER label badge (top-right) */}
      <div
        className="absolute z-10 font-display font-bold uppercase pointer-events-none"
        style={{
          top: "var(--space-sm)",
          right: "var(--space-sm)",
          padding: "0.25rem 0.625rem",
          fontSize: "var(--text-eyebrow)",
          letterSpacing: "0.08em",
          background: "rgba(10, 10, 10, 0.65)",
          color: "var(--text-primary)",
          borderRadius: "var(--radius-sm)",
          backdropFilter: "blur(6px)",
        }}
      >
        After
      </div>

      {/* BEFORE (clipped layer, z-10) — clipPath reveals AFTER as pos increases */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 10,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pair.before.src}
          alt={pair.before.alt}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* BEFORE label badge (top-left, inside the clipped layer so it disappears as the user reveals) */}
        <div
          className="absolute font-display font-bold uppercase"
          style={{
            top: "var(--space-sm)",
            left: "var(--space-sm)",
            padding: "0.25rem 0.625rem",
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "0.08em",
            background: "rgba(10, 10, 10, 0.65)",
            color: "var(--text-primary)",
            borderRadius: "var(--radius-sm)",
            backdropFilter: "blur(6px)",
          }}
        >
          Before
        </div>
      </div>

      {/* Vertical divider line */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: `${pos}%`,
          width: "2px",
          marginLeft: "-1px",
          background: "var(--text-primary)",
          zIndex: 20,
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.35)",
        }}
      />

      {/* Drag handle — circle with double-arrow inline SVG (no lucide). */}
      <button
        type="button"
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        role="slider"
        onKeyDown={onHandleKeyDown}
        className="absolute top-1/2 flex items-center justify-center cursor-col-resize"
        style={{
          left: `${pos}%`,
          transform: "translate(-50%, -50%)",
          width: "2.75rem",
          height: "2.75rem",
          borderRadius: "9999px",
          background: "var(--text-primary)",
          border: "2px solid var(--primary)",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.35)",
          zIndex: 30,
          padding: 0,
        }}
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Left chevron */}
          <path d="M11 6 L5 12 L11 18" />
          {/* Right chevron */}
          <path d="M13 6 L19 12 L13 18" />
        </svg>
      </button>
    </div>
  );
}
