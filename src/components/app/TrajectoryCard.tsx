"use client";

/**
 * WS4 — Trajectory card.
 *
 * Shows the user's DERIVED current AFQT standing as a BAND + a confidence badge
 * — never a single AFQT number. Renders the projected test-day band ONLY when
 * the backend provides one (projected_test_day != null); otherwise it tells the
 * user honestly that another diagnostic is needed to project test day. No
 * fabricated numbers.
 */

import Link from "next/link";
import {
  AFQT_BANDS,
  type Confidence,
  type CurrentStanding,
  type ProjectedTestDay,
  type PrimaryMetric,
} from "@/lib/trajectory/types";

const CONFIDENCE_BADGE: Record<Confidence, { label: string; cls: string }> = {
  low: {
    label: "Low confidence",
    cls: "border-danger/40 bg-danger-dim text-danger",
  },
  medium: {
    label: "Medium confidence",
    cls: "border-almost/40 bg-almost-dim text-almost",
  },
  high: {
    label: "High confidence",
    cls: "border-success/40 bg-success-dim text-success",
  },
};

// AFQT cutoffs a candidate actually cares about (0-99 percentile scale).
const AFQT_QUALIFY = 31; // common qualifying floor across branches
const AFQT_BENCHMARK = 50; // "above average" benchmark

type InterpTone = "danger" | "almost" | "success";

const INTERP_TONE: Record<InterpTone, string> = {
  danger: "text-danger",
  almost: "text-almost",
  success: "text-success",
};

/** Plain-English reading of an AFQT band against the 31 / 50 cutoffs. */
function interpretBand(low: number, high: number): { line: string; tone: InterpTone } {
  if (high < AFQT_QUALIFY)
    return { line: "Below the common 31 qualifying cutoff", tone: "danger" };
  if (low < AFQT_QUALIFY)
    return { line: "Right around the common 31 cutoff", tone: "almost" };
  if (low >= AFQT_BENCHMARK)
    return { line: "Above the 50 benchmark — strong standing", tone: "success" };
  return { line: "Above the 31 minimum — climbing toward 50", tone: "success" };
}

/** A 0-99 AFQT scale with the user's band highlighted and the 31/50 cutoffs marked. */
function BandScale({ low, high, tone }: { low: number; high: number; tone: InterpTone }) {
  const clamp = (n: number) => Math.max(0, Math.min(100, n));
  const fill =
    tone === "danger" ? "bg-danger" : tone === "almost" ? "bg-almost" : "bg-success";
  return (
    <div className="mt-3" aria-hidden="true">
      <div className="relative h-2 rounded-full bg-navy">
        <div
          className={`absolute top-0 h-2 rounded-full ${fill}`}
          style={{ left: `${clamp(low)}%`, width: `${clamp(high - low)}%` }}
        />
        <span
          className="absolute top-[-3px] h-3.5 w-px bg-text-secondary"
          style={{ left: `${AFQT_QUALIFY}%` }}
        />
        <span
          className="absolute top-[-3px] h-3.5 w-px bg-text-tertiary"
          style={{ left: `${AFQT_BENCHMARK}%` }}
        />
      </div>
      <div className="relative mt-1 h-3 text-[10px] text-text-tertiary">
        <span className="absolute -translate-x-1/2" style={{ left: `${AFQT_QUALIFY}%` }}>
          31
        </span>
        <span className="absolute -translate-x-1/2" style={{ left: `${AFQT_BENCHMARK}%` }}>
          50
        </span>
      </div>
    </div>
  );
}

/** Whole days from now until an ISO yyyy-mm-dd date (negative = past). */
function daysUntil(iso: string): number | null {
  const t = new Date(iso + "T00:00:00").getTime();
  if (Number.isNaN(t)) return null;
  return Math.ceil((t - Date.now()) / 86400000);
}

/**
 * Test-day countdown chip for the hero. Shows a precise day count when an exact
 * test date is set; otherwise a subtle prompt to set one (a coarse bucket alone
 * can't drive a real countdown — or the date-based emails).
 */
function TestDayCountdown({ iso }: { iso: string | null }) {
  const days = iso ? daysUntil(iso) : null;
  if (iso && days != null) {
    const label =
      days > 1
        ? `${days} days to test day`
        : days === 1
          ? "1 day to test day"
          : days === 0
            ? "Test day is today"
            : "Test day has passed";
    return (
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-dim px-3 py-1 text-xs font-semibold text-accent">
        <span aria-hidden="true">⏱</span>
        {label}
      </div>
    );
  }
  return (
    <Link
      href="/account/settings"
      className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-navy-border bg-navy px-3 py-1 text-xs font-medium text-text-secondary no-underline transition-colors hover:text-text-primary"
    >
      <span aria-hidden="true">⏱</span> Set your test date
    </Link>
  );
}

interface TrajectoryCardProps {
  currentStanding: CurrentStanding;
  projectedTestDay: ProjectedTestDay | null;
  /** S5: when the user preps AFCT on a VE+AR branch, show GT/G proxy instead. */
  primaryMetric?: PrimaryMetric | null;
  /** Ground-truth official AFQT anchor (AFQT mode only). Null = not logged. */
  officialAfqt?: number | null;
  /** ISO yyyy-mm-dd the official result was logged. */
  officialDate?: string | null;
  /** Exact target test date (ISO yyyy-mm-dd) for the countdown; null = prompt. */
  testDateIso?: string | null;
  // ── GT Target Mode (Army/Marines AFCT) ──────────────────────────────
  /** Turns on the GT target/gap/projection layout. */
  gtTargetMode?: boolean;
  targetValue?: number | null;
  targetSource?: "profile" | "job" | "max" | null;
  targetJobCode?: string | null;
  gtRangeLow?: number | null;
  gtRangeHigh?: number | null;
  gapToTarget?: number | null;
  /** Client-derived GT confidence (backend confidence is AFQT-shaped). */
  confidenceOverride?: Confidence | null;
  /** ISO yyyy-mm-dd when projectable; else null. */
  projectedTargetDate?: string | null;
  projectionStatus?: "available" | "at_target" | "unavailable" | null;
  /** Honest cold-start / unavailable copy when no date is shown. */
  projectedReason?: string | null;
}

function formatTargetDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function TrajectoryCard({
  currentStanding,
  projectedTestDay,
  primaryMetric,
  officialAfqt = null,
  officialDate = null,
  testDateIso = null,
  gtTargetMode,
  targetValue,
  targetSource,
  targetJobCode,
  gtRangeLow,
  gtRangeHigh,
  gapToTarget,
  confidenceOverride,
  projectedTargetDate,
  projectionStatus,
  projectedReason,
}: TrajectoryCardProps) {
  const effectiveConfidence = confidenceOverride ?? currentStanding.overall_confidence;
  const badge = CONFIDENCE_BADGE[effectiveConfidence];
  const isProxy = primaryMetric?.is_proxy === true;

  // ── GT Target Mode (Army/Marines AFCT) ───────────────────────────────────
  if (gtTargetMode && isProxy && primaryMetric.is_proxy) {
    const point = primaryMetric.current_value;
    const hasStanding = currentStanding.attempt_count > 0 && point != null;
    const hasRange = gtRangeLow != null && gtRangeHigh != null;
    const fromJob = targetSource === "job" || targetSource === "max";
    return (
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
        <TestDayCountdown iso={testDateIso} />
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-accent">
              GT Target Mode
            </div>
            {hasStanding ? (
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-text-primary">
                  {point}
                </span>
                <span className="text-sm text-text-secondary">
                  GT (practice proxy)
                </span>
              </div>
            ) : (
              <div className="mt-1 font-display text-lg font-bold text-text-primary">
                Not established yet
              </div>
            )}
            {hasStanding && hasRange && (
              <div className="mt-0.5 text-xs text-text-tertiary">
                Range {gtRangeLow}–{gtRangeHigh}
              </div>
            )}
          </div>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${badge.cls}`}
          >
            {badge.label}
          </span>
        </div>

        {!hasStanding && (
          <p className="mt-3 text-sm text-text-secondary">
            Finish your first GT block to establish a starting range. It updates
            AR, WK, and PC together and calibrates everything else here.
          </p>
        )}

        {/* Target + gap */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-navy-border bg-navy px-4 py-3">
            <div className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Target GT
            </div>
            <div className="mt-1 font-display text-xl font-bold text-text-primary">
              {targetValue != null ? targetValue : "—"}
            </div>
            {targetValue != null && fromJob && (
              <div className="mt-0.5 text-[11px] text-text-tertiary">
                Based on your primary goal job
                {targetJobCode ? ` (${targetJobCode})` : ""}
              </div>
            )}
          </div>
          <div className="rounded-xl border border-navy-border bg-navy px-4 py-3">
            <div className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Gap to target
            </div>
            <div className="mt-1 font-display text-xl font-bold text-text-primary">
              {projectionStatus === "at_target"
                ? "At target"
                : gapToTarget != null && gapToTarget > 0
                  ? `~${gapToTarget}`
                  : "—"}
            </div>
            {gapToTarget != null && gapToTarget > 0 && (
              <div className="mt-0.5 text-[11px] text-text-tertiary">
                About {gapToTarget} GT points to target
              </div>
            )}
          </div>
        </div>

        {/* Projected target date — honest: only when our guardrails pass. */}
        <div className="mt-3 rounded-xl border border-navy-border bg-navy px-4 py-3">
          <div className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
            Projected target date
          </div>
          {projectionStatus === "available" && projectedTargetDate ? (
            <div className="mt-1 font-display text-lg font-bold text-accent">
              At your current pace: around {formatTargetDate(projectedTargetDate)}
            </div>
          ) : projectionStatus === "at_target" ? (
            <p className="mt-1 text-sm text-text-secondary">
              You&apos;re testing at or above your target on our practice scale.
            </p>
          ) : (
            <p className="mt-1 text-sm text-text-secondary">
              {projectedReason ??
                "Keep running GT blocks and we&apos;ll project a target date once your data supports it."}
            </p>
          )}
        </div>

        <p className="mt-3 text-[11px] leading-snug text-text-tertiary">
          Practice proxy based on AR + WK + PC on our equated scale — not an
          official GT score or a qualification guarantee.
        </p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-[11px] text-text-tertiary">
            Based on {currentStanding.attempt_count}{" "}
            {currentStanding.attempt_count === 1 ? "attempt" : "attempts"}.
          </span>
          <Link
            href="/app/practice?variant=gt_adaptive"
            className="shrink-0 text-xs font-medium text-accent no-underline transition-colors hover:text-accent-hover"
          >
            {hasStanding ? "Run a GT block" : "Start your first GT block"}
          </Link>
        </div>
      </div>
    );
  }

  // ── GT/General proxy mode (AFCT on a VE+AR branch) ───────────────────────
  if (isProxy && primaryMetric.is_proxy) {
    const hasStanding =
      currentStanding.attempt_count > 0 && primaryMetric.current_value != null;
    return (
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
        <TestDayCountdown iso={testDateIso} />
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Where you&apos;re testing now
            </div>
            {hasStanding ? (
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-text-primary">
                  {primaryMetric.current_value}
                </span>
                <span className="text-sm text-text-secondary">
                  {primaryMetric.label} (practice proxy)
                </span>
              </div>
            ) : (
              <div className="mt-1 font-display text-lg font-bold text-text-primary">
                Not established yet
              </div>
            )}
          </div>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${badge.cls}`}
          >
            {badge.label}
          </span>
        </div>

        {!hasStanding && (
          <p className="mt-3 text-sm text-text-secondary">
            Take a diagnostic to see your starting {primaryMetric.label}. It takes
            about 15 minutes and calibrates everything else here.
          </p>
        )}

        {/* Projected test day — proxy value when provided. */}
        <div className="mt-4 rounded-xl border border-navy-border bg-navy px-4 py-3">
          <div className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
            Projected on test day
          </div>
          {projectedTestDay && primaryMetric.projected_value != null ? (
            <div className="mt-1 flex items-center gap-2">
              <span className="font-display text-xl font-bold text-accent">
                {primaryMetric.projected_value}
              </span>
              <span className="text-xs text-text-tertiary">
                {CONFIDENCE_BADGE[projectedTestDay.overall_confidence].label.toLowerCase()}
              </span>
            </div>
          ) : (
            <p className="mt-1 text-sm text-text-secondary">
              Take another diagnostic to project your test-day {primaryMetric.label}.
              We won&apos;t guess from a single data point.
            </p>
          )}
        </div>

        <p className="mt-3 text-[11px] leading-snug text-text-tertiary">
          A practice proxy to track your {primaryMetric.label} climb on our equated
          scale — not an official {primaryMetric.label} score. Real qualification
          targets vary by role/program.
        </p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-[11px] text-text-tertiary">
            Based on {currentStanding.attempt_count}{" "}
            {currentStanding.attempt_count === 1 ? "attempt" : "attempts"}.
          </span>
          <Link
            href="/app/practice?variant=diagnostic"
            className="shrink-0 text-xs font-medium text-accent no-underline transition-colors hover:text-accent-hover"
          >
            {hasStanding ? "Retake diagnostic" : "Start diagnostic"}
          </Link>
        </div>
      </div>
    );
  }

  // ── AFQT mode (Initial ASVAB, or AFCT fallback) ──────────────────────────
  const hasStanding =
    currentStanding.attempt_count > 0 && currentStanding.afqt_band_label != null;
  const band =
    currentStanding.afqt_band_key != null
      ? AFQT_BANDS.find((b) => b.key === currentStanding.afqt_band_key) ?? null
      : null;
  const interp = hasStanding && band ? interpretBand(band.low, band.high) : null;

  return (
    <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
      <TestDayCountdown iso={testDateIso} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
            Where you&apos;re testing now
          </div>
          {hasStanding ? (
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-text-primary">
                {currentStanding.afqt_band_label}
              </span>
              <span className="text-sm text-text-secondary">AFQT band</span>
            </div>
          ) : (
            <div className="mt-1 font-display text-lg font-bold text-text-primary">
              Not established yet
            </div>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${badge.cls}`}
        >
          {badge.label}
        </span>
      </div>

      {/* Interpretation + where the band sits on the 0-99 AFQT scale. */}
      {interp && band && (
        <>
          <p className={`mt-2 text-sm font-medium ${INTERP_TONE[interp.tone]}`}>
            {interp.line}
          </p>
          <BandScale low={band.low} high={band.high} tone={interp.tone} />
        </>
      )}

      {!hasStanding && (
        <p className="mt-3 text-sm text-text-secondary">
          Take a diagnostic to see your current AFQT band. It takes about 15
          minutes and calibrates everything else here.
        </p>
      )}

      {/* Official AFQT anchor — the ground-truth result when logged. */}
      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-navy-border bg-navy px-4 py-3">
        <div className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
          Official AFQT
        </div>
        {officialAfqt != null ? (
          <div className="text-sm font-semibold text-success">
            {officialAfqt}
            {officialDate && (
              <span className="ml-2 font-normal text-text-tertiary">
                logged {formatTargetDate(officialDate)}
              </span>
            )}
          </div>
        ) : (
          <div className="text-sm text-text-secondary">
            Not logged yet
            <Link
              href="/app/retake"
              className="ml-2 font-medium text-accent no-underline transition-colors hover:text-accent-hover"
            >
              Log it →
            </Link>
          </div>
        )}
      </div>

      {/* Projected test day — only when the backend supplies one. */}
      <div className="mt-3 rounded-xl border border-navy-border bg-navy px-4 py-3">
        <div className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
          Projected on test day
        </div>
        {projectedTestDay && projectedTestDay.afqt_band_label ? (
          <div className="mt-1 flex items-center gap-2">
            <span className="font-display text-xl font-bold text-accent">
              {projectedTestDay.afqt_band_label}
            </span>
            <span className="text-xs text-text-tertiary">
              {CONFIDENCE_BADGE[projectedTestDay.overall_confidence].label.toLowerCase()}
            </span>
          </div>
        ) : (
          <p className="mt-1 text-sm text-text-secondary">
            Take another diagnostic to project your test-day score. We won&apos;t
            guess from a single data point.
          </p>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-[11px] text-text-tertiary">
          Based on {currentStanding.attempt_count}{" "}
          {currentStanding.attempt_count === 1 ? "attempt" : "attempts"}. Bands
          tighten as you practice more.
        </span>
        <Link
          href="/practice-test?variant=diagnostic"
          className="shrink-0 text-xs font-medium text-accent no-underline transition-colors hover:text-accent-hover"
        >
          {hasStanding ? "Retake diagnostic" : "Start diagnostic"}
        </Link>
      </div>
    </div>
  );
}
