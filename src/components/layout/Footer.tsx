/**
 * Footer — 4-column on desktop, stacked on mobile.
 *
 * Sourced from /data/site.ts (siteConfig + services + serviceAreas) per the
 * Copy Writing Rule — zero hard-coded strings.
 *
 * Columns:
 *   1. Logo + tagline + 1-line about + license placeholder
 *   2. Services list → /services/[slug]
 *   3. Service Areas list → /service-areas/[slug]
 *   4. Contact — phone, Text Tony, "Quote within 24 hours" trust line
 *
 * Bottom bar: © {currentYear} · location · Privacy · Terms.
 *
 * No motion or canvas — just dark gradient background per design-system.md
 * §11 (footer = dark, nav purpose).
 */

import Image from "next/image";
import Link from "next/link";
import { siteConfig, services, serviceAreas } from "@/data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative w-full"
      style={{
        background: "var(--bg-dark-base)",
        color: "var(--text-secondary)",
      }}
    >
      {/* Mandatory radial overlay — dark sections never flat */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--bg-dark-overlay-radial)" }}
      />

      <div
        className="relative z-10 mx-auto px-6 lg:px-8"
        style={{
          maxWidth: "var(--container-wide)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-xl)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 — brand block */}
          <div>
            <Link
              href="/"
              className="inline-flex"
              aria-label={`${siteConfig.name} home`}
            >
              <Image
                src="/Logo.webp"
                alt={siteConfig.name}
                width={140}
                height={56}
                style={{ width: "auto", height: "3rem" }}
              />
            </Link>
            <p
              className="mt-4 font-display"
              style={{
                color: "var(--text-primary)",
                fontSize: "var(--text-body-sm)",
                letterSpacing: "0.02em",
              }}
            >
              {siteConfig.tagline}
            </p>
            <p
              className="mt-3"
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-body-sm)",
                lineHeight: 1.55,
              }}
            >
              Owner-led general contracting and handyman work across{" "}
              {siteConfig.serviceAreaCorridor}, since {siteConfig.yearFounded}.
            </p>
            <p
              className="mt-4 font-mono"
              style={{
                color: "var(--text-muted)",
                fontSize: "var(--text-meta)",
                lineHeight: 1.55,
              }}
            >
              Licensed MA HIC #{siteConfig.trust.licenseHIC} · CSL #
              {siteConfig.trust.licenseCSL}
            </p>
          </div>

          {/* Col 2 — Services */}
          <div>
            <FooterHeading>Services</FooterHeading>
            <ul className="mt-4 flex flex-col gap-2">
              {services.map((svc) => (
                <li key={svc.slug}>
                  <FooterLink href={`/services/${svc.slug}`}>
                    <span aria-hidden="true" className="mr-2">
                      {svc.emoji}
                    </span>
                    {svc.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Service Areas */}
          <div>
            <FooterHeading>Service Areas</FooterHeading>
            <ul className="mt-4 flex flex-col gap-2">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <FooterLink href={`/service-areas/${area.slug}`}>
                    {area.city}, {area.state}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="font-mono inline-flex items-center gap-2 transition-colors"
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "var(--text-body)",
                  }}
                >
                  <span aria-hidden="true">📞</span>
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.smsHref}
                  className="inline-flex items-center gap-2 transition-colors"
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "var(--text-body-sm)",
                  }}
                >
                  <span aria-hidden="true">💬</span>
                  {siteConfig.ctaTextTony.label}
                </a>
              </li>
              <li
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-body-sm)",
                  lineHeight: 1.5,
                }}
              >
                <span aria-hidden="true" className="mr-2">
                  ⚡
                </span>
                Quote within 24 hours, in writing
              </li>
              <li className="mt-2">
                <Link
                  href={siteConfig.ctaPrimary.href}
                  className="inline-flex items-center justify-center font-display font-bold uppercase rounded-md"
                  style={{
                    background: "var(--primary)",
                    color: "var(--text-primary)",
                    padding: "0.625rem 1rem",
                    fontSize: "var(--text-eyebrow)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {siteConfig.ctaPrimary.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border-card-dark)" }}
        >
          <p
            className="font-mono"
            style={{
              color: "var(--text-muted)",
              fontSize: "var(--text-meta)",
            }}
          >
            © {currentYear} {siteConfig.legalName} · All rights reserved ·{" "}
            {siteConfig.baseCity}
          </p>
          <ul
            className="flex items-center gap-5"
            style={{
              color: "var(--text-muted)",
              fontSize: "var(--text-meta)",
            }}
          >
            <li>
              <Link
                href="/privacy"
                className="font-mono transition-colors hover:text-[var(--text-secondary)]"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="font-mono transition-colors hover:text-[var(--text-secondary)]"
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-display uppercase"
      style={{
        color: "var(--text-primary)",
        fontSize: "var(--text-eyebrow)",
        letterSpacing: "0.12em",
        fontWeight: 700,
      }}
    >
      {children}
    </p>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center transition-colors hover:text-[var(--text-primary)]"
      style={{
        color: "var(--text-secondary)",
        fontSize: "var(--text-body-sm)",
      }}
    >
      {children}
    </Link>
  );
}
