import { ChatEmptyState } from '@/components/chat/empty-state';
import { Composer } from '@/components/chat/composer';
import { ChatHeader } from '@/components/layout/chat-header';
import { Panel } from '@/components/layout/panel';
import { getCurrentUser } from '@/lib/data';
import { homeContext } from '@/lib/data/fixtures';

/** New chat: an empty conversation with the composer at the bottom. */
export default async function HomePage() {
  const user = await getCurrentUser();
  const firstName = user.name.split(' ')[0] ?? user.name;

  return (
    <Panel className='justify-between pb-4 lg:justify-end lg:py-4 lg:pr-4 lg:pl-5'>
      <ChatHeader project={homeContext.project} title={homeContext.chat} />
      <ChatEmptyState name={firstName} />
      <Composer />
    </Panel>
  );
}
