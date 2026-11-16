import type { SiteData } from "../../site/lib/types";
import { pages } from "../../site/lib/content";
import site from "../../site/content/site.json";

export const data = async () => {
  const project = pages.play;
  if (!project) throw new Error('No page content for "play"');
  return { project, site: site as unknown as SiteData };
};
