# ASVAB Hero — Learning-Science Strategy & Build Plan

> Status: strategy + build specs. Authored 2026-05-21.
> Companion to [`scoring-model.md`](./scoring-model.md) and [`project-history.md`](./project-history.md).
>
> **Thesis:** The point of ASVAB Hero is not to sell a subscription — it is to *raise the
> user's score*. The cognitive-science literature is unusually clear about which study
> techniques actually move scores, and most of them are software-implementable. Our job
> is to make every interaction in the product use a high-utility technique, and to drive
> enough *adherence* that users accumulate the dose those techniques require.

---

## TL;DR

1. The highest-evidence techniques are **retrieval practice**, **adaptive/mastery
   sequencing**, **interleaving**, **spacing**, and **feedback**. We already do some of
   these (SM-2 flashcards, instant feedback, an interleaved daily challenge, a Bayesian
   topic-mastery model) but they are not yet wired into the *core* practice loop.
2. Real-world test-coaching effects are **small** (SAT coaching ≈ 20–40 points) even
   though the lab effects are large. The gap is **adherence and dosage** — people don't
   do enough spaced, retrieval-based practice. Closing that gap is the product moat.
3. Three bets, in priority order:
   - **Bet 1 — Spaced Mistake Bank.** Every wrong answer becomes a retrieval item
     resurfaced on a spacing schedule. Reuses the existing SM-2 scheduler. Highest ROI.
   - **Bet 2 — Adaptive Mastery Engine.** Promote `topic_stats` from "picks the daily
     10" to a real next-item selector (weakness + spacing + difficulty targeting +
     interleaving). Biggest score mover; gated on growing the question bank.
   - **Bet 3 — Trajectory & test-day layer.** Predicted-AFQT-with-confidence path to the
     target date, full-length timed sims, and a pre-test anxiety intervention.

---

## 1. What the research says moves the needle

Effect sizes below are Cohen's *d* / Hedges' *g* unless noted (0.2 = small, 0.5 = medium,
0.8 = large; one academic year ≈ 0.40).

| Technique | Evidence | What it is | In our product? |
|---|---|---|---|
| **Retrieval practice** (testing effect) | g ≈ 0.50 meta-analytic (Rowland 2014); single studies to d ≈ 1.5; "test once > study 4×" (Roediger & Karpicke 2006) | Being *quizzed* on material, not re-reading it | Partial — quizzes exist but wrong answers are not re-surfaced |
| **Adaptive / mastery sequencing** | d ≈ 0.76 for intelligent tutoring systems (VanLehn; Kulik & Fletcher 2016) — ~1 sigma, near 1-on-1 tutoring | Pick the next item by the learner's current mastery; gate progression on mastery | No — mastery model exists but only feeds daily-challenge selection |
| **Interleaving** | d ≈ 1.21, ~doubled 1-day retention in math (Taylor & Rohrer 2010; Rohrer et al. 2015) | Mix problem types instead of blocking one type | Partial — daily challenge is interleaved; subtest drills are blocked |
| **Distributed practice** (spacing) | Large & robust across 317 experiments (Cepeda et al. 2006); optimal gap scales with retention interval | Spread the same study over time vs. cramming | Partial — flashcards (SM-2); practice questions are not spaced |
| **Feedback** | d ≈ 0.48 meta-analytic (Wisniewski et al. 2019); up to ~1.0+ in Hattie syntheses; best within 24–48h | Tell the learner what was right/wrong and why | Yes — per-question explanations on reveal |
| **Pretesting / errorful generation** | Reliable boost vs. errorless study (Richland, Kornell & Kao 2009) | Guessing *before* learning — even wrongly — strengthens later memory | No |
| **Test-anxiety intervention** (expressive writing) | ~recovers lost points for anxious testers (Ramirez & Beilock 2011, *Science*) | 10 min writing out worries before a high-stakes test | No |
| **Implementation intentions / habits** | Higher engagement, persistence, adherence; reminders amplify (Gollwitzer; JMIR 2017) | "I'll study at 7am after coffee" + reminders | Partial — streaks only |

**Low-utility techniques** to *not* lean on (Dunlosky et al. 2013): highlighting,
re-reading, and summarization all rated low. A product that is mostly "read this study
guide" is using the weakest tools in the box.

## 2. The lab-to-field gap (the real opportunity)

Independent research on commercial coaching finds **small** real-world gains: the rigorous
Powers & Rock (1999) SAT study found ~20–30 combined points; Briggs' review and others land
in a similar 10–40 point range — far below vendor claims.

Why are field effects small when lab effects are huge? **Dosage and adherence.** The big
effects above assume the learner actually does many spaced retrieval sessions. In the wild,
people study a little, cram at the end, re-read instead of self-test, and quit early.

That is the strategic insight: **the winning ASVAB SaaS is not the one with the most
flashcards — it is the one that (a) makes every interaction a high-utility technique and
(b) maximizes adherence so users hit the dose.** Content is a commodity; the adaptive
engine + the closed retrieval loop + adherence design is the defensible product.

## 3. Current-state audit (what we have, mapped to the science)

What's already evidence-aligned and live:
- **SM-2 spaced-repetition flashcards** — `src/lib/flashcards/scheduler.ts`,
  `flashcard_reviews` table. Real spacing + retrieval.
- **Instant per-question feedback w/ explanations** — practice & daily engines.
- **Interleaved daily challenge** — subtest-balanced 10-question mix that targets the top-3
  weak topics (`DailyChallengeEngine.tsx`).
- **Bayesian per-topic mastery model** — `topic_stats` (Laplace-smoothed `posterior`,
  `confidence`, `priority`, `status`), canonical writer `recompute_topic_stats()` in
  `0001_init.sql`. This is a genuinely good signal and is under-used.
- **Streaks** — `profiles.streak_count`.

The gaps that matter:
1. **Wrong answers vanish.** `attempts.question_results` records every miss but nothing
   resurfaces them. The single strongest learning signal is discarded. (`/app/mistakes`
   is deferred.)
2. **Practice questions are random + fixed-difficulty** (`sampler.ts`) — no spacing, no
   difficulty targeting, no adaptivity. The ~1-sigma lever sits idle.
3. **No score trajectory / calibration** — we show a current AFQT estimate but no
   predicted path to the user's target date.
4. **Nothing for test day** — no full-length timed sim, no anxiety intervention.
5. **Bank depth** — ~769 items ÷ 39 topics ≈ 20/topic is thin for true adaptivity (the
   reason the adaptive variants are gated at ≥1000 items).

## 4. Prioritized roadmap

| Bet | Techniques stacked | Effort | Dependency | Why this order |
|---|---|---|---|---|
| **1. Spaced Mistake Bank** | retrieval + spacing + feedback + error correction | Low–Med | none (reuses SM-2) | Most parts already exist; closes the loop |
| **2. Adaptive Mastery Engine** | adaptive sequencing + difficulty targeting + interleaving | Med–High | bank growth to ≥~1500 | Biggest score mover; needs item depth |
| **3. Trajectory & test-day** | calibration + simulation + anxiety intervention + adherence | Med | Bet 1/2 data | Motivation + last-mile points |

---

## 5. Build spec — Bet 1: Spaced Mistake Bank

**Goal:** every question a user gets wrong is automatically re-surfaced on an SM-2 schedule
until it is mastered, turning the strongest learning signal we have into spaced retrieval
practice with corrective feedback.

### Data model

New table mirroring `flashcard_reviews`. Key on `external_key` (stable across re-seed — note
`practice_questions.id` is a UUID regenerated on re-seed, while `external_key` is stable and
is already what `sampler.ts` returns as the question `id`).

```sql
create table question_reviews (
  user_id        uuid not null references profiles(user_id) on delete cascade,
  question_id    text not null,            -- external_key, stable across re-seed
  subtest        text not null,
  topic_id       text references topics(id),
  ease_factor    numeric(4,2) not null default 2.50,
  interval_days  int  not null default 0,
  repetitions    int  not null default 0,
  due_at         timestamptz not null default now(),
  last_reviewed_at timestamptz,
  last_quality   smallint check (last_quality between 0 and 5),
  lapses         int  not null default 0,  -- times missed after first add
  resolved       boolean not null default false,  -- graduated out of the bank
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  primary key (user_id, question_id)
);
create index question_reviews_due_idx
  on question_reviews(user_id, resolved, due_at);
-- RLS: same 4 user_id-gated policies as flashcard_reviews.
```

### Ingestion

Run in the **client attempt-completion path** — the same place that already calls
`recompute_topic_stats` after an attempt. Reuse `scheduleReview()` from
`src/lib/flashcards/scheduler.ts` as the single SM-2 source of truth (it operates on a
generic `ReviewState`; it is not flashcard-specific).

For each entry in `attempts.question_results` (`[{question_id, selected, correct, topic_id}]`):
- **Incorrect** → upsert a `question_reviews` row, grade as *again* (`quality = 1`). New
  rows start from `defaultReviewState()`; existing rows increment `lapses`.
- **Correct on a question already in the bank** → grade *good* (`quality = 4`), advancing
  its interval toward graduation.
- **Correct on a question not in the bank** → skip (we only bank misses).

> Architecture note: client-side ingestion matches the current pattern (the client already
> writes `attempts` and triggers `recompute_topic_stats`). The trade-off is it relies on the
> client to write; if we later want it bulletproof across all sources, port the SM-2 math to a
> `ingest_attempt_mistakes(p_attempt_id)` PL/pgSQL function and call it like
> `recompute_topic_stats`. Do **not** maintain two copies of the SM-2 math — pick one home.

### Review surface (`/app/mistakes`)

- Load due rows: `where resolved = false and due_at <= now() order by due_at`.
- Join to `practice_questions` by `external_key` to get the *current* stem/choices/explanation.
- Serve as a normal multiple-choice retrieval session with immediate feedback (same engine
  shape as the daily challenge).
- Grade: correct → `quality = 4`; incorrect → `quality = 1`. Reschedule via `scheduleReview`.
- **Graduation:** set `resolved = true` when `repetitions >= 3` and the latest answer was
  correct (or `interval_days >= 21`). Graduated items stop appearing.
- Surface the due count in `QuickActions` (it already shows a mistake count) and as a
  MissionCard CTA when the bank has due items.

### Why this is bet #1

It stacks three of the top techniques (retrieval + spacing + corrective feedback) on the
data we already collect, reuses the scheduler we already shipped, and fills a route that is
already stubbed. Lowest effort, highest certainty of moving real scores.

---

## 6. Build spec — Bet 2: Adaptive Mastery Engine

**Goal:** replace random sampling with a next-item selector that targets the right topic,
at the right difficulty, at the right time — the ~1-sigma lever from intelligent-tutoring
research.

### Selection model

A scoring function over the candidate pool (active `practice_questions`, excluding items
seen within a cooldown window). For each candidate, score = weighted sum of:

1. **Weakness** — favor topics with high `topic_stats.priority`; reserve a slice for
   `unmeasured` topics to gather signal (exploration vs. exploitation).
2. **Spaced review** — if the question is in `question_reviews` and `due_at <= now()`,
   boost it. This *merges the Mistake Bank into the main loop* so reviews happen inline.
3. **Difficulty targeting (desirable difficulty)** — pick difficulty `d*` where predicted
   P(correct) lands in ~0.70–0.85: hard enough to require real retrieval, easy enough to
   avoid demoralization. Map the topic `posterior` → a target difficulty band over the
   authored 1–5 scale; penalize `|difficulty − d*|`.
4. **Interleaving** — penalize repeating the previous 1–2 subtests; cap same-subtest run
   length. Preserves the interleaving benefit instead of accidental blocking.
5. **Novelty/cooldown** — prefer unseen items; penalize recently-served ones to protect
   recall (vs. recognition) and spacing.

### Mastery gating & session shape

- A topic is **mastered** at `status = 'strong'` (existing thresholds: `posterior > 0.75`,
  `seen >= 5`).
- **Difficulty unlock:** start a topic's ceiling low (≈ difficulty 2) and raise it as
  `posterior` climbs, so users earn harder items rather than being thrown into the deep end.
- **Suggested mix per adaptive session:** ~60% weak/developing topics, ~20% due spaced
  reviews, ~20% unmeasured/novel for signal — tunable.

### Implementation

- Add a `test_variants` row `code = 'adaptive'` so it slots into the existing
  `PracticeTestEngine` flow.
- Implement the selector in `src/lib/practice/adaptive.ts`, consuming the loaded pool +
  `topic_stats` + `question_reviews`. Client-side keeps consistency with `sampler.ts`'s
  current architecture; if we want the logic server-authoritative later, expose it as an
  RPC `next_adaptive_batch(p_user_id, p_length, p_exclude text[])`.
- **Item difficulty is currently authored (1–5), not calibrated.** That's a fine proxy to
  start. A cheap v2 upgrade: Elo-style online calibration — nudge each item's difficulty
  from its aggregate correct-rate so difficulty targeting self-corrects. True per-item IRT
  is a later step.

### Hard dependency: bank depth

At ~769 items (~4 per topic×difficulty) the engine will repeat items before their spacing
interval elapses, which converts recall into recognition and **undermines** the very effect
we're chasing. Target **≥ ~1500 items** (≈ 8–10 per topic×difficulty) before this ships to
users. Ship behind a flag and dogfood in the meantime. This is the same constraint that
already gates AFQT Sprint / Weakness Loop / Full Sim / Retake Readiness in `test_variants`.

---

## 7. Bet 3 — Trajectory & test-day layer (lighter)

- **Score trajectory + calibration.** Show predicted AFQT with a confidence band and a
  path to the user's `target_test_date` (already captured in `profiles`). Testers are badly
  calibrated about their readiness; correcting that is both motivating and pedagogically
  real. Builds on existing `afqt_estimate` history.
- **Full-length timed simulation.** A variant mirroring real ASVAB structure/timing builds
  stamina and reduces test-day novelty. Gated on bank depth (see Bet 2).
- **Pre-test expressive-writing prompt.** Offer a 10-minute "write out your worries"
  exercise before full sims and before the real test date (Ramirez & Beilock 2011).
  Near-zero engineering, real points back for anxious testers.
- **Adherence design.** Add implementation-intention capture in onboarding ("I'll study at
  ___"), and spacing-aware reminders via the existing Listmonk pipeline (due reviews,
  streak-at-risk). This is what converts the small *field* effect into a large one.

## 8. Open questions / decisions to make

- **Monetization split:** which of these are Pro-gated? (Mistake Bank and the adaptive
  engine are strong upgrade hooks.)
- **Ingestion home:** client-side (matches today) vs. PL/pgSQL trigger (bulletproof). Pick
  one home for the SM-2 math.
- **Bank-growth plan:** concrete milestone + authoring/QA pipeline to reach ≥1500 items so
  Bet 2 can ship.
- **Adaptive logic home:** client-side `adaptive.ts` vs. server RPC.

---

## Sources

- Dunlosky, Rawson, Marsh, Nathan & Willingham (2013). *Improving Students' Learning With
  Effective Learning Techniques.* — [Psychological Science in the Public Interest](https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html) ·
  [AFT summary](https://www.aft.org/ae/fall2013/dunlosky)
- Roediger & Karpicke (2006) and retrieval-practice meta-analyses (Rowland 2014, g ≈ 0.50) —
  [Retrieval-Based Learning: A Decade of Progress (ERIC)](https://files.eric.ed.gov/fulltext/ED599273.pdf)
- Cepeda, Pashler, Vul, Wixted & Rohrer (2006). *Distributed Practice in Verbal Recall Tasks.* —
  [PDF](https://augmentingcognition.com/assets/Cepeda2006.pdf) ·
  [Optimizing Distributed Practice (Cepeda et al. 2009)](https://home.cs.colorado.edu/~mozer/Research/Selected%20Publications/reprints/Cepedaetal2009.pdf)
- Taylor & Rohrer (2010) and Rohrer, Dedrick & Stershic (2015). *Interleaved practice in
  mathematics* (d ≈ 1.21) — [Rohrer et al. 2015 (PDF)](http://uweb.cas.usf.edu/~drohrer/pdfs/Rohrer_et_al_2015JEdPsych.pdf)
- Powers & Rock (1999), *Effects of Coaching on SAT I* — [ERIC PDF](https://files.eric.ed.gov/fulltext/ED562638.pdf) ·
  Briggs, *The Effect of Admissions Test Preparation* — [NEPC PDF](https://nepc.colorado.edu/sites/default/files/Briggs_Theeffectofadmissionstestpreparation.pdf)
- Wisniewski, Zierer & Hattie (2019). *The Power of Feedback Revisited* (d ≈ 0.48) —
  [Frontiers in Psychology](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.03087/full)
- Ramirez & Beilock (2011). *Writing About Testing Worries Boosts Exam Performance.* —
  [Science](https://www.science.org/doi/abs/10.1126/science.1199427)
- Richland, Kornell & Kao (2009). *The Pretesting Effect.* —
  [PDF](https://learninglab.uchicago.edu/Pre-Testing_files/RichlandKornellKao.pdf)
- Kulik & Fletcher (2016). *Effectiveness of Intelligent Tutoring Systems: A Meta-Analytic
  Review* (d ≈ 0.76) — [Review of Educational Research](https://journals.sagepub.com/doi/abs/10.3102/0034654315581420) ·
  [Nintil systematic review of Bloom's 2-sigma](https://nintil.com/bloom-sigma/)
- Implementation intentions & reminders for behavior change —
  [JMIR (2017)](https://www.jmir.org/2017/11/e397/)
