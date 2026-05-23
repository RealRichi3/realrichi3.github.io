// site/src/lib/build-search-index.ts
import { getCollection } from 'astro:content';
import { NAV_ITEMS } from './nav-items';
import { getReading } from './reading';

export interface SearchEntry {
  kind: 'nav' | 'post' | 'project' | 'reading';
  title: string;
  subtitle?: string;
  href: string;
}

export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const projects = await getCollection('projects');
  const reading = getReading();

  const entries: SearchEntry[] = [];

  NAV_ITEMS.forEach((n) => entries.push({ kind: 'nav', title: n.label, href: n.href }));

  posts.forEach((p) =>
    entries.push({ kind: 'post', title: p.data.title, subtitle: p.data.description, href: `/blog/${p.slug}` })
  );

  projects.forEach((p) =>
    entries.push({ kind: 'project', title: p.data.name, subtitle: p.data.oneLiner, href: `/projects/${p.slug}` })
  );

  reading.forEach((r) =>
    entries.push({ kind: 'reading', title: r.data.title, subtitle: r.data.source, href: r.data.url })
  );

  return entries;
}
