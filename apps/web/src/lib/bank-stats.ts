// Single source of truth for question-bank counts shown in marketing copy.
// `bank-stats.json` is regenerated + committed by scripts/build-questions-seed.mjs
// on every reseed, so these numbers can never go stale again.
import stats from "@/data/bank-stats.json";

export const BANK_STATS = stats;

/** Active items, rounded DOWN to the nearest 100 with a "+", e.g. 1577 → "1,500+". */
export const QUESTIONS_PLUS = `${(Math.floor(stats.active / 100) * 100).toLocaleString()}+`;

/** Exact active count, comma-grouped, e.g. "1,577". */
export const QUESTIONS_EXACT = stats.active.toLocaleString();

export const TOPIC_COUNT = stats.topicCount;
export const SUBTEST_COUNT = stats.subtestCount;
