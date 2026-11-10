# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/).

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

[0.5.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v0.5.0
[0.4.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v0.4.0
[0.3.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v0.3.0
[0.2.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v0.2.0
[0.1.0]: https://github.com/PrinceJorick/itc-final-project/releases/tag/v0.1.0
