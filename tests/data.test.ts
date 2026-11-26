import { describe, expect, it } from 'vitest';

import { getChat, getChatsByGroup, getMessages, getPinnedProjects, getProject, getProjectChats } from '@/lib/data';

describe('data layer', () => {
  it('groups the sidebar history as the reference does', async () => {
    const groups = await getChatsByGroup();
    expect(groups.map((g) => g.group)).toEqual(['recent', 'yesterday']);
    expect(groups[0]?.chats.map((c) => c.title)).toEqual([
      'User research analysis',
      'Competitive analysis',
      'Meeting notes',
    ]);
  });
  it('pins three projects', async () => {
    expect((await getPinnedProjects()).map((p) => p.name)).toEqual([
      'Research & Analysis',
      'Web Search',
      'Knowledge Base',
    ]);
  });
  it('finds a project and its chats, and returns null for an unknown slug', async () => {
    const project = await getProject('research-analysis');
    expect(project?.name).toBe('Research & Analysis');
    expect((await getProjectChats(project!.id)).length).toBeGreaterThan(0);
    expect(await getProject('nope')).toBeNull();
  });
  it('returns a chat with its messages', async () => {
    expect((await getChat('1'))?.title).toBe('User research analysis');
    expect((await getMessages('1')).map((m) => m.role)).toEqual(['user', 'assistant', 'user', 'assistant', 'user']);
  });
});
