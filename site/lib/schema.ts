// The shape of all editable content. This is the single source of truth: the TypeScript
// types are inferred from it, and the dev-only save endpoint validates every write
// against it, so a bad edit can never leave a project file in a broken state.
import { z } from "zod";

export const spanSchema = z.number().int().min(1).max(12);

const still = z.strictObject({
  kind: z.literal("still"),
  project: z.string().min(1),
  n: z.string().min(1),
  optimize: z.literal(false).optional(),
});
const video = z.strictObject({
  kind: z.literal("video"),
  project: z.string().min(1),
  type: z.enum(["header", "master", "clip"]),
  n: z.string().min(1).optional(),
});
export const mediaSchema = z.discriminatedUnion("kind", [still, video]);

/** A slot is either filled or an empty placeholder (`media: null`) waiting for the editor. */
export const cellSchema = z.strictObject({
  span: spanSchema,
  media: mediaSchema.nullable(),
  position: z.string().optional(), // CSS object-position, e.g. "50% 20%"
});

const id = z.string().regex(/^[a-z0-9]{6,12}$/);

export const sectionSchema = z.discriminatedUnion("type", [
  z.strictObject({ id, type: z.literal("hero"), media: mediaSchema.nullable(), title: z.string(), intro: z.array(z.string()), credit: z.string() }),
  // empty `project` = film slot not filled yet (editor placeholder; renders nothing in the site)
  z.strictObject({ id, type: z.literal("film"), project: z.string(), file: z.string().optional() }),
  z.strictObject({ id, type: z.literal("credits"), items: z.array(z.strictObject({ label: z.string(), value: z.array(z.string()) })) }),
  z.strictObject({
    id,
    type: z.literal("statement"),
    from: spanSchema,
    to: spanSchema,
    align: z.enum(["start", "center", "end"]),
    text: z.string(),
  }).refine((s) => s.to >= s.from, "to must not be before from"),
  z.strictObject({ id, type: z.literal("carousel"), frames: z.array(z.string().min(1)), project: z.string().optional() }),
  z.strictObject({ id, type: z.literal("row"), window: z.number().int().optional(), cells: z.array(cellSchema).min(1) }),
  z.strictObject({ id, type: z.literal("feature"), title: z.string(), media: mediaSchema.nullable() }),
  z.strictObject({
    id,
    type: z.literal("closing"),
    text: z.string(),
    link: z.strictObject({ href: z.string(), label: z.string() }).optional(),
  }),
  z.strictObject({ id, type: z.literal("aside"), text: z.string() }),
]);

export const projectSchema = z.strictObject({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().optional(),
  description: z.string().optional(),
  sections: z.array(sectionSchema),
});

export const tileSchema = z.strictObject({
  href: z.string().optional(),
  title: z.array(z.string()).min(1),
  titleAlign: z.literal("start").optional(),
  span: spanSchema,
  media: mediaSchema,
});
export const siteSchema = z.strictObject({
  projectGrid: z.array(z.strictObject({ window: z.number().int().optional(), tiles: z.array(tileSchema).min(1) })),
  footer: z.strictObject({
    contact: z.strictObject({ heading: z.string(), links: z.array(z.strictObject({ href: z.string(), label: z.string() })) }),
    philosophy: z.strictObject({ heading: z.string(), paragraphs: z.array(z.string()) }),
  }),
});

export type Media = z.infer<typeof mediaSchema>;
export type Still = Extract<Media, { kind: "still" }>;
export type Video = Extract<Media, { kind: "video" }>;
export type Cell = z.infer<typeof cellSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type SectionType = Section["type"];
export type Project = z.infer<typeof projectSchema>;
export type Tile = z.infer<typeof tileSchema>;
export type SiteData = z.infer<typeof siteSchema>;

export const newId = () => crypto.randomUUID().replace(/-/g, "").slice(0, 8);

/** Canonical on-disk form: stable key order from the schema, 2-space indent, trailing newline (clean git diffs). */
export const serializeProject = (p: Project) => JSON.stringify(projectSchema.parse(p), null, 2) + "\n";
