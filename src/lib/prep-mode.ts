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
  /** False for Navy/CG under AFCT — honest fallback, no branch composite target. */
  branchSupported: boolean;
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
  branch: Branch | null
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

  // Navy / Coast Guard (or unknown branch) under AFCT — honest fallback.
  return {
    testType: "afct",
    primaryMetric: "AFQT",
    metricLabel: "AFQT",
    focusSubtests: AFQT_SUBTESTS,
    goalPhrase: "your rating's required line scores",
    hasTargets: false,
    branchSupported: false,
  };
}

export function getFocusSubtests(
  testType: TestType | null,
  branch: Branch | null
): AsvabSubtest[] {
  return getPrepMode(testType, branch).focusSubtests;
}

/**
 * Which adaptive variant to send the user to. AFCT users on the four VE+AR
 * branches get `gt_adaptive` (AR/WK/PC, drop MK); everyone else (initial ASVAB,
 * or Navy/CG until S7) gets `afqt_adaptive`.
 */
export function adaptiveVariantForPrep(
  testType: TestType | null,
  branch: Branch | null
): "afqt_adaptive" | "gt_adaptive" {
  const pm = getPrepMode(testType, branch);
  return pm.testType === "afct" && pm.branchSupported
    ? "gt_adaptive"
    : "afqt_adaptive";
}
