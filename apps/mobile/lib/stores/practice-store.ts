import { create } from "zustand";
import { randomUUID } from "expo-crypto";
import type {
  PracticeQuestion,
  UserAnswer,
  TestVariant,
  AttemptPayload,
  AsvabSubtest,
} from "@asvab-hero/domain/types";
import {
  scoreBySubtest,
  scoreByTopic,
  estimateAFQT,
} from "@asvab-hero/domain/scoring";
import { sampleForVariant } from "@asvab-hero/domain/sampler";
import {
  loadVariant,
  loadQuestionPool,
  saveAttempt,
} from "@asvab-hero/api";
import { getSupabaseClient } from "../supabase";

export type TestPhase = "idle" | "loading" | "intro" | "testing" | "review" | "results";

interface PracticeState {
  variant: TestVariant | null;
  questions: PracticeQuestion[];
  answers: Map<string, UserAnswer>;
  currentIndex: number;
  phase: TestPhase;
  startTime: number | null;
  clientAttemptId: string;
  savedAttemptId: string | null;
  loading: boolean;
  error: string | null;
}

interface PracticeActions {
  loadTest: (variantCode: string, subtest?: AsvabSubtest) => Promise<void>;
  startTest: () => void;
  selectAnswer: (questionId: string, optionIndex: number) => void;
  setConfidence: (questionId: string, confidence: "sure" | "unsure") => void;
  next: () => void;
  prev: () => void;
  jumpTo: (index: number) => void;
  goToReview: () => void;
  submitTest: (userId: string) => Promise<void>;
  reset: () => void;
}

const initialState: PracticeState = {
  variant: null,
  questions: [],
  answers: new Map(),
  currentIndex: 0,
  phase: "idle",
  startTime: null,
  clientAttemptId: "",
  savedAttemptId: null,
  loading: false,
  error: null,
};

export const usePracticeStore = create<PracticeState & PracticeActions>()(
  (set, get) => ({
    ...initialState,

    loadTest: async (variantCode, subtest) => {
      set({ phase: "loading", loading: true, error: null });
      try {
        const client = getSupabaseClient();
        const variant = await loadVariant(client, variantCode);
        const pool = await loadQuestionPool(client, subtest ? { subtest } : undefined);
        const sampled = sampleForVariant(variant, pool, subtest ? { subtest } : undefined);
        set({
          variant,
          questions: sampled,
          answers: new Map(),
          currentIndex: 0,
          phase: "intro",
          clientAttemptId: randomUUID(),
          savedAttemptId: null,
          loading: false,
        });
      } catch (e: any) {
        set({ phase: "idle", loading: false, error: e.message ?? "Failed to load test" });
      }
    },

    startTest: () => {
      set({ phase: "testing", startTime: Date.now() });
    },

    selectAnswer: (questionId, optionIndex) => {
      const { answers } = get();
      const updated = new Map(answers);
      const existing = updated.get(questionId);
      updated.set(questionId, {
        questionId,
        selectedIndex: optionIndex,
        confidence: existing?.confidence ?? null,
      });
      set({ answers: updated });
    },

    setConfidence: (questionId, confidence) => {
      const { answers } = get();
      const updated = new Map(answers);
      const existing = updated.get(questionId);
      if (existing) {
        updated.set(questionId, { ...existing, confidence });
      }
      set({ answers: updated });
    },

    next: () => {
      const { currentIndex, questions } = get();
      if (currentIndex < questions.length - 1) {
        set({ currentIndex: currentIndex + 1 });
      }
    },

    prev: () => {
      const { currentIndex } = get();
      if (currentIndex > 0) {
        set({ currentIndex: currentIndex - 1 });
      }
    },

    jumpTo: (index) => {
      const { questions } = get();
      if (index >= 0 && index < questions.length) {
        set({ currentIndex: index });
      }
    },

    goToReview: () => {
      set({ phase: "review" });
    },

    submitTest: async (userId) => {
      const { variant, questions, answers, startTime, clientAttemptId } = get();
      if (!variant) return;

      const answersArray = Array.from(answers.values());
      const now = new Date().toISOString();
      const subtestResults = scoreBySubtest(questions, answersArray);
      const topicResults = scoreByTopic(questions, answersArray);
      const afqtEstimate = estimateAFQT(subtestResults);

      const resultsBySubtest: Record<string, { seen: number; correct: number }> = {};
      for (const sr of subtestResults) {
        resultsBySubtest[sr.subtest] = { seen: sr.total, correct: sr.correct };
      }
      const resultsByTopic: Record<string, { seen: number; correct: number }> = {};
      for (const tr of topicResults) {
        resultsByTopic[tr.topic_id] = { seen: tr.seen, correct: tr.correct };
      }

      const questionResults = questions.map((q) => {
        const a = answers.get(q.id);
        const isCorrect = a?.selectedIndex === q.correctIndex;
        return {
          question_id: q.id,
          selected: a?.selectedIndex ?? null,
          correct: isCorrect ? 1 : 0,
          topic_id: q.topicId ?? q.subtest,
          is_correct: isCorrect,
          confidence: a?.confidence ?? null,
        };
      });

      const correctCount = questionResults.filter((r) => r.is_correct).length;
      const durationSeconds = startTime
        ? Math.round((Date.now() - startTime) / 1000)
        : 0;

      const payload: AttemptPayload = {
        client_attempt_id: clientAttemptId,
        variant_code: variant.code,
        source: "practice",
        subtest: variant.rules.mix === "one_subtest" ? (variant.rules.subtest_locked ?? null) : null,
        topic_id: null,
        started_at: startTime ? new Date(startTime).toISOString() : now,
        completed_at: now,
        duration_seconds: durationSeconds,
        question_count: questions.length,
        correct_count: correctCount,
        afqt_estimate: afqtEstimate.score,
        results_by_subtest: resultsBySubtest,
        results_by_topic: resultsByTopic,
        question_results: questionResults,
      };

      try {
        const client = getSupabaseClient();
        const { id } = await saveAttempt(client, userId, payload);
        set({ phase: "results", savedAttemptId: id });
      } catch {
        set({ phase: "results", savedAttemptId: null });
      }
    },

    reset: () => {
      set({ ...initialState });
    },
  })
);

export function useCurrentQuestion(): PracticeQuestion | null {
  return usePracticeStore((s) =>
    s.questions.length > 0 ? s.questions[s.currentIndex] : null
  );
}

export function useAnsweredCount(): number {
  return usePracticeStore((s) => s.answers.size);
}

export function useProgress(): number {
  return usePracticeStore((s) =>
    s.questions.length > 0 ? s.answers.size / s.questions.length : 0
  );
}
