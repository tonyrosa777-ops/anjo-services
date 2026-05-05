"use client";

/**
 * BookingCalendar — Anjo Services custom-branded calendar.
 *
 * CLAUDE.md Always-Built Features Rule §Inline Booking Calendar:
 *   - Custom-built UI (not a Calendly iframe)
 *   - Calls Calendly API server-side via /api/calendly/slots and /api/calendly/book
 *   - Demo fallback (Pattern #25): seeded availability via deterministic hash
 *     when CALENDLY_API_KEY is not set (API returns 503)
 *   - Pattern #54 conversion-first audit: NO native pre-pickers above the
 *     calendar. Date + time + confirm in ONE flow.
 *   - Pattern #55: renders its own solid surface — does not rely on a
 *     translucent Card variant.
 *
 * Component is reusable: lives on /booking, /quiz results, and homepage
 * BookingTeaser. Brand tokens via CSS custom props (var(--primary), etc.).
 *
 * 'use client' is the FIRST token in the file (Error #9). Eases use the
 * `[0, 0, 0.2, 1] as const` cubic-bezier tuple form (Error #8b).
 */

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { siteConfig } from "@/data/site";

const easeOut = [0, 0, 0.2, 1] as const;

type Step = "date" | "time" | "confirm" | "done";

type FormState = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const fadeV: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeOut },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: easeOut } },
};

/* ─── Date helpers (no library, deterministic across SSR/CSR) ──────────── */

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  const out = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return out;
}

/**
 * Deterministic seeded fallback for demo mode (Pattern #25).
 * Uses (year * 400 + month * 31 + day) % 10 to map a date to a 0-5 slot count.
 * Same input always gives same output, so the calendar feels real across
 * page loads and reloads.
 */
function seededSlotsForDate(d: Date): string[] {
  const key = d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate();
  const bucket = key % 10;
  // Buckets 0-1 = booked solid (0 slots). Bucket 2 = 1 slot. Etc up to 5.
  let count = 0;
  if (bucket >= 2) count = Math.min(5, bucket - 1);
  if (count === 0) return [];

  // Walkthrough windows Tony actually offers. Realistic, not 9-to-5 corporate.
  const allWindows = [
    "8:00 AM",
    "10:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:30 PM",
  ];
  // Rotate the starting offset by date so different dates give different
  // slot mixes, not always the same first N.
  const offset = (d.getDate() + d.getMonth()) % allWindows.length;
  const windows: string[] = [];
  for (let i = 0; i < count; i++) {
    windows.push(allWindows[(offset + i) % allWindows.length]);
  }
  // Sort by hour for visual order
  return windows.sort((a, b) => parseTime(a) - parseTime(b));
}

function parseTime(label: string): number {
  // "8:00 AM" -> 800. "12:00 PM" -> 1200. "6:30 PM" -> 1830.
  const [time, mer] = label.split(" ");
  const [hStr, mStr] = time.split(":");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (mer === "PM" && h !== 12) h += 12;
  if (mer === "AM" && h === 12) h = 0;
  return h * 100 + m;
}

/* ─── Month grid helpers ──────────────────────────────────────────────── */

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Cell = { date: Date; inMonth: boolean };

function buildMonthGrid(viewYear: number, viewMonth: number): Cell[] {
  const first = new Date(viewYear, viewMonth, 1);
  const startWeekday = first.getDay(); // 0-6, Sun-first
  const startDate = new Date(viewYear, viewMonth, 1 - startWeekday);
  const cells: Cell[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    cells.push({ date: d, inMonth: d.getMonth() === viewMonth });
  }
  return cells;
}

/* ─── Component ────────────────────────────────────────────────────────── */

export type BookingCalendarProps = {
  /** Optional heading rendered above the calendar (small variant only). */
  heading?: string;
  /** Optional sub-copy. */
  subcopy?: string;
  /** Compact rendering (e.g. homepage teaser) — narrower max width. */
  compact?: boolean;
};

export default function BookingCalendar({
  heading,
  subcopy,
  compact = false,
}: BookingCalendarProps) {
  const [today, setToday] = useState<Date | null>(null);
  const [viewYear, setViewYear] = useState<number>(0);
  const [viewMonth, setViewMonth] = useState<number>(0);
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[] | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmationId, setConfirmationId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Init "today" on the client only — avoids SSR/CSR drift across midnight.
  useEffect(() => {
    const now = startOfDay(new Date());
    setToday(now);
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
  }, []);

  const cells = useMemo(
    () => (today ? buildMonthGrid(viewYear, viewMonth) : []),
    [today, viewYear, viewMonth],
  );

  const minSelectable = today;
  const maxSelectable = useMemo(() => {
    if (!today) return null;
    const m = new Date(today);
    m.setMonth(m.getMonth() + 3); // 3 months forward
    return m;
  }, [today]);

  const canPrev = useMemo(() => {
    if (!today) return false;
    return (
      viewYear > today.getFullYear() ||
      (viewYear === today.getFullYear() && viewMonth > today.getMonth())
    );
  }, [today, viewYear, viewMonth]);

  const canNext = useMemo(() => {
    if (!maxSelectable) return false;
    return (
      viewYear < maxSelectable.getFullYear() ||
      (viewYear === maxSelectable.getFullYear() &&
        viewMonth < maxSelectable.getMonth())
    );
  }, [maxSelectable, viewYear, viewMonth]);

  const goPrev = () => {
    if (!canPrev) return;
    const m = viewMonth - 1;
    if (m < 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(m);
    }
  };
  const goNext = () => {
    if (!canNext) return;
    const m = viewMonth + 1;
    if (m > 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(m);
    }
  };

  // Fetch slots when a date is selected (with seeded fallback on 503).
  useEffect(() => {
    if (!selectedDate) return;
    let cancelled = false;
    setSlots(null);
    setSlotsError(null);
    setSlotsLoading(true);
    const key = dateKey(selectedDate);
    fetch(`/api/calendly/slots?date=${key}`)
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 503) {
          // No API key configured — deterministic seeded fallback.
          setSlots(seededSlotsForDate(selectedDate));
          return;
        }
        if (!res.ok) {
          throw new Error(`Slots request failed (${res.status})`);
        }
        const data = (await res.json()) as { slots?: string[] };
        setSlots(Array.isArray(data.slots) ? data.slots : []);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        // Last-resort fallback: seeded — never leave user with a blank state.
        setSlots(seededSlotsForDate(selectedDate));
        setSlotsError(
          err instanceof Error ? err.message : "Could not reach scheduler.",
        );
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  const handleSelectDate = (d: Date) => {
    if (!minSelectable || !maxSelectable) return;
    const day = startOfDay(d);
    if (day < minSelectable || day > maxSelectable) return;
    setSelectedDate(day);
    setSelectedTime(null);
    setStep("time");
  };

  const handleSelectTime = (t: string) => {
    setSelectedTime(t);
    setStep("confirm");
  };

  const handleBack = () => {
    if (step === "time") {
      setStep("date");
      setSelectedDate(null);
      setSelectedTime(null);
      setSlots(null);
    } else if (step === "confirm") {
      setStep("time");
      setSelectedTime(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/calendly/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: dateKey(selectedDate),
          time: selectedTime,
          name: form.name,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        confirmationId?: string;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error || `Booking failed (${res.status})`);
      }
      setConfirmationId(data.confirmationId || `ANJO-${Date.now()}`);
      setStep("done");
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not submit booking.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!today) {
    // SSR-safe placeholder. Same height envelope so layout doesn't jump.
    return (
      <div
        className="w-full rounded-lg"
        style={{
          background: "var(--bg-card-light)",
          border: "1px solid var(--border-card-light)",
          minHeight: compact ? "320px" : "560px",
          maxWidth: compact ? "560px" : "720px",
          margin: "0 auto",
        }}
        aria-busy="true"
      />
    );
  }

  const monthLabel = `${MONTH_LABELS[viewMonth]} ${viewYear}`;

  return (
    <div
      className="w-full"
      style={{
        maxWidth: compact ? "560px" : "720px",
        margin: "0 auto",
      }}
    >
      {(heading || subcopy) && (
        <div className="text-center" style={{ marginBottom: "var(--space-md)" }}>
          {heading && (
            <h3
              className="font-display font-bold"
              style={{
                color: "var(--text-primary-light)",
                fontSize: "var(--text-h3)",
                letterSpacing: "-0.01em",
              }}
            >
              {heading}
            </h3>
          )}
          {subcopy && (
            <p
              className="font-body"
              style={{
                color: "var(--text-secondary-light)",
                fontSize: "var(--text-body)",
                marginTop: "var(--space-2xs)",
              }}
            >
              {subcopy}
            </p>
          )}
        </div>
      )}

      {/* Pattern #55: solid card surface — never relies on a translucent
          parent. Works on dark, light, or gradient sections. */}
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          background: "var(--bg-card-light)",
          border: "1px solid var(--border-card-light)",
          boxShadow: "0 18px 48px rgba(0, 0, 0, 0.12)",
        }}
      >
        {/* Step indicator strip */}
        <div
          className="flex items-center justify-between px-5 py-3 font-display uppercase"
          style={{
            background: "var(--bg-elevated)",
            borderBottom: "1px solid var(--border-card-light)",
            color: "var(--text-secondary-light)",
            fontSize: "var(--text-eyebrow)",
            letterSpacing: "0.12em",
          }}
        >
          <span>
            <span aria-hidden="true">📅</span> Schedule a Walkthrough
          </span>
          <span style={{ color: "var(--text-muted-light)" }}>
            {step === "date" && "Step 1 of 3"}
            {step === "time" && "Step 2 of 3"}
            {step === "confirm" && "Step 3 of 3"}
            {step === "done" && "Confirmed"}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {step === "date" && (
            <motion.div
              key="date-step"
              variants={fadeV}
              initial="hidden"
              animate="show"
              exit="exit"
              className="p-5 md:p-6"
            >
              {/* Month nav */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={!canPrev}
                  aria-label="Previous month"
                  className="inline-flex items-center justify-center rounded-md font-display"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    background: canPrev ? "var(--primary-soft)" : "transparent",
                    color: canPrev
                      ? "var(--primary)"
                      : "var(--text-muted-light)",
                    border: "1px solid var(--border-card-light)",
                    cursor: canPrev ? "pointer" : "not-allowed",
                    opacity: canPrev ? 1 : 0.5,
                  }}
                >
                  <span aria-hidden="true">‹</span>
                </button>
                <p
                  className="font-display font-bold"
                  style={{
                    color: "var(--text-primary-light)",
                    fontSize: "var(--text-h4)",
                    letterSpacing: "-0.01em",
                  }}
                  aria-live="polite"
                >
                  {monthLabel}
                </p>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canNext}
                  aria-label="Next month"
                  className="inline-flex items-center justify-center rounded-md font-display"
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    background: canNext ? "var(--primary-soft)" : "transparent",
                    color: canNext
                      ? "var(--primary)"
                      : "var(--text-muted-light)",
                    border: "1px solid var(--border-card-light)",
                    cursor: canNext ? "pointer" : "not-allowed",
                    opacity: canNext ? 1 : 0.5,
                  }}
                >
                  <span aria-hidden="true">›</span>
                </button>
              </div>

              {/* Day labels */}
              <div
                className="grid grid-cols-7 gap-1 mb-2 font-display uppercase"
                style={{
                  color: "var(--text-muted-light)",
                  fontSize: "var(--text-meta)",
                  letterSpacing: "0.1em",
                }}
                aria-hidden="true"
              >
                {DAY_LABELS.map((d) => (
                  <div key={d} className="text-center py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div
                role="grid"
                aria-label={`${monthLabel} calendar`}
                className="grid grid-cols-7 gap-1"
              >
                {cells.map((cell, i) => {
                  const isPast = minSelectable
                    ? cell.date < minSelectable
                    : false;
                  const isFuture = maxSelectable
                    ? cell.date > maxSelectable
                    : false;
                  const isToday = today
                    ? isSameDay(cell.date, today)
                    : false;
                  const isSelected =
                    selectedDate && isSameDay(cell.date, selectedDate);
                  const disabled = isPast || isFuture || !cell.inMonth;
                  return (
                    <button
                      key={i}
                      type="button"
                      role="gridcell"
                      disabled={disabled}
                      onClick={() => handleSelectDate(cell.date)}
                      aria-label={cell.date.toDateString()}
                      aria-current={isToday ? "date" : undefined}
                      className="relative aspect-square rounded-md font-body transition-colors"
                      style={{
                        background: isSelected
                          ? "var(--primary)"
                          : disabled
                            ? "transparent"
                            : "var(--bg-elevated)",
                        color: isSelected
                          ? "var(--text-primary)"
                          : disabled
                            ? "var(--text-muted-light)"
                            : "var(--text-primary-light)",
                        border: isToday
                          ? "1.5px solid var(--primary)"
                          : "1px solid transparent",
                        opacity: !cell.inMonth ? 0.25 : isPast ? 0.35 : 1,
                        cursor: disabled ? "not-allowed" : "pointer",
                        fontSize: "var(--text-body-sm)",
                        fontWeight: isSelected ? 700 : 500,
                      }}
                      onMouseEnter={(e) => {
                        if (!disabled && !isSelected) {
                          e.currentTarget.style.background =
                            "var(--primary-soft)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!disabled && !isSelected) {
                          e.currentTarget.style.background =
                            "var(--bg-elevated)";
                        }
                      }}
                    >
                      {cell.date.getDate()}
                    </button>
                  );
                })}
              </div>

              <p
                className="mt-4 font-mono"
                style={{
                  color: "var(--text-muted-light)",
                  fontSize: "var(--text-meta)",
                  textAlign: "center",
                }}
              >
                Showing the next 3 months. Tap a date to see open windows.
              </p>
            </motion.div>
          )}

          {step === "time" && selectedDate && (
            <motion.div
              key="time-step"
              variants={fadeV}
              initial="hidden"
              animate="show"
              exit="exit"
              className="p-5 md:p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center font-display uppercase rounded-md"
                  style={{
                    background: "transparent",
                    color: "var(--primary)",
                    padding: "0.5rem 0.75rem",
                    fontSize: "var(--text-eyebrow)",
                    letterSpacing: "0.08em",
                    border: "1px solid var(--border-card-light)",
                  }}
                  aria-label="Back to date selection"
                >
                  ‹ Back
                </button>
                <p
                  className="font-display font-bold"
                  style={{
                    color: "var(--text-primary-light)",
                    fontSize: "var(--text-h4)",
                  }}
                >
                  {selectedDate.toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {slotsLoading && (
                <p
                  className="font-mono text-center"
                  style={{
                    color: "var(--text-muted-light)",
                    fontSize: "var(--text-body-sm)",
                    padding: "var(--space-lg) 0",
                  }}
                >
                  Checking open windows...
                </p>
              )}

              {!slotsLoading && slots && slots.length === 0 && (
                <div
                  className="text-center"
                  style={{ padding: "var(--space-lg) 0" }}
                >
                  <p
                    className="font-display font-bold"
                    style={{
                      color: "var(--text-primary-light)",
                      fontSize: "var(--text-body-lg)",
                      marginBottom: "var(--space-2xs)",
                    }}
                  >
                    Booked solid that day.
                  </p>
                  <p
                    className="font-body"
                    style={{
                      color: "var(--text-secondary-light)",
                      fontSize: "var(--text-body-sm)",
                      marginBottom: "var(--space-md)",
                    }}
                  >
                    Pick a different day or text Tony directly.
                  </p>
                  <a
                    href={siteConfig.smsHref}
                    className="inline-flex items-center justify-center font-display font-bold uppercase rounded-md"
                    style={{
                      background: "var(--primary)",
                      color: "var(--text-primary)",
                      padding: "0.75rem 1.25rem",
                      fontSize: "var(--text-eyebrow)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Text Tony
                  </a>
                </div>
              )}

              {!slotsLoading && slots && slots.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {slots.map((t) => {
                    const isSelected = selectedTime === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleSelectTime(t)}
                        className="rounded-md font-display font-bold transition-colors"
                        style={{
                          background: isSelected
                            ? "var(--primary)"
                            : "var(--bg-elevated)",
                          color: isSelected
                            ? "var(--text-primary)"
                            : "var(--text-primary-light)",
                          border: isSelected
                            ? "1px solid var(--primary)"
                            : "1px solid var(--border-card-light)",
                          padding: "0.875rem 0.5rem",
                          fontSize: "var(--text-body-sm)",
                          letterSpacing: "0.04em",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.background =
                              "var(--primary-soft)";
                            e.currentTarget.style.borderColor =
                              "var(--primary)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.background =
                              "var(--bg-elevated)";
                            e.currentTarget.style.borderColor =
                              "var(--border-card-light)";
                          }
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              )}

              {slotsError && (
                <p
                  className="font-mono mt-3"
                  style={{
                    color: "var(--text-muted-light)",
                    fontSize: "var(--text-meta)",
                  }}
                >
                  {/* Soft message — we still rendered seeded slots above. */}
                  Showing typical availability. Final time confirmed by Tony.
                </p>
              )}
            </motion.div>
          )}

          {step === "confirm" && selectedDate && selectedTime && (
            <motion.div
              key="confirm-step"
              variants={fadeV}
              initial="hidden"
              animate="show"
              exit="exit"
              className="p-5 md:p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center font-display uppercase rounded-md"
                  style={{
                    background: "transparent",
                    color: "var(--primary)",
                    padding: "0.5rem 0.75rem",
                    fontSize: "var(--text-eyebrow)",
                    letterSpacing: "0.08em",
                    border: "1px solid var(--border-card-light)",
                  }}
                  aria-label="Back to time selection"
                >
                  ‹ Back
                </button>
                <p
                  className="font-display font-bold"
                  style={{
                    color: "var(--text-primary-light)",
                    fontSize: "var(--text-body-lg)",
                  }}
                >
                  {selectedDate.toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {selectedTime}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <FormField
                  label="Your name"
                  required
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  type="text"
                  autoComplete="name"
                />
                <FormField
                  label="Email"
                  required
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  type="email"
                  autoComplete="email"
                />
                <FormField
                  label="Phone"
                  required
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  type="tel"
                  autoComplete="tel"
                />
                <FormField
                  label="What is the project? (optional)"
                  value={form.notes}
                  onChange={(v) => setForm({ ...form, notes: v })}
                  type="textarea"
                />

                {submitError && (
                  <p
                    className="font-mono"
                    style={{
                      color: "var(--primary)",
                      fontSize: "var(--text-meta)",
                    }}
                    role="alert"
                  >
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="font-display font-bold uppercase rounded-md mt-2"
                  style={{
                    background: submitting
                      ? "var(--primary-muted)"
                      : "var(--primary)",
                    color: "var(--text-primary)",
                    padding: "1rem 1.5rem",
                    fontSize: "var(--text-eyebrow)",
                    letterSpacing: "0.08em",
                    cursor: submitting ? "wait" : "pointer",
                    opacity: submitting ? 0.85 : 1,
                  }}
                >
                  {submitting ? "Booking..." : "Confirm Walkthrough"}
                </button>
                <p
                  className="font-mono text-center"
                  style={{
                    color: "var(--text-muted-light)",
                    fontSize: "var(--text-meta)",
                  }}
                >
                  Tony reviews every booking and confirms by text within an hour.
                </p>
              </form>
            </motion.div>
          )}

          {step === "done" && selectedDate && selectedTime && (
            <motion.div
              key="done-step"
              variants={fadeV}
              initial="hidden"
              animate="show"
              exit="exit"
              className="p-6 md:p-8 text-center"
            >
              <p
                className="font-display"
                style={{
                  fontSize: "3rem",
                  marginBottom: "var(--space-sm)",
                }}
                aria-hidden="true"
              >
                ✅
              </p>
              <h4
                className="font-display font-bold"
                style={{
                  color: "var(--text-primary-light)",
                  fontSize: "var(--text-h3)",
                  marginBottom: "var(--space-2xs)",
                }}
              >
                Walkthrough booked.
              </h4>
              <p
                className="font-body"
                style={{
                  color: "var(--text-secondary-light)",
                  fontSize: "var(--text-body)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                {selectedDate.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {selectedTime}.
              </p>
              <p
                className="font-mono"
                style={{
                  color: "var(--text-muted-light)",
                  fontSize: "var(--text-meta)",
                  marginBottom: "var(--space-md)",
                }}
              >
                Confirmation #{confirmationId}. Tony will text {form.phone || "you"} to
                confirm the address details before he heads out.
              </p>
              <a
                href={siteConfig.smsHref}
                className="inline-flex items-center justify-center font-display font-bold uppercase rounded-md"
                style={{
                  background: "transparent",
                  color: "var(--primary)",
                  padding: "0.75rem 1.25rem",
                  fontSize: "var(--text-eyebrow)",
                  letterSpacing: "0.08em",
                  border: "1px solid var(--primary)",
                }}
              >
                Text Tony Now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Form field helper ──────────────────────────────────────────────── */

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  autoComplete?: string;
};

function FormField({
  label,
  value,
  onChange,
  type,
  required,
  autoComplete,
}: FieldProps) {
  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--bg-elevated)",
    color: "var(--text-primary-light)",
    padding: "0.75rem 0.875rem",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border-card-light)",
    fontSize: "var(--text-body)",
    fontFamily: "var(--font-body)",
    outline: "none",
  };
  return (
    <label className="flex flex-col gap-1">
      <span
        className="font-display uppercase"
        style={{
          color: "var(--text-secondary-light)",
          fontSize: "var(--text-eyebrow)",
          letterSpacing: "0.08em",
        }}
      >
        {label}
        {required ? " *" : ""}
      </span>
      {type === "textarea" ? (
        <textarea
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          style={sharedStyle}
        />
      ) : (
        <input
          required={required}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          style={sharedStyle}
        />
      )}
    </label>
  );
}
