// "Buy on Amazon" block for the now-live paperback "ASVAB Math, Explained."
// Replaces the pre-launch ARC recruit banner on high-intent math pages. On-brand:
// navy panel, orange accents, faint graph-paper grid, cover artifact.
const ASIN = "B0H8NCSHYT";
const TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "asvabhero-20";
const AMAZON_URL = `https://www.amazon.com/dp/${ASIN}?tag=${TAG}`;

const BULLETS = [
  "750+ worked practice problems and 5 full-length tests, the whole math half of the AFQT.",
  "Every problem solved step by step, so the math actually clicks.",
  "Arithmetic Reasoning and Mathematics Knowledge, in one workbook.",
];

export default function BuyBookBlock() {
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
        {/* Left: value prop + buy CTA */}
        <div>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Now on Amazon
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-text-primary">
            Prefer paper? The new ASVAB math workbook is out
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            <em>ASVAB Math, Explained</em> covers the entire math half of the
            AFQT, Arithmetic Reasoning and Mathematics Knowledge, with every
            problem worked out in full. The offline, annotate-it companion to
            practicing here.
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
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white no-underline transition-colors hover:bg-accent-hover sm:w-auto"
            >
              Buy on Amazon
            </a>
          </div>
        </div>

        {/* Right: the book cover as the artifact (hidden on small screens) */}
        <div className="hidden md:block">
          <a href={AMAZON_URL} target="_blank" rel="sponsored noopener noreferrer">
            <img
              src="/images/asvab-math-book-cover.png"
              alt="Cover of ASVAB Math, Explained, a workbook for Arithmetic Reasoning and Mathematics Knowledge"
              width={240}
              height={311}
              loading="lazy"
              className="w-[220px] rotate-3 rounded-md border border-navy-border shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
