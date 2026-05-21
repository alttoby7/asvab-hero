-- Question-bank quality pass (WS5): adds item_family_id for sibling-aware sampling.
--
-- An item_family_id groups near-sibling questions that share a template or skill
-- (e.g. all "markup-then-discount %" arithmetic items, all gear-ratio items, or all
-- questions testing the same WK head-word in different formats). WS6's sampler uses
-- this to enforce a sibling cooldown so a single drill never serves two items from
-- the same family back-to-back.
--
-- Family ids are authored/derived in scripts/build-questions-seed.mjs and emitted
-- into the seed INSERT. Items without an explicit family fall back to a unique
-- per-item id (topic_id::external_key), so the column is always populated for
-- seeded rows. Nullable here for forward-compat with any rows inserted by other paths.

alter table practice_questions
  add column if not exists item_family_id text;

-- Lookup path: "given this subtest, what families are in play / on cooldown?"
create index if not exists practice_questions_family_idx
  on practice_questions(subtest, item_family_id);
