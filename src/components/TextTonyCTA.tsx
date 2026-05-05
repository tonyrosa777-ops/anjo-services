"use client";

/**
 * TextTonyCTA — SMS-first call-to-action component.
 *
 * Per market-intelligence.md §5 Gap 3 + §9 EXPLOIT #2:
 *   Every direct competitor closes M-F 9-5 phone-only. The Andover Upgrader
 *   does her research at 9pm Tuesday after the kids are in bed. A "Text Tony"
 *   button (978) 216-6455 SMS-enabled with after-hours indicator beats the
 *   entire local field.
 *
 * Variants:
 *   - "button"  : primary CTA, used in nav + hero + footer + section embeds
 *   - "compact" : smaller padding, used inline in sections / cards
 *
 * Behavior:
 *   - Always renders <a href="sms:+19782166455">📱 Text Tony</a>
 *   - Optional `bodyParam` prop appends ?&body=... for context-prefilled SMS
 *   - After-hours indicator dot:
 *       Green    = currently within business hours (Mon-Fri 7am-8pm local)
 *       Amber    = currently after-hours (everything else, incl. weekends)
 *     Computed in useEffect to avoid SSR/hydration mismatch (Error #9 cousin —
 *     date-dependent UI cannot be evaluated at module-eval time on the server).
 *   - Hover tooltip clarifies expectation: "Tony will reply by 8am."
 *
 * Pattern #55 self-sufficient surface: this widget renders a solid surface so
 * it works on both light and dark sections. Defaults to a dark-styled button
 * (red primary fill, light text). Use `tone="light"` when dropped onto a
 * light-toned section if you want the inverse outline treatment.
 *
 * 'use client' is the FIRST token (Error #9).
 */

import { useSyncExternalStore } from "react";

type Tone = "dark" | "light";
type Variant = "button" | "compact";

const SMS_HREF_BASE = "sms:+19782166455";

/**
 * After-hours window (LOCKED for both this component AND the API route).
 *   Business hours = weekdays Monday-Friday, 7:00am-8:00pm local time.
 *   After-hours    = everything else (early morning, evening, weekends).
 *
 * Per design-system.md §11 custom build row:
 *   "After-hours window logic (defined in /data/site.ts: weekday 8pm-7am +
 *    all weekend) drives the auto-reply text variant."
 *
 * Window expressed as INSIDE-hours: getDay() in 1..5 (Mon..Fri) AND
 * getHours() in 7..19 (7am up to but not including 8pm). 0 = Sunday, 6 = Sat.
 */
export function isAfterHours(now: Date = new Date()): boolean {
  const day = now.getDay();
  const hour = now.getHours();
  const isWeekday = day >= 1 && day <= 5;
  const isInHours = hour >= 7 && hour < 20; // 7:00am up to 8:00pm
  return !(isWeekday && isInHours);
}

/**
 * useSyncExternalStore-backed clock that re-renders subscribers once a
 * minute. Avoids the `react-hooks/set-state-in-effect` lint rule and is the
 * idiomatic React 19 pattern for "read browser state at mount, then keep
 * polling." Server snapshot returns null so SSR doesn't lock in a stale
 * after-hours value; the indicator dot only appears after hydration.
 */
function subscribeMinute(callback: () => void) {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
}
function getAfterHoursSnapshot(): boolean {
  return isAfterHours(new Date());
}
function getAfterHoursServerSnapshot(): boolean | null {
  return null;
}

interface TextTonyCTAProps {
  /** Visual size variant. */
  variant?: Variant;
  /** Surface tone of the section this CTA is dropped onto. */
  tone?: Tone;
  /**
   * Optional pre-filled SMS body text (URL-encoded automatically).
   * Example: "Hi Tony, I'm interested in a kitchen remodel"
   */
  bodyParam?: string;
  /** Override label. Defaults to "Text Tony". */
  label?: string;
  /** Extra className for layout positioning. */
  className?: string;
  /** Show the after-hours indicator dot. Default true. */
  showIndicator?: boolean;
}

export default function TextTonyCTA({
  variant = "button",
  tone = "dark",
  bodyParam,
  label = "Text Tony",
  className,
  showIndicator = true,
}: TextTonyCTAProps) {
  // Indicator state — computed client-side only to avoid hydration mismatch.
  // Server snapshot returns null so the dot color stays neutral until hydration,
  // then the client snapshot evaluates the current Date(). The store re-checks
  // once per minute so a long-lived page doesn't show stale state.
  const afterHours = useSyncExternalStore(
    subscribeMinute,
    getAfterHoursSnapshot,
    getAfterHoursServerSnapshot,
  );

  // Build the sms: href. iOS prefers `?&body=`, Android `?body=`. The combined
  // pattern works on both per Apple + Google docs.
  const href = bodyParam
    ? `${SMS_HREF_BASE}?&body=${encodeURIComponent(bodyParam)}`
    : SMS_HREF_BASE;

  const isCompact = variant === "compact";
  const isLight = tone === "light";

  // Pattern #55 self-sufficient surface: solid bg + visible border + shadow on
  // dark variant; opaque white card + neutral border on light variant. Never
  // relies on translucent ambient card backgrounds.
  const baseStyle: React.CSSProperties = isLight
    ? {
        background: "var(--bg-card-light)",
        color: "var(--text-primary-light)",
        border: "1px solid var(--border-card-light)",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
      }
    : {
        background: "var(--primary)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-card-dark)",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.35)",
      };

  const padding = isCompact ? "0.5rem 0.875rem" : "0.875rem 1.5rem";
  const fontSize = isCompact ? "var(--text-eyebrow)" : "var(--text-body-sm)";

  // Indicator dot color tokens — green for in-hours, amber for after-hours.
  const dotColor =
    afterHours === null
      ? "transparent"
      : afterHours
        ? "var(--accent)" // amber #E8B04C — after-hours
        : "#3FB950"; // green — in-hours (the only literal hex in this file,
                     //        intentionally green; not a brand color)

  const tooltipText =
    afterHours === null
      ? "Tony will reply by 8am."
      : afterHours
        ? "Tony will reply by 8am. Auto-reply confirms we got it."
        : "Tony usually replies within the hour during business hours.";

  return (
    <a
      href={href}
      aria-label={`${label} at (978) 216-6455`}
      title={tooltipText}
      className={[
        "inline-flex items-center justify-center gap-2 font-display font-bold uppercase rounded-md transition-all",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...baseStyle,
        padding,
        fontSize,
        letterSpacing: "0.06em",
        borderRadius: "var(--radius-md)",
      }}
      onMouseEnter={(e) => {
        if (isLight) {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.background = "var(--primary-soft)";
        } else {
          e.currentTarget.style.background = "var(--primary-muted)";
        }
      }}
      onMouseLeave={(e) => {
        if (isLight) {
          e.currentTarget.style.borderColor = "var(--border-card-light)";
          e.currentTarget.style.background = "var(--bg-card-light)";
        } else {
          e.currentTarget.style.background = "var(--primary)";
        }
      }}
    >
      <span aria-hidden="true">📱</span>
      <span>{label}</span>
      {showIndicator && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "9999px",
            background: dotColor,
            boxShadow:
              afterHours === null
                ? "none"
                : afterHours
                  ? "0 0 0 2px rgba(232, 176, 76, 0.20)"
                  : "0 0 0 2px rgba(63, 185, 80, 0.20)",
            transition: "background 200ms ease",
          }}
        />
      )}
    </a>
  );
}
