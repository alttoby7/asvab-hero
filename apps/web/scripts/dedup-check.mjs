#!/usr/bin/env node
// Dedup gate for the practice question bank.
//
// Two modes:
//   --export-forbidden        Writes docs/dedup-forbidden.json:
//                             - WK head-words already in use
//                             - AR/MK template item_family_id slugs
//                             - sample normalized stems per topic
//   --check [batch globs]     Loads existing corpus + new batches, flags exact
//                             (normStem hash) and near-dup (Jaccard >=0.82)
//                             collisions within each subtest, plus WK head-word
//                             reuse (HARD block). Writes
//                             docs/question-bank-dups.json and exits non-zero
//                             if anything was flagged.
//
// No external deps; pure Node. Same field schema as build-questions-seed.mjs.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TESTS_DIR = path.join(ROOT, 'src/data/practice-tests');
const DOCS_DIR = path.join(ROOT, 'docs');

const NEAR_DUP_JACCARD = 0.82;
const TEMPLATE_SATURATION_CAP = 12;

function listBatchFiles() {
  // free-test + every expansion-batch-*.json, sorted by batch number for stable order.
  const files = fs.readdirSync(TESTS_DIR).filter(f => f.endsWith('.json'));
  const free = files.filter(f => f === 'free-test.json');
  const batches = files
    .filter(f => /^expansion-batch-/.test(f))
    .map(f => {
      const m = f.match(/^expansion-batch-(\d+)/);
      return { name: f, num: m ? Number(m[1]) : 0 };
    })
    .sort((a, b) => a.num - b.num)
    .map(b => b.name);
  return [...free, ...batches];
}

function loadFile(name) {
  const raw = JSON.parse(fs.readFileSync(path.join(TESTS_DIR, name), 'utf8'));
  return Array.isArray(raw) ? raw : raw.questions;
}

// ---------- normalization ----------

function normStem(rawStem, subtest) {
  let s = String(rawStem || '');
  // PC items embed a passage in the stem. We compress the passage to "first 12 tokens"
  // plus everything after the last blank line (the question), so near-dup detection
  // catches reused passages without being thrown off by minor wording changes.
  if (subtest === 'PC' && /\n\s*\n/.test(s)) {
    const parts = s.split(/\n\s*\n/);
    const question = parts[parts.length - 1] || '';
    const passage = parts.slice(0, -1).join(' ');
    const head = passage.trim().split(/\s+/).slice(0, 12).join(' ');
    s = `${head}  ${question}`;
  }
  s = s.toLowerCase();
  s = s.replace(/\d+/g, '#');                       // digit runs -> #
  s = s.replace(/[^\p{L}\p{N}#\s]/gu, ' ');         // strip punctuation, keep letters/digits/#
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function tokenSet(normalized) {
  // Drop very common stop tokens that survive normalization; they inflate Jaccard.
  const STOP = new Set([
    'the', 'a', 'an', 'of', 'in', 'on', 'at', 'to', 'for', 'and', 'or', 'is',
    'are', 'was', 'were', 'be', 'by', 'with', 'as', 'from', 'that', 'this',
    'it', 'its', 'his', 'her', 'their', 'which', 'who', 'what', 'how',
  ]);
  const toks = normalized.split(' ').filter(t => t && t.length > 1 && !STOP.has(t));
  return new Set(toks);
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}

// WK items put the target word in ALL CAPS in the stem (e.g. "ABATE most nearly means:").
// Same logic as build-questions-seed.mjs deriveFamily().
function wkHeadWord(stem) {
  const caps = (String(stem || '').match(/\b[A-Z]{4,}\b/g) || [])
    .filter(w => !['ASVAB', 'WORD', 'MOST', 'NEARLY', 'MEANS', 'TRAP', 'WHICH', 'SENTENCE'].includes(w));
  return caps.length ? caps[0].toLowerCase() : null;
}

// ---------- corpus loading ----------

function loadCorpus(batchNames) {
  const items = [];
  for (const f of batchNames) {
    const raw = loadFile(f);
    for (const q of raw) {
      const externalKey = (q.external_key ?? q.id ?? '').toUpperCase();
      const stem = q.stem ?? q.question;
      const subtest = q.subtest;
      const topicId = q.topic_id;
      const familyId = q.item_family_id;
      const norm = normStem(stem, subtest);
      items.push({
        external_key: externalKey,
        file: f,
        subtest,
        topic_id: topicId,
        item_family_id: familyId,
        stem,
        norm,
        tokens: tokenSet(norm),
        wk_head: subtest === 'WK' ? wkHeadWord(stem) : null,
      });
    }
  }
  return items;
}

// ---------- modes ----------

function modeExportForbidden() {
  const allFiles = listBatchFiles();
  const corpus = loadCorpus(allFiles);
  const wkHeads = new Set();
  const familySlugs = new Set();
  const familyCounts = new Map();
  const stemSamplesByTopic = new Map();

  for (const it of corpus) {
    if (it.subtest === 'WK' && it.wk_head) wkHeads.add(it.wk_head);
    if (it.item_family_id) {
      familySlugs.add(it.item_family_id);
      familyCounts.set(it.item_family_id, (familyCounts.get(it.item_family_id) ?? 0) + 1);
    }
    if (it.topic_id) {
      const arr = stemSamplesByTopic.get(it.topic_id) ?? [];
      if (arr.length < 8) arr.push(it.stem);
      stemSamplesByTopic.set(it.topic_id, arr);
    }
  }

  const saturatedFamilies = [...familyCounts.entries()]
    .filter(([, n]) => n >= TEMPLATE_SATURATION_CAP)
    .sort((a, b) => b[1] - a[1])
    .map(([slug, n]) => ({ slug, count: n }));

  const out = {
    generated_at: new Date().toISOString().slice(0, 10),
    corpus_size: corpus.length,
    wk_head_words_in_use: [...wkHeads].sort(),
    item_family_slugs: [...familySlugs].sort(),
    saturated_families: saturatedFamilies,
    stem_samples_by_topic: Object.fromEntries(
      [...stemSamplesByTopic.entries()].sort(([a], [b]) => a.localeCompare(b))
    ),
  };
  const outPath = path.join(DOCS_DIR, 'dedup-forbidden.json');
  fs.mkdirSync(DOCS_DIR, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
  console.log(`Wrote ${outPath}`);
  console.log(`  corpus: ${corpus.length} items`);
  console.log(`  WK head-words in use: ${wkHeads.size}`);
  console.log(`  item_family slugs: ${familySlugs.size}`);
  console.log(`  saturated families (>= ${TEMPLATE_SATURATION_CAP}): ${saturatedFamilies.length}`);
}

function resolveBatchArgs(args) {
  if (!args.length) {
    // default: all batches (treat all as "existing")
    return { existing: listBatchFiles(), newBatches: [] };
  }
  // explicit batch names — these are the "new" batches; everything else is existing.
  const all = listBatchFiles();
  const newSet = new Set(args.map(a => path.basename(a)));
  // verify each new batch exists
  for (const n of newSet) {
    if (!all.includes(n)) {
      console.error(`Unknown batch file: ${n}`);
      process.exit(2);
    }
  }
  const existing = all.filter(f => !newSet.has(f));
  return { existing, newBatches: [...newSet] };
}

function modeCheck(args) {
  const { existing, newBatches } = resolveBatchArgs(args);
  if (!newBatches.length) {
    console.log('No new batches passed. Running full self-check across all batches.');
  } else {
    console.log(`Checking ${newBatches.length} new batches against ${existing.length} existing.`);
  }

  const existingItems = loadCorpus(existing);
  const newItems = loadCorpus(newBatches.length ? newBatches : []);
  // For self-check mode (no new batches), compare each item to everything BEFORE it.
  const selfMode = !newBatches.length;
  const targetItems = selfMode ? existingItems : newItems;
  const checkAgainst = selfMode ? null : existingItems;

  // Index existing by subtest for O(N*M_subtest) fuzzy compare instead of O(N*N).
  const existingBySubtest = new Map();
  if (!selfMode) {
    for (const it of existingItems) {
      const arr = existingBySubtest.get(it.subtest) ?? [];
      arr.push(it);
      existingBySubtest.set(it.subtest, arr);
    }
  }

  // Index new items by subtest for new-vs-new comparison too.
  const newBySubtest = new Map();
  for (const it of targetItems) {
    const arr = newBySubtest.get(it.subtest) ?? [];
    arr.push(it);
    newBySubtest.set(it.subtest, arr);
  }

  // WK head-words already in use (for hard block on new WK items).
  // In selfMode we don't pre-seed the in-use set, because every item would find
  // its own headword. We rely on the "seenThisRun" map (with strict-earlier
  // ordering) so each WK collision is reported exactly once, on the LATER item.
  const wkHeadsInUse = new Set();
  if (!selfMode) {
    for (const it of existingItems) {
      if (it.subtest === 'WK' && it.wk_head) wkHeadsInUse.add(it.wk_head);
    }
  }
  const wkHeadsSeenThisRun = new Map();  // word -> first item that introduced it

  const flagged = [];

  function flagOne(item, kind, detail) {
    flagged.push({
      external_key: item.external_key,
      file: item.file,
      subtest: item.subtest,
      topic_id: item.topic_id,
      kind,
      detail,
      stem: item.stem,
    });
  }

  for (const item of targetItems) {
    // 1) WK head-word reuse (hard block)
    if (item.subtest === 'WK' && item.wk_head) {
      if (wkHeadsInUse.has(item.wk_head)) {
        flagOne(item, 'wk-headword-reused-existing', { word: item.wk_head });
      } else if (wkHeadsSeenThisRun.has(item.wk_head)) {
        const prev = wkHeadsSeenThisRun.get(item.wk_head);
        flagOne(item, 'wk-headword-reused-new', { word: item.wk_head, conflicts_with: prev.external_key });
      } else {
        wkHeadsSeenThisRun.set(item.wk_head, item);
      }
    }

    // 2) Exact normStem collision + 3) Jaccard near-dup, scoped within subtest.
    if (!selfMode) {
      const peers = existingBySubtest.get(item.subtest) ?? [];
      for (const e of peers) {
        if (e.norm && e.norm === item.norm) {
          flagOne(item, 'exact-stem-existing', {
            conflicts_with: e.external_key,
            existing_file: e.file,
          });
          break;
        }
        if (item.tokens.size && e.tokens.size) {
          const j = jaccard(item.tokens, e.tokens);
          if (j >= NEAR_DUP_JACCARD) {
            flagOne(item, 'near-dup-existing', {
              conflicts_with: e.external_key,
              jaccard: Number(j.toFixed(3)),
              existing_file: e.file,
            });
            break;
          }
        }
      }
    }

    // new-vs-new (also runs in selfMode for full audit)
    const newPeers = newBySubtest.get(item.subtest) ?? [];
    for (const o of newPeers) {
      if (o === item) continue;
      // Avoid double-flagging the same pair: only compare to items that come strictly later
      if (o.external_key <= item.external_key) continue;
      if (o.norm && o.norm === item.norm) {
        flagOne(item, 'exact-stem-new', { conflicts_with: o.external_key });
        break;
      }
      if (item.tokens.size && o.tokens.size) {
        const j = jaccard(item.tokens, o.tokens);
        if (j >= NEAR_DUP_JACCARD) {
          flagOne(item, 'near-dup-new', {
            conflicts_with: o.external_key,
            jaccard: Number(j.toFixed(3)),
          });
          break;
        }
      }
    }
  }

  const outPath = path.join(DOCS_DIR, 'question-bank-dups.json');
  fs.mkdirSync(DOCS_DIR, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({
    generated_at: new Date().toISOString().slice(0, 10),
    new_batches: newBatches,
    flagged_count: flagged.length,
    by_kind: flagged.reduce((acc, f) => {
      acc[f.kind] = (acc[f.kind] ?? 0) + 1;
      return acc;
    }, {}),
    flagged,
  }, null, 2) + '\n');

  console.log(`\nFlagged ${flagged.length} items. Report: ${outPath}`);
  if (flagged.length) {
    const byKind = {};
    for (const f of flagged) byKind[f.kind] = (byKind[f.kind] ?? 0) + 1;
    console.log('  by kind:', byKind);
    process.exit(1);
  }
  console.log('No collisions or near-duplicates.');
}

// ---------- dispatch ----------

const argv = process.argv.slice(2);
if (argv.includes('--export-forbidden')) {
  modeExportForbidden();
} else {
  const checkIdx = argv.indexOf('--check');
  const args = checkIdx >= 0 ? argv.slice(checkIdx + 1) : argv;
  modeCheck(args);
}
