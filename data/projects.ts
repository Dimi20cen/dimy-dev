import projectsData from "./projects.generated.json";

export type PublicMode = "none" | "demo" | "full";

export type ProjectRecord = {
  slug: string;
  title: string;
  public_summary: string;
  public_mode: PublicMode;
  primary_url: string;
  repo_url: string;
  sort_order: number;
};

const projects = [...projectsData].sort((a, b) => a.sort_order - b.sort_order) as ProjectRecord[];

export function getPublicProjects(): ProjectRecord[] {
  return projects.filter((project) => project.public_mode !== "none");
}

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return projects.find((project) => project.slug === slug && project.public_mode !== "none");
}
