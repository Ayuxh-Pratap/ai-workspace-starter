import type { Chat, Message, Model, Project, User } from '@/types';

// Sample data. Replace the repository functions in ./index.ts with real
// API or database calls; components only ever import from '@/lib/data'.

export const currentUser: User = {
  id: 'u_1',
  name: 'Alex Morgan',
  email: 'alex@example.com',
  initials: 'AM',
  plan: 'pro',
};

export const models: Model[] = [
  { id: 'gpt-4', name: 'GPT-4', description: 'Great for most tasks' },
  { id: 'gpt-4o', name: 'GPT-4o', description: 'Faster, multimodal', pro: true },
  { id: 'o1', name: 'o1', description: 'Uses advanced reasoning', pro: true },
];

const project = (slug: string, name: string, description: string, pinned: boolean, daysAgo: number): Project => ({
  id: `p_${slug}`,
  slug,
  name,
  description,
  visibility: 'private',
  pinned,
  updatedAt: new Date(Date.UTC(2026, 10, 25 - daysAgo)).toISOString(),
});

export const projects: Project[] = [
  project('research-analysis', 'Research & Analysis', 'User research insights & data analysis', true, 12),
  project('web-search', 'Web Search', 'Search functionality and SEO optimization', true, 12),
  project('api-documentation', 'API Documentation', 'Rest API documentation and examples', false, 12),
  project('feature-overview', 'Feature Overview', 'Product feature planning and specifications', false, 12),
  project('knowledge-base', 'Knowledge Base', 'Key tips for effective project management', true, 12),
  project('user-guide', 'User Guide', 'User onboarding and guide creation', false, 12),
];

const at = (day: number, hour: number, minute = 0) => new Date(Date.UTC(2026, 10, day, hour, minute)).toISOString();

export const chats: Chat[] = [
  { id: '1', title: 'User research analysis', projectId: 'p_research-analysis', group: 'recent', updatedAt: at(25, 9) },
  { id: '2', title: 'Competitive analysis', projectId: 'p_research-analysis', group: 'recent', updatedAt: at(25, 8) },
  { id: '3', title: 'Meeting notes', projectId: null, group: 'recent', updatedAt: at(25, 7) },
  { id: '4', title: 'Market trends analysis', projectId: 'p_web-search', group: 'yesterday', updatedAt: at(24, 16) },
  {
    id: '5',
    title: 'Usability testing results',
    projectId: 'p_research-analysis',
    group: 'yesterday',
    updatedAt: at(24, 15),
  },
  { id: '6', title: 'Competitive analysis', projectId: 'p_knowledge-base', group: 'yesterday', updatedAt: at(24, 14) },
  {
    id: '7',
    title: 'Feature prioritization',
    projectId: 'p_feature-overview',
    group: 'yesterday',
    updatedAt: at(24, 13),
  },
  { id: '8', title: 'User feedback', projectId: 'p_user-guide', group: 'yesterday', updatedAt: at(24, 12) },
  // older chats, listed inside their project
  {
    id: '9',
    title: 'UI Design Review',
    summary: 'Analyzing color schemes and layout adjustments.',
    projectId: 'p_research-analysis',
    group: 'older',
    updatedAt: at(20, 13),
  },
  {
    id: '10',
    title: 'User Testing Feedback',
    summary: 'Gathering insights from recent usability tests.',
    projectId: 'p_research-analysis',
    group: 'older',
    updatedAt: at(20, 15, 15),
  },
  {
    id: '11',
    title: 'Accessibility Standards',
    summary: 'Reviewing WCAG compliance requirements.',
    projectId: 'p_research-analysis',
    group: 'older',
    updatedAt: at(20, 16),
  },
  {
    id: '12',
    title: 'Marketing Strategies',
    summary: 'Developing campaign ideas for product launch.',
    projectId: 'p_knowledge-base',
    group: 'older',
    updatedAt: at(20, 17, 30),
  },
  {
    id: '13',
    title: 'Feature Roadmap Planning',
    summary: 'Prioritizing upcoming feature developments.',
    projectId: 'p_knowledge-base',
    group: 'older',
    updatedAt: at(20, 18, 45),
  },
];

/** Sample conversation shown in every chat until a model is connected. */
const conversation: Omit<Message, 'id' | 'chatId' | 'createdAt'>[] = [
  { role: 'user', content: 'Hi, can you help me plan something?' },
  { role: 'assistant', content: 'Sure. What are you planning, and when does it need to be ready?' },
  { role: 'user', content: 'A product launch in three weeks. What should the checklist cover?' },
  {
    role: 'assistant',
    content:
      'Start with the date and owner, then the launch page, docs, a short demo, the announcement post and a support plan. Work backwards from the date and leave the last two days for fixes.',
  },
  {
    role: 'user',
    content: 'Here is our current plan. What is missing?',
    attachment: { name: 'launch-plan.pdf', type: 'PDF' },
  },
];

export const messages: Message[] = chats.flatMap((chat) =>
  conversation.map((m, i) => ({ ...m, id: `${chat.id}-${i + 1}`, chatId: chat.id, createdAt: chat.updatedAt })),
);

/** The project and chat the home screen's breadcrumb names. */
export const homeContext = { project: 'Product research', chat: 'Launch checklist' } as const;
