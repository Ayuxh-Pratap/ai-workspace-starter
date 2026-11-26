import { LogoMark } from '@/components/brand/logo';

export function ChatEmptyState({ name }: { name: string }) {
  return (
    <div className='absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center px-4'>
      <LogoMark className='mb-5 size-8 text-text-disabled-300' />
      <h2 className='mb-1 text-label-lg tracking-spacing-tiny-1 text-text-strong-950'>Hello {name}</h2>
      <p className='text-center text-label-sm tracking-spacing-tiny-2 text-text-soft-400'>
        What can I help you with today?
      </p>
    </div>
  );
}
