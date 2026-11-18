# Surface brief: marketing site (all pages)

Scope: six public pages (index, resume-guide, builder, interview, checklist, about); vanilla static HTML/CSS/JS. Visitor mode per surface: Home **Persuade**, guides **Read**, builder/interview/checklist **Operate**. No login (removed in v1.3.0).

Audience: Filipino students writing their first resume on a phone, near a deadline. Job: believe their school work already counts, then build, practice, and collect documents. Action: start the resume. Proof: the hero demo turning a weak school-work line into a strong bullet, part by part. Constraints: runs from file:// and any static host, WCAG AA in light and dark, reduced-motion support, no accounts, data only in the browser with backup/restore/delete.

## Direction contract

THESIS: a calm, monochrome working tool whose first screen shows the transformation (school work → resume bullet) instead of describing it.

OWN-WORLD: seven mono tokens that flip for dark mode (`--bg` #FFFFFF/#0A0A0A, `--surface` #F4F4F5/#18181B, `--line` #E4E4E7/#27272A, `--muted`, `--text-muted` #52525B/#A1A1AA, `--ink` #0A0A0A/#FAFAFA, `--on-ink`); one error color for forms only; ink pill buttons; 16px cards, 24-32px panels; IBM Plex Sans with Plex Mono labels and tabular numerals; dot-and-pill mark; rounded mono illustrations in light and dark files.

STORY: the visitor watches a weak line become a strong bullet, sees the three-step path, learns what is free under RA 11261 and who qualifies, and starts the builder knowing their data stays on their device.

FIRST VIEWPORT: left column headline (~13ch), one-line lede, ink primary pill + outline secondary, quiet "Free · No account · Saved only on your device" line; right column the "School work, rewritten" demo. Header: lockup + six links + Build resume pill + theme switch. Everything below reveals on scroll.

MOTION: one focal moment (the demo's parts underlining in order); scroll reveals after the first screen; loading placeholders only where JavaScript builds content; small confirmations. All off with reduced motion.

FINISH: tested at 375/768/1280 in both themes; docs (DESIGN.md, DOCS-NOTES.md) updated with each release.
