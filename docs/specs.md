# Site spec

## North star

A personal commonplace book in the lineage of [lilianweng.github.io](https://lilianweng.github.io) and Hugo PaperMod sites - identity-first homepage, blog with TOC + tag filter, bookmarks, projects.

## Stack

- Astro 4 + Tailwind 3 + TypeScript strict
- MDX content collections for blog/projects, JSON for experience
- Single-file JSON for bookmarks (was a collection; collapsed for editing speed)
- React island only for the `⌘K` command palette
- Static GitHub Pages output; staging under `/v2/`, cutover via `CUTOVER=1` env flag

## Visual

- System font stack (PaperMod / lilianweng)
- Light: bg `#f5f5f5`, surface `#ffffff`, text `rgb(30,30,30)`, muted `rgb(108,108,108)`, accent `#1d4ed8`
- Dark: bg `rgb(29,30,32)`, surface `rgb(46,46,51)`, text `rgb(218,218,219)`, accent `#60a5fa`
- Theme toggle: shows the icon for the mode you can switch TO (light → moon; dark → sun)
- Soft heading color via `color-mix(in srgb, var(--color-text) 80%, var(--color-bg))`
- Shared `intro-quote` lede across pages

## Homepage

Hero block (intro blockquote + social icons) + 2x2 grid:
- Recent Writings (4)
- Recent Projects (4)
- Recent Bookmarks (5)
- Interests (5 informal bullets, software first)

Per-tag click anywhere navigates to the section's index page with the tag pre-applied via `?tags=` query.

## Filter (blog / projects / reading)

- Tag chips toggle on/off
- AND/OR (all/any) match mode
- Empty-state when 0 matches
- URL syncs to `?tags=a,b&mode=any`

## Blog post

- Date + Essay + reading time + word count in monospace meta
- Soft-colored title
- Intro blockquote (description) - sets the tone
- Collapsed TOC (`<details>`) in the header - h2/h3 only
- Bottom prev/next pinned via `mt-auto`
