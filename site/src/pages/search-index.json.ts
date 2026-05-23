// site/src/pages/search-index.json.ts
import { buildSearchIndex } from '../lib/build-search-index';

export async function GET() {
  const data = await buildSearchIndex();
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
  });
}
