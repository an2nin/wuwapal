# Contributing to WuwaPal

Thanks for taking the time to contribute. Please read this guide before opening
an issue or pull request.

## Quick Start

1. Fork the repo and create a feature branch.
2. Install dependencies:

```bash
npm install
```

3. Copy the environment template and fill in values:

```bash
cp .env.example .env.local
```

4. Run the dev server at http://localhost:5550:

```bash
npm run dev
```

## Project Layout

- `app/(routes)` - route entries
- `app/features` - feature bundles
- `app/shared` - shared UI, hooks, stores, utilities
- `app/core` - metadata, env validation, API helpers, Dexie db
- `app/data` - static lookup data that powers UI state

## Coding Standards

- TypeScript is strict; prefer typed props and return values.
- Use the `@/` alias for `app/*` imports.
- Keep components small and server-first unless client hooks are required.
- Tailwind CSS v4 powers styling. Reuse existing tokens and extend
  `app/(routes)/globals.css` when adding new primitives.
- Follow ESLint guidance from `@antfu/eslint-config`; avoid disabling rules.

## Validation

Run lint before opening a PR:

```bash
npm run lint
```

There is no automated test suite yet. Please exercise the affected flows
manually (convene tracking, account manager, backups, imports) and describe your
validation steps in the PR.

## Data Updates

When updating static data in `app/data`, keep ordering and shape consistent to
avoid cache and state drift across features.

## Pull Requests

- Keep PRs focused and describe the why and how.
- Include screenshots for UI changes.
- Use Conventional Commit style (`feat(scope): ...`) for commit messages.
