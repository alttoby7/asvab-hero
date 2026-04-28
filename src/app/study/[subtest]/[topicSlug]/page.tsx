import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllTopicSlugs, getStudyGuide } from "@/lib/study-guides/loader";
import MiniDrill from "@/components/study-guide/MiniDrill";
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

  const { frontmatter, html } = guide;
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

      {/* Header */}
      <header className="mb-8 space-y-2">
        <span className="inline-block rounded-md bg-accent-dim px-2.5 py-1 text-xs font-semibold tracking-wide text-accent">
          {frontmatter.subtest} — {subtestName}
        </span>
        <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="text-lg text-text-secondary">{frontmatter.summary}</p>
      </header>

      {/* Formula Reference Card */}
      {frontmatter.formula_reference?.length > 0 && (
        <section className="mb-8 space-y-2 rounded-xl border border-accent/30 bg-accent-dim px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">
            Formula Reference
          </h2>
          <ul className="space-y-1">
            {frontmatter.formula_reference.map((f, i) => (
              <li key={i} className="font-mono text-sm text-text-primary">
                {f}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Body content */}
      <article
        className="prose prose-invert mb-8 max-w-none prose-headings:font-display prose-headings:text-text-primary prose-p:text-text-secondary prose-li:text-text-secondary prose-strong:text-text-primary prose-code:text-accent prose-a:text-accent"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Pitfalls */}
      {frontmatter.pitfalls?.length > 0 && (
        <section className="mb-8 space-y-2 rounded-xl border border-yellow-500/30 bg-yellow-500/5 px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
            Common Pitfalls
          </h2>
          <ul className="space-y-1.5">
            {frontmatter.pitfalls.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="mt-1 flex-shrink-0 text-yellow-400">&#9888;</span>
                {p}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Worked Examples */}
      {frontmatter.worked_examples?.length > 0 && (
        <section className="mb-10 space-y-4">
          <h2 className="text-lg font-semibold text-text-primary">Worked Examples</h2>
          {frontmatter.worked_examples.map((ex, i) => (
            <div key={i} className="space-y-2 rounded-xl border border-navy-border bg-navy-light px-5 py-4">
              <p className="text-sm font-medium text-text-primary">
                <span className="text-text-tertiary">Q{i + 1}: </span>
                {ex.prompt}
              </p>
              <p className="text-sm text-text-secondary">
                <span className="font-semibold text-accent">Answer: </span>
                {ex.solution}
              </p>
            </div>
          ))}
        </section>
      )}

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
