#!/usr/bin/env node
/**
 * Operator efficacy report — how much are we moving people's REAL ASVAB scores?
 *
 * Pulls get_official_score_efficacy() + get_official_score_coverage() (migration
 * 0046) with the service key and prints a readable summary. Official scores are
 * ground truth on both ends of the headline; the diagnostic-baseline segment is
 * estimated and labeled as such. On-demand, operator-only, read-only.
 *
 * Run:  node scripts/efficacy-report.mjs
 *
 * Reads ASVABHERO_SUPABASE_URL + ASVABHERO_SUPABASE_SECRET_KEY from the central
 * .env at /home/trisha/google-drive/0-AI/.env (with local .env fallback).
 *
 * Caveat printed every run: this is observed change among users who retook AND
 * logged scores — selection bias, not causal lift across the whole base. Always
 * read a gain next to its coverage denominator.
 */

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const CENTRAL_ENV = "/home/trisha/google-drive/0-AI/.env";
const LOCAL_ENV = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "..",
  ".env"
);

// Minimal .env loader (no dep). Later files do not override already-set keys.
function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    if (process.env[key] != null) continue;
    let val = m[2];
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}
loadEnv(CENTRAL_ENV);
loadEnv(LOCAL_ENV);

const SB_URL = process.env.ASVABHERO_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.ASVABHERO_SUPABASE_SECRET_KEY;

if (!SB_URL || !KEY) {
  console.error(
    "Missing ASVABHERO_SUPABASE_URL and/or ASVABHERO_SUPABASE_SECRET_KEY " +
      `(checked ${CENTRAL_ENV} and ${LOCAL_ENV}).`
  );
  process.exit(1);
}

const sb = createClient(SB_URL, KEY, { auth: { persistSession: false } });

const SMALL_N = 5; // below this, label results as directional (small sample)

const fmtPts = (n) => (n == null ? "—" : (n > 0 ? `+${n}` : `${n}`));
const fmtPct = (n) => (n == null ? "—" : `${n}%`);

function printSegment(title, note, rows) {
  console.log(`\n${title}`);
  if (note) console.log(`  ${note}`);
  if (!rows.length) {
    console.log("  no paired users yet");
    return;
  }
  // header
  console.log(
    "  " +
      ["exam_kind".padEnd(16), "n".padStart(6), "mean".padStart(7), "median".padStart(7), "≥+5".padStart(7), "≥+10".padStart(7)].join("  ")
  );
  for (const r of rows) {
    // flag small samples (n<5) with a trailing * — directional only.
    const nCell = `${r.n_users}${r.n_users < SMALL_N ? "*" : ""}`;
    console.log(
      "  " +
        [
          String(r.exam_kind).padEnd(16),
          nCell.padStart(6),
          fmtPts(r.mean_gain).padStart(7),
          fmtPts(r.median_gain).padStart(7),
          fmtPct(r.pct_improved_5plus).padStart(7),
          fmtPct(r.pct_improved_10plus).padStart(7),
        ].join("  ")
    );
  }
}

async function main() {
  const [{ data: eff, error: effErr }, { data: cov, error: covErr }] =
    await Promise.all([
      sb.rpc("get_official_score_efficacy"),
      sb.rpc("get_official_score_coverage"),
    ]);

  if (effErr) {
    console.error("get_official_score_efficacy failed:", effErr.message);
    process.exit(1);
  }
  if (covErr) {
    console.error("get_official_score_coverage failed:", covErr.message);
    process.exit(1);
  }

  const rows = eff ?? [];
  const o2o = rows.filter((r) => r.segment === "official_to_official");
  const d2o = rows.filter((r) => r.segment === "diagnostic_to_official");
  const o2oAll = o2o.find((r) => r.exam_kind === "ALL") ?? null;
  const c = (cov && cov[0]) || {
    n_users_with_official: 0,
    n_official_pairs: 0,
    n_diag_baseline_pairs: 0,
    n_unpaired: 0,
  };

  console.log("══════════════════════════════════════════════════════════════");
  console.log(" ASVAB Hero — official-score efficacy");
  console.log("══════════════════════════════════════════════════════════════");

  // Headline = official -> official, pooled across exam kinds.
  console.log("\nHEADLINE (official → official, ground truth on both ends)");
  if (o2oAll) {
    const small = o2oAll.n_users < SMALL_N ? "  [small sample, directional]" : "";
    console.log(
      `  Among users who logged 2+ official AFQT scores, median official AFQT ` +
        `gain was ${fmtPts(o2oAll.median_gain)} points (n=${o2oAll.n_users}); ` +
        `${fmtPct(o2oAll.pct_improved_5plus)} gained 5+, ` +
        `${fmtPct(o2oAll.pct_improved_10plus)} gained 10+. ` +
        `Mean ${fmtPts(o2oAll.mean_gain)}.${small}`
    );
  } else {
    console.log("  No user has logged 2+ official scores yet — no headline.");
  }

  // Coverage / denominators.
  console.log("\nCOVERAGE (read the headline against this)");
  console.log(
    `  ${c.n_official_pairs} of ${c.n_users_with_official} users with any logged ` +
      `official score had an official→official pair; ${c.n_diag_baseline_pairs} ` +
      `more had a practice-diagnostic baseline before their official score; ` +
      `${c.n_unpaired} unpaired (single official, no prior anchor).`
  );

  printSegment(
    "SEGMENT — official → official (headline detail, by exam kind)",
    null,
    o2o
  );
  printSegment(
    "SEGMENT — diagnostic → official (SUPPORTING, estimated baseline)",
    "Practice diagnostic is an estimate; treat as directional, not ground truth.",
    d2o
  );

  console.log(
    "\nCaveat: observed change among users who retook AND logged scores " +
      "(selection bias), not causal lift across all users. * = small sample (n<5), directional only."
  );
  console.log("");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
