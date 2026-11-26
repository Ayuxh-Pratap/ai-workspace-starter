'use client';

import { RiInformationFill } from '@remixicon/react';
import * as React from 'react';

import * as Button from '@/components/ui/button';
import * as Input from '@/components/ui/input';
import * as Modal from '@/components/ui/modal';

/** "Create a project": a name and a short explainer. Below lg it opens as a bottom sheet. */
export function CreateProjectModal({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (name: string) => void;
}) {
  const [name, setName] = React.useState('');
  const close = () => {
    setName('');
    onOpenChange(false);
  };

  return (
    <Modal.Root open={open} onOpenChange={(o) => (o ? onOpenChange(true) : close())}>
      <Modal.Content
        overlayClassName='items-end p-0 lg:items-center lg:p-4'
        className='max-w-none rounded-t-3xl rounded-b-none shadow-raised-md ring-1 ring-stroke-edge lg:max-w-137 lg:rounded-[28px] lg:p-5'
      >
        <div className='flex items-center justify-between p-5 pb-0 lg:p-0'>
          <Modal.Title className='text-label-sm tracking-spacing-tiny-4 text-text-strong-950 lg:text-label-md'>
            Create a project
          </Modal.Title>
        </div>
        <Modal.Description className='mt-1 px-5 text-label-xs tracking-spacing-tiny-2 text-text-soft-400 lg:mb-5 lg:px-0 lg:text-label-sm'>
          Attach relevant files to help your agent give better answers.
        </Modal.Description>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) return;
            onCreate(name.trim());
            close();
          }}
        >
          <div className='mt-5 mb-3 border-t border-stroke-soft-200 px-5 pt-5 lg:mt-0 lg:mb-5 lg:border-t-0 lg:px-0 lg:pt-0'>
            <Input.Root
              size='medium'
              className='h-12 rounded-[14px] shadow-raised-xs ring-1 ring-stroke-edge hover:ring-0 has-[input:focus]:ring-0'
            >
              <Input.Wrapper>
                <Input.Input
                  autoFocus
                  aria-label='Project name'
                  placeholder='e.g. Birthday Party Planning'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Input.Wrapper>
            </Input.Root>
          </div>
          <div className='mx-5 mb-5 flex items-start gap-3.5 rounded-[14px] bg-bg-weak-50 p-3.5 lg:mx-0'>
            <RiInformationFill className='size-5 shrink-0 text-text-soft-400' aria-hidden='true' />
            <div className='flex flex-col gap-1.5'>
              <h3 className='text-label-sm tracking-spacing-tiny-2 text-text-sub-600'>What&apos;s a project?</h3>
              <p className='text-label-sm tracking-spacing-tiny-2 text-text-soft-400'>
                Projects keep chats, files, and custom instructions in one place. Use them for ongoing work, or just to
                keep things tidy.
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3 border-t border-stroke-soft-200 p-5 lg:justify-end lg:border-t-0 lg:p-0'>
            <Button.Root
              type='button'
              variant='neutral'
              mode='stroke'
              size='small'
              onClick={close}
              className='w-full rounded-xl lg:w-fit lg:rounded-10'
            >
              Cancel
            </Button.Root>
            <Button.Root
              type='submit'
              variant='primary'
              mode='filled'
              size='small'
              disabled={!name.trim()}
              className='w-full rounded-xl lg:w-fit lg:rounded-10'
            >
              Create project
            </Button.Root>
          </div>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
