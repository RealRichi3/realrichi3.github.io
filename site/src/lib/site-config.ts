// site/src/lib/site-config.ts
// Single source for cross-component knobs. Edit values here; components import.

export const HOMEPAGE_LIMITS = {
  writings: 4,
  bookmarks: 5,
  projects: 4,
} as const;

export const RECENT_DESCRIPTION_MAX = 100;
