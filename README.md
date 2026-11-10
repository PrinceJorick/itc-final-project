# Simula

**A free resume and interview guide for Filipino students.** Turn school projects and org work into a one-page resume, practice the interview questions local employers actually ask, and prepare your pre-employment documents, including the ones that are free under RA 11261.

**Live site:** https://simula-mu.vercel.app

CC 100 Introduction to Computing Final Project · CS 1103 Group 4 · Batangas State University – Alangilan, College of Informatics and Computing Sciences · 1st Semester AY 2026–2027
Category 12: Employment and Career Services → Resume and Interview Guide

![Home page on desktop](docs/screenshots/index-desktop.png)

## The problem and our answer

Global tools like Canva, Resume.io, and Teal assume you already have work experience, often charge to download a PDF, keep resume-building separate from interview prep, and skip Philippine hiring realities. We reviewed 12 tools; see [docs/COMPETITORS.md](docs/COMPETITORS.md).

**UVP:** Simula helps Filipino students turn school projects and org work into a one-page resume, then practice the interview questions local employers actually ask, free, with an optional account that nobody has to make.

## Title

**Simula** is the Filipino word for "beginning," and that is exactly what this site is for: the first resume, the first interview, the first offer. A student reads it as their own starting point, and it stays one word, five letters, easy to say in a class demo.

The name is stored in one place: `SITE_NAME` in [`site/js/data.js`](site/js/data.js). `nav.js` copies it into every page title and every element marked `data-site-name`. (The HTML also contains the name as plain text so it still shows if JavaScript is off; search-and-replace "Simula" in `site/*.html` if you rename.)

### Name check (November 10, 2026)

Live web search was unavailable in this session, so the record here is what we can state from general knowledge. The one well-known namesake is **Simula**, the 1960s Norwegian programming language credited as the first object-oriented language; it is of historical interest only, not a product, company, or app in the career space, and for a Computer Science project the nod reads as intentional rather than accidental. No resume, career, or interview product named Simula is known to the team. The name decision was confirmed by the team during the redesign.

## How to run

No install, no build. Either:

- **Offline:** open `site/index.html` in any modern browser (double-click it). Everything works from `file://`; without internet, the system fonts take over, and signing in is simply not available (see Accounts below).
- **Online:** visit https://simula-mu.vercel.app. Vercel serves the `site/` folder as-is ([`vercel.json`](vercel.json), no build step) and redeploys on every push to `main`.

For submission, zip or upload the `site/` folder to Google Drive.

## Accounts (optional)

The whole site works with no account: drafts, checklists, and custom cards live in `localStorage` on the visitor's device. Sign-in is email + password through Supabase, and it is **off by default**:

- With `window.SIMULA_AUTH` left empty in [`site/js/auth-config.js`](site/js/auth-config.js), the site contacts no one and loads no library; the nav link simply goes to the login page, which explains that accounts aren't connected.
- Fill in `supabaseUrl` and `supabaseAnonKey` there to switch accounts on. `js/auth.js` then loads supabase-js from a CDN on first use only. (So a configured copy makes one allowed external request beyond Google Fonts; an unconfigured copy, like the submission, makes none.)

## Features

| Page | What you can do |
|------|-----------------|
| **Home** | See the problem, who it's for, the Guide → Build → Practice journey, and a comparison with global tools |
| **Resume Guide** | Learn each resume section, Philippine conventions (photo, age and RA 10911, address, one page), dos and don'ts, weak vs strong bullets, and what to include with no experience |
| **Builder** | Fill in a form and watch a live preview; add/remove entries; "No experience yet" mode; Classic and Modern ATS-friendly templates; autosave (`localStorage`, key `resumeDraft`); load sample; clear with confirmation; Download PDF (one page, print-only layout) |
| | **Bullet helper** (rule-based): verb + what + tool + result → "Developed X using Y, resulting in Z", inserted with one click |
| | **Job-fit checker**: paste a posting → matched skills, missing skills, match %, and tips (case-insensitive, whole-word matching against 90+ keywords) |
| **Interview** | Flashcards with category filters (including a "Yours" shelf), reveal tip and sample answer, previous/next, random question; 22 built-in questions; **write, edit, and delete your own cards** (saved as `simulaCards` on the device); saved STAR template; attire and online interview tips |
| **Checklist** | 13 pre-employment documents with saved checkboxes, a progress bar, "How to get it" steps, and RA 11261 free-document guide |
| **About** | Mission, team, sources, and a demo contact form with validation (nothing is sent) |
| **Sign in** | Optional email + password accounts (Supabase) with a Create account tab; inert until configured |

Accessibility: skip link, keyboard-friendly navigation, visible focus everywhere, labels on every input, WCAG AA contrast, and reduced-motion support (all reveals and counters settle instantly).

## Project structure

```
site/                 ← the website (this is what gets submitted)
  index.html  resume-guide.html  builder.html  interview.html
  checklist.html  about.html  login.html
  css/style.css       ← the one shared stylesheet
  css/print.css       ← resume-only print layout
  js/data.js          ← all content data + SITE_NAME
  js/nav.js           ← shared header/menu behavior
  js/motion.js        ← scroll reveals and the register counters
  js/auth-config.js   ← empty Supabase placeholder (accounts off)
  js/auth.js          ← optional sign-in; inert while unconfigured
  js/builder.js  js/interview.js  js/checklist.js  js/contact.js
  images/             ← original SVGs (logo and favicon)
docs/                 ← research, design system, team notes, screenshots, inputs
tests/                ← Playwright tests (dev only; the site never uses this folder)
SOURCES.md  CHANGELOG.md  PRODUCT.md
```

## Testing

Playwright runs every page and feature at 375px and 1280px against the site opened from the file system.

```bash
cd tests
npm install
npx playwright install chromium
npm test                 # 174 passing; 16 skipped (14 opt-in screenshots + 2 viewport-only checks)
npm run screenshots      # refreshes docs/screenshots/
```

## Tech and skills used

- **Stack:** HTML5, one CSS file (custom properties, Flexbox, Grid, media queries), vanilla JavaScript, `localStorage`. No frameworks, build tools, or backend. Google Fonts is the only external request the site makes as submitted; optional Supabase accounts add a CDN script only when configured by hand.
- **Design and build skills:** ui-ux-pro-max (design system generation), impeccable (product context, design direction, craft checks, contrast hook, finish review), web research for competitors, title checks, and PH government facts; Playwright for testing and screenshots.
- **Visual direction:** minimal Simula brand: white paper, ledger-green actions, IBM Plex Sans and Mono, rounded corners, light and dark mode with a header toggle. Full detail in [docs/DESIGN.md](docs/DESIGN.md).

## Documentation for the team

- [docs/DOCS-NOTES.md](docs/DOCS-NOTES.md): storyboard, wireframes, theme details, 5-minute demo script, Q&A notes
- [docs/TEAM-ROLES.md](docs/TEAM-ROLES.md): roles and page ownership (**three roles still need team confirmation**)
- [docs/DESIGN.md](docs/DESIGN.md): design system and the reason for each choice
- [docs/COMPETITORS.md](docs/COMPETITORS.md): competitor research, gaps, UVP, differentiators
- [docs/inputs/](docs/inputs/): the original build prompt and planning summary. Add the official guidelines, rubric, and template PDFs here. **Do not add the class groupings spreadsheet or other students' details.**

## Credits

- Content sources: see [SOURCES.md](SOURCES.md) and the About page.
- Fonts: IBM Plex Sans and IBM Plex Mono (Google Fonts, SIL Open Font License).
- Logo, favicon, illustrations, and icons: original work for this project (Simula brand artifact). No stock images.
- Team: Prince Jorick Fajutagana, Alloysia Mae, Elise Guerra, Sherwin Dollente Jr.

Not affiliated with any government agency or company named on this site. Fees and procedures change, so always confirm with the agency.
