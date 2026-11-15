// Shared <head> metadata: title, description, canonical URL, Open Graph / Twitter cards,
// robots and JSON-LD. (charset and viewport come from renderer/+onRenderHtml.tsx.) Pages on the new system render this from their +Head.tsx.
import { masterUrls, stillUrl, videoUrls } from "../lib/assets";
import { SITE, absoluteUrl } from "../lib/config";
import type { Media, Project } from "../lib/types";

export type SeoProps = {
  title: string;
  description?: string;
  /** path on the site, e.g. "/projects/galvany" (used for the canonical URL) */
  path: string;
  image?: { url: string; alt?: string };
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
};

export function mediaImage(m: Media | null | undefined): { url: string; alt?: string } | undefined {
  if (!m) return undefined;
  if (m.kind === "still") return { url: stillUrl(m), alt: m.alt };
  const poster = m.type === "master" ? masterUrls(m.project, m.n).poster : videoUrls(m).poster;
  return { url: poster, alt: m.alt };
}

/** The link-preview image of a project: its own `image`, else the hero media. */
export function projectImage(p: Project) {
  const hero = p.sections.find((s) => s.type === "hero");
  return mediaImage(p.image) ?? mediaImage(hero?.type === "hero" ? hero.media : null);
}

export function Seo({ title, description, path, image, noindex, jsonLd }: SeoProps) {
  const url = absoluteUrl(path);
  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {image && (
        <>
          <meta property="og:image" content={image.url} />
          {image.alt && <meta property="og:image:alt" content={image.alt} />}
          <meta name="twitter:image" content={image.url} />
        </>
      )}
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </>
  );
}

/** schema.org description of a project page, for search engines. */
export function projectJsonLd(p: Project, image?: { url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title ?? p.slug,
    ...(p.description ? { description: p.description } : {}),
    url: absoluteUrl(`/projects/${p.slug}`),
    ...(image ? { image: image.url } : {}),
    creator: { "@type": "Person", name: "Christian Zschunke", url: SITE.url },
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
  };
}
