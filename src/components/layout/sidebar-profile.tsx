'use client';

import { RiArrowDownSLine, RiMoonLine } from '@remixicon/react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { SettingsLink } from '@/components/settings/settings-link';
import * as Button from '@/components/ui/button';
import * as Popover from '@/components/ui/popover';
import * as Switch from '@/components/ui/switch';
import { profileMenu } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { useMounted } from '@/hooks/use-mounted';
import type { User } from '@/types';
import { cn } from '@/utils/cn';

export function ProBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-[5px] bg-success-light px-1.5 py-0.5 text-subheading-2xs text-success-dark uppercase',
        className,
      )}
    >
      Pro
    </span>
  );
}

export function UserAvatar({ user, className }: { user: User; className?: string }) {
  return (
    <span
      aria-hidden='true'
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-soft-200 text-label-md text-text-strong-950',
        className,
      )}
    >
      {user.initials}
    </span>
  );
}

export function UserIdentity({ user }: { user: User }) {
  return (
    <span className='flex min-w-0 gap-3'>
      <UserAvatar user={user} />
      <span className='flex min-w-0 flex-col gap-1 text-left'>
        <span className='flex items-center gap-1'>
          <span className='truncate text-label-sm text-text-strong-950'>{user.name}</span>
          {user.plan === 'pro' && <ProBadge />}
        </span>
        <span className='truncate text-label-xs text-text-soft-400'>{user.email}</span>
      </span>
    </span>
  );
}

/**
 * Profile menu: identity, dark mode, settings and help, log out, version. `onNavigate` closes the popover; AlignUI's
 * Popover.Close is not used because it carries a close-button position of its own.
 */
export function ProfileMenuContent({ user, onNavigate }: { user: User; onNavigate: () => void }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const itemClass =
    'group flex w-full items-center gap-2 rounded-lg p-2 text-label-sm text-text-sub-600 transition-colors duration-300 hover:bg-bg-weak-50 hover:text-text-strong-950 focus-visible:bg-bg-weak-50 focus-visible:outline-none';

  return (
    <div className='flex flex-col gap-1'>
      <div className='p-2'>
        <UserIdentity user={user} />
      </div>
      <label className='flex cursor-pointer items-center gap-2 border-t border-stroke-soft-200 p-2 pt-3'>
        <RiMoonLine className='size-5 text-text-soft-400' />
        <span className='flex-1 text-label-sm text-text-sub-600'>Dark Mode</span>
        <Switch.Root
          checked={mounted && resolvedTheme === 'dark'}
          onCheckedChange={(on) => setTheme(on ? 'dark' : 'light')}
          aria-label='Dark mode'
        />
      </label>
      <ul className='flex flex-col gap-1 border-t border-stroke-soft-200 pt-1'>
        {profileMenu
          .filter((i) => !i.danger)
          .map(({ id, label, icon: Icon, href, settings }) => (
            <li key={id}>
              {settings ? (
                <SettingsLink section={settings} className={itemClass} onClick={onNavigate}>
                  <Icon className='size-5 text-text-soft-400' />
                  {label}
                </SettingsLink>
              ) : (
                <Link href={href} className={itemClass} onClick={onNavigate}>
                  <Icon className='size-5 text-text-soft-400' />
                  {label}
                </Link>
              )}
            </li>
          ))}
      </ul>
      <div className='flex flex-col gap-1 border-t border-stroke-soft-200 pt-1'>
        {profileMenu
          .filter((i) => i.danger)
          .map(({ id, label, icon: Icon, href }) => (
            <Link key={id} href={href} className={itemClass} onClick={onNavigate}>
              <Icon className='size-5 text-error-base' />
              {label}
            </Link>
          ))}
        <p className='p-2 text-paragraph-xs text-text-soft-400'>
          {siteConfig.version} ·{' '}
          <Link href={siteConfig.links.terms} className='hover:text-text-sub-600' onClick={onNavigate}>
            Terms &amp; Conditions
          </Link>
        </p>
      </div>
    </div>
  );
}

export const profileMenuContentClass = 'w-62 rounded-2xl p-1.5 shadow-raised-md';

/** The profile row at the bottom of the expanded sidebar. */
export function SidebarProfile({ user }: { user: User }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className='sticky bottom-0 z-30 bg-bg-white-0 p-5 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-stroke-soft-200 lg:pt-4.5 lg:before:inset-x-5'>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type='button'
            className='flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg text-left focus-visible:shadow-button-important-focus focus-visible:outline-none'
            aria-label='Toggle profile'
          >
            <UserIdentity user={user} />
            <Button.Root asChild variant='neutral' mode='ghost' size='xxsmall' className='size-6 rounded-md p-0.75'>
              <span>
                <Button.Icon
                  as={RiArrowDownSLine}
                  className={cn(
                    'size-6 text-text-sub-600 transition-transform duration-400 lg:size-4.5',
                    open && 'rotate-180',
                  )}
                />
              </span>
            </Button.Root>
          </button>
        </Popover.Trigger>
        <Popover.Content side='top' align='end' sideOffset={12} className={profileMenuContentClass}>
          <ProfileMenuContent user={user} onNavigate={() => setOpen(false)} />
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
