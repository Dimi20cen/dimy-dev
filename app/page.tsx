import Link from "next/link";
import { getPublicProjects } from "../data/projects";

function primaryLabel(mode: string) {
  if (mode === "full") return "Live App";
  if (mode === "demo") return "Demo";
  return "Project Page";
}

export default function HomePage() {
  const projects = getPublicProjects();
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dimitris",
    alternateName: "dimydev",
    url: "https://dimy.dev",
    sameAs: ["https://github.com/dimydev", "https://linkedin.com/in/dimydev"],
    jobTitle: "Product Engineer"
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="profile-header">
          <div className="profile-photo" aria-hidden />
          <div>
            <p className="eyebrow">Product Engineer</p>
            <h1>Dimitris</h1>
          </div>
        </div>
        <p className="hero-copy">
          I build practical web products for daily life and then shape the best
          parts of them into polished public experiences.
        </p>
        <div className="profile-links">
          <a href="https://github.com/dimydev" className="btn btn-ghost">
            GitHub
          </a>
          <a href="https://linkedin.com/in/dimydev" className="btn btn-ghost">
            LinkedIn
          </a>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Projects</p>
            <h2>Projects</h2>
          </div>
          <p className="section-copy">
            Real tools I use and maintain, with the public view tuned for
            friends, collaborators, and recruiters.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.slug} className="project-card">
              <div className="project-card-topline">
                <span className="project-mode">{project.public_mode}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.public_summary}</p>
              <div className="project-links">
                {project.public_mode !== "source" ? (
                  <Link href={`/projects/${project.slug}`}>{primaryLabel(project.public_mode)}</Link>
                ) : null}
                {project.repo_url ? (
                  <a href={project.repo_url} target="_blank" rel="noreferrer">
                    Source
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </main>
  );
}
