# Plan: Replace Plain White Section Backgrounds Across Anjo Services Site

## Context
The Anjo Services homepage and interior pages have light sections — Pain Points ("Four things every homeowner..."), Cost Transparency, /about body, /gallery slider, etc. — that read as flat warm-bone wash with no depth. CLAUDE.md mandates gradient + motion on every section ("No flat solid backgrounds. Ever."), but the rule is only half-implemented:

- `globals.css` already defines `--bg-light-overlay-radial` (red+amber, static), `@keyframes breathe` (used), `@keyframes mesh-drift` (defined but never used), and `prefers-reduced-motion` handling.
- Only QuizCTA, BookingTeaser, and the gallery header animate (all use the same breathing orb). The other 6+ light sections are visually inert.
- No reusable surface primitive exists. Each section inlines `<div style={{background: "var(--bg-light-overlay-radial)"}} />`.
- Reference repos (Where 2 Junk, Placed-Right-Fence) have the same gap. Anjo is the first Optimus build to solve this for interior light sections.

User intent: differentiate as a 2026 luxury build. Asked about fal.ai-generated textures. Recommendation: **defer fal.ai, fix this CSS-only first.** Reasons documented below.

## Recommended approach

**Add a 4-layer light-section CSS system using utility classes + data-attributes on the `<section>` itself — no React wrapper component.**

Per-section markup goes from this:
```tsx
<section style={{ background: "var(--bg-base)" }}>
  <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--bg-light-overlay-radial)" }} />
  <div className="orb" /> {/* sometimes */}
  <div className="relative">{/* content */}</div>
</section>
```

To this:
```tsx
<section className="surface-light" data-motion="mesh" data-texture="paper">
  <div className="surface-content">{/* content */}</div>
</section>
```

The class owns 4 stacked layers via pseudo-elements + `isolation: isolate`:
1. **Floor** — `var(--bg-base)` (#f8f7f4 warm bone)
2. **Paper grain** (`data-texture="paper"`) — inline SVG `<feTurbulence baseFrequency="0.65" numOctaves="3"/>` data URI, `mix-blend-mode: multiply`, opacity 0.12. ~600 bytes, shared across whole site, gives "architect's paper" niche-fit.
3. **Chromatic wash** — `var(--bg-light-overlay-radial)` (existing, static).
4. **Motion** — ONE pseudo-element animated via existing/new `@keyframes`:
   - `data-motion="breathe"` → breathing orb (existing)
   - `data-motion="mesh"` → mesh drift on a NEW `--bg-light-mesh` definition (the existing radial can't be drifted)
   - `data-motion="aurora"` → conic-gradient rotate, 22s linear (NEW `@keyframes aurora-sweep` using `from/to` to degrade safely under reduce-motion)

Total = max 1 animated layer per section → safely within "3 active motion layers" viewport budget when combined with the homepage hero canvas.

**Why utility classes, not a `<LuxurySurface>` wrapper:**
- Every existing section already has its own `<section>` with custom paddings, aria-labels, container widths, and z-indexes for nested cards. Wrapping forces refactor of 8+ components and constrains each to the primitive's shape.
- 1-line refactor per section vs full rewrite. Hot-reloadable in pure CSS. No TS prop interface to maintain. Smaller bundle. CSS-first is the 2026 idiom for this kind of pattern.

**Why CSS-only, not fal.ai (for now):**
- CLAUDE.md Homepage Section Architecture Rule, Performance Budget: "CSS-only implementation for section backgrounds. Never JavaScript-driven."
- fal.ai PNG textures cost LCP/CLS budget (~200KB+ per asset). The whole-site grain pattern needs to be the SAME everywhere for visual coherence — fal.ai gives no advantage over a 600-byte SVG noise data URI for a uniform paper feel.
- If Phase 1 ships and the design still feels under-differentiated, Phase 2 = ONE branded "anjo-architect-paper" fal.ai texture used universally as the `data-texture="paper"` source. Not per-section variants.

## Section-to-motion assignments (homepage)

| Section | Current | New |
|---|---|---|
| Hero (dark) | 3-layer canvas stack | unchanged |
| Pain Points (light) | flat | `motion="mesh" texture="paper"` (long empathy scroll, drift is rich) |
| Services (dark) | static gradient | `motion="breathe" texture="paper"` |
| Featured Gallery (light) | flat | `motion="breathe" texture="paper"` (light per dark/light rule — gallery should not compete with photos via dark bg) |
| About Tony (dark) | static | `motion="aurora" texture="paper"` |
| Cost Transparency (light) | flat | `motion="aurora" texture="paper"` (data-heavy, dramatic slow sweep) |
| Testimonials (dark) | static | `motion="breathe" texture="paper"` |
| Quiz CTA (light) | breathing orb only | `motion="breathe" texture="paper"` (keep orb feel + add texture) |
| Blog Preview (dark) | static | `motion="breathe" texture="paper"` |
| Booking Teaser (light) | breathing orb only | `motion="breathe" texture="paper"` |
| Footer (dark) | static | unchanged (footer doesn't need motion) |

Interior pages: /about (body + CTA), /gallery (header + slider + bottom CTA), /testimonials, /contact, /blog, /booking, /services/cost, /services/[slug] — same primitive, assignments to be set during Phase 1 expansion.

## File change list (ordered execution)

1. **`web/src/app/globals.css`** — additive only:
   - Add `--bg-light-mesh` and `--bg-dark-mesh` (multi-stop radial-gradient with proper structure for `background-size: 200% 200%` drift).
   - Add `@keyframes aurora-sweep` using `from { transform: rotate(0) } to { transform: rotate(360deg) }`.
   - Add `.surface-light` and `.surface-dark` with `position: relative; isolation: isolate;` and `::before` containing the wash layer.
   - Add `[data-texture="paper"]::before` modifier that stacks the SVG noise data URI under the wash with `mix-blend-mode: multiply` (light) / `screen` (dark) at opacity 0.12 / 0.06.
   - Add `[data-motion="breathe"]::after`, `[data-motion="mesh"]::after`, `[data-motion="aurora"]::after` rules wiring the keyframes (`pointer-events: none`).
   - Add `.surface-content { position: relative; z-index: 4; }` utility for the content wrapper.
   - Extend `prefers-reduced-motion` block with explicit `.surface-light::after, .surface-dark::after { animation: none; }` belt-and-suspenders.

2. **Refactor 4 homepage section components** (one-line className/data-attr swap, remove inline gradient div):
   - `web/src/components/sections/PainPoints.tsx` → `surface-light data-motion="mesh" data-texture="paper"`
   - `web/src/components/sections/CostTransparency.tsx` → `surface-light data-motion="aurora" data-texture="paper"`
   - `web/src/components/sections/QuizCTA.tsx` → `surface-light data-motion="breathe" data-texture="paper"` (drop the inline `.orb` div — now in CSS)
   - `web/src/components/sections/BookingTeaser.tsx` → same as QuizCTA

3. **Visual QA Rule full audit** at 1440 + 390 with reduce-motion toggled — every section must show a gradient with motion stopped. Console clean. No layer leaks across section boundaries.

4. **If Phase 1 looks right**, expand to interior pages: /about, /gallery, then /testimonials/contact/blog/booking/services. Don't refactor 14 files before validating 4.

## Critical implementation gotchas (from validation review)

- **`isolation: isolate` is mandatory** on `.surface-*`. Without it, `mix-blend-mode: multiply` on the grain layer leaks across section boundaries — the dark hero above bleeds into the light Pain Points below.
- **SVG noise on near-white needs `multiply`, not `overlay`.** `#f8f7f4` is at ~97% luminance; overlay only meaningfully affects values far from 50% gray. Multiply at opacity 0.12 produces visible warm grain.
- **`baseFrequency` matters.** 0.85 is too fine (disappears at low opacity). Use 0.65 with numOctaves=3 for visible-but-subtle warm grain.
- **mesh-drift cannot animate the existing radial.** `--bg-light-overlay-radial` has no `background-size` set; two ellipses pinned at fixed percentages don't drift. The new `--bg-light-mesh` must be defined for `background-size: 200% 200%` animation to work.
- **Aurora keyframe must use `from/to` syntax, not 3-stop.** Reduce-motion holds at 100% keyframe; 3-stop with `rotate(180deg)` at 50% would freeze users on a rotated frame on a directional gradient. With `from/to` and a radially-symmetric conic gradient, end state == start state visually.
- **All 4 background layers must be `pointer-events: none`** so the section content remains interactive.
- **z-index discipline:** floor 0, grain 1, wash 2, motion 3, content 4. Declare every value — don't rely on document order.

## Verification (Visual QA Rule)

Per CLAUDE.md, the multi-breakpoint browser audit is mandatory before this is "done":

1. `npm run dev` in `c:\Projects\Anjo-Services\web\` (or whatever the workspace command is — check package.json).
2. Drive Playwright through 1440×900 desktop static + scrolled, 390×844 mobile, 375×812 mobile narrow, 428×926 mobile wide, plus mobile drawer open.
3. **Specific checks for THIS work:**
   - Pain Points and Cost Transparency sections show visible motion at desktop (mesh drift visible in 25s; aurora in 22s).
   - Paper grain is visible on light sections at full zoom but doesn't fight the body copy.
   - No horizontal mix-blend bleed across the dark↔light section boundaries (would indicate `isolation: isolate` missing).
   - Toggle OS reduce-motion → reload → every section still renders with gradient (NOT flat) and motion has stopped.
   - 0 console errors and 0 console warnings.
   - Lighthouse ≥ 90 maintained.
4. Capture before/after screenshots of each refactored section for the build-log.

## Files I will touch

- `c:\Projects\Anjo-Services\web\src\app\globals.css` (additive)
- `c:\Projects\Anjo-Services\web\src\components\sections\PainPoints.tsx`
- `c:\Projects\Anjo-Services\web\src\components\sections\CostTransparency.tsx`
- `c:\Projects\Anjo-Services\web\src\components\sections\QuizCTA.tsx`
- `c:\Projects\Anjo-Services\web\src\components\sections\BookingTeaser.tsx`

Plan file copy (per CLAUDE.md Plan Preservation Rule): commit alongside implementation to `c:\Projects\Anjo-Services\.claude\plans\luxury-light-section-surface-system.md`.

## Out of scope (deferred to follow-up phases)

- Interior page sections (/about, /gallery, /testimonials, /contact, /blog, /booking, /services/*) — apply same primitive after Phase 1 validates.
- Dark sections — same primitive supports them; refactor when touching.
- fal.ai branded paper texture — only if post-launch the design still feels under-differentiated, then ONE asset as a universal `data-texture` source.
- Hero stack — completely untouched by this work.
