// Validates every content file against the schema and checks it round-trips byte-identically.
//   node --experimental-strip-types scripts/check-content.mjs   (or: npx tsx)
import fs from "node:fs";
import path from "node:path";
import { projectSchema, siteSchema, serializeProject, serializeSite } from "../site/lib/schema.ts";

const dir = "site/content";
let bad = 0;
const check = (file, schema, ser) => {
  const raw = fs.readFileSync(file, "utf8");
  const r = schema.safeParse(JSON.parse(raw));
  if (!r.success) { bad++; console.log("INVALID", file, JSON.stringify(r.error.issues.slice(0, 3))); return; }
  if (process.argv.includes("--write")) fs.writeFileSync(file, ser(r.data));
  else if (ser(r.data) !== raw) { bad++; console.log("NOT BYTE-IDENTICAL", file); return; }
  console.log("ok", file);
};
for (const f of fs.readdirSync(path.join(dir, "projects"))) check(path.join(dir, "projects", f), projectSchema, serializeProject);
check(path.join(dir, "site.json"), siteSchema, serializeSite);
for (const f of fs.readdirSync(path.join(dir, "pages"))) check(path.join(dir, "pages", f), projectSchema, serializeProject);
process.exit(bad ? 1 : 0);
