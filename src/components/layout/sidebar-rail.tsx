'use client';

import { RiSearchLine, RiSideBarLine } from '@remixicon/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { LogoMark } from '@/components/brand/logo';
import { useSidebar } from '@/components/providers/sidebar-provider';
import * as Button from '@/components/ui/button';
import * as Popover from '@/components/ui/popover';
import * as Tooltip from '@/components/ui/tooltip';
import { mainNav } from '@/config/navigation';
import type { User } from '@/types';
import { cn } from '@/utils/cn';

import { ProfileMenuContent, profileMenuContentClass } from './sidebar-profile';

function RailTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Content side='right' size='xsmall' sideOffset={8} className='rounded-md px-2 py-1 text-label-xs'>
        {label}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

/** lg+, collapsed: logo, main navigation and search as icons; a click on empty rail expands the sidebar. */
export function SidebarRail({ user }: { user: User }) {
  const { collapsed, toggleCollapsed, requestSearch } = useSidebar();
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = React.useState(false);

  return (
    <div
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest('a,button')) toggleCollapsed();
      }}
      className={cn(
        'group absolute inset-0 hidden h-full w-sidebar-rail cursor-e-resize flex-col justify-between p-5 transition-opacity duration-300 lg:flex',
        collapsed ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      inert={!collapsed || undefined}
      aria-label='Collapsed sidebar'
    >
      <div className='space-y-5'>
        <div className='relative flex pb-5 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-stroke-soft-200'>
          <RailTooltip label='Toggle sidebar'>
            <Button.Root
              variant='neutral'
              mode='ghost'
              size='xsmall'
              aria-label='Toggle sidebar'
              onClick={toggleCollapsed}
              className='group/logo size-8 cursor-e-resize p-0'
            >
              <LogoMark className='size-8 text-primary-base group-hover/logo:hidden' />
              <Button.Icon
                as={RiSideBarLine}
                className='hidden text-text-soft-400 group-hover/logo:block group-hover/logo:text-text-sub-600'
              />
            </Button.Root>
          </RailTooltip>
        </div>
        <div className='space-y-3'>
          {mainNav.map(({ id, label, href, icon: Icon, primary }) => (
            <RailTooltip key={id} label={label}>
              <Link
                href={href}
                aria-label={label}
                aria-current={!primary && pathname === href ? 'page' : undefined}
                className={cn(
                  'group/item flex size-8 items-center justify-center rounded-lg transition-colors duration-200 focus-visible:shadow-button-important-focus focus-visible:outline-none',
                  primary ? 'text-primary-base' : 'text-text-sub-600 hover:bg-bg-weak-50',
                )}
              >
                <Icon
                  className={cn(
                    'transition duration-200 ease-out',
                    primary
                      ? 'size-8 rounded-full bg-primary-alpha-10 p-1.5 text-primary-base'
                      : 'size-5 text-text-soft-400 group-hover/item:text-text-sub-600',
                  )}
                />
              </Link>
            </RailTooltip>
          ))}
          <RailTooltip label='Search'>
            <Button.Root
              variant='neutral'
              mode='ghost'
              size='xsmall'
              aria-label='Search'
              onClick={requestSearch}
              className='size-8 p-0'
            >
              <Button.Icon as={RiSearchLine} className='text-text-soft-400 group-hover:text-text-sub-600' />
            </Button.Root>
          </RailTooltip>
        </div>
      </div>
      <div className='relative flex pt-5 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-stroke-soft-200'>
        <Popover.Root open={profileOpen} onOpenChange={setProfileOpen}>
          <Popover.Trigger asChild>
            <button
              type='button'
              aria-label='Toggle profile'
              className='flex size-8 cursor-pointer items-center justify-center rounded-full bg-bg-soft-200 text-label-sm text-text-strong-950 transition-all duration-200 hover:bg-bg-weak-50 focus-visible:shadow-button-important-focus focus-visible:outline-none data-[state=open]:bg-bg-weak-50 data-[state=open]:ring-1 data-[state=open]:ring-stroke-edge'
            >
              {user.initials}
            </button>
          </Popover.Trigger>
          <Popover.Content side='right' align='end' sideOffset={12} className={profileMenuContentClass}>
            <ProfileMenuContent user={user} onNavigate={() => setProfileOpen(false)} />
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  );
}
