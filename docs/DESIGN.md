# Design System: OJT to Offer

## Concept: "the brown envelope"

Every Filipino job applicant knows the long brown envelope: the kraft folder that holds your resume, NBI clearance, and PSA birth certificate on the way to an interview. The site borrows that world: **bond-paper white** pages, **ballpoint-ink blue** for action, **kraft brown** for warmth and structure, and **highlighter yellow** for the one thing you must not miss.

It should feel like a well-organized classmate's notes: clean, modern, and trustworthy, not a bank's website and not a kids' app. No purple-blue "AI gradients", no glassmorphism, no stock photos.

Per-surface mode: Home is **Persuade** (convince a student to start), the guides are **Read** (easy to scan and study), and the builder, flashcards, and checklist are **Operate** (fast, predictable controls).

## Color palette

All values are CSS custom properties in `site/css/style.css` (`:root`). Contrast is measured with the WCAG 2.1 formula.

| Token | Hex | Used for | Purpose | Contrast |
|-------|-----|----------|---------|----------|
| `--color-ink` | `#1C2333` | Body text, headings, footer background | Near-black with a blue cast, like ballpoint ink; softer than pure black | 14.8:1 on paper |
| `--color-ink-muted` | `#545B6B` | Secondary text, captions, helper text | Quieter text that still passes AA | 6.4:1 on paper |
| `--color-paper` | `#FBF8F3` | Page background | Warm bond-paper white; easier on the eyes than pure white | — |
| `--color-surface` | `#FFFFFF` | Cards, forms, the resume sheet | A "clean sheet" that lifts off the paper background | — |
| `--color-primary` | `#2445A8` | Buttons, links, focus ring, active nav | Ballpoint blue: action and trust | 8.4:1 with white text |
| `--color-primary-hover` | `#1B3585` | Button/link hover | Darker on hover so the change is visible | 11.1:1 with white |
| `--color-primary-tint` | `#E8EDFA` | Selected chips, active filter, info notes | Soft blue for "selected" states | Primary text 7.2:1 |
| `--color-kraft` | `#C8955A` | Envelope illustration, decorative rules | The brown envelope; warmth and local identity (decorative only) | Ink text 5.9:1 |
| `--color-kraft-tint` | `#F3E6D3` | Section bands, callouts, "PH tip" boxes | Light kraft panel for local tips | Muted text 5.5:1 |
| `--color-kraft-deep` | `#7A4E22` | Small labels on kraft, "PH tip" headings | Readable brown text | 5.8:1 on kraft tint |
| `--color-highlight` | `#FFE27A` | `<mark>`, "free under RA 11261" badge | Highlighter pen: draws the eye to the one key fact | Ink text 12.3:1 |
| `--color-success` | `#1C6E45` | Checked items, matched skills, progress bar | "Done" green, like a teacher's check | 5.9:1 on paper |
| `--color-success-tint` | `#E3F2E9` | Matched-skill chips, success messages | Calm confirmation background | 5.4:1 |
| `--color-danger` | `#B42318` | Errors, "missing" skills, reset button | Clear warning red | 6.2:1 on paper |
| `--color-line` | `#E4DCCF` | Card borders, dividers | Soft warm hairline | — |
| `--color-line-strong` | `#8C8576` | Form field borders | Visible input edges (3.5:1, passes the 3:1 UI-component rule) | 3.5:1 |

**Dark mode:** not included. The prompt makes it optional, and the main use scenes (classroom demo on a projector, printing a resume) favor light paper. Keeping one theme also keeps the CSS easy to explain in Q&A.

## Typography

Two Google Fonts, loaded with `<link>` and `display=swap`, each with a system fallback so the site still looks right offline.

| Role | Font | Fallback stack | Purpose |
|------|------|----------------|---------|
| Headings | **Bricolage Grotesque** (600, 700) | `"Segoe UI", system-ui, sans-serif` | A friendly grotesque with a bit of personality: modern and confident without looking corporate |
| Body, forms, UI | **Atkinson Hyperlegible** (400, 700) | `system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif` | Designed by the Braille Institute for maximum legibility; clear letter shapes (I/l/1, 0/O) for long guides and forms |
| Resume preview | System fonts only: Classic = `Georgia, "Times New Roman", serif`; Modern = `Arial, Helvetica, sans-serif` | — | ATS parsers and printers handle standard fonts best; the resume looks the same everywhere |

Type scale (fluid with `clamp()`): body 1.0625rem (17px), line-height 1.6, measure about 68ch. Headings: h1 `clamp(2.1rem, 5vw, 3.4rem)`, h2 `clamp(1.6rem, 3.5vw, 2.3rem)`, h3 1.375rem (22px, a 1.29× step over body text). Headings use `text-wrap: balance`.

## Spacing, radius, shadow

| Token | Value | Purpose |
|-------|-------|---------|
| `--space-1` … `--space-9` | 4, 8, 12, 16, 24, 32, 48, 64, 96 px | One 4px-based scale for every gap and padding; tight inside groups, generous between sections |
| `--radius-sm` | 6px | Inputs, chips |
| `--radius-md` | 10px | Buttons, cards |
| `--radius-lg` | 16px | Large panels, hero illustration frame |
| `--shadow-sm` | `0 1px 2px rgb(28 35 51 / .06), 0 1px 1px rgb(28 35 51 / .04)` | Resting cards: barely lifted paper |
| `--shadow-md` | `0 6px 16px -4px rgb(28 35 51 / .12), 0 2px 4px rgb(28 35 51 / .06)` | Hover and the resume sheet: paper lifted off the desk |

Shadows always have a vertical offset and soft blur (like paper on a desk), never a colored glow.

## Buttons and links

| Element | Style | Purpose |
|---------|-------|---------|
| Primary button (`.btn-primary`) | Ink-blue fill, white text, 10px radius, min-height 44px | The one main action per area (Start building, Download PDF) |
| Secondary button (`.btn-secondary`) | White fill, ink-blue 1.5px border and text | Supporting actions (Load sample, Add entry) |
| Quiet button (`.btn-quiet`) | No border, ink-blue text, underline on hover | Low-priority actions (Remove, Reveal) |
| Danger button (`.btn-danger`) | White fill, red border and text | Destructive actions (Clear all), always confirmed |
| Links | Ink blue, underlined, 0.18em underline offset | Always underlined in body text so links never rely on color alone |

## Hover, focus, and motion

- **Hover:** buttons darken and lift 1px with `--shadow-md`; cards lift 2px. Duration 160ms, `cubic-bezier(.2,.8,.2,1)` (fast ease-out).
- **Focus:** a 3px ink-blue outline with 2px offset on every focusable element (`:focus-visible`). Never removed.
- **Signature motion:** on the home page, the resume sheet slides up out of the brown envelope once on load. It is the only entrance animation on the site.
- **Feedback motion:** checklist progress bar fills smoothly; flashcard answers fade in.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` turns off all transitions and the envelope animation; content shows in its final state.

## Icons and images

- **Icons:** original inline SVGs drawn on a 24px grid with a 1.75px rounded stroke (Lucide-like style, but authored for this site). Decorative icons have `aria-hidden="true"`; icon-only buttons have an `aria-label`. No emoji as icons.
- **Illustrations:** original SVGs in `site/images/` (brown envelope with resume, interview chat bubbles, document checklist, team avatars as initials). No external images, so nothing needs a photo credit. All SVGs are hand-written and small (under 5 KB each).

## Browser details

Text selection uses the highlighter yellow; the caret and checkboxes use ink blue (`accent-color`, `caret-color`); scrollbars are tinted to match. Numbers in progress and match percentages use `font-variant-numeric: tabular-nums`.

## Overall mood

Organized, warm, and encouraging: "you already have more to put on a resume than you think." Local without being kitschy: the envelope, bond paper, and highlighter are things every Filipino student actually uses, not flags or jeepney clip art.
