import { expect, test } from './fixtures';

test.use({ viewport: { width: 1440, height: 900 } });

test('the composer opens a chat from home, and the chat answers', async ({ page }) => {
  await page.goto('/');
  const box = page.getByRole('textbox', { name: 'Message' });
  await box.fill('Hello there');
  await box.press('Enter');
  await expect(page).toHaveURL(/\/chat\/1$/);
  await page.getByRole('textbox', { name: 'Message' }).fill('One more');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('One more')).toBeVisible();
  await expect(page.getByText('no model connected yet')).toBeVisible();
});

test('chat menus open', async ({ page }) => {
  await page.goto('/chat/2');
  await page.getByRole('button', { name: 'Chat options' }).click();
  await expect(page.getByRole('menuitem', { name: 'Rename' })).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'More', exact: true }).first().click();
  await expect(page.getByRole('menuitem', { name: 'Export' })).toBeVisible();
});

test('sidebar search filters the history', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('searchbox', { name: 'Search chats' }).fill('feedback');
  await expect(page.getByRole('region', { name: 'Search results' }).getByRole('link')).toHaveText(['User feedback']);
});

test('dark mode from the profile menu', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'Toggle profile' }).click();
  await page.getByRole('switch', { name: 'Dark mode' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(23, 23, 23)');
});

const openSettingsFromProfile = async (page: import('@playwright/test').Page) => {
  await page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'Toggle profile' }).click();
  await page.getByRole('link', { name: 'Settings' }).click();
};

test('settings opens over the page, follows the URL and closes back to it', async ({ page }) => {
  await page.goto('/projects');
  await openSettingsFromProfile(page);
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: 'Workspace overview', exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/projects\?settings=workspace$/);
  // the page is still underneath (Radix hides it from assistive tech while the dialog is open)
  await expect(page.getByRole('heading', { name: 'Projects', level: 1, includeHidden: true })).toBeAttached();
  await dialog.getByRole('button', { name: 'Appearance' }).click();
  await expect(dialog.getByRole('heading', { name: 'Appearance', exact: true })).toBeVisible();
  await expect(page).toHaveURL(/\/projects\?settings=appearance$/);
  await dialog.getByRole('button', { name: 'Close settings' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page).toHaveURL(/\/projects$/);
});

test('settings opens again after closing, and Back closes it', async ({ page }) => {
  await page.goto('/');
  for (let i = 0; i < 2; i++) {
    await openSettingsFromProfile(page);
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await openSettingsFromProfile(page);
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page).toHaveURL(/\/$/);
});

test('a reload or a link keeps settings a dialog over the page', async ({ page }) => {
  await page.goto('/projects?settings=profile');
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: 'Profile', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Projects', level: 1, includeHidden: true })).toBeAttached();
  await dialog.getByRole('button', { name: 'Close settings' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page).toHaveURL(/\/projects$/);
  // the old paths redirect to the dialog
  await page.goto('/settings/plans');
  await expect(page).toHaveURL(/\/\?settings=plans$/);
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'Plans & Billing', exact: true })).toBeVisible();
});

test('dark mode keeps the hairline borders', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/projects');
  const card = page.getByRole('main').getByRole('listitem').filter({ hasText: 'Research & Analysis' }).first();
  // the card's 1px ring is the dark stroke (#262626), not the light-mode rgba that vanishes on #171717
  await expect
    .poll(() => card.evaluate((el) => getComputedStyle(el).boxShadow))
    .toContain('rgb(38, 38, 38) 0px 0px 0px 1px');
});

test('projects: search, create, open', async ({ page }) => {
  await page.goto('/projects');
  const search = page.getByRole('searchbox', { name: 'Search projects' });
  await search.fill('guide');
  await expect(page.getByText('Search results (1)')).toBeVisible();
  await search.fill('');
  await page.getByRole('button', { name: 'Create project' }).click();
  await page.getByRole('textbox', { name: 'Project name' }).fill('Launch plan');
  await page.getByRole('dialog').getByRole('button', { name: 'Create project' }).click();
  await expect(page.getByText('All projects (7)')).toBeVisible();
  await page.getByRole('link', { name: /User research insights/ }).click();
  await expect(page.getByRole('heading', { name: 'Research & Analysis' })).toBeVisible();
  await expect(page.getByText('Chats in this project')).toBeVisible();
});

test('an unknown route is a 404', async ({ page, consoleErrors }) => {
  const res = await page.goto('/no-such-page');
  expect(res?.status()).toBe(404);
  consoleErrors.splice(0); // the browser logs the 404 document itself
});

// An unknown id inside a streamed route: the shell is already sent, so the status stays 200 (docs/SPEC.md#not-found);
// the not-found UI renders and Next.js marks the page noindex.
test('an unknown chat id shows not found, noindex', async ({ page }) => {
  await page.goto('/chat/does-not-exist');
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).not.toHaveCount(0);
});
