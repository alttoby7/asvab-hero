import type { AsvabSubtest, SubtestScores } from "../types";

/**
 * Estimate standard scores (20–99) from diagnostic per-subtest results.
 * This is a rough linear mapping, real ASVAB uses norm-referenced scoring.
 * Useful for directional gap analysis, not official score prediction.
 */
export function estimateStandardScores(
  resultsBySubtest: Record<string, { seen: number; correct: number }>
): SubtestScores | null {
  const subtests: AsvabSubtest[] = ["GS", "AR", "WK", "PC", "MK", "EI", "AS", "MC", "AO"];
  const scores: Partial<SubtestScores> = {};
  let hasAny = false;

  for (const st of subtests) {
    const r = resultsBySubtest[st];
    if (!r || r.seen === 0) {
      scores[st] = 40;
      continue;
    }
    hasAny = true;
    const pct = r.correct / r.seen;
    scores[st] = Math.round(20 + pct * 79);
  }

  if (!hasAny) return null;
  return scores as SubtestScores;
}
