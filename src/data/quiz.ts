/**
 * quiz.ts — Anjo Services scored quiz logic.
 *
 * Pure data layer per CLAUDE.md Always-Built Features Rule §Interactive Quiz.
 * Zero UI dependencies. The QuizClient component imports QUIZ_RESULTS and
 * scoreQuiz; this file imports nothing from `react`, `next`, or any UI helper.
 *
 * Pattern #29 (decoupled data + UI quiz architecture). Question content lives
 * in /data/site.ts as `quizSteps`; this file owns the result archetypes and
 * the deterministic scoring function.
 *
 * Voice rules: zero em dashes. Andover-Upgrader phone-review register.
 */

import { services } from "./site";

/**
 * Quiz archetype — the four result types the quiz routes the user into.
 * Must match the union in site.ts QuizOption.type EXACTLY.
 */
export type QuizType =
  | "andover-upgrader"
  | "solo-homeowner"
  | "storm-recovery"
  | "ghosted-rebuilder";

export type QuizResult = {
  /** Archetype display name shown above the body copy on the results screen. */
  name: string;
  /** One-line tagline under the name. */
  tagline: string;
  /** 2 to 3 short paragraphs of body copy in Andover-Upgrader voice. */
  body: string[];
  /** Recommended Anjo service the archetype routes to. */
  recommendedService: {
    /** Slug from services[] in /data/site.ts. */
    slug: string;
    /** Service display name. */
    name: string;
    /** One-line reason this archetype maps to this service. */
    reason: string;
  };
};

// Helper — confirms the slug exists in services[] at module-load time. If a
// service slug is renamed in site.ts and not updated here, build fails fast
// rather than silently rendering a broken link.
function svc(slug: string): { slug: string; name: string } {
  const s = services.find((x) => x.slug === slug);
  if (!s) {
    throw new Error(
      `quiz.ts: recommended service slug "${slug}" not found in services[]`,
    );
  }
  return { slug: s.slug, name: s.name };
}

/**
 * QUIZ_RESULTS — keyed by QuizType. Each entry: name, tagline, body[], and
 * recommended service. Body paragraphs read like Tony talking on the phone.
 *
 * Mapping rationale (market-intelligence §4 + §9):
 *   andover-upgrader  -> kitchen-remodels        ($35K-$45K sweet spot, margin)
 *   solo-homeowner    -> handyman-honey-do       (flat-rate trojan horse)
 *   storm-recovery    -> decks-fences-pergolas   (storm damage maps here)
 *   ghosted-rebuilder -> finish-carpentry        ("we finish what they started")
 *
 * NOTE: ghosted-rebuilder maps to finish-carpentry because finish work is the
 * most common "they walked off mid-trim" job. The result body explicitly
 * mentions Anjo will pick up half-built kitchens / decks / baths too — the
 * recommendation is the lead service, not the only one offered.
 */
// [DEMO COPY — pending client review]
export const QUIZ_RESULTS: Record<QuizType, QuizResult> = {
  "andover-upgrader": {
    name: "The Planner",
    tagline: "You have been saving the photo. Now you are ready.",
    body: [
      "You know the look you want. You have been adding to a Pinterest board or a phone screenshot folder for months. The kitchen, the coffered ceiling, the primary bath. The plan is real. You just need a contractor who will quote it in writing, start the day he says, and finish it the week he promised.",
      "Most of our $35K to $45K kitchens come from this corridor. Andover, North Andover, Methuen, Haverhill, Salem NH. We will walk the space with you, send a line-item quote inside 24 hours, and tell you straight what costs more in 2026 than it did in 2024.",
      "If the project is bigger than $25K, we will show you the option to phase it. Cabinets and counters now, island and tile next spring. Your money, your call. We just lay out the math.",
    ],
    recommendedService: {
      ...svc("kitchen-remodels"),
      reason:
        "Kitchens are where Andover Upgraders spend the most and stress the most. We publish the range, build the calendar, and finish on the day we said.",
    },
  },
  "solo-homeowner": {
    name: "The List Keeper",
    tagline: "The list got long. Tony does the whole list in a day.",
    body: [
      "Two years of small jobs. The cabinet door that will not close. The TV that has been leaning against the wall since you moved in. The ceiling fan that is still in the box. The fence picket the dog kicked off. None of it is huge. All of it has been bugging you.",
      "We run flat-rate handyman days. $350 half-day, $850 full-day, $1,200 full-house honey-do day. You text the list, we show up with the truck, the list gets done. No surprise hourly meter. No four-hour minimum charge for a 90 minute job.",
      "Lots of our remodel clients started with one of these days. You see how we work, we see what else your house needs. Six months later you call us back for the bath. That is fine. The handyman day is the handyman day.",
    ],
    recommendedService: {
      ...svc("handyman-honey-do"),
      reason:
        "Flat-rate days, posted prices, one truck, one Tony. The list is the list. We finish it.",
    },
  },
  "storm-recovery": {
    name: "The Right-Now Caller",
    tagline: "Something broke. Insurance is asking. You need it safe today.",
    body: [
      "A nor'easter took down 30 feet of fence. A tree branch hit the deck rail. The siding has a hole and the window leaks. You are not planning a remodel. You need it secure, then estimated, then fixed.",
      "Text Tony at (978) 216-6455 with a photo. Auto-reply confirms we got it. Real reply by 8am if you texted overnight. Most weeks we can be on site within two days for emergencies. We can give you a written estimate the same visit, sized for insurance language if your adjuster needs it.",
      "We work decks, fences, exterior trim, siding, and emergency carpentry across Methuen, Andover, Haverhill, Salem NH, Derry, and Windham. Inspected, written, signed off.",
    ],
    recommendedService: {
      ...svc("decks-fences-pergolas"),
      reason:
        "Storm damage on this corridor lands hardest on decks, fences, and exterior trim. We secure it first, then write the estimate the way insurance wants to see it.",
    },
  },
  "ghosted-rebuilder": {
    name: "The Rebuilder",
    tagline: "The last guy walked off. We pick up where he stopped.",
    body: [
      "Half-built deck. Three rooms with no trim. A kitchen with cabinets but no counters. The previous contractor took your money, missed three texts, and disappeared. It happens often enough that Mass.gov runs a complaint hotline for it.",
      "We finish what other contractors started, regularly. Send photos of the contract, any change orders, and the current state of the work. We will tell you straight what is fixable, what needs to be redone, and what the rest costs in writing inside 24 hours. No judgment about the last guy. Honest path forward.",
      "We can pick up finish carpentry, cabinets, tile, decks, and full remodels. The first walkthrough is 30 minutes on site. Then you get a written plan, with photos and a calendar.",
    ],
    recommendedService: {
      ...svc("finish-carpentry"),
      reason:
        "Most ghosted projects in this corridor stall mid-trim, mid-tile, or mid-deck. Finish carpentry is the most common pickup, but we handle the bigger gut jobs too.",
    },
  },
};

/**
 * scoreQuiz — pure deterministic scorer. Counts type occurrences in the
 * answers array, returns the type with the highest count. Ties broken by
 * the first archetype encountered in the answers (preserves user intent
 * when two archetypes tie).
 *
 * Used by QuizClient on the last question after the 400ms pendingAnswer
 * glow expires. Empty array defaults to andover-upgrader (margin tier).
 */
export function scoreQuiz(answers: QuizType[]): QuizType {
  if (answers.length === 0) return "andover-upgrader";

  const counts: Record<QuizType, number> = {
    "andover-upgrader": 0,
    "solo-homeowner": 0,
    "storm-recovery": 0,
    "ghosted-rebuilder": 0,
  };

  // Track first-seen index to break ties deterministically.
  const firstSeen: Partial<Record<QuizType, number>> = {};
  answers.forEach((t, i) => {
    counts[t] += 1;
    if (firstSeen[t] === undefined) firstSeen[t] = i;
  });

  let winner: QuizType = answers[0];
  let winnerCount = counts[winner];
  let winnerFirstSeen = firstSeen[winner] ?? 0;

  (Object.keys(counts) as QuizType[]).forEach((t) => {
    const c = counts[t];
    const fs = firstSeen[t] ?? Number.POSITIVE_INFINITY;
    if (c > winnerCount || (c === winnerCount && fs < winnerFirstSeen)) {
      winner = t;
      winnerCount = c;
      winnerFirstSeen = fs;
    }
  });

  return winner;
}
