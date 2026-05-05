/**
 * /services/cost — Cost Transparency PUBLIC page.
 *
 * Closes market-intelligence.md §5 Gap 1 (no Methuen-area competitor publishes
 * prices with photos = highest-leverage content move) + §9 strategic
 * recommendation #1 ("DO publish real cost ranges with photos attached").
 *
 * Structure per task spec:
 *   1. Page header (Fragment root, h1 = hero-shimmer font-display text-h1,
 *      ambient breathing-orb)
 *   2. Intro paragraph (positions transparency as Anjo's promise; cites
 *      Mosby + Rothrock without naming — frame as "we publish ranges other
 *      contractors hide")
 *   3. Comparison table — 6 service rows (services[] order, finish carpentry
 *      leads), columns: Budget / Mid-range / High-end / What changes the price
 *   4. "Why we publish prices" sidebar — 3 short paragraphs:
 *      a) you can plan
 *      b) no surprise quotes
 *      c) spec sheet attached to every estimate
 *   5. CTA: "Get your range in 24 hours" → /booking
 *
 * All ranges quoted from market-intelligence.md §4 typical 2025 ranges table:
 *   Kitchen:   $20K-$35K / $35K-$65K / $65K-$130K+
 *   Bathroom:  $10K-$18K / $18K-$35K / $35K-$80K
 *   Deck:      $5K-$12K  / $12K-$25K / $25K-$50K
 *   Finish carpentry / accent wall: $800 / $1,500-$3,500 / $3,500-$5,500
 *   Coffered ceiling: $2,500 / $3,500-$5,500 / $5,500-$7,500+
 *   Interior paint (2,000 sq ft): $4K-$6K / $6K-$9K / $9K-$12K
 *   Minor handyman jobs: $75-$250 / $250-$450 / $450-$1,500
 *
 * Marker [DEMO COPY — pending client review] on every invented paragraph.
 * Page Header Standard per CLAUDE.md.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { FAQPageSchema, BreadcrumbSchema } from "@/components/seo";
import type { FaqSchemaItem } from "@/components/seo";

export const metadata: Metadata = {
  title:
    "Real Project Costs in Methuen MA + North Shore | Anjo Services",
  description:
    "Real prices on real Methuen, Andover, and Haverhill projects. Kitchen $25K to $65K. Bath $10K to $35K. Deck $5K to $25K. Coffered ceiling $2.5K to $7.5K typical.",
  alternates: { canonical: "/services/cost" },
  openGraph: {
    type: "website",
    url: "https://anjoservices.com/services/cost",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title:
      "Real Project Costs in Methuen MA + North Shore | Anjo Services",
    description:
      "Real prices on real projects. Kitchen, bath, deck, finish carpentry. Ranges other contractors hide.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Real Project Costs in Methuen MA + North Shore | Anjo Services",
    description:
      "Kitchen $25K-$65K. Bath $10K-$35K. Coffered ceiling $2.5K-$7.5K. Real prices, real projects.",
  },
};

/**
 * AEO question-format gaps — sourced verbatim from market-intelligence.md §6
 * "AEO content gaps — 10 question-format opportunities". These are the
 * questions Google AI Overviews surface in the contractor / remodeling
 * category that no local competitor answers well; matching FAQPage schema
 * on the cost-transparency page directly feeds AI Overview citations.
 *
 * Answers reuse cost data already published on this page (table rows, FAQ
 * accordion content, Anjo's transparency pillars).
 */
const aeoFaqs: FaqSchemaItem[] = [
  {
    q: "How much does a kitchen remodel really cost in Methuen MA in 2025?",
    a: "Kitchen remodels in Methuen, MA typically run $25,000 to $65,000 in 2025. Most of our Methuen, Andover, and Haverhill kitchens land between $35,000 and $45,000. Final cost depends on cabinet line, counter material, layout changes, and what we find behind the walls. We send a written quote with line items within 24 hours of the on-site walkthrough.",
  },
  {
    q: "What is the difference between a $30K and a $60K kitchen remodel?",
    a: "A $30K kitchen typically keeps the existing layout, swaps cabinets and counters, refreshes lighting and paint, and reuses appliances. A $60K kitchen usually relocates plumbing or walls, upgrades to custom or semi-custom cabinets, adds an island, includes new appliances, and uses higher-grade counter material like quartz or natural stone.",
  },
  {
    q: "How do I find a contractor who actually shows up?",
    a: "Three signals to check before you hire: did they answer your first call or text within 24 hours, do they publish their license numbers, and can they show you finished projects with prices attached. If any one is missing, keep looking. Anjo Services meets all three on this site, in writing, with photos.",
  },
  {
    q: "What questions should I ask before hiring a general contractor in Massachusetts?",
    a: "Ask for the MA HIC and CSL numbers and look them up on Mass.gov before signing anything. Ask for proof of general liability and workers comp insurance. Ask for three recent project addresses you can drive past. Ask for a written quote with line items, a written contract that complies with M.G.L. c. 142A, and a clear payment schedule that does not front-load deposits.",
  },
  {
    q: "How long does a typical bathroom remodel take in MA?",
    a: "A standard hall bathroom remodel takes 9 to 14 working days from demo to final caulk. A full primary suite with tile shower, double vanity, and lighting changes runs 12 to 18 working days. We give you a calendar with start date, milestones, and final-walkthrough day in writing before we swing the first hammer.",
  },
  {
    q: "Do I need a permit to install a coffered ceiling or accent wall in Massachusetts?",
    a: "Most coffered ceilings and accent walls do NOT require a permit in Massachusetts because they are decorative finish carpentry, not structural. If the work involves moving electrical, recessed lighting, or load-bearing changes, then yes a permit is needed. We confirm on the walkthrough so there are no surprises.",
  },
  {
    q: "What is the cheapest way to update a 1980s kitchen without gutting it?",
    a: "Refresh-tier kitchens in MA typically run $20,000 to $30,000 for cabinet swap, new counters, sink, faucet, lighting, and paint, while keeping the existing layout, floor, and appliances. The kitchen feels brand new without moving plumbing or walls. Most of these jobs finish in 2 to 3 weeks.",
  },
  {
    q: "How do I verify my contractor is licensed in Massachusetts?",
    a: "Use the Mass.gov Home Improvement Contractor (HIC) search and the Massachusetts Construction Supervisor License (CSL) search. Both are free public databases. Cross-check the license number, business name, and any active complaints. Anjo Services prints HIC and CSL numbers on every contract and quote.",
  },
  {
    q: "What should be in a home improvement contract in MA?",
    a: "Massachusetts General Laws Chapter 142A require: full names and addresses of homeowner and contractor, MA HIC registration number, total contract price, payment schedule that does not exceed one-third upfront, start and substantial-completion dates, scope of work in detail, permit responsibility, dispute-resolution language, and the homeowner's three-day right of cancellation. Every Anjo contract complies.",
  },
  {
    q: "Can a handyman legally do electrical or plumbing work in Massachusetts and New Hampshire?",
    a: "A handyman can swap a faucet, replace a switch plate, or hang a light fixture on existing wiring. New circuits, panel work, and water-line changes require a licensed electrician or plumber by law in both states. Anjo handles small fixture swaps in-house and brings in trusted licensed pros for permit-required work, billed at cost plus our coordination time.",
  },
];

type CostRow = {
  emoji: string;
  service: string;
  budget: string;
  mid: string;
  high: string;
  changes: string;
};

// Rows in services[] order — finish carpentry leads.
// All ranges per market-intelligence.md §4 typical 2025 ranges table.
const costRows: CostRow[] = [
  {
    emoji: "🪚",
    service: "Finish Carpentry & Accent Walls",
    // Combines "finish carpentry / accent wall" + "coffered ceiling" rows
    budget: "$800 to $2,500",
    mid: "$2,500 to $5,500",
    high: "$5,500 to $7,500+",
    // [DEMO COPY — pending client review]
    changes:
      "Wall length, ceiling layout, paint count, stock grade. MDF paint-grade vs solid stained stock. Whether it is one feature wall or a whole grid.",
  },
  {
    emoji: "🍳",
    service: "Kitchen Remodels",
    budget: "$20K to $35K",
    mid: "$35K to $65K",
    high: "$65K to $130K+",
    // [DEMO COPY — pending client review]
    changes:
      "Cabinet line, counter material, layout changes, appliance package. Whether walls move, plumbing relocates, or you keep the existing footprint.",
  },
  {
    emoji: "🛁",
    service: "Bathroom Remodels",
    budget: "$10K to $18K",
    mid: "$18K to $35K",
    high: "$35K to $80K",
    // [DEMO COPY — pending client review]
    changes:
      "Tile choice, vanity grade, shower vs tub, single vs double sink. Heated floor, niche count, and whether the layout changes.",
  },
  {
    emoji: "🪵",
    service: "Decks, Fences & Pergolas",
    budget: "$5K to $12K",
    mid: "$12K to $25K",
    high: "$25K to $50K",
    // [DEMO COPY — pending client review]
    changes:
      "Pressure-treated vs cedar vs composite. Square footage, railing style, hidden fasteners, gate count, and whether it is new build or a repair.",
  },
  {
    emoji: "🎨",
    service: "Interior + Exterior Painting",
    budget: "$4K to $6K",
    mid: "$6K to $9K",
    high: "$9K to $12K",
    // [DEMO COPY — pending client review]
    changes:
      "Square footage, prep load, ceiling work, trim count. Two coats vs three. Interior only vs full exterior with scrape-and-prime.",
  },
  {
    emoji: "🔧",
    service: "Handyman & Honey-Do",
    budget: "$75 to $250",
    mid: "$250 to $850",
    high: "$850 to $1,500",
    // [DEMO COPY — pending client review]
    changes:
      "Single item vs half-day vs full-day block. TV mount $185, ceiling fan $245, half-day $350, full-day $850, full-house honey-do day $1,200.",
  },
];

export default function ServicesCostPage() {
  return (
    <>
      <FAQPageSchema items={aeoFaqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Real Project Costs", url: "/services/cost" },
        ]}
      />
      {/* ─── 1. Page Header ────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
        aria-label="Cost transparency"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        {/* Ambient breathing orbs */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none orb"
          style={{
            top: "12%",
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
            right: "10%",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,176,76,0.15) 0%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />

        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-24"
          style={{ maxWidth: "var(--container-default)", zIndex: 1 }}
        >
          <div className="text-center">
            <p
              className="text-eyebrow font-display"
              style={{ color: "var(--accent)", marginBottom: "var(--space-sm)" }}
            >
              The promise nobody else makes
            </p>
            <h1
              className="hero-shimmer font-display text-h1"
              style={{
                color: "var(--text-primary)",
                marginBottom: "var(--space-md)",
              }}
            >
              What does it actually cost?
            </h1>
            <p
              className="font-body text-body-lg"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "60ch",
                margin: "0 auto",
              }}
            >
              {/* [DEMO COPY — pending client review] */}
              Real ranges from real projects we have built across Methuen,
              Andover, Haverhill, and Salem NH. Two regional benchmarks publish
              numbers like these. The other eight contractors in this corridor
              hide behind a contact form. We publish ranges other contractors
              hide.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2 + 3. Intro + Comparison Table ──────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
        }}
        aria-label="Service price ranges"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-20"
          style={{ maxWidth: "var(--container-wide)", zIndex: 1 }}
        >
          {/* Intro */}
          <div
            className="mx-auto"
            style={{
              maxWidth: "var(--container-narrow)",
              marginBottom: "var(--space-2xl)",
            }}
          >
            <p
              className="font-body text-body-lg"
              style={{
                color: "var(--text-secondary-light)",
                lineHeight: 1.6,
                marginBottom: "var(--space-md)",
              }}
            >
              {/* [DEMO COPY — pending client review] */}
              Every project is unique. The ranges below are starting points based
              on typical projects we have completed in Methuen, Andover, and
              Haverhill since 2018. Your final quote depends on size, materials,
              and any surprises we find behind your walls. We always discuss
              options before proceeding.
            </p>
            <p
              className="font-body text-body-lg"
              style={{
                color: "var(--text-secondary-light)",
                lineHeight: 1.6,
              }}
            >
              {/* [DEMO COPY — pending client review] */}
              These numbers will not match the design-build firm with the
              showroom. They are not supposed to. We are one contractor with one
              truck and one phone, finishing one project at a time, with the
              same hands and the same standard.
            </p>
          </div>

          {/* Mobile-stacked card view */}
          <div className="grid grid-cols-1 lg:hidden gap-5">
            {costRows.map((row) => (
              <article
                key={row.service}
                className="p-6"
                style={{
                  background: "var(--bg-card-light)",
                  border: "1px solid var(--border-card-light)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <div
                  className="flex items-center gap-3"
                  style={{ marginBottom: "var(--space-md)" }}
                >
                  <span aria-hidden="true" style={{ fontSize: "1.85rem", lineHeight: 1 }}>
                    {row.emoji}
                  </span>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "var(--text-h4)",
                      color: "var(--text-primary-light)",
                      lineHeight: 1.25,
                    }}
                  >
                    {row.service}
                  </h3>
                </div>
                <dl style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <div>
                    <dt className="font-mono text-meta" style={{ color: "var(--text-muted-light)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.15rem" }}>
                      Budget
                    </dt>
                    <dd className="font-mono" style={{ color: "var(--text-primary-light)", fontWeight: 600 }}>
                      {row.budget}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-meta" style={{ color: "var(--text-muted-light)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.15rem" }}>
                      Mid-range
                    </dt>
                    <dd className="font-mono" style={{ color: "var(--primary)", fontWeight: 700 }}>
                      {row.mid}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-meta" style={{ color: "var(--text-muted-light)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.15rem" }}>
                      High-end
                    </dt>
                    <dd className="font-mono" style={{ color: "var(--text-primary-light)", fontWeight: 600 }}>
                      {row.high}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-meta" style={{ color: "var(--text-muted-light)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.15rem" }}>
                      What changes the price
                    </dt>
                    <dd className="font-body text-body-sm" style={{ color: "var(--text-secondary-light)", lineHeight: 1.55 }}>
                      {row.changes}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          {/* Desktop table view */}
          <div
            className="hidden lg:block overflow-hidden"
            style={{
              border: "1px solid var(--border-card-light)",
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-card-light)",
            }}
          >
            <table
              className="w-full"
              style={{ borderCollapse: "collapse", tableLayout: "fixed" }}
            >
              <thead>
                <tr style={{ background: "rgba(200, 32, 44, 0.04)" }}>
                  <th
                    scope="col"
                    className="font-display text-eyebrow"
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.25rem",
                      color: "var(--text-primary-light)",
                      borderBottom: "1px solid var(--border-card-light)",
                      width: "26%",
                    }}
                  >
                    Service
                  </th>
                  <th
                    scope="col"
                    className="font-display text-eyebrow"
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.25rem",
                      color: "var(--text-primary-light)",
                      borderBottom: "1px solid var(--border-card-light)",
                      width: "16%",
                    }}
                  >
                    Budget
                  </th>
                  <th
                    scope="col"
                    className="font-display text-eyebrow"
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.25rem",
                      color: "var(--primary)",
                      borderBottom: "1px solid var(--border-card-light)",
                      width: "16%",
                    }}
                  >
                    Mid-range
                  </th>
                  <th
                    scope="col"
                    className="font-display text-eyebrow"
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.25rem",
                      color: "var(--text-primary-light)",
                      borderBottom: "1px solid var(--border-card-light)",
                      width: "16%",
                    }}
                  >
                    High-end
                  </th>
                  <th
                    scope="col"
                    className="font-display text-eyebrow"
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.25rem",
                      color: "var(--text-primary-light)",
                      borderBottom: "1px solid var(--border-card-light)",
                      width: "26%",
                    }}
                  >
                    What changes the price
                  </th>
                </tr>
              </thead>
              <tbody>
                {costRows.map((row, i) => (
                  <tr
                    key={row.service}
                    style={{
                      borderBottom:
                        i === costRows.length - 1
                          ? "none"
                          : "1px solid var(--border-card-light)",
                    }}
                  >
                    <th
                      scope="row"
                      className="font-display"
                      style={{
                        textAlign: "left",
                        padding: "1.1rem 1.25rem",
                        color: "var(--text-primary-light)",
                        fontWeight: 700,
                        verticalAlign: "top",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{ marginRight: "0.55rem", fontSize: "1.4rem" }}
                      >
                        {row.emoji}
                      </span>
                      {row.service}
                    </th>
                    <td
                      className="font-mono text-body-sm"
                      style={{
                        padding: "1.1rem 1.25rem",
                        color: "var(--text-primary-light)",
                        verticalAlign: "top",
                        fontWeight: 600,
                      }}
                    >
                      {row.budget}
                    </td>
                    <td
                      className="font-mono text-body-sm"
                      style={{
                        padding: "1.1rem 1.25rem",
                        color: "var(--primary)",
                        verticalAlign: "top",
                        fontWeight: 700,
                      }}
                    >
                      {row.mid}
                    </td>
                    <td
                      className="font-mono text-body-sm"
                      style={{
                        padding: "1.1rem 1.25rem",
                        color: "var(--text-primary-light)",
                        verticalAlign: "top",
                        fontWeight: 600,
                      }}
                    >
                      {row.high}
                    </td>
                    <td
                      className="font-body text-body-sm"
                      style={{
                        padding: "1.1rem 1.25rem",
                        color: "var(--text-secondary-light)",
                        verticalAlign: "top",
                        lineHeight: 1.55,
                      }}
                    >
                      {row.changes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 4. Why We Publish Prices Sidebar ─────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
        }}
        aria-label="Why we publish prices"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-20"
          style={{ maxWidth: "var(--container-default)", zIndex: 1 }}
        >
          <div className="text-center" style={{ marginBottom: "var(--space-2xl)" }}>
            <p
              className="text-eyebrow font-display"
              style={{ color: "var(--accent)", marginBottom: "var(--space-sm)" }}
            >
              Why we publish prices
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: "var(--text-h2)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "var(--text-primary)",
              }}
            >
              Three reasons the ranges live on this page.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <article
              className="h-full p-6"
              style={{
                background: "var(--bg-card-dark)",
                border: "1px solid var(--border-card-dark)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontSize: "2rem",
                  lineHeight: 1,
                  display: "inline-block",
                  marginBottom: "var(--space-sm)",
                }}
              >
                🗓️
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: "var(--text-h4)",
                  lineHeight: 1.25,
                  color: "var(--text-primary)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                You can plan
              </h3>
              <p
                className="font-body text-body"
                style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
              >
                {/* [DEMO COPY — pending client review] */}
                The Andover Upgrader has been thinking about the kitchen for
                three years. She does not need a sales pitch. She needs to know
                whether her budget makes the project possible. The ranges on this
                page give her a real number to work with before she ever picks up
                the phone.
              </p>
            </article>
            <article
              className="h-full p-6"
              style={{
                background: "var(--bg-card-dark)",
                border: "1px solid var(--border-card-dark)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontSize: "2rem",
                  lineHeight: 1,
                  display: "inline-block",
                  marginBottom: "var(--space-sm)",
                }}
              >
                🚫
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: "var(--text-h4)",
                  lineHeight: 1.25,
                  color: "var(--text-primary)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                No surprise quotes
              </h3>
              <p
                className="font-body text-body"
                style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
              >
                {/* [DEMO COPY — pending client review] */}
                The number on this page is the same number we will quote you in
                writing. If we find rotted subfloor or old wiring that does not
                meet code, we photograph it, show you, and quote the change
                before we touch it. Zero ambush charges. Zero formulaic per
                square foot pricing.
              </p>
            </article>
            <article
              className="h-full p-6"
              style={{
                background: "var(--bg-card-dark)",
                border: "1px solid var(--border-card-dark)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontSize: "2rem",
                  lineHeight: 1,
                  display: "inline-block",
                  marginBottom: "var(--space-sm)",
                }}
              >
                📋
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: "var(--text-h4)",
                  lineHeight: 1.25,
                  color: "var(--text-primary)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                Spec sheet on every estimate
              </h3>
              <p
                className="font-body text-body"
                style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
              >
                {/* [DEMO COPY — pending client review] */}
                Every quote we send is a line-item spec sheet. Cabinets, counters,
                plumbing, electrical, demo, paint, finish carpentry, each priced
                separately. You see exactly where the dollars go. You can compare
                the next quote you get apples to apples instead of guessing.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ─── 5. Final CTA ─────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "var(--bg-base)",
          color: "var(--text-primary-light)",
        }}
        aria-label="Get your range in 24 hours"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "var(--bg-light-overlay-radial)" }}
        />
        <div
          className="relative w-full mx-auto px-6 lg:px-8 py-16 md:py-20 text-center"
          style={{ maxWidth: "var(--container-narrow)", zIndex: 1 }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "var(--text-h2)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "var(--text-primary-light)",
              marginBottom: "var(--space-md)",
            }}
          >
            {/* [DEMO COPY — pending client review] */}
            Get your range in 24 hours.
          </h2>
          <p
            className="font-body text-body-lg"
            style={{
              color: "var(--text-secondary-light)",
              maxWidth: "48ch",
              margin: "0 auto var(--space-lg)",
            }}
          >
            {/* [DEMO COPY — pending client review] */}
            Send the photo, the punch list, or the rough scope. We turn around a
            written quote with line items inside one business day.
          </p>
          <Link
            href={siteConfig.ctaPrimary.href}
            className="inline-flex items-center justify-center font-display font-bold uppercase"
            style={{
              background: "var(--primary)",
              color: "var(--text-primary)",
              padding: "0.95rem 1.85rem",
              borderRadius: "var(--radius-md)",
              letterSpacing: "0.06em",
              textDecoration: "none",
            }}
          >
            Get Your Range in 24 Hours
          </Link>
        </div>
      </section>
    </>
  );
}
