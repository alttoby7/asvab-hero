/**
 * Variant-aware question sampler.
 *
 * Responsibilities:
 *   1. `loadVariant(code)`        — fetch a TestVariant from Supabase.
 *   2. `loadQuestionPool(opts?)`  — fetch active practice_questions, optionally
 *                                    filtered by subtest. Falls back to the
 *                                    local seed JSON if Supabase is unreachable
 *                                    or the table is empty (anonymous flow
 *                                    must keep working offline).
 *   3. `sampleForVariant(...)`    — pure function that applies the variant's
 *                                    mix rules to the pool and returns the
 *                                    questions to serve.
 */
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type {
  AsvabSubtest,
  PracticeQuestion,
  TestVariant,
  TestVariantRules,
} from "@/types";
import { ALL_SUBTESTS } from "@/types";
import freeTest from "@/data/practice-tests/free-test.json";
import questionTags from "@/data/question-tags.seed.json";

// ─── Local-seed fallback ────────────────────────────────────────────────────

type RawSeedQuestion = {
  id: string;
  subtest: AsvabSubtest;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
};

type QuestionTag = {
  external_key: string;
  topic_id: string;
  difficulty: number;
};

const TAGS_BY_KEY = new Map<string, QuestionTag>(
  (questionTags as QuestionTag[]).map((t) => [t.external_key.toUpperCase(), t])
);

/** Build the in-memory pool from `free-test.json` + `question-tags.seed.json`. */
function buildLocalPool(): PracticeQuestion[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = (freeTest as any).questions as RawSeedQuestion[];
  return raw.map((q) => {
    // Local IDs are lowercase ("gs-1"); tag keys are uppercase ("GS-1").
    const tag = TAGS_BY_KEY.get(q.id.toUpperCase());
    return {
      id: q.id,
      subtest: q.subtest,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      topicId: tag?.topic_id ?? `${q.subtest.toLowerCase()}.unknown`,
      difficulty: tag?.difficulty,
    };
  });
}

// ─── Local-only fallback variants (when DB unavailable) ─────────────────────

const FALLBACK_VARIANTS: Record<string, TestVariant> = {
  diagnostic: {
    code: "diagnostic",
    name: "Diagnostic Test",
    rules: {
      length: 30,
      time_seconds: 36 * 60,
      mix: { GS: 3, AR: 4, WK: 4, PC: 3, MK: 4, EI: 3, AS: 3, MC: 3, AO: 3 },
      afqt_eligible: false,
      subtest_locked: null,
    },
    active: true,
  },
  subtest_drill: {
    code: "subtest_drill",
    name: "Subtest Drill",
    rules: {
      length: 25,
      time_seconds: 20 * 60,
      mix: "one_subtest",
      afqt_eligible: false,
      subtest_locked: null,
    },
    active: true,
  },
};

// ─── Public API ─────────────────────────────────────────────────────────────

export async function loadVariant(code: string): Promise<TestVariant> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { data, error } = await sb
      .from("test_variants")
      .select("code, name, rules, active")
      .eq("code", code)
      .eq("active", true)
      .maybeSingle();
    if (error || !data) throw error ?? new Error("variant_not_found");
    return {
      code: data.code as string,
      name: data.name as string,
      rules: data.rules as TestVariantRules,
      active: data.active as boolean,
    };
  } catch {
    const fb = FALLBACK_VARIANTS[code];
    if (!fb) throw new Error(`Unknown variant: ${code}`);
    return fb;
  }
}

/** Returns all currently-active variants (for the picker UI + recommender). */
export async function loadActiveVariants(): Promise<TestVariant[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { data, error } = await sb
      .from("test_variants")
      .select("code, name, rules, active")
      .eq("active", true);
    if (error || !data || data.length === 0) throw error ?? new Error("empty");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((d: any) => ({
      code: d.code as string,
      name: d.name as string,
      rules: d.rules as TestVariantRules,
      active: d.active as boolean,
    }));
  } catch {
    return Object.values(FALLBACK_VARIANTS);
  }
}

export async function loadQuestionPool(opts?: {
  subtest?: AsvabSubtest;
}): Promise<PracticeQuestion[]> {
  // Try Supabase first.
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    let q = sb
      .from("practice_questions")
      .select(
        "id, external_key, subtest, topic_id, difficulty, stem, choices, correct_index, explanation"
      )
      .eq("active", true);
    if (opts?.subtest) q = q.eq("subtest", opts.subtest);
    const { data, error } = await q;
    if (error || !data || data.length === 0) {
      throw error ?? new Error("empty");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((row: any) => ({
      id: (row.external_key as string) ?? (row.id as string),
      subtest: row.subtest as AsvabSubtest,
      question: row.stem as string,
      options: row.choices as [string, string, string, string],
      correctIndex: row.correct_index as number,
      explanation: row.explanation as string,
      topicId: row.topic_id as string,
      difficulty: row.difficulty as number,
    }));
  } catch {
    // Fall back to local seed.
    const pool = buildLocalPool();
    return opts?.subtest ? pool.filter((q) => q.subtest === opts.subtest) : pool;
  }
}

// ─── Sampler ────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function sampleForVariant(
  variant: TestVariant,
  pool: PracticeQuestion[],
  opts?: { subtest?: AsvabSubtest }
): PracticeQuestion[] {
  const { rules } = variant;

  // ── one_subtest sentinel (subtest_drill) ─────────────────────────────────
  if (rules.mix === "one_subtest") {
    const subtest = opts?.subtest ?? rules.subtest_locked ?? null;
    if (!subtest) {
      throw new Error(
        "subtest_drill requires a 'subtest' option or rules.subtest_locked"
      );
    }
    const filtered = pool.filter((q) => q.subtest === subtest);
    return shuffle(filtered).slice(0, Math.min(rules.length, filtered.length));
  }

  // ── Fixed mix (Record<subtest, count>) ───────────────────────────────────
  if (typeof rules.mix === "object" && rules.mix !== null) {
    const mix = rules.mix as Partial<Record<AsvabSubtest, number>>;
    const bins = new Map<AsvabSubtest, PracticeQuestion[]>();
    for (const st of ALL_SUBTESTS) {
      bins.set(
        st,
        shuffle(pool.filter((q) => q.subtest === st))
      );
    }
    const selected: PracticeQuestion[] = [];
    for (const st of ALL_SUBTESTS) {
      const want = mix[st] ?? 0;
      if (want <= 0) continue;
      const bin = bins.get(st) ?? [];
      selected.push(...bin.slice(0, Math.min(want, bin.length)));
    }
    return shuffle(selected);
  }

  // ── Unknown mix sentinel: just shuffle + slice. ─────────────────────────
  return shuffle(pool).slice(0, Math.min(rules.length, pool.length));
}
