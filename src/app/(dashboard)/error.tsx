'use client';

import * as Button from '@/components/ui/button';

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-4 px-5 text-center'>
      <h1 className='text-label-lg text-text-strong-950'>Something went wrong</h1>
      <p className='max-w-96 text-label-sm text-text-soft-400'>
        {error.digest ? `Error ${error.digest}` : error.message}
      </p>
      <Button.Root variant='neutral' mode='stroke' size='small' className='rounded-10!' onClick={reset}>
        Try again
      </Button.Root>
    </div>
  );
}
