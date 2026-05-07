import type { Metadata } from "next";
import ShopContent from "@/components/sections/ShopContent";

/**
 * /shop — Anjo Crew Merch.
 *
 * Per CLAUDE.md Always-Built Features Rule → Shop, scaffolded on every project.
 * Decision gate (post-scaffold, pre-launch): if Anjo did not buy Premium, the
 * pre-launch-auditor deletes the entire shop scaffold per design-system.md
 * §11 row 1 (trade-business no-natural-merch-demand recommendation).
 *
 * Navigation + Footer are rendered by /web/src/app/layout.tsx — this page
 * intentionally does NOT wrap them (the andrea-abella-marie reference page
 * does because andrea's layout doesn't; Anjo's layout does).
 */

export const metadata: Metadata = {
  title: "Shop · Anjo Crew Merch",
  description:
    "Anjo-branded gear for the crew, the truck, and the morning coffee. Print-on-demand. Shipped direct.",
  openGraph: {
    title: "Shop · Anjo Crew Merch",
    description:
      "Anjo-branded gear for the crew, the truck, and the morning coffee.",
    type: "website",
  },
};

export default function ShopPage() {
  return <ShopContent />;
}
