/**
 * check-no-emdash.mjs — regression guard. Fails (exit 1) if an em-dash (—) is
 * found in user-facing copy under src/ or content/, or in public/llms.txt.
 * En-dashes (–) are allowed (numeric ranges). Run in CI / before deploy.
 */
import { readFileSync, statSync, readdirSync } from "fs";
import { join, extname } from "path";

const ROOTS = ["src", "content"];
const SINGLE_FILES = ["public/llms.txt"];
const EXTS = new Set([".tsx", ".ts", ".jsx", ".js", ".json", ".md", ".mdx", ".txt"]);

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

const offenders = [];
for (const f of [...ROOTS.flatMap((r) => walk(r)), ...SINGLE_FILES]) {
  let src;
  try {
    src = readFileSync(f, "utf8");
  } catch {
    continue;
  }
  const lines = src.split("\n");
  lines.forEach((line, i) => {
    if (line.includes("—")) offenders.push(`${f}:${i + 1}: ${line.trim().slice(0, 100)}`);
  });
}

if (offenders.length) {
  console.error(`Found ${offenders.length} em-dash(es) in copy (banned):`);
  offenders.forEach((o) => console.error("  " + o));
  process.exit(1);
}
console.log("OK: no em-dashes in src/ or content/ copy.");
