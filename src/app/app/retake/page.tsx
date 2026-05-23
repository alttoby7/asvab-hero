"use client";

/**
 * Real ASVAB score log + retake-eligibility tracker (free core feature).
 * Users record their official test dates + scores; we compute when they're next
 * eligible to retest under the DoD 1-1-6 rule (see src/lib/retake.ts).
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import { ALL_SUBTESTS, type AsvabSubtest } from "@/types";
import {
  computeRetakeEligibility,
  cTestTriggered,
  scoreValidUntil,
  formatRetakeDate,
  todayISO,
  type LoggedTest,
} from "@/lib/retake";

interface RealTest {
  id: string;
  test_date: string;
  test_format: string | null;
  afqt: number | null;
  standard_scores: Record<string, number> | null;
  note: string | null;
}

const FORMAT_OPTIONS: { value: string; label: string }[] = [
  { value: "cat", label: "CAT-ASVAB (computer at MEPS)" },
  { value: "papt", label: "Paper (P&P)" },
  { value: "picat", label: "PiCAT (at home)" },
  { value: "unknown", label: "Not sure" },
];

const SUBTEST_LABEL: Record<AsvabSubtest, string> = {
  GS: "GS",
  AR: "AR",
  WK: "WK",
  PC: "PC",
  MK: "MK",
  EI: "EI",
  AS: "AS",
  MC: "MC",
  AO: "AO",
};

export default function RetakePage() {
  const { session } = useSession();
  const [tests, setTests] = useState<RealTest[]>([]);
  const [loading, setLoading] = useState(true);

  // add-form state
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [format, setFormat] = useState("cat");
  const [afqt, setAfqt] = useState("");
  const [scores, setScores] = useState<Record<string, string>>({});
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { data } = await sb
      .from("real_asvab_tests")
      .select("*")
      .eq("user_id", session.user.id)
      .order("test_date", { ascending: false });
    setTests((data as RealTest[]) ?? []);
    setLoading(false);
  }, [session]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!session || !date) return;
    setSaving(true);
    setMsg(null);

    const std: Record<string, number> = {};
    for (const st of ALL_SUBTESTS) {
      const v = scores[st];
      if (v !== undefined && v !== "" && !Number.isNaN(Number(v))) {
        std[st] = Number(v);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { error } = await sb.from("real_asvab_tests").insert({
      user_id: session.user.id,
      test_date: date,
      test_format: format || "unknown",
      afqt: afqt ? Number(afqt) : null,
      standard_scores: Object.keys(std).length ? std : null,
      note: note.trim() || null,
    });

    setSaving(false);
    if (error) {
      setMsg({ type: "error", text: error.message });
      return;
    }
    setDate("");
    setAfqt("");
    setScores({});
    setNote("");
    setFormat("cat");
    setShowForm(false);
    setMsg({ type: "success", text: "Test logged." });
    setTimeout(() => setMsg(null), 3000);
    load();
  }

  async function handleDelete(id: string) {
    if (!session) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    await sb.from("real_asvab_tests").delete().eq("id", id).eq("user_id", session.user.id);
    load();
  }

  const logged: LoggedTest[] = tests.map((t) => ({
    test_date: t.test_date,
    afqt: t.afqt,
    test_format: t.test_format,
  }));
  const elig = computeRetakeEligibility(logged);
  const cTest = cTestTriggered(logged);
  const latest = tests[0]; // ordered desc
  const validUntil = latest
    ? scoreValidUntil(latest.test_date, latest.test_format)
    : null;
  const scoresExpired = validUntil ? todayISO() > validUntil : false;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-tertiary">
        <Link href="/app/home" className="hover:text-text-secondary no-underline transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-text-secondary">Retake tracker</span>
      </nav>

      <h1 className="font-display text-2xl font-bold text-text-primary">
        Your real ASVAB scores
      </h1>
      <p className="mt-1 text-sm text-text-secondary">
        Log each official test you&apos;ve taken. We&apos;ll track your scores and
        tell you exactly when you can retest under the DoD 1-1-6 rule.
      </p>

      {/* Eligibility banner */}
      <div className="mt-6 rounded-2xl border border-navy-border bg-navy-light p-5">
        {elig.testsTaken === 0 ? (
          <p className="text-sm text-text-secondary">
            No official tests logged yet. Add your first ASVAB below to start
            tracking retake timing.
          </p>
        ) : (
          <>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                Next retest ({elig.nextRetestLabel})
              </span>
              <span className="text-xs text-text-tertiary">
                {elig.testsTaken} test{elig.testsTaken === 1 ? "" : "s"} taken
              </span>
            </div>
            {elig.eligibleNow ? (
              <p className="mt-1 font-display text-xl font-bold text-success">
                You&apos;re eligible to retest now.
              </p>
            ) : (
              <>
                <p className="mt-1 font-display text-xl font-bold text-text-primary">
                  {formatRetakeDate(elig.nextEligibleDate!)}
                </p>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {elig.daysUntilEligible} day
                  {elig.daysUntilEligible === 1 ? "" : "s"} away · waiting{" "}
                  {elig.waitMonths} month{elig.waitMonths === 1 ? "" : "s"} from{" "}
                  {formatRetakeDate(elig.latestTestDate!)}
                </p>
              </>
            )}
            <p className="mt-2 border-t border-navy-border pt-2 text-xs text-text-tertiary">
              {elig.rule} Branches may add their own DEP restrictions — confirm
              the exact date with your recruiter.
            </p>
          </>
        )}
      </div>

      {/* Heads-up notes */}
      {cTest && (
        <div className="mt-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
          Heads-up: your AFQT rose 20+ points within 6 months, which triggers a
          confirmation test (C-Test) at MEPS — taken immediately with no wait.
        </div>
      )}
      {scoresExpired && (
        <div className="mt-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
          Your most recent scores are past the validity window
          {validUntil ? ` (expired ${formatRetakeDate(validUntil)})` : ""}; most
          branches let you retest without the usual waiting period.
        </div>
      )}

      {msg && (
        <div
          className={`mt-3 rounded-lg border px-4 py-3 text-sm ${
            msg.type === "success"
              ? "border-success bg-success-dim text-success"
              : "border-danger bg-danger-dim text-danger"
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Logged tests */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            Test history
          </h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex rounded-lg border border-accent/40 px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent-dim"
            >
              + Log a test
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-sm text-text-tertiary">Loading…</p>
        ) : tests.length === 0 && !showForm ? (
          <div className="rounded-lg border border-navy-border bg-navy px-4 py-3 text-sm text-text-secondary">
            No tests logged yet.
          </div>
        ) : (
          <div className="space-y-2">
            {tests.map((t) => (
              <div
                key={t.id}
                className="rounded-lg border border-navy-border bg-navy px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-text-primary">
                        {formatRetakeDate(t.test_date)}
                      </span>
                      {t.afqt != null && (
                        <span className="rounded border border-accent/40 px-1.5 py-0.5 text-[11px] font-semibold text-accent">
                          AFQT {t.afqt}
                        </span>
                      )}
                      {t.test_format && t.test_format !== "unknown" && (
                        <span className="text-[11px] uppercase tracking-wide text-text-tertiary">
                          {t.test_format}
                        </span>
                      )}
                    </div>
                    {t.standard_scores && Object.keys(t.standard_scores).length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {ALL_SUBTESTS.filter((st) => t.standard_scores?.[st] != null).map(
                          (st) => (
                            <span
                              key={st}
                              className="rounded bg-navy-light px-1.5 py-0.5 text-[11px] text-text-secondary"
                            >
                              {SUBTEST_LABEL[st]} {t.standard_scores![st]}
                            </span>
                          )
                        )}
                      </div>
                    )}
                    {t.note && (
                      <p className="mt-1.5 text-xs text-text-tertiary">{t.note}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(t.id)}
                    aria-label="Delete test"
                    className="shrink-0 rounded border border-danger/40 px-2 py-1 text-danger transition-colors hover:bg-danger-dim"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add form */}
        {showForm && (
          <form
            onSubmit={handleAdd}
            className="mt-3 rounded-xl border border-navy-border bg-navy p-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="rt-date" className="text-sm font-medium text-text-secondary">
                  Test date <span className="text-danger">*</span>
                </label>
                <input
                  id="rt-date"
                  type="date"
                  required
                  max={todayISO()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-lg border border-navy-border bg-navy-light px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="rt-format" className="text-sm font-medium text-text-secondary">
                  Format
                </label>
                <select
                  id="rt-format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="rounded-lg border border-navy-border bg-navy-light px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
                >
                  {FORMAT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="rt-afqt" className="text-sm font-medium text-text-secondary">
                  AFQT score (percentile)
                </label>
                <input
                  id="rt-afqt"
                  type="number"
                  min={1}
                  max={99}
                  value={afqt}
                  onChange={(e) => setAfqt(e.target.value)}
                  placeholder="e.g. 65"
                  className="rounded-lg border border-navy-border bg-navy-light px-3 py-2 text-sm text-text-primary placeholder-text-tertiary outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-text-secondary">
                Subtest standard scores <span className="text-text-tertiary">(optional)</span>
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {ALL_SUBTESTS.map((st) => (
                  <div key={st} className="flex flex-col gap-1">
                    <label htmlFor={`rt-${st}`} className="text-[11px] text-text-tertiary">
                      {SUBTEST_LABEL[st]}
                    </label>
                    <input
                      id={`rt-${st}`}
                      type="number"
                      min={1}
                      max={99}
                      value={scores[st] ?? ""}
                      onChange={(e) =>
                        setScores((s) => ({ ...s, [st]: e.target.value }))
                      }
                      className="rounded-md border border-navy-border bg-navy-light px-2 py-1.5 text-sm text-text-primary outline-none focus:border-accent"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <label htmlFor="rt-note" className="text-sm font-medium text-text-secondary">
                Note <span className="text-text-tertiary">(optional)</span>
              </label>
              <input
                id="rt-note"
                type="text"
                maxLength={200}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. first attempt at MEPS"
                className="rounded-lg border border-navy-border bg-navy-light px-3 py-2 text-sm text-text-primary placeholder-text-tertiary outline-none focus:border-accent"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                disabled={saving || !date}
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save test"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setMsg(null);
                }}
                className="rounded-lg border border-navy-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <p className="mt-6 text-xs text-text-tertiary">
        This is a planning aid, not an official source. Always confirm retest
        eligibility and dates with your recruiter or MEPS.{" "}
        <Link href="/asvab-retake-policy" className="text-accent no-underline hover:text-accent-hover">
          Read the full retake policy →
        </Link>
      </p>
    </div>
  );
}
