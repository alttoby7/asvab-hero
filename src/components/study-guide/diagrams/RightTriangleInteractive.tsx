"use client";

/**
 * Interactive Pythagorean right-triangle. Explore: pick which side to solve for,
 * type the other two, the third computes live (a²+b²=c²). Quiz: a Pythagorean
 * triple with one side hidden — predict, then check.
 *
 * Beats the static geometry diagrams competitors ship (ASVABTestBank has a
 * labeled triangle, but it doesn't compute). Follows the Ohm's template.
 */
import { useMemo, useState } from "react";
import { InteractiveCard, ModeToggle, NumField, CheckButton, NextButton, rnd, numOf, fmt, type Mode } from "./_kit";

type Side = "a" | "b" | "c";

const ORANGE = "#f97316";
const INK = "#f1f5f9";
const MUTED = "#94a3b8";

const TRIPLES = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [8, 15, 17],
  [9, 12, 15],
  [7, 24, 25],
  [20, 21, 29],
];

interface Quiz {
  solveFor: Side;
  given: Partial<Record<Side, number>>;
  answer: number;
}

function genQuiz(): Quiz {
  const t = TRIPLES[rnd(0, TRIPLES.length - 1)];
  const map: Record<Side, number> = { a: t[0], b: t[1], c: t[2] };
  const which: Side = (["a", "b", "c"] as Side[])[rnd(0, 2)];
  const given: Partial<Record<Side, number>> = {};
  (["a", "b", "c"] as Side[]).forEach((s) => {
    if (s !== which) given[s] = map[s];
  });
  return { solveFor: which, given, answer: map[which] };
}

export default function RightTriangleInteractive({ label = "Right triangle (Pythagorean)" }: { label?: string }) {
  const [mode, setMode] = useState<Mode>("explore");
  const [solveFor, setSolveFor] = useState<Side>("c");
  const [vals, setVals] = useState<Record<Side, string>>({ a: "", b: "", c: "" });

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);

  const exploreResult = useMemo(() => {
    const a = numOf(vals.a);
    const b = numOf(vals.b);
    const c = numOf(vals.c);
    if (solveFor === "c") return a != null && b != null ? Math.sqrt(a * a + b * b) : null;
    if (solveFor === "a") return c != null && b != null && c > b ? Math.sqrt(c * c - b * b) : null;
    return c != null && a != null && c > a ? Math.sqrt(c * c - a * a) : null;
  }, [vals, solveFor]);

  const active = mode === "quiz" && quiz ? quiz.solveFor : solveFor;
  const formula = active === "c" ? "c = √(a² + b²)" : active === "a" ? "a = √(c² − b²)" : "b = √(c² − a²)";

  const startQuiz = () => { setMode("quiz"); setQuiz(genQuiz()); setGuess(""); setChecked(false); };
  const next = () => { setQuiz(genQuiz()); setGuess(""); setChecked(false); };
  const toExplore = () => { setMode("explore"); setQuiz(null); setChecked(false); };

  const gn = numOf(guess);
  const correct = quiz != null && gn != null && Math.abs(gn - quiz.answer) < 1e-6;

  // triangle geometry: right angle at A (bottom-left)
  const A: [number, number] = [44, 118];
  const B: [number, number] = [44, 28];
  const C: [number, number] = [196, 118];
  const sideColor = (s: Side) => (active === s ? ORANGE : MUTED);

  const sides: Side[] = ["a", "b", "c"];
  const sideName: Record<Side, string> = { a: "a", b: "b", c: "c (hyp)" };

  return (
    <InteractiveCard label={label} toggle={<ModeToggle mode={mode} onExplore={toExplore} onQuiz={startQuiz} />}>
      <svg viewBox="0 0 240 150" width="100%" role="img" aria-label="Right triangle with legs a and b and hypotenuse c">
        <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={sideColor("a")} strokeWidth={active === "a" ? 3.5 : 2.5} />
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={sideColor("b")} strokeWidth={active === "b" ? 3.5 : 2.5} />
        <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={sideColor("c")} strokeWidth={active === "c" ? 3.5 : 2.5} />
        {/* right-angle marker */}
        <polyline points={`${A[0] + 12},${A[1]} ${A[0] + 12},${A[1] - 12} ${A[0]},${A[1] - 12}`} fill="none" stroke={MUTED} strokeWidth={1.5} />
        <text x={120} y={136} fill={sideColor("a")} fontSize={14} fontWeight={800} textAnchor="middle">a</text>
        <text x={28} y={78} fill={sideColor("b")} fontSize={14} fontWeight={800} textAnchor="middle">b</text>
        <text x={128} y={66} fill={sideColor("c")} fontSize={14} fontWeight={800} textAnchor="middle">c</text>
      </svg>

      {mode === "explore" ? (
        <>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {sides.map((s) => {
              const isUnknown = solveFor === s;
              return (
                <div key={s} className={`rounded-lg border px-2 py-2 text-center ${isUnknown ? "border-accent bg-accent/10" : "border-navy-border bg-navy"}`}>
                  <button type="button" onClick={() => setSolveFor(s)} className={`mb-1 block w-full text-xs font-bold ${isUnknown ? "text-accent" : "text-text-tertiary hover:text-text-secondary"}`}>
                    {isUnknown ? "solving for" : "solve for"} {sideName[s]}
                  </button>
                  {isUnknown ? (
                    <div className="font-mono text-lg font-bold text-accent">{exploreResult != null ? fmt(exploreResult) : "?"}</div>
                  ) : (
                    <NumField value={vals[s]} onChange={(v) => setVals((x) => ({ ...x, [s]: v }))} placeholder={s} />
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-center text-xs text-text-tertiary">
            <span className="font-mono text-text-secondary">{formula}</span>
          </p>
        </>
      ) : quiz ? (
        <>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {sides.map((s) => {
              const isUnknown = quiz.solveFor === s;
              return (
                <div key={s} className={`rounded-lg border px-2 py-2 ${isUnknown ? "border-accent bg-accent/10" : "border-navy-border bg-navy"}`}>
                  <span className={`mb-1 block text-xs font-bold ${isUnknown ? "text-accent" : "text-text-tertiary"}`}>{isUnknown ? "find" : "given"} {sideName[s]}</span>
                  {isUnknown ? (
                    checked ? (
                      <span className={`font-mono text-lg font-bold ${correct ? "text-success" : "text-danger"}`}>{fmt(quiz.answer)}</span>
                    ) : (
                      <NumField value={guess} onChange={setGuess} placeholder="?" active autoFocus />
                    )
                  ) : (
                    <span className="font-mono text-base font-bold text-text-primary">{fmt(quiz.given[s] as number)}</span>
                  )}
                </div>
              );
            })}
          </div>
          {checked ? (
            <div className="mt-3">
              <p className={`text-center text-sm font-semibold ${correct ? "text-success" : "text-danger"}`}>
                {correct ? "Correct ✓" : `Not quite — ${sideName[quiz.solveFor]} = ${fmt(quiz.answer)}`}
              </p>
              <p className="mt-1 text-center text-xs text-text-tertiary"><span className="font-mono text-text-secondary">{formula}</span></p>
              <NextButton onClick={next} />
            </div>
          ) : (
            <CheckButton onClick={() => setChecked(true)} disabled={gn == null} />
          )}
        </>
      ) : null}
    </InteractiveCard>
  );
}
