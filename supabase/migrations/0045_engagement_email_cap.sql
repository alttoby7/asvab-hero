-- 0045_engagement_email_cap.sql
-- Cross-sender frequency cap for engagement/nudge emails.
--
-- Problem: mistake-reminders fired DAILY (same "N questions ready to review"
-- nag), and nothing coordinated across senders, so a user could get two emails
-- in one day. The evidence (test-prep research) favors spaced, forgiving
-- nudges over daily guilt — daily nagging erodes adherence.
--
-- This column is the shared signal: any engagement email (mistake-reminders,
-- test-date sequence) stamps it; low-priority nudges check it and yield. It is
-- NOT set by transactional mail (Stripe), which must always send.

begin;

alter table profiles
  add column if not exists last_engagement_email_on date;

commit;
