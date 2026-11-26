'use client';

import {
  RiAddFill,
  RiArrowDownSLine,
  RiArrowUpLine,
  RiAttachment2,
  RiBook2Line,
  RiBrainLine,
  RiCheckLine,
  RiCloseFill,
  RiFileSearchLine,
  RiFlashlightFill,
  RiImageCircleAiLine,
} from '@remixicon/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { useModel } from '@/components/providers/model-provider';
import { SettingsLink } from '@/components/settings/settings-link';
import * as Button from '@/components/ui/button';
import * as Dropdown from '@/components/ui/dropdown';
import { cn } from '@/utils/cn';

export type Attachment = { id: string; name: string; type: string; previewUrl?: string };
export type ComposerMessage = { text: string; attachments: Attachment[]; modelId: string };

const ACCEPT = 'image/*,application/pdf,.doc,.docx,.txt,.csv,.xlsx';

const toolItems = [
  { id: 'image', label: 'Generate image', icon: RiImageCircleAiLine },
  { id: 'upload', label: 'Upload image or file', icon: RiAttachment2 },
  { id: 'research', label: 'Deep research', icon: RiFileSearchLine },
  { id: 'agent', label: 'Agent mode', icon: RiBrainLine },
  { id: 'study', label: 'Study and learn', icon: RiBook2Line },
] as const;

const menuContent = 'w-auto min-w-55 gap-1 rounded-2xl p-1.5 shadow-raised-md';
const menuItem = 'gap-1.5 p-1.5 text-label-xs text-text-sub-600';
const menuIcon = 'size-4 text-text-soft-400 group-data-[highlighted]/item:text-text-sub-600';

/**
 * The message composer. Enter sends, Shift+Enter breaks the line; files come from the + menu, drag and drop or paste.
 * `onSend` receives the message; without it the composer opens a chat (the reference sends you to /chat/1).
 */
export function Composer({
  onSend,
  placeholder = 'How can I help you today?',
  showUpgrade = true,
  showDisclaimer = true,
  className,
}: {
  onSend?: (message: ComposerMessage) => void;
  placeholder?: string;
  showUpgrade?: boolean;
  showDisclaimer?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const { model } = useModel();
  const [text, setText] = React.useState('');
  const [attachments, setAttachments] = React.useState<Attachment[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const canSend = text.trim().length > 0 || attachments.length > 0;

  const addFiles = (files: Iterable<File>) => {
    const next = Array.from(files).map<Attachment>((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      type: (f.name.split('.').pop() || 'file').toUpperCase(),
      previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
    }));
    if (next.length) setAttachments((a) => [...a, ...next]);
  };
  const removeAttachment = (id: string) =>
    setAttachments((list) => {
      const gone = list.find((a) => a.id === id);
      if (gone?.previewUrl) URL.revokeObjectURL(gone.previewUrl);
      return list.filter((a) => a.id !== id);
    });

  const send = () => {
    if (!canSend) return;
    const message = { text: text.trim(), attachments, modelId: model.id };
    setText('');
    setAttachments([]);
    if (onSend) onSend(message);
    else router.push('/chat/1');
  };

  return (
    <div className={cn('z-20 flex flex-col items-center px-2 lg:p-1', className)}>
      <div
        className={cn(
          'mb-4 w-full rounded-2xl bg-bg-weak-50 p-px transition-shadow lg:w-composer lg:rounded-20',
          dragging && 'shadow-gray-shadow-2',
        )}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => e.currentTarget === e.target && setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
      >
        {showUpgrade && (
          <div className='flex items-center gap-1 px-2.5 py-2 lg:px-3 lg:py-2.5'>
            <span className='flex items-center gap-1 text-label-xs text-text-soft-400'>
              <RiFlashlightFill className='size-4' aria-hidden='true' /> Access premium models &amp; features
            </span>
            <span className='text-label-xs text-text-disabled-300' aria-hidden='true'>
              ∙
            </span>
            <SettingsLink section='plans' className='text-label-xs text-text-sub-600 hover:underline'>
              Upgrade
            </SettingsLink>
          </div>
        )}

        <form
          className='flex cursor-text flex-col gap-2 rounded-[15px] bg-bg-white-0 p-2.5 pt-0 shadow-raised-sm transition-all duration-200 has-[textarea:focus-visible]:shadow-gray-shadow-2 lg:rounded-[19px] lg:p-3 lg:pt-0'
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          onClick={(e) => {
            if (!(e.target as HTMLElement).closest('button,a')) textareaRef.current?.focus();
          }}
        >
          {attachments.length > 0 && <AttachmentList attachments={attachments} onRemove={removeAttachment} />}

          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            placeholder={placeholder}
            aria-label='Message'
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send();
              }
            }}
            onPaste={(e) => {
              if (e.clipboardData.files.length) {
                e.preventDefault();
                addFiles(e.clipboardData.files);
              }
            }}
            className='field-sizing-content max-h-40 min-h-6 w-full resize-none overflow-y-auto border-0 bg-transparent pt-2.5 pl-1 text-paragraph-sm tracking-spacing-tiny-2 text-text-strong-950 outline-none placeholder:text-text-soft-400 lg:pt-3.5 lg:pb-6 lg:text-[15px] lg:leading-6'
          />

          {/* 30px: the reference's control row (its send button sits in a block wrapper) */}
          <div className='flex h-7.5 items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Dropdown.Root modal={false}>
                <Dropdown.Trigger asChild>
                  <Button.Root
                    type='button'
                    variant='neutral'
                    mode='ghost'
                    size='xxsmall'
                    aria-label='Add tools and files'
                    className='group size-7 bg-bg-weak-50 p-0 hover:bg-bg-weak-50 data-[state=open]:bg-bg-strong-950'
                  >
                    <Button.Icon
                      as={RiAddFill}
                      className='size-5 text-text-soft-400 duration-200 group-hover:text-text-sub-600 group-data-[state=open]:text-text-white-0'
                    />
                  </Button.Root>
                </Dropdown.Trigger>
                <Dropdown.Content side='top' align='center' sideOffset={10} className={menuContent}>
                  {toolItems.map(({ id, label, icon }) => (
                    <Dropdown.Item
                      key={id}
                      className={menuItem}
                      onSelect={id === 'upload' ? () => fileRef.current?.click() : undefined}
                    >
                      <Dropdown.ItemIcon as={icon} className={menuIcon} />
                      {label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Content>
              </Dropdown.Root>
              <input
                ref={fileRef}
                type='file'
                accept={ACCEPT}
                multiple
                hidden
                onChange={(e) => {
                  if (e.target.files) addFiles(e.target.files);
                  e.target.value = '';
                }}
              />
              <ModelPicker />
            </div>
            <Button.Root
              type='submit'
              variant='neutral'
              mode='ghost'
              size='xxsmall'
              aria-label='Send message'
              aria-disabled={!canSend}
              className={cn(
                'group size-7 p-0 duration-200',
                canSend ? 'bg-bg-strong-950 hover:bg-bg-strong-950' : 'bg-bg-weak-50 hover:bg-bg-weak-50',
              )}
            >
              <Button.Icon
                as={RiArrowUpLine}
                className={cn(
                  'size-5 duration-200',
                  canSend ? 'text-text-white-0' : 'text-text-soft-400 group-hover:text-text-sub-600',
                )}
              />
            </Button.Root>
          </div>
        </form>
      </div>

      {showDisclaimer && (
        <p className='text-center text-paragraph-xs text-text-soft-400 lg:w-composer'>
          AI can make <b className='font-medium'>mistakes</b> - please double-check
        </p>
      )}
    </div>
  );
}

function ModelPicker() {
  const { models, model, setModelId } = useModel();
  return (
    <Dropdown.Root modal={false}>
      <Dropdown.Trigger asChild>
        <Button.Root
          type='button'
          variant='neutral'
          mode='ghost'
          size='xxsmall'
          className='group hidden gap-1 bg-bg-weak-50 text-label-sm tracking-spacing-tiny-2 text-text-sub-600 hover:bg-bg-soft-200 hover:text-text-sub-600 lg:flex'
        >
          {model.name}
          <Button.Icon
            as={RiArrowDownSLine}
            className='size-5 text-text-soft-400 duration-200 group-data-[state=open]:rotate-180'
          />
        </Button.Root>
      </Dropdown.Trigger>
      <Dropdown.Content side='top' align='start' sideOffset={10} className={cn(menuContent, 'min-w-60')}>
        {models.map((m) => (
          <Dropdown.Item key={m.id} className='items-start gap-2 p-2' onSelect={() => setModelId(m.id)}>
            <span className='flex flex-1 flex-col gap-0.5'>
              <span className='text-label-sm text-text-strong-950'>{m.name}</span>
              <span className='text-paragraph-xs text-text-soft-400'>{m.description}</span>
            </span>
            {m.id === model.id && <RiCheckLine className='size-4 text-primary-base' aria-label='Selected' />}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown.Root>
  );
}

function AttachmentList({ attachments, onRemove }: { attachments: Attachment[]; onRemove: (id: string) => void }) {
  return (
    <ul className='flex flex-wrap gap-2 pt-2.5 lg:pt-3.5' aria-label='Attachments'>
      {attachments.map((a) => (
        <li key={a.id} className='relative w-fit'>
          {a.previewUrl ? (
            // object URLs of local files: next/image cannot optimise them
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={a.previewUrl}
              alt={a.name}
              className='size-24 rounded-2xl border border-stroke-soft-200 object-cover'
            />
          ) : (
            <FileChip name={a.name} type={a.type} className='pr-11' />
          )}
          <Button.Root
            type='button'
            variant='neutral'
            mode='ghost'
            size='xxsmall'
            aria-label={`Remove ${a.name}`}
            onClick={() => onRemove(a.id)}
            className='absolute top-2 right-2 size-4 rounded-full bg-bg-surface-800 p-0 hover:bg-bg-surface-800'
          >
            <Button.Icon as={RiCloseFill} className='size-3.5 text-text-white-0' />
          </Button.Root>
        </li>
      ))}
    </ul>
  );
}

export function FileChip({ name, type, className }: { name: string; type: string; className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 py-2.5 pr-4 pl-3',
        className,
      )}
    >
      <span className='flex size-9 items-center justify-center rounded-full bg-bg-weak-50'>
        <RiAttachment2 className='size-5 text-text-sub-600' aria-hidden='true' />
      </span>
      <span className='flex flex-col gap-1'>
        <span className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>{name}</span>
        <span className='text-label-xs text-text-sub-600'>{type}</span>
      </span>
    </div>
  );
}
