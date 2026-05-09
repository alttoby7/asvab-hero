"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useSession } from "@/hooks/useSession";
import { useEntitlement } from "@/hooks/useEntitlement";
import { trackEvent, FunnelEvents } from "@/lib/analytics";
import { TrialBanner } from "@/components/account/TrialBanner";

type Attempt = {
  id: string;
  variant_code: string;
  subtest: string | null;
  completed_at: string;
  question_count: number;
  correct_count: number;
  afqt_estimate: number | null;
};

type WeakTopic = {
  topic_id: string;
  seen: number;
  correct: number;
  priority: number;
  title?: string;
  subtest?: string;
  slug?: string;
};

type DashboardData = {
  displayName: string | null;
  email: string;
  freeDiagnosticUsedAt: string | null;
  proTier: string | null;
  proUntil: string | null;
  signupSource: string | null;
  attempts: Attempt[];
  weakTopics: WeakTopic[];
};

function humanizeVariant(code: string, subtest: string | null): string {
  if (code === "diagnostic") return "Full Diagnostic";
  if (code === "subtest_drill" && subtest) return `${subtest} Drill`;
  if (code === "subtest_drill") return "Subtest Drill";
  return code.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function fmtProUntil(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function getInProgressTest(): boolean {
  try {
    const raw = localStorage.getItem("asvab-hero-practice-test");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return !!(parsed && parsed.phase === "test");
  } catch {
    return false;
  }
}

function LockBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-navy-border px-2 py-0.5 text-xs text-text-tertiary ml-1" title="Pro feature">
      <svg className="h-3 w-3" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="7" width="10" height="7" rx="1.5" />
        <path strokeLinecap="round" d="M5.5 7V5a2.5 2.5 0 015 0v2" />
      </svg>
      Pro
    </span>
  );
}

function SignOutButton() {
  const router = useRouter();
  async function doSignOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.replace("/");
  }
  return (
    <button onClick={doSignOut} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
      Sign out
    </button>
  );
}

export default function AccountDashboardPage() {
  const router = useRouter();
  const { session, loading: sessionLoading } = useSession();
  const { entitlement, loading: entitlementLoading } = useEntitlement();
  const [data, setData] = useState<DashboardData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [hasInProgress, setHasInProgress] = useState(false);

  useEffect(() => {
    if (!sessionLoading && !session) router.replace("/login");
  }, [session, sessionLoading, router]);

  useEffect(() => { setHasInProgress(getInProgressTest()); }, []);

  // pro_active — fire once per user when /account loads with isPro=true.
  // Wait for `data` so we can attach the durable signup_source from the
  // profile (survives localStorage clears and long free→Pro lag).
  useEffect(() => {
    if (entitlementLoading || !session || !entitlement.isPro || !data) return;
    const dedupeKey = `asvabhero.pro_active_fired.${session.user.id}`;
    try {
      if (localStorage.getItem(dedupeKey)) return;
      localStorage.setItem(dedupeKey, "1");
    } catch {
      return; // skip firing if we can't dedupe
    }
    trackEvent(FunnelEvents.ProActive, {
      tier: entitlement.proTier ?? "unknown",
      signup_source: data.signupSource ?? "unknown",
    });
  }, [entitlementLoading, session, entitlement.isPro, entitlement.proTier, data]);

  useEffect(() => {
    if (!session) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = getSupabaseBrowserClient() as any;
    async function load() {
      if (!session) return;
      setDataLoading(true);
      const { data: profile } = await sb.from("profiles").select("display_name,free_diagnostic_used_at,pro_tier,pro_until,email,onboarding_completed_at,signup_source").eq("user_id", session.user.id).single();
      // Onboarding guard — Pro users who haven't completed onboarding go through it first.
      if (entitlement.isPro && profile && profile.onboarding_completed_at == null) {
        router.replace("/onboarding");
        return;
      }
      const { data: attemptsRaw } = await sb.from("attempts").select("id,variant_code,subtest,completed_at,question_count,correct_count,afqt_estimate").eq("user_id", session.user.id).order("completed_at", { ascending: false }).limit(5);
      const { data: statsRaw } = await sb.from("topic_stats").select("topic_id,seen,correct,priority").eq("user_id", session.user.id).gt("priority", 0).gte("seen", 3).order("priority", { ascending: false }).limit(3);
      let weakTopics: WeakTopic[] = statsRaw ?? [];
      if (weakTopics.length > 0) {
        const typed = getSupabaseBrowserClient();
        const ids = weakTopics.map((t: WeakTopic) => t.topic_id);
        const { data: topics } = await typed.from("topics").select("id,title,subtest,slug").in("id", ids);
        if (topics) {
          const tm: Record<string, { title: string; subtest: string; slug: string }> = Object.fromEntries(topics.map((t) => [t.id, t]));
          weakTopics = weakTopics.map((ts: WeakTopic) => ({ ...ts, title: tm[ts.topic_id]?.title, subtest: tm[ts.topic_id]?.subtest, slug: tm[ts.topic_id]?.slug }));
        }
      }
      setData({
        displayName: profile?.display_name ?? null,
        email: session.user.email ?? profile?.email ?? "",
        freeDiagnosticUsedAt: profile?.free_diagnostic_used_at ?? null,
        proTier: profile?.pro_tier ?? null,
        proUntil: profile?.pro_until ?? null,
        signupSource: profile?.signup_source ?? null,
        attempts: attemptsRaw ?? [],
        weakTopics,
      });
      setDataLoading(false);
    }
    load();
  }, [session]);

  if (sessionLoading || entitlementLoading || dataLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="text-text-secondary text-sm">Loading…</div></div>;
  }
  if (!session || !data) return null;

  const { isPro } = entitlement;
  const greeting = data.displayName || data.email.split("@")[0];
  const totalQ = data.attempts.reduce((s, a) => s + a.question_count, 0);
  const totalC = data.attempts.reduce((s, a) => s + a.correct_count, 0);
  const accuracy = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : null;
  const bestAfqt = data.attempts.reduce<number | null>((best, a) => (a.afqt_estimate != null ? Math.max(best ?? 0, a.afqt_estimate) : best), null);
  const hasAttempts = data.attempts.length > 0;
  const weakest = data.weakTopics[0] ?? null;
  const attemptsToShow = !isPro && data.attempts.length > 1 ? data.attempts.slice(0, 1) : data.attempts;
  const showHistoryLock = !isPro && data.attempts.length > 1;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-6">
      {entitlement.isTrial && entitlement.trialDaysRemaining != null && (
        <TrialBanner
          daysRemaining={entitlement.trialDaysRemaining}
          hasInProgress={hasInProgress}
          hasAttempts={hasAttempts}
          weakestTopicTitle={weakest?.title ?? null}
          weakestSubtest={weakest?.subtest ?? null}
        />
      )}

      {/* Module 1: Hero */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
        <h1 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">Welcome back, {greeting}</h1>
        {hasAttempts ? (
          <div className="mt-5 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-navy-border bg-navy px-4 py-4 text-center"><div className="font-display text-2xl font-bold text-accent">{totalQ}</div><div className="mt-1 text-xs text-text-tertiary uppercase tracking-wide">Questions</div></div>
            <div className="rounded-xl border border-navy-border bg-navy px-4 py-4 text-center"><div className="font-display text-2xl font-bold text-accent">{accuracy !== null ? `${accuracy}%` : "—"}</div><div className="mt-1 text-xs text-text-tertiary uppercase tracking-wide">Accuracy</div></div>
            <div className="rounded-xl border border-navy-border bg-navy px-4 py-4 text-center"><div className="font-display text-2xl font-bold text-accent">{bestAfqt !== null ? bestAfqt : "—"}</div><div className="mt-1 text-xs text-text-tertiary uppercase tracking-wide">Best AFQT</div></div>
          </div>
        ) : (
          <p className="mt-3 text-text-secondary">Take your first diagnostic to see your stats.</p>
        )}
      </div>

      {/* Module 2: Primary CTA */}
      {hasInProgress ? (
        <div className="rounded-2xl border border-accent/40 bg-accent-dim p-6 flex items-center justify-between gap-4 flex-wrap">
          <div><p className="font-semibold text-text-primary">You have a test in progress</p><p className="text-sm text-text-secondary mt-0.5">Pick up where you left off.</p></div>
          <Link href="/practice-test" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline whitespace-nowrap">Resume test</Link>
        </div>
      ) : weakest && weakest.title ? (
        <div className="rounded-2xl border border-navy-border bg-navy-light p-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-semibold text-text-primary">Your next best move: <span className="text-accent">drill {weakest.title}</span>{!isPro && <LockBadge />}</p>
            <p className="text-sm text-text-secondary mt-0.5">{weakest.subtest ? `${weakest.subtest} subtest` : "Targeted drill"}</p>
          </div>
          {isPro ? (
            <Link href={`/practice-test?variant=subtest_drill&subtest=${weakest.subtest ?? ""}`} className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline whitespace-nowrap">Start {weakest.subtest} drill</Link>
          ) : (
            <Link href="/upgrade" className="rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent-dim no-underline whitespace-nowrap">Upgrade to drill</Link>
          )}
        </div>
      ) : isPro ? (
        <div className="rounded-2xl border border-navy-border bg-navy-light p-6 flex items-center justify-between gap-4 flex-wrap">
          <div><p className="font-semibold text-text-primary">Keep your streak going</p><p className="text-sm text-text-secondary mt-0.5">Take another full diagnostic.</p></div>
          <Link href="/practice-test?variant=diagnostic" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline whitespace-nowrap">Take a diagnostic</Link>
        </div>
      ) : hasAttempts ? (
        <div className="rounded-2xl border border-navy-border bg-navy-light p-6 flex items-center justify-between gap-4 flex-wrap">
          <div><p className="font-semibold text-text-primary">Ready to keep practicing?</p><p className="text-sm text-text-secondary mt-0.5">Upgrade for unlimited tests and score tracking.</p></div>
          <Link href="/upgrade" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline whitespace-nowrap">Upgrade to Pro</Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-accent/40 bg-accent-dim p-6 flex items-center justify-between gap-4 flex-wrap">
          <div><p className="font-semibold text-text-primary">Your free diagnostic is waiting</p><p className="text-sm text-text-secondary mt-0.5">30 questions across all 9 subtests. Get your estimated AFQT.</p></div>
          <Link href="/practice-test" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline whitespace-nowrap">Take free diagnostic</Link>
        </div>
      )}

      {/* Module 3: Recent attempts */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-4">Recent Attempts</h2>
        {data.attempts.length === 0 ? (
          <p className="text-sm text-text-secondary">No attempts yet. Take a practice test to get started.</p>
        ) : (
          <div className="space-y-2">
            {attemptsToShow.map((attempt) => (
              <div key={attempt.id} className="flex items-center justify-between rounded-xl border border-navy-border bg-navy px-4 py-3 gap-3 flex-wrap">
                <div>
                  <span className="text-sm font-medium text-text-primary">{humanizeVariant(attempt.variant_code, attempt.subtest)}</span>
                  <span className="ml-3 text-xs text-text-tertiary">{fmtDate(attempt.completed_at)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <span>{attempt.correct_count}/{attempt.question_count}<span className="ml-1 text-xs text-text-tertiary">({Math.round((attempt.correct_count / attempt.question_count) * 100)}%)</span></span>
                  {attempt.afqt_estimate != null && <span className="rounded-full bg-accent-dim px-2.5 py-0.5 text-xs font-semibold text-accent">AFQT {attempt.afqt_estimate}</span>}
                </div>
              </div>
            ))}
            {showHistoryLock && (
              <div className="flex items-center justify-between rounded-xl border border-navy-border bg-navy px-4 py-3 gap-3">
                <div className="flex items-center gap-2 text-sm text-text-tertiary">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="7" width="10" height="7" rx="1.5" /><path strokeLinecap="round" d="M5.5 7V5a2.5 2.5 0 015 0v2" /></svg>
                  Full history is part of Pro
                </div>
                <Link href="/upgrade" className="text-xs font-semibold text-accent hover:text-accent-hover no-underline">Upgrade</Link>
              </div>
            )}
            {isPro && data.attempts.length === 5 && (
              <div className="text-right pt-1"><Link href="/account/history" className="text-xs font-medium text-accent hover:text-accent-hover no-underline">View all history</Link></div>
            )}
          </div>
        )}
      </div>

      {/* Module 4: Weak topics */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-4">Weak Topics</h2>
        {data.weakTopics.length === 0 ? (
          <p className="text-sm text-text-secondary">Take a diagnostic to find your weak spots.</p>
        ) : (
          <div className="space-y-3">
            {data.weakTopics.map((topic) => {
              const acc = topic.seen > 0 ? Math.round((topic.correct / topic.seen) * 100) : 0;
              return (
                <div key={topic.topic_id} className="rounded-xl border border-navy-border bg-navy px-4 py-4">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <span className="font-medium text-text-primary">{topic.title ?? topic.topic_id}</span>
                    <span className="text-sm text-text-tertiary">{acc}% accuracy</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {topic.slug && topic.subtest && (
                      <Link href={`/study/${topic.subtest.toLowerCase()}/${topic.slug}`} className="rounded-lg border border-navy-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary no-underline">Study guide</Link>
                    )}
                    {isPro ? (
                      <Link href={`/practice-test?variant=subtest_drill&subtest=${topic.subtest ?? ""}`} className="rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-hover no-underline">Drill this topic</Link>
                    ) : (
                      <Link href="/upgrade" className="rounded-lg border border-accent/40 px-3 py-1.5 text-xs font-medium text-text-tertiary transition-colors hover:text-text-secondary no-underline inline-flex items-center gap-1">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}><rect x="3" y="7" width="10" height="7" rx="1.5" /><path strokeLinecap="round" d="M5.5 7V5a2.5 2.5 0 015 0v2" /></svg>
                        Drill this topic
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Module 5: Pro status */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-4">Plan</h2>
        {isPro ? (
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <span className="rounded-full bg-success-dim px-3 py-0.5 text-xs font-semibold text-success uppercase tracking-wide">Pro {data.proTier ?? ""}</span>
              {data.proUntil && <p className="mt-1.5 text-sm text-text-secondary">Renews {fmtProUntil(data.proUntil)}</p>}
            </div>
            <Link href="/account/billing" className="rounded-lg border border-navy-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary no-underline">Manage subscription</Link>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <span className="rounded-full bg-navy px-3 py-0.5 text-xs font-medium text-text-tertiary border border-navy-border uppercase tracking-wide">Free plan</span>
              <p className="mt-1.5 text-sm text-text-secondary">{data.freeDiagnosticUsedAt ? "You've used your free diagnostic." : "1 free diagnostic available."}</p>
            </div>
            <Link href="/upgrade" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover no-underline">Upgrade to Pro</Link>
          </div>
        )}
      </div>

      {/* Module 6: Flashcards coming soon */}
      <div className="rounded-2xl border border-navy-border bg-navy-light p-6 sm:p-8 opacity-70">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="font-display text-lg font-semibold text-text-primary">Flashcards</h2>
            <p className="mt-1 text-sm text-text-secondary">Included with Pro when released. Coming soon.</p>
          </div>
          <span className="rounded-full border border-navy-border px-3 py-1 text-xs text-text-tertiary">Coming soon</span>
        </div>
      </div>

      {/* Module 7: Quick links */}
      <div className="flex flex-wrap items-center gap-4 px-1 pb-4">
        <Link href="/account/settings" className="text-sm text-text-secondary hover:text-text-primary no-underline transition-colors">Settings</Link>
        <span className="text-navy-border">·</span>
        <Link href="/account/billing" className="text-sm text-text-secondary hover:text-text-primary no-underline transition-colors">Billing</Link>
        <span className="text-navy-border">·</span>
        <SignOutButton />
      </div>
    </div>
  );
}
