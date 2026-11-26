import type * as React from 'react';

import { AdvancedSettings } from '@/components/settings/sections/advanced';
import { AiSettings } from '@/components/settings/sections/ai';
import { AppearanceSettings } from '@/components/settings/sections/appearance';
import { IntegrationsSettings } from '@/components/settings/sections/integrations';
import { PeopleSettings } from '@/components/settings/sections/people';
import { PlansSettings } from '@/components/settings/sections/plans';
import { PreferencesSettings } from '@/components/settings/sections/preferences';
import { PrivacySettings } from '@/components/settings/sections/privacy';
import { ProfileSettings } from '@/components/settings/sections/profile';
import { SecuritySettings } from '@/components/settings/sections/security';
import { WorkspaceSettings } from '@/components/settings/sections/workspace';
import type { SettingsSectionId } from '@/config/settings';
import type { User } from '@/types';

/** Each settings page's body, by section id (the dialog renders the header). */
export const settingsPages: Record<SettingsSectionId, React.ComponentType<{ user: User }>> = {
  workspace: WorkspaceSettings,
  people: PeopleSettings,
  plans: PlansSettings,
  profile: ProfileSettings,
  preferences: PreferencesSettings,
  appearance: AppearanceSettings,
  security: SecuritySettings,
  privacy: PrivacySettings,
  ai: AiSettings,
  integrations: IntegrationsSettings,
  advanced: AdvancedSettings,
};
