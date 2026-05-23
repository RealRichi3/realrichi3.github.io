#!/usr/bin/env node
// scripts/consolidate-reading.mjs
// One-shot migration: collapse a directory of per-entry .md files under
// site/src/content/reading/ into a single site/src/data/reading.json.
// Kept for reference; the live collection now lives in JSON.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIR = path.resolve(__dirname, '../site/src/content/reading');
const OUT = path.resolve(__dirname, '../site/src/data/reading.json');

if (!fs.existsSync(DIR)) {
  console.error(`source dir not found: ${DIR}`);
  process.exit(2);
}

function parseFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const yaml = m[1];
  const out = {};
  yaml.split('\n').forEach((line) => {
    const i = line.indexOf(':');
    if (i === -1) return;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      v = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
    } else {
      v = v.replace(/^['"]|['"]$/g, '');
    }
    out[k] = v;
  });
  return out;
}

const entries = fs.readdirSync(DIR)
  .filter((n) => n.endsWith('.md'))
  .map((n) => {
    const slug = n.replace(/\.md$/, '');
    const content = fs.readFileSync(path.join(DIR, n), 'utf8');
    const fm = parseFrontmatter(content);
    return {
      slug,
      title: fm.title ?? slug,
      url: fm.url ?? '',
      source: fm.source ?? null,
      date: fm.date ?? new Date().toISOString().slice(0, 10),
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      note: fm.note ?? null,
    };
  });

fs.writeFileSync(OUT, JSON.stringify(entries, null, 2) + '\n');
console.log(`wrote ${entries.length} entries to ${OUT}`);
