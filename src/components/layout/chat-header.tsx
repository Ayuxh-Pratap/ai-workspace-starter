'use client';

import { RiAddFill, RiArrowDownSLine, RiMenu3Fill, RiMore2Line, RiMoreLine } from '@remixicon/react';
import Link from 'next/link';

import { ChatManageMenu, ChatShareMenu } from '@/components/chat/chat-actions-menu';
import { useModel } from '@/components/providers/model-provider';
import { useSidebar } from '@/components/providers/sidebar-provider';
import * as Button from '@/components/ui/button';
import { cn } from '@/utils/cn';

const openTrigger = 'data-[state=open]:bg-bg-weak-50 data-[state=open]:ring-1 data-[state=open]:ring-stroke-edge';

/**
 * Chat header. lg+: a breadcrumb floating over the panel (project / chat + menu, "more" on the right). Below lg: an
 * in-flow bar with the drawer button, model, project, new chat and more. Both are rendered; CSS shows one, so there
 * is no layout flash on load (the reference switches with `innerWidth` after hydration).
 */
export function ChatHeader({ project, title }: { project: string; title: string }) {
  const { setMobileOpen } = useSidebar();
  const { model } = useModel();

  return (
    <>
      <header className='absolute top-4 left-5 hidden w-[calc(100%-2rem)] items-center justify-between lg:flex'>
        <div className='flex min-w-0 items-center gap-1 text-paragraph-sm tracking-spacing-tiny-2'>
          <h1 className='truncate text-text-soft-400'>{project}</h1>
          <span className='text-text-soft-400' aria-hidden='true'>
            /
          </span>
          <span className='truncate text-text-sub-600'>{title}</span>
          <ChatManageMenu
            trigger={
              <Button.Root
                variant='neutral'
                mode='ghost'
                aria-label='Chat options'
                className={cn('group size-5 rounded-md p-0', openTrigger)}
              >
                <Button.Icon
                  as={RiArrowDownSLine}
                  className='size-5 text-text-soft-400 transition-transform duration-400 group-hover:text-text-sub-600 group-data-[state=open]:rotate-180 group-data-[state=open]:text-text-sub-600'
                />
              </Button.Root>
            }
          />
        </div>
        <ChatShareMenu
          side='left'
          trigger={
            <Button.Root
              variant='neutral'
              mode='ghost'
              aria-label='More'
              className={cn('group size-7 rounded-md p-0', openTrigger)}
            >
              <Button.Icon
                as={RiMore2Line}
                className='size-5 text-text-soft-400 group-hover:text-text-sub-600 group-data-[state=open]:text-text-sub-600'
              />
            </Button.Root>
          }
        />
      </header>

      <header className='z-1 flex items-center justify-between border-b border-stroke-soft-200 bg-bg-white-0 px-4 py-3 lg:hidden'>
        <div className='flex min-w-0 items-center gap-3.5'>
          <Button.Root
            variant='neutral'
            mode='ghost'
            aria-label='Open sidebar'
            onClick={() => setMobileOpen(true)}
            className='size-8 rounded-lg p-0'
          >
            <Button.Icon as={RiMenu3Fill} className='size-5 text-text-soft-400' />
          </Button.Root>
          <div className='flex min-w-0 flex-col gap-1'>
            <span className='flex h-5 items-center gap-1 text-label-sm text-text-sub-600'>
              {model.name}
              <RiArrowDownSLine className='size-4 text-text-soft-400' aria-hidden='true' />
            </span>
            <span className='truncate text-label-xs text-text-soft-400'>{project} project</span>
          </div>
        </div>
        <div className='flex items-center gap-3.5'>
          <Button.Root asChild variant='neutral' mode='ghost' className='size-8 rounded-full bg-primary-alpha-10 p-0.5'>
            <Link href='/' aria-label='New chat'>
              <Button.Icon as={RiAddFill} className='size-4.5 text-primary-base' />
            </Link>
          </Button.Root>
          <ChatShareMenu
            align='end'
            trigger={
              <Button.Root
                variant='neutral'
                mode='ghost'
                aria-label='More'
                className={cn('group size-8 p-0', openTrigger)}
              >
                <Button.Icon as={RiMoreLine} className='size-5 text-text-soft-400 group-hover:text-text-sub-600' />
              </Button.Root>
            }
          />
        </div>
      </header>
    </>
  );
}
