-- 0038_topic_study_progress.sql
-- Durable "I studied this topic guide" marker for the in-app Study pillar
-- (/app/study). Reading the concept is distinct from drilling it (topic_stats),
-- so we track it separately — one row per user per topic_id (= topics.id =
-- "subtest.slug", e.g. "ar.rate-distance-time"). Durable + cross-device (the
-- old checklist was localStorage only) and a substrate for "concepts covered"
-- completion + later efficacy measurement (read→drill→gain).

create table if not exists topic_study_progress (
  user_id    uuid not null references profiles(user_id) on delete cascade,
  topic_id   text not null,
  studied_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

create index if not exists topic_study_progress_user_idx
  on topic_study_progress (user_id, studied_at desc);

alter table topic_study_progress enable row level security;

drop policy if exists "topic_study_progress_select_own" on topic_study_progress;
create policy "topic_study_progress_select_own" on topic_study_progress
  for select using (auth.uid() = user_id);

drop policy if exists "topic_study_progress_insert_own" on topic_study_progress;
create policy "topic_study_progress_insert_own" on topic_study_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "topic_study_progress_delete_own" on topic_study_progress;
create policy "topic_study_progress_delete_own" on topic_study_progress
  for delete using (auth.uid() = user_id);
