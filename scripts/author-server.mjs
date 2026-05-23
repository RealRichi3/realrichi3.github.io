#!/usr/bin/env node
// scripts/author-server.mjs — dev-only HTTP server for in-UI bookmark deletes.
// POST /delete?slug=<slug> removes entry from site/src/data/reading.json.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const READING = path.resolve(__dirname, '../site/src/data/reading.json');
const PORT = 4323;

http.createServer((req, res) => {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.statusCode = 204; res.end(); return; }
  if (req.method !== 'POST') { res.statusCode = 405; res.end('POST only'); return; }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const slug = url.searchParams.get('slug');
  if (!slug) { res.statusCode = 400; res.end('slug required'); return; }

  const raw = JSON.parse(fs.readFileSync(READING, 'utf8'));
  const before = raw.length;
  const next = raw.filter((r) => r.slug !== slug);
  fs.writeFileSync(READING, JSON.stringify(next, null, 2) + '\n');
  res.statusCode = 200;
  res.end(JSON.stringify({ removed: before - next.length, total: next.length }));
}).listen(PORT, () => {
  console.log(`author-server listening on http://127.0.0.1:${PORT}`);
});
