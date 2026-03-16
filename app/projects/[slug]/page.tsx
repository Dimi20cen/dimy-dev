import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getPublicProjects } from "../../../data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function primaryAction(project: ReturnType<typeof getProjectBySlug>) {
  if (!project || !project.primary_url) return null;
  if (project.public_mode === "full") return { href: project.primary_url, label: "Open live app" };
  return { href: project.primary_url, label: "Open demo" };
}

export function generateStaticParams() {
  return getPublicProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found | dimy.dev" };
  }
  return {
    title: `${project.title} | dimy.dev`,
    description: project.public_summary
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const action = primaryAction(project);

  return (
    <main className="page-shell">
      <section className="section project-detail-hero">
        <p className="eyebrow">Project</p>
        <h1>{project.title}</h1>
        <p className="hero-copy">{project.public_summary}</p>
        <div className="profile-links">
          {action ? (
            <a href={action.href} target="_blank" rel="noreferrer" className="btn btn-primary">
              {action.label}
            </a>
          ) : null}
          {project.repo_url ? (
            <a href={project.repo_url} target="_blank" rel="noreferrer" className="btn btn-ghost">
              Source
            </a>
          ) : null}
          <Link href="/" className="btn btn-ghost">
            Back Home
          </Link>
        </div>
      </section>

      {!action ? (
        <section className="section">
          <div className="project-note">
            <p>Public links for this project are still being curated.</p>
          </div>
        </section>
      ) : null}
    </main>
  );
}
