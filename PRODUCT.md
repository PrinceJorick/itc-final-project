# Product

<!-- impeccable:product-schema 1 -->

> Written from the build brief (`docs/inputs/PROMPT.md`), which answered every init question. The team asked for autonomous work, so no separate interview was held. Facts below come from the brief unless marked *inferred*.

## Platform

web

## Stack
Static HTML, one shared CSS file plus a print stylesheet, vanilla JavaScript. No frameworks, build step, backend, or third-party services; Google Fonts is the only external request. Must run from `file://` and GitHub Pages. (Required by the course rules.)

## Users
Filipino college students, OJT/internship applicants, and fresh graduates with little or no work experience. Often a first-year student writing their first resume, on a phone or a shared laptop, close to an OJT or application deadline. *(Device context inferred.)*

## Product Purpose
Help a student go from "I have nothing to put on a resume" to a one-page, ATS-friendly resume, then prepare for the first interview and the pre-employment paperwork. Success: a student leaves with a printed or PDF resume, practiced answers, and a checklist of documents they know how to get.

## Positioning
Student-first and Philippines-specific: turns school projects and org work into resume bullets, links the resume to interview practice in one path, and covers local realities (pre-employment documents, RA 11261, common Filipino interview questions). Free, no account, data stays in the browser.

## Operating Context
- OJT applications, campus job fairs, BPO and entry-level postings on JobStreet, Kalibrr, LinkedIn.
- Pre-employment requirements carried in the familiar long brown envelope: NBI clearance, SSS, PhilHealth, Pag-IBIG, TIN, PSA birth certificate.
- Online interviews over video call are common.
- Demoed face-to-face to an instructor; students must explain the HTML and CSS.

## Capabilities and Constraints
Resume builder with live preview, two templates, autosave, print to PDF; rule-based bullet helper; job-fit keyword checker; interview flashcards with visitor-authored cards (add, edit, delete, kept in the browser); saved STAR template; pre-employment checklist with saved progress; optional email + password accounts (Supabase) that stay inert until configured; demo-only contact form. No AI, no data sent anywhere the visitor didn't configure.

## Brand Commitments
Name: **Simula** (Filipino for "beginning," stored in `site/js/data.js`). Voice: encouraging, practical, plain English for a first-year student; benefits first; short paragraphs. Look: the Trusted Ledger — porcelain ground, register-green action color, serif display over hyperlegible sans, tabular numerals, gold reserved for the RA 11261 mark (docs/DESIGN.md).

## Evidence on Hand
No testimonials, user counts, or partnerships exist. Do not invent them. Government facts must cite official sources (SOURCES.md); unverified facts say "check with the agency."

## Product Principles
1. Start from what students already have: projects, orgs, competitions.
2. One path, not a pile of tools: Guide → Build → Practice.
3. Local and accurate beats global and generic.
4. Free and private by default.

## Accessibility & Inclusion
WCAG 2.1 AA contrast, keyboard access, visible focus, reduced-motion support. Readable by a first-year student.
