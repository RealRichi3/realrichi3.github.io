import { describe, it, expect } from 'vitest';
import { readingTime } from './reading-time';

describe('readingTime', () => {
  it('returns 1 min for short text', () => {
    expect(readingTime('hello world')).toEqual({ words: 2, minutes: 1 });
  });

  it('rounds up: 220 words at 200 wpm => 2 min', () => {
    const text = Array(220).fill('word').join(' ');
    expect(readingTime(text)).toEqual({ words: 220, minutes: 2 });
  });

  it('strips MDX code fences before counting', () => {
    const text = '```ts\nconst x = 1;\n```\nthe real prose has four words.';
    const r = readingTime(text);
    expect(r.words).toBe(6);
  });
});
