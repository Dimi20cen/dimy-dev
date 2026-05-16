# Dimitris Portfolio

Personal portfolio site for Dimitris, built with Astro.

## What Is Inside

- Homepage with profile, featured projects, work, and education sections
- Projects page generated from Markdown content
- Shared data files for profile and experience content
- Static assets for screenshots and site branding

## Project Structure

```text
src/components/        Reusable Astro components
src/content/projects/  Project case studies
src/data/              Profile and experience data
src/layouts/           Page layouts
src/pages/             Site routes
src/styles/            Global CSS
public/                Static public assets
```

## Commands

Install dependencies:

```sh
npm install
```

Run locally:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Editing Content

- Update personal details in `src/data/profile.json`
- Update work and education entries in `src/data/experience.json`
- Add or edit projects in `src/content/projects/`
