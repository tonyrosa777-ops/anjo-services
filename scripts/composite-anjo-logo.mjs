#!/usr/bin/env node
/**
 * composite-anjo-logo.mjs — overlays the real Anjo Logo.webp onto each
 * generated product mockup in /public/products/anjo-*.jpg.
 *
 * Why: fal.ai/flux can't render the actual Anjo logo. The merch generator
 * produces clean unbranded product mockups; this script applies the real
 * brand mark on top via sharp.
 *
 * Per-product overlay positioning is configured below — different products
 * have different natural emblem zones (chest for apparel, mid-body for
 * mugs/tumblers/bottles, lower-corner for notebooks).
 *
 * Usage:
 *   node scripts/composite-anjo-logo.mjs
 *
 * Idempotent: writes over the JPG. Re-runs are safe but each run re-applies
 * the logo to the current state of the file (so don't run twice unless you
 * regenerated the underlying mockup).
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const LOGO_PATH = path.join(ROOT, "public", "Logo.webp");
const PRODUCTS_DIR = path.join(ROOT, "public", "products");

if (!fs.existsSync(LOGO_PATH)) {
  console.error("FATAL: Logo.webp not found at", LOGO_PATH);
  process.exit(2);
}

// Per-product overlay specs.
// widthPct: logo width as a fraction of product image width.
// xPct, yPct: logo center position as fractions (0=left/top, 1=right/bottom).
// opacity: 0-1, how strongly the logo prints onto the product.
const SPECS = [
  { slug: "anjo-crew-hoodie-champion", widthPct: 0.20, xPct: 0.50, yPct: 0.50, opacity: 0.92 },
  { slug: "anjo-crop-hoodie",          widthPct: 0.18, xPct: 0.50, yPct: 0.45, opacity: 0.92 },
  { slug: "anjo-strap-apron",          widthPct: 0.30, xPct: 0.50, yPct: 0.42, opacity: 0.92 },
  { slug: "anjo-insulated-tumbler",    widthPct: 0.28, xPct: 0.50, yPct: 0.55, opacity: 0.95 },
  { slug: "anjo-water-bottle-stainless", widthPct: 0.26, xPct: 0.50, yPct: 0.55, opacity: 0.95 },
  { slug: "anjo-mug-white-glossy",     widthPct: 0.32, xPct: 0.45, yPct: 0.62, opacity: 0.95 },
  { slug: "anjo-mug-black-glossy",     widthPct: 0.24, xPct: 0.50, yPct: 0.55, opacity: 0.95 },
  { slug: "anjo-notebook-hardcover",   widthPct: 0.30, xPct: 0.45, yPct: 0.55, opacity: 0.92 },
  { slug: "anjo-journal-spiral",       widthPct: 0.32, xPct: 0.50, yPct: 0.55, opacity: 0.92 },
  { slug: "anjo-tote-canvas",          widthPct: 0.30, xPct: 0.50, yPct: 0.55, opacity: 0.94 },
];

async function compositeOne(spec) {
  const imgPath = path.join(PRODUCTS_DIR, `${spec.slug}.jpg`);
  if (!fs.existsSync(imgPath)) {
    return { slug: spec.slug, status: "missing" };
  }

  // Read into buffer first so we don't hold a file handle while writing back
  // (Windows file lock — Next.js dev image optimizer can keep the file open).
  const inputBuf = fs.readFileSync(imgPath);
  const baseMeta = await sharp(inputBuf).metadata();
  const W = baseMeta.width;
  const H = baseMeta.height;

  const targetLogoW = Math.round(W * spec.widthPct);
  // Scale logo (keep aspect ratio); webp has alpha so transparency preserved.
  // No opacity manipulation — full-strength prints contrast against the
  // unbranded mockup. The logo's own alpha handles transparent corners.
  const logoBuf = await sharp(LOGO_PATH)
    .resize({ width: targetLogoW })
    .ensureAlpha()
    .png()
    .toBuffer();

  const logoMeta = await sharp(logoBuf).metadata();
  const left = Math.round(W * spec.xPct - logoMeta.width / 2);
  const top = Math.round(H * spec.yPct - logoMeta.height / 2);

  const outBuf = await sharp(inputBuf)
    .composite([{ input: logoBuf, left, top }])
    .jpeg({ quality: 90 })
    .toBuffer();

  fs.writeFileSync(imgPath, outBuf);
  return {
    slug: spec.slug,
    status: "composited",
    bytes: outBuf.length,
    logoW: logoMeta.width,
    logoH: logoMeta.height,
    left,
    top,
  };
}

(async () => {
  const start = Date.now();
  const results = [];
  for (const spec of SPECS) {
    const r = await compositeOne(spec);
    const tag =
      r.status === "composited"
        ? `OK ${(r.bytes / 1024).toFixed(0)}KB · logo ${r.logoW}x${r.logoH} at ${r.left},${r.top}`
        : r.status.toUpperCase();
    console.log(`[${r.status.padEnd(11)}] ${r.slug.padEnd(40)} ${tag}`);
    results.push(r);
  }
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n--- summary --- ${elapsed}s`);
  console.log(`Composited: ${results.filter((r) => r.status === "composited").length}`);
  console.log(`Missing:    ${results.filter((r) => r.status === "missing").length}`);
})().catch((err) => {
  console.error("FATAL:", err);
  process.exit(2);
});
