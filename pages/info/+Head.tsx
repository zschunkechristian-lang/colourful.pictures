import type { Project } from "../../site/lib/types";
import { PageHead } from "../../site/components/PageHead";
import { SITE, absoluteUrl } from "../../site/lib/config";

export const Head = ({ data }: { data: { project: Project } }) => (
  <PageHead
    project={data.project}
    path="/info"
    jsonLd={{ "@context": "https://schema.org", "@type": "WebPage", name: data.project.title ?? SITE.name, url: absoluteUrl("/info") }}
  />
);
