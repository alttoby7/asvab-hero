"use client";

/**
 * Interactive "cover the unknown" triangle for the multiplicative relationship
 * top = bottomLeft × bottomRight (Ohm's law V=I×R, and power P=I×E).
 *
 * Tap the variable you're solving for -> it highlights ("covered"), the other
 * two become inputs, and the result computes live with the rearranged formula.
 * This is the ASVAB question pattern itself (given two, find the third), and is
 * the interactive upgrade that puts the guides ahead of static-diagram sites.
 */
import { useMemo, useState } from "react";

type Slot = "top" | "bl" | "br";

interface Props {
  top?: string;
  bottomLeft?: string;
  bottomRight?: string;
  units?: { top?: string; bottomLeft?: string; bottomRight?: string };
  label?: string;
}

const ORANGE = "#f97316";
const ORANGE_DIM = "rgba(249,115,22,0.15)";
const INK = "#f1f5f9";
const MUTED = "#94a3b8";

function fmt(n: number): string {
  if (!isFinite(n)) return "—";
  const r = Math.round(n * 1000) / 1000;
  return String(r);
}

export default function OhmsLawTriangleInteractive({
  top = "V",
  bottomLeft = "I",
  bottomRight = "R",
  units = {},
  label,
}: Props) {
  const [solveFor, setSolveFor] = useState<Slot>("top");
  const [vals, setVals] = useState<Record<Slot, string>>({ top: "", bl: "", br: "" });

  const names: Record<Slot, string> = { top, bl: bottomLeft, br: bottomRight };
  const unit: Record<Slot, string> = {
    top: units.top ?? "",
    bl: units.bottomLeft ?? "",
    br: units.bottomRight ?? "",
  };

  const num = (s: string) => {
    const n = parseFloat(s);
    return s.trim() !== "" && isFinite(n) ? n : null;
  };

  const { result, formula } = useMemo(() => {
    const t = num(vals.top);
    const a = num(vals.bl);
    const b = num(vals.br);
    if (solveFor === "top") {
      return {
        result: a != null && b != null ? a * b : null,
        formula: `${top} = ${bottomLeft} × ${bottomRight}`,
      };
    }
    if (solveFor === "bl") {
      return {
        result: t != null && b != null && b !== 0 ? t / b : null,
        formula: `${bottomLeft} = ${top} ÷ ${bottomRight}`,
      };
    }
    return {
      result: t != null && a != null && a !== 0 ? t / a : null,
      formula: `${bottomRight} = ${top} ÷ ${bottomLeft}`,
    };
  }, [vals, solveFor, top, bottomLeft, bottomRight]);

  // triangle geometry
  const apex: [number, number] = [120, 14];
  const blPt: [number, number] = [26, 150];
  const brPt: [number, number] = [214, 150];
  const yDiv = 86;
  const lx = 120 + (26 - 120) * ((yDiv - 14) / (150 - 14));
  const rx = 240 - lx;

  const regionFill = (s: Slot) => (solveFor === s ? ORANGE : ORANGE_DIM);
  const regionText = (s: Slot) => (solveFor === s ? "#0a1628" : INK);

  const slots: Slot[] = ["top", "bl", "br"];

  return (
    <figure className="m-0 rounded-xl border border-navy-border bg-navy-light px-5 py-4">
      <figcaption className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
        {label ?? "Ohm's Law solver"}
        <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-text-tertiary">
          tap a letter
        </span>
      </figcaption>

      <svg viewBox="0 0 240 168" width="100%" role="img" aria-label={`${top} equals ${bottomLeft} times ${bottomRight} triangle`}>
        <polygon points={`${apex} ${blPt} ${brPt}`} fill="none" stroke={ORANGE} strokeWidth={2.5} strokeLinejoin="round" />
        {/* tappable regions */}
        <g style={{ cursor: "pointer" }}>
          <polygon points={`${apex} ${lx},${yDiv} ${rx},${yDiv}`} fill={regionFill("top")} onClick={() => setSolveFor("top")} />
          <polygon points={`${lx},${yDiv} 120,${yDiv} 120,150 ${blPt}`} fill={regionFill("bl")} onClick={() => setSolveFor("bl")} />
          <polygon points={`120,${yDiv} ${rx},${yDiv} ${brPt} 120,150`} fill={regionFill("br")} onClick={() => setSolveFor("br")} />
        </g>
        <line x1={lx} y1={yDiv} x2={rx} y2={yDiv} stroke={ORANGE} strokeWidth={2.5} />
        <line x1={120} y1={yDiv} x2={120} y2={150} stroke={ORANGE} strokeWidth={2.5} />
        <text x={120} y={64} fill={regionText("top")} fontSize={32} fontWeight={800} textAnchor="middle" pointerEvents="none">{top}</text>
        <text x={84} y={130} fill={regionText("bl")} fontSize={28} fontWeight={800} textAnchor="middle" pointerEvents="none">{bottomLeft}</text>
        <text x={156} y={130} fill={regionText("br")} fontSize={28} fontWeight={800} textAnchor="middle" pointerEvents="none">{bottomRight}</text>
      </svg>

      {/* controls: knowns get inputs, the solve-for slot shows the result */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {slots.map((s) => {
          const isUnknown = solveFor === s;
          return (
            <div key={s} className={`rounded-lg border px-2 py-2 text-center ${isUnknown ? "border-accent bg-accent/10" : "border-navy-border bg-navy"}`}>
              <button
                type="button"
                onClick={() => setSolveFor(s)}
                className={`mb-1 block w-full text-xs font-bold ${isUnknown ? "text-accent" : "text-text-tertiary hover:text-text-secondary"}`}
              >
                {isUnknown ? "solving for" : "solve for"} {names[s]}
              </button>
              {isUnknown ? (
                <div className="font-mono text-lg font-bold text-accent">
                  {result != null ? fmt(result) : "?"}
                  {unit[s] ? <span className="ml-0.5 text-xs text-text-tertiary">{unit[s]}</span> : null}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1">
                  <input
                    inputMode="decimal"
                    value={vals[s]}
                    onChange={(e) => setVals((v) => ({ ...v, [s]: e.target.value }))}
                    placeholder={names[s]}
                    aria-label={`${names[s]} value`}
                    className="w-full min-w-0 rounded border border-navy-border bg-navy-light px-1.5 py-1 text-center font-mono text-sm text-text-primary outline-none focus:border-accent"
                  />
                  {unit[s] ? <span className="text-xs text-text-tertiary">{unit[s]}</span> : null}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-center text-xs text-text-tertiary">
        Cover the unknown → <span className="font-mono text-text-secondary">{formula}</span>
      </p>
    </figure>
  );
}
