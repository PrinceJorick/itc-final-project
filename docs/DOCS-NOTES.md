# Documentation Notes (for the team)

Raw material for the written documentation and the demo. Copy, trim, and reword it in your own voice. Screenshots for every page are in `docs/screenshots/` (desktop and mobile, light and dark).

---

## 1. Storyboard

| Frame | Page | User Action | Expected Result |
|------:|------|-------------|-----------------|
| 1 | Home (`index.html`) | Opens the site | Hero shows "Turn school work into your first job offer." with Build my resume and Read the guide buttons. Only the hero shows. In the "School work, rewritten" card, the four parts of the strong bullet (verb, what, tool, result) underline one after another. |
| 2 | Home | Clicks "Show another", then scrolls down | The demo swaps to the next example. Sections rise in as they scroll into view: the problem, the 3-step journey (with the RA 11261 line), and the comparison table that names the tools. |
| 3 | Home | Clicks "Read the guide" | Resume Guide opens with "Resume Guide" marked in the nav with ink text and a small dot. |
| 4 | Resume Guide | Clicks "Philippine conventions" in the table of contents | Page jumps to the section on photo, age (RA 10911), address, and one-page length. |
| 5 | Resume Guide | Reads Weak vs Strong bullets, clicks "Open the builder" | Builder page opens. |
| 6 | Builder | Clicks "Load sample" | Form fills with Maria Clara Santos's sample; live preview shows the full resume. "Saved on this device" appears. |
| 7 | Builder | Types their own name in Full name | Preview name changes letter by letter. |
| 8 | Builder | Turns on "No experience yet" | Experience section hides; a gray note appears; Projects and Organizations move above Education in the preview. |
| 9 | Builder | Clicks "Modern" template | Preview switches to a black-and-white sans-serif layout with a heavy rule under the name. |
| 10 | Builder | Fills the Bullet helper (verb, what, tool, result) and clicks "Insert bullet" | Sentence "Developed … using …, resulting in …." is added to the chosen project and appears in the preview. |
| 11 | Builder | Clicks "Use a sample posting" in Job-fit checker | Shows a match percentage, solid chips for matched skills, outline chips for missing skills, and tips. |
| 12 | Builder | Refreshes the page | Everything typed is still there (restored from localStorage). |
| 13 | Builder | Clicks "Download PDF" | The button shows a spinner for a moment, then the print dialog opens with only the resume on one page; user picks "Save as PDF". |
| 13b | Builder | Clicks "Download backup" | A `simula-backup-….json` file downloads. "Restore" brings it back on another browser. |
| 14 | Interview | Clicks the "Behavioral" filter | Flashcard shows only behavioral questions; counter says "Question 1 of 6". |
| 15 | Interview | Clicks "Reveal tip and answer", then "Random" | Tip and sample answer appear; a different random question loads with the answer hidden. |
| 16 | Interview | Types a STAR answer, refreshes | Answer is still in the boxes. |
| 16b | Interview | Clicks "Copy" on the thank-you email | The button turns ink with a check mark and says "Copied"; the email is on the clipboard. |
| 17 | Checklist | Ticks PSA Birth Certificate and NBI Clearance | Progress bar fills to 15%; label reads "2 of 13 documents ready"; ticked boxes fill with ink and the items turn gray and are crossed out. |
| 18 | Checklist | Opens "How to get it" on NBI Clearance | Shows requirements, cost, steps, and the official website link. |
| 19 | About | Submits the contact form empty | Error messages with a "!" icon appear under each field; focus moves to the first error. |
| 20 | About | Fills the form correctly and submits | Success message: "Thanks, Ana! … This is a demo, so nothing was sent." |
| 21 | Any page (phone or tablet) | Taps "Menu", then a link | A rounded panel opens over a frosted page; the link goes to the page and the menu closes. |
| 22 | Any page | Clicks the moon button in the header | The site switches to dark mode; the choice is remembered on every page. The resume preview stays black on white. |

---

## 2. Wireframe layout descriptions

All pages share: **Header** (logo left, nav right; on phones, a "Menu" button that opens a vertical list) → **Main** → **Footer** (logo, links, class credit); a sun/moon button in the header switches light and dark mode. A "Skip to main content" link appears on the first Tab press.

**Home (`index.html`)**
1. Hero: two columns on desktop (headline, lead, 2 buttons, small note | "School work, rewritten" card: before line, arrow, after bullet, 4-part legend, Show another). Stacked on phones.
2. Problem: two columns (text | two lists: dashed "Templates ask for" and gray "You already have").
3. Journey band: three rounded cards, each with a numbered heading, text, and link. One line below on RA 11261.
4. Comparison: table (3 columns) naming the tools; on phones each row becomes a stacked card.
5. Call to action band: centered headline, line, ink pill button.

**Resume Guide (`resume-guide.html`)**
1. Page intro: title + lead | guide illustration in a rounded frame (desktop).
2. Two columns on desktop: sticky "On this page" box (left, 15rem) | article (right). Stacked on phones.
3. Article sections: definition list of resume sections; PH conventions as a definition list with a gray "PH tip" box; two-column Do / Don't cards; formula chips + three weak/strong bullet pairs; no-experience list, gray info note, and a "Ready to build it?" box with a button.

**Builder (`builder.html`)**
1. Intro: title + lead | "Saved only in this browser" note with Download backup and Restore.
2. Sticky toolbar under the header: Template chips, No experience switch, Load sample / Clear all / Download PDF, save status.
3. Two columns on desktop: form (left) | sticky live preview in a grey "desk" with a white resume sheet (right). On phones and tablets, the preview comes after the form and a floating "See preview" pill jumps to it.
4. Form: rounded cards for each section; repeatable entries in inner boxes with Remove; "+ Add" buttons.
5. Two tool panels at the end of the form: Bullet helper, Job-fit checker (results with big percentage, bar, chips, tips).

**Interview (`interview.html`)**
1. Page intro with two buttons | interview illustration (desktop).
2. Flashcard practice: filter pills + "Add your own" button → large rounded flashcard (category chip, counter, big question, hidden answer, buttons) → collapsible question list.
3. STAR band: explanation with S/T/A/R rows | white form card with 5 fields.
4. "Questions to plan for": 2×2 cards (salary, night shift, relocation, why hire you).
5. Online and technical band: two columns of numbered tips.
6. Attire: text and list | "Bring in a folder" card.
7. "After the interview" band: two email templates, each with a Copy button.

**Checklist (`checklist.html`)**
1. Page intro with the outlined "Free under RA 11261" badge explained | checklist illustration (desktop).
2. Two columns on desktop: progress box + list of 13 document cards (checkbox, name, badge, where, expandable how-to) | sticky "Get them in this order" card.
3. RA 11261 band: "who qualifies" row of four conditions → what's free (card) | how to claim + not covered (two cards); "Verify with your barangay or PESO" note.

**About (`about.html`)**
1. Intro: title + lead.
2. Mission text | "What we believe" card.
3. Team band: 2×2 cards with initials avatars and names (role shown for the developer).
4. Privacy and your data: three plain promises | "What Simula saves" card with Download, Restore, Delete everything.
5. Sources: two cards (government sources | career advice, the 12 compared tools, fonts, images).
6. Contact band: text + "Demo form" note | form card (name, email, topic, message, button, success message).

---

## 3. Theme Details

| Element | Choice | Purpose |
|---------|--------|---------|
| **Color Palette** | Seven mono tokens. Light: page `--bg` #FFFFFF, soft fill `--surface` #F4F4F5, borders `--line` #E4E4E7, decoration `--muted` #A1A1AA, secondary text `--text-muted` #52525B, text and buttons `--ink` #0A0A0A, text on ink `--on-ink` #FFFFFF. Dark: #0A0A0A, #18181B, #27272A, #52525B, #A1A1AA, #FAFAFA, #0A0A0A. One error color for forms only (#B91C1C / #F87171). | Monochrome keeps attention on the content and reads as professional, which suits a career site, and makes light and dark mode consistent (each token simply flips). Every text color passes WCAG AA in both modes. |
| **Font Family** | IBM Plex Sans (400, 600) for all text; IBM Plex Mono (400, 500) for eyebrow labels, counts and table headers. Resume: Georgia (Classic) or Arial (Modern). | Plex is neutral and very readable; SemiBold headings give hierarchy without color. Mono labels and tabular numbers line up neatly. The resume uses standard fonts so ATS systems and printers read it. |
| **Background Style** | Flat white (light) or near-black (dark) pages, with soft `--surface` gray sections and panels. No gradients, no images behind text. | Depth comes from soft fills instead of shadows, so the page stays calm and the content stands out. |
| **Buttons and Links** | Ink pill buttons (44px tall) with white text; outline pills for secondary actions; ink links with a thin underline. A "Build resume" pill in the header. The current page is ink text with a small dot. | Clear hierarchy (one solid button per area), easy to tap on phones, and links never rely on color. |
| **Hover Effects** | Subtle fill and opacity changes in 150-200ms: primary buttons fade slightly, outline buttons and cards fill with `--surface`, links get a stronger underline. No scroll animations. All instant with "reduce motion". | Shows what is clickable without distracting from reading, and respects users sensitive to motion. |
| **Icons/Graphics** | Original rounded mono illustrations (guide, interview, checklist) in light and dark versions, and the dot-and-pill Simula mark, which inverts with the theme. Inline SVG line icons. | One consistent rounded style, sharp at any size, small files, and it always matches the chosen theme. |
| **Overall Mood** | Clean, calm, premium, focused on content | "Simula" means "beginning": a clean, confident first step toward a job. |

---

## 4. Five-minute demo script (4 speakers)

Open `site/index.html` (or the live URL) before starting. In the builder, press **Clear all** first so the demo starts empty.

**Speaker 1: Problem and solution (0:00–1:15).**
> "Most of us in this room will apply for OJT soon. When we tried global resume tools like Canva, Resume.io, and Teal, we hit three problems. First, their templates start with Work Experience, which students don't have. Second, some charge just to download your PDF. Third, they don't cover Philippine realities like NBI clearance, PSA birth certificates, or the free documents under RA 11261.
> We researched 12 tools. You can see the comparison here on our home page. Our solution is **Simula**: a free site that turns school projects and org work into a one-page resume, then prepares you for the interview and the paperwork."
*(Point at the hero demo as the bullet's parts underline, press "Show another", then scroll: problem lists → comparison table, which names the tools.)*

**Speaker 2: Design and guide (1:15–2:15).**
> "Our name, Simula, means beginning. The look is monochrome, like our logo: black on white by day, white on black at night, with IBM Plex fonts and rounded shapes. It's minimal on purpose, so the content stands out, and every color passes accessibility contrast checks in both modes. You can switch themes with this button, and even the illustrations change."
*(Hover a button to show the fill. Open Resume Guide, click a table-of-contents link, show the PH tip box and weak vs strong bullets. On a phone or narrow window, show the Menu button.)*

**Speaker 3: Builder (2:15–3:45). Suggested: Developer, Prince Jorick**
> "This is the resume builder. Watch the preview as I type my name." *(type)* "If I have no work experience, I turn this on, and projects and orgs move to the top. Stuck on a bullet? The bullet helper builds it from an action verb, what I did, the tool, and the result, and inserts it with one click." *(insert)* "I can switch to the Modern template. Now let me paste an OJT posting into the job-fit checker." *(Use a sample posting)* "It shows what I match and what I'm missing. Everything is saved in the browser, so if I refresh…" *(refresh)* "…it's still here. Download PDF prints just the resume on one page." *(open print dialog, cancel.)* "It's saved only in this browser, so I can download a backup file and restore it anywhere."

**Speaker 4: Interview, checklist, wrap-up (3:45–5:00).**
> "Next is interview practice. I can filter to Behavioral questions, try answering out loud, then reveal the tip and a sample answer. The STAR template saves my own answer. After the offer comes the paperwork: this checklist saves my progress and explains how to get each document and which ones are free under RA 11261. All facts are cited on our About page, where there's also a contact form. It's a demo, so it validates but doesn't send anything. After an interview, I can copy a thank-you email in one click.
> To sum up: Guide, Build, Practice, all free, no sign-up, and it works offline. Thank you!"

---

## 5. Key HTML and CSS elements per page (for Q&A)

**Every page**
- HTML: `<!DOCTYPE html>`, `<html lang="en">`, `<meta name="viewport">` for phones, `<header>`, `<nav aria-label="Main">`, `<main id="main">`, `<section>`, `<footer>`. Skip link `<a class="skip-link" href="#main">`. Current page marked with `aria-current="page"`.
- CSS: all colors/sizes are custom properties in `:root` (seven mono color tokens: `--bg`, `--surface`, `--line`, `--muted`, `--text-muted`, `--ink`, `--on-ink`) (section 1 of `style.css`). Mobile-first: base styles for phones, `@media (min-width: …)` for bigger screens. `.container` centers content with `max-width` and `margin-inline: auto`. `position: sticky` and `backdrop-filter` make the frosted header. `:focus-visible` gives keyboard users a 2px ink focus ring (never shown on mouse clicks).
- Dark mode: the same custom properties are redefined under `:root[data-theme="dark"]` and inside `@media (prefers-color-scheme: dark)`. `nav.js` saves the choice in `localStorage` (`simula-theme`) and sets `data-theme` on `<html>` before the page draws, so there's no flash.
- JS: `nav.js` adds a `js` class to `<html>`; on phones the CSS hides `.js .site-nav` (opacity and `visibility: hidden`) until the Menu button adds `.is-open`, which slides the panel down.

**Home**: CSS Grid for the hero (`grid-template-columns: 1.2fr 1fr`) and the 3-step journey (`repeat(3, 1fr)`). `<ol>` for the journey because order matters. The demo is a `<figure>`; `home.js` adds `.is-lit` to each `<span class="part">` in turn, and CSS grows an underline drawn with `background-size` from 0% to 100%. `<table>` with `<caption>`, `<thead>`, `<th scope>` for the comparison; under 40rem a media query sets every table part to `display: block` and shows each column name with `td::before { content: attr(data-label) }`. `motion.js` uses `IntersectionObserver` to add `.is-revealed` to each `.reveal` section as it scrolls in (hidden only when the `js` class is on, shown at once with reduced motion).

**Resume Guide**: two-column Grid layout with a `position: sticky` table of contents. `<dl>`, `<dt>`, `<dd>` for "section name + explanation". `<mark>` highlights "One page." `<q>` for quotes, `<code>` for file names. `<picture>` with a dark `<source>` shows the light or dark illustration; `nav.js` updates the source's `media` when the theme is picked by hand. `.note` boxes use the `--surface` gray.

**Builder**: `<form>` with `<fieldset>` and `<legend>` per section; every `<input>` has a `<label for="…">`. Radio buttons styled as pill "chips" using `:has(input:checked)`. The switch is a real `<input type="checkbox" role="switch">` with a CSS track drawn by `::after`. `print.css` (loaded with `media="print"`) hides everything except `.resume` using `display: none !important`. `localStorage.setItem("resumeDraft", JSON.stringify(draft))` saves; `JSON.parse` loads, inside `try/catch`.

**Interview**: radio `<fieldset>` filters; `hidden` attribute to hide/show the answer; `aria-expanded` on the Reveal button; `<details>`/`<summary>` for the question list (opens without JavaScript); CSS `counter()` numbers the online tips.

**Checklist**: list built by JavaScript from `checklistItems` in `data.js` using `document.createElement`. Progress bar is a `<div role="progressbar">` with `aria-valuenow`; the inner bar's `width` is set in JS. Each checkbox is a real `<input>` restyled with `appearance: none`, a rounded border, and an ink fill with a tick image when `:checked`. `<details>` for "How to get it".

**About**: contact form with `novalidate` so JavaScript shows friendly errors; `aria-invalid="true"` turns the border to the error color via the `[aria-invalid="true"]` selector; `aria-describedby` links each field to its error text; the success message has `role="status"` so screen readers announce it. Team avatars are initials in a circle (`border-radius: 50%`).
