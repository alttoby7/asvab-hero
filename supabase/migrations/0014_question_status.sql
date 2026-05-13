-- Trust-tier model for practice_questions.
-- - draft:    newly-authored, not yet quality-verified
-- - verified: passed adversarial review + codex audit + initial telemetry
-- - trusted:  battle-tested through real usage (e.g. the 762 existing items)
--
-- The `active` column is retained as the read-path filter (existing sampler.ts uses it).
-- The seed script derives active from status: draft → active=false; verified|trusted → active=true.

alter table practice_questions
  add column if not exists status text not null default 'draft'
  check (status in ('draft', 'verified', 'trusted'));

-- Backfill: existing active rows are trusted (battle-tested); inactive rows stay draft.
update practice_questions set status = 'trusted' where active = true;
update practice_questions set status = 'draft'   where active = false;

create index if not exists practice_questions_status_idx on practice_questions(status);
