# Hostinger deployment

This package keeps the existing React UI, service content, images, Express API and Nodemailer flow, but fixes the production prerender/SEO build.

## Local validation

```bash
npm install
npm run build
npm start
```

Expected build ending:

- `Prerendered 29 SEO routes.`
- `SEO check passed for 29 prerendered pages.`

## Hostinger

- Framework: Express
- Node: 22.x
- Root directory: `./`
- Build command: `npm run build`
- Start command: `npm start`

Environment variables:

```text
NODE_ENV=production
MAIL_USER=integralwebsolution@gmail.com
MAIL_APP_PASSWORD=<real Gmail app password>
ADMIN_EMAILS=poojagasstoveservice@gmail.com,princekumarjha80@gmail.com
ALLOWED_ORIGINS=https://YOUR-FINAL-DOMAIN
```

Do not set a fixed production `PORT`; Hostinger supplies it.

Optional public build variables:

```text
VITE_ENABLE_ADSENSE=false
VITE_ADSENSE_CLIENT=
VITE_GOOGLE_SITE_VERIFICATION=
```

Never put mail passwords in a `VITE_` variable or commit `.env`.


## Important Hostinger runtime setting

Use these exact values:

- Framework: Express
- Node version: 22.x
- Root directory: `./`
- Package manager: npm
- Entry file: `server.js`

The root `server.js` is intentionally a small production launcher that imports
the existing Express app from `server/index.js`. Do not set the Hostinger entry
file to `index.js` or `server/index.js` for this package.
