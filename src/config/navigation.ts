import {
  RiAddFill,
  RiBookOpenLine,
  RiFolder2Line,
  RiLoginBoxLine,
  RiQuestionAnswerLine,
  RiSettings2Line,
  RiTranslate,
  type RemixiconComponentType,
} from '@remixicon/react';

import type { SettingsSectionId } from './settings';

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: RemixiconComponentType;
  /** the brand-coloured "new" action */
  primary?: boolean;
};

/** Top of the sidebar, also shown as icons on the collapsed rail. */
export const mainNav: NavItem[] = [
  { id: 'new-chat', label: 'New chat', href: '/', icon: RiAddFill, primary: true },
  { id: 'projects', label: 'Projects', href: '/projects', icon: RiFolder2Line },
  { id: 'library', label: 'Library', href: '/library', icon: RiBookOpenLine },
];

export type ProfileMenuItem = {
  id: string;
  label: string;
  icon: RemixiconComponentType;
  href: string;
  /** opens the settings dialog at this section over the current page (href is its no-JavaScript fallback) */
  settings?: SettingsSectionId;
  danger?: boolean;
};

export const profileMenu: ProfileMenuItem[] = [
  { id: 'settings', label: 'Settings', icon: RiSettings2Line, href: '/settings', settings: 'workspace' },
  { id: 'language', label: 'Language', icon: RiTranslate, href: '/settings/preferences', settings: 'preferences' },
  { id: 'help', label: 'Need help?', icon: RiQuestionAnswerLine, href: '/help' },
  { id: 'logout', label: 'Log out', icon: RiLoginBoxLine, href: '/login', danger: true },
];

export const chatGroupLabels = {
  recent: 'Recents',
  yesterday: 'Yesterday',
  older: 'Older',
} as const;
