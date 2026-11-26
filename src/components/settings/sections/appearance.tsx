'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';

import { SettingsBody, SettingsGroup, SettingsRow, SettingsSwitch } from '@/components/settings/settings-primitives';
import * as Label from '@/components/ui/label';
import * as Radio from '@/components/ui/radio';
import * as Select from '@/components/ui/select';
import { useMounted } from '@/hooks/use-mounted';
import type { User } from '@/types';

const themeOptions = [
  { id: 'light', value: 'light', label: 'Light' },
  { id: 'dark', value: 'dark', label: 'Dark' },
  { id: 'system', value: 'system', label: 'System' },
];

type DisplayItem = { id: string; label: string; description: string } & (
  { type: 'select'; value: string; options: { value: string; label: string }[] } | { type: 'switch'; value: boolean }
);

const display: DisplayItem[] = [
  {
    id: 'font-size',
    label: 'Font size',
    description: 'Adjust text size for better readability',
    type: 'select',
    value: 'medium',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
      { value: 'xlarge', label: 'Extra Large' },
    ],
  },
  {
    id: 'compact-mode',
    label: 'Compact mode',
    description: 'Reduce spacing for more content on screen',
    type: 'switch',
    value: false,
  },
  {
    id: 'animations',
    label: 'Animations',
    description: 'Enable smooth transitions and effects',
    type: 'switch',
    value: true,
  },
];

const accessibility = [
  {
    id: 'high-contrast',
    label: 'High contrast',
    description: 'Increase contrast for better visibility',
    enabled: false,
  },
  { id: 'reduce-motion', label: 'Reduce motion', description: 'Minimize animations and transitions', enabled: true },
  { id: 'focus-indicators', label: 'Focus indicators', description: 'Enhanced keyboard navigation', enabled: true },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- every settings page takes the user
export function AppearanceSettings({ user }: { user: User }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [displayValues, setDisplayValues] = React.useState<Record<string, string | boolean>>(() =>
    Object.fromEntries(display.map((d) => [d.id, d.value])),
  );
  const [accessValues, setAccessValues] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(accessibility.map((a) => [a.id, a.enabled])),
  );

  return (
    <SettingsBody>
      <SettingsGroup
        first
        title='Theme'
        description='Color scheme and visual style.'
        className='gap-4'
        contentClassName='gap-4'
      >
        <div className='flex flex-col items-start justify-between gap-5'>
          <div className='flex flex-col gap-1'>
            <div className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>Color theme</div>
            <div className='text-label-xs text-text-soft-400 lg:text-label-sm'>Choose your preferred color scheme</div>
          </div>
          <div className='flex'>
            {/* The theme is only known on the client: no option is checked until mount. */}
            <Radio.Group value={mounted ? (theme ?? 'system') : ''} onValueChange={setTheme} className='flex gap-6'>
              {themeOptions.map((option) => (
                <div key={option.id} className='group/radio flex items-center gap-1.5'>
                  <Radio.Item value={option.value} id={option.id} />
                  <Label.Root
                    htmlFor={option.id}
                    className='cursor-pointer text-label-sm text-text-sub-600 group-has-[[data-state=checked]]/radio:text-text-sub-600'
                  >
                    {option.label}
                  </Label.Root>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
      </SettingsGroup>

      <SettingsGroup title='Display' description='Layout and typography options.'>
        {display.map((item) => {
          const value = displayValues[item.id];
          return (
            <SettingsRow key={item.id} label={item.label} description={item.description} stack={item.type === 'select'}>
              {item.type === 'switch' && (
                <SettingsSwitch
                  checked={value === true}
                  onCheckedChange={(checked) => setDisplayValues((v) => ({ ...v, [item.id]: checked }))}
                />
              )}
              {item.type === 'select' && (
                <Select.Root
                  size='xsmall'
                  value={String(value)}
                  onValueChange={(v) => setDisplayValues((d) => ({ ...d, [item.id]: v }))}
                >
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
            </SettingsRow>
          );
        })}
      </SettingsGroup>

      <SettingsGroup
        title='Accessibility'
        description='Accessibility and readability options.'
        contentClassName='gap-4'
      >
        {accessibility.map((item) => (
          <SettingsRow key={item.id} label={item.label} description={item.description} className='gap-0'>
            <SettingsSwitch
              checked={accessValues[item.id]}
              onCheckedChange={(checked) => setAccessValues((v) => ({ ...v, [item.id]: checked }))}
            />
          </SettingsRow>
        ))}
      </SettingsGroup>
    </SettingsBody>
  );
}
