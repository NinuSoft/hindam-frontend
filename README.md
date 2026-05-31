# Hindam Frontend

A standalone frontend application for the Hindam project.

## Run & Operate

- `pnpm dev` — Run the development server (runs on port 8080 by default)
- `pnpm build` — Build the production static bundle (outputs to `dist/public`)
- `pnpm serve` — Preview the production bundle locally
- `pnpm run typecheck` — Run TypeScript type checking

## Environment Variables

You can configure the development and preview servers using the following environment variables:

- `PORT` (default: `8080`): The port on which the development or preview server will run.
- `BASE_PATH` (default: `/`): The base path of the application (e.g., `/app/`).

Example usage:
```bash
PORT=3000 pnpm dev
```

## Tech Stack

- React 19
- Vite 7
- TailwindCSS 4
- TypeScript 5.9

