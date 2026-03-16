import type { MetadataRoute } from "next";
import { getPublicProjects } from "../data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getPublicProjects().map((project) => ({
    url: `https://dimy.dev/projects/${project.slug}`,
    lastModified: new Date()
  }));

  return [
    {
      url: "https://dimy.dev",
      lastModified: new Date()
    },
    ...projects
  ];
}
