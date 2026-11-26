import type { FullConfig } from '@playwright/test';

// A freshly started `next start` loads each route's code on its first request. Without a warm-up the first tests
// race that cold start (plus the sidebar's link prefetches) and a navigation can take longer than an assertion waits.
// Ask for every route kind once, page and RSC payload, before any test runs.
const routes = ['/', '/projects', '/projects/research-analysis', '/chat/1', '/library', '/help', '/terms', '/login'];

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use.baseURL;
  if (!baseURL) return;
  for (const route of routes) {
    await fetch(new URL(route, baseURL));
    await fetch(new URL(route, baseURL), { headers: { RSC: '1' } });
  }
}
