/**
 * serviceAreaDescriptions.ts — Per-city long-form copy for /service-areas/[city] pages.
 *
 * Why a separate file from site.ts:
 *   site.ts is the single source of truth for the 9 ServiceArea entries (city,
 *   state, slug, population, distance, short description). This file holds the
 *   LONG copy specific to each city's landing page (intro, population context,
 *   distance expansion, typical projects, city-specific FAQs). Wave 2E owns
 *   this file. site.ts is read-only for this agent.
 *
 * Voice: business-owner (Tony Squillini), per CLAUDE.md Copy Writing Rule
 * "Act as business owner when data is thin." Specific local detail (highway
 * access, neighborhood character, housing stock) per market-intelligence §6
 * primary keyword #3 (handyman + city) and §9 strategic recommendation #5
 * (individual service-city landing pages — fastest path to local SEO
 * dominance).
 *
 * Persona anchors per initial-business-data §2 + §3:
 *   - Andover MA      → ANDOVER UPGRADER core (1980s colonial, family of 4,
 *                       kitchen-bath bundle)
 *   - Methuen MA      → home base + Solo Homeowner spread
 *   - Lawrence MA     → contractor density + ghosted-rebuilder pickup work
 *   - Salem NH        → I-93/I-495 commute corridor
 *   - others (Haverhill, North Andover, Derry, Windham, Londonderry) → general
 *
 * ZERO em dashes. Every entry marked [DEMO COPY — pending client review].
 */

export type ServiceAreaDescription = {
  slug: string;
  intro: string;
  populationContext: string;
  distanceFromBase: string;
  typicalProjects: string[];
  cityFaqs: { q: string; a: string }[];
};

export const serviceAreaDescriptions: Record<string, ServiceAreaDescription> = {
  // ── Methuen, MA — Anjo home base ─────────────────────────────────────────
  // [DEMO COPY — pending client review]
  "methuen-ma": {
    slug: "methuen-ma",
    intro:
      "Methuen is Anjo's home base. Tony lives, parks the truck, and pulls every Methuen permit in person. Most of our finish carpentry, kitchen, and handyman work starts and ends within a 5-minute drive from the office, which means same-week walkthroughs and zero travel fee.",
    populationContext:
      "Methuen's housing stock runs the full range, from 1900s mill-era homes near the downtown loop to 1980s colonials in Pleasant Valley and newer construction off Pelham Street. We work in all of them.",
    distanceFromBase:
      "0 miles. Anjo's truck is parked in Methuen every night, and Tony's number is the Methuen number on every contract.",
    typicalProjects: [
      "Coffered ceilings in 1980s colonials off Pleasant Valley",
      "Full kitchen remodels in the $35K to $45K range",
      "Honey-do days for downtown condo and split-entry owners",
      "Cabinet repaints and shiplap entryways under $3K",
      "Permitted hall bath gut remodels in 9 to 12 working days",
      "Cedar privacy fences and pressure-treated decks behind ranches",
    ],
    cityFaqs: [
      {
        q: "Do you charge a travel fee for projects in Methuen, MA?",
        a: "No. Methuen is Anjo's home base. Every Methuen project is a 0-mile drive from the truck, no travel fee, and we can usually walk through your job within 3 to 5 business days of the first call.",
      },
      {
        q: "How much does a kitchen remodel cost in Methuen MA in 2025?",
        a: "Most Methuen kitchens we finish land between $35,000 and $45,000 in 2025, with the full range running $25,000 to $65,000 depending on cabinet line, layout changes, and counter material. We send a written quote with line items within 24 hours of the on-site walkthrough.",
      },
      {
        q: "Do you pull permits at the Methuen building department yourself?",
        a: "Yes. Tony walks every Methuen permit through City Hall in person. We know which inspector wants what on rough plumbing, electrical, and final, and we schedule inspections so your job does not sit waiting for a sign-off.",
      },
    ],
  },

  // ── Andover, MA — Andover Upgrader core ──────────────────────────────────
  // [DEMO COPY — pending client review]
  "andover-ma": {
    slug: "andover-ma",
    intro:
      "Andover is the heart of our weekly schedule. The Andover Upgrader is our core customer: family of four in a 1980s colonial, two careers, kitchen and primary bath both showing their age, ready to write a real check for a real project. We know the inspectors, the permit office hours, and which cabinet lines hold up in this corridor.",
    populationContext:
      "Most Andover homes we work in were built between 1978 and 1995. Two-story colonials, dated oak kitchens, original primary baths, fluorescent box lights, soffits over the cabinets. Refresh-ready with the right scope.",
    distanceFromBase:
      "5 miles south of Anjo's Methuen base via I-495 South to exit 41. Most Andover walkthroughs we book in the morning and the truck is there by lunch.",
    typicalProjects: [
      "Full kitchen remodels for 1980s colonials, $38K to $48K range",
      "Primary bath gut jobs with tile shower, double vanity, $18K to $24K",
      "Coffered ceilings and board-and-batten accent walls",
      "Built-in mudroom lockers and home-office bookcases",
      "Crown molding plus tray-ceiling treatments in living and dining rooms",
      "Cedar pergolas and Trex composite deck rebuilds",
    ],
    cityFaqs: [
      {
        q: "How much does a kitchen and bath bundle cost in Andover MA in 2025?",
        a: "An Andover kitchen plus primary bath bundle typically runs $55,000 to $75,000 in 2025 depending on cabinet line, counter material, tile choice, and whether plumbing relocates. We quote both line-by-line on the same document so you can pick the scope mix that fits your budget.",
      },
      {
        q: "Do you handle permits and inspections in Andover MA?",
        a: "Yes. We pull every permit your Andover project requires at the Andover building department, schedule rough and final inspections, and meet the inspector on site. License numbers print on every contract.",
      },
      {
        q: "What is your typical timeline for an Andover MA kitchen remodel?",
        a: "Most Andover kitchen remodels run 18 to 26 working days from demo to final walkthrough. We give you a calendar with start date, key milestones, and final walkthrough day in writing before we swing the first hammer.",
      },
    ],
  },

  // ── Haverhill, MA ────────────────────────────────────────────────────────
  // [DEMO COPY — pending client review]
  "haverhill-ma": {
    slug: "haverhill-ma",
    intro:
      "Haverhill keeps us busy across Bradford, the downtown corridor, and the newer construction off Boston Road. The mix of 1900s mill-era homes, 1970s capes, and 2000s subdivisions means we run everything from a $2K shiplap accent wall to a $42K kitchen gut job out of the same truck, with the same standards.",
    populationContext:
      "Haverhill's housing stock is the most varied we cover. Bradford's older colonials, the downtown three-deckers, the Riverside ranches, and the newer Boston Road subdivisions each get a different scope of work.",
    distanceFromBase:
      "5 miles north of Anjo's Methuen base via I-495 North to exit 51 or Route 110 East. Same-week walkthroughs, no travel fee anywhere in city limits.",
    typicalProjects: [
      "Wainscoting and chair rail in dining rooms across Bradford",
      "Full kitchen remodels in the $35K to $46K range",
      "Kid-bath gut jobs with permitted tile, plumbing, and paint",
      "Cabinet refreshes with sprayed two-coat finish, $3K to $4K",
      "Whole-house interior repaints in 5 to 7 working days",
      "Deck rebuilds and railing fixes for ghosted prior contractors",
    ],
    cityFaqs: [
      {
        q: "Do you serve all of Haverhill MA, including Bradford and Riverside?",
        a: "Yes. We work across every Haverhill neighborhood including Bradford, the downtown three-decker corridor, Riverside, and the newer subdivisions off Boston Road. No travel fee anywhere within Haverhill city limits.",
      },
      {
        q: "How much does a bathroom remodel cost in Haverhill MA in 2025?",
        a: "Haverhill bathroom remodels typically run $12,000 to $22,000 in 2025 depending on tile, fixtures, vanity, and whether plumbing moves. A standard hall bath usually lands around $15,000 to $18,000 with permitted tile shower, new vanity, toilet, and lighting.",
      },
      {
        q: "Can you finish a project another contractor abandoned in Haverhill?",
        a: "Yes. We finish what other contractors started across Haverhill regularly. Walk us through it on a 30 minute on-site visit, send photos of any prior contracts, and we will tell you straight what is fixable, what needs to be redone, and what it costs in writing.",
      },
    ],
  },

  // ── North Andover, MA ────────────────────────────────────────────────────
  // [DEMO COPY — pending client review]
  "north-andover-ma": {
    slug: "north-andover-ma",
    intro:
      "North Andover homeowners typically come to us for kitchen remodels in the $35K to $50K range, plus accent walls and built-in millwork on existing colonials. Quick turnaround on quotes, no design-build overhead, no salesperson layer between you and the carpenter.",
    populationContext:
      "Most North Andover homes we work in are 1980s and 1990s colonials with two-car garages, four bedrooms up, and a kitchen that has not been updated since the original closing.",
    distanceFromBase:
      "6 miles east of Anjo's Methuen base via Route 114 East. We park in North Andover often enough that the lumber yard cashier knows the truck.",
    typicalProjects: [
      "Coffered ceilings in dining and living rooms, $4K to $5K range",
      "Kitchen remodels with island add and quartz counters",
      "Powder room refreshes with new fixtures, paint, and picture light",
      "Custom built-in bookcase walls and home-office millwork",
      "Stair skirt board, painted risers, stained tread refinishing",
      "Crown molding runs across multiple rooms",
    ],
    cityFaqs: [
      {
        q: "How much does a coffered ceiling cost in North Andover MA?",
        a: "Most coffered ceilings we install in North Andover dining and living rooms run $3,500 to $5,500 depending on grid size, beam profile, and ceiling height. Decorative finish carpentry like this does not require a permit unless we are also moving electrical.",
      },
      {
        q: "Do you do kitchen islands in North Andover MA?",
        a: "Yes. Adding a kitchen island in North Andover typically adds $4,000 to $9,000 to the remodel depending on whether plumbing or electrical relocate to it. We coordinate the plumber and electrician ourselves and pull every permit your job needs.",
      },
      {
        q: "What is your service radius from North Andover, MA?",
        a: "North Andover is 6 miles from Anjo's Methuen base, well inside our no-travel-fee zone. We can usually get a walkthrough on the calendar within 3 to 5 business days of your first call or text.",
      },
    ],
  },

  // ── Lawrence, MA — contractor density / ghosted-rebuilder ────────────────
  // [DEMO COPY — pending client review]
  "lawrence-ma": {
    slug: "lawrence-ma",
    intro:
      "Lawrence has been part of our service area since day one. The contractor density here is the highest in the corridor, which means we get a lot of calls from homeowners who hired the wrong guy first. We finish what other contractors started, pull every permit at City Hall ourselves, and sign off in writing.",
    populationContext:
      "Lawrence's housing mix runs from 1900s triple-deckers to 1960s ranches to newer multifamily conversions. We handle full bath remodels, deck rebuilds, and honey-do days across every neighborhood from Tower Hill to South Lawrence.",
    distanceFromBase:
      "3 miles south of Anjo's Methuen base via Route 28 South or I-495 South. The shortest drive on our weekly schedule.",
    typicalProjects: [
      "Deck rebuilds where the prior contractor walked off mid-job",
      "Kitchen remodels with custom pantry conversion",
      "TV mounts on stone fireplaces with in-wall cable runs",
      "Full bath gut remodels with permits and inspections",
      "IKEA Sektion cabinet installs that hang plumb and level",
      "Ghosted-rebuilder pickup work across multiple trades",
    ],
    cityFaqs: [
      {
        q: "Can you finish a project another contractor abandoned in Lawrence MA?",
        a: "Yes. We finish what other contractors started in Lawrence regularly. Walk us through the project on a 30 minute on-site call, send photos of any contracts or change orders the previous contractor left behind, and we will tell you straight what is fixable, what needs to be redone, and what it costs.",
      },
      {
        q: "Are you licensed to pull permits at Lawrence City Hall?",
        a: "Yes. Anjo holds Massachusetts HIC and CSL licenses, both lookup-verifiable on Mass.gov, and we pull every Lawrence permit your job requires at City Hall in person. License numbers print on every contract and quote.",
      },
      {
        q: "Do you serve all neighborhoods in Lawrence MA?",
        a: "Yes. We work across every Lawrence neighborhood including Tower Hill, South Lawrence, Mount Vernon, and the downtown corridor. Lawrence is 3 miles from our Methuen base, no travel fee, and usually the shortest drive on our weekly schedule.",
      },
    ],
  },

  // ── Salem, NH — I-93 / I-495 commute corridor ────────────────────────────
  // [DEMO COPY — pending client review]
  "salem-nh": {
    slug: "salem-nh",
    intro:
      "Salem NH is 12 minutes from Methuen and a major part of our weekly schedule. The I-93 and I-495 commute corridor brings us a steady mix of professionals who bought 1990s and 2000s colonials in Salem and need a contractor who can write a real quote for a real kitchen, bath, or deck project. NH license on file. No Massachusetts contractor surprises.",
    populationContext:
      "Salem NH's housing stock leans toward 1980s through 2000s colonials and capes, often on larger lots with dated kitchens, original primary baths, and decks that need either rebuild or replacement.",
    distanceFromBase:
      "8 miles north of Anjo's Methuen base via I-93 North to exit 1 in Salem. The I-93 / I-495 connector keeps our drive time predictable in both directions.",
    typicalProjects: [
      "Big-format porcelain tile in primary bath remodels",
      "Composite deck rebuilds with hidden fasteners and code-compliant railings",
      "Living room repaints with vaulted ceilings and scaffold work",
      "Picture frame molding and accent wall finish carpentry",
      "Full-day handyman service for single-owner punch lists",
      "Kitchen remodels in the $35K to $50K range",
    ],
    cityFaqs: [
      {
        q: "Are you licensed in New Hampshire?",
        a: "Yes. Anjo Services holds a New Hampshire license on file in addition to our Massachusetts HIC and CSL. License numbers print on every Salem NH contract and quote, and we carry general liability and workers comp insurance on both sides of the state line.",
      },
      {
        q: "How long does it take to drive from Methuen to Salem NH for a walkthrough?",
        a: "About 12 minutes via I-93 North to exit 1, less in off-peak hours. Salem NH is 8 miles from our Methuen base and is on our weekly route every week, so we can usually get a walkthrough on the calendar within 3 to 5 business days.",
      },
      {
        q: "Do you charge a travel fee for projects in Salem NH?",
        a: "No. Salem NH is well inside our 20-mile no-travel-fee radius from Methuen. The I-93 / I-495 commute corridor makes the drive predictable, and we treat Salem the same as any of our Massachusetts towns on pricing and scheduling.",
      },
    ],
  },

  // ── Derry, NH ────────────────────────────────────────────────────────────
  // [DEMO COPY — pending client review]
  "derry-nh": {
    slug: "derry-nh",
    intro:
      "Derry homes from the 1980s and 1990s are great candidates for our kitchen and bath refresh work. Half-hour drive from Methuen, no travel fee within our 20-mile radius, and a steady mix of finish carpentry plus refresh-tier remodels keeps Derry on our weekly schedule.",
    populationContext:
      "Most Derry homes we work in were built between 1985 and 2002. Two-story colonials, original oak kitchens, dated hall baths, and decks that need rebuild or refinish.",
    distanceFromBase:
      "13 miles north of Anjo's Methuen base via I-93 North to exit 4. Comfortable drive, predictable timing, no surprise traffic on the local routes.",
    typicalProjects: [
      "Built-in mudroom lockers and entryway storage",
      "Kitchen remodels with cabinet, counter, and lighting refresh",
      "Half-day and full-day handyman blocks for single-owner punch lists",
      "Fence repair after storms, including post and picket replacement",
      "Bathroom refresh with new vanity, toilet, paint, and lighting",
      "Accent wall finish carpentry in living rooms and bedrooms",
    ],
    cityFaqs: [
      {
        q: "Do you serve Derry NH from your Methuen MA base?",
        a: "Yes. Derry NH is 13 miles from our Methuen base via I-93 North to exit 4, well inside our no-travel-fee radius. We are on the road in Derry weekly and can usually book a walkthrough within 3 to 5 business days.",
      },
      {
        q: "Are you licensed for contracting work in New Hampshire?",
        a: "Yes. Anjo Services holds a New Hampshire license on file along with our Massachusetts HIC and CSL. We carry general liability insurance and workers comp on both sides of the state line. License numbers print on every contract and quote.",
      },
      {
        q: "How fast can you respond to a storm-damage fence or deck call in Derry NH?",
        a: "Same week, often next day. Storm fence repair and deck issues get triaged ahead of scheduled remodel work. Text Tony at (978) 216-6455 with photos and we will give you a turnaround timeline within 24 hours.",
      },
    ],
  },

  // ── Windham, NH ──────────────────────────────────────────────────────────
  // [DEMO COPY — pending client review]
  "windham-nh": {
    slug: "windham-nh",
    intro:
      "Windham composite decks, pergolas, and finish carpentry are a regular part of our spring and summer schedule. We coordinate inspectors and permits the same way we do across the state line, and the larger lot sizes here mean a lot of our outdoor build work happens in Windham.",
    populationContext:
      "Windham's housing stock leans newer, with many 1995 to 2010 colonials and capes on larger lots. Decks, pergolas, fence runs, and finish carpentry refreshes are the bulk of our work here.",
    distanceFromBase:
      "10 miles north of Anjo's Methuen base via I-93 North to exit 3. A clean drive with no Boston-bound traffic in either direction.",
    typicalProjects: [
      "Trex composite deck builds with hidden fasteners",
      "Cedar pergolas built on site over patios",
      "Custom built-in office bookcases and wall units",
      "Picture frame molding and crown molding runs",
      "Privacy fence runs and gate hangs",
      "Kitchen remodels in newer construction homes",
    ],
    cityFaqs: [
      {
        q: "Do you build composite decks in Windham NH?",
        a: "Yes. Composite deck builds are a regular part of our Windham schedule, usually Trex with hidden fasteners. Footings get inspected first, framing second, deck boards last. Most 16x20 builds finish in 6 to 8 working days.",
      },
      {
        q: "How much does a cedar pergola cost in Windham NH?",
        a: "Most cedar pergolas we build in Windham run $6,500 to $9,000 depending on size, post count, and whether it is freestanding or ledger-bolted to the house. We build on site, no kit, with proper flashing where it ties to the structure.",
      },
      {
        q: "Are you available for spring and summer outdoor builds in Windham NH?",
        a: "Yes. Spring and summer is the busiest time for our outdoor build schedule in Windham, so book the walkthrough early. Text Tony at (978) 216-6455 in late winter or early spring for the best slot on the calendar.",
      },
    ],
  },

  // ── Londonderry, NH ──────────────────────────────────────────────────────
  // [DEMO COPY — pending client review]
  "londonderry-nh": {
    slug: "londonderry-nh",
    intro:
      "Londonderry kitchen and bath work, plus the occasional storm-damage fence and deck repair after a nor'easter. Within our no-travel-fee zone, quick response on urgent jobs, and a steady mix of refresh-tier remodels keeps Londonderry on our calendar through the year.",
    populationContext:
      "Most Londonderry homes we work in are 1990s and 2000s colonials and capes, often with original kitchens and primary baths that are 15 to 25 years old and ready for a refresh.",
    distanceFromBase:
      "15 miles north of Anjo's Methuen base via I-93 North to exit 4 or exit 5. Right at the edge of our no-travel-fee radius, no surcharge.",
    typicalProjects: [
      "Galley kitchen reworks that fix flow without moving plumbing",
      "Master bath gut remodels with permitted tile shower",
      "Fence and deck repair after nor'easter wind damage",
      "Cabinet repaint and counter refresh combos",
      "Whole-house interior repaint in 5 to 7 working days",
      "Finish carpentry punch-list days for new construction owners",
    ],
    cityFaqs: [
      {
        q: "Do you charge a travel fee for projects in Londonderry NH?",
        a: "No. Londonderry NH is 15 miles from our Methuen base, right at the edge of our no-travel-fee radius. No surcharge. We are on the road in Londonderry weekly and can usually book a walkthrough within 3 to 5 business days.",
      },
      {
        q: "How fast can you respond to a storm-damage repair in Londonderry NH?",
        a: "Same week, often next day. Storm fence and deck damage gets triaged ahead of scheduled remodel work. Text Tony at (978) 216-6455 with photos of the damage and we will give you a turnaround timeline within 24 hours.",
      },
      {
        q: "Are you licensed in New Hampshire?",
        a: "Yes. Anjo Services holds a New Hampshire license on file along with Massachusetts HIC and CSL. We carry general liability insurance and workers comp on both sides of the state line, and license numbers print on every Londonderry contract and quote.",
      },
    ],
  },
};
