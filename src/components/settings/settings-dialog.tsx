'use client';

import { RiArrowRightSLine, RiCloseFill } from '@remixicon/react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { ProBadge } from '@/components/layout/sidebar-profile';
import * as Modal from '@/components/ui/modal';
import {
  defaultSettingsSection,
  getSettingsSection,
  isSettingsSectionId,
  SETTINGS_PARAM,
  settingsGroups,
  type SettingsSectionId,
} from '@/config/settings';
import type { User } from '@/types';
import { cn } from '@/utils/cn';

import { settingsPages } from './sections';
import { closeSettings, showSettingsSection } from './settings-url';

/**
 * The settings dialog, open whenever the URL has `?settings=<section>` (any page, a reload, a shared link).
 * Layout from the reference: at lg+ one rounded white frame holding the navigation and the section in its own bordered
 * panel; below lg the navigation is a full-height sheet and a chosen section slides up over it.
 */
export function SettingsDialog({ user }: { user: User }) {
  const param = useSearchParams().get(SETTINGS_PARAM);
  const open = param !== null;
  const requested: SettingsSectionId = isSettingsSectionId(param) ? param : defaultSettingsSection;

  // Keep showing the last section while the dialog animates out (the param is already gone then).
  const [active, setActive] = React.useState(requested);
  // Below lg: is the section panel shown over the navigation? A link to a section shows it straight away.
  const [mobileContent, setMobileContent] = React.useState(requested !== defaultSettingsSection);
  const [wasOpen, setWasOpen] = React.useState(open);
  if (open && requested !== active) setActive(requested);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setMobileContent(requested !== defaultSettingsSection);
  }

  const select = (id: SettingsSectionId) => {
    setActive(id);
    setMobileContent(true);
    showSettingsSection(id);
  };

  const section = getSettingsSection(active);
  const Page = settingsPages[active];

  return (
    <Modal.Root open={open} onOpenChange={(o) => !o && closeSettings()}>
      <Modal.Content
        showClose={false}
        aria-describedby={undefined}
        overlayClassName='z-62 items-end bg-overlay-gray p-0 backdrop-blur-none duration-300 lg:items-center lg:p-4'
        className={cn(
          'flex h-dvh max-w-none items-end overflow-hidden rounded-none bg-transparent shadow-none duration-300',
          'max-lg:data-[state=closed]:zoom-out-100 max-lg:data-[state=closed]:slide-out-to-bottom max-lg:data-[state=open]:zoom-in-100 max-lg:data-[state=open]:slide-in-from-bottom',
          'lg:h-180 lg:max-h-[80vh] lg:w-229.5 lg:items-center lg:gap-1.5 lg:rounded-[28px] lg:bg-bg-white-0 lg:p-1.5 lg:shadow-raised-md lg:ring-1 lg:ring-stroke-edge xl:w-289.5',
        )}
      >
        <nav
          aria-label='Settings'
          className='flex h-dvh w-full flex-col rounded-t-3xl bg-bg-white-0 py-4 lg:h-full lg:min-h-full lg:w-1/5 lg:min-w-60 lg:rounded-none lg:p-3.5'
        >
          <div className='flex w-full shrink-0 lg:hidden'>
            <PanelHeader
              title='Settings'
              description='Manage your workspace ownership and settings.'
              onClose={closeSettings}
              closeLabel='Close settings'
            />
          </div>
          <div className='flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto lg:gap-3'>
            {settingsGroups.map((group, i) => (
              <div
                key={group.title}
                className={cn(
                  'flex flex-col gap-1 border-t border-stroke-soft-200 pt-4 lg:border-none lg:pt-0',
                  i === 0 && 'border-t-0',
                  i === settingsGroups.length - 1 && 'pb-3',
                )}
              >
                <span className='px-7 py-1 text-label-xs text-text-soft-400 lg:px-2'>{group.title}</span>
                <ul className='flex flex-col gap-1 px-4 lg:px-0'>
                  {group.sections.map(({ id, label, icon: Icon }) => {
                    const on = id === active;
                    return (
                      <li key={id}>
                        <button
                          type='button'
                          onClick={() => select(id)}
                          aria-current={on ? 'page' : undefined}
                          className={cn(
                            'group flex w-full cursor-pointer items-center gap-2 rounded-10 p-2 text-left text-label-sm text-text-sub-600 transition-colors duration-200 hover:bg-bg-weak-50 focus-visible:shadow-button-important-focus focus-visible:outline-none',
                            on && 'lg:bg-bg-weak-50 lg:text-text-strong-950',
                          )}
                        >
                          {Icon ? (
                            <Icon
                              className={cn(
                                'size-5 text-text-disabled-300 transition duration-200 group-hover:text-text-soft-400',
                                on && 'lg:text-primary-base lg:group-hover:text-primary-base',
                              )}
                            />
                          ) : (
                            <>
                              <span
                                className='flex size-5 items-center justify-center rounded-full bg-bg-soft-200 text-label-xs text-text-strong-950'
                                aria-hidden='true'
                              >
                                {user.name.charAt(0)}
                              </span>
                              <span className='flex items-center gap-1'>
                                <span className={cn(on && 'lg:text-text-strong-950')}>{user.name}</span>
                                {user.plan === 'pro' && (
                                  <ProBadge className='bg-feature-lighter font-semibold text-feature-base' />
                                )}
                              </span>
                            </>
                          )}
                          {Icon && label}
                          {on && (
                            <RiArrowRightSLine
                              className='ml-auto hidden size-4 text-text-soft-400 lg:block'
                              aria-hidden='true'
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* below lg a layer over the navigation (tap outside the panel to go back); at lg+ the right-hand panel */}
        <div
          onClick={() => setMobileContent(false)}
          className={cn(
            'absolute inset-0 flex h-full w-full flex-1 items-end bg-overlay-gray transition-all duration-400 lg:pointer-events-auto lg:visible lg:relative lg:inset-auto lg:bg-transparent lg:opacity-100',
            mobileContent ? 'visible opacity-100' : 'invisible opacity-0',
          )}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'flex h-[calc(100dvh-32px)] w-full shrink-0 flex-col rounded-t-3xl bg-bg-white-0 pt-5 shadow-raised-xs ring-1 ring-stroke-edge transition-transform duration-400 ease-out lg:h-full lg:translate-y-0 lg:rounded-3xl lg:pt-5.5 lg:pb-7',
              mobileContent ? 'translate-y-0' : 'translate-y-full',
            )}
          >
            <PanelHeader
              title={section.title}
              description={section.description}
              onClose={closeSettings}
              onBack={() => setMobileContent(false)}
              closeLabel='Close settings'
              isDialogTitle
            />
            <Page user={user} />
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}

/** A panel's title, description and close button over a bottom border. */
function PanelHeader({
  title,
  description,
  onClose,
  onBack,
  closeLabel,
  isDialogTitle,
}: {
  title: string;
  description: string;
  onClose: () => void;
  /** Below lg the section panel's button goes back to the navigation instead of closing. */
  onBack?: () => void;
  closeLabel: string;
  isDialogTitle?: boolean;
}) {
  const Title = isDialogTitle ? Modal.Title : 'h2';
  const buttonClass =
    'group size-6 shrink-0 cursor-pointer items-center justify-center rounded-md bg-bg-white-0 transition-colors duration-200 hover:bg-bg-weak-50 focus-visible:shadow-button-important-focus focus-visible:outline-none';
  const icon = (
    <RiCloseFill
      className='size-4.5 text-text-soft-400 transition-colors duration-200 group-hover:text-text-sub-600'
      aria-hidden='true'
    />
  );
  return (
    <div className='flex w-full justify-between gap-4 px-0 lg:px-7'>
      <div className='flex w-full items-center justify-between border-b border-stroke-soft-200 px-5 pb-5 lg:px-0 lg:pb-7'>
        <div className='flex flex-col gap-1'>
          <Title className='text-label-sm tracking-spacing-tiny-2 text-text-strong-950'>{title}</Title>
          <p className='text-label-xs tracking-spacing-tiny-2 text-text-soft-400 lg:text-label-sm'>{description}</p>
        </div>
        {onBack ? (
          <>
            <button
              type='button'
              aria-label='Back to settings'
              onClick={onBack}
              className={cn(buttonClass, 'flex lg:hidden')}
            >
              {icon}
            </button>
            <button
              type='button'
              aria-label={closeLabel}
              onClick={onClose}
              className={cn(buttonClass, 'hidden lg:flex')}
            >
              {icon}
            </button>
          </>
        ) : (
          <button type='button' aria-label={closeLabel} onClick={onClose} className={cn(buttonClass, 'flex')}>
            {icon}
          </button>
        )}
      </div>
    </div>
  );
}
