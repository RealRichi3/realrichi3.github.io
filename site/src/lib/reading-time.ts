// site/src/lib/reading-time.ts
export interface ReadingTime { words: number; minutes: number; }

const WORDS_PER_MINUTE = 200;

export function readingTime(input: string): ReadingTime {
  const stripped = input.replace(/```[\s\S]*?```/g, ' ');
  const words = stripped.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return { words, minutes };
}
