# realrichi3.github.io

Personal site of Richie Moluno — writings, projects, bookmarks.

Built with [Astro](https://astro.build) + Tailwind. Source lives under `site/`.

## Develop

```bash
cd site
npm install
npm run dev          # local dev at http://localhost:4321/v2/
npm run build        # static build to ../v2/ (staging path)
CUTOVER=1 npm run build  # production build to site/dist/
npm run test         # vitest unit
npm run e2e          # playwright smoke
```

## Layout

- `site/` — Astro source
  - `src/content/blog/` — MDX posts
  - `src/content/projects/` — project entries
  - `src/content/experience/` — experience data
  - `src/data/reading.json` — bookmarks
- `scripts/` — authoring + import helpers
- `docs/` — specs, plan, notes
