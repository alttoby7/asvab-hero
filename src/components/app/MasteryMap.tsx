"use client";

import { useState } from "react";
import Link from "next/link";
import { SUBTEST_NAMES, ALL_SUBTESTS, type AsvabSubtest } from "@/types";
import type { TopicStats } from "@/types";

interface TopicMeta {
  id: string;
  subtest: string;
  slug: string;
  title: string;
}

interface MasteryMapProps {
  topicStats: TopicStats[];
  topics: TopicMeta[];
  isPro: boolean;
}

type Status = "unmeasured" | "weak" | "developing" | "strong";

const STATUS_COLORS: Record<Status, string> = {
  unmeasured: "bg-white/5",
  weak: "bg-danger",
  developing: "bg-almost",
  strong: "bg-success",
};

const STATUS_TEXT_COLORS: Record<Status, string> = {
  unmeasured: "text-text-tertiary",
  weak: "text-danger",
  developing: "text-almost",
  strong: "text-success",
};

const STATUS_BORDER: Record<Status, string> = {
  unmeasured: "border-white/10",
  weak: "border-danger/40",
  developing: "border-almost/40",
  strong: "border-success/40",
};

function getStatusLabel(s: Status): string {
  return s === "unmeasured" ? "Not measured" : s.charAt(0).toUpperCase() + s.slice(1);
}

export default function MasteryMap({ topicStats, topics, isPro }: MasteryMapProps) {
  const [expanded, setExpanded] = useState<AsvabSubtest | null>(null);

  const statsMap = new Map(topicStats.map((ts) => [ts.topic_id, ts]));
  const topicsBySubtest = new Map<AsvabSubtest, TopicMeta[]>();
  for (const t of topics) {
    const st = t.subtest as AsvabSubtest;
    if (!topicsBySubtest.has(st)) topicsBySubtest.set(st, []);
    topicsBySubtest.get(st)!.push(t);
  }

  const counts = { strong: 0, developing: 0, weak: 0, unmeasured: 0 };
  for (const t of topics) {
    const stat = statsMap.get(t.id);
    const status: Status = stat?.status as Status ?? "unmeasured";
    counts[status]++;
  }

  return (
    <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
      <h2 className="font-display text-lg font-semibold text-text-primary">
        Mastery Map
      </h2>

      {/* Summary */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-tertiary">
        <span>
          <span className="font-semibold text-success">{counts.strong}</span>{" "}
          strong
        </span>
        <span>
          <span className="font-semibold text-almost">{counts.developing}</span>{" "}
          developing
        </span>
        <span>
          <span className="font-semibold text-danger">{counts.weak}</span> weak
        </span>
        <span>
          <span className="font-semibold text-text-tertiary">
            {counts.unmeasured}
          </span>{" "}
          unmeasured
        </span>
      </div>

      {/* Subtest bars */}
      <div className="mt-5 space-y-2">
        {ALL_SUBTESTS.map((st) => {
          const subtopics = topicsBySubtest.get(st) ?? [];
          const statusCounts: Record<Status, number> = {
            strong: 0,
            developing: 0,
            weak: 0,
            unmeasured: 0,
          };
          for (const t of subtopics) {
            const stat = statsMap.get(t.id);
            const status: Status = (stat?.status as Status) ?? "unmeasured";
            statusCounts[status]++;
          }
          const total = subtopics.length || 1;
          const isExpanded = expanded === st;

          return (
            <div key={st}>
              <button
                onClick={() => setExpanded(isExpanded ? null : st)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-white/5"
              >
                <span className="w-8 shrink-0 text-xs font-bold text-text-secondary">
                  {st}
                </span>
                <div className="flex h-3 flex-1 overflow-hidden rounded-full bg-white/5">
                  {(["strong", "developing", "weak", "unmeasured"] as Status[]).map(
                    (s) =>
                      statusCounts[s] > 0 && (
                        <div
                          key={s}
                          className={`${STATUS_COLORS[s]} transition-all`}
                          style={{
                            width: `${(statusCounts[s] / total) * 100}%`,
                          }}
                        />
                      )
                  )}
                </div>
                <span className="w-16 shrink-0 text-right text-xs text-text-tertiary">
                  {statusCounts.strong + statusCounts.developing}/{total}
                </span>
                <svg
                  className={`h-4 w-4 shrink-0 text-text-tertiary transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Expanded topic grid */}
              {isExpanded && (
                <div className="mt-1 ml-10 grid grid-cols-2 gap-1.5 pb-2 sm:grid-cols-3">
                  {subtopics.map((t) => {
                    const stat = statsMap.get(t.id);
                    const status: Status =
                      (stat?.status as Status) ?? "unmeasured";
                    const acc =
                      stat && stat.seen > 0
                        ? Math.round((stat.correct / stat.seen) * 100)
                        : null;

                    return (
                      <Link
                        key={t.id}
                        href={`/study/${st.toLowerCase()}/${t.slug}`}
                        className={`rounded-lg border ${STATUS_BORDER[status]} px-3 py-2 no-underline transition-colors hover:bg-white/5`}
                      >
                        <div className="text-xs font-medium text-text-primary truncate">
                          {t.title}
                        </div>
                        <div
                          className={`mt-0.5 text-[10px] ${STATUS_TEXT_COLORS[status]}`}
                        >
                          {getStatusLabel(status)}
                          {acc != null && ` · ${acc}%`}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Subtest name legend */}
      <div className="mt-4 border-t border-navy-border pt-3">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-text-tertiary">
          {ALL_SUBTESTS.map((st) => (
            <span key={st}>
              <span className="font-bold">{st}</span> ={" "}
              {SUBTEST_NAMES[st]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
