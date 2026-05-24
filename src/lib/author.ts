/**
 * Canonical author entity for ASVAB Hero content.
 *
 * "Jordan Avery" is ASVAB Hero's editorial persona — a consistent byline for the
 * brand's guides. The bio is honest about the editorial/methodology role and
 * makes no fabricated personal credentials. The Person carries a stable @id so
 * every Article's `author` and the /team/jordan-avery ProfilePage resolve to the
 * same entity (the signal search + AI engines use to recognize authorship).
 *
 * `sameAs` is filled in as off-site profiles for the persona go live.
 */
export const AUTHOR_ID = "https://asvabhero.com/team/jordan-avery#editor";
export const AUTHOR_URL = "https://asvabhero.com/team/jordan-avery";
export const AUTHOR_NAME = "Jordan Avery";

/** Compact reference for use as an Article `author` (resolves to the full Person). */
export const AUTHOR_REF = {
  "@type": "Person",
  "@id": AUTHOR_ID,
  name: AUTHOR_NAME,
  url: AUTHOR_URL,
} as const;

/** Off-site profiles for the persona. Add URLs here as each is claimed. */
export const AUTHOR_SAME_AS: string[] = [];

/** Full Person node — emitted by the author page so the @id resolves to detail. */
export const AUTHOR_PERSON = {
  "@type": "Person",
  "@id": AUTHOR_ID,
  name: AUTHOR_NAME,
  url: AUTHOR_URL,
  jobTitle: "Editor",
  description:
    "Jordan Avery is the editor at ASVAB Hero, reviewing every guide against official Department of Defense and ASVAB sources — including the PAY97 AFQT norming tables and each branch's published score minimums — and the cognitive-science research on what actually raises test scores.",
  worksFor: {
    "@type": "Organization",
    "@id": "https://asvabhero.com/#organization",
    name: "ASVAB Hero",
    url: "https://asvabhero.com",
  },
  knowsAbout: [
    "ASVAB",
    "AFQT score",
    "GT score",
    "ASVAB line scores",
    "military enlistment",
    "test preparation",
  ],
  sameAs: AUTHOR_SAME_AS,
} as const;
