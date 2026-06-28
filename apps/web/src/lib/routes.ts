/**
 * Centralized route builders so authenticated (app-shell) and public (SEO)
 * surfaces stop drifting. The product engines (practice, flashcards) are
 * implemented at BOTH a public URL (for SEO/anon) and an `/app/*` URL (for the
 * premium member shell). Any link rendered for a signed-in user must resolve to
 * the `/app/*` route so they never get dropped into the marketing chrome.
 *
 * Rule of thumb: components that only ever render inside `/app/*` can pass
 * `authed: true`; shared components (e.g. VariantPicker on /practice-test) pass
 * the real session state.
 */

export type PracticeVariant =
  | "diagnostic"
  | "afqt_adaptive"
  | "gt_adaptive"
  | "rating_adaptive"
  | "full_sim"
  | "afqt_sprint"
  | "weakness_loop"
  | "retake_readiness"
  | "subtest_drill";

/** Practice hub (variant picker), `/app/practice` for members, public otherwise. */
export function practiceHubHref(authed: boolean): string {
  return authed ? "/app/practice" : "/practice-test";
}

/** A specific practice run. Keeps members inside the app shell. */
export function practiceHref(
  variant: PracticeVariant,
  opts: { authed: boolean; subtest?: string }
): string {
  const base = practiceHubHref(opts.authed);
  const params = new URLSearchParams({ variant });
  if (opts.subtest) params.set("subtest", opts.subtest);
  return `${base}?${params.toString()}`;
}

/** Flashcards deck list. */
export function flashcardsHref(authed: boolean): string {
  return authed ? "/app/flashcards" : "/flashcards";
}

/** A single flashcards deck's review session. */
export function flashcardDeckHref(deckSlug: string, authed: boolean): string {
  return authed ? `/app/flashcards/${deckSlug}` : `/flashcards/${deckSlug}`;
}
