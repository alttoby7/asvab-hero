/**
 * Variant-aware question sampler.
 *
 * Responsibilities:
 *   1. `loadVariant(code)`, fetch a TestVariant from Supabase.
 *   2. `loadQuestionPool(opts?)`, fetch active practice_questions, optionally
 *                                    filtered by subtest. Falls back to the
 *                                    local seed JSON if Supabase is unreachable
 *                                    or the table is empty (anonymous flow
 *                                    must keep working offline).
 *   3. `sampleForVariant(...)`, pure function that applies the variant's
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
import { getItemCalibrations } from "@/lib/practice/item-calibration";
import {
  selectAdaptiveItems,
  blueprintSubtests,
  type AdaptiveBlueprint,
  type AdaptiveCandidate,
  type AdaptiveTopicStat,
} from "@/lib/practice/adaptive-selector";

/** Variant code for the WS6 adaptive AFQT test (seeded inactive in 0025). */
export const ADAPTIVE_VARIANT_CODE = "afqt_adaptive";
/**
 * All adaptive variants the selector drives: afqt_adaptive (AFQT), gt_adaptive
 * (AFCT GT/General, AR/WK/PC), rating_adaptive (Navy/CG rating composites, 
 * runtime weighted blueprint over the target rating's required subtests).
 */
export const ADAPTIVE_VARIANT_CODES = [
  "afqt_adaptive",
  "gt_adaptive",
  "rating_adaptive",
] as const;

/**
 * Build-time kill switch for the adaptive selector. Mirrors the closed-loop /
 * why-tracking flags: must be the literal string "true" in the Cloudflare Pages
 * build env. OFF by default → the entire adaptive path is dead code at runtime.
 */
export function isAdaptiveEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ADAPTIVE_ENABLED === "true";
}

/**
 * True only when the adaptive engine should actually drive selection: the build
 * flag is on AND the supplied variant is the adaptive variant AND that variant
 * is active in the DB. Any false → callers fall back to `sampleForVariant`.
 */
export function shouldUseAdaptive(variant: TestVariant): boolean {
  return (
    isAdaptiveEnabled() &&
    (ADAPTIVE_VARIANT_CODES as readonly string[]).includes(variant.code) &&
    variant.active === true
  );
}

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

// ─── Adaptive AFQT path (WS6) ────────────────────────────────────────────────
//
// All of the below is inert unless `shouldUseAdaptive(variant)` is true (flag on
// + active adaptive variant). The default sampler path above is untouched.

/** Extract the macro blueprint (any subtests) from the variant's mix object. */
function adaptiveBlueprintFromVariant(variant: TestVariant): AdaptiveBlueprint {
  const out: AdaptiveBlueprint = {};
  const mix = variant.rules.mix;
  if (typeof mix === "object" && mix !== null) {
    for (const st of ALL_SUBTESTS) {
      const n = (mix as Partial<Record<AsvabSubtest, number>>)[st] ?? 0;
      if (n > 0) out[st] = n;
    }
  }
  return out;
}

/**
 * Enriched candidate rows (status + family + calibration) for the adaptive
 * selector, restricted to the blueprint's subtests. AFQT/GT load AR/MK/WK/PC;
 * Navy/CG rating composites pull in GS/EI/AS/MC/AO as needed.
 */
async function loadAdaptiveCandidates(subtests: AsvabSubtest[]): Promise<{
  candidates: AdaptiveCandidate[];
  byKey: Map<string, PracticeQuestion>;
}> {
  const byKey = new Map<string, PracticeQuestion>();
  const candidates: AdaptiveCandidate[] = [];
  if (subtests.length === 0) return { candidates, byKey };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = getSupabaseBrowserClient() as any;
  const { data, error } = await sb
    .from("practice_questions")
    .select(
      "id, external_key, subtest, topic_id, difficulty, stem, choices, correct_index, explanation, active, status, item_family_id",
    )
    .eq("active", true)
    .in("subtest", subtests);
  if (error || !data) return { candidates, byKey };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = data as any[];
  const keys = rows.map((r) => (r.external_key as string) ?? (r.id as string));
  const calibrations = await getItemCalibrations(keys);

  for (const row of rows) {
    const key = (row.external_key as string) ?? (row.id as string);
    const subtest = row.subtest as AsvabSubtest;
    const topicId = (row.topic_id as string) ?? `${subtest.toLowerCase()}.unknown`;
    const authorPrior = (row.difficulty as number) ?? 3;
    const cal = calibrations.get(key);

    byKey.set(key, {
      id: key,
      subtest,
      question: row.stem as string,
      options: row.choices as [string, string, string, string],
      correctIndex: row.correct_index as number,
      explanation: row.explanation as string,
      topicId,
      difficulty: authorPrior,
    });

    candidates.push({
      externalKey: key,
      subtest,
      topicId,
      itemFamilyId: (row.item_family_id as string) ?? `${topicId}::${key}`,
      status: (row.status as AdaptiveCandidate["status"]) ?? "draft",
      active: row.active === true,
      // Use the calibrated shrunk difficulty when present, else the author prior.
      difficulty: cal ? cal.shrunk_difficulty : authorPrior,
      nFirstseen: cal?.n_firstseen ?? 0,
    });
  }
  return { candidates, byKey };
}

/** Read the user's topic_stats slice the selector needs. Empty on failure. */
async function loadAdaptiveTopicStats(userId: string): Promise<AdaptiveTopicStat[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { data, error } = await sb
      .from("topic_stats")
      .select("topic_id, posterior, confidence, seen")
      .eq("user_id", userId);
    if (error || !data) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data as any[]).map((r) => ({
      topicId: r.topic_id as string,
      subtest: String(r.topic_id ?? "")
        .split(".")[0]
        .toUpperCase() as AsvabSubtest,
      posterior: Number(r.posterior ?? 0.5),
      confidence: Number(r.confidence ?? 0),
      seen: Number(r.seen ?? 0),
    }));
  } catch {
    return [];
  }
}

/** external_keys currently DUE in the Mistake Bank (excluded from adaptive). */
async function loadDueExternalKeys(userId: string): Promise<Set<string>> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { data, error } = await sb
      .from("question_reviews")
      .select("question_id")
      .eq("user_id", userId)
      .eq("resolved", false)
      .lte("due_at", new Date().toISOString());
    if (error || !data) return new Set();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Set((data as any[]).map((r) => r.question_id as string));
  } catch {
    return new Set();
  }
}

/**
 * Adaptive entrypoint. Gathers the injected inputs from Supabase, runs the pure
 * `selectAdaptiveItems`, and returns the chosen questions in adaptive order.
 *
 * Falls back to `sampleForVariant` on any failure (no auth, empty pool, etc.) so
 * the test always renders. Callers MUST gate this behind `shouldUseAdaptive`.
 */
export async function sampleAdaptive(
  variant: TestVariant,
  opts: {
    userId: string | null;
    recentExternalKeys?: Set<string>;
    /** Runtime blueprint (rating_adaptive): overrides the variant's static mix
     *  with the target rating's weighted required-subtest demand. */
    blueprintOverride?: AdaptiveBlueprint;
  },
): Promise<PracticeQuestion[]> {
  try {
    const blueprint =
      opts.blueprintOverride && Object.keys(opts.blueprintOverride).length > 0
        ? opts.blueprintOverride
        : adaptiveBlueprintFromVariant(variant);
    const { candidates, byKey } = await loadAdaptiveCandidates(
      blueprintSubtests(blueprint),
    );
    if (candidates.length === 0) throw new Error("empty_adaptive_pool");

    const [topicStats, dueExternalKeys] = await Promise.all([
      opts.userId ? loadAdaptiveTopicStats(opts.userId) : Promise.resolve([]),
      opts.userId ? loadDueExternalKeys(opts.userId) : Promise.resolve(new Set<string>()),
    ]);

    const explorationFraction =
      typeof (variant.rules as { exploration_fraction?: number })
        .exploration_fraction === "number"
        ? (variant.rules as { exploration_fraction?: number }).exploration_fraction
        : undefined;
    const anchorsPerSubtest =
      typeof (variant.rules as { anchor_per_subtest?: number }).anchor_per_subtest ===
      "number"
        ? (variant.rules as { anchor_per_subtest?: number }).anchor_per_subtest
        : undefined;

    const { order } = selectAdaptiveItems({
      pool: candidates,
      topicStats,
      recentExternalKeys: opts.recentExternalKeys ?? new Set<string>(),
      dueExternalKeys,
      blueprint,
      explorationFraction,
      anchorsPerSubtest,
    });

    const questions = order
      .map((key) => byKey.get(key))
      .filter((q): q is PracticeQuestion => Boolean(q));
    if (questions.length === 0) throw new Error("adaptive_no_questions");
    return questions;
  } catch {
    // Robust fallback: behave exactly like the default fixed-mix path.
    const pool = await loadQuestionPool();
    return sampleForVariant(variant, pool);
  }
}
