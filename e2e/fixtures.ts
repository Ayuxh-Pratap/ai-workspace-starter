import { test as base, expect } from '@playwright/test';

/** The sizes the reference was captured at: three to build from, two held out (DESIGN.md → Layout). */
export const sizes = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  laptop: { width: 1280, height: 720 },
  desktop: { width: 1440, height: 900 },
  wide: { width: 1920, height: 1080 },
} as const;

/** Every test fails on a console error or page error (hydration mismatches included). */
export const test = base.extend<{ consoleErrors: string[] }>({
  // page.goto returns once the app has started hydrating (Next.js sets window.next before hydrateRoot), so a test
  // never clicks or types into server HTML that React has not taken over yet; React replays events from there on
  page: async ({ page }, provide) => {
    const goto = page.goto.bind(page);
    page.goto = async (url, options) => {
      const response = await goto(url, options);
      await page.waitForFunction(() => 'next' in window);
      return response;
    };
    await provide(page);
  },
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      page.on('pageerror', (e) => errors.push(e.message));
      await use(errors);
      expect(errors, 'console errors').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
