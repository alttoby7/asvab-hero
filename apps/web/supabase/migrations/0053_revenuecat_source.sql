-- =============================================================
-- ASVAB Hero — RevenueCat (mobile IAP) entitlement source columns
-- Migration: 0053_revenuecat_source.sql
-- =============================================================
-- The Android app grants Pro via Google Play Billing, brokered by RevenueCat.
-- The revenuecat-webhook edge function writes the SAME entitlement columns the
-- Stripe path uses (billing_status / pro_tier / pro_until / pro_updated_at), so
-- has_active_pro() (0002_billing.sql) already sees app purchases with no change
-- — that's what makes Pro cross-platform.
--
-- These two additive columns only record PROVENANCE (which store/broker granted
-- the current entitlement and the exact RC product), for the customer dashboard
-- and support. They are nullable and never read by has_active_pro, so this
-- migration is backward-compatible and safe to apply ahead of the app launch.

alter table profiles
  add column if not exists pro_source text
    check (pro_source is null or pro_source in ('stripe','revenuecat')),
  add column if not exists rc_product_id text;

comment on column profiles.pro_source is
  'Which system last set the Pro entitlement: stripe (web) or revenuecat (app IAP). Informational only.';
comment on column profiles.rc_product_id is
  'RevenueCat/Play product identifier of the current app purchase, when pro_source = revenuecat.';
