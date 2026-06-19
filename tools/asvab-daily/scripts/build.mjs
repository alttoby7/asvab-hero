// Build one ASVAB Daily short: pick a question from the live bank, write the
// narration script, synth the voiceover via ElevenLabs (optional), and emit
// out/props.json for Remotion. Pure Node (global fetch), no extra deps.
//
// Reads secrets from the central 0-AI/.env (repo central-secrets rule):
//   ASVABHERO_SUPABASE_URL, ASVABHERO_SUPABASE_SECRET_KEY  (required)
//   ASVAB_ELEVENLABS_API_KEY                                (optional -> silent)
//   ASVAB_ELEVENLABS_VOICE_ID                               (optional)
//
// Usage:  node scripts/build.mjs [external_key]
//   pass an external_key (e.g. ar-3) to pin a specific question; else random.

import { writeFileSync, mkdirSync, existsSync, readFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "out");
const PUBLIC = join(ROOT, "public");
const ENV_FILE =
  process.env.CENTRAL_ENV || join(process.env.HOME, "google-drive/0-AI/.env");

const LETTERS = ["A", "B", "C", "D"];
const SUBTEST_NAMES = {
  AR: "Arithmetic Reasoning",
  MK: "Mathematics Knowledge",
  WK: "Word Knowledge",
  PC: "Paragraph Comprehension",
  GS: "General Science",
  EI: "Electronics Information",
  AS: "Auto & Shop Information",
  MC: "Mechanical Comprehension",
  AO: "Assembling Objects",
};

function readEnv(name) {
  if (process.env[name]) return process.env[name];
  if (!existsSync(ENV_FILE)) return undefined;
  const line = readFileSync(ENV_FILE, "utf8")
    .split("\n")
    .find((l) => l.startsWith(name + "="));
  if (!line) return undefined;
  return line.slice(name.length + 1).replace(/^["']|["']$/g, "").replace(/\r$/, "").trim();
}

async function pickQuestion(url, key, pinned) {
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const sel =
    "select=external_key,subtest,stem,choices,correct_index,explanation,difficulty";
  let endpoint;
  if (pinned) {
    endpoint = `${url}/rest/v1/practice_questions?${sel}&external_key=eq.${encodeURIComponent(pinned)}&limit=1`;
  } else {
    // grab a batch of active, well-formed questions and choose one with a
    // screen-friendly stem (short enough to read in a Short).
    endpoint = `${url}/rest/v1/practice_questions?${sel}&active=eq.true&limit=200`;
  }
  const res = await fetch(endpoint, { headers });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  let rows = await res.json();
  if (!rows.length) throw new Error("No questions returned.");
  if (!pinned) {
    rows = rows.filter(
      (r) =>
        r.stem &&
        r.stem.length <= 160 &&
        Array.isArray(r.choices) &&
        r.choices.length === 4 &&
        r.choices.every((c) => String(c).length <= 40) &&
        r.explanation &&
        r.explanation.length <= 220,
    );
    if (!rows.length) throw new Error("No screen-friendly questions found.");
    rows = [rows[Math.floor(Math.random() * rows.length)]];
  }
  return rows[0];
}

function buildScript(q, subtestName) {
  const correct = `${LETTERS[q.correct_index]}: ${q.choices[q.correct_index]}`;
  const hooks = [
    `Most future soldiers miss this ASVAB ${subtestName} question.`,
    `Can you pass this real-style ASVAB ${subtestName} question?`,
    `Nine out of ten recruits get this ASVAB question wrong.`,
  ];
  const hook = hooks[Math.floor(Math.random() * hooks.length)];
  const narration =
    `${hook} ` +
    `${q.stem} ` +
    `Is it A, B, C, or D? Answer in three... two... one. ` +
    `The answer is ${correct}. ${q.explanation} ` +
    `Want to pass the real thing? Practice four thousand five hundred questions free at ASVAB Hero. Link in bio.`;
  return { hook, narration };
}

async function synthVoice(text, apiKey, voiceId) {
  const vid = voiceId || "21m00Tcm4TlvDq8ikWAM"; // Rachel (default public voice)
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${vid}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.4, similarity_boost: 0.75, style: 0.3 },
      }),
    },
  );
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(PUBLIC, { recursive: true });
  writeFileSync(join(PUBLIC, "voiceover.mp3"), buf);
  return buf.length;
}

async function main() {
  const pinned = process.argv[2];
  const SUPA_URL = readEnv("ASVABHERO_SUPABASE_URL");
  const SUPA_KEY = readEnv("ASVABHERO_SUPABASE_SECRET_KEY");
  if (!SUPA_URL || !SUPA_KEY)
    throw new Error("Missing ASVABHERO_SUPABASE_URL / ASVABHERO_SUPABASE_SECRET_KEY");

  const q = await pickQuestion(SUPA_URL, SUPA_KEY, pinned);
  const subtestName = SUBTEST_NAMES[q.subtest] || q.subtest;
  const { hook, narration } = buildScript(q, subtestName);

  // voiceover (optional)
  const elKey = readEnv("ASVAB_ELEVENLABS_API_KEY");
  const elVoice = readEnv("ASVAB_ELEVENLABS_VOICE_ID");
  let hasAudio = false;
  // remove any stale audio so a no-key run renders truly silent
  if (existsSync(join(PUBLIC, "voiceover.mp3"))) rmSync(join(PUBLIC, "voiceover.mp3"));
  if (elKey) {
    const bytes = await synthVoice(narration, elKey, elVoice);
    hasAudio = true;
    console.log(`🔊 ElevenLabs voiceover: ${(bytes / 1024).toFixed(0)} KB`);
  } else {
    console.log("⚠️  No ASVAB_ELEVENLABS_API_KEY — rendering SILENT sample.");
  }

  const props = {
    subtest: subtestName,
    hook,
    stem: q.stem,
    choices: q.choices,
    correctIndex: q.correct_index,
    explanation: q.explanation,
    hasAudio,
  };

  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, "props.json"), JSON.stringify(props, null, 2));
  writeFileSync(
    join(OUT, "script.txt"),
    `# ${q.external_key} (${subtestName}, difficulty ${q.difficulty})\n\n${narration}\n`,
  );

  console.log(`✅ Built question ${q.external_key} (${subtestName})`);
  console.log(`   ${q.stem}`);
  console.log(`   → out/props.json + out/script.txt`);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
