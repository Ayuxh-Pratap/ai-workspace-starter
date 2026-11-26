'use client';

import * as React from 'react';

import { SettingsBody, SettingsGroup } from '@/components/settings/settings-primitives';
import * as Button from '@/components/ui/button';
import type { User } from '@/types';
import { cn } from '@/utils/cn';

const overviewItems = [
  { id: 'workspace', label: 'Workspace', value: 'Acme Inc.' },
  { id: 'yourRole', label: 'Your role', value: 'Admin' },
  { id: 'teamMembers', label: 'Team members', value: '3/10 seats' },
  { id: 'planRenewal', label: 'Plan renewal', value: 'June 20, 2025' },
];

const activityItems: { id: string; label: string; value: number; unit?: '%' }[] = [
  { id: 'conversations', label: 'Conversations', value: 2847 },
  { id: 'activeProjects', label: 'Active projects', value: 59 },
  { id: 'filesUploaded', label: 'Files uploaded', value: 156 },
  { id: 'storageUsed', label: 'Storage used', value: 24, unit: '%' },
];

const planUsageItems = [
  { label: 'Team seats', value: 60, colorClass: 'bg-purple-500' },
  { label: 'Storage', value: 8, colorClass: 'bg-teal-500' },
  { label: 'API', value: 25, colorClass: 'bg-orange-500' },
];

export function WorkspaceSettings({ user }: { user: User }) {
  // The usage bars fill their container: one 4px bar + 3px gap per 7px of its width.
  const [width, setWidth] = React.useState(200);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setWidth(el.offsetWidth));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const barCount = Math.max(1, Math.floor((width + 3) / 7));

  return (
    <SettingsBody>
      <div className='flex flex-col gap-5 pt-5 lg:flex-row lg:gap-4 lg:pt-7'>
        <div className='flex flex-col gap-1 px-5 lg:max-w-50 lg:min-w-50 lg:px-0 xl:max-w-75 xl:min-w-75'>
          <h3 className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>Overview</h3>
          <p className='text-label-xs text-text-soft-400 lg:text-label-sm lg:tracking-spacing-tiny-2'>
            Workspace summary and details.
          </p>
        </div>
        <div className='flex w-full flex-col'>
          <div className='flex flex-col items-start justify-between px-5 lg:flex-row lg:items-center lg:px-0'>
            <div className='mb-3 flex items-center gap-3 lg:mb-0'>
              <div className='flex size-10 items-center justify-center rounded-full bg-bg-soft-200 text-label-md tracking-spacing-tiny-4 text-text-strong-950 lg:size-8 lg:text-label-sm xl:size-10 xl:text-label-md'>
                {user.initials}
              </div>
              <div className='flex flex-col gap-1'>
                <div className='flex gap-1'>
                  <div className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>{user.name}</div>
                  <div className='text-label-sm tracking-spacing-tiny-2 text-text-soft-400'>({user.email})</div>
                </div>
                <div className='text-label-xs text-text-disabled-300'>
                  Member since <span className='text-text-sub-600'>May 16, 2025</span>
                </div>
              </div>
            </div>
            <Button.Root
              size='xsmall'
              variant='neutral'
              mode='stroke'
              className='ml-13 w-[calc(100%-52px)] cursor-pointer rounded-10! px-3 text-label-sm text-text-sub-600 lg:ml-0 lg:w-fit'
            >
              Manage
            </Button.Root>
          </div>
          <div className='mt-5 flex flex-col gap-3.5 border-t border-stroke-soft-200 px-5 pt-5 lg:px-0'>
            {overviewItems.map((item) => (
              <div key={item.id} className='flex items-center gap-3'>
                <span className='w-3/5 text-label-sm tracking-spacing-tiny-2 text-text-soft-400 lg:w-2/5'>
                  {item.label}
                </span>
                <span className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SettingsGroup
        title='Activity'
        description='Usage analytics and metrics.'
        contentClassName='flex-row flex-wrap gap-4'
      >
        {activityItems.map((item, i) => (
          <div
            key={item.id}
            className={cn('flex flex-col', (i === 0 || i === 2) && 'max-w-3/5 min-w-3/5 lg:max-w-2/5 lg:min-w-2/5')}
          >
            <span className='text-label-sm tracking-spacing-tiny-2 text-text-soft-400'>{item.label}</span>
            <span className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>
              {item.unit === '%' ? `${item.value}${item.unit}` : item.value.toLocaleString('en-US')}
            </span>
          </div>
        ))}
      </SettingsGroup>

      <SettingsGroup
        title='Plan usage'
        description='Usage limits and current consumption.'
        contentClassName='gap-3.5 overflow-hidden lg:gap-3.5'
      >
        {planUsageItems.map((item, index) => {
          const filled = Math.round((item.value / 100) * barCount);
          return (
            <div key={item.label} className='flex items-center gap-2 lg:gap-4'>
              <span className='flex w-2/5 shrink-0 text-label-sm tracking-spacing-tiny-2 text-text-soft-400 lg:max-w-2/5 lg:min-w-2/5'>
                {item.label}
              </span>
              <div className='flex min-w-0 flex-1 items-center gap-2 lg:gap-4'>
                <div ref={index === 0 ? containerRef : undefined} className='flex min-w-0 flex-1 gap-0.75'>
                  {Array.from({ length: barCount }, (_, i) => (
                    <div
                      key={i}
                      className={cn('h-3 w-1 shrink-0 rounded-[0.8px]', i < filled ? item.colorClass : 'bg-bg-weak-50')}
                    />
                  ))}
                </div>
                <span className='w-8 shrink-0 text-right text-label-xs text-text-soft-400 lg:min-w-10'>
                  {item.value}%
                </span>
              </div>
            </div>
          );
        })}
      </SettingsGroup>
    </SettingsBody>
  );
}
