"use client";

/**
 * /service-areas index page — Anjo Services, LLC.
 *
 * Architecture per CLAUDE.md Page Header Standard + Page Wiring Rule +
 * project-prime.md Stage 1E step 19.B.
 *
 * Sections:
 *   1. Page header (Fragment root, dark, hero-shimmer H1, ambient orbs).
 *   2. Coverage strip (state-of-coverage explainer).
 *   3. State-grouped grid: MA cities first, NH cities second. Each card =
 *      city/state, distance, population, intro snippet, → /service-areas/[slug].
 *   4. "Not in our area?" CTA → SMS Tony.
 *
 * Reads: siteConfig + serviceAreas from /data/site.ts (read-only here),
 *        serviceAreaDescriptions from /data/serviceAreaDescriptions.ts (own).
 *
 * URL contract: every card links to /service-areas/[slug] — exact match with
 * Navigation.tsx Service Areas dropdown (Wave 1's territory, do not modify).
 */

import Link from "next/link";
import { siteConfig, serviceAreas } from "@/data/site";
import { serviceAreaDescriptions } from "@/data/serviceAreaDescriptions";
import { FadeUp } from "@/components/animations";

function truncate(s: string, max = 140): string {
  if (!s) return "";
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const last = cut.lastIndexOf(" ");
  return (last > 60 ? cut.slice(0, last) : cut).trimEnd() + "...";
}

export default function ServiceAreasClient() {
  const maCities = serviceAreas.filter((a) => a.state === "MA");
  const nhCities = serviceAreas.filter((a) => a.state === "NH");

  return (
    <>
      {/* ─── Page Header (interior page — Page Header Standard) ────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "var(--primary)" }}
      >
        {/* Ambient breathing orbs */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="orb absolute"
            style={{
              top: "10%",
              left: "8%",
              width: "26rem",
              height: "26rem",
              background:
                "radial-gradient(circle, rgba(232,176,76,0.30) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="orb-2 absolute"
            style={{
              bottom: "5%",
              right: "10%",
              width: "30rem",
              height: "30rem",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
          />
          <div
            className="orb-3 absolute"
            style={{
              top: "40%",
              left: "55%",
              width: "20rem",
              height: "20rem",
              background:
                "radial-gradient(circle, rgba(154,25,34,0.40) 0%, transparent 60%)",
              filter: "blur(45px)",
            }}
          />
        </div>

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
            {siteConfig.baseCity} · {siteConfig.serviceAreaCorridor}
          </p>
          <h1
            className="hero-shimmer font-display text-h1 font-bold"
            style={{
              color: "var(--text-primary)",
              marginBottom: "var(--space-md)",
            }}
          >
            Where we work. North Shore MA + southern NH.
          </h1>
          <p
            className="font-body text-body-lg"
            style={{
              color: "rgba(245,245,242,0.92)",
              maxWidth: "60ch",
            }}
          >
            Nine cities, one truck, one phone. Most jobs are within 20 miles of
            Methuen, no travel fee. Pick your town below to see typical
            projects, pricing, and a city-specific FAQ.
          </p>
        </div>
      </section>

      {/* ─── Coverage explainer strip (light) ───────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-elevated)",
          color: "var(--text-primary-light)",
          paddingTop: "var(--space-2xl)",
          paddingBottom: "var(--space-2xl)",
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
            <p
              className="font-body text-body-lg"
              style={{ color: "var(--text-primary-light)" }}
            >
              Anjo's full coverage area runs across{" "}
              <strong>North Shore MA</strong> and{" "}
              <strong>southern New Hampshire</strong>. If you are within 20
              miles of Methuen, we are likely on your block this week. Not
              sure? Text Tony at{" "}
              <a
                href={siteConfig.smsHref}
                style={{
                  color: "var(--primary)",
                  textDecoration: "underline",
                }}
              >
                {siteConfig.phone}
              </a>{" "}
              and we will tell you on the first reply.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── MA cities grid (dark) ──────────────────────────────────────── */}
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
          style={{ maxWidth: "var(--container-wide)" }}
        >
          <FadeUp>
            <p
              className="text-eyebrow font-display"
              style={{
                color: "var(--accent)",
                marginBottom: "var(--space-2xs)",
              }}
            >
              Massachusetts
            </p>
            <h2
              className="font-display text-h2 font-bold"
              style={{
                color: "var(--text-primary)",
                marginBottom: "var(--space-xl)",
              }}
            >
              North Shore MA cities we serve
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maCities.map((area, i) => (
              <CityCard key={area.slug} area={area} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── NH cities grid (light) ─────────────────────────────────────── */}
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
          style={{ maxWidth: "var(--container-wide)" }}
        >
          <FadeUp>
            <p
              className="text-eyebrow font-display"
              style={{
                color: "var(--primary)",
                marginBottom: "var(--space-2xs)",
              }}
            >
              New Hampshire
            </p>
            <h2
              className="font-display text-h2 font-bold"
              style={{
                color: "var(--text-primary-light)",
                marginBottom: "var(--space-xl)",
              }}
            >
              Southern NH cities we serve
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nhCities.map((area, i) => (
              <CityCard key={area.slug} area={area} index={i} variant="light" />
            ))}
          </div>
        </div>
      </section>

      {/* ─── "Not in our area?" CTA (dark, single bottom conversion) ────── */}
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
          className="relative z-10 mx-auto px-6 lg:px-8 text-center"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <FadeUp>
            <h2
              className="font-display text-h2 font-bold"
              style={{
                color: "var(--text-primary)",
                marginBottom: "var(--space-md)",
              }}
            >
              Not seeing your town listed?
            </h2>
            <p
              className="font-body text-body-lg"
              style={{
                color: "var(--text-secondary)",
                marginBottom: "var(--space-lg)",
              }}
            >
              The list above is the regular weekly schedule. If you are within
              20 miles of Methuen, the answer is almost always yes. Text Tony,
              tell him your town and the project, and you will get a real reply
              from a real human, not an auto-responder.
            </p>
            <a
              href={siteConfig.smsHref}
              className="inline-flex items-center justify-center font-display font-bold uppercase"
              style={{
                background: "var(--primary)",
                color: "var(--text-primary)",
                padding: "0.875rem 1.5rem",
                borderRadius: "var(--radius-md)",
                letterSpacing: "0.06em",
              }}
            >
              💬 Text Tony to ask: {siteConfig.phone}
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

/* ─── CityCard ────────────────────────────────────────────────────────── */

type AreaShape = (typeof serviceAreas)[number];

function CityCard({
  area,
  index,
  variant = "dark",
}: {
  area: AreaShape;
  index: number;
  variant?: "dark" | "light";
}) {
  const desc = serviceAreaDescriptions[area.slug];
  const intro = desc?.intro || area.description;

  const cardStyle =
    variant === "dark"
      ? {
          background: "var(--bg-card-dark)",
          border: "1px solid var(--border-card-dark)",
          color: "var(--text-primary)",
        }
      : {
          background: "var(--bg-card-light)",
          border: "1px solid var(--border-card-light)",
          color: "var(--text-primary-light)",
        };

  const subColor =
    variant === "dark" ? "var(--text-secondary)" : "var(--text-secondary-light)";
  const metaColor =
    variant === "dark" ? "var(--text-muted)" : "var(--text-muted-light)";

  return (
    <FadeUp delay={(index % 3) * 0.06}>
      <Link
        href={`/service-areas/${area.slug}`}
        className="group block h-full"
        aria-label={`${area.city}, ${area.state} service area`}
      >
        <div
          className="h-full p-6 lg:p-7 transition-transform"
          style={{
            ...cardStyle,
            borderRadius: "var(--radius-lg)",
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="text-xl">
                📍
              </span>
              <h3
                className="font-display font-bold"
                style={{ fontSize: "var(--text-h3)" }}
              >
                {area.city}, {area.state}
              </h3>
            </div>
            <span
              aria-hidden="true"
              className="font-display font-bold transition-transform group-hover:translate-x-1"
              style={{ color: "var(--primary)" }}
            >
              →
            </span>
          </div>

          <div
            className="flex items-center gap-3 font-mono mb-3"
            style={{
              color: metaColor,
              fontSize: "var(--text-meta)",
            }}
          >
            <span>{area.distance} from Methuen</span>
            <span aria-hidden="true">·</span>
            <span>Pop. {area.population.toLocaleString()}</span>
          </div>

          <p
            className="font-body"
            style={{
              color: subColor,
              fontSize: "var(--text-body-sm)",
              lineHeight: 1.55,
            }}
          >
            {truncate(intro, 160)}
          </p>
        </div>
      </Link>
    </FadeUp>
  );
}
