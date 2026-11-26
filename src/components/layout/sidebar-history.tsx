'use client';

import { RiMore2Line } from '@remixicon/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChatManageMenu } from '@/components/chat/chat-actions-menu';
import * as Button from '@/components/ui/button';
import { chatGroupLabels } from '@/config/navigation';
import type { Chat, ChatGroup } from '@/types';
import { cn } from '@/utils/cn';

/** Chat history grouped by day; with a query, the matching chats from every group (the reference filters by title). */
export function SidebarHistory({ history, query }: { history: { group: ChatGroup; chats: Chat[] }[]; query?: string }) {
  const q = query?.trim().toLowerCase();
  const groups = q
    ? [
        {
          group: 'results' as const,
          chats: history.flatMap((g) => g.chats).filter((c) => c.title.toLowerCase().includes(q)),
        },
      ]
    : history;

  return (
    <section
      className='relative p-5 pt-4 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-stroke-soft-200 lg:mb-4 lg:p-0 lg:pt-4 lg:before:inset-x-1.5'
      aria-label={q ? 'Search results' : 'Chat history'}
    >
      {groups.map(({ group, chats }) => (
        <div key={group} className='mb-3 last:mb-0 lg:mb-4'>
          <h3 className='mb-1 px-1.5 text-label-xs text-text-soft-400 lg:mb-2'>
            {group === 'results' ? 'Results' : chatGroupLabels[group]}
          </h3>
          {chats.length ? (
            <ul className='space-y-1'>
              {chats.map((chat) => (
                <HistoryRow key={chat.id} chat={chat} />
              ))}
            </ul>
          ) : (
            <p className='px-1.5 text-paragraph-xs text-text-soft-400'>No chats match “{query}”.</p>
          )}
        </div>
      ))}
    </section>
  );
}

function HistoryRow({ chat }: { chat: Chat }) {
  const pathname = usePathname();
  const href = `/chat/${chat.id}`;
  const active = pathname === href;
  return (
    <li
      className={cn(
        'group flex items-center justify-between rounded-lg pr-1.5 transition-colors duration-200 hover:bg-bg-weak-50',
        active && 'bg-bg-weak-50',
      )}
    >
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className='flex-1 truncate rounded-lg p-1.5 text-label-sm text-text-sub-600 focus-visible:shadow-button-important-focus focus-visible:outline-none'
      >
        {chat.title}
      </Link>
      <ChatManageMenu
        trigger={
          <Button.Root
            variant='neutral'
            mode='ghost'
            size='xxsmall'
            aria-label={`More options for ${chat.title}`}
            className='size-4.5 p-0 opacity-100 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100 lg:opacity-0'
          >
            <Button.Icon as={RiMore2Line} className='size-full text-text-soft-400' />
          </Button.Root>
        }
      />
    </li>
  );
}
