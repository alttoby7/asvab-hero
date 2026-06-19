// Shared helpers for the ASVAB Daily generator. Pure Node (global fetch).
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const LETTERS = ["A", "B", "C", "D"];
export const SUBTEST_NAMES = {
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

const ENV_FILE =
  process.env.CENTRAL_ENV || join(process.env.HOME, "google-drive/0-AI/.env");

export function readEnv(name) {
  if (process.env[name]) return process.env[name];
  if (!existsSync(ENV_FILE)) return undefined;
  const line = readFileSync(ENV_FILE, "utf8")
    .split("\n")
    .find((l) => l.startsWith(name + "="));
  if (!line) return undefined;
  return line
    .slice(name.length + 1)
    .replace(/^["']|["']$/g, "")
    .replace(/\r$/, "")
    .trim();
}

export function supaCreds() {
  const url = readEnv("ASVABHERO_SUPABASE_URL");
  const key = readEnv("ASVABHERO_SUPABASE_SECRET_KEY");
  if (!url || !key)
    throw new Error("Missing ASVABHERO_SUPABASE_URL / ASVABHERO_SUPABASE_SECRET_KEY");
  return { url, key };
}

// Pull active, screen-friendly questions (short stem + 4 short choices).
export async function fetchQuestions({ url, key }, { pinned, limit = 300 } = {}) {
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const sel =
    "select=external_key,subtest,stem,choices,correct_index,explanation,difficulty";
  const endpoint = pinned
    ? `${url}/rest/v1/practice_questions?${sel}&external_key=eq.${encodeURIComponent(pinned)}&limit=1`
    : `${url}/rest/v1/practice_questions?${sel}&active=eq.true&limit=${limit}`;
  const res = await fetch(endpoint, { headers });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  const rows = await res.json();
  if (pinned) return rows;
  return rows.filter(
    (r) =>
      r.stem &&
      r.stem.length <= 160 &&
      Array.isArray(r.choices) &&
      r.choices.length === 4 &&
      r.choices.every((c) => String(c).length <= 40) &&
      r.explanation &&
      r.explanation.length <= 220,
  );
}

const HOOKS = [
  (s) => `Most future soldiers miss this ASVAB ${s} question.`,
  (s) => `Can you pass this real-style ASVAB ${s} question?`,
  () => `Nine out of ten recruits get this ASVAB question wrong.`,
  (s) => `Think you'd pass the ASVAB? Try this ${s} question.`,
];

export function buildScript(q, subtestName, seed = Math.random()) {
  const hook = HOOKS[Math.floor(seed * HOOKS.length) % HOOKS.length](subtestName);
  const correct = `${LETTERS[q.correct_index]}: ${q.choices[q.correct_index]}`;
  const narration =
    `${hook} ${q.stem} Is it A, B, C, or D? Answer in three... two... one. ` +
    `The answer is ${correct}. ${q.explanation} ` +
    `Want to pass the real thing? Practice four thousand five hundred questions free at ASVAB Hero. Link in bio.`;
  return { hook, narration };
}

// Social caption + hashtags for bulk scheduling. NEVER reveal the answer here —
// the comment-bait ("drop your answer") only works if the caption doesn't spoil
// it (the video reveals it after the countdown). The answer lives in its own
// CSV column for the poster's reference.
export function buildCaption(q, subtestName) {
  return (
    `Can you pass this ASVAB ${subtestName} question? 🎯 ` +
    `Drop your answer A, B, C, or D 👇 — then watch for the reveal. ` +
    `Practice 4,500+ questions free — link in bio. ` +
    `#asvab #asvabprep #asvabtest #military #miltok #futuresoldier #fyp`
  );
}

export async function synthVoice(text, apiKey, voiceId, outPath) {
  const vid = voiceId || "21m00Tcm4TlvDq8ikWAM"; // Rachel
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
  const { writeFileSync } = await import("node:fs");
  writeFileSync(outPath, Buffer.from(await res.arrayBuffer()));
}

export function propsFor(q, { audioSrc }) {
  const subtest = SUBTEST_NAMES[q.subtest] || q.subtest;
  const { hook } = buildScript(q, subtest);
  return {
    subtest,
    hook,
    stem: q.stem,
    choices: q.choices,
    correctIndex: q.correct_index,
    explanation: q.explanation,
    audioSrc: audioSrc ?? null,
  };
}
