"use client";

/**
 * Animated product walkthrough — the "Gap-to-Goal Rail" (Codex-brainstormed pick).
 *
 * One ~8s proof loop: an AFQT marker starts "short by 4", the three daily-loop
 * stations (Diagnose → Clear Mistakes → Adaptive block) each ratchet it forward,
 * and it lands on the target tick, flipping "Short by 4" → "Qualified". This
 * visualizes the product's whole promise (the gap closing) without claiming a
 * guaranteed result (see the honest caption). Autoplays once on scroll-into-view;
 * honors prefers-reduced-motion with a static final state. SVG/CSS only — no
 * libraries, static-export safe, mobile-first, no layout shift.
 */

import { useEffect, useRef, useState } from "react";

const RANGE_LOW = 42;
const RANGE_HIGH = 54;
const TARGET = 50;
const STEPS = [
  { score: 46, label: "Diagnose", note: "See exactly where you stand." },
  { score: 48, label: "Clear your Mistake Bank", note: "Every miss comes back until you own it." },
  { score: 50, label: "One adaptive block", note: "The right question, at the right difficulty." },
] as const;

function pct(score: number): number {
  return Math.max(0, Math.min(100, ((score - RANGE_LOW) / (RANGE_HIGH - RANGE_LOW)) * 100));
}

export default function GapToGoalRail() {
  // step: -1 idle · 0/1/2 stations · 3 done. Start at the FINAL state for SSR /
  // reduced-motion / no-JS so there's never a broken or empty first paint.
  const [step, setStep] = useState(3);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);

  function play() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStep(-1);
    [0, 1, 2, 3].forEach((s, i) => {
      timers.current.push(
        window.setTimeout(() => setStep(s), 350 + i * 1150)
      );
    });
  }

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(3);
      return;
    }
    const el = rootRef.current;
    if (!el) return;
    let played = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !played) {
          played = true;
          play();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, []);

  // Current displayed score: before any station, sit at the baseline.
  const activeScore = step < 0 ? STEPS[0].score : STEPS[Math.min(step, 2)].score;
  const qualified = step >= 3;
  const shownScore = qualified ? TARGET : activeScore;
  const gap = Math.max(0, TARGET - shownScore);

  return (
    <div
      ref={rootRef}
      className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
          <span className="text-accent">●</span> How the daily loop closes the gap
        </p>
        <button
          onClick={play}
          className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary transition-colors hover:text-text-secondary"
        >
          ↻ Replay
        </button>
      </div>

      {/* Score + status */}
      <div className="mt-5 flex items-end justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-5xl font-extrabold leading-none text-text-primary tabular-nums sm:text-6xl">
              {shownScore}
            </span>
            <span className="text-xs uppercase tracking-widest text-text-tertiary">
              AFQT
            </span>
          </div>
        </div>
        <span
          className={
            "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide transition-colors duration-500 " +
            (qualified
              ? "bg-success/15 text-success"
              : "bg-danger/15 text-danger")
          }
        >
          {qualified ? "✓ Qualified" : `Short by ${gap}`}
        </span>
      </div>

      {/* The rail */}
      <div className="relative mt-4 h-3 w-full rounded-full bg-navy-lighter">
        {/* fill to current score */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent/70 to-accent transition-[width] duration-700 ease-out"
          style={{ width: `${pct(shownScore)}%` }}
        />
        {/* target tick */}
        <div
          className="absolute -top-1 bottom-[-0.25rem] w-0.5 bg-text-secondary"
          style={{ left: `${pct(TARGET)}%` }}
          aria-hidden
        />
        {/* marker */}
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-navy bg-accent shadow-[0_0_16px_var(--color-accent-glow)] transition-[left] duration-700 ease-out"
          style={{ left: `${pct(shownScore)}%` }}
          aria-hidden
        />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
        <span>You</span>
        <span style={{ marginRight: `${100 - pct(TARGET)}%` }}>
          Target {TARGET}
        </span>
      </div>

      {/* Stations */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {STEPS.map((s, i) => {
          const active = step === i;
          const complete = step > i;
          return (
            <div
              key={s.label}
              className={
                "rounded-xl border p-4 transition-all duration-300 " +
                (active
                  ? "border-accent bg-accent-dim"
                  : complete
                    ? "border-success/30 bg-navy"
                    : "border-navy-border bg-navy")
              }
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    "flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold " +
                    (complete
                      ? "bg-success/20 text-success"
                      : active
                        ? "bg-accent text-white"
                        : "bg-navy-lighter text-text-tertiary")
                  }
                >
                  {complete ? "✓" : i + 1}
                </span>
                <h3 className="font-display text-sm font-bold text-text-primary">
                  {s.label}
                </h3>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
                {s.note}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-xs text-text-tertiary">
        An illustration of the daily loop — not a guaranteed result. How far your
        score climbs depends on the reps you put in.
      </p>
    </div>
  );
}
