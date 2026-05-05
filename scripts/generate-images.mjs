#!/usr/bin/env node
/**
 * generate-images.mjs — Stage 1G fal.ai image generator (Anjo Services).
 *
 * Reads scripts/prompts/*.json (one file per image), calls fal.ai
 * `fal-ai/flux-pro/v1.1`, downloads the JPEG, writes to outputPath.
 *
 * Idempotent: skips any outputPath that already exists.
 * Parallel: processes prompts in batches of CONCURRENCY (default 5).
 *
 * Usage:
 *   node scripts/generate-images.mjs
 *
 * Env:
 *   FAL_KEY   loaded from .env.local (manual parse — no dotenv dep).
 *
 * Per build-log Pattern #41: parameterized image-generation pipeline so the
 * same script runs against any prompt directory and is safely re-runnable
 * mid-batch.
 *
 * Per build-log Pattern #38: NEVER request readable text. Every prompt JSON
 * file in scripts/prompts/ has been authored to avoid readable text — this
 * generator is a transport layer only.
 */
import { fal } from "@fal-ai/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const PROMPTS_DIR = path.join(__dirname, "prompts");
const ENV_FILE = path.join(ROOT, ".env.local");

const CONCURRENCY = 5;
const MODEL = "fal-ai/flux-pro/v1.1";

// --- env loader (manual, no dotenv dep) -------------------------------------
function loadEnvLocal() {
  if (!fs.existsSync(ENV_FILE)) return;
  const raw = fs.readFileSync(ENV_FILE, "utf8");
  for (const rawLine of raw.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

if (!process.env.FAL_KEY) {
  console.error("FATAL: FAL_KEY not set in .env.local or environment.");
  process.exit(2);
}

fal.config({ credentials: process.env.FAL_KEY });

// --- prompt discovery -------------------------------------------------------
function loadPrompts() {
  const files = fs
    .readdirSync(PROMPTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();
  const prompts = [];
  for (const file of files) {
    const fullPath = path.join(PROMPTS_DIR, file);
    let parsed;
    try {
      parsed = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    } catch (err) {
      console.error(`SKIP malformed JSON: ${file} (${err.message})`);
      continue;
    }
    if (!parsed.prompt || !parsed.imageSize || !parsed.outputPath) {
      console.error(`SKIP missing keys: ${file}`);
      continue;
    }
    prompts.push({
      slug: file.replace(/\.json$/, ""),
      prompt: parsed.prompt,
      imageSize: parsed.imageSize,
      outputPath: path.join(ROOT, parsed.outputPath.replace(/\\/g, "/")),
    });
  }
  return prompts;
}

// --- generator core ---------------------------------------------------------
async function generateOne(spec) {
  const { slug, prompt, imageSize, outputPath } = spec;
  if (fs.existsSync(outputPath)) {
    return { slug, status: "skipped", outputPath };
  }
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  try {
    const result = await fal.subscribe(MODEL, {
      input: {
        prompt,
        image_size: imageSize,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        safety_tolerance: "2",
        output_format: "jpeg",
      },
    });

    const url = result?.data?.images?.[0]?.url;
    if (!url) {
      throw new Error("no image URL in fal response");
    }

    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`download failed: ${resp.status}`);
    }
    const buf = Buffer.from(await resp.arrayBuffer());
    fs.writeFileSync(outputPath, buf);

    return {
      slug,
      status: "generated",
      outputPath,
      bytes: buf.length,
    };
  } catch (err) {
    return {
      slug,
      status: "failed",
      outputPath,
      error: err?.message ?? String(err),
    };
  }
}

async function runBatched(specs, concurrency) {
  const results = [];
  let i = 0;
  while (i < specs.length) {
    const batch = specs.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(generateOne));
    for (const r of batchResults) {
      const tag =
        r.status === "generated"
          ? `OK ${(r.bytes / 1024).toFixed(0)}KB`
          : r.status === "skipped"
          ? "SKIP"
          : `FAIL ${r.error}`;
      console.log(`[${r.status.padEnd(9)}] ${r.slug.padEnd(60)} ${tag}`);
      results.push(r);
    }
    i += concurrency;
  }
  return results;
}

// --- main -------------------------------------------------------------------
(async () => {
  const start = Date.now();
  const prompts = loadPrompts();
  console.log(
    `Loaded ${prompts.length} prompt(s) from ${path.relative(ROOT, PROMPTS_DIR)}`,
  );
  console.log(`Concurrency: ${CONCURRENCY}, Model: ${MODEL}\n`);

  const results = await runBatched(prompts, CONCURRENCY);

  const generated = results.filter((r) => r.status === "generated");
  const skipped = results.filter((r) => r.status === "skipped");
  const failed = results.filter((r) => r.status === "failed");

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n--- summary --- ${elapsed}s`);
  console.log(`Generated: ${generated.length}`);
  console.log(`Skipped:   ${skipped.length}`);
  console.log(`Failed:    ${failed.length}`);
  if (failed.length) {
    console.log("\nFailures:");
    for (const f of failed) {
      console.log(`  - ${f.slug}: ${f.error}`);
    }
    process.exit(1);
  }
  process.exit(0);
})().catch((err) => {
  console.error("FATAL:", err);
  process.exit(2);
});
