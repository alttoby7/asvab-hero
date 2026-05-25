import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Item-calibration read layer (WS1 substrate → consumed by WS2/WS6).
 *
 * Per-item difficulty is computed entirely DB-side: the `ingest_attempt_mistakes`
 * trigger records a FIRST-SEEN row per item in `item_exposures` (re-exposures and
 * Mistake-Bank reviews are dropped via the PK conflict), and the nightly
 * `recompute_item_calibrations()` aggregates those into `question_calibrations`,
 * ability-adjusted and shrunk toward the author's difficulty prior.
 *
 * These helpers are pure reads. Difficulties are on the author's 1-5 scale
 * (higher = harder). Until an item has enough first-seen data (n_firstseen >= 60
 * or a narrow CI), `shrunk_difficulty` sits at/near the author prior by design, 
 * so callers can always use `shrunk_difficulty` and get a sane number even at
 * cold start.
 */

/** Calibration record for one (question_id, content_version). */
export interface ItemCalibration {
  question_id: string; // external_key, stable across re-seed
  content_version: number;
  subtest: string | null;
  topic_id: string | null;
  n_firstseen: number;
  n_correct: number;
  raw_correct_rate: number | null;
  author_difficulty: number; // 1-5 author prior
  ability_adj_difficulty: number | null; // 1-5, ability-adjusted
  shrunk_difficulty: number; // 1-5, shrunk toward author prior, the field to use
  last_calibrated_at: string | null;
}

/** True once an item has earned full item-level difficulty signal. Below this,
 *  `shrunk_difficulty` is dominated by the author prior. WS2/WS6 can use this
 *  to decide whether to trust the item-level number vs. the author prior. */
export function isFullyCalibrated(c: Pick<ItemCalibration, "n_firstseen">): boolean {
  return c.n_firstseen >= 60;
}

/**
 * Fetch calibrations for a set of external_keys.
 * Returns a map keyed by external_key. Missing keys (no exposures yet) are
 * simply absent from the map, callers fall back to the author prior.
 *
 * When multiple content_versions exist for a key, the newest is returned
 * (current item content is what callers schedule/select against).
 */
export async function getItemCalibrations(
  questionIds: string[],
): Promise<Map<string, ItemCalibration>> {
  const out = new Map<string, ItemCalibration>();
  if (questionIds.length === 0) return out;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { data, error } = await sb
      .from("question_calibrations")
      .select(
        "question_id, content_version, subtest, topic_id, n_firstseen, n_correct, raw_correct_rate, author_difficulty, ability_adj_difficulty, shrunk_difficulty, last_calibrated_at",
      )
      .in("question_id", questionIds)
      .order("content_version", { ascending: false });
    if (error || !data) return out;
    for (const row of data as ItemCalibration[]) {
      // First row per key wins (ordered newest content_version first).
      if (!out.has(row.question_id)) out.set(row.question_id, row);
    }
    return out;
  } catch {
    return out;
  }
}

/**
 * Convenience: resolve the difficulty to use for an item, on the 1-5 scale.
 * Returns the calibrated `shrunk_difficulty` if present, else the supplied
 * author prior, else 3 (medium). Always safe to call at cold start.
 */
export function resolveDifficulty(
  calibration: ItemCalibration | undefined,
  authorPrior?: number,
): number {
  if (calibration) return calibration.shrunk_difficulty;
  if (typeof authorPrior === "number") return authorPrior;
  return 3;
}
