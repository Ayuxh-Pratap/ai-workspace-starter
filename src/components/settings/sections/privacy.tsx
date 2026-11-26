'use client';

import * as React from 'react';

import {
  SettingsBody,
  SettingsGroup,
  SettingsRow,
  SettingsSwitch,
  settingsButtonClass,
} from '@/components/settings/settings-primitives';
import * as Button from '@/components/ui/button';
import type { User } from '@/types';

type PrivacyItem = { id: string; label: string; description: string } & (
  { type: 'switch'; enabled: boolean } | { type: 'button'; buttonText: string }
);

const groups: { id: string; title: string; description: string; items: PrivacyItem[] }[] = [
  {
    id: 'dataCollection',
    title: 'Data collection',
    description: 'Control what data we collect and how.',
    items: [
      {
        id: 'crash-reports',
        label: 'Crash reports',
        description: 'Automatically send error reports to help fix bugs',
        type: 'switch',
        enabled: true,
      },
      {
        id: 'analytics-tracking',
        label: 'Analytics tracking',
        description: 'Get notified of new sign-ins',
        type: 'switch',
        enabled: true,
      },
    ],
  },
  {
    id: 'dataUsage',
    title: 'Data usage',
    description: 'Manage how your data is used.',
    items: [
      {
        id: 'personalization',
        label: 'Personalization',
        description: 'Use your data to personalize your experience',
        type: 'switch',
        enabled: true,
      },
      {
        id: 'ai-training',
        label: 'AI training',
        description: 'Use conversations to improve AI responses',
        type: 'switch',
        enabled: false,
      },
    ],
  },
  {
    id: 'dataRights',
    title: 'Data rights',
    description: 'Your privacy rights and data control.',
    items: [
      {
        id: 'download-data',
        label: 'Download your data',
        description: 'Export all your conversations and account data',
        type: 'button',
        buttonText: 'Download',
      },
      {
        id: 'delete-account',
        label: 'Delete account',
        description: 'Permanently delete your account and all data',
        type: 'button',
        buttonText: 'Delete',
      },
    ],
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- every settings page takes the user
export function PrivacySettings({ user }: { user: User }) {
  const [switches, setSwitches] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      groups.flatMap((g) => g.items.flatMap((item) => (item.type === 'switch' ? [[item.id, item.enabled]] : []))),
    ),
  );

  return (
    <SettingsBody className='lg:gap-4'>
      {groups.map((group, i) => (
        <SettingsGroup
          key={group.id}
          first={i === 0}
          title={group.title}
          description={group.description}
          className='lg:border-t-0'
          contentClassName='gap-4 lg:gap-5'
        >
          {group.items.map((item) => (
            <SettingsRow
              key={item.id}
              label={item.label}
              description={<span className='tracking-spacing-tiny-2'>{item.description}</span>}
              stack={item.type === 'button'}
              className={item.type === 'button' ? undefined : 'gap-0'}
            >
              {item.type === 'switch' ? (
                <SettingsSwitch
                  checked={switches[item.id]}
                  onCheckedChange={() => setSwitches((s) => ({ ...s, [item.id]: !s[item.id] }))}
                />
              ) : item.id === 'delete-account' ? (
                <Button.Root
                  size='xsmall'
                  variant='error'
                  mode='lighter'
                  className='w-full cursor-pointer rounded-10! px-3 text-label-sm lg:w-fit'
                >
                  {item.buttonText}
                </Button.Root>
              ) : (
                <Button.Root size='xsmall' variant='neutral' mode='stroke' className={settingsButtonClass}>
                  {item.buttonText}
                </Button.Root>
              )}
            </SettingsRow>
          ))}
        </SettingsGroup>
      ))}
    </SettingsBody>
  );
}
