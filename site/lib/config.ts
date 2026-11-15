// Site-wide constants. SITE.url is the one place the public address lives: canonical URLs,
// Open Graph images and the sitemap are all built from it.
export const SITE = {
  url: "https://colourful.pictures",
  name: "colourful.pictures",
  lang: "en",
} as const;

export const absoluteUrl = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`);
