-- 0044_test_date_emails.sql
-- Dedup ledger for the test-date email sequence (T-30/-14/-7/-1, T+1, T+7).
--
-- Unlike mistake-reminders (one send/day → a single date column on profiles),
-- this sequence has multiple distinct sends, so dedup is per (user, key, date).
-- test_date is part of the key so rescheduling a test re-arms the sequence.
--
-- The scheduled edge function `test-date-emails` writes here with the service
-- role. Activation cron (pg_cron + pg_net) is applied separately at go-live,
-- mirroring 0019_mistake_reminder_tracking.sql.

begin;

create table if not exists test_date_emails_sent (
  user_id    uuid not null references profiles(user_id) on delete cascade,
  email_key  text not null,
  test_date  date not null,
  sent_at    timestamptz not null default now(),
  primary key (user_id, email_key, test_date)
);

create index if not exists test_date_emails_sent_user_idx
  on test_date_emails_sent (user_id);

-- Writes are service-role only (the edge function); no client access needed.
alter table test_date_emails_sent enable row level security;

commit;
