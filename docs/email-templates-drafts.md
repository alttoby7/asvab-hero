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
