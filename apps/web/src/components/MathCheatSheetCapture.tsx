import EmailCapture from "@/components/EmailCapture";

interface MathCheatSheetCaptureProps {
  /**
   * Placement label for analytics (e.g. "math-tips-mid"). Passed through to
   * EmailCapture's `source` so GA4 can tell which mount converts. The Listmonk
   * routing tag stays fixed at "afqt-math-cheat-sheet".
   */
  source: string;
}

const BULLETS = [
  "All 14 AR and MK topics: the formula, the setup, and the trap that costs points.",
  "Built from the lessons thousands of test-takers use at ASVAB Hero.",
  "Instant PDF download. Print it and drill, no calculator needed.",
];

/**
 * Lead-magnet block for the free AFQT Math Cheat-Sheet. Shows the real artifact
 * (an angled preview of page 1) next to a compact opt-in that delivers the PDF
 * instantly on submit. On-brand: navy panel, orange accents, graph-paper grid.
 */
export default function MathCheatSheetCapture({
  source,
}: MathCheatSheetCaptureProps) {
  return (
    <section className="not-prose relative overflow-hidden rounded-2xl border border-accent/40 bg-navy-light p-6 sm:p-8">
      {/* Faint graph-paper grid, contextual to a math sheet. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 22px), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 22px)",
        }}
      />
      <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto] md:gap-10">
        {/* Left: value prop + form */}
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Free PDF
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-text-primary">
            The AFQT Math Cheat-Sheet
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            Every formula for Arithmetic Reasoning and Mathematics Knowledge on
            two pages, the math half of your AFQT, in one place to keep next to
            you while you practice.
          </p>
          <ul className="mt-4 space-y-2">
            {BULLETS.map((b) => (
              <li
                key={b}
                className="flex gap-2 text-sm text-text-secondary"
              >
                <span aria-hidden="true" className="mt-0.5 font-bold text-accent">
                  &#9656;
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <EmailCapture
              variant="inline"
              headline=""
              subhead=""
              cta="Get the cheat-sheet"
              tag="afqt-math-cheat-sheet"
              source={source}
              successDownloadHref="/afqt-math-cheat-sheet.pdf"
              successTitle="Your cheat-sheet is ready."
              successBody="Tap below to download the PDF. We also added you to the free study list, unsubscribe any time."
            />
          </div>
        </div>

        {/* Right: angled preview of the real artifact (hidden on small screens) */}
        <div className="hidden md:block">
          <img
            src="/images/afqt-math-cheat-sheet-preview.png"
            alt="Preview of the AFQT Math Cheat-Sheet, page 1, showing Arithmetic Reasoning formulas and common traps"
            width={260}
            height={336}
            loading="lazy"
            className="w-[240px] rotate-3 rounded-md border border-navy-border shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    </section>
  );
}
