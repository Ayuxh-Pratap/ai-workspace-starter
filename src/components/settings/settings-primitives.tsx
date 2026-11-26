'use client';

import * as React from 'react';

import * as Switch from '@/components/ui/switch';
import { cn } from '@/utils/cn';

// The building blocks every settings page uses, taken from the reference's markup: a scrolling body, groups with a
// label column (title + description) beside their content, rows with a label and a control.

/** The scrolling body of a settings page, under the page header. */
export function SettingsBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn('flex h-full w-full flex-col gap-5 overflow-y-auto px-0 pb-8 lg:gap-7 lg:px-7 lg:pb-0', className)}
    >
      {children}
    </div>
  );
}

/**
 * One group: the label column (title, description) and its content. Every group after the first has a top border.
 * `contentClassName` replaces the content column's layout where a page needs another (a grid, a wrap).
 */
export function SettingsGroup({
  title,
  description,
  first,
  className,
  contentClassName,
  children,
}: {
  title: string;
  description: string;
  first?: boolean;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        'flex flex-col gap-5 px-5 pt-5 lg:flex-row lg:gap-4 lg:px-0 lg:pt-7',
        !first && 'border-t border-stroke-soft-200',
        className,
      )}
    >
      <div className='flex flex-col gap-1 lg:max-w-50 lg:min-w-50 xl:max-w-75 xl:min-w-75'>
        <h3 className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>{title}</h3>
        <p className='text-label-xs tracking-spacing-tiny-2 text-text-soft-400 lg:text-label-sm'>{description}</p>
      </div>
      <div className={cn('flex w-full flex-col gap-5 lg:gap-4', contentClassName)}>{children}</div>
    </section>
  );
}

/** A label + description with a control on the right. `stack` puts the control under the text below lg. */
export function SettingsRow({
  label,
  description,
  stack,
  className,
  children,
}: {
  label: React.ReactNode;
  description?: React.ReactNode;
  stack?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex justify-between gap-2',
        stack ? 'flex-col items-start gap-4 lg:flex-row lg:items-center' : 'items-center',
        className,
      )}
    >
      <div className='flex flex-col gap-1'>
        <div className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>{label}</div>
        {description && <div className='text-label-xs text-text-soft-400 lg:text-label-sm'>{description}</div>}
      </div>
      {children}
    </div>
  );
}

/** The settings pages' switch: AlignUI's Switch with the template's success green when on. */
export function SettingsSwitch(props: React.ComponentPropsWithoutRef<typeof Switch.Root>) {
  return (
    <Switch.Root
      {...props}
      className={cn(
        '[&>div]:group-hover:data-[state=checked]/switch:bg-success-base! cursor-pointer [&>div]:group-data-[state=checked]/switch:bg-success-base!',
        props.className,
      )}
    />
  );
}

/** A small stroke button as the settings pages use it (Manage, Edit profile, Upload…). */
export const settingsButtonClass = 'w-full cursor-pointer rounded-10! px-3 text-label-sm text-text-sub-600 lg:w-fit';
