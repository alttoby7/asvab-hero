import { SUBTEST_NAMES } from "@/types";
import type { AsvabSubtest } from "@/types";
import type { StudyGuide } from "@/lib/study-guides/loader";

/**
 * Presentational study-guide article body, shared by the public SEO page
 * (/study/[subtest]/[topicSlug]) and the in-app member page (/app/study/…).
 * Static content only (no session/hooks) — pages add their own CTAs, MiniDrill,
 * and (in-app) personalization so each surface routes correctly.
 */
export default function StudyGuideArticle({ guide }: { guide: StudyGuide }) {
  const { frontmatter, html } = guide;
  const subtestUpper = frontmatter.subtest as AsvabSubtest;
  const subtestName = SUBTEST_NAMES[subtestUpper] ?? frontmatter.subtest;

  return (
    <>
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
            <div
              key={i}
              className="space-y-2 rounded-xl border border-navy-border bg-navy-light px-5 py-4"
            >
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
    </>
  );
}
