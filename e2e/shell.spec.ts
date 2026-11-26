import { expect, sizes, test } from './fixtures';

const isDesktop = (w: number) => w >= 1024;

for (const [name, viewport] of Object.entries(sizes)) {
  test.describe(`${name} ${viewport.width}x${viewport.height}`, () => {
    test.use({ viewport });

    test('home: one screen tall, header for the width, composer at the bottom', async ({ page }) => {
      await page.goto('/');
      await expect(page.getByRole('heading', { name: 'Hello Alex' })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBe(viewport.height);

      const box = await page.getByRole('textbox', { name: 'Message' }).boundingBox();
      expect(box!.y).toBeGreaterThan(viewport.height / 2);

      const main = page.getByRole('navigation', { name: 'Main' });
      if (isDesktop(viewport.width)) {
        await expect(page.getByRole('heading', { name: 'Product research' })).toBeVisible();
        await expect(main).toBeInViewport();
      } else {
        await expect(page.getByRole('button', { name: 'Open sidebar' })).toBeVisible();
        await expect(main).not.toBeInViewport();
      }
    });

    if (!isDesktop(viewport.width)) {
      test('drawer opens from the menu and closes on navigation', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Open sidebar' }).click();
        const main = page.getByRole('navigation', { name: 'Main' });
        await expect(main).toBeInViewport({ ratio: 0.9 });
        await main.getByRole('link', { name: 'Projects' }).click();
        await expect(page).toHaveURL(/\/projects$/);
        await expect(main).not.toBeInViewport();
      });
    } else {
      test('sidebar folds to the rail and back', async ({ page }) => {
        await page.goto('/');
        const main = page.getByRole('navigation', { name: 'Main' });
        await main.getByRole('button', { name: 'Toggle sidebar' }).click();
        const rail = page.getByLabel('Collapsed sidebar');
        await expect(rail.getByRole('link', { name: 'Projects' })).toBeVisible();
        await expect
          .poll(() => page.getByLabel('Sidebar', { exact: true }).evaluate((el) => el.getBoundingClientRect().width))
          .toBe(72);
        await rail.getByRole('button', { name: 'Toggle sidebar' }).click();
        await expect(main.getByRole('link', { name: 'Projects' })).toBeVisible();
      });

      test('the sidebar tooltip waits 300ms', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('tooltip')).toHaveCount(0);
        // timed from before the pointer arrives, so a slow machine can only make it longer, never fail it
        const start = Date.now();
        await page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'Toggle sidebar' }).hover();
        await expect(page.getByRole('tooltip', { name: 'Toggle sidebar' })).toBeVisible();
        expect(Date.now() - start).toBeGreaterThanOrEqual(300);
      });
    }
  });
}
