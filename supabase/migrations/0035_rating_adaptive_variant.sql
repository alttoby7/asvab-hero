-- 0035_rating_adaptive_variant.sql
-- Navy / Coast Guard AFCT adaptive blueprint (S7). Unlike afqt_adaptive and
-- gt_adaptive, the real blueprint is a RUNTIME WEIGHTED OVERRIDE built from the
-- user's target rating's composite (e.g. "VE+AR+MK+MC" → weighted AR/WK/PC/MK/MC
-- demand) and passed to sampleAdaptive() as blueprintOverride. The static `mix`
-- below is only a defensive fallback if a user reaches this variant without a
-- resolved target rating — a balanced VE+AR+MK set so the test still renders.
-- Cohorts are distinguished by attempts.primary_metric_code = the composite
-- FORMULA (not "rating_adaptive"), preserving cross-cohort comparability.
-- Free, like the other adaptive cores (gate handles the daily cap).
insert into test_variants (code, name, rules, active)
values (
  'rating_adaptive',
  'Adaptive Rating Line Score',
  '{
    "length": 36,
    "time_seconds": 2700,
    "mix": {"AR":9,"WK":9,"PC":9,"MK":9},
    "afqt_eligible": false,
    "subtest_locked": null,
    "note": "Navy/CG AFCT: runtime weighted blueprint from the target rating composite; static mix is a fallback only."
  }'::jsonb,
  true
)
on conflict (code) do nothing;
