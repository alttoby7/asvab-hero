-- Raw Stripe subscription status, for trial/lifecycle SEGMENTATION only.
--
-- WHY: billing_status deliberately maps Stripe's `trialing` -> 'active' (see
-- stripe-webhook/index.ts updateProfileFromSubscription, and has_active_pro() in
-- 0002_billing.sql) so Pro access is granted during the 7-day trial. That means
-- billing_status is NEVER 'trialing' — so any audience/exclusion query keyed on
-- billing_status='trialing' matches zero rows (a silent segmentation trap that
-- hid all active trials from analytics).
--
-- FIX: store Stripe's verbatim sub.status here (active | trialing | past_due |
-- canceled | unpaid | incomplete | incomplete_expired | paused). Segment trials
-- on `stripe_sub_status='trialing'` OR `trial_ends_at > now()`. Do NOT gate Pro
-- access on this column — gating stays on billing_status. Forward-only; existing
-- rows stay NULL until their next customer.subscription.* / invoice.* event.

alter table public.profiles
  add column if not exists stripe_sub_status text;

comment on column public.profiles.stripe_sub_status is
  'Verbatim Stripe subscription.status for segmentation only. Pro gating uses billing_status (which maps trialing->active). Never gate on this column.';
