"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";

// ── Types ─────────────────────────────────────────────────────────────────────

type Attempt = {
  id: string;
  variant_code: string;
  subtest: string | null;
  completed_at: string;
  question_count: number;
  correct_count: number;
  afqt_estimate: number | null;
};

const PAGE_SIZE = 25;

// ── Helpers ───────────────────────────────────────────────────────────────────

function humanizeVariant(code: string, subtest: string | null): string {
  if (code === "diagnostic") return "Full Diagnostic";
  if (code === "subtest_drill" && subtest) return `${subtest} Drill`;
  if (code === "subtest_drill") return "Subtest Drill";
  return code.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Lock screen ───────────────────────────────────────────────────────────────

function HistoryLockScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-tertiary">
        <Link href="/account" className="hover:text-text-secondary no-underline transition-colors">
          Account
        </Link>
        <span>/</span>
        <span className="text-text-secondary">History</span>
      </nav>

      <div className="rounded-2xl border border-navy-border bg-navy-light p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-navy border border-navy-border">
          <svg className="h-6 w-6 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path strokeLinecap="round" d="M8 11V7a4 4 0 018 0v4" />
          </svg>
        </div>
        <h1 className="font-display text-2xl font-bold text-text-primary mb-2">Score History</h1>
        <p className="text-text-secondary mb-6 max-w-sm mx-auto">
          Your full attempt history is part of Pro. Upgrade to track every score, see trends, and review past tests.
        </p>
        <Link
          href="/upgrade"
          className="inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline"
        >
          Upgrade to Pro
        </Link>
        <div className="mt-4">
          <Link
            href="/account"
            className="text-sm text-text-tertiary hover:text-text-secondary no-underline transition-colors"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Inner component (uses useSearchParams) ────────────────────────────────────

function HistoryInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();

  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [total, setTotal] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.replace("/login");
    }
  }, [session, sessionLoading, router]);

  const loadAttempts = useCallback(async () => {
    if (!session) return;
    setDataLoading(true);
    const supabase = getSupabaseBrowserClient();
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, count } = await (supabase as any)
      .from("attempts")
      .select(
        "id,variant_code,subtest,completed_at,question_count,correct_count,afqt_estimate",
        { count: "exact" }
      )
      .eq("user_id", session.user.id)
      .order("completed_at", { ascending: false })
      .range(from, to);

    setAttempts(data ?? []);
    setTotal(count ?? 0);
    setDataLoading(false);
  }, [session, page]);

  useEffect(() => {
    if (session && entitlement.isPro) {
      loadAttempts();
    } else if (!entitlementLoading) {
      setDataLoading(false);
    }
  }, [session, entitlement.isPro, entitlementLoading, loadAttempts]);

  if (sessionLoading || entitlementLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-secondary text-sm">Loading…</div>
      </div>
    );
  }

  if (!session) return null;

  if (!entitlement.isPro) {
    return <HistoryLockScreen />;
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-text-tertiary">
        <Link href="/account" className="hover:text-text-secondary no-underline transition-colors">
          Account
        </Link>
        <span>/</span>
        <span className="text-text-secondary">History</span>
      </nav>

      <h1 className="font-display text-3xl font-bold text-text-primary mb-2">Score History</h1>
      <p className="text-text-secondary mb-8">{total} attempt{total !== 1 ? "s" : ""} total</p>

      {dataLoading ? (
        <div className="text-text-secondary text-sm">Loading…</div>
      ) : attempts.length === 0 ? (
        <div className="rounded-2xl border border-navy-border bg-navy-light p-8 text-center">
          <p className="text-text-secondary">No attempts yet.</p>
          <Link
            href="/practice-test"
            className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover no-underline"
          >
            Take your first test
          </Link>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-navy-border bg-navy-light overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-border">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wide">
                    Date
                  </th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wide">
                    Test
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold text-text-tertiary uppercase tracking-wide">
                    Score
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold text-text-tertiary uppercase tracking-wide">
                    %
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold text-text-tertiary uppercase tracking-wide">
                    AFQT
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-border">
                {attempts.map((a) => {
                  const pct = a.question_count > 0
                    ? Math.round((a.correct_count / a.question_count) * 100)
                    : 0;
                  return (
                    <tr key={a.id} className="hover:bg-navy-lighter transition-colors">
                      <td className="px-5 py-3.5 text-text-tertiary whitespace-nowrap">
                        {formatDate(a.completed_at)}
                      </td>
                      <td className="px-5 py-3.5 text-text-primary font-medium">
                        {humanizeVariant(a.variant_code, a.subtest)}
                      </td>
                      <td className="px-5 py-3.5 text-right text-text-secondary">
                        {a.correct_count}/{a.question_count}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span
                          className={`font-semibold ${
                            pct >= 75
                              ? "text-success"
                              : pct >= 50
                              ? "text-almost"
                              : "text-danger"
                          }`}
                        >
                          {pct}%
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {a.afqt_estimate != null ? (
                          <span className="rounded-full bg-accent-dim px-2.5 py-0.5 text-xs font-semibold text-accent">
                            {a.afqt_estimate}
                          </span>
                        ) : (
                          <span className="text-text-tertiary">, </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-tertiary">
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                {page > 1 && (
                  <Link
                    href={`/account/history?page=${page - 1}`}
                    className="rounded-lg border border-navy-border px-4 py-2 text-text-secondary hover:text-text-primary no-underline transition-colors"
                  >
                    Previous
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`/account/history?page=${page + 1}`}
                    className="rounded-lg border border-navy-border px-4 py-2 text-text-secondary hover:text-text-primary no-underline transition-colors"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Page export ───────────────────────────────────────────────────────────────

export default function HistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-text-secondary text-sm">Loading…</div>
        </div>
      }
    >
      <HistoryInner />
    </Suspense>
  );
}
