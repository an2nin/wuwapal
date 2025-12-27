# Repository Guidelines

## Project Structure & Module Organization

Source lives in `app/` using the Next.js App Router. Route entries sit in `app/(routes)`, with feature bundles under `app/features/*` and shared UI/hooks/stores/utilities in `app/shared/*`. Core services (metadata, env validation, API helpers, Dexie db) live in `app/lib/*`. Static lookup data sits in `app/data` and drives UI state; keep formats stable when updating definitions. Public assets live in `public/`, and global theme tokens are defined in `app/(routes)/globals.css`.

## Build, Test, and Development Commands

Use Node 18+ and npm. `npm run dev` launches the dev server with Turbopack at `localhost:3000`. `npm run build` creates the production bundle; `npm run start` serves that build. `npm run lint` runs ESLint across the repo; `npm run lint:fix` applies safe fixes. Run lint before opening a PR to catch regressions early.

## Coding Style & Naming Conventions

TypeScript is strict; prefer typed props and return values. The `@/*` alias resolves to `app/*`; import from features/shared via that alias to avoid relative-path churn. JSX uses two-space indentation; keep components small and server-first unless client hooks are needed. Tailwind CSS (v4) powers styling—reuse existing tokens/classes and extend `globals.css` when adding theme primitives. Follow ESLint guidance from `@antfu/eslint-config`; avoid disabling rules unless scoped and justified.

## Testing Guidelines

There is no automated test suite yet. At minimum, run `npm run lint` and exercise the affected flows manually (e.g., convene tracking, account manager, backups) before submitting changes. When adding new logic, include lightweight checks (types, guards, or data validators) close to the data entry points. If you introduce a testing tool, document how to run it in this guide.

## Commit & Pull Request Guidelines

Commit history follows a Conventional Commit style (`feat(scope): …`). Keep commits focused and descriptive; avoid mixing refactors with feature work. For PRs, include a short summary, linked issue or context, screenshots for UI changes, and a note on how you validated the change (commands run, manual steps). Flag breaking changes or schema tweaks in the description so reviewers can verify downstream impact.

## Configuration & Environment Tips

Environment variables are validated via `app/lib/env.ts`; ensure `.env.local` includes required `NEXT_PUBLIC_*` values before running the app. Do not commit secrets or production data. When updating static data in `app/data`, keep ordering and shape consistent to avoid cache/state drift across features.
