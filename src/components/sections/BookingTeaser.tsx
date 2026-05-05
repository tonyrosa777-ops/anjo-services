"use client";

/**
 * BookingTeaser — homepage section #10 (light tone).
 *
 * The single bottom-of-page conversion section per dedup rule. NO follow-up
 * "Ready to talk?" duplicate. Heading "Ready when you are." + small inline
 * <BookingCalendar /> preview (compact variant) + trust copy.
 *
 * Per CLAUDE.md Always-Built Features Rule §Inline Booking Calendar — the
 * calendar lives both on /booking AND as a homepage teaser section.
 *
 * Per Homepage Section Architecture Rule purpose-level dedup:
 * Quiz CTA (mid-page conversion, journey format) and Booking Teaser (final
 * direct conversion) are different formats and serve different purposes,
 * separated on the homepage by Blog Preview.
 */

import { siteConfig } from "@/data/site";
import { FadeUp } from "@/components/animations";
import BookingCalendar from "@/components/BookingCalendar";

export default function BookingTeaser() {
  return (
    <section
      className="surface-light"
      data-motion="breathe"
      data-texture="paper"
      style={{
        paddingTop: "var(--space-3xl)",
        paddingBottom: "var(--space-3xl)",
      }}
      aria-label="Book a walkthrough"
    >
      <div
        className="surface-content mx-auto px-6 lg:px-8"
        style={{ maxWidth: "var(--container-default)" }}
      >
        <FadeUp>
          <div
            className="text-center"
            style={{ marginBottom: "var(--space-xl)" }}
          >
            <p
              className="font-display uppercase"
              style={{
                color: "var(--primary)",
                fontSize: "var(--text-eyebrow)",
                letterSpacing: "0.2em",
                marginBottom: "var(--space-sm)",
              }}
            >
              Pick a Window
            </p>
            <h2
              className="font-display font-black"
              style={{
                color: "var(--text-primary-light)",
                fontSize: "var(--text-h1)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: "var(--space-md)",
              }}
            >
              Ready when you are.
            </h2>
            <p
              className="font-body mx-auto"
              style={{
                color: "var(--text-secondary-light)",
                fontSize: "var(--text-body-lg)",
                lineHeight: 1.55,
                maxWidth: "52ch",
              }}
            >
              Pick a day, pick a window, send Tony a few details. He shows up
              with the truck, walks the space, and you get a written quote
              within 24 hours. Free. No commitment.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <BookingCalendar compact />
        </FadeUp>

        <FadeUp delay={0.2}>
          <div
            className="mx-auto text-center"
            style={{
              maxWidth: "560px",
              marginTop: "var(--space-xl)",
            }}
          >
            <ul
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono"
              style={{ fontSize: "var(--text-meta)" }}
            >
              <li
                style={{ color: "var(--text-secondary-light)" }}
                className="flex items-center justify-center gap-2"
              >
                <span aria-hidden="true">✅</span>
                Free 30 minute walkthrough
              </li>
              <li
                style={{ color: "var(--text-secondary-light)" }}
                className="flex items-center justify-center gap-2"
              >
                <span aria-hidden="true">📝</span>
                Written quote in 24 hours
              </li>
              <li
                style={{ color: "var(--text-secondary-light)" }}
                className="flex items-center justify-center gap-2"
              >
                <span aria-hidden="true">📞</span>
                Real Tony every visit
              </li>
            </ul>
            <p
              className="font-mono"
              style={{
                color: "var(--text-muted-light)",
                fontSize: "var(--text-meta)",
                marginTop: "var(--space-md)",
              }}
            >
              Prefer to text? {siteConfig.phone}. Auto-reply confirms we got
              it. Real reply by 8am.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
