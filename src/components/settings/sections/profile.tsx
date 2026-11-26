'use client';

import { RiGlobalFill, RiMailFill, RiTimeFill, RiUser6Fill } from '@remixicon/react';

import { SettingsBody, SettingsGroup } from '@/components/settings/settings-primitives';
import * as Button from '@/components/ui/button';
import type { User } from '@/types';

export function ProfileSettings({ user }: { user: User }) {
  const items = [
    { id: 'fullName', label: 'Full name', value: user.name, icon: RiUser6Fill },
    { id: 'email', label: 'Email address', value: user.email, icon: RiMailFill },
    { id: 'timeZone', label: 'Time zone', value: 'UTC-05:00 (Eastern Time)', icon: RiTimeFill },
    { id: 'language', label: 'Language', value: 'English', icon: RiGlobalFill },
  ];

  return (
    <SettingsBody>
      <SettingsGroup first title='Profile picture' description='Update your avatar image.' contentClassName='gap-4'>
        <div className='flex flex-row gap-4 lg:flex-col'>
          <div className='flex size-10 items-center justify-center rounded-full bg-bg-soft-200 text-label-md tracking-spacing-tiny-4 text-text-strong-950 lg:size-8 xl:size-10'>
            {user.initials}
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>Upload image</div>
            <div className='text-label-xs text-text-soft-400'>Min 400x400px, PNG or JPEG formats.</div>
          </div>
        </div>
        <Button.Root
          size='xsmall'
          variant='neutral'
          mode='stroke'
          className='ml-13 w-[calc(100%-52px)] cursor-pointer px-3 text-label-sm text-text-sub-600 lg:ml-0 lg:w-fit'
        >
          Upload
        </Button.Root>
      </SettingsGroup>

      <SettingsGroup
        title='Personal information'
        description='Edit your account details.'
        className='gap-4'
        contentClassName='gap-5 lg:gap-5'
      >
        <div className='flex items-center justify-between border-t border-stroke-soft-200 pt-5 lg:border-t-0 lg:pt-0'>
          <div className='flex flex-col gap-1'>
            <div className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>{user.name}</div>
            <div className='text-label-xs text-text-soft-400'>
              Member since <span className='text-text-strong-950'>May 16, 2025</span>
            </div>
          </div>
          <Button.Root
            size='xsmall'
            variant='neutral'
            mode='stroke'
            className='w-fit cursor-pointer rounded-10! px-3 text-label-sm text-text-sub-600'
          >
            Edit profile
          </Button.Root>
        </div>
        <div className='flex flex-col gap-5 border-t border-stroke-soft-200 pt-5'>
          {items.map((item) => {
            const Icon = item.icon;
            const [time, zone] = item.value.split(' (');
            return (
              <div key={item.id} className='flex items-center gap-3'>
                <div className='flex w-2/5 items-center gap-2'>
                  <Icon className='size-5 text-text-disabled-300' />
                  <span className='text-label-sm tracking-spacing-tiny-2 text-text-soft-400'>{item.label}</span>
                </div>
                <span className='text-label-sm tracking-spacing-tiny-2 text-text-sub-600'>
                  {item.id === 'timeZone' ? (
                    <>
                      {time} <span className='text-text-soft-400'>({zone}</span>
                    </>
                  ) : (
                    item.value
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </SettingsGroup>
    </SettingsBody>
  );
}
