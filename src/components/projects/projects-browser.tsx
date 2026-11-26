'use client';

import {
  RiAddFill,
  RiCloseFill,
  RiFolder2Fill,
  RiFolder2Line,
  RiMenu3Fill,
  RiMore2Line,
  RiSearchLine,
} from '@remixicon/react';
import Link from 'next/link';
import * as React from 'react';

import { ChatManageMenu } from '@/components/chat/chat-actions-menu';
import { RelativeTime } from '@/components/relative-time';
import { useSidebar } from '@/components/providers/sidebar-provider';
import * as Button from '@/components/ui/button';
import * as Input from '@/components/ui/input';
import * as Select from '@/components/ui/select';
import type { Project } from '@/types';
import { cn } from '@/utils/cn';

import { CreateProjectModal } from './create-project-modal';

const sorts = {
  recent: { label: 'Recent activity', fn: (a: Project, b: Project) => b.updatedAt.localeCompare(a.updatedAt) },
  oldest: { label: 'Oldest activity', fn: (a: Project, b: Project) => a.updatedAt.localeCompare(b.updatedAt) },
  az: { label: 'A-Z', fn: (a: Project, b: Project) => a.name.localeCompare(b.name) },
  za: { label: 'Z-A', fn: (a: Project, b: Project) => b.name.localeCompare(a.name) },
} as const;
type SortKey = keyof typeof sorts;

const createButton = 'gap-1.5 rounded-10! bg-bg-surface-800 pr-3 pl-2 text-label-sm hover:bg-stroke-strong-950';

/** /projects: search, sort, cards; "Create project" adds a project locally (wire it to your API). */
export function ProjectsBrowser({ initialProjects }: { initialProjects: Project[] }) {
  const { setMobileOpen } = useSidebar();
  const [projects, setProjects] = React.useState(initialProjects);
  const [query, setQuery] = React.useState('');
  const [sort, setSort] = React.useState<SortKey>('recent');
  const [creating, setCreating] = React.useState(false);

  const q = query.trim().toLowerCase();
  const shown = projects
    .filter((p) => !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    .sort(sorts[sort].fn);

  const create = (name: string) =>
    setProjects((list) => [
      {
        id: `p_${crypto.randomUUID()}`,
        slug: name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
        name,
        description: 'New project',
        visibility: 'private',
        pinned: false,
        updatedAt: new Date().toISOString(),
      },
      ...list,
    ]);

  return (
    <div className='flex h-full flex-col lg:p-1.5 lg:pl-0'>
      <div className='flex items-center justify-between border-b border-stroke-soft-200 px-5 py-4 pl-4 lg:hidden'>
        <Button.Root
          variant='neutral'
          mode='ghost'
          aria-label='Open sidebar'
          onClick={() => setMobileOpen(true)}
          className='size-8 rounded-lg p-0'
        >
          <Button.Icon as={RiMenu3Fill} className='size-5 text-text-soft-400' />
        </Button.Root>
        <Button.Root
          variant='neutral'
          mode='filled'
          size='xsmall'
          onClick={() => setCreating(true)}
          className={createButton}
        >
          <Button.Icon as={RiAddFill} className='size-5' />
          Create project
        </Button.Root>
      </div>

      <div className='flex h-full [scrollbar-width:none] flex-col overflow-auto bg-bg-white-0 px-5 py-7 lg:rounded-3xl lg:border lg:border-stroke-soft-200 lg:p-18'>
        <div className='mx-auto w-full lg:w-composer'>
          <div className='mb-7 flex flex-col items-center gap-5 lg:mb-5 lg:items-start'>
            <span className='flex size-12 items-center justify-center rounded-full border border-faded-lighter'>
              <RiFolder2Fill className='size-7 text-primary-base/56' aria-hidden='true' />
            </span>
            <div className='flex w-full items-center justify-center lg:justify-between'>
              <div className='flex flex-col items-center gap-1.5 lg:items-start'>
                <h1 className='text-label-lg tracking-spacing-tiny-1 text-text-strong-950'>Projects</h1>
                <p className='text-center text-label-sm tracking-spacing-tiny-2 text-text-soft-400 lg:text-left'>
                  Easily manage and explore all your active projects in one place
                </p>
              </div>
              <Button.Root
                variant='neutral'
                mode='filled'
                size='xsmall'
                onClick={() => setCreating(true)}
                className={cn(createButton, 'hidden lg:flex')}
              >
                <Button.Icon as={RiAddFill} className='size-5' />
                Create project
              </Button.Root>
            </div>
          </div>

          <div className='mb-6 lg:mb-7'>
            <Input.Root
              size='medium'
              className='shadow-raised-xs ring-1 ring-stroke-edge hover:bg-bg-weak-50 hover:ring-0 has-[input:focus]:ring-0'
            >
              <Input.Wrapper className='px-2.5'>
                <Input.Icon as={RiSearchLine} className='text-text-soft-400' />
                <Input.Input
                  type='search'
                  aria-label='Search projects'
                  placeholder='Search projects...'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    type='button'
                    aria-label='Clear search'
                    onClick={() => setQuery('')}
                    className='text-text-soft-400 hover:text-text-sub-600'
                  >
                    <RiCloseFill className='size-4' />
                  </button>
                )}
              </Input.Wrapper>
            </Input.Root>
          </div>

          <div className='mb-4 flex items-center justify-between text-label-sm tracking-spacing-tiny-2 text-text-soft-400'>
            <span aria-live='polite'>
              {q ? `Search results (${shown.length})` : `All projects (${projects.length})`}
            </span>
            <span className='flex items-center gap-1.5'>
              Sort by
              <Select.Root size='xsmall' variant='inline' value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <Select.Trigger
                  aria-label='Sort projects'
                  className='h-5 min-h-0 w-auto p-0 text-label-sm text-text-sub-600 shadow-none! hover:bg-transparent'
                >
                  <Select.Value />
                </Select.Trigger>
                <Select.Content>
                  {Object.entries(sorts).map(([value, { label }]) => (
                    <Select.Item key={value} value={value}>
                      {label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </span>
          </div>

          <ul className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {shown.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </ul>
        </div>
      </div>

      <CreateProjectModal open={creating} onOpenChange={setCreating} onCreate={create} />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <li className='group relative flex flex-col rounded-20 bg-bg-white-0 shadow-raised-xs ring-1 ring-stroke-edge transition-all duration-200 hover:bg-bg-weak-50 hover:shadow-none hover:ring-0 has-[[data-state=open]]:bg-bg-weak-50 has-[[data-state=open]]:shadow-none has-[[data-state=open]]:ring-0'>
      <Link
        href={`/projects/${project.slug}`}
        className='flex flex-col gap-5 rounded-20 p-5 focus-visible:shadow-button-important-focus focus-visible:outline-none lg:gap-6 lg:p-6'
      >
        <span className='flex items-center'>
          <RiFolder2Line
            className='size-6 text-text-soft-400 group-hover:hidden group-has-[[data-state=open]]:hidden'
            aria-hidden='true'
          />
          <RiFolder2Fill
            className='hidden size-6 text-primary-base group-hover:block group-has-[[data-state=open]]:block'
            aria-hidden='true'
          />
        </span>
        <span className='flex flex-col gap-1'>
          <span className='text-label-sm tracking-spacing-tiny-4 text-text-strong-950 lg:text-label-md'>
            {project.name}
          </span>
          <span className='text-label-sm tracking-spacing-tiny-2 text-text-soft-400'>{project.description}</span>
        </span>
        <span className='text-label-xs text-text-soft-400'>
          Updated <RelativeTime iso={project.updatedAt} />
        </span>
      </Link>
      <div className='absolute top-5 right-5'>
        <ChatManageMenu
          trigger={
            <Button.Root
              variant='neutral'
              mode='ghost'
              aria-label={`Options for ${project.name}`}
              className='group/more size-7 rounded-md p-0 transition-all duration-200 group-hover:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100 lg:opacity-0'
            >
              <Button.Icon as={RiMore2Line} className='size-5 text-text-soft-400 group-hover/more:text-text-sub-600' />
            </Button.Root>
          }
        />
      </div>
    </li>
  );
}
