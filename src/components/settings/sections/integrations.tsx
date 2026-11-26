'use client';

import { RiFileCopyLine } from '@remixicon/react';
import * as React from 'react';

import { LogoPlaceholder } from '@/components/settings/sections/brand-logos';
import {
  SettingsBody,
  SettingsGroup,
  SettingsRow,
  settingsButtonClass,
} from '@/components/settings/settings-primitives';
import * as Button from '@/components/ui/button';
import type { User } from '@/types';
import { cn } from '@/utils/cn';

const connectedApps = [
  { id: 'google-drive', name: 'Google Drive', description: 'Access and sync your files', isConnected: true },
  { id: 'slack', name: 'Slack', description: 'Send messages & notifications', isConnected: true },
  { id: 'notion', name: 'Notion', description: 'Create and update pages', isConnected: false },
  { id: 'dropbox', name: 'Dropbox', description: 'Create and update pages', isConnected: false },
  { id: 'trello', name: 'Trello', description: 'Create and update pages', isConnected: false },
];

const apiAccess: { id: string; label: string; description: string; buttonText: string; value?: string }[] = [
  {
    id: 'api-key',
    label: 'API Key',
    description: 'Your personal API key for external integrations',
    buttonText: 'Generate key',
    value: 'sk-ant-api03-********************-abc123',
  },
  {
    id: 'webhooks',
    label: 'Webhooks',
    description: 'Configure webhook endpoints for real-time updates',
    buttonText: 'Manage',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- every settings page takes the user
export function IntegrationsSettings({ user }: { user: User }) {
  const [connected, setConnected] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(connectedApps.map((app) => [app.id, app.isConnected])),
  );

  const copyKey = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // clipboard unavailable: nothing to do
    }
  };

  return (
    <SettingsBody>
      <SettingsGroup
        first
        title='Connected apps'
        description='Manage third-party app connections.'
        contentClassName='border-t border-stroke-soft-200 pt-4 lg:border-t-0 lg:pt-0'
      >
        {connectedApps.map((app) => {
          const isConnected = connected[app.id];
          return (
            <div key={app.id} className='flex items-center justify-between gap-2.5'>
              <div className='flex gap-2.5 lg:items-center'>
                <LogoPlaceholder label={app.name} className='mt-0.75 size-4.5 rounded-sm lg:mt-0' />
                <div className='flex flex-col gap-2 lg:flex-row lg:gap-2.5'>
                  <div className='text-label-sm tracking-spacing-tiny-2 text-text-sub-600'>{app.name}</div>
                  <div className='text-label-xs text-text-soft-400 lg:text-label-sm'>{app.description}</div>
                </div>
              </div>
              <Button.Root
                size='xxsmall'
                variant='neutral'
                mode='lighter'
                onClick={() => setConnected((c) => ({ ...c, [app.id]: !c[app.id] }))}
                className={cn(
                  'w-fit cursor-pointer rounded-10! px-2.5 text-label-sm',
                  isConnected
                    ? 'border border-transparent bg-green-600/10 text-green-600 shadow-none hover:border-green-600 hover:bg-transparent hover:text-green-600'
                    : 'text-text-sub-600',
                )}
              >
                {isConnected ? 'Connected' : 'Connect'}
              </Button.Root>
            </div>
          );
        })}
      </SettingsGroup>

      <SettingsGroup
        title='API Access'
        description='Developer tools and API settings.'
        className='gap-4 lg:border-t-0'
        contentClassName='gap-5 border-t border-stroke-soft-200 pt-4 lg:gap-5 lg:border-t-0 lg:pt-0'
      >
        {apiAccess.map((item) => (
          <div
            key={item.id}
            className={cn(
              'flex flex-col gap-5 lg:gap-3',
              item.id === 'webhooks' && 'border-t border-stroke-soft-200 pt-5 lg:border-t-0 lg:pt-0',
            )}
          >
            <SettingsRow label={item.label} description={item.description} stack>
              <Button.Root size='xsmall' variant='neutral' mode='stroke' className={settingsButtonClass}>
                {item.buttonText}
              </Button.Root>
            </SettingsRow>
            {item.value && (
              <div className='flex items-center gap-3 rounded-xl bg-bg-weak-50 px-4 py-3 shadow-raised-xs ring-1 ring-stroke-edge lg:p-3'>
                <div className='max-w-[calc(100%-32px)] flex-1 overflow-hidden text-label-sm whitespace-nowrap text-text-sub-600'>
                  {item.value}
                </div>
                <button
                  type='button'
                  onClick={() => copyKey(item.value!)}
                  className='flex cursor-pointer items-center justify-center p-0 transition-colors'
                >
                  <RiFileCopyLine className='size-5 text-text-soft-400 hover:text-text-sub-600' />
                </button>
              </div>
            )}
          </div>
        ))}
      </SettingsGroup>
    </SettingsBody>
  );
}
