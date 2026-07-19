# Partner outreach email templates

Cold-ish outreach for the institutional partner program: librarians, JROTC / high
school instructors, and military recruiters. The offer is the same in every case,
a genuinely useful free resource for their students or applicants:

- **Embeddable widget** (one line of HTML): the free AFQT calculator or the
  score-requirements table. Live at `/embed`. Each embed carries a do-follow
  credit link back to the tool page.
- **Printable one-page handout**: `/for-educators/handout`. Print or save to PDF,
  post on a board or a LibGuide.
- **The full partner kit**: `/for-educators`.

Everything is free, needs no account or email to start, and collects no student
data. ASVAB Hero is independent and not affiliated with the U.S. Department of
Defense; the calculators give estimates, not official scores.

---

## The one hard rule: no invented personalization

These are templates. The sender fills every `{{merge_field}}` with a **real,
verified fact** before sending. Do not guess, and do not fake familiarity.

- **Never** invent a detail about the recipient or their institution (no "I loved
  your college-and-career page", no made-up program name, no assumed mascot, city,
  or student count) unless you have personally verified it and are pasting the real
  thing into the merge field.
- If you cannot verify a personalization field, **delete the sentence that uses it**
  and send the plainer version. A generic, honest email beats a specific, wrong one.
- The body text outside the merge fields is written to be true for any recipient in
  that segment, so a template with every optional field removed still reads fine.
- One link per email should point at the specific asset. Optional `{{verified_url}}`
  fields are for a real page you looked at, not a guessed one.

### Merge-field legend

| Field | Fill with | If you cannot verify it |
| --- | --- | --- |
| `{{first_name}}` | Recipient's first name from their staff page or directory. | Use "there" ("Hi there,"). |
| `{{institution_name}}` | The exact library / school / station name. | Use "your library" / "your school" / "your station". |
| `{{your_name}}` | Your name. | Required. |
| `{{your_title}}` | Your role (e.g. "ASVAB Hero team"). | Required. |
| `{{verified_page}}` | A real resource page of theirs you actually opened, described plainly. | Delete the sentence that references it. |

Send from a real person, plain text, no tracking pixels. Keep the credit link if
you would like other educators to find the kit.

---

## Segment A: Public and school librarians (LibGuides angle)

**Subject:** A free ASVAB tool you can add to a guide

Hi {{first_name}},

I work on ASVAB Hero, a free study site for students preparing for the military
entrance test. Patrons who ask about enlisting often need somewhere to start, and we
built a couple of things that fit a library guide.

There is a free AFQT calculator and a score-requirements table you can embed with
one line of HTML, so a patron can use them without leaving your page or making an
account. If embedding is more than you want to touch, there is also a printable
one-page handout and plain links you can drop into a guide instead.

- The kit: https://asvabhero.com/for-educators
- Embed a widget: https://asvabhero.com/embed
- Printable handout: https://asvabhero.com/for-educators/handout

Everything is free, needs no login to start, and collects no patron data. We are
independent and not affiliated with the Department of Defense, and the tools give
estimates rather than official scores, so it is a study aid, not the real test.

If it is useful, link whatever fits. Happy to answer any questions.

{{your_name}}
{{your_title}}

> Optional, only if verified: after the first paragraph you may add one sentence
> referencing `{{verified_page}}`, e.g. "I saw your career and test-prep guide and
> thought this would sit well next to what is already there." Delete it if you have
> not opened that page.

---

## Segment B: JROTC and high school instructors

**Subject:** A free ASVAB practice link for your students

Hi {{first_name}},

I help run ASVAB Hero, a free site for students studying for the ASVAB. I thought it
might save you some time with the cadets who are working toward a good score.

Students can start a full practice test on any phone with no account and no email,
and every question has an explanation so they can see what to study next. There is
also a free diagnostic that estimates their AFQT, score calculators for all six
branches, and study guides for every subtest.

The easiest way to share it is a printable one-page handout you can post or hand out,
or a single link for your class page:

- Printable handout: https://asvabhero.com/for-educators/handout
- Share a class link: https://asvabhero.com/classroom
- The full kit, including an embeddable calculator: https://asvabhero.com/for-educators

It is all free, and we are independent, not affiliated with the Department of
Defense, so the practice is prep for the real test, not the test itself. If it helps
your students, use whatever is useful.

{{your_name}}
{{your_title}}

> Optional, only if verified: reference a real program detail in the first line,
> e.g. "I know your {{institution_name}} program has cadets testing this spring."
> Only include it if you actually know that. Otherwise leave the plain version.

---

## Segment C: Military recruiters

**Subject:** A free ASVAB practice tool to share with applicants

Hi {{first_name}},

I work on ASVAB Hero, a free ASVAB study site. Since applicants who walk in
underprepared cost everyone time, I wanted to put a free prep resource in front of
you that you can pass along before they sit the real thing at MEPS.

They can take a free practice test with no account, get a diagnostic that estimates
their AFQT, and see which jobs and branches different scores open up using the
calculators. It is a simple thing to text or hand someone who wants to raise a
score before test day.

- Practice test: https://asvabhero.com/practice-test
- AFQT and job calculators: https://asvabhero.com/calculator
- The full kit: https://asvabhero.com/for-educators

To be clear on what it is: ASVAB Hero is independent and not affiliated with the
Department of Defense or any branch. The official ASVAB is still free at MEPS
through you, and our calculators give estimates, not official scores. This is just
practice to help applicants show up ready.

If it is useful, share it with whoever you like.

{{your_name}}
{{your_title}}

> Note: keep this factual and low-key. Do not imply endorsement by any branch or by
> the DoD, and do not claim a partnership you do not have.

---

## Short follow-up (any segment)

Send once, a week or so later, only if there was no reply.

**Subject:** Re: [original subject]

Hi {{first_name}},

Just floating this back up in case it is useful. No worries at all if it is not a
fit. The free kit is here whenever you want it: https://asvabhero.com/for-educators

{{your_name}}
{{your_title}}
