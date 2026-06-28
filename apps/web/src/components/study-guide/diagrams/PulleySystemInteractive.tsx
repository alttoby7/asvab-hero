"use client";

/**
 * Interactive block-and-tackle pulley system. Explore: pick the number of
 * supporting rope segments N (1–4) and a load, watch the mechanical advantage
 * (= N) and the required effort (= load ÷ N) update live on a redrawn diagram.
 * Quiz: given a load + N, find the effort. Competitor sites only describe
 * compound pulleys in prose. Follows the Circuit/Gear explore + predict→check
 * template + shared _kit.
 */
import { useMemo, useState } from "react";
import { InteractiveCard, ModeToggle, NumField, CheckButton, QuizFooter, useScore, rnd, numOf, fmt, type Mode, type DiagramContext } from "./_kit";

const ORANGE = "#f97316";
const EMPTY = "#1a2942";
const MUTED = "#94a3b8";
const INK = "#f1f5f9";

const SEGMENTS = [1, 2, 3, 4] as const;

/** Schematic block-and-tackle drawn from N supporting rope segments. */
function PulleyDiagram({ n }: { n: number }) {
  const segs = Math.max(1, Math.min(4, Math.round(n)));
  const W = 200;
  const ceilY = 16;
  const topY = 44; // top (fixed) block axle
  const botY = 120; // bottom (movable) block axle
  // evenly spaced rope columns
  const left = 48;
  const right = 152;
  const cols = Array.from({ length: segs }, (_, i) =>
    segs === 1 ? right : left + (i * (right - left)) / (segs - 1),
  );
  return (
    <svg viewBox={`0 0 ${W} 176`} width="100%" role="img" aria-label={`Pulley system with ${segs} supporting rope segments`}>
      {/* ceiling */}
      <line x1={40} y1={ceilY} x2={160} y2={ceilY} stroke={MUTED} strokeWidth={2.5} />
      {[52, 68, 84, 100, 116, 132, 148].map((x) => (
        <line key={x} x1={x} y1={ceilY} x2={x - 7} y2={ceilY - 7} stroke="#64748b" strokeWidth={1.3} />
      ))}
      {/* rope segments */}
      {cols.map((cx, i) => (
        <line key={i} x1={cx} y1={topY} x2={cx} y2={botY} stroke={MUTED} strokeWidth={2} />
      ))}
      {/* top fixed block */}
      <rect x={left - 8} y={topY - 8} width={right - left + 16} height={14} rx={5} fill={EMPTY} stroke={ORANGE} strokeWidth={2.5} />
      <line x1={100} y1={ceilY} x2={100} y2={topY - 8} stroke={MUTED} strokeWidth={2} />
      {segs > 1 ? (
        <>
          {/* bottom movable block + load */}
          <rect x={left - 8} y={botY - 6} width={right - left + 16} height={14} rx={5} fill={EMPTY} stroke={ORANGE} strokeWidth={2.5} />
          <rect x={84} y={botY + 14} width={32} height={26} rx={3} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
          <line x1={100} y1={botY + 8} x2={100} y2={botY + 14} stroke={MUTED} strokeWidth={2} />
          <text x={100} y={botY + 31} fill={INK} fontSize={11} fontWeight={700} textAnchor="middle">LOAD</text>
        </>
      ) : (
        <>
          {/* single fixed pulley: load hangs from the right rope */}
          <rect x={right - 16} y={botY} width={32} height={26} rx={3} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
          <text x={right} y={botY + 17} fill={INK} fontSize={11} fontWeight={700} textAnchor="middle">LOAD</text>
        </>
      )}
      {/* effort arrow on the free (leftmost) rope, pulled down */}
      <line x1={cols[0]} y1={botY - 4} x2={cols[0]} y2={botY + 28} stroke={ORANGE} strokeWidth={2.5} strokeLinecap="round" />
      <polygon points={`${cols[0]},${botY + 30} ${cols[0] - 4},${botY + 22} ${cols[0] + 4},${botY + 22}`} fill={ORANGE} />
      <text x={cols[0]} y={botY + 44} fill={INK} fontSize={10} fontWeight={700} textAnchor="middle">EFFORT</text>
      <text x={100} y={topY - 14} fill={MUTED} fontSize={10} textAnchor="middle">{segs} supporting {segs === 1 ? "segment" : "segments"}</text>
    </svg>
  );
}

interface Quiz {
  load: number;
  n: number;
  answer: number;
}

function genQuiz(): Quiz {
  const n = SEGMENTS[rnd(0, SEGMENTS.length - 1)];
  // pick load as a multiple of n so the effort is a clean whole number
  const load = n * rnd(20, 90);
  return { load, n, answer: load / n };
}

export default function PulleySystemInteractive({ label = "Pulley system", context }: { label?: string; context?: DiagramContext }) {
  const [mode, setMode] = useState<Mode>("explore");
  const [n, setN] = useState(2);
  const [load, setLoad] = useState("300");

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);
  const { score, record, reset } = useScore();

  const l = numOf(load);
  const effort = useMemo(() => (l != null && n !== 0 ? l / n : null), [l, n]);

  const shownN = mode === "quiz" && quiz ? quiz.n : n;

  const startQuiz = () => { setMode("quiz"); setQuiz(genQuiz()); setGuess(""); setChecked(false); reset(); };
  const next = () => { setQuiz(genQuiz()); setGuess(""); setChecked(false); };
  const toExplore = () => { setMode("explore"); setQuiz(null); setChecked(false); };

  const gn = numOf(guess);
  const correct = quiz != null && gn != null && Math.abs(gn - quiz.answer) < 1e-6;

  return (
    <InteractiveCard label={label} toggle={<ModeToggle mode={mode} onExplore={toExplore} onQuiz={startQuiz} />}>
      <PulleyDiagram n={shownN} />

      {mode === "explore" ? (
        <>
          <div className="mt-2 flex items-center justify-center gap-1 text-xs">
            {SEGMENTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setN(s)}
                className={`rounded border px-3 py-1 font-semibold ${n === s ? "border-accent bg-accent text-navy" : "border-navy-border text-text-secondary hover:border-navy-lighter"}`}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-1 text-center text-[11px] text-text-tertiary">supporting rope segments (N)</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">load (lb)</span>
              <NumField value={load} onChange={setLoad} placeholder="load" />
            </div>
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="block text-xs font-bold text-accent">mech. advantage</span>
              <span className="font-mono text-lg font-bold text-accent">{shownN}×</span>
            </div>
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="block text-xs font-bold text-accent">effort</span>
              <span className="font-mono text-lg font-bold text-accent">{effort != null ? `${fmt(effort)} lb` : "—"}</span>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-text-tertiary">
            <span className="font-mono text-text-secondary">MA = N · effort = load ÷ N</span> · you pull N× the rope
          </p>
        </>
      ) : quiz ? (
        <>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">load</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.load} lb</span>
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">segments</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.n}</span>
            </div>
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-accent">effort?</span>
              {checked ? (
                <span className={`font-mono text-base font-bold ${correct ? "text-success" : "text-danger"}`}>{fmt(quiz.answer)} lb</span>
              ) : (
                <NumField value={guess} onChange={setGuess} placeholder="lb" active autoFocus />
              )}
            </div>
          </div>
          {checked ? (
            <QuizFooter
              correct={correct}
              resultText={correct ? "Correct ✓" : `Not quite — ${fmt(quiz.answer)} lb`}
              formula={`effort = ${quiz.load} ÷ ${quiz.n} = ${fmt(quiz.answer)}`}
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
