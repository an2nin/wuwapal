# Repository Guidelines

## Project Structure & Module Organization

Source lives in `app/` using the Next.js App Router. Route entries sit in `app/(routes)` (home, `convene`, `convene/import`, `convene/banner`, `collectors-hub`, `settings`, `privacy-policy`, `og`). Feature bundles live in `app/features/*` (notably auth, backups, account manager, import-pulls, tracker-banner, tracker-summary, collectors-hub, hub, advanced-settings). Shared UI/hooks/stores/utilities live in `app/shared/*`, with reusable primitives under `app/shared/components/ui`. Core services (env validation, metadata, API client/types/endpoints, Dexie db, converters) live in `app/lib/*`. Static game/app definitions are primarily in `app/shared/constants/*` (the `app/data` directory is currently unused). Public assets live in `public/`, and global theme tokens/styles are defined in `app/(routes)/globals.css`.

## Build, Test, and Development Commands

Use Node 18+ and npm. `npm run dev` launches the dev server with Turbopack at `http://localhost:5550`. `npm run build` creates the production bundle (static export via `next.config.ts`); `npm run start` serves the build for local verification when needed. `npm run lint` runs ESLint across the repo; `npm run lint:fix` applies safe fixes. Run lint before opening a PR, and run a build when changing routes/config/export-sensitive behavior.

## Coding Style & Naming Conventions

TypeScript is strict; prefer typed props and return values, especially around API payloads, stores, and import processors. The `@/*` alias resolves to `app/*`; import from features/shared via that alias to avoid relative-path churn. JSX uses two-space indentation; keep components small and server-first unless client hooks are needed. Tailwind CSS (v4) powers styling; reuse shared UI primitives and existing utility patterns before adding new variants. Follow ESLint guidance from `@antfu/eslint-config`; avoid disabling rules unless scoped and justified.

## Testing Guidelines

There is no automated test suite yet. At minimum, run `npm run lint` and manually exercise the affected flows before submitting changes (for example: `convene/import`, banner stats/summary pages, collectors hub filtering/dialogs, settings/account manager, and backups/cloud sync if touched). Run `npm run build` for route/export/config changes. When adding new logic, include lightweight checks (types, guards, validators) close to data entry points (API responses, import parsing, Dexie writes). If you introduce a testing tool, document how to run it in this guide.

## Commit & Pull Request Guidelines

Commit history follows a Conventional Commit style (`feat(scope): …`). Keep commits focused and descriptive; avoid mixing refactors with feature work. For PRs, include a short summary, linked issue or context, screenshots for UI changes, and a note on how you validated the change (commands run, manual steps). Flag breaking changes or schema tweaks in the description so reviewers can verify downstream impact.

## Configuration & Environment Tips

Environment variables are validated via `app/lib/env.ts`. Use `.env.example` as the template and ensure required `NEXT_PUBLIC_*` values are set before running the app: `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_DOMAIN`, `NEXT_PUBLIC_NODE_ENV`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_NEW_API_URL`, and `NEXT_PUBLIC_AUTH_REDIRECT_URL`; `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is optional and only needed for Google Drive sync. The local dev redirect URL should match the current dev port (`http://localhost:5550`). Do not commit secrets or production data. When updating static constants (primarily under `app/shared/constants/*`), keep ordering and object shapes consistent to avoid cache/state drift across features.
