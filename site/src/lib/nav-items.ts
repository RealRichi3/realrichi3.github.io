// site/src/lib/nav-items.ts
export interface NavItem { label: string; href: string; }

export const NAV_ITEMS: NavItem[] = [
  { label: 'home',      href: '/' },
  { label: 'blog',      href: '/blog' },
  { label: 'projects',  href: '/projects' },
  { label: 'bookmarks', href: '/reading' },
];
