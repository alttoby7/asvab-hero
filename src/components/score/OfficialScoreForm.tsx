"use client";

/**
 * Shared official-ASVAB-score entry form. Single write path for ALL surfaces
 * (onboarding step, dashboard card, /app/retake), it calls the validated
 * rpc_log_official_test RPC (migration 0042), which rejects bad data, sets
 * profiles.official_test_status, and writes a calibration row.
 *
 * Official scores are ground truth, so we mirror the RPC's validation here and
 * never silently "fix" values.
 */

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { ALL_SUBTESTS } from "@/types";

export type ExamKind =
  | "initial_asvab"
  | "afct"
  | "confirmation_test"
  | "student_asvab";

export interface OfficialScoreSaved {
  afqt: number | null;
  standardScores: Record<string, number>;
  examKind: ExamKind;
  testDate: string;
  /** Lowest-scoring subtest among those entered, for weakest-subtest prefill. */
  weakestSubtest: string | null;
}

const FORMAT_OPTIONS: { value: string; label: string }[] = [
  { value: "cat", label: "CAT-ASVAB (computer at MEPS)" },
  { value: "papt", label: "Paper (P&P)" },
  { value: "picat", label: "PiCAT (at home)" },
  { value: "unknown", label: "Not sure" },
];

const EXAM_KIND_OPTIONS: { value: ExamKind; label: string }[] = [
  { value: "initial_asvab", label: "Initial ASVAB (enlistment)" },
  { value: "afct", label: "AFCT (active-duty retest)" },
  { value: "confirmation_test", label: "Confirmation Test" },
  { value: "student_asvab", label: "Student ASVAB (school)" },
];

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function OfficialScoreForm({
  context,
  defaultExamKind = "initial_asvab",
  showExamKind = false,
  submitLabel = "Save my scores",
  onSaved,
  onCancel,
}: {
  context: "onboarding" | "dashboard" | "retake";
  defaultExamKind?: ExamKind;
  showExamKind?: boolean;
  submitLabel?: string;
  onSaved?: (saved: OfficialScoreSaved) => void;
  onCancel?: () => void;
}) {
  const [date, setDate] = useState("");
  const [examKind, setExamKind] = useState<ExamKind>(defaultExamKind);
  const [format, setFormat] = useState("cat");
  const [afqt, setAfqt] = useState("");
  const [scores, setScores] = useState<Record<string, string>>({});
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Client-side validation mirroring the RPC (reject, don't clamp).
    if (!date) {
      setError("Please enter the test date.");
      return;
    }
    if (date > todayISO()) {
      setError("Test date can't be in the future.");
      return;
    }
    const afqtNum = afqt === "" ? null : Number(afqt);
    if (afqtNum != null && (Number.isNaN(afqtNum) || afqtNum < 1 || afqtNum > 99)) {
      setError("AFQT must be a number between 1 and 99.");
      return;
    }
    const std: Record<string, number> = {};
    for (const st of ALL_SUBTESTS) {
      const raw = scores[st];
      if (raw === undefined || raw === "") continue;
      const n = Number(raw);
      if (Number.isNaN(n) || n < 1 || n > 99) {
        setError(`${st} score must be between 1 and 99.`);
        return;
      }
      std[st] = n;
    }

    setSaving(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    const { error: rpcError } = await sb.rpc("rpc_log_official_test", {
      p_test_date: date,
      p_exam_kind: examKind,
      p_test_format: format || "unknown",
      p_afqt: afqtNum,
      p_standard_scores: Object.keys(std).length ? std : null,
      p_note: note.trim() || null,
    });
    setSaving(false);

    if (rpcError) {
      setError(rpcError.message || "Could not save your scores. Please try again.");
      return;
    }

    // Lowest entered subtest, for weakest-subtest prefill upstream.
    let weakest: string | null = null;
    let weakestVal = Infinity;
    for (const [k, v] of Object.entries(std)) {
      if (v < weakestVal) {
        weakestVal = v;
        weakest = k;
      }
    }

    const saved: OfficialScoreSaved = {
      afqt: afqtNum,
      standardScores: std,
      examKind,
      testDate: date,
      weakestSubtest: weakest,
    };

    // Reset so the form can be reused (retake page logs multiple).
    setDate("");
    setAfqt("");
    setScores({});
    setNote("");
    setFormat("cat");
    setExamKind(defaultExamKind);

    onSaved?.(saved);
  }

  const isOnboarding = context === "onboarding";

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isOnboarding
          ? "rounded-xl border border-navy-border bg-navy p-4"
          : "rounded-xl border border-navy-border bg-navy p-4"
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="osf-date" className="text-sm font-medium text-text-secondary">
            Test date <span className="text-danger">*</span>
          </label>
          <input
            id="osf-date"
            type="date"
            required
            max={todayISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-navy-border bg-navy-light px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
          />
        </div>

        {showExamKind && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="osf-kind" className="text-sm font-medium text-text-secondary">
              Which test?
            </label>
            <select
              id="osf-kind"
              value={examKind}
              onChange={(e) => setExamKind(e.target.value as ExamKind)}
              className="rounded-lg border border-navy-border bg-navy-light px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
            >
              {EXAM_KIND_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="osf-format" className="text-sm font-medium text-text-secondary">
            Format
          </label>
          <select
            id="osf-format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="rounded-lg border border-navy-border bg-navy-light px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
          >
            {FORMAT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="osf-afqt" className="text-sm font-medium text-text-secondary">
            AFQT score (percentile)
          </label>
          <input
            id="osf-afqt"
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
          Subtest standard scores{" "}
          <span className="text-text-tertiary">(optional, but improves your plan)</span>
        </label>
        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {ALL_SUBTESTS.map((st) => (
            <div key={st} className="flex flex-col gap-1">
              <label htmlFor={`osf-${st}`} className="text-[11px] text-text-tertiary">
                {st}
              </label>
              <input
                id={`osf-${st}`}
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
        <label htmlFor="osf-note" className="text-sm font-medium text-text-secondary">
          Note <span className="text-text-tertiary">(optional)</span>
        </label>
        <input
          id="osf-note"
          type="text"
          maxLength={200}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. first attempt at MEPS"
          className="rounded-lg border border-navy-border bg-navy-light px-3 py-2 text-sm text-text-primary placeholder-text-tertiary outline-none focus:border-accent"
        />
      </div>

      {error && (
        <div className="mt-3 rounded-lg border border-danger bg-danger-dim px-4 py-2.5 text-sm text-danger">
          {error}
        </div>
      )}

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={saving || !date}
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-navy-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
