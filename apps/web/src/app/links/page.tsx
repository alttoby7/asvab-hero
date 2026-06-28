import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ASVAB Hero — Links",
  robots: { index: false, follow: false },
};

const LINKS: {
  label: string;
  href: string;
  description: string;
  primary?: boolean;
}[] = [
  {
    label: "Free ASVAB Score Calculator",
    href: "/calculator?utm_source=linkinbio&utm_medium=social",
    description: "Enter your scores, see your AFQT + qualifying jobs instantly",
    primary: true,
  },
  {
    label: "Practice Questions",
    href: "/practice?utm_source=linkinbio&utm_medium=social",
    description: "4,500+ questions across all 9 subtests",
  },
  {
    label: "ASVAB Study Guide",
    href: "/asvab-study-guide?utm_source=linkinbio&utm_medium=social",
    description: "Free tips, strategies, and subtest breakdowns",
  },
  {
    label: "What ASVAB Score Do I Need?",
    href: "/asvab-score-requirements?utm_source=linkinbio&utm_medium=social",
    description: "Minimum scores by branch + job",
  },
];

export default function LinksPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-navy px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-wordmark-light.svg"
            alt="ASVAB Hero"
            className="mb-3 h-12"
          />
          <p className="mt-1 text-sm text-text-secondary">
            ASVAB prep. 4,500+ questions. Free score calculator.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`block rounded-xl border px-5 py-4 text-center transition-all hover:scale-[1.02] ${
                link.primary
                  ? "border-accent bg-accent text-text-inverse font-bold shadow-lg shadow-accent-dim hover:bg-accent-hover"
                  : "border-navy-border bg-navy-light text-text-primary hover:border-accent hover:bg-navy-lighter"
              }`}
            >
              <span className="block text-base font-semibold">
                {link.label}
              </span>
              {link.description && (
                <span
                  className={`mt-1 block text-xs ${
                    link.primary ? "text-text-inverse/80" : "text-text-tertiary"
                  }`}
                >
                  {link.description}
                </span>
              )}
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-5">
          <a
            href="https://www.tiktok.com/@asvabhero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-text-tertiary transition-colors hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.83 4.83 0 01-1-.15z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@ASVABHero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-text-tertiary transition-colors hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.56 31.56 0 000 12a31.56 31.56 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.56 31.56 0 0024 12a31.56 31.56 0 00-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
            </svg>
          </a>
          <a
            href="https://asvabhero.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website"
            className="text-text-tertiary transition-colors hover:text-accent"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
          </a>
        </div>

        <p className="mt-6 text-center text-xs text-text-tertiary">
          asvabhero.com
        </p>
      </div>
    </div>
  );
}
