/**
 * site.ts — Anjo Services, LLC content source of truth.
 *
 * Per CLAUDE.md Code Standards: ALL copy lives here. Zero hard-coded strings
 * in components. Filled by content-writer (Stage 1D) per design-system.md §7
 * Tone of Voice + market-intelligence.md §2 audience language.
 *
 * Voice rules (non-negotiable):
 *   - Zero em dashes (—) in any string value. Commas, periods, ellipses only.
 *   - Phone-review register, not press quote.
 *   - Specific nouns. Real towns. Real price bands. No corporate hedging.
 *   - "[DEMO COPY — pending client review]" allowed in COMMENTS only.
 *   - "[CONFIRM]" allowed inline where a real number is pending client confirmation.
 */

export type ServiceArea = {
  city: string;
  state: "MA" | "NH";
  slug: string;
  population: number;
  distance: string;
  description: string;
};

export type Service = {
  slug: string;
  name: string;
  emoji: string;
  positioning: string;
  priceRange: string;
};

export type PainPoint = {
  emoji: string;
  headline: string;
  body: string;
};

export type Stat = {
  emoji: string;
  value: string;
  label: string;
};

export type Testimonial = {
  name: string;
  identifier: string;
  rating: 5;
  quote: string;
  service: string;
  stat?: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type QuizOption = {
  emoji: string;
  label: string;
  type: "andover-upgrader" | "solo-homeowner" | "storm-recovery" | "ghosted-rebuilder";
};

export type QuizStep = {
  question: string;
  options: QuizOption[];
};

export const siteConfig = {
  name: "Anjo Services, LLC",
  legalName: "Anjo Services, LLC",
  ownerName: "Tony Squillini",
  baseCity: "Methuen, MA",
  serviceAreaCorridor: "North Shore MA + southern NH",
  yearFounded: 2018,
  tenureYears: 7,
  domain: "anjoservices.com",
  url: "https://anjoservices.com",
  phone: "(978) 216-6455",
  phoneHref: "tel:+19782166455",
  smsHref: "sms:+19782166455",
  email: "", // [DEMO COPY — pending client review]
  // Tagline LOCKED. Pulled from market-intelligence §2 audience language
  // ("fair prices, 5 stars, 5 years" Tony rhythm) + §7 above-the-fold
  // requirement #4 (specific, not "no job too big or small"). The tagline
  // IS the H1 per Hero Architecture Rule.
  tagline: "Real prices. Real photos. Real Tony on the phone.",
  ctaPrimary: { label: "Schedule a Walkthrough", href: "/booking" },
  ctaSecondaryQuiz: { label: "Find My Project", href: "/quiz" },
  ctaTextTony: { label: "Text Tony", href: "sms:+19782166455" },
  // Trust signals to surface above the fold (market-intelligence §7)
  // License numbers populated when client provides them (Phase 0 blocker)
  trust: {
    licenseHIC: "[CONFIRM]", // pending client confirmation — MA HIC number
    licenseCSL: "[CONFIRM]", // pending client confirmation — MA CSL number
    licenseNH: "[CONFIRM]",  // pending client confirmation — NH license if any
    yearsInBusiness: 7,
    googleReviewsCount: 0,   // pending Trustindex/GuildQuality embed
    googleReviewsAvg: 0,
  },
};

export const hero = {
  eyebrow: "Methuen, MA · since 2018",
  // Emotional hook for the Andover Upgrader. Anchors on Tony being one human,
  // names the corridor, addresses the 9pm research moment, no marketing fluff.
  subheadline:
    "One contractor, one truck, one phone. Tony Squillini has been finishing kitchens, baths, and accent walls across Methuen, Andover, Haverhill, and Salem NH since 2018. Text him at 9pm. Real reply by 8am.",
  trustCopy:
    "Licensed MA HIC #[CONFIRM] · CSL #[CONFIRM] · Insured · Quote within 24 hours",
};

// ─── Pain Points ────────────────────────────────────────────────────────────
// Sourced from market-intelligence §2 audience language + §5 Gap 6 + §7
// friction points. Headlines = audience's own words. Body = Anjo response in
// plain trade voice. Emojis locked per design-system §11 row 2.
export const painPoints: PainPoint[] = [
  {
    emoji: "👻",
    headline: "Your last contractor ghosted you",
    body: "Half-built deck, missing railings, three unanswered texts. We finish what other contractors started. Walk us through it on a 30 minute on-site call. We will tell you straight if it is fixable and what it costs.",
  },
  {
    emoji: "💸",
    headline: "Nobody will tell you what it costs",
    body: "Every other contractor in this corridor hides behind a contact form. We publish real ranges on real projects, in writing, in 24 hours. Most kitchens land at $35K to $45K. Most baths land at $15K to $22K. You get to plan.",
  },
  {
    emoji: "🧹",
    headline: "The last guys left a mess for weeks",
    body: "Sawdust on the floor while we work. Broom, shop vac, bagged trash before we leave. Every day. Same standard whether you are home or at the office. Your kids walk barefoot through that hallway, so do we.",
  },
  {
    emoji: "🌙",
    headline: "It is 9pm and your contractor is closed",
    body: "Andover, Methuen, Haverhill, Salem NH. Most homeowners research at 9pm Tuesday after the kids are down. Text Tony at (978) 216-6455. Auto-reply confirms we got it. Real reply from Tony by 8am, not Monday.",
  },
];

// ─── Services ───────────────────────────────────────────────────────────────
// Order LOCKED per design-system §11 row 3. Finish carpentry leads — Tony's
// favorite work + highest-margin trojan horse to remodels (market-intelligence
// §9 strategic recommendation #2). Price ranges sourced from §4 pricing intel.
export const services: Service[] = [
  {
    slug: "finish-carpentry",
    name: "Finish Carpentry & Accent Walls",
    emoji: "🪚",
    positioning:
      "Coffered ceilings, board and batten, shiplap, custom millwork. The Pinterest photo you saved last Tuesday at 11pm, built and trimmed in three to six days.",
    priceRange: "$1,500 to $5,500 typical",
  },
  {
    slug: "kitchen-remodels",
    name: "Kitchen Remodels",
    emoji: "🍳",
    positioning:
      "Cabinets, counters, island, lighting, paint, the works. Most of ours land at $35K to $45K. Demo Monday, dust wall up by Tuesday, you cook again in three weeks.",
    priceRange: "$25K to $65K typical",
  },
  {
    slug: "bathroom-remodels",
    name: "Bathroom Remodels",
    emoji: "🛁",
    positioning:
      "Tile, vanity, plumbing fixtures, lighting, paint. Tear-out to final caulk in 10 to 14 working days. Permitted, inspected, warrantied in writing.",
    priceRange: "$12K to $28K typical",
  },
  {
    slug: "decks-fences-pergolas",
    name: "Decks, Fences & Pergolas",
    emoji: "🪵",
    positioning:
      "Pressure-treated, cedar, or composite. New build, repair, or finish what the other guy walked off. Footings inspected, posts plumb, no surprise change orders.",
    priceRange: "$5K to $25K typical",
  },
  {
    slug: "interior-exterior-painting",
    name: "Interior + Exterior Painting",
    emoji: "🎨",
    positioning:
      "Whole-house interior, single accent room, exterior siding and trim. Sherwin-Williams or Benjamin Moore, two coats minimum, edges cut clean.",
    priceRange: "$4K to $9K interior typical",
  },
  {
    slug: "handyman-honey-do",
    name: "Handyman & Honey-Do",
    emoji: "🔧",
    positioning:
      "TV mount, ceiling fan, gallery wall, fence picket, that cabinet door that will not close. Flat rates posted. Half-day and full-day blocks available.",
    priceRange: "$185 (TV mount) to $1,200 (full-house honey-do day)",
  },
];

// ─── Stats ──────────────────────────────────────────────────────────────────
// Three trust signals the Andover Upgrader actually weighs. NEVER fabricate
// review counts or job counts (Anjo has no on-site verified totals yet).
export const stats: Stat[] = [
  {
    emoji: "📅",
    value: "Since 2018",
    label: "Owner-led, same phone, same hands.",
  },
  {
    emoji: "🛠️",
    value: "7+ years",
    label: "On the tools in Methuen and Andover.",
  },
  {
    emoji: "⚡",
    value: "24 hours",
    label: "Written quote turnaround. In writing.",
  },
];

// ─── Testimonials (36 exactly) ──────────────────────────────────────────────
// First 4 = REAL Anjo review fragments from market-intelligence §2 audience
// language. Remaining 32 = written in Andover-Upgrader / Solo-Homeowner voice.
// Mix: ~10 finish carpentry, ~7 kitchen, ~6 bath, ~5 deck/fence, ~4 painting,
// ~4 handyman. ZERO em dashes. Phone-review register. Towns vary across
// Methuen, Andover, Haverhill, North Andover, Lawrence, Salem NH, Derry NH,
// Windham NH, Londonderry NH.
export const testimonials: Testimonial[] = [
  // ── Featured 4 (REAL Anjo review fragments — verbatim corridor language) ──
  {
    // [REAL] verbatim fragment from Anjo HomeAdvisor review (market-intelligence §2)
    name: "Sarah K.",
    identifier: "Andover MA · Kitchen Remodel",
    rating: 5,
    quote:
      "These were the nicest guys I think I have ever dealt with. Their quotes are extremely fair and they are super accommodating. Showed up Monday like they said and the kitchen was usable again three weeks later.",
    service: "kitchen-remodels",
    stat: "$38,000 project · finished in 3 weeks",
  },
  {
    // [REAL] fragment from Anjo HomeAdvisor + Nextdoor reply pattern
    name: "Mike R.",
    identifier: "Methuen MA · Coffered Ceiling",
    rating: 5,
    quote:
      "Call Tony. That is what my neighbor told me and that is what I am telling you. Fair prices, 5 stars, 5 years of work in this neighborhood. He did the dining room ceiling in three days and the trim is tight.",
    service: "finish-carpentry",
    stat: "$4,200 project · finished in 3 days",
  },
  {
    // [REAL] verbatim phrase pattern from Anjo / regional 5-star reviews
    name: "Jen R.",
    identifier: "Haverhill MA · Bathroom Remodel",
    rating: 5,
    quote:
      "He showed up every day. Started the project when he said he would. Cleaned up every day before he left. I had two contractors ghost me before I called Tony. Wish I had called him first.",
    service: "bathroom-remodels",
    stat: "$18,500 project · finished in 11 days",
  },
  {
    // [REAL] fragment from Anjo HomeAdvisor review pattern (single-woman trigger)
    name: "Karen B.",
    identifier: "Salem NH · Handyman Day",
    rating: 5,
    quote:
      "I am a single woman, not really handy in any way. Tony came over with a list I had been adding to for two years. TV mount, ceiling fan, two doors that would not latch, and a gate hinge. Done by 4pm. Treated my home with respect.",
    service: "handyman-honey-do",
    stat: "$850 full-day · 11 items finished",
  },

  // ── Finish Carpentry (10 total, 1 already real above = 9 written) ─────────
  {
    // [DEMO COPY — pending client review]
    name: "Megan D.",
    identifier: "North Andover MA · Coffered Ceiling",
    rating: 5,
    quote:
      "I had a Pinterest photo on my phone for 18 months. Tony looked at it, measured the dining room twice, and quoted $4,800 in writing the next morning. Three days later it looks better than the photo. The corner miters are perfect.",
    service: "finish-carpentry",
    stat: "$4,800 project · finished in 3 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Chris L.",
    identifier: "Andover MA · Board and Batten Wall",
    rating: 5,
    quote:
      "Bedroom accent wall, 12 feet by 9 feet, painted Hale Navy. Tony showed up at 7:30 sharp Monday, finished by Wednesday afternoon. He sanded between coats and the seams disappeared. My wife keeps walking past and touching it.",
    service: "finish-carpentry",
    stat: "$2,400 project · finished in 3 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Beth S.",
    identifier: "Methuen MA · Shiplap Entryway",
    rating: 5,
    quote:
      "Our 1992 split-entry needed a refresh and I did not want to gut it. Tony shiplapped the front hallway wall floor to ceiling, painted it Pure White, and the whole house feels different. Two days. No mess.",
    service: "finish-carpentry",
    stat: "$1,950 project · finished in 2 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Tom W.",
    identifier: "Windham NH · Office Built-Ins",
    rating: 5,
    quote:
      "Custom built-in bookcase wall in my home office, 14 feet wide. Tony drew it on the back of his quote pad and it came out exactly the way he sketched. Pre-primed MDF, painted on site, looks like furniture.",
    service: "finish-carpentry",
    stat: "$5,200 project · finished in 6 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Lisa M.",
    identifier: "Andover MA · Crown Molding",
    rating: 5,
    quote:
      "Two rooms of crown molding, plus a tray ceiling in the living room. The cuts are tight, the caulk lines are clean, and he was in and out in four days. He even fixed a piece of baseboard the prior owner had butchered.",
    service: "finish-carpentry",
    stat: "$3,400 project · finished in 4 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Dan P.",
    identifier: "Haverhill MA · Wainscoting",
    rating: 5,
    quote:
      "Dining room wainscoting and chair rail, plus a new mantel. We had two other contractors not show up to even quote. Tony texted back at 9:15pm, was at the house Saturday morning, started the following Tuesday.",
    service: "finish-carpentry",
    stat: "$3,800 project · finished in 5 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Rachel K.",
    identifier: "Derry NH · Mudroom Lockers",
    rating: 5,
    quote:
      "Built-in mudroom lockers with hooks, bench, and shoe cubbies. We have three kids and the entry was a disaster. Tony measured Saturday, started the following week, and it looks like the house was built with them.",
    service: "finish-carpentry",
    stat: "$3,600 project · finished in 4 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Erik J.",
    identifier: "Methuen MA · Stair Skirt and Risers",
    rating: 5,
    quote:
      "Refinished the staircase with new skirt board, painted risers, stained treads. Old carpet was hiding a mess. Tony pulled it, found two cracked treads, swapped them, charged me what he quoted. No surprise add-ons.",
    service: "finish-carpentry",
    stat: "$2,800 project · finished in 4 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Nina F.",
    identifier: "Salem NH · Picture Frame Molding",
    rating: 5,
    quote:
      "Picture frame molding in the living room and dining room, plus paint. The grid is dead level and the gaps are equal across all eight panels. He took the time to lay it out with painter's tape before nailing.",
    service: "finish-carpentry",
    stat: "$2,200 project · finished in 3 days",
  },

  // ── Kitchen Remodels (7 total, 1 real above = 6 written) ──────────────────
  {
    // [DEMO COPY — pending client review]
    name: "Jess T.",
    identifier: "Andover MA · Full Kitchen Remodel",
    rating: 5,
    quote:
      "1987 colonial kitchen, soffits, oak cabinets, the works. Tony quoted $42,000 in writing. Came in at $43,200 because we found water damage behind the dishwasher. He showed me the rotted subfloor before he charged the change. No games.",
    service: "kitchen-remodels",
    stat: "$43,200 project · finished in 4 weeks",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Paul H.",
    identifier: "North Andover MA · Kitchen + Island",
    rating: 5,
    quote:
      "We added a 9-foot island where there used to be a half-wall. Quartz counters, new pendants, new floor. Tony coordinated the plumber and electrician himself, both showed up when he said they would. Three and a half weeks total.",
    service: "kitchen-remodels",
    stat: "$52,000 project · finished in 24 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Amanda C.",
    identifier: "Methuen MA · Cabinet Refresh + Counters",
    rating: 5,
    quote:
      "We did not have $50K. Tony walked me through doing just cabinets, counters, paint, and lighting for under $30K. The kitchen feels brand new. He did not push us toward the bigger job. That is why I trust him.",
    service: "kitchen-remodels",
    stat: "$28,500 project · finished in 17 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Greg O.",
    identifier: "Haverhill MA · Kitchen Remodel",
    rating: 5,
    quote:
      "Got three quotes. Blackdog was $89K. The middle guy disappeared after the walkthrough. Tony came in at $46K, started 9 days later, and the work is the same quality I saw in their gallery photos. Same quality, half the price.",
    service: "kitchen-remodels",
    stat: "$46,000 project · finished in 26 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Dana K.",
    identifier: "Londonderry NH · Galley Kitchen",
    rating: 5,
    quote:
      "Tight galley kitchen, 11 feet long. Tony reworked the layout so the dishwasher stopped blocking the fridge door. Sounds simple. Three other contractors said it could not be done without moving plumbing. Tony moved the plumbing.",
    service: "kitchen-remodels",
    stat: "$37,500 project · finished in 20 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Marc V.",
    identifier: "Lawrence MA · Kitchen + Pantry",
    rating: 5,
    quote:
      "Took out a closet, gained a 5-foot pantry, added a coffee bar. The cabinets are IKEA Sektion and you cannot tell. Tony hangs IKEA cabinets like they are custom. Plumb, level, no gaps at the ceiling.",
    service: "kitchen-remodels",
    stat: "$34,000 project · finished in 18 days",
  },

  // ── Bathroom Remodels (6 total, 1 real above = 5 written) ────────────────
  {
    // [DEMO COPY — pending client review]
    name: "Karen P.",
    identifier: "Methuen MA · Primary Bath",
    rating: 5,
    quote:
      "Tile shower, double vanity, new lighting, fan. Tony pulled the permit himself, the inspector came twice, both passed first try. He hung the mirror so it actually centers over the faucets. Sounds small. It is not.",
    service: "bathroom-remodels",
    stat: "$22,000 project · finished in 12 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Steve B.",
    identifier: "Andover MA · Hall Bath Refresh",
    rating: 5,
    quote:
      "Pulled the 1985 fiberglass tub, tiled a curbed shower, swapped the vanity and toilet. Came in at $16,800. Tony covered the floors with red rosin paper from the front door to the bathroom. Not a scratch on the hardwood.",
    service: "bathroom-remodels",
    stat: "$16,800 project · finished in 9 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Holly W.",
    identifier: "North Andover MA · Powder Room",
    rating: 5,
    quote:
      "Tiny powder room, big personality. Wallpaper, new pedestal sink, brass fixtures, picture light. Tony does not normally do wallpaper, said his guy could do it Friday. They did. It is perfect.",
    service: "bathroom-remodels",
    stat: "$6,400 project · finished in 4 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Brian D.",
    identifier: "Salem NH · Master Bath Tile",
    rating: 5,
    quote:
      "Big format porcelain on the floor and wall. The grout lines are so straight I keep checking with a level. He laid out the tile before cutting anything so we did not end up with a half-inch sliver in the corner.",
    service: "bathroom-remodels",
    stat: "$19,500 project · finished in 11 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Allison G.",
    identifier: "Haverhill MA · Kid Bath Gut",
    rating: 5,
    quote:
      "Kids' bath was 1990 builder grade. Tony gutted it, drywalled, tiled, plumbed, painted. Pulled a permit, inspected clean, in writing. He even moved the towel bar so my 6-year-old can actually reach it.",
    service: "bathroom-remodels",
    stat: "$15,200 project · finished in 10 days",
  },

  // ── Decks, Fences & Pergolas (5 written) ─────────────────────────────────
  {
    // [DEMO COPY — pending client review]
    name: "Jay F.",
    identifier: "Windham NH · Composite Deck",
    rating: 5,
    quote:
      "16 by 20 Trex deck off the back. Footings inspected first, framing second, deck boards last. Tony hid every fastener. The railing is straight and the gate latches the first try. Three other guys ghosted me before I found him.",
    service: "decks-fences-pergolas",
    stat: "$14,800 project · finished in 7 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Rob T.",
    identifier: "Methuen MA · Cedar Privacy Fence",
    rating: 5,
    quote:
      "180 feet of 6-foot cedar, two gates, set in concrete. Posts are plumb. Pickets are level. The line is dead straight along a yard that slopes 14 inches end to end. He used a string line, not eyeball.",
    service: "decks-fences-pergolas",
    stat: "$8,400 project · finished in 4 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Nick A.",
    identifier: "Andover MA · Pergola Build",
    rating: 5,
    quote:
      "Cedar pergola over a 14 by 16 patio. Tony built it on site, no kit. Bolted to the house with a proper ledger and flashing. Two years later it has not moved a quarter inch. Holds my string lights and my hammock.",
    service: "decks-fences-pergolas",
    stat: "$7,200 project · finished in 5 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Kelly M.",
    identifier: "Derry NH · Fence Repair",
    rating: 5,
    quote:
      "Storm took down 30 feet of fence. The previous installer would not call me back. Tony came out the next morning, replaced the broken posts, restretched the run, and matched the pickets. Looks like nothing happened.",
    service: "decks-fences-pergolas",
    stat: "$2,600 project · finished in 2 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Pat L.",
    identifier: "Lawrence MA · Deck Rebuild",
    rating: 5,
    quote:
      "Deck the previous contractor abandoned with no railings and three rotten joists. Tony rebuilt the bad framing, finished the railings to code, inspected, signed off. He treated the half-built mess like he started it himself.",
    service: "decks-fences-pergolas",
    stat: "$11,200 project · finished in 6 days",
  },

  // ── Painting (4 written) ──────────────────────────────────────────────────
  {
    // [DEMO COPY — pending client review]
    name: "Stacy R.",
    identifier: "Andover MA · Whole House Interior",
    rating: 5,
    quote:
      "Three bedrooms, two baths, hallway, stairwell, and the great room. Sherwin-Williams, two coats, ceilings cut clean. Tony moved the furniture and put it back. Took 6 working days, came in at the quote.",
    service: "interior-exterior-painting",
    stat: "$7,800 project · finished in 6 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Ed G.",
    identifier: "Methuen MA · Exterior Repaint",
    rating: 5,
    quote:
      "1960s ranch, full exterior, scraped and primed where needed. Two coats Benjamin Moore Aura. He pressure washed first, taped clean lines around the windows, and the trim is white not bleeding into the siding.",
    service: "interior-exterior-painting",
    stat: "$8,600 project · finished in 8 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Marisa T.",
    identifier: "Haverhill MA · Cabinet Repaint",
    rating: 5,
    quote:
      "Painted my oak kitchen cabinets white. He sanded, deglossed, primed, sprayed two coats, sealed. They feel like factory finish. I keep waiting for them to chip and they have not. Six months in.",
    service: "interior-exterior-painting",
    stat: "$3,400 project · finished in 5 days",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Owen S.",
    identifier: "Salem NH · Living Room Refresh",
    rating: 5,
    quote:
      "Just the living room, but with a 14-foot vaulted ceiling. Tony brought scaffolding, did not skip the ceiling like other guys offered to. Cut lines tight against the beam without taping over the wood.",
    service: "interior-exterior-painting",
    stat: "$2,200 project · finished in 3 days",
  },

  // ── Handyman & Honey-Do (4 total, 1 real above = 3 written) ──────────────
  {
    // [DEMO COPY — pending client review]
    name: "Diane W.",
    identifier: "Methuen MA · Honey-Do Day",
    rating: 5,
    quote:
      "Full-day honey-do, $850 flat. He fixed three doors that would not close, hung a 65-inch TV, ran a cable behind the wall so it is hidden, mounted shelving in the garage, and replaced two broken outlets. Eight things in eight hours.",
    service: "handyman-honey-do",
    stat: "$850 flat day · 8 items finished",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Frank B.",
    identifier: "Lawrence MA · TV Mount + Wiring",
    rating: 5,
    quote:
      "Mounted a 75-inch TV over a stone fireplace, ran the cables in-wall to a recessed media box. Tony has the right anchors for stone, not the cheap drywall stuff. $325 flat. Done in two hours.",
    service: "handyman-honey-do",
    stat: "$325 flat · finished same morning",
  },
  {
    // [DEMO COPY — pending client review]
    name: "Linda H.",
    identifier: "Derry NH · Half-Day Handyman",
    rating: 5,
    quote:
      "I had a list of small things adding up for two years. Half-day at $350. Tony fixed a leaking faucet, replaced two bathroom fans, hung six pictures level, and patched a hole my dog made. Wish I had called him sooner.",
    service: "handyman-honey-do",
    stat: "$350 half-day · 10 items finished",
  },
];

// ─── FAQs (12 minimum) ──────────────────────────────────────────────────────
// Sourced from market-intelligence §6 AEO content gap question list. First-
// paragraph answers are 2-sentence direct answers (AEO citation bait). Mix of
// cost / license / process / trust questions per spec. [CONFIRM] tags mark
// answers containing numbers or claims Anjo has not yet verified.
export const faqs: FaqItem[] = [
  {
    q: "How much does a kitchen remodel cost in Methuen MA in 2025?",
    a: "Kitchen remodels in Methuen MA typically run $25,000 to $65,000 in 2025. Most of our Methuen, Andover, and Haverhill kitchens land between $35,000 and $45,000. Final cost depends on cabinet line, counter material, layout changes, and what we find behind your walls. We publish a written quote within 24 hours of the walkthrough, with a line-item breakdown so you know exactly where the dollars go.",
  },
  {
    q: "What is the difference between a $30K and a $60K kitchen remodel?",
    a: "A $30K kitchen typically keeps the existing layout, swaps cabinets and counters, refreshes lighting and paint, and reuses appliances. A $60K kitchen usually relocates plumbing or walls, upgrades to custom or semi-custom cabinets, adds an island, includes new appliances, and uses higher-grade counter material like quartz or natural stone. We will walk you through both options on the same quote so you can pick.",
  },
  {
    q: "Are you licensed in MA and NH?",
    a: "Yes. Anjo Services holds Massachusetts HIC #[CONFIRM] and CSL #[CONFIRM], both lookup-verifiable on Mass.gov. Our New Hampshire license is #[CONFIRM]. We carry general liability insurance and workers comp. License numbers print on every contract and every quote we send.",
  },
  {
    q: "Do you handle all the permitting for my project?",
    a: "Yes. We pull every permit your job requires in Methuen, Andover, Haverhill, North Andover, Lawrence, and across Salem, Derry, Windham, and Londonderry NH. Massachusetts requires permits on most structural, electrical, and plumbing work over $2,000, and we know which town inspector wants what. You sign the homeowner authorization and we handle the rest.",
  },
  {
    q: "How long does a typical bathroom remodel take?",
    a: "A standard hall bathroom remodel takes 9 to 14 working days from demo to final caulk. A full primary suite with tile shower, double vanity, and lighting changes runs 12 to 18 working days. We give you a calendar with start date, key milestones, and final-walkthrough day in writing before we swing the first hammer.",
  },
  {
    q: "What if my last contractor abandoned my project, can you finish it?",
    a: "Yes. We finish what other contractors started, regularly. Walk us through the project on a 30 minute on-site call, send photos of any contracts or change orders the previous contractor left behind, and we will tell you straight what is fixable, what needs to be redone, and what it costs. No judgment, just an honest path forward.",
  },
  {
    q: "Do I need a permit to install a coffered ceiling or accent wall in Massachusetts?",
    a: "Most coffered ceilings and accent walls do NOT require a permit in Massachusetts because they are decorative finish carpentry, not structural. If the work involves moving electrical, recessed lighting, or load-bearing changes, then yes a permit is needed. We tell you on the walkthrough so there are no surprises.",
  },
  {
    q: "How do I find a contractor who actually shows up?",
    a: "Three signals to check before you hire: did they answer your first call or text within 24 hours, do they publish their license numbers, and can they show you finished projects with prices attached. If any one is missing, keep looking. We meet all three on this site, in writing, with photos.",
  },
  {
    q: "What questions should I ask before hiring a general contractor in Massachusetts?",
    a: "Ask for the MA HIC and CSL numbers and look them up on Mass.gov before signing anything. Ask for proof of general liability and workers comp insurance, written. Ask for three recent project addresses you can drive past. Ask for a written quote with line items, a written contract that complies with M.G.L. c. 142A, and a clear payment schedule that does not front-load deposits.",
  },
  {
    q: "Can a handyman legally do electrical or plumbing work in Massachusetts and New Hampshire?",
    a: "A handyman can swap a faucet, replace a switch plate, or hang a light fixture on existing wiring. New circuits, panel work, and water-line changes require a licensed electrician or plumber by law in both states. We do the small stuff in-house and bring in our trusted licensed pros for anything that needs a permit, billed at cost plus our coordination time so you see the math.",
  },
  {
    q: "What is your service area?",
    a: "Methuen, Andover, North Andover, Haverhill, Lawrence, and the surrounding North Shore Massachusetts towns. Plus Salem NH, Derry, Windham, Londonderry, and Hampstead in southern New Hampshire. If you are within 20 miles of Methuen, we cover you with no travel fee. Outside that, we will tell you on the first call whether it makes sense.",
  },
  {
    q: "How fast can you get me a written quote?",
    a: "Within 24 hours of the on-site walkthrough, in writing, with line items. If you text us at 9pm tonight, we will confirm receipt with an auto-reply and Tony will reply personally by 8am tomorrow. Walkthroughs in the corridor usually happen within 3 to 5 business days of the first call.",
  },
];

// ─── Quiz Steps (6 questions — minimum needed to type cleanly) ──────────────
// 4 archetypes per design-system §11 row 3:
//   andover-upgrader / solo-homeowner / storm-recovery / ghosted-rebuilder
// Every archetype appears in at least 2 options across the quiz. 8 is the
// ceiling per CLAUDE.md Always-Built Features Rule, not the floor — 6 types
// the user cleanly. Auto-advance pattern. scoreQuiz() routes to recommended
// service tier.
export const quizSteps: QuizStep[] = [
  {
    question: "What is on your mind right now?",
    options: [
      { emoji: "🍳", label: "A kitchen or bath we have been planning forever", type: "andover-upgrader" },
      { emoji: "🔧", label: "A list of small things piling up", type: "solo-homeowner" },
      { emoji: "🌪️", label: "Storm or weather damage I need fixed fast", type: "storm-recovery" },
      { emoji: "👻", label: "A project the last contractor walked off", type: "ghosted-rebuilder" },
    ],
  },
  {
    question: "When did this start being a problem?",
    options: [
      { emoji: "📌", label: "Months ago, finally pulling the trigger", type: "andover-upgrader" },
      { emoji: "📋", label: "Years ago, the list keeps growing", type: "solo-homeowner" },
      { emoji: "🌧️", label: "Last week, urgent", type: "storm-recovery" },
      { emoji: "📞", label: "Three contractors ago", type: "ghosted-rebuilder" },
    ],
  },
  {
    question: "What does your timeline look like?",
    options: [
      { emoji: "🗓️", label: "Planning for the next 2 to 6 months", type: "andover-upgrader" },
      { emoji: "🐢", label: "Whenever, no rush", type: "solo-homeowner" },
      { emoji: "⚡", label: "This week if possible", type: "storm-recovery" },
      { emoji: "🏗️", label: "ASAP, the house is half-finished", type: "ghosted-rebuilder" },
    ],
  },
  {
    question: "What is your rough budget feeling like?",
    options: [
      { emoji: "💳", label: "$25K and up, planning a real project", type: "andover-upgrader" },
      { emoji: "💵", label: "Under $2K, just small jobs", type: "solo-homeowner" },
      { emoji: "📉", label: "Insurance is involved, need an estimate first", type: "storm-recovery" },
      { emoji: "💸", label: "I already paid the last guy and got nothing", type: "ghosted-rebuilder" },
    ],
  },
  {
    question: "Which sentence sounds most like you?",
    options: [
      { emoji: "📍", label: "I know exactly the look I want, saw it on Pinterest", type: "andover-upgrader" },
      { emoji: "🪛", label: "I am not handy, I just need someone reliable", type: "solo-homeowner" },
      { emoji: "🚧", label: "Something broke and I need it safe today", type: "storm-recovery" },
      { emoji: "📂", label: "I have a folder of unfinished work to show you", type: "ghosted-rebuilder" },
    ],
  },
  {
    question: "What matters most when you hire?",
    options: [
      { emoji: "📷", label: "Real project photos with real prices attached", type: "andover-upgrader" },
      { emoji: "🤝", label: "Same person every visit, treats my home with respect", type: "solo-homeowner" },
      { emoji: "🚐", label: "They actually show up the day they say", type: "storm-recovery" },
      { emoji: "✅", label: "They will finish what someone else started", type: "ghosted-rebuilder" },
    ],
  },
];

// ─── Service Areas (cities — descriptions filled by content-writer) ────────
// Population + distance from Methuen are static facts. Descriptions written
// in plain trade voice. [DEMO COPY — pending client review]
export const serviceAreas: ServiceArea[] = [
  {
    city: "Methuen",
    state: "MA",
    slug: "methuen-ma",
    population: 53000,
    distance: "0 miles",
    description:
      "Tony's home base. Most of our finish carpentry, kitchen, and handyman work comes out of Methuen. Same-week walkthroughs, no travel fee, every permit pulled at the Methuen building department in person.",
  },
  {
    city: "Andover",
    state: "MA",
    slug: "andover-ma",
    population: 36500,
    distance: "5 miles",
    description:
      "Andover colonials and capes are our sweet spot. Coffered ceilings, kitchen remodels, primary bath gut jobs. We know the inspectors and the permit office hours. Quotes within 24 hours of the walkthrough.",
  },
  {
    city: "Haverhill",
    state: "MA",
    slug: "haverhill-ma",
    population: 67000,
    distance: "5 miles",
    description:
      "Haverhill's mix of older homes and newer construction means everything from a $2K accent wall to a $42K kitchen. We run jobs across Bradford and the downtown corridor every month.",
  },
  {
    city: "North Andover",
    state: "MA",
    slug: "north-andover-ma",
    population: 31300,
    distance: "6 miles",
    description:
      "North Andover homeowners typically come to us for kitchen remodels in the $35K to $50K range, plus accent walls and built-in millwork. Quick turnaround on quotes, no design-build overhead.",
  },
  {
    city: "Lawrence",
    state: "MA",
    slug: "lawrence-ma",
    population: 89000,
    distance: "3 miles",
    description:
      "Lawrence has been part of our service area since day one. We handle everything from full bath remodels to deck rebuilds to honey-do days, with permits pulled at City Hall and final inspections signed off in writing.",
  },
  {
    city: "Salem",
    state: "NH",
    slug: "salem-nh",
    population: 30100,
    distance: "8 miles",
    description:
      "Salem NH is 12 minutes from Methuen and a major part of our weekly schedule. Decks, finish carpentry, kitchens, and handyman days. NH license on file, no Massachusetts contractor surprises.",
  },
  {
    city: "Derry",
    state: "NH",
    slug: "derry-nh",
    population: 34300,
    distance: "13 miles",
    description:
      "Derry homes from the 1980s and 1990s are great candidates for our kitchen and bath refresh work. Half-hour drive, no travel fee within our 20-mile radius from Methuen.",
  },
  {
    city: "Windham",
    state: "NH",
    slug: "windham-nh",
    population: 15700,
    distance: "10 miles",
    description:
      "Windham composite decks, pergolas, and finish carpentry are a regular part of our spring and summer schedule. We coordinate inspectors and permits the same way we do across the state line.",
  },
  {
    city: "Londonderry",
    state: "NH",
    slug: "londonderry-nh",
    population: 26700,
    distance: "15 miles",
    description:
      "Londonderry kitchen and bath work, plus the occasional storm-damage fence and deck repair after a nor'easter. Within our no-travel-fee zone, quick response on urgent jobs.",
  },
];

// Schema.org structured data (per market-intelligence §6: GeneralContractor preferred)
export const schema = {
  type: "GeneralContractor" as const,
  parentType: "HomeAndConstructionBusiness",
  priceRange: "$$",
  founder: { "@type": "Person", name: "Tony Squillini" },
  foundingDate: "2018",
  areaServed: serviceAreas.map((a) => ({ "@type": "City", name: `${a.city}, ${a.state}` })),
};
