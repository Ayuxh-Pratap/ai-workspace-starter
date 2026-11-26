'use client';

import * as React from 'react';

import { defaultSettingsSection, type SettingsSectionId } from '@/config/settings';

import { openSettings, settingsHref } from './settings-url';

/** A link that opens the settings dialog over the current page (a plain /settings link when JavaScript is off). */
export function SettingsLink({
  section = defaultSettingsSection,
  onClick,
  ...rest
}: Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> & { section?: SettingsSectionId }) {
  return (
    <a
      href={settingsHref(section)}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        openSettings(section);
      }}
      {...rest}
    />
  );
}
