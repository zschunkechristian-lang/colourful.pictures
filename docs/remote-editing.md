# Editing the site without the dev server

`https://edit.colourful.pictures` is the same editor you get from `npm run dev`, served from
Cloudflare behind **Cloudflare Access**. Saving does not touch the live site: every save is a
commit on the branch `cms/edit`, collected in **one open pull request**. Merging that pull
request publishes.

```
browser ──Access login──▶ edit.colourful.pictures
                            ├─ static editor build (dist-edit/)
                            └─ /__cms/*  Worker (worker/index.ts)
                                  1. Access token valid for this app + allowed email?
                                  2. same-origin, x-cms header, size limit
                                  3. slug allow-list + zod schema (same code as the dev server)
                                  4. commit to branch cms/edit  ─▶  pull request ─▶ you merge ─▶ live
```

What lives where:

| File | Role |
| --- | --- |
| `site/editor/server/core.ts` | the routes and all validation, shared by dev server and Worker |
| `site/editor/server/cms-plugin.ts` | dev server: localhost guard + files on disk |
| `worker/index.ts` | edit Worker: Access check + routes + GitHub |
| `worker/access.ts` | verifies the Access JWT (RS256, audience, issuer, expiry, email list) |
| `worker/github-store.ts` | branch + commit + pull request through the GitHub API |
| `wrangler.edit.jsonc` | the Worker's config (name, route, bindings, variables) |
| `npm run build:edit` | builds the editor-enabled site into `dist-edit/` (the public build never contains the editor) |

## One-time setup

Do these in order. Step 3 comes before the Worker is reachable so there is never an unprotected window
(the Worker refuses unauthenticated calls on its own, but Access should be the first gate).

### 1. GitHub

1. **Fine-grained personal access token**: Settings > Developer settings > Fine-grained tokens.
   - Repository access: *Only select repositories* > this repository.
   - Permissions: **Contents: Read and write**, **Pull requests: Read and write**. Nothing else.
   - Expiry: 1 year (put a reminder in your calendar).
2. Repository settings:
   - *General > Automatically delete head branches*: on (so `cms/edit` starts fresh after each merge;
     the Worker also fast-forwards a leftover branch itself).
   - *Branches > protect `main`*: require a pull request before merging. The token then cannot publish
     even if it leaks.

### 2. Cloudflare Worker

1. Fill in `wrangler.edit.jsonc`: `bucket_name` (your R2 bucket), `ALLOWED_EMAILS`,
   and later `ACCESS_TEAM_DOMAIN` / `ACCESS_AUD` (step 3).
2. First deploy:
   ```bash
   npm run build:edit
   npx wrangler deploy -c wrangler.edit.jsonc
   npx wrangler secret put GITHUB_TOKEN -c wrangler.edit.jsonc
   ```
   `workers_dev` and preview URLs are off, so the Worker answers only on `edit.colourful.pictures`.

### 3. Cloudflare Access

Zero Trust dashboard > Access > Applications > **Add > Self-hosted**:

- Application domain: `edit.colourful.pictures` (whole hostname, no path).
- Policy: **Allow**, include *Emails* = your address. No "everyone", no email-domain rules.
- Login method: One-time PIN (or Google).
- Session duration: 24 h is plenty.

Then copy two values into `wrangler.edit.jsonc` and deploy again:

- **AUD tag**: the application's Overview tab > *Application Audience (AUD) Tag* > `ACCESS_AUD`.
- **Team domain**: Settings > Custom pages, e.g. `yourteam.cloudflareaccess.com` > `ACCESS_TEAM_DOMAIN`.

Until both are set the save API refuses everything (fail closed).

### 4. Automatic deploys (optional but recommended)

Workers & Pages > create a second Worker from the same Git repository:

- Name: `colourful-pictures-edit`
- Build command: `npm run build:edit`
- Deploy command: `npx wrangler deploy -c wrangler.edit.jsonc`

so the edit site always contains the latest pages after a merge (a new project is editable only after
that). For the public site, enable *non-production branch builds* so the `cms/edit` branch gets a
preview deployment: that is the preview you check before merging.

## Using it

1. Open `https://edit.colourful.pictures/projects/<slug>?edit` (the **Edit** button at the bottom right
   works too), log in once via Access.
2. Edit, press **Save** (⌘S). The toolbar shows *Saved to pull request* and a **PR ↗** link.
3. Check the preview deployment of `cms/edit`, merge the pull request. The public site rebuilds.

Behaviour worth knowing:

- **The editor always loads the latest saved state** (from `cms/edit` if it exists, else `main`), not
  what the edit site was built with, so earlier un-merged edits are never overwritten by stale ones.
- **New project**: created on the pull request. Its page exists on the edit site only after the merge
  and the edit-site redeploy.
- **Refresh media** lists the R2 bucket through the Worker's `MEDIA` binding and commits the manifest
  to the same branch. Uploading files to R2 still happens from your machine (rclone).
- **Conflicts**: saves replace whole files. If you (or Claude) change the same project on `main` while
  `cms/edit` has unmerged edits, GitHub will show a conflict on the pull request; resolve it there, or
  merge/close the pull request before editing the same file elsewhere.
- The dev server still works exactly as before (`npm run dev`, `/projects/<slug>?edit`) and writes
  to local files.

## Safety summary

- Access (edge) in front, **and** the Worker re-verifies the Access token (signature, audience, issuer,
  expiry) and an email allow-list, so a misconfigured Access app or a stray hostname still gets 403.
- The token can only write to this repository and cannot reach `main` directly (branch protection).
- The Worker writes only `site/content/projects/<slug>.json`, `site/content/pages/{home,info,play}.json`,
  `site/content/site.json` and `site/content/media-manifest.json`, each validated against the zod
  schema. Slugs are `[a-z0-9-]+`.
- Every POST needs a same-origin request with the `x-cms: 1` header.
- GitHub error bodies are never returned to the browser.
- To lock everything: delete the Access application (the hostname stops answering) or revoke the token.
