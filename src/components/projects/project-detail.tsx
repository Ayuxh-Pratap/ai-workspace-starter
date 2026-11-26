'use client';

import {
  RiAddFill,
  RiArrowLeftLongLine,
  RiChatAiFill,
  RiFileExcelFill,
  RiFilePdf2Fill,
  RiFileWordFill,
  RiFolderOpenFill,
  RiLockFill,
  RiMore2Line,
  RiPencilLine,
  RiStarFill,
  RiStarLine,
} from '@remixicon/react';
import Link from 'next/link';
import * as React from 'react';

import { ChatManageMenu, ChatShareMenu } from '@/components/chat/chat-actions-menu';
import { Composer } from '@/components/chat/composer';
import * as Button from '@/components/ui/button';
import * as Modal from '@/components/ui/modal';
import * as Textarea from '@/components/ui/textarea';
import type { Chat, Project } from '@/types';
import { cn } from '@/utils/cn';
import { formatTime } from '@/utils/format';

const sampleFiles = [
  { id: 'xlsx', name: 'Excel', icon: RiFileExcelFill, color: 'text-success-base' },
  { id: 'docx', name: 'Word', icon: RiFileWordFill, color: 'text-information-base' },
  { id: 'pdf', name: 'PDF', icon: RiFilePdf2Fill, color: 'text-error-base' },
];

const tile = 'flex size-7 shrink-0 items-center justify-center rounded-[9px] border border-faded-lighter bg-bg-white-0';

export function ProjectDetail({ project, chats, empty }: { project: Project; chats: Chat[]; empty: boolean }) {
  const [starred, setStarred] = React.useState(false);
  const [instructions, setInstructions] = React.useState(
    empty
      ? ''
      : 'Respond in a friendly, professional, and concise tone. When appropriate, include real-world examples to improve clarity.',
  );
  const [editing, setEditing] = React.useState(false);
  const files = empty ? [] : sampleFiles;
  const list = empty ? [] : chats;

  return (
    <div className='flex h-full flex-col lg:p-1.5 lg:pl-0'>
      <div className='flex h-full w-full [scrollbar-width:none] flex-col overflow-auto bg-bg-white-0 px-5 py-7 lg:rounded-3xl lg:border lg:border-stroke-soft-200 lg:p-5'>
        <div className='fixed top-0 left-0 z-30 flex w-full items-center justify-between border-b border-stroke-soft-200 bg-bg-white-0 p-5 lg:relative lg:mb-8 lg:border-b-0 lg:p-0'>
          <Link
            href='/projects'
            className='group flex items-center gap-2 rounded-md text-label-sm tracking-spacing-tiny-2 text-text-sub-600'
          >
            <RiArrowLeftLongLine
              className='size-5 rounded-md text-text-soft-400 group-hover:bg-bg-weak-50 group-hover:text-text-sub-600'
              aria-hidden='true'
            />
            All projects
          </Link>
          <ProjectActions className='lg:hidden' starred={starred} onStar={() => setStarred((s) => !s)} />
        </div>

        <div className='mx-auto w-full pt-16 lg:w-composer lg:pt-0'>
          <div className='flex flex-col items-center lg:items-start'>
            <span className='mb-5 flex size-12 items-center justify-center rounded-full border border-faded-lighter'>
              <RiFolderOpenFill className='size-7 text-primary-base/56' aria-hidden='true' />
            </span>
            <div className='mb-5 flex w-full items-start justify-center gap-2 lg:mb-4 lg:justify-between'>
              <div className='flex items-center gap-2'>
                <h1 className='text-label-lg tracking-spacing-tiny-1 text-text-strong-950'>{project.name}</h1>
                {project.visibility === 'private' && (
                  <span className='flex items-center gap-1 rounded-[7px] bg-faded-lighter px-1.5 py-1 text-label-xs text-faded-base'>
                    <RiLockFill className='size-3.5' aria-hidden='true' />
                    Private
                  </span>
                )}
              </div>
              <ProjectActions className='hidden lg:flex' starred={starred} onStar={() => setStarred((s) => !s)} />
            </div>
          </div>

          <div className='mb-8 -ml-2 w-[calc(100%+1rem)] lg:ml-0 lg:w-full'>
            <Composer showDisclaimer={false} showUpgrade={false} placeholder={`New chat in ${project.name}`} />
          </div>

          <div className='-mt-30 mb-6 grid grid-cols-1 rounded-20 border border-faded-lighter px-5 pt-21 pb-4 lg:-mt-23 lg:mb-7 lg:grid-cols-2 lg:px-6 lg:pt-14'>
            <div className='flex w-full items-center gap-2 border-b border-faded-lighter pb-3 lg:border-r lg:border-b-0 lg:pr-6 lg:pb-0'>
              <div className='flex flex-1 flex-col gap-1'>
                <h2 className='text-label-xs text-text-strong-950'>Project files</h2>
                <p className='text-label-xs text-text-soft-400'>
                  {files.length ? `${files.length} files` : 'No files added yet'}
                </p>
              </div>
              <ul className='flex items-center gap-2'>
                {files.map(({ id, name, icon: Icon, color }) => (
                  <li key={id} className={tile} title={name}>
                    <Icon className={cn('size-5 opacity-56', color)} aria-label={name} />
                  </li>
                ))}
              </ul>
              <Button.Root
                variant='neutral'
                mode='ghost'
                size='small'
                aria-label='Add files'
                className={cn(tile, 'p-0 hover:bg-bg-soft-200')}
              >
                <Button.Icon as={RiAddFill} className='size-4 text-text-soft-400 group-hover:text-text-sub-600' />
              </Button.Root>
            </div>
            <div className='flex w-full items-center gap-2 pt-3 lg:pt-0 lg:pl-6'>
              <div className='flex min-w-0 flex-col gap-1'>
                <h2 className='text-label-xs text-text-strong-950'>Instructions</h2>
                <p className={cn('text-label-xs text-text-soft-400', instructions && 'line-clamp-1')}>
                  {instructions || 'Set project behavior guidelines'}
                </p>
              </div>
              <Button.Root
                variant='neutral'
                mode='ghost'
                size='small'
                aria-label={instructions ? 'Edit instructions' : 'Add instructions'}
                onClick={() => setEditing(true)}
                className={cn(tile, 'ml-auto p-0')}
              >
                <Button.Icon
                  as={instructions ? RiPencilLine : RiAddFill}
                  className='size-4 text-text-soft-400 group-hover:text-text-sub-600'
                />
              </Button.Root>
            </div>
          </div>

          <section aria-labelledby='project-chats'>
            <h2 id='project-chats' className='mb-2.5 text-label-xs text-text-soft-400 lg:mb-3'>
              Chats in this project
            </h2>
            {list.length === 0 ? (
              <div className='flex w-full flex-col items-center justify-center gap-4 rounded-20 border border-faded-lighter bg-bg-white-0 p-7'>
                <RiChatAiFill className='size-7 text-text-disabled-300' aria-hidden='true' />
                <p className='max-w-80 text-center text-paragraph-sm tracking-spacing-tiny-2 text-text-soft-400'>
                  Start a chat to keep conversations organized and re-use project knowledge.
                </p>
              </div>
            ) : (
              <ul className='flex flex-col gap-2 lg:gap-2.5'>
                {list.map((chat) => (
                  <ProjectChatRow key={chat.id} chat={chat} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
      <InstructionsModal open={editing} onOpenChange={setEditing} value={instructions} onSave={setInstructions} />
    </div>
  );
}

function ProjectActions({ starred, onStar, className }: { starred: boolean; onStar: () => void; className?: string }) {
  return (
    <div className={cn('items-center gap-2', className)}>
      <Button.Root
        size='small'
        variant='neutral'
        mode='ghost'
        aria-label={starred ? 'Unstar project' : 'Star project'}
        aria-pressed={starred}
        onClick={onStar}
        className={cn('group size-6 rounded-md p-0', starred && 'bg-bg-weak-50 ring-1 ring-stroke-edge')}
      >
        <Button.Icon
          as={starred ? RiStarFill : RiStarLine}
          className={cn(
            'size-4.5 transition-colors duration-200',
            starred ? 'text-text-sub-600' : 'text-text-soft-400 group-hover:text-text-sub-600',
          )}
        />
      </Button.Root>
      <ChatShareMenu
        align='end'
        trigger={
          <Button.Root
            size='small'
            variant='neutral'
            mode='ghost'
            aria-label='Project options'
            className='group size-6 rounded-md p-0 data-[state=open]:bg-bg-weak-50 data-[state=open]:ring-1 data-[state=open]:ring-stroke-edge'
          >
            <Button.Icon as={RiMore2Line} className='size-4.5 text-text-soft-400 group-hover:text-text-sub-600' />
          </Button.Root>
        }
      />
    </div>
  );
}

function ProjectChatRow({ chat }: { chat: Chat }) {
  return (
    <li className='group relative flex gap-3.5 rounded-[14px] border border-faded-lighter bg-bg-white-0 transition-all duration-200 lg:h-11 lg:items-center lg:hover:bg-bg-weak-50'>
      <Link
        href={`/chat/${chat.id}`}
        className='flex flex-1 gap-3.5 rounded-[14px] p-4 focus-visible:shadow-button-important-focus focus-visible:outline-none lg:items-center lg:gap-2.5 lg:px-3 lg:py-0'
      >
        <RiChatAiFill
          className='size-5 shrink-0 text-text-disabled-300 transition-colors duration-200 lg:group-hover:text-primary-base'
          aria-hidden='true'
        />
        <span className='flex w-[80%] flex-col gap-3.5 lg:w-full lg:flex-row lg:items-center'>
          <span className='flex flex-1 flex-col gap-1.5 lg:flex-row lg:items-center lg:gap-2.5'>
            <span className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>{chat.title}</span>
            {chat.summary && (
              <span className='flex items-center text-paragraph-xs tracking-spacing-tiny-2 text-text-soft-400 lg:text-paragraph-sm'>
                <span className='mr-2.5 hidden text-text-disabled-300 lg:inline' aria-hidden='true'>
                  —
                </span>
                {chat.summary}
              </span>
            )}
          </span>
          <span className='text-label-xs text-text-soft-400 lg:border-l lg:border-bg-soft-200 lg:pl-3.5 lg:group-hover:hidden lg:group-has-[[data-state=open]]:hidden'>
            {formatTime(chat.updatedAt)}
          </span>
        </span>
      </Link>
      <div className='absolute top-4 right-4 lg:top-3 lg:right-3.5'>
        <ChatManageMenu
          align='end'
          trigger={
            <Button.Root
              size='small'
              variant='neutral'
              mode='ghost'
              aria-label={`Options for ${chat.title}`}
              className='size-5 rounded-md p-0 transition-opacity duration-200 focus-visible:opacity-100 data-[state=open]:opacity-100 lg:opacity-0 lg:group-hover:opacity-100'
            >
              <Button.Icon as={RiMore2Line} className='size-5 text-text-sub-600' />
            </Button.Root>
          }
        />
      </div>
    </li>
  );
}

function InstructionsModal({
  open,
  onOpenChange,
  value,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onSave: (v: string) => void;
}) {
  const [draft, setDraft] = React.useState(value);
  return (
    <Modal.Root
      open={open}
      onOpenChange={(o) => {
        if (o) setDraft(value);
        onOpenChange(o);
      }}
    >
      <Modal.Content
        overlayClassName='justify-end p-0 lg:justify-center lg:p-4'
        className='flex max-w-none flex-col gap-5 rounded-t-3xl rounded-b-none p-5 shadow-raised-md ring-1 ring-stroke-edge lg:max-w-175 lg:rounded-[28px] lg:px-6'
      >
        <div className='flex flex-col gap-1 pr-8'>
          <Modal.Title className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950 lg:text-label-md'>
            Set project instructions
          </Modal.Title>
          <Modal.Description className='text-label-xs tracking-spacing-tiny-2 text-text-soft-400 lg:text-label-sm'>
            Set clear behavioral guidelines that help your AI agent respond more effectively.
          </Modal.Description>
        </div>
        <div className='flex flex-col rounded-[20px] bg-bg-weak-50 p-px'>
          <p className='p-3.5 text-label-xs text-text-sub-600'>These instructions shape tone and context.</p>
          <Textarea.Root
            simple
            aria-label='Project instructions'
            placeholder='e.g. Use a friendly tone and bullet points when listing features.'
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className='min-h-60 resize-none rounded-[19px] bg-bg-white-0 p-4 text-paragraph-sm shadow-raised-xs ring-1 ring-stroke-edge focus:shadow-gray-shadow-2 focus:ring-0'
          />
        </div>
        <div className='flex items-center gap-3 lg:justify-end'>
          <Modal.Close asChild>
            <Button.Root
              variant='neutral'
              mode='stroke'
              size='small'
              className='w-full rounded-xl lg:w-fit lg:rounded-10'
            >
              Cancel
            </Button.Root>
          </Modal.Close>
          <Button.Root
            variant='primary'
            mode='filled'
            size='small'
            className='w-full rounded-xl lg:w-fit lg:rounded-10'
            onClick={() => {
              onSave(draft.trim());
              onOpenChange(false);
            }}
          >
            Save instructions
          </Button.Root>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
