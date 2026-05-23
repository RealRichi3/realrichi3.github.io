// site/src/pages/feed.json.ts
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const site = context.site!.toString().replace(/\/$/, '');
  const body = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Richie Moluno — blog',
    home_page_url: `${site}/`,
    feed_url: `${site}/feed.json`,
    items: posts.map((p) => ({
      id: `${site}/blog/${p.slug}/`,
      url: `${site}/blog/${p.slug}/`,
      title: p.data.title,
      summary: p.data.description,
      date_published: p.data.date.toISOString(),
      tags: p.data.tags,
    })),
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'content-type': 'application/feed+json' },
  });
}
