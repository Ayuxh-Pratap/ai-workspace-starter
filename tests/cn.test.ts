import { describe, expect, it } from 'vitest';

import { cn } from '@/utils/cn';

describe('cn (AlignUI)', () => {
  it('lets a later AlignUI type class replace an earlier one', () => {
    expect(cn('text-label-sm', 'text-paragraph-xs')).toBe('text-paragraph-xs');
  });
  it('keeps a type class and a colour class together', () => {
    expect(cn('text-label-sm', 'text-text-sub-600')).toBe('text-label-sm text-text-sub-600');
  });
});
