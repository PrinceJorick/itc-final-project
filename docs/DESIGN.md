# Design System: Simula (mono, v1.3)

## Concept

*Simula* is Filipino for "beginning." The brand mark is a rounded tile with a dot and a short pill: a starting point and a line that has just begun. Since v1.2.0 the whole site is **monochrome**: ink on white in light mode, the same roles flipped in dark mode. There is no accent color. Hierarchy comes from contrast, weight, size and spacing.

It should feel clean, calm and premium, with the content in front. Nothing childish, no gradients, no decorative motion. Every page works in **light and dark mode**.

Per-surface mode: Home is **Persuade** (help a student decide to start), the guides are **Read** (easy to scan), and the builder, flashcards and checklist are **Operate** (fast, predictable controls).

## Color tokens

All colors are CSS custom properties in section 1 of `site/css/style.css`. The dark values apply when the visitor picks dark mode (`html[data-theme="dark"]`), or when the device is dark and they haven't picked a theme (`@media (prefers-color-scheme: dark)`). The Playwright tests measure WCAG 2.1 contrast on every page in both modes.

| Token | Light | Dark | Used for | Purpose |
|-------|-------|------|----------|---------|
| `--bg` | `#FFFFFF` | `#0A0A0A` | Page background, cards | Flat white paper by day, near-black at night |
| `--surface` | `#F4F4F5` | `#18181B` | Soft panels: section bands, inputs, notes, tool panels, the "What's inside" card | Depth comes from a soft fill, not from shadows |
| `--line` | `#E4E4E7` | `#27272A` | 1px borders, dividers, meter tracks | Quiet structure |
| `--muted` | `#A1A1AA` | `#52525B` | Decorative only: hover borders, dashed outlines | **Never used for text** (it fails AA) |
| `--text-muted` | `#52525B` | `#A1A1AA` | Secondary text, hints, eyebrow labels, unchecked checkbox borders | 7.7:1 in both modes |
| `--ink` | `#0A0A0A` | `#FAFAFA` | Body text, headings, primary buttons, checked states, meter fills, focus ring | 19.8:1 light, 19.0:1 dark |
| `--on-ink` | `#FFFFFF` | `#0A0A0A` | Text and icons placed on `--ink` | The inverted pair for buttons, badges and the answer panel |

Two exceptions, both documented in the stylesheet:

- **`--error`** `#B91C1C` light / `#F87171` dark: form error messages only (6.5:1 and 7.2:1 on the page). Every error also shows a "!" icon and written words, so color is never the only signal.
- **`--paper`, `--paper-ink`, `--paper-text-muted`**: the resume preview is a printed page, so it stays black on white in **both** themes. These tokens never change. A test checks that every color on the sheet is a neutral gray.

Purpose: monochrome keeps attention on the content and reads as professional, which suits a career site, and makes light and dark mode consistent (each token simply flips).

## Typography

| Role | Font | Purpose |
|------|------|---------|
| Everything | **IBM Plex Sans** 400 and 600 | Neutral, professional, very readable. SemiBold for headings, buttons and labels |
| Labels, eyebrows, numbers | **IBM Plex Mono** 400 and 500 | Uppercase eyebrow labels (12-13px, 0.12em tracking, `--text-muted`), counts, step numbers, table headers; `tabular-nums` so figures line up |
| Wordmark | Plex Sans SemiBold, lowercase "simula", -0.045em tracking | The logo lockup, next to the mark |
| Resume preview | Classic = Georgia; Modern = Arial | ATS software and printers handle standard fonts best |

Scale: body 16px / 1.6; h3 20px; h2 `clamp(1.5rem, 3vw, 2rem)`; h1 `clamp(2.125rem, 5vw, 3.25rem)` (home hero up to 4rem). Headings are SemiBold with tight tracking (-0.02em to -0.035em) and `text-wrap: balance`. Fonts load from Google Fonts with system fallbacks, so the site still works offline.

## Shape and depth

| Token | Value | Used for |
|-------|-------|----------|
| `--radius-sm` | 8px | Checkboxes, small chips |
| `--radius-md` | 12px | Inputs, small cards (STAR rows) |
| `--radius-lg` | 16px | Cards, notes, checklist items, entries |
| `--radius-xl` | 24px | Large panels: form sections, tool panels, flashcards, mobile menu |
| `--radius-2xl` | 32px | Hero card; the illustrations draw their own 32px panel |
| `--radius-pill` | 999px | Buttons, nav links, tags, filter chips, meters |
| `--space-1` … `--space-9` | 4, 8, 12, 16, 24, 32, 48, 64, 96 px | One spacing scale for every gap |
| `--shadow-float` | one very soft shadow | Only the floating mobile menu panel |

Borders are 1px `--line`. Meters are 4-6px tall pills (`--line` track, `--ink` fill).

## Components

| Element | Style | Purpose |
|---------|-------|---------|
| Header | Sticky, frosted `--bg`. Logo lockup left, page links, "Build resume" pill, round theme switch | The main action is always one tap away |
| Current page | `--ink` SemiBold text with a 4px ink dot under it; other links `--text-muted` | One clear marker, no underline |
| Mobile menu | Hamburger turns into a cross; a rounded 24px panel floats under the header over a frosted page; links span the full panel; the list scrolls on short screens | Easy to reach with a thumb, and clearly on top |
| Primary button | `--ink` pill, `--on-ink` text, 44px tall, slight opacity on hover | One main action per area |
| Secondary / danger button | Transparent pill, 1px `--line` border, fills with `--surface` on hover | Supporting actions. Clear and Delete always ask first, so they don't need red |
| Links | `--ink`, thin underline that strengthens on hover | Links never rely on color |
| Cards | `--bg` with a 1px `--line` border, 16px corners, 24px padding | Quiet containers |
| Inputs | `--surface` fill, 1px `--line`, 12px corners; border turns `--ink` on focus | Fields read as places to type |
| Checkboxes (checklist) | Custom rounded 8px boxes; checked = `--ink` fill with an `--on-ink` tick | Still real `<input>`s, so keyboard and screen readers work |
| Flashcard | 24px card; the revealed tip and answer flip to `--ink` with `--on-ink` text | Mirrors the answer bubble in `interview.svg` |
| RA 11261 badge | Ink outline pill | The one fact students shouldn't miss, without a new color |
| Job-fit chips | Found = solid ink pill; missing = outline pill with muted text | Shape and the section headings carry the meaning |
| Resume preview | Always black on white | It is paper and it prints |
| Hero demo | Soft 32px panel: before line (struck through), arrow, after card, four legend pills | Shows the core idea instead of describing it |
| Comparison table | Three columns; under 40rem each row becomes a stacked card with column labels | Readable on a phone without sideways scrolling |
| Email templates | Card with the text in a soft panel and a Copy pill that turns ink with a check | One click to a usable email |
| Data controls | "Saved only in this browser" note (builder) and "What Simula saves" card (About) | Privacy is explained where it matters |
| "See preview" pill | Floating ink pill on phones and tablets; hides while the preview is on screen | The preview is far below the form on small screens |

Focus: a 2px `--ink` outline with a 2px offset on every control, shown only for keyboard users (`:focus-visible`).

## Theme switch

- With no saved choice the site follows the device (`prefers-color-scheme`).
- The round header button switches light/dark, sets `data-theme` on `<html>`, and saves the choice in `localStorage` (`simula-theme`, wrapped in `try/catch`). `nav.js` runs in `<head>`, so the saved theme applies before the page is drawn (no flash).
- Illustrations use `<picture>` with a dark `<source>`. Its media query only follows the device, so `nav.js` sets the source's `media` to `all` (manual dark) or `not all` (manual light) to keep the drawings in step.

## Motion

Since v1.3.0, motion does three jobs. Each one explains something; nothing loops for decoration.

| Kind | Where | How | Purpose |
|------|-------|-----|---------|
| Focal moment | Home hero | The four parts of the strong bullet underline in order (420ms apart); "Show another" crossfades to the next example | Teaches the bullet formula in the first five seconds |
| Scroll reveals | Sections after the first screen on Home, Guide, Interview, Checklist, About (not the Builder) | Fade and rise 20px (600-700ms, `cubic-bezier(0.16, 1, 0.3, 1)`); lists in a `.reveal-stagger` group arrive 70ms apart | Only the hero shows at first; the page unfolds as you read |
| Loading states | Builder preview and checklist (placeholder bars until JavaScript builds them); Job-fit, Download PDF, Restore (button spinner) | Soft gray bars with a slow shimmer; a spinner inside the busy button | The visitor always sees that something is happening |
| Confirmations | Checkbox tick, Copy template, draft saved, inserted bullet, flashcard change, answer reveal | Small pop, check-mark swap, one-time glow, slide from the direction you moved, ink panel unfolding | Cause and result are obvious |
| Routine feedback | Buttons, links, chips, theme | 180ms fills and opacity (`--duration`) | Calm hover and focus |

- Content is hidden for a reveal only when JavaScript is on, so the page is complete without it. Jumping to an anchor (`#ra11261`) reveals everything above it at once.
- **Reduced motion:** reveals, slides and pops are off; content shows immediately; results appear without the artificial pause. State changes (filled checkbox, "Copied") still show.
- Smooth scrolling for in-page links (`scroll-behavior: smooth`, with `scroll-padding-top` so headings clear the sticky header).

## Icons and graphics

- **Mark:** the dot-and-pill tile. In the header and footer it is inline SVG painted with `var(--ink)` and `var(--bg)`, so it inverts with the theme. It is never recolored, animated, or given a tagline.
- **Favicon:** `site/images/favicon.svg`, one file that switches black/white with the system theme.
- **Illustrations:** `guide.svg`, `interview.svg`, `checklist.svg` in `site/images/light/` and `site/images/dark/`. Rounded, mono, each on its own 32px panel. The checklist envelope was redrawn in v1.3.0 with real envelope proportions (about 1.5:1, with a back, an open flap and a front pocket) instead of a flat 4:1 strip.
- **Icons:** inline SVG line icons (1.75px stroke). Decorative icons are `aria-hidden`; icon-only buttons have labels.

All of these are original assets made by the team for this project, created with Claude.

## Overall mood

Clean, calm, premium, and focused on content, like a well-kept record of your first steps.
