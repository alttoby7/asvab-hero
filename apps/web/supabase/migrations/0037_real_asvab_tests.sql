-- 0037_real_asvab_tests.sql
-- User-logged REAL ASVAB results (not practice). Lets a user record what they
-- actually scored on each official test date so the app can:
--   (1) keep a real score history (AFQT + subtest standard scores), and
--   (2) compute when they're next eligible to retest (DoD 1-1-6 rule), which
--       depends on how many official tests they've taken + the latest date.
-- Free feature (core, not Pro) — retake timing is score-moving guidance.

create table if not exists real_asvab_tests (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references profiles(user_id) on delete cascade,
  test_date       date not null,
  -- how it was administered (affects nothing in the 1-1-6 math; recorded for the
  -- user's log + future PiCAT-specific nuances).
  test_format     text check (test_format in ('cat','papt','picat','unknown')) default 'unknown',
  afqt            int  check (afqt is null or (afqt between 1 and 99)),
  -- standard scores per subtest, e.g. {"AR":55,"WK":52,...}; flexible so we
  -- don't add a column per subtest. Values are ASVAB standard scores (~20-80).
  standard_scores jsonb,
  note            text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists real_asvab_tests_user_idx
  on real_asvab_tests (user_id, test_date desc);

alter table real_asvab_tests enable row level security;

-- Full CRUD, user-gated (the user owns + manages their own records).
drop policy if exists "real_asvab_tests_select_own" on real_asvab_tests;
create policy "real_asvab_tests_select_own" on real_asvab_tests
  for select using (auth.uid() = user_id);

drop policy if exists "real_asvab_tests_insert_own" on real_asvab_tests;
create policy "real_asvab_tests_insert_own" on real_asvab_tests
  for insert with check (auth.uid() = user_id);

drop policy if exists "real_asvab_tests_update_own" on real_asvab_tests;
create policy "real_asvab_tests_update_own" on real_asvab_tests
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "real_asvab_tests_delete_own" on real_asvab_tests;
create policy "real_asvab_tests_delete_own" on real_asvab_tests
  for delete using (auth.uid() = user_id);
