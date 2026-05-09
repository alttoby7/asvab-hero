-- =============================================================
-- ASVAB Hero — Durable signup attribution
-- Migration: 0007_signup_source.sql
--
-- Persists the resolved capture source (e.g. calculator-result,
-- subtest-page, signup_page) on the profile so attribution survives
-- localStorage clears, ITP, private mode, and long lag between free
-- signup and Pro conversion.
--
-- Sourced atomically from auth.users.raw_user_meta_data->>'signup_source'
-- inside the existing on_auth_user_created trigger. This avoids the RLS
-- problem of writing from the client right after signUp() — with email
-- confirmation enabled, auth.uid() is null at that moment so a client
-- UPDATE would be rejected by the profiles_update policy.
-- =============================================================

alter table profiles add column signup_source text;

create index profiles_signup_source_idx
  on profiles(signup_source)
  where signup_source is not null;

-- Extend the trigger to copy signup_source from raw_user_meta_data.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
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
