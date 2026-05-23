// site/src/lib/reading.ts
// Loads reading entries from a single JSON file and returns them in a shape
// that mirrors Astro getCollection() — { slug, data } — so call-sites do not
// need to change beyond the import source.
import raw from '../data/reading.json';

interface ReadingRow {
  slug: string;
  title: string;
  url: string;
  source?: string | null;
  date: string;
  tags?: string[];
  note?: string | null;
}

export interface ReadingData {
  title: string;
  url: string;
  source?: string;
  date: Date;
  tags: string[];
  note?: string;
}

export interface ReadingEntry { slug: string; data: ReadingData; }

const entries: ReadingEntry[] = (raw as ReadingRow[]).map((r) => ({
  slug: r.slug,
  data: {
    title: r.title,
    url: r.url,
    source: r.source ?? undefined,
    date: new Date(r.date),
    tags: r.tags ?? [],
    note: r.note ?? undefined,
  },
}));

export function getReading(): ReadingEntry[] { return entries; }
