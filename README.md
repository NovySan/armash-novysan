# Novysan Portfolio / Enchantment Lab

A static site built with [Astro](https://astro.build), deployed to GitHub Pages,
designed to be extended through conversation with an agent (Claude Code, Cursor,
or similar). This repo currently hosts the Armash 2025 mission archive at
`armash.novysan.com`; it's structured to grow into the full novysan.com rebuild
when you're ready.

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:4321> to view the site. Edits hot-reload.

```bash
npm run build      # production build to ./dist
npm run preview    # preview the production build locally
```

---

## The agentic content model

The site is built around a single principle: **adding a project should be one
file.** No template editing, no route configuration, no design decisions.
Just write a markdown file in the right place with the right frontmatter, and
the site picks it up.

### To add a new project

Create a new file at `src/content/projects/<slug>.md`. For example:

```bash
src/content/projects/infinite-hopper.md
```

Use this frontmatter shape (the full schema is enforced in
`src/content.config.ts` — only `title` and `summary` are required):

```yaml
---
title: "Infinite Hopper"
summary: "An interactive installation at the Sheldon Art Museum exploring..."
dates: "January–May 2025"
location: "Sheldon Art Museum, Lincoln NE"
role: "Designer & Engineer"
mission: "Enchantment Lab"
heroImage: "/images/infinite-hopper/hero.jpg"
tags: [installation, interactive, museum]
status: complete
featured: true
---

Your project content as markdown goes here. Use ## for sections,
### for subsections. Standard markdown — headings, lists, blockquotes,
links, images, emphasis — all styled by the design system.
```

Then drop project images into `public/images/<slug>/` and reference them
from your markdown as `/images/<slug>/whatever.jpg`.

That's the whole workflow. The next build picks up the new file.

### Asking an agent to add a project

You can hand this kind of request to Claude Code (or any coding agent
working in the repo) and it'll work without further explanation:

> "Add a new project called 'Sensorium Ex'. It's a projection-design
> collaboration for an opera, ran in spring 2024 at the Lied Center.
> My role was projection designer. Tags: projection, opera, performance.
> Write a short summary and a couple of paragraphs about what we did.
> I'll add images later."

The agent will:
1. Read `src/content.config.ts` to confirm the schema.
2. Create `src/content/projects/sensorium-ex.md` with proper frontmatter.
3. Write the body content.
4. Optionally create the `public/images/sensorium-ex/` folder with a README.
5. Commit and push if asked.

### What an agent should NOT do without asking

- Change the design system (`src/styles/global.css`) — that's a
  deliberate design decision; ask first.
- Change layouts (`src/layouts/*.astro`) — these are the shared shell;
  per-project tweaks should go inside the markdown body using HTML where
  needed, not by editing layouts.
- Add npm dependencies without a clear reason. Astro + nothing is enough.

---

## File structure

```
.
├── astro.config.mjs          # Site URL and build config
├── package.json
├── public/
│   ├── CNAME                 # GitHub Pages custom domain
│   ├── favicon.svg
│   └── images/
│       └── armash/           # Per-project image folders
├── src/
│   ├── content.config.ts     # Content collection schema (frontmatter shape)
│   ├── content/
│   │   └── projects/
│   │       └── armash-2025.md   # ← your projects live here, one .md per project
│   ├── layouts/
│   │   ├── BaseLayout.astro     # HTML shell, head, topbar, footer
│   │   └── ProjectLayout.astro  # Hero + prose body for project pages
│   ├── pages/
│   │   ├── index.astro          # Currently renders Armash directly
│   │   └── projects/
│   │       └── [...slug].astro  # Dynamic route for any project
│   └── styles/
│       └── global.css           # The whole design system
└── .github/
    └── workflows/
        └── deploy.yml           # Auto-deploys to GitHub Pages on push to main
```

---

## Deployment

The site auto-deploys to GitHub Pages whenever you push to `main`.

### First-time setup

1. **Create the GitHub repo** and push this code to `main`.

2. **Enable GitHub Pages.** Repo → Settings → Pages → Source: **GitHub Actions**.
   (Not "Deploy from a branch" — we use the Actions workflow.)

3. **Add the DNS record at Hover** (or wherever novysan.com's DNS lives):
   - Type: `CNAME`
   - Hostname: `armash`
   - Target: `<your-github-username>.github.io`
   - TTL: default

4. **Wait for DNS to propagate**, then in the repo's Pages settings, add
   `armash.novysan.com` as the custom domain and tick "Enforce HTTPS."

5. **Push to main** to trigger the first deploy. The Actions tab shows progress.

### Switching to default github.io URL (for testing without DNS)

If you want to deploy before DNS is set up:

1. Delete `public/CNAME`.
2. In `astro.config.mjs`, change the `site` and add a `base`:
   ```js
   site: 'https://<your-username>.github.io',
   base: '/<repo-name>',
   ```
3. Push. Site will be at `https://<your-username>.github.io/<repo-name>/`.

Switch back to the subdomain config when DNS is ready.

---

## Future site migration

Today this repo serves `armash.novysan.com` — a single project page. The
content model and dynamic routes are already in place to grow it into the
full `novysan.com` rebuild:

1. Add more projects as `src/content/projects/<slug>.md` files. They become
   reachable at `/projects/<slug>/` automatically.
2. When you're ready to migrate from Wix, rework `src/pages/index.astro`
   into a real home page (lab manifesto, featured projects, bio link, etc.)
   and add pages for `/portfolio`, `/publications`, `/press`, etc. Each of
   those follows the same content-collection pattern — define a schema in
   `content.config.ts`, drop markdown files in `src/content/<thing>/`,
   render with a layout.
3. Update `astro.config.mjs` to `site: 'https://www.novysan.com'`, remove
   the CNAME (or update it to `www.novysan.com` if that's your apex),
   and point `novysan.com`'s A records at GitHub Pages' IPs:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
4. Cancel Wix.

---

## Design system

The visual language is "mission archive recovered from a future that didn't
quite happen" — dark warm ink, Mars-dust amber accent, literary serif
typography. Three fonts: **Cormorant Garamond** (display), **EB Garamond**
(body), **JetBrains Mono** (technical metadata, log timestamps).

All colors and type scales are CSS variables in `src/styles/global.css`.
If you want a different aesthetic for future projects, the right move is
usually to keep the system consistent and let content drive variation —
not to fork the design per project.

---

## Why Astro

Static-first, content-collection-native, no JS shipped by default, builds
in seconds, deploys cleanly to GitHub Pages, plays well with markdown,
trivial for an agent to extend predictably. Alternatives considered and
rejected: Jekyll (dated, Ruby), Hugo (Go templates), Next.js (overkill).

---

## Credits

The Armash 2025 mission was conducted as part of the
[World's Biggest Analog](https://www.spaceanalog.world) campaign in
October 2025, hosted at the Armash Habitat in the Ararat Plain of Armenia.

With Commander Nahapet, the XO, and the rest of the crew of Armash Habitat.
