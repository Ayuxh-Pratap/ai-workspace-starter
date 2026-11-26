export type User = {
  id: string;
  name: string;
  email: string;
  initials: string;
  plan: 'free' | 'pro';
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  description: string;
  visibility: 'private' | 'shared';
  pinned: boolean;
  updatedAt: string; // ISO date
};

export type ChatGroup = 'recent' | 'yesterday' | 'older';

export type Chat = {
  id: string;
  title: string;
  /** one line, shown in a project's chat list */
  summary?: string;
  projectId: string | null;
  group: ChatGroup;
  updatedAt: string; // ISO date
};

export type MessageRole = 'user' | 'assistant';

export type Message = {
  id: string;
  chatId: string;
  role: MessageRole;
  content: string;
  attachment?: { name: string; type: string };
  createdAt: string; // ISO date
};

export type Model = {
  id: string;
  name: string;
  description: string;
  pro?: boolean;
};
