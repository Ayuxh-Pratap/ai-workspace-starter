import type { Metadata } from 'next';
import Link from 'next/link';

import { LogoMark } from '@/components/brand/logo';
import * as Button from '@/components/ui/button';

export const metadata: Metadata = { title: 'Sign in' };

/** Outside the app shell. Replace with your auth provider's sign-in; "Log out" in the profile menu lands here. */
export default function LoginPage() {
  return (
    <main className='flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg-white-0 px-5 text-center'>
      <LogoMark className='size-10 text-primary-base' />
      <h1 className='text-label-lg text-text-strong-950'>You are signed out</h1>
      <p className='max-w-80 text-label-sm text-text-soft-400'>Authentication is not wired up in this starter.</p>
      <Button.Root asChild variant='neutral' mode='stroke' size='small' className='rounded-10!'>
        <Link href='/'>Back to the app</Link>
      </Button.Root>
    </main>
  );
}
