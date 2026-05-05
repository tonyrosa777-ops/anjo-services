"use client";

/**
 * QuizCTA — homepage section #8 (light tone).
 *
 * Mid-page conversion nudge. Different format from hero CTA — journey
 * framing, not direct booking. Links to /quiz, never inlines the quiz.
 *
 * CLAUDE.md Always-Built Features Rule §Interactive Quiz: "Homepage CTA
 * block: full section that launches the quiz (links to /quiz page — not
 * inline)". And Homepage Section Architecture Rule purpose-level dedup:
 * Quiz CTA (mid-page conversion, journey format) is distinct from the
 * Booking Calendar Teaser (final direct conversion).
 */

import Link from "next/link";
import { FadeUp } from "@/components/animations";

export default function QuizCTA() {
  return (
    <section
      className="surface-light"
      data-motion="breathe"
      data-texture="paper"
      style={{
        paddingTop: "var(--space-3xl)",
        paddingBottom: "var(--space-3xl)",
      }}
      aria-label="Take the Anjo Quiz"
    >
      <div
        className="surface-content mx-auto px-6 lg:px-8"
        style={{ maxWidth: "var(--container-default)" }}
      >
        <div
          className="mx-auto rounded-lg overflow-hidden"
          style={{
            background: "var(--bg-card-light)",
            border: "1px solid var(--border-card-light)",
            maxWidth: "var(--container-narrow)",
            padding: "var(--space-2xl) var(--space-xl)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.08)",
          }}
        >
          <FadeUp>
            <div className="text-center">
              <p
                className="font-display uppercase"
                style={{
                  color: "var(--primary)",
                  fontSize: "var(--text-eyebrow)",
                  letterSpacing: "0.2em",
                  marginBottom: "var(--space-md)",
                }}
              >
                Not Sure Where to Start?
              </p>
              <h2
                className="font-display font-black"
                style={{
                  color: "var(--text-primary-light)",
                  fontSize: "var(--text-h2)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "var(--space-md)",
                }}
              >
                Find the right Anjo service for your home.
              </h2>
              <p
                className="font-body mx-auto"
                style={{
                  color: "var(--text-secondary-light)",
                  fontSize: "var(--text-body-lg)",
                  lineHeight: 1.55,
                  maxWidth: "52ch",
                  marginBottom: "var(--space-2xs)",
                }}
              >
                Six quick questions. Tap an answer, the next question slides in.
              </p>
              <p
                className="font-body mx-auto"
                style={{
                  color: "var(--text-secondary-light)",
                  fontSize: "var(--text-body-lg)",
                  lineHeight: 1.55,
                  maxWidth: "52ch",
                  marginBottom: "var(--space-2xs)",
                }}
              >
                The result tells you which service fits, what it usually costs in
                this corridor, and the next step.
              </p>
              <p
                className="font-body mx-auto"
                style={{
                  color: "var(--text-secondary-light)",
                  fontSize: "var(--text-body-lg)",
                  lineHeight: 1.55,
                  maxWidth: "52ch",
                  marginBottom: "var(--space-xl)",
                }}
              >
                No email required. No spam. About 60 seconds.
              </p>

              <Link
                href="/quiz"
                className="inline-flex items-center justify-center font-display font-bold uppercase rounded-md"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-primary)",
                  padding: "1rem 2rem",
                  fontSize: "var(--text-eyebrow)",
                  letterSpacing: "0.1em",
                  boxShadow: "0 12px 32px rgba(200, 32, 44, 0.28)",
                  transition: "background 200ms ease, transform 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--primary-muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--primary)";
                }}
              >
                Take the 6-Question Quiz →
              </Link>

              {/* Trust micro-strip */}
              <div
                className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono"
                style={{
                  color: "var(--text-muted-light)",
                  fontSize: "var(--text-meta)",
                  marginTop: "var(--space-lg)",
                }}
              >
                <span className="flex items-center gap-1.5">
                  <span aria-hidden="true">⚡</span>
                  60 second answer
                </span>
                <span className="flex items-center gap-1.5">
                  <span aria-hidden="true">🔒</span>
                  No email gate
                </span>
                <span className="flex items-center gap-1.5">
                  <span aria-hidden="true">📋</span>
                  Personalized result
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
