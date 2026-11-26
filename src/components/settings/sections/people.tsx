'use client';

import { RiCloseLine, RiMore2Line, RiSearchLine } from '@remixicon/react';
import * as React from 'react';

import { WorkspaceLogo } from '@/components/settings/sections/brand-logos';
import { SettingsBody, SettingsGroup } from '@/components/settings/settings-primitives';
import * as Avatar from '@/components/ui/avatar';
import * as Button from '@/components/ui/button';
import * as Input from '@/components/ui/input';
import * as Select from '@/components/ui/select';
import type { User } from '@/types';
import { cn } from '@/utils/cn';

const teamItems = [
  { id: 'usedSeats', label: 'Used seats', value: '3/10 seats' },
  { id: 'admins', label: 'Admins', value: '2 members' },
  { id: 'pendingInvites', label: 'Pending invites', value: '1 invite' },
  { id: 'activeToday', label: 'Active today', value: '3 members' },
];

type AvatarColor = 'gray' | 'yellow' | 'blue' | 'sky' | 'purple' | 'red';

export function PeopleSettings({ user }: { user: User }) {
  const [search, setSearch] = React.useState('');

  const filterOptions: { value: string; color: AvatarColor; name: string; handle: string }[] = [
    { value: 'priya-shah', color: 'yellow', name: 'Priya Shah', handle: '@priya' },
    { value: 'daniel-kim', color: 'blue', name: 'Daniel Kim', handle: '@daniel' },
    { value: 'alex-morgan', color: 'gray', name: user.name, handle: `@${user.email.split('@')[0]}` },
    { value: 'maria-lopez', color: 'sky', name: 'Maria Lopez', handle: '@maria' },
    { value: 'tom-becker', color: 'purple', name: 'Tom Becker', handle: '@tom' },
    { value: 'nina-ross', color: 'red', name: 'Nina Ross', handle: '@nina' },
  ];

  const members = [
    {
      id: '1',
      name: 'Priya Shah',
      email: 'priya@example.com',
      initials: 'P',
      role: 'Admin',
      avatarClass: 'bg-yellow-200 text-yellow-950',
    },
    {
      id: '2',
      name: user.name,
      email: user.email,
      initials: user.name.charAt(0),
      role: 'Admin',
      avatarClass: 'bg-bg-soft-200 text-text-strong-950',
    },
    {
      id: '3',
      name: 'Daniel Kim',
      email: 'daniel@example.com',
      initials: 'D',
      role: 'Member',
      avatarClass: 'bg-blue-200 text-blue-950',
    },
    {
      id: '4',
      name: 'Maria Lopez',
      email: 'maria@example.com',
      initials: 'M',
      role: 'Member',
      avatarClass: 'bg-sky-200 text-sky-950',
    },
  ];

  return (
    <SettingsBody>
      <div className='flex flex-col gap-5 pt-5 lg:flex-row lg:gap-4 lg:pt-7'>
        <div className='flex flex-col gap-1 px-5 lg:max-w-50 lg:min-w-50 lg:px-0 xl:max-w-75 xl:min-w-75'>
          <h3 className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>Team overview</h3>
          <p className='text-label-xs tracking-spacing-tiny-2 text-text-soft-400 lg:text-label-sm'>
            Workspace statistics &amp; details.
          </p>
        </div>
        <div className='flex w-full flex-col'>
          <div className='flex flex-col justify-between px-5 lg:flex-row lg:items-center lg:px-0'>
            <div className='mb-3 flex items-center gap-3 lg:mb-0'>
              <div className='flex size-10 items-center justify-center rounded-full border border-stroke-soft-200 bg-bg-white-0 font-medium lg:size-8 xl:size-10'>
                <WorkspaceLogo className='size-5 text-green-600' />
              </div>
              <div className='flex flex-col gap-1'>
                <div className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>Acme Inc.</div>
                <div className='text-label-xs text-text-soft-400'>
                  Team created date <span className='text-text-sub-600'>May 18, 2025</span>
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
            {teamItems.map((item) => (
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

      <SettingsGroup title='Members' description='User roles and permissions.' className='gap-4'>
        <div className='flex items-center gap-3'>
          <Input.Root
            size='xsmall'
            className='shadow-raised-xs ring-1 ring-stroke-edge hover:bg-bg-weak-50 hover:ring-0 has-[input:focus]:ring-0'
          >
            <Input.Wrapper className='px-2.5'>
              <Input.Icon as={RiSearchLine} className='text-text-soft-400' />
              <Input.Input
                type='text'
                placeholder='Search team members...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='placeholder:text-text-soft-400 group-hover:hover:placeholder:text-text-sub-600'
              />
              {search && (
                <button
                  type='button'
                  onClick={() => setSearch('')}
                  className='flex items-center justify-center text-text-soft-400 transition-colors duration-200 hover:text-text-sub-600'
                >
                  <RiCloseLine className='size-4' />
                </button>
              )}
            </Input.Wrapper>
          </Input.Root>
          <Select.Root size='xsmall'>
            <Select.Trigger className='w-auto text-paragraph-sm text-text-sub-600'>
              <Select.Value placeholder='All roles' />
            </Select.Trigger>
            <Select.Content>
              {filterOptions.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  <Select.ItemIcon as={Avatar.Root} size='20' color={option.color} />
                  <div className='flex items-center gap-1 text-xs'>
                    {option.name}
                    <span className='text-xs text-text-soft-400 group-has-[&]/trigger:hidden'>{option.handle}</span>
                  </div>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
        <div className='flex flex-col gap-5 border-t border-stroke-soft-200 pt-5'>
          {members.map((member) => (
            <div
              key={member.id}
              className='flex items-center justify-between gap-2.5 overflow-x-auto lg:overflow-x-hidden'
              style={{ scrollbarWidth: 'none' }}
            >
              <div className='lg:min-w-unset flex min-w-[60%] items-center gap-2 lg:w-[37%]'>
                <div
                  className={cn(
                    'flex size-5 items-center justify-center rounded-full text-label-xs',
                    member.avatarClass,
                  )}
                >
                  {member.initials}
                </div>
                <div className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>{member.name}</div>
              </div>
              <div className='lg:min-w-unset min-w-[50%] text-label-sm text-text-soft-400 lg:w-[33%]'>
                {member.email}
              </div>
              <div className='lg:min-w-unset min-w-[20%] lg:w-[19%]'>
                <span
                  className={cn(
                    'w-fit rounded-md px-1.5 py-0.5 text-label-xs',
                    member.role === 'Admin' ? 'bg-green-alpha-10 text-green-600' : 'bg-faded-lighter text-faded-base',
                  )}
                >
                  {member.role}
                </span>
              </div>
              <Button.Root
                size='xsmall'
                variant='neutral'
                mode='ghost'
                className='size-5 cursor-pointer rounded-sm p-0 transition-colors hover:bg-bg-weak-50'
              >
                <RiMore2Line className='size-5 text-text-soft-400' />
              </Button.Root>
            </div>
          ))}
        </div>
      </SettingsGroup>
    </SettingsBody>
  );
}
