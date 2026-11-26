import type { Metadata } from 'next';

import { ProjectsBrowser } from '@/components/projects/projects-browser';
import { getProjects } from '@/lib/data';

export const metadata: Metadata = { title: 'Projects' };

export default async function ProjectsPage() {
  return <ProjectsBrowser initialProjects={await getProjects()} />;
}
