"use client";

/**
 * Personalized Pro upsell keyed to the user's PRIMARY target job (conversion
 * gap (b), 2026-06-10 plan). Generic "Ready to go faster?" copy becomes
 * "Your target: 25B — borderline on the GT 110 requirement" when the user has
 * a target job with an evaluated gap.
 *
 * Self-loading and FAIL-OPEN like GtPostBlockCard: if the trajectory fetch
 * breaks or the user has no target jobs, it falls back to the generic copy
 * (results variant) or renders nothing (upgrade variant). BAND-ONLY honesty
 * guardrail: gap language comes from the evaluated RequirementStatus/GapBand,
 * never an invented point delta; requirements are factual catalog data; the
 * proxy disclaimer always renders alongside personalized copy.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { getHomeTrajectory, type RpcClient } from "@/lib/trajectory/queries";
import { trackEvent } from "@/lib/analytics";
import type {
  RequirementStatus,
  TargetJobGap,
} from "@/lib/trajectory/types";

interface JobPitch {
  code: string;
  title: string;
  /** e.g. "GT 110" or "AFQT 31"; null when no single binding requirement. */
  requirement: string | null;
  status: RequirementStatus;
}

/**
 * Reduce a target-job gap to the single binding requirement worth talking
 * about: the worst-status mandatory composite check, falling back to AFQT.
 */
function pitchFromJob(job: TargetJobGap): JobPitch | null {
  if (job.support_status === "unsupported") return null;
  const order: Record<RequirementStatus, number> = {
    needs_work: 0,
    borderline: 1,
    qualifies: 2,
  };
  const mandatory = (job.checks ?? []).filter(
    (c) => c.requirement_group === 0,
  );
  const pool = mandatory.length > 0 ? mandatory : (job.checks ?? []);
  const worst = [...pool].sort((a, b) => order[a.status] - order[b.status])[0];
  if (worst) {
    return {
      code: job.code,
      title: job.title,
      requirement: `${worst.composite_code} ${worst.required_score}`,
      status: worst.status,
    };
  }
  if (job.afqt) {
    return {
      code: job.code,
      title: job.title,
      requirement: null,
      status: job.afqt.status,
    };
  }
  return null;
}

const STATUS_COPY: Record<
  RequirementStatus,
  (req: string | null) => string
> = {
  needs_work: (req) =>
    `On our practice scale you're still building toward ${
      req ? `the ${req} requirement` : "its requirements"
    }. Closing a real gap takes practice volume — Pro removes the one-block-a-day limit and adds full-length sims and score tracking so you can train at the pace your goal needs.`,
  borderline: (req) =>
    `You're borderline on ${
      req ? `the ${req} requirement` : "its requirements"
    } — close enough that consistent reps decide it. Pro removes the one-block-a-day limit and adds full-length sims so you can push past the line and stay there.`,
  qualifies: (req) =>
    `You're testing at or above ${
      req ? `the ${req} requirement` : "its requirements"
    } on our practice scale. Pro's full-length timed sims help you confirm it holds under real test conditions before the stakes are real.`,
};

interface ProUpsellCardProps {
  userId: string;
  from: "results" | "upgrade";
}

export default function ProUpsellCard({ userId, from }: ProUpsellCardProps) {
  const [pitch, setPitch] = useState<JobPitch | null | undefined>(undefined);
  const tracked = useRef(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const sb = getSupabaseBrowserClient();
        const traj = await getHomeTrajectory(sb as unknown as RpcClient);
        if (cancelled) return;
        const jobs = traj?.target_jobs ?? [];
        const primary = jobs.find((j) => j.is_primary) ?? jobs[0] ?? null;
        setPitch(primary ? pitchFromJob(primary) : null);
      } catch {
        if (!cancelled) setPitch(null); // fail open → generic copy
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    if (pitch === undefined || tracked.current) return;
    tracked.current = true;
    trackEvent("pro_upsell_view", {
      from,
      personalized: !!pitch,
      ...(pitch ? { status: pitch.status } : {}),
    });
  }, [pitch, from]);

  // Upgrade page: the page already has its own generic copy, so render the
  // strip only when we have something personal to say.
  if (from === "upgrade") {
    if (!pitch) return null;
    return (
      <div className="mb-10 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
          <span className="text-accent">●</span> Your target: {pitch.code} ·{" "}
          {pitch.title}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
          {STATUS_COPY[pitch.status](pitch.requirement)}
        </p>
        <p className="mt-2 text-xs text-text-tertiary">
          Practice estimates, not official scores or a qualification guarantee.
        </p>
      </div>
    );
  }

  // Results variant owns the whole Phase E section: personalized when
  // possible, the original generic copy otherwise (incl. while loading).
  return (
    <section className="rounded-2xl border-t-2 border-accent bg-navy-light p-6">
      <h3 className="font-display text-lg font-bold text-text-primary">
        {pitch ? `Your target: ${pitch.code} · ${pitch.title}` : "Ready to go faster?"}
      </h3>
      <p className="mt-2 text-sm text-text-secondary">
        {pitch ? (
          STATUS_COPY[pitch.status](pitch.requirement)
        ) : (
          <>
            Your free plan already drills these weak spots every day, one adaptive
            AFQT block plus Mistake-Bank review. Pro adds unlimited practice,
            full-length timed sims, and deeper analytics for the final push.
          </>
        )}{" "}
        One-time 90-Day Pass $59, or $24.99/mo.
      </p>
      {pitch && (
        <p className="mt-2 text-xs text-text-tertiary">
          Practice estimates, not official scores or a qualification guarantee.
        </p>
      )}
      <Link
        href="/upgrade?from=results"
        onClick={() =>
          trackEvent("pro_upsell_click", {
            from,
            personalized: !!pitch,
          })
        }
        className="mt-4 inline-flex items-center gap-1.5 font-semibold text-accent no-underline transition-colors hover:text-accent-hover"
      >
        See Pro &rarr;
      </Link>
    </section>
  );
}
