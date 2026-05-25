"use client";

/**
 * Post-block GT trajectory card (Army/Marines AFCT). Shown on the results page
 * right after a GT block, the highest-conversion GT moment after home.
 *
 * Self-loading and FAIL-OPEN: if any query breaks, it renders nothing and the
 * results page is unaffected. Uses the GT helper as the single source of truth
 * and never shows a projected date unless the honest guardrails pass.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { getHomeTrajectory } from "@/lib/trajectory/queries";
import { trackEvent } from "@/lib/analytics";
import type { Confidence } from "@/lib/trajectory/types";
import {
  getGtRange,
  getGtConfidence,
  getEffectiveGtTarget,
  getGtGap,
  getGtProjection,
  GT_PROJECTION_REASON_COPY,
  type GtProjection,
  type GtTargetSource,
} from "@/lib/trajectory/gt-target-mode";

interface GtPostBlockCardProps {
  userId: string;
}

interface ViewModel {
  point: number | null;
  rangeLow: number | null;
  rangeHigh: number | null;
  target: number | null;
  targetSource: GtTargetSource;
  jobCode: string | null;
  gap: number | null;
  confidence: Confidence;
  projection: GtProjection;
}

const CONFIDENCE_LABEL: Record<Confidence, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

function formatTargetDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function GtPostBlockCard({ userId }: GtPostBlockCardProps) {
  const [vm, setVm] = useState<ViewModel | null>(null);
  const tracked = useRef(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sb = getSupabaseBrowserClient() as any;
        const [profRes, attemptsRes, studyRes, traj] = await Promise.all([
          sb
            .from("profiles")
            .select("target_gt_score,test_type,branch,study_days_per_week")
            .eq("user_id", userId)
            .single(),
          sb
            .from("attempts")
            .select("primary_metric_code,primary_metric_estimate,completed_at")
            .eq("user_id", userId)
            .order("completed_at", { ascending: false })
            .limit(50),
          sb
            .from("study_days")
            .select("study_date")
            .eq("user_id", userId)
            .order("study_date", { ascending: false })
            .limit(120),
          getHomeTrajectory(sb).catch(() => null),
        ]);
        if (cancelled) return;

        const prof = profRes.data as
          | {
              target_gt_score: number | null;
              study_days_per_week: number | null;
            }
          | null;
        const standing = traj?.current_standing ?? null;
        const subtests = standing?.subtest_estimates ?? {};
        const range = getGtRange(subtests);
        const confidence = getGtConfidence(subtests);
        const eff = getEffectiveGtTarget(
          prof?.target_gt_score ?? null,
          traj?.target_jobs ?? []
        );
        const point =
          traj?.primary_metric?.is_proxy &&
          traj.primary_metric.code === "GT"
            ? traj.primary_metric.current_value
            : range.point;
        const gap = getGtGap(point, eff.target);
        const projection = getGtProjection({
          attempts: (attemptsRes.data ?? [])
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((a: any) => a.completed_at)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((a: any) => ({
              primary_metric_code: a.primary_metric_code,
              primary_metric_estimate: a.primary_metric_estimate,
              completed_at: a.completed_at,
            })),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          studyDays: (studyRes.data ?? []).map((r: any) => r.study_date),
          targetGt: eff.target,
          studyDaysPerWeek: prof?.study_days_per_week ?? null,
          gtConfidence: confidence,
        });

        setVm({
          point,
          rangeLow: range.low,
          rangeHigh: range.high,
          target: eff.target,
          targetSource: eff.source,
          jobCode: eff.jobCode,
          gap,
          confidence,
          projection,
        });
      } catch {
        /* fail open, leave vm null, render nothing */
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (!vm || tracked.current) return;
    tracked.current = true;
    trackEvent("gt_trajectory_view", {
      surface: "results",
      has_projection: vm.projection.status === "available",
      confidence: vm.confidence,
    });
    if (vm.projection.status === "available") {
      trackEvent("gt_projected_date_shown", {
        surface: "results",
        days_to_target: vm.projection.calendarDaysNeeded,
        study_days_used: vm.projection.studyDaysObserved,
        attempts_used: vm.projection.attemptsUsed,
      });
    }
  }, [vm]);

  if (!vm) return null;

  const fromJob = vm.targetSource === "job" || vm.targetSource === "max";
  const hasRange = vm.rangeLow != null && vm.rangeHigh != null;

  return (
    <section className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8">
      <div className="text-xs font-semibold uppercase tracking-wider text-accent">
        GT Target Mode
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-text-tertiary">
            Current GT
          </div>
          <div className="mt-0.5 font-display text-2xl font-bold text-text-primary">
            {vm.point != null ? vm.point : ", "}
          </div>
          {vm.point != null && hasRange && (
            <div className="text-[11px] text-text-tertiary">
              Range {vm.rangeLow}–{vm.rangeHigh}
            </div>
          )}
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wide text-text-tertiary">
            Target GT
          </div>
          <div className="mt-0.5 font-display text-2xl font-bold text-text-primary">
            {vm.target != null ? vm.target : ", "}
          </div>
          {vm.target != null && fromJob && (
            <div className="text-[11px] text-text-tertiary">
              From goal job{vm.jobCode ? ` (${vm.jobCode})` : ""}
            </div>
          )}
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wide text-text-tertiary">
            Gap to target
          </div>
          <div className="mt-0.5 font-display text-2xl font-bold text-text-primary">
            {vm.projection.status === "at_target"
              ? "At target"
              : vm.gap != null && vm.gap > 0
                ? `~${vm.gap}`
                : ", "}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wide text-text-tertiary">
            Confidence
          </div>
          <div className="mt-0.5 font-display text-2xl font-bold text-text-primary">
            {CONFIDENCE_LABEL[vm.confidence]}
          </div>
        </div>
      </div>

      {/* Projected target date, honest. */}
      <div className="mt-4 rounded-xl border border-navy-border bg-navy px-4 py-3">
        <div className="text-[11px] uppercase tracking-wide text-text-tertiary">
          Projected target date
        </div>
        {vm.projection.status === "available" ? (
          <div className="mt-1 font-display text-lg font-bold text-accent">
            At your current pace: around{" "}
            {formatTargetDate(vm.projection.projectedDate)}
          </div>
        ) : vm.projection.status === "at_target" ? (
          <p className="mt-1 text-sm text-text-secondary">
            You&apos;re testing at or above your target on our practice scale.
          </p>
        ) : (
          <p className="mt-1 text-sm text-text-secondary">
            {GT_PROJECTION_REASON_COPY[vm.projection.reason]}
          </p>
        )}
      </div>

      <p className="mt-3 text-[11px] leading-snug text-text-tertiary">
        Practice proxy only. Not an official GT score or a qualification
        guarantee.
      </p>

      <Link
        href="/app/plan"
        className="mt-4 inline-flex rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-accent-hover"
      >
        See my GT plan
      </Link>
    </section>
  );
}
