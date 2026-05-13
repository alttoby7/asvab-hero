-- =============================================================
-- ASVAB Hero — Re-apply handle_new_user with signup_source read
-- Migration: 0012_handle_new_user_signup_source.sql
--
-- Migration 0007 added the signup_source column AND replaced the
-- handle_new_user() trigger function. The column landed but the
-- function replacement did NOT take effect in production — verified
-- 2026-05-13 by reading pg_proc.prosrc, which still contained the
-- 0001 body (insert without signup_source). Result: every signup
-- since 2026-05-08 (when the client started passing signup_source
-- via auth.signUp options.data) has had raw_user_meta_data populated
-- correctly but profiles.signup_source written as NULL.
--
-- This migration re-applies the function body verbatim, with an
-- explicit search_path pin to avoid definer search_path footguns.
-- The trigger binding is already correct (pg_trigger.tgenabled='O',
-- target = public.handle_new_user) so no trigger DDL needed.
-- =============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.profiles (user_id, email, signup_source)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data->>'signup_source', '')
  );
  return new;
end;
$$;
