-- =============================================================
-- ASVAB Hero — Durable first-touch attribution on profiles
-- Migration: 0051_first_touch_attribution.sql
--
-- Today first-touch (utm / referrer class / landing path) lives only in
-- localStorage + GA4 event params, so it is not durable per-user and cannot be
-- joined to conversions for source-quality analysis. This adds nullable
-- columns to profiles and extends handle_new_user() to persist them atomically
-- at signup — exactly mirroring the existing signup_source pattern (0012).
--
-- Forward-only: existing rows stay NULL; new signups populate going forward.
-- Purely additive; changes no existing behavior. The dashboard's source-quality
-- views (P1) consume these.
-- =============================================================

alter table public.profiles
  add column if not exists first_utm_source     text,
  add column if not exists first_utm_medium     text,
  add column if not exists first_utm_campaign   text,
  add column if not exists first_referrer_class text,
  add column if not exists first_landing_path   text;

-- Re-apply the trigger to also persist first-touch from raw_user_meta_data.
-- nullif('') guards against empty-string metadata. search_path pinned per 0012.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (
    user_id, email, signup_source,
    first_utm_source, first_utm_medium, first_utm_campaign,
    first_referrer_class, first_landing_path
  )
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data->>'signup_source', ''),
    nullif(new.raw_user_meta_data->>'first_utm_source', ''),
    nullif(new.raw_user_meta_data->>'first_utm_medium', ''),
    nullif(new.raw_user_meta_data->>'first_utm_campaign', ''),
    nullif(new.raw_user_meta_data->>'first_referrer_class', ''),
    nullif(new.raw_user_meta_data->>'first_landing_path', '')
  );
  return new;
end;
$$;
