-- =============================================================
-- ASVAB Hero — Billing / Pro entitlement columns
-- Migration: 0002_billing.sql
-- =============================================================

alter table profiles
  add column billing_status text not null default 'free'
    check (billing_status in ('free','active','past_due','canceled','lifetime')),
  add column pro_tier text
    check (pro_tier in ('monthly','annual','lifetime')),
  add column pro_until timestamptz,
  add column free_diagnostic_used_at timestamptz,
  add column stripe_customer_id text unique,
  add column stripe_subscription_id text unique,
  add column stripe_price_id text,
  add column pro_updated_at timestamptz;

create index profiles_billing_status_idx on profiles(billing_status);
create index profiles_pro_until_idx on profiles(pro_until);

-- Pro entitlement check function (callable from RLS or app code)
create or replace function has_active_pro(p_user_id uuid default auth.uid())
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from profiles
    where user_id = p_user_id
      and (
        billing_status = 'lifetime'
        or (
          billing_status = 'active'
          and (pro_until is null or pro_until > now())
        )
      )
  );
$$;
