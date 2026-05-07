/**
 * gallery.ts — typed gallery items for /gallery and any homepage teasers.
 *
 * 54 items across 6 categories (9 each), matching the 6 Anjo Services
 * offerings in /data/site.ts services array. Lead category is Finish
 * Carpentry per market-intelligence.md §9 strategic recommendation #2
 * (Tony's favorite work, highest-margin small-project tier, zero local
 * SEO competition).
 *
 * Aspect ratios mix `aspect-[4/3]` and `aspect-square` for masonry rhythm
 * (matches Placed Right Fence gallery pattern). The aspect MUST match the
 * underlying fal.ai image dimensions — see /scripts/seed-anjo-gallery-prompts.mjs
 * + /scripts/prompts/{slug}.json for the canonical imageSize per slug.
 */

export type GalleryCategory =
  | "Finish Carpentry"
  | "Kitchen"
  | "Bath"
  | "Outdoor"
  | "Painting"
  | "Handyman";

export interface GalleryItem {
  slug: string;
  category: GalleryCategory;
  town: string;
  scope: string;
  priceBand: string;
  year: string;
  alt: string;
  /** Tailwind aspect class — mix square + 4:3 for masonry rhythm. */
  aspectClass: "aspect-[4/3]" | "aspect-square";
}

// ── Finish Carpentry (9) — Anjo's lead category ─────────────────────────────
export const FINISH_CARPENTRY: GalleryItem[] = [
  {
    slug: "andover-coffered-ceiling",
    category: "Finish Carpentry",
    town: "Andover, MA",
    scope: "Coffered ceiling, dining room",
    priceBand: "$4,200",
    year: "2024",
    alt: "Andover dining room with newly installed coffered ceiling, painted millwork grid in warm white.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "methuen-board-and-batten",
    category: "Finish Carpentry",
    town: "Methuen, MA",
    scope: "Board and batten accent wall, primary bedroom",
    priceBand: "$2,400",
    year: "2024",
    alt: "Methuen primary bedroom board and batten accent wall painted Hale Navy.",
    aspectClass: "aspect-square",
  },
  {
    slug: "north-andover-shiplap-entry",
    category: "Finish Carpentry",
    town: "North Andover, MA",
    scope: "Shiplap entryway, floor to ceiling",
    priceBand: "$1,950",
    year: "2024",
    alt: "North Andover entryway with full-height shiplap painted bright white.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "windham-built-in-bookcase",
    category: "Finish Carpentry",
    town: "Windham, NH",
    scope: "Custom home-office built-in bookcase wall",
    priceBand: "$5,200",
    year: "2024",
    alt: "Windham home office with painted custom built-in bookcase spanning a 14-foot wall.",
    aspectClass: "aspect-square",
  },
  {
    slug: "lawrence-oak-stair-balustrade",
    category: "Finish Carpentry",
    town: "Lawrence, MA",
    scope: "Red-oak stair balustrade rebuild",
    priceBand: "$5,800",
    year: "2024",
    alt: "Lawrence two-story colonial with finished red-oak stair balustrade and painted-white risers.",
    aspectClass: "aspect-square",
  },
  {
    slug: "salem-nh-mantel-builtins",
    category: "Finish Carpentry",
    town: "Salem, NH",
    scope: "Custom mantel + flanking built-ins",
    priceBand: "$6,400",
    year: "2024",
    alt: "Salem NH living room with custom mantel and floor-to-ceiling flanking built-in bookcases.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "derry-coffered-living-room",
    category: "Finish Carpentry",
    town: "Derry, NH",
    scope: "Coffered ceiling, living room",
    priceBand: "$5,200",
    year: "2024",
    alt: "Derry NH living room with deep coffered ceiling and recessed LEDs.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "haverhill-craftsman-trim",
    category: "Finish Carpentry",
    town: "Haverhill, MA",
    scope: "Whole-house craftsman trim package",
    priceBand: "$9,800",
    year: "2023",
    alt: "Haverhill craftsman bungalow corner showing wide casing, chunky baseboard, and picture rail.",
    aspectClass: "aspect-square",
  },
  {
    slug: "methuen-wainscoting-dining",
    category: "Finish Carpentry",
    town: "Methuen, MA",
    scope: "Picture-frame wainscoting, dining room",
    priceBand: "$2,800",
    year: "2024",
    alt: "Methuen dining room with picture-frame wainscoting in white below a deep navy wall.",
    aspectClass: "aspect-[4/3]",
  },
];

// ── Kitchen (9) ──────────────────────────────────────────────────────────────
export const KITCHEN: GalleryItem[] = [
  {
    slug: "methuen-kitchen-remodel",
    category: "Kitchen",
    town: "Methuen, MA",
    scope: "Full kitchen remodel, cabinets, quartz, island",
    priceBand: "$42,000",
    year: "2024",
    alt: "Methuen kitchen after remodel with painted shaker cabinets, quartz counters, and an island.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "andover-kitchen-island",
    category: "Kitchen",
    town: "Andover, MA",
    scope: "Kitchen + 9-foot island, quartz counters",
    priceBand: "$52,000",
    year: "2024",
    alt: "Andover open-plan kitchen with a 9-foot quartz island and pendant lighting.",
    aspectClass: "aspect-square",
  },
  {
    slug: "haverhill-kitchen-refresh",
    category: "Kitchen",
    town: "Haverhill, MA",
    scope: "Cabinet refresh, counters, lighting, paint",
    priceBand: "$28,500",
    year: "2024",
    alt: "Haverhill kitchen after a partial refresh with painted cabinets and updated lighting.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "north-andover-galley-refresh",
    category: "Kitchen",
    town: "North Andover, MA",
    scope: "Galley kitchen cabinet refresh",
    priceBand: "$11,400",
    year: "2024",
    alt: "North Andover galley kitchen with sage-green lower and white upper shaker cabinets.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "derry-quartz-counter-update",
    category: "Kitchen",
    town: "Derry, NH",
    scope: "Quartz counter swap, refinish",
    priceBand: "$8,200",
    year: "2024",
    alt: "Derry NH kitchen close-up of new white quartz counter with grey vein and undermount sink.",
    aspectClass: "aspect-square",
  },
  {
    slug: "salem-nh-shaker-cabinet-paint",
    category: "Kitchen",
    town: "Salem, NH",
    scope: "Shaker cabinet paint + new pulls",
    priceBand: "$4,400",
    year: "2024",
    alt: "Salem NH kitchen shaker cabinets repainted deep navy with brushed-brass bar pulls.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "lawrence-tile-backsplash",
    category: "Kitchen",
    town: "Lawrence, MA",
    scope: "Subway tile backsplash + grout",
    priceBand: "$3,200",
    year: "2024",
    alt: "Lawrence kitchen with white subway tile backsplash in 50-percent running bond and grey grout.",
    aspectClass: "aspect-square",
  },
  {
    slug: "windham-pantry-buildout",
    category: "Kitchen",
    town: "Windham, NH",
    scope: "Walk-in pantry buildout",
    priceBand: "$6,800",
    year: "2024",
    alt: "Windham NH walk-in pantry with melamine shelves, painted shaker face-frames, and butcher-block counter.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "methuen-island-with-pendant",
    category: "Kitchen",
    town: "Methuen, MA",
    scope: "Custom island + pendant lighting",
    priceBand: "$14,500",
    year: "2024",
    alt: "Methuen kitchen with matte-black custom island, white quartz top, and three rattan pendants.",
    aspectClass: "aspect-[4/3]",
  },
];

// ── Bath (9) ─────────────────────────────────────────────────────────────────
export const BATH: GalleryItem[] = [
  {
    slug: "salem-nh-primary-bath",
    category: "Bath",
    town: "Salem, NH",
    scope: "Primary bath gut, tile shower, double vanity",
    priceBand: "$18,000",
    year: "2024",
    alt: "Salem NH primary bath with curbless tile shower and a double-sink vanity.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "andover-hall-bath",
    category: "Bath",
    town: "Andover, MA",
    scope: "Hall bath remodel, tile, vanity, fixtures",
    priceBand: "$16,800",
    year: "2024",
    alt: "Andover hall bathroom with new tile, vanity, and updated fixtures.",
    aspectClass: "aspect-square",
  },
  {
    slug: "methuen-guest-bath-tile",
    category: "Bath",
    town: "Methuen, MA",
    scope: "Guest bath tile floor + vanity",
    priceBand: "$8,800",
    year: "2024",
    alt: "Methuen guest bath with hexagonal black-and-white penny-round tile floor and white shiplap walls.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "north-andover-walk-in-shower",
    category: "Bath",
    town: "North Andover, MA",
    scope: "Walk-in tile shower, glass panel",
    priceBand: "$13,500",
    year: "2024",
    alt: "North Andover primary bath with curbless walk-in shower in warm-grey large-format tile.",
    aspectClass: "aspect-square",
  },
  {
    slug: "derry-tub-to-shower",
    category: "Bath",
    town: "Derry, NH",
    scope: "Tub-to-shower conversion",
    priceBand: "$11,200",
    year: "2024",
    alt: "Derry NH bathroom tub-to-shower conversion with white subway tile and slate mosaic accent strip.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "haverhill-double-vanity",
    category: "Bath",
    town: "Haverhill, MA",
    scope: "Double vanity install + lighting",
    priceBand: "$7,400",
    year: "2024",
    alt: "Haverhill primary bath with 72-inch white shaker double vanity and quartz top.",
    aspectClass: "aspect-square",
  },
  {
    slug: "lawrence-half-bath-refresh",
    category: "Bath",
    town: "Lawrence, MA",
    scope: "Half bath refresh, fixtures + paint",
    priceBand: "$3,800",
    year: "2024",
    alt: "Lawrence half-bath with board-and-batten wainscoting and navy geometric wallpaper above.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "windham-shower-niche",
    category: "Bath",
    town: "Windham, NH",
    scope: "Tile shower with niche",
    priceBand: "$9,600",
    year: "2024",
    alt: "Windham NH bathroom shower-niche detail with subway tile and penny-round mosaic interior.",
    aspectClass: "aspect-square",
  },
  {
    slug: "andover-floating-vanity",
    category: "Bath",
    town: "Andover, MA",
    scope: "Floating vanity + LED mirror",
    priceBand: "$8,200",
    year: "2024",
    alt: "Andover primary bath with walnut floating vanity and LED-backlit rectangular mirror.",
    aspectClass: "aspect-[4/3]",
  },
];

// ── Outdoor — Decks, Fences, Pergolas (9) ────────────────────────────────────
export const OUTDOOR: GalleryItem[] = [
  {
    slug: "haverhill-deck",
    category: "Outdoor",
    town: "Haverhill, MA",
    scope: "Composite deck, 16 by 20, hidden fasteners",
    priceBand: "$14,000",
    year: "2023",
    alt: "Haverhill backyard with a finished composite deck, railings, and stairs to the lawn.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "windham-cedar-pergola",
    category: "Outdoor",
    town: "Windham, NH",
    scope: "Cedar pergola over patio, 14 by 16",
    priceBand: "$7,200",
    year: "2024",
    alt: "Windham backyard cedar pergola spanning a 14 by 16 patio with string lights.",
    aspectClass: "aspect-square",
  },
  {
    slug: "methuen-cedar-fence",
    category: "Outdoor",
    town: "Methuen, MA",
    scope: "Cedar privacy fence, 180 feet, two gates",
    priceBand: "$8,400",
    year: "2024",
    alt: "Methuen yard with a long cedar privacy fence and two matching gates.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "north-andover-composite-deck-rail",
    category: "Outdoor",
    town: "North Andover, MA",
    scope: "Composite deck rail rebuild",
    priceBand: "$6,800",
    year: "2024",
    alt: "North Andover second-story deck with dark-grey composite decking and white aluminum balusters.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "derry-screened-porch",
    category: "Outdoor",
    town: "Derry, NH",
    scope: "Screened porch enclosure",
    priceBand: "$14,200",
    year: "2024",
    alt: "Derry NH screened porch interior with bead-board ceiling and composite decking.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "salem-nh-deck-stair-rebuild",
    category: "Outdoor",
    town: "Salem, NH",
    scope: "Deck stair + skirt rebuild",
    priceBand: "$4,400",
    year: "2024",
    alt: "Salem NH split-level deck with rebuilt pressure-treated stairs and painted-white skirt board.",
    aspectClass: "aspect-square",
  },
  {
    slug: "lawrence-vinyl-privacy-fence",
    category: "Outdoor",
    town: "Lawrence, MA",
    scope: "Vinyl privacy fence + gates",
    priceBand: "$8,600",
    year: "2024",
    alt: "Lawrence two-family yard with 6-foot white vinyl privacy fence and matching gate.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "methuen-pergola-pavers",
    category: "Outdoor",
    town: "Methuen, MA",
    scope: "Pergola over paver patio",
    priceBand: "$9,800",
    year: "2023",
    alt: "Methuen backyard cedar pergola over a warm-grey clay-paver patio.",
    aspectClass: "aspect-square",
  },
  {
    slug: "haverhill-deck-skirt",
    category: "Outdoor",
    town: "Haverhill, MA",
    scope: "Deck skirt + lattice trim",
    priceBand: "$2,200",
    year: "2024",
    alt: "Haverhill deck side view with painted-white skirt board and white square lattice panels.",
    aspectClass: "aspect-[4/3]",
  },
];

// ── Painting (9) ─────────────────────────────────────────────────────────────
export const PAINTING: GalleryItem[] = [
  {
    slug: "methuen-exterior-house",
    category: "Painting",
    town: "Methuen, MA",
    scope: "Whole exterior repaint",
    priceBand: "$8,800",
    year: "2024",
    alt: "Methuen 1920s two-family colonial with freshly repainted warm-white siding and deep navy shutters.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "andover-interior-living",
    category: "Painting",
    town: "Andover, MA",
    scope: "Interior repaint, living room",
    priceBand: "$1,800",
    year: "2024",
    alt: "Andover colonial living room corner with freshly repainted warm greige walls and white trim.",
    aspectClass: "aspect-square",
  },
  {
    slug: "north-andover-cabinet-repaint",
    category: "Painting",
    town: "North Andover, MA",
    scope: "Cabinet repaint, kitchen",
    priceBand: "$3,400",
    year: "2024",
    alt: "North Andover kitchen with cabinets repainted soft matte sage green and original brushed-nickel pulls.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "salem-nh-deck-stain",
    category: "Painting",
    town: "Salem, NH",
    scope: "Deck stain + restoration",
    priceBand: "$1,400",
    year: "2024",
    alt: "Salem NH backyard deck with freshly applied semi-transparent warm cedar stain.",
    aspectClass: "aspect-square",
  },
  {
    slug: "derry-bedroom-accent",
    category: "Painting",
    town: "Derry, NH",
    scope: "Bedroom accent wall + ceiling",
    priceBand: "$1,200",
    year: "2024",
    alt: "Derry NH bedroom accent wall painted deep matte hunter-green with crisp ceiling and corner cut-lines.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "haverhill-shutter-paint",
    category: "Painting",
    town: "Haverhill, MA",
    scope: "Shutter + door repaint",
    priceBand: "$900",
    year: "2024",
    alt: "Haverhill cape with freshly repainted matte black shutters and front door, brushed-brass hardware.",
    aspectClass: "aspect-square",
  },
  {
    slug: "lawrence-exterior-trim",
    category: "Painting",
    town: "Lawrence, MA",
    scope: "Exterior trim touch-up",
    priceBand: "$2,400",
    year: "2024",
    alt: "Lawrence two-family front entry with freshly repainted white window casings and porch-column trim.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "windham-mudroom-paint",
    category: "Painting",
    town: "Windham, NH",
    scope: "Mudroom + bench paint",
    priceBand: "$1,600",
    year: "2024",
    alt: "Windham NH mudroom with built-in bench seat and cubby unit painted deep matte navy.",
    aspectClass: "aspect-square",
  },
  {
    slug: "methuen-front-door-refinish",
    category: "Painting",
    town: "Methuen, MA",
    scope: "Front door refinish, gloss",
    priceBand: "$480",
    year: "2024",
    alt: "Methuen colonial front door refinished in high-gloss deep brick-red with brass hardware.",
    aspectClass: "aspect-[4/3]",
  },
];

// ── Handyman & Honey-Do (9) ──────────────────────────────────────────────────
export const HANDYMAN: GalleryItem[] = [
  {
    slug: "methuen-floating-shelves",
    category: "Handyman",
    town: "Methuen, MA",
    scope: "Three floating walnut shelves",
    priceBand: "$420",
    year: "2024",
    alt: "Methuen living-room wall with three solid walnut floating shelves stacked in a row.",
    aspectClass: "aspect-square",
  },
  {
    slug: "andover-tv-mount-fireplace",
    category: "Handyman",
    town: "Andover, MA",
    scope: "TV wall-mount above stone fireplace",
    priceBand: "$280",
    year: "2024",
    alt: "Andover family room with 65-inch TV wall-mounted above a stacked-stone fireplace.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "north-andover-pendant-entry",
    category: "Handyman",
    town: "North Andover, MA",
    scope: "Pendant light replacement, entry",
    priceBand: "$240",
    year: "2024",
    alt: "North Andover two-story entry foyer with new matte-black caged-globe pendant light.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "derry-curtain-rod-install",
    category: "Handyman",
    town: "Derry, NH",
    scope: "Custom-length curtain rod install",
    priceBand: "$160",
    year: "2024",
    alt: "Derry NH living room with new 96-inch matte-black curtain rod across a wide picture window.",
    aspectClass: "aspect-square",
  },
  {
    slug: "salem-nh-closet-shelving",
    category: "Handyman",
    town: "Salem, NH",
    scope: "Walk-in closet shelving system",
    priceBand: "$520",
    year: "2024",
    alt: "Salem NH primary bedroom walk-in closet with white melamine shelves and hanging rods on three walls.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "lawrence-faucet-replacement",
    category: "Handyman",
    town: "Lawrence, MA",
    scope: "Bathroom faucet replacement",
    priceBand: "$185",
    year: "2024",
    alt: "Lawrence half-bath close-up of new matte-black single-handle faucet on a white-quartz vanity.",
    aspectClass: "aspect-square",
  },
  {
    slug: "haverhill-drywall-patch",
    category: "Handyman",
    town: "Haverhill, MA",
    scope: "Drywall patch + paint blend",
    priceBand: "$210",
    year: "2024",
    alt: "Haverhill hallway wall section with invisible drywall patch and matched warm-greige paint.",
    aspectClass: "aspect-[4/3]",
  },
  {
    slug: "windham-interior-door-rehang",
    category: "Handyman",
    town: "Windham, NH",
    scope: "Interior door rehang, six-panel",
    priceBand: "$140",
    year: "2024",
    alt: "Windham NH bedroom with rehung six-panel interior door, plumb in painted-white casing.",
    aspectClass: "aspect-square",
  },
  {
    slug: "methuen-gallery-wall-hang",
    category: "Handyman",
    town: "Methuen, MA",
    scope: "Gallery-wall picture arrangement",
    priceBand: "$175",
    year: "2024",
    alt: "Methuen stairwell with seven black-framed photographs in a balanced gallery-wall cluster.",
    aspectClass: "aspect-[4/3]",
  },
];

/**
 * "All" view — interleaves the 6 categories so the visual rhythm in the
 * default filter mixes scopes and price bands. Order: Finish[0], Kitchen[0],
 * Bath[0], Outdoor[0], Painting[0], Handyman[0], Finish[1], Kitchen[1], …
 *
 * Lead with Finish Carpentry per design-system.md §11 + market-intelligence.md
 * §9 strategic recommendation #2 (Tony's favorite work, photo-genic, zero
 * local SEO competition).
 */
export const ALL_GALLERY_ITEMS: GalleryItem[] = Array.from(
  { length: 9 },
  (_, i) => [
    FINISH_CARPENTRY[i],
    KITCHEN[i],
    BATH[i],
    OUTDOOR[i],
    PAINTING[i],
    HANDYMAN[i],
  ],
)
  .flat()
  .filter(Boolean);

export const GALLERY_BY_CATEGORY: Record<GalleryCategory, GalleryItem[]> = {
  "Finish Carpentry": FINISH_CARPENTRY,
  Kitchen: KITCHEN,
  Bath: BATH,
  Outdoor: OUTDOOR,
  Painting: PAINTING,
  Handyman: HANDYMAN,
};

export const GALLERY_FILTERS: { value: "all" | GalleryCategory; label: string }[] =
  [
    { value: "all", label: "All Projects" },
    { value: "Finish Carpentry", label: "Finish Carpentry" },
    { value: "Kitchen", label: "Kitchen" },
    { value: "Bath", label: "Bath" },
    { value: "Outdoor", label: "Outdoor" },
    { value: "Painting", label: "Painting" },
    { value: "Handyman", label: "Handyman" },
  ];
