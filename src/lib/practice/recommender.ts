/**
 * Rule-based next-step recommender (no AI, no IRT).
 *
 * v1 contract: only emit recommendations that point at variants currently
 * `active = true`. The active variant set is supplied by the caller (it
 * already loaded the variants for the variant-picker UI), so this module
 * stays pure and testable.
 *
 * v1 active variants: `diagnostic`, `subtest_drill`. Therefore the
 * recommendation cascade collapses to:
 *
 *   1. Anonymous user with no stats AND latest results uneven →
 *        recommend a Subtest Drill on the worst subtest.
 *   2. Logged-in user with ≥2 weak topics in the same subtest →
 *        Subtest Drill on that subtest.
 *   3. Logged-in user with one clear weak topic →
 *        link to the topic's study guide page.
 *   4. Otherwise →
 *        Diagnostic (re-)take + study-guide on the weakest visible topic.
 *
 * v2/v3 add `weakness_loop`, `afqt_sprint`, etc., those branches are
 * stubbed as comments and gated behind the `activeVariantCodes` set.
 */
import type {
  TopicResult,
  TopicStats,
  NextStepRecommendation,
  AsvabSubtest,
} from "@/types";
import { SUBTEST_NAMES } from "@/types";
import { getTopic } from "./topic-catalog";

interface RecommenderInput {
  /** Per-topic results from the just-completed attempt. */
  latestByTopic: TopicResult[];
  /** Per-topic running stats, null for anonymous users with no history. */
  topicStats: TopicStats[] | null;
  /** Variant codes that are currently `active = true` in the DB. */
  activeVariantCodes: Set<string>;
}

function subtestDrillHref(subtest: AsvabSubtest): string {
  return `/practice-test?variant=subtest_drill&subtest=${subtest}`;
}

function diagnosticHref(): string {
  return `/practice-test?variant=diagnostic`;
}

function studyGuideHref(topicId: string): string {
  const topic = getTopic(topicId);
  return topic?.study_guide_href ?? `/study-guide`;
}

/** Group weak topics by subtest, return [subtest, [topicIds...]] entries. */
function groupWeakBySubtest(stats: TopicStats[]): Map<AsvabSubtest, string[]> {
  const out = new Map<AsvabSubtest, string[]>();
  for (const s of stats) {
    if (s.status !== "weak") continue;
    const topic = getTopic(s.topic_id);
    if (!topic) continue;
    const arr = out.get(topic.subtest) ?? [];
    arr.push(s.topic_id);
    out.set(topic.subtest, arr);
  }
  return out;
}

function adaptiveHref(): string {
  return `/practice-test?variant=afqt_adaptive`;
}

export function recommendNextStep(
  input: RecommenderInput
): NextStepRecommendation {
  const { latestByTopic, topicStats, activeVariantCodes } = input;
  const subtestDrillActive = activeVariantCodes.has("subtest_drill");
  const diagnosticActive = activeVariantCodes.has("diagnostic");
  // WS6: only surfaced when `afqt_adaptive` is active in the DB. While the
  // variant is inactive it is absent from activeVariantCodes, so this branch is
  // never taken and the recommender behaves exactly as before.
  const adaptiveActive = activeVariantCodes.has("afqt_adaptive");

  // Adaptive practice is the strongest next step once available: it self-targets
  // the user's ability across the four AFQT subtests. Offer it first to any user
  // who has at least one measured weak/developing topic (i.e. we have an ability
  // signal to adapt against). New users with no stats still flow to the
  // diagnostic-first cascade below.
  if (adaptiveActive && topicStats && topicStats.some((s) => s.seen > 0)) {
    return {
      headline: "Run an Adaptive AFQT session",
      body: "This session tunes each question to your current level across Arithmetic Reasoning, Math Knowledge, Word Knowledge, and Paragraph Comprehension, keeping you in the productive 70–80% range so every question moves your score.",
      ctaLabel: "Start Adaptive Practice",
      ctaHref: adaptiveHref(),
    };
  }

  // ── Logged-in path: drive off topic_stats. ───────────────────────────────
  if (topicStats && topicStats.length > 0) {
    const weakBySubtest = groupWeakBySubtest(topicStats);

    // (1) ≥2 weak topics in the same subtest → drill that subtest.
    if (subtestDrillActive) {
      let bestSubtest: AsvabSubtest | null = null;
      let bestCount = 1;
      for (const [subtest, topicIds] of weakBySubtest) {
        if (topicIds.length > bestCount) {
          bestSubtest = subtest;
          bestCount = topicIds.length;
        }
      }
      if (bestSubtest) {
        return {
          headline: `Drill ${SUBTEST_NAMES[bestSubtest]} next`,
          body: `You have ${bestCount} weak topics in ${SUBTEST_NAMES[bestSubtest]}. A 25-question drill on just this subtest is the fastest way to close the gap.`,
          ctaLabel: `Start ${SUBTEST_NAMES[bestSubtest]} Drill`,
          ctaHref: subtestDrillHref(bestSubtest),
        };
      }
    }

    // (2) One clear weak topic → study guide.
    const weakest = topicStats
      .filter((s) => s.status === "weak")
      .sort((a, b) => b.priority - a.priority)[0];
    if (weakest) {
      const topic = getTopic(weakest.topic_id);
      const title = topic?.title ?? weakest.topic_id;
      return {
        headline: `Brush up on ${title}`,
        body: `This is your highest-priority gap right now. The study guide walks through the formulas and worked examples, about 10 minutes.`,
        ctaLabel: `Study ${title}`,
        ctaHref: studyGuideHref(weakest.topic_id),
      };
    }

    // (3) Mostly developing/strong → diagnostic re-test.
    if (diagnosticActive) {
      return {
        headline: "Re-test with a Diagnostic",
        body: "You're past the weak-topic stage. A fresh 30-question diagnostic will confirm the improvement and surface anything still soft.",
        ctaLabel: "Start Diagnostic",
        ctaHref: diagnosticHref(),
      };
    }
  }

  // ── Anonymous path: drive off the latest attempt's per-topic results. ────
  // Find the worst subtest by % correct (must have ≥2 questions seen).
  if (subtestDrillActive && latestByTopic.length > 0) {
    const bySubtest = new Map<
      AsvabSubtest,
      { seen: number; correct: number }
    >();
    for (const r of latestByTopic) {
      const agg = bySubtest.get(r.subtest) ?? { seen: 0, correct: 0 };
      agg.seen += r.seen;
      agg.correct += r.correct;
      bySubtest.set(r.subtest, agg);
    }
    let worst: { subtest: AsvabSubtest; pct: number } | null = null;
    for (const [subtest, agg] of bySubtest) {
      if (agg.seen < 2) continue;
      const pct = agg.correct / agg.seen;
      if (worst === null || pct < worst.pct) worst = { subtest, pct };
    }
    if (worst && worst.pct < 0.7) {
      return {
        headline: `Drill ${SUBTEST_NAMES[worst.subtest]} next`,
        body: `You scored ${Math.round(worst.pct * 100)}% on ${SUBTEST_NAMES[worst.subtest]}, the lowest of the nine subtests. A focused 25-question drill is the fastest fix.`,
        ctaLabel: `Start ${SUBTEST_NAMES[worst.subtest]} Drill`,
        ctaHref: subtestDrillHref(worst.subtest),
      };
    }
  }

  // ── Fallback: single weak topic from latest → study guide; else diagnostic.
  const sortedLatest = [...latestByTopic]
    .filter((r) => r.seen > 0)
    .sort((a, b) => a.percentage - b.percentage);
  const weakestLatest = sortedLatest[0];
  if (weakestLatest && weakestLatest.percentage < 60) {
    const topic = getTopic(weakestLatest.topic_id);
    const title = topic?.title ?? weakestLatest.topic_id;
    return {
      headline: `Brush up on ${title}`,
      body: `You missed enough questions on this topic that a quick study-guide review will pay off before your next test.`,
      ctaLabel: `Study ${title}`,
      ctaHref: studyGuideHref(weakestLatest.topic_id),
    };
  }

  return {
    headline: "Take another diagnostic",
    body: "You're scoring well across the board. A second diagnostic will lock in your baseline before you focus on score-stretching.",
    ctaLabel: "Start Diagnostic",
    ctaHref: diagnosticHref(),
  };
}
