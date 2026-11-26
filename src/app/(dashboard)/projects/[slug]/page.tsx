import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { PanelSkeleton } from '@/components/layout/panel-skeleton';
import { ProjectDetail } from '@/components/projects/project-detail';
import { getProject, getProjectChats, getProjects } from '@/lib/data';

type Props = PageProps<'/projects/[slug]'>;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  return { title: project?.name ?? 'Project' };
}

/** `?empty=true` shows the project's empty state (the reference's pinned "Web Search" link uses it). */
export default function ProjectPage({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<PanelSkeleton />}>
      <ProjectContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function ProjectContent({ params, searchParams }: Pick<Props, 'params' | 'searchParams'>) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const project = await getProject(slug);
  if (!project) notFound();
  const chats = await getProjectChats(project.id);
  return <ProjectDetail project={project} chats={chats} empty={query.empty === 'true'} />;
}
