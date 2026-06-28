# ASVAB Hero — Study Plan Drip Sequence

5 emails over 14 days, triggered on subscriber signup. Single opt-in. Sent from `ASVAB Hero <info@asvabhero.com>`. Reply-to same.

**Voice rules:**
- Direct, second person. 17-21 yr old or parent on the other end.
- No em dashes. No "journey" language. No "unlock your potential."
- Each email has ONE ask. CTA button + one text link max.
- Open with the answer, not the setup.
- 150-300 words unless content demands more.

**Merge tags** (Listmonk): `{{ .Subscriber.FirstName }}`, `{{ UnsubscribeURL }}`, `{{ .Subscriber.Attribs.afqt }}`, `{{ .Subscriber.Attribs.branch }}`.

---

## Email 1 — Day 0 (immediate on signup)

**Subject:** Your 30-day ASVAB study plan is inside
**Pre-header:** Plus the one shortcut high scorers use in week 1

```
Hey {{ .Subscriber.FirstName | default "there" }},

Your personalized 30-day study plan is attached as a PDF.

Before you open it, here's the one thing that matters most in the first week:
spend 80% of your time on Word Knowledge, Paragraph Comprehension, and
Arithmetic Reasoning. That's it. Those three subtests make up your AFQT
score, and your AFQT is what decides whether you qualify at all.

Everything else, General Science, Electronics, Auto & Shop, only matters
for specific jobs after you're in.

Your plan breaks down:
  • Which subtests to drill first (based on your target job)
  • A 30-minute daily schedule you can actually keep
  • Free practice test links (skip the $40 courses for now)
  • The exact score bumps you need to qualify

[Open your study plan →]
https://asvabhero.com/calculator

Over the next 2 weeks I'll send you 4 more emails with the specific drills
that work. No fluff.

Talk soon,
ASVAB Hero

P.S. Run your scores again any time. New job caught your eye? The
calculator will tell you exactly how many points you're short.

--
Unsubscribe: {{ UnsubscribeURL }}
```

---

## Email 2 — Day 2

**Subject:** The 3 Word Knowledge mistakes that tank your AFQT
**Pre-header:** All 3 are easy fixes once you see them

```
{{ .Subscriber.FirstName | default "Hey" }},

Word Knowledge is the fastest subtest to improve. It's also where most
test-takers leave points on the table.

Three mistakes that cost the average recruit 5-8 points:

1. They guess from the first answer that "sounds close."
   Fix: read all 4 options. WK always has one distractor that sounds
   right but means something different.

2. They skip prefix/suffix work and go straight to flashcards.
   Fix: learn 20 prefixes (mono-, sub-, re-, anti-, etc.) and 15
   root words. This unlocks hundreds of words without memorizing each one.

3. They don't practice under a timer.
   Fix: WK gives you 11 seconds per question. If you can't answer in 11
   seconds on paper, you won't on test day.

The fastest drill that actually works:
Quizlet's official ASVAB word list + a 10-minute timer, 3x a week. Free.

[Run the drill →]
https://asvabhero.com/asvab-word-knowledge-practice

Tomorrow's not the day to grind. Tomorrow is rest.

— ASVAB Hero

--
Unsubscribe: {{ UnsubscribeURL }}
```

---

## Email 3 — Day 5

**Subject:** Add 10 points to your GT in 2 weeks (here's the math)
**Pre-header:** Which subtests to raise and in what order

```
If you want a better Army MOS, your GT score is the gate.

GT = Arithmetic Reasoning + Word Knowledge + Paragraph Comprehension.

That means every +1 on AR, WK, or PC adds to GT directly. No scaling
tricks, no weighted average. Straight addition.

Here's what that looks like in practice:

Current GT: 95. Dream job: 35M Human Intelligence Collector (GT 101).
You're 6 points short.

Fastest path:
  • +3 on WK (easiest to raise, most vocabulary-driven)
  • +3 on AR (focus on word problems, not pure calculation)

Two weeks. 30 min a day. GT goes from 95 to 101. You qualify.

This works for every Army MOS. And most Air Force AFSCs. Find your
dream job's minimum and work backward.

[Open your job gap analysis →]
https://asvabhero.com/calculator

If you're Navy, Marines, or Coast Guard, the line scores are different
but the math is the same. Reply with your target rating and I'll send
you the formula.

— ASVAB Hero

--
Unsubscribe: {{ UnsubscribeURL }}
```

---

## Email 4 — Day 10

**Subject:** Jobs your recruiter isn't telling you about
**Pre-header:** Bonus pay, clearance, and civilian transfer value

```
Recruiters have MOS quotas. The Army is short on cooks and truck drivers
this month, so that's what they pitch first.

But your ASVAB score opens doors they don't mention unless you ask.

Four jobs most recruits never hear about:

1. 17C Cyber Operations Specialist (Army, GT 110+)
   Top-secret clearance. $40k enlistment bonus active right now. Pure
   civilian transfer to any cybersecurity firm at $90k+.

2. 1N0X1 Operations Intelligence (Air Force, G 64+)
   Intel analyst. Same clearance. Closest civilian equivalent: FBI,
   CIA, DIA, contractors. Starts around $85k post-service.

3. CTR Cryptologic Technician Collection (Navy, VE+AR 109+)
   SIGINT. TS/SCI. 6-year commitment but the reenlistment bonus caps
   over $100k in some specialties.

4. 0241 Intelligence Specialist (Marines, GT 100+)
   Hardest branch, but the smallest intel community means fast
   promotion and direct access to high-visibility missions.

The common thread: clearance. If you leave the military with an active
TS/SCI, your first civilian offer is usually 2-3x what you made in.

Your current scores already qualify you for some of these. Run the
calculator and see.

[See all jobs you qualify for →]
https://asvabhero.com/calculator

— ASVAB Hero

--
Unsubscribe: {{ UnsubscribeURL }}
```

---

## Email 5 — Day 14

**Subject:** Ready for your retake? Quick 90-second check
**Pre-header:** The 1/1/6 rule, plus the C-Test warning

```
{{ .Subscriber.FirstName | default "Hey" }},

Two weeks in. If you've been drilling, you're probably ready to retake.

The rules (every branch):

Retake 1: 1 month after first test
Retake 2: 1 month after retake 1
Retake 3 and beyond: 6 months

One warning: if your score jumps 20+ points in 6 months, DoD makes you
take a Confirmation Test (C-Test). Two outcomes:

  • You match or beat your new score: it stands.
  • You score lower: they roll back to the lower one.

This is the trap. Some test-takers cram, retake, score 30 points higher,
then can't replicate it on the C-Test. They lose both scores.

The fix: aim for a gain you can actually hold. +10 to +15 points is
safer than chasing +25.

Run the retake calculator to see your earliest eligible date, plus
whether a C-Test will trigger:

[Check your retake date →]
https://asvabhero.com/asvab-retake-calculator

If you're ready, schedule with your recruiter this week. The slot
availability gets worse every month closer to summer.

Good luck out there.

— ASVAB Hero

--
This is the last email in this sequence. You'll stay on the list for
occasional updates when policies change. Unsubscribe any time:
{{ UnsubscribeURL }}
```

---

## Scheduling notes

Listmonk doesn't have native "X days after signup" automation in the OSS build. Two options:

**Option A (simplest):** Cron on the droplet runs a script nightly that:
1. Queries Listmonk API for subscribers where `subscribed_at` falls in the target window (e.g., 2 days ago for email 2).
2. Creates a one-off campaign to those subscribers with the template for that day.
3. Marks them with a tag like `sent_day2` to prevent re-sends.

**Option B (cleanest):** Use the CF Worker (the one we're building anyway) to fire immediate welcomes via `/api/tx`, then a separate Worker cron trigger handles days 2/5/10/14.

Option B is what we should ship. Design in the CF Worker docs.
