/**
 * ASVAB retake-eligibility logic (DoD 1-1-6 rule). Pure + date-only so it's
 * testable and timezone-stable.
 *
 * The rule (per asvab-retake-policy): after your initial ASVAB you wait one
 * calendar month for the first retest; one more month for the second retest;
 * then six months between every subsequent retest. Waiting periods count from
 * the TEST DATE on the score report. So the wait after the most recent test is:
 *   tests taken == 1  → 1 month   (eligible for 1st retest)
 *   tests taken == 2  → 1 month   (eligible for 2nd retest)
 *   tests taken >= 3  → 6 months  (every subsequent retest)
 */

export interface LoggedTest {
  test_date: string; // 'YYYY-MM-DD'
  afqt?: number | null;
  test_format?: string | null;
}

export interface RetakeEligibility {
  testsTaken: number;
  latestTestDate: string | null;
  waitMonths: number | null;
  nextEligibleDate: string | null; // 'YYYY-MM-DD'
  eligibleNow: boolean;
  daysUntilEligible: number | null;
  nextRetestLabel: string; // e.g. "first retest", "second retest", "next retest"
  rule: string;
}

function parseISO(s: string): [number, number, number] {
  const [y, m, d] = s.split("-").map((n) => parseInt(n, 10));
  return [y, m, d];
}

function pad(n: number, len = 2): string {
  return n.toString().padStart(len, "0");
}

export function todayISO(now: Date = new Date()): string {
  return `${pad(now.getFullYear(), 4)}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Add calendar months to a 'YYYY-MM-DD' date, clamping the day to month end. */
export function addCalendarMonths(iso: string, months: number): string {
  const [y, m, d] = parseISO(iso);
  const total = y * 12 + (m - 1) + months;
  const ny = Math.floor(total / 12);
  const nm = (total % 12) + 1; // 1-based
  const lastDay = new Date(ny, nm, 0).getDate(); // last day of (ny, nm)
  const nd = Math.min(d, lastDay);
  return `${pad(ny, 4)}-${pad(nm)}-${pad(nd)}`;
}

/** Whole days between two 'YYYY-MM-DD' dates (b - a), UTC-based to avoid DST. */
export function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = parseISO(a);
  const [by, bm, bd] = parseISO(b);
  const ms = Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad);
  return Math.round(ms / 86_400_000);
}

/**
 * Compute retake eligibility from the user's logged official tests.
 * Tests need not be pre-sorted. `now` is injectable for tests.
 */
export function computeRetakeEligibility(
  tests: LoggedTest[],
  now: Date = new Date()
): RetakeEligibility {
  const today = todayISO(now);
  const dates = tests
    .map((t) => t.test_date)
    .filter(Boolean)
    .sort(); // ISO strings sort chronologically

  const testsTaken = dates.length;

  if (testsTaken === 0) {
    return {
      testsTaken: 0,
      latestTestDate: null,
      waitMonths: null,
      nextEligibleDate: null,
      eligibleNow: true,
      daysUntilEligible: 0,
      nextRetestLabel: "first ASVAB",
      rule: "Log your official ASVAB test dates to track when you can retest.",
    };
  }

  const latestTestDate = dates[dates.length - 1];
  const waitMonths = testsTaken <= 2 ? 1 : 6;
  const nextEligibleDate = addCalendarMonths(latestTestDate, waitMonths);
  const daysUntilEligible = Math.max(0, daysBetween(today, nextEligibleDate));
  const eligibleNow = today >= nextEligibleDate;
  const nextRetestLabel =
    testsTaken === 1 ? "first retest" : testsTaken === 2 ? "second retest" : "next retest";

  const rule =
    waitMonths === 1
      ? "After your most recent test you wait one calendar month to retest (1-1-6 rule)."
      : "After your second retest you wait six calendar months between every subsequent retest (1-1-6 rule).";

  return {
    testsTaken,
    latestTestDate,
    waitMonths,
    nextEligibleDate,
    eligibleNow,
    daysUntilEligible,
    nextRetestLabel,
    rule,
  };
}

/** Standard ASVAB scores are valid 2 years; verified PiCAT 5 years. */
export function scoreValidUntil(testDate: string, format?: string | null): string {
  return addCalendarMonths(testDate, format === "picat" ? 60 : 24);
}

/**
 * C-Test heads-up: a gain of 20+ AFQT points within a 6-month window triggers a
 * confirmation test (C-Test) at MEPS. Detects it across the two most recent
 * tests that have AFQT recorded. Informational only.
 */
export function cTestTriggered(tests: LoggedTest[]): boolean {
  const scored = tests
    .filter((t) => typeof t.afqt === "number")
    .sort((a, b) => (a.test_date < b.test_date ? -1 : 1));
  if (scored.length < 2) return false;
  const last = scored[scored.length - 1];
  const prev = scored[scored.length - 2];
  if (typeof last.afqt !== "number" || typeof prev.afqt !== "number") return false;
  const gain = last.afqt - prev.afqt;
  return gain >= 20 && daysBetween(prev.test_date, last.test_date) <= 183;
}

/** Friendly date for display, e.g. "Mar 20, 2026". */
export function formatRetakeDate(iso: string): string {
  const [y, m, d] = parseISO(iso);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
