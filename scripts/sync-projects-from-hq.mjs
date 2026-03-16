import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const defaultSource = resolve(repoRoot, "../HQ/runtime/projects/projects.generated.json");
const defaultTarget = resolve(repoRoot, "data/projects.generated.json");

const sourcePath = process.argv[2] ? resolve(process.argv[2]) : defaultSource;
const targetPath = process.argv[3] ? resolve(process.argv[3]) : defaultTarget;
const allowedModes = new Set(["none", "docs", "demo", "full"]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function validateProject(project, index) {
  const prefix = `Project ${index + 1}`;
  assert(project && typeof project === "object" && !Array.isArray(project), `${prefix} must be an object.`);
  assert(typeof project.slug === "string" && project.slug.trim().length > 0, `${prefix} is missing slug.`);
  assert(typeof project.title === "string" && project.title.trim().length > 0, `${prefix} is missing title.`);
  assert(
    typeof project.public_summary === "string" && project.public_summary.trim().length > 0,
    `${prefix} is missing public_summary.`
  );
  assert(typeof project.public_mode === "string" && allowedModes.has(project.public_mode), `${prefix} has invalid public_mode.`);
  assert(typeof project.primary_url === "string", `${prefix} primary_url must be a string.`);
  assert(typeof project.repo_url === "string", `${prefix} repo_url must be a string.`);
  assert(Number.isInteger(project.sort_order), `${prefix} sort_order must be an integer.`);
  assert(project.public_mode !== "none", `${prefix} should not appear in the public export with mode 'none'.`);
}

function main() {
  const raw = readFileSync(sourcePath, "utf8");
  const data = JSON.parse(raw);
  assert(Array.isArray(data), "HQ project export must be a JSON array.");
  assert(data.length > 0, "HQ project export is empty.");

  const slugs = new Set();
  data.forEach((project, index) => {
    validateProject(project, index);
    assert(!slugs.has(project.slug), `Duplicate project slug '${project.slug}'.`);
    slugs.add(project.slug);
  });

  copyFileSync(sourcePath, targetPath);

  // Rewrite with trailing newline to keep the generated file stable across sources.
  const synced = JSON.stringify(data, null, 2);
  writeFileSync(targetPath, `${synced}\n`, "utf8");

  console.log(`Synced ${data.length} projects from ${sourcePath} to ${targetPath}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
