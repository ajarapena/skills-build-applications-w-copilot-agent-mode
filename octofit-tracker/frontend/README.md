# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API requests use:

```text
https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/[component]/
```

When it is not set, the app safely falls back to `http://localhost:8000` and calls `/api/[component]/` paths.

## Scripts

- `npm run dev` starts Vite on port `5173`.
- `npm run build` creates the production build.
- `npm run lint` runs Oxlint.
