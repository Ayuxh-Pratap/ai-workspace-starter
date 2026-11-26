import 'server-only';

import type { Chat, ChatGroup, Message, Model, Project, User } from '@/types';

import { chats, currentUser, messages, models, projects } from './fixtures';

// The data boundary of the app. Every function is async so a real API, database or AI SDK can replace the
// fixtures without touching a component. Pages and server components call these; client components receive data
// as props.

export async function getCurrentUser(): Promise<User> {
  return currentUser;
}

export async function getModels(): Promise<Model[]> {
  return models;
}

export async function getProjects(): Promise<Project[]> {
  return [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getPinnedProjects(): Promise<Project[]> {
  return projects.filter((p) => p.pinned);
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getChats(): Promise<Chat[]> {
  return [...chats].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getChatsByGroup(): Promise<{ group: ChatGroup; chats: Chat[] }[]> {
  const all = await getChats();
  const order: ChatGroup[] = ['recent', 'yesterday']; // older chats live in their projects
  return order
    .map((group) => ({ group, chats: all.filter((c) => c.group === group) }))
    .filter((g) => g.chats.length > 0);
}

export async function getProjectChats(projectId: string): Promise<Chat[]> {
  return (await getChats()).filter((c) => c.projectId === projectId);
}

export async function getChat(id: string): Promise<Chat | null> {
  return chats.find((c) => c.id === id) ?? null;
}

export async function getMessages(chatId: string): Promise<Message[]> {
  return messages.filter((m) => m.chatId === chatId);
}
