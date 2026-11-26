import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

/**
 * The main working surface. lg+: inset 6px from the window (none on the sidebar side), rounded, bordered.
 * Below lg: edge to edge.
 */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className='flex h-full flex-col lg:p-1.5 lg:pl-0'>
      <div
        className={cn(
          'relative flex h-full flex-col bg-bg-white-0 lg:rounded-3xl lg:border lg:border-stroke-soft-200',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
