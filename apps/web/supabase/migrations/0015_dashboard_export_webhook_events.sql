-- =============================================================
-- Grant dashboard_export role read-only access to stripe_webhook_events
-- so the personal-dashboard can render the webhook health widget without
-- needing service-role credentials.
--
-- The dashboard_export role already exists (it reads profiles + attempts
-- for the trial cohort and customer snapshots). This adds the third table
-- to its read surface.
--
-- NOTE: restored to local from the remote migration history (was applied
-- directly to remote in a personal-dashboard session and never committed
-- here). Content matches supabase_migrations.schema_migrations version 0015.
-- =============================================================

grant usage on schema public to dashboard_export;

grant select on public.stripe_webhook_events to dashboard_export;

-- RLS policy: dashboard_export sees everything (it's a read-only role
-- isolated to the dashboard, not exposed to the public PostgREST API).
create policy "dashboard_export reads stripe_webhook_events"
  on public.stripe_webhook_events
  for select
  to dashboard_export
  using (true);
