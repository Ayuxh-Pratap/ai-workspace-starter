import type { Locator, Page } from '@playwright/test';

import { expect, sizes, test } from './fixtures';

// Every interactive surface at every size. Besides "it opens", each popup must be the topmost thing where it is drawn
// (nothing from the page sits over it) and reachable by a click, and a dialog's overlay must cover the whole page,
// app chrome included (DESIGN.md → Elevation & Depth → Layers). Below lg, dialogs are sheets docked to the bottom.

test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

/** The open Radix popper content (menu, popover, select listbox) that appeared last. */
const popup = (page: Page) => page.locator('[data-radix-popper-content-wrapper] > *').last();

/** The popup is visible and the element under its top, middle and bottom is part of it. */
async function expectOnTop(target: Locator) {
  await expect(target).toBeVisible();
  await expect
    .poll(() =>
      target.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const inset = Math.min(12, r.height / 2);
        const x = r.left + Math.min(40, r.width / 2);
        return [r.top + inset, r.top + r.height / 2, r.bottom - inset]
          .filter((y) => y >= 0 && y < innerHeight && x >= 0 && x < innerWidth)
          .every((y) => {
            const hit = document.elementFromPoint(x, y);
            return !!hit && el.contains(hit);
          });
      }),
    )
    .toBe(true);
}

/** A dialog: on top, its overlay over every corner of the page, and docked to the bottom edge below lg. */
async function expectDialog(page: Page, dialog: Locator, width: number) {
  await expectOnTop(dialog);
  const covered = await dialog.evaluate((el) => {
    const overlay = el.parentElement!;
    const pts: [number, number][] = [
      [2, 2],
      [innerWidth - 2, 2],
      [innerWidth / 2, 2],
      [2, innerHeight - 2],
    ];
    return pts.every(([x, y]) => overlay.contains(document.elementFromPoint(x, y)));
  });
  expect(covered, 'the overlay covers the page, app chrome included').toBe(true);
  if (width < 1024) {
    // measured inside the poll: the sheet slides and scales in, so one early box would be mid-animation
    const vh = page.viewportSize()!.height;
    await expect
      .poll(async () => {
        const box = (await dialog.boundingBox())!;
        return Math.round(box.y + box.height);
      })
      .toBe(vh);
  }
}

async function closeWithEscape(page: Page, target: Locator) {
  await page.keyboard.press('Escape');
  await expect(target).toBeHidden();
}

for (const [name, viewport] of Object.entries(sizes)) {
  const desktop = viewport.width >= 1024;

  test.describe(`${name} ${viewport.width}x${viewport.height}`, () => {
    test.use({ viewport });

    /** The sidebar's navigation, opening the drawer first below lg. */
    async function sidebar(page: Page) {
      if (!desktop) {
        await page.getByRole('button', { name: 'Open sidebar' }).filter({ visible: true }).first().click();
      }
      const nav = page.getByRole('navigation', { name: 'Main' });
      await expect(nav).toBeInViewport();
      return nav;
    }

    test('sidebar: drawer or rail, search, history menus', async ({ page }) => {
      await page.goto('/');
      const nav = await sidebar(page);
      await nav.getByRole('searchbox', { name: 'Search chats' }).fill('meeting');
      await expect(page.getByRole('region', { name: 'Search results' }).getByRole('link')).toHaveText([
        'Meeting notes',
      ]);
      await nav.getByRole('searchbox', { name: 'Search chats' }).fill('');

      await page.getByRole('button', { name: 'More options for User research analysis' }).first().click();
      const menu = popup(page);
      await expectOnTop(menu);
      await expect(menu.getByRole('menuitem').first()).toBeVisible();
      await closeWithEscape(page, menu);

      if (desktop) {
        await nav.getByRole('button', { name: 'Toggle sidebar' }).click();
        const rail = page.getByLabel('Collapsed sidebar');
        await rail.getByRole('button', { name: 'Toggle profile' }).click();
        await expectOnTop(popup(page));
        await closeWithEscape(page, popup(page));
        await rail.getByRole('button', { name: 'Toggle sidebar' }).click();
        await expect(nav).toBeInViewport();
      } else {
        await page.getByRole('button', { name: 'Close sidebar' }).click();
        await expect(nav).not.toBeInViewport();
      }
    });

    test('profile menu: on top, dark mode, settings link', async ({ page }) => {
      await page.goto('/');
      const nav = await sidebar(page);
      await nav.getByRole('button', { name: 'Toggle profile' }).click();
      const menu = popup(page);
      await expectOnTop(menu);
      await menu.getByRole('switch', { name: 'Dark mode' }).click();
      await expect(page.locator('html')).toHaveClass(/dark/);
      await menu.getByRole('switch', { name: 'Dark mode' }).click();
      await expect(page.locator('html')).not.toHaveClass(/dark/);
      await menu.getByRole('link', { name: 'Settings' }).click();
      await expectDialog(page, page.getByRole('dialog').last(), viewport.width);
    });

    test('settings: every section and every control in it', async ({ page }) => {
      await page.goto('/?settings=workspace');
      const dialog = page.getByRole('dialog').last();
      await expectDialog(page, dialog, viewport.width);
      const items = dialog.getByRole('navigation', { name: 'Settings' }).getByRole('listitem');
      const count = await items.count();
      expect(count).toBe(11);
      for (let i = 0; i < count; i++) {
        const back = dialog.getByRole('button', { name: 'Back to settings' }).filter({ visible: true });
        if (await back.count()) await back.click();
        await items.nth(i).getByRole('button').click();
        await expect(page).toHaveURL(/\?settings=[a-z]+$/);

        const switches = dialog.getByRole('switch').filter({ visible: true });
        for (let s = 0; s < (await switches.count()); s++) {
          const sw = switches.nth(s);
          const before = await sw.getAttribute('aria-checked');
          await sw.click();
          await expect(sw).not.toHaveAttribute('aria-checked', before!);
        }
        const selects = dialog.getByRole('combobox').filter({ visible: true });
        for (let s = 0; s < (await selects.count()); s++) {
          await selects.nth(s).click();
          const list = popup(page);
          await expectOnTop(list);
          await closeWithEscape(page, list);
          await expect(dialog).toBeVisible();
        }
        const radios = dialog.getByRole('radio').filter({ visible: true });
        if ((await radios.count()) > 1) {
          await radios.nth(1).click();
          await expect(radios.nth(1)).toBeChecked();
        }
      }
      // below lg the section panel's X goes back to the navigation, which holds the dialog's close button
      const back = dialog.getByRole('button', { name: 'Back to settings' }).filter({ visible: true });
      if (await back.count()) await back.click();
      await dialog.getByRole('button', { name: 'Close settings' }).filter({ visible: true }).last().click();
      await expect(dialog).toBeHidden();
    });

    test('composer: tools menu, model picker, send', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: 'Add tools and files' }).click();
      await expectOnTop(popup(page));
      await closeWithEscape(page, popup(page));
      if (desktop) {
        // the model picker sits in the composer at lg and up (DESIGN.md → Layout)
        await page.getByRole('button', { name: /GPT-4/ }).click();
        await expectOnTop(popup(page));
        await closeWithEscape(page, popup(page));
      }
      await page.getByRole('textbox', { name: 'Message' }).fill('Plan a launch');
      await page.getByRole('button', { name: 'Send message' }).click();
      await expect(page).toHaveURL(/\/chat\/1$/);
    });

    test('chat: header menus and message actions', async ({ page }) => {
      await page.goto('/chat/2');
      if (desktop) {
        await page.getByRole('button', { name: 'Chat options' }).click();
        await expectOnTop(popup(page));
        await closeWithEscape(page, popup(page));
      }
      await page.getByRole('button', { name: 'More', exact: true }).filter({ visible: true }).first().click();
      await expectOnTop(popup(page));
      await closeWithEscape(page, popup(page));
      const messages = page.getByRole('log', { name: 'Messages' }).or(page.getByLabel('Messages'));
      await messages.getByRole('button', { name: 'Copy' }).first().click();
      await messages.getByRole('button', { name: 'Good response' }).first().click();
      await messages.getByRole('button', { name: 'Bad response' }).first().click();
    });

    test('projects: search, sort, card menu, create', async ({ page }) => {
      await page.goto('/projects');
      await page.getByRole('searchbox', { name: 'Search projects' }).fill('web');
      await expect(page.getByText('Search results (1)')).toBeVisible();
      await page.getByRole('button', { name: 'Clear search' }).click();
      await expect(page.getByText('All projects (6)')).toBeVisible();

      await page.getByRole('combobox', { name: 'Sort projects' }).click();
      const list = popup(page);
      await expectOnTop(list);
      await list.getByRole('option').last().click();
      await expect(list).toBeHidden();

      await page.getByRole('button', { name: 'Options for Web Search' }).click();
      await expectOnTop(popup(page));
      await closeWithEscape(page, popup(page));

      await page.getByRole('button', { name: 'Create project' }).filter({ visible: true }).first().click();
      const dialog = page.getByRole('dialog');
      await expectDialog(page, dialog, viewport.width);
      await dialog.getByRole('textbox', { name: 'Project name' }).fill('Launch plan');
      await dialog.getByRole('button', { name: 'Create project' }).click();
      await expect(page.getByText('All projects (7)')).toBeVisible();
    });

    test('project: star, options menu, instructions sheet, chat menu', async ({ page }) => {
      await page.goto('/projects/research-analysis');
      await page.getByRole('button', { name: 'Star project' }).click();
      await expect(page.getByRole('button', { name: 'Unstar project' })).toBeVisible();

      await page.getByRole('button', { name: 'Project options' }).click();
      const menu = popup(page);
      await expectOnTop(menu);
      await expect(menu.getByRole('menuitem').first()).toBeInViewport();
      await closeWithEscape(page, menu);

      await page.getByRole('button', { name: /instructions/i }).click();
      const dialog = page.getByRole('dialog');
      await expectDialog(page, dialog, viewport.width);
      await dialog.getByRole('textbox', { name: 'Project instructions' }).fill('Answer in short bullet points.');
      await dialog.getByRole('button', { name: 'Save instructions' }).click();
      await expect(dialog).toBeHidden();
      await expect(page.getByText('Answer in short bullet points.')).toBeVisible();

      await page.getByRole('button', { name: 'Options for User research analysis', exact: true }).click();
      await expectOnTop(popup(page));
      await closeWithEscape(page, popup(page));
    });
  });
}
