-- =============================================================
-- ASVAB Hero — Allow one-time "pass" tiers on profiles.pro_tier
-- Migration: 0050_pass_tiers.sql
-- =============================================================
-- Pricing moved to a pass-led model (2026-06): a one-time 90-Day Test Pass
-- ($69) and a Retaker Pass ($119, 120 days). Both grant time-boxed Pro via the
-- existing billing_status='active' + pro_until columns (no new entitlement
-- machinery needed). The only schema change is widening the pro_tier CHECK to
-- record which pass a buyer holds, for analytics + the customer dashboard.
--
-- The original constraint was created inline in 0002_billing.sql, so Postgres
-- named it profiles_pro_tier_check. Drop-if-exists then re-add the widened set.

alter table profiles drop constraint if exists profiles_pro_tier_check;

alter table profiles
  add constraint profiles_pro_tier_check
  check (pro_tier in ('monthly','annual','lifetime','pass90','retaker'));
