-- 0040_drop_topic_study_progress.sql
-- Retire 0039's topic_study_progress: it duplicated the canonical
-- study_guide_progress (0001_init), which already tracks per-topic `completed`,
-- first/last_viewed_at, and mini-drill mastery (and is written by MiniDrill).
-- The in-app Study pillar uses study_guide_progress instead.

drop table if exists topic_study_progress;
