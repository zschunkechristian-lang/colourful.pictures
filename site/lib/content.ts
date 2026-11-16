import type { Project } from "./types";

// Every site/content/projects/<slug>.json becomes /projects/<slug>.
const files = import.meta.glob<Project>("../content/projects/*.json", { eager: true, import: "default" });
export const projects: Record<string, Project> = Object.fromEntries(Object.values(files).map((p) => [p.slug, p]));

// Home, Info and Play: same file shape as a project (sections), kept apart so they are not served under /projects.
const pageFiles = import.meta.glob<Project>("../content/pages/*.json", { eager: true, import: "default" });
export const pages: Record<string, Project> = Object.fromEntries(Object.values(pageFiles).map((p) => [p.slug, p]));
