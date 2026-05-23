#!/usr/bin/env node
// scripts/import-youtube-takeout.mjs
// Convert Google Takeout YouTube exports (watch-history.html, playlist .csv,
// or .json) into reading entries appended to site/src/data/reading.json.
//
// Usage:
//   node scripts/import-youtube-takeout.mjs <source-file-or-dir> [--tags tagA,tagB]
//
// Notes:
// - Titles are fetched via YouTube's oEmbed endpoint (rate-limited ~80ms/req).
// - Music URLs (music.youtube.com) and "- Topic" channel uploads are dropped.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const READING = path.resolve(__dirname, '../site/src/data/reading.json');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('usage: import-youtube-takeout.mjs <file-or-dir> [--tags a,b]');
  process.exit(2);
}
const src = args[0];
const tagIdx = args.indexOf('--tags');
const extraTags = tagIdx >= 0 ? (args[tagIdx + 1] ?? '').split(',').filter(Boolean) : [];

function videoIdFromUrl(u) {
  try {
    const url = new URL(u);
    if (url.hostname.includes('youtu.be')) return url.pathname.slice(1);
    const v = url.searchParams.get('v');
    return v || '';
  } catch { return ''; }
}

function isMusic(url, channel) {
  if (/music\.youtube\.com/i.test(url)) return true;
  if (channel && / - Topic$/i.test(channel)) return true;
  return false;
}

async function fetchTitle(url) {
  try {
    const r = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    if (!r.ok) return null;
    const j = await r.json();
    return { title: j.title, author: j.author_name };
  } catch { return null; }
}

function parseHtml(html) {
  // Watch history: <a href="https://www.youtube.com/watch?v=...">Title</a><br><a href=".../channel/...">Channel</a>
  const out = [];
  const cells = html.split(/content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1/);
  for (const c of cells) {
    const m = c.match(/href="(https?:\/\/[^"]+)"/);
    if (!m) continue;
    out.push({ url: m[1] });
  }
  return out;
}

function parseCsv(csv) {
  const lines = csv.split('\n').filter(Boolean);
  return lines.slice(1).map((line) => {
    const [videoId] = line.split(',');
    if (!videoId) return null;
    return { url: `https://www.youtube.com/watch?v=${videoId.trim()}` };
  }).filter(Boolean);
}

function parseJson(j) {
  const arr = JSON.parse(j);
  return arr.filter((e) => e.titleUrl).map((e) => ({ url: e.titleUrl, channel: e.subtitles?.[0]?.name }));
}

function readSource(p) {
  const stat = fs.statSync(p);
  let entries = [];
  if (stat.isDirectory()) {
    for (const f of fs.readdirSync(p)) entries = entries.concat(readSource(path.join(p, f)));
    return entries;
  }
  const text = fs.readFileSync(p, 'utf8');
  if (p.endsWith('.json')) entries = parseJson(text);
  else if (p.endsWith('.csv')) entries = parseCsv(text);
  else if (p.endsWith('.html')) entries = parseHtml(text);
  return entries;
}

const raw = readSource(src).filter((e) => /youtube\.com|youtu\.be/i.test(e.url));
console.log(`raw entries: ${raw.length}`);

const existing = JSON.parse(fs.readFileSync(READING, 'utf8'));
const have = new Set(existing.map((e) => e.url));
const seen = new Set();
const queue = raw.filter((e) => !have.has(e.url) && !seen.has(e.url) && seen.add(e.url));

const out = [];
for (let i = 0; i < queue.length; i++) {
  const e = queue[i];
  const meta = await fetchTitle(e.url);
  if (!meta) continue;
  if (isMusic(e.url, meta.author)) continue;
  const id = videoIdFromUrl(e.url) || `yt-${i}`;
  out.push({
    slug: `yt-${id}`,
    title: meta.title,
    url: e.url,
    source: meta.author ?? 'YouTube',
    date: new Date().toISOString().slice(0, 10),
    tags: ['video', ...extraTags],
    note: null,
  });
  await new Promise((r) => setTimeout(r, 80));
  if ((i + 1) % 25 === 0) console.log(`  ${i + 1}/${queue.length}`);
}

fs.writeFileSync(READING, JSON.stringify(existing.concat(out), null, 2) + '\n');
console.log(`imported ${out.length} entries; total now ${existing.length + out.length}`);
