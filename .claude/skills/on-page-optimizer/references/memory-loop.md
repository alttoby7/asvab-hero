# Memory Loop — Per-URL Logs, Registry, and Drift Attribution

This reference documents the memory layer that lets `on-page-optimizer` track optimization cycles over time. Read this file when entering Stage 0.5 (memory load) for the first time in a session, and again before Stage 5 (log append).

The memory layer wraps the existing 5-stage pipeline. It never replaces SERP analysis, gap detection, or content editing — it adds state around them so the skill behaves like a real SEO with a notebook.

---

## The notes folder

Every project using this skill has one notes folder. Its location is chosen by the user on first run and stored in `.config.json` inside that folder. Subsequent runs read `.config.json` to know where to read and write.

```
{notes_folder}/
├── .config.json              # skill settings for this project
├── index.json                # registry of every tracked URL
└── urls/
    ├── services-puppy-classes.md       # per-URL append-only log
    ├── services-private-training.md
    └── index.md                         # homepage log
```

### First-time setup

If `{notes_folder}/.config.json` does not exist when the skill runs:

1. Suggest a default location:
   - If `docs/` exists at the project root → suggest `docs/seo-notes/`.
   - Otherwise → suggest `seo-notes/` at the project root.
2. Ask the user: "Where should I save optimization logs and metrics for this project? (default: `{suggested}`)". Accept their answer verbatim; if they press enter, use the default. For ASVAB Hero, `docs/` exists, so the default is `docs/seo-notes/`.
3. Create the folder if it doesn't exist.
4. Write `.config.json` with the answered path plus the site URL and country detected in Stage 0 (`https://asvabhero.com`, `us`):

```json
{
  "notes_folder": "docs/seo-notes",
  "site_url": "https://asvabhero.com",
  "country": "us",
  "created_at": "2026-04-10"
}
```

5. Create an empty `index.json`:

```json
{ "urls": [] }
```

6. Create the `urls/` subfolder (empty).

On every subsequent run, read `.config.json` to know where to write.

### Recovery

- `.config.json` missing → re-run first-time setup. Cheap and safe.
- `index.json` missing or out of sync with `urls/` → rebuild it by scanning every `urls/*.md` file and reading each frontmatter block. Orphaned registry entries (no matching log file) are silently removed. Log files not in the registry are silently added.
- Any log file deleted by the user → next run on that URL is treated as cycle 1 (no recovery from git history of the log itself; user intent is unclear).

---

## URL slug derivation

Each tracked URL maps to one log file. The slug is derived from the URL path:

1. Strip scheme and host: `https://example.com/services/puppy-classes` → `/services/puppy-classes`.
2. Strip leading slash: `services/puppy-classes`.
3. Lowercase.
4. Replace remaining `/` with `-`: `services-puppy-classes`.
5. Strip trailing dash if present.
6. Homepage (`/` or empty path after stripping) → `index`.
7. Collisions (rare) → append `-2`, `-3`, etc. Record the chosen suffix in `index.json` so the URL→slug mapping is explicit.

The slug plus `.md` is the log filename: `urls/{slug}.md`.

---

## The registry — `index.json`

Lightweight index of every URL the skill is tracking. The per-URL log is the source of truth for details; this file exists so `review-all` can enumerate URLs without reading every log.

```json
{
  "urls": [
    {
      "url": "/services/puppy-classes",
      "target_keyword": "puppy classes edinburgh",
      "log_file": "urls/services-puppy-classes.md",
      "first_optimized": "2026-03-15",
      "last_reviewed": "2026-04-02",
      "cycles": 3,
      "last_verdict": "win-hold"
    }
  ]
}
```

**Fields:**
- `url` — path portion of the URL (what the user passes to the skill).
- `target_keyword` — the keyword this URL is being tracked against.
- `log_file` — relative path from `{notes_folder}` to the log file.
- `first_optimized` — ISO date of cycle 1.
- `last_reviewed` — ISO date of the most recent cycle (edit or pure review).
- `cycles` — integer count of cycles in the log.
- `last_verdict` — one of: `win-hold`, `win-iterate`, `loss-revert`, `loss-pivot`, `inconclusive-wait`, `first-run`.

**Updating the registry:** on every cycle end (Stage 5 log append), update the entry for this URL — increment `cycles`, update `last_reviewed` and `last_verdict`. Add a new entry on first run.

---

## Per-URL log format

One markdown file per URL. Append-only: old cycles are never rewritten. Starts with YAML frontmatter, followed by a header, followed by one section per cycle in chronological order.

### File template

```markdown
---
url: /services/puppy-classes
target_keyword: puppy classes edinburgh
site_url: https://example.com
country: gb
first_optimized: 2026-03-15
cycles: 1
last_verdict: first-run
---

# /services/puppy-classes — Optimization Log

Target keyword: **puppy classes edinburgh** (70/mo, GB, KD 8)

---

## Cycle 1 — 2026-03-15

**Status:** applied

### Baseline metrics

| Keyword | Ahrefs pos | GSC clicks (28d) | GSC impressions | GSC CTR | GSC avg pos |
|---|---|---|---|---|---|
| puppy classes edinburgh | 12 | 4 | 180 | 2.2% | 11.8 |
| ... (top 20 basket) | | | | | |

**Page traffic (Ahrefs estimate):** ~12/mo
**Top 10 SERP:** edinburghdogtrainer.com, sitX, sitY, sitZ, sitW, sitV, sitU, sitT, sitS, sitR

### Hypothesis

Page is on page 2 because (a) title tag doesn't include "Edinburgh",
(b) word count is 850 vs competitor average 2,400, (c) missing sections on
"what to expect in your first class" and "age requirements" — both covered
by 5/5 top competitors.

### Changes applied

- Title: `Puppy Classes` → `Puppy Classes Edinburgh | Small Group Training`
- Meta description: rewritten to include location and CTA (148 chars)
- Added H2: "What to Expect in Your First Class" (~420 words)
- Added H2: "Age Requirements and Prerequisites" (~310 words)
- Added 3 internal links to related service pages

### Git state at end of cycle

- HEAD: `a1b2c3d4e5f6`
- File blob: `9f8e7d6c5b4a`
```

### Review cycle template (cycle 2+)

```markdown
## Cycle 2 — 2026-04-02 (review)

**Status:** applied
**Days since last cycle:** 18

### Fresh metrics vs baseline

| Keyword | Before | Now | Δ |
|---|---|---|---|
| puppy classes edinburgh | 12 | 6 | ▲ 6 |
| puppy training edinburgh | 18 | 15 | ▲ 3 |
| dog training edinburgh | 24 | 28 | ▼ 4 |

**Page traffic:** 12/mo → 34/mo (▲ 183%)
**SERP composition change:** edinburghdogtrainer.com moved from #3 to #5; new entrant newcomer.co.uk at #4.

### Drift check

`git log a1b2c3d..HEAD -- services/puppy-classes.md`:
- `d4e5f6g` (2026-03-22) — "fix typo in first-class section"
- `h7i8j9k` (2026-03-28) — "add pricing to CTA"

→ User made 2 edits between cycles. Attribution: title change and new H2s
are the skill's work; pricing block is the user's. Ranking improvement is
likely dominated by the title change (location signal).

### Verdict

Win. The target keyword moved from 12 to 6 over 18 days, and the secondary
keyword "puppy training edinburgh" also improved modestly. "dog training
edinburgh" regressed 4 positions — this is a more competitive head term
and the title shift toward Edinburgh + puppies is the right trade-off.
SERP churn helped: a prior #3 competitor dropped to #5.

**Recommendation:** Hold. The page is on page 1 of results but below the
top 3. The next highest-leverage move is expanding the FAQ section (top 3
competitors have 6-10 entries, you have 2), but wait another 2 weeks
before making more changes so current position stabilizes.

### Changes applied

*(none — verdict was "hold")*

### Git state at end of cycle

- HEAD: `h7i8j9k0`
- File blob: unchanged from prior cycle
- Notes: reviewed only, no edits
```

### Format invariants

- Append-only. Old cycle sections are never rewritten or deleted.
- Each cycle starts with `## Cycle N — YYYY-MM-DD` (optionally followed by `(review)` if it's a pure-review cycle that only compared metrics).
- Frontmatter's `cycles` and `last_verdict` are always updated to reflect the most recent cycle (this is the only frontmatter mutation allowed — the rest is write-once).
- Non-edit cycles (verdict = hold, no changes) still get a full section. The log records the decision to do nothing; that is itself information.
- Cycle numbers are strictly sequential starting from 1.

---

## Git-based drift attribution

The skill uses git as the single source of truth for "what changed between cycles." No parallel hash tracking, no diff storage — git already knows everything needed.

### At end of each cycle (Stage 5)

Record two values in the cycle's "Git state" block:

1. `git rev-parse HEAD` — commit SHA at the moment the cycle finished. Captures the committed state of the repo.
2. `git hash-object {file}` — blob SHA of the file's current on-disk content. Captures uncommitted state too, in case the user doesn't commit the skill's edits immediately.

Run these commands with `cwd` at the project root. Example:

```bash
git rev-parse HEAD
# a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0

git hash-object src/content/services/puppy-classes.md
# 9f8e7d6c5b4a3928107f6e5d4c3b2a1098765432
```

### At start of each review run (Stage 2)

1. Read the stored HEAD and blob SHA from the most recent cycle's "Git state" block in the log.
2. Run `git log {stored-HEAD}..HEAD -- {file}` to list intervening commits touching the file.
3. If the list is non-empty → run `git log {stored-HEAD}..HEAD -p -- {file}` to get the full patches, include them in the verdict context so Claude can reason about specific user changes and commit messages.
4. Run `git hash-object {file}` on the current file; compare to the stored blob:
   - **Match, HEAD unchanged** → no drift. Clean attribution: the skill's edits are the only variable. Verdict narrative can speak with full confidence.
   - **Differ, HEAD moved** → step 3's commit list explains everything. Attribution still possible per-commit.
   - **Differ, HEAD unchanged** → uncommitted user edits. Surface current `git diff {file}` into the verdict context. Flag in verdict: "attribution muddied by uncommitted changes."
5. Whichever branch was taken, the verdict narrative must explicitly state the confidence level:
   - Clean attribution → "Attribution is clean; my cycle-N edits are the only variable."
   - Drift detected → "Attribution is mixed; between cycle N and now, the user made X commits: {list}. Likely influence: {analysis}."

### Fallback when git is unavailable

If any of `git rev-parse HEAD`, `git log`, or `git hash-object` fails (no git installed, directory not a git repo, file not tracked), fall back to content hashing:

1. Store `sha256(file_contents)` as the blob equivalent.
2. On review, compare hashes. If different, flag drift but note: "Drift detection limited — git unavailable. Cannot identify which changes were yours vs the skill's. Verdict confidence reduced."
3. Proceed with the verdict on reduced confidence.

---

## Stage 0.5 — Routing & orchestration

This is the full procedure for Stage 0.5. SKILL.md dispatches here; follow these steps in order.

### Step 1 — Memory config discovery

1. Look for `.config.json` anywhere under the project. Typical locations: `seo-notes/.config.json`, `docs/seo-notes/.config.json`. Use Glob: `**/.config.json`. If multiple match, prefer one at the project root or inside `seo-notes/` or `docs/seo-notes/`.
2. **Config found** → read it. Extract `notes_folder`, `site_url`, `country`. Skip to Step 2.
3. **Config not found** → run the "First-time setup" procedure at the top of this file.

**Notes folder is authoritative for the rest of the session.** Every log read, write, and registry update uses this path. Store it in working memory and never re-ask.

### Step 2 — Detect invocation pattern

| Invocation | How to detect | Go to |
|---|---|---|
| `{page} {keyword}` | Two positional args, neither is `review` or `review-all` | Step 3 |
| `{page}` alone | One positional arg that is a path, not `review-all` | Step 3 |
| `review {page}` | First arg is the literal string `review`, second is a path | Step 3, with `explicit_review = true` |
| `review-all` | First arg is the literal string `review-all` | Jump to **Review-All Mode** below |
| Batch mode | User intent is a directory or collection ("optimize all service pages") | For each URL, run Steps 3-7 independently |

**Disambiguation hazard for `review {page}`:** If the first positional arg is `review`, treat it as the mode keyword and the next arg as the page.

### Step 3 — Identify the target page

1. **Page provided in invocation** → use it directly.
2. **No page provided** → ask: "Which page do you want to optimize? (full path, e.g. `/army-asvab-score`)"
3. **Batch mode** → page is determined per-iteration by the batch loop.

**Resolve and validate the target (Next.js + whitelist):** a slug/URL resolves to `src/app/{slug}/page.tsx` (App Router, file-based — see `references/next-patterns.md` §1). Before treating it as a target, confirm BOTH:

- `src/app/{slug}/page.tsx` exists, AND
- the slug is in the `pages` array of `scripts/generate-sitemap.mjs` (the indexable-page whitelist — see `references/next-patterns.md` §10/§11).

If the slug resolves to a **dynamic / out-of-scope route** (study guide `study/[subtest]/[topicSlug]`, flashcards `flashcards/[deckSlug]`, or any `app`/`account`/auth/practice/gated surface — §11), refuse and redirect to the `asvab-post-writer` skill rather than tracking it. There are no Astro content collections — do not look for `src/content.config.ts` or frontmatter.

### Step 4 — Derive slug and look up the log

1. Derive the slug per the "URL slug derivation" section above.
2. Build the log file path: `{notes_folder}/urls/{slug}.md`.
3. Check if it exists.
4. Classify: `log_exists = true` → review cycle. `log_exists = false` → cycle 1.

### Step 5 — Resolve the target keyword

The resolution depends on (a) whether the user provided a keyword and (b) whether a log exists.

| Case | Condition | Action |
|---|---|---|
| A | Keyword provided, no log | Use the keyword as-is |
| B | Keyword provided, log exists, matches `target_keyword` | Use it |
| C | Keyword provided, log exists, differs from `target_keyword` | Ask: "Switch tracking to `{new_kw}`, or add a parallel log?" Switch → mutate frontmatter; Parallel → new slug/file, proceed as cycle 1 |
| D | No keyword, log exists | Use the log's `target_keyword` verbatim. "Resuming tracking for `{keyword}` (cycle N+1)." |
| E | No keyword, no log | Derive from the page's top GSC query (see below) |

**Case E — GSC keyword auto-detection (PRIMARY; Ahrefs optional):**
1. Call `mcp__gsc__get_search_analytics` filtered to the page (`https://asvabhero.com/{slug}` or its path), `dimensions: ["query"]`, trailing 28 days, ordered by impressions/clicks. The page's **top GSC query** (highest impressions, ideally with reasonable position) is the default target keyword — it's the query Google already most associates with this page.
2. Present the top ~5 GSC queries with clicks/impressions/avg position. Ask the user to confirm the top one or type a different keyword.
3. If Ahrefs is connected, you may optionally enrich with `mcp__ahrefs__site-explorer-organic-keywords` (sort by `volume × (1 / position)` — "closest to winning by traffic potential") to surface volume/KD alongside the GSC list. This is enrichment, not the source of record.
4. If GSC returns nothing (page has no impressions yet) → ask the user directly, showing the page's `metadata.title`/`description` (read from `src/app/{slug}/page.tsx` — see `references/next-patterns.md` §3) as a hint. Do not block on Ahrefs.

### Step 6 — Load prior state (review cycles only)

If `log_exists = true`:
- Read the entire log file.
- Parse YAML frontmatter: `target_keyword`, `cycles`, `first_optimized`, `last_verdict`.
- Extract the most recent cycle's "Git state at end of cycle" — HEAD SHA and file blob SHA. **Store these for Stage 2 drift attribution.**
- If the Git state block is missing (e.g. a log created before git tracking, or an untracked file), note it: Stage 2 will skip drift attribution.
- Extract the previous cycle's metrics table (the "prior baseline" for comparison).
- Load the previous cycle's top-10 SERP composition (Stage 1 diffs against it).

If `log_exists = false`:
- Cycle 1. No baseline, no git state, no verdict narrative in Stage 3.
- If `explicit_review = true` but no log: "No log for this URL yet — I'll run cycle 1 from scratch rather than a review."

### Step 7 — Confirm and start

**First run:** "No prior log for `{page}`. Cycle 1. I'll pull the top 10 from Ahrefs, scrape top 5 competitors, compare against your page. ~2-3 minutes."

**Review run:** "Log found for `{page}`, {N} cycle(s), last touched {days} days ago. Cycle {N+1}. I'll pull fresh metrics, compare against cycle-{N} baseline, check for changes, write a verdict."

**Batch mode:** "Optimizing {N} pages across `{collection}`. Each page tracked independently. ~5-10 minutes."

### Batch mode details

1. Enumerate candidate pages from the `pages` array of `scripts/generate-sitemap.mjs` (the whitelist) intersected with existing `src/app/{slug}/page.tsx` files — not a content collection. Skip out-of-scope routes (`references/next-patterns.md` §11).
2. For keyword hints, derive each page's top GSC query (Case E) or read its `metadata.title` from `page.tsx`. For URLs with an existing log, the log's `target_keyword` wins.
3. Present a table: Page | Keyword | Log state | Volume (if Ahrefs available) | Status.
4. Confirm: "I'll optimize these {N} pages. Adjust any keywords or skip any?"
5. After approval: run Stages 1-2 in parallel, present consolidated Stage 3, optimize sequentially in Stage 4, append each page's log in Stage 5.

**Batch efficiency:** run SERP discovery (WebSearch) per page, scrape each unique competitor URL only once, batch GSC/optional-Ahrefs metric pulls, present ONE consolidated gap summary.

### Review-All Mode (portfolio dashboard)

1. Read `{notes_folder}/index.json`. If missing/malformed, rebuild by scanning `urls/*.md` frontmatter.
2. For each URL: pull current GSC avg position for the target query only (one `mcp__gsc__get_search_analytics` call per URL, no SERP re-pull, no scrape; optional Ahrefs position if connected). Compute delta vs last cycle. Read stored `last_verdict` verbatim from index.
3. Print dashboard:

   ```
   URL                              Cycles  Last reviewed  Target KW pos (Δ)  Verdict
   /services/puppy-classes          3       18 days ago    6 (▲ 6)             win-hold
   /services/private-training       2       25 days ago    9 (▼ 1)             inconclusive-wait
   ```

4. Ask: "Drill into any of these? (name one or 'no')"
5. **Read-only.** No changes, no SERP analysis, no approval gate.
6. If user drills in → invoke normal single-URL review flow from the top. Do not resume from the lightweight state.

---

## Stage 2 — Drift attribution procedure

On a review cycle where Stage 0.5 Step 6 loaded git state, run this procedure during gap analysis (Stage 2).

**If no git state was loaded** (external-CMS pages, missing block) → skip entirely. Note in verdict: "Drift detection unavailable for this page."

**Steps (when git state is available):**

1. Use the stored HEAD SHA and file blob SHA from Step 6.
2. Run `git log {stored-HEAD}..HEAD -- {file}` to list intervening commits.
3. If non-empty → `git log {stored-HEAD}..HEAD -p -- {file}` for full patches. Include in verdict context.
4. Run `git hash-object {file}` on the current file; compare to stored blob.
5. Classify:
   - **HEAD unchanged AND blob matches** → Clean attribution.
   - **HEAD advanced AND blob matches** → Clean (other files changed, not this one).
   - **HEAD advanced AND blob differs** → Mixed. User committed changes. `git log -p` shows what.
   - **HEAD unchanged AND blob differs** → Muddied. Uncommitted user edits. Run `git diff {file}`.
6. Record the classification for the Stage 3 verdict.

**Fallback when git fails:** SHA-256 of file contents. Compare to stored hash. "Drift detection limited — git unavailable."

---

## Stage 3 — Verdict procedure (review cycles only)

Produce the verdict BEFORE the gap summary. The verdict evaluates the *prior* cycle's hypothesis; the gap summary informs the *next* cycle.

### Inputs

- Prior cycle's hypothesis (from the log)
- Prior cycle's baseline metric basket (from the log)
- Current fresh metric basket (from Stage 1)
- Drift classification (from Stage 2)
- SERP composition changes (from Stage 1)
- Intervening commits and patches (from Stage 2, if drift)
- The full log history — look for patterns across cycles

### What to write

1. **Fresh metrics vs baseline table** — keyword | before | now | delta.
2. **SERP composition changes** — who moved, entered, dropped out. "SERP is stable" if none.
3. **Drift attribution** — one paragraph:
   - Clean: "Attribution is clean; the only edits between cycles were mine."
   - Mixed: "Between cycle N and now, the user made X commits: {list}. Likely influence: {analysis}."
   - Muddied: "Attribution is muddied by uncommitted user edits."
   - Fallback: "Drift detection limited — git unavailable."
4. **Verdict narrative** — 3-6 sentences: did the hypothesis pan out, likely cause, collateral effects on secondary keywords, confidence, recommended next step. Be honest — "hold" and "regression" are valid outcomes.
5. **Recommendation** — pick one canonical `last_verdict` value:

   | Value | When to use | Next step |
   |---|---|---|
   | `win-hold` | Rankings improved, trajectory good, don't destabilize | No changes. Stage 4 is a no-op. |
   | `win-iterate` | Rankings improved AND gap summary identifies high-leverage moves | Proceed to gap summary and approval gate. |
   | `loss-revert` | Regressed AND drift attribution fingers a specific skill edit | Propose reverting the edit. Approval gate. |
   | `loss-pivot` | Regressed/stalled AND prior hypothesis disproven | Propose different strategy. Approval gate. |
   | `inconclusive-wait` | Noise-level movement, <14 days, or drift muddied beyond usefulness | No changes. Wait longer. |

   This value is passed verbatim to Stage 5 as `last_verdict`. No translation.

---

## Stage 5 — Log append procedure

After Stage 5 verification (build check, change summary), persist the cycle. Follow this procedure exactly.

### 1. Capture git state

- Run `git rev-parse HEAD` — record the commit SHA.
- Run `git hash-object {target-file}` — record the file blob SHA.
- If either fails (no git / untracked file), fall back to SHA-256 of file contents.

### 2. Build the cycle section

Use the log format templates above ("File template" for cycle 1, "Review cycle template" for cycle N+1).

- **Cycle 1:** `## Cycle 1 — YYYY-MM-DD`, status, baseline metrics table, hypothesis, changes-applied bullets, git state block.
- **Cycle N+1:** `## Cycle N — YYYY-MM-DD (review)`, status, days since last cycle, fresh metrics vs baseline table, SERP composition, drift check, verdict, recommendation, changes applied (empty if "hold"), git state block.

### 3. Write to the log file

- **Cycle 1:** create `{notes_folder}/urls/{slug}.md` with YAML frontmatter + header + cycle 1 section.
- **Cycle N+1:** read existing log, append new section after the last horizontal rule, update frontmatter's `cycles` (increment) and `last_verdict`.

### 4. Update the registry

- Read `{notes_folder}/index.json`.
- **Cycle 1:** append new entry with `url`, `target_keyword`, `log_file`, `first_optimized`, `last_reviewed`, `cycles: 1`, `last_verdict: "first-run"`.
- **Cycle N+1:** update `last_reviewed`, increment `cycles`, set `last_verdict` verbatim from the Stage 3 recommendation.
- Write `index.json` back.
- **If the index update fails** (disk full, permissions): "Cycle logged, but registry update failed. Will rebuild on next run." Don't fail the cycle.

### 5. Confirm

> "Cycle {N} logged to `{notes_folder}/urls/{slug}.md`. Registry updated."

---

## Cycle lifecycle (summary)

**First cycle (cycle 1):**
1. Stage 0.5 → no log found → cycle 1 flow.
2. Stage 1 → full SERP + competitor scrape.
3. Stages 2-4 → normal (no drift check, no verdict).
4. Stage 5 → create new log file, no prior state.

**Review cycle (cycle N+1):**
1. Stage 0.5 → log found → load prior state.
2. Stage 1 → re-pull metrics, diff SERP (re-scrape only on churn).
3. Stage 2 → gap checks + drift attribution.
4. Stage 3 → verdict + gap summary + approval gate.
5. Stage 4 → apply (or no-op for "hold").
6. Stage 5 → append to log, update registry.

**Review-all mode:**
1. Stage 0.5 → load index, lightweight metric pull per URL, dashboard, drill-down.

---

## Edge cases

- **First cycle, no prior SHA** → drift check and verdict sections are omitted from the cycle-1 log section. Cycle 1 just records baseline, hypothesis, changes, and git state.
- **User deletes `.config.json`** → first-time setup re-runs. Safe and cheap.
- **User deletes a log file** → next run on that URL is cycle 1 again.
- **`index.json` out of sync with `urls/`** → rebuild by scanning every log file's frontmatter. Silent fix.
- **User invokes with a different keyword than the log's `target_keyword`** → ask: "This page is being tracked for `{old_kw}`. Switch tracking to `{new_kw}`, or add a parallel log?" Switching mutates frontmatter's `target_keyword` and resets `last_verdict` to `first-run` (the new keyword has no prior cycle to compare against); parallel creates a second log file `urls/{slug}-{new_kw_slug}.md` and a separate `index.json` entry.
- **Fresh start on an existing log** → ask: "This URL has a log with {N} cycles. Continue review mode, or archive and start fresh?" Archive renames to `urls/{slug}-archived-{YYYY-MM-DD}.md` and removes it from the registry.
- **Out-of-scope target requested (study guide / flashcards / app / gated route)** → refuse and redirect to the `asvab-post-writer` skill (`references/next-patterns.md` §11). Do not create a log for it.
- **Git available but file not yet committed** → `git log` returns empty; `git hash-object` still works. Proceed with blob comparison only.
- **Slug collision** → append numeric suffix and record the chosen slug explicitly in `index.json`.
- **Keyword auto-detection on first run when GSC returns no impressions for the page** → fall back to asking the user directly, showing the page's `metadata.title`/`description` (from `src/app/{slug}/page.tsx`, `references/next-patterns.md` §3) as a hint. Optional Ahrefs enrichment if connected; never block on it.
- **`review-all` with > 20 URLs** → the batch metric pulls are the bottleneck. Batch Ahrefs calls where possible (comma-separated keywords); rate-limit to avoid API throttling; show per-URL progress.
