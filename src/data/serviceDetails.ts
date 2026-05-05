/**
 * serviceDetails.ts — Anjo Services per-service page content.
 *
 * Source-of-truth for /services/[slug] dynamic pages. Each ServiceDetail is
 * keyed by the slug declared in /data/site.ts services[] (LOCKED ORDER:
 * finish-carpentry leads). Imported by:
 *   - src/app/services/[slug]/page.tsx        (generateStaticParams + metadata)
 *   - src/app/services/[slug]/ServicePageClient.tsx  (page render)
 *
 * Voice rules (per CLAUDE.md Copy Writing Rule):
 *   - Zero em dashes (—). Commas, periods, ellipses only.
 *   - Phone-review register, not press quote.
 *   - Specific nouns, real towns, real prices.
 *
 * Per CLAUDE.md Copy Writing Rule "Act as business owner when data is thin":
 * Every invented copy block carries // [DEMO COPY — pending client review].
 *
 * Pricing bands sourced verbatim from market-intelligence.md §4 (typical
 * 2025 ranges, North Shore MA + southern NH) — match exactly, never improvise.
 *
 * Tony's verbatim authentic line "It is nice to see something beautiful come
 * to life" leads finish-carpentry per market-intelligence.md §9 directive #4
 * + initial-business-data.md §4 brand identity.
 */

import type { Service } from "./site";

export type ServiceSlug = Service["slug"];

export type WhatYouGetItem = {
  emoji: string;
  headline: string;
  body: string;
};

export type WhoItsForItem = {
  emoji: string;
  persona: string;
  description: string;
};

export type HowItWorksStep = {
  emoji: string;
  title: string;
  body: string;
};

export type ServiceFaqItem = {
  q: string;
  a: string;
};

export type PriceBand = {
  label: string;          // e.g. "Budget", "Mid-range", "High-end"
  range: string;          // e.g. "$25K to $35K"
  example: string;        // e.g. "Cabinet refresh + counters in Methuen"
};

export type ServiceDetail = {
  heroEyebrow: string;
  heroH1: string;
  heroSubhead: string;
  pullQuote?: string;
  whatYouGet: WhatYouGetItem[];
  whoItsFor: WhoItsForItem[];
  howItWorks: HowItWorksStep[];
  serviceFaqs: ServiceFaqItem[];
  priceBands: PriceBand[];
};

// ─── Service Details ────────────────────────────────────────────────────────
// Order matches site.ts services[] — finish-carpentry leads.

export const serviceDetails: Record<ServiceSlug, ServiceDetail> = {
  // [DEMO COPY — pending client review]
  // Lead with Tony's verbatim authentic line per market-intelligence.md §9
  // directive #4 + initial-business-data.md §4 brand identity.
  "finish-carpentry": {
    heroEyebrow: "Finish Carpentry & Accent Walls",
    heroH1: "Finish Carpentry & Accent Walls",
    // [REAL] verbatim from initial-business-data.md §4 — Tony's own words
    heroSubhead:
      "It is nice to see something beautiful come to life. Coffered ceilings, board and batten, shiplap, custom millwork. The Pinterest photo you saved last Tuesday at 11pm, built and trimmed in three to six days.",
    pullQuote: "It is nice to see something beautiful come to life.",
    whatYouGet: [
      // [DEMO COPY — pending client review]
      {
        emoji: "📐",
        headline: "Tight miters, level grids",
        body: "Coffered ceiling beams laid out with a chalk line and a laser. Picture frame molding spaced equal across every panel. We measure twice and check with a level before we nail.",
      },
      {
        emoji: "🪚",
        headline: "Pre-primed MDF or solid stock",
        body: "MDF for paint-grade ceilings and accent walls. Solid poplar or pine for stained work. Pre-primed before we cut so the joints fill cleaner and the paint sits flat.",
      },
      {
        emoji: "🎨",
        headline: "Painted on site, two coats",
        body: "Sherwin-Williams or Benjamin Moore in the color you pick. Sanded between coats. Caulk lines tooled smooth. The trim disappears into the wall the way it should.",
      },
      {
        emoji: "🧹",
        headline: "Daily cleanup, no sawdust trail",
        body: "Drop cloths from the front door to the work zone. Shop vac at the end of every day. Same standard whether you are home or at the office.",
      },
      {
        emoji: "📸",
        headline: "Real photos, real prices, in writing",
        body: "Every quote includes a line-item spec sheet. Most accent walls land $1,500 to $3,500. Most coffered ceilings land $3,500 to $5,500. You see the math before we start.",
      },
    ],
    whoItsFor: [
      // [DEMO COPY — pending client review]
      {
        emoji: "📌",
        persona: "The Pinterest planner",
        description:
          "You have saved the same coffered ceiling photo eleven times. You want it built, not pitched a $25K design package.",
      },
      {
        emoji: "🏡",
        persona: "The 1980s colonial owner",
        description:
          "Builder-grade walls and flat ceilings. One accent wall or one coffered dining room rewrites how the whole house feels.",
      },
      {
        emoji: "🪜",
        persona: "The DIYer who hit the ceiling",
        description:
          "You started the board and batten. The miters did not work. We finish what you started, no judgment, no markup on the work you already did.",
      },
    ],
    howItWorks: [
      // [DEMO COPY — pending client review]
      {
        emoji: "📞",
        title: "Text or call",
        body: "Send the Pinterest photo to (978) 216-6455. We confirm receipt with an auto-reply and Tony replies personally by 8am next morning.",
      },
      {
        emoji: "📏",
        title: "On-site walkthrough",
        body: "Tony measures the room, checks the wall studs, and talks through stock options. 30 minutes on site, no pressure, no upsell.",
      },
      {
        emoji: "📝",
        title: "Written quote in 24 hours",
        body: "Line-item spec sheet, fixed price, start date, finish date. Sent by email and text. You take the time you need to decide.",
      },
      {
        emoji: "🔨",
        title: "Build and trim",
        body: "Three to six working days for most projects. Start date locked. Daily cleanup. Tony on site, not a sub.",
      },
      {
        emoji: "✅",
        title: "Walkthrough and final coat",
        body: "We walk the room together. Any caulk line you want tighter, we tighten. Final coat goes on after, not before.",
      },
    ],
    serviceFaqs: [
      // [DEMO COPY — pending client review]
      {
        q: "Do I need a permit for a coffered ceiling or accent wall in Massachusetts?",
        a: "Most coffered ceilings and accent walls do NOT require a permit in MA because they are decorative finish carpentry, not structural. If the work involves moving electrical, recessed lighting, or load-bearing changes, a permit is needed. We tell you on the walkthrough so there are no surprises.",
      },
      {
        q: "How long does a typical accent wall or coffered ceiling take?",
        a: "Most board and batten or shiplap accent walls run 2 to 3 working days from start to final coat. Most coffered ceilings run 3 to 5 working days for a 12 by 14 dining room. Larger rooms or grid layouts add a day or two. Calendar locked in writing before we start.",
      },
      {
        q: "Will the seams and joints show after painting?",
        a: "No. We pre-prime the stock, fill every nail hole with two passes of wood filler, sand smooth, and tool the caulk lines clean before the topcoat. After two coats of paint, the trim reads as one continuous piece.",
      },
      {
        q: "Can you match an existing trim profile in my house?",
        a: "Yes. We bring a sample of your existing baseboard or crown to the supplier and match the profile, or rip a custom profile if the original is no longer stocked. We do this on most older Methuen and Andover homes where the original trim is from the 1920s or 1980s.",
      },
    ],
    // Price bands per market-intelligence.md §4 typical ranges table:
    // "Finish carpentry / accent wall: $800 budget / $1,500-$3,500 mid /
    // $3,500-$5,500 high" + "Coffered ceiling: $2,500 budget / $3,500-$5,500
    // mid / $5,500-$7,500+ high"
    priceBands: [
      {
        // [DEMO COPY — pending client review]
        label: "Budget accent wall",
        range: "$800 to $1,500",
        example: "8 ft board and batten in a single bedroom, painted one coat color.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Mid-range accent feature",
        range: "$1,500 to $3,500",
        example: "12 ft picture frame molding wall in a dining room, two coats paint, baseboard tied in.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Coffered ceiling, 12x14 dining room",
        range: "$3,500 to $5,500",
        example: "MDF beam grid, painted Pure White, finished in 3 to 5 working days.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Premium millwork",
        range: "$5,500 to $7,500+",
        example: "Built-in office bookcases, mudroom locker wall, or a coffered great-room ceiling.",
      },
    ],
  },

  // [DEMO COPY — pending client review]
  "kitchen-remodels": {
    heroEyebrow: "Kitchen Remodels",
    heroH1: "Kitchen Remodels",
    heroSubhead:
      "Cabinets, counters, island, lighting, paint, the works. Most of ours land at $35K to $45K. Demo Monday, dust wall up by Tuesday, you cook again in three weeks.",
    whatYouGet: [
      // [DEMO COPY — pending client review]
      {
        emoji: "🗓️",
        headline: "Calendar with start, milestones, finish",
        body: "Demo day, cabinet day, counter template day, plumber day, electrician day, final walkthrough day. All in writing before the first hammer.",
      },
      {
        emoji: "🛠️",
        headline: "Cabinets hung plumb and level",
        body: "Custom, semi-custom, or IKEA Sektion. We hang IKEA like it is custom. No gaps at the ceiling, scribed to the wall, soft-close hinges adjusted.",
      },
      {
        emoji: "🪨",
        headline: "Quartz, laminate, or natural stone",
        body: "We coordinate the template appointment with the fabricator. Seams placed where they make sense, not where the shop wants them. Edges polished, undermount sinks set tight.",
      },
      {
        emoji: "💡",
        headline: "Lighting and electrical, permitted",
        body: "Recessed cans, pendant lights, under-cabinet, new circuits if needed. Pulled by our licensed electrician, inspected, signed off in writing.",
      },
      {
        emoji: "🔧",
        headline: "Plumbing fixtures, no leaks day one",
        body: "Sink, faucet, dishwasher, disposal, fridge water line. Pressure tested before we close the wall. Shut-offs labeled.",
      },
      {
        emoji: "🧹",
        headline: "Dust wall up Tuesday, cleaned Friday",
        body: "Plastic dust wall sealed at floor and ceiling. Negative-air fan if needed. Site cleaned every Friday. You cook in the temporary setup we help you stage.",
      },
    ],
    whoItsFor: [
      // [DEMO COPY — pending client review]
      {
        emoji: "👫",
        persona: "The Andover Upgrader",
        description:
          "Two kids, 1987 colonial, oak cabinets, soffits, you have been planning this for three years. $35K to $45K range. You want a real timeline.",
      },
      {
        emoji: "📐",
        persona: "The cabinet-and-counter refresh",
        description:
          "Layout works, cabinets do not. Replace cabinets, counters, sink, and lighting. Keep the floor and the appliances. Under $30K start to finish.",
      },
      {
        emoji: "🏗️",
        persona: "The wall-coming-down crowd",
        description:
          "You want the dining room and kitchen joined, an island where the half-wall is, a real range hood. We coordinate the structural engineer if needed.",
      },
    ],
    howItWorks: [
      // [DEMO COPY — pending client review]
      {
        emoji: "📞",
        title: "Walkthrough and scope",
        body: "30 minutes on site. We measure, talk through layout options, and ask about your appliance plans. No design board, no sales pitch.",
      },
      {
        emoji: "📝",
        title: "Written quote in 24 hours",
        body: "Line-item spec sheet by trade. Cabinets, counters, plumbing, electrical, demo, finish carpentry, paint. You see exactly where the dollars go.",
      },
      {
        emoji: "🛒",
        title: "Cabinet and counter selection",
        body: "We bring you to the cabinet supplier and the counter yard. You pick. We order. Lead times locked in writing.",
      },
      {
        emoji: "🔨",
        title: "Demo, rough-in, hang, finish",
        body: "Three to four working weeks for most kitchens. Permits pulled, inspections passed, plumbing tested, electrical signed off.",
      },
      {
        emoji: "✅",
        title: "Final walkthrough",
        body: "We walk every cabinet, every drawer, every fixture. Punch list captured in writing. We come back to fix anything on the list within two weeks.",
      },
    ],
    serviceFaqs: [
      // [DEMO COPY — pending client review]
      {
        q: "How much does a kitchen remodel cost in Methuen MA in 2025?",
        a: "Kitchen remodels in Methuen MA typically run $25,000 to $65,000 in 2025. Most of our Methuen, Andover, and Haverhill kitchens land between $35,000 and $45,000. Final cost depends on cabinet line, counter material, layout changes, and what we find behind your walls.",
      },
      {
        q: "How long does a typical kitchen remodel take?",
        a: "Three to four working weeks from demo day to final walkthrough for most kitchens. Galley layouts run closer to three weeks. Big island and wall removal jobs run closer to four to five weeks. We give you the calendar in writing before we swing the first hammer.",
      },
      {
        q: "Can I keep cooking while you work?",
        a: "Yes. We help you stage a temporary kitchen, usually in the dining room or basement, with the fridge, microwave, and a hot plate. We seal the work zone with a plastic dust wall and use a negative-air fan if needed. Most homeowners cook on the temporary setup for 10 to 14 working days, then back in the real kitchen.",
      },
      {
        q: "Do you handle the permits?",
        a: "Yes. We pull every permit your kitchen requires in Methuen, Andover, Haverhill, North Andover, Lawrence, and across Salem, Derry, Windham, and Londonderry NH. You sign the homeowner authorization, we handle the rest.",
      },
      {
        q: "Will the price change once you start?",
        a: "Only if we find something behind the wall, like rotted subfloor or old wiring that does not meet code. We show you the issue, photograph it, and quote the change in writing before we touch it. Zero surprise charges.",
      },
    ],
    // Per market-intelligence.md §4: Kitchen $20K-$35K budget /
    // $35K-$65K mid / $65K-$130K+ high
    priceBands: [
      {
        // [DEMO COPY — pending client review]
        label: "Budget refresh",
        range: "$20K to $35K",
        example: "Same layout, new cabinets and counters, sink, faucet, lights, paint. 2 to 3 weeks.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Mid-range full remodel",
        range: "$35K to $65K",
        example: "New layout, island, quartz counters, full appliance suite, recessed lighting, permits. 3 to 4 weeks.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "High-end kitchen",
        range: "$65K to $130K+",
        example: "Custom cabinets, natural stone, wall removal, range hood vented out, pro-line appliances. 5 to 7 weeks.",
      },
    ],
  },

  // [DEMO COPY — pending client review]
  "bathroom-remodels": {
    heroEyebrow: "Bathroom Remodels",
    heroH1: "Bathroom Remodels",
    heroSubhead:
      "Tile, vanity, plumbing fixtures, lighting, paint. Tear-out to final caulk in 10 to 14 working days. Permitted, inspected, warrantied in writing.",
    whatYouGet: [
      // [DEMO COPY — pending client review]
      {
        emoji: "🚿",
        headline: "Tile shower, laid out plumb",
        body: "Big format porcelain or classic subway. Grout lines straight, niche set level, curb sloped to the drain. We dry-fit before we cut so you do not end up with a half-inch sliver in the corner.",
      },
      {
        emoji: "🪞",
        headline: "Vanity centered, mirror centered",
        body: "Sounds small. It is not. The mirror sits on the same centerline as the faucets. The lights sit on the same centerline as the mirror. Every visit, you notice.",
      },
      {
        emoji: "🚽",
        headline: "Plumbing roughed in to code",
        body: "PEX or copper, your call. Shut-offs at every fixture, labeled. Water tested before we close the wall. Inspector signs off in writing.",
      },
      {
        emoji: "💡",
        headline: "Lighting, fan, GFCI outlet",
        body: "Vanity lights, ceiling can, exhaust fan vented out, not into the attic. GFCI outlets where code requires. Dimmers if you want them.",
      },
      {
        emoji: "🧹",
        headline: "Floors covered, hallway clean",
        body: "Red rosin paper from the front door to the bathroom. Plastic dust wall at the door. Shop vac at the end of every day. Not a scratch on your hardwood.",
      },
    ],
    whoItsFor: [
      // [DEMO COPY — pending client review]
      {
        emoji: "🛁",
        persona: "The 1985 builder-grade gut",
        description:
          "Fiberglass tub, vinyl floor, plastic vanity. Pull it all, tile a curbed shower, new vanity, new lighting. Most land $15K to $22K.",
      },
      {
        emoji: "👶",
        persona: "The kid bath redo",
        description:
          "Two kids share one bath. You want it durable, easy to clean, and laid out so a 6-year-old can reach the towel bar. We move the towel bar.",
      },
      {
        emoji: "🛀",
        persona: "The primary suite upgrade",
        description:
          "Double vanity, big-format tile, freestanding tub or curbless walk-in shower, separate water closet. $22K to $35K range, permitted, inspected.",
      },
    ],
    howItWorks: [
      // [DEMO COPY — pending client review]
      {
        emoji: "📞",
        title: "Walkthrough and scope",
        body: "30 minutes on site. We measure the room, check the joists, look at the existing plumbing and venting. No upsell.",
      },
      {
        emoji: "📝",
        title: "Written quote in 24 hours",
        body: "Line-item spec sheet. Tile allowance, vanity allowance, fixture allowance, labor. You see exactly where the dollars go.",
      },
      {
        emoji: "🚿",
        title: "Demo and rough-in",
        body: "Day 1 to 4: tear out, frame any new walls, rough plumbing, rough electrical. Inspector visits. We pass.",
      },
      {
        emoji: "🧱",
        title: "Tile, vanity, fixtures",
        body: "Day 5 to 11: cement board, waterproofing, tile, grout, vanity set, fixtures hung. Final inspector visit.",
      },
      {
        emoji: "✅",
        title: "Final caulk and walkthrough",
        body: "Day 12 to 14: paint, trim, hardware, mirror, towel bar, final caulk. We walk the room with you and capture any punch list in writing.",
      },
    ],
    serviceFaqs: [
      // [DEMO COPY — pending client review]
      {
        q: "How long does a typical bathroom remodel take?",
        a: "A standard hall bathroom remodel takes 9 to 14 working days from demo to final caulk. A full primary suite with tile shower, double vanity, and lighting changes runs 12 to 18 working days. We give you a calendar with start date, key milestones, and final walkthrough day in writing before we start.",
      },
      {
        q: "Do you pull the permit?",
        a: "Yes. We pull every permit the job requires in your town and coordinate the inspector visits. You sign the homeowner authorization, we handle the rest. Permits print on every contract.",
      },
      {
        q: "Can I use the bathroom while you work?",
        a: "No. The bathroom is sealed off with a plastic dust wall from day 1 to about day 12. If it is your only bathroom, we work with you on a temporary plan, usually a portable toilet rental for 10 to 14 days, or staging the work in two phases.",
      },
      {
        q: "What if you find rotted subfloor or mold?",
        a: "We photograph it, show you, and quote the fix in writing before we touch it. Most older bathrooms have at least some water damage at the toilet flange or under the tub. We carry a 5 to 8 percent contingency in the original quote so small finds are covered.",
      },
    ],
    // Per market-intelligence.md §4: Bathroom $10K-$18K budget /
    // $18K-$35K mid / $35K-$80K high
    priceBands: [
      {
        // [DEMO COPY — pending client review]
        label: "Budget refresh",
        range: "$10K to $18K",
        example: "Tub stays, new vanity, toilet, faucet, paint, floor tile. 6 to 9 days.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Mid-range full remodel",
        range: "$18K to $35K",
        example: "Tear out tub, tile a curbed shower, new vanity, lighting, fan, permits. 10 to 14 days.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Primary suite",
        range: "$35K to $80K",
        example: "Double vanity, freestanding tub, curbless walk-in shower, heated floor, separate water closet. 4 to 6 weeks.",
      },
    ],
  },

  // [DEMO COPY — pending client review]
  "decks-fences-pergolas": {
    heroEyebrow: "Decks, Fences & Pergolas",
    heroH1: "Decks, Fences & Pergolas",
    heroSubhead:
      "Pressure-treated, cedar, or composite. New build, repair, or finish what the other guy walked off. Footings inspected, posts plumb, no surprise change orders.",
    whatYouGet: [
      // [DEMO COPY — pending client review]
      {
        emoji: "🪵",
        headline: "Footings inspected first",
        body: "We pull the permit, dig to frost depth, set the tubes, and the inspector signs off before we frame. No skipping steps. No callbacks for footings later.",
      },
      {
        emoji: "📏",
        headline: "Posts plumb, line dead straight",
        body: "String line, not eyeball. Even on a yard that slopes 14 inches end to end. Posts plumb, pickets level, gates that latch the first try.",
      },
      {
        emoji: "🔩",
        headline: "Hidden fasteners, finished edges",
        body: "On composite decks, every face fastener is hidden. On cedar, stainless ring-shank where it counts. No rust streaks two years from now.",
      },
      {
        emoji: "🚪",
        headline: "Gates that latch",
        body: "Every gate gets diagonal bracing, hinges sized for the weight, and a self-closing latch if you ask. Two years in, the gate still latches.",
      },
      {
        emoji: "📸",
        headline: "Real photos, real prices",
        body: "Most cedar privacy fences land $40 to $55 per linear foot installed. Most composite decks land $30 to $60 per square foot installed. Quote in writing before we dig.",
      },
    ],
    whoItsFor: [
      // [DEMO COPY — pending client review]
      {
        emoji: "🏠",
        persona: "The new-build family",
        description:
          "16x20 deck off the back, composite, hidden fasteners, code-railing. $12K to $18K range.",
      },
      {
        emoji: "🐕",
        persona: "The privacy-fence household",
        description:
          "180 feet of 6-foot cedar, two gates, set in concrete. Dog-proof, neighbor-friendly, line dead straight.",
      },
      {
        emoji: "🌬️",
        persona: "The post-storm fix",
        description:
          "Storm took down 30 feet of fence or rotted out three deck joists. We come out the next morning, match the existing pickets or boards, restretch the run.",
      },
    ],
    howItWorks: [
      // [DEMO COPY — pending client review]
      {
        emoji: "📞",
        title: "Walkthrough and scope",
        body: "30 minutes on site. We measure the run, check the property line, talk material options. No high-pressure pitch.",
      },
      {
        emoji: "📝",
        title: "Written quote in 24 hours",
        body: "Line-item spec sheet. Material allowance, footing count, hardware, labor. You see exactly where the dollars go.",
      },
      {
        emoji: "🪧",
        title: "Permit and dig-safe",
        body: "We pull the permit, call dig-safe, and schedule the footing inspection. You sign the homeowner authorization, we handle the rest.",
      },
      {
        emoji: "🔨",
        title: "Frame and finish",
        body: "Footings, frame, deck boards, railings, or pickets, gate, hardware. Most decks 5 to 8 working days. Most fences 3 to 5 working days.",
      },
      {
        emoji: "✅",
        title: "Walkthrough and inspection sign-off",
        body: "Final inspector pass, we walk every fastener and every latch with you, punch list captured in writing.",
      },
    ],
    serviceFaqs: [
      // [DEMO COPY — pending client review]
      {
        q: "Do I need a permit for a deck or fence in Massachusetts?",
        a: "Decks attached to the house always require a permit in MA. Fences usually require a permit if they are over 6 feet or located in a setback area. We pull every permit the job requires and coordinate the inspector visits.",
      },
      {
        q: "How long does a typical deck or fence take?",
        a: "Most cedar privacy fences install in 3 to 5 working days. Most 16 by 20 composite decks install in 5 to 8 working days. Footings are inspected first, then the rest follows. Calendar locked in writing before we dig.",
      },
      {
        q: "Composite versus pressure-treated, what should I pick?",
        a: "Composite costs about 30 to 50 percent more upfront but it does not splinter, does not need staining, and lasts 25 plus years. Pressure-treated is cheaper, looks great year one, and needs to be re-stained every 2 to 3 years. We help you weigh both on the walkthrough.",
      },
      {
        q: "Can you finish a deck the previous contractor abandoned?",
        a: "Yes. We finish what other contractors started, regularly. Send photos of where the previous contractor left it, and any inspection paperwork they signed. We will tell you straight what is fixable, what needs to be redone, and what it costs.",
      },
    ],
    // Per market-intelligence.md §4: Deck $5K-$12K budget /
    // $12K-$25K mid / $25K-$50K high
    priceBands: [
      {
        // [DEMO COPY — pending client review]
        label: "Repair or small build",
        range: "$5K to $12K",
        example: "Replace 30 ft of fence, repair 4 deck joists, or build a 10x10 pressure-treated deck.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Mid-range new build",
        range: "$12K to $25K",
        example: "16x20 composite deck with hidden fasteners and aluminum railing, or 180 ft of 6-foot cedar fence with two gates.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Large or premium",
        range: "$25K to $50K",
        example: "Multi-level composite deck with built-in benches, or full-yard cedar fence plus pergola over a 14x16 patio.",
      },
    ],
  },

  // [DEMO COPY — pending client review]
  "interior-exterior-painting": {
    heroEyebrow: "Interior + Exterior Painting",
    heroH1: "Interior + Exterior Painting",
    heroSubhead:
      "Whole-house interior, single accent room, exterior siding and trim. Sherwin-Williams or Benjamin Moore, two coats minimum, edges cut clean.",
    whatYouGet: [
      // [DEMO COPY — pending client review]
      {
        emoji: "🎨",
        headline: "Sherwin-Williams or Benjamin Moore",
        body: "Premium-line product on every job. Two coats minimum on every wall. Three if the color is going lighter than the existing.",
      },
      {
        emoji: "🪟",
        headline: "Cut lines, no bleed",
        body: "Edges cut by hand, not with a plastic shield. Tape pulled while the paint is still wet. The trim is white, not bleeding into the siding.",
      },
      {
        emoji: "🪜",
        headline: "Prep is the job",
        body: "Sand, scrape, prime where needed, fill holes, caulk gaps. The paint sits on a surface that is ready, not on top of yesterday's flaking.",
      },
      {
        emoji: "🛋️",
        headline: "Furniture moved, floors covered",
        body: "We move the furniture to the center of the room. Drop cloths on the floor. Tape on the trim. We put it back the way it was.",
      },
      {
        emoji: "📅",
        headline: "Calendar locked in writing",
        body: "Most whole-house interiors take 5 to 8 working days. Most exterior repaints take 5 to 10 working days. Cabinet repaints take 4 to 6.",
      },
    ],
    whoItsFor: [
      // [DEMO COPY — pending client review]
      {
        emoji: "🏠",
        persona: "The whole-house refresh",
        description:
          "Three bedrooms, two baths, hallway, stairwell, great room. Sherwin-Williams, two coats, ceilings cut clean. $7K to $9K typical.",
      },
      {
        emoji: "🌧️",
        persona: "The exterior repaint",
        description:
          "1960s ranch or 1990s colonial. Pressure wash, scrape, prime, two coats. Trim and siding sharply separated. $7K to $10K range.",
      },
      {
        emoji: "🍳",
        persona: "The cabinet repaint",
        description:
          "Oak cabinets you cannot afford to replace. We sand, deglosse, prime, spray two coats, seal. Factory-finish look at 20 percent of the cost.",
      },
    ],
    howItWorks: [
      // [DEMO COPY — pending client review]
      {
        emoji: "📞",
        title: "Walkthrough",
        body: "30 minutes on site. We walk every room, count the doors and windows, check the prep load. No high-pressure pitch.",
      },
      {
        emoji: "📝",
        title: "Written quote in 24 hours",
        body: "Line-item spec sheet. Walls, ceilings, trim, doors, prep, paint allowance. You see exactly where the dollars go.",
      },
      {
        emoji: "🧹",
        title: "Prep day",
        body: "Furniture moved, floors covered, trim taped, holes filled, surfaces sanded or pressure washed. The paint goes on a surface that is ready.",
      },
      {
        emoji: "🎨",
        title: "Two coats, cut clean",
        body: "Coat one, dry, sand if needed, coat two. Edges cut by hand. Tape pulled wet. We do ceilings first, walls second, trim last.",
      },
      {
        emoji: "✅",
        title: "Furniture back, walkthrough",
        body: "We put the room back together and walk it with you. Any line you want sharper, we sharpen. Touch-up paint left labeled in the basement.",
      },
    ],
    serviceFaqs: [
      // [DEMO COPY — pending client review]
      {
        q: "How much does it cost to paint a 2,000 square foot interior in MA?",
        a: "Whole-house interior repaint in MA typically runs $4,000 to $9,000 for 2,000 square feet, depending on prep load, ceiling work, and trim count. Most of our Methuen, Andover, and Haverhill whole-house jobs land $6,000 to $8,000. Two coats, Sherwin-Williams or Benjamin Moore.",
      },
      {
        q: "How long does a paint job take?",
        a: "Whole-house interior: 5 to 8 working days. Single accent room: 1 to 2 working days. Exterior repaint: 5 to 10 working days, weather depending. Cabinet repaint: 4 to 6 working days.",
      },
      {
        q: "Do you do exterior in winter?",
        a: "We do exterior April through November in MA and southern NH. Below 50 degrees the paint does not cure right. We book exterior repaints early in the spring because the calendar fills by May.",
      },
      {
        q: "Can you paint over wallpaper?",
        a: "Sometimes. If the wallpaper is well adhered with no peeling seams, yes, we prime with a stain-blocker and paint over. If it is bubbling or peeling, we strip it first. We tell you which path on the walkthrough.",
      },
    ],
    // Per market-intelligence.md §4: Interior paint (2,000 sq ft) $4K-$6K
    // budget / $6K-$9K mid / $9K-$12K high
    priceBands: [
      {
        // [DEMO COPY — pending client review]
        label: "Budget refresh",
        range: "$4K to $6K",
        example: "2,000 sq ft interior, walls only, light prep, two coats. 4 to 5 days.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Mid-range whole-house",
        range: "$6K to $9K",
        example: "Whole-house interior, walls, ceilings, trim, doors. Two coats, premium-line paint. 6 to 8 days.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Premium or exterior",
        range: "$9K to $12K",
        example: "Full exterior repaint, scraped and primed where needed, or whole-house interior plus full cabinet repaint.",
      },
    ],
  },

  // [DEMO COPY — pending client review]
  // Sub-services pulled from initial-business-data.md §2 (11 sub-services
  // identified on the existing Anjo site).
  "handyman-honey-do": {
    heroEyebrow: "Handyman & Honey-Do",
    heroH1: "Handyman & Honey-Do",
    heroSubhead:
      "TV mount, ceiling fan, gallery wall, fence picket, that cabinet door that will not close. Flat rates posted. Half-day and full-day blocks available.",
    whatYouGet: [
      // [DEMO COPY — pending client review]
      {
        emoji: "💰",
        headline: "Flat rates, no hourly mystery",
        body: "TV mount $185. Ceiling fan install $245. Gallery wall $325. Half-day block $350. Full-day block $850. Full-house honey-do day $1,200. Posted, not whispered.",
      },
      {
        emoji: "📋",
        headline: "Honey-do day, eight to twelve items",
        body: "Bring the list. We work through the doors, the shelves, the fans, the hooks, the patches, and the cabinet that will not close. Most full-day blocks finish 8 to 12 items.",
      },
      {
        emoji: "🪜",
        headline: "TV mount, fan, fixture, in-house",
        body: "Stud finder, the right anchors, the cables in-wall if you want them. We carry the heavy-duty anchors for stone, plaster, and brick, not just the cheap drywall stuff.",
      },
      {
        emoji: "🔌",
        headline: "Small electrical, small plumbing",
        body: "Light fixture swap, switch plate, faucet replacement on existing supply. New circuits and water-line work go to our licensed electrician or plumber, billed at cost plus our coordination time.",
      },
      {
        emoji: "🤝",
        headline: "Same person every visit",
        body: "Tony, or one of his two regular guys. Not a different sub every time. Same person, same standard, treats your home with respect.",
      },
    ],
    whoItsFor: [
      // [DEMO COPY — pending client review]
      {
        emoji: "📂",
        persona: "The Solo Homeowner with a list",
        description:
          "Two years of small things piling up. Half-day or full-day block, we work through the list. Wish you had called sooner.",
      },
      {
        emoji: "📺",
        persona: "The TV-and-fan single visit",
        description:
          "Mount the 75-inch TV over the stone fireplace, hide the cables, install the ceiling fan in the bedroom. Two hours, flat rate.",
      },
      {
        emoji: "🏘️",
        persona: "The post-move-in punch list",
        description:
          "Just bought the house, the inspection report has 14 small items. We work through the punch list in one full day or two half-days.",
      },
    ],
    howItWorks: [
      // [DEMO COPY — pending client review]
      {
        emoji: "📞",
        title: "Text or call your list",
        body: "Send the list to (978) 216-6455 with photos if you have them. We auto-confirm, Tony replies personally by 8am next morning.",
      },
      {
        emoji: "💬",
        title: "Pick a block",
        body: "Half-day $350 or full-day $850 if it is a list. Flat rate per item if it is a single job. We tell you upfront which makes more sense.",
      },
      {
        emoji: "📅",
        title: "Locked schedule",
        body: "Most handyman blocks scheduled within 3 to 5 business days. Same-day or next-day for storm-damage repairs.",
      },
      {
        emoji: "🛠️",
        title: "Show up, work the list",
        body: "Arrive on time with the right tools. Walk the list with you, prioritize, work through item by item. Photos before and after if you ask.",
      },
      {
        emoji: "✅",
        title: "Walk and pay",
        body: "Walk the list together, mark off what is done. If we did not finish the list in the block you booked, the unfinished items get logged and you tell us if you want to book another block.",
      },
    ],
    serviceFaqs: [
      // [DEMO COPY — pending client review]
      {
        q: "Can a handyman legally do electrical or plumbing work in Massachusetts and New Hampshire?",
        a: "A handyman can swap a faucet, replace a switch plate, or hang a light fixture on existing wiring. New circuits, panel work, and water-line changes require a licensed electrician or plumber by law in both states. We do the small stuff in-house and bring in our trusted licensed pros for anything that needs a permit, billed at cost plus our coordination time.",
      },
      {
        q: "How many things can you do in a half-day block?",
        a: "A typical half-day block ($350) finishes 4 to 6 items off a normal list. A full-day block ($850) finishes 8 to 12 items. The exact count depends on what is on the list, but we work efficiently and tell you on the walkthrough what is realistic.",
      },
      {
        q: "Do you do same-day work?",
        a: "We try to. Storm-damage repairs and urgent items usually get same-day or next-day service if it is on Tony's calendar. Send the list to (978) 216-6455 and we will tell you what is possible.",
      },
      {
        q: "What if my list runs longer than the block I booked?",
        a: "We log every unfinished item and tell you straight. You can book another block, or skip the rest. We never invent work and we never run the meter, because we run flat rates, not hourly.",
      },
    ],
    // Per market-intelligence.md §4: handyman flat-rate menu directive #3 +
    // typical ranges row "Minor handyman jobs $75-$250 budget /
    // $250-$450 mid / $450-$1,500 high"
    priceBands: [
      {
        // [DEMO COPY — pending client review]
        label: "Single item",
        range: "$75 to $325",
        example: "TV mount $185, ceiling fan $245, gallery wall $325, light fixture $150 to $275.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Half-day block",
        range: "$350",
        example: "4 to 6 small items off your list, anywhere in the corridor, on-site by 8am.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Full-day block",
        range: "$850",
        example: "8 to 12 items, full-house honey-do, on-site 8am to 4pm.",
      },
      {
        // [DEMO COPY — pending client review]
        label: "Full-house honey-do day",
        range: "$1,200",
        example: "Premium full day, list of 12 plus, prioritized in writing, photos before and after.",
      },
    ],
  },
};
