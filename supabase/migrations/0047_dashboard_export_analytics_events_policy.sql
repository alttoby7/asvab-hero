-- =============================================================
-- RLS policy: let dashboard_export read analytics_events.
--
-- 0016 enabled RLS on public.analytics_events and granted dashboard_export
-- table-level SELECT, but added NO policy ("no policies -> only service role
-- can read"). With RLS on and no permissive policy, the table-level grant is
-- inert: dashboard_export sees ZERO rows. This is why the personal-dashboard
-- Conversion Leaks panel showed paywall->checkout as 0/0 while the data
-- (paywall_viewed, checkout_click, ...) was present all along.
--
-- Mirror 0015's stripe_webhook_events policy: dashboard_export is a read-only
-- role isolated to the dashboard, not exposed to the public PostgREST API,
-- so `using (true)` is the correct, minimal grant. SELECT-only.
-- =============================================================

create policy "dashboard_export reads analytics_events"
  on public.analytics_events
  for select
  to dashboard_export
  using (true);
