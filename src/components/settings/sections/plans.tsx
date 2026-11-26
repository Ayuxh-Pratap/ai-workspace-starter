'use client';

import { RiCheckLine, RiCloseLine, RiMore2Line, RiSearchLine, RiVipCrownLine } from '@remixicon/react';
import * as React from 'react';

import { SettingsBody } from '@/components/settings/settings-primitives';
import * as Button from '@/components/ui/button';
import * as Input from '@/components/ui/input';
import * as Select from '@/components/ui/select';
import type { User } from '@/types';

const planItems = [
  { id: 'usedSeats', label: 'Used seats', value: '3/10 seats' },
  { id: 'planRenewal', label: 'Plan renewal', value: 'June 20, 2025' },
  { id: 'status', label: 'Status', value: 'Active' },
  { id: 'activeToday', label: 'Active today', value: '3 members' },
];

const invoices = [
  { id: '1', date: 'April 15, 2024', amount: '$49', status: 'Paid' },
  { id: '2', date: 'May 15, 2024', amount: '$49', status: 'Paid' },
  { id: '3', date: 'Jun 15, 2024', amount: '$49', status: 'Paid' },
  { id: '4', date: 'July 15, 2024', amount: '$49', status: 'Paid' },
  { id: '5', date: 'Aug 15, 2024', amount: '$49', status: 'Paid' },
];

const statusOptions = [
  { value: 'all', label: 'All status' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- every settings page takes the user
export function PlansSettings({ user }: { user: User }) {
  const [search, setSearch] = React.useState('');

  return (
    <SettingsBody>
      <div className='flex flex-col gap-5 pt-5 lg:flex-row lg:gap-4 lg:pt-7'>
        <div className='flex flex-col gap-1 px-5 lg:max-w-50 lg:min-w-50 lg:px-0 xl:max-w-75 xl:min-w-75'>
          <h3 className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>Current plan</h3>
          <p className='text-label-xs tracking-spacing-tiny-2 text-text-soft-400 lg:text-label-sm'>
            Plan details and usage overview.
          </p>
        </div>
        <div className='flex w-full flex-col'>
          <div className='flex flex-col items-start justify-between gap-3 px-5 lg:flex-row lg:items-center lg:gap-4 lg:px-0 xl:gap-6'>
            <div className='flex w-full items-center justify-start gap-3 lg:justify-between lg:gap-2 xl:gap-3'>
              <div className='flex items-center gap-3 lg:gap-2 xl:gap-3'>
                <div className='flex size-10 items-center justify-center rounded-full border border-stroke-soft-200 bg-bg-white-0 lg:size-8 xl:size-10'>
                  <RiVipCrownLine className='size-5 text-green-600' />
                </div>
                <div className='flex flex-col gap-1 lg:gap-0.5 xl:gap-1'>
                  <div className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>Professional Plan</div>
                  <div className='text-label-xs text-text-soft-400'>Team plan for up to 10 members</div>
                </div>
              </div>
              <div className='lg:flex-unset flex-1 text-end text-label-md -tracking-widest text-text-strong-950 lg:text-left lg:text-label-xs xl:text-label-md'>
                $49
                <span className='ml-1 text-label-sm tracking-spacing-tiny-2 text-text-soft-400 lg:text-label-2xs xl:text-label-sm'>
                  / month
                </span>
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
            {planItems.map((item) => (
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

      <div className='flex flex-col gap-4 border-t border-stroke-soft-200 pt-5 lg:flex-row lg:pt-7'>
        <div className='flex flex-col gap-1 px-5 lg:max-w-50 lg:min-w-50 lg:px-0 xl:max-w-75 xl:min-w-75'>
          <h3 className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>Billing history</h3>
          <p className='text-label-xs tracking-spacing-tiny-2 text-text-soft-400 lg:text-label-sm'>
            Invoice history and payments.
          </p>
        </div>
        <div className='flex w-full flex-col gap-5 px-5 lg:px-0'>
          <div className='flex items-center gap-3'>
            <Input.Root
              size='xsmall'
              className='shadow-raised-xs ring-1 ring-stroke-edge hover:bg-bg-weak-50 hover:ring-0 has-[input:focus]:ring-0'
            >
              <Input.Wrapper className='px-2.5'>
                <Input.Icon as={RiSearchLine} className='text-text-soft-400' />
                <Input.Input
                  type='text'
                  placeholder='Search invoices...'
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
                    <RiCloseLine className='size-5' />
                  </button>
                )}
              </Input.Wrapper>
            </Input.Root>
            <Select.Root size='xsmall'>
              <Select.Trigger className='w-auto text-paragraph-sm text-text-sub-600'>
                <Select.Value placeholder='All status' />
              </Select.Trigger>
              <Select.Content className='z-62'>
                {statusOptions.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>
          <div className='flex flex-col gap-5 border-t border-stroke-soft-200 pt-5'>
            {invoices.map((invoice) => (
              <div key={invoice.id} className='flex items-center justify-between gap-2.5'>
                <div className='w-[37%] text-label-sm tracking-spacing-tiny-2 text-text-soft-400'>{invoice.date}</div>
                <div className='w-[33%] text-label-sm tracking-spacing-tiny-2 text-text-sub-600'>{invoice.amount}</div>
                <div className='w-[19%]'>
                  <div className='flex items-center gap-2'>
                    <div className='size-3 rounded-full bg-green-600'>
                      <RiCheckLine className='size-3 text-white' />
                    </div>
                    <span className='text-label-sm tracking-spacing-tiny-2 text-text-sub-600'>{invoice.status}</span>
                  </div>
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
        </div>
      </div>
    </SettingsBody>
  );
}
