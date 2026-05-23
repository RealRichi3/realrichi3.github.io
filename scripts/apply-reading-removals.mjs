#!/usr/bin/env node
// scripts/apply-reading-removals.mjs
// Reads a newline-separated list of slugs from a file (or stdin) and removes
// matching entries from site/src/data/reading.json.
//
//   node scripts/apply-reading-removals.mjs removals.txt
//   cat slugs.txt | node scripts/apply-reading-removals.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const READING = path.resolve(__dirname, '../site/src/data/reading.json');

function readSlugs() {
  const arg = process.argv[2];
  if (arg) return fs.readFileSync(arg, 'utf8');
  return fs.readFileSync(0, 'utf8');
}

const slugs = new Set(
  readSlugs()
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
);

if (slugs.size === 0) {
  console.error('no slugs provided');
  process.exit(2);
}

const raw = JSON.parse(fs.readFileSync(READING, 'utf8'));
const next = raw.filter((r) => !slugs.has(r.slug));
fs.writeFileSync(READING, JSON.stringify(next, null, 2) + '\n');
console.log(`removed ${raw.length - next.length} entries; ${next.length} remain.`);
