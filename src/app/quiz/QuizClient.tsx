"use client";

/**
 * QuizClient — 3-phase scored quiz UI.
 *
 * Pattern #29 (decoupled data + UI quiz):
 *   - Data layer: /data/quiz.ts (QUIZ_RESULTS + scoreQuiz)
 *   - Question content: /data/site.ts quizSteps[]
 *   - This file is the UI layer only.
 *
 * Phases via single `phase` state:
 *   1. intro      — hook headline + Start CTA
 *   2. question   — quizSteps rendered one at a time via questionIndex
 *                   - 400ms pendingAnswer glow + auto-advance
 *                   - Last question: 400ms timeout -> scoreQuiz -> results
 *                   - Back link on Q2+ slices answers array
 *                   - direction (1 or -1) drives AnimatePresence x-offset
 *   3. results    — QUIZ_RESULTS[resultType] + recommended service link +
 *                   <BookingCalendar /> inline (NEVER a link to /booking)
 *
 * 'use client' is the FIRST token (Error #9). Eases use the as-const tuple
 * form (Error #8b — never the string Variants form).
 */

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { quizSteps, siteConfig } from "@/data/site";
import {
  QUIZ_RESULTS,
  scoreQuiz,
  type QuizType,
} from "@/data/quiz";
import BookingCalendar from "@/components/BookingCalendar";

const easeOut = [0, 0, 0.2, 1] as const;
const PENDING_GLOW_MS = 400;

type Phase = "intro" | "question" | "results";

const slideV: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir * 60,
    transition: { duration: 0.3, ease: easeOut },
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir * -60,
    transition: { duration: 0.25, ease: easeOut },
  }),
};

export default function QuizClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizType[]>([]);
  const [pendingAnswer, setPendingAnswer] = useState<{
    qIndex: number;
    optionIndex: number;
  } | null>(null);
  const [direction, setDirection] = useState(1);
  const [resultType, setResultType] = useState<QuizType | null>(null);

  const totalQuestions = quizSteps.length;

  const handleStart = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setDirection(1);
    setPhase("question");
  };

  const handleAnswer = (optionIndex: number) => {
    if (pendingAnswer) return; // already animating

    const step = quizSteps[questionIndex];
    if (!step) return;
    const chosen = step.options[optionIndex];
    if (!chosen) return;

    // 400ms pendingAnswer glow + auto-advance
    setPendingAnswer({ qIndex: questionIndex, optionIndex });

    window.setTimeout(() => {
      const newAnswers = [...answers.slice(0, questionIndex), chosen.type];
      setAnswers(newAnswers);
      setPendingAnswer(null);

      const isLast = questionIndex === totalQuestions - 1;
      if (isLast) {
        const finalType = scoreQuiz(newAnswers);
        setResultType(finalType);
        setDirection(1);
        setPhase("results");
      } else {
        setDirection(1);
        setQuestionIndex(questionIndex + 1);
      }
    }, PENDING_GLOW_MS);
  };

  const handleBack = () => {
    if (pendingAnswer) return;
    if (questionIndex === 0) return;
    setDirection(-1);
    // Slice answers to discard future answers — back navigation re-highlights
    // the saved answer for the previous question.
    const newQ = questionIndex - 1;
    setAnswers(answers.slice(0, newQ));
    setQuestionIndex(newQ);
  };

  const restart = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setResultType(null);
    setDirection(1);
    setPhase("intro");
  };

  return (
    <div
      className="relative w-full"
      style={{
        background: "var(--bg-base)",
        color: "var(--text-primary-light)",
        minHeight: "calc(100vh - 6rem)",
      }}
    >
      {/* Ambient orb backdrop — interior page ambient effects rule */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--bg-light-overlay-radial)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div
          className="orb absolute"
          style={{
            top: "-10%",
            right: "-15%",
            width: "55%",
            height: "60%",
            background:
              "radial-gradient(ellipse at center, rgba(200, 32, 44, 0.10) 0%, transparent 65%)",
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
              "radial-gradient(ellipse at center, rgba(232, 176, 76, 0.10) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div
        className="relative mx-auto px-6 lg:px-8 py-12 md:py-20"
        style={{ maxWidth: "var(--container-narrow)", zIndex: 10 }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {phase === "intro" && (
            <motion.div
              key="intro"
              custom={direction}
              variants={slideV}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-center"
            >
              <p
                className="font-display uppercase"
                style={{
                  color: "var(--primary)",
                  fontSize: "var(--text-eyebrow)",
                  letterSpacing: "0.16em",
                  marginBottom: "var(--space-md)",
                }}
              >
                Six Quick Questions
              </p>
              <h1
                className="font-display font-black"
                style={{
                  color: "var(--text-primary-light)",
                  fontSize: "var(--text-h1)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  marginBottom: "var(--space-md)",
                }}
              >
                Find the right Anjo service for your home.
              </h1>
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
                No email required. Tap an answer, the next question slides in.
                The result tells you which Anjo service fits, what it usually
                costs in this corridor, and the next step. Takes about 60
                seconds.
              </p>
              <button
                type="button"
                onClick={handleStart}
                className="inline-flex items-center justify-center font-display font-bold uppercase rounded-md"
                style={{
                  background: "var(--primary)",
                  color: "var(--text-primary)",
                  padding: "1rem 2rem",
                  fontSize: "var(--text-eyebrow)",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  boxShadow: "0 12px 32px rgba(200, 32, 44, 0.28)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--primary-muted)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--primary)";
                }}
              >
                Start the Quiz
              </button>
              <p
                className="font-mono mt-6"
                style={{
                  color: "var(--text-muted-light)",
                  fontSize: "var(--text-meta)",
                }}
              >
                Prefer to text Tony directly? {siteConfig.phone}.
              </p>
            </motion.div>
          )}

          {phase === "question" &&
            (() => {
              const step = quizSteps[questionIndex];
              if (!step) return null;
              return (
                <motion.div
                  key={`q-${questionIndex}`}
                  custom={direction}
                  variants={slideV}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* Progress + back */}
                  <div
                    className="flex items-center justify-between"
                    style={{ marginBottom: "var(--space-lg)" }}
                  >
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={questionIndex === 0 || !!pendingAnswer}
                      className="inline-flex items-center font-display uppercase rounded-md"
                      style={{
                        background: "transparent",
                        color:
                          questionIndex === 0
                            ? "var(--text-muted-light)"
                            : "var(--primary)",
                        padding: "0.5rem 0.75rem",
                        fontSize: "var(--text-eyebrow)",
                        letterSpacing: "0.08em",
                        border: "1px solid var(--border-card-light)",
                        cursor:
                          questionIndex === 0 ? "not-allowed" : "pointer",
                        opacity: questionIndex === 0 ? 0.4 : 1,
                      }}
                    >
                      ‹ Back
                    </button>
                    <p
                      className="font-mono"
                      style={{
                        color: "var(--text-muted-light)",
                        fontSize: "var(--text-meta)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {questionIndex + 1} / {totalQuestions}
                    </p>
                  </div>

                  <h2
                    className="font-display font-black"
                    style={{
                      color: "var(--text-primary-light)",
                      fontSize: "var(--text-h2)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                      marginBottom: "var(--space-lg)",
                    }}
                  >
                    {step.question}
                  </h2>

                  <ul className="grid grid-cols-1 gap-3">
                    {step.options.map((opt, i) => {
                      const isPending =
                        pendingAnswer &&
                        pendingAnswer.qIndex === questionIndex &&
                        pendingAnswer.optionIndex === i;
                      const isDimmed =
                        pendingAnswer &&
                        pendingAnswer.qIndex === questionIndex &&
                        pendingAnswer.optionIndex !== i;
                      const savedTypeForThisQ = answers[questionIndex];
                      const isSavedAnswer =
                        !pendingAnswer && savedTypeForThisQ === opt.type;
                      return (
                        <li key={`${questionIndex}-${i}`}>
                          <button
                            type="button"
                            onClick={() => handleAnswer(i)}
                            disabled={!!pendingAnswer}
                            className="w-full text-left flex items-center gap-4 rounded-lg transition-all"
                            style={{
                              background: isPending
                                ? "var(--primary)"
                                : isSavedAnswer
                                  ? "var(--primary-soft)"
                                  : "var(--bg-card-light)",
                              color: isPending
                                ? "var(--text-primary)"
                                : "var(--text-primary-light)",
                              border: isPending
                                ? "1.5px solid var(--primary)"
                                : isSavedAnswer
                                  ? "1.5px solid var(--primary)"
                                  : "1px solid var(--border-card-light)",
                              padding: "var(--space-sm) var(--space-md)",
                              cursor: pendingAnswer ? "default" : "pointer",
                              opacity: isDimmed ? 0.3 : 1,
                              boxShadow: isPending
                                ? "0 0 24px rgba(200, 32, 44, 0.45)"
                                : "none",
                              transition:
                                "background 200ms ease, opacity 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
                            }}
                            onMouseEnter={(e) => {
                              if (!pendingAnswer && !isSavedAnswer) {
                                e.currentTarget.style.borderColor =
                                  "var(--primary)";
                                e.currentTarget.style.background =
                                  "var(--primary-soft)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!pendingAnswer && !isSavedAnswer) {
                                e.currentTarget.style.borderColor =
                                  "var(--border-card-light)";
                                e.currentTarget.style.background =
                                  "var(--bg-card-light)";
                              }
                            }}
                          >
                            <span
                              aria-hidden="true"
                              className="flex-shrink-0"
                              style={{
                                fontSize: "1.75rem",
                                lineHeight: 1,
                              }}
                            >
                              {opt.emoji}
                            </span>
                            <span
                              className="font-display font-bold"
                              style={{
                                fontSize: "var(--text-body-lg)",
                                letterSpacing: "0.01em",
                              }}
                            >
                              {opt.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })()}

          {phase === "results" && resultType && (
            <motion.div
              key="results"
              custom={direction}
              variants={slideV}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <ResultsView
                resultType={resultType}
                onRestart={restart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Results view ────────────────────────────────────────────────────── */

function ResultsView({
  resultType,
  onRestart,
}: {
  resultType: QuizType;
  onRestart: () => void;
}) {
  const result = QUIZ_RESULTS[resultType];

  return (
    <>
      <div className="text-center" style={{ marginBottom: "var(--space-lg)" }}>
        <p
          className="font-display uppercase"
          style={{
            color: "var(--primary)",
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "0.16em",
            marginBottom: "var(--space-sm)",
          }}
        >
          Your Result
        </p>
        <h2
          className="font-display font-black"
          style={{
            color: "var(--text-primary-light)",
            fontSize: "var(--text-h1)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-2xs)",
          }}
        >
          {result.name}
        </h2>
        <p
          className="font-body"
          style={{
            color: "var(--text-secondary-light)",
            fontSize: "var(--text-body-lg)",
            lineHeight: 1.5,
            fontStyle: "italic",
          }}
        >
          {result.tagline}
        </p>
      </div>

      <div
        className="rounded-lg"
        style={{
          background: "var(--bg-card-light)",
          border: "1px solid var(--border-card-light)",
          padding: "var(--space-lg)",
          marginBottom: "var(--space-xl)",
        }}
      >
        {result.body.map((para, i) => (
          <p
            key={i}
            className="font-body"
            style={{
              color: "var(--text-primary-light)",
              fontSize: "var(--text-body)",
              lineHeight: 1.6,
              marginBottom:
                i === result.body.length - 1 ? 0 : "var(--space-md)",
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Recommended service card */}
      <div
        className="rounded-lg"
        style={{
          background: "var(--primary)",
          color: "var(--text-primary)",
          padding: "var(--space-lg)",
          marginBottom: "var(--space-xl)",
        }}
      >
        <p
          className="font-display uppercase"
          style={{
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "0.12em",
            opacity: 0.85,
            marginBottom: "var(--space-2xs)",
          }}
        >
          Recommended for you
        </p>
        <h3
          className="font-display font-black"
          style={{
            fontSize: "var(--text-h3)",
            letterSpacing: "-0.01em",
            marginBottom: "var(--space-sm)",
          }}
        >
          {result.recommendedService.name}
        </h3>
        <p
          className="font-body"
          style={{
            fontSize: "var(--text-body)",
            lineHeight: 1.55,
            marginBottom: "var(--space-md)",
            opacity: 0.92,
          }}
        >
          {result.recommendedService.reason}
        </p>
        <Link
          href={`/services/${result.recommendedService.slug}`}
          className="inline-flex items-center justify-center font-display font-bold uppercase rounded-md"
          style={{
            background: "var(--text-primary)",
            color: "var(--primary)",
            padding: "0.75rem 1.25rem",
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "0.08em",
          }}
        >
          Read more about this service →
        </Link>
      </div>

      {/* Inline BookingCalendar — NEVER a link to /booking. The user is at
          peak motivation here; the calendar is the next click. */}
      <div style={{ marginBottom: "var(--space-xl)" }}>
        <div className="text-center" style={{ marginBottom: "var(--space-lg)" }}>
          <h3
            className="font-display font-black"
            style={{
              color: "var(--text-primary-light)",
              fontSize: "var(--text-h2)",
              letterSpacing: "-0.01em",
              marginBottom: "var(--space-2xs)",
            }}
          >
            Want to walk it through with Tony?
          </h3>
          <p
            className="font-body"
            style={{
              color: "var(--text-secondary-light)",
              fontSize: "var(--text-body-lg)",
            }}
          >
            Pick a window. Free 30 minute walkthrough, written quote in 24 hours.
          </p>
        </div>
        <BookingCalendar />
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center font-display uppercase rounded-md"
          style={{
            background: "transparent",
            color: "var(--text-secondary-light)",
            padding: "0.625rem 1rem",
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "0.08em",
            border: "1px solid var(--border-card-light)",
            cursor: "pointer",
          }}
        >
          ↺ Retake the quiz
        </button>
      </div>
    </>
  );
}
