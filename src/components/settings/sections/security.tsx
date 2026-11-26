'use client';

import { RiCloseLine } from '@remixicon/react';
import * as React from 'react';

import { LogoPlaceholder } from '@/components/settings/sections/brand-logos';
import {
  SettingsBody,
  SettingsGroup,
  SettingsRow,
  SettingsSwitch,
  settingsButtonClass,
} from '@/components/settings/settings-primitives';
import * as Button from '@/components/ui/button';
import type { User } from '@/types';

type SecurityItem = { id: string; label: string; description: string } & (
  { type: 'button'; buttonText: string } | { type: 'switch'; enabled: boolean }
);

const accountSecurity: SecurityItem[] = [
  {
    id: 'password',
    label: 'Password',
    description: 'Last changed 3 months ago',
    type: 'button',
    buttonText: 'Change',
  },
  {
    id: 'two-factor-auth',
    label: 'Two-factor authentication',
    description: 'Add an extra layer of security to your account',
    type: 'button',
    buttonText: 'Enable 2FA',
  },
  {
    id: 'login-notifications',
    label: 'Login notifications',
    description: 'Get notified of new sign-ins',
    type: 'switch',
    enabled: true,
  },
  {
    id: 'password-recovery',
    label: 'Password recovery',
    description: 'Update your recovery email address',
    type: 'button',
    buttonText: 'Update',
  },
];

const initialSessions = [
  { id: '1', browser: 'Google Chrome', location: 'New York, US', ipAddress: '108.62.8.33' },
  { id: '2', browser: 'Arch', location: 'Los Angeles, US', ipAddress: '173.13.91.22' },
  { id: '3', browser: 'Mozilla Firefox', location: 'London, UK', ipAddress: '81.12.69.144' },
  { id: '4', browser: 'Safari', location: 'Toronto, Canada', ipAddress: '206.14.2.89' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- every settings page takes the user
export function SecuritySettings({ user }: { user: User }) {
  const [switches, setSwitches] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(accountSecurity.flatMap((s) => (s.type === 'switch' ? [[s.id, s.enabled]] : []))),
  );
  const [sessions, setSessions] = React.useState(initialSessions);

  return (
    <SettingsBody>
      <SettingsGroup
        first
        title='Account security'
        description='Password & login security settings.'
        contentClassName='border-t border-stroke-soft-200 pt-4 lg:border-t-0 lg:pt-0'
      >
        {accountSecurity.map((item) => (
          <SettingsRow
            key={item.id}
            label={item.label}
            description={item.description}
            stack={item.type === 'button'}
            className={item.type === 'button' ? undefined : 'gap-0'}
          >
            {item.type === 'button' && (
              <Button.Root size='xsmall' variant='neutral' mode='stroke' className={settingsButtonClass}>
                {item.buttonText}
              </Button.Root>
            )}
            {item.type === 'switch' && (
              <SettingsSwitch
                checked={switches[item.id]}
                onCheckedChange={(checked) => setSwitches((s) => ({ ...s, [item.id]: checked }))}
              />
            )}
          </SettingsRow>
        ))}
      </SettingsGroup>

      <SettingsGroup title='Access control' description='Manage device access & sessions.' contentClassName='gap-4'>
        <SettingsRow
          label='Active sessions'
          description='Manage your logged-in devices'
          stack
          className='gap-5 lg:gap-4'
        >
          <Button.Root size='xsmall' variant='neutral' mode='stroke' className={settingsButtonClass}>
            View all
          </Button.Root>
        </SettingsRow>
        <div className='flex flex-col gap-5 border-t border-stroke-soft-200 pt-5'>
          {sessions.map((session) => (
            <div key={session.id} className='flex items-center justify-between gap-2.5'>
              <div className='flex w-[37%] items-center gap-2'>
                <LogoPlaceholder label={session.browser} className='size-4.5' />
                <div className='text-label-sm tracking-spacing-tiny-2 text-text-sub-600'>{session.browser}</div>
              </div>
              <div className='w-[33%] text-label-xs text-text-soft-400 lg:text-label-sm'>{session.location}</div>
              <div className='w-[19%] text-label-xs text-text-soft-400 lg:text-label-sm'>{session.ipAddress}</div>
              <Button.Root
                size='xsmall'
                variant='neutral'
                mode='ghost'
                className='size-5 cursor-pointer rounded-sm p-0 transition-colors hover:bg-bg-weak-50'
                onClick={() => setSessions((list) => list.filter((s) => s.id !== session.id))}
              >
                <RiCloseLine className='size-5 text-text-soft-400' />
              </Button.Root>
            </div>
          ))}
        </div>
      </SettingsGroup>
    </SettingsBody>
  );
}
