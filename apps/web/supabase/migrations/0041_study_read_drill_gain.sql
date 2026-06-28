-- 0041_study_read_drill_gain.sql
-- Efficacy proof for the in-app Study pillar: does reading a topic's guide
-- actually raise the user's accuracy on that topic?
--
-- Signal: study_guide_progress.first_viewed_at marks when a user opened a topic
-- guide. item_exposures logs every answered question (topic_id, is_correct,
-- exposed_at). For each (user, topic) the user studied, we compare per-topic
-- accuracy BEFORE first_viewed_at vs AFTER — a within-user, within-topic
-- before/after that controls for individual ability and topic difficulty.
-- Aggregates only; per-pair requires >= min_items in each window; n<5 cohorts
-- suppressed. Returns a per-subtest breakdown plus an 'ALL' row. Honest framing:
-- correlational (studying isn't randomly assigned), not a causal claim.

create or replace function public.get_study_read_drill_gain(min_items int default 3)
returns table (
  subtest         text,
  n_topic_users   bigint,   -- (user, topic) pairs with enough pre & post items
  mean_pre_pct    numeric,
  mean_post_pct   numeric,
  mean_gain_pp    numeric,   -- post - pre, in percentage points
  pct_improved    numeric    -- share of pairs where post > pre
)
language sql
security definer
set search_path = public
stable
as $$
  with studied as (
    select sgp.user_id, sgp.topic_id, t.subtest, sgp.first_viewed_at
    from study_guide_progress sgp
    join topics t on t.id = sgp.topic_id
    where sgp.first_viewed_at is not null
  ),
  windows as (
    select
      s.subtest,
      count(*) filter (where ie.exposed_at <  s.first_viewed_at) as pre_n,
      count(*) filter (where ie.exposed_at <  s.first_viewed_at and ie.is_correct) as pre_c,
      count(*) filter (where ie.exposed_at >= s.first_viewed_at) as post_n,
      count(*) filter (where ie.exposed_at >= s.first_viewed_at and ie.is_correct) as post_c
    from studied s
    join item_exposures ie
      on ie.user_id = s.user_id
     and ie.topic_id = s.topic_id
    group by s.user_id, s.topic_id, s.subtest
  ),
  paired as (
    select
      subtest,
      pre_c::numeric  / pre_n  as pre_pct,
      post_c::numeric / post_n as post_pct,
      (post_c::numeric / post_n) - (pre_c::numeric / pre_n) as gain
    from windows
    where pre_n >= min_items and post_n >= min_items
  ),
  agg as (
    select
      subtest,
      (subtest is null) as is_all,
      count(*) as n,
      avg(pre_pct)  as pre,
      avg(post_pct) as post,
      avg(gain)     as gain,
      avg(case when gain > 0 then 1.0 else 0.0 end) as improved
    from paired
    group by grouping sets ((subtest), ())
  )
  select
    coalesce(subtest, 'ALL') as subtest,
    n::bigint as n_topic_users,
    round(100 * pre, 1)  as mean_pre_pct,
    round(100 * post, 1) as mean_post_pct,
    round(100 * gain, 1) as mean_gain_pp,
    round(100 * improved, 1) as pct_improved
  from agg
  where n >= 5
  order by is_all desc, subtest;
$$;

comment on function public.get_study_read_drill_gain(int) is
  'Study-pillar efficacy: within-user/within-topic accuracy before vs after '
  'opening a topic guide (study_guide_progress.first_viewed_at), from '
  'item_exposures. Aggregates only; n<5 suppressed; correlational, not causal. '
  'Powers a /the-science Study panel once the sample is defensible.';

do $$
begin
  execute 'revoke all on function public.get_study_read_drill_gain(int) from public';
  execute 'grant execute on function public.get_study_read_drill_gain(int) to service_role';
  if exists (select 1 from pg_roles where rolname = 'dashboard_export') then
    execute 'grant execute on function public.get_study_read_drill_gain(int) to dashboard_export';
  end if;
end$$;
