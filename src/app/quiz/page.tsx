import type { Metadata } from "next";
import QuizClient from "./QuizClient";
import { BreadcrumbSchema } from "@/components/seo";

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
  title: "Find My Project: Anjo Services Quiz",
  description:
    "Six quick questions to find the right Anjo service for your home. Personalized result, no email gate. Book a walkthrough on the result screen.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    type: "website",
    url: "https://anjoservices.com/quiz",
    siteName: "Anjo Services, LLC",
    locale: "en_US",
    title: "Find My Project: Anjo Services Quiz",
    description:
      "Six quick questions, personalized result, no email gate. Built for homeowners in Methuen, Andover, Haverhill, and Salem NH.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find My Project: Anjo Services Quiz",
    description:
      "Six questions, personalized result, no email gate. Methuen MA + North Shore + southern NH.",
  },
};

export default function QuizPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Find My Project", url: "/quiz" },
        ]}
      />
      <QuizClient />
    </>
  );
}
