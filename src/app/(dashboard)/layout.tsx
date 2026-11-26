import { Suspense } from 'react';

import { Sidebar } from '@/components/layout/sidebar';
import { ModelProvider } from '@/components/providers/model-provider';
import { SidebarProvider } from '@/components/providers/sidebar-provider';
import { SettingsDialog } from '@/components/settings/settings-dialog';
import { getChatsByGroup, getCurrentUser, getModels, getPinnedProjects } from '@/lib/data';

/** The app shell: sidebar + main panel, one screen tall (the page itself never scrolls; panes inside it do). */
export default async function DashboardLayout({ children }: LayoutProps<'/'>) {
  const [user, pinned, history, models] = await Promise.all([
    getCurrentUser(),
    getPinnedProjects(),
    getChatsByGroup(),
    getModels(),
  ]);

  return (
    <SidebarProvider>
      <ModelProvider models={models}>
        <div className='relative flex h-dvh overflow-hidden'>
          <Sidebar user={user} pinned={pinned} history={history} />
          <main className='w-full min-w-0 flex-1'>{children}</main>
        </div>
        {/* settings open over any page from `?settings=<section>`; reading the URL needs a Suspense boundary */}
        <Suspense fallback={null}>
          <SettingsDialog user={user} />
        </Suspense>
      </ModelProvider>
    </SidebarProvider>
  );
}
