# ASVAB Hero — Domain Rating (DR) improvement plan

_Started 2026-06-15. Pairs with the outreach docs (`docs/outreach-deliverability.md`,
`CONTINUITY-2026-05-25-outreach-trust-pass.md`)._

## Diagnosis (2026-06-15, Ahrefs)

- **DR 0.0**, Ahrefs rank ~207M = effectively unranked.
- **183 live referring domains, 199 live backlinks** — and **all of it is junk**:
  spam/PBN domains (`buybacklinks.agency`, `pbnseolinks.shop`,
  `thebestbacklinksavailable.click`, the `rank-your.*` / `*linkpro.shop` farms),
  almost all **nofollow**, all **zero-traffic**. They pass nothing.
- So DR is not being "dragged down" (DR never goes negative). **DR is 0 because
  there are ~zero real do-follow links from real sites.** The whole job is to
  earn the first dozen.
- Good news (with a caveat): on DR's log scale, **0 -> 10 needs far fewer links
  than 10 -> 20**, so the first move is the cheapest we will ever get. But
  **quality drives the first tick, not count** — links from sites that
  themselves have real URL Rating / traffic matter; a dozen DR-5 school pages
  move DR less than a couple of DR-40+ ones. And DR only recomputes on Ahrefs'
  crawl cycle, so "moves the needle" is **weeks to a couple of months**, not
  immediate. Plan for a steady trickle of relevant links, not a one-time push.

## The asset hierarchy (corrected 2026-06-15)

The goal is **inbound do-follow `<a>` links to asvabhero.com.** Ranked by how
reliably each asset earns one:

1. **Embeddable tool widget + attribution link (STRONGEST).** The attribution
   `<a>` is structural — it ships inside the copy-paste snippet, so every embed
   is a do-follow link that the host cannot easily strip. Compounds: one good
   placement on a counselor/blog page can be copied by others.
2. **On-site resource page (`/counselor-resources`, tool pages).** People link to
   *pages*. This is the citeable URL for LibGuides / resource lists.
3. **PDF download (WEAKEST as a link asset).** A downloadable PDF is re-hostable:
   a counselor can upload it to their own server or drop it in an LMS and we get
   **no link**. Demoted to **outreach door-opener / collateral**, not the thing
   we ask people to link. If hosted on-site, a link *to* the PDF still counts,
   but don't rely on it.

### Why the embed program was earning nothing (fixed this session)

`EmbedSnippet.tsx` generated a **bare `<iframe>`** while its own comment claimed
"each embed carries a do-follow backlink." **An iframe passes zero link equity** —
Google and Ahrefs ignore iframe `src` for backlinks. Every school that ever
pasted that snippet gave us nothing.

**Fix (2026-06-15):** the copy-paste snippet now appends a real branded
attribution line: `Free {tool} powered by <a href="{canonical tool page}">ASVAB
Hero</a>`. Branded anchor only (no keyword stuffing — avoids Google's widget-link
guidance). Wired into both `/embed` widgets (afqt-calculator -> `/afqt-calculator`,
score-requirements -> `/asvab-score-requirements`). `tsc` clean.

## Workstreams (priority order)

### 1. Linkable assets — DO FIRST (the lever)
- [x] **Fix embed attribution link** (this session) — converts the existing,
      already-built widget program from 0 links into a real engine.
- [ ] **Promote the embeds** — make `/embed` discoverable; pitch it as the first
      ask in outreach ("paste this one line, it's free"). Consider more widgets
      (score chart, branch-minimums) once the first two prove out.
- [ ] **Counselor resource page polish** — `/counselor-resources` is the citeable
      URL; make sure it's the link target in outreach, not a file.
- [ ] **Counselor Quick-Start Pack PDF** — build per the May spec, but as a
      **door-opener** attached in outreach, NOT the primary link target. Its CTA
      should drive people to link/embed the live tools.

### 2. Manual relationship outreach (gated on assets above)
- Targets: school counselor LibGuides, public-library resource pages, JROTC
  instructors, veteran / recruiting orgs.
- **<= 8-10 personalized emails/week** from `info@`/`trish@asvabhero.com`
  (Workspace; strict DMARC `p=quarantine` — **never** a cold-email tool on the
  root domain, per `outreach-deliverability.md`). One follow-up only.
- The ask: "link your students to [calculator/resource page]" or "paste this
  one-line embed" — concrete, not "please link my homepage."

### 3. Digital-PR / earned mentions (highest DR ceiling)
- HARO/Qwoted-style sourcing: position Trisha as an ASVAB / enlistment-prep
  expert for military-family + education journalists. One DR-70+ news link beats
  50 LibGuide links.
- **Unlinked-mention reclamation**: find pages that mention ASVAB Hero / the
  calculator without linking; ask for the link. (Pull from Ahrefs.)

### 4. Hygiene (low priority, one-time)
- **Disavow: probably skip.** Google's own guidance is NOT to disavow spam/PBN
  links you didn't build — they're ignored algorithmically, DR won't change, and
  a careless disavow can drop links you actually want. Realistic upside here is
  near-zero. Only build a `disavow.txt` if a manual action or clear
  negative-SEO pattern ever appears; otherwise leave it.

## Next concrete actions
1. Pull link-opportunity data from Ahrefs: unlinked brand mentions + competitor
   backlink gaps (who links to ASVAB competitors but not us).
2. Build the disavow file from the junk refdomain list.
3. Build the Counselor Pack PDF (door-opener) when ready to resume outreach.

## Link-opportunity findings (2026-06-15, Ahrefs)

DataForSEO backlinks API is not subscribed, so this came from Ahrefs analysis of
the closest reachable peer, **asvabtutor.com** (DR 25 — a pure ASVAB-prep site,
so its links are the most replicable for us). After stripping the noise (search
engines, CDN/host shadows like vercel/netlify/blogspot, and the same SEO-spam
farms that polluted our own profile), the real, niche-relevant links cluster
into ONE channel:

**Schools, libraries, and teacher resource pages.** This validates the existing
counselor-outreach plan — it's where prep sites actually earn do-follow links.

### Replicable target sources (asvabtutor earned these; we can too)
| Source | DR | Why it's a target |
|---|---|---|
| **libguides.com** | 85 | Librarian research guides (Springshare). #1 target. Schools/colleges list ASVAB prep tools. 8 do-follow to asvabtutor. |
| **sharpschool.com** | 75 | School-site CMS. Real K-12 "career center / military" pages. 15 do-follow. |
| **schoolwires.net** | 75 | School-site CMS (Blackboard). Same channel. 15 do-follow. |
| **palmbeachschools.org** | 71 | Real school-district resource page. 4 do-follow. |
| **kyschools.us** | 74 | Kentucky school sites. 6 do-follow. |
| **prepscholar.com** | 74 | Test-prep blog; roundup / mention candidate. |
| smore.com / padlet.com / symbaloo.com | 76-90 | Teacher resource boards (mostly nofollow, but referral + discovery). |

### Mention / reclamation candidates
- **liveabout.com / thebalancecareers.com** (DR 86/82) — Dotdash military-careers
  content. nofollow, but high-authority; worth a brand-mention play.
- TODO: pull asvabhero.com's OWN unlinked mentions (separate query; needs a
  content search, not the backlinks gap).

### Prospecting footprints to enumerate actual URLs
Run these to build the per-school outreach list (then pitch the embed + resource
page, <=8-10/week per `outreach-deliverability.md`):
- `inurl:libguides.com ASVAB`
- `site:sharpschool.com ASVAB` / `site:schoolwires.net ASVAB`
- `"ASVAB" "career center" (school OR district) resources`
- `inurl:libguides "test prep" ASVAB`
- Find pages already linking asvabtutor.com / march2success.com on `.us`/`k12`/
  `.edu` domains and pitch ours as an additional free tool.

**Takeaway:** the embed-attribution fix + counselor resource page are aimed at
exactly the right channel. Outreach should lead with "paste this free one-line
ASVAB calculator widget" to school/library resource-page owners.

## Best-in-class counselor resources + outreach SOP (2026-06-15)

Counselors link what they trust and would hand to a student, not a funnel. The
link follows resource quality. Strategy: turn the single `/counselor-resources`
page into a small **Counselor Resource Center** of individually-linkable,
printable, and embeddable assets, each genuinely the best free version on the
web, then run disciplined outreach to the school/library channel we validated.

### Audit of current `/counselor-resources` (verdict: good page, not yet a hub)
Strengths: 10 source-cited sections, no-affiliation disclaimer, FAQ + ItemList
schema, embed callout, workflow-by-situation, no signup. Discoverability fine
(footer + sitemap 0.9 + llms.txt). Gaps (priority order):
1. One kitchen-sink page = one link target (vs a hub of many).
2. No printable handouts (the #1 school-channel gap + outreach door-opener).
3. Missing highest-need topics: CEP results interpretation, score release to
   recruiters (CEP option 8), parent FAQ, testing accommodations.
4. Thin embed menu (only AFQT calc + score table).
5. No frictionless "link/cite this" affordance.
6. Not segmented (counselor vs librarian vs JROTC).

### The hub model — assets to build (each individually linkable)
| Asset | Type | Link value | Status |
|---|---|---|---|
| Counselor reference page | page (exists) | citeable URL | upgrade: add cite box + segmentation |
| "ASVAB at a Glance" one-pager | printable PDF (hosted) | door-opener; drives to tools | build |
| Subtest cheat sheet | printable PDF | handout gold | build |
| Parent FAQ one-pager | printable PDF | counselors forward to parents | build |
| CEP results interpretation guide | page | high-search, high-need | build (fact-checked) |
| Score release to recruiters (CEP options) | page | unique, FERPA-adjacent | build (fact-checked) |
| Full score calculator + jobs-by-score embeds | embed widgets | structural do-follow links | build |

Rules for every asset (non-negotiable, per the May trust-pass): plain
institutional tone, source-cited, last-verified date, no email gate, no ranking
language, no DoD-affiliation implication. PDFs hosted on-site (so links to them
count) and their CTA drives to the live tools/page. Fact-sensitive pages go
through the asvab fact-check pass before publish.

### Frictionless linking affordance (build on the page)
A "Link or cite this resource" box with copy-paste HTML (branded anchor) + a
suggested citation line. Lowers friction = more links. Same principle as the
embed snippet.

### Outreach SOP
- **ICP:** school counselors, college/career-center coordinators, school
  librarians (LibGuides), JROTC instructors.
- **Sourcing (validated footprints):** `inurl:libguides.com ASVAB`,
  `site:sharpschool.com ASVAB`, `site:schoolwires.net ASVAB`, school-district
  "career center / military" resource pages, and pages already linking
  asvabtutor.com / march2success.com on `.us`/`k12`/`.edu` domains.
- **The pitch:** lead with the free embeddable tool + the ONE handout relevant to
  them ("paste this one-line ASVAB calculator widget" / "here's a printable
  one-pager for students"). Never "please link my homepage."
- **Personalization:** name their specific page + one real detail from it.
- **Channel + deliverability:** Workspace mailbox (`info@`/`trish@`), **<=8-10
  personalized/week**, ONE follow-up at 7-10 days, NO cold-email tools on the
  root domain (strict DMARC `p=quarantine` — see `outreach-deliverability.md`).
- **Tracking:** sheet with columns prospect / their page URL / asset pitched /
  sent date / follow-up date / result (link landed Y/N + URL).
- **Templates:** three short ones (counselor, librarian, JROTC instructor).
- **Measurement:** links landed per month; re-pull DR + refdomains monthly.

### Priority build order
1. **Link/cite affordance** on the counselor page (zero factual risk, high
   leverage) — DONE/this session where possible.
2. **Printable one-pagers** (ASVAB at a Glance, Subtest cheat sheet, Parent FAQ)
   — door-opener assets; hosted on-site.
3. **Expand embeds** (full calculator, jobs-by-score) — now that attribution is
   fixed, each embed earns a link.
4. **CEP-interpretation + score-release pages** (fact-checked) — fill the
   highest-need topic gaps.
5. **Outreach tracking sheet + 3 templates**, then start <=8-10/week.

## Baseline to re-check (set 2026-06-15)
| Metric | Value |
|---|---|
| DR | 0.0 |
| Ahrefs rank | ~207,000,000 |
| Live refdomains | 183 (all junk) |
| Live backlinks | 199 |
| Real do-follow links from real sites | ~0 |

Success = first real do-follow links appear and DR ticks off 0. Re-pull DR +
refdomains monthly.
