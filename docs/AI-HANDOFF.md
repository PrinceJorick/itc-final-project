# AI Handoff: Simula

A handoff for anyone (human or AI) picking up this project, written for grading. It says what the app is, how it works, how to verify it, what was verified, and what is still open. Read this first, then `README.md`.

## 1. What this is

**Simula** ("beginning" in Filipino) is a free, static website for Filipino college students, OJT applicants and fresh graduates. It does three things:

1. **Build** a one-page resume from projects and org work (with a "no experience yet" mode).
2. **Practice** interview questions with tips, sample answers, a STAR template, and student-written cards.
3. **Track** pre-employment documents, with notes on which are free under RA 11261.

Course: CC 100 Introduction to Computing, CS 1103 Group 4, Batangas State University – Alangilan (AY 2026–2027). Category 12: Employment and Career Services → Resume and Interview Guide.

- **Live site:** https://simula-itc.vercel.app (Vercel, public, no login)
- **Repository:** https://github.com/PrinceJorick/itc-final-project (`main` is the release branch)
- **Current release:** v1.1.0, plus later fixes on `main` (see `CHANGELOG.md`)

## 2. Hard constraints (from the course brief)

- Plain HTML, CSS and vanilla JavaScript only. No framework, no build step, no `package.json` in the site, no backend.
- Google Fonts is the only external request on the public pages.
- Must run by opening `site/index.html` directly from `file://`, and when hosted.
- One shared stylesheet (`site/css/style.css`), plus `print.css` loaded only by the builder.
- Every government fact must cite an official or primary source (`SOURCES.md`), or say "check with the agency."
- Playwright is a dev tool in `tests/`. The site never depends on it.

Two things go beyond the brief, and are explained in §6: an **optional** sign-in (Supabase), and **Vercel hosting** of the static folder.

## 3. How to run it

| Goal | Command or action |
|---|---|
| Use the site offline | Double-click `site/index.html` (works from `file://`) |
| Use the hosted site | https://simula-itc.vercel.app |
| Run the tests | `cd tests && npm install && npx playwright install chromium && npm test` |
| Refresh screenshots | `cd tests && npm run screenshots` (writes `docs/screenshots/`) |
| Deploy | Push to `main`. Vercel redeploys automatically (`vercel.json`: `outputDirectory: "site"`, no build) |

No other setup is needed to read or run the site.

## 4. Where things are

```
site/                       the website (this is what is submitted)
  index.html                Home: hero, "What's inside" counts, problem, audience, 3-step journey, comparison
  resume-guide.html         Resume sections, PH conventions, dos/don'ts, weak vs strong bullets, no-experience advice
  builder.html              Resume builder (see §5.1)
  interview.html            Flashcards, STAR draft, common questions, attire, online-interview tips
  checklist.html            Document checklist (saved progress), RA 11261 explainer
  about.html                Mission, team, sources and credits, demo contact form
  login.html                Optional sign-in page (inert unless configured; see §6)
  css/style.css             All styles: tokens (light + dark), components, motion
  css/print.css             Print layout for the resume only
  js/data.js                ALL content: SITE_NAME, action verbs, 90+ skill keywords, 22 interview questions, 13 checklist items, sample resume
  js/nav.js                 Theme toggle (light/dark, saved), mobile menu, site name
  js/builder.js             Resume form, live preview, autosave, bullet helper, job-fit checker, PDF
  js/interview.js           Flashcards, filters, student-written cards, STAR draft
  js/checklist.js           Checklist with saved progress and "how to get it"
  js/contact.js             Demo contact form validation (sends nothing)
  js/motion.js              Scroll reveals, counters, register meters
  js/auth.js, auth-config.js  Optional Supabase sign-in (empty config = no network calls)
  images/                   Simula logo, favicon, three illustrations (original SVGs)
docs/
  AI-HANDOFF.md             This file
  COMPETITORS.md            Research on 12 competitor tools, with sources; gaps; UVP
  DESIGN.md                 Design system: tokens, type, motion, dark mode, rationale
  DOCS-NOTES.md             Storyboard (22 frames), wireframes, theme table, 5-minute demo script, HTML/CSS Q&A
  TEAM-ROLES.md             Roles and page ownership (proposed; see §7)
  inputs/PROMPT.md          The original build brief, verbatim
  inputs/PLANNING.md        Planning decisions
  screenshots/              Desktop and mobile captures of every page
tests/
  specs/*.js                Playwright tests (page, nav, builder, interview, checklist, contact, a11y, screenshots)
SOURCES.md                  Every government fact, with its verification status
CHANGELOG.md                Keep a Changelog format; tags v0.1.0 → v1.1.0
PRODUCT.md, .impeccable/    Product context and design-tool settings
vercel.json                 Static hosting config
```

## 5. Features and how each is checked

### 5.1 Resume builder (`builder.html`, `builder.js`)
- Sections: personal details, objective, education, projects, organizations, optional experience, skills (technical and soft), certifications. Repeatable entries can be added and removed.
- **No experience yet** hides the Experience section and moves Projects and Organizations to the top.
- Live preview on the right. Two templates: Classic (serif) and Modern (sans-serif). **The preview is always black on white**, a deliberate choice for printing and ATS parsing.
- Autosave to `localStorage` under the key `resumeDraft`. Restored on reload. Every storage access is wrapped in `try/catch`.
- Load sample (demo resume), Clear all (asks first), Download PDF (`window.print()` with `print.css`, one page on A4 and Letter).
- **Bullet helper** (rule-based, no AI): verb + what + tool + result → "Verb X using Y, resulting in Z." Inserts into a chosen project or organization.
- **Job-fit checker:** case-insensitive, whole-word matching against `skillKeywords` (with aliases). Shows matched and missing skills, a match percentage, and tips.
- Tests: `builder.spec.js` (15 tests), including reload restore, template switch, one-page PDF, bullet insert, job-fit matching, and the black-and-white preview check in both themes.

### 5.2 Interview practice (`interview.html`, `interview.js`)
- 22 built-in questions in four types (intro, behavioral, technical, closing), plus a "Yours" shelf.
- Flashcards: filter by type, previous/next, random, reveal tip and sample answer.
- Students can add, edit and delete their own cards (saved on the device; built-in cards cannot be edited).
- STAR drafting form, saved to `localStorage`.
- Tests: `interview.spec.js` (7 tests).

### 5.3 Checklist (`checklist.html`, `checklist.js`)
- 13 documents (barangay certification, PSA, NBI, police, barangay clearance, TIN, SSS, PhilHealth, Pag-IBIG, medical certificate, TOR, ID photos, printed resume copies).
- Checkboxes saved to `localStorage`, a progress bar, and an expandable "How to get it" per item.
- RA 11261 explainer: what is free (Section 4), how to claim (Section 5, barangay certification), what is not covered (Section 8), and the once-only rule (Section 3). Citations are in `SOURCES.md`.
- Tests: `checklist.spec.js` (3 tests).

### 5.4 Contact form (`about.html`, `contact.js`)
- Client-side validation with inline errors and a success message. **Nothing is sent anywhere**; the page says so.
- Tests: `contact.spec.js` (3 tests).

### 5.5 Navigation, theme and accessibility (`nav.js`, `style.css`)
- Sticky header. The current page is marked with a soft pill (`aria-current="page"`).
- Light and dark mode. A header button switches; the choice is saved. With no saved choice, the device setting is followed.
- Mobile menu under 64rem: a two-line icon turns into a cross, the panel slides down, the page behind locks, Escape closes it.
- Skip link, visible focus (a ring for keyboard users only), labels on every input, alt text on every image, reduced-motion support.
- Tests: `nav.spec.js` (6), `a11y.spec.js` (keyboard reach, focus visibility, labels, and WCAG AA contrast in light and dark for every page).

## 6. Optional sign-in (not active on the live site)

`login.html` and `js/auth.js` implement email + password sign-in with Supabase. **It is inert on the live site**: `js/auth-config.js` has empty `supabaseUrl` and `supabaseAnonKey`, so no library is loaded and no network call is made. The page says accounts are not set up. Turning it on means filling in those two strings (the anon key is safe to publish only if Row Level Security is on). This was added beyond the brief and is noted here so graders know it is not a live feature.

## 7. Verification

| Check | Result |
|---|---|
| Playwright suite (`tests/`) | **196 passed, 16 skipped** (14 are the opt-in screenshot captures; 2 are checks that apply only at one viewport). Run at 375px and 1280px. |
| Console errors | None on any page in the suite |
| Horizontal scroll | None at 375px or 1280px |
| Outside requests | Only Google Fonts (checked by `pages.spec.js`) |
| Contrast (WCAG AA) | Checked by computed-style test on every page, light and dark |
| Design-quality detector | Clean, with two documented exceptions in `.impeccable/config.json` (see §8) |
| Live site | HTTP 200 on `/`, `/builder.html`, `/images/favicon.svg`; no login page |

**What the tests do not cover:** real printers and PDF viewers beyond Chromium, Safari/Firefox, screen readers in practice, and performance on slow phones. These are not verified.

## 8. Known limits and open decisions

1. **Team roles are proposed, not confirmed.** Only Prince Jorick Fajutagana's role (Developer) is fixed by the brief. Alloysia Mae (Content and Research), Elise Guerra (Design and CSS) and Sherwin Dollente Jr. (Documentation and Presentation) are a proposal, shown on the About page. The team must confirm or change them (`docs/TEAM-ROLES.md` and `about.html`).
2. **Two design-detector exceptions** are recorded in `.impeccable/config.json`, each with a reason:
   - Arial in `style.css` is used on purpose for the Modern resume template (ATS and print reliability).
   - `low-contrast` on `builder.html` is a false positive: the only white element in dark mode is the resume sheet (black on white by design), and the Playwright contrast test passes on the rendered page.
3. **Some government facts are not confirmed from the primary source.** Most agency sites (PSA, SSS, Pag-IBIG, Official Gazette) block automated access. RA 11261 and RA 10911 were checked against the law texts. Other fees and steps are marked in `SOURCES.md`, and the site says "check with the agency" where unverified. Examples: the NBI total (₱130 plus a payment-channel fee), the PSA ₱155 fee (taken from the PSA Citizen's Charter), and whether the barangay certification is valid for one year.
4. **Vercel Authentication is off** for the `simula` project so the site is public. It was turned off on the owner's explicit instruction.
5. **The favicon** is the full logo. A simplified version was used earlier and then replaced.
6. **Repository history note:** the favicon commit (`df046ce`) also contains the deletion of the GitHub Pages workflow. The commit message does not say so. History was not rewritten.
7. **Old domain removed:** `simula-mu.vercel.app` was retired. `simula.vercel.app` belongs to another account.
8. **Tag placement:** v1.0.0 points to an earlier commit than the README fix. Later fixes are on `main` after the tag.

## 9. Design decisions a grader may ask about

- **Why a static site?** The brief requires it. Everything runs in the browser, and data stays on the device (`localStorage`), which also makes the site work offline.
- **Why a rule-based bullet helper and job-fit checker, not AI?** The brief forbids AI APIs. Both are transparent: each step is a string rule the student can read.
- **Why is the resume always black on white?** Printing and ATS parsing. Color and dark mode apply to the site around it, never to the document.
- **Why IBM Plex?** It is the typeface of the Simula mark, so the brand and the site match. Standard system fonts are used on the resume.
- **Why no photo on the resume by default?** Applicant tracking software can misread photos. The guide explains when a photo is still expected locally.
- **Why is student data not sent anywhere?** There is no server. This is also why the contact form is a demo.

## 10. Team and contacts

- Developer: Prince Jorick Fajutagana (`builder.html`, all of `site/js/`, `tests/`, deployment).
- Repository owner: PrinceJorick (GitHub). Vercel team: princejoricks-projects, project `simula`.
- Do **not** commit the class groupings spreadsheet or any other student's personal details (SR-codes, emails). The repo may be public.

## 11. If you continue this work

1. Read `README.md`, then this file, then `CHANGELOG.md`.
2. Run the tests before changing anything: `cd tests && npm test`. Expect 196 passing.
3. Make changes on a branch, run the tests, merge to `main`, and push. Vercel deploys from `main`.
4. Keep copy short and plain (benefit first, first-year reader). Keep government facts cited in `SOURCES.md`.
5. Do not add frameworks, a build step, or external services to the static site.
6. Update `CHANGELOG.md` and the screenshots (`npm run screenshots`) when the UI changes.
