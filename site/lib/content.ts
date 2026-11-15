import type { Project } from "./types";

// Every site/content/projects/<slug>.json becomes /projects/<slug>.
const files = import.meta.glob<Project>("../content/projects/*.json", { eager: true, import: "default" });
export const projects: Record<string, Project> = Object.fromEntries(Object.values(files).map((p) => [p.slug, p]));
