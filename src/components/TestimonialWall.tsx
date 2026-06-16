/**
 * Social-proof wall. Renders REAL, curated testimonials when we have them
 * (src/data/testimonials.ts). Until then it shows HONEST proof, the real usage
 * counter + an explicit "no fake reviews" line, so the slot is never empty and
 * never fake. Swap happens automatically the moment real testimonials are
 * curated in (collected via TestimonialPrompt → testimonials table → approval).
 */

import { TESTIMONIALS } from "@/data/testimonials";
import {
  RECRUITS_PER_MONTH,
  SCORE_CHECKS_PER_MONTH,
} from "@/data/social-proof";

export default function TestimonialWall() {
  const hasReal = TESTIMONIALS.length > 0;

  return (
    <section className="border-y border-navy-border bg-navy-light/30">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        {hasReal ? (
          <>
            <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              <span className="text-accent">●</span> From recruits using it
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <figure
                  key={i}
                  className="rounded-2xl border border-navy-border bg-navy p-6"
                >
                  <blockquote className="text-sm leading-relaxed text-text-primary">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-xs text-text-tertiary">
                    <span className="font-semibold text-text-secondary">
                      {t.name}
                    </span>
                    {t.context ? ` · ${t.context}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        ) : (
          <div>
            <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
              <span className="text-accent">●</span> Why recruits trust ASVAB Hero
            </p>

            {/* Real usage numbers (GA4, rounded down) */}
            <div className="mt-7 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
              <div className="text-center">
                <div className="font-mono text-4xl font-extrabold text-text-primary sm:text-5xl">
                  {RECRUITS_PER_MONTH.toLocaleString()}+
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-text-tertiary">
                  recruits this month
                </div>
              </div>
              <div className="text-center">
                <div className="font-mono text-4xl font-extrabold text-text-primary sm:text-5xl">
                  {SCORE_CHECKS_PER_MONTH.toLocaleString()}+
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-text-tertiary">
                  score checks run in 30 days
                </div>
              </div>
              <div className="text-center">
                <div className="font-mono text-4xl font-extrabold text-text-primary sm:text-5xl">
                  6
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-text-tertiary">
                  branches covered
                </div>
              </div>
            </div>

            {/* Authority proof, the method, as credibility */}
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-navy-border bg-navy p-6 text-center sm:p-7">
              <p className="text-sm leading-relaxed text-text-secondary">
                Built on the study methods cognitive science shows actually raise
                scores, {" "}
                <span className="text-text-primary">
                  retrieval practice, spaced repetition, interleaving, and adaptive
                  difficulty
                </span>{" "}
, not the rereading most apps rely on.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-text-tertiary">
                <span>Free to start · no card</span>
                <span className="text-navy-border">·</span>
                <span>Money-back guarantee on Pro</span>
                <span className="text-navy-border">·</span>
                <a
                  href="/the-science"
                  className="text-accent no-underline transition-colors hover:text-accent-hover"
                >
                  See the science &rarr;
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
