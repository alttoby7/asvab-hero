/**
 * Reusable, theme-locked SVG diagram library for study guides.
 *
 * Guides reference these by name from markdown frontmatter (`diagrams: [...]`),
 * and StudyGuideArticle injects the matching component after the named heading.
 * Style = "card wrapper + bold fills" (captioned card, solid orange figures).
 *
 * Competitive note: most ASVAB sites teach EI/MC/AS with walls of text and no
 * figures, so the electronics + mechanical diagrams below are the biggest
 * differentiators. All diagrams are pure SVG (no hooks) -> server components.
 * To add one: build the component, then register it in REGISTRY.
 */
import type { ReactNode } from "react";
import OhmsLawTriangleInteractive from "./OhmsLawTriangleInteractive";
import GearRatioInteractive from "./GearRatioInteractive";
import RightTriangleInteractive from "./RightTriangleInteractive";
import LeverInteractive from "./LeverInteractive";
import NumberLineInteractive from "./NumberLineInteractive";
import FractionBarInteractive from "./FractionBarInteractive";

const ORANGE = "#f97316";
const ORANGE_DIM = "rgba(249,115,22,0.15)";
const EMPTY = "#1a2942"; // navy-lighter, the "unfilled" portion
const BORDER = "#243350"; // navy-border
const KNOB_BG = "#0a1628"; // navy
const INK = "#f1f5f9"; // text-primary
const MUTED = "#94a3b8"; // text-secondary
const TICK = "#64748b"; // text-tertiary

/** Captioned card shell, matches the Formula Reference / Worked Examples cards. */
function DiagramCard({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <figure className="m-0 rounded-xl border border-navy-border bg-navy-light px-5 py-4">
      {label ? (
        <figcaption className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">
          {label}
        </figcaption>
      ) : null}
      {children}
    </figure>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-center text-xs text-text-tertiary">{children}</p>;
}

/** Straight arrow with a filled head, used by the mechanics diagrams. */
function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = ORANGE,
  width = 2.5,
  head = 7,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  head?: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const a1 = angle + Math.PI - 0.45;
  const a2 = angle + Math.PI + 0.45;
  const p1 = `${x2 + head * Math.cos(a1)},${y2 + head * Math.sin(a1)}`;
  const p2 = `${x2 + head * Math.cos(a2)},${y2 + head * Math.sin(a2)}`;
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={color} />
    </>
  );
}

/* ================================================================== */
/* AR / MK — fraction-bar                                             */
/* ================================================================== */
interface FractionBarProps {
  numerator: number;
  denominator: number;
  label?: string;
  caption?: string;
}
function FractionBar({ numerator, denominator, label, caption }: FractionBarProps) {
  const W = 256;
  const H = 56;
  const gap = 4;
  const segW = (W - gap * (denominator - 1)) / denominator;
  return (
    <DiagramCard label={label ?? `Visualizing ${numerator}/${denominator}`}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Fraction bar: ${numerator} of ${denominator} parts shaded`}>
        {Array.from({ length: denominator }, (_, i) => {
          const filled = i < numerator;
          return (
            <rect key={i} x={i * (segW + gap)} y={0} width={segW} height={H} rx={4} fill={filled ? ORANGE : EMPTY} stroke={filled ? "none" : BORDER} />
          );
        })}
      </svg>
      <Caption>{caption ?? `${numerator} shaded ÷ ${denominator} total = ${numerator}/${denominator}`}</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* AR / MK — number-line                                             */
/* ================================================================== */
interface NumberLineProps {
  value: number;
  min?: number;
  max?: number;
  valueLabel?: string;
  minLabel?: string;
  maxLabel?: string;
  label?: string;
}
function NumberLine({ value, min = 0, max = 1, valueLabel, minLabel, maxLabel, label }: NumberLineProps) {
  const W = 256;
  const trackY = 34;
  const padX = 14;
  const usable = W - padX * 2;
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const cx = padX + t * usable;
  return (
    <DiagramCard label={label}>
      <svg viewBox={`0 0 ${W} 64`} width="100%" role="img" aria-label={`Number line: ${valueLabel ?? value} between ${minLabel ?? min} and ${maxLabel ?? max}`}>
        <rect x={padX} y={trackY - 7} width={usable} height={14} rx={7} fill={EMPTY} stroke={BORDER} />
        <rect x={padX} y={trackY - 7} width={Math.max(0, cx - padX)} height={14} rx={7} fill={ORANGE} />
        <circle cx={cx} cy={trackY} r={9} fill={KNOB_BG} stroke={ORANGE} strokeWidth={3} />
        {valueLabel ? (
          <text x={cx} y={14} fill={ORANGE} fontSize={12} fontWeight={700} textAnchor="middle">{valueLabel}</text>
        ) : null}
        <text x={padX} y={60} fill={MUTED} fontSize={12} fontWeight={600} textAnchor="middle">{minLabel ?? String(min)}</text>
        <text x={W - padX} y={60} fill={MUTED} fontSize={12} fontWeight={600} textAnchor="middle">{maxLabel ?? String(max)}</text>
      </svg>
    </DiagramCard>
  );
}

/* ================================================================== */
/* EI — ohms-law-triangle (also serves the power triangle P=I×E)      */
/* ================================================================== */
interface OhmsTriangleProps {
  top?: string;
  bottomLeft?: string;
  bottomRight?: string;
  label?: string;
  caption?: string;
}
function OhmsLawTriangle({ top = "V", bottomLeft = "I", bottomRight = "R", label, caption }: OhmsTriangleProps) {
  const apex = [120, 14];
  const bl = [26, 150];
  const br = [214, 150];
  // horizontal divider where the triangle is at y = 86
  const yDiv = 86;
  const tx = (y: number) => 120 + (26 - 120) * ((y - 14) / (150 - 14));
  const lx = tx(yDiv);
  const rx = 240 - lx;
  return (
    <DiagramCard label={label ?? "Ohm's Law triangle"}>
      <svg viewBox="0 0 240 168" width="100%" role="img" aria-label={`Ohm's law triangle with ${top} over ${bottomLeft} times ${bottomRight}`}>
        <polygon points={`${apex} ${bl} ${br}`} fill={ORANGE_DIM} stroke={ORANGE} strokeWidth={2.5} strokeLinejoin="round" />
        <line x1={lx} y1={yDiv} x2={rx} y2={yDiv} stroke={ORANGE} strokeWidth={2.5} />
        <line x1={120} y1={yDiv} x2={120} y2={150} stroke={ORANGE} strokeWidth={2.5} />
        <text x={120} y={64} fill={INK} fontSize={32} fontWeight={800} textAnchor="middle">{top}</text>
        <text x={84} y={130} fill={INK} fontSize={28} fontWeight={800} textAnchor="middle">{bottomLeft}</text>
        <text x={156} y={130} fill={INK} fontSize={28} fontWeight={800} textAnchor="middle">{bottomRight}</text>
      </svg>
      <Caption>{caption ?? `Cover the unknown: ${top} = ${bottomLeft} × ${bottomRight},  ${bottomLeft} = ${top}/${bottomRight},  ${bottomRight} = ${top}/${bottomLeft}`}</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* EI — circuit (series vs. parallel)                                 */
/* ================================================================== */
function Resistor({ x, y, label }: { x: number; y: number; label: string }) {
  // horizontal resistor box centered at (x, y)
  return (
    <g>
      <rect x={x - 16} y={y - 8} width={32} height={16} rx={2} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
      <text x={x} y={y - 14} fill={MUTED} fontSize={11} fontWeight={600} textAnchor="middle">{label}</text>
    </g>
  );
}
function Battery({ x, y }: { x: number; y: number }) {
  // vertical battery symbol centered at (x, y): long + short plate
  return (
    <g stroke={ORANGE} strokeWidth={2.5} strokeLinecap="round">
      <line x1={x - 9} y1={y - 11} x2={x + 9} y2={y - 11} />
      <line x1={x - 5} y1={y + 4} x2={x + 5} y2={y + 4} />
      <text x={x + 16} y={y - 2} fill={MUTED} fontSize={11} fontWeight={700} stroke="none" textAnchor="middle">+</text>
    </g>
  );
}
function Circuit({ mode = "series", label }: { mode?: "series" | "parallel"; label?: string }) {
  const isSeries = mode === "series";
  return (
    <DiagramCard label={label ?? (isSeries ? "Series circuit" : "Parallel circuit")}>
      <svg viewBox="0 0 240 150" width="100%" role="img" aria-label={`${mode} circuit with a battery and two resistors`}>
        {/* outer loop */}
        <rect x={28} y={28} width={184} height={94} rx={4} fill="none" stroke={ORANGE} strokeWidth={2.5} />
        {/* battery breaks the left rail */}
        <rect x={20} y={62} width={16} height={26} fill={KNOB_BG} />
        <Battery x={28} y={75} />
        {isSeries ? (
          <>
            <Resistor x={96} y={28} label="R1" />
            <Resistor x={160} y={28} label="R2" />
            <Arrow x1={120} y1={122} x2={150} y2={122} width={2} />
          </>
        ) : (
          <>
            {/* two vertical branches between the rails */}
            <line x1={120} y1={28} x2={120} y2={122} stroke={ORANGE} strokeWidth={2.5} />
            <line x1={172} y1={28} x2={172} y2={122} stroke={ORANGE} strokeWidth={2.5} />
            <g transform="translate(120,75) rotate(90)">
              <Resistor x={0} y={0} label="" />
            </g>
            <g transform="translate(172,75) rotate(90)">
              <Resistor x={0} y={0} label="" />
            </g>
            <text x={120} y={142} fill={MUTED} fontSize={11} fontWeight={600} textAnchor="middle">R1</text>
            <text x={172} y={142} fill={MUTED} fontSize={11} fontWeight={600} textAnchor="middle">R2</text>
          </>
        )}
      </svg>
      <Caption>
        {isSeries
          ? "Same current everywhere; resistances add: R = R1 + R2"
          : "Same voltage across each branch; 1/R = 1/R1 + 1/R2"}
      </Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* MC — lever (class-1, fulcrum + effort/load arms)                   */
/* ================================================================== */
function Lever({ label }: { label?: string }) {
  const fx = 120; // fulcrum x
  const beamY = 88;
  return (
    <DiagramCard label={label ?? "Lever (class 1)"}>
      <svg viewBox="0 0 260 150" width="100%" role="img" aria-label="Class-1 lever with fulcrum, effort arm and load arm">
        {/* beam */}
        <rect x={24} y={beamY - 4} width={212} height={8} rx={4} fill={ORANGE} />
        {/* fulcrum */}
        <polygon points={`${fx},${beamY + 4} ${fx - 13},${beamY + 32} ${fx + 13},${beamY + 32}`} fill={EMPTY} stroke={BORDER} strokeWidth={1.5} />
        {/* effort (down) on the left end */}
        <Arrow x1={46} y1={50} x2={46} y2={beamY - 6} />
        <text x={46} y={42} fill={INK} fontSize={11} fontWeight={700} textAnchor="middle">EFFORT</text>
        {/* load box on the right end */}
        <rect x={196} y={beamY - 30} width={30} height={26} rx={3} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
        <text x={211} y={beamY - 38} fill={INK} fontSize={11} fontWeight={700} textAnchor="middle">LOAD</text>
        {/* arm measures */}
        <g stroke={TICK} strokeWidth={1}>
          <line x1={46} y1={128} x2={fx} y2={128} />
          <line x1={46} y1={123} x2={46} y2={133} />
          <line x1={fx} y1={123} x2={fx} y2={133} />
          <line x1={fx} y1={128} x2={211} y2={128} />
          <line x1={211} y1={123} x2={211} y2={133} />
        </g>
        <text x={83} y={145} fill={MUTED} fontSize={10} fontFamily="monospace" textAnchor="middle">effort arm</text>
        <text x={165} y={145} fill={MUTED} fontSize={10} fontFamily="monospace" textAnchor="middle">load arm</text>
      </svg>
      <Caption>Effort × effort arm = Load × load arm</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* MC — pulley (fixed)                                                */
/* ================================================================== */
function Pulley({ label }: { label?: string }) {
  return (
    <DiagramCard label={label ?? "Fixed pulley"}>
      <svg viewBox="0 0 200 180" width="100%" role="img" aria-label="Fixed pulley changing the direction of effort">
        {/* ceiling */}
        <line x1={56} y1={14} x2={144} y2={14} stroke={MUTED} strokeWidth={2.5} />
        {[64, 80, 96, 112, 128].map((x) => (
          <line key={x} x1={x} y1={14} x2={x - 7} y2={7} stroke={TICK} strokeWidth={1.5} />
        ))}
        <line x1={100} y1={14} x2={100} y2={24} stroke={MUTED} strokeWidth={2} />
        {/* wheel */}
        <circle cx={100} cy={48} r={24} fill={EMPTY} stroke={ORANGE} strokeWidth={3} />
        <circle cx={100} cy={48} r={4} fill={ORANGE} />
        {/* rope */}
        <line x1={76} y1={48} x2={76} y2={150} stroke={MUTED} strokeWidth={2} />
        <line x1={124} y1={48} x2={124} y2={120} stroke={MUTED} strokeWidth={2} />
        {/* effort down on the left rope */}
        <Arrow x1={76} y1={120} x2={76} y2={152} />
        <text x={76} y={170} fill={INK} fontSize={11} fontWeight={700} textAnchor="middle">EFFORT</text>
        {/* load on the right rope */}
        <rect x={108} y={120} width={32} height={28} rx={3} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
        <text x={124} y={166} fill={INK} fontSize={11} fontWeight={700} textAnchor="middle">LOAD</text>
      </svg>
      <Caption>Fixed pulley: changes direction only, MA = 1</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* MC — gear-ratio (two meshing gears, opposite rotation)            */
/* ================================================================== */
function Gear({ cx, cy, r, teeth, color }: { cx: number; cy: number; r: number; teeth: number; color: string }) {
  return (
    <g>
      {Array.from({ length: teeth }, (_, i) => (
        <rect
          key={i}
          x={cx - 3}
          y={cy - r - 7}
          width={6}
          height={9}
          fill={color}
          transform={`rotate(${(360 / teeth) * i} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r} fill={EMPTY} stroke={color} strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={5} fill={color} />
    </g>
  );
}
interface GearRatioProps {
  driverTeeth?: number;
  drivenTeeth?: number;
  label?: string;
  caption?: string;
}
function GearRatio({ driverTeeth = 12, drivenTeeth = 24, label, caption }: GearRatioProps) {
  const cy = 74;
  const r1 = 30;
  const r2 = 46;
  const cx1 = 56;
  const cx2 = cx1 + r1 + r2; // mesh at touching pitch circles
  return (
    <DiagramCard label={label ?? "Gear ratio"}>
      <svg viewBox="0 0 220 150" width="100%" role="img" aria-label={`Two meshing gears, ${driverTeeth} teeth driving ${drivenTeeth} teeth`}>
        <Gear cx={cx1} cy={cy} r={r1} teeth={driverTeeth} color={ORANGE} />
        <Gear cx={cx2} cy={cy} r={r2} teeth={drivenTeeth} color={MUTED} />
        {/* rotation arrows (opposite directions) */}
        <path d={`M ${cx1 - 12} ${cy - r1 - 16} A 16 16 0 0 1 ${cx1 + 12} ${cy - r1 - 16}`} fill="none" stroke={ORANGE} strokeWidth={2} />
        <Arrow x1={cx1 + 8} y1={cy - r1 - 20} x2={cx1 + 14} y2={cy - r1 - 13} width={2} head={5} />
        <path d={`M ${cx2 + 14} ${cy - r2 - 14} A 18 18 0 0 0 ${cx2 - 14} ${cy - r2 - 14}`} fill="none" stroke={MUTED} strokeWidth={2} />
        <Arrow x1={cx2 - 10} y1={cy - r2 - 18} x2={cx2 - 16} y2={cy - r2 - 11} width={2} head={5} color={MUTED} />
        <text x={cx1} y={cy + r1 + 22} fill={INK} fontSize={12} fontWeight={700} textAnchor="middle">{driverTeeth}T</text>
        <text x={cx2} y={cy + r2 + 22} fill={INK} fontSize={12} fontWeight={700} textAnchor="middle">{drivenTeeth}T</text>
      </svg>
      <Caption>{caption ?? `Ratio ${drivenTeeth}:${driverTeeth} → driven turns slower, with more torque`}</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* MC — force-diagram (free body)                                     */
/* ================================================================== */
function ForceDiagram({ label }: { label?: string }) {
  const cx = 120;
  const cy = 92;
  return (
    <DiagramCard label={label ?? "Free-body diagram"}>
      <svg viewBox="0 0 240 176" width="100%" role="img" aria-label="Free-body diagram with weight, normal, applied and friction forces">
        {/* ground */}
        <line x1={20} y1={cy + 20} x2={220} y2={cy + 20} stroke={MUTED} strokeWidth={2} />
        {[40, 64, 88, 112, 136, 160, 184, 208].map((x) => (
          <line key={x} x1={x} y1={cy + 20} x2={x - 8} y2={cy + 28} stroke={TICK} strokeWidth={1.2} />
        ))}
        {/* block */}
        <rect x={cx - 26} y={cy - 20} width={52} height={40} rx={3} fill={EMPTY} stroke={ORANGE} strokeWidth={2} />
        {/* forces */}
        <Arrow x1={cx} y1={cy} x2={cx} y2={cy + 60} />
        <text x={cx + 14} y={cy + 54} fill={INK} fontSize={12} fontWeight={700}>W</text>
        <Arrow x1={cx} y1={cy - 20} x2={cx} y2={cy - 64} />
        <text x={cx + 12} y={cy - 52} fill={INK} fontSize={12} fontWeight={700}>N</text>
        <Arrow x1={cx + 26} y1={cy} x2={cx + 78} y2={cy} />
        <text x={cx + 60} y={cy - 8} fill={INK} fontSize={12} fontWeight={700}>F</text>
        <Arrow x1={cx - 26} y1={cy} x2={cx - 70} y2={cy} color={MUTED} />
        <text x={cx - 58} y={cy - 8} fill={MUTED} fontSize={12} fontWeight={700}>f</text>
      </svg>
      <Caption>Net force = ΣF. Object accelerates in the direction of the unbalanced force.</Caption>
    </DiagramCard>
  );
}

/* ================================================================== */
/* registry + dispatcher                                              */
/* ================================================================== */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const REGISTRY: Record<string, (props: any) => ReactNode> = {
  "fraction-bar": (p) => <FractionBarInteractive {...p} />,
  "fraction-bar-static": (p) => <FractionBar {...p} />,
  "number-line": (p) => <NumberLineInteractive {...p} />,
  "number-line-static": (p) => <NumberLine {...p} />,
  "ohms-law-triangle": (p) => <OhmsLawTriangleInteractive {...p} />,
  "ohms-law-triangle-static": (p) => <OhmsLawTriangle {...p} />,
  circuit: (p) => <Circuit {...p} />,
  lever: (p) => <LeverInteractive {...p} />,
  "lever-static": (p) => <Lever {...p} />,
  pulley: (p) => <Pulley {...p} />,
  "gear-ratio": (p) => <GearRatioInteractive {...p} />,
  "gear-ratio-static": (p) => <GearRatio {...p} />,
  "right-triangle": (p) => <RightTriangleInteractive {...p} />,
  "force-diagram": (p) => <ForceDiagram {...p} />,
};

export const DIAGRAM_TYPES = Object.keys(REGISTRY);

export function Diagram({ type, props }: { type: string; props?: Record<string, unknown> }) {
  const render = REGISTRY[type];
  if (!render) return null;
  return <>{render(props ?? {})}</>;
}
