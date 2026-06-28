-- 0031_testimonials.sql
-- The testimonial-collection machine. After a genuine in-app win (streak, a
-- 2nd-diagnostic improvement, a target-job qualify) we ask the user to share
-- what's working — WITH explicit publish consent. Rows land 'pending'; we curate
-- approved + consented quotes by hand into src/data/testimonials.ts. We never
-- publish without consent and never fabricate. RLS: a user only ever touches
-- their own row; nothing is publicly readable (curation is manual + off-DB).

create table if not exists testimonials (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(user_id) on delete cascade,
  quote         text not null,
  rating        smallint check (rating between 1 and 5),
  display_name  text,                                  -- what they want shown (optional)
  allow_publish boolean not null default false,        -- explicit consent to publish
  context       text,                                  -- trigger context, e.g. 'streak_7'
  status        text not null default 'pending',       -- pending | approved | rejected
  created_at    timestamptz not null default now()
);

create index if not exists testimonials_status_idx on testimonials(status, created_at desc);

alter table testimonials enable row level security;

drop policy if exists "testimonials_insert_own" on testimonials;
create policy "testimonials_insert_own" on testimonials
  for insert with check (auth.uid() = user_id);

drop policy if exists "testimonials_select_own" on testimonials;
create policy "testimonials_select_own" on testimonials
  for select using (auth.uid() = user_id);
