import type { SubtestScores, CompositeScores, BranchComposites, Branch } from "@/types";

/**
 * AFQT is computed from AR + MK + WK + PC.
 * Real AFQT is a percentile score derived from the Verbal Expression (VE) and math subtests.
 * VE = WK + PC (standard scores, then converted to a scaled VE score).
 * AFQT raw = 2×VE + AR + MK
 *
 * For our calculator we compute the raw composite and map it to approximate percentile ranges.
 * Standard scores range 20-62 per subtest. Max raw AFQT = 2*(62+62) + 62 + 62 = 372.
 * We normalize to 1-99 percentile.
 */
export function calculateAFQT(scores: SubtestScores): number {
  const ve = scores.WK + scores.PC;
  const raw = 2 * ve + scores.AR + scores.MK;

  // Approximate percentile mapping
  // Min possible: 2*(20+20) + 20 + 20 = 120
  // Max possible: 2*(62+62) + 62 + 62 = 372
  // Normalize to 1-99
  const normalized = Math.round(((raw - 120) / (372 - 120)) * 98 + 1);
  return Math.max(1, Math.min(99, normalized));
}

export function getAFQTCategory(afqt: number): string {
  if (afqt >= 93) return "I";
  if (afqt >= 65) return "II";
  if (afqt >= 50) return "IIIA";
  if (afqt >= 31) return "IIIB";
  if (afqt >= 21) return "IVA";
  if (afqt >= 16) return "IVB";
  if (afqt >= 10) return "IVC";
  return "V";
}

export function getAFQTCategoryDescription(cat: string): string {
  const descriptions: Record<string, string> = {
    I: "Outstanding — qualifies for all branches and jobs",
    II: "Excellent — qualifies for most jobs across all branches",
    IIIA: "Above Average — qualifies for most military jobs",
    IIIB: "Average — meets minimum for enlistment in all branches",
    IVA: "Below Average — limited job options, may require waiver",
    IVB: "Below Average — very limited options",
    IVC: "Well Below Average — generally not eligible",
    V: "Not eligible for military enlistment",
  };
  return descriptions[cat] || "";
}

/**
 * Army Line Scores — 10 composites computed from subtest standard scores.
 */
export function calculateArmyLineScores(scores: SubtestScores): CompositeScores {
  const ve = scores.WK + scores.PC;
  return {
    GT: scores.AR + ve,          // General Technical
    CL: ve + scores.AR + scores.MK, // Clerical
    CO: scores.AR + scores.AS + scores.MC, // Combat
    EL: scores.GS + scores.AR + scores.MK + scores.EI, // Electronics
    FA: scores.AR + scores.MK + scores.MC, // Field Artillery
    GM: scores.GS + scores.MC + scores.AS, // General Maintenance
    MM: scores.AS + scores.MC + scores.EI, // Mechanical Maintenance
    OF: ve + scores.AR + scores.MC, // Operators & Food
    SC: ve + scores.AR + scores.MK + scores.EI, // Surveillance & Communications
    ST: scores.GS + ve + scores.AR + scores.MK, // Skilled Technical
  };
}

/**
 * Air Force Composites — MAGE
 * M (Mechanical): MC + AS + GS
 * A (Administrative): WK + PC + MK
 * G (General): AR + WK + PC
 * E (Electronics): GS + AR + MK + EI
 */
export function calculateAirForceComposites(scores: SubtestScores): CompositeScores {
  return {
    M: scores.MC + scores.AS + scores.GS,    // Mechanical
    A: scores.WK + scores.PC + scores.MK,     // Administrative
    G: scores.AR + scores.WK + scores.PC,     // General
    E: scores.GS + scores.AR + scores.MK + scores.EI, // Electronics
  };
}

/**
 * Marine Corps Composites — 3 line scores
 * MM: AR + MC + AS + EI (Mechanical Maintenance)
 * GT: AR + WK + PC (General Technical)
 * EL: GS + AR + MK + EI (Electronics)
 */
export function calculateMarineComposites(scores: SubtestScores): CompositeScores {
  return {
    MM: scores.AR + scores.MC + scores.AS + scores.EI,
    GT: scores.AR + scores.WK + scores.PC,
    EL: scores.GS + scores.AR + scores.MK + scores.EI,
  };
}

/**
 * Navy uses individual subtest scores and some composites.
 * Common Navy composites referenced for ratings:
 * AR+MK+EI+GS (for technical ratings)
 * VE+AR+MK+MC (for mechanical ratings)
 * VE+MK (for admin ratings)
 * We return raw subtests plus the common composites.
 */
export function calculateNavyScores(scores: SubtestScores): CompositeScores {
  const ve = scores.WK + scores.PC;
  return {
    VE: ve,
    AR: scores.AR,
    MK: scores.MK,
    GS: scores.GS,
    EI: scores.EI,
    AS: scores.AS,
    MC: scores.MC,
    AO: scores.AO,
    "AR+MK+EI+GS": scores.AR + scores.MK + scores.EI + scores.GS,
    "VE+AR+MK+MC": ve + scores.AR + scores.MK + scores.MC,
    "VE+MK": ve + scores.MK,
    "VE+AR": ve + scores.AR,
  };
}

/**
 * Coast Guard uses same scoring as Navy.
 */
export function calculateCoastGuardScores(scores: SubtestScores): CompositeScores {
  return calculateNavyScores(scores);
}

/**
 * Space Force uses same MAGE composites as Air Force.
 */
export function calculateSpaceForceComposites(scores: SubtestScores): CompositeScores {
  return calculateAirForceComposites(scores);
}

/**
 * Calculate composites for all branches at once.
 */
export function calculateAllComposites(scores: SubtestScores): BranchComposites[] {
  const branches: { branch: Branch; branchName: string; fn: (s: SubtestScores) => CompositeScores }[] = [
    { branch: "army", branchName: "Army", fn: calculateArmyLineScores },
    { branch: "air_force", branchName: "Air Force", fn: calculateAirForceComposites },
    { branch: "marines", branchName: "Marines", fn: calculateMarineComposites },
    { branch: "navy", branchName: "Navy", fn: calculateNavyScores },
    { branch: "coast_guard", branchName: "Coast Guard", fn: calculateCoastGuardScores },
    { branch: "space_force", branchName: "Space Force", fn: calculateSpaceForceComposites },
  ];

  return branches.map(({ branch, branchName, fn }) => ({
    branch,
    branchName,
    composites: fn(scores),
  }));
}
