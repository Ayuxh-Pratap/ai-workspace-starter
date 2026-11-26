'use client';

import { defaultSettingsSection, SETTINGS_PARAM, type SettingsSectionId } from '@/config/settings';

// The settings dialog lives in the URL as `?settings=<section>` on whatever page is open, so it survives a reload and
// can be linked to. Next.js keeps useSearchParams in step with the native History API, so these helpers change the
// URL without a server round trip or re-rendering the page under the dialog.

let openedInApp = false;

function urlWith(section: SettingsSectionId | null) {
  const url = new URL(window.location.href);
  if (section) url.searchParams.set(SETTINGS_PARAM, section);
  else url.searchParams.delete(SETTINGS_PARAM);
  return url;
}

/** Opens the dialog: a new history entry, so Back closes it. */
export function openSettings(section: SettingsSectionId = defaultSettingsSection) {
  openedInApp = true;
  window.history.pushState(null, '', urlWith(section));
}

/** Shows another section in the open dialog, replacing the entry (closing goes back once, not per section). */
export function showSettingsSection(section: SettingsSectionId) {
  window.history.replaceState(null, '', urlWith(section));
}

/** Closes the dialog: back to the entry it was opened from, or (opened by a link or reload) the same page without it. */
export function closeSettings() {
  if (openedInApp) {
    openedInApp = false;
    window.history.back();
  } else {
    window.history.replaceState(null, '', urlWith(null));
  }
}

/** The address a settings link points at without JavaScript: /settings/<section> redirects to `/?settings=<section>`. */
export function settingsHref(section: SettingsSectionId = defaultSettingsSection) {
  return section === defaultSettingsSection ? '/settings' : `/settings/${section}`;
}
