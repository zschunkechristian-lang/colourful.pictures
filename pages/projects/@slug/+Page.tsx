import { ProjectPage } from "../../../site/components/ProjectPage";

export default function Page({ data }: { data: Parameters<typeof ProjectPage>[0] }) {
  return <ProjectPage project={data.project} site={data.site} />;
}
