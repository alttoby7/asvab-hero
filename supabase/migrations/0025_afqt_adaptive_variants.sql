-- =============================================================
-- 0025_afqt_adaptive_variants.sql  (WS6)
-- AFQT adaptive next-item selector — substrate for the engine, SHIPPED INACTIVE.
--
-- This migration does two small, reversible things:
--
--   1. Adds a SELECT policy on question_calibrations to role `authenticated`.
--      WS1 (0020) left this table RLS-on with NO public policies (service-role
--      reads only). The adaptive selector runs CLIENT-SIDE and must read
--      per-item difficulty (shrunk_difficulty) to band-target items near the
--      user's ability. Item difficulty is non-PII reference data derived from
--      aggregate first-seen exposures — it exposes nothing about any individual
--      user — so a blanket `using (true)` SELECT for authenticated users is the
--      correct, minimal grant. (No insert/update/delete: the table stays
--      writable only by the SECURITY DEFINER recompute fn.)
--
--   2. Inserts the `afqt_adaptive` test variant with active=false. The engine,
--      the gate, the sampler wiring, and the UI are all built but inert: nothing
--      routes to the adaptive path until BOTH (a) NEXT_PUBLIC_ADAPTIVE_ENABLED
--      is "true" at build time AND (b) this row is flipped active=true. The
--      content-depth gate (>=900 audited AFQT items; today ~822 active) is not
--      yet met, so this row stays inactive on purpose.
--
-- Idempotent: safe to re-run. Apply AFTER 0020 (question_calibrations) and
-- 0024 (item_family_id). No dependency on either is created at DDL time beyond
-- question_calibrations existing.
-- =============================================================

begin;

-- -------------------------------------------------------------
-- (1) Authenticated read access to question_calibrations.
-- Drop-then-create so re-runs don't error on the existing policy.
-- -------------------------------------------------------------
drop policy if exists "question_calibrations_select_authenticated" on question_calibrations;
create policy "question_calibrations_select_authenticated" on question_calibrations
  for select
  to authenticated
  using (true);

-- -------------------------------------------------------------
-- (2) The afqt_adaptive variant row — INACTIVE.
--
-- rules.mix is the AFQT-subtest blueprint the macro layer must satisfy. It uses
-- the same fixed-mix shape the sampler already understands (Partial<subtest,n>),
-- so even if something mis-routes here while the flag is off, sampleForVariant()
-- would still produce a sane AFQT-only test rather than crashing. The adaptive
-- selector reads the SAME mix as its blueprint quota.
--
-- Length 36 (16 AR + 9 PC ... summing the mix) and a 39-minute clock match the
-- AFQT section weighting (AR/MK heavier than WK/PC). afqt_eligible=true marks it
-- as a scoreable AFQT test; subtest_locked=null (it spans all four AFQT subtests).
--
-- Upsert keyed on the PK (code) so re-running this migration refreshes the rules
-- but NEVER flips active on its own — active is pinned false on conflict too.
-- -------------------------------------------------------------
insert into test_variants (code, name, rules, active) values
  (
    'afqt_adaptive',
    'Adaptive AFQT Practice',
    '{
      "length": 36,
      "time_seconds": 2340,
      "mix": {"AR": 11, "MK": 11, "WK": 8, "PC": 6},
      "afqt_eligible": true,
      "subtest_locked": null,
      "adaptive": true,
      "anchor_per_subtest": 1,
      "exploration_fraction": 0.12,
      "note": "Adaptive AFQT selector (WS6). Macro blueprint = this mix; item-level selection band-targets ~70-80% predicted success near user ability. INACTIVE until >=900 audited AFQT items AND NEXT_PUBLIC_ADAPTIVE_ENABLED."
    }'::jsonb,
    false
  )
on conflict (code) do update set
  name   = excluded.name,
  rules  = excluded.rules,
  active = false;   -- never auto-activate; flip manually when content gate is met

commit;
