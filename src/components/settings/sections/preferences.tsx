'use client';

import { RiAddLine, RiSubtractLine } from '@remixicon/react';
import * as React from 'react';

import { SettingsBody, SettingsGroup, SettingsRow, SettingsSwitch } from '@/components/settings/settings-primitives';
import * as Button from '@/components/ui/button';
import * as Select from '@/components/ui/select';
import type { User } from '@/types';

const notifications = [
  {
    id: 'email-notifications',
    label: 'Email notifications',
    description: 'Receive updates via email',
    enabled: true,
  },
  {
    id: 'desktop-notifications',
    label: 'Desktop notifications',
    description: 'Show browser notifications',
    enabled: false,
  },
  { id: 'sound-alerts', label: 'Sound alerts', description: 'Play notification sounds', enabled: true },
];

type BehaviorItem = { id: string; label: string; description: string } & (
  | { type: 'switch'; enabled: boolean }
  | { type: 'select'; value: string; options: { value: string; label: string }[] }
  | { type: 'counter'; value: number; minValue: number; maxValue: number }
);

const behavior: BehaviorItem[] = [
  {
    id: 'auto-save-conversations',
    label: 'Auto-save conversations',
    description: 'Automatically save chat history',
    type: 'switch',
    enabled: true,
  },
  {
    id: 'enter-to-send',
    label: 'Enter to send',
    description: 'Send messages with Enter key',
    type: 'switch',
    enabled: false,
  },
  {
    id: 'show-typing-indicator',
    label: 'Show typing indicator',
    description: 'Display when AI is responding',
    type: 'switch',
    enabled: true,
  },
  {
    id: 'default-export-format',
    label: 'Default export format',
    description: 'Preferred file format for exports',
    type: 'select',
    value: 'PDF',
    options: [
      { value: 'PDF', label: 'PDF' },
      { value: 'DOCX', label: 'DOCX' },
      { value: 'TXT', label: 'TXT' },
      { value: 'MD', label: 'Markdown' },
    ],
  },
  {
    id: 'session-timeout',
    label: 'Session timeout',
    description: 'Auto-logout after inactivity (minutes)',
    type: 'counter',
    value: 30,
    minValue: 5,
    maxValue: 120,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- every settings page takes the user
export function PreferencesSettings({ user }: { user: User }) {
  const [notify, setNotify] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(notifications.map((n) => [n.id, n.enabled])),
  );
  const [values, setValues] = React.useState<Record<string, boolean | string | number>>(() =>
    Object.fromEntries(behavior.map((b) => [b.id, b.type === 'switch' ? b.enabled : b.value])),
  );
  const setValue = (id: string, value: boolean | string | number) => setValues((v) => ({ ...v, [id]: value }));

  return (
    <SettingsBody>
      <SettingsGroup first title='Notifications' description='Email and push notification settings.' className='gap-4'>
        {notifications.map((item) => (
          <SettingsRow key={item.id} label={item.label} description={item.description} className='gap-0'>
            <SettingsSwitch
              checked={notify[item.id]}
              onCheckedChange={(checked) => setNotify((n) => ({ ...n, [item.id]: checked }))}
            />
          </SettingsRow>
        ))}
      </SettingsGroup>

      <SettingsGroup title='Behavior' description='Default actions and shortcuts.' className='gap-4'>
        {behavior.map((item) => {
          const value = values[item.id];
          return (
            <SettingsRow
              key={item.id}
              label={item.label}
              description={item.description}
              stack={item.type === 'counter' || item.type === 'select'}
            >
              {item.type === 'switch' && (
                <SettingsSwitch checked={value === true} onCheckedChange={(checked) => setValue(item.id, checked)} />
              )}
              {item.type === 'select' && (
                <Select.Root size='xsmall' value={String(value)} onValueChange={(v) => setValue(item.id, v)}>
                  <Select.Trigger className='w-full text-paragraph-sm text-text-sub-600 lg:w-auto'>
                    <Select.Value placeholder={String(value)} />
                  </Select.Trigger>
                  <Select.Content className='z-62'>
                    {item.options.map((option) => (
                      <Select.Item key={option.value} value={option.value}>
                        {option.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              )}
              {item.type === 'counter' && (
                <div className='w-full pb-2 lg:max-w-[120px] lg:min-w-[90px] lg:pb-0'>
                  <div className='flex items-center gap-2.5 rounded-10 bg-bg-white-0 p-1.5 shadow-raised-xs ring-1 ring-stroke-edge'>
                    <Button.Root
                      size='xsmall'
                      variant='neutral'
                      mode='ghost'
                      className='size-5 cursor-pointer rounded-sm p-0 hover:bg-bg-weak-50'
                      onClick={() => setValue(item.id, Math.max(item.minValue || 5, Number(value) - 1))}
                    >
                      <RiSubtractLine className='size-5 shrink-0 text-text-soft-400' />
                    </Button.Root>
                    <div className='min-w-0 flex-1 text-center text-label-sm text-text-sub-600'>{value}</div>
                    <Button.Root
                      size='xsmall'
                      variant='neutral'
                      mode='ghost'
                      className='size-5 shrink-0 cursor-pointer rounded-sm p-0 hover:bg-bg-weak-50'
                      onClick={() => setValue(item.id, Math.min(item.maxValue || 120, Number(value) + 1))}
                    >
                      <RiAddLine className='size-5 text-text-soft-400' />
                    </Button.Root>
                  </div>
                </div>
              )}
            </SettingsRow>
          );
        })}
      </SettingsGroup>
    </SettingsBody>
  );
}
