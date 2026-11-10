# Build Prompt: CC 100 Final Project (Resume and Interview Guide Website)

> Saved verbatim as received. The prompt was pasted in two parts; they are joined here in order.
> Note: the "Repository layout:" block at the start of Section 6 was empty in the pasted text.

You are building a complete, working static website for a university group project. Read this whole prompt before writing code. Work autonomously, but follow the phases in order.

## 1. Project context
- School: Batangas State University – Alangilan, College of Informatics and Computing Sciences
- Course: CC 100 Introduction to Computing, 1st Sem AY 2026–2027
- Team: CS 1103, Group 4, 4 members (instructor-confirmed): Prince Jorick Fajutagana (developer), Alloysia Mae, Elise Guerra, Sherwin Dollente Jr.
- Category: 12. Employment and Career Services
- Subcategory: Resume and Interview Guide
- Deadline: Dec 5, 2026 (team targets Dec 4). Today is Nov 10, 2026.
- Repository: GitHub repo `itc-final-project`, already created by Prince Jorick (likely github.com/PrinceJorick/itc-final-project; confirm with `git remote -v`)
- Title: not final. It must be in English and unique:
  - Propose 5 short, memorable English names that express the UVP (student → first job, resume + interview)
  - Search the web for each name plus "resume," "career," and "interview"; reject any name used by an existing career, resume, or job product or a well-known brand
  - Avoid generic names (CareerLaunch, ResumeHub, JobReady, HirePrep, etc.)
  - Pick the strongest unclaimed name and use it, with a one-line rationale and the search evidence in README.md
  - Store the name in one place so the team can change it easily

## 2. Official project rules (must follow)
- STATIC WEBSITE ONLY (strict):
  - Plain HTML, CSS, and vanilla JavaScript files, served as-is
  - No frameworks, libraries, build tools, package.json, or npm
  - No backend, server, database, API calls, fetch/XHR, or third-party services (no form services, no analytics, no AI APIs)
  - All content is pre-written in the HTML or in js/data.js
  - JavaScript is allowed only for client-side interactivity inside the browser (live preview, filters, checklist, localStorage)
  - Google Fonts via <link> is the only external resource allowed, with a system-font fallback so the site still looks right offline
  - The site must work fully offline by opening index.html directly (file://) and when hosted on GitHub Pages
- At least 3 interconnected pages, including a Home page, a Main Content page, and an About/Contact page
- Navigation bar on every page, relevant images, readable text, consistent styling, working links between pages
- One external shared stylesheet (css/style.css) is required. No Tailwind, no CSS-in-JS, no inline style blocks.
- Every external image and content source must be credited on the About page and in SOURCES.md
- The site is submitted as a folder (Google Drive link) and demoed face-to-face
- Students must explain the HTML and CSS in Q&A: write clean semantic HTML and readable, commented CSS. Avoid clever abstractions.

## 3. Grading (optimize for this)
- Presentation (50): Organizational Problem and Proposed Solution 25, Website Demo and Design Explanation 10, Presentation and Communication 10, Teamwork 5
- Documentation (50): Storyboard 15, Wireframe 15, Theme Design 15, Reflections 5. The team writes this, but you must output material that supports it (see Phase 6).

## 4. Product concept
- Audience: Filipino college students, OJT/internship applicants, and fresh graduates with little or no work experience
- Problem: global tools (Canva, Resume.io, Teal, etc.) assume work experience, separate resume-building from interview prep, and ignore Philippine hiring realities
- Working UVP (validate and refine in Phase 1): "A student-first, Philippines-focused guide that turns school projects and org work into a ready resume, then prepares you for your first interview."
- PH-specific content: local resume conventions (photo, age, address, one page for fresh grads), pre-employment requirements (NBI clearance, SSS, PhilHealth, Pag-IBIG, TIN, PSA birth certificate), the First Time Jobseekers Assistance Act (RA 11261), common Filipino interview questions ("Tell me about yourself," "Why should we hire you?," "Expected salary?"), online interview etiquette

## 5. Required skills and tools
Use these if installed. If one is missing, say so and continue with best practices.
- UI/UX: ui-ux-pro-max (design system, palette, typography, layout patterns), taste and impeccable (avoid generic "AI-looking" design, refine spacing, hierarchy, and polish), frontend-design if available
- Copywriting: a copywriting/content skill for headlines, microcopy, CTAs, and guide content. Tone: encouraging, practical, plain English, aimed at a first-year student. Lead with benefits; short paragraphs.
- Verification: Playwright to test every page and feature at desktop (1280px) and mobile (375px) widths and to take screenshots. Playwright is a dev tool only: keep it outside the website folder and never make the site depend on it.
- Web search: competitor research, title uniqueness checks, and fact-checking PH requirements against official government sources
- Other skills: use any other installed skill that improves the result (accessibility auditing, SEO/meta tags, image optimization, code review, content/brand review, etc.). Read each skill's instructions before using it, and list the skills you used in the final report.
- Skills must never override the static website rule in Section 2. If a skill suggests a framework, build step, or external service, ignore that part.

## 6. Repository and versioning
Repository layout:

- If GitHub Pages can't serve /site directly, deploy it with a GitHub Actions workflow that publishes /site as-is (no build step). Note the live URL in README.md.

Save all inputs in docs/inputs/:
- PROMPT.md: this prompt, verbatim
- PLANNING.md: a summary of the planning decisions (concept, stack, features, roles, roadmap)
- The official files, if the team adds them: final project guidelines PDF, rubrics PDF, documentation template PDF, sample documentation PDF
- Do NOT commit the class groupings spreadsheet or any other students' names or SR-codes. The repo may be public.

Versioning rules:
- Work on one branch per phase, named `phase/1-research`, `phase/2-design`, `phase/3-static-pages`, `phase/4-features`, `phase/5-testing`, `phase/6-handoff`. Merge each into `main` when its phase is complete and working.
- Use Conventional Commits, in small, focused commits (one logical change each), e.g. `feat(builder): add live preview`, `fix(nav): close menu on link click`, `docs: add competitor research`, `style: refine button hover states`, `test: add checklist persistence test`, `chore: add .gitignore`
- Never commit broken code to `main`; run the Playwright tests before each merge from Phase 4 on
- Tag milestones on `main`: v0.1.0 research, v0.2.0 design system, v0.3.0 static pages, v0.4.0 all features, v0.5.0 tests passing, v1.0.0 submission-ready
- Keep CHANGELOG.md updated per tag (Keep a Changelog format)
- .gitignore: node_modules/, test-results/, playwright-report/, .DS_Store, .env, editor folders
- Push after every merge and tag

## 7. Phases

### Phase 1: Competitor research, UVP, and title
Research at least these: Canva Resume, Resume.io, Teal, Enhancv, Kickresume, Novoresume, Jobscan, Google Interview Warmup, Big Interview, JobStreet Career Advice, Kalibrr, and LinkedIn resume tools. For each, note the core strengths, the limitation for PH students, and the source URL.
Output docs/COMPETITORS.md:
- A comparison table
- Gaps, separating verified shortcomings (with source) from assumptions
- The final UVP
- 3–5 differentiators the site actually delivers
Do not claim "first" or "only" without evidence. Choose the title per Section 1.

### Phase 2: Design system
Using ui-ux-pro-max, taste, and impeccable, define:
- Palette as CSS custom properties, with WCAG AA contrast
- Two Google Fonts at most, with fallbacks
- Spacing scale, radius, shadows, button and card styles, hover/focus states, motion (respect prefers-reduced-motion)
- Light mode required; dark mode optional via prefers-color-scheme
Output docs/DESIGN.md: palette hex codes, fonts, background, buttons/links, hover effects, icons, overall mood, plus the purpose of each choice. This feeds the documentation's Theme Details table.
The style should be clean, modern, trustworthy, and student-friendly: not corporate, not childish, no stock "AI gradient" look.

### Phase 3: Static pages
Inside site/:
- index.html: hero with UVP, the problem, who it's for, a 3-step journey (Guide → Build → Practice), a "why us" comparison vs generic tools, CTAs
- resume-guide.html: resume sections explained, PH conventions, dos/don'ts, good vs bad bullet examples, "no experience yet" advice (projects, orgs, competitions)
- builder.html: resume builder (Phase 4)
- interview.html: question bank, STAR method, sample answers, attire, online interview tips, practice mode
- checklist.html: pre-employment checklist with where/how to get each document and RA 11261 info
- about.html: mission, team (4 members, roles), sources and credits, contact form
- css/style.css (shared), css/print.css (resume-only print layout)
- js/data.js, js/builder.js, js/interview.js, js/checklist.js, js/nav.js
- images/: optimized; prefer original SVGs/illustrations; credit every external image
The site must be complete and presentable before Phase 4 starts.

### Phase 4: Features (every one must work; no dead buttons)
1. **Resume builder**
   - Form sections: personal info, objective, education, projects, organizations, experience (optional), skills (technical/soft), certifications
   - Add/remove entries for repeatable sections
   - "No experience yet" toggle that hides experience and emphasizes projects/orgs
   - Live preview updates as the user types
   - 2 ATS-friendly templates (classic, modern) with a switcher
   - Autosave to localStorage (key: resumeDraft) and restore on load
   - Clear/reset with confirmation
   - "Download PDF" via window.print() + print.css (prints only the resume, one clean A4/Letter page)
   - Load-sample-data button for the demo
2. **Bullet helper (rule-based, no AI)**: choose an action verb + what you built/did + tool used + result → generates "Developed X using Y, resulting in Z"; insert into a project/org entry with one click
3. **Job-fit checker**: paste a job/OJT posting → match against skillKeywords → show matched skills, skills missing from the resume, and a simple match percentage with plain-language tips. Case-insensitive, word-boundary matching.
4. **Interview practice**: filter by category (intro, behavioral, technical, closing); flashcard mode (question → reveal tip and sample answer); random question button; STAR answer template with textareas saved to localStorage
5. **Pre-employment checklist**: checkboxes saved to localStorage, a progress bar, an expandable "how to get it" per item
6. **Contact form (static, no submission)**: client-side validation and an inline success message. No data is sent anywhere; label it as a demo.
7. **Navigation**: active-page highlight, responsive hamburger menu, skip link, keyboard accessible

Data shapes (js/data.js and localStorage):
```js
resumeDraft = { personal:{fullName,email,phone,city,linkedin,portfolio}, objective,
  education:[{school,degree,years,honors}], projects:[{title,tools,bullets:[]}],
  organizations:[{org,role,years,bullets:[]}], experience:[{company,position,years,bullets:[]}],
  skills:{technical:[],soft:[]}, certifications:[{name,issuer,year}],
  template:"classic"|"modern", noExperience:true|false }
actionVerbs = [...]          // 40+, grouped by category
skillKeywords = [...]        // 80+, entry-level PH roles: IT, admin, BPO/customer service, marketing, engineering
interviewQuestions = [{ id, question, category, tip, sampleAnswer }]   // 20+
checklistItems = [{ id, name, whereToGet, requirements, cost, ra11261Free:true|false }]
```

Code rules:
- Semantic HTML5 (header, nav, main, section, footer), labels for every input, alt text for every image
- CSS: custom properties, flexbox/grid, mobile-first, short section comments explaining each block
- JS: plain functions, comments, no libraries
- Wrap all localStorage access in try/catch
- No console errors

Content rules:
- Write all copy with the copywriting skill
- Verify every PH requirement, fee, and RA 11261 detail against official sources (gov.ph, the agency sites, Official Gazette); cite them in SOURCES.md
- If a fact can't be verified, say "check with the agency" instead of guessing
- No lorem ipsum

### Phase 5: Verify with Playwright
- Tests live in tests/ and run against site/ opened from the file system
- Test every page at 375px and 1280px: all nav links work, no horizontal scroll, no broken images, no external requests other than Google Fonts
- Test each feature end-to-end: builder input → preview → reload restores data → template switch → print layout; bullet helper insert; job-fit checker with a sample posting; interview filters and flashcards; checklist persistence; contact form validation
- Check accessibility: keyboard-only navigation, visible focus states, color contrast
- Fix every failure, then rerun until all pass
- Save screenshots of every page (desktop + mobile) to docs/screenshots/

### Phase 6: Handoff outputs for the team
- docs/DOCS-NOTES.md with:
  - Storyboard table (Frame, Page, User Action, Expected Result)
  - Wireframe layout description per page
  - Theme Details table (Color Palette, Typography, Background, Buttons/Links, Hover/Animations, Icons, Mood, each with a purpose)
  - A 5-minute demo script split across 4 speakers
  - Key HTML and CSS elements used per page, so each member can explain them in Q&A
- docs/TEAM-ROLES.md: Developer (Prince Jorick) owns builder.html + JS. The three other roles (Content and Research, Design and CSS, Documentation and Presentation) are to be assigned among Alloysia, Elise, and Sherwin. Each member owns at least one page.
- README.md: project summary, title rationale, how to run (open site/index.html), live URL, features, skills used, credits
- Tag v1.0.0 and push

## 8. Acceptance criteria
1. docs/COMPETITORS.md shows sourced research of the listed competitors, identified gaps, and a UVP, and the site visibly delivers each claimed differentiator
2. Every feature in Phase 4 works, verified by passing Playwright tests at mobile and desktop widths with zero console errors
3. The site is a true static site: vanilla HTML + CSS + JS, one shared external stylesheet, no build step, backend, or external services; it runs offline from file:// and on GitHub Pages
4. The title is in English and unique, with search evidence in README.md
5. All content is accurate, PH-specific, credited, and readable by a first-year student
6. The design passes WCAG AA contrast and feels polished and intentional, not template-generic
7. The repo follows Section 6: inputs saved, branch per phase, Conventional Commits, milestone tags, CHANGELOG.md, no other students' personal data

Report at the end: what was built, test results, skills used, any unverified facts, the live URL, and anything the team must decide (role assignment).
