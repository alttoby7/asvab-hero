/**
 * strip-emdashes.mjs — one-time + re-runnable codemod that removes em-dashes (—)
 * from user-facing copy. The brand bans em-dashes (see asvab-post-writer
 * writing-guidelines + memory feedback-asvabhero-copy-voice). The documented
 * fallback is a comma, which is what we default to here.
 *
 * IMPORTANT: en-dashes (–, U+2013) are NOT touched — they are used in numeric
 * score ranges like "20–62". Only em-dash (—, U+2014) and its HTML entities go.
 *
 * Run: node scripts/strip-emdashes.mjs        (writes changes)
 *      node scripts/strip-emdashes.mjs --dry   (report only)
 */
import { readFileSync, writeFileSync, statSync, readdirSync } from "fs";
import { join, extname } from "path";

const ROOTS = ["src", "content"];
const SINGLE_FILES = ["public/llms.txt"];
const EXTS = new Set([".tsx", ".ts", ".jsx", ".js", ".json", ".md", ".mdx", ".txt"]);
const DRY = process.argv.includes("--dry");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === "out") continue;
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (EXTS.has(extname(name))) out.push(p);
  }
  return out;
}

function transform(text) {
  let n = 0;
  const count = (re) => (text.match(re) || []).length;
  // HTML entities first
  n += count(/&mdash;|&#8212;|&#x2014;/g);
  text = text.replace(/\s*(?:&mdash;|&#8212;|&#x2014;)\s*/g, ", ");
  // Spaced em-dash on the same line (most common): "a — b" -> "a, b"
  n += count(/[ \t]*—+[ \t]*/g);
  text = text.replace(/[ \t]*—+[ \t]*/g, ", ");
  // Any remainder (e.g. line-adjacent) -> comma
  n += count(/—+/g);
  text = text.replace(/—+/g, ", ");
  // Cleanup artifacts: space-before-comma and doubled commas (always invalid)
  text = text.replace(/ +,/g, ",").replace(/,\s*,/g, ",");
  return { text, n };
}

const files = [
  ...ROOTS.flatMap((r) => walk(r)),
  ...SINGLE_FILES,
];

let total = 0;
const changed = [];
for (const f of files) {
  let src;
  try {
    src = readFileSync(f, "utf8");
  } catch {
    continue;
  }
  if (!src.includes("—") && !/&mdash;|&#8212;|&#x2014;/.test(src)) continue;
  const { text, n } = transform(src);
  if (n > 0 && text !== src) {
    if (!DRY) writeFileSync(f, text);
    changed.push([n, f]);
    total += n;
  }
}

changed.sort((a, b) => b[0] - a[0]);
for (const [n, f] of changed) console.log(`${String(n).padStart(4)}  ${f}`);
console.log(`\n${DRY ? "[dry] would replace" : "replaced"} ${total} em-dashes across ${changed.length} files`);
