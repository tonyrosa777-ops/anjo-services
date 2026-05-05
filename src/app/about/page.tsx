import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { CountUp, FadeUp, SlideIn } from "@/components/animations";
import { BreadcrumbSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "Meet Tony Squillini, Owner of Anjo Services",
  description:
    "Owner-led general contracting in Methuen, MA since 2018. Tony Squillini answers his own phone, runs his own jobs, and writes every quote himself. North Shore MA + southern NH.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "https://anjoservices.com/about",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title: "Meet Tony Squillini, Owner of Anjo Services",
    description:
      "Owner-led contracting in Methuen, MA since 2018. Same phone, same hands, same standards on every job.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Tony Squillini, Owner of Anjo Services",
    description:
      "Owner-led contracting in Methuen, MA since 2018. Same phone, same hands, same standards on every job.",
  },
};

/**
 * /about — Meet Tony page.
 *
 * Architecture:
 *   - Page Header Standard per CLAUDE.md Hero Architecture Rule:
 *     Fragment root, header section uses bg-[var(--primary)] pt-32 pb-20
 *     with breathing-orb ambient (3 orbs) inside header section, content
 *     wrapped in `relative z-10`. H1 uses .hero-shimmer font-display text-h1
 *     font-bold (interior pages NEVER use text-display).
 *   - Two-column body: photo + identity left, three-paragraph origin story
 *     right. Real Tony photo at /about/tony.png — kneeling on a job-site
 *     floor mid-install with tools laid out.
 *   - Stats row: 3 trust signals via <CountUp /> for the numeric values.
 *   - CTA section bottom routes to /booking (siteConfig.ctaPrimary).
 *
 * Per CLAUDE.md Copy Writing Rule, the three origin paragraphs are written
 * in Tony's voice (business-owner-when-data-is-thin) and marked
 * `[DEMO COPY — pending client review]` until the client reviews them.
 */
export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "About Tony", url: "/about" },
        ]}
      />
      {/* ─── Page Header — sitewide dark+radial pattern (matches the
          service-detail header that the client locked as the reference
          aesthetic). NEVER a saturated red full-width panel: per
          feedback_dark-page-headers-not-red.md, that reads as cheap
          discount-sign and breaks site-wide uniformity. ─────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
      >
        {/* Mandatory radial gradient overlay (feedback_dark-section-radial-gradients.md) */}
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
            {siteConfig.baseCity} · since {siteConfig.yearFounded}
          </p>
          <h1
            className="hero-shimmer font-display text-h1 font-bold"
            style={{
              color: "var(--text-primary)",
              marginBottom: "var(--space-md)",
            }}
          >
            Meet Tony
          </h1>
          <p
            className="font-body text-body-lg"
            style={{
              color: "rgba(245,245,242,0.92)",
              maxWidth: "60ch",
            }}
          >
            One contractor, one truck, one phone. Owner-led since 2018, on the
            tools every day across {siteConfig.serviceAreaCorridor}.
          </p>
        </div>
      </section>

      {/* ─── Body: photo + identity (left) / 3-paragraph story (right) ──── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
          paddingTop: "var(--space-3xl)",
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
          style={{ maxWidth: "var(--container-default)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Left column — photo + identity card */}
            <SlideIn direction="left" className="lg:col-span-5">
              <div className="flex flex-col gap-6">
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "4 / 5",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--bg-elevated-dark)",
                    border: "1px solid var(--border-card-light)",
                  }}
                >
                  {/* Real Tony photo at /about/tony.png — kneeling on a wood
                      floor mid-install with level, framing square, hammers,
                      and a Makita drill in the belt. Colonial neighborhood
                      visible through the window. Replaces the fal.ai
                      placeholder. */}
                  <Image
                    src="/about/tony.png"
                    alt="Tony Squillini on a job site, tool belt and level in hand, framing square and hammers laid out on the wood floor he is finishing — Anjo Services, LLC owner"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    style={{ objectFit: "cover" }}
                    priority={false}
                  />
                </div>

                <div>
                  <p
                    className="text-eyebrow font-display"
                    style={{
                      color: "var(--primary)",
                      marginBottom: "var(--space-2xs)",
                    }}
                  >
                    Owner & lead carpenter
                  </p>
                  <h2
                    className="font-display text-h2 font-bold"
                    style={{
                      color: "var(--text-primary-light)",
                      marginBottom: "var(--space-2xs)",
                    }}
                  >
                    {siteConfig.ownerName}
                  </h2>
                  <p
                    className="font-body text-body"
                    style={{
                      color: "var(--text-secondary-light)",
                      marginBottom: "var(--space-md)",
                    }}
                  >
                    Owner · {siteConfig.tenureYears} years ·{" "}
                    {siteConfig.baseCity}
                  </p>

                  {/* License badges — sourced from siteConfig.trust */}
                  <div className="flex flex-col gap-2">
                    <LicenseBadge
                      label={`Licensed MA HIC #${siteConfig.trust.licenseHIC}`}
                    />
                    <LicenseBadge
                      label={`MA CSL #${siteConfig.trust.licenseCSL}`}
                    />
                    <LicenseBadge
                      label={`NH License #${siteConfig.trust.licenseNH}`}
                    />
                    <LicenseBadge label="Insured · GL + Workers Comp" />
                  </div>
                </div>
              </div>
            </SlideIn>

            {/* Right column — three-paragraph origin story */}
            <SlideIn direction="right" className="lg:col-span-7">
              <div className="flex flex-col gap-6">
                <p
                  className="text-eyebrow font-display"
                  style={{
                    color: "var(--primary)",
                    marginBottom: "var(--space-2xs)",
                  }}
                >
                  The story
                </p>
                <h2
                  className="font-display text-h2 font-bold"
                  style={{
                    color: "var(--text-primary-light)",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  Why I started Anjo, and why I still answer my own phone.
                </h2>

                {/* [DEMO COPY — pending client review] */}
                <p
                  className="font-body text-body-lg"
                  style={{ color: "var(--text-primary-light)" }}
                >
                  I started Anjo in 2018 after fifteen years on other people's
                  jobsites. I was tired of watching homeowners get handed
                  cookie-cutter quotes by salespeople who never picked up a
                  miter saw. So I bought a truck, printed business cards with
                  my own number on them, and started running my own jobs in
                  Methuen and Andover. Same phone number today. Same hands on
                  every job.
                </p>

                {/* [DEMO COPY — pending client review] */}
                <p
                  className="font-body text-body-lg"
                  style={{ color: "var(--text-primary-light)" }}
                >
                  Most of our work comes from people who got ghosted by their
                  last contractor, or who got a $90K kitchen quote from a
                  design-build shop that only does $90K kitchens. We do the
                  $4K accent walls and the $45K kitchen gut jobs with the
                  same crew, the same standards, and the same writing on the
                  quote. Real prices. Real photos. No surprise change orders
                  that show up on day twelve.
                </p>

                {/* [DEMO COPY — pending client review] */}
                <p
                  className="font-body text-body-lg"
                  style={{ color: "var(--text-primary-light)" }}
                >
                  When you text us at 9pm Tuesday after the kids are down, the
                  auto-reply confirms we got it and I write back myself by 8am
                  Wednesday. Not a call center. Not a virtual assistant. Just
                  me, on my phone, in my truck, between two job sites. That is
                  the whole pitch. That is why people in this corridor have
                  been calling Anjo for seven years.
                </p>

                <p
                  className="font-mono text-body-sm"
                  style={{
                    color: "var(--text-muted-light)",
                    marginTop: "var(--space-sm)",
                  }}
                >
                  Tony Squillini · {siteConfig.phone}
                </p>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ─── Stats row ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        <div
          className="relative z-10 mx-auto px-6 lg:px-8"
          style={{ maxWidth: "var(--container-default)" }}
        >
          <FadeUp>
            <p
              className="text-eyebrow font-display text-center"
              style={{
                color: "var(--accent)",
                marginBottom: "var(--space-md)",
              }}
            >
              By the numbers
            </p>
            <h2
              className="font-display text-h2 font-bold text-center"
              style={{
                color: "var(--text-primary)",
                marginBottom: "var(--space-2xl)",
              }}
            >
              Seven years, one phone, one promise.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <StatCard
              emoji="🛠️"
              value={
                <>
                  <CountUp end={7} duration={1.6} />+
                </>
              }
              valueSuffix="years"
              label="On the tools across Methuen, Andover, Haverhill, and southern NH."
            />
            <StatCard
              emoji="📅"
              value={
                <>
                  Since <CountUp end={2018} duration={1.8} />
                </>
              }
              label="Owner-led, same number, same hands on every job."
            />
            <StatCard
              emoji="⚡"
              value={
                <>
                  <CountUp end={24} duration={1.4} /> hours
                </>
              }
              label="Quote turnaround, in writing, after the on-site walkthrough."
            />
          </div>
        </div>
      </section>

      {/* ─── CTA bottom — single conversion block ──────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative z-10 mx-auto px-6 lg:px-8 text-center"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <FadeUp>
            <h2
              className="font-display text-h2 font-bold"
              style={{
                color: "var(--text-primary-light)",
                marginBottom: "var(--space-md)",
              }}
            >
              Ready to walk through your project with Tony?
            </h2>
            <p
              className="font-body text-body-lg"
              style={{
                color: "var(--text-secondary-light)",
                marginBottom: "var(--space-lg)",
              }}
            >
              Pick a 30 minute on-site walkthrough. Quote in writing within 24
              hours. No high-pressure pitch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
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
              <a
                href={siteConfig.smsHref}
                className="inline-flex items-center justify-center font-display font-bold uppercase"
                style={{
                  background: "transparent",
                  color: "var(--text-primary-light)",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--primary)",
                  letterSpacing: "0.06em",
                }}
              >
                💬 {siteConfig.ctaTextTony.label}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────────── */

function LicenseBadge({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 font-mono text-body-sm"
      style={{
        color: "var(--text-secondary-light)",
        padding: "0.5rem 0.75rem",
        background: "var(--bg-card-light)",
        border: "1px solid var(--border-card-light)",
        borderRadius: "var(--radius-sm)",
        width: "fit-content",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "0.5rem",
          height: "0.5rem",
          borderRadius: "50%",
          background: "var(--trust-signal)",
        }}
      />
      {label}
    </span>
  );
}

function StatCard({
  emoji,
  value,
  valueSuffix,
  label,
}: {
  emoji: string;
  value: React.ReactNode;
  valueSuffix?: string;
  label: string;
}) {
  return (
    <div
      className="flex flex-col items-center text-center p-6 lg:p-8"
      style={{
        background: "var(--bg-card-dark)",
        border: "1px solid var(--border-card-dark)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <span
        aria-hidden="true"
        className="text-4xl"
        style={{ marginBottom: "var(--space-sm)" }}
      >
        {emoji}
      </span>
      <p
        className="font-display font-bold"
        style={{
          color: "var(--text-primary)",
          fontSize: "var(--text-h2)",
          lineHeight: 1.1,
          marginBottom: "var(--space-2xs)",
        }}
      >
        {value}
        {valueSuffix && (
          <span
            className="font-display"
            style={{
              fontSize: "var(--text-h3)",
              marginLeft: "0.25rem",
              color: "var(--accent)",
            }}
          >
            {valueSuffix}
          </span>
        )}
      </p>
      <p
        className="font-body text-body"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </p>
    </div>
  );
}
