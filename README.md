# Command Center

Personal analytics dashboard for Studio Harel, Ordi, and Ordi Store, built with React + Vite +
Tailwind CSS. Data comes from the Google Analytics Data API (GA4) via Vercel Serverless Functions.

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

Push to the connected Git repo, or run `vercel --prod`. Set the env vars from
`.env.example` in the Vercel project settings (Production + Preview).

## Environment variables

- `GA4_CLIENT_EMAIL` — service account client_email
- `GA4_PRIVATE_KEY` — service account private_key (keep the `\n` escapes)
- `GA4_PROPERTY_ID_HAREL` — `properties/549635376`
- `GA4_PROPERTY_ID_ORDI` — `properties/550143276`
- `GA4_PROPERTY_ID_ORDISTORE` — `properties/<numeric property ID>` (Admin → Property Settings → Property ID, not the `G-...` Measurement ID). Also make sure the service account (`GA4_CLIENT_EMAIL`) is added as a Viewer under this property's Property Access Management, same as the other two.
