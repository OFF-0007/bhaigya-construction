import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { FALLBACK_PROJECTS } from '@/lib/projects';
import ProjectDetailsContent from './ProjectDetailsContent';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  try {
    const response = await api.getProjectBySlug(slug);
    if (response?.data) return response.data;
  } catch (error) {
    console.error(`Failed to fetch project ${slug}:`, error);
  }

  // Fallback to local data
  return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: 'Project Not Found | Bhaigya Construction' };

  const description = project.description?.substring(0, 160) || '';

  return {
    title: `${project.projectName} | Bhaigya Construction`,
    description: description,
    openGraph: {
      title: project.projectName,
      description: description,
      images: project.primaryImage ? [project.primaryImage.fileUrl] : [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsContent project={project} />;
}
