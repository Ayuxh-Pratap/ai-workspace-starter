'use client';

import { RiCloseFill, RiSearchLine, RiSideBarLine } from '@remixicon/react';
import Link from 'next/link';
import * as React from 'react';

import { LogoMark } from '@/components/brand/logo';
import { useSidebar } from '@/components/providers/sidebar-provider';
import * as Button from '@/components/ui/button';
import * as Input from '@/components/ui/input';
import * as Tooltip from '@/components/ui/tooltip';
import type { Chat, ChatGroup, Project, User } from '@/types';
import { cn } from '@/utils/cn';

import { SidebarHistory } from './sidebar-history';
import { SidebarMainNav, SidebarPinned } from './sidebar-nav';
import { SidebarProfile } from './sidebar-profile';
import { SidebarRail } from './sidebar-rail';

export type SidebarData = {
  user: User;
  pinned: Project[];
  history: { group: ChatGroup; chats: Chat[] }[];
};

/**
 * The app sidebar. lg+: in the layout, 272px, folds to a 72px icon rail. Below lg: a full-width drawer from the
 * left. Both states live in SidebarProvider; the markup follows the reference template.
 */
export function Sidebar({ user, pinned, history }: SidebarData) {
  const { collapsed, mobileOpen } = useSidebar();
  const [query, setQuery] = React.useState('');

  return (
    <Tooltip.Provider delayDuration={300}>
      <div
        className={cn(
          'fixed z-40 h-full bg-bg-white-0 transition-all duration-300 ease-in-out motion-reduce:transition-none lg:relative lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          collapsed ? 'w-sidebar-rail' : 'w-full lg:w-sidebar',
        )}
        aria-label='Sidebar'
      >
        <SidebarRail user={user} />

        <div
          className={cn(
            'h-full transition-opacity duration-300 ease-in-out',
            collapsed ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100',
          )}
          inert={collapsed || undefined}
        >
          <nav className='flex h-full w-full flex-col whitespace-nowrap lg:w-sidebar' aria-label='Main'>
            <SidebarTop query={query} onQueryChange={setQuery} />
            <div className='flex-1 overflow-x-hidden overflow-y-auto lg:px-3.5'>
              {query.trim() ? (
                <SidebarHistory history={history} query={query} />
              ) : (
                <>
                  <SidebarPinned projects={pinned} />
                  <SidebarHistory history={history} />
                </>
              )}
            </div>
            <SidebarProfile user={user} />
          </nav>
        </div>
      </div>
    </Tooltip.Provider>
  );
}

function SidebarTop({ query, onQueryChange }: { query: string; onQueryChange: (q: string) => void }) {
  const { toggleCollapsed, setMobileOpen, searchRequested } = useSidebar();
  const searchRef = React.useRef<HTMLInputElement>(null);

  // the rail's search button expands the sidebar, then the field takes focus once the fold has finished
  React.useEffect(() => {
    if (!searchRequested) return;
    const t = window.setTimeout(() => searchRef.current?.focus(), 350);
    return () => window.clearTimeout(t);
  }, [searchRequested]);

  return (
    <div className='sticky top-0 z-10 bg-bg-white-0 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-stroke-soft-200 lg:pt-5 lg:after:inset-x-5'>
      <div className='flex items-center justify-between border-b border-stroke-soft-200 py-4 pr-4 pl-5 lg:border-none lg:py-0 lg:pr-3.5'>
        <Link
          href='/'
          aria-label='Home'
          className='rounded-lg focus-visible:shadow-button-primary-focus focus-visible:outline-none'
        >
          <LogoMark className='size-7 text-primary-base lg:size-8' />
        </Link>
        <Button.Root
          variant='neutral'
          mode='ghost'
          size='xsmall'
          aria-label='Close sidebar'
          onClick={() => setMobileOpen(false)}
          className='size-8 p-0 lg:hidden'
        >
          <Button.Icon as={RiCloseFill} className='text-text-soft-400 group-hover:text-text-sub-600' />
        </Button.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button.Root
              variant='neutral'
              mode='ghost'
              size='xsmall'
              aria-label='Toggle sidebar'
              onClick={toggleCollapsed}
              className='hidden cursor-w-resize lg:flex'
            >
              <Button.Icon as={RiSideBarLine} className='text-text-soft-400 group-hover:text-text-sub-600' />
            </Button.Root>
          </Tooltip.Trigger>
          <Tooltip.Content size='small' sideOffset={6} className='rounded-lg text-paragraph-xs'>
            Toggle sidebar
          </Tooltip.Content>
        </Tooltip.Root>
      </div>

      <div className='relative p-5 lg:px-3.5 lg:pt-4 lg:pb-3.5'>
        <Input.Root size='small' className='rounded-10! shadow-none! has-[input:focus]:shadow-gray-shadow-2!'>
          <Input.Wrapper className='bg-bg-weak-50 px-2'>
            <Input.Icon as={RiSearchLine} className='text-text-soft-400!' />
            <Input.Input
              ref={searchRef}
              type='search'
              placeholder='Search...'
              aria-label='Search chats'
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && onQueryChange('')}
            />
          </Input.Wrapper>
        </Input.Root>
      </div>

      <SidebarMainNav />
    </div>
  );
}
