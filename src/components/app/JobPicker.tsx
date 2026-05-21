"use client";

/**
 * WS4 — Reusable goal-job picker.
 *
 * Branch tabs + debounced search against `rpc_search_job_catalog`. Used by the
 * onboarding goal step, the account-settings target-jobs manager, and the home
 * tracker's empty state. Selecting a result calls `onPick(entry)`; the parent
 * decides whether to persist (e.g. via `rpc_add_target_job`).
 *
 * Mirrors the branch-tab + search-list pattern from study-guide/CareerGoalSetter
 * and the old JobGoalCard, restyled to the dark-navy/orange app design system.
 */

import { useEffect, useRef, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { searchJobCatalog } from "@/lib/trajectory/queries";
import type { JobCatalogEntry } from "@/lib/trajectory/types";
import { BRANCH_NAMES, type Branch } from "@/types";

interface JobPickerProps {
  /** Default branch to preselect (e.g. profile branch). */
  defaultBranch?: Branch | null;
  /** Called with the chosen catalog entry. */
  onPick: (entry: JobCatalogEntry) => void | Promise<void>;
  /** Job ids already chosen — shown as disabled "Added". */
  disabledJobIds?: string[];
  /** Optional message rendered above the list (e.g. limit reached). */
  notice?: string | null;
}

const SUPPORT_LABEL: Record<string, string> = {
  beta: "Not yet reliable",
  unsupported: "Not yet reliable",
};

export default function JobPicker({
  defaultBranch = null,
  onPick,
  disabledJobIds = [],
  notice = null,
}: JobPickerProps) {
  const [branch, setBranch] = useState<Branch | null>(
    defaultBranch && defaultBranch !== ("undecided" as Branch)
      ? defaultBranch
      : "army"
  );
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<JobCatalogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [pickingId, setPickingId] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!branch) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sb = getSupabaseBrowserClient() as any;
        const rows = await searchJobCatalog(sb, {
          branch,
          query: query.trim() || null,
          limit: 25,
        });
        setResults(rows);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [branch, query]);

  async function handlePick(entry: JobCatalogEntry) {
    if (disabledJobIds.includes(entry.id)) return;
    setPickingId(entry.id);
    try {
      await onPick(entry);
    } finally {
      setPickingId(null);
    }
  }

  return (
    <div>
      {/* Branch tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.entries(BRANCH_NAMES) as [Branch, string][]).map(
          ([b, name]) => (
            <button
              key={b}
              type="button"
              onClick={() => {
                setBranch(b);
                setQuery("");
              }}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                branch === b
                  ? "border-accent bg-accent-dim text-accent"
                  : "border-navy-border text-text-secondary hover:text-text-primary hover:border-accent/40"
              }`}
            >
              {name}
            </button>
          )
        )}
      </div>

      {/* Search */}
      {branch && (
        <div className="mt-4">
          <input
            type="text"
            placeholder={`Search ${BRANCH_NAMES[branch]} jobs…`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-navy-border bg-navy px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:border-accent focus:outline-none"
          />

          {notice && (
            <div className="mt-3 rounded-lg border border-almost/40 bg-almost-dim/40 px-3 py-2 text-xs text-almost">
              {notice}
            </div>
          )}

          {loading ? (
            <div className="mt-3 text-sm text-text-tertiary">Loading…</div>
          ) : (
            <div className="mt-2 max-h-60 space-y-1 overflow-y-auto">
              {results.map((j) => {
                const added = disabledJobIds.includes(j.id);
                const beta = j.support_status !== "supported";
                return (
                  <button
                    key={j.id}
                    type="button"
                    disabled={added || pickingId !== null}
                    onClick={() => handlePick(j)}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      added
                        ? "cursor-default opacity-50"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="font-medium text-text-primary">
                        {j.code}
                      </span>
                      <span className="ml-2 text-text-secondary">
                        {j.title}
                      </span>
                      {beta && (
                        <span className="ml-2 text-[10px] uppercase tracking-wide text-almost">
                          {SUPPORT_LABEL[j.support_status] ?? "Beta"}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 text-xs text-text-tertiary">
                      {added
                        ? "Added"
                        : pickingId === j.id
                          ? "Adding…"
                          : (j.category ?? "")}
                    </span>
                  </button>
                );
              })}
              {results.length === 0 && (
                <div className="px-3 py-2 text-sm text-text-tertiary">
                  {query.trim()
                    ? `No ${BRANCH_NAMES[branch]} jobs match “${query}”`
                    : "No jobs found."}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
