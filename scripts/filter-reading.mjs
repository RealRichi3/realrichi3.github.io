#!/usr/bin/env node
// scripts/filter-reading.mjs
// One-shot filter to drop entries by tag, host, or title regex.
//
//   node scripts/filter-reading.mjs --drop-tag music
//   node scripts/filter-reading.mjs --drop-host music.youtube.com
//   node scripts/filter-reading.mjs --drop-title "^Topic - "

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const READING = path.resolve(__dirname, '../site/src/data/reading.json');

const args = process.argv.slice(2);
const filters = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--drop-tag') filters.push({ kind: 'tag', value: args[++i] });
  else if (args[i] === '--drop-host') filters.push({ kind: 'host', value: args[++i] });
  else if (args[i] === '--drop-title') filters.push({ kind: 'title', value: new RegExp(args[++i]) });
}

if (filters.length === 0) {
  console.error('no --drop-* filters provided');
  process.exit(2);
}

function host(u) { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return ''; } }

const raw = JSON.parse(fs.readFileSync(READING, 'utf8'));
const next = raw.filter((r) => {
  for (const f of filters) {
    if (f.kind === 'tag' && (r.tags ?? []).includes(f.value)) return false;
    if (f.kind === 'host' && host(r.url) === f.value) return false;
    if (f.kind === 'title' && f.value.test(r.title)) return false;
  }
  return true;
});
fs.writeFileSync(READING, JSON.stringify(next, null, 2) + '\n');
console.log(`dropped ${raw.length - next.length}; ${next.length} remain.`);
