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
      {/* ── Page header (dark, ambient breathing-orb) ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--primary)",
          color: "var(--text-primary)",
        }}
        aria-label="Schedule a walkthrough"
      >
        {/* Ambient layer — CSS-only breathing orbs (12s cycle), no JS. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ overflow: "hidden" }}
        >
          <div
            className="orb absolute"
            style={{
              top: "-20%",
              right: "-15%",
              width: "55%",
              height: "75%",
              background:
                "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.18) 0%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="orb-2 absolute"
            style={{
              bottom: "-25%",
              left: "-10%",
              width: "60%",
              height: "70%",
              background:
                "radial-gradient(ellipse at center, rgba(232, 176, 76, 0.18) 0%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />
          <div
            className="orb-3 absolute"
            style={{
              top: "20%",
              left: "30%",
              width: "40%",
              height: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(10, 10, 10, 0.22) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
        </div>

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
