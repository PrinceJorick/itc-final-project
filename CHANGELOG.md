# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.3.0] - 2026-11-18
### Added
- Home: a "School work, rewritten" demo replaces the "What's inside" card. A weak line becomes a strong bullet and its four parts (verb, what, tool, result) underline in order; "Show another" cycles three examples.
- Scroll reveals: only the hero or page intro shows at first; later sections rise in as they scroll into view (not on the builder). Anchors reveal everything above them.
- Loading placeholders where JavaScript builds content (builder preview, checklist) and busy states on Check my fit, Download PDF, and Restore.
- Micro-interactions: checkbox tick pop, copy-to-clipboard confirmation, a blink when the draft saves, a glow on a new entry or inserted bullet, flashcards that slide in from the direction you moved, an unfolding answer panel.
- Privacy and your data (About): what is stored and where, a link to the Data Privacy Act (RA 10173), and Download my data / Restore / Delete everything (`js/backup.js`). The builder shows "Saved only in this browser" with Download backup and Restore.
- Resume guide: cover letter outline with an example, and where to apply (job sites, PESO, job fairs, school, company sites).
- Interview: "Are you willing to relocate?" (23 built-in questions), "Questions to plan for" (salary, night shift, relocation, why hire you), technical interview prep, and thank-you and follow-up email templates with Copy buttons.
- Checklist: "Who qualifies" for RA 11261 (first job search, barangay certification, residency, once only) and a "Verify with your barangay or PESO" note.
- "See preview" pill on phones and tablets in the builder.
- `tests/specs/features-v13.spec.js` for the new features.

### Changed
- Every page is shorter: tighter intros and leads; the Home audience section was removed.
- The comparison table names the tools behind each claim and links to the full list of 12 on the About page; on phones it becomes stacked cards.
- Home's RA 11261 line now states who qualifies and what's needed.
- About lists a role only for the developer (Prince Jorick Fajutagana); `docs/TEAM-ROLES.md` matches.
- Checklist illustration: the envelope was redrawn with real proportions (light and dark, website and the Simula Logo artifact).
- Docs, demo script, storyboard, wireframes, and the impeccable surface brief updated.

### Removed
- The optional sign-in (`login.html`, `js/auth.js`, `js/auth-config.js`) and the "Sign in" link.

### Fixed
- Mobile and tablet menu: links now span the panel (they were capped at the text width), the page behind is frosted and locked, and long menus scroll on short screens.
- About: the "Demo form" note was invisible on its gray band.
- Home: the dashed "Templates ask for" box no longer stretches to an empty height.

## [1.2.0] - 2026-11-18
### Changed
- Redesigned the look in monochrome: seven color tokens (`--bg`, `--surface`, `--line`, `--muted`, `--text-muted`, `--ink`, `--on-ink`) that flip between light and dark mode, replacing the green "Trusted Ledger" palette. One error color remains, for form errors only, always with a "!" icon and words.
- New mono brand assets: the dot-and-pill mark (inline SVG in the header and footer, so it inverts with the theme), lowercase "simula" wordmark, a favicon that follows the system theme, and light and dark versions of the guide, interview and checklist illustrations (`site/images/light/`, `site/images/dark/`).
- Illustrations use `<picture>`; the theme switch also swaps them when the theme is picked by hand.
- Rounded shape language: pill buttons, tags and meters; 16px cards; 24px panels and flashcards; 32px hero card. Depth comes from soft gray fills instead of shadows.
- Header: "Build resume" pill; the current page is ink text with a small dot; the mobile menu is a rounded floating panel.
- Custom rounded checkboxes on the checklist; the revealed flashcard answer is an inverted ink panel; job-fit chips are solid (found) or outlined (missing); the RA 11261 badge is an ink outline pill.
- Motion limited to 180ms hover, focus and theme fades. Scroll reveals and the home page count-up were removed.
- Plex Sans now loads 400 and 600 only.
- Docs (`DESIGN.md`, `DOCS-NOTES.md` theme table, README, SOURCES credits) and screenshots (every page, desktop and mobile, light and dark).
- Live site moved to https://simula-itc.vercel.app (Vercel Authentication turned off so it is public).
- Removed the GitHub Pages deployment (workflow deleted and Pages disabled). The site is served from Vercel only.

### Added
- `tests/specs/theme.spec.js`: every page in light and dark mode (no console errors, no sideways scroll, matching illustrations, theme-colored mark), the manual toggle swapping illustrations, the favicon, and black-on-white print in both themes.

### Removed
- The old green logo and illustration SVGs.

## [1.1.0] - 2026-11-10
### Added
- Light and dark mode with a sun/moon toggle in the header. The choice is saved per device; with no choice the site follows the device setting. Colors fade on switch, and the switch is instant with reduced motion.
- Simula brand assets from the logo artifact: primary mark, simplified favicon, and new guide, interview, and checklist illustrations on the page intros.
- Optional email + password sign-in page (Supabase), inert until configured.
- Visitor-written interview cards (add, edit, delete), saved on the device.
- Tests for the theme toggle, WCAG AA contrast in dark mode, the single current-page highlight, and a black-and-white resume preview.

### Changed
- Renamed the site to **Simula** ("beginning").
- Redesigned every page: minimal layout, IBM Plex Sans and Mono, rounder corners, calmer cards, and polished hover, press, reveal, and menu animations.
- Rewrote the copy on every page to be shorter and clearer (about 26% fewer words) without dropping any topic.

### Fixed
- Header: the current page showed two lines (an underline plus a bar), and clicked links kept a focus ring. It now shows one soft pill, and focus rings appear only for keyboard users.
- Resume live preview is black and white again in both templates (the Modern template had turned green).
- Edit and Delete buttons no longer show on built-in interview cards (the `hidden` attribute now always wins).
- Grammar and awkward phrasing across pages.

## [1.0.0] - 2026-11-10
### Added
- Team handoff notes: storyboard, wireframe descriptions, theme details, 5-minute demo script for 4 speakers, and HTML/CSS Q&A notes (`docs/DOCS-NOTES.md`).
- Team roles and page ownership with proposed assignments (`docs/TEAM-ROLES.md`).
- Final README with live URL, title rationale, run steps, features, and credits.

## [0.5.0] - 2026-11-10
### Added
- Playwright test suite in `tests/` (dev-only): 78 tests × 2 viewports (375px, 1280px), plus opt-in screenshot capture (`npm run screenshots`). Covers page loads, console errors, outside requests, horizontal scroll, images, nav links, skip link, mobile menu, every feature end to end, keyboard focus, labels, and WCAG AA contrast.
- Desktop and mobile screenshots of every page (`docs/screenshots/`).
- GitHub Actions workflow that publishes `site/` to GitHub Pages without a build step.

## [0.4.0] - 2026-11-10
### Added
- Resume builder: personal info, objective, education, projects, organizations, optional experience, skills, certifications; add/remove entries; live preview; Classic and Modern ATS-friendly templates; autosave to `localStorage` (`resumeDraft`); load sample; clear with confirmation; Download PDF via print.
- "No experience yet" mode that hides Experience and moves Projects and Organizations first.
- Rule-based bullet helper with one-click insert into a project or organization.
- Job-fit checker with case-insensitive, whole-word keyword matching, match percentage, and tips.
- Interview flashcards with category filters, previous/next, random question, question bank, and a saved STAR template.
- Pre-employment checklist with saved checkboxes, progress bar, and expandable "How to get it".
- Demo contact form with inline validation and success message.

### Fixed
- Checklist reset button no longer wraps on small screens.

## [0.3.0] - 2026-11-10
### Added
- Six static pages: Home, Resume Guide, Builder, Interview, Checklist, About.
- Shared header with skip link, active-page highlight, and mobile menu (`js/nav.js`).
- Content data for verbs, 90+ skill keywords, 22 interview questions, 13 checklist items, and a sample resume (`js/data.js`).
- Original SVG logo and illustrations.
- Resume-only print stylesheet (`css/print.css`).
- `SOURCES.md` with verification status for every government fact.

## [0.2.0] - 2026-11-10
### Added
- Design system "the brown envelope": palette with WCAG AA contrast, Bricolage Grotesque + Atkinson Hyperlegible, spacing, radius, shadows, buttons, focus, motion (`docs/DESIGN.md`).
- Shared stylesheet with design tokens, base, typography, buttons, cards, notes, chips, and forms (`site/css/style.css`).
- Product context file (`PRODUCT.md`).

## [0.1.0] - 2026-11-10
### Added
- Competitor research of 12 tools with sourced gaps, final UVP, and differentiators (`docs/COMPETITORS.md`).
- Project title "OJT to Offer" with search evidence in `README.md`.
- Saved build prompt and planning summary (`docs/inputs/`).
- `.gitignore`.

[1.3.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v1.3.0
[1.2.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v1.2.0
[1.1.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v1.1.0
[1.0.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v1.0.0
[0.5.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v0.5.0
[0.4.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v0.4.0
[0.3.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v0.3.0
[0.2.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v0.2.0
[0.1.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v0.1.0
