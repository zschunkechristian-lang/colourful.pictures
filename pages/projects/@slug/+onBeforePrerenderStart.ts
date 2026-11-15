import { projects } from "../../../site/lib/content";

export const onBeforePrerenderStart = () => Object.keys(projects).map((slug) => `/projects/${slug}`);
