import { test, expect } from '@playwright/test';

const ROUTES = [
  ['/v2/',            'richiemoluno'],
  ['/v2/blog/',       'Essays'],
  ['/v2/projects/',   'Some of the things'],
  ['/v2/experience/', 'Experience'],
  ['/v2/reading/',    'Things I found'],
] as const;

for (const [path, contains] of ROUTES) {
  test(`200 + content: ${path}`, async ({ page }) => {
    const resp = await page.goto(path);
    expect(resp?.status()).toBeLessThan(400);
    await expect(page.locator('body')).toContainText(contains);
  });
}

test('rss.xml is valid XML', async ({ request }) => {
  const r = await request.get('/v2/rss.xml');
  expect(r.ok()).toBeTruthy();
  const body = await r.text();
  expect(body.startsWith('<?xml')).toBeTruthy();
});

test('feed.json is valid JSON Feed', async ({ request }) => {
  const r = await request.get('/v2/feed.json');
  expect(r.ok()).toBeTruthy();
  const json = await r.json();
  expect(json.version).toContain('jsonfeed.org');
});

test('theme toggle adds dark class', async ({ page }) => {
  await page.goto('/v2/');
  await page.click('#theme-toggle');
  await expect(page.locator('html')).toHaveClass(/(^|\s)dark(\s|$)/);
});

test('⌘K palette opens', async ({ page }) => {
  await page.goto('/v2/');
  const btn = page.locator('#cmdk-open');
  if ((await btn.count()) > 0) {
    await btn.click();
  } else {
    const key = process.platform === 'darwin' ? 'Meta+K' : 'Control+K';
    await page.keyboard.press(key);
  }
  await expect(page.getByPlaceholder('search posts, projects, nav…')).toBeVisible();
});
