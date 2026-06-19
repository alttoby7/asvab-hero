// Batch-generate a month of ASVAB Daily shorts in one run.
//   node scripts/batch.mjs [count=30]
//
// Output (out/batch/):
//   clip-01_<key>.mp4 ... clip-NN_<key>.mp4   the videos (bed audio, schedulable)
//   captions.csv                              caption + hashtags per clip
// A repeat-proof ledger (posted-keys.json at project root) records every key
// used so future batches never reuse a question.

import {
  writeFileSync,
  readFileSync,
  existsSync,
  mkdirSync,
  rmSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  supaCreds,
  fetchQuestions,
  propsFor,
  buildCaption,
  LETTERS,
  SUBTEST_NAMES,
} from "./lib.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BATCH = join(ROOT, "out", "batch");
const LEDGER = join(ROOT, "posted-keys.json");

function loadLedger() {
  if (!existsSync(LEDGER)) return [];
  try {
    return JSON.parse(readFileSync(LEDGER, "utf8"));
  } catch {
    return [];
  }
}

// Spread subtests so the feed isn't 10 math clips in a row.
function interleave(rows) {
  const bySub = {};
  for (const r of rows) (bySub[r.subtest] ||= []).push(r);
  for (const k in bySub) bySub[k].sort(() => Math.random() - 0.5);
  const subs = Object.keys(bySub).sort(() => Math.random() - 0.5);
  const out = [];
  let added = true;
  while (added) {
    added = false;
    for (const s of subs) {
      if (bySub[s].length) {
        out.push(bySub[s].shift());
        added = true;
      }
    }
  }
  return out;
}

function csvCell(s) {
  return `"${String(s).replace(/"/g, '""')}"`;
}

async function main() {
  const count = Math.max(1, parseInt(process.argv[2] || "30", 10));
  const creds = supaCreds();
  const used = new Set(loadLedger());

  const all = await fetchQuestions(creds, { limit: 500 });
  const fresh = interleave(all.filter((q) => !used.has(q.external_key)));
  if (fresh.length < count) {
    console.warn(
      `⚠️  Only ${fresh.length} unused screen-friendly questions available (asked for ${count}).`,
    );
  }
  const picks = fresh.slice(0, count);
  if (!picks.length) throw new Error("No fresh questions to render.");

  // fresh output dir
  if (existsSync(BATCH)) rmSync(BATCH, { recursive: true, force: true });
  mkdirSync(BATCH, { recursive: true });

  const csv = ["index,external_key,subtest,answer,file,caption"];
  const newlyUsed = [];

  for (let i = 0; i < picks.length; i++) {
    const q = picks[i];
    const n = String(i + 1).padStart(2, "0");
    const subtestName = SUBTEST_NAMES[q.subtest] || q.subtest;
    const props = propsFor(q, { audioSrc: "bed.mp3" });
    const propsPath = join(BATCH, `props-${n}.json`);
    const file = `clip-${n}_${q.external_key}.mp4`;
    writeFileSync(propsPath, JSON.stringify(props));

    process.stdout.write(`🎬 [${n}/${picks.length}] ${q.external_key} (${subtestName})... `);
    const r = spawnSync(
      "npx",
      ["remotion", "render", "QuestionShort", join(BATCH, file), `--props=${propsPath}`],
      { cwd: ROOT, encoding: "utf8" },
    );
    if (r.status !== 0) {
      console.log("FAILED");
      console.error(r.stderr?.split("\n").slice(-5).join("\n"));
      continue;
    }
    console.log("ok");
    rmSync(propsPath, { force: true });

    csv.push(
      [
        i + 1,
        q.external_key,
        csvCell(subtestName),
        LETTERS[q.correct_index],
        csvCell(file),
        csvCell(buildCaption(q, subtestName)),
      ].join(","),
    );
    newlyUsed.push(q.external_key);
  }

  writeFileSync(join(BATCH, "captions.csv"), csv.join("\n") + "\n");
  writeFileSync(LEDGER, JSON.stringify([...used, ...newlyUsed], null, 0) + "\n");

  console.log(`\n✅ Rendered ${newlyUsed.length} clips → out/batch/`);
  console.log(`   captions.csv written; ledger now has ${used.size + newlyUsed.length} keys.`);
  console.log(`   Next: bulk-upload to YouTube Studio / Meta Business Suite (schedule a month),`);
  console.log(`   and post to TikTok (add a trending sound in-app).`);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
