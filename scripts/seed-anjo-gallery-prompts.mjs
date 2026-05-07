#!/usr/bin/env node
/**
 * seed-anjo-gallery-prompts.mjs — emits 42 NEW fal.ai prompt JSONs
 * for the restructured gallery covering all 6 Anjo Services offerings:
 *   1. Finish Carpentry      (9 = 4 existing + 5 new)
 *   2. Kitchen Remodels      (9 = 3 existing + 6 new)
 *   3. Bathroom Remodels     (9 = 2 existing + 7 new)
 *   4. Decks, Fences, Pergolas (9 = 3 existing + 6 new)
 *   5. Interior + Exterior Painting (9 = 0 existing + 9 new)
 *   6. Handyman & Honey-Do   (9 = 0 existing + 9 new)
 * Total: 54 items, 42 new prompts to emit.
 *
 * Per CLAUDE.md Image Generation Rule: prompts are reviewed as a set
 * before generation. Each prompt is anchored on design-system.md §6:
 *   - High-contrast, slightly desaturated except brand red
 *   - Snap-On / Milwaukee catalog feel — NOT HGTV bright
 *   - Documentary photography aesthetic, behind-the-scenes feel
 *   - Avoid: HDR, light leaks, lens flares, artificial bokeh,
 *     lifestyle smiling-people-in-aprons composition
 *   - "AFTER" finished state only — these are completed projects
 *
 * NEVER request readable text in image prompts.
 * Aspect ratios mix square_hd + landscape_4_3 for masonry rhythm
 * (matches Placed Right Fence's gallery pattern).
 *
 * Usage: node scripts/seed-anjo-gallery-prompts.mjs
 *
 * Idempotent: writes JSON files only (does not call fal.ai).
 * Safe to re-run; will overwrite the 33 NEW JSONs only.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROMPTS_DIR = path.join(__dirname, "prompts");

const BASE_MOOD =
  "High-contrast, slightly desaturated photography, working-contractor documentary catalog feel — NOT HGTV bright, NOT luxury hotel-staged, NOT real-estate photographer brightness. The lighting in a Snap-On distributor's tool room. No people in frame, no readable text anywhere, no logos, no brand names visible.";

// 33 new items, ordered by category. Aspects alternate within each
// category for masonry rhythm (matches Placed Right Fence pattern).
const NEW_ITEMS = [
  // ── Finish Carpentry (5 NEW, with 4 existing → 9 total) ─────────────────
  {
    slug: "lawrence-oak-stair-balustrade",
    imageSize: "square_hd",
    prompt: `Wide-angle photograph of a finished red-oak stair balustrade in a 1920s Lawrence MA two-story colonial. Hand-rail and balusters in clear-coat oak, painted-white risers and stringer with white skirt board, tightly-mitered shoe molding. Half-landing visible with a single newel post, square-stock pickets every 4 inches. Late-morning natural light from a paired transom window catches the grain. Worn oak treads broken in but freshly sanded and finished. ${BASE_MOOD}`,
  },
  {
    slug: "salem-nh-mantel-builtins",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished custom fireplace mantel and flanking floor-to-ceiling built-in bookcases in a Salem NH 1990s colonial living room. Painted in a warm white satin (Benjamin Moore Simply White feel), shaker-style cabinet doors below adjustable shelves, a clean inset gas fireplace with a slate surround. The mantel is a chunky single-board ledge with corbel brackets. Books and a single ceramic vase on shelves, intentionally sparse. Even afternoon light from the front window. ${BASE_MOOD}`,
  },
  {
    slug: "derry-coffered-living-room",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished coffered ceiling in a Derry NH 1980s colonial living room, looking up and slightly toward the corner. Three-by-three deep painted-white grid with crown molding inside each coffer, recessed LEDs in alternating squares casting soft pools of light. Crisp paint lines, no caulk smears. Below frame the top of a slate-grey sectional and a wall painted soft greige. Late-afternoon mixed daylight. ${BASE_MOOD}`,
  },
  {
    slug: "haverhill-craftsman-trim",
    imageSize: "square_hd",
    prompt: `Detail photograph of finished interior craftsman-style trim in a Haverhill MA 1900s craftsman bungalow — a single corner showing the wide casing around a 30-inch-wide door, the chunky baseboard with a quarter-round shoe, and the picture rail running along the wall about 18 inches below the ceiling. All trim painted Benjamin Moore White Dove satin. Wall behind painted a warm ochre. Hardware on the door is unlacquered brass. Soft window light from camera right. ${BASE_MOOD}`,
  },
  {
    slug: "methuen-wainscoting-dining",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished picture-frame wainscoting installation in a Methuen MA dining room, captured from the corner showing the wainscoting wrapping around onto a second wall. White satin paint on the wainscoting, walls above painted a deep moody navy (Hale Navy feel). Wainscoting height 38 inches with a chunky chair-rail cap. Bottom shoe-mold tight to a wide-plank oak floor. Empty wood dining chair pushed half-under a table at the edge of frame. Soft afternoon window light. ${BASE_MOOD}`,
  },

  // ── Kitchen (6 NEW, with 3 existing → 9 total) ──────────────────────────
  {
    slug: "north-andover-galley-refresh",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished galley kitchen cabinet refresh in a North Andover MA 1970s ranch — narrow rectangular kitchen, painted shaker cabinets in a soft sage green (lower) and bright white (upper), brushed brass cup pulls, butcher-block countertops, undercabinet LED puck lighting just visible. Subway tile backsplash white with light grey grout. Clean stove top, no decor. Mid-morning soft window light from the far end. ${BASE_MOOD}`,
  },
  {
    slug: "derry-quartz-counter-update",
    imageSize: "square_hd",
    prompt: `Tight photograph of a finished quartz counter swap in a Derry NH kitchen — countertop is white quartz with a subtle warm-grey vein, viewed at a shallow angle so the polished edge profile is visible. Single-bowl stainless undermount sink at left, brushed-nickel faucet. Existing white shaker cabinets below (slightly used patina). On the counter: a single empty wooden cutting board, nothing else. Even soft daylight. ${BASE_MOOD}`,
  },
  {
    slug: "salem-nh-shaker-cabinet-paint",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished shaker-cabinet repaint in a Salem NH kitchen — uppers and lowers in a deep matte navy (Hale Navy feel) with new flat brushed-brass bar pulls horizontally on uppers and vertically on lowers. Existing white quartz counter visible at the bottom of frame, white subway tile backsplash, single-bowl stainless sink at right. Late-afternoon side light from a window outside the frame catches the cabinet shaker rails crisply. ${BASE_MOOD}`,
  },
  {
    slug: "lawrence-tile-backsplash",
    imageSize: "square_hd",
    prompt: `Tight photograph of a finished subway-tile backsplash in a Lawrence MA kitchen — 3-by-6-inch white ceramic subway tile in a 50-percent running-bond pattern with thin medium-grey grout, four full courses tall behind a black gas range. The black-stainless cooktop and a brushed-nickel pot-filler arm visible at frame bottom. Detail crispness on the tile edges and grout lines is the focal point. Soft directional light from camera right. ${BASE_MOOD}`,
  },
  {
    slug: "windham-pantry-buildout",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished walk-in pantry buildout in a Windham NH home — looking through the pantry doorway at adjustable melamine shelves on three walls, painted shaker face-frames hiding the brackets, butcher-block landing-counter at waist height on the right wall. Pantry walls painted a soft warm white. Glass jars and a stack of clean linen napkins on the landing counter as the only props. Single overhead LED disc light glowing soft. ${BASE_MOOD}`,
  },
  {
    slug: "methuen-island-with-pendant",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished custom kitchen island in a Methuen MA home — long rectangular island painted matte black on the cabinet base, topped with a thick mitered-edge white quartz with a fine grey vein. Three woven-rattan pendants hang in a row above. The perimeter cabinets behind are painted bright white with brushed-nickel cup pulls. Wide-plank engineered oak floor. Mid-afternoon soft window light from camera left. ${BASE_MOOD}`,
  },

  // ── Bath (7 NEW, with 2 existing → 9 total) ─────────────────────────────
  {
    slug: "methuen-guest-bath-tile",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished guest bath in a Methuen MA home — small rectangular bathroom about 5 by 8 feet, hexagonal black-and-white penny-round tile floor, white shiplap halfway up the walls with a chair-rail cap, walls above painted a soft sky-grey, a single chrome-trim mirror above a 30-inch white shaker vanity with a polished-chrome faucet. Lighting from a single sconce mounted above the mirror. ${BASE_MOOD}`,
  },
  {
    slug: "north-andover-walk-in-shower",
    imageSize: "square_hd",
    prompt: `Photograph of a finished walk-in tile shower in a North Andover MA primary bath — large-format 12-by-24-inch matte porcelain stone-look tile on the walls in a warm grey, a recessed niche centered on the shower wall holding a single matte-black trim shelf, a curbless transition to the bathroom floor in matching tile. A single fixed clear-glass panel divides the shower from the room (no hinged door). Polished chrome rain head visible top of frame. Soft window light from outside the shower. ${BASE_MOOD}`,
  },
  {
    slug: "derry-tub-to-shower",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished tub-to-shower conversion in a Derry NH bathroom — the new walk-in shower is where the old alcove tub used to be, framed by white subway tile to the ceiling with a vertical mosaic accent strip in slate grey running floor to ceiling at the back wall. Polished-chrome thermostatic valve with a separate hand-shower bracket. A clean curb at the floor in matching subway tile, a fixed-glass return panel on one end. Soft daylight from a single high transom window above the shower. ${BASE_MOOD}`,
  },
  {
    slug: "haverhill-double-vanity",
    imageSize: "square_hd",
    prompt: `Photograph of a finished double-sink vanity install in a Haverhill MA primary bath — 72-inch white shaker double vanity with a single piece of warm-veined white quartz on top, two undermount white-porcelain rectangular basins, two matte-black widespread faucets, brushed-brass cup pulls. A single horizontal frameless mirror runs the full vanity width above. Two simple matte-black sconces mounted to the mirror. Empty counter, nothing on the vanity. Soft daylight from camera right. ${BASE_MOOD}`,
  },
  {
    slug: "lawrence-half-bath-refresh",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished half-bath refresh in a Lawrence MA two-family — small rectangular powder room, board-and-batten halfway up the walls painted satin white, walls above papered in a fine geometric navy-and-cream pattern. Single 24-inch white pedestal sink with a polished-chrome single-handle faucet. A simple round chrome-trim mirror, a single matte-black sconce above. Wide-plank oak floor. Soft directional light from a small window outside frame. ${BASE_MOOD}`,
  },
  {
    slug: "windham-shower-niche",
    imageSize: "square_hd",
    prompt: `Tight detail photograph of a finished tile-shower niche in a Windham NH bathroom — the niche is centered in a white subway-tile shower wall, lined inside with a small black-and-white penny-round mosaic. A single small black-iron tile-trim ledge across the niche bottom. The niche itself is empty (no bottles, no soap). Soft directional light catches the tile-edge crispness — the focal point is the precision of the cut tile and grout lines. ${BASE_MOOD}`,
  },
  {
    slug: "andover-floating-vanity",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished floating-vanity installation in an Andover MA primary bath — 48-inch wall-mounted walnut-veneer vanity with no visible legs, integrated trough-style white quartz top with a single basin, matte-black wall-mounted faucet. Above the vanity a frameless rectangular LED-backlit mirror. The wall behind painted a soft warm putty. Wide oak floor below the floating vanity, no rug. Soft side light from a window at camera right. ${BASE_MOOD}`,
  },

  // ── Outdoor — Decks/Fences/Pergolas (6 NEW, with 3 existing → 9) ────────
  {
    slug: "north-andover-composite-deck-rail",
    imageSize: "landscape_4_3",
    prompt: `Wide photograph of a finished composite-deck railing rebuild on a North Andover MA backyard deck — second-story deck level, dark-grey composite decking boards, top rail in matching dark-grey composite, white aluminum balusters spaced evenly. Stairs descending camera-right with the same railing system. Backyard mature maple trees beyond, late-afternoon golden light skimming the rail caps. ${BASE_MOOD}`,
  },
  {
    slug: "derry-screened-porch",
    imageSize: "landscape_4_3",
    prompt: `Photograph from inside a finished screened porch on a Derry NH home — looking out across the screened openings into a wooded backyard, framed lumber painted dark grey on the inside structure with white screen tension-mold around each panel. A bead-board ceiling painted soft sky-blue overhead, a single slow-spinning paddle ceiling fan. Floor is composite decking in warm taupe. A single empty Adirondack chair angled toward the screens. Late-day mixed daylight outside, warmer ambient inside. ${BASE_MOOD}`,
  },
  {
    slug: "salem-nh-deck-stair-rebuild",
    imageSize: "square_hd",
    prompt: `Photograph of a finished deck stair-and-skirt rebuild on a Salem NH split-level home — three-step run of pressure-treated stairs with a pressure-treated stringer skirt board, fresh cedar treads, a continuous painted-white skirt board hiding the under-deck framing. Crushed-stone landing pad at the base. Pressure-treated bottom newel posts capped with simple flat caps. Even side light from a low afternoon sun. ${BASE_MOOD}`,
  },
  {
    slug: "lawrence-vinyl-privacy-fence",
    imageSize: "landscape_4_3",
    prompt: `Wide photograph of a finished tall vinyl privacy fence on a Lawrence MA two-family — 6-foot-tall solid white vinyl tongue-and-groove panels with a flat top cap rail, a matching vinyl gate at the driveway side with a heavy-duty chrome latch. Crushed-stone strip along the inside base. Mature lawn beyond. Even mid-day light, slightly desaturated. ${BASE_MOOD}`,
  },
  {
    slug: "methuen-pergola-pavers",
    imageSize: "square_hd",
    prompt: `Photograph of a finished cedar pergola over a paver patio in a Methuen MA backyard — 12-by-14 cedar pergola with chunky 6-by-6 posts and a 4-by-8 beam structure on top, evenly spaced 2-by-6 rafters running across, ends shaped with a simple straight cut (no decorative scrolls). Warm-grey natural-clay paver patio below. A single empty wood Adirondack chair at the corner. Late-afternoon dappled sun through the pergola slats. ${BASE_MOOD}`,
  },
  {
    slug: "haverhill-deck-skirt",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished deck skirt-and-lattice trim install on a Haverhill MA home deck — looking at the side of the deck where the rim joist meets the ground, a continuous painted-white skirt board running horizontally with white square lattice panels below tucked between cedar posts every 8 feet. Mulch bed in front of the skirt with simple boxwood plantings. Soft afternoon light. ${BASE_MOOD}`,
  },

  // ── Painting (9 NEW → 9 total) ──────────────────────────────────────────
  {
    slug: "methuen-exterior-house",
    imageSize: "landscape_4_3",
    prompt: `Wide photograph of a finished whole-exterior repaint of a 1920s Methuen MA two-family colonial — clapboard siding painted a soft warm white, shutters and front door in a deep navy, all trim and window casings in crisp white satin. The shot is captured from the sidewalk three-quarter front angle showing two stories and the roof line. Mature street tree on the left edge. Mid-afternoon soft sun. ${BASE_MOOD}`,
  },
  {
    slug: "andover-interior-living",
    imageSize: "square_hd",
    prompt: `Photograph of a finished interior repaint of a living room in an Andover MA colonial — walls in a warm greige, ceiling in soft white, all trim and crown molding in white satin. Looking at a corner of the room with a built-in alcove visible at the edge. Crisp paint cut-lines at the trim, no roller stipple, no holiday gaps. Empty room (no furniture). Soft afternoon side light from a window outside frame. ${BASE_MOOD}`,
  },
  {
    slug: "north-andover-cabinet-repaint",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished kitchen-cabinet repaint in a North Andover MA home — uppers and lowers in a soft matte sage green, smooth even brushed-and-rolled finish with no visible roller marks, original brushed-nickel cup pulls retained on lowers, simple knobs on uppers. White subway-tile backsplash and butcher-block counter visible. Single-bowl stainless sink at right. Soft daylight from a window outside the frame. ${BASE_MOOD}`,
  },
  {
    slug: "salem-nh-deck-stain",
    imageSize: "square_hd",
    prompt: `Photograph of a finished deck-stain restoration on a Salem NH backyard deck — pressure-treated decking and railing freshly stained in a warm cedar tone, semi-transparent so the wood grain shows through. The boards run horizontally across the frame, the railing cap and balusters at the rear. Crisp clean edges where stain meets painted-white skirt board. Mid-day even light. ${BASE_MOOD}`,
  },
  {
    slug: "derry-bedroom-accent",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished bedroom accent wall in a Derry NH home — single accent wall painted a deep matte hunter-green, ceiling and remaining three walls in soft white. Looking at the accent wall straight-on with the corners just visible at the edges of the frame so the cut-lines are crisp at the corners and ceiling. Empty room (no furniture, no art on the wall). Soft window light from camera left. ${BASE_MOOD}`,
  },
  {
    slug: "haverhill-shutter-paint",
    imageSize: "square_hd",
    prompt: `Tight photograph of finished freshly-repainted exterior shutters and front door on a Haverhill MA cape — a pair of louvered black shutters flanking a six-over-six double-hung window, the front door also a deep matte black with brushed-brass hardware and a fresh-painted white casing. White clapboard siding behind. Mid-morning sun catches the shutter louvers crisply. ${BASE_MOOD}`,
  },
  {
    slug: "lawrence-exterior-trim",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished exterior-trim touch-up on a Lawrence MA two-family — a section of the front entry showing freshly repainted white window casings, freeze-board, and porch-column trim against the existing tan clapboard siding. Painters tape lines crisp where trim meets siding. A single black porch light visible at the edge. Soft side light from late-morning sun. ${BASE_MOOD}`,
  },
  {
    slug: "windham-mudroom-paint",
    imageSize: "square_hd",
    prompt: `Photograph of a finished mudroom-and-bench repaint in a Windham NH home — built-in bench seat and overhead cubby unit painted in a deep matte navy, walls above the wainscoting painted soft warm white. Bench cushion in a natural linen, simple iron coat hooks visible mounted under the cubby shelf. Wide-plank oak floor below. Soft daylight from a single side window. ${BASE_MOOD}`,
  },
  {
    slug: "methuen-front-door-refinish",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished front-door refinish on a Methuen MA colonial — solid-panel front door painted a high-gloss deep brick-red, framed by white painted casing and a simple brass kick-plate at the bottom, polished-brass lever handle and matching dead-bolt. Two narrow side-light windows on either side with sheer interior curtains visible. Stone porch step at frame bottom. Mid-day even light shows the high-gloss reflection on the door panels. ${BASE_MOOD}`,
  },

  // ── Handyman & Honey-Do (9 NEW → 9 total) ───────────────────────────────
  {
    slug: "methuen-floating-shelves",
    imageSize: "square_hd",
    prompt: `Photograph of three finished floating walnut shelves installed in a row on a Methuen MA living-room wall — solid walnut, no visible brackets, each shelf about 36 inches long, stacked at evenly-spaced heights. Wall behind painted soft warm white. Shelves intentionally bare except for a single small ceramic vase on the middle shelf. Soft afternoon side-light from a window outside frame catches the wood grain. ${BASE_MOOD}`,
  },
  {
    slug: "andover-tv-mount-fireplace",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished flat-screen TV wall-mount install above a stone fireplace in an Andover MA family room — 65-inch TV tightly mounted flush to the field-stone chimney, no visible cables (channelled into the wall). Stacked-stone fireplace surround in warm grey, simple chunky walnut mantel below the TV. Off-state TV (black screen). Soft mixed daylight, no glare. ${BASE_MOOD}`,
  },
  {
    slug: "north-andover-pendant-entry",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished pendant-light replacement in a North Andover MA two-story entry foyer — single matte-black caged-globe pendant hanging at the center of a 12-foot ceiling, looking up at a slight angle. Crisp ceiling medallion painted same as the ceiling, white satin. Walls visible at the bottom of frame painted a soft greige. Daylight mixed with the pendant glow. ${BASE_MOOD}`,
  },
  {
    slug: "derry-curtain-rod-install",
    imageSize: "square_hd",
    prompt: `Photograph of a finished custom-length matte-black curtain rod install in a Derry NH living room — single straight 96-inch matte-black rod with simple end caps spanning a wide picture window, no decorative finials. Linen drapery panels in oatmeal hung from black rings. Crown molding visible above. Soft mid-morning light from outside the window casts a soft halo around the drapery. ${BASE_MOOD}`,
  },
  {
    slug: "salem-nh-closet-shelving",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished closet-shelving install in a Salem NH primary bedroom walk-in closet — white melamine shelves and hanging rods on three walls, evenly spaced, with a center peninsula shelf unit. The closet is empty (no clothes, no shoes) so the woodwork itself is the focal point. Single overhead LED disc light. White interior, soft diffused light. ${BASE_MOOD}`,
  },
  {
    slug: "lawrence-faucet-replacement",
    imageSize: "square_hd",
    prompt: `Tight photograph of a finished bathroom-faucet replacement in a Lawrence MA half-bath — new matte-black single-handle widespread faucet on a white-porcelain undermount basin set in a white-quartz vanity top. Crisp deck plate, no water stains, no caulk smears. Brushed-chrome pop-up drain visible. Soft daylight from a window outside the frame. ${BASE_MOOD}`,
  },
  {
    slug: "haverhill-drywall-patch",
    imageSize: "landscape_4_3",
    prompt: `Wide photograph of a finished drywall patch and paint job on a Haverhill MA hallway wall — the patch is invisible, blending seamlessly into the surrounding warm-greige wall paint. The frame shows the entire wall section that was patched, with crisp baseboard and white satin trim at the bottom edge. Soft directional sidelight reveals an unbroken paint surface. ${BASE_MOOD}`,
  },
  {
    slug: "windham-interior-door-rehang",
    imageSize: "square_hd",
    prompt: `Photograph of a finished interior-door rehang in a Windham NH bedroom — solid white-painted six-panel interior door hung perfectly plumb in its painted-white casing, brushed-nickel lever handle, hinges painted to match the casing. The door is open at about 30 degrees, showing a sliver of bedroom carpet beyond. Even ambient light. ${BASE_MOOD}`,
  },
  {
    slug: "methuen-gallery-wall-hang",
    imageSize: "landscape_4_3",
    prompt: `Photograph of a finished gallery-wall picture-hanging arrangement in a Methuen MA stairwell — seven black-framed photographs of varying sizes arranged in a balanced cluster, all perfectly level and evenly spaced. Wall behind painted soft warm white. Anchor frame in the center, smaller frames arrayed around. Soft daylight from a window at the top of the stairs. ${BASE_MOOD}`,
  },
];

// ── emit one JSON per item ──────────────────────────────────────────────────
let written = 0;
for (const item of NEW_ITEMS) {
  const json = {
    prompt: item.prompt,
    imageSize: item.imageSize,
    outputPath: `public/gallery/${item.slug}.jpg`,
  };
  const filePath = path.join(PROMPTS_DIR, `${item.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");
  written += 1;
}

console.log(`Wrote ${written} prompt JSON files to ${path.relative(path.resolve(__dirname, ".."), PROMPTS_DIR)}/`);
console.log(`\nNext: node scripts/generate-images.mjs`);
