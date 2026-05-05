"use client";

/**
 * AboutTeaser — homepage section #5 (dark tone).
 *
 * Per market-intelligence.md §5 Gap 2 (surface owner on homepage) and
 * design-system.md §11 (3-4 personal trust signals → /about for full story).
 *
 * Layout: photo (left) + 1-paragraph hook (right) with name, tenure, license
 * line, and "Read Tony's story" link. NOT the full /about content — strictly
 * a teaser. Photo placeholder served from /about/tony-placeholder.jpg
 * (Stage 1G fal.ai or client-supplied).
 *
 * Dark tone background per Homepage Section Architecture Rule:
 * --bg-dark-base + radial overlay + 1 breathing orb. Within motion budget.
 */

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { FadeUp, SlideIn } from "@/components/animations";

export default function AboutTeaser() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-dark-base)",
        color: "var(--text-primary)",
        paddingTop: "var(--space-3xl)",
        paddingBottom: "var(--space-3xl)",
      }}
      aria-label="About Tony"
    >
      {/* Mandatory radial overlay + 1 breathing orb (motion budget = 1) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--bg-dark-overlay-radial)" }}
      />
      <div
        aria-hidden="true"
        className="orb absolute pointer-events-none"
        style={{
          top: "20%",
          right: "10%",
          width: "26rem",
          height: "26rem",
          background:
            "radial-gradient(circle, rgba(200,32,44,0.4) 0%, transparent 60%)",
          filter: "blur(55px)",
        }}
      />

      <div
        className="relative z-10 mx-auto px-6 lg:px-8"
        style={{ maxWidth: "var(--container-default)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Photo */}
          <SlideIn direction="left" className="lg:col-span-5">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "4 / 5",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-elevated-dark)",
                border: "1px solid var(--border-card-dark)",
                maxWidth: "420px",
                margin: "0 auto",
              }}
            >
              <Image
                src="/about/tony-placeholder.jpg"
                alt="Tony Squillini, owner of Anjo Services"
                fill
                sizes="(min-width: 1024px) 35vw, 90vw"
                priority
                style={{ objectFit: "cover" }}
              />
            </div>
          </SlideIn>

          {/* Hook + identity + CTA */}
          <SlideIn direction="right" className="lg:col-span-7">
            <FadeUp>
              <p
                className="text-eyebrow font-display"
                style={{
                  color: "var(--accent)",
                  marginBottom: "var(--space-md)",
                }}
              >
                Meet the Owner
              </p>
              <h2
                className="font-display text-h2 font-bold"
                style={{
                  color: "var(--text-primary)",
                  marginBottom: "var(--space-md)",
                  letterSpacing: "-0.01em",
                }}
              >
                One contractor. One truck. One phone since 2018.
              </h2>
              <p
                className="font-body text-body-lg"
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "var(--space-lg)",
                  maxWidth: "60ch",
                }}
              >
                Tony Squillini answers his own phone, runs his own jobs, and
                writes every quote himself. No salesperson, no bait-and-switch
                crew swap on day one. The same hands that show up to your
                walkthrough are the ones holding the saw on day twelve.
              </p>

              <div
                className="flex flex-col gap-2"
                style={{ marginBottom: "var(--space-lg)" }}
              >
                <p
                  className="font-display font-bold"
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "var(--text-h4)",
                  }}
                >
                  {siteConfig.ownerName}
                </p>
                <p
                  className="font-mono text-body-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  Owner · {siteConfig.tenureYears}+ years ·{" "}
                  {siteConfig.baseCity}
                </p>
                <p
                  className="font-mono text-meta"
                  style={{ color: "var(--text-muted)" }}
                >
                  Licensed MA HIC #{siteConfig.trust.licenseHIC} · CSL #
                  {siteConfig.trust.licenseCSL} · Insured
                </p>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-display font-bold uppercase"
                style={{
                  color: "var(--primary)",
                  fontSize: "var(--text-eyebrow)",
                  letterSpacing: "0.08em",
                  borderBottom: "2px solid var(--primary)",
                  paddingBottom: "0.25rem",
                }}
              >
                Read Tony&apos;s story →
              </Link>
            </FadeUp>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
