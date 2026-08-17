# Command Center

Personal analytics dashboard for Studio Harel and Ordi, built with React + Vite + Tailwind CSS
and Material Design 3 dark theme. Data comes from the Google Analytics Data API (GA4) via
Vercel Serverless Functions.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in GA4_CLIENT_EMAIL and GA4_PRIVATE_KEY from your service account
```

## Development

Vercel Functions aren't served by plain `vite`. Use the Vercel CLI for local dev so `/api/*` works:

```bash
npm i -g vercel
vercel dev
```

Or run `npm run dev` for frontend-only work against a deployed API.

## Deploy

Push to the connected Git repo, or run `vercel --prod`. Set the four env vars from
`.env.example` in the Vercel project settings (Production + Preview).

## Environment variables

- `GA4_CLIENT_EMAIL` — service account client_email
- `GA4_PRIVATE_KEY` — service account private_key (keep the `\n` escapes)
- `GA4_PROPERTY_ID_HAREL` — `properties/549635376`
- `GA4_PROPERTY_ID_ORDI` — `properties/550143276`
