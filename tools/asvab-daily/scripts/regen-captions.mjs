// Rebuild out/batch/captions.csv from the already-rendered clips — WITHOUT
// re-rendering the videos. Use after tweaking buildCaption() in lib.mjs.
//   node scripts/regen-captions.mjs
//
// Reads the clip filenames in out/batch/ (clip-NN_<external_key>.mp4), re-fetches
// those questions from the bank, and rewrites captions.csv in the same format
// the batch produces.

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  supaCreds,
  fetchQuestions,
  buildCaption,
  LETTERS,
  SUBTEST_NAMES,
} from "./lib.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BATCH = join(__dirname, "..", "out", "batch");

function csvCell(s) {
  return `"${String(s).replace(/"/g, '""')}"`;
}

if (!existsSync(BATCH)) {
  console.error("No out/batch/ — run `npm run batch` first.");
  process.exit(1);
}

// clip-01_AS-B28-020.mp4 -> { n: "01", key: "AS-B28-020", file }
const clips = readdirSync(BATCH)
  .filter((f) => /^clip-\d+_.+\.mp4$/.test(f))
  .map((file) => {
    const m = file.match(/^clip-(\d+)_(.+)\.mp4$/);
    return { n: m[1], key: m[2], file };
  })
  .sort((a, b) => Number(a.n) - Number(b.n));

if (!clips.length) {
  console.error("No clip-*.mp4 files in out/batch/.");
  process.exit(1);
}

const all = await fetchQuestions(supaCreds(), { limit: 2000 });
const byKey = new Map(all.map((q) => [q.external_key, q]));

const csv = ["index,external_key,subtest,answer,file,caption"];
let missing = 0;
for (const { n, key, file } of clips) {
  const q = byKey.get(key);
  if (!q) {
    console.warn(`⚠️  ${key} not found in bank — skipping caption.`);
    missing++;
    continue;
  }
  const subtestName = SUBTEST_NAMES[q.subtest] || q.subtest;
  csv.push(
    [
      Number(n),
      q.external_key,
      csvCell(subtestName),
      LETTERS[q.correct_index],
      csvCell(file),
      csvCell(buildCaption(q, subtestName)),
    ].join(","),
  );
}

writeFileSync(join(BATCH, "captions.csv"), csv.join("\n") + "\n");
console.log(
  `✅ captions.csv rebuilt for ${clips.length - missing}/${clips.length} clips.`,
);
