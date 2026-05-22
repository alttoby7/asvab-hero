# Content Optimization Reference (ASVAB Hero / Next.js)

How to apply on-page optimizations to ASVAB Hero ranking pages. Every page is a Next.js 15 static-export `src/app/{slug}/page.tsx` — you edit TypeScript/JSX, not markdown or frontmatter.

**This doc assumes you have read the keystone contract `references/next-patterns.md`.** It governs page anatomy, the rendered-title rule (§2), metadata editing (§3), H1+body JSX with design tokens (§4), JSON-LD variants + freshness (§5), the FAQ Pattern A/B sync policy (§6), component preservation (§7), internal links (§8), and build/verify via `out/{slug}.html` (§9). The steps below tell you *what to write*; next-patterns tells you *the exact mechanics*. Where they reference a section number, follow that section verbatim — do not paraphrase or contradict it.

Follow this order — each step builds on the previous.

---

## Before You Start

1. **Read the entire target `src/app/{slug}/page.tsx` first.** Understand the voice, structure, and existing JSX before changing anything. This file IS the page — there is no separate route/layout to consult for content (the only layout-level behavior that matters is the title template, covered in next-patterns §2).
2. **Confirm the page is in scope.** It must be a ranking page whitelisted in `scripts/generate-sitemap.mjs` (next-patterns §11). Study guides (`study/[subtest]/[topicSlug]`), flashcards, and app/account/auth/practice surfaces are OUT OF SCOPE — skip them and point the user to the `asvab-post-writer` skill.
3. **Identify the page type** from the next-patterns §11 taxonomy: Article, Score hub, Calculator/tool, or Interactive. Schema type and FAQ pattern differ by type.
4. **Identify the JSON-LD authoring variant — (a) inline object literal or (b) hoisted `const` — per next-patterns §5, BEFORE editing any schema or freshness date.** On variant-(b) pages you edit the module-level `const`, not a copy inside the JSX.
5. **Identify the FAQ pattern — A (duplicated) or B (shared array) — per next-patterns §6, BEFORE touching any FAQ.** Run the §6 detection checklist; the editing rule is completely different between the two.
6. **Preserve the page's voice.** ASVAB Hero copy is direct, second-person, numbers-forward, and confident ("The short answer: AFQT 31 with a high school diploma"). Match it. See the Voice Match Note ritual in Optimization 3.

> There is no Zod schema, no `src/content.config.ts`, no `.passthrough()`, and no frontmatter. Do not look for them and do not gate edits on "is this field allowed" — the editable surface is a typed `Metadata` object plus hand-authored JSX.

---

## Optimization 1: Title Tag and Meta Description

Edit the typed `export const metadata: Metadata = { ... }` object at the top of `page.tsx` (next-patterns §3).

### Title Tag

Edit the `metadata.title` string. **The browser/HTML `<title>` is the RENDERED string, which is the source string + ` | ASVAB Hero` (the root layout template appends it — next-patterns §2). ALL length/pixel-budget math uses the rendered string, never the source string.**

**Rules:**
- Primary keyword at or near the front of the rendered title.
- Budget the **rendered** title (source + 13 chars for ` | ASVAB Hero`). Target ~55–60 rendered chars; Google truncates on pixel width, not exact count, so keep the source string roughly under ~47 chars when the suffix will be appended.
- **Double-suffix fix (next-patterns §2):** if the source `title` string ALREADY ends with `| ASVAB Hero` (or any ` | …` suffix), the rendered title is double-suffixed (e.g. `… | ASVAB Hero | ASVAB Hero`) — a real on-page defect. When you optimize that title, **strip the manual suffix** so the template adds it exactly once. Treat this as a fix, not something to preserve.
- Never ADD a manual ` | ASVAB Hero` suffix — the template already does it. There is no `absolute:` override in use; if you ever genuinely need a suffix-free title, flag it rather than doing it silently.
- Include a number or year if competitors do, but it must read naturally.

**Pattern (double-suffix fix, from `how-to-study-for-the-asvab`):**
```tsx
// Before — source already hardcodes the suffix; rendered = "… 8-Step Plan | ASVAB Hero | ASVAB Hero" ❌ double
title: "How to Study for the ASVAB: 8-Step Plan | ASVAB Hero",

// After — strip manual suffix; rendered = "How to Study for the ASVAB: 8-Step Plan | ASVAB Hero" ✅ single
title: "How to Study for the ASVAB: 8-Step Plan",
```

**Pattern (clean title, no manual suffix — from `army-asvab-score`):**
```tsx
// Source (64 chars) — rendered as "… GT Guide (2026) | ASVAB Hero" (77 chars). Budget against the rendered value.
title: "Army ASVAB Scores: Line Scores, MOS Requirements, GT Guide (2026)",
```

**Show the change to the user** with the RENDERED length:
> Title: "How to Study for the ASVAB: 8-Step Plan | ASVAB Hero" (rendered 65 chars — double-suffixed, defect) -> "How to Study for the ASVAB: 8-Step Plan" (rendered 52 chars). Stripped the duplicate ` | ASVAB Hero` and shortened to fit SERP display.

### Meta Description

Edit the `metadata.description` plain string. No template is applied — what you write is what ships.

**Rules:**
- 120–155 characters.
- Include the primary keyword naturally (Google bolds matching terms in the SERP).
- End with a CTA or value proposition; be specific with numbers and unique angles.
- Don't open with "This article…" / "In this post…".

**Pattern (from `army-asvab-calculator`):**
```tsx
description:
  "Enter your 9 ASVAB subtest scores. Instantly see your AFQT, all 10 Army line scores (GT, CL, CO, EL, FA, GM, MM, OF, SC, ST), and every Army MOS you qualify for. Free, no signup.",
```

### Canonical and other metadata

- **`alternates.canonical`** — MUST be `https://asvabhero.com/{slug}` with **NO trailing slash**. Never change the canonical to a different slug during an on-page edit (that's a routing change, out of scope).
- Do NOT add OpenGraph/Twitter/robots unless asked — the root layout provides site-wide defaults. There is no schema to "check" before adding a field; you simply don't add unrequested metadata.

---

## Optimization 2: H1 and Heading Structure

### H1 — exactly one, already in JSX

The H1 lives in JSX (next-patterns §4), not in frontmatter and not auto-rendered from the title. **There is exactly one H1 per page — never add a second.** On Article/score-hub pages it sits inside `<article className="prose-asvab">`; on calculator/interactive pages it's in a plain `<div>`/`<header>`.

- The title tag (Opt 1) and the H1 are separate strings and *should* differ — note how `army-asvab-score` uses a tight title (`Army ASVAB Scores: Line Scores, MOS Requirements, GT Guide (2026)`) but a fuller H1 (`Army ASVAB Scores: The Complete Guide to Qualifying, Line Scores, and Career Advancement`). Optimize the H1 to carry the primary keyword without parroting the title verbatim.
- Do NOT insert a markdown `#` heading anywhere — there is no markdown renderer; a raw `#` prints literally.

**H1 shape (verbatim from `army-asvab-score`):**
```tsx
<h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
  Army ASVAB Scores: The Complete Guide to Qualifying, Line Scores, and Career Advancement
</h1>
```

### Heading restructure

New H2/H3 sections are authored as JSX using the verbatim shapes and design tokens in next-patterns §4. Map current → target headings against the gap analysis (each must-have subtopic gets an H2, supporting points get H3), keep existing headings that cover valid subtopics, and put the keyword in 2–3 headings (not all).

**H2 + paragraph (verbatim from `army-asvab-score`):**
```tsx
<h2 className="mt-12 font-display text-2xl font-bold text-text-primary">
  Minimum ASVAB Score for Army Enlistment
</h2>
<p className="mt-4 text-text-secondary">
  The short answer: AFQT 31 with a high school diploma, AFQT 50 with a GED.
</p>
```

**H3 subsection (verbatim from `army-asvab-score`):**
```tsx
<h3 className="mt-6 font-display text-lg font-bold text-text-primary">
  The AFCT (Armed Forces Classification Test)
</h3>
```

> Maintain hierarchy (H2 → H3, no skips). Present the restructured outline before writing:
> **Proposed heading structure:**
>   - H2: Minimum ASVAB Score for Army Enlistment (existing)
>   - H2: How Army Line Scores Work (existing)
>     - H3: The AFCT (existing)
>   - H2: ASVAB Retake Rules by State (NEW)
>   - H2: Army ASVAB Scores FAQ (existing — see Opt 6)

On **calculator/interactive pages**, section headings live inside `<section>` card `<h2>`s (e.g. `army-asvab-calculator`'s "The 10 Army Line Score Formulas") — match that, not `prose-asvab`.

---

## Optimization 3: New Content Sections (highest impact)

This is the highest-leverage optimization. The verification gate, voice ritual, and quality floor below are framework-agnostic and apply unchanged. What changes for Next.js: **sections are authored as JSX (not markdown)** and inserted between existing JSX sections.

### Pre-flight voice observation (required before writing any new section)

Before writing a single sentence of a new H2 section:

1. Read 2–3 existing H2 sections on the target `page.tsx` in full. Pick substantial body copy (not one-line intros or component-rendered lists).
2. Write 3–5 observation bullets naming concrete voice moves you see. Be specific — not "casual tone" but: first-person or second? Contractions or none? Sentence-fragment openers ("The short answer:")? Numbered examples or prose? Specific scores/jobs/programs named inline (AFQT 31, 68W, BSEP)? US spelling? Recurring transitions?
3. Reference those observations explicitly when drafting.

Report this as a visible **Voice Match Note** before drafting or editing:

- Observed POV and formality.
- Sentence and paragraph shape.
- Specificity pattern: numbers, examples, named tools/scores/jobs, first-hand claims.
- Attitude: neutral, opinionated, skeptical, punchy, tutorial, etc.
- Exact moves the new copy will copy.

If no Voice Match Note appears in the transcript, the voice check did not happen. Keep it short: five bullets max.

If you skip this ritual, the new section reads AI-written regardless of what the rest of this file says. This is not optional — it is the single step that prevents 4.7 from defaulting to sterile SEO-voice.

### Effort level check

If you do not know the session's effort level, ask now: "Writing new H2 sections works best at `high` or `xhigh` effort. OK to continue at current effort?"

At `low` or `medium` effort, 4.7 produces thin body copy that meets the 300–500 word rule but carries no specific evidence, no numbers, and no named entities. You will write a section, the user will reject it, you will rewrite it. Save the round-trip by checking effort first.

### Forbidden-defaults check

Load `references/copy-vocabulary.md` §1 before drafting any new section, new meta description, or new FAQ answer. When the draft is complete, ctrl-F each forbidden word (from §1 body-copy list, connective-filler list, and SEO-marketer-voice list) and replace any that appear using the specificity replacements in §2. Run the §6 self-check before handing the draft to the user. Do not present a draft with *comprehensive, engaging, thorough, in-depth, valuable, actionable,* or any connective-filler phrase anywhere in it.

### Factual Verification Gate (CRITICAL for volatile claims)

Before writing any new section that makes changeable factual claims, apply a
practical trust standard. This includes pricing, availability, laws, policies,
score minimums, line-score thresholds, MOS/rating requirements, GT/AFQT cutoffs,
retake/wait rules, program details (BSEP, FSPC, AFCT), bonuses, certifications,
statistics, dates, and similar claims that could be wrong or out of date. On
ASVAB Hero these score and eligibility numbers ARE the volatile claims — treat
them with full rigor.

If the claim is already in a high-quality existing article or supplied source
material, you can reuse it when you are preserving or summarizing it and there
are no stale, contradiction, high-risk, or low-trust signals. Do not spend the
run rechecking every fact in a trusted page. That makes the skill uselessly slow.

If the claim is new, materially changed, sharpened into a more specific claim,
high-stakes, contradicted by research, or obviously time-sensitive, verify it
against credible sources that match the topic. If verification is unavailable or
conflicting, **do not write the claim into the file**. Stop and ask the user to
verify, or rewrite the section so it avoids the volatile claim. Your training
data may be months out of date. Getting facts wrong in published content is
worse than not adding the section at all.

This gate is not satisfied by weak competitor articles, Ahrefs snippets, memory,
or "I know this" model recall. For claims needing fresh verification, you need a
subject-matched source check in the transcript (`WebSearch`, `WebFetch`, official
pages, primary sources, professional bodies, official military/recruiting pages,
or credible references already in the repo).

"Already in the article" is allowed only as a trust basis for preserving or
summarizing claims from a high-quality source article. It is not enough when the
claim is new, high-stakes, contradicted, obviously stale, or made more specific.

Examples of claims that need verification:
- "The Army minimum AFQT is 31 with a diploma, 50 with a GED" (score minimums change; verify against goarmy.com / officialasvab.com)
- "GT 110 is required for warrant officer with no waivers" (threshold + waiver policy)
- "FY26 Army enlistment bonuses range up to $50K" (bonus figures and fiscal year)
- "BSEP averages a 19-point GT increase" (program statistics)
- "The AFCT replaces all previous scores" (policy rule)
- Retake wait periods, FSPC eligibility ranges, MOS line-score cutoffs, dated statistics

**How to handle it:** Build a claim ledger before the approval gate, then only
write approved, sourced claims:

1. List every volatile claim the proposed new content would add or modify.
2. For each claim, record the trust basis: `existing trusted article`,
   `supplied source material`, `official`, `first-party`, `reputable
   third-party`, `forum/commentary`, or `none`; plus confidence and action.
3. Include the verification method in the ledger: `WebFetch`, `WebSearch`,
   official docs read from the repo, or `none`.
4. Include the exact source URL or local file path when fresh verification was
   used. Vague source labels like "official docs", "public knowledge", "source
   checked", or "the recruiting website" are not enough.
5. Claims with only weak or unclear evidence should default to `do not publish`
   unless the user explicitly accepts the weaker evidence.
6. After editing, include the claim ledger summary in the memory log.

Present the new sections as drafts with flagged claims before committing:
> "I've drafted the new section. It claims the Navy minimum AFQT is 35 and that
> nuclear field (NF) requires a 60+ AR+MK+EI+GS composite. I confirmed the AFQT
> 35 against navy.com but couldn't find a current primary source for the exact NF
> composite, so I'll caveat or remove that second figure unless you confirm it."

For volatile topics, include a small claim checklist in Stage 3 before the approval gate:

| Claim | Source | Confidence | Action |
|---|---|---|---|
| Army minimum AFQT is 31 (diploma) | goarmy.com / officialasvab.com | High | Safe to mention |
| FY26 bonus up to $50K for critical MOS | Current recruiting page | Medium | Verify wording + fiscal year |
| BSEP averages +19 GT points | Unverified blog post only | Low | Do not publish unless verified |

If the claim ledger contains `Do not publish` items, remove or generalize those
claims before editing the file. Do not leave them in the draft and hope the
build/lint catches them. It won't — the build does not validate factual content.

For pages with volatile factual claims, do a trust sweep before the approval
gate:

- Identify every current factual claim in the proposed new copy that could be
  wrong, outdated, high-stakes, or trust-sensitive.
- Decide whether each claim can safely rely on the existing article/source
  material or needs fresh verification. Fresh verification is needed for new,
  materially changed, sharpened, high-stakes, contradicted, obviously stale, or
  low-trust claims.
- When fresh verification is needed, fetch or read at least one credible current
  source for each subject you will mention. The source must match the subject of
  the claim.
- Source matching is subject-specific. An official branch recruiting page can
  verify that branch's AFQT minimum or bonus. officialasvab.com can verify
  testing/scoring mechanics. A specific MOS/rating publication can verify a line
  score cutoff. A source for one subject never verifies a claim about another
  subject.
- Score minimums, line-score thresholds, bonuses, retake rules, program stats,
  fiscal-year figures, certifications, dated statistics, and policy claims must
  each map to a reasonable trust basis. For high-stakes or newly introduced
  claims, that means a credible current source for the subject named in the claim.
- "Existing article facts", "already established in article body", and "uses
  only existing article facts" are acceptable only when the existing article is
  the trusted source material, the claim is not being made more specific, and
  there are no stale/contradiction/high-risk signals.
- If a needed trust basis cannot be reached, use non-volatile wording only or
  remove the claim.
- Never invent source confidence. If the transcript does not show the fetch or
  file read, the claim is unsourced.

Before editing, reconcile the exact proposed draft against the ledger:

1. For each new or changed paragraph, FAQ answer, bullet, table row, title/meta
   field, callout, and JSON-LD field, list the volatile claims it contains.
2. Confirm each claim has a subject-matched official/current source.
3. Delete or generalize any sentence that cannot be reconciled.
4. Only then edit the file.

This does NOT apply to structural SEO content (headings, internal links, keyword placement, FAQ formatting). Those are safe to write without verification. It only applies to factual claims that could be wrong, stale, or topic-sensitive.

### Content Quality Rules — write this, not that

Every new section passes the 6-row paired check below. For the full vocabulary and the 7-item self-check, load `references/copy-vocabulary.md` (§§1, 2, 6).

| Instead of (bad) | Write (good) |
|---|---|
| "There are many factors that determine which Army job you qualify for." | "Two gates decide your job: the AFQT minimum to enlist, and 10 line-score composites that determine which MOS you can negotiate. You clear both or you don't qualify." |
| "In today's competitive military, it's important to note that your ASVAB score matters." | "GT below 100 doesn't just limit your first job — it blocks warrant officer packets, OCS, and most reclass paths for your entire career." |
| Repeating a point the page already made in a new paragraph | Linking back to the section that already covered it, or cutting the repetition and moving on |
| 400 words of unbroken prose | 2–3 paragraphs separated by a table, a stats row, or a bolded callout (`<aside>`) |
| "Army asvab scores are important. When choosing army asvab scores, the best army asvab scores use army asvab scores methods." | "Your AFQT gets you in the door; your line scores decide which jobs you can pick. VE alone feeds 6 of 10 Army composites." |
| Asserting a volatile threshold as current fact | Draft the section, then surface the claim: "I'd write 'Cyber Operations (17C) requires GT 110 + ST 112.' Can you confirm that's still current?" |

### Section length and formatting floor

Every new section: 300–500 words, at least one bulleted list OR table OR `<aside>` callout OR stats row, the primary or a secondary keyword in the heading or first paragraph, and the voice moves from `references/copy-vocabulary.md` §3 where they fit naturally. Match the voice of the existing sections on the target page per the pre-flight ritual.

### Authoring the section as JSX (Article / score-hub pages)

New sections are `prose-asvab` JSX, authored with the verbatim shapes and design tokens in next-patterns §4 (tables wrapped in `overflow-x-auto`, `<aside>` callouts colored by kind, stats rows, mono spans). **Insert them between existing JSX sections** — typically before the closing CTA box and the related-links `<section>`, after the most related existing section. Never:
- at the very top (the intro is fine),
- inside a component (`EmailCapture`, `VerifiedBlock`, `Calculator`, etc.),
- inside the FAQ block (FAQ edits follow Opt 6).

**Table (verbatim shape from `army-asvab-score`):**
```tsx
<div className="my-4 overflow-x-auto">
  <table className="w-full text-sm">
    <thead>
      <tr className="border-b border-navy-border">
        <th className="pb-2 pr-4 text-left font-semibold text-text-secondary">Category</th>
      </tr>
    </thead>
    <tbody className="text-text-secondary">
      <tr className="border-b border-navy-border/50">
        <td className="py-2 pr-4 font-mono">93&ndash;99</td>
        <td className="py-2">First pick of every MOS.</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Callout (`<aside>`; color signals the kind — accent=Key Point, emerald=Tip, amber=Warning):**
```tsx
<aside className="my-6 rounded-lg border-l-4 border-accent bg-navy p-4">
  <p className="text-sm font-semibold text-text-primary">Key Point</p>
  <p className="mt-1 text-sm text-text-secondary">…</p>
</aside>
```

### Authoring the section (Calculator / interactive pages)

These pages do NOT use `prose-asvab`. Add content as standalone `<section>` cards matching next-patterns §4:
```tsx
<section className="mt-8 rounded-xl border border-navy-border bg-navy-light p-6">
  <h2 className="font-display text-xl font-bold text-text-primary">
    Line Score Requirements for 10 Popular Army MOS
  </h2>
  <p className="mt-3 text-text-secondary">…</p>
</section>
```
These pages frequently render rows/FAQs by `.map()`-ing an inline array (see `army-asvab-calculator`). Match that pattern; place new cards after the existing cards, before the `EmailCapture` and branch-CTA sections.

### TSX BUILD-BREAKAGE GUARD (run before every section edit)

JSX is compiled, not rendered as markdown. A malformed section breaks `next build` for the whole site. Before saving, verify:

- **Balanced tags.** Every `<h2>`, `<p>`, `<div>`, `<aside>`, `<table>`, `<section>`, `<ul>`, `<li>` opens and closes. Self-closing tags end `/>`.
- **`className`, not `class`.** JSX uses `className`. Also `colSpan` (not `colspan`), `htmlFor` (not `for`).
- **HTML entities for special characters in text.** Match the codebase convention:
  - `&` → `&amp;` (e.g. `Auto &amp; Shop`, `Intelligence &amp; Cyber`)
  - apostrophes → `&apos;` (e.g. `don&apos;t`, `you&apos;re`)
  - en-dash ranges → `&ndash;` (e.g. `93&ndash;99`, `10&ndash;30`)
  - curly quotes → `&ldquo;` / `&rdquo;` (e.g. `&ldquo;career-saving&rdquo;`)
- **No stray markdown.** No `#`, `##`, `-` bullets, or `[text](url)` link syntax — they print literally. Use `<h2>`, `<ul><li>`, and `<Link>` (Opt 5).
- **Single H1 preserved.** New sections start at `<h2>`. Never add a second `<h1>`.
- **Content must live in a server component.** Ranking-page bodies are server components by default. If your new JSX is inside (or imported into) a `"use client"` boundary, it may render empty in the static HTML — verify it appears in `out/{slug}.html` (next-patterns §9). The H1/body of an in-scope page should never be behind `"use client"`.

---

## Optimization 4: Topical Coverage and Keyword Placement

Modern Google uses semantic understanding, not keyword counting. Don't target a density percentage — cover the topic naturally and place the keyword in the right positions.

### Primary keyword placement (positions, not density math)

Ensure the primary keyword appears naturally in:
- **`metadata.title`** (handled in Opt 1)
- **`metadata.description`** (handled in Opt 1)
- **First 100 words of the visible JSX body** — the first `<p>` of the article body or first rendered `<section>`. (See `army-asvab-score`'s opener: "your **army asvab scores** are what actually determine your job…".)
- **2–3 JSX `<h2>`/`<h3>` subheadings** — not all of them.
- **Image alt text** — the `alt` prop on `DvidsHeroImage` / `BrandHero` (next-patterns §7). You may improve `alt` for accessibility/SEO; do not remove `credit`/`dvidsUrl`.
- **1–2 FAQ answers** if FAQs exist (Opt 6).

**Do NOT count occurrences or calculate percentages.** If the keyword appears in the positions above and reads naturally, it's enough.

### Secondary keywords and "also talk about" terms

- Weave 5–10 secondary keywords throughout where they add clarity or cover a subtopic.
- "Also talk about" / semantic terms from the SERP analysis (GSC queries the page ranks for, WebSearch related/PAA, optional Ahrefs related-terms) are topic signals — incorporate them as natural mentions, not forced insertions, each where it's genuinely relevant.

### How to insert without sounding forced

**Good:** "Your AFQT gets you in the door; your **army asvab scores** decide which jobs you can pick."
**Bad:** "Army asvab scores are important. When choosing army asvab scores, you need the best army asvab scores."

Read the sentence aloud. If it sounds human, keep it. If it sounds optimized, rewrite it.

---

## Optimization 5: Internal Links

Internal links are `next/link` `<Link>` inside prose JSX or component children — never markdown link syntax (next-patterns §8).

### Finding related pages

1. **By topic:** grep the primary/secondary keywords across `src/app/*/page.tsx` (titles, descriptions, body).
2. **By directory:** list `src/app/*/page.tsx` directories for sibling ranking pages.
3. **Cross-check the whitelist:** only link to slugs present in the `scripts/generate-sitemap.mjs` `pages` array (next-patterns §10/§11) so you don't link to out-of-scope or non-existent routes.

### Adding outgoing internal links

- Add 3–5 contextual links placed within body prose — not as a dump at the bottom (a curated related-links `<section>` at the end is fine and already exists on score-hub pages; that's separate from inline contextual links).
- **`href` is the slug with a leading slash and NO trailing slash:** `/army-asvab-score`, never `/army-asvab-score/`.
- **Verify the target route exists before adding the link:** `src/app/{target}/page.tsx` must exist. A broken internal link in static export is a 404, not a redirect.
- Match neighboring link styling. In prose: `className="text-accent underline hover:text-accent-hover"` (some inline links omit `underline` — match the section).

**Pattern (verbatim from `army-asvab-score`):**
```tsx
<p className="text-text-secondary">
  If you already have your scores, plug them into our{" "}
  <Link href="/calculator">free ASVAB score calculator</Link> to see which Army jobs you qualify for right now.
</p>
```

### Adding incoming internal links

For each related page you find, suggest a link back to the optimized page:
> **Incoming link opportunities:**
> 1. `/army-asvab-calculator` — link to the score guide from the calculator intro
> 2. `/asvab-score-requirements` — branch hub should link to the per-branch page
> 3. `/gt-score` — mention the branch score page where relevant

**Ask before editing other pages:** "I found 3 pages that should link to this one. Want me to add those links too?"

---

## Optimization 6: FAQ Optimization

**Detect the FAQ pattern first (next-patterns §6 detection checklist).** The editing rule depends entirely on it. Do not assume — run the check every time.

### Pattern detection (next-patterns §6)

1. Find the `FAQPage` block (`grep "FAQPage"` in the file).
2. Is `mainEntity` built from `.map()` over a top-level `const` that is ALSO mapped into the visible list? → **Pattern B** (shared array — only `free-asvab-practice-test`).
3. Otherwise → **Pattern A** (duplicated — the dominant case, ~61 pages).

> Watch the calculator look-alike: `army-asvab-calculator` `.map()`s over an *inline* array literal for the visible FAQ, but that array is NOT shared with a schema generator — that is still Pattern A behavior. The single-source test is whether the *same named const* feeds both `mainEntity` and the visible list.

### Pattern A — DUPLICATED (edit BOTH surfaces, verify parity)

The question/answer text is written twice: once in the `FAQPage` `mainEntity[]` schema (top of file) and again in the visible JSX (bottom). They are NOT linked.

**RULE:** edit BOTH the visible JSX `<h3>`/`<p>` (or `<dt>`/`<dd>`) AND the matching `mainEntity` schema object. Adding a FAQ means adding both; removing one means removing both. After editing, re-read both and confirm the question text and answer wording match — **modulo the one allowed difference:** the visible JSX may contain `<Link>` markup and `&apos;`/`&ndash;` entities while the schema `text` is plain prose. The *meaning and wording* must match. Drift between the two is itself a defect.

**Schema entry + visible entry (from `army-asvab-score`, same Q&A in both places):**
```tsx
// schema, in mainEntity[]:
{ "@type": "Question",
  name: "What GT score do I need for Army warrant officer?",
  acceptedAnswer: { "@type": "Answer",
    text: "GT 110. No waivers are granted for this threshold. ..." } },

// visible JSX:
<h3 className="font-display text-base font-bold text-text-primary">
  What GT score do I need for Army warrant officer?
</h3>
<p className="mt-1 text-sm text-text-secondary">
  GT 110. No waivers are granted for this threshold. ...
</p>
```

### Pattern B — SHARED ARRAY (edit the array ONLY)

`free-asvab-practice-test` defines one `faqItems` array and feeds both the schema (`mainEntity: faqItems.map(...)`) and the visible list from it.

**RULE:** edit the `faqItems` array ONLY. Both surfaces update automatically. Do NOT also hand-edit JSX or schema — that creates drift.

### FAQ content quality (both patterns)

- 40–80 words per answer.
- Answer the question in the first sentence; add one supporting detail or example.
- Include a keyword naturally where it fits.
- Match the voice of existing FAQ answers on the page.
- Keep genuinely useful page-specific FAQs; add 2–3 new ones matching PAA / competitor FAQ data; reorder so the most-searched questions appear first.

---

## Optimization 7: Update Freshness Date

There is no frontmatter date field. Freshness lives in the **Article JSON-LD `dateModified`** (next-patterns §5).

**After a substantive content edit:**
- **Update `dateModified` to today's ISO date (`"YYYY-MM-DD"`).** Use the actual current date.
- **NEVER touch `datePublished`** — it's the original publish date; changing it harms credibility/E-E-A-T.
- On a **variant-(b)** page (hoisted `const`, next-patterns §5), edit the `dateModified` in the module-level `const` (e.g. `articleJsonLd`), not a copy inside the JSX.
- **`WebApplication` (calculator) and `Quiz` (practice-test) schemas carry no date fields — do NOT add one.** A pure metadata/UX edit to a calculator page has no freshness field to bump; that's expected.

**Pattern (variant-a Article, from `how-to-study-for-the-asvab`):**
```tsx
// Before
datePublished: "2026-03-18",
dateModified: "2026-03-18",

// After a substantive edit on 2026-05-22 — only dateModified moves
datePublished: "2026-03-18",
dateModified: "2026-05-22",
```

---

## Component Preservation (next-patterns §7)

In-scope pages embed shared components. **Add content around them; never rewrite their props or internals.** Full prop tables and rules are in next-patterns §7. Key on-page rules:

- **`VerifiedBlock`** (`verifiedDate`, `sources[]`, optional `title`, `children`) — if an edit touches a **volatile claim the block covers** (score minimums, thresholds, dates, requirements), **update `verifiedDate` to the current month/year and add/refresh `sources`.** Do not expand prose under a stale verification date.
- **`EmailCapture`** — leave intact. The `tag` prop is analytics-load-bearing — never change it. Add content before/after, not inside.
- **`DvidsHeroImage`** — leave intact (DoD attribution). You may improve `alt`; never remove `credit`/`dvidsUrl`.
- **`BrandHero`** — leave intact; `alt` is editable.
- **`Calculator` / `BranchCalculatorView` / `FreeDiagnosticClient`** — never touch; these are the page's product.

If an optimization genuinely needs a new prop or a different component variant, **flag it for the user** instead of editing the component or its call site.

---

## SERP Preview Generation

After all optimizations, generate a before/after SERP preview. **Include the ` | ASVAB Hero` suffix the layout appends** (next-patterns §2) so the preview matches what Google renders:

```
BEFORE:
------------------------------------------------------
How to Study for the ASVAB: 8-Step Plan | ASVAB Hero | ...   ← double-suffixed (defect)
https://asvabhero.com/how-to-study-for-the-asvab
Learn how to study for the ASVAB with a proven 8-step plan.
------------------------------------------------------

AFTER:
------------------------------------------------------
How to Study for the ASVAB: 8-Step Plan | ASVAB Hero
https://asvabhero.com/how-to-study-for-the-asvab
Learn how to study for the ASVAB with a proven 8-step plan.
Set your target score, build a schedule, master the subtests.
------------------------------------------------------
```

**Show the truncation** if the old rendered title was too long, exactly as Google would. **Be honest:** "Google sometimes rewrites titles and snippets. This shows what we're aiming for; Google has the final say."

---

## Anchor Link Safety

When restructuring headings:
- Check whether any other page links to this page with a `#section-anchor` (`grep` the slug + `#`).
- ASVAB Hero pages do not auto-generate a TOC from headings, but in-page fragment links (`<a href="#test">`) exist on some pages — confirm a renamed heading doesn't orphan one.
- If a rename risks a broken anchor, keep the old heading text or note: "I renamed 'X' to 'Y'. If anything links to `#x`, that anchor will break."

---

## Build / Verify

`npm run build` regenerates the sitemap then runs `next build`, emitting static HTML to `out/`. Verify every edit landed by grepping the emitted **flat file** `out/{slug}.html` (next-patterns §9 — only the root is `index.html`; every other route is `out/{slug}.html`):

- **Title (catches the double-suffix):** `grep -o "<title>[^<]*</title>" out/{slug}.html`
- **New H2 / FAQ / paragraph:** `grep "Your new heading text" out/{slug}.html`
- **New internal link:** `grep 'href="/target-slug"' out/{slug}.html`
- **JSON-LD `dateModified` / question name:** `grep -o 'application/ld+json[^<]*' out/{slug}.html` or grep the value.

If text is in `page.tsx` but not in `out/{slug}.html`, the build didn't pick it up (didn't rebuild, or the JSX is behind a `"use client"` gate — see the TSX guard in Opt 3).

---

## Common Gotchas

1. **Double-suffix title (next-patterns §2):** ~31 pages hardcode ` | ASVAB Hero` into the source `title`, so the template appends a SECOND suffix. Before editing any title, check the source string and strip the manual suffix. Verify in `out/{slug}.html`.
2. **FAQ schema/visible drift (next-patterns §6):** on Pattern A pages, editing only one surface silently desyncs the visible FAQ from the `mainEntity` schema. Always edit both and verify parity. On Pattern B, editing both creates drift — edit the array only.
3. **Schema-type swap (next-patterns §5):** never convert a calculator's `WebApplication` to `Article` (or vice versa) to "add a date." Preserve the existing `@type`; flag any new schema type as a content-strategy decision.
4. **JSX inside a client component renders empty in static HTML (next-patterns §9):** if new content doesn't appear in `out/{slug}.html`, check it isn't behind `"use client"`. Ranking-page bodies must be server-rendered.
5. **TSX build break:** unbalanced tags, `class` instead of `className`, raw `&`/`'`/dashes, or stray markdown break `next build` for the whole site. Run the Opt 3 build-breakage guard.
6. **Sitemap `<lastmod>` churn is expected (next-patterns §10):** `public/sitemap.xml` restamps every entry's `<lastmod>` on every build. A diff that only changes those dates is build noise — do NOT revert it, flag it, or hand-edit `public/sitemap.xml`. Never add slugs to the sitemap script as part of an on-page edit (new pages are the `asvab-post-writer` skill's job).
7. **`VerifiedBlock` stale date:** if you edit a volatile claim a `VerifiedBlock` covers, bump its `verifiedDate` and refresh `sources` — don't leave new prose under an old verification date (next-patterns §7).
8. **CPC is in cents:** Ahrefs returns CPC in USD cents. Divide by 100 when showing dollar values ($350 CPC is $3.50). Only relevant if you're surfacing Ahrefs CPC.
