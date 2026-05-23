
# Personal Website Brainstorm - Running Notes

Date started: 2026-05-23
User: Richie Moluno (richy5592@gmail.com)

## Context

Current site = HTTrack-mirrored Bootstrap dark template (apolox.beethemes),
single `index.html` (2791 lines), GitHub Pages.
Sections today: Home / About / Resume / Portfolio / Blogs / Contact.

## Reference sites (from docs/specs.md)

- **ludwigabap.com** - Hakyll, Gruvbox, scholar/curation: blogs + bookmarks (888) + videos (457) + papers (208). Generalist tagline.
- **seated.ro** - minimal mono palette, ⌘K command palette, "silly stats" (mouse miles, keypresses), live coding stats, GitHub project showcase.
- **makingsoftware.com** - user likes BUT flagged "too much effort to write the blogs" → out of scope as style target.
- **lilianweng.github.io** - Hugo + PaperMod, chronological blog with reading time, archive/tags/search.

Common thread: text-forward, content-first, blog-heavy, minimalist palette, dev-aesthetic, RSS, archive/tag pages. Differences: curation depth (Ludwig) vs personality/dynamism (Seated) vs pure-blog (Lilian).

## User answers

(filled in incrementally)

### Q1 - primary purpose
**Answer:** "all of the above" → wants blog + curation + portfolio + digital garden.
**Risk flag:** every site that tries to be all four ends up incoherent. Need to identify the **spine** (homepage default) and which sections are second-class.
**Side ask:** put notes in `docs/notes/` (done - moved here).

### Q2 - spine / homepage default
**Answer:** Identity-first. Homepage = hero + brief "featured" summary blocks that tease each other stream (blog / curation / projects), with nav links to full pages. Other sections live on dedicated pages.

## Identity (from current `index.html`)
- Name: Richie Moluno
- Location: Birmingham, UK
- Role: software engineer, mechanical-engineering grad
- Tone today: "iterative, hypothesis-driven", "collaborative", "innovative" (template boilerplate - may want to rewrite)
- Twitter: @MolunoRichie
- Email: molunorichie@gmail.com (note: current README/portfolio uses richy5592@gmail.com too)
- Existing content: resume, portfolio (8+ projects: jsquarto, accuvend, etc.), opensource section, talks section

### Q3 - primary audience (weighted)
**Answer (ranked 4 = primary, 1 = lowest):**
- **4 - Recruiters / hiring managers** (primary)
- **3 - Self / commonplace book**
- **2 - Peers / dev community**
- **2 - Long-tail SEO readers**

**Implication:** hero must read "hireable senior engineer in 15s" (role, stack, recent project, resume link). But content stream below can be exploratory/personal because the user is a secondary audience. Avoids fully sanitized "corporate portfolio" feel.
**Tension to watch:** recruiter-clean vs commonplace-quirky. Resolve spatially - polished hero, looser content streams below the fold.

### Q4 - homepage layout structure
**Answer:** B (hero left + 2-col featured grid). Caveat: needs an **experience** block - current B mockup didn't show one.
**Action:** add experience section near top (recruiter-scannable) before blog/projects grid.

### Q5 - refined B with experience block
**Answer:** B1 - compact 3-row experience list under hero, `full resume →` link.

## Locked homepage skeleton (top → bottom)
1. Top nav: richie · blog · projects · experience · reading · about · ⌘K
2. Hero (left-aligned): name, role + location label, one-line positioning, link row (resume / github / x / email)
3. **EXPERIENCE** - 3 most-recent rows: `<date range> · <role> · <company>`, then `full resume →`
4. Two-column featured grid: **BLOG** (3 posts) | **PROJECTS** (2-3 picks)
5. **READING** - full-width inline bookmarks/links strip

### Q6 - content streams
**Answer:**
- **Core (in):** Blog, Projects, Experience, About
- **Optional (in):** Reading/bookmarks, Now page
- **Dropped:** Papers, Talks, dedicated Open-source page (fold OSS into Projects)

## Final stream set & nav
Top nav: `richie` · `blog` · `projects` · `experience` · `reading` · `now` · `about` · `⌘K`
Pages: `/`, `/blog`, `/blog/<slug>`, `/projects`, `/experience`, `/reading`, `/now`, `/about`, `/tags/<tag>`, RSS feed.

### Q7 - visual style direction
**Round 1 feedback:**
1. Light mono → "too bland"
2. Dark mono → "too techy"
3. Warm Gruvbox → "don't like the colors"
4. Hybrid light+rust → "colors okay but bland"
**Constraints emerged:** wants light + dark mode support; preferred palette = **blue + white + black**; needs more personality than minimalist mono.
**Action:** propose new directions that hit blue/white/black but have a distinctive signature element (typography weight contrast, signature mark, mech-eng hint, etc.). Show light+dark pairs.

### Q7b - refined style
**Answer:** A - Editorial blue (big serif display name, sans nav/labels, numbered section markers in blue). Both light + dark mode required.
**Caveat:** dark bg `#0b1020` "too dark" - lighten it.

### Q7c - dark-mode bg shade
**Answer:** #3 - neutral charcoal `#1c1c20`. Blue accent `#60a5fa` pops harder vs gray.

## Locked visual tokens (draft)
- **Light:** bg `#ffffff` (or `#fafaf7` warm-white), text `#0a0a0a`, muted `#6b7280`, accent `#1d4ed8`, divider `#f0f0f0`
- **Dark:** bg `#1c1c20`, text `#ececf0`, muted `#a1a1aa`, accent `#60a5fa`, divider `#2a2a30`
- **Display / body / UI font:** system font stack - `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` (lilianweng / PaperMod style). Zero font downloads.
- **Display weight:** 700, tight tracking `-0.01em`
- **Body weight:** 400, line-height ~1.6
- **Labels:** 600 uppercase, letter-spaced `0.08em`
- **Code:** system monospace - `ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace`
- **Signature element:** numbered section markers in **sans-bold blue** (`01`, `02`, ...) before uppercase section labels. Name ends with blue period: `Richie Moluno.`
- **Theme toggle:** required, persist via localStorage; respect `prefers-color-scheme`

### Q8 - tech stack / SSG
**Answer:** Astro (recommended). MDX + content collections, zero-JS by default, islands when needed.

### Q9 - Domain
**Answer:** Custom domain (user already owns one). **Specific domain value: pending - user to type.**

### Q10 - Migration strategy
**Answer:** Stage at preview path. Keep current site live at root; new site lives at a subpath until swap.
**Implementation note:** Astro `base: '/v2/'`, deploy alongside existing `index.html`. Final cutover replaces root files with built site, retires the v2 path.

### Q11 - Blog seed
**Answer:** Ship empty + one short "hello / why this site" post.

### Q12 - Flourishes (all in)
- ⌘K command palette (keyboard nav of sections + posts)
- Reading time + word count on posts
- RSS + JSON feed
- Custom 404
- Theme toggle button (light/dark)

### Q13 - Avatar / photo
**Answer:** No photo anywhere. Strongest editorial-text energy.

### Q14 - Bio source
**Answer:** Rewrite from scratch. I draft fresh hero one-liner + /about copy; user edits.

### Q15 - Styling stack
**Answer:** Tailwind CSS. Design tokens via `tailwind.config`, dark mode via class strategy.

### Q16 - Domain value
**Answer:** `richiemoluno.com` (user owns).
**Action:** add `CNAME` file → richiemoluno.com when ready to cut over; configure GH Pages custom domain.

---
## Grilling complete - moving to approach proposals + design summary.

### Q17 - repo strategy
**Answer:** A - In-place migration. Add Astro under `site/` in current repo, stage at `/v2/`, cutover to root, point `richiemoluno.com` at GH Pages.

---
## Design summary (presenting section-by-section for approval)













