"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ALL_SUBTESTS, SUBTEST_NAMES, type Branch } from "@/types";
import { useEntitlement } from "@/hooks/useEntitlement";
import { useSession } from "@/hooks/useSession";
import { checkAnonDiagnosticUsed } from "@/lib/practice/gate";
import { isAdaptiveEnabled, loadActiveVariants } from "@/lib/practice/sampler";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  getPrepMode,
  adaptiveVariantForPrep,
  type TestType,
} from "@/lib/prep-mode";
import { practiceHref } from "@/lib/routes";

/**
 * Two-card variant picker for v1: Diagnostic + Subtest Drill.
 * The Subtest Drill card expands to reveal the 9 subtest options in a grid.
 * Non-Pro users see lock badges + are redirected to /upgrade instead of starting tests.
 */
export default function VariantPicker() {
  const [drillOpen, setDrillOpen] = useState(false);
  const router = useRouter();

  const { session } = useSession();
  const { entitlement, loading } = useEntitlement();

  const isPro = entitlement.isPro;
  const isAuthed = !!session;
  const diagnosticUsed = isAuthed
    ? !!entitlement.freeDiagnosticUsedAt
    : checkAnonDiagnosticUsed();

  // Diagnostic is locked (used badge) when the user already ran their one free test.
  const diagnosticLocked = !isPro && diagnosticUsed;
  // Drill is locked for any non-Pro user.
  const drillLocked = !isPro;
  // Adaptive practice is the FREE score-moving core (one block/day for free
  // users; unlimited for Pro). Anon users need an account first.
  const adaptiveAvailable = isAdaptiveEnabled();

  // Pro training modes (sprint / loop / retake) only render when their variant
  // row is active in the DB, so code deploys and variant activation can ship in
  // either order without dead cards.
  const [activeCodes, setActiveCodes] = useState<Set<string>>(new Set());
  useEffect(() => {
    let cancelled = false;
    loadActiveVariants().then((vs) => {
      if (!cancelled) setActiveCodes(new Set(vs.map((v) => v.code)));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Profile-aware adaptive variant (GT for Army/Marines AFCT, General for AF/SF,
  // AFQT otherwise). Best-effort fetch; default to AFQT until it settles so we
  // never block render.
  const [prep, setPrep] = useState<{
    testType: string | null;
    branch: string | null;
  }>({ testType: null, branch: null });

  useEffect(() => {
    if (!isAuthed || !session) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    sb.from("profiles")
      .select("test_type,branch")
      .eq("user_id", session.user.id)
      .single()
      .then(
        ({ data }: { data: { test_type: string | null; branch: string | null } | null }) => {
          if (data) setPrep({ testType: data.test_type, branch: data.branch });
        }
      );
  }, [isAuthed, session]);

  const prepMode = getPrepMode(
    prep.testType as TestType | null,
    prep.branch as Branch | null
  );
  const adaptiveVariant = adaptiveVariantForPrep(
    prep.testType as TestType | null,
    prep.branch as Branch | null
  );
  const adaptiveMetric = prepMode.primaryMetric; // "AFQT" | "GT" | "G"
  const adaptiveTitle =
    adaptiveMetric === "GT"
      ? "Adaptive GT Practice"
      : adaptiveMetric === "G"
        ? "Adaptive General Practice"
        : "Adaptive AFQT Practice";
  const adaptiveSubtitle =
    adaptiveMetric === "AFQT"
      ? "36 questions · ~39 minutes · AR / MK / WK / PC"
      : "36 questions · ~39 minutes · AR / WK / PC";
  const adaptiveBody =
    adaptiveMetric === "GT"
      ? "The score-moving core for Army and Marine reclass prep. Each block targets AR, WK, and PC only and refreshes your GT range after every session. One block a day is free; Pro unlocks unlimited."
      : adaptiveMetric === "G"
        ? "The score-moving core for Air Force/Space Force retraining. Each block targets AR, WK, and PC only and refreshes your General (G) range after every session. One block a day is free; Pro unlocks unlimited."
        : "The core of the method. Picks the right question at the right difficulty for where you are, close to one-on-one tutoring. One block a day is free; Pro unlocks unlimited.";
  const adaptiveFreeLabel =
    adaptiveMetric === "GT"
      ? "GT"
      : adaptiveMetric === "G"
        ? "General"
        : "AFQT";
  const adaptiveHref = isAuthed
    ? `/app/practice?variant=${adaptiveVariant}`
    : "/signup";
  // Full-length sim is Pro (paid gates sims); the plan paces it weekly in the
  // final stretch.
  const simLocked = !isPro;

  function handleDiagnosticClick(e: React.MouseEvent) {
    if (loading) return;
    if (diagnosticLocked) {
      e.preventDefault();
      router.push("/upgrade?from=diagnostic_used&variant=diagnostic");
    }
    // Else: Link's default href navigates normally.
  }

  function handleDrillSubtestClick(e: React.MouseEvent, st: string) {
    if (loading) return;
    if (drillLocked) {
      e.preventDefault();
      router.push(`/upgrade?from=variant_picker&variant=subtest_drill&subtest=${st}`);
    }
  }

  return (
    <div className="space-y-4">
      {/* Diagnostic */}
      <Link
        href={practiceHref("diagnostic", { authed: isAuthed })}
        onClick={handleDiagnosticClick}
        className="block rounded-2xl border border-navy-border bg-navy-light p-6 no-underline transition-colors hover:border-accent/40 hover:bg-navy-lighter sm:p-7"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-dim">
            <svg
              className="h-6 w-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
                Diagnostic Test
              </h2>
              {diagnosticLocked && !loading && (
                <span className="inline-flex items-center gap-1 rounded-md bg-yellow-500/20 px-2 py-0.5 text-xs font-semibold text-yellow-400">
                  Used
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-text-secondary">
              30 questions across all 9 subtests · 36 minutes
            </p>
            <p className="mt-2 text-sm text-text-tertiary">
              Best first stop. Get a balanced read on every section, an
              estimated AFQT, and your top-3 weak topics.
              {diagnosticLocked && !loading && (
                <span className="mt-1 block text-yellow-400/80">
                  You&apos;ve used your free diagnostic. Upgrade to run more.
                </span>
              )}
            </p>
          </div>
          <svg
            className="hidden h-5 w-5 shrink-0 text-text-tertiary sm:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>

      {/* Adaptive AFQT, the free score-moving core */}
      {adaptiveAvailable && (
        <Link
          href={adaptiveHref}
          className="block rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/10 to-transparent p-6 no-underline transition-colors hover:border-accent/70 sm:p-7"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-dim">
              <svg
                className="h-6 w-6 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
                  {adaptiveTitle}
                </h2>
                <span className="inline-flex items-center rounded-md bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">
                  Free · daily
                </span>
              </div>
              <p className="mt-1 text-sm text-text-secondary">
                {adaptiveSubtitle}
              </p>
              <p className="mt-2 text-sm text-text-tertiary">
                {adaptiveBody}
                {!isAuthed && (
                  <span className="mt-1 block text-accent/80">
                    Create a free account to start.
                  </span>
                )}
              </p>
            </div>
            <svg
              className="hidden h-5 w-5 shrink-0 text-text-tertiary sm:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      )}

      {/* Subtest Drill */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-7">
        <button
          type="button"
          onClick={() => {
            if (drillLocked && !loading) {
              router.push("/upgrade?from=variant_picker&variant=subtest_drill");
            } else {
              setDrillOpen((v) => !v);
            }
          }}
          className="block w-full text-left"
          aria-expanded={drillOpen}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f97316]/15">
              <svg
                className="h-6 w-6 text-[#f97316]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
              >
                <path d="M12 6V3m0 18v-3m6.36-12.36l2.12-2.12M3.52 20.48l2.12-2.12M21 12h-3M6 12H3m12.36 6.36l2.12 2.12M3.52 3.52l2.12 2.12M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
                  Subtest Drill
                </h2>
                {drillLocked && !loading && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75A4.5 4.5 0 007.5 6.75v3.75m-.75 0h10.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H7.125a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75z"
                      />
                    </svg>
                    Pro
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-text-secondary">
                25 questions on a single subtest · 20 minutes
              </p>
              <p className="mt-2 text-sm text-text-tertiary">
                Already know which section is dragging you down? Drill just
                that subtest until it stops being a weakness.
              </p>
            </div>
            {drillLocked && !loading ? (
              <svg
                className="hidden h-5 w-5 shrink-0 text-accent/60 sm:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75A4.5 4.5 0 007.5 6.75v3.75m-.75 0h10.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H7.125a.75.75 0 01-.75-.75v-7.5a.75.75 0 01.75-.75z"
                />
              </svg>
            ) : (
              <svg
                className={`hidden h-5 w-5 shrink-0 text-text-tertiary transition-transform sm:block ${
                  drillOpen ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        </button>

        {drillOpen && !drillLocked && (
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {ALL_SUBTESTS.map((st) => (
              <Link
                key={st}
                href={practiceHref("subtest_drill", { authed: isAuthed, subtest: st })}
                onClick={(e) => handleDrillSubtestClick(e, st)}
                className="flex flex-col items-start rounded-xl border border-navy-border bg-navy px-3 py-2.5 no-underline transition-colors hover:border-accent/40 hover:bg-navy-lighter"
              >
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-tertiary">
                  {st}
                </span>
                <span className="mt-0.5 text-sm font-semibold text-text-primary">
                  {SUBTEST_NAMES[st]}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Weakness Loop (Pro), short daily strike on the weakest topics */}
      {activeCodes.has("weakness_loop") && (
      <ProVariantCard
        variant="weakness_loop"
        title="Weakness Loop"
        meta="12 questions · 10 minutes · auto-targeted"
        body="A fast strike on your weakest topics: 8 questions where you miss most, plus 4 from neighboring skills so the fix sticks in context."
        locked={!isPro}
        loading={loading}
        isAuthed={isAuthed}
        router={router}
        iconPath="M13 10V3L4 14h7v7l9-11h-7z M19 19l-2-2m2 2l2 2m-2-2l2-2m-2 2l-2 2"
      />
      )}

      {/* AFQT Sprint (Pro), timed AFQT-only block */}
      {activeCodes.has("afqt_sprint") && (
      <ProVariantCard
        variant="afqt_sprint"
        title="AFQT Sprint"
        meta="59 questions · 45 minutes · AR / MK / WK / PC"
        body="A timed run of only the four subtests that decide your AFQT score. The pacing rehearsal between daily adaptive blocks and a full simulation."
        locked={!isPro}
        loading={loading}
        isAuthed={isAuthed}
        router={router}
        iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      )}

      {/* Retake Readiness (Pro), pre-test spot check */}
      {activeCodes.has("retake_readiness") && (
      <ProVariantCard
        variant="retake_readiness"
        title="Retake Readiness Check"
        meta="20 questions · 15 minutes · weak areas + fresh material"
        body="Scheduled a retake? 12 questions anchored in your prior weak topics plus 8 you haven't seen, so you know the gaps actually closed."
        locked={!isPro}
        loading={loading}
        isAuthed={isAuthed}
        router={router}
        iconPath="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      )}

      {/* Full-length simulation (Pro), final-stretch rehearsal */}
      <Link
        href={practiceHref("full_sim", { authed: isAuthed })}
        onClick={(e) => {
          if (loading) return;
          if (simLocked) {
            e.preventDefault();
            router.push("/upgrade?from=variant_picker&variant=full_sim");
          }
        }}
        className="block rounded-2xl border border-navy-border bg-navy-light p-6 no-underline transition-colors hover:border-accent/40 hover:bg-navy-lighter sm:p-7"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-lighter">
            <svg
              className="h-6 w-6 text-text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
                Full-Length Simulation
              </h2>
              {simLocked && !loading && (
                <span className="inline-flex items-center rounded-md bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">
                  Pro
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-text-secondary">
              134 questions · all 9 subtests · timed like the real thing
            </p>
            <p className="mt-2 text-sm text-text-tertiary">
              Save this for the final weeks. A full timed run builds stamina and
              pacing so test day feels familiar, not a daily drill.
            </p>
          </div>
          <svg
            className="hidden h-5 w-5 shrink-0 text-text-tertiary sm:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>

      {/* ── Phase E: free-tier footer hint ────────────────────────────────── */}
      <p className="mt-2 text-center text-xs text-text-tertiary">
        Free: 1 diagnostic + 1 adaptive {adaptiveFreeLabel} block/day + unlimited
        mistake review.&nbsp; Pro: unlimited adaptive, drills &amp; sims &middot;
        90-Day Pass $59 or $14.99/mo &middot;{" "}
        <Link
          href="/upgrade?from=variant_picker_footer"
          className="text-accent no-underline hover:underline"
        >
          See plans
        </Link>
      </p>
      {/* ── End Phase E ───────────────────────────────────────────────────── */}
    </div>
  );
}

/** Shared card for the Pro training modes (sprint / loop / retake). Mirrors the
 *  full_sim card: Pro badge + lock redirect for non-Pro, plain Link for Pro. */
function ProVariantCard({
  variant,
  title,
  meta,
  body,
  locked,
  loading,
  isAuthed,
  router,
  iconPath,
}: {
  variant: "afqt_sprint" | "weakness_loop" | "retake_readiness";
  title: string;
  meta: string;
  body: string;
  locked: boolean;
  loading: boolean;
  isAuthed: boolean;
  router: ReturnType<typeof useRouter>;
  iconPath: string;
}) {
  return (
    <Link
      href={practiceHref(variant, { authed: isAuthed })}
      onClick={(e) => {
        if (loading) return;
        if (locked) {
          e.preventDefault();
          router.push(`/upgrade?from=variant_picker&variant=${variant}`);
        }
      }}
      className="block rounded-2xl border border-navy-border bg-navy-light p-6 no-underline transition-colors hover:border-accent/40 hover:bg-navy-lighter sm:p-7"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-lighter">
          <svg
            className="h-6 w-6 text-text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-bold text-text-primary sm:text-xl">
              {title}
            </h2>
            {locked && !loading && (
              <span className="inline-flex items-center rounded-md bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">
                Pro
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-text-secondary">{meta}</p>
          <p className="mt-2 text-sm text-text-tertiary">{body}</p>
        </div>
        <svg
          className="hidden h-5 w-5 shrink-0 text-text-tertiary sm:block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
