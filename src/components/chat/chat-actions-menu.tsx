'use client';

import { RiDeleteBinLine, RiPencilLine, RiPushpinLine, RiShareForwardBoxLine, RiShareLine } from '@remixicon/react';
import type { ComponentProps, ReactNode } from 'react';

import * as Dropdown from '@/components/ui/dropdown';

// Menus the reference opens from a chat: its title (Pin, Rename, Delete) and the "more" button (Share, Export).
// Actions are callbacks so a page can wire them to real mutations; by default they do nothing.

const contentClass = 'w-auto min-w-30 gap-0.5 rounded-xl p-1 shadow-raised-md';
const itemClass = 'gap-1.5 p-1.5 text-label-xs text-text-sub-600';
const iconClass = 'size-4 text-text-soft-400 group-data-[highlighted]/item:text-text-sub-600';

type ContentProps = Pick<ComponentProps<typeof Dropdown.Content>, 'side' | 'align' | 'sideOffset'>;

export type ChatActions = {
  onPin?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  onExport?: () => void;
};

export function ChatManageMenu({
  trigger,
  actions = {},
  ...content
}: { trigger: ReactNode; actions?: ChatActions } & ContentProps) {
  return (
    <Dropdown.Root modal={false}>
      <Dropdown.Trigger asChild>{trigger}</Dropdown.Trigger>
      <Dropdown.Content className={contentClass} sideOffset={10} align='start' {...content}>
        <Dropdown.Item className={itemClass} onSelect={actions.onPin}>
          <Dropdown.ItemIcon as={RiPushpinLine} className={iconClass} />
          Pinned
        </Dropdown.Item>
        <Dropdown.Item className={itemClass} onSelect={actions.onRename}>
          <Dropdown.ItemIcon as={RiPencilLine} className={iconClass} />
          Rename
        </Dropdown.Item>
        <Dropdown.Item className={itemClass} onSelect={actions.onDelete}>
          <Dropdown.ItemIcon as={RiDeleteBinLine} className='size-4 text-error-base' />
          Delete
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}

export function ChatShareMenu({
  trigger,
  actions = {},
  ...content
}: { trigger: ReactNode; actions?: ChatActions } & ContentProps) {
  return (
    <Dropdown.Root modal={false}>
      <Dropdown.Trigger asChild>{trigger}</Dropdown.Trigger>
      <Dropdown.Content className={contentClass} sideOffset={10} align='start' {...content}>
        <Dropdown.Item className={itemClass} onSelect={actions.onShare}>
          <Dropdown.ItemIcon as={RiShareLine} className={iconClass} />
          Share
        </Dropdown.Item>
        <Dropdown.Item className={itemClass} onSelect={actions.onExport}>
          <Dropdown.ItemIcon as={RiShareForwardBoxLine} className={iconClass} />
          Export
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
