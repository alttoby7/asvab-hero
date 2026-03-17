import type {
  PracticeQuestion,
  UserAnswer,
  SubtestResult,
  AsvabSubtest,
  SubtestScores,
} from "@/types";
import { ALL_SUBTESTS } from "@/types";
import { calculateAFQT, getAFQTCategory } from "./score-calculator";

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

  const mapToStandardScore = (pct: number): number => {
    // Map 0-100% → 20-62 standard score range
    return Math.round(20 + (pct / 100) * 42);
  };

  const scores: SubtestScores = {
    GS: mapToStandardScore(resultMap.get("GS")?.percentage ?? 0),
    AR: mapToStandardScore(resultMap.get("AR")?.percentage ?? 0),
    WK: mapToStandardScore(resultMap.get("WK")?.percentage ?? 0),
    PC: mapToStandardScore(resultMap.get("PC")?.percentage ?? 0),
    MK: mapToStandardScore(resultMap.get("MK")?.percentage ?? 0),
    EI: mapToStandardScore(resultMap.get("EI")?.percentage ?? 0),
    AS: mapToStandardScore(resultMap.get("AS")?.percentage ?? 0),
    MC: mapToStandardScore(resultMap.get("MC")?.percentage ?? 0),
    AO: mapToStandardScore(resultMap.get("AO")?.percentage ?? 0),
  };

  const afqt = calculateAFQT(scores);
  return { score: afqt, category: getAFQTCategory(afqt) };
}

export function getStrengths(results: SubtestResult[]): SubtestResult[] {
  return [...results].sort((a, b) => b.percentage - a.percentage).slice(0, 3);
}

export function getWeaknesses(results: SubtestResult[]): SubtestResult[] {
  return [...results].sort((a, b) => a.percentage - b.percentage).slice(0, 3);
}

export function shuffleQuestions(
  questions: PracticeQuestion[]
): PracticeQuestion[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function totalCorrect(
  questions: PracticeQuestion[],
  answers: UserAnswer[]
): number {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.selectedIndex]));
  return questions.filter((q) => answerMap.get(q.id) === q.correctIndex).length;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
