-- 0033_gt_adaptive_variant.sql
-- AFCT adaptive blueprint for the four VE+AR branches (Army/Marines GT, AF/SF
-- General). Blueprint = AR/WK/PC (NO MK) — GT/General are AR+WK+PC, so dropping
-- MK focuses the reps. Cohorts (GT vs General) are distinguished by
-- attempts.primary_metric_code, not a 2nd variant. The existing adaptive
-- selector serves per-blueprint (mix), so 0 MK quota = no MK — no engine change
-- needed (GT/G are an AFQT subset). Free, like afqt_adaptive (gate handles cap).
insert into test_variants (code, name, rules, active)
values (
  'gt_adaptive',
  'Adaptive GT / General',
  '{
    "length": 36,
    "time_seconds": 2340,
    "mix": {"AR":12,"WK":12,"PC":12},
    "afqt_eligible": false,
    "subtest_locked": null,
    "note": "AFCT VE+AR-branch blueprint: AR+WK+PC (drop MK). Serves Army/Marines GT + AF/SF General."
  }'::jsonb,
  true
)
on conflict (code) do nothing;
