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

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function reminderHtml(name: string | null, count: number): string {
  const hi = name ? `Hi ${name},` : "Hi,";
  const noun = count === 1 ? "question you missed is" : "questions you missed are";
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;color:#0a1628">
    <p>${hi}</p>
    <p><strong>${count} ${noun} ready to review.</strong></p>
    <p>We bring missed questions back right before you'd forget them — retrieving an
    answer from memory (and getting corrected when you slip) is the highest-evidence
    way to make it stick for test day. A few minutes now pays off on the real ASVAB.</p>
    <p style="text-align:center;margin:28px 0">
      <a href="${SITE_URL}/app/mistakes"
         style="background:#f97316;color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;display:inline-block">
        Review ${count} ${count === 1 ? "mistake" : "mistakes"}
      </a>
    </p>
    <p style="color:#64748b;font-size:12px">
      You're getting this because you have due reviews in your ASVAB Hero Mistake Bank.
      Manage email preferences in your <a href="${SITE_URL}/account/settings" style="color:#64748b">account settings</a>.
    </p>
  </div>`;
}

async function sendReminder(
  email: string,
  name: string | null,
  count: number,
): Promise<boolean> {
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
        subject: `${count} ASVAB ${count === 1 ? "question" : "questions"} ready to review`,
        html: reminderHtml(name, count),
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
    .select("user_id,email,display_name,last_mistake_reminder_on")
    .in("user_id", userIds);
  if (pErr) return json({ error: pErr.message }, 500);

  let sent = 0;
  let skipped = 0;
  let failed = 0;
  for (const p of profiles ?? []) {
    const count = counts.get(p.user_id) ?? 0;
    // Idempotent: one reminder per user per day.
    if (!p.email || count === 0 || p.last_mistake_reminder_on === today) {
      skipped++;
      continue;
    }
    const ok = await sendReminder(p.email, p.display_name, count);
    if (ok) {
      sent++;
      await admin
        .from("profiles")
        .update({ last_mistake_reminder_on: today })
        .eq("user_id", p.user_id);
    } else {
      failed++;
    }
  }

  return json({ sent, skipped, failed, due_users: userIds.length });
});
