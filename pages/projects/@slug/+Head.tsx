import type { Project } from "../../../site/lib/types";
import { PageHead } from "../../../site/components/PageHead";

export const Head = ({ data }: { data: { project: Project } }) => <PageHead project={data.project} path={`/projects/${data.project.slug}`} />;
