import type {
  PracticeQuestion,
  UserAnswer,
  SubtestResult,
  AsvabSubtest,
  SubtestScores,
  TopicResult,
} from "@/types";
import { ALL_SUBTESTS } from "@/types";
import {
  calculateAFQT,
  getAFQTCategory,
  standardToEquated,
} from "./score-calculator";
import type { PrimaryMetric } from "./prep-mode";

/**
 * Per-topic scoring. Mirrors `scoreBySubtest` but groups by `topic_id`,
 * which is read from the question's `topicId` field if present (set by the
 * sampler when fetching from Supabase). Falls back to subtest as topic_id
 * for legacy local questions that haven't been tagged.
 */
export function scoreByTopic(
  questions: PracticeQuestion[],
  answers: UserAnswer[]
): TopicResult[] {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.selectedIndex]));
  const grouped = new Map<
    string,
    { topic_id: string; subtest: AsvabSubtest; seen: number; correct: number }
  >();

  for (const q of questions) {
    const topicId = q.topicId ?? q.subtest; // graceful fallback for untagged
    const entry =
      grouped.get(topicId) ??
      { topic_id: topicId, subtest: q.subtest, seen: 0, correct: 0 };
    entry.seen += 1;
    if (answerMap.get(q.id) === q.correctIndex) entry.correct += 1;
    grouped.set(topicId, entry);
  }

  return Array.from(grouped.values()).map((g) => ({
    topic_id: g.topic_id,
    subtest: g.subtest,
    seen: g.seen,
    correct: g.correct,
    percentage: g.seen > 0 ? Math.round((g.correct / g.seen) * 100) : 0,
  }));
}

export function scoreBySubtest(
  questions: PracticeQuestion[],
  answers: UserAnswer[]
): SubtestResult[] {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.selectedIndex]));

  const grouped = new Map<AsvabSubtest, { correct: number; total: number }>();
  for (const st of ALL_SUBTESTS) {
    grouped.set(st, { correct: 0, total: 0 });
  }

  for (const q of questions) {
    const entry = grouped.get(q.subtest)!;
    entry.total++;
    const selected = answerMap.get(q.id);
    if (selected === q.correctIndex) {
      entry.correct++;
    }
  }

  return ALL_SUBTESTS.map((subtest) => {
    const { correct, total } = grouped.get(subtest)!;
    return {
      subtest,
      correct,
      total,
      percentage: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  });
}

/**
 * Estimate AFQT from practice test results.
 * Maps each subtest's percentage correct to an approximate standard score (20-62 range),
 * then feeds into the real calculateAFQT function.
 * Clearly an estimate since we only have 3-4 questions per subtest.
 */
export function estimateAFQT(subtestResults: SubtestResult[]): {
  score: number;
  category: string;
} {
  const resultMap = new Map(subtestResults.map((r) => [r.subtest, r]));

  // With only 3-4 questions per subtest, raw percentages are noisy.
  // Regress toward the population mean (standard score 50) based on
  // sample size. confidence = seen/15 so 3-4 questions ≈ 0.2-0.27.
  // This prevents every diagnostic from producing AFQT 99.
  const toScore = (pct: number, seen: number): number => {
    const rawScore = 20 + (pct / 100) * 79;
    const mean = 50;
    const confidence = Math.min(seen / 15, 1);
    return Math.round(mean + (rawScore - mean) * confidence);
  };

  const scores: SubtestScores = {
    GS: toScore(resultMap.get("GS")?.percentage ?? 0, resultMap.get("GS")?.total ?? 0),
    AR: toScore(resultMap.get("AR")?.percentage ?? 0, resultMap.get("AR")?.total ?? 0),
    WK: toScore(resultMap.get("WK")?.percentage ?? 0, resultMap.get("WK")?.total ?? 0),
    PC: toScore(resultMap.get("PC")?.percentage ?? 0, resultMap.get("PC")?.total ?? 0),
    MK: toScore(resultMap.get("MK")?.percentage ?? 0, resultMap.get("MK")?.total ?? 0),
    EI: toScore(resultMap.get("EI")?.percentage ?? 0, resultMap.get("EI")?.total ?? 0),
    AS: toScore(resultMap.get("AS")?.percentage ?? 0, resultMap.get("AS")?.total ?? 0),
    MC: toScore(resultMap.get("MC")?.percentage ?? 0, resultMap.get("MC")?.total ?? 0),
    AO: toScore(resultMap.get("AO")?.percentage ?? 0, resultMap.get("AO")?.total ?? 0),
  };

  const afqt = calculateAFQT(scores);
  return { score: afqt, category: getAFQTCategory(afqt) };
}

/**
 * Prep-mode primary metric from a completed test. AFQT = percentile (banded).
 * GT / General = an equated AR+WK+PC PROXY (same equated scale as the trajectory
 * composites, consistent for within-cohort delta; NOT an official GT/MAGE score
 * and NOT compared to qualification tiers). Reuses estimateAFQT's regressed
 * standard scores so noisy 3-4-question subtests don't spike the proxy.
 */
export function estimatePrimaryMetric(
  subtestResults: SubtestResult[],
  metric: PrimaryMetric
): { score: number; label: string; category: string | null } {
  if (metric === "AFQT") {
    const a = estimateAFQT(subtestResults);
    return { score: a.score, label: "AFQT", category: a.category };
  }
  const resultMap = new Map(subtestResults.map((r) => [r.subtest, r]));
  const toScore = (pct: number, seen: number): number => {
    const raw = 20 + (pct / 100) * 79;
    const confidence = Math.min(seen / 15, 1);
    return Math.round(50 + (raw - 50) * confidence);
  };
  const eq = (st: AsvabSubtest) =>
    standardToEquated(
      toScore(resultMap.get(st)?.percentage ?? 0, resultMap.get(st)?.total ?? 0)
    );
  // GT (Army/Marines) and General (AF/SF) are both AR+WK+PC.
  const score = eq("AR") + eq("WK") + eq("PC");
  return { score, label: metric === "G" ? "General (G)" : "GT", category: null };
}

/**
 * Navy/CG rating composite PROXY (S7), the weighted sum of equated subtest
 * scores per a parsed composite (e.g. {WK:1,PC:1,AR:1,MK:1,MC:1} for VE+AR+MK+MC).
 * Same equated scale as the trajectory composites (within-cohort comparable);
 * NOT an official line score and NOT compared to qualification minimums.
 */
export function estimateRatingComposite(
  subtestResults: SubtestResult[],
  weights: Partial<Record<AsvabSubtest, number>>
): number {
  const resultMap = new Map(subtestResults.map((r) => [r.subtest, r]));
  const toScore = (pct: number, seen: number): number => {
    const raw = 20 + (pct / 100) * 79;
    const confidence = Math.min(seen / 15, 1);
    return Math.round(50 + (raw - 50) * confidence);
  };
  const eq = (st: AsvabSubtest) =>
    standardToEquated(
      toScore(resultMap.get(st)?.percentage ?? 0, resultMap.get(st)?.total ?? 0)
    );
  let sum = 0;
  for (const st of ALL_SUBTESTS) {
    const w = weights[st] ?? 0;
    if (w > 0) sum += w * eq(st);
  }
  return Math.round(sum);
}

export function getStrengths(results: SubtestResult[]): SubtestResult[] {
  return [...results].sort((a, b) => b.percentage - a.percentage).slice(0, 3);
}

export function getWeaknesses(results: SubtestResult[]): SubtestResult[] {
  return [...results].sort((a, b) => a.percentage - b.percentage).slice(0, 3);
}

function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function shuffleQuestions(
  questions: PracticeQuestion[]
): PracticeQuestion[] {
  return shuffle(questions);
}

/**
 * Select `count` questions from a larger pool, maintaining subtest distribution.
 * Groups by subtest, takes proportional samples, then shuffles the result.
 */
export function selectQuestions(
  pool: PracticeQuestion[],
  count: number
): PracticeQuestion[] {
  if (pool.length <= count) return shuffle(pool);

  // Group by subtest
  const bySubtest = new Map<AsvabSubtest, PracticeQuestion[]>();
  for (const q of pool) {
    const list = bySubtest.get(q.subtest) || [];
    list.push(q);
    bySubtest.set(q.subtest, list);
  }

  // Distribution per subtest for 30 questions
  const distribution: Record<AsvabSubtest, number> = {
    GS: 3, AR: 4, WK: 4, PC: 3, MK: 4, EI: 3, AS: 3, MC: 3, AO: 3,
  };

  const selected: PracticeQuestion[] = [];
  for (const [subtest, questions] of bySubtest) {
    const needed = distribution[subtest] || Math.ceil((count / pool.length) * questions.length);
    const shuffled = shuffle(questions);
    selected.push(...shuffled.slice(0, needed));
  }

  return shuffle(selected);
}

export function totalCorrect(
  questions: PracticeQuestion[],
  answers: UserAnswer[]
): number {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.selectedIndex]));
  return questions.filter((q) => answerMap.get(q.id) === q.correctIndex).length;
}

export function estimateStandardScores(
  subtestResults: SubtestResult[]
): SubtestScores {
  const resultMap = new Map(subtestResults.map((r) => [r.subtest, r]));
  const map = (pct: number): number => Math.round(20 + (pct / 100) * 79);

  return {
    GS: map(resultMap.get("GS")?.percentage ?? 0),
    AR: map(resultMap.get("AR")?.percentage ?? 0),
    WK: map(resultMap.get("WK")?.percentage ?? 0),
    PC: map(resultMap.get("PC")?.percentage ?? 0),
    MK: map(resultMap.get("MK")?.percentage ?? 0),
    EI: map(resultMap.get("EI")?.percentage ?? 0),
    AS: map(resultMap.get("AS")?.percentage ?? 0),
    MC: map(resultMap.get("MC")?.percentage ?? 0),
    AO: map(resultMap.get("AO")?.percentage ?? 0),
  };
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
