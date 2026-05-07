"use client";

/**
 * ShopContent — /shop page body.
 *
 * Anjo brand translation of the andrea-abella-marie reference (`andrea/src/components/ShopContent.tsx`):
 *   - Resilience Collection (manual fulfillment) entirely removed — Anjo is pure POD.
 *   - andrea's navy/gold/cream tokens → Anjo's red/amber/bone-and-near-black tokens.
 *   - Pill buttons (rounded-full) → squared (rounded-md) per design-system.md
 *     line 505 (trade-authority archetype prohibits pills).
 *   - andrea's `<HeroStars />` → CSS breathing-orb backdrop on dark hero.
 *   - andrea's `<AnimatedSection />` → Anjo's `<FadeUp />` from /components/animations.
 *   - Product grid uses Anjo's surface system (surface-light data-motion="mesh").
 *   - H1 carries `.hero-shimmer` per CLAUDE.md Hero Architecture Rule.
 *
 * Sections (light/dark alternation per Homepage Section Architecture Rule):
 *   1. Hero                          dark   breathe orb     conversion-adjacent
 *   2. Sticky category filter        light  paper texture   navigation
 *   3. Product grid                  light  mesh drift      commerce
 *   4. Print-on-demand explainer     dark   (text-heavy)    education
 *   5. Booking CTA teaser            light  breathe         conversion
 *
 * Demo mode: when PRINTFUL_API_KEY is missing, /api/printful/products falls
 * back to the seeded JSON; /api/printful/variants/[id] returns 503 + empty
 * variants, and the picker shows its error state. No-variant items (mug,
 * journal, tote, etc.) still add to cart at the seeded base price.
 */

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/animations";
import { useCart } from "@/lib/cart";
import { siteConfig } from "@/data/site";
import seededProducts from "@/lib/printful-seeded-products.json";

const CATEGORIES = [
  "All",
  "Apparel",
  "Drinkware",
  "Bags",
  "Home & Stationery",
] as const;

// Color name → CSS hex. Used by ColorSwatch for the variant picker.
const COLOR_MAP: Record<string, string> = {
  Black: "#1c1c1c",
  White: "#f5f5f5",
  Navy: "#1a2744",
  "Navy Blue": "#1a2744",
  Red: "#c0392b",
  "Forest Green": "#2d6a4f",
  "Military Green": "#4a5c3e",
  "Bottle Green": "#1e3d2f",
  Storm: "#6b7c8d",
  "Sport Grey": "#a8adb0",
  "Dark Heather": "#4a4e54",
  Heather: "#9ca3a8",
  Maroon: "#7b1a2e",
  Ash: "#b8bab9",
  Sand: "#d4b896",
  Royal: "#2c5fa8",
  "Royal Blue": "#2c5fa8",
  Purple: "#6a2a8c",
  Orange: "#e07b2a",
  Gold: "#c9a227",
  Yellow: "#e8c523",
  Pink: "#e8a0b4",
  "Light Pink": "#f2c4ce",
  Charcoal: "#3d4349",
  "Light Blue": "#7eb8d4",
  "Vintage White": "#f0ece0",
  "Carolina Blue": "#5b93c7",
  "Heather Blue": "#7a9ab5",
  Olive: "#6b7c3e",
  Brown: "#6b4c3b",
  Chocolate: "#5c3d2e",
  Burgundy: "#722f37",
  Mustard: "#c9a227",
  Cream: "#f5f0e8",
  Cranberry: "#9e2a2b",
  "Dark Navy": "#0d1a33",
  Slate: "#708090",
  Mint: "#98d8c8",
  Coral: "#e8785a",
  Teal: "#2a7a7a",
  Indigo: "#3d52a0",
  Green: "#3a7d44",
  Blue: "#2c5fa8",
  Grey: "#9ca3a8",
  Gray: "#9ca3a8",
  Silver: "#c0c0c0",
  Rose: "#e8a0b4",
  "Rose Gold": "#b76e79",
  Lavender: "#b57bee",
  "Sky Blue": "#87ceeb",
  Cobalt: "#0047ab",
  Aqua: "#00bcd4",
};

interface PrintfulProduct {
  id: number;
  name: string;
  thumbnail_url?: string;
  variants?: number;
  sync_product?: { name: string; thumbnail_url?: string };
}

interface NormalizedProduct {
  id: number;
  slug: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

interface VariantOption {
  id: number;
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
}

type PickerStatus = "idle" | "loading" | "ready" | "error";

interface VariantPickerState {
  status: PickerStatus;
  variants: VariantOption[];
  selectedSize: string;
  selectedColor: string;
  expanded: boolean;
}

function SkeletonCard() {
  return (
    <div
      className="overflow-hidden h-full flex flex-col animate-pulse"
      style={{
        background: "var(--bg-card-light)",
        border: "1px solid var(--border-card-light)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <div
        className="aspect-square"
        style={{ background: "var(--bg-base)" }}
      />
      <div className="p-5 flex flex-col gap-3">
        <div
          className="h-2 w-1/3"
          style={{
            background: "var(--bg-base)",
            borderRadius: "var(--radius-sm)",
          }}
        />
        <div
          className="h-4 w-3/4"
          style={{
            background: "var(--bg-base)",
            borderRadius: "var(--radius-sm)",
          }}
        />
        <div
          className="h-3 w-full"
          style={{
            background: "var(--bg-base)",
            borderRadius: "var(--radius-sm)",
          }}
        />
        <div className="flex justify-between items-center mt-2">
          <div
            className="h-5 w-12"
            style={{
              background: "var(--bg-base)",
              borderRadius: "var(--radius-sm)",
            }}
          />
          <div
            className="h-8 w-24"
            style={{
              background: "var(--bg-base)",
              borderRadius: "var(--radius-md)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function SuccessBanner() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  return (
    <AnimatePresence>
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="fixed top-0 left-0 right-0 z-[90] text-center py-3 px-6 font-display font-bold uppercase"
          style={{
            background: "var(--accent)",
            color: "var(--bg-dark-base)",
            fontSize: "var(--text-body-sm)",
            letterSpacing: "0.08em",
          }}
        >
          Order confirmed. Tony will be notified.
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ColorSwatch({
  color,
  selected,
  onClick,
}: {
  color: string;
  selected: boolean;
  onClick: () => void;
}) {
  const normalizeKey = (k: string) =>
    k.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  const hex = COLOR_MAP[color] ?? COLOR_MAP[normalizeKey(color)] ?? "#999";
  const isLight =
    hex === "#f5f5f5" ||
    hex === "#f0ece0" ||
    hex === "#f5f0e8" ||
    hex === "#e8c523";
  return (
    <button
      onClick={onClick}
      title={color}
      aria-label={`Select color ${color}`}
      aria-pressed={selected}
      className="relative flex-shrink-0 transition-transform hover:scale-110 focus:outline-none"
      style={{ width: 28, height: 28 }}
    >
      <span
        className="block rounded-full border"
        style={{
          width: 28,
          height: 28,
          background: hex,
          borderColor: isLight ? "var(--border-card-light)" : "transparent",
          boxShadow: selected
            ? `0 0 0 2px var(--bg-base), 0 0 0 4px var(--primary)`
            : "inset 0 1px 2px rgba(0,0,0,0.15)",
        }}
      />
    </button>
  );
}

export default function ShopContent() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("All");
  const [products, setProducts] = useState<NormalizedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<number | string | null>(null);
  const [pickerStates, setPickerStates] = useState<
    Record<number, VariantPickerState>
  >({});
  const { addItem } = useCart();

  useEffect(() => {
    const previewMap: Record<number, string> = {};
    seededProducts.products.forEach((p) => {
      if (p.preview_image_url) previewMap[p.printful_id] = p.preview_image_url;
    });

    fetch("/api/printful/products")
      .then((r) => r.json())
      .then((data: PrintfulProduct[]) => {
        if (!Array.isArray(data) || data.length === 0) throw new Error("empty");
        const normalized: NormalizedProduct[] = data.map((p) => {
          const raw = p.sync_product ?? p;
          const name = raw.name ?? p.name ?? "Product";
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

          let category = "Home & Stationery";
          const lower = name.toLowerCase();
          if (
            /hoodie|\btee\b|tank|long sleeve|jogger|sweatshirt|zip hoodie|raglan|apron/.test(
              lower,
            )
          )
            category = "Apparel";
          else if (
            /mug|tumbler|water bottle|enamel|can cooler/.test(lower)
          )
            category = "Drinkware";
          else if (
            /tote|drawstring|crossbody|duffle|backpack|laptop sleeve/.test(
              lower,
            )
          )
            category = "Bags";

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const productId: number = p.id ?? (p as any).printful_id;
          const pfThumb = raw.thumbnail_url || p.thumbnail_url;
          const image =
            pfThumb && pfThumb.length > 10 ? pfThumb : previewMap[productId];

          return {
            id: productId,
            slug,
            name,
            price: 0,
            category,
            image,
          };
        });
        setProducts(normalized);
      })
      .catch(() => {
        const seeded = seededProducts as {
          products: Array<{
            slug: string;
            name: string;
            price: number;
            category: string;
            preview_image_url?: string;
            printful_id: number;
          }>;
        };
        setProducts(
          seeded.products.map((p) => ({
            id: p.printful_id,
            slug: p.slug,
            name: p.name,
            price: p.price,
            category: p.category,
            image: p.preview_image_url,
          })),
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const seededPrices: Record<number, number> = {};
  seededProducts.products.forEach((p) => {
    seededPrices[p.printful_id] = p.price;
  });

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // ── Variant picker helpers ───────────────────────────────────────────────

  function getPicker(productId: number): VariantPickerState {
    return (
      pickerStates[productId] ?? {
        status: "idle",
        variants: [],
        selectedSize: "",
        selectedColor: "",
        expanded: false,
      }
    );
  }

  function setPicker(productId: number, patch: Partial<VariantPickerState>) {
    setPickerStates((prev) => ({
      ...prev,
      [productId]: { ...getPicker(productId), ...patch },
    }));
  }

  async function openVariantPicker(product: NormalizedProduct) {
    const picker = getPicker(product.id);
    if (picker.expanded) {
      setPicker(product.id, { expanded: false });
      return;
    }
    if (picker.status === "ready") {
      setPicker(product.id, { expanded: true });
      return;
    }
    setPicker(product.id, { status: "loading", expanded: true });
    try {
      const res = await fetch(`/api/printful/variants/${product.id}`);
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      const variants: VariantOption[] = data.variants ?? [];
      if (variants.length === 0) {
        setPicker(product.id, { status: "error", variants: [] });
        return;
      }
      if (variants.length === 1) {
        setPicker(product.id, {
          status: "ready",
          variants,
          selectedSize: variants[0].size,
          selectedColor: variants[0].color,
          expanded: true,
        });
      } else {
        setPicker(product.id, { status: "ready", variants, expanded: true });
      }
    } catch {
      setPicker(product.id, { status: "error" });
    }
  }

  function getSelectedVariant(productId: number): VariantOption | undefined {
    const picker = getPicker(productId);
    if (picker.status !== "ready" || picker.variants.length === 0)
      return undefined;
    return picker.variants.find(
      (v) =>
        (!picker.selectedSize || v.size === picker.selectedSize) &&
        (!picker.selectedColor || v.color === picker.selectedColor),
    );
  }

  function getUniqueSizes(productId: number): string[] {
    const picker = getPicker(productId);
    const relevant = picker.selectedColor
      ? picker.variants.filter((v) => v.color === picker.selectedColor)
      : picker.variants;
    return [...new Set(relevant.map((v) => v.size))].filter(Boolean);
  }

  function getUniqueColors(productId: number): string[] {
    const picker = getPicker(productId);
    return [...new Set(picker.variants.map((v) => v.color))].filter(Boolean);
  }

  function isSizeAvailable(productId: number, size: string): boolean {
    const picker = getPicker(productId);
    if (!picker.selectedColor) return true;
    return picker.variants.some(
      (v) => v.color === picker.selectedColor && v.size === size,
    );
  }

  function getDisplayImage(product: NormalizedProduct): string | undefined {
    const picker = getPicker(product.id);
    if (picker.status === "ready" && picker.selectedColor) {
      const variant = picker.variants.find(
        (v) => v.color === picker.selectedColor,
      );
      if (variant?.image) return variant.image;
    }
    return product.image;
  }

  function getDisplayPrice(product: NormalizedProduct): number {
    const variant = getSelectedVariant(product.id);
    if (variant) return variant.price;
    const picker = getPicker(product.id);
    if (picker.status === "ready" && picker.variants.length > 0) {
      return picker.variants[0].price;
    }
    return seededPrices[product.id] ?? product.price;
  }

  const SIZE_ORDER = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "2XL",
    "3XL",
    "4XL",
    "5XL",
    "6XL",
  ];
  function sortSizes(sizes: string[]): string[] {
    return [...sizes].sort((a, b) => {
      const ai = SIZE_ORDER.indexOf(a);
      const bi = SIZE_ORDER.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }

  function handleAddItem(product: NormalizedProduct) {
    const picker = getPicker(product.id);
    const variant = getSelectedVariant(product.id);

    // No-variant flow (mug, journal, tote): add by product directly at seeded price
    if (picker.status !== "ready" || !variant) {
      const price = seededPrices[product.id] ?? product.price;
      addItem({
        id: product.id,
        name: product.name,
        price,
        quantity: 1,
        image: product.image,
        category: product.category,
      });
      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 1500);
      return;
    }

    // Variant flow
    const displayName = [
      product.name,
      picker.selectedColor && picker.selectedSize
        ? `${picker.selectedColor} / ${picker.selectedSize}`
        : picker.selectedColor || picker.selectedSize,
    ]
      .filter(Boolean)
      .join(" — ");

    addItem({
      id: variant.id,
      name: displayName,
      price: variant.price,
      quantity: 1,
      image: variant.image || product.image,
      printful_variant_id: variant.id,
      size: variant.size,
      color: variant.color,
    });

    setAddedId(variant.id);
    setTimeout(() => setAddedId(null), 1500);
    setPicker(product.id, { expanded: false });
  }

  return (
    <>
      <Suspense fallback={null}>
        <SuccessBanner />
      </Suspense>

      {/* ── 1 · Hero — dark, breathing orb ─────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
          paddingTop: "var(--space-3xl)",
          paddingBottom: "var(--space-2xl)",
        }}
      >
        {/* Mandatory radial overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        {/* Breathing orb */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none orb"
          style={{
            top: "-10%",
            right: "-5%",
            width: "60vw",
            height: "60vw",
            maxWidth: 600,
            maxHeight: 600,
            background:
              "radial-gradient(circle, rgba(200, 32, 44, 0.25) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute pointer-events-none orb-2"
          style={{
            bottom: "-15%",
            left: "-10%",
            width: "50vw",
            height: "50vw",
            maxWidth: 500,
            maxHeight: 500,
            background:
              "radial-gradient(circle, rgba(232, 176, 76, 0.20) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />

        <div
          className="relative z-10 mx-auto px-6 lg:px-8 text-center"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <FadeUp>
            <p
              className="font-display uppercase mb-4"
              style={{
                color: "var(--accent)",
                fontSize: "var(--text-eyebrow)",
                letterSpacing: "0.18em",
              }}
            >
              Anjo Crew Merch
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="hero-shimmer font-display"
              style={{
                fontSize: "var(--text-h1)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: "var(--space-md)",
              }}
            >
              Real merch. Real jobsite. Real Tony.
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="font-body mx-auto"
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-body-lg)",
                lineHeight: 1.5,
                maxWidth: "42ch",
              }}
            >
              Anjo-branded gear for the crew, the truck, and the morning
              coffee. Print-on-demand. Shipped direct.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 2 · Sticky category filter — light + paper texture ─────────── */}
      <section
        className="surface-light sticky top-24 lg:top-28 z-30"
        data-texture="paper"
        style={{
          paddingTop: "var(--space-md)",
          paddingBottom: "var(--space-md)",
          borderBottom: "1px solid var(--border-card-light)",
        }}
      >
        <div
          className="surface-content mx-auto px-6 lg:px-8"
          style={{ maxWidth: "var(--container-default)" }}
        >
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Filter merchandise by category"
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={active}
                  className="font-display font-bold uppercase whitespace-nowrap transition-all"
                  style={{
                    background: active
                      ? "var(--bg-dark-base)"
                      : "var(--bg-card-light)",
                    color: active
                      ? "var(--text-primary)"
                      : "var(--text-secondary-light)",
                    border: active
                      ? "1px solid var(--bg-dark-base)"
                      : "1px solid var(--border-card-light)",
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--text-eyebrow)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3 · Product grid — light + mesh drift ──────────────────────── */}
      <section
        className="surface-light"
        data-motion="mesh"
        style={{
          paddingTop: "var(--space-2xl)",
          paddingBottom: "var(--space-2xl)",
        }}
      >
        <div
          className="surface-content mx-auto px-6 lg:px-8"
          style={{ maxWidth: "var(--container-default)" }}
        >
          <FadeUp>
            <h2
              className="font-display"
              style={{
                color: "var(--text-primary-light)",
                fontSize: "var(--text-h2)",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                marginBottom: "var(--space-lg)",
              }}
            >
              Anjo <span style={{ color: "var(--primary)" }}>Goods</span>
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i}>
                    <SkeletonCard />
                  </div>
                ))
              : filteredProducts.map((product, i) => {
                  const picker = getPicker(product.id);
                  const displayImage = getDisplayImage(product);
                  const displayPrice = getDisplayPrice(product);
                  const selectedVariant = getSelectedVariant(product.id);
                  const uniqueColors = getUniqueColors(product.id);
                  const uniqueSizes = sortSizes(getUniqueSizes(product.id));
                  const hasColors = uniqueColors.length > 0;
                  const hasSizes = uniqueSizes.length > 0;
                  const isAdded =
                    addedId === (selectedVariant?.id ?? product.id);
                  const canAdd =
                    picker.status === "ready" && selectedVariant !== undefined;
                  const isNoVariantItem =
                    picker.status === "idle" || picker.status === "error";

                  return (
                    <FadeUp key={product.id} delay={i * 0.04}>
                      <motion.div
                        layout
                        className="overflow-hidden flex flex-col h-full transition-all"
                        style={{
                          background: "var(--bg-card-light)",
                          border: "1px solid var(--border-card-light)",
                          borderRadius: "var(--radius-lg)",
                          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                        }}
                      >
                        {/* Image */}
                        <div
                          className="aspect-square relative overflow-hidden flex-shrink-0"
                          style={{ background: "var(--bg-base)" }}
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={displayImage ?? "placeholder"}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0"
                            >
                              {displayImage ? (
                                <Image
                                  src={displayImage}
                                  alt={product.name}
                                  fill
                                  className="object-cover object-center"
                                  // First-row cards are LCP candidates (lg:4-col,
                                  // md:3-col, sm:2-col, mobile:1-col) — eager-load
                                  // the first 4 so Next.js doesn't warn about
                                  // lazy LCP image at any breakpoint.
                                  {...(i < 4
                                    ? { priority: true }
                                    : { loading: "lazy" as const })}
                                  unoptimized
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <svg
                                    className="w-12 h-12"
                                    style={{ color: "var(--text-muted-light)" }}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    viewBox="0 0 24 24"
                                  >
                                    <rect
                                      x="3"
                                      y="3"
                                      width="18"
                                      height="18"
                                      rx="2"
                                    />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="m21 15-5-5L5 21" />
                                  </svg>
                                </div>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                          <span
                            className="font-display uppercase mb-1"
                            style={{
                              color: "var(--text-muted-light)",
                              fontSize: "var(--text-eyebrow)",
                              letterSpacing: "0.12em",
                            }}
                          >
                            {product.category}
                          </span>
                          <h3
                            className="font-display mb-2"
                            style={{
                              color: "var(--text-primary-light)",
                              fontSize: "var(--text-body)",
                              fontWeight: 700,
                              lineHeight: 1.3,
                              letterSpacing: "0.01em",
                            }}
                          >
                            {product.name}
                          </h3>

                          {/* Variant picker — expands inline */}
                          <AnimatePresence>
                            {picker.expanded && picker.status === "ready" && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.25,
                                  ease: "easeInOut",
                                }}
                                style={{ overflow: "hidden" }}
                              >
                                <div className="pb-3 space-y-3">
                                  {hasColors && (
                                    <div>
                                      <p
                                        className="font-display uppercase mb-2"
                                        style={{
                                          color: "var(--text-muted-light)",
                                          fontSize: "var(--text-meta)",
                                          letterSpacing: "0.12em",
                                        }}
                                      >
                                        Color
                                        {picker.selectedColor
                                          ? `: ${picker.selectedColor}`
                                          : ""}
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {uniqueColors.map((color) => (
                                          <ColorSwatch
                                            key={color}
                                            color={color}
                                            selected={
                                              picker.selectedColor === color
                                            }
                                            onClick={() =>
                                              setPicker(product.id, {
                                                selectedColor: color,
                                                selectedSize: "",
                                              })
                                            }
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {hasSizes && (
                                    <div>
                                      <p
                                        className="font-display uppercase mb-2"
                                        style={{
                                          color: "var(--text-muted-light)",
                                          fontSize: "var(--text-meta)",
                                          letterSpacing: "0.12em",
                                        }}
                                      >
                                        Size
                                      </p>
                                      <div className="flex flex-wrap gap-1.5">
                                        {uniqueSizes.map((size) => {
                                          const available = isSizeAvailable(
                                            product.id,
                                            size,
                                          );
                                          const selected =
                                            picker.selectedSize === size;
                                          return (
                                            <button
                                              key={size}
                                              disabled={!available}
                                              onClick={() =>
                                                setPicker(product.id, {
                                                  selectedSize: size,
                                                })
                                              }
                                              className="font-display font-bold transition-all"
                                              style={{
                                                background: selected
                                                  ? "var(--bg-dark-base)"
                                                  : "var(--bg-card-light)",
                                                color: selected
                                                  ? "var(--text-primary)"
                                                  : available
                                                    ? "var(--text-secondary-light)"
                                                    : "var(--text-muted-light)",
                                                border: selected
                                                  ? "1px solid var(--bg-dark-base)"
                                                  : "1px solid var(--border-card-light)",
                                                padding: "0.25rem 0.625rem",
                                                fontSize: "var(--text-meta)",
                                                borderRadius:
                                                  "var(--radius-sm)",
                                                cursor: available
                                                  ? "pointer"
                                                  : "not-allowed",
                                                textDecoration: available
                                                  ? "none"
                                                  : "line-through",
                                                opacity: available ? 1 : 0.4,
                                              }}
                                            >
                                              {size}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                  {!canAdd && (
                                    <p
                                      className="font-body italic"
                                      style={{
                                        color: "var(--text-muted-light)",
                                        fontSize: "var(--text-meta)",
                                      }}
                                    >
                                      {!picker.selectedColor &&
                                      hasColors &&
                                      !picker.selectedSize &&
                                      hasSizes
                                        ? "Select a color and size"
                                        : !picker.selectedColor && hasColors
                                          ? "Select a color"
                                          : !picker.selectedSize && hasSizes
                                            ? "Select a size"
                                            : ""}
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {picker.expanded && picker.status === "loading" && (
                            <div className="pb-3 flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full border-2 animate-spin"
                                style={{
                                  borderColor: "var(--border-card-light)",
                                  borderTopColor: "var(--primary)",
                                }}
                              />
                              <p
                                className="font-body"
                                style={{
                                  color: "var(--text-muted-light)",
                                  fontSize: "var(--text-meta)",
                                }}
                              >
                                Loading options…
                              </p>
                            </div>
                          )}

                          {picker.expanded && picker.status === "error" && (
                            <p
                              className="font-body pb-3"
                              style={{
                                color: "var(--primary)",
                                fontSize: "var(--text-meta)",
                              }}
                            >
                              Demo mode — variants unavailable. Buy this item
                              at the base price below.
                            </p>
                          )}

                          {/* Price + button row */}
                          <div className="flex items-center justify-between mt-auto pt-2">
                            <motion.span
                              key={displayPrice}
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="font-display"
                              style={{
                                color: "var(--primary)",
                                fontSize: "var(--text-h3)",
                                fontWeight: 900,
                              }}
                            >
                              {displayPrice
                                ? `$${displayPrice.toFixed(2)}`
                                : "—"}
                            </motion.span>

                            {canAdd ? (
                              <button
                                onClick={() => handleAddItem(product)}
                                className="font-display font-bold uppercase transition-all"
                                style={{
                                  background: isAdded
                                    ? "var(--accent)"
                                    : "var(--primary)",
                                  color: isAdded
                                    ? "var(--bg-dark-base)"
                                    : "var(--text-primary)",
                                  padding: "0.5rem 1rem",
                                  borderRadius: "var(--radius-md)",
                                  fontSize: "var(--text-eyebrow)",
                                  letterSpacing: "0.08em",
                                  border: "none",
                                }}
                                onMouseEnter={(e) => {
                                  if (!isAdded) {
                                    e.currentTarget.style.background =
                                      "var(--primary-muted)";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isAdded) {
                                    e.currentTarget.style.background =
                                      "var(--primary)";
                                  }
                                }}
                              >
                                {isAdded ? "Added ✓" : "Add to Cart"}
                              </button>
                            ) : picker.expanded ? (
                              <span
                                className="font-display font-bold uppercase"
                                style={{
                                  color: "var(--text-muted-light)",
                                  border:
                                    "1px solid var(--border-card-light)",
                                  padding: "0.5rem 1rem",
                                  borderRadius: "var(--radius-md)",
                                  fontSize: "var(--text-eyebrow)",
                                  letterSpacing: "0.08em",
                                  cursor: "not-allowed",
                                }}
                              >
                                Add to Cart
                              </span>
                            ) : isNoVariantItem ? (
                              // Mug, journal, tote — no variants, direct add
                              <button
                                onClick={() => handleAddItem(product)}
                                className="font-display font-bold uppercase transition-all"
                                style={{
                                  background: isAdded
                                    ? "var(--accent)"
                                    : "var(--primary)",
                                  color: isAdded
                                    ? "var(--bg-dark-base)"
                                    : "var(--text-primary)",
                                  padding: "0.5rem 1rem",
                                  borderRadius: "var(--radius-md)",
                                  fontSize: "var(--text-eyebrow)",
                                  letterSpacing: "0.08em",
                                  border: "none",
                                }}
                                onMouseEnter={(e) => {
                                  if (!isAdded) {
                                    e.currentTarget.style.background =
                                      "var(--primary-muted)";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isAdded) {
                                    e.currentTarget.style.background =
                                      "var(--primary)";
                                  }
                                }}
                              >
                                {isAdded ? "Added ✓" : "Add to Cart"}
                              </button>
                            ) : (
                              // Hoodie / apparel — has variants, show "Select Options"
                              <button
                                onClick={() => openVariantPicker(product)}
                                className="font-display font-bold uppercase transition-all"
                                style={{
                                  background: "transparent",
                                  color: "var(--primary)",
                                  border: "1px solid var(--primary)",
                                  padding: "0.5rem 1rem",
                                  borderRadius: "var(--radius-md)",
                                  fontSize: "var(--text-eyebrow)",
                                  letterSpacing: "0.08em",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "var(--primary-soft)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";
                                }}
                              >
                                Select Options
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </FadeUp>
                  );
                })}
          </div>

          {!loading && filteredProducts.length === 0 && (
            <p
              className="text-center font-body"
              style={{
                color: "var(--text-muted-light)",
                fontSize: "var(--text-body-sm)",
                marginTop: "var(--space-2xl)",
              }}
            >
              No items in this category yet. Try a different filter.
            </p>
          )}
        </div>
      </section>

      {/* ── 4 · Print-on-demand explainer — dark ───────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--bg-dark-base)",
          color: "var(--text-primary)",
          paddingTop: "var(--space-2xl)",
          paddingBottom: "var(--space-2xl)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--bg-dark-overlay-radial)" }}
        />
        <div
          className="relative z-10 mx-auto px-6 lg:px-8"
          style={{ maxWidth: "var(--container-default)" }}
        >
          <FadeUp>
            <h2
              className="font-display text-center"
              style={{
                color: "var(--text-primary)",
                fontSize: "var(--text-h2)",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                marginBottom: "var(--space-2xs)",
              }}
            >
              How It Ships
            </h2>
            <p
              className="text-center font-body mx-auto"
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-body)",
                maxWidth: "48ch",
                marginBottom: "var(--space-xl)",
              }}
            >
              No warehouse. No leftover stock. Each piece printed when you
              order it, then shipped direct.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🛒",
                title: "Order",
                body: "Pick your gear, check out with Stripe. Card info never touches Anjo.",
              },
              {
                emoji: "🖨️",
                title: "Printed",
                body: "Each piece printed on demand by Printful. No warehouse, no waste.",
              },
              {
                emoji: "📦",
                title: "Shipped",
                body: "Tracked delivery to your door in 5-7 business days.",
              },
            ].map((step, i) => (
              <FadeUp key={step.title} delay={i * 0.08}>
                <div
                  className="h-full p-6"
                  style={{
                    background: "var(--bg-card-dark)",
                    border: "1px solid var(--border-card-dark)",
                    borderRadius: "var(--radius-lg)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      fontSize: "2.5rem",
                      lineHeight: 1,
                      marginBottom: "var(--space-md)",
                    }}
                  >
                    {step.emoji}
                  </div>
                  <h3
                    className="font-display uppercase"
                    style={{
                      color: "var(--accent)",
                      fontSize: "var(--text-eyebrow)",
                      letterSpacing: "0.12em",
                      marginBottom: "var(--space-2xs)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-body"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "var(--text-body-sm)",
                      lineHeight: 1.55,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · Booking CTA teaser — light + breathe ───────────────────── */}
      <section
        className="surface-light"
        data-motion="breathe"
        style={{
          paddingTop: "var(--space-2xl)",
          paddingBottom: "var(--space-2xl)",
        }}
      >
        <div
          className="surface-content mx-auto px-6 lg:px-8 text-center"
          style={{ maxWidth: "var(--container-narrow)" }}
        >
          <FadeUp>
            <p
              className="font-display uppercase"
              style={{
                color: "var(--primary)",
                fontSize: "var(--text-eyebrow)",
                letterSpacing: "0.18em",
                marginBottom: "var(--space-sm)",
              }}
            >
              Need work done, not just merch?
            </p>
            <h2
              className="font-display"
              style={{
                color: "var(--text-primary-light)",
                fontSize: "var(--text-h2)",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                marginBottom: "var(--space-md)",
              }}
            >
              Schedule a 30-minute walkthrough with Tony.
            </h2>
            <p
              className="font-body mx-auto"
              style={{
                color: "var(--text-secondary-light)",
                fontSize: "var(--text-body-lg)",
                lineHeight: 1.5,
                maxWidth: "44ch",
                marginBottom: "var(--space-lg)",
              }}
            >
              Real prices. Real photos. Real Tony on the phone. Same name on
              the truck as on the hoodie.
            </p>
            <Link
              href={siteConfig.ctaPrimary.href}
              className="inline-flex items-center justify-center font-display font-bold uppercase transition-colors"
              style={{
                background: "var(--primary)",
                color: "var(--text-primary)",
                padding: "0.875rem 1.75rem",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--text-body-sm)",
                letterSpacing: "0.08em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--primary-muted)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--primary)";
              }}
            >
              {siteConfig.ctaPrimary.label}
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
