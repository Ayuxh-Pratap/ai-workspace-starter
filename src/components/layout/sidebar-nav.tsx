'use client';

import { RiArrowRightSLine, RiFolder2Line } from '@remixicon/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { mainNav } from '@/config/navigation';
import type { Project } from '@/types';
import { cn } from '@/utils/cn';

const rowBase =
  'group flex items-center justify-between rounded-lg p-1.5 pr-2 text-label-sm transition-colors duration-200 focus-visible:shadow-button-important-focus focus-visible:outline-none';

/** New chat, Projects, Library. */
export function SidebarMainNav() {
  const pathname = usePathname();
  return (
    <div className='px-5 pb-5 lg:px-3.5 lg:pb-4'>
      <ul className='space-y-1'>
        {mainNav.map((item) => {
          const active = !item.primary && pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  rowBase,
                  item.primary
                    ? 'text-primary-base hover:bg-primary-alpha-10'
                    : active
                      ? 'bg-bg-weak-50 text-text-sub-600'
                      : 'text-text-sub-600 hover:bg-bg-weak-50',
                )}
              >
                <span className='flex items-center gap-2'>
                  <Icon
                    className={cn(
                      'size-5',
                      item.primary
                        ? 'rounded-full bg-primary-alpha-10 text-primary-base'
                        : active
                          ? 'text-primary-base'
                          : 'text-text-soft-400',
                    )}
                  />
                  {item.label}
                </span>
                {!item.primary && (
                  <RiArrowRightSLine
                    className={cn(
                      'size-4.5 text-text-soft-400 transition-opacity group-hover:opacity-100',
                      active ? 'opacity-100' : 'lg:opacity-0',
                    )}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Pinned projects. */
export function SidebarPinned({ projects }: { projects: Project[] }) {
  const pathname = usePathname();
  if (!projects.length) return null;
  return (
    <section className='p-5 lg:mb-4 lg:p-0 lg:pt-4' aria-labelledby='sidebar-pinned'>
      <h3 id='sidebar-pinned' className='mb-1 px-1.5 text-label-xs text-text-soft-400'>
        Pinned
      </h3>
      <ul className='space-y-1'>
        {projects.map((p) => {
          const href = `/projects/${p.slug}`;
          const active = pathname === href;
          return (
            <li key={p.id}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  rowBase,
                  active ? 'bg-bg-weak-50 text-text-sub-600' : 'text-text-sub-600 hover:bg-bg-weak-50',
                )}
              >
                <span className='flex items-center gap-2'>
                  <RiFolder2Line className={cn('size-5', active ? 'text-primary-base' : 'text-text-soft-400')} />
                  {p.name}
                </span>
                <RiArrowRightSLine
                  className={cn(
                    'size-4.5 text-text-soft-400 transition-opacity group-hover:opacity-100',
                    active ? 'opacity-100' : 'lg:opacity-0',
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
