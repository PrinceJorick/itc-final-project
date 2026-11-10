# Documentation Notes (for the team)

Raw material for the written documentation and the demo. Copy, trim, and reword it in your own voice. Screenshots for every page are in `docs/screenshots/` (desktop and mobile).

---

## 1. Storyboard

| Frame | Page | User Action | Expected Result |
|------:|------|-------------|-----------------|
| 1 | Home (`index.html`) | Opens the site | Hero shows "From school projects to your first job offer." The resume sheet rises out of the brown envelope. Two buttons: Build my resume, Read the resume guide. |
| 2 | Home | Scrolls down | Sees the problem ("What templates ask for" vs "What you actually have"), who it's for, the 3-step journey, and the comparison table vs global tools. |
| 3 | Home | Clicks "Read the resume guide" | Resume Guide opens with "Resume Guide" highlighted in the nav. |
| 4 | Resume Guide | Clicks "Philippine conventions" in the table of contents | Page jumps to the section on photo, age (RA 10911), address, and one-page length. |
| 5 | Resume Guide | Reads Weak vs Strong bullets, clicks "Open the builder" | Builder page opens. |
| 6 | Builder | Clicks "Load sample" | Form fills with Maria Clara Santos's sample; live preview shows the full resume. "Saved on this device" appears. |
| 7 | Builder | Types their own name in Full name | Preview name changes letter by letter. |
| 8 | Builder | Turns on "No experience yet" | Experience section hides; blue note appears; Projects and Organizations move above Education in the preview. |
| 9 | Builder | Clicks "Modern" template | Preview switches to a sans-serif layout with blue name and headings. |
| 10 | Builder | Fills the Bullet helper (verb, what, tool, result) and clicks "Insert bullet" | Sentence "Developed … using …, resulting in …." is added to the chosen project and appears in the preview. |
| 11 | Builder | Clicks "Use a sample posting" in Job-fit checker | Shows a match percentage, green chips for matched skills, red chips for missing skills, and tips. |
| 12 | Builder | Refreshes the page | Everything typed is still there (restored from localStorage). |
| 13 | Builder | Clicks "Download PDF" | Print dialog opens with only the resume on one page; user picks "Save as PDF". |
| 14 | Interview | Clicks the "Behavioral" filter | Flashcard shows only behavioral questions; counter says "Question 1 of 6". |
| 15 | Interview | Clicks "Reveal tip and answer", then "Random question" | Tip and sample answer appear; a different random question loads with the answer hidden. |
| 16 | Interview | Types a STAR answer, refreshes | Answer is still in the boxes. |
| 17 | Checklist | Ticks PSA Birth Certificate and NBI Clearance | Progress bar fills to 15%; label reads "2 of 13 documents ready"; ticked items turn green and are crossed out. |
| 18 | Checklist | Opens "How to get it" on NBI Clearance | Shows requirements, cost, steps, and the official website link. |
| 19 | About | Submits the contact form empty | Red error messages appear under each field; focus moves to the first error. |
| 20 | About | Fills the form correctly and submits | Green message: "Thanks, Ana! … This is a demo, so nothing was sent." |
| 21 | Any page (phone) | Taps "Menu", then a link | Menu opens, link goes to the page, menu closes. |

---

## 2. Wireframe layout descriptions

All pages share: **Header** (logo left, nav right; on phones, a "Menu" button that opens a vertical list) → **Main** → **Footer** (dark ink band: site name, links, class credit). A "Skip to main content" link appears on the first Tab press.

**Home (`index.html`)**
1. Hero: two columns on desktop (headline, lead, 2 buttons, small note | envelope illustration). Stacked on phones.
2. Problem: two columns (text | two side-by-side lists: dashed "What templates ask for" and white "What you actually have").
3. Audience band (kraft background): three columns with a brown top rule each.
4. Journey: three columns, each with an illustration, numbered heading, text, link. One line below about the checklist.
5. Comparison band: full-width table (3 columns), source note under it.
6. Call-to-action band (ink background): centered headline, line, yellow button.

**Resume Guide (`resume-guide.html`)**
1. Page intro: title + lead | illustration.
2. Two columns on desktop: sticky "On this page" box (left, 15rem) | article (right). Stacked on phones.
3. Article sections: definition list of resume sections; PH conventions with a kraft "PH tip" box; two-column Do / Don't cards; formula chips + four weak/strong bullet pairs; no-experience list, blue info note, and a "Ready to put it together?" box with a button.

**Builder (`builder.html`)**
1. Short intro (title + lead).
2. Sticky toolbar under the header: Template chips, No experience switch, Load sample / Clear all / Download PDF, save status.
3. Two columns on desktop: form (left) | sticky live preview in a grey "desk" with a white resume sheet (right). On phones, the preview comes after the form.
4. Form: white fieldset cards for each section; repeatable entries in dashed boxes with Remove; "+ Add" buttons.
5. Two kraft tool panels at the end of the form: Bullet helper, Job-fit checker (results with big percentage, bar, chips, tips).

**Interview (`interview.html`)**
1. Page intro with two buttons | illustration.
2. Flashcard practice: filter chips → large white flashcard (category chip, counter, big question, hidden answer, 4 buttons) → collapsible question list.
3. STAR band: explanation with S/T/A/R rows | white form card with 5 fields.
4. "Questions you'll almost surely hear": 2×2 cards.
5. Attire band: text and list | "Bring in your brown envelope" checklist card.
6. Online tips: five numbered steps in two columns.

**Checklist (`checklist.html`)**
1. Page intro with the yellow "Free under RA 11261" badge explained | envelope illustration.
2. Two columns on desktop: progress box + list of 13 document cards (checkbox, name, badge, where, expandable how-to) | sticky "Get them in this order" card.
3. RA 11261 band: what's free (card) | how to claim + not covered (two cards); kraft "Check with your barangay" note.

**About (`about.html`)**
1. Intro: title + lead.
2. Mission text | "What we believe" card.
3. Team band: 2×2 list with initials avatars, name, role, one line.
4. Sources: two cards (government sources | career advice, fonts, images).
5. Contact band: text + blue "demo form" note | form card (name, email, topic, message, button, success message).

---

## 3. Theme Details

| Element | Choice | Purpose |
|---------|--------|---------|
| **Color Palette** | Ballpoint blue `#2445A8` (actions), ink `#1C2333` (text), bond-paper `#FBF8F3` (background), kraft brown `#C8955A` / tint `#F3E6D3` (warmth, PH tips), highlighter yellow `#FFE27A` (key facts), success green `#1C6E45`, danger red `#B42318` | Based on the "brown envelope" Filipino applicants carry: familiar, warm, trustworthy. Every text color passes WCAG AA (4.5:1 or higher). |
| **Typography** | Headings: Bricolage Grotesque (600/700). Body: Atkinson Hyperlegible (400/700). Resume: Georgia (Classic) or Arial (Modern). | Bricolage is friendly but confident (not corporate). Atkinson was designed for legibility, good for long guides. The resume uses standard fonts so ATS systems and printers read it correctly. |
| **Background** | Warm off-white paper, with kraft-tint bands to separate sections and a dark ink footer/CTA | Feels like paper, easier on the eyes than pure white; bands give rhythm without heavy graphics. |
| **Buttons/Links** | Primary: solid blue, white text. Secondary: white with blue border. Quiet: blue text only. Danger: red outline. Links: blue and always underlined. All buttons at least 44px tall. | Clear hierarchy (one main action per area); underlines mean links never rely on color alone; 44px is easy to tap on phones. |
| **Hover/Animations** | Buttons darken and lift 1px with a soft shadow; cards lift 2px; one hero animation (resume rises from the envelope); answers fade in; progress bars fill smoothly. All turned off with "reduce motion". | Shows what's clickable and gives feedback, without distracting. Respects users sensitive to motion. |
| **Icons** | Original inline SVG line icons (check, x, info, map pin, menu, download, shuffle) and original SVG illustrations | Consistent style, sharp at any size, tiny file size, nothing to credit or license. |
| **Mood** | Organized, warm, encouraging, local | "You already have more to put on a resume than you think." Built for a first-year student, not a corporate recruiter. |

---

## 4. Five-minute demo script (4 speakers)

Open `site/index.html` (or the live URL) before starting. In the builder, press **Clear all** first so the demo starts empty.

**Speaker 1: Problem and solution (0:00–1:15). Suggested: Content and Research**
> "Most of us in this room will apply for OJT soon. When we tried global resume tools like Canva, Resume.io, and Teal, we hit three problems. First, their templates start with Work Experience, which students don't have. Second, some charge just to download your PDF. Third, they don't cover Philippine realities like NBI clearance, PSA birth certificates, or the free documents under RA 11261.
> We researched 12 tools. You can see the comparison here on our home page. Our solution is **OJT to Offer**: a free site that turns school projects and org work into a one-page resume, then prepares you for the interview and the paperwork."
*(Scroll the home page: hero → problem lists → comparison table.)*

**Speaker 2: Design and guide (1:15–2:15). Suggested: Design and CSS**
> "Our theme is the brown envelope every applicant carries: bond-paper background, ballpoint blue for buttons, kraft brown for local tips, and highlighter yellow for the one fact you must not miss. All text passes accessibility contrast standards. We used two fonts: Bricolage Grotesque for headings and Atkinson Hyperlegible, which was designed to be easy to read."
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
- CSS: all colors/sizes are custom properties in `:root` (section 1 of `style.css`). Mobile-first: base styles for phones, `@media (min-width: …)` for bigger screens. `.container` centers content with `max-width` and `margin-inline: auto`. `position: sticky` keeps the header on top. `:focus-visible` gives every focusable element a 3px blue outline.
- JS: `nav.js` adds a `js` class to `<html>`; the CSS rule `.js .site-nav { display: none; }` hides the menu on phones until `.is-open` is added by the Menu button.

**Home**: CSS Grid for the hero (`grid-template-columns: 1.15fr 1fr`), the audience list, and the 3-step journey (`repeat(3, 1fr)`). `<ol>` for the journey because order matters. `<table>` with `<caption>`, `<thead>`, `<th scope="col">`/`scope="row"` for the comparison. Inline `<svg>` illustration with `<title>` for screen readers; `@keyframes sheet-rise` animation.

**Resume Guide**: two-column Grid layout with a `position: sticky` table of contents. `<dl>`, `<dt>`, `<dd>` for "section name + explanation". `<mark>` for the highlighter effect. `<q>` for quotes, `<code>` for file names. `.note` boxes use the kraft tint.

**Builder**: `<form>` with `<fieldset>` and `<legend>` per section; every `<input>` has a `<label for="…">`. Radio buttons styled as pill "chips" using `:has(input:checked)`. The switch is a real `<input type="checkbox" role="switch">` with a CSS track drawn by `::after`. `print.css` (loaded with `media="print"`) hides everything except `.resume` using `display: none !important`. `localStorage.setItem("resumeDraft", JSON.stringify(draft))` saves; `JSON.parse` loads, inside `try/catch`.

**Interview**: radio `<fieldset>` filters; `hidden` attribute to hide/show the answer; `aria-expanded` on the Reveal button; `<details>`/`<summary>` for the question list (opens without JavaScript); CSS `counter()` numbers the online tips.

**Checklist**: list built by JavaScript from `checklistItems` in `data.js` using `document.createElement`. Progress bar is a `<div role="progressbar">` with `aria-valuenow`; the inner bar's `width` is set in JS and animated with `transition: width`. `<details>` for "How to get it".

**About**: contact form with `novalidate` so JavaScript shows friendly errors; `aria-invalid="true"` turns the border red via the `[aria-invalid="true"]` selector; `aria-describedby` links each field to its error text; the success message has `role="status"` so screen readers announce it. Team avatars are initials in a circle (`border-radius: 50%`).
