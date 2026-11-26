'use client';

import { useMounted } from '@/hooks/use-mounted';
import { formatRelative } from '@/utils/format';

const absolute = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** "12 days ago" in the browser; a fixed date on the server, so prerendered HTML never depends on the clock. */
export function RelativeTime({ iso }: { iso: string }) {
  const mounted = useMounted();
  return <time dateTime={iso}>{mounted ? formatRelative(iso) : absolute.format(new Date(iso))}</time>;
}
