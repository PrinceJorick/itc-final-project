# Documentation Notes (for the team)

Raw material for the written documentation and the demo. Copy, trim, and reword it in your own voice. Screenshots for every page are in `docs/screenshots/` (desktop and mobile).

---

## 1. Storyboard

| Frame | Page | User Action | Expected Result |
|------:|------|-------------|-----------------|
| 1 | Home (`index.html`) | Opens the site | Hero shows "Turn school work into your first job offer." with Build my resume and Read the guide buttons. The "What's inside" card counts up to 8, 22, and 13. |
| 2 | Home | Scrolls down | Sections fade in: the problem ("Templates ask for" vs "You already have"), who it's for, the 3-step journey, and the comparison table vs global tools. |
| 3 | Home | Clicks "Read the guide" | Resume Guide opens with "Resume Guide" highlighted by a green pill in the nav. |
| 4 | Resume Guide | Clicks "Philippine conventions" in the table of contents | Page jumps to the section on photo, age (RA 10911), address, and one-page length. |
| 5 | Resume Guide | Reads Weak vs Strong bullets, clicks "Open the builder" | Builder page opens. |
| 6 | Builder | Clicks "Load sample" | Form fills with Maria Clara Santos's sample; live preview shows the full resume. "Saved on this device" appears. |
| 7 | Builder | Types their own name in Full name | Preview name changes letter by letter. |
| 8 | Builder | Turns on "No experience yet" | Experience section hides; a green note appears; Projects and Organizations move above Education in the preview. |
| 9 | Builder | Clicks "Modern" template | Preview switches to a black-and-white sans-serif layout with a heavy rule under the name. |
| 10 | Builder | Fills the Bullet helper (verb, what, tool, result) and clicks "Insert bullet" | Sentence "Developed … using …, resulting in …." is added to the chosen project and appears in the preview. |
| 11 | Builder | Clicks "Use a sample posting" in Job-fit checker | Shows a match percentage, green chips for matched skills, red chips for missing skills, and tips. |
| 12 | Builder | Refreshes the page | Everything typed is still there (restored from localStorage). |
| 13 | Builder | Clicks "Download PDF" | Print dialog opens with only the resume on one page; user picks "Save as PDF". |
| 14 | Interview | Clicks the "Behavioral" filter | Flashcard shows only behavioral questions; counter says "Question 1 of 6". |
| 15 | Interview | Clicks "Reveal tip and answer", then "Random" | Tip and sample answer appear; a different random question loads with the answer hidden. |
| 16 | Interview | Types a STAR answer, refreshes | Answer is still in the boxes. |
| 17 | Checklist | Ticks PSA Birth Certificate and NBI Clearance | Progress bar fills to 15%; label reads "2 of 13 documents ready"; ticked items turn green and are crossed out. |
| 18 | Checklist | Opens "How to get it" on NBI Clearance | Shows requirements, cost, steps, and the official website link. |
| 19 | About | Submits the contact form empty | Red error messages appear under each field; focus moves to the first error. |
| 20 | About | Fills the form correctly and submits | Green message: "Thanks, Ana! … This is a demo, so nothing was sent." |
| 21 | Any page (phone) | Taps "Menu", then a link | Menu slides down, link goes to the page, menu closes. |
| 22 | Any page | Clicks the moon button in the header | The site switches to dark mode; the choice is remembered on every page. The resume preview stays black on white. |

---

## 2. Wireframe layout descriptions

All pages share: **Header** (logo left, nav right; on phones, a "Menu" button that opens a vertical list) → **Main** → **Footer** (logo, links, class credit); a sun/moon button in the header switches light and dark mode. A "Skip to main content" link appears on the first Tab press.

**Home (`index.html`)**
1. Hero: two columns on desktop (headline, lead, 2 buttons, small note | "What's inside" card with three rows, counts, and meters). Stacked on phones.
2. Problem: two columns (text | two side-by-side lists: dashed "Templates ask for" and white "You already have").
3. Audience band (light band): three columns with a green top rule each.
4. Journey: three rounded cards, each with a numbered heading, text, and link. One line below about the checklist.
5. Comparison band: full-width table (3 columns), source note under it.
6. Call to action: centered headline, line, green button.

**Resume Guide (`resume-guide.html`)**
1. Page intro: title + lead | guide illustration in a rounded frame (desktop).
2. Two columns on desktop: sticky "On this page" box (left, 15rem) | article (right). Stacked on phones.
3. Article sections: definition list of resume sections; PH conventions as a definition list with a gold "PH tip" box; two-column Do / Don't cards; formula chips + three weak/strong bullet pairs; no-experience list, green info note, and a "Ready to build it?" box with a button.

**Builder (`builder.html`)**
1. Short intro (title + lead).
2. Sticky toolbar under the header: Template chips, No experience switch, Load sample / Clear all / Download PDF, save status.
3. Two columns on desktop: form (left) | sticky live preview in a grey "desk" with a white resume sheet (right). On phones, the preview comes after the form.
4. Form: rounded cards for each section; repeatable entries in inner boxes with Remove; "+ Add" buttons.
5. Two tool panels at the end of the form: Bullet helper, Job-fit checker (results with big percentage, bar, chips, tips).

**Interview (`interview.html`)**
1. Page intro with two buttons | interview illustration (desktop).
2. Flashcard practice: filter pills + "Add your own" button → large rounded flashcard (category chip, counter, big question, hidden answer, buttons) → collapsible question list.
3. STAR band: explanation with S/T/A/R rows | white form card with 5 fields.
4. "Four questions to prepare first": 2×2 cards.
5. Attire band: text and list | "Bring in a folder" checklist card.
6. Online tips: five numbered steps in three columns.

**Checklist (`checklist.html`)**
1. Page intro with the gold "Free under RA 11261" badge explained | checklist illustration (desktop).
2. Two columns on desktop: progress box + list of 13 document cards (checkbox, name, badge, where, expandable how-to) | sticky "Get them in this order" card.
3. RA 11261 band: what's free (card) | how to claim + not covered (two cards); gold "Check with your barangay" note.

**About (`about.html`)**
1. Intro: title + lead.
2. Mission text | "What we believe" card.
3. Team band: 2×2 cards with initials avatars, name, and role.
4. Sources: two cards (government sources | career advice, fonts, images).
5. Contact band: text + green "Demo form" note | form card (name, email, topic, message, button, success message).

---

## 3. Theme Details

| Element | Choice | Purpose |
|---------|--------|---------|
| **Color Palette** | Ledger green `#1D5B4A` (actions), ink `#161A17` (text), white `#FFFFFF` (page), light band `#F6F6F2`, gold `#7A5D1A` on `#F6EFDC` (RA 11261 badge), danger red `#A83226`. Dark mode: `#0F1311` page, `#E8EBE6` text, green `#74C7A6`. | Taken from the Simula logo. One accent color keeps it calm and professional. Every text color passes WCAG AA in both light and dark mode. |
| **Typography** | IBM Plex Sans (400/500/600) for all text; IBM Plex Mono for numbers and small labels. Resume: Georgia (Classic) or Arial (Modern). | Plex is the logo's typeface: neutral, modern, very readable. Mono makes counts line up. The resume uses standard fonts so ATS systems and printers read it correctly. |
| **Background** | White paper with light bands between sections; a near-black green in dark mode, chosen with the sun/moon switch or by the device setting | Clean and minimal; bands give rhythm without heavy graphics. Dark mode is easier on the eyes at night. |
| **Buttons/Links** | Rounded (12px) buttons, 44px tall: green primary, outlined secondary, quiet text, red-outline danger. Pill-shaped nav links; the current page gets one soft green pill. Links are green and underlined. | Clear hierarchy (one main action per area); underlines mean links never rely on color alone; 44px is easy to tap on phones. |
| **Hover/Animations** | Buttons lift 1px and press down slightly; cards lift on hover; sections fade up on scroll; home counters count up; the theme icon rotates; the mobile menu slides down. All turned off with "reduce motion". | Gives feedback and shows what's clickable without distracting. Respects users sensitive to motion. |
| **Icons** | Simula logo and favicon, three illustrations (guide, interview, checklist) from the brand artifact, and inline SVG line icons | One consistent style, sharp at any size, tiny files. |
| **Mood** | Minimal, calm, professional, encouraging | "Simula" means "beginning": a clean record of your first steps toward a job. |

---

## 4. Five-minute demo script (4 speakers)

Open `site/index.html` (or the live URL) before starting. In the builder, press **Clear all** first so the demo starts empty.

**Speaker 1: Problem and solution (0:00–1:15). Suggested: Content and Research**
> "Most of us in this room will apply for OJT soon. When we tried global resume tools like Canva, Resume.io, and Teal, we hit three problems. First, their templates start with Work Experience, which students don't have. Second, some charge just to download your PDF. Third, they don't cover Philippine realities like NBI clearance, PSA birth certificates, or the free documents under RA 11261.
> We researched 12 tools. You can see the comparison here on our home page. Our solution is **OJT to Offer**: a free site that turns school projects and org work into a one-page resume, then prepares you for the interview and the paperwork."
*(Scroll the home page: hero → problem lists → comparison table.)*

**Speaker 2: Design and guide (1:15–2:15). Suggested: Design and CSS**
> "Our name, Simula, means beginning. The look comes from our logo: white paper, one ledger green for actions, and IBM Plex fonts. It's minimal on purpose, so the content stands out, and every color passes accessibility contrast checks in both light and dark mode. You can switch themes with this button."
*(Hover a button to show the lift. Open Resume Guide, click a table-of-contents link, show the PH tip box and weak vs strong bullets. On a phone or narrow window, show the Menu button.)*

**Speaker 3: Builder (2:15–3:45). Suggested: Developer, Prince Jorick**
> "This is the resume builder. Watch the preview as I type my name." *(type)* "If I have no work experience, I turn this on, and projects and orgs move to the top. Stuck on a bullet? The bullet helper builds it from an action verb, what I did, the tool, and the result, and inserts it with one click." *(insert)* "I can switch to the Modern template. Now let me paste an OJT posting into the job-fit checker." *(Use a sample posting)* "It shows what I match and what I'm missing. Everything is saved in the browser, so if I refresh…" *(refresh)* "…it's still here. Download PDF prints just the resume on one page." *(open print dialog, cancel.)*

**Speaker 4: Interview, checklist, wrap-up (3:45–5:00). Suggested: Documentation and Presentation**
> "Next is interview practice. I can filter to Behavioral questions, try answering out loud, then reveal the tip and a sample answer. The STAR template saves my own answer. After the offer comes the paperwork: this checklist saves my progress and explains how to get each document and which ones are free under RA 11261. All facts are cited on our About page, where there's also a contact form. It's a demo, so it validates but doesn't send anything.
> To sum up: Guide, Build, Practice, all free, no sign-up, and it works offline. Thank you!"

---

## 5. Key HTML and CSS elements per page (for Q&A)

**Every page**
- HTML: `<!DOCTYPE html>`, `<html lang="en">`, `<meta name="viewport">` for phones, `<header>`, `<nav aria-label="Main">`, `<main id="main">`, `<section>`, `<footer>`. Skip link `<a class="skip-link" href="#main">`. Current page marked with `aria-current="page"`.
- CSS: all colors/sizes are custom properties in `:root` (section 1 of `style.css`). Mobile-first: base styles for phones, `@media (min-width: …)` for bigger screens. `.container` centers content with `max-width` and `margin-inline: auto`. `position: sticky` and `backdrop-filter` make the frosted header. `:focus-visible` gives keyboard users a green focus ring (never shown on mouse clicks).
- Dark mode: the same custom properties are redefined under `:root[data-theme="dark"]` and inside `@media (prefers-color-scheme: dark)`. `nav.js` saves the choice in `localStorage` (`simula-theme`) and sets `data-theme` on `<html>` before the page draws, so there's no flash.
- JS: `nav.js` adds a `js` class to `<html>`; on phones the CSS hides `.js .site-nav` (opacity and `visibility: hidden`) until the Menu button adds `.is-open`, which slides the panel down.

**Home**: CSS Grid for the hero (`grid-template-columns: 1.2fr 1fr`), the audience list, and the 3-step journey (`repeat(3, 1fr)`). `<ol>` for the journey because order matters. `<table>` with `<caption>`, `<thead>`, `<th scope="col">`/`scope="row"` for the comparison. `motion.js` counts up the numbers in the "What's inside" card and fades sections in with `IntersectionObserver`.

**Resume Guide**: two-column Grid layout with a `position: sticky` table of contents. `<dl>`, `<dt>`, `<dd>` for "section name + explanation". `<mark>` highlights "One page." `<q>` for quotes, `<code>` for file names. `<figure class="illus">` frames the illustration. `.note` boxes use the gold tint.

**Builder**: `<form>` with `<fieldset>` and `<legend>` per section; every `<input>` has a `<label for="…">`. Radio buttons styled as pill "chips" using `:has(input:checked)`. The switch is a real `<input type="checkbox" role="switch">` with a CSS track drawn by `::after`. `print.css` (loaded with `media="print"`) hides everything except `.resume` using `display: none !important`. `localStorage.setItem("resumeDraft", JSON.stringify(draft))` saves; `JSON.parse` loads, inside `try/catch`.

**Interview**: radio `<fieldset>` filters; `hidden` attribute to hide/show the answer; `aria-expanded` on the Reveal button; `<details>`/`<summary>` for the question list (opens without JavaScript); CSS `counter()` numbers the online tips.

**Checklist**: list built by JavaScript from `checklistItems` in `data.js` using `document.createElement`. Progress bar is a `<div role="progressbar">` with `aria-valuenow`; the inner bar's `width` is set in JS and animated with `transition: width`. `<details>` for "How to get it".

**About**: contact form with `novalidate` so JavaScript shows friendly errors; `aria-invalid="true"` turns the border red via the `[aria-invalid="true"]` selector; `aria-describedby` links each field to its error text; the success message has `role="status"` so screen readers announce it. Team avatars are initials in a circle (`border-radius: 50%`).
