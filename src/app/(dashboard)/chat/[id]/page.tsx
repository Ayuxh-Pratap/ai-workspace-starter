import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Conversation } from '@/components/chat/conversation';
import { ChatHeader } from '@/components/layout/chat-header';
import { Panel } from '@/components/layout/panel';
import { PanelSkeleton } from '@/components/layout/panel-skeleton';
import { getChat, getChats, getMessages, getProjects } from '@/lib/data';

type Params = PageProps<'/chat/[id]'>['params'];

export async function generateStaticParams() {
  return (await getChats()).map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps<'/chat/[id]'>): Promise<Metadata> {
  const chat = await getChat((await params).id);
  return { title: chat?.title ?? 'Chat' };
}

// params are read inside <Suspense> so a client navigation can show the shell at once (Cache Components)
export default function ChatPage({ params }: PageProps<'/chat/[id]'>) {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <ChatContent params={params} />
    </Suspense>
  );
}

async function ChatContent({ params }: { params: Params }) {
  const { id } = await params;
  const chat = await getChat(id);
  if (!chat) notFound();

  const [messages, projects] = await Promise.all([getMessages(id), getProjects()]);
  const project = projects.find((p) => p.id === chat.projectId)?.name ?? 'Chats';

  return (
    <Panel className='justify-between pb-4 lg:py-4 lg:pr-4 lg:pl-5'>
      <ChatHeader project={project} title={chat.title} />
      <Conversation key={id} chatId={id} initialMessages={messages} />
    </Panel>
  );
}
