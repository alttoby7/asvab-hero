/**
 * In-app Study pillar hub. Server-builds the guide index (39 guides across all 9
 * subtests) from the markdown loader, then hands it to a client island that
 * overlays the user's per-topic mastery + studied state + a personalized
 * "focus first" row. noindex, the public /asvab-study-guide is canonical.
 */

import type { Metadata } from "next";
import { getAllTopicSlugs, getStudyGuide } from "@/lib/study-guides/loader";
import { SUBTEST_NAMES, type AsvabSubtest } from "@/types";
import StudyHubClient, { type StudyGuideIndexEntry } from "@/components/study-guide/StudyHubClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// AFQT subtests first (they move the enlistment score), then the rest.
const SUBTEST_ORDER: AsvabSubtest[] = ["AR", "WK", "PC", "MK", "GS", "MC", "EI", "AS", "AO"];

function buildIndex(): StudyGuideIndexEntry[] {
  const entries: StudyGuideIndexEntry[] = [];
  for (const { subtest, slug } of getAllTopicSlugs()) {
    const guide = getStudyGuide(subtest, slug);
    if (!guide) continue;
    const fm = guide.frontmatter;
    entries.push({
      topicId: fm.topic_id,
      subtest: fm.subtest as AsvabSubtest,
      subtestName: SUBTEST_NAMES[fm.subtest as AsvabSubtest] ?? fm.subtest,
      slug,
      subtestSlug: subtest,
      title: fm.title,
      summary: fm.summary,
    });
  }
  // Stable order: by AFQT-first subtest, then title.
  entries.sort((a, b) => {
    const sa = SUBTEST_ORDER.indexOf(a.subtest);
    const sb = SUBTEST_ORDER.indexOf(b.subtest);
    if (sa !== sb) return sa - sb;
    return a.title.localeCompare(b.title);
  });
  return entries;
}

export default function AppStudyHubPage() {
  const index = buildIndex();
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold text-text-primary">Study</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Learn the concept, then drill it. We surface the topics dragging your
          score first, read, run a quick check, and watch your mastery climb.
        </p>
      </header>
      <StudyHubClient
        index={index}
        order={SUBTEST_ORDER}
      />
    </div>
  );
}
