import type { RequirementCheck } from "@/lib/job-matcher";

export type BadgeStatus =
  | "strong"
  | "close"
  | "failed-close"
  | "failed"
  | "unverifiable";

export interface ScoreBadgeData {
  label: string;
  actual: number;
  required: number;
  status: BadgeStatus;
}

const STATUS_CLASSES: Record<BadgeStatus, string> = {
  strong: "border-success/30 bg-success-dim text-success",
  close: "border-accent/30 bg-accent-dim text-accent",
  "failed-close": "border-almost/30 bg-almost-dim text-almost",
  failed: "border-danger/20 bg-danger-dim text-danger",
  // Neutral: we cannot pass/fail a raw MAGE sum against a percentile threshold.
  unverifiable: "border-navy-border bg-navy text-text-tertiary",
};

export function getBadgeStatus(delta: number): BadgeStatus {
  if (delta >= 10) return "strong";
  if (delta >= 0) return "close";
  if (delta >= -10) return "failed-close";
  return "failed";
}

export function checkToBadge(check: RequirementCheck): ScoreBadgeData {
  return {
    label: check.composite,
    actual: check.actual,
    required: check.required,
    status: check.unverifiable ? "unverifiable" : getBadgeStatus(check.delta),
  };
}

export default function ScoreBadge({ badge }: { badge: ScoreBadgeData }) {
  const cls = STATUS_CLASSES[badge.status];
  const deficit = badge.required - badge.actual;
  const isFailed = badge.status === "failed" || badge.status === "failed-close";

  // For MAGE composites we only know the job's required percentile. We do not show
  // the user's raw composite as if it were comparable, and we never imply pass/fail.
  if (badge.status === "unverifiable") {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[11px] leading-tight ${cls}`}
        title="MAGE thresholds are percentiles; your raw composite can't be converted to one."
      >
        <span className="font-semibold">{badge.label}</span>
        <span className="opacity-60">{badge.required} pctile req</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[11px] leading-tight ${cls}`}
    >
      <span className="font-semibold">{badge.label}</span>
      <span>{badge.actual}</span>
      <span className="opacity-50">/</span>
      <span className="opacity-60">{badge.required} req</span>
      {isFailed && (
        <>
          <span className="opacity-40">&middot;</span>
          <span className="opacity-80">need {deficit}</span>
        </>
      )}
    </span>
  );
}
