#!/usr/bin/env node
/**
 * verify-images.mjs — file-level sanity check on every prompt's outputPath.
 * Confirms: file exists, size 100KB-2MB, valid JPEG (FFD8FF magic bytes).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const PROMPTS_DIR = path.join(__dirname, "prompts");

const files = fs.readdirSync(PROMPTS_DIR).filter((f) => f.endsWith(".json")).sort();
let ok = 0;
let warn = 0;
let fail = 0;
const flagged = [];

for (const file of files) {
  const spec = JSON.parse(fs.readFileSync(path.join(PROMPTS_DIR, file), "utf8"));
  const out = path.join(ROOT, spec.outputPath.replace(/\\/g, "/"));
  if (!fs.existsSync(out)) {
    console.log(`FAIL  ${file.replace(/\.json$/, "")}: missing`);
    fail++;
    continue;
  }
  const buf = fs.readFileSync(out);
  const size = buf.length;
  const magicOk = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  const sizeOk = size >= 100 * 1024 && size <= 2 * 1024 * 1024;
  const sizeKB = (size / 1024).toFixed(0);
  if (!magicOk) {
    console.log(`FAIL  ${file.replace(/\.json$/, "")}: not a JPEG (${sizeKB}KB)`);
    fail++;
    flagged.push(file);
  } else if (!sizeOk) {
    console.log(`WARN  ${file.replace(/\.json$/, "")}: size ${sizeKB}KB out of [100,2048]`);
    warn++;
    flagged.push(file);
  } else {
    ok++;
  }
}

console.log(`\nOK ${ok}  WARN ${warn}  FAIL ${fail}  (total ${files.length})`);
if (flagged.length) {
  console.log("Flagged for review: " + flagged.join(", "));
}
process.exit(fail ? 1 : 0);
