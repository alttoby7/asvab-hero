/**
 * Canonical authorship for ASVAB Hero content.
 *
 * Content is attributed to the ASVAB Hero Editorial Team (the organization), not
 * an individual. We do not use a personal byline. Every Article `author` resolves
 * to the ASVAB Hero Organization node (@id .../#organization), the entity that
 * search and AI engines use to recognize authorship.
 */
export const AUTHOR_DISPLAY = "ASVAB Hero Editorial Team";

/** Organization reference for use as an Article `author`. */
export const ORG_AUTHOR = {
  "@type": "Organization",
  "@id": "https://asvabhero.com/#organization",
  name: "ASVAB Hero",
  url: "https://asvabhero.com",
} as const;
