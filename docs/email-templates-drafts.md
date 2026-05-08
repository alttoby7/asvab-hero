# Email Template Drafts (2026-05-08)

Six template bodies for the conversion-boost + automated-welcome ship.

**Voice rules followed:** No em dashes, single CTA per section, mobile-friendly, no logo banner, HTML bodies only. Sign-off `Trish, ASVAB Hero` (short, not a long signature block).

**4 templates → Listmonk** (`list.asvabhero.com` admin, Transactional Templates). Paste each into a new template, save, capture the numeric ID for env vars.

**2 templates → not in Listmonk.** They render inline from `supabase/functions/stripe-webhook/index.ts` via Resend. Drafts here are reference; the webhook code is the source of truth.

---

## Listmonk #1 — `tx-ar-formula-card`

**Name:** `tx-ar-formula-card`
**Subject:** `Your AR formula card is here`

```html
<p>Hi there,</p>

<p>Here is the one-page Arithmetic Reasoning formula card you signed up for. It covers the 5 formulas that show up on every ASVAB and the 4 trap-answer patterns to watch.</p>

<p><a href="https://asvabhero.com/ar-formula-card.pdf" style="background:#f97316;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:600;">Download the AR formula card</a></p>

<p>Save it to your phone, print a copy, run through the worked examples once a day. AR is half of your GT score and a quarter of your AFQT, so the lift here is real.</p>

<p>If you want the full 30-day plan, it is at <a href="https://asvabhero.com/study-plan.pdf">asvabhero.com/study-plan.pdf</a>.</p>

<p>Reply with your branch and target test date. I read every reply.</p>

<p>Trish<br>ASVAB Hero</p>
```

---

## Listmonk #2 — `tx-wk-100-words`

**Name:** `tx-wk-100-words`
**Subject:** `Your WK 100-word list is here`

```html
<p>Hi there,</p>

<p>Here is the 100-word Word Knowledge list you signed up for. These are the high-frequency words ASVAB pulls from, organized into 5 themed clusters so they stick faster than flat memorization.</p>

<p><a href="https://asvabhero.com/wk-100-words.pdf" style="background:#f97316;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:600;">Download the WK 100 words</a></p>

<p>Word Knowledge gets double-counted in your AFQT (it is part of the VE composite, which gets multiplied by 2). One of the highest-leverage subtests on the test.</p>

<p>If you want the full 30-day plan, it is at <a href="https://asvabhero.com/study-plan.pdf">asvabhero.com/study-plan.pdf</a>.</p>

<p>Reply with your branch and target test date. I read every reply.</p>

<p>Trish<br>ASVAB Hero</p>
```

---

## Listmonk #3 — `tx-gt-booster`

**Name:** `tx-gt-booster`
**Subject:** `Your GT score booster guide is here`

```html
<p>Hi there,</p>

<p>Here is the GT booster guide you signed up for. GT = VE + AR, and it is the single most important composite for jobs across every branch. 110+ unlocks special programs (Green to Gold, OCS, 18X, Ranger).</p>

<p><a href="https://asvabhero.com/gt-booster-guide.pdf" style="background:#f97316;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:600;">Download the GT booster guide</a></p>

<p>Inside: the GT formula, the subtest leverage map (which subtests move GT fastest), and a 5-week study plan tuned for GT specifically.</p>

<p>If you want the full 30-day plan, it is at <a href="https://asvabhero.com/study-plan.pdf">asvabhero.com/study-plan.pdf</a>.</p>

<p>Reply with your branch and target GT score. I read every reply.</p>

<p>Trish<br>ASVAB Hero</p>
```

---

## Listmonk #4 — `tx-trial-ending`

**Name:** `tx-trial-ending`
**Subject:** `Your ASVAB Hero Pro trial ends in 3 days`

```html
<p>Hi there,</p>

<p>Quick heads-up: your 7-day ASVAB Hero Pro trial ends in 3 days. After that, your card gets charged $9.99 for the next month.</p>

<p>Things you have unlocked during the trial:</p>
<ul>
  <li>Unlimited adaptive practice across all 9 subtests</li>
  <li>Score history and weak-topic drills</li>
  <li>39 study guides covering every ASVAB topic</li>
</ul>

<p>If Pro is helping, do nothing. Your card runs on day 8 and you keep going.</p>

<p>If it is not the right fit, you can cancel any time at <a href="https://asvabhero.com/account/billing">asvabhero.com/account/billing</a>. No questions, no friction.</p>

<p>Reply if you have questions or hit a snag. I read every reply.</p>

<p>Trish<br>ASVAB Hero</p>
```

---

## Resend (inline, in webhook code) #1 — `welcome-paid`

**Subject:** `Welcome to ASVAB Hero Pro`
**From:** `Trish at ASVAB Hero <info@asvabhero.com>`
**Reply-To:** `trish@dach.family`

```html
<p>Hi {firstName},</p>

<p>You are in. Pro is unlocked on your account, which means:</p>
<ul>
  <li>Unlimited adaptive practice tests across all 9 subtests</li>
  <li>Full score history and weak-topic drills</li>
  <li>39 study guides covering every ASVAB topic</li>
</ul>

<p>Two things that might help today:</p>
<ol>
  <li>Take a diagnostic if you have not yet, at <a href="https://asvabhero.com/practice">asvabhero.com/practice</a></li>
  <li>Reply to this email with your branch and target test date. I read every reply.</li>
</ol>

<p>Trish<br>ASVAB Hero</p>
```

---

## Resend (inline, in webhook code) #2 — `welcome-trial`

**Subject:** `Your 7-day ASVAB Hero Pro trial just started`
**From:** `Trish at ASVAB Hero <info@asvabhero.com>`
**Reply-To:** `trish@dach.family`

```html
<p>Hi {firstName},</p>

<p>Your 7-day ASVAB Hero Pro trial just started. Here is how to make it count.</p>

<p>You have full Pro access for the next 7 days:</p>
<ul>
  <li>Unlimited adaptive practice tests across all 9 subtests</li>
  <li>Full score history and weak-topic drills</li>
  <li>39 study guides covering every ASVAB topic</li>
</ul>

<p>Three quick wins for the trial week:</p>
<ol>
  <li>Take a diagnostic at <a href="https://asvabhero.com/practice">asvabhero.com/practice</a> so the platform learns your weak topics</li>
  <li>Run two 25-question subtest drills on your weakest area</li>
  <li>Re-take the diagnostic on day 6 to see your score move</li>
</ol>

<p>If Pro is helping, do nothing. Your card runs on day 8 at $9.99 and you keep going. If it is not the right fit, cancel any time at <a href="https://asvabhero.com/account/billing">asvabhero.com/account/billing</a>.</p>

<p>Reply with your branch and target test date. I read every reply.</p>

<p>Trish<br>ASVAB Hero</p>
```

---

## Resend (inline, in cron drip) #3 — `trial-day2-activation`

Sent by `/root/scripts/asvab_drip_trial.py` (hourly cron) ~24-36h after trial start. Skipped if the user already has any `attempts` row.

**Subject:** `One thing to do today`
**From:** `Trish at ASVAB Hero <info@asvabhero.com>`
**Reply-To:** `trish@dach.family`

```html
<p>Hi {firstName},</p>

<p>Yesterday you started your 7-day ASVAB Hero Pro trial. The single highest-leverage thing for Pro to actually work for you is to take a diagnostic. 30 questions, about 18 minutes, and the platform builds your weak-topic drill list from your results.</p>

<p><a href="https://asvabhero.com/practice-test?variant=diagnostic" style="background:#f97316;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:600;">Take your diagnostic</a></p>

<p>Once you have a diagnostic in, the rest of the platform shapes itself around your weakest subtests automatically.</p>

<p>Trish<br>ASVAB Hero</p>
```

---

## Resend (inline, in cron drip) #4 — `trial-milestone-50q`

Sent by `/root/scripts/asvab_drip_trial.py` once when the user crosses 50 total questions answered across `attempts`, while their trial is still active.

**Subject:** `You answered 50 questions on ASVAB Hero`
**From:** `Trish at ASVAB Hero <info@asvabhero.com>`
**Reply-To:** `trish@dach.family`

```html
<p>Hi {firstName},</p>

<p>You've answered {totalQuestions} questions and your overall accuracy is {accuracy}%. Your strongest subtest so far is {topSubtest}.</p>

<p>{daysLeft} days left on your trial. Two things that move the needle next:</p>
<ul>
  <li>Run a 25-question drill on your weakest subtest</li>
  <li>Re-take a full diagnostic on day 6 to see your AFQT move</li>
</ul>

<p><a href="https://asvabhero.com/practice-test" style="background:#f97316;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:600;">Continue practicing</a></p>

<p>Trish<br>ASVAB Hero</p>
```

---

## Listmonk drip rewrites (2026-05-08)

Hotfix to existing transactional templates 7, 8, 9, 10. Original bodies were authored when ASVAB Hero was free-only; this rewrite adds Pro pitches (single 7-day trial CTA per email, natural escalation inside the educational copy) and removes the Quizlet competitor mention from T7. Subjects unchanged. Rewrites authored via codex (gpt-5.4), PATCHed via Listmonk PUT /api/templates/{id} on 2026-05-08, verified by GET-after-PUT.

### Listmonk Template 7 — Day 2 (WK mistakes)

**Subject:** `The 3 Word Knowledge mistakes that tank your AFQT`
**Type:** tx
**Changes:** Removed Quizlet recommendation. CTA switched to `/practice-test`. Added Pro PS line.

```html
<!DOCTYPE html><html><body style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;line-height:1.5;padding:24px 16px"><p>{{ .Subscriber.FirstName | default "Hey" }},</p><p>Word Knowledge is one of the fastest subtests to improve. It is also where most test-takers give away easy AFQT points.</p><p>Three mistakes that cost the average recruit 5 to 8 points:</p><p><strong>1. They guess from the first answer that sounds close.</strong><br>Fix: read all 4 options. WK almost always includes one distractor that sounds right but means something different.</p><p><strong>2. They skip prefix and suffix work and go straight to flashcards.</strong><br>Fix: learn 20 prefixes and 15 root words. That gives you a way to break down hundreds of words instead of trying to memorize each one.</p><p><strong>3. They do not practice under a timer.</strong><br>Fix: WK gives you about 11 seconds per question. If you cannot answer in that window during practice, you will feel it on test day.</p><p>The drill we built does this for you. Start with a free Word Knowledge diagnostic on ASVAB Hero, then use timed prefix and root-word drills to train quick recognition instead of slow guessing.</p><p style="text-align:center;margin:24px 0"><a href="https://asvabhero.com/practice-test" style="display:inline-block;background:#f97316;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">Take a timed WK drill</a></p><p>Tomorrow is not the day to grind. Tomorrow is rest.</p><p>P.S. If timed WK drills are clicking, ASVAB Hero Pro unlocks unlimited adaptive practice across every subtest. 7-day trial: <a href="https://asvabhero.com/pricing" style="color:#f97316">asvabhero.com/pricing</a></p><p>&mdash; ASVAB Hero</p><p style="font-size:12px;color:#888;margin-top:32px;border-top:1px solid #eee;padding-top:16px"><a href="https://list.asvabhero.com/subscription/6cfd6a05-8ac2-498b-86ca-9bb381e1d006/{{ .Subscriber.UUID }}" style="color:#888">Unsubscribe</a> &middot; asvabhero.com</p></body></html>
```

### Listmonk Template 8 — Day 5 (GT math)

**Subject:** `Add 10 points to your GT in 2 weeks (here is the math)`
**Type:** tx
**Changes:** Worked example kept. Pro adaptive engine framed as the natural answer to the gap. CTA now drives directly to `/pricing` with "Start your 7-day Pro trial". Dropped reply-prompt.

```html
<!DOCTYPE html><html><body style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;line-height:1.5;padding:24px 16px"><p>If you want a better Army MOS, your GT score is the gate.</p><p><strong>GT = Arithmetic Reasoning + Word Knowledge + Paragraph Comprehension.</strong></p><p>That means every +1 on AR, WK, or PC adds to GT directly. No scaling tricks. Straight addition.</p><p>Here is what that looks like in practice:</p><p>Current GT: 95. Dream job: 35M Human Intelligence Collector (GT 101). You are 6 points short.</p><p>Fastest path:</p><ul><li>+3 on WK (easiest to raise, most vocabulary-driven)</li><li>+3 on AR (focus on word problems, not pure calculation)</li></ul><p>Two weeks. 30 minutes a day. GT goes from 95 to 101. You qualify.</p><p>This is exactly the kind of gap ASVAB Hero Pro is built to close. The adaptive engine spots where you are missing WK and AR questions, drills the weak topics, and helps you retest with a clear target in 2 weeks.</p><p style="text-align:center;margin:24px 0"><a href="https://asvabhero.com/pricing" style="display:inline-block;background:#f97316;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">Start your 7-day Pro trial</a></p><p>If you are Navy, Marines, or Coast Guard, the line scores are different but the math works the same way. ASVAB Hero Pro covers all 9 subtests.</p><p>&mdash; ASVAB Hero</p><p style="font-size:12px;color:#888;margin-top:32px;border-top:1px solid #eee;padding-top:16px"><a href="https://list.asvabhero.com/subscription/6cfd6a05-8ac2-498b-86ca-9bb381e1d006/{{ .Subscriber.UUID }}" style="color:#888">Unsubscribe</a> &middot; asvabhero.com</p></body></html>
```

### Listmonk Template 9 — Day 10 (hidden jobs)

**Subject:** `Jobs your recruiter is not telling you about`
**Type:** tx
**Changes:** All 4 MOS listings unchanged. Inline Pro link added after calculator-CTA prompt for users 5-10 points short of target role. Primary CTA still `/calculator`.

```html
<!DOCTYPE html><html><body style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;line-height:1.5;padding:24px 16px"><p>Recruiters have MOS quotas. The Army is short on cooks and truck drivers this month, so that is what they pitch first.</p><p>But your ASVAB score opens doors they do not mention unless you ask.</p><p>Four jobs most recruits never hear about:</p><p><strong>1. 17C Cyber Operations Specialist (Army, GT 110+)</strong><br>Top-secret clearance. Large enlistment bonus active right now. Pure civilian transfer to any cybersecurity firm at $90k+.</p><p><strong>2. 1N0X1 Operations Intelligence (Air Force, G 64+)</strong><br>Intel analyst. Same clearance. Closest civilian equivalent: FBI, CIA, DIA, contractors. Often $85k+ post-service.</p><p><strong>3. CTR Cryptologic Technician Collection (Navy, VE+AR 109+)</strong><br>SIGINT. TS/SCI. 6-year commitment but reenlistment bonuses are some of the highest in the fleet.</p><p><strong>4. 0241 Intelligence Specialist (Marines, GT 100+)</strong><br>Hardest branch, but the smallest intel community means fast promotion and direct access to high-visibility missions.</p><p>The common thread: clearance. If you leave the military with an active TS/SCI, your first civilian offer is usually 2 to 3x what you made in.</p><p>Your current scores already qualify you for some of these. Run the calculator and see.</p><p>If your scores are 5 to 10 points short of the role you want, ASVAB Hero Pro's adaptive practice closes that gap faster than self-study. 7-day trial: <a href="https://asvabhero.com/pricing" style="color:#f97316">asvabhero.com/pricing</a></p><p style="text-align:center;margin:24px 0"><a href="https://asvabhero.com/calculator" style="display:inline-block;background:#f97316;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">See all jobs you qualify for</a></p><p>&mdash; ASVAB Hero</p><p style="font-size:12px;color:#888;margin-top:32px;border-top:1px solid #eee;padding-top:16px"><a href="https://list.asvabhero.com/subscription/6cfd6a05-8ac2-498b-86ca-9bb381e1d006/{{ .Subscriber.UUID }}" style="color:#888">Unsubscribe</a> &middot; asvabhero.com</p></body></html>
```

### Listmonk Template 10 — Day 14 (retake)

**Subject:** `Ready for your retake? Quick 90-second check`
**Type:** tx
**Changes:** Retake rules + C-Test warning preserved. "30-day score push" framing leverages peak-intent moment. CTA changed to `/pricing` ("Start your 30-day score push"). Retake calculator demoted to inline secondary link. "This is the last email in this sequence" footer line removed.

```html
<!DOCTYPE html><html><body style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;line-height:1.5;padding:24px 16px"><p>{{ .Subscriber.FirstName | default "Hey" }},</p><p>Two weeks in. If you have been drilling, you are probably ready to retake.</p><p><strong>The rules (every branch):</strong></p><ul><li>Retake 1: 1 month after first test</li><li>Retake 2: 1 month after retake 1</li><li>Retake 3 and beyond: 6 months</li></ul><p>One warning: if your score jumps 20+ points in 6 months, DoD requires a Confirmation Test (C-Test). Two outcomes:</p><ul><li>You match or beat your new score: it stands.</li><li>You score lower: they roll back to the lower one.</li></ul><p>This is the trap. Some test-takers cram, retake, score 30 points higher, then cannot replicate it on the C-Test. They lose both.</p><p>The fix: aim for a gain you can actually hold. +10 to +15 is safer than chasing +25.</p><p>ASVAB Hero Pro is built for exactly this 30-day score-push window. The adaptive engine targets your weakest topics, paces you toward a sustainable +10 to +15 gain, and gives you 7 days free to test whether it is working before you commit.</p><p style="text-align:center;margin:24px 0"><a href="https://asvabhero.com/pricing" style="display:inline-block;background:#f97316;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px">Start your 30-day score push</a></p><p>If you want to check your retake date first, use the <a href="https://asvabhero.com/asvab-retake-calculator" style="color:#f97316">retake calculator</a>.</p><p>If you are ready, schedule with your recruiter this week. The slot availability gets worse every month closer to summer.</p><p>Good luck out there.</p><p>&mdash; ASVAB Hero</p><p style="font-size:12px;color:#888;margin-top:32px;border-top:1px solid #eee;padding-top:16px"><a href="https://list.asvabhero.com/subscription/6cfd6a05-8ac2-498b-86ca-9bb381e1d006/{{ .Subscriber.UUID }}" style="color:#888">Unsubscribe</a> &middot; asvabhero.com</p></body></html>
```

---

## Listmonk #5 — `tx-pc-magnet`

**Name:** `tx-pc-magnet`
**Subject:** `Your PC trap-pattern pack is here`
**Template ID (live):** 16
**Tag mapping:** `pc-tips` → `LISTMONK_TEMPLATE_PC_TIPS=16` (set in CF Pages production env vars)

```html
<p>Hi there,</p>

<p>Here is the Paragraph Comprehension Trap-Pattern Pack you signed up for. PC and Word Knowledge get doubled inside your AFQT through the VE composite, so a 5-point lift on PC is worth 10 AFQT points.</p>

<p><a href="https://asvabhero.com/pc-trap-patterns.pdf" style="background:#f97316;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;display:inline-block;font-weight:600;">Download the PC Trap-Pattern Pack</a></p>

<p>Inside: a 60-second triage card for the test-room moment, the 5 wrong-answer trap patterns with the kill move for each, three worked passages with every wrong choice labeled by trap type, a four-passage drill set, and a one-page test-day cue card.</p>

<p>The drill page is the highest-leverage part. Solve the four passages, check the answer key, and watch which trap pattern catches you most. That trap is your study plan.</p>

<p>If you want the full 30-day plan, it is at <a href="https://asvabhero.com/study-plan.pdf">asvabhero.com/study-plan.pdf</a>.</p>

<p>Reply with your branch and target test date. I read every reply.</p>

<p>Trish<br>ASVAB Hero</p>
```
