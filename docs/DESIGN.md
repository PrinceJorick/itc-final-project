# Design System: Simula

## Concept

*Simula* is Filipino for "beginning." The brand comes from the Simula mark: a starting point and a meter that begins to fill, "your first entry, on the record." The site carries that idea through a clean, minimal, ledger-like look: white paper, one deep green for action, ink for text, hairline rules, and rounded corners.

It should feel calm, professional, and trustworthy, with nothing childish and no "AI gradient" decoration. Every page works in **light and dark mode**.

Per-surface mode: Home is **Persuade** (help a student decide to start), the guides are **Read** (easy to scan), and the builder, flashcards, and checklist are **Operate** (fast, predictable controls).

## Color palette

All colors are CSS custom properties in `site/css/style.css` (section 1). Dark values replace them when the visitor picks dark mode (`html[data-theme="dark"]`) or when their device is set to dark and they haven't picked a theme. Contrast is measured with the WCAG 2.1 formula; the Playwright tests check every page in both modes.

| Token | Light | Dark | Used for | Purpose |
|-------|-------|------|----------|---------|
| `--color-bg` | `#FFFFFF` | `#0F1311` | Page background | Clean paper; a deep green-black at night |
| `--color-band` | `#F6F6F2` | `#131815` | Alternating section bands, tool panels | Separates sections without heavy lines |
| `--color-surface` | `#FFFFFF` | `#171C19` | Cards, inputs | Lifts content slightly off the page |
| `--color-ink` | `#161A17` | `#E8EBE6` | Body text, headings | Soft black/white; easier on the eyes than pure black |
| `--color-ink-muted` | `#5B615C` | `#A3AAA4` | Secondary text, hints | Quieter text that still passes AA (6.2:1 / 7.6:1) |
| `--color-primary` | `#1D5B4A` | `#74C7A6` | Buttons, links, active nav, focus | Ledger green from the logo; lightened in dark mode to stay readable (7.9:1 / 9.7:1) |
| `--color-primary-tint` | `#E9F1ED` | `#1A2E27` | Current page pill, chips, info notes | Soft "selected" state |
| `--color-gold` / `--color-gold-tint` | `#7A5D1A` / `#F6EFDC` | `#E6C77F` / `#2E2716` | "Free under RA 11261" badge, PH tips | Reserved for the one fact students shouldn't miss |
| `--color-danger` | `#A83226` | `#F2958A` | Errors, "missing" skills, destructive buttons | Clear warning (6.5:1 on white) |
| `--color-line` / `--color-line-strong` | `#E4E3DB` / `#8B908A` | `#29302C` / `#6B746D` | Card borders / input borders | Hairlines; input borders pass the 3:1 UI rule |

The **resume preview is always black on white**, in both templates and both themes, because it is a printed document. A test checks that every color on the sheet is a neutral gray.

## Typography

Two Google Fonts (the brand typefaces from the Simula mark), with system fallbacks so the site still looks right offline.

| Role | Font | Purpose |
|------|------|---------|
| Everything | **IBM Plex Sans** (400, 500, 600) | Neutral, professional, very readable; the logo's wordmark face |
| Numbers and small labels | **IBM Plex Mono** (400, 500) | Counts, step numbers, table headers, "Weak/Strong" labels; tabular figures line up |
| Resume preview | System fonts: Classic = Georgia; Modern = Arial | ATS software and printers handle standard fonts best |

Scale: body 16px / 1.65 line height; h3 20px; h2 `clamp(1.5rem, 3vw, 2rem)`; h1 `clamp(2.125rem, 5vw, 3.25rem)` (home hero up to 4rem). Headings use tight negative tracking and `text-wrap: balance`.

## Spacing, corners, shadows

| Token | Value | Purpose |
|-------|-------|---------|
| `--space-1` … `--space-9` | 4, 8, 12, 16, 24, 32, 48, 64, 96 px | One 4px scale for every gap; tight inside groups, generous between sections |
| `--radius-sm` / `md` / `lg` / `xl` | 8 / 12 / 18 / 24 px | Small controls / buttons and inputs / cards / hero cards and flashcard |
| `--radius-pill` | 999px | Nav links, chips, filter pills, header icon buttons |
| `--shadow-sm` / `md` / `lg` | soft, offset, low opacity | Resting cards / hover / the hero card and flashcard |

## Buttons, links, navigation

| Element | Style | Purpose |
|---------|-------|---------|
| Primary button | Green fill, white text (dark text in dark mode), 12px corners, 44px tall | One main action per area |
| Secondary button | Surface fill, hairline border | Supporting actions |
| Quiet button | Green text only, tint on hover | Low-priority actions (Random, Edit) |
| Danger button | Red outline | Destructive actions, always confirmed |
| Links | Green, thin underline that strengthens on hover | Links never rely on color alone |
| Header | Sticky, frosted glass, logo left, pill-shaped nav links, round theme switch | The current page gets **one** soft green pill: no underline, no extra bar, and no focus ring after a mouse click |

## Motion and micro-interactions

- Buttons lift 1px on hover and settle (scale 0.98) when pressed; arrow icons nudge forward.
- Cards and journey steps lift 2px on hover; register rows highlight their title.
- Sections fade up as they scroll into view; the home "What's inside" counts up and its meters fill.
- The theme switch rotates between sun and moon, and colors fade for 300ms when the theme changes.
- The mobile menu's two lines turn into a cross, the panel slides down, and links rise in one after another.
- Revealed answers, new entries, and success messages rise in gently.
- **Reduced motion:** with `prefers-reduced-motion`, all of this is instant.

Focus: a 2px green outline on buttons and links, and a 3px soft green ring on text fields, shown only for keyboard users (`:focus-visible`).

## Icons and images

- **Logo and favicon:** the Simula mark from the brand artifact (`site/images/logo.svg`; simplified `favicon.svg` for small sizes).
- **Illustrations:** `guide.svg`, `interview.svg`, `checklist.svg` from the same artifact, shown in rounded frames on the page intros. The frames stay light in dark mode so the drawings keep their paper colors.
- **Icons:** inline SVG line icons (1.75px stroke). Decorative icons are `aria-hidden`; icon-only buttons have labels.

## Overall mood

Minimal, calm, and professional, like a well-kept record of your first steps. Local without being kitschy.
