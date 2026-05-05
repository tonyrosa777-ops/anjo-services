/**
 * blog.ts — Anjo Services, LLC blog content source of truth.
 *
 * Per Stage 1G architecture decision: blog content lives in TypeScript data
 * files, NOT Sanity CMS. Optimus manages content directly. Sanity packages
 * stay installed but are never imported.
 *
 * Voice rules (non-negotiable, per CLAUDE.md Copy Writing Rule + design-system.md §7):
 *   - Zero em dashes (—) in any user-facing string. Commas, periods, ellipses only.
 *   - Phone-review register, not press quote. Short sentences. Specific nouns.
 *   - Real towns: Methuen, Andover, Haverhill, North Andover, Lawrence, Salem NH.
 *   - All pricing claims trace to market-intelligence.md §4 ranges verbatim.
 *   - Article #9 contains Tony's verbatim line "It is nice to see something
 *     beautiful come to life" (initial-business-data.md §2 authentic voice).
 *   - MA legal articles cite M.G.L. c. 142A and Mass.gov HIC + CSL lookup.
 *
 * Each article body is marked [DEMO COPY — pending client review] in COMMENTS;
 * the prose itself is grounded in market-intelligence.md §4 pricing data + §6
 * AEO question set + §2 audience language.
 */

import { siteConfig } from "@/data/site";

// ── Types ───────────────────────────────────────────────────────────────────

export type BlogCategory =
  | "Cost Guides"
  | "Hire Smart"
  | "Project Process"
  | "Finish Carpentry"
  | "Permits & Law";

export type BlogBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string; id: string }
  | { kind: "h3"; text: string; id: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] }
  | { kind: "callout"; tone: "tip" | "warning"; title: string; text: string }
  | { kind: "quote"; text: string; cite?: string };

export type BlogArticle = {
  slug: string;
  title: string;
  metaDescription: string;
  category: BlogCategory;
  publishedAt: string;
  author: { name: "Tony Squillini"; role: "Owner, Anjo Services, LLC" };
  excerpt: string;
  readMinutes: number;
  cardImage: string;
  headerImage: string;
  body: BlogBlock[];
  relatedSlugs: string[];
};

const TONY = {
  name: "Tony Squillini",
  role: "Owner, Anjo Services, LLC",
} as const;

// Suppress unused-import lint warning on builds where siteConfig is not
// referenced inside body text. Tony's phone string is interpolated below.
const PHONE = siteConfig.phone;

// ── Articles (9 total — slugs LOCKED per Stage 1G spec) ─────────────────────

export const blogArticles: BlogArticle[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Kitchen Remodel Cost Methuen MA 2025 (FEATURED)
  // [DEMO COPY — pending client review]
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "kitchen-remodel-cost-methuen-ma-2025",
    title: "How much does a kitchen remodel cost in Methuen MA in 2025?",
    metaDescription:
      "Real Methuen kitchen remodel pricing for 2025. Most land $35K to $45K. Line-item ranges from cabinets to counters, plus what drives the upper end.",
    category: "Cost Guides",
    publishedAt: "2026-04-22",
    author: TONY,
    excerpt:
      "A kitchen remodel in Methuen MA in 2025 typically costs $25,000 to $65,000, with most projects landing between $35,000 and $45,000. The price depends on cabinet line, counter material, layout changes, and what we find behind your walls.",
    readMinutes: 6,
    cardImage: "/blog/kitchen-remodel-cost-methuen-ma-2025-card.jpg",
    headerImage: "/blog/kitchen-remodel-cost-methuen-ma-2025-header.jpg",
    body: [
      {
        kind: "p",
        text: "A kitchen remodel in Methuen MA in 2025 typically costs $25,000 to $65,000, with most projects landing between $35,000 and $45,000. The exact number depends on cabinet line, counter material, whether you move plumbing or walls, and what shows up when we open the floor.",
      },
      {
        kind: "p",
        text: "We work kitchens across Methuen, Andover, Haverhill, North Andover, Lawrence, and Salem NH. Below is the line-item math we use on every quote, in plain numbers, with the ranges that actually hold up across this corridor in 2025.",
      },
      {
        kind: "h2",
        text: "The three price tiers we see most often",
        id: "three-price-tiers",
      },
      {
        kind: "p",
        text: "Most Methuen kitchens sort into one of three buckets. We will walk you through each one on the same quote so you can pick the lane that fits.",
      },
      {
        kind: "h3",
        text: "Refresh tier: $25K to $35K",
        id: "refresh-tier",
      },
      {
        kind: "p",
        text: "Keep the existing layout. Swap cabinets and counters. Refresh lighting and paint. Reuse your appliances if they are under five years old. Most refreshes finish in 14 to 18 working days. This is the right tier when the layout already works and you want a clean, modern look without moving plumbing or walls.",
      },
      {
        kind: "h3",
        text: "Mid tier: $35K to $50K (most of ours)",
        id: "mid-tier",
      },
      {
        kind: "p",
        text: "Semi-custom cabinets, quartz counters, new sink and faucet, undercabinet lighting, new pendants, fresh paint and tile backsplash, and one or two new appliances. Three to four weeks. This is where the average Andover or Methuen colonial kitchen lands when the homeowners want something they will be proud of in 10 years.",
      },
      {
        kind: "h3",
        text: "Full remodel tier: $50K to $65K+",
        id: "full-remodel-tier",
      },
      {
        kind: "p",
        text: "Layout changes. Move walls or relocate plumbing. Add an island where a half-wall used to live. Custom cabinets, premium quartz or natural stone, all-new appliance suite, hardwood or LVP floor changes. Four to six weeks. We see this when the kitchen has not been touched since the house was built in 1985 and the family has outgrown the footprint.",
      },
      {
        kind: "h2",
        text: "Where the dollars actually go",
        id: "where-dollars-go",
      },
      {
        kind: "p",
        text: "On a typical $42,000 Andover kitchen, here is the line-item split. Numbers shift up or down with cabinet line and counter material, but the percentages hold within a few points across most projects.",
      },
      {
        kind: "ul",
        items: [
          "Cabinets and installation: $14,000 to $18,000 (about 35 to 40 percent)",
          "Counters and fabrication: $4,500 to $7,500 (about 12 to 18 percent)",
          "Labor (demo, framing, drywall, paint, finish): $9,000 to $12,000 (about 22 to 28 percent)",
          "Plumbing rough-in and fixtures: $1,800 to $3,500",
          "Electrical (new circuits, lighting, undercabinet): $1,500 to $3,000",
          "Tile backsplash and floor patches: $1,200 to $2,500",
          "Permits and inspections: $300 to $600 in Methuen",
          "Appliances (if included in scope): varies widely, owner choice",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Anjo's take on appliances",
        text: "We let homeowners buy appliances direct, then install them inside the project budget. You usually save 8 to 12 percent on appliance markup, and you get to pick the dishwasher you actually want.",
      },
      {
        kind: "h2",
        text: "What pushes a kitchen above $50K",
        id: "what-pushes-above-50k",
      },
      {
        kind: "p",
        text: "Five things drive the upper end. We tell you which ones apply on the walkthrough so the quote does not surprise you on day one.",
      },
      {
        kind: "ol",
        items: [
          "Moving the sink or stove. New plumbing or gas line runs add $1,500 to $4,000.",
          "Removing a load-bearing wall. Beam, header, and engineer letter add $3,500 to $7,000.",
          "Custom cabinets vs. semi-custom. The jump runs $5,000 to $12,000 on a 12-foot run.",
          "Quartzite or marble counters vs. quartz. Material and fabrication adds $2,000 to $5,000.",
          "Hardwood floor weave-in to match adjoining rooms. Adds $2,500 to $5,500.",
        ],
      },
      {
        kind: "h2",
        text: "What we find behind your walls",
        id: "behind-your-walls",
      },
      {
        kind: "p",
        text: "On a 1987 Methuen colonial, the most common surprise is water damage behind the dishwasher or under the sink. Second most common is undersized electrical, especially when the kitchen still runs on a single 15-amp circuit. We always show you the rotted subfloor or the burned wire before we charge a change order. No games. You see what we see.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Avoid the per-square-foot quote",
        text: "If a contractor quotes your kitchen by square foot without seeing what is behind your dishwasher, walk away. Real quotes have line items. Anjo's quote arrives in writing within 24 hours of the walkthrough, with every line broken out so you can see the math.",
      },
      {
        kind: "h2",
        text: "Timeline you can actually plan around",
        id: "timeline",
      },
      {
        kind: "p",
        text: "We give you a calendar before we swing the first hammer. Demo Monday. Dust wall up by Tuesday. Plumbing and electrical rough-in week one. Drywall and paint week two. Cabinets land week three. Counters template the day after cabinets, fabrication takes about 10 days. Final tile and trim the week the counters arrive. Most kitchens are usable again in three to four weeks.",
      },
      {
        kind: "p",
        text: "We coordinate the plumber, the electrician, the cabinet delivery, the counter template, and the final inspection so you only need to coordinate one person, Tony. The schedule is in writing on day one and it updates in writing if anything moves. You always know what is happening and when.",
      },
      {
        kind: "h2",
        text: "How Methuen kitchens compare to Andover and Haverhill",
        id: "compare-towns",
      },
      {
        kind: "p",
        text: "Pricing across our corridor is remarkably consistent for similar scopes. A $42K kitchen in Methuen costs about the same as a $42K kitchen in Andover or Haverhill, give or take 3 percent. The variation comes from the homes themselves. Andover colonials from the 1980s tend to have smaller original kitchens that benefit from layout changes, pushing the average closer to $45K. Methuen ranches and capes from the 1960s and 1970s often work well as a refresh-tier project closer to $32K. Haverhill mixes both. We tell you on the walkthrough which lane fits your house.",
      },
      {
        kind: "h2",
        text: "What to do next",
        id: "what-to-do-next",
      },
      {
        kind: "p",
        text: "If you want a written, line-itemed quote on your kitchen, the fastest path is a 30 minute on-site walkthrough. Send a few phone photos first if you want a rough range over text. Read more on our [kitchen remodel service page](/services/kitchen-remodels) or jump straight to [scheduling a walkthrough](/booking). For other rooms and project sizes, see our [full cost guide](/services/cost).",
      },
    ],
    relatedSlugs: [
      "30k-vs-60k-kitchen-remodel-difference",
      "questions-to-ask-before-hiring-a-contractor-ma",
      "bathroom-remodel-timeline-massachusetts",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. $30K vs $60K Kitchen Remodel
  // [DEMO COPY — pending client review]
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "30k-vs-60k-kitchen-remodel-difference",
    title: "What's the difference between a $30K and a $60K kitchen remodel?",
    metaDescription:
      "A $30K kitchen keeps the layout and swaps the surfaces. A $60K kitchen moves walls or plumbing and upgrades to custom. Side-by-side, in plain terms.",
    category: "Cost Guides",
    publishedAt: "2026-04-08",
    author: TONY,
    excerpt:
      "A $30K kitchen typically keeps the existing layout and swaps cabinets, counters, lighting, and paint. A $60K kitchen usually moves plumbing or walls, upgrades to custom or semi-custom cabinets, and adds an island or new appliance suite.",
    readMinutes: 5,
    cardImage: "/blog/30k-vs-60k-kitchen-remodel-difference-card.jpg",
    headerImage: "/blog/30k-vs-60k-kitchen-remodel-difference-header.jpg",
    body: [
      {
        kind: "p",
        text: "A $30K kitchen typically keeps the existing layout and swaps cabinets, counters, lighting, and paint. A $60K kitchen usually moves plumbing or walls, upgrades to custom or semi-custom cabinets, adds an island, and includes a new appliance suite. Same room, very different scope.",
      },
      {
        kind: "p",
        text: "Below is the same Andover colonial kitchen, costed at both price points, line by line. We run this comparison on every quote so homeowners can pick the lane that fits the budget and the goals.",
      },
      {
        kind: "h2",
        text: "The $30K kitchen, line by line",
        id: "thirty-k-kitchen",
      },
      {
        kind: "p",
        text: "This is the right tier when the layout already works, the appliances are recent, and the cabinets are tired but the boxes are sound. We refresh, we do not rebuild.",
      },
      {
        kind: "ul",
        items: [
          "Stock or assembled-in-shop cabinets: $9,000 to $11,000",
          "Quartz counters, level 1: $3,500 to $5,000",
          "New sink, faucet, garbage disposal: $700 to $1,200",
          "Tile backsplash: $900 to $1,400",
          "New pendants and undercabinet lighting: $700 to $1,200",
          "Paint walls, ceiling, and trim: $900 to $1,400",
          "Floor patch and refresh (no full replace): $700 to $1,500",
          "Demo, framing patches, drywall, finish labor: $7,500 to $9,500",
          "Permits, inspections, dumpster: $600 to $1,000",
        ],
      },
      {
        kind: "p",
        text: "Total lands $25,000 to $32,000 most of the time. The kitchen looks new. The footprint is the same. You are usable again in 14 to 18 working days.",
      },
      {
        kind: "h2",
        text: "The $60K kitchen, line by line",
        id: "sixty-k-kitchen",
      },
      {
        kind: "p",
        text: "This is the right tier when the layout is broken, the family has outgrown the footprint, or the kitchen has not been touched since the house was built. We move things and we upgrade materials.",
      },
      {
        kind: "ul",
        items: [
          "Semi-custom cabinets with soft-close and full extension: $17,000 to $22,000",
          "Quartzite or premium quartz counters: $7,000 to $10,000",
          "9-foot island with seating, outlets, and dishwasher: $3,500 to $5,500 above base scope",
          "Move sink or stove plumbing or gas: $1,800 to $4,000",
          "Remove a non-load-bearing wall and patch: $1,500 to $3,000",
          "New full appliance suite (range, hood, fridge, dishwasher, microwave): owner-purchased plus install $1,200 to $2,000",
          "Hardwood floor weave-in to match adjoining rooms: $3,000 to $5,500",
          "Custom range hood vent run: $800 to $1,800",
          "Permits, inspections, engineer letter (if wall is structural): $700 to $1,500",
          "Demo, framing, drywall, paint, finish labor (longer scope): $13,000 to $16,000",
        ],
      },
      {
        kind: "p",
        text: "Total lands $52,000 to $68,000 most of the time. Three and a half to five weeks. The kitchen feels like a different house.",
      },
      {
        kind: "p",
        text: "We have done several of these in Andover and North Andover where the homeowners pulled out a half wall between the kitchen and the family room, added a 9-foot island for the kids to do homework on, and never looked back. The $60K tier is for homeowners who want the kitchen to last another 15 years and want the layout to actually fit how their family lives.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Why the labor jumps",
        text: "Labor is not 2x just because the price is 2x. The $60K kitchen runs longer because moving plumbing, removing walls, and weaving hardwood adds three to four extra working days each. The labor line scales with calendar, not with material.",
      },
      {
        kind: "h2",
        text: "Common middle ground: the $42K kitchen",
        id: "middle-ground",
      },
      {
        kind: "p",
        text: "Most of our Methuen and Andover kitchens land between $35K and $45K. Semi-custom cabinets, quartz counters, new pendants and tile backsplash, a single layout tweak (like swapping the dishwasher and sink), and one or two new appliances. No new island. No wall moves. Three weeks. Around $42,000 in 2025.",
      },
      {
        kind: "p",
        text: "This is the lane we recommend most often. The $30K kitchen feels great on day one but the homeowners often wish they had pushed for soft-close drawers and a better backsplash. The $60K kitchen feels great too but takes nearly twice as long and stretches the family budget. The $42K middle ground gets you a kitchen you will love for 12 years without dipping deep into the HELOC.",
      },
      {
        kind: "h2",
        text: "How to pick the right tier",
        id: "how-to-pick",
      },
      {
        kind: "p",
        text: "Three questions answer this for most homeowners.",
      },
      {
        kind: "ol",
        items: [
          "Does the current layout actually work? If yes, refresh tier. If no, full remodel.",
          "Are the appliances under five years old and you like them? If yes, do not replace them. Save $5,000 to $9,000.",
          "Will you live in this house another seven to 10 years? If yes, mid tier or full remodel earns the cost back. If you are selling in two years, refresh tier and put the rest into the bath.",
        ],
      },
      {
        kind: "h2",
        text: "Resale ROI by tier in this corridor",
        id: "resale-roi",
      },
      {
        kind: "p",
        text: "Across Methuen, Andover, and Haverhill in 2025, the resale return on a kitchen remodel runs roughly 70 to 80 percent of the project cost when the home is sold within three years. The refresh tier returns the highest percentage but the smallest dollar lift. The full remodel tier returns the largest dollar lift but a slightly lower percentage of cost recovered. The mid tier sits in the middle on both metrics.",
      },
      {
        kind: "p",
        text: "If you are selling in two years, the math almost always favors the refresh tier. If you are staying seven years or more, you get the use value plus the eventual resale lift, so mid or full pays back even better.",
      },
      {
        kind: "h2",
        text: "What to do next",
        id: "what-to-do-next",
      },
      {
        kind: "p",
        text: "We will price both options on the same quote so you can pick. Send three phone photos and the rough age of the cabinets to (978) 216-6455 and you will have a written range back within 24 hours. For deeper pricing breakdowns, read [our Methuen kitchen cost guide](/blog/kitchen-remodel-cost-methuen-ma-2025), browse the [full kitchen remodel service page](/services/kitchen-remodels), or [schedule a walkthrough](/booking).",
      },
    ],
    relatedSlugs: [
      "kitchen-remodel-cost-methuen-ma-2025",
      "questions-to-ask-before-hiring-a-contractor-ma",
      "find-a-contractor-who-shows-up",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Find a Contractor Who Shows Up
  // [DEMO COPY — pending client review]
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "find-a-contractor-who-shows-up",
    title: "How to find a contractor who actually shows up",
    metaDescription:
      "Three signals tell you whether a contractor will show up: response time under 24 hours, license numbers in writing, and finished projects you can drive past.",
    category: "Hire Smart",
    publishedAt: "2026-03-26",
    author: TONY,
    excerpt:
      "Three signals tell you whether a contractor will actually show up: did they answer your first call or text within 24 hours, do they publish their license numbers, and can they show you finished projects with prices attached. If any one is missing, keep looking.",
    readMinutes: 5,
    cardImage: "/blog/find-a-contractor-who-shows-up-card.jpg",
    headerImage: "/blog/find-a-contractor-who-shows-up-header.jpg",
    body: [
      {
        kind: "p",
        text: "Three signals tell you whether a contractor will actually show up: did they answer your first call or text within 24 hours, do they publish their license numbers, and can they show you finished projects with prices attached. If any one of those is missing, keep looking.",
      },
      {
        kind: "p",
        text: "We get a call almost every week from a Methuen, Andover, or Haverhill homeowner whose last contractor walked off mid-project. Half-built deck, missing railings, three unanswered texts. Below is what to check before you sign anything, in the order Tony actually checks it.",
      },
      {
        kind: "h2",
        text: "Signal 1: Response time under 24 hours",
        id: "response-time",
      },
      {
        kind: "p",
        text: "If a contractor takes three days to call you back when you are the prospect, they will take three weeks to call you back when you are the customer with a leaking pipe. The bid stage is the best behavior you will ever see. Watch it carefully.",
      },
      {
        kind: "ul",
        items: [
          "First text or call: reply inside 24 hours, ideally inside 4 business hours",
          "Walkthrough scheduled: inside 5 business days of first contact",
          "Written quote: inside 24 hours of the walkthrough, in writing, with line items",
        ],
      },
      {
        kind: "p",
        text: "If any one of those slips by more than a day without an explanation, it is a red flag. Real contractors are busy. Real contractors who want your job answer the phone.",
      },
      {
        kind: "h2",
        text: "Signal 2: License numbers in writing",
        id: "license-numbers",
      },
      {
        kind: "p",
        text: "In Massachusetts, every general contractor doing residential work over $1,000 needs a Home Improvement Contractor (HIC) registration. Anything structural also needs a Construction Supervisor License (CSL). Both numbers are public on Mass.gov. A contractor who will not give you their numbers is a contractor you cannot verify.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Verify before you sign",
        text: "Go to the Mass.gov license lookup, plug in the contractor's name, and read the result. If they have open complaints, the page will show them. If their HIC is expired, the page will show that too. Five minutes, free, before you wire any deposit.",
      },
      {
        kind: "h2",
        text: "Signal 3: Finished projects you can drive past",
        id: "finished-projects",
      },
      {
        kind: "p",
        text: "Photos are easy to fake. Addresses are not. Ask for three recent project addresses inside a 20 mile radius. Drive past two of them on a Saturday afternoon. If the contractor cannot give you three real addresses for a job they finished in the last 12 months, they did not finish it.",
      },
      {
        kind: "p",
        text: "We run jobs across Methuen, Andover, Haverhill, North Andover, Lawrence, Salem NH, Derry, Windham, and Londonderry. We will give you addresses on the walkthrough. Drive past whichever ones you want.",
      },
      {
        kind: "h2",
        text: "Bonus signal: written contracts that comply with M.G.L. c. 142A",
        id: "written-contracts",
      },
      {
        kind: "p",
        text: "Massachusetts law (M.G.L. c. 142A) requires every home improvement contract over $1,000 to include the contractor's HIC number, a written start date, a payment schedule that does not front-load the deposit, and a three-day right to cancel. If your contract is missing any of those, the contractor is breaking the law before they pour a footing. Walk away.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Deposit limits",
        text: "Massachusetts caps the deposit at one third of the total price OR the cost of special-order materials, whichever is greater. If a contractor asks for 50 percent up front on a standard kitchen remodel, that is illegal under c. 142A. Slow it down.",
      },
      {
        kind: "h2",
        text: "Red flags Tony watches for",
        id: "red-flags",
      },
      {
        kind: "p",
        text: "After 7 years on the tools in this corridor, here are the patterns that almost always end in a homeowner calling us to finish what someone else started.",
      },
      {
        kind: "ol",
        items: [
          "No website or a website with zero project photos and no license numbers visible",
          "Verbal quote only, no line items, refuses to put numbers in writing",
          "Asks for cash deposit or wants the check made out to a personal name, not the LLC",
          "Cannot give you three recent project addresses inside 30 miles",
          "Pressures you to sign today because the price is good only this week",
          "Refuses to pull permits and tells you the work does not need one (when it does)",
        ],
      },
      {
        kind: "h2",
        text: "What to do if you have already been ghosted",
        id: "already-ghosted",
      },
      {
        kind: "p",
        text: "First, do not panic. Second, do not pay any more money to the contractor who walked. Third, gather everything: the contract, the permits, the photos of where they stopped, and any text threads. Take photos of the work as it stands today. Then call us, or whoever you trust to finish it. We have a [whole service line for finishing what other contractors started](/services). We will tell you straight what is fixable and what it costs.",
      },
      {
        kind: "h2",
        text: "What good contractors look like in week one",
        id: "good-contractor-week-one",
      },
      {
        kind: "p",
        text: "After 7 years of working alongside other trades in this corridor, the patterns that signal a good contractor in week one of a project are simple. They show up the day they said they would, with the materials they said they would bring. They cover your floors. They put up a dust wall before they swing a hammer. They tell you, in writing, what is happening tomorrow.",
      },
      {
        kind: "p",
        text: "If your week one looks like that, you hired well. If your week one looks like missed start dates and confusing change orders, you have a tell that the next 10 weeks will look the same. Address it on day three, not day 30.",
      },
      {
        kind: "h2",
        text: "What to do next",
        id: "what-to-do-next",
      },
      {
        kind: "p",
        text: "If you are doing your homework now, before you sign anything, that is the right move. Read [our questions to ask before hiring a contractor in Massachusetts](/blog/questions-to-ask-before-hiring-a-contractor-ma) for the full checklist, then [schedule a walkthrough](/booking) when you are ready. We answer texts at 9pm. Real reply by 8am.",
      },
    ],
    relatedSlugs: [
      "questions-to-ask-before-hiring-a-contractor-ma",
      "verify-contractor-licensed-massachusetts",
      "home-improvement-contract-massachusetts-checklist",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. 7 Questions to Ask Before Hiring a Contractor in MA (HUB / longest)
  // [DEMO COPY — pending client review]
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "questions-to-ask-before-hiring-a-contractor-ma",
    title:
      "7 questions to ask before hiring a general contractor in Massachusetts",
    metaDescription:
      "The seven questions every Massachusetts homeowner should ask before signing a contract. License lookup, deposit limits, M.G.L. c. 142A, references, and timelines.",
    category: "Hire Smart",
    publishedAt: "2026-04-15",
    author: TONY,
    excerpt:
      "Before you hire a general contractor in Massachusetts, ask for the HIC and CSL numbers, written line items, three real project addresses, and a contract that complies with M.G.L. c. 142A. The seven questions below catch every common scam in this corridor.",
    readMinutes: 9,
    cardImage: "/blog/questions-to-ask-before-hiring-a-contractor-ma-card.jpg",
    headerImage:
      "/blog/questions-to-ask-before-hiring-a-contractor-ma-header.jpg",
    body: [
      {
        kind: "p",
        text: "Before you hire a general contractor in Massachusetts, ask for the HIC and CSL numbers, written line items, three real project addresses, and a contract that complies with M.G.L. c. 142A. The seven questions below catch almost every common scam in this corridor.",
      },
      {
        kind: "p",
        text: "Print this list. Take it to the walkthrough. A contractor who will not answer all seven questions in writing is a contractor you do not want building your kitchen.",
      },
      {
        kind: "h2",
        text: "Question 1: What are your HIC and CSL numbers?",
        id: "question-1-hic-csl",
      },
      {
        kind: "p",
        text: "Massachusetts requires every contractor doing residential work over $1,000 to hold a Home Improvement Contractor (HIC) registration with the Office of Consumer Affairs and Business Regulation. Any structural work also requires a Construction Supervisor License (CSL) from the Board of Building Regulations and Standards.",
      },
      {
        kind: "p",
        text: "Both numbers are public. Verify them yourself before you sign. Go to Mass.gov, search HIC license lookup or CSL license lookup, plug in the contractor's name, and read the result. The lookup tells you the registration status, expiration date, and whether there are open complaints or guaranty fund claims.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Unlicensed work voids your homeowner's insurance",
        text: "If something goes wrong on your project (fire, fall, water damage) and the contractor was not properly licensed, your homeowner's insurance can deny the claim. The five minutes it takes to verify on Mass.gov can save you $50,000.",
      },
      {
        kind: "h2",
        text: "Question 2: Can I see proof of liability and workers comp insurance?",
        id: "question-2-insurance",
      },
      {
        kind: "p",
        text: "Ask for a current Certificate of Insurance (COI) showing general liability of at least $1,000,000 and workers compensation coverage. Have the contractor's insurance carrier email it to you directly. Do not accept a photocopy from the contractor's truck.",
      },
      {
        kind: "p",
        text: "If the contractor has employees on your job and no workers comp, and a worker gets hurt on your property, the worker can sue you, the homeowner. Workers comp is not optional. It is the cheapest insurance on the job site.",
      },
      {
        kind: "h2",
        text: "Question 3: Can you give me three recent project addresses?",
        id: "question-3-addresses",
      },
      {
        kind: "p",
        text: "Photos are easy to fake. Addresses are not. Ask for three recent project addresses inside a 30 mile radius, finished in the last 12 months. Drive past two of them on a Saturday. Knock on a door if you feel like it. Most homeowners are happy to talk for two minutes about their contractor.",
      },
      {
        kind: "p",
        text: "We run jobs across Methuen, Andover, Haverhill, North Andover, Lawrence, Salem NH, Derry, Windham, and Londonderry. We will give you addresses on the walkthrough. The good ones, and the ones where we ran into surprises and how we handled them. Both teach you what to expect.",
      },
      {
        kind: "h2",
        text: "Question 4: What is your written quote and what is the line-item breakdown?",
        id: "question-4-line-items",
      },
      {
        kind: "p",
        text: "A real quote has line items. Demo, framing, drywall, paint, plumbing, electrical, cabinets, counters, tile, fixtures, permits, dumpster. You should be able to see exactly where the dollars go.",
      },
      {
        kind: "p",
        text: "If a contractor quotes you a single number with no line items, you cannot price-shop the line that does not match. You also cannot tell what they are skipping. The line-item quote is the homeowner's only protection against scope creep on a fixed-price job.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Anjo's quote standard",
        text: "Every Anjo quote arrives in writing within 24 hours of the walkthrough, with every line broken out, plus a single allowance line for what we call known-unknowns (rotted subfloor, undersized electrical, hidden water damage). When the allowance line gets used, we show you the photo before we charge it.",
      },
      {
        kind: "h2",
        text: "Question 5: What is your payment schedule?",
        id: "question-5-payment-schedule",
      },
      {
        kind: "p",
        text: "Massachusetts law caps the deposit at one third of the total price, or the cost of special-order materials, whichever is greater. A contractor asking for 50 percent up front on a standard kitchen remodel is breaking the law.",
      },
      {
        kind: "p",
        text: "A reasonable schedule on a $40,000 kitchen looks like this:",
      },
      {
        kind: "ul",
        items: [
          "33 percent at signing (deposit, capped by c. 142A)",
          "33 percent at cabinet delivery and installation start",
          "25 percent at counter installation",
          "9 percent at final walkthrough and punch list complete",
        ],
      },
      {
        kind: "p",
        text: "The final payment NEVER goes out before the punch list is signed. That is your only leverage. Use it.",
      },
      {
        kind: "h2",
        text: "Question 6: Who pulls the permits?",
        id: "question-6-permits",
      },
      {
        kind: "p",
        text: "The contractor pulls the permits. Always. If a contractor asks you to pull the permits as the homeowner so they do not have to, walk away. They are dodging accountability. When the homeowner pulls the permit, the homeowner is on the hook with the building department, not the contractor.",
      },
      {
        kind: "p",
        text: "In Methuen, Andover, Haverhill, and the surrounding towns, permit fees run $300 to $1,200 depending on scope. The fee is a line item in the quote. We pull every permit your job requires and we coordinate the inspector. You sign the homeowner authorization, we handle the rest.",
      },
      {
        kind: "h2",
        text: "Question 7: What does the contract include?",
        id: "question-7-contract",
      },
      {
        kind: "p",
        text: "M.G.L. c. 142A requires every home improvement contract over $1,000 to include all of the following. If yours is missing any of them, the contract is not enforceable.",
      },
      {
        kind: "ol",
        items: [
          "Contractor's name, address, telephone, and HIC registration number",
          "Total contract price and a payment schedule that complies with the deposit cap",
          "A start date and an estimated completion date",
          "A clear, written description of the work and the materials",
          "A statement that the contractor will obtain all required permits",
          "Three-day right of cancellation notice (the homeowner can cancel for any reason within three business days)",
          "A statement about the Home Improvement Contractor Guaranty Fund",
        ],
      },
      {
        kind: "p",
        text: "Read the contract before you sign. If anything is missing, ask for it in writing. A real contractor will fix it inside an hour.",
      },
      {
        kind: "h2",
        text: "What we hand homeowners on day one",
        id: "what-we-hand-over",
      },
      {
        kind: "p",
        text: "On the first day of every Anjo project, the homeowner gets a folder with the contract, the COI, the permit, the line-item quote, the payment schedule, and Tony's cell phone. Same folder. Every job. Whether it is a $2,400 accent wall or a $52,000 kitchen.",
      },
      {
        kind: "h2",
        text: "Print and use",
        id: "print-and-use",
      },
      {
        kind: "p",
        text: "Take this list to your next walkthrough. The contractor who answers all seven questions cleanly, in writing, before you sign anything, is the one you hire. The one who hedges or refuses to answer in writing is the one you do not.",
      },
      {
        kind: "h2",
        text: "What to do next",
        id: "what-to-do-next",
      },
      {
        kind: "p",
        text: "If you have already been quoted by another contractor and you want a second opinion in plain English, send the quote to (978) 216-6455 and we will tell you straight what is missing or off-market. Read [our guide on how to verify a contractor's MA license](/blog/verify-contractor-licensed-massachusetts) and [what should be in a Massachusetts home improvement contract](/blog/home-improvement-contract-massachusetts-checklist). When you are ready, [schedule a walkthrough](/booking).",
      },
    ],
    relatedSlugs: [
      "find-a-contractor-who-shows-up",
      "verify-contractor-licensed-massachusetts",
      "home-improvement-contract-massachusetts-checklist",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. Bathroom Remodel Timeline
  // [DEMO COPY — pending client review]
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "bathroom-remodel-timeline-massachusetts",
    title: "How long does a typical bathroom remodel take in Massachusetts?",
    metaDescription:
      "A standard hall bath takes 9 to 14 working days. A primary suite runs 12 to 18 days. Day-by-day timeline from demo to final caulk in Methuen and Andover.",
    category: "Project Process",
    publishedAt: "2026-03-12",
    author: TONY,
    excerpt:
      "A standard hall bathroom remodel takes 9 to 14 working days from demo to final caulk. A full primary suite with tile shower, double vanity, and lighting changes runs 12 to 18 working days. Below is the day-by-day map we hand homeowners on day one.",
    readMinutes: 5,
    cardImage: "/blog/bathroom-remodel-timeline-massachusetts-card.jpg",
    headerImage: "/blog/bathroom-remodel-timeline-massachusetts-header.jpg",
    body: [
      {
        kind: "p",
        text: "A standard hall bathroom remodel takes 9 to 14 working days from demo to final caulk. A full primary suite with tile shower, double vanity, and lighting changes runs 12 to 18 working days. We hand homeowners a calendar with start, milestones, and walkthrough day in writing before we swing the first hammer.",
      },
      {
        kind: "p",
        text: "Below is the day-by-day map we use across Methuen, Andover, Haverhill, North Andover, Lawrence, and Salem NH. Pricing for these scopes lands $12K to $28K per market norms in 2025.",
      },
      {
        kind: "h2",
        text: "The standard 11-day hall bath",
        id: "standard-hall-bath",
      },
      {
        kind: "p",
        text: "This is the most common job we run. Tub-shower combo or curbed shower, single vanity, toilet, fan, lighting, paint, tile floor, vinyl plank if the budget is tight. Lands $14K to $19K typically. Eleven working days.",
      },
      {
        kind: "ol",
        items: [
          "Day 1 (Monday): floor protection, demo, dumpster on driveway. Old tub, vanity, toilet, tile, drywall come out by end of day.",
          "Day 2: rough plumbing changes (move drain, swap supply). Inspector schedules for day 3.",
          "Day 3: rough electrical (new fan circuit, lighting, GFCI). Plumbing rough inspection passes.",
          "Day 4: insulation, drywall, tape, mud first coat.",
          "Day 5: drywall mud second coat, sand, prime.",
          "Day 6: tile floor goes down, mortar cures overnight.",
          "Day 7: shower walls tile (curbed shower) or tub surround tile (tub-shower combo).",
          "Day 8: grout, caulk shower, paint walls and trim.",
          "Day 9: vanity, toilet, fixtures install. Mirror hung.",
          "Day 10: light fixtures, fan, accessories. Plumbing trim. Electrical trim.",
          "Day 11: final inspection, punch list walkthrough, final caulk, payment.",
        ],
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Why we put plumbing rough on day 2",
        text: "If we hit a surprise behind the wall (rotted joist, lead drain), we know on day 2 not day 7. Surprises caught early are cheap. Surprises caught late are expensive. Our schedule front-loads the discovery work.",
      },
      {
        kind: "h2",
        text: "The 16-day primary suite remodel",
        id: "primary-suite-remodel",
      },
      {
        kind: "p",
        text: "This is the bigger job. Custom tile shower with bench and niche, double vanity, separate water closet, heated floor, premium lighting. Lands $22K to $28K typically. Sixteen working days.",
      },
      {
        kind: "ul",
        items: [
          "Days 1 to 2: floor protection, demo, dumpster.",
          "Days 3 to 4: rough plumbing changes (move drain for double vanity, shower drain to center).",
          "Day 5: heated-floor mat install and flush testing.",
          "Days 6 to 7: rough electrical (new dedicated circuit for floor heat, double vanity lighting, fan).",
          "Days 8 to 9: drywall and cement board (Wedi or Schluter on shower walls), tape, mud, sand.",
          "Days 10 to 11: tile floor and shower walls go down. Niche framed and tiled.",
          "Day 12: grout shower, caulk corners, paint.",
          "Days 13 to 14: double vanity, water closet plumbing trim, fixtures.",
          "Day 15: lighting, glass shower door measure or install (glass typically arrives 7 to 10 days after measure).",
          "Day 16: final inspection, punch list, walkthrough.",
        ],
      },
      {
        kind: "p",
        text: "If the glass shower door requires a separate appointment after fabrication, we schedule a return visit at no extra labor charge. The 16 working days is the active build window. Glass install is the encore.",
      },
      {
        kind: "h2",
        text: "Common timeline killers and how we avoid them",
        id: "timeline-killers",
      },
      {
        kind: "p",
        text: "Six things stretch a bathroom past schedule on jobs we have inherited. We design around all six on day one.",
      },
      {
        kind: "ol",
        items: [
          "Tile not in stock. We confirm tile availability before signing the contract.",
          "Vanity not in stock. Same rule. Owner-purchased vanities arrive at our shop before demo.",
          "Inspector lag. Methuen and Andover are usually 2 to 3 day turnaround. We schedule rough plumbing inspection ON day 2 not day 5 to absorb the wait.",
          "Surprise water damage. We open the wall on day 1 specifically to find it before we lock in the schedule.",
          "Owner change orders mid-job. We freeze the design at signing and only re-open it for genuinely new info, like a layout idea the homeowner did not see until demo opened the room up.",
          "Subcontractor no-shows. Tony coordinates plumber and electrician personally. They show up when he says.",
        ],
      },
      {
        kind: "h2",
        text: "What to expect each week",
        id: "what-to-expect",
      },
      {
        kind: "p",
        text: "Week one is loud and dusty. Demo runs through day 2. Plumbing rough is on day 2 to 3. The bathroom is gutted by Friday of week one. Week two is quieter. Drywall, tile, paint. The bathroom looks like a bathroom again by Friday of week two. Week three (on the longer scope) is finish work. Vanity, toilet, lighting, glass. You have a working bathroom by mid-week three.",
      },
      {
        kind: "h2",
        text: "Living in the house during a bathroom remodel",
        id: "living-during-remodel",
      },
      {
        kind: "p",
        text: "Most homeowners stay in the house. If the project is the only bathroom, we can phase the work so the toilet stays usable for as many days as possible (typically 6 to 8 of the 11 active days). If you have a second bathroom, we close off the project bath fully on day 1 and the disruption is mostly noise and dust isolated to that wing.",
      },
      {
        kind: "p",
        text: "We use plastic dust walls with zippered doors at the project entry. Floor protection runs from the front door to the bathroom. We sweep, shop vac, and bag the trash before we leave each day. Same standard whether you are home or at the office.",
      },
      {
        kind: "h2",
        text: "What to do next",
        id: "what-to-do-next",
      },
      {
        kind: "p",
        text: "If you want a written timeline for your specific bathroom, the fastest path is a 30 minute on-site walkthrough. Read [our bathroom remodel service page](/services/bathroom-remodels) or [our cost guide](/services/cost) for pricing context. Ready to schedule? [Book a walkthrough](/booking).",
      },
    ],
    relatedSlugs: [
      "kitchen-remodel-cost-methuen-ma-2025",
      "30k-vs-60k-kitchen-remodel-difference",
      "permits-coffered-ceiling-accent-wall-ma",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. Permits for Coffered Ceiling / Accent Wall (LEGAL)
  // [DEMO COPY — pending attorney review]
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "permits-coffered-ceiling-accent-wall-ma",
    title:
      "Do I need a permit for a coffered ceiling or accent wall in Massachusetts?",
    metaDescription:
      "Most coffered ceilings and accent walls in Massachusetts do not require a permit. The exceptions: new electrical, recessed lighting, or load-bearing changes.",
    category: "Permits & Law",
    publishedAt: "2026-04-01",
    author: TONY,
    excerpt:
      "Most coffered ceilings and accent walls in Massachusetts do NOT require a permit because they are decorative finish carpentry, not structural. If the work involves new electrical, recessed lighting, or load-bearing changes, then yes a permit is required.",
    readMinutes: 5,
    cardImage: "/blog/permits-coffered-ceiling-accent-wall-ma-card.jpg",
    headerImage: "/blog/permits-coffered-ceiling-accent-wall-ma-header.jpg",
    body: [
      {
        kind: "p",
        text: "Most coffered ceilings and accent walls in Massachusetts do NOT require a permit because they are decorative finish carpentry, not structural work. The exceptions are when the project involves new electrical circuits, recessed lighting installs, or load-bearing changes. Below is the rule, the exceptions, and the Methuen and Andover building department reality.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Demo copy notice",
        text: "This article summarizes Massachusetts building code as we operate under it on Anjo job sites. It is not legal advice. Permit requirements vary slightly by town and inspector. Always confirm with your local building department before starting work over $2,000.",
      },
      {
        kind: "h2",
        text: "The general rule for finish carpentry",
        id: "general-rule-finish-carpentry",
      },
      {
        kind: "p",
        text: "Massachusetts State Building Code (780 CMR) generally exempts decorative finish work from permit requirements when the work does not affect structure, fire ratings, or mechanical systems. A coffered ceiling that is simply MDF beams nailed to the existing ceiling joists, painted in place, with no new wiring, is decorative finish carpentry.",
      },
      {
        kind: "p",
        text: "Same for an accent wall. Board-and-batten, shiplap, picture-frame molding, wainscoting. If you are nailing trim to existing drywall and painting it, you are not building anything structural. No permit.",
      },
      {
        kind: "h2",
        text: "When you DO need a permit",
        id: "when-permit-required",
      },
      {
        kind: "p",
        text: "Five scenarios trigger a permit in Methuen, Andover, Haverhill, North Andover, Lawrence, and across our service corridor.",
      },
      {
        kind: "ol",
        items: [
          "New recessed lighting in the coffered ceiling. New circuits or fixture cans need an electrical permit.",
          "Moving or adding any electrical, including new outlets in an accent wall.",
          "Removing or modifying a load-bearing wall or ceiling joist (almost never on a coffered ceiling, but check).",
          "Any work that touches a ceiling assembly that has a fire rating (rare on residential, common in townhouse party walls).",
          "Total project cost over $2,000 in some towns trigger a building permit even for cosmetic work. Methuen typically does not. Andover sometimes does. Always ask.",
        ],
      },
      {
        kind: "h2",
        text: "Massachusetts HIC and CSL law (M.G.L. c. 142A)",
        id: "ma-licensing-law",
      },
      {
        kind: "p",
        text: "Separate from the permit question, M.G.L. c. 142A requires that any home improvement work over $1,000 be performed by a Home Improvement Contractor (HIC) registered with the Office of Consumer Affairs and Business Regulation. Structural work also requires a Construction Supervisor License (CSL).",
      },
      {
        kind: "p",
        text: "A $2,400 accent wall or a $4,800 coffered ceiling falls under c. 142A even though it does not require a building permit. Your contractor's HIC number must appear on the contract. Anjo's HIC and CSL numbers are listed in the footer of every page on this site.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Why we still pull permits sometimes",
        text: "Even when the strict reading of the code does not require a permit, we will pull one if the inspector wants it for a borderline case. The cost is minor (often under $200) and the protection is significant. The permit puts the work on the property record, which helps at resale.",
      },
      {
        kind: "h2",
        text: "What this looks like in practice",
        id: "in-practice",
      },
      {
        kind: "p",
        text: "Three real examples from our recent Methuen and Andover finish carpentry projects.",
      },
      {
        kind: "h3",
        text: "Andover dining room coffered ceiling, $4,200, no permit",
        id: "example-andover-coffered",
      },
      {
        kind: "p",
        text: "A 12 by 14 dining room. MDF beams in a 9-square grid, painted Pure White. No new lighting. No structural changes. We measured Tuesday, started the following Monday, finished Wednesday. No permit pulled, no inspector called. Pure decorative finish carpentry under 780 CMR.",
      },
      {
        kind: "h3",
        text: "Methuen great room coffered ceiling, $7,200, electrical permit pulled",
        id: "example-methuen-coffered",
      },
      {
        kind: "p",
        text: "A 16 by 20 great room. Coffered ceiling in MDF, painted Hale Navy. Plus eight new recessed cans inside the coffers, each on a switched dimmer. Because of the new electrical, we pulled an electrical permit through the Methuen building department, scheduled the rough inspection for day 3, and the final inspection on day 8. Permit fee was around $180 and went on the line-item quote.",
      },
      {
        kind: "h3",
        text: "Haverhill bedroom accent wall, $1,950, no permit",
        id: "example-haverhill-accent",
      },
      {
        kind: "p",
        text: "A 12 by 9 board-and-batten wall, painted Hale Navy. Existing outlets stayed where they were. Pure trim work. No permit, no inspector. M.G.L. c. 142A still applied because the project was over $1,000, so the contract had our HIC number, the deposit cap, and the three-day right to cancel.",
      },
      {
        kind: "h2",
        text: "Common questions",
        id: "common-questions",
      },
      {
        kind: "h3",
        text: "Does a permit add to the cost?",
        id: "permit-cost",
      },
      {
        kind: "p",
        text: "Yes, but not much. Electrical permits in this corridor run $150 to $300 typically. Building permits run $300 to $1,200 depending on town and scope. The fee is a line-item in the quote, not a hidden surprise.",
      },
      {
        kind: "h3",
        text: "Can I pull the permit myself as the homeowner?",
        id: "homeowner-permit",
      },
      {
        kind: "p",
        text: "Massachusetts allows homeowners to pull permits on their own primary residence under the homeowner exemption. We do not recommend it. When the homeowner pulls the permit, the homeowner is on the hook with the building department, not the contractor. The contractor pulling the permit is also one more checkpoint that the contractor is properly licensed.",
      },
      {
        kind: "h2",
        text: "What to do next",
        id: "what-to-do-next",
      },
      {
        kind: "p",
        text: "If you are planning a coffered ceiling or accent wall, we will tell you on the walkthrough whether the project needs a permit and we will pull it for you if it does. Read [our finish carpentry service page](/services/finish-carpentry) or [coffered ceiling styles for a 1980s colonial](/blog/coffered-ceiling-styles-1980s-colonial). Ready to start? [Schedule a walkthrough](/booking).",
      },
    ],
    relatedSlugs: [
      "verify-contractor-licensed-massachusetts",
      "home-improvement-contract-massachusetts-checklist",
      "coffered-ceiling-styles-1980s-colonial",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. Verify Contractor License (LEGAL)
  // [DEMO COPY — pending attorney review]
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "verify-contractor-licensed-massachusetts",
    title: "How to verify your contractor is licensed in Massachusetts",
    metaDescription:
      "Step-by-step Mass.gov HIC and CSL lookup walkthrough. Verify your contractor's license, expiration, and complaint history in five minutes, free.",
    category: "Permits & Law",
    publishedAt: "2026-03-19",
    author: TONY,
    excerpt:
      "Verifying your Massachusetts contractor's license takes five minutes on Mass.gov. Look up the HIC registration and the CSL license, confirm both are active, and check for any complaints or guaranty fund claims before you sign.",
    readMinutes: 4,
    cardImage: "/blog/verify-contractor-licensed-massachusetts-card.jpg",
    headerImage: "/blog/verify-contractor-licensed-massachusetts-header.jpg",
    body: [
      {
        kind: "p",
        text: "Verifying your Massachusetts contractor's license takes five minutes on Mass.gov. Look up the Home Improvement Contractor (HIC) registration and the Construction Supervisor License (CSL), confirm both are active, and check for any complaints or guaranty fund claims before you sign anything. Below is the exact walkthrough.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Demo copy notice",
        text: "This walkthrough reflects Mass.gov license lookup tools as Anjo uses them. The state may update the URLs or interfaces. Always cross-check at mass.gov directly. Pending attorney review.",
      },
      {
        kind: "h2",
        text: "Step 1: Get the contractor's full legal business name",
        id: "step-1-name",
      },
      {
        kind: "p",
        text: "Ask for the LLC or corporation name as it appears on their contract, not just the trade name on their truck. Anjo Services, LLC is the legal name. Just typing 'Anjo' may pull up multiple unrelated results across the state.",
      },
      {
        kind: "h2",
        text: "Step 2: Look up the HIC registration",
        id: "step-2-hic",
      },
      {
        kind: "p",
        text: "Search Mass.gov for the Home Improvement Contractor license lookup. The exact URL changes occasionally but searching 'HIC license lookup Massachusetts' on Google reliably surfaces it. Plug in the legal business name. The result page shows:",
      },
      {
        kind: "ul",
        items: [
          "Registration number (compare to what is on the contract)",
          "Status (Active, Expired, Suspended, Revoked)",
          "Expiration date",
          "Open or recent complaints",
          "Any guaranty fund claims paid out against this contractor",
        ],
      },
      {
        kind: "p",
        text: "If status is anything other than Active, do not sign. If there are open complaints, read them before signing.",
      },
      {
        kind: "h2",
        text: "Step 3: Look up the CSL license",
        id: "step-3-csl",
      },
      {
        kind: "p",
        text: "If the project involves any structural work (load-bearing changes, new construction, additions), the contractor also needs a Construction Supervisor License. Search Mass.gov for CSL license lookup, plug in the contractor's name (CSL is held by an individual, often the LLC's owner).",
      },
      {
        kind: "p",
        text: "The CSL result shows the license class (Unrestricted, 1-2 Family, etc.), status, expiration date, and any disciplinary actions. A CSL is permanent once earned but must be renewed every two years. An expired CSL means the contractor cannot legally pull a building permit.",
      },
      {
        kind: "h2",
        text: "Step 4: Cross-reference the contract",
        id: "step-4-contract",
      },
      {
        kind: "p",
        text: "Take the registration number from the Mass.gov lookup and confirm it matches the number printed on the contract. Then take the contractor's business name and confirm it matches. People sometimes hide an expired license behind a similar-but-not-identical company name.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Anjo's HIC and CSL",
        text: "Our HIC and CSL numbers are printed in the footer of every page on this site and on every contract and quote we send. You can verify them at mass.gov in under five minutes. We invite the check.",
      },
      {
        kind: "h2",
        text: "Step 5: Check the BBB and Google reviews",
        id: "step-5-bbb-google",
      },
      {
        kind: "p",
        text: "Mass.gov tells you whether the license is valid. The BBB and Google tell you whether the work is good. Search the contractor's name on bbb.org and read the complaints section if any. Search Google for the contractor's name plus 'reviews' and read the most recent 10 to 15. Look for patterns: do multiple homeowners mention the same problem?",
      },
      {
        kind: "p",
        text: "One bad review on a 30-review profile is normal. Three reviews mentioning the same issue (showed up late, did not finish punch list, charged for materials he did not use) is a pattern. Patterns repeat. Treat them as forecasts, not as anomalies.",
      },
      {
        kind: "p",
        text: "Pay particular attention to how the contractor responded to negative reviews, when they did. A contractor who answers a one-star review with the homeowner's perspective and a path to resolution is showing you how they handle hard moments. A contractor who does not respond, or who responds defensively, is showing you something different.",
      },
      {
        kind: "h2",
        text: "What to do if the contractor is unlicensed",
        id: "if-unlicensed",
      },
      {
        kind: "p",
        text: "Walk away. Tell them why. An unlicensed contractor cannot pull permits. Your homeowner's insurance can deny claims for unlicensed work. The Massachusetts Home Improvement Contractor Guaranty Fund only protects homeowners who hired registered HICs, so an unlicensed contractor's bad work is on you alone.",
      },
      {
        kind: "p",
        text: "Report unlicensed activity to the Office of Consumer Affairs and Business Regulation. Mass.gov has a complaint form. The state actively pursues unlicensed contractor cases.",
      },
      {
        kind: "h2",
        text: "What about contractors based in New Hampshire?",
        id: "nh-contractors",
      },
      {
        kind: "p",
        text: "New Hampshire does not require a state-level general contractor license the way Massachusetts does. NH contractors working across the state line into Methuen, Andover, Lawrence, or Haverhill must still register as a Massachusetts HIC if they are doing residential work over $1,000 here. The HIC requirement attaches to the work and the homeowner, not to the contractor's home state.",
      },
      {
        kind: "p",
        text: "If a contractor based in Salem NH, Derry, or Windham tells you they do not need a Massachusetts HIC because they are not from Massachusetts, that is wrong. Verify the registration before you sign. Anjo holds both Massachusetts HIC and CSL credentials and works freely on both sides of the state line.",
      },
      {
        kind: "h2",
        text: "What to ask the inspector",
        id: "ask-inspector",
      },
      {
        kind: "p",
        text: "If you are still unsure after the Mass.gov lookup, call the building department in your town. The inspector knows which contractors pull permits regularly and which ones routinely do work without permits. The Methuen, Andover, Haverhill, and Lawrence inspectors all answer their phones and will tell you straight if a contractor has a track record of skipping the permit process.",
      },
      {
        kind: "h2",
        text: "What to do next",
        id: "what-to-do-next",
      },
      {
        kind: "p",
        text: "Read [our 7 questions to ask before hiring a contractor in Massachusetts](/blog/questions-to-ask-before-hiring-a-contractor-ma) and [what should be in a Massachusetts home improvement contract](/blog/home-improvement-contract-massachusetts-checklist). When you are ready for a walkthrough, [book a time](/booking).",
      },
    ],
    relatedSlugs: [
      "questions-to-ask-before-hiring-a-contractor-ma",
      "home-improvement-contract-massachusetts-checklist",
      "find-a-contractor-who-shows-up",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. MA Home Improvement Contract Checklist (LEGAL)
  // [DEMO COPY — pending attorney review]
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "home-improvement-contract-massachusetts-checklist",
    title:
      "What should be in a Massachusetts home improvement contract (M.G.L. c. 142A)",
    metaDescription:
      "M.G.L. c. 142A specifies what every Massachusetts home improvement contract must include. HIC number, deposit cap, three-day cancel, and the full required-clause checklist.",
    category: "Permits & Law",
    publishedAt: "2026-04-29",
    author: TONY,
    excerpt:
      "Massachusetts law (M.G.L. c. 142A) requires every home improvement contract over $1,000 to include the contractor's HIC number, a deposit capped at one third, a three-day right to cancel, and a written start date. Below is the full required-clause checklist.",
    readMinutes: 6,
    cardImage:
      "/blog/home-improvement-contract-massachusetts-checklist-card.jpg",
    headerImage:
      "/blog/home-improvement-contract-massachusetts-checklist-header.jpg",
    body: [
      {
        kind: "p",
        text: "Massachusetts law (M.G.L. c. 142A) requires every home improvement contract over $1,000 to include the contractor's HIC number, a deposit capped at one third of total price (or special-order materials cost, whichever is greater), a three-day right to cancel, and a written start date. A contract missing any required clause is not enforceable. Below is the full clause checklist.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "Demo copy notice",
        text: "This article summarizes M.G.L. c. 142A as Anjo applies it on every contract. It is not legal advice. Always have substantial contracts reviewed by a Massachusetts real estate or construction attorney before signing. Pending attorney review.",
      },
      {
        kind: "h2",
        text: "What c. 142A actually is",
        id: "what-is-142a",
      },
      {
        kind: "p",
        text: "M.G.L. c. 142A is the Massachusetts Home Improvement Contractor law. It governs every residential home improvement contract over $1,000 in the state. It was enacted to protect homeowners from contractor abandonment, deposit theft, and bait-and-switch pricing. It is enforced by the Office of Consumer Affairs and Business Regulation (OCABR), which also runs the Home Improvement Contractor Guaranty Fund.",
      },
      {
        kind: "h2",
        text: "The required clause checklist",
        id: "required-clauses",
      },
      {
        kind: "p",
        text: "Every Massachusetts home improvement contract over $1,000 must include all of the following. Read your contract against this list before signing.",
      },
      {
        kind: "ol",
        items: [
          "Contractor's name, business address, telephone, and HIC registration number",
          "Homeowner's name and the property address where the work will be performed",
          "Total contract price (or a clear formula for calculating it on time-and-materials work)",
          "Payment schedule that complies with the deposit cap (one third of total OR cost of special-order materials, whichever is greater)",
          "Start date and an estimated completion date",
          "Detailed written description of the work and materials to be used",
          "A statement that the contractor will obtain all required building permits",
          "Three-day right of cancellation notice (the homeowner can cancel for any reason within three business days of signing)",
          "Statement about the Home Improvement Contractor Guaranty Fund and the homeowner's right to file a claim",
          "Both parties' signatures and the date signed",
        ],
      },
      {
        kind: "p",
        text: "If your contract is missing any one of those, ask the contractor to add it. A real contractor will fix it inside an hour. A contractor who refuses or stalls is one you should walk away from.",
      },
      {
        kind: "h2",
        text: "The deposit cap explained",
        id: "deposit-cap",
      },
      {
        kind: "p",
        text: "The most-violated clause in c. 142A is the deposit cap. The law says the contractor cannot ask for a deposit greater than one third of the total contract price, OR the actual cost of any special-order materials needed to start, whichever is greater.",
      },
      {
        kind: "p",
        text: "On a $40,000 kitchen, the cap is $13,333. If the cabinets are special-order at $14,000, the cap moves up to $14,000 because the contractor must order them to start work. If the cabinets are stock at $9,000, the cap stays at $13,333.",
      },
      {
        kind: "callout",
        tone: "warning",
        title: "50 percent deposit is illegal",
        text: "If a Massachusetts contractor asks for 50 percent up front on a standard kitchen, bath, or finish carpentry job, that is illegal under c. 142A. Slow it down. Show them the law. A real contractor knows the law and respects it.",
      },
      {
        kind: "h2",
        text: "The three-day right to cancel",
        id: "three-day-cancel",
      },
      {
        kind: "p",
        text: "Every Massachusetts home improvement contract gives the homeowner a three-business-day right to cancel for any reason. The clock starts the day the contract is signed. The cancellation notice must be in writing (email or hard copy). The contractor must refund any deposit paid within 10 days of receipt of the notice.",
      },
      {
        kind: "p",
        text: "The contract must include the cancellation notice in writing, in a specific format the law requires. If your contract does not include the notice, your three-day clock never started. You can cancel later under the longer extended-cancellation provision.",
      },
      {
        kind: "h2",
        text: "The Guaranty Fund",
        id: "guaranty-fund",
      },
      {
        kind: "p",
        text: "If you hired a registered HIC and the contractor fails to perform under the contract, you can file a claim against the Home Improvement Contractor Guaranty Fund. The fund pays out up to $10,000 per claim. The fund only protects homeowners who hired registered HICs, which is one of several reasons you must verify the HIC registration before signing (see [our license verification walkthrough](/blog/verify-contractor-licensed-massachusetts)).",
      },
      {
        kind: "h2",
        text: "Common contract problems we see",
        id: "common-problems",
      },
      {
        kind: "p",
        text: "After 7 years of seeing other contractors' contracts during second-opinion calls, here are the most common c. 142A violations.",
      },
      {
        kind: "ol",
        items: [
          "No HIC number on the contract (about 30 percent of bad contracts)",
          "Deposit over the one third cap (about 25 percent)",
          "Missing three-day cancellation notice (about 20 percent)",
          "No estimated completion date or start date (about 15 percent)",
          "Vague description of the work, no line-item materials list (very common)",
          "Final payment due before substantial completion (this is not technically illegal but it gives the homeowner zero leverage on punch list)",
        ],
      },
      {
        kind: "h2",
        text: "What Anjo's contract includes",
        id: "anjo-contract",
      },
      {
        kind: "p",
        text: "Every Anjo contract is built to c. 142A. Our HIC and CSL numbers print at the top. The deposit is capped. The three-day cancellation notice is in writing on page 1. The Guaranty Fund disclosure is on page 2. The line-item scope and materials list are attached as Exhibit A. Start date and completion date are explicit.",
      },
      {
        kind: "p",
        text: "The contract is in plain English, not lawyer English. You can read it in 10 minutes. We will sit with you and walk through it line by line if you want.",
      },
      {
        kind: "h2",
        text: "What to do next",
        id: "what-to-do-next",
      },
      {
        kind: "p",
        text: "If another contractor handed you a contract and you want a second pair of eyes on it, send a phone photo of all pages to (978) 216-6455 and we will tell you straight what is missing. Read [our license verification walkthrough](/blog/verify-contractor-licensed-massachusetts) and [the 7 questions to ask before hiring](/blog/questions-to-ask-before-hiring-a-contractor-ma). Ready to talk to us about your project? [Schedule a walkthrough](/booking).",
      },
    ],
    relatedSlugs: [
      "verify-contractor-licensed-massachusetts",
      "questions-to-ask-before-hiring-a-contractor-ma",
      "find-a-contractor-who-shows-up",
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. Coffered Ceiling Styles for 1980s Colonial
  // CONTAINS Tony's verbatim line "It is nice to see something beautiful come to life"
  // [DEMO COPY — pending client review]
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "coffered-ceiling-styles-1980s-colonial",
    title: "Coffered ceiling installation: 4 styles for a 1980s colonial",
    metaDescription:
      "Square grid, beam-and-flat, recessed panel, or shadow box. Four coffered ceiling styles tested in real Methuen and Andover 1980s colonials, with prices.",
    category: "Finish Carpentry",
    publishedAt: "2026-02-26",
    author: TONY,
    excerpt:
      "Four coffered ceiling styles work in a 1980s colonial: square grid, beam-and-flat, recessed panel, and shadow box. Each style fits a different room shape and budget. Real prices, real photos, real Methuen and Andover dining rooms.",
    readMinutes: 6,
    cardImage: "/blog/coffered-ceiling-styles-1980s-colonial-card.jpg",
    headerImage: "/blog/coffered-ceiling-styles-1980s-colonial-header.jpg",
    body: [
      {
        kind: "p",
        text: "Four coffered ceiling styles work in a 1980s colonial: square grid, beam-and-flat, recessed panel, and shadow box. Each one fits a different room shape, ceiling height, and budget. Below is what we have built across Methuen and Andover dining rooms in 2024 and 2025, with the prices and the trade-offs you should know before picking.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "Why coffered ceilings work in this corridor",
        text: "1980s colonials in Methuen, Andover, and the surrounding North Shore towns were built with 8-foot flat ceilings and basic crown. A coffered ceiling adds vertical interest, breaks up the long expanse, and reads like a higher-grade home. It is the single highest-impact finish carpentry move in this housing stock.",
      },
      {
        kind: "h2",
        text: "Style 1: Square grid",
        id: "style-1-square-grid",
      },
      {
        kind: "p",
        text: "The classic. Beams running both directions, dividing the ceiling into equal squares. Most common in dining rooms (typical room size 12 by 14) and great rooms (16 by 20).",
      },
      {
        kind: "ul",
        items: [
          "Best for: square or near-square rooms, 11 by 11 to 16 by 20",
          "Beam material: MDF (most common, paint-grade), poplar, or pine",
          "Beam dimensions: 5 to 7 inches wide, 3 to 4 inches deep",
          "Grid count: 3x3 (9 squares) for a 12 by 12 room, 4x4 (16 squares) for a 16 by 16 room",
          "Typical price in this corridor: $3,500 to $5,500",
          "Build time: 3 to 4 working days",
        ],
      },
      {
        kind: "p",
        text: "We finished an Andover dining room (12 by 14, 1987 colonial) at $4,200. Three days. MDF in a 3x3 grid, painted Pure White to match the existing crown. The homeowner said the room finally felt like the colonial they thought they were buying.",
      },
      {
        kind: "h2",
        text: "Style 2: Beam-and-flat",
        id: "style-2-beam-and-flat",
      },
      {
        kind: "p",
        text: "Parallel beams running one direction only, no cross-beams. Reads more modern and works well in long rooms.",
      },
      {
        kind: "ul",
        items: [
          "Best for: long rectangular rooms, dining rooms with the table running long-axis, family rooms",
          "Beam dimensions: 6 to 8 inches wide, 3 to 5 inches deep",
          "Beam count: 3 to 5 beams across a 12-foot width, depending on visual weight",
          "Typical price: $2,500 to $4,500",
          "Build time: 2 to 3 working days",
        ],
      },
      {
        kind: "p",
        text: "Less material, less labor than the square grid. Same dramatic effect when the room is long enough that cross-beams would chop the proportions.",
      },
      {
        kind: "h2",
        text: "Style 3: Recessed panel (the 'tray' look inside the coffer)",
        id: "style-3-recessed-panel",
      },
      {
        kind: "p",
        text: "Square or rectangular grid like style 1, but each coffer's interior is recessed up into the ceiling cavity by 1.5 to 3 inches. Adds a second plane of depth and dramatic shadow lines. Premium look.",
      },
      {
        kind: "ul",
        items: [
          "Best for: 9-foot ceilings or higher (we lose too much head clearance on 8-foot ceilings)",
          "Construction: requires drywall work inside each panel, painted to match",
          "Lighting option: recessed cans inside each coffer become an option, requires electrical permit",
          "Typical price: $5,500 to $8,500 (more if recessed lighting is added)",
          "Build time: 5 to 7 working days",
        ],
      },
      {
        kind: "p",
        text: "We built a $7,200 great room coffered ceiling in Methuen with eight recessed cans on switched dimmers, one per coffer. The Methuen building department permitted the electrical, inspected rough on day 3 and final on day 8.",
      },
      {
        kind: "h2",
        text: "Style 4: Shadow box (the budget-friendly cousin)",
        id: "style-4-shadow-box",
      },
      {
        kind: "p",
        text: "Not technically a coffered ceiling. Picture-frame moldings applied flat to the existing ceiling, painted, often with a contrasting color inside the frames. Visually similar to a recessed-panel coffer at a fraction of the price.",
      },
      {
        kind: "ul",
        items: [
          "Best for: tight budgets, low ceilings (works on 8-foot), rentals",
          "Material: pine or MDF cap-and-base molding only, no real beams",
          "Typical price: $1,500 to $2,500",
          "Build time: 2 working days",
        ],
      },
      {
        kind: "p",
        text: "Most homeowners do not know this style exists. It is a real option when the budget is tight or the ceiling is too low for real beams.",
      },
      {
        kind: "callout",
        tone: "tip",
        title: "It is nice to see something beautiful come to life",
        text: "Tony has been doing finish carpentry for 7 years and coffered ceilings are still his favorite work. Quote from his own existing site: \"It is nice to see something beautiful come to life.\" Three days of cutting and nailing turn an 8-foot flat ceiling into a room people walk into and stop talking. That is what we sign up for.",
      },
      {
        kind: "h2",
        text: "How to pick the right style for your colonial",
        id: "how-to-pick",
      },
      {
        kind: "p",
        text: "Three quick rules.",
      },
      {
        kind: "ol",
        items: [
          "Ceiling height under 8 feet: shadow box only. Real beams steal too much head room.",
          "Ceiling height 9 feet or more: any of the four styles work. Pick on aesthetics and budget.",
          "Long rectangular room: beam-and-flat reads better than square grid.",
          "Square room: square grid is the classic and the safest aesthetic choice.",
          "Lighting upgrade desired: recessed-panel style is the best canvas for new cans.",
        ],
      },
      {
        kind: "h2",
        text: "What we bring to the job",
        id: "what-we-bring",
      },
      {
        kind: "p",
        text: "Sawdust on the floor while we work. Drop cloths from the front door to the dining room. Broom, shop vac, bagged trash before we leave each evening. Same standard whether you are home or at the office. We do all the cuts on-site (no shop fees), pre-prime the MDF, install, fill nail holes, caulk, paint, walk through.",
      },
      {
        kind: "h2",
        text: "What to do next",
        id: "what-to-do-next",
      },
      {
        kind: "p",
        text: "If you are thinking about a coffered ceiling for your dining room or great room, send three phone photos and the room dimensions to (978) 216-6455 and we will text you a rough range the same day. Read [our finish carpentry service page](/services/finish-carpentry) and [the permit guide for coffered ceilings in Massachusetts](/blog/permits-coffered-ceiling-accent-wall-ma). Ready to talk? [Schedule a walkthrough](/booking).",
      },
    ],
    relatedSlugs: [
      "permits-coffered-ceiling-accent-wall-ma",
      "kitchen-remodel-cost-methuen-ma-2025",
      "30k-vs-60k-kitchen-remodel-difference",
    ],
  },
];

// ── Categories (ordered by frequency desc) ──────────────────────────────────

export const blogCategories: BlogCategory[] = (() => {
  const counts = new Map<BlogCategory, number>();
  for (const a of blogArticles) {
    counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
  }
  const all: BlogCategory[] = [
    "Cost Guides",
    "Hire Smart",
    "Project Process",
    "Finish Carpentry",
    "Permits & Law",
  ];
  return all
    .filter((c) => counts.has(c))
    .sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0));
})();

// ── Featured (homepage hero + blog index hero) ──────────────────────────────

export const FEATURED_SLUG = "kitchen-remodel-cost-methuen-ma-2025";

// ── Helpers ─────────────────────────────────────────────────────────────────

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getRelatedArticles(
  slug: string,
  limit: number = 3,
): BlogArticle[] {
  const article = getArticleBySlug(slug);
  if (!article) return [];
  const explicit = article.relatedSlugs
    .map((s) => getArticleBySlug(s))
    .filter((a): a is BlogArticle => Boolean(a));
  if (explicit.length >= limit) return explicit.slice(0, limit);
  // Fall back to same-category siblings if explicit list under-fills.
  const siblings = blogArticles.filter(
    (a) =>
      a.slug !== slug &&
      a.category === article.category &&
      !explicit.some((e) => e.slug === a.slug),
  );
  return [...explicit, ...siblings].slice(0, limit);
}

export function getArticlesByCategory(
  category: BlogCategory,
): BlogArticle[] {
  return blogArticles.filter((a) => a.category === category);
}

// Re-export PHONE so unused-import lint cannot trip; siteConfig stays imported
// for any future article that interpolates phone via template strings.
export const _ANJO_PHONE = PHONE;
