# Agent guidance

This file is read automatically by Claude Code. It tells the agent how to
extend this site without breaking conventions.

## What this repo is

An Astro static site. Currently serves `armash.novysan.com` (one project:
Armash 2025 mission archive). Designed to grow into the full novysan.com
rebuild over time.

## The one rule

**Adding or editing content is a markdown task. Adding or editing design is
a code task and needs explicit user permission.**

Anything that affects the visual system (`src/styles/global.css`), shared
layouts (`src/layouts/*.astro`), routing (`src/pages/*.astro`), or
dependencies (`package.json`) requires the user to ask for it specifically.

## Common tasks

### Add a new project

1. Read the schema: `src/content.config.ts`
2. Create `src/content/projects/<slug>.md` with valid frontmatter
3. Create the image folder: `public/images/<slug>/`
4. Reference images as `/images/<slug>/<filename>`

Slug = kebab-case, no year suffix unless the user wants one for
disambiguation (e.g., `armash-2025` is fine because there may be future
Armash missions).

Required frontmatter: `title`, `summary`. Everything else is optional but
useful — see the schema for the full list.

### Edit an existing project

The project content lives entirely in its `.md` file (frontmatter + body).
Don't split content across multiple files; one project = one file. If a
project grows large (Armash is the precedent), it's still one file with H2
sections for log entries, appendices, etc.

### Update site-wide things

- Site title, footer text, OG defaults → `src/layouts/BaseLayout.astro`
- Topbar copy → same file
- Color palette, type scale → `src/styles/global.css` (variables at top)

Treat these as design decisions and confirm before changing.

## Don'ts

- Don't add JavaScript framework integrations (React, Vue, etc.) unless
  the user has a concrete reason. Astro renders static HTML; that's the
  point.
- Don't add a CMS, headless backend, or database. Markdown files are the
  database.
- Don't restructure folders. The conventions are deliberate.
- Don't bump major versions of Astro without checking the user.
- Don't write text in the voice of "I" without confirming — this is Dan
  Novy's site; agent edits to content should be flagged for review.

## Deploying

Push to `main`. GitHub Actions handles the rest via `.github/workflows/deploy.yml`.
Don't add other deploy targets without asking.

## When the user says "add this project to my portfolio"

The minimum useful response:

1. Ask for: short summary (one sentence), dates, location, role, any tags
   they want, any links.
2. Generate the markdown file with a draft body based on what you know.
3. Show the user the file location and ask if they want edits before
   committing.
4. If approved, commit with a clear message like `Add <project name>`.
