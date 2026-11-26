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

const developerSettings = [
  { id: 'debug-mode', label: 'Debug mode', description: 'Enable detailed debugging information', enabled: false },
  { id: 'console-logs', label: 'Console logs', description: 'Show technical logs in browser console', enabled: false },
  {
    id: 'error-reporting',
    label: 'Error reporting',
    description: 'Send detailed error reports to developers',
    enabled: true,
  },
];

const system = [
  {
    id: 'cache-management',
    label: 'Cache management',
    description: 'Clear application cache and temporary files',
    buttonText: 'Clear',
  },
  {
    id: 'export-settings',
    label: 'Export settings',
    description: 'Download your configuration as JSON file',
    buttonText: 'Export',
  },
  {
    id: 'import-settings',
    label: 'Import settings',
    description: 'Restore configuration from backup file',
    buttonText: 'Import',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- every settings page takes the user
export function AdvancedSettings({ user }: { user: User }) {
  const [switches, setSwitches] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(developerSettings.map((s) => [s.id, s.enabled])),
  );

  return (
    <SettingsBody>
      <SettingsGroup
        first
        title='Developer settings'
        description='Advanced developer and debug options.'
        className='gap-4'
        contentClassName='lg:gap-5'
      >
        {developerSettings.map((item) => (
          <SettingsRow key={item.id} label={item.label} description={item.description} className='gap-0'>
            <SettingsSwitch
              checked={switches[item.id]}
              onCheckedChange={(checked) => setSwitches((s) => ({ ...s, [item.id]: checked }))}
            />
          </SettingsRow>
        ))}
      </SettingsGroup>

      {/* Not a SettingsGroup: the reference gives this label column a fixed 300px width below lg as well. */}
      <div className='flex flex-col gap-4 border-t border-stroke-soft-200 px-5 pt-5 lg:flex-row lg:border-t-0 lg:px-0 lg:pt-7'>
        <div className='flex max-w-75 min-w-75 flex-col gap-1 lg:max-w-50 lg:min-w-50 xl:max-w-75 xl:min-w-75'>
          <h3 className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>System</h3>
          <p className='text-label-xs tracking-spacing-tiny-2 text-text-soft-400 lg:text-label-sm'>
            Advanced system configuration.
          </p>
        </div>
        <div className='flex w-full flex-col gap-5'>
          {system.map((item) => (
            <SettingsRow key={item.id} label={item.label} description={item.description} stack>
              <Button.Root size='xsmall' variant='neutral' mode='stroke' className={settingsButtonClass}>
                {item.buttonText}
              </Button.Root>
            </SettingsRow>
          ))}
        </div>
      </div>
    </SettingsBody>
  );
}
