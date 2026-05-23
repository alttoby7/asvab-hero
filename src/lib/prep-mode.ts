/**
 * Prep-mode config — the single source of truth for how prep differs by
 * (test_type, branch). Initial ASVAB targets AFQT (enlistment); AFCT targets the
 * composite the branch uses to reclassify/retrain. Built for ALL branches:
 *
 *   Army / Marines (AFCT)        → GT      · focus AR/WK/PC · reclass/programs
 *   Air Force / Space Force(AFCT)→ General · focus AR/WK/PC · retraining
 *   Navy / Coast Guard (AFCT)    → no single composite → honest AFQT fallback
 *   (initial ASVAB, any branch)  → AFQT    · focus AR/MK/WK/PC · jobs/branches
 *
 * GT, Marines GT, and AF/SF General are all AR+WK+PC, so the four "VE+AR"
 * branches share one adaptive blueprint (drop MK). Only Army has real target
 * tiers; everyone else shows the computed score + "targets vary" (never fake cutoffs).
 */

import type { Branch, AsvabSubtest } from "@/types";

export type TestType = "initial_asvab" | "afct";
export type PrimaryMetric = "AFQT" | "GT" | "G";

const AFQT_SUBTESTS: AsvabSubtest[] = ["AR", "MK", "WK", "PC"];
const GT_SUBTESTS: AsvabSubtest[] = ["AR", "WK", "PC"]; // GT (Army/Marines) + General (AF/SF)

/** Branches whose AFCT reclass gate is AR+WK+PC (GT or MAGE-General). */
const VE_AR_BRANCHES = new Set<Branch>([
  "army",
  "marines",
  "air_force",
  "space_force",
]);

/** A parsed rating composite (Navy/CG): the formula + its weighted subtest demand. */
export interface RatingComposite {
  /** The raw composite formula, e.g. "VE+AR+MK+MC" — also the measurement key. */
  code: string;
  /** Human label for the surface, e.g. "AR+MK+EI+GS line score". */
  label: string;
  /** Required subtests (canonical order). */
  subtests: AsvabSubtest[];
  /** Weighted demand per subtest (VE=WK+PC; "2MK"→MK×2). */
  weights: Partial<Record<AsvabSubtest, number>>;
}

export interface PrepMode {
  testType: TestType;
  primaryMetric: PrimaryMetric;
  /** Display label, e.g. "AFQT", "GT", "General (G)". */
  metricLabel: string;
  /** Adaptive blueprint + weakest-subtest scope. */
  focusSubtests: AsvabSubtest[];
  /** Short goal phrase for copy, e.g. "the jobs you qualify for". */
  goalPhrase: string;
  /** Whether we have real target tiers to show (Army AFCT only). */
  hasTargets: boolean;
  /** False for Navy/CG AFCT with no chosen target rating — honest AFQT fallback. */
  branchSupported: boolean;
  /** Set for Navy/CG AFCT once a target rating's composite is known (S7). When
   *  present, prep drills this composite's subtests and the proxy uses its
   *  weighted equated sum; primaryMetric stays a coarse code for the union type. */
  ratingComposite?: RatingComposite | null;
}

const SUBTEST_CANON: AsvabSubtest[] = [
  "GS", "AR", "WK", "PC", "MK", "EI", "AS", "MC", "AO",
];

/**
 * Parse a Navy/CG composite formula into weighted subtest demand.
 *   "VE+AR+MK+MC" → { WK:1, PC:1, AR:1, MK:1, MC:1 }   (VE = WK+PC)
 *   "AR+2MK+GS"   → { AR:1, MK:2, GS:1 }                (numeric prefix multiplies)
 * Unknown tokens are skipped. Pure.
 */
export function parseComposite(
  formula: string
): Partial<Record<AsvabSubtest, number>> {
  const out: Partial<Record<AsvabSubtest, number>> = {};
  const add = (st: AsvabSubtest, w: number) => {
    out[st] = (out[st] ?? 0) + w;
  };
  for (const rawTok of String(formula).toUpperCase().split("+")) {
    const tok = rawTok.trim();
    if (!tok) continue;
    const m = tok.match(/^(\d*)([A-Z]+)$/);
    if (!m) continue;
    const mult = m[1] ? parseInt(m[1], 10) : 1;
    const code = m[2];
    if (code === "VE") {
      add("WK", mult);
      add("PC", mult);
      continue;
    }
    if ((SUBTEST_CANON as string[]).includes(code)) {
      add(code as AsvabSubtest, mult);
    }
  }
  return out;
}

/** Build a RatingComposite from a formula (+ optional display label). */
export function ratingCompositeFromFormula(
  code: string,
  label?: string
): RatingComposite | null {
  const weights = parseComposite(code);
  const subtests = SUBTEST_CANON.filter((st) => (weights[st] ?? 0) > 0);
  if (subtests.length === 0) return null;
  return { code, label: label ?? `${code} line score`, subtests, weights };
}

/**
 * Turn weighted demand into integer per-subtest item counts that sum to ~targetLen,
 * with a floor of 1 per required subtest so every composite subtest is drilled.
 * Returns a blueprint shape compatible with the adaptive selector.
 */
export function ratingBlueprint(
  weights: Partial<Record<AsvabSubtest, number>>,
  targetLen = 36
): Partial<Record<AsvabSubtest, number>> {
  const subs = SUBTEST_CANON.filter((st) => (weights[st] ?? 0) > 0);
  if (subs.length === 0) return {};
  const totalW = subs.reduce((a, st) => a + (weights[st] ?? 0), 0);
  const out: Partial<Record<AsvabSubtest, number>> = {};
  for (const st of subs) {
    out[st] = Math.max(1, Math.round(((weights[st] ?? 0) / totalW) * targetLen));
  }
  return out;
}

/** Army GT → program tiers (the only branch with real seeded targets). AR+WK+PC scale. */
export const ARMY_GT_TIERS: ReadonlyArray<{ threshold: number; label: string; programs: string }> = [
  { threshold: 110, label: "Elite", programs: "OCS, Warrant Officer, Green to Gold, 18X, CID (31D), Cyber (17C)" },
  { threshold: 107, label: "Advanced", programs: "PsyOps (37F), Civil Affairs (38B), Combat Medic (68W)" },
  { threshold: 105, label: "Technical", programs: "Cyber Network Defender (25D)" },
  { threshold: 100, label: "Professional", programs: "Human Resources (42A) and most clerical/admin" },
  { threshold: 95, label: "Skilled", programs: "Allied Trade Specialist (91E)" },
];

export function getPrepMode(
  testType: TestType | null,
  branch: Branch | null,
  /** Navy/CG only: the target rating's composite, when the user has picked one. */
  targetComposite?: RatingComposite | null
): PrepMode {
  const tt: TestType = testType ?? "initial_asvab";

  if (tt === "initial_asvab") {
    return {
      testType: "initial_asvab",
      primaryMetric: "AFQT",
      metricLabel: "AFQT",
      focusSubtests: AFQT_SUBTESTS,
      goalPhrase: "the jobs and branches you qualify for",
      hasTargets: true,
      branchSupported: true,
    };
  }

  // AFCT
  if (branch && VE_AR_BRANCHES.has(branch)) {
    const isGeneral = branch === "air_force" || branch === "space_force";
    return {
      testType: "afct",
      primaryMetric: isGeneral ? "G" : "GT",
      metricLabel: isGeneral ? "General (G)" : "GT",
      focusSubtests: GT_SUBTESTS,
      goalPhrase: isGeneral
        ? "retraining into a new AFSC"
        : "reclassification and the programs you want",
      // v1: GT/General are shown as a PROXY (equated AR+WK+PC), so no hard tier
      // qualification claims yet — see the GT-scale note. Real norming deferred.
      hasTargets: false,
      branchSupported: true,
    };
  }

  // Navy / Coast Guard under AFCT WITH a chosen target rating → drill that
  // rating's composite (S7). Shown as a PROXY (weighted equated sum), no
  // qualification claim. CG uses Navy scoring.
  if (
    (branch === "navy" || branch === "coast_guard") &&
    targetComposite &&
    targetComposite.subtests.length > 0
  ) {
    return {
      testType: "afct",
      primaryMetric: "AFQT", // coarse union code; ratingComposite carries the real metric
      metricLabel: targetComposite.label,
      focusSubtests: targetComposite.subtests,
      goalPhrase: "your rating's required line score",
      hasTargets: false,
      branchSupported: true,
      ratingComposite: targetComposite,
    };
  }

  // Navy / Coast Guard (or unknown branch) under AFCT with NO target rating —
  // honest AFQT fallback + nudge to pick a rating.
  return {
    testType: "afct",
    primaryMetric: "AFQT",
    metricLabel: "AFQT",
    focusSubtests: AFQT_SUBTESTS,
    goalPhrase: "your rating's required line scores",
    hasTargets: false,
    branchSupported: false,
    ratingComposite: null,
  };
}

export function getFocusSubtests(
  testType: TestType | null,
  branch: Branch | null
): AsvabSubtest[] {
  return getPrepMode(testType, branch).focusSubtests;
}

/**
 * Which adaptive variant to send the user to:
 *   - AFCT on a VE+AR branch          → `gt_adaptive`     (AR/WK/PC, drop MK)
 *   - AFCT Navy/CG with a target rating → `rating_adaptive` (weighted composite)
 *   - everyone else (initial ASVAB, Navy/CG without a rating) → `afqt_adaptive`
 */
export function adaptiveVariantForPrep(
  testType: TestType | null,
  branch: Branch | null,
  targetComposite?: RatingComposite | null
): "afqt_adaptive" | "gt_adaptive" | "rating_adaptive" {
  const pm = getPrepMode(testType, branch, targetComposite);
  if (pm.testType !== "afct" || !pm.branchSupported) return "afqt_adaptive";
  if (pm.ratingComposite) return "rating_adaptive";
  return "gt_adaptive";
}
