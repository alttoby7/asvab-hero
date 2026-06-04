"use client";

/**
 * Shared building blocks for the interactive (client) study-guide diagrams.
 * Keeps the card shell, Explore/Quiz toggle, and number helpers consistent
 * across diagrams so they don't drift. See OhmsLawTriangleInteractive for the
 * canonical explore + predict→check pattern these support.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { trackEvent, FunnelEvents } from "@/lib/analytics";
import { SUBTEST_NAMES } from "@/types";
import type { AsvabSubtest } from "@/types";

export type Mode = "explore" | "quiz";

/** Context StudyGuideArticle injects into every diagram so the quiz loop can
 *  deep-link to the matching practice drill. */
export interface DiagramContext {
  topicId?: string;
  subtest?: string;
  diagramType?: string;
}

export interface Score {
  correct: number;
  total: number;
}

/** Tracks the running quiz score within a single diagram session. */
export function useScore() {
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });
  const record = (ok: boolean) =>
    setScore((s) => ({ correct: s.correct + (ok ? 1 : 0), total: s.total + 1 }));
  const reset = () => setScore({ correct: 0, total: 0 });
  return { score, record, reset };
}

export const rnd = (min: number, max: number) =>
  min + Math.floor(Math.random() * (max - min + 1));

export const numOf = (s: string): number | null => {
  const n = parseFloat(s);
  return s.trim() !== "" && isFinite(n) ? n : null;
};

export const fmt = (n: number): string =>
  !isFinite(n) ? "—" : String(Math.round(n * 1000) / 1000);

export function ModeToggle({
  mode,
  onExplore,
  onQuiz,
}: {
  mode: Mode;
  onExplore: () => void;
  onQuiz: () => void;
}) {
  return (
    <span role="group" aria-label="diagram mode" className="flex overflow-hidden rounded-md border border-navy-border text-[11px] font-semibold">
      <button
        type="button"
        aria-pressed={mode === "explore"}
        onClick={onExplore}
        className={mode === "explore" ? "bg-accent px-2 py-1 text-navy" : "px-2 py-1 text-text-tertiary hover:text-text-secondary"}
      >
        Explore
      </button>
      <button
        type="button"
        aria-pressed={mode === "quiz"}
        onClick={onQuiz}
        className={mode === "quiz" ? "bg-accent px-2 py-1 text-navy" : "px-2 py-1 text-text-tertiary hover:text-text-secondary"}
      >
        Quiz me
      </button>
    </span>
  );
}

export function InteractiveCard({
  label,
  toggle,
  children,
}: {
  label: string;
  toggle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="m-0 rounded-xl border border-navy-border bg-navy-light px-5 py-4">
      <figcaption className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">{label}</span>
        {toggle}
      </figcaption>
      {children}
    </figure>
  );
}

/** A small numeric input used by the explore/quiz controls. */
export function NumField({
  value,
  onChange,
  placeholder,
  unit,
  active,
  disabled,
  autoFocus,
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  unit?: string;
  active?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <span className="flex items-center justify-center gap-1">
      <input
        inputMode="decimal"
        value={value}
        autoFocus={autoFocus}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder ?? "value"}
        className={`w-full min-w-0 rounded border bg-navy-light px-1.5 py-1 text-center font-mono text-sm text-text-primary outline-none ${active ? "border-accent" : "border-navy-border focus:border-accent"}`}
      />
      {unit ? <span className="text-xs text-text-tertiary">{unit}</span> : null}
    </span>
  );
}

export function CheckButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mx-auto mt-3 block rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-navy hover:bg-accent-hover disabled:opacity-40"
    >
      Check
    </button>
  );
}

export function NextButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-navy hover:bg-accent-hover"
    >
      Next problem
    </button>
  );
}

/**
 * Shared result + funnel footer for every diagram quiz.
 *
 * FREE-FIRST (Phase 2-deeper): the diagram's own quiz already IS the free
 * targeted rep, so the footer leads with free next steps — keep practicing
 * here (Next), or take the free diagnostic — and DEMOTES the Pro drill to a
 * small secondary link. We gate depth/saved-progress, never the first rep.
 *
 * Attribution: a per-rep origin_session id is minted client-side and carried
 * into every destination URL + every event (diagram_quiz_answered,
 * diagram_next_step) so a diagram interaction can be tied to a downstream
 * signup/paywall/upgrade in GA4.
 */
export function QuizFooter({
  correct,
  resultText,
  formula,
  score,
  context,
  onNext,
}: {
  correct: boolean;
  resultText: string;
  formula?: ReactNode;
  score?: Score;
  context?: DiagramContext;
  onNext: () => void;
}) {
  const subtest = context?.subtest;
  const subName = subtest ? (SUBTEST_NAMES[subtest as AsvabSubtest] ?? subtest) : null;

  // per-rep origin id (client-only mount, so crypto is available + no hydration risk)
  const originRef = useRef<string | null>(null);
  if (originRef.current === null) {
    originRef.current =
      typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `o_${Date.now()}`;
  }
  const origin = originRef.current;

  const base = {
    topic_id: context?.topicId,
    subtest,
    diagram_type: context?.diagramType,
    origin_session: origin,
  };

  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackEvent(FunnelEvents.DiagramQuizAnswered, { ...base, is_correct: correct, source: "diagram_quiz" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const originQs = `origin=diagram&origin_topic=${encodeURIComponent(context?.topicId ?? "")}&origin_session=${origin}`;
  const step = (which: string) => trackEvent(FunnelEvents.DiagramNextStep, { ...base, step: which });

  return (
    <div className="mt-3" aria-live="polite">
      <p className={`text-center text-sm font-semibold ${correct ? "text-success" : "text-danger"}`}>{resultText}</p>
      {formula ? (
        <p className="mt-1 text-center text-xs text-text-tertiary">
          <span className="font-mono text-text-secondary">{formula}</span>
        </p>
      ) : null}
      {score && score.total > 1 ? (
        <p className="mt-1 text-center text-[11px] text-text-tertiary">You: {score.correct}/{score.total} this session</p>
      ) : null}

      {/* free-first next steps */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => { step("next"); onNext(); }}
          className="rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-navy hover:bg-accent-hover"
        >
          Keep practicing
        </button>
        <Link
          href={`/practice-test?variant=diagnostic&${originQs}`}
          onClick={() => step("diagnostic")}
          className="rounded-lg border border-navy-border px-4 py-1.5 text-sm font-semibold text-text-secondary no-underline transition-colors hover:border-accent hover:text-text-primary"
        >
          Take the free diagnostic →
        </Link>
      </div>

      {/* demoted Pro */}
      {subtest ? (
        <p className="mt-2 text-center">
          <Link
            href={`/practice-test?variant=subtest_drill&subtest=${subtest}&${originQs}`}
            onClick={() => step("pro_drill")}
            className="text-xs text-text-tertiary underline-offset-2 hover:text-text-secondary hover:underline"
          >
            Or unlock unlimited {subName} drills with Pro
          </Link>
        </p>
      ) : null}
    </div>
  );
}
