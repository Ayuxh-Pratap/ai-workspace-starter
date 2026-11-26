'use client';

import {
  RiArrowDownLine,
  RiFileCopyLine,
  RiThumbDownLine,
  RiThumbUpLine,
  type RemixiconComponentType,
} from '@remixicon/react';
import * as React from 'react';

import * as Button from '@/components/ui/button';
import type { Message } from '@/types';
import { cn } from '@/utils/cn';

import { Composer, FileChip, type ComposerMessage } from './composer';

const messageText =
  'px-1 text-paragraph-sm tracking-spacing-tiny-2 text-text-strong-950 lg:text-[15px] lg:leading-6 lg:tracking-spacing-tiny-3';

type Feedback = 'copy' | 'up' | 'down';

/**
 * A conversation: messages scrolled to the latest, a button back to the bottom, the composer underneath.
 * New messages are kept in local state and answered with a placeholder: replace `reply` with a call to your model.
 */
export function Conversation({ initialMessages, chatId }: { initialMessages: Message[]; chatId: string }) {
  const [messages, setMessages] = React.useState(initialMessages);
  const [feedback, setFeedback] = React.useState<Record<string, Feedback | 'copied' | undefined>>({});
  const [showScroll, setShowScroll] = React.useState(false);
  const scroller = React.useRef<HTMLDivElement>(null);

  const scrollToEnd = (behavior: ScrollBehavior) => {
    // block body: Chrome's scrollTo now returns a Promise, which must not become an effect's return value
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior });
  };

  React.useLayoutEffect(() => {
    scrollToEnd('instant');
  }, []);
  React.useEffect(() => {
    scrollToEnd('smooth');
  }, [messages.length]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    setShowScroll(el.scrollHeight > el.clientHeight && el.scrollHeight - el.scrollTop - el.clientHeight > 100);
  };

  const send = ({ text, attachments }: ComposerMessage) => {
    const now = new Date().toISOString();
    const file = attachments[0];
    const user: Message = {
      id: crypto.randomUUID(),
      chatId,
      role: 'user',
      content: text,
      attachment: file ? { name: file.name, type: file.type } : undefined,
      createdAt: now,
    };
    const reply: Message = {
      id: crypto.randomUUID(),
      chatId,
      role: 'assistant',
      content: 'This starter has no model connected yet. Wire one up in src/components/chat/conversation.tsx.',
      createdAt: now,
    };
    setMessages((m) => [...m, user, reply]);
  };

  const toggle = (id: string, kind: Feedback) => {
    if (kind === 'copy') {
      const text = messages.find((m) => m.id === id)?.content ?? '';
      void navigator.clipboard?.writeText(text);
      setFeedback((f) => ({ ...f, [`${id}:copy`]: 'copied' }));
      return;
    }
    setFeedback((f) => ({ ...f, [id]: f[id] === kind ? undefined : kind }));
  };

  return (
    <>
      <div
        ref={scroller}
        onScroll={onScroll}
        className='-mt-4 -mb-5 flex w-full flex-1 justify-center overflow-y-auto lg:-ml-5 lg:w-[calc(100%+2.25rem)]'
      >
        <ol className='flex w-full flex-col gap-3.5 px-5 pt-30 pb-24 lg:w-composer lg:px-0' aria-label='Messages'>
          {messages.map((m) =>
            m.role === 'assistant' ? (
              <li key={m.id} className='flex flex-col gap-2'>
                <p className={messageText}>{m.content}</p>
                <div className='flex items-center gap-1.5'>
                  <FeedbackButton
                    icon={RiFileCopyLine}
                    label='Copy'
                    active={feedback[`${m.id}:copy`] === 'copied'}
                    onClick={() => toggle(m.id, 'copy')}
                  />
                  <FeedbackButton
                    icon={RiThumbUpLine}
                    label='Good response'
                    active={feedback[m.id] === 'up'}
                    onClick={() => toggle(m.id, 'up')}
                  />
                  <FeedbackButton
                    icon={RiThumbDownLine}
                    label='Bad response'
                    active={feedback[m.id] === 'down'}
                    onClick={() => toggle(m.id, 'down')}
                  />
                </div>
              </li>
            ) : (
              <li key={m.id} className='flex flex-col items-end gap-1.5'>
                {m.attachment && <FileChip name={m.attachment.name} type={m.attachment.type} />}
                {m.content && (
                  <p className='max-w-md rounded-[14px] rounded-br-lg bg-bg-soft-200 px-3.5 py-2.5'>
                    <span className={cn(messageText, 'px-0')}>{m.content}</span>
                  </p>
                )}
              </li>
            ),
          )}
        </ol>
      </div>
      <div className='relative'>
        {showScroll && (
          <div className='absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2'>
            <Button.Root
              variant='neutral'
              mode='ghost'
              size='small'
              aria-label='Scroll to latest message'
              onClick={() => scrollToEnd('smooth')}
              className='size-8 rounded-full bg-bg-white-0 p-0 shadow-raised-md ring-1 ring-stroke-edge hover:bg-bg-weak-50'
            >
              <Button.Icon as={RiArrowDownLine} className='size-5 text-text-sub-600' />
            </Button.Root>
          </div>
        )}
        <Composer onSend={send} />
      </div>
    </>
  );
}

function FeedbackButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: RemixiconComponentType;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button.Root
      variant='neutral'
      mode='ghost'
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'group size-6 rounded-md p-0 transition-colors',
        active ? 'bg-bg-weak-50 ring-1 ring-stroke-edge' : 'bg-bg-white-0 hover:bg-bg-weak-50',
      )}
    >
      <Button.Icon
        as={icon}
        className={cn(
          'size-4.5 duration-200',
          active ? 'text-text-sub-600' : 'text-text-soft-400 group-hover:text-text-sub-600',
        )}
      />
    </Button.Root>
  );
}
