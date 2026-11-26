'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Light / dark via the `.dark` class on <html> (AlignUI's dark tokens and the `dark:` variant both key off it).
 * The reference defaults to light; "system" is offered in Settings → Appearance.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
