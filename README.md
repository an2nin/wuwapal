![WuwaPal banner](public/banner.png)

# WuwaPal

WuwaPal is a fan-made Wuthering Waves convene tracker that helps you monitor pity, pull logs, and banner stats, with optional sync and backup workflows. This repo powers https://wuwapal.com.

WuwaPal is not affiliated with or endorsed by Kuro Games.

## Features

- Track gacha pity, pull history, and banner statistics
- Import convene history from PC, Android, or iOS workflows
- Multi-account management and collector views
- Local-first storage with file and Google Drive backups
- Global stats and shareable summaries

## Tech Stack

- Next.js App Router + React 19
- Tailwind CSS v4
- Dexie (IndexedDB) + TanStack Query

## Getting Started

Prerequisites: Node.js 18+ and npm.

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5550 to see the app.

## Environment Variables

Set these in `.env.local`:

- `NEXT_PUBLIC_APP_NAME` - display name shown in the UI
- `NEXT_PUBLIC_APP_DOMAIN` - display suffix (for example, `com`)
- `NEXT_PUBLIC_NODE_ENV` - `dev`, `prod`, or `test`
- `NEXT_PUBLIC_API_URL` - API base URL
- `NEXT_PUBLIC_AUTH_REDIRECT_URL` - OAuth redirect URL
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - optional, required for Google Drive sync

## Scripts

- `npm run dev` - run the dev server on `localhost:5550`
- `npm run build` - build the production bundle
- `npm run start` - serve the production build
- `npm run lint` - run ESLint
- `npm run lint:fix` - apply safe ESLint fixes

## Project Structure

- `app/(routes)` - Next.js route entries
- `app/features` - feature bundles
- `app/shared` - shared UI, hooks, stores, utilities
- `app/lib` - metadata, env validation, API helpers, Dexie db
- `app/data` - static lookup data powering UI state

## Contributing

Please read `CONTRIBUTING.md` and follow the repository conventions before opening a pull request.

## Code of Conduct

This project follows the Contributor Covenant in `CODE_OF_CONDUCT.md`.

## Security

If you discover a security issue, follow the guidance in `SECURITY.md`.

## License

Licensed under the MIT License. See `LICENSE`.
