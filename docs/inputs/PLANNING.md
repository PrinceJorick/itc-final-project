# Planning Summary

## Concept
**OJT to Offer**: a free, static website that helps Filipino college students, OJT applicants, and fresh graduates build a one-page resume from school projects and org work, then prepare for their first interview.

- **Problem:** global resume tools assume work experience, paywall downloads, split resume-building from interview prep, and skip Philippine hiring realities (pre-employment documents, RA 11261, local interview questions).
- **UVP:** see `docs/COMPETITORS.md` §3.
- **Journey:** Guide → Build → Practice.

## Stack
- Plain HTML5, one shared CSS file (`site/css/style.css`) plus a print stylesheet, vanilla JavaScript.
- No frameworks, build tools, backend, or third-party services. Google Fonts is the only external request, with system-font fallbacks.
- Data lives in `site/js/data.js`; user progress lives in `localStorage`.
- Runs from `file://` and on GitHub Pages.
- Dev-only: Playwright tests in `tests/` (has its own `package.json`, never loaded by the site).

## Pages and features
| Page | Purpose | Key features |
|------|---------|--------------|
| `index.html` | Home | Hero + UVP, problem, audience, 3-step journey, comparison vs generic tools |
| `resume-guide.html` | Main content | Sections explained, PH conventions, dos/don'ts, good vs bad bullets, no-experience advice |
| `builder.html` | Tool | Resume builder, live preview, 2 templates, autosave, print to PDF, bullet helper, job-fit checker |
| `interview.html` | Main content + tool | Question bank, filters, flashcards, random question, STAR template (saved) |
| `checklist.html` | Tool | Pre-employment checklist (saved), progress bar, how-to-get-it, RA 11261 |
| `about.html` | About/Contact | Mission, team, sources and credits, demo contact form |

## Roles
- **Developer: Prince Jorick Fajutagana.** Owns `builder.html` and the JavaScript.
- **Content and Research; Design and CSS; Documentation and Presentation:** to be assigned among Alloysia Mae, Elise Guerra, and Sherwin Dollente Jr. See `docs/TEAM-ROLES.md`.

## Roadmap
| Phase | Branch | Tag | Output |
|-------|--------|-----|--------|
| 1 Research | `phase/1-research` | v0.1.0 | COMPETITORS.md, title, README evidence |
| 2 Design | `phase/2-design` | v0.2.0 | DESIGN.md, design tokens in style.css |
| 3 Static pages | `phase/3-static-pages` | v0.3.0 | All 6 pages, content, SOURCES.md |
| 4 Features | `phase/4-features` | v0.4.0 | All interactive features |
| 5 Testing | `phase/5-testing` | v0.5.0 | Playwright tests passing, screenshots |
| 6 Handoff | `phase/6-handoff` | v1.0.0 | DOCS-NOTES.md, TEAM-ROLES.md, final README |

Deadline: December 5, 2026 (team target December 4).
