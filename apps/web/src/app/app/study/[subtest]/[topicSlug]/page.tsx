/**
 * In-app study-guide topic page, member-shell version of
 * /study/[subtest]/[topicSlug]. Server wrapper (noindex; the public page is the
 * canonical SEO URL). Reuses the shared StudyGuideArticle + MiniDrill, and adds
 * StudyTopicTools (mark-studied, mastery, app-scoped drill CTA) so the
 * read -> drill loop never leaves the premium shell.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllTopicSlugs, getStudyGuide } from "@/lib/study-guides/loader";
import MiniDrill from "@/components/study-guide/MiniDrill";
import StudyGuideArticle from "@/components/study-guide/StudyGuideArticle";
import StudyGuideViewBeacon from "@/components/study-guide/StudyGuideViewBeacon";
import StudyTopicTools from "@/components/study-guide/StudyTopicTools";
import { SUBTEST_NAMES } from "@/types";
import type { AsvabSubtest } from "@/types";

interface PageProps {
  params: Promise<{ subtest: string; topicSlug: string }>;
}

export async function generateStaticParams() {
  return getAllTopicSlugs().map(({ subtest, slug }) => ({
    subtest,
    topicSlug: slug,
  }));
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AppStudyGuidePage({ params }: PageProps) {
  const { subtest, topicSlug } = await params;
  const guide = getStudyGuide(subtest, topicSlug);
  if (!guide) notFound();

  const { frontmatter } = guide;
  const subtestUpper = frontmatter.subtest as AsvabSubtest;
  const subtestName = SUBTEST_NAMES[subtestUpper] ?? frontmatter.subtest;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <StudyGuideViewBeacon
        topicId={frontmatter.topic_id}
        subtest={subtestUpper}
        surface="app"
      />
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-tertiary">
        <Link href="/app/study" className="no-underline transition-colors hover:text-text-secondary">
          Study
        </Link>
        <span>/</span>
        <span className="text-text-secondary">{subtestName}</span>
        <span>/</span>
        <span className="text-text-primary">{frontmatter.title}</span>
      </nav>

      <StudyGuideArticle guide={guide} />

      {/* Personalized: mastery + mark-studied + drill CTA */}
      <StudyTopicTools
        topicId={frontmatter.topic_id}
        subtest={subtestUpper}
        subtestName={subtestName}
      />

      {/* Mini Drill, quick check right after reading */}
      <section className="mb-6 space-y-4 rounded-xl border border-navy-border bg-navy-light p-6">
        <MiniDrill topicId={frontmatter.topic_id} />
      </section>
    </main>
  );
}
