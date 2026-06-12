#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const freeRaw = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/free-test.json'), 'utf8'));
const free = freeRaw.questions;
const b1 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-1.json'), 'utf8'));
const b2 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-2.json'), 'utf8'));
const b3 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-3.json'), 'utf8'));
const b4 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-4.json'), 'utf8'));
const b5 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-5.json'), 'utf8'));
const b6 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-6.json'), 'utf8'));
const b7 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-7.json'), 'utf8'));
const b8 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-8.json'), 'utf8'));
const b9 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-9.json'), 'utf8'));
const b10 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-10.json'), 'utf8'));
const b11 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-11-math.json'), 'utf8'));
const b12 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-12-verbal.json'), 'utf8'));
// Non-AFQT depth batches (GS/EI/AS/MC/AO) — d1/d2 floor fill, 2026-05-22.
const b13 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-13-gs.json'), 'utf8'));
const b14 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-14-ei.json'), 'utf8'));
const b15 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-15-as.json'), 'utf8'));
const b16 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-16-mc.json'), 'utf8'));
const b17 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-17-ao.json'), 'utf8'));
const b18 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-18-ar-curated.json'), 'utf8'));
const b19 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-19-mk-curated.json'), 'utf8'));
const b20 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-20-wk-curated.json'), 'utf8'));
const b21 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-21-pc-curated.json'), 'utf8'));
const b22 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-22-ar-deepen.json'), 'utf8'));
const b23 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-23-mk-deepen.json'), 'utf8'));
const b24 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-24-wk-deepen.json'), 'utf8'));
const b25 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-25-pc-deepen.json'), 'utf8'));
// Book-sourced depth batches (concepts drawn from Duran/Dummies/1001/AFQT study guides), 2026-06-10.
const b26 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-26-gs.json'), 'utf8'));
const b27 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-27-ei.json'), 'utf8'));
const b28 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-28-as.json'), 'utf8'));
const b29 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-29-mc.json'), 'utf8'));
const b30 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-30-wk.json'), 'utf8'));
const b31 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-31-ar.json'), 'utf8'));
const b32 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-32-mk.json'), 'utf8'));
const b33 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-33-pc.json'), 'utf8'));
// AFQT depth from book practice-exam concept coverage (original items), 2026-06-10.
const b34 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-34-ar.json'), 'utf8'));
const b35 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-35-mk.json'), 'utf8'));
const b36 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-36-wk.json'), 'utf8'));
const b37 = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/practice-tests/expansion-batch-37-pc.json'), 'utf8'));
// Bulk expansion batches 38-73 (dedup-gated waves 1-4), 2026-06-11.
const expansionBatches = [];
const TESTS_DIR = path.join(ROOT, 'src/data/practice-tests');
for (const f of fs.readdirSync(TESTS_DIR).sort()) {
  const m = f.match(/^expansion-batch-(\d+)-(.+)\.json$/);
  if (!m || Number(m[1]) < 38) continue;
  const raw = JSON.parse(fs.readFileSync(path.join(TESTS_DIR, f), 'utf8'));
  const items = Array.isArray(raw) ? raw : raw.questions;
  expansionBatches.push({ name: f.replace('.json', ''), items });
}
const tags = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/question-tags.seed.json'), 'utf8'));
const tagMap = new Map(tags.map(t => [t.external_key.toUpperCase(), t]));

const sqlEscape = s => "'" + String(s).replace(/'/g, "''") + "'";
const jsonbEscape = arr => "'" + JSON.stringify(arr).replace(/'/g, "''") + "'::jsonb";

// ---------------------------------------------------------------------------
// item_family_id: groups near-sibling items (same template / skill / head-word)
// so WS6's sampler can enforce a sibling cooldown. An explicit JSON field
// (item_family_id) always wins; otherwise we derive a family from content for
// the over-represented AFQT templates the audit flagged, falling back to a
// unique per-item id (topic_id::external_key). 100% of AFQT items (ar.*, mk.*,
// wk.*, pc.*) are guaranteed a family id; non-AFQT items get a unique fallback.
// ---------------------------------------------------------------------------
function deriveFamily(externalKey, topicId, stem) {
  const s = String(stem);
  const sl = s.toLowerCase();
  const t = topicId || '';

  // WK: group by head-word / taught morpheme (the ALL-CAPS token in the stem).
  // The same word/morpheme tested in synonym, context-clue, prefix, or root
  // format becomes one family so a drill never serves the same vocabulary twice.
  if (t.startsWith('wk.')) {
    const caps = (s.match(/\b[A-Z]{4,}\b/g) || [])
      .filter(w => !['ASVAB', 'WORD', 'MOST', 'NEARLY', 'MEANS', 'TRAP'].includes(w));
    if (caps.length) return `wk.headword::${caps[0].toLowerCase()}`;
  }

  if (t === 'ar.percent') {
    if (/mark(ed)? ?up|markup/.test(sl) && /discount|off|sale/.test(sl)) return 'ar.percent::markup-then-discount';
    if (/net/.test(sl) && /(gain|rose|rises|grew|grow|increase|up).*(then|next|month).*(los|fell|fall|decrease|down)/.test(sl)) return 'ar.percent::sequential-gain-loss';
    if (/tip/.test(sl) && /tax|service fee/.test(sl)) return 'ar.percent::tip-plus-tax';
    if (/interest/.test(sl)) return 'ar.percent::simple-interest';
    if (/percent (increase|decrease)|percent change|net percent/.test(sl)) return 'ar.percent::percent-change';
    if (/discount|% off|on sale|marked down|markdown/.test(sl)) return 'ar.percent::single-discount';
    if (/what is \d+% of|what percent|% of \d/.test(sl)) return 'ar.percent::basic-percent';
  }
  if (t === 'ar.ratio-proportion') {
    if (/scale|map|inch.*mile|1 ?in/.test(sl)) return 'ar.ratio-proportion::map-scale';
    if (/flour|sugar|recipe|cookies|batch/.test(sl)) return 'ar.ratio-proportion::recipe-ratio';
    if (/exchange rate|usd|eur|dollar.*euro|currency/.test(sl)) return 'ar.ratio-proportion::exchange-rate';
  }
  if (t === 'ar.rate-distance-time') {
    if (/fill|drain|pump|tank|gpm|gallons per/.test(sl)) return 'ar.rate-distance-time::fill-drain';
    if (/two trains|catch up|toward each other|apart.*toward|head.?on/.test(sl)) return 'ar.rate-distance-time::two-bodies';
  }
  if (t === 'ar.word-problems') {
    if (/pay raise|raise.*pay|% (pay )?raise|monthly pay/.test(sl)) return 'ar.word-problems::pay-raise';
  }
  if (t === 'mk.geometry') {
    if (/(right triangle|hypotenuse|legs? of)/.test(sl) && /\d/.test(sl)) return 'mk.geometry::pythagorean-triple';
  }
  if (t === 'mk.exponents-polynomials') {
    if (/simplify/.test(sl) && /[·*^]|x[²-¹⁰-⁹]/.test(s)) return 'mk.exponents-polynomials::simplify-power';
  }
  if (t === 'mk.algebra-linear') {
    if (/consecutive (odd|even|integer)/.test(sl)) return 'mk.algebra-linear::consecutive-integers';
  }
  if (t === 'mk.number-properties') {
    if (/prime number|is prime|which.*prime/.test(sl)) return 'mk.number-properties::identify-prime';
    if (/least common multiple|\blcm\b/.test(sl)) return 'mk.number-properties::lcm';
    if (/greatest common factor|\bgcf\b/.test(sl)) return 'mk.number-properties::gcf';
  }
  if (t.startsWith('pc.')) {
    if (/urban heat island/.test(sl)) return 'pc.passage::urban-heat-island';
  }

  return `${t || 'misc'}::${externalKey}`;
}

function normalize(items, source) {
  return items.map((q, i) => {
    const externalKey = (q.external_key ?? q.id ?? '').toUpperCase();
    const stem = q.stem ?? q.question;
    const choices = q.choices ?? q.options;
    const correctIndex = q.correct_index ?? q.correctIndex;
    let topicId = q.topic_id;
    let difficulty = q.difficulty;
    if (!topicId || !difficulty) {
      const tag = tagMap.get(externalKey);
      if (!tag) throw new Error(`No tag for ${externalKey} in ${source}`);
      topicId = topicId ?? tag.topic_id;
      difficulty = difficulty ?? tag.difficulty;
    }
    if (!externalKey || !stem || !Array.isArray(choices) || choices.length !== 4 || correctIndex == null) {
      throw new Error(`Invalid item at ${source}[${i}] key=${externalKey}`);
    }
    // Status model: drafts are not served; verified + trusted are.
    // JSON `status` is authoritative; legacy `active: false` maps to draft for backwards-compat.
    const status = q.status ?? (q.active === false ? 'draft' : 'trusted');
    if (!['draft', 'verified', 'trusted'].includes(status)) {
      throw new Error(`Invalid status "${status}" at ${source}[${i}] key=${externalKey}`);
    }
    const itemFamilyId = q.item_family_id ?? deriveFamily(externalKey, topicId, stem);
    return {
      external_key: externalKey,
      subtest: q.subtest,
      topic_id: topicId,
      difficulty,
      stem,
      choices,
      correct_index: correctIndex,
      explanation: q.explanation ?? '',
      status,
      active: status !== 'draft',
      item_family_id: itemFamilyId,
    };
  });
}

const all = [
  ...normalize(free, 'free-test'),
  ...normalize(b1, 'batch-1'),
  ...normalize(b2, 'batch-2'),
  ...normalize(b3, 'batch-3'),
  ...normalize(b4, 'batch-4'),
  ...normalize(b5, 'batch-5'),
  ...normalize(b6, 'batch-6'),
  ...normalize(b7, 'batch-7'),
  ...normalize(b8, 'batch-8'),
  ...normalize(b9, 'batch-9'),
  ...normalize(b10, 'batch-10'),
  ...normalize(b11, 'batch-11-math'),
  ...normalize(b12, 'batch-12-verbal'),
  ...normalize(b13, 'batch-13-gs'),
  ...normalize(b14, 'batch-14-ei'),
  ...normalize(b15, 'batch-15-as'),
  ...normalize(b16, 'batch-16-mc'),
  ...normalize(b17, 'batch-17-ao'),
  ...normalize(b18, 'batch-18-ar-curated'),
  ...normalize(b19, 'batch-19-mk-curated'),
  ...normalize(b20, 'batch-20-wk-curated'),
  ...normalize(b21, 'batch-21-pc-curated'),
  ...normalize(b22, 'batch-22-ar-deepen'),
  ...normalize(b23, 'batch-23-mk-deepen'),
  ...normalize(b24, 'batch-24-wk-deepen'),
  ...normalize(b25, 'batch-25-pc-deepen'),
  ...normalize(b26, 'batch-26-gs'),
  ...normalize(b27, 'batch-27-ei'),
  ...normalize(b28, 'batch-28-as'),
  ...normalize(b29, 'batch-29-mc'),
  ...normalize(b30, 'batch-30-wk'),
  ...normalize(b31, 'batch-31-ar'),
  ...normalize(b32, 'batch-32-mk'),
  ...normalize(b33, 'batch-33-pc'),
  ...normalize(b34, 'batch-34-ar'),
  ...normalize(b35, 'batch-35-mk'),
  ...normalize(b36, 'batch-36-wk'),
  ...normalize(b37, 'batch-37-pc'),
  ...expansionBatches.flatMap(eb => normalize(eb.items, eb.name)),
];

const seen = new Set();
for (const q of all) {
  if (seen.has(q.external_key)) throw new Error(`Duplicate external_key: ${q.external_key}`);
  seen.add(q.external_key);
}

const lines = [];
lines.push('-- Generated by scripts/build-questions-seed.mjs');
lines.push('-- Idempotent: deletes existing rows before insert.');
lines.push('begin;');
lines.push('delete from practice_questions;');
lines.push('insert into practice_questions (external_key, subtest, topic_id, difficulty, stem, choices, correct_index, explanation, active, status, item_family_id) values');
const valueLines = all.map(q =>
  `  (${sqlEscape(q.external_key)}, ${sqlEscape(q.subtest)}, ${sqlEscape(q.topic_id)}, ${q.difficulty}, ${sqlEscape(q.stem)}, ${jsonbEscape(q.choices)}, ${q.correct_index}, ${sqlEscape(q.explanation)}, ${q.active ? 'true' : 'false'}, ${sqlEscape(q.status)}, ${sqlEscape(q.item_family_id)})`
);
lines.push(valueLines.join(',\n') + ';');
lines.push('commit;');

const out = path.join(ROOT, 'supabase/seed-questions.sql');
fs.writeFileSync(out, lines.join('\n') + '\n');

const byTopic = {};
const byDifficulty = {1:0,2:0,3:0,4:0,5:0};
for (const q of all) {
  byTopic[q.topic_id] = (byTopic[q.topic_id] ?? 0) + 1;
  byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] ?? 0) + 1;
}
const byStatus = { draft: 0, verified: 0, trusted: 0 };
for (const q of all) byStatus[q.status]++;
console.log(`Wrote ${out} with ${all.length} questions across ${Object.keys(byTopic).length} topics.`);
console.log('Status:', byStatus, `(active=${all.filter(q => q.active).length})`);
console.log('Difficulty:', byDifficulty);
console.log('Topics with <3 items (still under-served):',
  Object.entries(byTopic).filter(([, n]) => n < 3).map(([t, n]) => `${t}=${n}`).join(', ') || 'none');

// --- item_family_id coverage check (AFQT must be 100%) ---
const isAfqt = t => /^(ar|mk|wk|pc)\./.test(t || '');
const afqtItems = all.filter(q => isAfqt(q.topic_id));
const afqtMissingFamily = afqtItems.filter(q => !q.item_family_id);
const families = new Set(all.map(q => q.item_family_id));
const afqtFamilies = new Set(afqtItems.map(q => q.item_family_id));
console.log(
  `item_family_id: ${all.length}/${all.length} items assigned; ${families.size} distinct families ` +
  `(AFQT: ${afqtItems.length} items in ${afqtFamilies.size} families, missing=${afqtMissingFamily.length})`
);
if (afqtMissingFamily.length) {
  throw new Error(`AFQT items missing item_family_id: ${afqtMissingFamily.map(q => q.external_key).join(', ')}`);
}

// --- AFQT active floor check: each AFQT topic needs >=12 active items with d1/d2/d3 coverage ---
const afqtActiveFloor = {};
for (const q of all) {
  if (!isAfqt(q.topic_id) || !q.active) continue;
  const f = (afqtActiveFloor[q.topic_id] ??= { total: 0, d1: 0, d2: 0, d3plus: 0 });
  f.total++;
  if (q.difficulty === 1) f.d1++;
  else if (q.difficulty === 2) f.d2++;
  else f.d3plus++;
}
console.log('\nAFQT active floor (target: >=12 total, with d1>=1, d2>=1, d3+>=1):');
const floorGaps = [];
for (const t of Object.keys(afqtActiveFloor).sort()) {
  const f = afqtActiveFloor[t];
  const ok = f.total >= 12 && f.d1 >= 1 && f.d2 >= 1 && f.d3plus >= 1;
  if (!ok) floorGaps.push(t);
  console.log(`  ${ok ? 'OK ' : 'GAP'} ${t.padEnd(30)} total=${String(f.total).padStart(3)} d1=${f.d1} d2=${f.d2} d3+=${f.d3plus}`);
}
console.log(floorGaps.length ? `Floor gaps remaining: ${floorGaps.join(', ')}` : 'All AFQT topics meet the active floor.');

// --- Non-AFQT active floor report (target: >=30 total, d1>=8, d2>=8, d3+>=8) ---
// Report-only (like the AFQT check) so routine rebuilds aren't blocked.
const isNonAfqt = t => /^(gs|ei|as|mc|ao)\./.test(t || '');
const nonAfqtFloor = {};
for (const q of all) {
  if (!isNonAfqt(q.topic_id) || !q.active) continue;
  const f = (nonAfqtFloor[q.topic_id] ??= { total: 0, d1: 0, d2: 0, d3plus: 0 });
  f.total++;
  if (q.difficulty === 1) f.d1++;
  else if (q.difficulty === 2) f.d2++;
  else f.d3plus++;
}
console.log('\nNon-AFQT active floor (target: >=30 total, with d1>=8, d2>=8, d3+>=8):');
const nonAfqtGaps = [];
for (const t of Object.keys(nonAfqtFloor).sort()) {
  const f = nonAfqtFloor[t];
  const ok = f.total >= 30 && f.d1 >= 8 && f.d2 >= 8 && f.d3plus >= 8;
  if (!ok) nonAfqtGaps.push(t);
  console.log(`  ${ok ? 'OK ' : 'GAP'} ${t.padEnd(30)} total=${String(f.total).padStart(3)} d1=${f.d1} d2=${f.d2} d3+=${f.d3plus}`);
}
console.log(nonAfqtGaps.length ? `Non-AFQT floor gaps remaining: ${nonAfqtGaps.join(', ')}` : 'All non-AFQT topics meet the active floor.');

// --- Emit bank-stats.json: single source of truth for marketing copy counts. ---
// Committed to the repo (npm run build does NOT run this generator, and CF Pages
// builds from the committed tree), so site copy auto-updates on every reseed.
const activeItems = all.filter(q => q.active);
const activeTopics = new Set(activeItems.map(q => q.topic_id));
const activeSubtests = new Set(activeItems.map(q => q.subtest));
const bankStats = {
  total: all.length,
  active: activeItems.length,
  afqtActive: activeItems.filter(q => isAfqt(q.topic_id)).length,
  topicCount: activeTopics.size,
  subtestCount: activeSubtests.size,
  generatedAt: new Date().toISOString().slice(0, 10),
};
const statsOut = path.join(ROOT, 'src/data/bank-stats.json');
fs.writeFileSync(statsOut, JSON.stringify(bankStats, null, 2) + '\n');
console.log(`\nWrote ${statsOut}:`, bankStats);
