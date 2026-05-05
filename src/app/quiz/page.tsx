import type { Metadata } from "next";
import QuizClient from "./QuizClient";

/**
 * /quiz — server component shell. Wraps QuizClient.
 *
 * Per CLAUDE.md Always-Built Features Rule §Interactive Quiz: 3-phase quiz
 * (intro → question → results) with inline BookingCalendar on results.
 * NEVER a link to /booking on the results screen.
 *
 * Page Header Standard: ambient breathing-orb (RisingAsh not yet built —
 * CSS-only orbs stand in per Animation depth rule).
 */

export const metadata: Metadata = {
  title: "Find My Project | Anjo Services Quiz",
  description:
    "Six quick questions to find the right Anjo service for your home. Personalized result, no email gate. Book a walkthrough at the end.",
  alternates: { canonical: "/quiz" },
};

export default function QuizPage() {
  return <QuizClient />;
}
