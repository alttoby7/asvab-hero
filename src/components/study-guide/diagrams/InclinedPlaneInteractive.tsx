"use client";

/**
 * Interactive inclined plane (ramp). Explore: set ramp length L and height H
 * plus a load, watch the mechanical advantage (L ÷ H) and required effort
 * (load × H ÷ L = load ÷ MA) update live on a redrawn right-triangle ramp with
 * a block on it. Quiz: given L, H and a load, find the effort — curated so the
 * answer stays a clean whole number. Follows the Circuit/Gear explore +
 * predict→check template + shared _kit.
 */
import { useMemo, useState } from "react";
import { InteractiveCard, ModeToggle, NumField, CheckButton, QuizFooter, useScore, rnd, numOf, fmt, type Mode, type DiagramContext } from "./_kit";

const ORANGE = "#f97316";
const EMPTY = "#1a2942";
const MUTED = "#94a3b8";
const INK = "#f1f5f9";

/** Right-triangle ramp with a block partway up; proportions track L:H. */
function RampDiagram({ l, h }: { l: number; h: number }) {
  const W = 240;
  const baseY = 116;
  const x0 = 24; // bottom-left (start of incline base)
  const xMax = 216; // bottom-right (foot of ramp / right angle)
  // map height to a drawable rise, capped so it stays in the figure
  const ratio = l > 0 ? Math.max(0.08, Math.min(0.9, h / l)) : 0.3;
  const baseLen = xMax - x0;
  const rise = Math.max(14, Math.min(86, baseLen * ratio));
  const topY = baseY - rise;
  // block sits ~55% up the slope
  const t = 0.55;
  const bx = xMax + (x0 - xMax) * t;
  const by = baseY + (topY - baseY) * t;
  const angle = Math.atan2(baseY - topY, xMax - x0);
  return (
    <svg viewBox={`0 0 ${W} 140`} width="100%" role="img" aria-label={`Inclined plane ramp, length ${l}, height ${h}`}>
      {/* ground hatching */}
      <line x1={12} y1={baseY} x2={228} y2={baseY} stroke={MUTED} strokeWidth={2} />
      {[24, 48, 72, 96, 120, 144, 168, 192, 216].map((x) => (
        <line key={x} x1={x} y1={baseY} x2={x - 8} y2={baseY + 8} stroke="#64748b" strokeWidth={1.2} />
      ))}
      {/* triangle ramp */}
      <polygon points={`${x0},${baseY} ${xMax},${baseY} ${xMax},${topY}`} fill="rgba(249,115,22,0.12)" stroke={ORANGE} strokeWidth={2.5} strokeLinejoin="round" />
      {/* right-angle marker */}
      <polyline points={`${xMax - 12},${baseY} ${xMax - 12},${baseY - 12} ${xMax},${baseY - 12}`} fill="none" stroke={MUTED} strokeWidth={1.4} />
      {/* block on the slope */}
      <g transform={`translate(${bx},${by}) rotate(${(angle * 180) / Math.PI})`}>
        <rect x={-15} y={-22} width={30} height={20} rx={3} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
        <text x={0} y={-8} fill={INK} fontSize={9} fontWeight={700} textAnchor="middle">LOAD</text>
      </g>
      {/* dimension labels */}
      <text x={(x0 + xMax) / 2} y={baseY - rise / 2 + 16} fill={MUTED} fontSize={11} fontWeight={700} textAnchor="middle" transform={`rotate(${(-angle * 180) / Math.PI} ${(x0 + xMax) / 2} ${(baseY + topY) / 2})`}>length L</text>
      <text x={xMax + 4} y={(baseY + topY) / 2} fill={MUTED} fontSize={10} fontWeight={700} textAnchor="start">H</text>
    </svg>
  );
}

interface Quiz {
  l: number;
  h: number;
  load: number;
  answer: number;
}

function genQuiz(): Quiz {
  // MA = L/H whole; load a multiple of MA so effort = load/MA is whole
  const h = rnd(2, 5);
  const ma = rnd(2, 6);
  const l = h * ma; // L ÷ H = ma exactly
  const load = ma * rnd(15, 60);
  return { l, h, load, answer: load / ma };
}

export default function InclinedPlaneInteractive({ label = "Inclined plane", context }: { label?: string; context?: DiagramContext }) {
  const [mode, setMode] = useState<Mode>("explore");
  const [lenStr, setLenStr] = useState("12");
  const [hStr, setHStr] = useState("3");
  const [load, setLoad] = useState("600");

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [guess, setGuess] = useState("");
  const [checked, setChecked] = useState(false);
  const { score, record, reset } = useScore();

  const lv = numOf(lenStr);
  const hv = numOf(hStr);
  const ld = numOf(load);
  const ma = useMemo(() => (lv != null && hv != null && hv !== 0 ? lv / hv : null), [lv, hv]);
  const effort = ma != null && ma !== 0 && ld != null ? ld / ma : null;

  const shown = mode === "quiz" && quiz ? { l: quiz.l, h: quiz.h } : { l: lv ?? 12, h: hv ?? 3 };

  const startQuiz = () => { setMode("quiz"); setQuiz(genQuiz()); setGuess(""); setChecked(false); reset(); };
  const next = () => { setQuiz(genQuiz()); setGuess(""); setChecked(false); };
  const toExplore = () => { setMode("explore"); setQuiz(null); setChecked(false); };

  const gn = numOf(guess);
  const correct = quiz != null && gn != null && Math.abs(gn - quiz.answer) < 1e-6;

  return (
    <InteractiveCard label={label} toggle={<ModeToggle mode={mode} onExplore={toExplore} onQuiz={startQuiz} />}>
      <RampDiagram l={shown.l} h={shown.h} />

      {mode === "explore" ? (
        <>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">length L (ft)</span>
              <NumField value={lenStr} onChange={setLenStr} placeholder="L" />
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">height H (ft)</span>
              <NumField value={hStr} onChange={setHStr} placeholder="H" />
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="mb-1 block text-xs font-bold text-text-tertiary">load (lb)</span>
              <NumField value={load} onChange={setLoad} placeholder="load" />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="block text-xs font-bold text-accent">mech. advantage</span>
              <span className="font-mono text-lg font-bold text-accent">{ma != null ? `${fmt(ma)}×` : "—"}</span>
            </div>
            <div className="rounded-lg border border-accent bg-accent/10 px-2 py-2">
              <span className="block text-xs font-bold text-accent">effort</span>
              <span className="font-mono text-lg font-bold text-accent">{effort != null ? `${fmt(effort)} lb` : "—"}</span>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-text-tertiary">
            <span className="font-mono text-text-secondary">MA = L ÷ H · effort = load × H ÷ L</span>
          </p>
        </>
      ) : quiz ? (
        <>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">length L</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.l} ft</span>
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">height H</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.h} ft</span>
            </div>
            <div className="rounded-lg border border-navy-border bg-navy px-2 py-2">
              <span className="block text-xs font-bold text-text-tertiary">load</span>
              <span className="font-mono text-base font-bold text-text-primary">{quiz.load} lb</span>
            </div>
          </div>
          <div className="mt-2 rounded-lg border border-accent bg-accent/10 px-2 py-2 text-center">
            <span className="mb-1 block text-xs font-bold text-accent">find the effort</span>
            {checked ? (
              <span className={`font-mono text-lg font-bold ${correct ? "text-success" : "text-danger"}`}>{fmt(quiz.answer)} lb</span>
            ) : (
              <NumField value={guess} onChange={setGuess} placeholder="lb" active autoFocus />
            )}
          </div>
          {checked ? (
            <QuizFooter
              correct={correct}
              resultText={correct ? "Correct ✓" : `Not quite — ${fmt(quiz.answer)} lb`}
              formula={`effort = ${quiz.load} × ${quiz.h} ÷ ${quiz.l} = ${fmt(quiz.answer)}`}
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
