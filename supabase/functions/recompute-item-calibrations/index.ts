// Item-calibration nightly recompute (WS1 substrate).
//
// Aggregates the item_exposures first-seen fact table into per-item difficulty
// (question_calibrations) by calling the DB function recompute_item_calibrations().
// Calibration math lives entirely in PL/pgSQL (single source of truth); this
// function is just the scheduled trigger + service-role caller. Invoked by
// pg_cron via pg_net (see supabase/migrations/0019 for the analogous activation
// SQL pattern). Protected by a shared secret header.
//
// At current prod volume (~25 attempts) almost every row will return the author
// difficulty prior — that is correct/expected; item-level signal only earns
// trust at n_firstseen >= 60 (or a narrow CI).
//
// DO NOT deploy from a subagent. Deploy + schedule is an integrator step.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
  Deno.env.get("SUPABASE_URL") ?? Deno.env.get("ASVABHERO_SUPABASE_URL")!;
const SERVICE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
  Deno.env.get("ASVABHERO_SUPABASE_SECRET_KEY")!;
const CRON_SECRET = Deno.env.get("ITEM_CALIBRATIONS_SECRET");

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (CRON_SECRET && req.headers.get("x-cron-secret") !== CRON_SECRET) {
    return json({ error: "forbidden" }, 403);
  }

  const startedAt = new Date().toISOString();

  // recompute_item_calibrations() upserts question_calibrations and returns the
  // number of (question_id, content_version) rows it (re)calibrated.
  const { data, error } = await admin.rpc("recompute_item_calibrations");
  if (error) return json({ error: error.message, started_at: startedAt }, 500);

  const calibrated = typeof data === "number" ? data : 0;
  return json({ calibrated, started_at: startedAt, finished_at: new Date().toISOString() });
});
