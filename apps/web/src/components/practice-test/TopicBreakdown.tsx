"use client";

import type { TopicResult } from "@/types";
import { getTopicTitle } from "@/lib/practice/topic-catalog";

interface TopicBreakdownProps {
  topicResults: TopicResult[];
}

type Bucket = "strong" | "developing" | "weak";

function bucketFor(pct: number, seen: number): Bucket {
  if (seen < 2) return "developing";
  if (pct >= 75) return "strong";
  if (pct >= 55) return "developing";
  return "weak";
}

const BUCKET_STYLES: Record<
  Bucket,
  { dot: string; pct: string; bg: string }
> = {
  strong: {
    dot: "bg-green-400",
    pct: "text-green-400",
    bg: "bg-green-400/10",
  },
  developing: {
    dot: "bg-accent",
    pct: "text-accent",
    bg: "bg-accent-dim",
  },
  weak: {
    dot: "bg-red-400",
    pct: "text-red-400",
    bg: "bg-red-400/10",
  },
};

function TopicRow({ result }: { result: TopicResult }) {
  const bucket = bucketFor(result.percentage, result.seen);
  const styles = BUCKET_STYLES[bucket];
  return (
    <li className="flex items-center justify-between gap-3 text-sm">
      <span className="flex items-center gap-2 text-text-secondary">
        <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
        <span className="truncate">{getTopicTitle(result.topic_id)}</span>
      </span>
      <span
        className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-xs font-bold ${styles.pct} ${styles.bg}`}
      >
        {result.correct}/{result.seen} · {result.percentage}%
      </span>
    </li>
  );
}

export default function TopicBreakdown({
  topicResults,
}: TopicBreakdownProps) {
  if (topicResults.length === 0) return null;

  // Show top-3 strongest + top-3 weakest. Tie-break by `seen` descending so
  // a 100%-on-1-question topic doesn't dominate "strengths".
  const usable = topicResults.filter((r) => r.seen > 0);
  const sorted = [...usable].sort(
    (a, b) => a.percentage - b.percentage || b.seen - a.seen
  );
  const weakest = sorted.slice(0, 3);
  const strongest = [...usable]
    .sort((a, b) => b.percentage - a.percentage || b.seen - a.seen)
    .slice(0, 3);

  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-navy-border bg-navy-light p-5">
        <h3 className="mb-3 font-display text-base font-bold text-green-400">
          Strongest Topics
        </h3>
        <ul className="space-y-2">
          {strongest.map((r) => (
            <TopicRow key={r.topic_id} result={r} />
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-navy-border bg-navy-light p-5">
        <h3 className="mb-3 font-display text-base font-bold text-red-400">
          Weakest Topics
        </h3>
        <ul className="space-y-2">
          {weakest.map((r) => (
            <TopicRow key={r.topic_id} result={r} />
          ))}
        </ul>
      </div>
    </section>
  );
}
