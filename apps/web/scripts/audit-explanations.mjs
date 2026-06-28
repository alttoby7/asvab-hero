#!/usr/bin/env node
// Quality audit pass v2 — flags items needing explanation/distractor work.
// Output: docs/question-bank-flagged.json + stdout counts by subtest.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const FILES = [
  ['free-test.json', 'free'],
  ['expansion-batch-1.json', 'b1'],
  ['expansion-batch-2.json', 'b2'],
  ['expansion-batch-3.json', 'b3'],
  ['expansion-batch-4.json', 'b4'],
  ['expansion-batch-5.json', 'b5'],
  ['expansion-batch-6.json', 'b6'],
  ['expansion-batch-7.json', 'b7'],
];

const tags = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/question-tags.seed.json'), 'utf8'));
const tagMap = new Map(tags.map(t => [t.external_key.toUpperCase(), t]));

function loadFile(rel) {
  const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests', rel), 'utf8'));
  return Array.isArray(raw) ? raw : raw.questions;
}

function wordCount(s) {
  return (s ?? '').trim().split(/\s+/).filter(Boolean).length;
}

// AI-tell / leaked-author-thought phrases that should never ship to a paying user.
const AI_TELLS = [
  /\bcorrection:/i,
  /\bre-?check:/i,
  /\breassign:/i,
  /\bwait\s*—/i,
  /\blet me track\b/i,
  /\blet me trace\b/i,
  /\bhmm:/i,
  /\bcorrection needed\b/i,
  /^the trap is\b/im,           // formulaic lede; only flag when it leads a paragraph
  /\(note:/i,                    // editorial parenthetical
  /\bauthor[''']?s note\b/i,
];

// Trap-naming heuristic — explanation that addresses a distractor or misconception
// will usually contain one of these connectors.
const TRAP_KEYWORDS = [
  /\bbut\b/i, /\bnot\b/i, /\bconfuse/i, /\btrap\b/i,
  /\binstead\b/i, /\bincorrect\b/i, /\bhowever\b/i,
  /\bmistake/i, /\bcommon error\b/i, /\bwrong\b/i,
  /\bwhereas\b/i, /\bunlike\b/i, /\brather than\b/i,
];

// Hedged-answer detector — only fire for AR/MK where exact arithmetic is expected.
const HEDGE_RE = /\b(approximately|about|roughly|~)\b/i;

function flagItem({ key, subtest, difficulty, stem, choices, correctIndex, explanation, source, idx }) {
  const flags = [];
  const exp = explanation ?? '';
  const wc = wordCount(exp);

  // 1) AI-tell phrases
  for (const re of AI_TELLS) {
    if (re.test(exp)) { flags.push('ai-tell:' + re.source.slice(0, 30)); break; }
  }

  // 2) Thin explanation. Pure-arithmetic subtests get a lower threshold at d1/d2.
  const isPureArithmetic = (subtest === 'AR' || subtest === 'MK') && difficulty <= 2;
  const thinThreshold = isPureArithmetic ? 15 : 35;
  if (wc < thinThreshold) flags.push(`thin(${wc}w)`);

  // 3) Missing trap-naming on items where it should be present.
  // Skip d1 items in pure-arithmetic subtests (genuinely no trap to name).
  if (!isPureArithmetic && wc < 60) {
    const hasTrap = TRAP_KEYWORDS.some(re => re.test(exp));
    if (!hasTrap) flags.push('no-trap-named');
  }

  // 4) Distractor parity — answer conspicuously longer than others.
  if (Array.isArray(choices) && choices.length === 4) {
    const lens = choices.map(c => String(c).length);
    const correctLen = lens[correctIndex];
    const otherMax = Math.max(...lens.filter((_, i) => i !== correctIndex));
    if (correctLen > otherMax * 2.5 && correctLen > 20) {
      flags.push(`length-tell(correct=${correctLen} vs ${otherMax})`);
    }
  }

  // 5) Hedged correct answer on AR/MK.
  if ((subtest === 'AR' || subtest === 'MK') && Array.isArray(choices)) {
    if (HEDGE_RE.test(String(choices[correctIndex] ?? ''))) {
      flags.push('hedged-answer');
    }
  }

  if (!flags.length) return null;
  return {
    external_key: key,
    file: source,
    subtest,
    topic_id: undefined,         // filled below
    difficulty,
    flags,
    stem,
    choices,
    correct_index: correctIndex,
    explanation: exp,
  };
}

const flaggedBySubtest = {};
const counts = { total: 0, byFile: {}, bySubtest: {}, byFlag: {} };

for (const [file, source] of FILES) {
  const items = loadFile(file);
  counts.byFile[source] = 0;
  items.forEach((q, i) => {
    const key = (q.external_key ?? q.id ?? '').toUpperCase();
    const stem = q.stem ?? q.question;
    const choices = q.choices ?? q.options;
    const correctIndex = q.correct_index ?? q.correctIndex;
    let topicId = q.topic_id;
    let difficulty = q.difficulty;
    if (!topicId || !difficulty) {
      const tag = tagMap.get(key);
      if (tag) {
        topicId = topicId ?? tag.topic_id;
        difficulty = difficulty ?? tag.difficulty;
      }
    }
    const flagged = flagItem({
      key, subtest: q.subtest, difficulty, stem, choices,
      correctIndex, explanation: q.explanation, source, idx: i,
    });
    if (flagged) {
      flagged.topic_id = topicId;
      flaggedBySubtest[q.subtest] = flaggedBySubtest[q.subtest] ?? [];
      flaggedBySubtest[q.subtest].push(flagged);
      counts.total++;
      counts.byFile[source]++;
      counts.bySubtest[q.subtest] = (counts.bySubtest[q.subtest] ?? 0) + 1;
      for (const f of flagged.flags) {
        const head = f.split('(')[0].split(':')[0];
        counts.byFlag[head] = (counts.byFlag[head] ?? 0) + 1;
      }
    }
  });
}

const out = path.join(ROOT, 'docs/question-bank-flagged.json');
fs.writeFileSync(out, JSON.stringify(flaggedBySubtest, null, 2) + '\n');

console.log(`Flagged: ${counts.total} items → ${out}`);
console.log('By subtest:', counts.bySubtest);
console.log('By file:', counts.byFile);
console.log('By flag type:', counts.byFlag);
