// site/src/components/CommandPalette.tsx
import { useEffect, useMemo, useRef, useState } from 'react';

interface SearchEntry {
  kind: 'nav' | 'post' | 'project' | 'reading';
  title: string;
  subtitle?: string;
  href: string;
}

interface Props { base: string; indexUrl: string; }

export default function CommandPalette({ base, indexUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<SearchEntry[]>([]);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      const cmdK = (e.metaKey || e.ctrlKey) && k === 'k';
      if (cmdK) { e.preventDefault(); setOpen((v) => !v); }
      else if (e.key === 'Escape' && open) { setOpen(false); }
    }
    const clickTrigger = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest('#cmdk-open')) { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', clickTrigger);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', clickTrigger);
    };
  }, [open]);

  useEffect(() => {
    if (!open || items.length > 0) return;
    fetch(indexUrl).then((r) => r.json()).then(setItems).catch(() => setItems([]));
  }, [open, items.length, indexUrl]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
    else { setQuery(''); setActive(0); }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 30);
    return items
      .filter((it) => (it.title + ' ' + (it.subtitle ?? '')).toLowerCase().includes(q))
      .slice(0, 30);
  }, [query, items]);

  function activate(it: SearchEntry) {
    const isAbs = /^https?:\/\//i.test(it.href);
    const url = isAbs ? it.href : `${base}${it.href}`;
    if (isAbs) window.open(url, '_blank', 'noopener');
    else window.location.href = url;
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter' && filtered[active]) { e.preventDefault(); activate(filtered[active]); }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/40" onClick={() => setOpen(false)}>
      <div
        className="w-full max-w-lg rounded-md border border-divider bg-bg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={onKeyDown}
          placeholder="search posts, projects, nav…"
          className="w-full bg-transparent text-text border-b border-divider px-4 py-3 text-sm outline-none"
        />
        <ul className="max-h-80 overflow-y-auto py-1">
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-sm text-muted">no matches.</li>
          )}
          {filtered.map((it, i) => (
            <li
              key={`${it.kind}-${it.href}-${i}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => activate(it)}
              className={`px-4 py-2 cursor-pointer text-sm ${i === active ? 'bg-divider' : ''}`}
            >
              <span className="text-muted text-xs uppercase mr-2 tracking-widest">{it.kind}</span>
              {it.title}
              {it.subtitle && <span className="text-muted"> — {it.subtitle}</span>}
            </li>
          ))}
        </ul>
        <div className="border-t border-divider px-4 py-2 text-xs text-muted flex justify-between">
          <span>↑↓ navigate · ↵ select</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
