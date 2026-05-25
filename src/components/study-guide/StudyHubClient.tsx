"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import type { AsvabSubtest } from "@/types";

export interface StudyGuideIndexEntry {
  topicId: string;
  subtest: AsvabSubtest;
  subtestName: string;
  slug: string;
  subtestSlug: string;
  title: string;
  summary: string;
}

interface Stat {
  seen: number;
  correct: number;
  priority: number;
}

function masteryPct(s: Stat | undefined): number | null {
  if (!s || s.seen <= 0) return null;
  return Math.round((s.correct / s.seen) * 100);
}

export default function StudyHubClient({
  index,
  order,
}: {
  index: StudyGuideIndexEntry[];
  order: AsvabSubtest[];
}) {
  const { session } = useSession();
  const [stats, setStats] = useState<Record<string, Stat>>({});
  const [studied, setStudied] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!session) {
        setLoaded(true);
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = getSupabaseBrowserClient() as any;
      const [statRes, progRes] = await Promise.all([
        sb.from("topic_stats").select("topic_id,seen,correct,priority").eq("user_id", session.user.id),
        sb
          .from("study_guide_progress")
          .select("topic_id,completed")
          .eq("user_id", session.user.id)
          .eq("completed", true),
      ]);
      if (cancelled) return;
      const sMap: Record<string, Stat> = {};
      for (const r of statRes.data ?? []) {
        sMap[r.topic_id] = {
          seen: r.seen ?? 0,
          correct: r.correct ?? 0,
          priority: r.priority ?? 0,
        };
      }
      setStats(sMap);
      setStudied(new Set((progRes.data ?? []).map((r: { topic_id: string }) => r.topic_id)));
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  // "Focus first": practiced topics that have a guide, weakest first (highest
  // priority, then lowest mastery). Only meaningful once there's some history.
  const focus = useMemo(() => {
    if (!loaded || !session) return [];
    return index
      .map((e) => ({ e, s: stats[e.topicId] }))
      .filter((x) => x.s && x.s.seen > 0 && (masteryPct(x.s) ?? 100) < 80)
      .sort((a, b) => {
        if ((b.s!.priority ?? 0) !== (a.s!.priority ?? 0)) return (b.s!.priority ?? 0) - (a.s!.priority ?? 0);
        return (masteryPct(a.s) ?? 100) - (masteryPct(b.s) ?? 100);
      })
      .slice(0, 3)
      .map((x) => x.e);
  }, [index, stats, loaded, session]);

  const studiedCount = studied.size;

  const bySubtest = useMemo(() => {
    const groups: { subtest: AsvabSubtest; name: string; items: StudyGuideIndexEntry[] }[] = [];
    for (const st of order) {
      const items = index.filter((e) => e.subtest === st);
      if (items.length) groups.push({ subtest: st, name: items[0].subtestName, items });
    }
    return groups;
  }, [index, order]);

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="flex items-center justify-between rounded-xl border border-navy-border bg-navy-light px-4 py-3 text-sm">
        <span className="text-text-secondary">
          <span className="font-semibold text-text-primary">{studiedCount}</span> of{" "}
          {index.length} concept guides studied
        </span>
        <div className="h-1.5 w-28 overflow-hidden rounded-full bg-navy">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${index.length ? (studiedCount / index.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Focus first (personalized) */}
      {focus.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
            Focus first, your weakest topics
          </h2>
          <div className="space-y-2">
            {focus.map((e) => (
              <FocusRow key={e.topicId} entry={e} pct={masteryPct(stats[e.topicId])} />
            ))}
          </div>
        </section>
      )}

      {/* All guides by subtest */}
      {bySubtest.map((g) => (
        <section key={g.subtest}>
          <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            <span className="rounded bg-navy-lighter px-1.5 py-0.5 font-mono text-text-secondary">
              {g.subtest}
            </span>
            {g.name}
          </h2>
          <div className="space-y-2">
            {g.items.map((e) => (
              <TopicRow
                key={e.topicId}
                entry={e}
                pct={masteryPct(stats[e.topicId])}
                studied={studied.has(e.topicId)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function FocusRow({ entry, pct }: { entry: StudyGuideIndexEntry; pct: number | null }) {
  return (
    <Link
      href={`/app/study/${entry.subtestSlug}/${entry.slug}`}
      className="flex items-center justify-between gap-3 rounded-xl border border-accent/40 bg-accent/5 px-4 py-3 no-underline transition-colors hover:border-accent/70"
    >
      <div className="min-w-0">
        <div className="truncate font-medium text-text-primary">{entry.title}</div>
        <div className="text-xs text-text-tertiary">
          {entry.subtestName} · {pct != null ? `${pct}% mastery` : "needs work"}
        </div>
      </div>
      <span className="shrink-0 text-sm font-semibold text-accent">Study →</span>
    </Link>
  );
}

function TopicRow({
  entry,
  pct,
  studied,
}: {
  entry: StudyGuideIndexEntry;
  pct: number | null;
  studied: boolean;
}) {
  return (
    <Link
      href={`/app/study/${entry.subtestSlug}/${entry.slug}`}
      className="block rounded-xl border border-navy-border bg-navy-light px-4 py-3 no-underline transition-colors hover:border-accent/40"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate font-medium text-text-primary">{entry.title}</span>
            {studied && (
              <span className="shrink-0 rounded border border-success/40 px-1.5 py-0.5 text-[10px] font-semibold text-success">
                ✓ Studied
              </span>
            )}
          </div>
          <div className="truncate text-xs text-text-tertiary">{entry.summary}</div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {pct != null ? (
            <span className="text-xs font-semibold text-text-secondary">{pct}%</span>
          ) : (
            <span className="text-xs text-text-tertiary">New</span>
          )}
          <span className="text-text-tertiary">→</span>
        </div>
      </div>
      {pct != null && (
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-navy">
          <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
        </div>
      )}
    </Link>
  );
}
