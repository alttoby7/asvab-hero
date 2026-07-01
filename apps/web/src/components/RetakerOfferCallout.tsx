import Link from "next/link";
import { GUARANTEE_TAG } from "@/lib/guarantee";

/**
 * Persona-matched offer block for retaker-intent landing pages (/afct,
 * /asvab-retake-calculator, /how-to-retake-the-asvab). Retakers are the
 * highest-WTP segment (failed once, on a retest clock, guarantee-eligible) but
 * the retaker pages previously routed them to a generic study-plan email
 * capture. This is their primary CTA; the page's existing EmailCapture stays as
 * the secondary path.
 *
 * Retaker tier retired 2026-06-30 (never sold); this now routes the segment to
 * the 90-Day Pass, which fits the retest study window.
 *
 * `from` flows into /upgrade?from= for source attribution and into the
 * pass90 tier preselect on the upgrade page.
 */
export default function RetakerOfferCallout({ from }: { from: string }) {
  return (
    <section className="my-8 not-prose rounded-xl border border-accent/40 bg-navy-light p-6 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-accent">
        For retakers
      </p>
      <h2 className="mt-2 font-display text-xl font-bold text-text-primary sm:text-2xl">
        Make this retake the last one
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-text-secondary">
        The 90-Day Pass is full Pro for your whole retest window&mdash;full-length
        timed sims, unlimited adaptive drills, and score-trajectory tracking built
        for the retest clock&mdash;backed by a {GUARANTEE_TAG}, no questions asked.
      </p>
      <Link
        href={`/upgrade?tier=pass90&from=${from}`}
        className="mt-5 inline-block rounded-xl bg-accent px-6 py-3 font-display text-base font-bold text-white no-underline transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--color-accent-glow)]"
      >
        Get the 90-Day Pass &mdash; $39
      </Link>
      <p className="mt-2 text-xs text-text-tertiary">
        One-time payment &middot; 90 days &middot; no subscription
      </p>
    </section>
  );
}
