// site/astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// During /v2/ staging the new site lives under /v2/. Flip to '/' at cutover.
const STAGING = process.env.CUTOVER !== '1';

export default defineConfig({
  site: 'https://realrichi3.github.io',
  base: STAGING ? '/v2/' : '/',
  outDir: STAGING ? '../v2' : './dist',
  trailingSlash: 'ignore',
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
    ...(STAGING ? [] : [sitemap()]),
  ],
});
