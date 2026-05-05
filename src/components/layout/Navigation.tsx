"use client";

/**
 * Navigation — Anjo Services site nav.
 *
 * Architecture per CLAUDE.md (Hero Architecture Rule + Always-Built Features Rule
 * + Page Wiring Rule) and design-system.md §5 Component Style Rules → Navigation.
 *
 * Desktop layout (≥768px):
 *   [Logo]   [Home · About · Services▾ · Service Areas▾ · Gallery · Blog · ≡∨]
 *                                                                  [Phone | Text Tony | Take the Quiz]
 *
 * Service / Service-Areas dropdowns: hover-open + click-navigate (Pattern #26 —
 * outer container onMouseEnter/Leave, inner trigger is a Link, not a button).
 * Service-Areas dropdown lists all `serviceAreas[]` from /data/site.ts as
 * `/service-areas/[slug]` links + a "View All Service Areas →" footer.
 *
 * "More" overflow (≡ ∨) holds: FAQ · Testimonials · Shop · Contact · ⬥ Pricing.
 * Pricing renders amber `var(--accent)` per Always-Built Features Rule —
 * signals to demo viewers it is an Optimus internal sales tool.
 *
 * Mobile drawer (<768px) — full-screen, DARK OPAQUE overlay (Error #38
 * anti-pattern: never transparent). Includes EVERY nav item:
 *   - All primary links
 *   - Every service from services[]
 *   - Every service-area city from serviceAreas[]
 *   - Every overflow link (FAQ, Testimonials, Shop, Contact)
 *   - ⬥ Pricing in amber
 *   - Phone (978) 216-6455
 *   - Text Tony (sms:)
 *   - Take the Quiz CTA
 * Close X is INSIDE the drawer (NOT the original hamburger — Error #38
 * close-trap). Layout.tsx pads `<main>` with pt-24 lg:pt-28 to clear the
 * fixed nav (Error #40).
 *
 * CTA routing per Error #41: primary CTA always /booking, secondary always
 * /quiz — sourced from siteConfig.ctaPrimary / ctaSecondaryQuiz.
 */

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { siteConfig, services, serviceAreas } from "@/data/site";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
] as const;

const overflowLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const moreRef = useRef<HTMLDivElement>(null);

  // Scroll-state aware: transparent at top, blurred + bg at scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click-outside closes the More dropdown (it is click-toggled, not hover).
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  // Lock body scroll when drawer is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close drawer on Escape.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        )}
        style={{
          background: scrolled
            ? "rgba(10, 10, 10, 0.85)"
            : "rgba(10, 10, 10, 0.55)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(6px)",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(6px)",
          borderBottom: scrolled
            ? "1px solid var(--border-card-dark)"
            : "1px solid transparent",
        }}
      >
        {/* Mandatory radial overlay — keeps nav consistent with dark-section rule */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "var(--bg-dark-overlay-radial)",
            opacity: 0.4,
          }}
        />

        <div
          className="relative z-10 mx-auto flex items-center justify-between px-6 lg:px-8"
          style={{
            maxWidth: "var(--container-wide)",
            height: scrolled ? "5rem" : "6rem",
            transition: "height 200ms ease",
          }}
        >
          {/* Logo (left) */}
          <Link
            href="/"
            className="flex items-center"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/Logo.webp"
              alt={siteConfig.name}
              width={120}
              height={48}
              priority
              style={{
                width: "auto",
                height: scrolled ? "2.25rem" : "2.75rem",
                transition: "height 200ms ease",
              }}
            />
          </Link>

          {/* Primary nav (center, desktop only) */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-1"
          >
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>

            {/* Services hover-dropdown — outer hover, inner Link (Pattern #26) */}
            <HoverDropdown
              triggerHref="/services"
              triggerLabel="Services"
              open={servicesOpen}
              setOpen={setServicesOpen}
            >
              <DropdownPanel
                eyebrow="All Services"
                footerHref="/services"
                footerLabel="View All Services →"
                onItemClick={() => setServicesOpen(false)}
                gridCols={2}
              >
                {services.map((svc) => (
                  <DropdownItem
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    onClick={() => setServicesOpen(false)}
                    emoji={svc.emoji}
                    label={svc.name}
                    sub={svc.priceRange}
                  />
                ))}
              </DropdownPanel>
            </HoverDropdown>

            {/* Service Areas hover-dropdown */}
            <HoverDropdown
              triggerHref="/service-areas"
              triggerLabel="Service Areas"
              open={areasOpen}
              setOpen={setAreasOpen}
            >
              <DropdownPanel
                eyebrow="Service Areas"
                footerHref="/service-areas"
                footerLabel="View All Service Areas →"
                onItemClick={() => setAreasOpen(false)}
                gridCols={2}
              >
                {serviceAreas.map((area) => (
                  <DropdownItem
                    key={area.slug}
                    href={`/service-areas/${area.slug}`}
                    onClick={() => setAreasOpen(false)}
                    emoji="📍"
                    label={`${area.city}, ${area.state}`}
                    sub={area.distance}
                  />
                ))}
              </DropdownPanel>
            </HoverDropdown>

            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/blog">Blog</NavLink>

            {/* More overflow (click-toggle) */}
            <div ref={moreRef} className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className="flex items-center gap-1.5 px-3 py-2 font-display font-bold uppercase rounded-md transition-colors"
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-eyebrow)",
                  letterSpacing: "0.08em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <span aria-hidden="true">≡</span>
                <span className="sr-only">More navigation</span>
                <span aria-hidden="true">∨</span>
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    role="menu"
                    className="absolute top-full right-0 mt-2 w-64 rounded-lg overflow-hidden"
                    style={{
                      background: "var(--bg-elevated-dark)",
                      border: "1px solid var(--border-card-dark)",
                      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "var(--bg-dark-overlay-radial)" }}
                    />
                    <ul className="relative z-10 py-2">
                      {overflowLinks.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={() => setMoreOpen(false)}
                            className="block px-4 py-2.5 font-display uppercase transition-colors"
                            style={{
                              color: "var(--text-secondary)",
                              fontSize: "var(--text-eyebrow)",
                              letterSpacing: "0.08em",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color =
                                "var(--text-primary)";
                              e.currentTarget.style.background =
                                "var(--primary-soft)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color =
                                "var(--text-secondary)";
                              e.currentTarget.style.background = "transparent";
                            }}
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                      {/* Pricing — amber + ⬥ marker per Always-Built Features Rule */}
                      <li
                        style={{
                          borderTop: "1px solid var(--border-card-dark)",
                          marginTop: "0.25rem",
                          paddingTop: "0.25rem",
                        }}
                      >
                        <Link
                          href="/pricing"
                          onClick={() => setMoreOpen(false)}
                          className="block px-4 py-2.5 font-display uppercase transition-colors"
                          style={{
                            color: "var(--accent)",
                            fontSize: "var(--text-eyebrow)",
                            letterSpacing: "0.08em",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(232, 176, 76, 0.10)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          ⬥ Pricing
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right cluster (desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={siteConfig.phoneHref}
              className="font-mono transition-colors"
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-body-sm)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
              aria-label={`Call ${siteConfig.phone}`}
            >
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.smsHref}
              className="inline-flex items-center justify-center font-display font-bold uppercase rounded-md transition-colors"
              style={{
                background: "transparent",
                color: "var(--text-primary)",
                padding: "0.5rem 0.875rem",
                border: "1px solid var(--border-card-dark)",
                fontSize: "var(--text-eyebrow)",
                letterSpacing: "0.08em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.background = "var(--primary-soft)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-card-dark)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {siteConfig.ctaTextTony.label}
            </a>
            <Link
              href={siteConfig.ctaSecondaryQuiz.href}
              className="inline-flex items-center justify-center font-display font-bold uppercase rounded-md transition-colors"
              style={{
                background: "var(--primary)",
                color: "var(--text-primary)",
                padding: "0.625rem 1.125rem",
                fontSize: "var(--text-eyebrow)",
                letterSpacing: "0.08em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--primary-muted)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--primary)";
              }}
            >
              Take the Quiz
            </Link>
          </div>

          {/* Mobile right (hamburger) */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden inline-flex items-center justify-center rounded-md"
            style={{
              width: "2.75rem",
              height: "2.75rem",
              color: "var(--text-primary)",
              border: "1px solid var(--border-card-dark)",
            }}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav-drawer"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ☰
            </span>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Sub-components                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 font-display font-bold uppercase rounded-md transition-colors"
      style={{
        color: "var(--text-secondary)",
        fontSize: "var(--text-eyebrow)",
        letterSpacing: "0.08em",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-secondary)";
      }}
    >
      {children}
    </Link>
  );
}

/**
 * Hover-open + click-navigate dropdown (Pattern #26).
 * Outer container handles onMouseEnter/onMouseLeave. The trigger itself is a
 * <Link> to the parent index page, NOT a <button>, so a click navigates.
 */
function HoverDropdown({
  triggerHref,
  triggerLabel,
  open,
  setOpen,
  children,
}: {
  triggerHref: string;
  triggerLabel: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={triggerHref}
        className="flex items-center gap-1 px-3 py-2 font-display font-bold uppercase rounded-md transition-colors"
        style={{
          color: "var(--text-secondary)",
          fontSize: "var(--text-eyebrow)",
          letterSpacing: "0.08em",
        }}
        aria-expanded={open}
        aria-haspopup="menu"
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--text-primary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--text-secondary)";
        }}
      >
        {triggerLabel}
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            transition: "transform 200ms ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            fontSize: "0.7em",
          }}
        >
          ∨
        </span>
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            role="menu"
            className="absolute top-full left-1/2 -translate-x-1/2"
            style={{ paddingTop: "0.5rem" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownPanel({
  eyebrow,
  footerHref,
  footerLabel,
  onItemClick,
  gridCols,
  children,
}: {
  eyebrow: string;
  footerHref: string;
  footerLabel: string;
  onItemClick: () => void;
  gridCols: 1 | 2 | 3;
  children: React.ReactNode;
}) {
  const colClass =
    gridCols === 3
      ? "grid-cols-3"
      : gridCols === 2
        ? "grid-cols-2"
        : "grid-cols-1";
  return (
    <div
      className="relative w-[560px] rounded-lg overflow-hidden p-5"
      style={{
        background: "var(--bg-elevated-dark)",
        border: "1px solid var(--border-card-dark)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--bg-dark-overlay-radial)" }}
      />
      <div className="relative z-10">
        <p
          className="font-display uppercase mb-3"
          style={{
            color: "var(--text-muted)",
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "0.12em",
          }}
        >
          {eyebrow}
        </p>
        <ul className={cn("grid gap-1", colClass)}>{children}</ul>
        <div
          className="mt-4 pt-4"
          style={{ borderTop: "1px solid var(--border-card-dark)" }}
        >
          <Link
            href={footerHref}
            onClick={onItemClick}
            className="font-display font-bold uppercase transition-colors"
            style={{
              color: "var(--primary)",
              fontSize: "var(--text-eyebrow)",
              letterSpacing: "0.08em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--primary)";
            }}
          >
            {footerLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

function DropdownItem({
  href,
  onClick,
  emoji,
  label,
  sub,
}: {
  href: string;
  onClick: () => void;
  emoji: string;
  label: string;
  sub?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="flex items-start gap-3 px-3 py-2.5 rounded-md transition-colors"
        style={{ color: "var(--text-secondary)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--primary-soft)";
          e.currentTarget.style.color = "var(--text-primary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--text-secondary)";
        }}
      >
        <span aria-hidden="true" className="text-lg leading-none mt-0.5">
          {emoji}
        </span>
        <span className="flex flex-col">
          <span
            className="font-display font-bold"
            style={{
              fontSize: "var(--text-body-sm)",
              letterSpacing: "0.02em",
            }}
          >
            {label}
          </span>
          {sub && (
            <span
              className="font-mono"
              style={{
                color: "var(--text-muted)",
                fontSize: "var(--text-meta)",
              }}
            >
              {sub}
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Mobile drawer                                                              */
/* ─────────────────────────────────────────────────────────────────────────── */

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] lg:hidden overflow-y-auto"
          // OPAQUE dark overlay per Error #38 — never transparent
          style={{
            background: "var(--bg-dark-base)",
          }}
        >
          {/* Mandatory radial overlay layered on top */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: "var(--bg-dark-overlay-radial)" }}
          />

          <div className="relative z-10 flex flex-col min-h-full px-6 pt-6 pb-10">
            {/* Header — close X is INSIDE the drawer (Error #38 close-trap fix) */}
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/"
                onClick={onClose}
                aria-label={`${siteConfig.name} home`}
              >
                <Image
                  src="/Logo.webp"
                  alt={siteConfig.name}
                  width={120}
                  height={48}
                  style={{ width: "auto", height: "2.5rem" }}
                />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-md"
                style={{
                  width: "2.75rem",
                  height: "2.75rem",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-card-dark)",
                }}
                aria-label="Close navigation menu"
              >
                <span aria-hidden="true" className="text-2xl leading-none">
                  ✕
                </span>
              </button>
            </div>

            {/* Primary links */}
            <nav aria-label="Mobile primary" className="flex flex-col gap-1">
              {primaryLinks.map((l) => (
                <DrawerLink
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  label={l.label}
                />
              ))}
              <DrawerLink
                href="/services"
                onClick={onClose}
                label="Services"
              />
              <DrawerLink
                href="/service-areas"
                onClick={onClose}
                label="Service Areas"
              />
            </nav>

            {/* Services children */}
            <DrawerSectionHeader>All Services</DrawerSectionHeader>
            <ul className="flex flex-col gap-1">
              {services.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/services/${svc.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span aria-hidden="true" className="text-xl">
                      {svc.emoji}
                    </span>
                    <span className="flex flex-col">
                      <span
                        className="font-display font-bold"
                        style={{
                          fontSize: "var(--text-body-sm)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {svc.name}
                      </span>
                      <span
                        className="font-mono"
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "var(--text-meta)",
                        }}
                      >
                        {svc.priceRange}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Service-area cities */}
            <DrawerSectionHeader>Service Areas</DrawerSectionHeader>
            <ul className="flex flex-col gap-1">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/service-areas/${area.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span aria-hidden="true">📍</span>
                    <span
                      className="font-display"
                      style={{ fontSize: "var(--text-body-sm)" }}
                    >
                      {area.city}, {area.state}
                    </span>
                    <span
                      className="font-mono ml-auto"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "var(--text-meta)",
                      }}
                    >
                      {area.distance}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Overflow links */}
            <DrawerSectionHeader>More</DrawerSectionHeader>
            <nav aria-label="Mobile more" className="flex flex-col gap-1">
              {overflowLinks.map((l) => (
                <DrawerLink
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  label={l.label}
                />
              ))}
              {/* Pricing — amber + ⬥ */}
              <Link
                href="/pricing"
                onClick={onClose}
                className="px-3 py-3 rounded-md font-display font-bold uppercase"
                style={{
                  color: "var(--accent)",
                  fontSize: "var(--text-body-sm)",
                  letterSpacing: "0.08em",
                }}
              >
                ⬥ Pricing
              </Link>
            </nav>

            {/* Contact + CTAs (bottom of drawer) */}
            <div
              className="mt-auto pt-8 flex flex-col gap-3"
              style={{ borderTop: "1px solid var(--border-card-dark)" }}
            >
              <a
                href={siteConfig.phoneHref}
                onClick={onClose}
                className="flex items-center gap-2 px-3 py-3 font-mono"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "var(--text-body)",
                }}
              >
                <span aria-hidden="true">📞</span>
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.smsHref}
                onClick={onClose}
                className="inline-flex items-center justify-center font-display font-bold uppercase rounded-md"
                style={{
                  background: "transparent",
                  color: "var(--text-primary)",
                  padding: "0.875rem 1.5rem",
                  border: "1px solid var(--primary)",
                  fontSize: "var(--text-body-sm)",
                  letterSpacing: "0.08em",
                }}
              >
                💬 {siteConfig.ctaTextTony.label}
              </a>
              <Link
                href={siteConfig.ctaSecondaryQuiz.href}
                onClick={onClose}
                className="inline-flex items-center justify-center font-display font-bold uppercase rounded-md"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-primary)",
                  padding: "0.875rem 1.5rem",
                  fontSize: "var(--text-body-sm)",
                  letterSpacing: "0.08em",
                }}
              >
                Take the Quiz
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DrawerLink({
  href,
  onClick,
  label,
}: {
  href: string;
  onClick: () => void;
  label: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-3 py-3 rounded-md font-display font-bold uppercase"
      style={{
        color: "var(--text-primary)",
        fontSize: "var(--text-body-sm)",
        letterSpacing: "0.08em",
      }}
    >
      {label}
    </Link>
  );
}

function DrawerSectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-display uppercase mt-6 mb-2 px-3"
      style={{
        color: "var(--text-muted)",
        fontSize: "var(--text-eyebrow)",
        letterSpacing: "0.12em",
      }}
    >
      {children}
    </p>
  );
}
