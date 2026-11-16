import { ProjectPage } from "./ProjectPage";

const CURRENT: Record<string, string> = { home: "/", play: "/play", info: "/info" };

/** The one Page component of every content route. It has to be the same function for all of them:
 *  that is what lets React keep the sidebar mounted while the content changes on navigation. */
export default function RoutePage({ data }: { data: Parameters<typeof ProjectPage>[0] }) {
  return <ProjectPage project={data.project} site={data.site} current={CURRENT[data.project.slug]} />;
}
