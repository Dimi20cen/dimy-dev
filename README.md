# dimy.dev

Minimal personal portfolio built with Next.js (App Router).
Project content is driven by a generated export from private HQ.

## Content model

The homepage intentionally stays simple:
- Name
- Photo
- Summary
- Links (GitHub, LinkedIn)
- Projects (from `data/projects.generated.json`, ordered by `sort_order`)
  Each exported project must be in `demo` or `full` mode and include a valid public `primary_url`.
- Dynamic project detail pages under `app/projects/[slug]/page.tsx`

Core files:
- `app/page.tsx`: homepage content and project cards
- `data/projects.generated.json`: sanitized project export from HQ
- `data/projects.ts`: project types and selectors
- `scripts/sync-projects-from-hq.mjs`: validate and sync the HQ export into `data/`
- `app/globals.css`: styling/theme
- `public/photo.png`: profile photo

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Run the full release gate:

```bash
npm run gate
```

## Sync projects from HQ

After exporting the project catalog from HQ, sync the generated file into this repo:

```bash
npm run sync-projects
```

Defaults:
- source: `../HQ/runtime/projects/projects.generated.json`
- target: `data/projects.generated.json`

Optional manual paths:

```bash
node scripts/sync-projects-from-hq.mjs /path/to/source.json /path/to/target.json
```

## Tests

This repo includes a lightweight smoke test in `tests/smoke.test.mjs` that checks
the homepage source, generated project data, dynamic project route, and HQ sync script.
