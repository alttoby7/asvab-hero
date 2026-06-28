#!/usr/bin/env node
// Apply explanation rewrites from a manifest into the practice-test JSONs.
// Usage: node scripts/apply-rewrites.mjs <rewrites.json>
// Skips items where needs_correct_index_review is true (those need human review).
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const manifestPath = process.argv[2];
if (!manifestPath) {
  console.error('Usage: node scripts/apply-rewrites.mjs <path-to-rewrites.json>');
  process.exit(1);
}
const rewrites = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// file label → on-disk path
const FILES = {
  free: 'src/data/practice-tests/free-test.json',
  b1: 'src/data/practice-tests/expansion-batch-1.json',
  b2: 'src/data/practice-tests/expansion-batch-2.json',
  b3: 'src/data/practice-tests/expansion-batch-3.json',
  b4: 'src/data/practice-tests/expansion-batch-4.json',
  b5: 'src/data/practice-tests/expansion-batch-5.json',
  b6: 'src/data/practice-tests/expansion-batch-6.json',
  b7: 'src/data/practice-tests/expansion-batch-7.json',
};

// Build key → file index for fast lookup.
const fileData = {};
const keyIndex = new Map(); // KEY -> {fileLabel, idx, container}
for (const [label, rel] of Object.entries(FILES)) {
  const full = path.join(ROOT, rel);
  const raw = JSON.parse(fs.readFileSync(full, 'utf8'));
  fileData[label] = { raw, path: full };
  const items = Array.isArray(raw) ? raw : raw.questions;
  items.forEach((q, i) => {
    const k = (q.external_key ?? q.id ?? '').toUpperCase();
    keyIndex.set(k, { label, idx: i });
  });
}

let applied = 0, skipped = 0, missing = 0;
const skippedItems = [];
for (const r of rewrites) {
  if (r.needs_correct_index_review) {
    skipped++;
    skippedItems.push(r.external_key);
    continue;
  }
  const key = r.external_key.toUpperCase();
  const loc = keyIndex.get(key);
  if (!loc) {
    console.error(`MISSING: ${key} not found in any file`);
    missing++;
    continue;
  }
  const { raw } = fileData[loc.label];
  const items = Array.isArray(raw) ? raw : raw.questions;
  items[loc.idx].explanation = r.new_explanation;
  applied++;
}

// Write back each modified file.
for (const [label, { raw, path: full }] of Object.entries(fileData)) {
  fs.writeFileSync(full, JSON.stringify(raw, null, 2) + '\n');
}

console.log(`Applied: ${applied}`);
console.log(`Skipped (needs review): ${skipped}`);
console.log(`Missing: ${missing}`);
if (skippedItems.length) console.log(`Skipped keys: ${skippedItems.join(', ')}`);
