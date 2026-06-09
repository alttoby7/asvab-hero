import type { Metadata } from "next";
import Link from "next/link";
import EmbedSnippet from "@/components/EmbedSnippet";

export const metadata: Metadata = {
  title: "Embed a Free ASVAB Calculator on Your Site",
  description:
    "Counselors, librarians, and JROTC instructors: embed ASVAB Hero's free AFQT calculator on your own page with one line of HTML. No account, no cost, no signup wall.",
  alternates: {
    canonical: "https://asvabhero.com/embed",
  },
};

export default function EmbedDirectoryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
        Free widgets for educators
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-text-primary sm:text-4xl">
        Embed a free ASVAB tool on your site
      </h1>
      <p className="mt-4 text-text-secondary leading-relaxed">
        If you run a school counseling page, a library guide, or a JROTC
        resource list, you can drop one of our free tools straight into your
        page. Students use it without leaving your site, and without creating an
        account. Copy the snippet, paste it into your page&apos;s HTML, done.
      </p>
      <p className="mt-3 text-sm text-text-tertiary leading-relaxed">
        ASVAB Hero is an independent test-prep site and is not affiliated with
        the U.S. Department of Defense. Our tools give estimates, not official
        scores.
      </p>

      <div className="mt-12 space-y-10">
        {/* AFQT calculator widget */}
        <section className="rounded-2xl border border-navy-border bg-navy-light/40 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-bold text-text-primary">
                AFQT Calculator
              </h2>
              <p className="mt-2 max-w-prose text-sm text-text-secondary leading-relaxed">
                Students enter their 4 AFQT subtest scores (AR, WK, PC, MK) and
                instantly see their AFQT percentile, DoD category, and which
                branches they qualify for under 2026 minimums.
              </p>
            </div>
            <Link
              href="/embed/afqt-calculator"
              className="shrink-0 rounded-md border border-navy-border bg-navy px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter no-underline"
            >
              Preview &rarr;
            </Link>
          </div>
          <div className="mt-5">
            <EmbedSnippet
              src="https://asvabhero.com/embed/afqt-calculator"
              title="AFQT Calculator by ASVAB Hero"
              height={720}
            />
          </div>
        </section>

        {/* Score-requirements widget */}
        <section className="rounded-2xl border border-navy-border bg-navy-light/40 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-bold text-text-primary">
                Score Requirements by Branch
              </h2>
              <p className="mt-2 max-w-prose text-sm text-text-secondary leading-relaxed">
                A compact reference table of the minimum AFQT score to enlist in
                each branch for 2026, with diploma vs GED. Good for a quick
                &quot;what do I need?&quot; answer on a resource page.
              </p>
            </div>
            <Link
              href="/embed/score-requirements"
              className="shrink-0 rounded-md border border-navy-border bg-navy px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-navy-lighter no-underline"
            >
              Preview &rarr;
            </Link>
          </div>
          <div className="mt-5">
            <EmbedSnippet
              src="https://asvabhero.com/embed/score-requirements"
              title="ASVAB Score Requirements by ASVAB Hero"
              height={420}
            />
          </div>
        </section>
      </div>

      {/* Cross-links */}
      <section className="mt-12 rounded-2xl border border-accent/30 bg-navy-light p-6 sm:p-8">
        <h2 className="font-display text-lg font-bold text-text-primary">
          Prefer to just link to us?
        </h2>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          Embedding is optional. You are welcome to link any of our free tools
          directly. The{" "}
          <Link
            href="/counselor-resources"
            className="text-accent underline hover:text-accent-hover"
          >
            counselor reference page
          </Link>{" "}
          gives a source-cited overview of the ASVAB for advisors, and the{" "}
          <Link
            href="/calculator"
            className="text-accent underline hover:text-accent-hover"
          >
            full ASVAB calculator
          </Link>{" "}
          and{" "}
          <Link
            href="/practice-test"
            className="text-accent underline hover:text-accent-hover"
          >
            free practice test
          </Link>{" "}
          are the tools students use most.
        </p>
      </section>
    </div>
  );
}
