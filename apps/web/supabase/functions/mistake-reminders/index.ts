// Spaced Mistake Bank — daily due-review reminders.
//
// Spacing-aware adherence: emails users who have unresolved question_reviews
// that are due now, at most once per day. Invoked by pg_cron via pg_net (see
// supabase/migrations/0019_mistake_reminder_tracking.sql for the activation
// SQL). Protected by a shared secret header.
//
// DO NOT schedule this until the closed-loop UI flag is live — otherwise users
// get emailed to review mistakes on a page that redirects home.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
  Deno.env.get("SUPABASE_URL") ?? Deno.env.get("ASVABHERO_SUPABASE_URL")!;
const SERVICE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
  Deno.env.get("ASVABHERO_SUPABASE_SECRET_KEY")!;
const RESEND_KEY = Deno.env.get("ASVAB_RESEND_API_KEY");
const CRON_SECRET = Deno.env.get("MISTAKE_REMINDERS_SECRET");
const SITE_URL = "https://asvabhero.com";
const FROM = "Trish at ASVAB Hero <info@asvabhero.com>";

// Spaced + forgiving: at most one review nudge every few days, and never on a
// day the user already got an engagement email from us. Daily nagging erodes
// adherence (and the static "N due" count read as guilt, not help).
const MIN_GAP_DAYS = 3;

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/** Whole days between two YYYY-MM-DD date strings (a - b). */
function daysBetween(a: string, b: string): number {
  return Math.round(
    (Date.parse(a + "T00:00:00Z") - Date.parse(b + "T00:00:00Z")) / 86400000,
  );
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function reminderHtml(name: string | null): string {
  const hi = name ? `Hi ${name},` : "Hi,";
  // Forgiving + if-then (implementation intention), framed as one short rep —
  // no scary static "N due" count. The mechanism is retrieval, not guilt.
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;color:#0a1628">
    <p>${hi}</p>
    <p><strong>A quick review is ready when you are.</strong></p>
    <p>A few of the questions you've missed are due to come back, and re-answering
    them from memory is the single highest-evidence thing you can do for test day.
    This is a 10-minute rep, not a backlog to clear.</p>
    <p><strong>Try this:</strong> right after you sit down tonight, do one short review block. That's it.</p>
    <p style="text-align:center;margin:28px 0">
      <a href="${SITE_URL}/app/mistakes"
         style="background:#f97316;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;display:inline-block">
        Start a 10-minute review
      </a>
    </p>
    <p style="color:#64748b;font-size:12px">
      You're getting this because you have reviews due in your ASVAB Hero Mistake Bank.
      We keep these spaced out. Manage email preferences in your <a href="${SITE_URL}/account/settings" style="color:#64748b">account settings</a>.
    </p>
  </div>`;
}

async function sendReminder(email: string, name: string | null): Promise<boolean> {
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: email,
        subject: "Your next ASVAB review is ready",
        html: reminderHtml(name),
      }),
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

  const today = new Date().toISOString().slice(0, 10);
  const nowIso = new Date().toISOString();

  // Users with due, unresolved reviews.
  const { data: dueRows, error } = await admin
    .from("question_reviews")
    .select("user_id")
    .eq("resolved", false)
    .lte("due_at", nowIso);
  if (error) return json({ error: error.message }, 500);

  const counts = new Map<string, number>();
  for (const r of dueRows ?? []) {
    counts.set(r.user_id, (counts.get(r.user_id) ?? 0) + 1);
  }
  const userIds = [...counts.keys()];
  if (userIds.length === 0) return json({ sent: 0, reason: "no due reviews" });

  const { data: profiles, error: pErr } = await admin
    .from("profiles")
    .select(
      "user_id,email,display_name,daily_email_opt_in,last_engagement_email_on",
    )
    .in("user_id", userIds);
  if (pErr) return json({ error: pErr.message }, 500);

  let sent = 0;
  let skipped = 0;
  let failed = 0;
  for (const p of profiles ?? []) {
    const count = counts.get(p.user_id) ?? 0;
    // CAN-SPAM: honor email opt-out. null/true => opted in; false => skip.
    if (p.daily_email_opt_in === false) {
      skipped++;
      continue;
    }
    if (!p.email || count === 0) {
      skipped++;
      continue;
    }
    // Spaced + cross-sender cap: skip if ANY engagement email went out within
    // MIN_GAP_DAYS (this is a low-priority nudge — it yields to everything).
    if (
      p.last_engagement_email_on &&
      daysBetween(today, p.last_engagement_email_on) < MIN_GAP_DAYS
    ) {
      skipped++;
      continue;
    }
    const ok = await sendReminder(p.email, p.display_name);
    if (ok) {
      sent++;
      await admin
        .from("profiles")
        .update({
          last_mistake_reminder_on: today,
          last_engagement_email_on: today,
        })
        .eq("user_id", p.user_id);
    } else {
      failed++;
    }
  }

  return json({ sent, skipped, failed, due_users: userIds.length });
});
