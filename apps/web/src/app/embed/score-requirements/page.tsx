import type { Metadata } from "next";
import { BRANCH_MINIMUMS } from "@/lib/branch-minimums";

export const metadata: Metadata = {
  title: "ASVAB Score Requirements by Branch (Embed) | ASVAB Hero",
  description:
    "Embeddable reference of the minimum AFQT score to enlist in each U.S. military branch (2026), diploma vs GED.",
  // Bare iframe target. Keep it out of the index so it never competes with the
  // real /asvab-score-requirements page; the link value flows to the canonical.
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://asvabhero.com/asvab-score-requirements",
  },
};

export default function ScoreRequirementsEmbedPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <div className="mb-4">
        <h1 className="font-display text-xl font-bold text-text-primary">
          Minimum ASVAB Score by Branch (2026)
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          The minimum AFQT percentile to enlist, by branch and education tier.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-navy-border bg-navy-light">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-navy-border text-text-secondary">
              <th className="px-4 py-2 text-left font-semibold">Branch</th>
              <th className="px-4 py-2 text-left font-semibold">Diploma min</th>
              <th className="px-4 py-2 text-left font-semibold">GED</th>
            </tr>
          </thead>
          <tbody>
            {BRANCH_MINIMUMS.map(({ branch, min, practicalMin, gedNote }) => (
              <tr key={branch} className="border-b border-navy-border/50">
                <td className="px-4 py-2 font-semibold text-text-primary">
                  {branch}
                </td>
                <td className="px-4 py-2 font-mono text-accent">
                  {min}
                  {practicalMin ? (
                    <span className="text-text-tertiary"> · {practicalMin} typical</span>
                  ) : null}
                </td>
                <td className="px-4 py-2 text-text-secondary">{gedNote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-text-tertiary">
        Peacetime diploma-track minimums. Branches can raise thresholds based on
        recruiting needs. Always confirm current minimums with a recruiter.
      </p>

      {/* Do-follow backlink: the SEO payload of the widget. Literal absolute
          <a>, never rel="nofollow". */}
      <p className="mt-6 border-t border-navy-border pt-4 text-center text-xs text-text-tertiary">
        <a
          href="https://asvabhero.com/asvab-score-requirements"
          target="_blank"
          rel="noopener"
          className="font-semibold text-accent hover:text-accent-hover"
        >
          ASVAB Score Requirements by ASVAB Hero
        </a>
      </p>
    </div>
  );
}
