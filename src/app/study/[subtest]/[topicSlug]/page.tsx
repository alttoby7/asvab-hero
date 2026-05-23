import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllTopicSlugs, getStudyGuide } from "@/lib/study-guides/loader";
import MiniDrill from "@/components/study-guide/MiniDrill";
import StudyGuideArticle from "@/components/study-guide/StudyGuideArticle";
import { SUBTEST_NAMES } from "@/types";
import type { AsvabSubtest } from "@/types";

interface PageProps {
  params: Promise<{ subtest: string; topicSlug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllTopicSlugs();
  return slugs.map(({ subtest, slug }) => ({
    subtest,
    topicSlug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subtest, topicSlug } = await params;
  const guide = getStudyGuide(subtest, topicSlug);
  if (!guide) return {};

  const { frontmatter } = guide;
  return {
    title: `${frontmatter.title} — ASVAB ${frontmatter.subtest} Study Guide`,
    description: frontmatter.summary,
    alternates: {
      canonical: `https://asvabhero.com/study/${subtest}/${topicSlug}`,
    },
  };
}

export default async function StudyGuidePage({ params }: PageProps) {
  const { subtest, topicSlug } = await params;
  const guide = getStudyGuide(subtest, topicSlug);

  if (!guide) {
    notFound();
  }

  const { frontmatter } = guide;
  const subtestUpper = frontmatter.subtest as AsvabSubtest;
  const subtestName = SUBTEST_NAMES[subtestUpper] ?? frontmatter.subtest;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-tertiary">
        <Link href="/asvab-study-guide" className="transition-colors hover:text-text-secondary">
          Study Guide
        </Link>
        <span>/</span>
        <span className="text-text-secondary">{subtestName}</span>
        <span>/</span>
        <span className="text-text-primary">{frontmatter.title}</span>
      </nav>

      <StudyGuideArticle guide={guide} />

      {/* Mini Drill */}
      <section className="mb-10 space-y-4 rounded-xl border border-navy-border bg-navy-light p-6">
        <MiniDrill topicId={frontmatter.topic_id} />
      </section>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/practice-test?variant=subtest_drill&subtest=${subtestUpper}`}
          className="flex-1 rounded-xl bg-accent px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Practice {subtestName}
        </Link>
        <Link
          href="/practice-test?variant=diagnostic"
          className="flex-1 rounded-xl border border-navy-border bg-navy-light px-5 py-3 text-center text-sm font-semibold text-text-secondary transition-colors hover:border-navy-lighter hover:text-text-primary"
        >
          Take the diagnostic
        </Link>
      </div>
    </main>
  );
}
