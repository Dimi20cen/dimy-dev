import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const homeSource = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const projectRouteSource = readFileSync(
  new URL("../app/projects/[slug]/page.tsx", import.meta.url),
  "utf8"
);
const syncScriptSource = readFileSync(
  new URL("../scripts/sync-projects-from-hq.mjs", import.meta.url),
  "utf8"
);
const projectsJson = JSON.parse(
  readFileSync(new URL("../data/projects.generated.json", import.meta.url), "utf8")
);

test("homepage keeps core sections and data-driven project rendering", () => {
  const requiredText = [
    "Dimitris",
    "Product Engineer",
    "Projects",
    "GitHub",
    "LinkedIn",
    "getPublicProjects"
  ];

  for (const text of requiredText) {
    assert.ok(homeSource.includes(text), `Missing required text: ${text}`);
  }

  assert.ok(homeSource.includes('project.public_mode !== "source"'));
  assert.ok(!homeSource.includes('if (mode === "source") return "Source Code";'));
});

test("generated project export includes valid public projects", () => {
  assert.ok(Array.isArray(projectsJson), "Expected an exported projects array");
  assert.ok(projectsJson.length >= 2, "Expected at least two public projects");
  assert.ok(projectsJson.every((project) => project.public_mode !== "hidden"));
  assert.ok(projectsJson.every((project) => ["demo", "full", "source"].includes(project.public_mode)));
  assert.ok(
    projectsJson.every((project) =>
      project.public_mode === "source" ? typeof project.primary_url === "string" : /^https?:\/\//.test(project.primary_url)
    )
  );
  assert.ok(
    projectsJson.every((project) =>
      project.public_mode === "source" ? /^https?:\/\//.test(project.repo_url) : typeof project.repo_url === "string"
    )
  );
  assert.ok(projectsJson.some((project) => project.slug === "rentpredictor"));
});

test("dynamic project route supports public project pages", () => {
  assert.ok(projectRouteSource.includes("generateStaticParams"));
  assert.ok(projectRouteSource.includes("notFound()"));
  assert.ok(projectRouteSource.includes('project.public_mode === "full"'));
  assert.ok(projectRouteSource.includes('project.public_mode === "source"'));
  assert.ok(!projectRouteSource.includes("iframe"));
});

test("sync script validates the HQ export before overwriting local data", () => {
  assert.ok(syncScriptSource.includes("validateProject"));
  assert.ok(syncScriptSource.includes("Duplicate project slug"));
  assert.ok(syncScriptSource.includes("full http/https URL"));
  assert.ok(syncScriptSource.includes('"source"'));
});
