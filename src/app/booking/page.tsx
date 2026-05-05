import type { Metadata } from "next";
import BookingCalendar from "@/components/BookingCalendar";
import { siteConfig } from "@/data/site";
import { BreadcrumbSchema } from "@/components/seo";

/**
 * /booking — full BookingCalendar page.
 *
 * Page Header Standard (CLAUDE.md website-build-template Page Header):
 * Fragment root, relative overflow-hidden bg dark, ambient breathing-orb
 * overlay (RisingAsh component is not yet built for Anjo, so a CSS-only
 * breathing orb stands in per CLAUDE.md Homepage Section Architecture
 * Rule §Animation depth — interior pages get ambient effects, never the
 * full hero stack).
 *
 * Below the header: BookingCalendar fills the page. Trust micro-copy
 * follows. Per Pattern #54 — no native pre-pickers above the calendar.
 */

export const metadata: Metadata = {
  title: "Schedule a Walkthrough with Tony",
  description:
    "Book a 30-minute on-site walkthrough. Written quote within 24 hours. Methuen, Andover, Haverhill, North Andover, Lawrence MA and Salem, Derry, Windham, Londonderry NH.",
  alternates: { canonical: "/booking" },
  openGraph: {
    type: "website",
    url: "https://anjoservices.com/booking",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title: "Schedule a Walkthrough with Tony | Anjo Services",
    description:
      "Pick a 30-minute on-site walkthrough. Written quote within 24 hours. No high-pressure pitch.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule a Walkthrough with Tony | Anjo Services",
    description:
      "30-minute on-site walkthrough, written quote in 24 hours. No high-pressure pitch.",
  },
};

export default function BookingPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Schedule a Walkthrough", url: "/booking" },
        ]}
      />
      {/* ── Page header — sitewide dark+radial pattern (matches service-detail
          page that the client locked as the reference aesthetic). NEVER a
          saturated red full-width panel: feedback_dark-page-headers-not-red.md. */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
        aria-label="Schedule a walkthrough"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        {/* Ambient breathing orbs — same alpha as service-detail header */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none orb"
          style={{
            top: "10%",
            right: "8%",
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
            bottom: "10%",
            left: "8%",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,176,76,0.15) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />

        <div
          className="relative mx-auto px-6 lg:px-8 py-16 md:py-24 text-center"
          style={{ maxWidth: "var(--container-default)", zIndex: 10 }}
        >
          <p
            className="font-display uppercase"
            style={{
              color: "rgba(245, 245, 242, 0.82)",
              fontSize: "var(--text-eyebrow)",
              letterSpacing: "0.16em",
              marginBottom: "var(--space-sm)",
            }}
          >
            Book Tony On Site
          </p>
          <h1
            className="hero-shimmer font-display font-black"
            style={{
              fontSize: "var(--text-h1)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "var(--space-md)",
            }}
          >
            Schedule a Walkthrough
          </h1>
          <p
            className="font-body mx-auto"
            style={{
              color: "var(--text-primary)",
              fontSize: "var(--text-body-lg)",
              lineHeight: 1.5,
              maxWidth: "52ch",
              opacity: 0.88,
            }}
          >
            Pick a day, pick a window, send Tony a few details about the
            project. He shows up with the truck, walks the space, and you get
            a written quote within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Calendar body ── */}
      <section
        className="relative"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative mx-auto px-6 lg:px-8 py-16 md:py-20"
          style={{ maxWidth: "var(--container-default)", zIndex: 10 }}
        >
          <BookingCalendar />

          {/* Trust micro-copy below the calendar */}
          <div
            className="mx-auto text-center"
            style={{
              maxWidth: "560px",
              marginTop: "var(--space-xl)",
            }}
          >
            <ul
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono"
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
        </div>
      </section>
    </>
  );
}
