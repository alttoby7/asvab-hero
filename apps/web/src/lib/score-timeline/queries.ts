/**
 * Unified score timeline, the "connect all scores" read layer.
 *
 * Stitches the three previously-disconnected score stores into one view:
 *   - official_test     ← real_asvab_tests (ground truth)
 *   - practice_milestone← attempts (diagnostics only, not every drill)
 *   - projected         ← trajectory_score_snapshots (a future marker)
 *
 * Snapshots overwrite, so they are a current/future MARKER, never history.
 * AFQT is the headline metric here (initial-ASVAB); GT/branch metrics are
 * handled elsewhere via the trajectory layer.
 */

export type TimelineEventKind = "official" | "practice" | "projected";

export interface TimelineEvent {
  kind: TimelineEventKind;
  /** ISO date (YYYY-MM-DD) for ordering/display. */
  date: string;
  afqt: number | null;
  label: string;
}

export interface ScoreTimeline {
  events: TimelineEvent[];
  /** Earliest known score (official prior result preferred, else first diagnostic). */
  baselineAfqt: number | null;
  baselineSource: "official" | "practice" | null;
  /** Most recent practice (diagnostic) estimate. */
  latestPracticeAfqt: number | null;
  /** Most recent official result. */
  latestOfficialAfqt: number | null;
  latestOfficialDate: string | null;
  officialCount: number;
}

interface OfficialRow {
  afqt: number | null;
  test_date: string;
}
interface DiagRow {
  afqt_estimate: number | null;
  completed_at: string;
}

function toDate(ts: string): string {
  return ts.length > 10 ? ts.slice(0, 10) : ts;
}

/**
 * Build the unified timeline. `sb` is the supabase browser/server client.
 * `projectedAfqt` is passed in from the already-loaded trajectory snapshot to
 * avoid a duplicate fetch.
 */
export async function getScoreTimeline(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sb: any,
  userId: string,
  projectedAfqt: number | null = null
): Promise<ScoreTimeline> {
  const [officialRes, diagRes] = await Promise.all([
    sb
      .from("real_asvab_tests")
      .select("afqt,test_date")
      .eq("user_id", userId)
      .order("test_date", { ascending: true }),
    sb
      .from("attempts")
      .select("afqt_estimate,completed_at")
      .eq("user_id", userId)
      .eq("variant_code", "diagnostic")
      .order("completed_at", { ascending: true }),
  ]);

  const official: OfficialRow[] = ((officialRes.data as OfficialRow[]) ?? []).filter(
    (r) => r.afqt != null
  );
  const diags: DiagRow[] = ((diagRes.data as DiagRow[]) ?? []).filter(
    (r) => r.afqt_estimate != null
  );

  const events: TimelineEvent[] = [];
  for (const d of diags) {
    events.push({
      kind: "practice",
      date: toDate(d.completed_at),
      afqt: d.afqt_estimate,
      label: "Practice diagnostic",
    });
  }
  for (const o of official) {
    events.push({
      kind: "official",
      date: toDate(o.test_date),
      afqt: o.afqt,
      label: "Official ASVAB",
    });
  }
  events.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  if (projectedAfqt != null) {
    events.push({
      kind: "projected",
      date: "9999-12-31",
      afqt: projectedAfqt,
      label: "Projected on test day",
    });
  }

  const firstOfficial = official[0] ?? null;
  const firstDiag = diags[0] ?? null;
  let baselineAfqt: number | null = null;
  let baselineSource: "official" | "practice" | null = null;
  if (firstOfficial && firstDiag) {
    if (toDate(firstOfficial.test_date) <= toDate(firstDiag.completed_at)) {
      baselineAfqt = firstOfficial.afqt;
      baselineSource = "official";
    } else {
      baselineAfqt = firstDiag.afqt_estimate;
      baselineSource = "practice";
    }
  } else if (firstOfficial) {
    baselineAfqt = firstOfficial.afqt;
    baselineSource = "official";
  } else if (firstDiag) {
    baselineAfqt = firstDiag.afqt_estimate;
    baselineSource = "practice";
  }

  const latestOfficial = official[official.length - 1] ?? null;
  const latestDiag = diags[diags.length - 1] ?? null;

  return {
    events,
    baselineAfqt,
    baselineSource,
    latestPracticeAfqt: latestDiag?.afqt_estimate ?? null,
    latestOfficialAfqt: latestOfficial?.afqt ?? null,
    latestOfficialDate: latestOfficial ? toDate(latestOfficial.test_date) : null,
    officialCount: official.length,
  };
}
