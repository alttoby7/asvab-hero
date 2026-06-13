#!/usr/bin/env node
/**
 * Build the in-question scaffold bank (Lever B) by HARVESTING the existing
 * study-guide frontmatter, no hand authoring, no per-question content.
 *
 * For each AR/MK/PC topic guide we derive a 3-rung scaffold:
 *   rung 1 (hint)    = the key formula/relationship (formula_reference[0])
 *   rung 2 (steps)   = the remaining formulas + the top pitfall, as a method
 *   rung 3 (example) = a similar SOLVED problem (worked_examples[0])
 *
 * Output: src/data/item-scaffolds.seed.json, keyed by topic_id. Loaded
 * client-side by QuestionCard (static content, no DB table needed).
 *
 * Run: node scripts/build-item-scaffolds.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const GUIDE_DIR = join(ROOT, "content", "study-guides");
// AR/MK/PC are the math/verbal-reasoning subtests where step scaffolds pay off.
const SUBTESTS = ["ar", "mk", "pc"];

const out = {};
let count = 0;

for (const sub of SUBTESTS) {
  let files;
  try {
    files = readdirSync(join(GUIDE_DIR, sub)).filter((f) => f.endsWith(".md"));
  } catch {
    continue;
  }
  for (const file of files) {
    const raw = readFileSync(join(GUIDE_DIR, sub, file), "utf8");
    const { data } = matter(raw);
    const topicId = data.topic_id;
    if (!topicId) continue;

    const formulas = Array.isArray(data.formula_reference)
      ? data.formula_reference.filter((s) => typeof s === "string")
      : [];
    const pitfalls = Array.isArray(data.pitfalls)
      ? data.pitfalls.filter((s) => typeof s === "string")
      : [];
    const examples = Array.isArray(data.worked_examples)
      ? data.worked_examples.filter((e) => e && e.prompt && e.solution)
      : [];

    const hint = formulas[0] ?? null;
    const steps = [
      ...formulas.slice(1),
      ...(pitfalls[0] ? [`Watch out: ${pitfalls[0]}`] : []),
    ];
    const example = examples[0]
      ? { prompt: examples[0].prompt, solution: examples[0].solution }
      : null;

    // Skip topics that have nothing useful to scaffold.
    if (!hint && steps.length === 0 && !example) continue;

    out[topicId] = { hint, steps, example };
    count++;
  }
}

const dest = join(ROOT, "src", "data", "item-scaffolds.seed.json");
writeFileSync(dest, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${count} topic scaffolds to ${dest}`);
