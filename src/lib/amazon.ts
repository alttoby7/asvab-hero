/**
 * Single source of truth for the Amazon Associates tracking ID used in every
 * affiliate link on the site. Overridable per environment via
 * NEXT_PUBLIC_AMAZON_TAG; defaults to the registered `asvabhero-20` tracking ID.
 *
 * Keep all affiliate links pointed at this constant so the tag can never drift
 * between pages or silently fall back to another brand's ID.
 */
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "asvabhero-20";
