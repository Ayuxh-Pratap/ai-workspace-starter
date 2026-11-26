import { describe, expect, it } from 'vitest';

import { formatRelative, formatTime } from '@/utils/format';

describe('formatRelative', () => {
  const now = new Date('2026-11-25T12:00:00.000Z');
  it('names the largest whole unit', () => {
    expect(formatRelative('2026-11-13T12:00:00.000Z', now)).toBe('2 weeks ago');
    expect(formatRelative('2026-11-24T12:00:00.000Z', now)).toBe('yesterday');
    expect(formatRelative('2026-11-25T09:00:00.000Z', now)).toBe('3 hours ago');
  });
  it('says "just now" under a minute', () => {
    expect(formatRelative('2026-11-25T11:59:30.000Z', now)).toBe('just now');
  });
});

describe('formatTime', () => {
  it('formats a UTC time of day', () => {
    expect(formatTime('2026-11-20T15:15:00.000Z')).toBe('3:15 PM');
  });
});
