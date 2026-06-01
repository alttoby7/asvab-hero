/**
 * Local mirror of the topic taxonomy. Sourced from `src/data/topics.seed.json`,
 * which is the canon for both the DB seed and the client.
 *
 * Used by the recommender + UI to look up titles + slugs without an extra
 * Supabase round-trip on every results render.
 */
import topicsSeed from "@/data/topics.seed.json";
import type { Topic, AsvabSubtest } from "@/types";

const RAW_TOPICS = topicsSeed as Array<{
  id: string;
  subtest: string;
  slug: string;
  title: string;
  sort_order: number;
  study_guide_href?: string;
  recommended_drill?: string;
}>;

export const TOPICS: Topic[] = RAW_TOPICS.map((t) => ({
  id: t.id,
  subtest: t.subtest as AsvabSubtest,
  slug: t.slug,
  title: t.title,
  sort_order: t.sort_order,
  active: true,
  study_guide_href: t.study_guide_href,
  recommended_drill: t.recommended_drill,
}));

const BY_ID = new Map<string, Topic>(TOPICS.map((t) => [t.id, t]));

export function getTopic(id: string): Topic | undefined {
  return BY_ID.get(id);
}

export function getTopicTitle(id: string): string {
  return BY_ID.get(id)?.title ?? id;
}

export function topicsForSubtest(subtest: AsvabSubtest): Topic[] {
  return TOPICS.filter((t) => t.subtest === subtest).sort(
    (a, b) => a.sort_order - b.sort_order
  );
}

/**
 * Public study-guide links for a subtest's topics, used to surface free guides
 * from the calculator's disappointed-scorer path. Returns up to `limit` topics
 * that have a public study_guide_href, in sort order.
 */
export function studyGuidesForSubtest(
  subtest: AsvabSubtest,
  limit = 3
): { href: string; label: string }[] {
  return topicsForSubtest(subtest)
    .filter((t) => t.study_guide_href)
    .slice(0, limit)
    .map((t) => ({ href: t.study_guide_href as string, label: t.title }));
}
