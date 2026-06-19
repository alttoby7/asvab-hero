// Re-render the EXISTING batch with the current template (e.g. after a restyle)
// WITHOUT picking new questions. Reads the clip filenames already in out/batch/
// (clip-NN_<external_key>.mp4), re-fetches those exact questions, and re-renders
// each to the same filename. The ledger is untouched.
//   node scripts/rerender-batch.mjs

import { readdirSync, existsSync, writeFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { supaCreds, fetchQuestions, propsFor } from "./lib.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BATCH = join(ROOT, "out", "batch");

if (!existsSync(BATCH)) {
  console.error("No out/batch/ — run `npm run batch` first.");
  process.exit(1);
}

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

let ok = 0;
for (const { n, key, file } of clips) {
  const q = byKey.get(key);
  if (!q) {
    console.warn(`⚠️  [${n}] ${key} not found in bank — skipping.`);
    continue;
  }
  const props = propsFor(q, { audioSrc: "bed.mp3" });
  const propsPath = join(BATCH, `props-${n}.json`);
  writeFileSync(propsPath, JSON.stringify(props));
  process.stdout.write(`🎬 [${n}/${clips.length}] ${key}... `);
  const r = spawnSync(
    "npx",
    ["remotion", "render", "QuestionShort", join(BATCH, file), `--props=${propsPath}`],
    { cwd: ROOT, encoding: "utf8" },
  );
  if (r.status !== 0) {
    console.log("FAILED");
    console.error(r.stderr?.split("\n").slice(-5).join("\n"));
  } else {
    console.log("ok");
    ok++;
  }
}

// clean up scratch props files
for (const { n } of clips) {
  const p = join(BATCH, `props-${n}.json`);
  if (existsSync(p)) {
    try {
      rmSync(p);
    } catch {}
  }
}

console.log(`\n✅ Re-rendered ${ok}/${clips.length} clips in place.`);
