import {
  RiBankCardFill,
  RiBrainFill,
  RiEqualizerFill,
  RiEyeFill,
  RiFileUserFill,
  RiLock2Fill,
  RiQuillPenAiFill,
  RiSettings4Fill,
  RiShieldUserFill,
  RiUser3Fill,
  type RemixiconComponentType,
} from '@remixicon/react';

export const settingsSectionIds = [
  'workspace',
  'people',
  'plans',
  'profile',
  'preferences',
  'appearance',
  'security',
  'privacy',
  'ai',
  'integrations',
  'advanced',
] as const;

export type SettingsSectionId = (typeof settingsSectionIds)[number];

export type SettingsSection = {
  id: SettingsSectionId;
  /** The navigation label. The workspace entry shows the user's name instead. */
  label: string;
  title: string;
  description: string;
  /** null for the workspace entry, which shows the user's initial. */
  icon: RemixiconComponentType | null;
};

const s = (
  id: SettingsSectionId,
  label: string,
  title: string,
  description: string,
  icon: RemixiconComponentType | null,
): SettingsSection => ({ id, label, title, description, icon });

/** The settings navigation, in the reference's groups and order. */
export const settingsGroups: { title: string; sections: SettingsSection[] }[] = [
  {
    title: 'Workspace',
    sections: [
      s('workspace', 'Workspace', 'Workspace overview', 'Manage your workspace ownership and settings.', null),
      s('people', 'People', 'Team members', 'Manage workspace members, roles and permissions.', RiFileUserFill),
      s('plans', 'Plans & Billing', 'Plans & Billing', 'Manage subscription and billing settings.', RiBankCardFill),
    ],
  },
  {
    title: 'Account',
    sections: [
      s('profile', 'Profile', 'Profile', 'Manage your personal account settings.', RiUser3Fill),
      s('preferences', 'Preferences', 'Preferences', 'Customize your workspace experience.', RiSettings4Fill),
      s('appearance', 'Appearance', 'Appearance', 'Customize visual settings and interface.', RiEyeFill),
    ],
  },
  {
    title: 'Security',
    sections: [
      s('security', 'Security', 'Security', 'Manage account security and access control.', RiLock2Fill),
      s(
        'privacy',
        'Privacy & Data',
        'Privacy & Data',
        'Control your data privacy and usage preferences.',
        RiShieldUserFill,
      ),
    ],
  },
  {
    title: 'Features',
    sections: [
      s('ai', 'AI Settings', 'AI settings', 'Customize AI behavior and response preferences.', RiBrainFill),
      s(
        'integrations',
        'Integrations',
        'Integrations',
        'Connect external apps and manage API access.',
        RiEqualizerFill,
      ),
      s('advanced', 'Advanced', 'Advanced', 'Developer tools and experimental features.', RiQuillPenAiFill),
    ],
  },
];

export const settingsSections = settingsGroups.flatMap((g) => g.sections);
export const defaultSettingsSection: SettingsSectionId = 'workspace';

/** The URL search parameter that opens the settings dialog over any page: `?settings=<section>`. */
export const SETTINGS_PARAM = 'settings';

export function isSettingsSectionId(id: string | null | undefined): id is SettingsSectionId {
  return settingsSectionIds.includes(id as SettingsSectionId);
}

export function getSettingsSection(id: string | null | undefined): SettingsSection {
  const found = settingsSections.find((sec) => sec.id === id);
  return found ?? settingsSections.find((sec) => sec.id === defaultSettingsSection)!;
}
