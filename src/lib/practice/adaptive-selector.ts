/**
 * AFQT adaptive next-item selector (WS6, codex hard-design b).
 *
 * Pure & dependency-free: every input is injected, so the whole engine is unit
 * testable without a browser, a network call, or Supabase. The async loaders
 * that gather those inputs from the DB live in `sampler.ts` (see
 * `buildAdaptiveSelectionInput`); this module never touches I/O.
 *
 * ── Design ────────────────────────────────────────────────────────────────
 *   MACRO FIRST, ITEM SECOND.
 *
 *   1. Macro blueprint: satisfy the variant's per-subtest quotas (AR/MK/WK/PC)
 *      while interleaving subtests so the test never streaks one section.
 *   2. Cold start: the FIRST block is fixed medium-difficulty anchor items, one
 *      per AFQT subtest, to seed an ability estimate before adapting.
 *   3. After anchors, per slot:
 *        a. pick the SUBTEST the macro blueprint still owes (respecting
 *           interleave / no-back-to-back),
 *        b. pick a TOPIC inside that subtest via a UCB-style score over
 *           gap (1 - posterior) + uncertainty (low confidence) + recency
 *           (penalise just-seen topics),
 *        c. pick an ITEM in that topic whose calibrated difficulty lands the
 *           predicted success in the ~70-80% target band near the user's
 *           estimated ability.
 *   4. ~10-15% of post-anchor slots are EXPLORATION: sample an under-calibrated
 *      trusted item to earn calibration signal — but exploration NEVER overrides
 *      the macro blueprint (it only changes WHICH item fills a slot the
 *      blueprint already assigned to that subtest).
 *
 * ── Hard filters (applied before any scoring) ─────────────────────────────
 *   - active === true
 *   - status ∈ {verified, trusted}  (audited only)
 *   - external_key NOT in recentExternalKeys  (exact-item cooldown)
 *   - item_family_id NOT in recent families   (sibling cooldown)
 *   - external_key NOT in dueExternalKeys      (don't double-serve Mistake Bank)
 *
 * ── Recognition avoidance ─────────────────────────────────────────────────
 *   exact-item cooldown + family cooldown + no back-to-back same topic unless
 *   the eligible pool is otherwise exhausted.
 *
 * The selector is deterministic given an injected `rng` (defaults to Math.random)
 * so tests can pin behaviour.
 */

import type { AsvabSubtest } from "@/types";

// ── Inputs ──────────────────────────────────────────────────────────────────

/** AFQT subtests, in canonical order. Still used by the AFQT/GT loaders. */
export const AFQT_SUBTESTS: AsvabSubtest[] = ["AR", "MK", "WK", "PC"];

/**
 * Canonical scheduling order for ALL subtests. AFQT four come first so an AFQT
 * (or GT = AR/WK/PC) blueprint schedules byte-for-byte identically to the
 * pre-S7 AFQT-only engine; Navy/CG rating composites then pull in the rest.
 */
const SCHEDULE_ORDER: AsvabSubtest[] = [
  "AR", "MK", "WK", "PC", "GS", "EI", "AS", "MC", "AO",
];

/** The subtests a blueprint actually owes, in canonical schedule order. */
export function blueprintSubtests(blueprint: AdaptiveBlueprint): AsvabSubtest[] {
  return SCHEDULE_ORDER.filter((st) => (blueprint[st] ?? 0) > 0);
}

/** One candidate item, normalised from practice_questions + its calibration. */
export interface AdaptiveCandidate {
  /** Stable external_key (cooldown + dedupe key). */
  externalKey: string;
  subtest: AsvabSubtest;
  topicId: string;
  /** Sibling-group id (WS5). Falls back to a per-item id when unset. */
  itemFamilyId: string;
  /** trust tier from practice_questions.status. */
  status: "draft" | "verified" | "trusted";
  active: boolean;
  /** Difficulty on the author 1-5 scale to use for band-targeting — the WS1
   *  shrunk_difficulty when calibrated, else the author prior. Always present. */
  difficulty: number;
  /** First-seen exposure count from WS1. 0 when never calibrated. Drives the
   *  "under-calibrated" exploration pool. */
  nFirstseen: number;
}

/** Per-topic running stats slice the selector needs (from topic_stats). */
export interface AdaptiveTopicStat {
  topicId: string;
  subtest: AsvabSubtest;
  /** (correct + 1) / (seen + 2) — higher = stronger. */
  posterior: number;
  /** min(seen / 8, 1) — higher = more measured. */
  confidence: number;
  /** seen count, for recency/coverage tie-breaks. */
  seen: number;
}

/** The macro blueprint: how many items each subtest owes. */
export type AdaptiveBlueprint = Partial<Record<AsvabSubtest, number>>;

export interface AdaptiveSelectionInput {
  /** Full eligible-or-not candidate pool (AFQT subtests). Filtered internally. */
  pool: AdaptiveCandidate[];
  /** Per-topic stats for the user (empty for a brand-new user → cold start). */
  topicStats: AdaptiveTopicStat[];
  /** external_keys served recently (this + recent sessions) — exact cooldown. */
  recentExternalKeys: Set<string>;
  /** external_keys currently DUE in the Mistake Bank — excluded so the adaptive
   *  test never collides with the spaced-review surface. */
  dueExternalKeys: Set<string>;
  /** Per-subtest quotas. Total length = sum of these. */
  blueprint: AdaptiveBlueprint;
  /** Fraction of post-anchor slots reserved for exploration (default 0.12). */
  explorationFraction?: number;
  /** Anchors per subtest at cold start (default 1). */
  anchorsPerSubtest?: number;
  /** How many recently-served families to keep on cooldown (default 4). */
  familyCooldownWindow?: number;
  /** Calibration confidence floor: items with nFirstseen below this are the
   *  "under-calibrated" exploration pool (default 60, matches WS1 full gate). */
  underCalibratedBelow?: number;
  /** Injected RNG for deterministic tests. Defaults to Math.random. */
  rng?: () => number;
}

export interface AdaptiveSelectionResult {
  /** Ordered external_keys to serve, length === sum(blueprint). */
  order: string[];
  /** Parallel debug trace, one per slot (handy for tests + telemetry). */
  trace: AdaptiveSlotTrace[];
}

export interface AdaptiveSlotTrace {
  index: number;
  externalKey: string;
  subtest: AsvabSubtest;
  topicId: string;
  kind: "anchor" | "adaptive" | "exploration" | "fallback";
  /** Predicted success at selection time (0-1), for the chosen item. */
  predictedSuccess: number;
}

// ── Tunables ─────────────────────────────────────────────────────────────────

const TARGET_SUCCESS_LOW = 0.7;
const TARGET_SUCCESS_HIGH = 0.8;
const TARGET_SUCCESS_MID = (TARGET_SUCCESS_LOW + TARGET_SUCCESS_HIGH) / 2;
/** Anchor difficulty (1-5 author scale): medium. */
const ANCHOR_DIFFICULTY = 3;
/** UCB exploration weight on topic uncertainty. */
const UCB_UNCERTAINTY_WEIGHT = 0.6;
/** Recency penalty applied to the topic served on the immediately prior slot. */
const RECENCY_PENALTY = 0.5;

// ── Helpers ──────────────────────────────────────────────────────────────────

function isAudited(c: AdaptiveCandidate): boolean {
  return c.status === "verified" || c.status === "trusted";
}

/**
 * Predicted probability the user answers an item of `difficulty` (1-5) correctly,
 * given a per-subtest ability proxy in [0,1] (the mean topic posterior).
 *
 * We map difficulty to a hardness in [0,1] (1→0 easy, 5→1 hard) and model
 * success as ability shifted by (0.5 - hardness): an average item (hardness .5)
 * predicts ~ability; a hard item drops it, an easy item lifts it. Clamped [0,1].
 * Deliberately simple/monotone — band-targeting only needs a sane ordering.
 */
export function predictSuccess(difficulty: number, ability: number): number {
  const hardness = (clamp(difficulty, 1, 5) - 1) / 4; // 0..1
  const raw = ability + (0.5 - hardness);
  return clamp(raw, 0.02, 0.98);
}

function clamp(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
}

/** Mean posterior across a subtest's measured topics → ability proxy [0,1].
 *  Cold start (no stats) returns 0.5 so the first adaptive picks aim at medium. */
function subtestAbility(
  subtest: AsvabSubtest,
  statsBySubtest: Map<AsvabSubtest, AdaptiveTopicStat[]>,
): number {
  const stats = statsBySubtest.get(subtest);
  if (!stats || stats.length === 0) return 0.5;
  let wSum = 0;
  let acc = 0;
  for (const s of stats) {
    // Weight by confidence so unmeasured topics barely move the proxy.
    const w = 0.1 + s.confidence;
    acc += s.posterior * w;
    wSum += w;
  }
  return wSum > 0 ? clamp(acc / wSum, 0, 1) : 0.5;
}

/**
 * UCB-style topic score: prefer topics with a big GAP (low posterior), high
 * UNCERTAINTY (low confidence), and that were NOT just seen (recency penalty).
 * Higher score = pick first.
 */
function topicScore(
  topicId: string,
  stat: AdaptiveTopicStat | undefined,
  lastTopicId: string | null,
): number {
  // Unmeasured topic: maximal uncertainty, neutral gap → eagerly explored.
  const posterior = stat?.posterior ?? 0.5;
  const confidence = stat?.confidence ?? 0;
  const gap = 1 - posterior; // weakness
  const uncertainty = 1 - confidence; // unknown-ness
  let score = gap + UCB_UNCERTAINTY_WEIGHT * uncertainty;
  if (topicId === lastTopicId) score -= RECENCY_PENALTY; // avoid back-to-back
  return score;
}

/** Interleave a per-subtest quota into a flat schedule that never streaks a
 *  subtest while any other subtest still owes a slot (largest-remainder style). */
export function buildSubtestSchedule(blueprint: AdaptiveBlueprint): AsvabSubtest[] {
  const remaining = new Map<AsvabSubtest, number>();
  for (const st of blueprintSubtests(blueprint)) {
    remaining.set(st, blueprint[st] as number);
  }
  const total = [...remaining.values()].reduce((a, b) => a + b, 0);
  const schedule: AsvabSubtest[] = [];
  let last: AsvabSubtest | null = null;
  for (let i = 0; i < total; i++) {
    // Pick the subtest with the most slots left, preferring one != last.
    let pick: AsvabSubtest | null = null;
    let pickN = -1;
    for (const [st, n] of remaining) {
      if (n <= 0) continue;
      const penalised = st === last ? n - 0.5 : n; // soft no-streak
      if (penalised > pickN) {
        pickN = penalised;
        pick = st;
      }
    }
    if (pick === null) break;
    schedule.push(pick);
    remaining.set(pick, (remaining.get(pick) ?? 0) - 1);
    last = pick;
  }
  return schedule;
}

// ── Core selector ────────────────────────────────────────────────────────────

/**
 * Build the ordered list of items for an adaptive AFQT test.
 *
 * Pure: same inputs (with a fixed rng) → same output.
 */
export function selectAdaptiveItems(
  input: AdaptiveSelectionInput,
): AdaptiveSelectionResult {
  const {
    pool,
    topicStats,
    recentExternalKeys,
    dueExternalKeys,
    blueprint,
    explorationFraction = 0.12,
    anchorsPerSubtest = 1,
    familyCooldownWindow = 4,
    underCalibratedBelow = 60,
    rng = Math.random,
  } = input;

  // ── Hard filters: audited, active, in-blueprint subtest, not on cooldown ──
  const activeSubtests = blueprintSubtests(blueprint);
  const activeSet = new Set<AsvabSubtest>(activeSubtests);
  const eligible = pool.filter(
    (c) =>
      c.active &&
      isAudited(c) &&
      activeSet.has(c.subtest) &&
      !recentExternalKeys.has(c.externalKey) &&
      !dueExternalKeys.has(c.externalKey),
  );

  // Index by subtest → topic for fast in-loop lookup.
  const bySubtest = new Map<AsvabSubtest, AdaptiveCandidate[]>();
  for (const c of eligible) {
    const arr = bySubtest.get(c.subtest) ?? [];
    arr.push(c);
    bySubtest.set(c.subtest, arr);
  }

  const statsBySubtest = new Map<AsvabSubtest, AdaptiveTopicStat[]>();
  const statByTopic = new Map<string, AdaptiveTopicStat>();
  for (const s of topicStats) {
    statByTopic.set(s.topicId, s);
    const arr = statsBySubtest.get(s.subtest) ?? [];
    arr.push(s);
    statsBySubtest.set(s.subtest, arr);
  }

  const schedule = buildSubtestSchedule(blueprint);

  // Mutable selection state.
  const chosenKeys = new Set<string>(); // dedupe within this test
  const recentFamilies: string[] = []; // sliding family cooldown
  const order: string[] = [];
  const trace: AdaptiveSlotTrace[] = [];
  let lastTopicId: string | null = null;

  const familyOnCooldown = (fam: string) =>
    recentFamilies.slice(-familyCooldownWindow).includes(fam);

  const pushFamily = (fam: string) => {
    recentFamilies.push(fam);
  };

  // Available candidates in a subtest after per-slot recognition filters.
  // `relaxFamily`/`relaxTopic` progressively loosen recognition rules ONLY when
  // the strict pool is exhausted (recognition avoidance "unless exhausted").
  function avail(
    subtest: AsvabSubtest,
    opts: { relaxFamily?: boolean; avoidTopic?: string | null } = {},
  ): AdaptiveCandidate[] {
    const list = bySubtest.get(subtest) ?? [];
    return list.filter((c) => {
      if (chosenKeys.has(c.externalKey)) return false;
      if (!opts.relaxFamily && familyOnCooldown(c.itemFamilyId)) return false;
      if (opts.avoidTopic && c.topicId === opts.avoidTopic) return false;
      return true;
    });
  }

  // Tiered candidate fetch honouring recognition rules, relaxing only on need.
  function candidatesFor(subtest: AsvabSubtest): {
    list: AdaptiveCandidate[];
    relaxed: boolean;
  } {
    // 1. strict: family cooldown on, avoid back-to-back topic.
    let list = avail(subtest, { avoidTopic: lastTopicId });
    if (list.length > 0) return { list, relaxed: false };
    // 2. allow same topic as last (pool thin on topics).
    list = avail(subtest);
    if (list.length > 0) return { list, relaxed: false };
    // 3. relax family cooldown, still avoid back-to-back topic.
    list = avail(subtest, { relaxFamily: true, avoidTopic: lastTopicId });
    if (list.length > 0) return { list, relaxed: true };
    // 4. fully relaxed.
    list = avail(subtest, { relaxFamily: true });
    return { list, relaxed: true };
  }

  // Choose the best TOPIC among candidates via UCB, then return that topic's items.
  function pickTopicItems(cands: AdaptiveCandidate[]): {
    topicId: string;
    items: AdaptiveCandidate[];
  } | null {
    if (cands.length === 0) return null;
    const topics = [...new Set(cands.map((c) => c.topicId))];
    let bestTopic = topics[0];
    let bestScore = -Infinity;
    for (const t of topics) {
      const sc = topicScore(t, statByTopic.get(t), lastTopicId);
      if (sc > bestScore) {
        bestScore = sc;
        bestTopic = t;
      }
    }
    return { topicId: bestTopic, items: cands.filter((c) => c.topicId === bestTopic) };
  }

  // Distance of an item's predicted success from the 70-80% target band.
  // 0 inside the band, else distance to the nearest edge.
  function bandCost(item: AdaptiveCandidate, ability: number): number {
    const p = predictSuccess(item.difficulty, ability);
    let cost: number;
    if (p < TARGET_SUCCESS_LOW) cost = TARGET_SUCCESS_LOW - p;
    else if (p > TARGET_SUCCESS_HIGH) cost = p - TARGET_SUCCESS_HIGH;
    else cost = 0;
    // Tiny tie-break toward the band centre so ties are deterministic.
    return cost + Math.abs(p - TARGET_SUCCESS_MID) * 1e-3;
  }

  /**
   * Joint item selection: rank every eligible item by a combined utility of
   *   (topic UCB priority)  −  BAND_WEIGHT * (band distance)
   * so the selector still favours weak/uncertain topics (UCB) but band-targeting
   * actively steers AWAY from a high-priority topic when its only remaining items
   * are far from the user's ability band. This is what keeps a strong student
   * from being fed easy items just because their weakest topic happens to have
   * only easy items left in the eligible pool.
   */
  function pickAdaptiveItem(
    cands: AdaptiveCandidate[],
    ability: number,
  ): AdaptiveCandidate | null {
    if (cands.length === 0) return null;
    const BAND_WEIGHT = 1.5; // band fit dominates ties between similar topics
    let best = cands[0];
    let bestUtil = -Infinity;
    for (const it of cands) {
      const ts = topicScore(it.topicId, statByTopic.get(it.topicId), lastTopicId);
      const util = ts - BAND_WEIGHT * bandCost(it, ability);
      if (util > bestUtil) {
        bestUtil = util;
        best = it;
      }
    }
    return best;
  }

  function commit(
    c: AdaptiveCandidate,
    kind: AdaptiveSlotTrace["kind"],
    ability: number,
    index: number,
  ): void {
    chosenKeys.add(c.externalKey);
    pushFamily(c.itemFamilyId);
    order.push(c.externalKey);
    lastTopicId = c.topicId;
    trace.push({
      index,
      externalKey: c.externalKey,
      subtest: c.subtest,
      topicId: c.topicId,
      kind,
      predictedSuccess: predictSuccess(c.difficulty, ability),
    });
  }

  // ── Phase 1: cold-start anchors (medium difficulty, one per subtest). ──────
  // Anchors come from the SAME eligible pool but pick the item nearest to the
  // medium anchor difficulty, ignoring ability (we have none yet). Anchors still
  // count against each subtest's blueprint quota.
  const anchorBudget = new Map<AsvabSubtest, number>();
  for (const st of activeSubtests) {
    const want = blueprint[st] ?? 0;
    if (want > 0) anchorBudget.set(st, Math.min(anchorsPerSubtest, want));
  }
  // Track how many of each subtest the schedule still owes after anchors.
  const subtestQuota = new Map<AsvabSubtest, number>();
  for (const st of schedule) subtestQuota.set(st, (subtestQuota.get(st) ?? 0) + 1);

  let slot = 0;
  for (const st of activeSubtests) {
    const n = anchorBudget.get(st) ?? 0;
    for (let k = 0; k < n; k++) {
      const { list } = candidatesFor(st);
      if (list.length === 0) continue;
      // Nearest to medium anchor difficulty; UCB topic choice still applies so
      // anchors spread across topics rather than clustering.
      const picked = pickTopicItems(list);
      if (!picked) continue;
      let best = picked.items[0];
      let bestDist = Infinity;
      for (const it of picked.items) {
        const d = Math.abs(it.difficulty - ANCHOR_DIFFICULTY);
        if (d < bestDist) {
          bestDist = d;
          best = it;
        }
      }
      commit(best, "anchor", 0.5, slot);
      slot += 1;
      subtestQuota.set(st, (subtestQuota.get(st) ?? 0) - 1);
    }
  }

  // ── Phase 2: adaptive fill following the interleaved schedule. ─────────────
  // We re-derive a post-anchor schedule from the residual quota so the
  // interleave is correct after anchors were front-loaded by subtest.
  const residualBlueprint: AdaptiveBlueprint = {};
  for (const st of activeSubtests) {
    const left = subtestQuota.get(st) ?? 0;
    if (left > 0) residualBlueprint[st] = left;
  }
  const postSchedule = buildSubtestSchedule(residualBlueprint);

  // Exploration slots: spread ~explorationFraction across the post-anchor slots.
  const explorationSlots = Math.round(postSchedule.length * explorationFraction);
  // Deterministically choose which positions are exploration via the rng.
  const explorationPositions = new Set<number>();
  {
    const candidatesIdx = postSchedule.map((_, i) => i);
    // Fisher-Yates partial shuffle using rng, take the first N.
    for (let i = candidatesIdx.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [candidatesIdx[i], candidatesIdx[j]] = [candidatesIdx[j], candidatesIdx[i]];
    }
    for (let i = 0; i < explorationSlots; i++) explorationPositions.add(candidatesIdx[i]);
  }

  for (let pos = 0; pos < postSchedule.length; pos++) {
    const st = postSchedule[pos];
    const { list, relaxed } = candidatesFor(st);
    if (list.length === 0) {
      // Truly exhausted for this subtest: skip (length may end up < requested).
      continue;
    }
    const ability = subtestAbility(st, statsBySubtest);
    const wantExplore = explorationPositions.has(pos);

    if (wantExplore) {
      // Exploration: among the eligible list, prefer the most under-calibrated
      // (lowest nFirstseen) trusted/verified item. Macro blueprint already
      // assigned this slot to `st`, so exploration never breaks the blueprint.
      const underCal = list
        .filter((c) => c.nFirstseen < underCalibratedBelow)
        .sort((a, b) => a.nFirstseen - b.nFirstseen);
      const pickFrom = underCal.length > 0 ? underCal : list;
      const picked = pickTopicItems(pickFrom);
      const items = picked?.items ?? pickFrom;
      const best = items[0];
      commit(best, "exploration", ability, slot);
      slot += 1;
      continue;
    }

    // Adaptive: jointly score topic priority (UCB) + band fit, pick best item.
    const best = pickAdaptiveItem(list, ability);
    if (!best) continue;
    commit(best, relaxed ? "fallback" : "adaptive", ability, slot);
    slot += 1;
  }

  return { order, trace };
}
