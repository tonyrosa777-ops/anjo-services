# Plan — Scaffold Anjo Services Shop (Stripe + Printful)

## Context

Anjo Services has no shop. Confirmed missing on disk: `web/src/app/shop/`, `web/src/lib/cart.tsx`, `web/src/lib/printful.ts`, `web/src/components/CartDrawer.tsx`, `web/src/components/sections/ShopContent.tsx`, `web/src/app/api/printful/*`, `web/src/app/api/stripe/*`. No `/shop` entry in [`web/src/app/sitemap.ts`](c:\Projects\Anjo-Services\web\src\app\sitemap.ts). [`Navigation.tsx:53-54`](c:\Projects\Anjo-Services\web\src\components\layout\Navigation.tsx#L53-L54) carries a comment claiming the route "was never scaffolded" — that comment is the bug, not the rule.

Per **CLAUDE.md → Always-Built Features Rule → Shop**: *"Always scaffolded on every project. The scaffold is built whether or not the client bought Premium. The decision gate runs AFTER scaffold — not before."* Per **design-system.md §11 row 1** (line 525): *"Yes (scaffold)... decision gate (post-scaffold): client did not buy Premium → scaffold deletes pre-launch. Anjo trade-business does not have natural merch demand; recommend deletion at launch."*

Both authoritative files agree: **scaffold is mandatory; deletion is a launch-time decision, not a build-time skip.** This plan closes the gap.

Reference implementation lives at [`C:\Projects\andrea-abella-marie\src\`](C:\Projects\andrea-abella-marie\src\) — the andrea-abella-marie build is the reference template that CLAUDE.md cites. The work is mostly translation: andrea's navy/gold/cream tokens → Anjo's red/amber/bone tokens; andrea's display/ui fonts → Saira Condensed/Inter/JetBrains Mono; pill-radius (rounded-full) → squared `--radius-md` (design-system.md line 505 prohibits pills for Anjo's trade-authority archetype); andrea's "Resilience Collection" manual-fulfillment tier dropped (Anjo has no analog).

---

## Files created (10)

| # | Path | Source / template |
|---|---|---|
| 1 | `web/src/lib/cart.tsx` | direct port of [`C:\Projects\andrea-abella-marie\src\lib\cart.tsx`](C:\Projects\andrea-abella-marie\src\lib\cart.tsx). Rename `STORAGE_KEY` `"andrea-cart"` → `"anjo-cart"`. Otherwise verbatim — CartProvider context, useCart hook, localStorage persistence, slide-open-on-add behavior. |
| 2 | `web/src/lib/printful.ts` | direct port of [`C:\Projects\andrea-abella-marie\src\lib\printful.ts`](C:\Projects\andrea-abella-marie\src\lib\printful.ts). No edits — types + Bearer-auth fetch + paginated `getSyncProducts` + `getSyncProductDetail` + `createOrder`. |
| 3 | `web/src/lib/printful-seeded-products.json` | 10 contractor-relevant items curated from andrea's seed (skip teddy bear, can cooler, pennant, laptop sleeve, backpack, eco raglan, zip hoodie). `storeId: 0` placeholder until Tony provides one. Categories: Apparel · Drinkware · Bags · Home & Stationery. Items + emojis below. |
| 4 | `web/src/components/CartDrawer.tsx` | port of andrea drawer with token swap. Header bg `var(--bg-elevated-dark)` not navy. Border `var(--border-card-dark)`. Subtotal price in `var(--accent)` amber. Checkout button = squared `var(--radius-md)`, red `var(--primary)` bg, `var(--primary-muted)` hover (matches Anjo nav primary CTA pattern in [`Navigation.tsx:380-396`](c:\Projects\Anjo-Services\web\src\components\layout\Navigation.tsx#L380-L396)). |
| 5 | `web/src/components/sections/ShopContent.tsx` | rewrite of andrea's [`ShopContent.tsx`](C:\Projects\andrea-abella-marie\src\components\ShopContent.tsx) with: Resilience Collection block deleted; only POD path retained; tokens swapped; surface system applied (`<section className="surface-light" data-motion="mesh">` for product grid per [`globals.css:299-303`](c:\Projects\Anjo-Services\web\src\app\globals.css#L299-L303)); pill `rounded-full` swapped to `rounded-md`; fonts Saira/Inter; H1 with `.hero-shimmer` per Hero Architecture Rule. Hero copy (zero em dashes): eyebrow `"Anjo Crew Merch"` / H1 `"Real merch. Real jobsite. Real Tony."` / subheadline `"Anjo-branded gear for the crew, the truck, and the morning coffee. Print-on-demand. Shipped direct. Same name on the truck as on the hoodie."` |
| 6 | `web/src/app/shop/page.tsx` | metadata + `<ShopContent />` only. **Does NOT** wrap in `<Navigation />/<Footer />` (those are in [`web/src/app/layout.tsx`](c:\Projects\Anjo-Services\web\src\app\layout.tsx) already — andrea's reference page wraps them because andrea's layout doesn't, but Anjo's does). Title: `"Shop · Anjo Crew Merch"`. Description grounded in Anjo voice. |
| 7 | `web/src/app/api/printful/products/route.ts` | direct port. Falls back to seeded JSON on Printful error. |
| 8 | `web/src/app/api/printful/variants/[id]/route.ts` | direct port. KNOWN_COLORS set retained. Returns `{ variants: [] }` with 503 when no `PRINTFUL_API_KEY`. |
| 9 | `web/src/app/api/stripe/checkout/route.ts` | direct port. Already returns 503 when `STRIPE_SECRET_KEY` missing or contains `"REPLACE_WITH"` — so demo mode is the natural state. Stripe API version `"2026-02-25.clover"` retained (matches Stripe v18+; verify on `npm install`). |
| 10 | `web/src/app/api/stripe/webhook/route.ts` | direct port. No-op + 200 when `STRIPE_WEBHOOK_SECRET` missing. Resend alert wrapped in env-key guard (`if (!process.env.RESEND_API_KEY) return`). Email recipient placeholder `"orders@anjoservices.com"` → `siteConfig.email` (currently empty — gate on truthy check). |

---

## Files edited (4)

| # | Path | Edit |
|---|---|---|
| 11 | `web/src/app/layout.tsx` | Wrap `<body>` children in `<CartProvider>`. Render `<CartDrawer />` once, after `<Footer />`, inside CartProvider. Import from `@/lib/cart` and `@/components/CartDrawer`. |
| 12 | `web/src/components/layout/Navigation.tsx` | (a) Delete the misleading "Shop removed" comment at [`L53-54`](c:\Projects\Anjo-Services\web\src\components\layout\Navigation.tsx#L53-L54). (b) Add `{ label: "Shop", href: "/shop" }` to `primaryLinks`. (c) Add a CartIconButton component to the desktop right cluster — between `Text Tony` and `Take the Quiz` (count badge in `var(--primary)` red, icon 🛒, click → `useCart().openCart()`). (d) Add same CartIconButton to the mobile drawer's bottom CTA stack between Text Tony and Take the Quiz. (e) Add a Shop link entry to the mobile drawer's primary-links list. |
| 13 | `web/src/app/sitemap.ts` | Add `{ url: \`${BASE}/shop\`, lastModified, changeFrequency: "monthly", priority: 0.7 }` to `staticRoutes`. Update the JSDoc priority table. |
| 14 | `web/package.json` | Add `"stripe": "^18.5.0"` and `"resend": "^4.7.0"` to `dependencies`. (Both required for the route files to compile even in 503-demo mode — they import `Stripe` and `Resend` at the top level.) |

---

## Anjo seeded merch lineup (10 items)

Curated from andrea's seed JSON for trade-business relevance. Verbatim Printful IDs/prices retained — these resolve to real Printful catalog SKUs even though `storeId: 0`. The fallback grid renders from this JSON when no `PRINTFUL_API_KEY` is set.

| Slug | Name | Price | Category | Why it fits Anjo |
|---|---|---|---|---|
| `crew-hoodie-champion` | Anjo Crew Champion Hoodie | $53.49 | Apparel | Crew swag, jobsite layer |
| `crop-hoodie` | Anjo Crop Hoodie | $54.50 | Apparel | Tony's daughters / spouse-of-customer demo |
| `insulated-tumbler` | Insulated Tumbler with Straw | $35.00 | Drinkware | Jobsite morning coffee — high-frequency item |
| `water-bottle-stainless` | Stainless Steel Water Bottle | $40.50 | Drinkware | Jobsite hydration |
| `mug-white-glossy` | Anjo White Glossy Mug | $16.50 | Drinkware | Office gift / referral thank-you |
| `mug-black-glossy` | Anjo Black Glossy Mug | $19.00 | Drinkware | Office gift / referral thank-you |
| `strap-apron` | Anjo Workshop Apron | $37.00 | Apparel | Finish-carpentry workshop apron |
| `notebook-hardcover` | Anjo Project Notebook (Hardcover) | $24.50 | Home & Stationery | On-site quote pad / project planner |
| `journal-spiral` | Anjo Punch-List Journal | $22.50 | Home & Stationery | Punch-list pad |
| `tote-canvas` | Anjo Canvas Tote | $28.50 | Bags | Hardware-store tote |

---

## Brand translation map (andrea → Anjo)

| andrea token | Anjo replacement | Where applied |
|---|---|---|
| `var(--color-navy)` (deep navy) | `var(--bg-dark-base)` (#0a0a0a) | drawer bg, dark sections |
| `var(--color-gold)` (gold) | `var(--accent)` (#e8b04c) | accent text, prices, eyebrow rules |
| `var(--color-cream)` | `var(--bg-base)` (#f8f7f4) | light section bg |
| `var(--color-parchment)` | light section + `data-texture="paper"` | product grid section |
| `text-charcoal/X` | `var(--text-secondary-light)` etc | light-bg body text |
| `font-display` (andrea) | `var(--font-display)` (Saira Condensed) | all headings |
| `font-ui` (andrea) | `var(--font-body)` (Inter) | body text + buttons |
| `bg-navy text-white hover:bg-navy/90` | `bg: var(--primary)` + `hover: var(--primary-muted)` | Add-to-Cart button, Checkout button |
| `rounded-full` (pills) | `rounded-md` (8px squared) | every button — design-system.md line 505 prohibits pills |
| `text-gold italic` (decorative) | `var(--accent)` + `.hero-shimmer` | hero H1 only (Hero Architecture Rule) |

---

## Section order on `/shop` (surface-system + dark/light alternation)

Per CLAUDE.md Homepage Section Architecture Rule applied to interior pages — alternating tones, max 3 motion layers, no adjacent same-purpose sections.

| # | Section | Tone | Motion | Purpose |
|---|---|---|---|---|
| 1 | Hero (eyebrow + shimmer H1 + subheadline) | dark | breathe (orb behind H1) | conversion-adjacent (sets context) |
| 2 | Sticky category filter | light + paper | none | navigation |
| 3 | Product grid | light | mesh | commerce |
| 4 | Print-on-demand explainer (3-card: ordered → printed → shipped) | dark | none (text-heavy exception, gradient stays) | education |
| 5 | Booking CTA teaser ("Need work done, not just merch? Schedule a walkthrough.") | light | breathe | conversion |

Footer (already in layout.tsx) follows automatically as section 6, dark — perfect alternation.

---

## Demo-mode behavior (zero env keys)

The scaffold must be fully interactive in demo without keys. Verified by tracing the reference paths:

- `/api/printful/products` → throws Printful error → catches → returns seeded JSON ✅
- `/api/printful/variants/[id]` → throws → returns `{ variants: [], error }` with 503 ✅
- ShopContent fetch fails for variants → picker shows error state, "Add to Cart" button stays gated to "Select Options" ✅
- Click "Add to Cart" on a no-variant item (mug, journal, tote) → uses seeded base price → cart opens with item ✅
- Checkout button → POST `/api/stripe/checkout` → 503 "Stripe is not configured yet" → drawer alert ✅
- No Stripe webhook fires in demo → no Printful order, no Resend email ✅

---

## Pre-launch decision gate (per CLAUDE.md)

After scaffold lands and pre-launch-auditor runs:

- **Anjo bought Premium tier** (full $5,500 build) → wire env vars in `.env.local`: `PRINTFUL_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`. Update `printful-seeded-products.json` `storeId` to Tony's real Printful store ID. Create Anjo-branded designs in Printful for the 10 SKUs.
- **Anjo bought Starter or Pro** (more likely per design-system.md §11 recommendation) → `pre-launch-auditor` deletes all 10 created files, reverts the 4 wiring edits (uncommit `primaryLinks` shop entry, cart icon, sitemap entry, package.json deps).

The scaffold gives the option, not the obligation.

---

## Verification (before marking phase complete)

1. `cd web && npm install` — bring in `stripe` + `resend`. Confirm zero peer-dep warnings.
2. `npm run dev`. Smoke test:
   - Homepage loads. Cart icon present in nav right cluster (count: 0).
   - Click cart icon → drawer opens empty, shows "Your cart is empty" + "Continue shopping".
   - Visit `/shop`. Hero renders with shimmer H1. Product grid loads 10 items.
   - Filter by Apparel → grid filters to 3 items.
   - Click "Select Options" on Crew Hoodie → variant picker expands. With no PRINTFUL_API_KEY, picker shows error state. "Add to Cart" stays gated. ✅ expected demo behavior.
   - Click "Add to Cart" on White Glossy Mug (no-variant flow) → drawer slides open, item appears, subtotal $16.50.
   - Increment quantity → subtotal updates.
   - Click "Checkout with Stripe" → 503 alert.
3. `npm run build`. Zero TypeScript errors. Zero ESLint warnings.
4. Visit `localhost:3000/sitemap.xml` → `<loc>https://anjoservices.com/shop</loc>` present with priority 0.7.
5. **Multi-breakpoint Visual QA per CLAUDE.md Visual QA Rule** — Playwright at 1440 / 390 / 375 / 428 + mobile drawer open. Required exit criteria from CLAUDE.md:
   - 0 console errors / 0 console warnings at every viewport
   - No horizontal scroll at 375
   - Cart icon visible + tappable on mobile drawer
   - No flat solid-color backgrounds — every section reads as gradient
   - Hero shimmer renders amber+red on H1
   - `prefers-reduced-motion` graceful degradation: motion stops, gradients persist (never flat)

---

## Plan-preservation note (CLAUDE.md Plan Preservation Rule)

This plan is being authored at `C:\Users\Anthony\.claude\plans\zazzy-finding-hedgehog.md` per the plan-mode harness requirement. **Before the first execution commit**, copy this plan to its proper vault location: `c:\Projects\Anjo-Services\.claude\plans\shop-scaffold-stripe-printful.md` so plan and implementation land in the same git commit per CLAUDE.md Plan Preservation Rule.

---

## Out of scope (intentional)

- Homepage shop teaser section. design-system.md §11 homepage rhythm map (lines 546-558) is fully resolved with no shop section. Adding one disrupts purpose-deduplication. Shop is reachable via nav only — by design.
- `/data/site.ts` shop content keys. Products live in seeded JSON, not site.ts. No siteConfig changes.
- Real Anjo Printful designs. Scaffold uses Printful's stock product preview images. Real designs ship only if Premium gate fires.
- Migrating `globals.css` to add `.surface-dark` selector. globals.css line 247 says `.surface-dark` is "to follow". Dark sections in the shop use the existing `var(--bg-dark-base)` + `var(--bg-dark-overlay-radial)` pattern (matches Footer, Navigation).
