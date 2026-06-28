-- Self-reported attribution: "How did you hear about us?"
--
-- WHY: localStorage first-touch (migration 0051) can't see referrer-less AI
-- traffic (ChatGPT app / copied links strip the referrer → bucketed "direct"),
-- can't span devices, and only covers signups after 2026-06-17. A one-tap
-- self-report at signup is the only thing that captures word-of-mouth / podcast
-- / "ChatGPT told me about you" and disambiguates the inflated "direct" bucket.
--
-- Same flow as first-touch: signUp metadata → auth.users.raw_user_meta_data →
-- handle_new_user() → profiles column. Forward-only; existing rows stay NULL.

alter table public.profiles
  add column if not exists attribution_self_reported text;

-- Redefine handle_new_user to also persist attribution_self_reported.
-- IMPORTANT: keep ALL columns from migration 0051 — this is a full replacement.
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
    first_referrer_class, first_landing_path,
    attribution_self_reported
  )
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data->>'signup_source', ''),
    nullif(new.raw_user_meta_data->>'first_utm_source', ''),
    nullif(new.raw_user_meta_data->>'first_utm_medium', ''),
    nullif(new.raw_user_meta_data->>'first_utm_campaign', ''),
    nullif(new.raw_user_meta_data->>'first_referrer_class', ''),
    nullif(new.raw_user_meta_data->>'first_landing_path', ''),
    nullif(new.raw_user_meta_data->>'attribution_self_reported', '')
  );
  return new;
end;
$$;
