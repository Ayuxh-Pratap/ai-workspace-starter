import type { RemixiconComponentType } from '@remixicon/react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import * as Button from '@/components/ui/button';

import { Panel } from './panel';

/** A route the starter links to but does not build yet: says what it is for and where to build it. */
export function PlaceholderPage({
  icon: Icon,
  title,
  children,
}: {
  icon: RemixiconComponentType;
  title: string;
  children: ReactNode;
}) {
  return (
    <Panel className='items-center justify-center gap-4 px-5 text-center'>
      <span className='flex size-12 items-center justify-center rounded-full border border-faded-lighter'>
        <Icon className='size-7 text-primary-base/56' aria-hidden='true' />
      </span>
      <h1 className='text-label-lg tracking-spacing-tiny-1 text-text-strong-950'>{title}</h1>
      <p className='max-w-96 text-label-sm tracking-spacing-tiny-2 text-text-soft-400'>{children}</p>
      <Button.Root asChild variant='neutral' mode='stroke' size='xsmall' className='rounded-10! px-3'>
        <Link href='/'>Back to chat</Link>
      </Button.Root>
    </Panel>
  );
}
