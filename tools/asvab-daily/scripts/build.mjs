// Build ONE ASVAB Daily short: pick a question, write out/props.json.
// Default audio = the license-free sound bed (public/bed.mp3). Pass --voice to
// synth an ElevenLabs voiceover instead (needs ASVAB_ELEVENLABS_API_KEY).
//
// Usage:
//   node scripts/build.mjs                 # random question, bed audio
//   node scripts/build.mjs ar-3            # pin a question by external_key
//   node scripts/build.mjs --voice         # use ElevenLabs voiceover

import { writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  supaCreds,
  fetchQuestions,
  buildScript,
  propsFor,
  synthVoice,
  readEnv,
  SUBTEST_NAMES,
} from "./lib.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "out");
const PUBLIC = join(ROOT, "public");

async function main() {
  const args = process.argv.slice(2);
  const wantVoice = args.includes("--voice");
  const pinned = args.find((a) => !a.startsWith("--"));

  const creds = supaCreds();
  const rows = await fetchQuestions(creds, { pinned });
  if (!rows.length) throw new Error("No screen-friendly questions found.");
  const q = pinned ? rows[0] : rows[Math.floor(Math.random() * rows.length)];
  const subtestName = SUBTEST_NAMES[q.subtest] || q.subtest;

  // audio
  let audioSrc = "bed.mp3";
  const voicePath = join(PUBLIC, "voiceover.mp3");
  if (existsSync(voicePath)) rmSync(voicePath); // never reuse a stale VO
  if (wantVoice) {
    const elKey = readEnv("ASVAB_ELEVENLABS_API_KEY");
    if (!elKey) throw new Error("--voice given but ASVAB_ELEVENLABS_API_KEY missing");
    const { narration } = buildScript(q, subtestName);
    await synthVoice(narration, elKey, readEnv("ASVAB_ELEVENLABS_VOICE_ID"), voicePath);
    audioSrc = "voiceover.mp3";
    console.log("🔊 ElevenLabs voiceover written.");
  } else {
    console.log("🎵 Using license-free sound bed (public/bed.mp3). Pass --voice for narration.");
  }

  const props = propsFor(q, { audioSrc });
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, "props.json"), JSON.stringify(props, null, 2));

  console.log(`✅ ${q.external_key} (${subtestName}) → out/props.json`);
  console.log(`   ${q.stem}`);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
