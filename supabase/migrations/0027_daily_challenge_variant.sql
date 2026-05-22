-- 0027_daily_challenge_variant.sql
-- Fix: Daily Challenge misses never reached the Mistake Bank / calibration.
--
-- DailyChallengeEngine inserts into `attempts` with variant_code='daily_challenge'
-- (so the ingest_attempt_mistakes trigger banks misses + exposures), but
-- `attempts.variant_code` is a NOT NULL FK to test_variants(code) and there was
-- no 'daily_challenge' row. Every daily attempt insert was FK-rejected and the
-- client swallowed the error, so the trigger never fired.
--
-- Idempotent: safe to re-run.
insert into test_variants (code, name, rules, active)
values (
  'daily_challenge',
  'Daily Challenge',
  '{
    "length": 10,
    "time_seconds": 720,
    "mix": "interleaved",
    "afqt_eligible": false,
    "subtest_locked": null,
    "note": "10 interleaved questions; banks misses via ingest_attempt_mistakes"
  }'::jsonb,
  true
)
on conflict (code) do nothing;
