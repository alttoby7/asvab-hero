import EmailCapture from "@/components/EmailCapture";

interface ARCRecruitCaptureProps {
  /**
   * Placement label for analytics (e.g. "math-tips-end"). Passed through to
   * EmailCapture's `source` so GA4 can tell which mount converts. The Listmonk
   * routing tag stays fixed at "book-arc".
   */
  source: string;
}

const BULLETS = [
  "750+ worked practice problems and 5 full-length tests, the whole math half of the AFQT.",
  "Reading it does not require a review. If you review it after launch, just share your honest take.",
  "Free advance PDF. I email your copy after you sign up.",
];

/**
 * ARC (advance reader copy) recruit block for the printed workbook
 * "ASVAB Math, Explained." Capture-only by design: we do NOT expose the full
 * book as a public instant download (it becomes a paid product). We collect the
 * email under the "book-arc" tag and send the advance PDF to opt-ins by email.
 * On-brand: navy panel, orange accents, faint graph-paper grid, cover artifact.
 */
export default function ARCRecruitCapture({ source }: ARCRecruitCaptureProps) {
  return (
    <section className="not-prose relative overflow-hidden rounded-2xl border border-accent/40 bg-navy-light p-6 sm:p-8">
      {/* Faint graph-paper grid, contextual to a math workbook. Decorative only. */}
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
            Free advance copy
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-text-primary">
            Read the new ASVAB math workbook before it launches
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            I just finished <em>ASVAB Math, Explained</em>, a step-by-step
            workbook for the math half of the AFQT. Before it goes live on
            Amazon, I am sharing a free advance copy to gather honest feedback
            from people preparing for the ASVAB.
          </p>
          <ul className="mt-4 space-y-2">
            {BULLETS.map((b) => (
              <li key={b} className="flex gap-2 text-sm text-text-secondary">
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
              cta="Send me the advance copy"
              tag="book-arc"
              source={source}
              successTitle="You're on the advance list."
              successBody="I'll email your advance copy (PDF) within a day. Reading it does not require a review; if you review it after launch, just share your honest opinion in your own words."
            />
          </div>
        </div>

        {/* Right: the book cover as the artifact (hidden on small screens) */}
        <div className="hidden md:block">
          <img
            src="/images/asvab-math-book-cover.png"
            alt="Cover of ASVAB Math, Explained, a workbook for Arithmetic Reasoning and Mathematics Knowledge"
            width={240}
            height={311}
            loading="lazy"
            className="w-[220px] rotate-3 rounded-md border border-navy-border shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>
    </section>
  );
}
