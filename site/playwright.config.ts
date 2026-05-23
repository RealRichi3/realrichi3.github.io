// site/playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4321' },
  webServer: {
    command: 'npx astro preview --host 127.0.0.1 --port 4321',
    url: 'http://localhost:4321/v2/',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  reporter: process.env.CI ? 'github' : 'list',
});
