import Link from 'next/link';

import { LogoMark } from '@/components/brand/logo';
import * as Button from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className='flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg-white-0 px-5 text-center'>
      <LogoMark className='size-8 text-text-disabled-300' />
      <h1 className='text-label-lg text-text-strong-950'>Page not found</h1>
      <p className='text-label-sm text-text-soft-400'>The page you are looking for does not exist or was moved.</p>
      <Button.Root asChild variant='neutral' mode='stroke' size='small' className='rounded-10!'>
        <Link href='/'>Go home</Link>
      </Button.Root>
    </main>
  );
}
