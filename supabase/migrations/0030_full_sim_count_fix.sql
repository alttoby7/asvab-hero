-- 0030_full_sim_count_fix.sql
-- Fix: full_sim displayed "144 questions" (rules.length) but the explicit mix
-- sums to 134 (7×16 + 2×11), and the object-mix sampler serves the mix count,
-- not rules.length. Align length to the actual served count (134 ≈ the real
-- CAT-ASVAB scored-question total). Display-only field; no behavior change.
update test_variants
set rules = jsonb_set(rules, '{length}', '134'::jsonb)
where code = 'full_sim';
