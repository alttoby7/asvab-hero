"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import { practiceHref } from "@/lib/routes";

/**
 * In-app personalization for a study-guide topic: durable "mark as studied"
 * (study_guide_progress.completed), the user's mastery on this topic (from
 * topic_stats), and app-scoped CTAs into targeted practice. Closes the
 * read -> drill loop without leaving the shell.
 */
interface Props {
  topicId: string; // = topics.id = "subtest.slug"
  subtest: string; // upper, e.g. "AR"
  subtestName: string;
}

export default function StudyTopicTools({ topicId, subtest, subtestName }: Props) {
  const { session } = useSession();
  const [studied, setStudied] = useState<boolean | null>(null);
  const [mastery, setMastery] = useState<{ seen: number; correct: number } | null>(null);
  const [saving, setSaving] = useState(false);
  const firstViewedRef = useRef<string | null>(null);

  const load = useCallback(async () => {
    if (!session) {
      setStudied(false);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const [progRes, statRes] = await Promise.all([
      sb
        .from("study_guide_progress")
        .select("completed,first_viewed_at")
        .eq("user_id", session.user.id)
        .eq("topic_id", topicId)
        .maybeSingle(),
      sb
        .from("topic_stats")
        .select("seen,correct")
        .eq("user_id", session.user.id)
        .eq("topic_id", topicId)
        .maybeSingle(),
    ]);
    firstViewedRef.current = progRes.data?.first_viewed_at ?? null;
    setStudied(!!progRes.data?.completed);
    setMastery(
      statRes.data ? { seen: statRes.data.seen ?? 0, correct: statRes.data.correct ?? 0 } : null
    );
  }, [session, topicId]);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleStudied() {
    if (!session || saving || studied === null) return;
    setSaving(true);
    const now = new Date().toISOString();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const next = !studied;
    // Only `completed` (+ view timestamps) is in the payload, so the upsert never
    // clobbers mini-drill columns written by MiniDrill on conflict-update.
    await sb.from("study_guide_progress").upsert(
      {
        user_id: session.user.id,
        topic_id: topicId,
        completed: next,
        first_viewed_at: firstViewedRef.current ?? now,
        last_viewed_at: now,
        updated_at: now,
      },
      { onConflict: "user_id,topic_id" }
    );
    if (!firstViewedRef.current) firstViewedRef.current = now;
    setStudied(next);
    setSaving(false);
  }

  const pct =
    mastery && mastery.seen > 0 ? Math.round((mastery.correct / mastery.seen) * 100) : null;

  return (
    <div className="mb-8 rounded-2xl border border-navy-border bg-navy-light p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
          Your mastery
        </span>
        <span className="text-xs text-text-tertiary">
          {mastery && mastery.seen > 0
            ? `${mastery.correct}/${mastery.seen} correct`
            : "Not practiced yet"}
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-navy">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${pct ?? 0}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-text-tertiary">
        {pct == null
          ? "Read the concept above, then run a quick drill to lock it in."
          : pct >= 80
            ? "Strong, keep it warm with the occasional drill."
            : "Read the concept above, then drill until this climbs."}
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Link
          href={practiceHref("subtest_drill", { authed: true, subtest })}
          className="flex-1 rounded-xl bg-accent px-5 py-3 text-center text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
        >
          Drill {subtestName}
        </Link>
        <button
          type="button"
          onClick={toggleStudied}
          disabled={saving || studied === null}
          className={
            "flex-1 rounded-xl border px-5 py-3 text-center text-sm font-semibold transition-colors disabled:opacity-60 " +
            (studied
              ? "border-success/50 bg-success-dim text-success"
              : "border-navy-border bg-navy text-text-secondary hover:text-text-primary")
          }
        >
          {studied ? "✓ Studied" : "Mark as studied"}
        </button>
      </div>
    </div>
  );
}
