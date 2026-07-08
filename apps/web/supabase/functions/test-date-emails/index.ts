// Test-date email sequence — lifecycle nudges keyed off profiles.target_test_date.
//
// Runs daily (pg_cron via pg_net). For each opted-in user whose exact test date
// lands on a sequence offset, sends that offset's email once. Dedup is per
// (user, key, test_date) in test_date_emails_sent (migration 0044).
//
// Offsets (days until test): -30/-14/-7/-1 before, +1 day after ("log your
// scores"), and +7 only if no official AFQT is logged yet. Protected by a
// shared secret header. Activation cron is applied at go-live.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
  Deno.env.get("SUPABASE_URL") ?? Deno.env.get("ASVABHERO_SUPABASE_URL")!;
const SERVICE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
  Deno.env.get("ASVABHERO_SUPABASE_SECRET_KEY")!;
const RESEND_KEY = Deno.env.get("ASVAB_RESEND_API_KEY");
const CRON_SECRET = Deno.env.get("TEST_DATE_EMAILS_SECRET");
const SITE_URL = "https://asvabhero.com";
const FROM = "Trish at ASVAB Hero <info@asvabhero.com>";

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// days = days until the test (negative = after the test).
const OFFSETS: { key: string; days: number }[] = [
  { key: "t_minus_30", days: 30 },
  { key: "t_minus_14", days: 14 },
  { key: "t_minus_7", days: 7 },
  { key: "t_minus_1", days: 1 },
  { key: "t_plus_1", days: -1 },
  { key: "t_plus_7", days: -7 },
];

function addDays(base: Date, days: number): string {
  const d = new Date(base);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function wrap(inner: string): string {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;color:#0a1628">${inner}
    <p style="color:#64748b;font-size:12px">You're getting this because you set an ASVAB test date in ASVAB Hero. Manage email preferences in your <a href="${SITE_URL}/account/settings" style="color:#64748b">account settings</a>.</p>
  </div>`;
}

function cta(href: string, label: string): string {
  return `<p style="text-align:center;margin:28px 0"><a href="${SITE_URL}${href}" style="background:#f97316;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;display:inline-block">${label}</a></p>`;
}

function emailFor(
  key: string,
  name: string | null,
): { subject: string; html: string } {
  const hi = name ? `Hi ${name},` : "Hi,";
  switch (key) {
    case "t_minus_30":
      return {
        subject: "30 days to your ASVAB: here's the plan",
        html: wrap(
          `<p>${hi}</p><p><strong>Your ASVAB is about a month out.</strong> The highest-leverage month is steady reps on your weakest subtests, not cramming everything.</p><p>Your plan already sequences what to do each day. Five focused sessions a week from here moves the needle the most.</p>${cta("/app/plan", "Open your plan")}`,
        ),
      };
    case "t_minus_14":
      return {
        subject: "2 weeks out: tighten your score",
        html: wrap(
          `<p>${hi}</p><p><strong>Two weeks to go.</strong> Take a fresh diagnostic. It updates your AFQT band and shows whether your weak areas are actually moving.</p><p>Then spend your reps where the gap to your goal is biggest.</p>${cta("/app/practice", "Take a diagnostic")}`,
        ),
      };
    case "t_minus_7":
      return {
        subject: "1 week to test day: the final stretch",
        html: wrap(
          `<p>${hi}</p><p><strong>One week out.</strong> This is review week, not new-material week: clear your mistake bank, do light daily reps, and protect your sleep.</p><p>Retrieving missed questions one more time is what makes them stick on test day.</p>${cta("/app/mistakes", "Review your mistakes")}`,
        ),
      };
    case "t_minus_1":
      return {
        subject: "Tomorrow's the day",
        html: wrap(
          `<p>${hi}</p><p><strong>Your ASVAB is tomorrow.</strong> Bring a valid photo ID, arrive early, and eat something real beforehand.</p><p>No heavy studying tonight. A clear, rested head scores better than a tired, crammed one. You've put in the work.</p>${cta("/app/plan", "Last-night checklist")}`,
        ),
      };
    case "t_plus_1":
      return {
        subject: "How'd the ASVAB go? Log your scores",
        html: wrap(
          `<p>${hi}</p><p><strong>If you tested, log your official scores.</strong> It anchors your progress to a real result, and if you're planning a retake, we'll time it and target the subtests that move your line scores most.</p>${cta("/app/home", "Log your scores")}`,
        ),
      };
    case "t_plus_7":
      return {
        subject: "Don't lose your ASVAB results",
        html: wrap(
          `<p>${hi}</p><p><strong>Got your official ASVAB scores yet?</strong> Log them so your dashboard reflects where you actually stand. Short of the score you need? We'll build a focused retake plan.</p>${cta("/app/home", "Log your scores")}`,
        ),
      };
    default:
      return { subject: "ASVAB Hero", html: wrap(`<p>${hi}</p>`) };
  }
}

async function send(email: string, subject: string, html: string): Promise<boolean> {
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_KEY}`,
      },
      body: JSON.stringify({ from: FROM, to: email, subject, html }),
    });
    return resp.ok;
  } catch (_e) {
    return false;
  }
}

Deno.serve(async (req) => {
  if (CRON_SECRET && req.headers.get("x-cron-secret") !== CRON_SECRET) {
    return json({ error: "forbidden" }, 403);
  }
  if (!RESEND_KEY) return json({ error: "ASVAB_RESEND_API_KEY not set" }, 500);

  const today = new Date();
  // date string -> offset key (each offset maps to exactly one target date).
  const dateToKey = new Map<string, string>();
  for (const o of OFFSETS) dateToKey.set(addDays(today, o.days), o.key);
  const dates = [...dateToKey.keys()];

  const { data: profiles, error } = await admin
    .from("profiles")
    .select("user_id,email,display_name,target_test_date,daily_email_opt_in,official_test_status")
    .in("target_test_date", dates);
  if (error) return json({ error: error.message }, 500);
  if (!profiles || profiles.length === 0) return json({ sent: 0, reason: "no matches" });

  // Pre-fetch dedup rows for these users to avoid N round-trips.
  const userIds = profiles.map((p) => p.user_id);
  const { data: sentRows } = await admin
    .from("test_date_emails_sent")
    .select("user_id,email_key,test_date")
    .in("user_id", userIds);
  const already = new Set(
    (sentRows ?? []).map((r) => `${r.user_id}|${r.email_key}|${r.test_date}`),
  );

  let sent = 0;
  let skipped = 0;
  let failed = 0;
  for (const p of profiles) {
    const key = dateToKey.get(p.target_test_date as string);
    if (!key || !p.email) {
      skipped++;
      continue;
    }
    // CAN-SPAM: honor opt-out (null/true => opted in; false => skip).
    if (p.daily_email_opt_in === false) {
      skipped++;
      continue;
    }
    // T+7 is only a safety net for users who never logged a real result.
    if (key === "t_plus_7" && p.official_test_status === "taken_logged") {
      skipped++;
      continue;
    }
    if (already.has(`${p.user_id}|${key}|${p.target_test_date}`)) {
      skipped++;
      continue;
    }
    const { subject, html } = emailFor(key, p.display_name);
    const ok = await send(p.email, subject, html);
    if (ok) {
      sent++;
      const todayStr = new Date().toISOString().slice(0, 10);
      await admin.from("test_date_emails_sent").insert({
        user_id: p.user_id,
        email_key: key,
        test_date: p.target_test_date,
      });
      // Stamp the shared engagement cap so same-day nudges (mistake-reminders)
      // yield. Test-date emails are sparse milestones, so they always send.
      await admin
        .from("profiles")
        .update({ last_engagement_email_on: todayStr })
        .eq("user_id", p.user_id);
    } else {
      failed++;
    }
  }

  return json({ sent, skipped, failed, candidates: profiles.length });
});
