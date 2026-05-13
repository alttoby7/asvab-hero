#!/usr/bin/env node
// One-shot: apply subagent rewrite explanations for the 7 remaining flagged PA items.
// AO-PA-B7-16 already fixed manually (also got a correct_index change).
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const rewrites = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/_ao-rewrites.json'), 'utf8'));

const PA_KEYS = new Set([
  'AO-PA-B7-5', 'AO-PA-B7-8', 'AO-PA-B7-10', 'AO-PA-B7-12',
  'AO-PA-B7-13', 'AO-PA-B7-14', 'AO-PA-B7-17',
]);

const b7Path = path.join(ROOT, 'src/data/practice-tests/expansion-batch-7.json');
const b7 = JSON.parse(fs.readFileSync(b7Path, 'utf8'));

let applied = 0;
for (const r of rewrites) {
  if (!PA_KEYS.has(r.external_key)) continue;
  if (!r.new_explanation) continue;
  const item = b7.find(it => (it.external_key || '').toUpperCase() === r.external_key);
  if (!item) { console.error('MISSING', r.external_key); continue; }
  item.explanation = r.new_explanation;
  applied++;
}

fs.writeFileSync(b7Path, JSON.stringify(b7, null, 2) + '\n');
console.log(`Applied ${applied} PA explanations`);
