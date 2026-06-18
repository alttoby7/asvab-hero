"use client";

/**
 * Disappointed-scorer path: surface FREE study guides for the two lowest AFQT
 * subtests the user typed into the calculator. The calculator only has the nine
 * typed scores (no topic-level signal), so the weak signal is the lowest of the
 * four AFQT subtests (AR, WK, PC, MK). Each link points at a public study guide
 * and tracks a calculator_study_guide_click event.
 */

import Link from "next/link";
import { studyGuidesForSubtest } from "@/lib/practice/topic-catalog";
import { trackEvent } from "@/lib/analytics";
import { SUBTEST_NAMES } from "@/types";
import type { AsvabSubtest, SubtestScores } from "@/types";

interface Props {
  scores: SubtestScores;
  afqt: number;
}

/** The four subtests that determine AFQT. */
const AFQT_SUBTESTS: AsvabSubtest[] = ["AR", "WK", "PC", "MK"];

export default function CalculatorWeakSubtestGuides({ scores, afqt }: Props) {
  // Two lowest AFQT subtests by typed score, ascending.
  const lowest = [...AFQT_SUBTESTS]
    .sort((a, b) => (scores[a] ?? 0) - (scores[b] ?? 0))
    .slice(0, 2);

  const blocks = lowest
    .map((subtest) => ({ subtest, guides: studyGuidesForSubtest(subtest, 3) }))
    .filter((b) => b.guides.length > 0);

  if (blocks.length === 0) return null;

  return (
    <section className="rounded-xl border border-navy-border bg-navy-light p-6">
      <h2 className="mb-1 font-display text-lg font-bold text-text-primary">
        Free study guides for your two lowest subtests
      </h2>
      <p className="mb-4 text-sm text-text-secondary">
        These are the AFQT subtests holding your score back the most. Start here
        to close the gap, no account needed.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {blocks.map((b) => (
          <div
            key={b.subtest}
            className="rounded-lg border border-navy-border bg-navy p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded bg-accent-dim px-2 py-0.5 font-mono text-xs font-bold text-accent">
                {b.subtest}
              </span>
              <span className="text-sm font-semibold text-text-secondary">
                {SUBTEST_NAMES[b.subtest]}
              </span>
            </div>
            <ul className="space-y-1.5">
              {b.guides.map((g) => (
                <li key={g.href}>
                  <Link
                    href={g.href}
                    onClick={() =>
                      trackEvent("calculator_study_guide_click", {
                        topic_id: g.topicId,
                        subtest: b.subtest,
                        href: g.href,
                        afqt,
                      })
                    }
                    className="text-sm text-text-primary underline-offset-2 transition-colors hover:text-accent hover:underline"
                  >
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
