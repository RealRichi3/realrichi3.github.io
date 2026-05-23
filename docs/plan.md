# Implementation plan

7-phase plan (A-G) for rebuilding the site on Astro.

- **A. Infrastructure** - scaffold Astro app under `site/`, Tailwind, TS strict, GH Pages CI, base path `/v2/` for staging.
- **B. Collections + base layout** - content schemas for blog/projects/experience, base layout (nav + footer + theme toggle).
- **C. Pages** - homepage hero + 2x2 grid, blog list + post, projects list + detail, experience, reading.
- **D. Command palette** - `⌘K` React island over build-time search index.
- **E. CI + smoke tests** - Playwright smoke + Vitest unit, GitHub Actions.
- **F. Content seeding** - blog drafts, project entries, experience JSON, seed reading entries.
- **G. Cutover** - set `CUTOVER=1`, build to root, point `realrichi3.github.io` at new build, retire legacy.

Cutover is **manual** to avoid Astro's `emptyOutDir` wiping the parent directory when `outDir: '../'`. See `astro.config.mjs` - `vite.build.emptyOutDir` is forced to `false`.
