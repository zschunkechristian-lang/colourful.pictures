import type { PageContextServer } from "vike/types";
import type { SiteData } from "../../../site/lib/types";
import { projects } from "../../../site/lib/content";
import site from "../../../site/content/site.json";

export const data = async (pageContext: PageContextServer) => {
  const slug = (pageContext.routeParams as { slug: string }).slug;
  const project = projects[slug];
  if (!project) throw new Error(`No project content for "${slug}"`);
  return { project, site: site as unknown as SiteData };
};
