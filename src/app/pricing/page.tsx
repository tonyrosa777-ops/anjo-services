"use client";

/**
 * /pricing — Optimus internal sales tool, deleted before launch.
 *
 * CLAUDE.md Always-Built Features Rule §Pricing Page (LOCKED structure):
 *   - Starter $1,500 / Pro $3,000 / Premium $5,500
 *   - "Most Popular" badge on Pro only
 *   - ROI calculator (slider 1: avg job value, slider 2: clients/month, tier toggle)
 *   - Comparison chart by category (Foundation / Conversion / Content & SEO /
 *     Commerce / Support)
 *   - Each tier CTA opens <BookingCalendar /> inline (modal/expand)
 *   - noindex
 *
 * NEVER mentions: "deposit", "upfront", "Google" (any product). Build fails
 * Anthony's review if any appear.
 *
 * Client-facing feature names:
 *   - "Automated Booking Calendar" (NOT inline booking calendar)
 *   - "Lead-Capture Quiz" (NOT interactive quiz)
 *   - "Professional Blog" (NOT blog architecture)
 *   - "Branded Merch Shop" (NOT shop scaffold)
 *   - "Testimonials Showcase" (NOT testimonials page)
 *   - "Photo Gallery" (NOT gallery page)
 *
 * Adapts the Xpertise Painting reference structure (ROI sliders + tier
 * cards + comparison chart) to Anjo's 6 services + Optimus tier ladder.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingCalendar from "@/components/BookingCalendar";

/* ─── Tier data (LOCKED — same on every Optimus build) ────────────────── */

type Tier = {
  id: "starter" | "pro" | "premium";
  label: string;
  name: string;
  price: number;
  recommended: boolean;
  blurb: string;
  features: string[];
  cta: string;
};

const tiers: Tier[] = [
  {
    id: "starter",
    label: "Starter",
    name: "The Working Foundation",
    price: 1500,
    recommended: false,
    blurb:
      "Core pages, animated hero, FAQ. Everything a real customer needs in 60 seconds.",
    features: [
      "Custom homepage with 3-layer animated hero",
      "About, Services, Contact, FAQ pages",
      "Mobile-first responsive design",
      "Click-to-call and SMS-first CTAs",
      "Trust stats bar with your numbers",
      "Service area cities listed by name",
      "Local business schema markup",
      "Deployed forever, hosting included",
    ],
    cta: "Start with Starter",
  },
  {
    id: "pro",
    label: "Pro",
    name: "The Full Brand Experience",
    price: 3000,
    recommended: true,
    blurb:
      "Everything in Starter plus the conversion engine: Lead-Capture Quiz, Automated Booking Calendar, Photo Gallery, Testimonials Showcase, Professional Blog.",
    features: [
      "Everything in Starter",
      "Automated Booking Calendar with date and time picker",
      "Lead-Capture Quiz that routes visitors to the right service",
      "Photo Gallery with before and after slider",
      "Testimonials Showcase with filter by service",
      "Professional Blog with 9 to 10 SEO articles",
      "Individual service pages for every offering",
      "City-level Service Area pages",
      "Priority delivery and 2 revision rounds",
    ],
    cta: "Get the Pro Site",
  },
  {
    id: "premium",
    label: "Premium",
    name: "The Complete Business Platform",
    price: 5500,
    recommended: false,
    blurb:
      "Everything in Pro plus the Branded Merch Shop, training call, and full post-launch support window.",
    features: [
      "Everything in Pro",
      "Branded Merch Shop with cart and checkout",
      "Product catalog with 10 to 15 seeded products",
      "Live order management and inventory sync",
      "1-on-1 training call on launch day",
      "30-day post-launch support window",
      "3 revision rounds",
      "Priority on future feature add-ons",
    ],
    cta: "Build the Full Stack",
  },
];

/* ─── Comparison chart (5 categories per spec) ──────────────────────── */

type ChartCellValue = boolean | string;

type ChartGroup = {
  category: string;
  rows: [string, ChartCellValue, ChartCellValue, ChartCellValue][];
};

const comparisonGroups: ChartGroup[] = [
  {
    category: "Foundation",
    rows: [
      ["Custom homepage with 3-layer animated hero", true, true, true],
      ["Mobile-first responsive design", true, true, true],
      ["About, Services, Contact, FAQ pages", true, true, true],
      ["Click-to-call and SMS-first CTAs", true, true, true],
      ["Trust stats bar", true, true, true],
      ["Service area cities listed", true, true, true],
      ["Local business schema markup", true, true, true],
      ["Forever hosting, deployed", true, true, true],
    ],
  },
  {
    category: "Conversion",
    rows: [
      ["Automated Booking Calendar", false, true, true],
      ["Lead-Capture Quiz with archetypes", false, true, true],
      ["After-hours auto-responder", false, true, true],
      ["Inline conversion sections on every page", false, true, true],
    ],
  },
  {
    category: "Content & SEO",
    rows: [
      ["Photo Gallery with before and after slider", false, true, true],
      ["Testimonials Showcase with filtering", false, true, true],
      ["Professional Blog with 9 to 10 SEO articles", false, true, true],
      ["Individual service detail pages", false, true, true],
      ["City-level Service Area pages", false, true, true],
      ["Cost transparency pages with real ranges", false, true, true],
    ],
  },
  {
    category: "Commerce",
    rows: [
      ["Branded Merch Shop", false, false, true],
      ["Cart and checkout flow", false, false, true],
      ["Seeded product catalog", false, false, true],
      ["Order management dashboard", false, false, true],
    ],
  },
  {
    category: "Support",
    rows: [
      ["Delivery timeline", "10 days", "14 days", "21 days"],
      ["Post-launch support window", "48 hour email", "7 days", "30 days"],
      ["Training call on launch day", false, false, true],
      ["Revision rounds", "1", "2", "3"],
    ],
  },
];

/* ─── Page component ─────────────────────────────────────────────────── */

export default function PricingPage() {
  // Set noindex on this page (sales tool, deleted before launch).
  useEffect(() => {
    if (typeof document === "undefined") return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    document.title = "Pricing | Optimus Sales Tool";
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // Inline-expand booking calendar by tier id (one open at a time).
  const [openCalendar, setOpenCalendar] = useState<Tier["id"] | null>(null);

  return (
    <main
      style={{
        background: "var(--bg-dark-base)",
        color: "var(--text-primary)",
      }}
    >
      <PricingHero />
      <TiersSection
        openCalendar={openCalendar}
        setOpenCalendar={setOpenCalendar}
      />
      <ROICalculator />
      <ComparisonChart />
      <ClosingCTA />
    </main>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────── */

function PricingHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-dark-base)",
        paddingTop: "var(--space-2xl)",
        paddingBottom: "var(--space-2xl)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--bg-dark-overlay-radial)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          className="orb absolute"
          style={{
            top: "-20%",
            right: "-15%",
            width: "55%",
            height: "65%",
            background:
              "radial-gradient(ellipse at center, rgba(200, 32, 44, 0.18) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="orb-2 absolute"
          style={{
            bottom: "-15%",
            left: "-10%",
            width: "55%",
            height: "55%",
            background:
              "radial-gradient(ellipse at center, rgba(232, 176, 76, 0.12) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
      </div>
      <div
        className="relative mx-auto px-6 lg:px-8 text-center"
        style={{ maxWidth: "var(--container-default)", zIndex: 10 }}
      >
        <p
          className="font-display uppercase"
          style={{
            color: "var(--accent)",
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "0.2em",
            marginBottom: "var(--space-md)",
          }}
        >
          Website Build Proposal
        </p>
        <h1
          className="hero-shimmer font-display font-black"
          style={{
            fontSize: "var(--text-display)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-md)",
          }}
        >
          A website built to win you jobs.
        </h1>
        <p
          className="font-body mx-auto"
          style={{
            color: "var(--text-secondary)",
            fontSize: "var(--text-body-lg)",
            lineHeight: 1.55,
            maxWidth: "56ch",
            marginBottom: "var(--space-xl)",
          }}
        >
          Three packages. One price each. Custom-coded for trade businesses.
          You own the asset forever, no monthly platform fees, no hidden
          renewals.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            "100% Custom Code",
            "Delivered in 10 to 21 days",
            "No Monthly Fees",
            "Mobile-First, AI-Search Ready",
          ].map((t) => (
            <span
              key={t}
              className="font-mono"
              style={{
                background: "var(--bg-card-dark)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-card-dark)",
                padding: "0.4rem 0.875rem",
                borderRadius: "9999px",
                fontSize: "var(--text-meta)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tiers section + cards ──────────────────────────────────────────── */

function TiersSection({
  openCalendar,
  setOpenCalendar,
}: {
  openCalendar: Tier["id"] | null;
  setOpenCalendar: (id: Tier["id"] | null) => void;
}) {
  return (
    <section
      className="relative"
      style={{
        background: "var(--bg-elevated-dark)",
        paddingTop: "var(--space-2xl)",
        paddingBottom: "var(--space-2xl)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--bg-dark-overlay-radial)" }}
      />
      <div
        className="relative mx-auto px-6 lg:px-8"
        style={{ maxWidth: "var(--container-wide)", zIndex: 10 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:items-start">
          {tiers.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              expanded={openCalendar === tier.id}
              onToggle={() =>
                setOpenCalendar(openCalendar === tier.id ? null : tier.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({
  tier,
  expanded,
  onToggle,
}: {
  tier: Tier;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="relative flex flex-col rounded-lg overflow-hidden"
      style={{
        background: tier.recommended
          ? "var(--bg-dark-base)"
          : "var(--bg-elevated-dark)",
        border: tier.recommended
          ? "1.5px solid rgba(200, 32, 44, 0.55)"
          : "1px solid var(--border-card-dark)",
        boxShadow: tier.recommended
          ? "0 0 60px rgba(200, 32, 44, 0.12), 0 24px 48px rgba(0, 0, 0, 0.4)"
          : "0 8px 24px rgba(0, 0, 0, 0.25)",
        transform: tier.recommended ? "translateY(-10px)" : "translateY(0)",
      }}
    >
      {tier.recommended && (
        <div
          style={{
            height: "3px",
            width: "100%",
            background:
              "linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)",
          }}
        />
      )}

      <div
        className="flex flex-col flex-1"
        style={{ padding: "var(--space-lg)" }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "var(--space-md)" }}
        >
          <span
            className="font-display uppercase"
            style={{
              color: "var(--text-muted)",
              fontSize: "var(--text-eyebrow)",
              letterSpacing: "0.2em",
              fontWeight: 800,
            }}
          >
            {tier.label}
          </span>
          {tier.recommended && (
            <span
              className="font-display uppercase"
              style={{
                background: "rgba(200, 32, 44, 0.18)",
                color: "var(--primary)",
                border: "1px solid rgba(200, 32, 44, 0.35)",
                padding: "0.25rem 0.625rem",
                borderRadius: "9999px",
                fontSize: "0.625rem",
                letterSpacing: "0.16em",
                fontWeight: 800,
              }}
            >
              ★ Most Popular
            </span>
          )}
        </div>

        <div style={{ marginBottom: "var(--space-2xs)" }}>
          <span
            className="font-display font-black"
            style={{
              fontSize: "clamp(3rem, 7vw, 3.75rem)",
              color: tier.recommended ? "var(--primary)" : "var(--text-primary)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            ${tier.price.toLocaleString()}
          </span>
        </div>
        <p
          className="font-mono uppercase"
          style={{
            color: "var(--text-muted)",
            fontSize: "var(--text-meta)",
            letterSpacing: "0.16em",
            marginBottom: "var(--space-2xs)",
          }}
        >
          One-Time Investment
        </p>
        <p
          className="font-display font-bold"
          style={{
            color: "var(--text-primary)",
            fontSize: "var(--text-body-lg)",
            marginBottom: "var(--space-2xs)",
          }}
        >
          {tier.name}
        </p>
        <p
          className="font-body"
          style={{
            color: "var(--text-secondary)",
            fontSize: "var(--text-body-sm)",
            lineHeight: 1.55,
            marginBottom: "var(--space-md)",
          }}
        >
          {tier.blurb}
        </p>

        <ul
          className="flex-1"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.625rem",
            marginBottom: "var(--space-md)",
          }}
        >
          {tier.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 font-body"
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-body-sm)",
                lineHeight: 1.5,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  color: tier.recommended
                    ? "var(--primary)"
                    : "var(--text-secondary)",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                ✅
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onToggle}
          className="font-display font-bold uppercase rounded-md"
          style={{
            background: tier.recommended ? "var(--primary)" : "transparent",
            color: tier.recommended
              ? "var(--text-primary)"
              : "var(--text-secondary)",
            border: tier.recommended
              ? "1px solid var(--primary)"
              : "1px solid var(--border-card-dark)",
            padding: "0.875rem 1.25rem",
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "0.08em",
            cursor: "pointer",
            boxShadow: tier.recommended
              ? "0 8px 24px rgba(200, 32, 44, 0.32)"
              : "none",
            transition: "background 200ms ease",
          }}
        >
          {expanded ? "Close calendar" : tier.cta}
        </button>

        {/* Inline expand-in-place BookingCalendar — never a link away */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="cal"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{ overflow: "hidden", marginTop: "var(--space-md)" }}
            >
              <BookingCalendar compact />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── ROI calculator ─────────────────────────────────────────────────── */

function ROICalculator() {
  // Anjo defaults from market-intelligence §4: kitchen sweet spot ~$35K-$45K,
  // and Tony averages roughly 3 closed remodel/finish-carpentry jobs/month.
  // Slider 1: avg job value $500-$20K step $100 default $35,000... per spec.
  // The spec defaults call out $35,000 — but the slider range is $500-$20K.
  // We honor the wider Anjo reality: range $500 to $20,000 step $100, default
  // $5,000 (median across handyman + finish carpentry + small bath). Specs that
  // mismatch (max of $20K vs default of $35K) resolve in favor of internally
  // consistent slider math — flagged for client review below.
  const [jobValue, setJobValue] = useState(5000); // [DEMO COPY — pending client review]
  const [clientsPerMonth, setClientsPerMonth] = useState(3);
  const [selectedTier, setSelectedTier] = useState<number>(1); // Pro

  const headRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [headVisible, setHeadVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (e.target === headRef.current) setHeadVisible(true);
            if (e.target === cardRef.current) setCardVisible(true);
          }
        });
      },
      { threshold: 0.15 },
    );
    if (headRef.current) obs.observe(headRef.current);
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const tier = tiers[selectedTier];
  const monthlyRevenue = jobValue * clientsPerMonth;
  const annualRevenue = monthlyRevenue * 12;
  const breakEvenMonths =
    monthlyRevenue > 0
      ? Math.ceil((tier.price / monthlyRevenue) * 10) / 10
      : 0;
  const roi12 =
    tier.price > 0
      ? Math.round(((annualRevenue - tier.price) / tier.price) * 100)
      : 0;

  const fmt = (n: number) =>
    n >= 1000
      ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
      : `$${n.toLocaleString()}`;

  const sliderBg = (val: number, min: number, max: number) => {
    const pct = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, var(--primary) ${pct}%, rgba(255, 255, 255, 0.1) ${pct}%)`;
  };

  return (
    <section
      className="relative"
      style={{
        background: "var(--bg-dark-base)",
        paddingTop: "var(--space-2xl)",
        paddingBottom: "var(--space-2xl)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--bg-dark-overlay-radial)" }}
      />
      <div
        className="relative mx-auto px-6 lg:px-8"
        style={{ maxWidth: "var(--container-default)", zIndex: 10 }}
      >
        <div
          ref={headRef}
          className="text-center"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            marginBottom: "var(--space-xl)",
          }}
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
            Run the Numbers
          </p>
          <h2
            className="font-display font-black"
            style={{
              color: "var(--text-primary)",
              fontSize: "var(--text-h2)",
              letterSpacing: "-0.02em",
              marginBottom: "var(--space-2xs)",
            }}
          >
            What does a website actually make you?
          </h2>
          <p
            className="font-body mx-auto"
            style={{
              color: "var(--text-muted)",
              fontSize: "var(--text-body)",
              maxWidth: "44ch",
            }}
          >
            Anjo finish carpentry averages around $3K. Kitchens around $40K.
            Adjust the sliders to see your real return.
          </p>
        </div>

        <div
          ref={cardRef}
          className="rounded-lg overflow-hidden"
          style={{
            background: "var(--bg-elevated-dark)",
            border: "1px solid var(--border-card-dark)",
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s",
          }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
            style={{ padding: "var(--space-xl)" }}
          >
            {/* Inputs */}
            <div className="flex flex-col gap-6">
              <SliderInput
                label="Average job value"
                value={jobValue}
                onChange={setJobValue}
                min={500}
                max={20000}
                step={100}
                format={(v) => `$${v.toLocaleString()}`}
                track={sliderBg(jobValue, 500, 20000)}
                rangeLabel={["$500", "$20,000"]}
                hint="Handyman half-day $350. Accent wall $2.5K. Kitchen mid $40K."
              />
              <SliderInput
                label="New clients per month from website"
                value={clientsPerMonth}
                onChange={setClientsPerMonth}
                min={1}
                max={20}
                step={1}
                format={(v) => `${v}`}
                track={sliderBg(clientsPerMonth, 1, 20)}
                rangeLabel={["1 client", "20 clients"]}
                hint="Local trades typically see 3 to 8 inquiries per month once ranked."
              />
              <div>
                <label
                  className="font-display uppercase block"
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "var(--text-eyebrow)",
                    letterSpacing: "0.12em",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  Package
                </label>
                <div className="flex gap-2">
                  {tiers.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTier(i)}
                      className="flex-1 rounded-md font-display font-bold transition-all"
                      style={{
                        background:
                          selectedTier === i
                            ? i === 1
                              ? "var(--primary)"
                              : "rgba(255, 255, 255, 0.12)"
                            : "rgba(255, 255, 255, 0.04)",
                        color:
                          selectedTier === i
                            ? "var(--text-primary)"
                            : "var(--text-muted)",
                        border:
                          selectedTier === i
                            ? "none"
                            : "1px solid var(--border-card-dark)",
                        padding: "0.625rem 0.5rem",
                        fontSize: "0.7rem",
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                    >
                      {t.label}
                      <br />
                      <span
                        className="font-display font-black"
                        style={{ fontSize: "var(--text-body-sm)" }}
                      >
                        ${t.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results — animate on value change */}
            <div className="flex flex-col gap-3">
              <ResultCard
                label="Monthly Revenue"
                value={fmt(monthlyRevenue)}
                sub={`${clientsPerMonth} jobs × $${jobValue.toLocaleString()} avg`}
                key={`monthly-${monthlyRevenue}`}
                accent={false}
              />
              <ResultCard
                label="Annual Revenue"
                value={fmt(annualRevenue)}
                sub="From website leads alone"
                key={`annual-${annualRevenue}`}
                accent
              />
              <div className="grid grid-cols-2 gap-3">
                <ResultCard
                  label="12-Month ROI"
                  value={`${roi12 > 0 ? "+" : ""}${roi12.toLocaleString()}%`}
                  small
                  positive={roi12 > 0}
                  key={`roi-${roi12}`}
                />
                <ResultCard
                  label="Break Even"
                  value={
                    breakEvenMonths < 1
                      ? `${Math.round(breakEvenMonths * 30)}d`
                      : `${breakEvenMonths}mo`
                  }
                  small
                  key={`be-${breakEvenMonths}`}
                />
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              padding: "var(--space-md) var(--space-xl)",
              borderTop: "1px solid var(--border-card-dark)",
              background: "rgba(200, 32, 44, 0.04)",
            }}
          >
            <p
              className="font-body text-center"
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-body-sm)",
              }}
            >
              A{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                {tier.name}
              </span>{" "}
              at{" "}
              <span style={{ color: "var(--primary)", fontWeight: 700 }}>
                ${tier.price.toLocaleString()}
              </span>{" "}
              pays for itself in{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                {breakEvenMonths < 1
                  ? `${Math.round(breakEvenMonths * 30)} days`
                  : `${breakEvenMonths} month${breakEvenMonths !== 1 ? "s" : ""}`}
              </span>
              . After that, every client is pure profit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
  track,
  rangeLabel,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  track: string;
  rangeLabel: [string, string];
  hint?: string;
}) {
  return (
    <div>
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "var(--space-2xs)" }}
      >
        <label
          className="font-body"
          style={{
            color: "var(--text-secondary)",
            fontSize: "var(--text-body-sm)",
          }}
        >
          {label}
        </label>
        <span
          className="font-display font-black"
          style={{
            color: "var(--text-primary)",
            fontSize: "var(--text-h4)",
          }}
        >
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none cursor-pointer"
        style={{
          height: "0.375rem",
          borderRadius: "9999px",
          background: track,
        }}
      />
      <div
        className="flex justify-between font-mono"
        style={{
          color: "var(--text-muted)",
          fontSize: "0.625rem",
          marginTop: "0.375rem",
        }}
      >
        <span>{rangeLabel[0]}</span>
        <span>{rangeLabel[1]}</span>
      </div>
      {hint && (
        <p
          className="font-mono"
          style={{
            color: "var(--text-muted)",
            fontSize: "var(--text-meta)",
            marginTop: "var(--space-2xs)",
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

function ResultCard({
  label,
  value,
  sub,
  accent = false,
  small = false,
  positive = false,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
  small?: boolean;
  positive?: boolean;
}) {
  return (
    <motion.div
      initial={{ scale: 0.97, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="rounded-lg"
      style={{
        background: accent
          ? "rgba(200, 32, 44, 0.07)"
          : "rgba(255, 255, 255, 0.03)",
        border: accent
          ? "1px solid rgba(200, 32, 44, 0.2)"
          : "1px solid var(--border-card-dark)",
        padding: small ? "var(--space-md)" : "var(--space-md)",
        flex: small ? "0 0 auto" : 1,
      }}
    >
      <p
        className="font-mono uppercase"
        style={{
          color: "var(--text-muted)",
          fontSize: "0.625rem",
          letterSpacing: "0.16em",
          marginBottom: "0.25rem",
        }}
      >
        {label}
      </p>
      <p
        className="font-display font-black"
        style={{
          color: accent
            ? "var(--primary)"
            : positive
              ? "#4ade80"
              : "var(--text-primary)",
          fontSize: small ? "var(--text-h3)" : "clamp(2rem, 5vw, 2.6rem)",
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      {sub && (
        <p
          className="font-mono"
          style={{
            color: "var(--text-muted)",
            fontSize: "var(--text-meta)",
            marginTop: "0.25rem",
          }}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}

/* ─── Comparison chart ──────────────────────────────────────────────── */

function ComparisonChart() {
  return (
    <section
      className="relative"
      style={{
        background: "var(--bg-elevated-dark)",
        paddingTop: "var(--space-2xl)",
        paddingBottom: "var(--space-2xl)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--bg-dark-overlay-radial)" }}
      />
      <div
        className="relative mx-auto px-6 lg:px-8"
        style={{ maxWidth: "var(--container-wide)", zIndex: 10 }}
      >
        <div
          className="text-center"
          style={{ marginBottom: "var(--space-xl)" }}
        >
          <h2
            className="font-display font-black"
            style={{
              color: "var(--text-primary)",
              fontSize: "var(--text-h2)",
              letterSpacing: "-0.02em",
            }}
          >
            Compare Packages
          </h2>
        </div>

        <div
          className="overflow-x-auto rounded-lg"
          style={{ border: "1px solid var(--border-card-dark)" }}
        >
          <table
            className="w-full border-collapse"
            style={{ fontSize: "var(--text-body-sm)" }}
          >
            <thead>
              <tr>
                <th
                  className="text-left font-display uppercase"
                  style={{
                    background: "var(--bg-elevated-dark)",
                    borderBottom: "1px solid var(--border-card-dark)",
                    padding: "var(--space-md)",
                    color: "var(--text-muted)",
                    fontSize: "0.625rem",
                    letterSpacing: "0.16em",
                    width: "40%",
                    fontWeight: 700,
                  }}
                >
                  Feature
                </th>
                {tiers.map((t) => (
                  <th
                    key={t.id}
                    className="text-center"
                    style={{
                      background: t.recommended
                        ? "var(--bg-dark-base)"
                        : "var(--bg-elevated-dark)",
                      borderBottom: "1px solid var(--border-card-dark)",
                      borderLeft: "1px solid var(--border-card-dark)",
                      padding: "var(--space-md)",
                    }}
                  >
                    <div
                      className="font-display uppercase"
                      style={{
                        color: t.recommended
                          ? "var(--primary)"
                          : "var(--text-muted)",
                        fontSize: "0.625rem",
                        letterSpacing: "0.16em",
                        fontWeight: 800,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {t.label}
                    </div>
                    <div
                      className="font-display font-black"
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "var(--text-h4)",
                      }}
                    >
                      ${t.price.toLocaleString()}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonGroups.map((group) => (
                <ChartRows key={group.category} group={group} />
              ))}
              <tr style={{ borderTop: "1px solid var(--border-card-dark)" }}>
                <td
                  style={{
                    padding: "var(--space-md)",
                    color: "var(--text-primary)",
                    fontWeight: 600,
                  }}
                >
                  Total investment
                </td>
                {tiers.map((t) => (
                  <td
                    key={t.id}
                    className="text-center"
                    style={{
                      padding: "var(--space-md)",
                      borderLeft: "1px solid var(--border-card-dark)",
                      background: t.recommended
                        ? "rgba(200, 32, 44, 0.04)"
                        : "transparent",
                    }}
                  >
                    <span
                      className="font-display font-black"
                      style={{
                        color: t.recommended
                          ? "var(--primary)"
                          : "var(--text-primary)",
                        fontSize: "var(--text-h4)",
                      }}
                    >
                      ${t.price.toLocaleString()}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ChartRows({ group }: { group: ChartGroup }) {
  return (
    <>
      <tr>
        <td
          colSpan={4}
          className="font-display uppercase"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            borderTop: "1px solid var(--border-card-dark)",
            padding: "var(--space-sm) var(--space-md)",
            color: "var(--text-muted)",
            fontSize: "0.625rem",
            letterSpacing: "0.16em",
            fontWeight: 800,
          }}
        >
          {group.category}
        </td>
      </tr>
      {group.rows.map((row) => (
        <tr key={String(row[0])}>
          <td
            style={{
              padding: "0.875rem var(--space-md)",
              color: "var(--text-secondary)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
            }}
          >
            {row[0]}
          </td>
          {[row[1], row[2], row[3]].map((val, ci) => (
            <td
              key={ci}
              className="text-center"
              style={{
                padding: "0.875rem var(--space-md)",
                borderLeft: "1px solid var(--border-card-dark)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                background: ci === 1 ? "rgba(200, 32, 44, 0.03)" : "transparent",
              }}
            >
              {val === true ? (
                <span aria-hidden="true" style={{ color: "var(--primary)" }}>
                  ✅
                </span>
              ) : val === false ? (
                <span
                  aria-hidden="true"
                  style={{ color: "var(--text-muted)", opacity: 0.5 }}
                >
                  ✗
                </span>
              ) : (
                <span
                  className="font-mono"
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "var(--text-meta)",
                  }}
                >
                  {String(val)}
                </span>
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/* ─── Closing CTA ───────────────────────────────────────────────────── */

function ClosingCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--bg-dark-base)",
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
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          className="orb absolute"
          style={{
            top: "-20%",
            right: "-15%",
            width: "55%",
            height: "65%",
            background:
              "radial-gradient(ellipse at center, rgba(200, 32, 44, 0.12) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
      </div>
      <div
        className="relative mx-auto px-6 lg:px-8 text-center"
        style={{ maxWidth: "var(--container-narrow)", zIndex: 10 }}
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
          Ready to Get More Calls?
        </p>
        <h2
          className="font-display font-black"
          style={{
            color: "var(--text-primary)",
            fontSize: "var(--text-h1)",
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-md)",
            lineHeight: 1.1,
          }}
        >
          Let&apos;s build the website that wins you jobs.
        </h2>
        <p
          className="font-body mx-auto"
          style={{
            color: "var(--text-muted)",
            fontSize: "var(--text-body-lg)",
            lineHeight: 1.55,
            maxWidth: "48ch",
            marginBottom: "var(--space-xl)",
          }}
        >
          Most contractors in your area do not have a real website yet. The
          ones who do get the calls. Let&apos;s make sure that is you.
        </p>
        <BookingCalendar
          heading="Pick a 30 minute walkthrough."
          subcopy="Free, no commitment, written quote in 24 hours after."
        />
      </div>
    </section>
  );
}
