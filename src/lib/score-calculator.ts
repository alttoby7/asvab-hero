import type { SubtestScores, CompositeScores, BranchComposites, Branch } from "@/types";

/**
 * AFQT percentile via PAY97 lookup table.
 *
 * Source: DMDC "Development and Evaluation of the 1997 ASVAB Score Scale" (July 2004), Table 2.5.
 * The Profile of American Youth 1997 (PAY97) norming study established the official conversion
 * from raw AFQT scores to percentiles. The distribution is bell-curved — not linear.
 *
 * Formula: VE = WK + PC (Verbal Expression); raw = 2×VE + AR + MK
 *
 * Standard scores from ASVAB score reports run 20–99. The PAY97 table was normed on equated
 * scores (effective range ~20–62). We linearly remap standard → equated before lookup so that
 * a score of 50 (the military-applicant mean) yields a realistic percentile (~66th) rather than
 * appearing at 99th percentile.
 */

// PAY97 Table 2.5: [minRaw, maxRaw, percentile]
// Note: percentiles 37, 58, and 65 do not appear — those raw score ranges don't exist in the data.
const PAY97_RANGES: ReadonlyArray<readonly [number, number, number]> = [
  [Number.NEGATIVE_INFINITY, 109, 1],
  [110, 118, 2],  [119, 124, 3],  [125, 133, 4],  [134, 137, 5],
  [138, 141, 6],  [142, 145, 7],  [146, 147, 8],  [148, 151, 9],
  [152, 153, 10], [154, 156, 11], [157, 157, 12], [158, 159, 13],
  [160, 160, 14], [161, 162, 15], [163, 164, 16], [165, 166, 17],
  [167, 167, 18], [168, 169, 19], [170, 170, 20], [171, 171, 21],
  [172, 173, 22], [174, 174, 23], [175, 175, 24], [176, 177, 25],
  [178, 178, 26], [179, 179, 27], [180, 180, 28], [181, 181, 29],
  [182, 182, 30], [183, 183, 31], [184, 184, 32], [185, 185, 33],
  [186, 186, 34], [187, 188, 35], [189, 189, 36], [190, 190, 38],
  [191, 191, 39], [192, 192, 40], [193, 193, 41], [194, 194, 42],
  [195, 195, 43], [196, 196, 44], [197, 197, 45], [198, 198, 46],
  [199, 199, 47], [200, 200, 48], [201, 201, 49], [202, 202, 50],
  [203, 203, 51], [204, 204, 52], [205, 205, 53], [206, 206, 54],
  [207, 207, 55], [208, 208, 56], [209, 209, 57], [210, 210, 59],
  [211, 211, 60], [212, 212, 61], [213, 213, 62], [214, 214, 63],
  [215, 215, 64], [216, 216, 66], [217, 217, 67], [218, 218, 68],
  [219, 219, 69], [220, 221, 70], [222, 222, 71], [223, 223, 72],
  [224, 224, 73], [225, 225, 74], [226, 226, 75], [227, 227, 76],
  [228, 228, 77], [229, 229, 78], [230, 230, 79], [231, 231, 80],
  [232, 232, 81], [233, 234, 82], [235, 235, 83], [236, 236, 84],
  [237, 238, 85], [239, 239, 86], [240, 240, 87], [241, 242, 88],
  [243, 243, 89], [244, 245, 90], [246, 246, 91], [247, 248, 92],
  [249, 251, 93], [252, 253, 94], [254, 256, 95], [257, 259, 96],
  [260, 263, 97], [264, 268, 98], [269, Number.POSITIVE_INFINITY, 99],
];

function afqtPercentileFromRaw(raw: number): number {
  for (const [min, max, pct] of PAY97_RANGES) {
    if (raw >= min && raw <= max) return pct;
  }
  return 99;
}

export function calculateAFQT(scores: SubtestScores): number {
  // Remap standard scores (20-99) to PAY97 equated scale (20-62) linearly.
  // This ensures a score of 50 (military-applicant mean) yields ~66th percentile
  // rather than collapsing near the 99th percentile ceiling.
  const toEquated = (v: number) => {
    const s = Math.min(99, Math.max(20, v));
    return Math.round(20 + (s - 20) * 42 / 79);
  };
  const ve = toEquated(scores.WK) + toEquated(scores.PC);
  const raw = 2 * ve + toEquated(scores.AR) + toEquated(scores.MK);
  return afqtPercentileFromRaw(raw);
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
 * Navy uses individual subtest scores and composites called "line scores."
 * Each rating specifies one or more composite formulas with a minimum combined score.
 * We compute all composites used across Navy ratings so the job-matcher can evaluate any requirement.
 */
export function calculateNavyScores(scores: SubtestScores): CompositeScores {
  const ve = scores.WK + scores.PC;
  return {
    // Individual subtests
    VE: ve,
    AR: scores.AR,
    MK: scores.MK,
    GS: scores.GS,
    EI: scores.EI,
    AS: scores.AS,
    MC: scores.MC,
    AO: scores.AO,

    // 2-subtest composites
    "VE+AR": ve + scores.AR,
    "VE+MK": ve + scores.MK,
    "VE+GS": ve + scores.GS,
    "AR+MK": scores.AR + scores.MK,

    // 3-subtest composites
    "VE+MK+GS": ve + scores.MK + scores.GS,
    "AR+MC+AS": scores.AR + scores.MC + scores.AS,
    "GS+MC+EI": scores.GS + scores.MC + scores.EI,
    "MK+EI+GS": scores.MK + scores.EI + scores.GS,
    "VE+MC+AS": ve + scores.MC + scores.AS,
    "AR+MC+AS+EI": scores.AR + scores.MC + scores.AS + scores.EI,

    // 4-subtest composites
    "AR+MK+EI+GS": scores.AR + scores.MK + scores.EI + scores.GS,
    "AR+2MK+GS": scores.AR + 2 * scores.MK + scores.GS,
    "VE+AR+MK+MC": ve + scores.AR + scores.MK + scores.MC,
    "VE+AR+MK+AS": ve + scores.AR + scores.MK + scores.AS,
    "VE+AR+MK+GS": ve + scores.AR + scores.MK + scores.GS,
    "VE+AR+MK+AO": ve + scores.AR + scores.MK + scores.AO,
    "VE+AR+MK+EI": ve + scores.AR + scores.MK + scores.EI,
    "AR+MK+MC+VE": scores.AR + scores.MK + scores.MC + ve,
    "AR+GS+MC+EI": scores.AR + scores.GS + scores.MC + scores.EI,
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
