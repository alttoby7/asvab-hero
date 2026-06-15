"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { MilitaryJob } from "@/types";
import { trackEvent } from "@/lib/analytics";

/**
 * Branch-agnostic, sortable score table for a "jobs by ASVAB score" hub.
 *
 * Crawlability: this is a client component, but in the static export it is
 * prerendered, so ALL rows ship in the static HTML at build time (the indexable
 * unique-data asset). The default sort (line score ascending) is what lands in
 * that static HTML. Click-to-sort is progressive enhancement after hydration;
 * no rows are added or removed by sorting, only reordered.
 *
 * AND / OR semantics (matches JobCatalog.reqLabel and the calculator):
 *   • requirements[] = ALL must pass  -> joined with " · "
 *   • anyOf[]        = ANY one passes -> joined with " or "
 * minScore 0 (audition-gated, e.g. Navy Musician) renders without a number.
 */

type SortKey = "code" | "title" | "category" | "score" | "afqt";
type SortDir = "asc" | "desc";

/** Active requirement set: requirements (AND) if present, else anyOf (OR). */
function activeReqs(job: MilitaryJob): { reqs: { composite: string; minScore: number }[]; isOr: boolean } {
  if (job.requirements?.length) return { reqs: job.requirements, isOr: false };
  if (job.anyOf?.length) return { reqs: job.anyOf, isOr: true };
  return { reqs: [], isOr: false };
}

/** Numeric barrier used for the "score" sort (min cutoff across the req set). */
function barrier(job: MilitaryJob): number {
  const { reqs } = activeReqs(job);
  const nums = reqs.map((r) => r.minScore);
  return nums.length ? Math.min(...nums) : Number.POSITIVE_INFINITY;
}

/** Human label for the required-line-score cell. */
function scoreLabel(job: MilitaryJob): string {
  const { reqs, isOr } = activeReqs(job);
  if (reqs.length === 0) return "See recruiter";
  const parts = reqs.map((r) =>
    r.minScore > 0 ? `${r.composite} ${r.minScore}+` : `${r.composite} (audition)`,
  );
  return parts.join(isOr ? " or " : " · ");
}

const COLUMNS: { key: SortKey; label: string; className?: string }[] = [
  { key: "code", label: "Rating", className: "" },
  { key: "title", label: "Job title" },
  { key: "category", label: "Community" },
  { key: "score", label: "Required line score" },
  { key: "afqt", label: "Min AFQT" },
];

export default function JobScoreTable({
  jobs,
  caption,
  calculatorHref = "/calculator",
  calculatorLabel = "free ASVAB score calculator",
}: {
  jobs: MilitaryJob[];
  /** Visually-hidden table caption for a11y + crawlers, e.g. "All 79 Navy ratings...". */
  caption?: string;
  /** Branch calculator the footer note links to (reuse across branch hubs). */
  calculatorHref?: string;
  calculatorLabel?: string;
}) {
  // Default sort = lowest barrier first ("what can I get into with the lowest
  // score"); this order is what ships in the static HTML.
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const sorted = useMemo(() => {
    const copy = [...jobs];
    copy.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "code":
          cmp = a.code.localeCompare(b.code);
          break;
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "category":
          cmp = a.category.localeCompare(b.category) || a.code.localeCompare(b.code);
          break;
        case "afqt":
          cmp = (a.minAFQT ?? 0) - (b.minAFQT ?? 0) || barrier(a) - barrier(b);
          break;
        case "score":
        default:
          cmp = barrier(a) - barrier(b) || a.code.localeCompare(b.code);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [jobs, sortKey, sortDir]);

  function onSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      // Text columns default A->Z; numeric columns default low->high.
      setSortDir("asc");
    }
    trackEvent("job_table_sort", { sort_key: key });
  }

  return (
    <div className="my-6 not-prose overflow-x-auto rounded-xl border border-navy-border">
      <table className="w-full border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-navy-border bg-navy-light">
            {COLUMNS.map((col) => {
              const active = col.key === sortKey;
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                  className="p-0"
                >
                  <button
                    type="button"
                    onClick={() => onSort(col.key)}
                    className="flex w-full items-center gap-1 px-3 py-2.5 text-left font-semibold text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {col.label}
                    <span
                      aria-hidden="true"
                      className={`text-xs ${active ? "text-accent" : "text-text-tertiary/50"}`}
                    >
                      {active ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
                    </span>
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((job) => (
            <tr
              key={job.id}
              className="border-b border-navy-border/50 last:border-0 odd:bg-navy/40 hover:bg-navy-light/60"
            >
              <th scope="row" className="whitespace-nowrap px-3 py-2.5 font-mono text-xs font-bold text-accent">
                {job.code}
              </th>
              <td className="px-3 py-2.5 text-text-primary">{job.title}</td>
              <td className="whitespace-nowrap px-3 py-2.5 text-text-tertiary">{job.category}</td>
              <td className="px-3 py-2.5 font-mono text-xs text-text-secondary">{scoreLabel(job)}</td>
              <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs text-text-secondary">
                {typeof job.minAFQT === "number" ? `AFQT ${job.minAFQT}+` : "See recruiter"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-navy-border bg-navy-light/50 px-3 py-2 text-xs text-text-tertiary">
        Tap any column header to sort. Two requirements joined by{" "}
        <span className="font-mono">or</span> mean you only need to hit one; joined by{" "}
        <span className="font-mono">&middot;</span> means all are required. Check your own scores
        with the{" "}
        <Link href={calculatorHref} className="text-accent hover:text-accent-hover">
          {calculatorLabel}
        </Link>
        .
      </p>
    </div>
  );
}
