// site/astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// During /v2/ staging the new site lives under /v2/. Flip to '/' at cutover.
const STAGING = process.env.CUTOVER !== '1';

export default defineConfig({
  site: 'https://richiemoluno.com',
  base: STAGING ? '/v2/' : '/',
  outDir: STAGING ? '../v2' : './dist',
  // GitHub Pages serves every directory-format page at /path/index.html, so the
  // slashless form 301-redirects. Make the canonical form the trailing-slash one
  // everywhere (links, canonical tags, sitemap) so Google crawls it directly.
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      // Never auto-clear outDir — explicit, prevents catastrophic wipes
      // when outDir is set to a parent directory.
      emptyOutDir: false,
    },
  },
  integrations: [
    mdx(),
    tailwind({ applyBaseStyles: false }),
    react(),
    // Emits /sitemap-index.xml + /sitemap-0.xml. Only run it for the production
    // (CUTOVER) build; the /v2/ staging tree is noindex'd via robots anyway.
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
