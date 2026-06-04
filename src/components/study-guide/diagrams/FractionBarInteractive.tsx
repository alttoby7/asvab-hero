"use client";

/**
 * Interactive fraction bar. Explore: pick a denominator, tap to shade, and see
 * the fraction / decimal / percent update together. Quiz: a shaded bar is shown,
 * name the numerator. Pairs with the number line for the AR/MK "see it three
 * ways" skill Khan teaches generically and ASVAB sites skip.
 */
import { useState } from "react";
import { InteractiveCard, ModeToggle, NumField, CheckButton, QuizFooter, useScore, rnd, numOf, type Mode, type DiagramContext } from "./_kit";

const ORANGE = "#f97316";
const EMPTY = "#1a2942";
const BORDER = "#243350";

const DENOMS = [2, 3, 4, 5, 6, 8];

function Bar({ num, den }: { num: number; den: number }) {
  const W = 280;
  const H = 48;
  const gap = 3;
  const segW = (W - gap * (den - 1)) / den;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`${num} of ${den} shaded`}>
      {Array.from({ length: den }, (_, i) => (
        <rect key={i} x={i * (segW + gap)} y={0} width={segW} height={H} rx={4} fill={i < num ? ORANGE : EMPTY} stroke={i < num ? "none" : BORDER} />
      ))}
    </svg>
  );
}

export default function FractionBarInteractive({ label = "Fraction bar", context }: { label?: string; context?: DiagramContext }) {
  const [mode, setMode] = useState<Mode>("explore");
  const [den, setDen] = useState(4);
  const [num, setNum] = useState(3);

  const [q, setQ] = useState<{ num: number; den: number } | null>(null);
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);
  const { score, record, reset } = useScore();

  const pct = Math.round((num / den) * 1000) / 10;
  const dec = Math.round((num / den) * 1000) / 1000;

  const startQuiz = () => {
    const d = DENOMS[rnd(0, DENOMS.length - 1)];
    setMode("quiz");
    setQ({ den: d, num: rnd(1, d - 1) });
    setGuess("");
    setChecked(false);
    reset();
  };
  const next = () => {
    const d = DENOMS[rnd(0, DENOMS.length - 1)];
    setQ({ den: d, num: rnd(1, d - 1) });
    setGuess("");
    setChecked(false);
  };
  const toExplore = () => { setMode("explore"); setQ(null); setChecked(false); };

  const gn = numOf(guess);
  const correct = q != null && gn != null && Math.abs(gn - q.num) < 1e-6;

  return (
    <InteractiveCard label={label} toggle={<ModeToggle mode={mode} onExplore={toExplore} onQuiz={startQuiz} />}>
      {mode === "explore" ? (
        <>
          <div role="group" aria-label="shade segments">
            <svg viewBox="0 0 280 48" width="100%">
              {Array.from({ length: den }, (_, i) => {
                const gap = 3;
                const segW = (280 - gap * (den - 1)) / den;
                return (
                  <rect
                    key={i}
                    x={i * (segW + gap)}
                    y={0}
                    width={segW}
                    height={48}
                    rx={4}
                    fill={i < num ? ORANGE : EMPTY}
                    stroke={i < num ? "none" : BORDER}
                    style={{ cursor: "pointer" }}
                    onClick={() => setNum(i + 1)}
                  />
                );
              })}
            </svg>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-1 text-xs">
            <span className="mr-1 font-bold text-text-tertiary">denominator</span>
            {DENOMS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => { setDen(d); setNum((n) => Math.min(n, d)); }}
                className={`rounded border px-2 py-1 font-mono font-semibold ${den === d ? "border-accent bg-accent text-navy" : "border-navy-border text-text-secondary hover:border-navy-lighter"}`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="block text-xs font-bold text-accent">fraction</span>
              <span className="font-mono text-lg font-bold text-accent">{num}/{den}</span>
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">decimal</span>
              <span className="font-mono text-lg font-bold text-text-primary">{dec}</span>
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">percent</span>
              <span className="font-mono text-lg font-bold text-text-primary">{pct}%</span>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-text-tertiary">Tap segments to shade · same value, three notations</p>
        </>
      ) : q ? (
        <>
          <Bar num={q.num} den={q.den} />
          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">denominator</span>
              <span className="font-mono text-lg font-bold text-text-primary">{q.den}</span>
            </div>
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-accent">numerator?</span>
              {checked ? (
                <span className={`font-mono text-lg font-bold ${correct ? "text-success" : "text-danger"}`}>{q.num}</span>
              ) : (
                <NumField value={guess} onChange={setGuess} placeholder="?" active autoFocus />
              )}
            </div>
          </div>
          {checked ? (
            <QuizFooter
              correct={correct}
              resultText={correct ? "Correct ✓" : `Not quite — ${q.num} of ${q.den} shaded`}
              formula={`${q.num}/${q.den} = ${Math.round((q.num / q.den) * 1000) / 1000}`}
              score={score}
              context={context}
              onNext={next}
            />
          ) : (
            <CheckButton onClick={() => { record(correct); setChecked(true); }} disabled={gn == null} />
          )}
        </>
      ) : null}
    </InteractiveCard>
  );
}
