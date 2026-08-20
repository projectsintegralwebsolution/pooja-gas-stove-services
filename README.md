# Pooja Gas Stove Services — React SEO + AdSense-Ready Edition

This project is the upgraded React/Vite website for `poojagasstoveservice.com`.

## What is included

- React + Vite + React Router
- Static prerendering of every public SEO route during `npm run build`
- Unique page title, meta description and requested meta keywords per page
- Canonical URL, robots directives, Googlebot directives and `en-IN` alternate tags
- Open Graph + Twitter social metadata with a 1200×630 sharing image
- JSON-LD on every page plus LocalBusiness, WebSite, Service, BreadcrumbList, Article and FAQ markup where relevant
- Exactly one content H1 per public page, structured H2/H3 hierarchy and semantic article/section markup
- Natural local coverage for Nalasopara, Virar, Vasai, Naigaon, Bhayandar, Mira Road, Dahisar, Borivali and Palghar
- One useful Service Areas hub instead of thin duplicate city doorway pages
- Original educational guides to strengthen useful-content depth
- Privacy Policy, Cookie Policy, Terms of Use, Disclaimer and Content & Editorial Policy
- Sitemap, robots.txt, favicon, web manifest and Hostinger/Apache SPA fallback
- Conditional AdSense loader that stays OFF until a real publisher ID is supplied
- Automatic post-build SEO audit (`scripts/seo-check.mjs`)

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

`npm run build` first creates the Vite build, then prerenders all SEO routes into their own HTML files, then checks each route for title, description, canonical, OG tags, schema and exactly one H1.

Upload the generated `dist` contents to the web root on Hostinger.

## Google Search Console

Copy `.env.example` to `.env` and add the Search Console verification token when Google gives it to you:

```env
VITE_GOOGLE_SITE_VERIFICATION=your-token
```

Rebuild and deploy, then submit:

`https://poojagasstoveservice.com/sitemap.xml`

## AdSense — important before enabling

Approval cannot be guaranteed by code. Google reviews the complete live site, content, navigation and policy compliance.

1. Keep the site fully live, crawlable and free of broken/under-construction pages.
2. Use the included About, Contact, Privacy, Cookie, Terms, Disclaimer and Editorial pages.
3. Do not publish copied or mass-generated low-value city pages.
4. Apply for AdSense and obtain the real `ca-pub-...` publisher ID.
5. In `.env`, set the real ID. Do not invent one.
6. If serving ads to EEA/UK/Switzerland users, configure a Google-certified CMP in AdSense as required before enabling personalized advertising.
7. Only then set `VITE_ENABLE_ADSENSE=true`, rebuild and deploy.
8. Create a real `/ads.txt` from `public/ads.txt.example` using your actual publisher ID. Never publish the placeholder `PUB_ID`.

The AdSense loader intentionally excludes `/privacy-policy` and `/cookie-policy` so those policy pages do not load the AdSense tag from this project.

## Contact form

The contact form is connected to the included Node/Express/Nodemailer backend. It sends an admin notification and a separate customer acknowledgement email. See the full-stack setup section below for mail credentials and deployment.

## SEO note about `meta keywords`

The project includes requested per-page `meta name="keywords"` values. Google Search does not use the meta keywords tag as a ranking signal, so rankings should be pursued through useful content, page intent, titles/H1s, internal links, local business signals, performance and genuine authority rather than keyword stuffing.

## Local SEO launch checklist

- Confirm name, address and phone are exactly the same on the website and Google Business Profile.
- Create/verify the Google Business Profile for the genuine business location/service-area setup.
- Add real business photos and useful image alt text.
- Ask genuine customers for Google reviews without incentives or fabricated reviews.
- Connect Search Console and GA4 if desired.
- Inspect all sitemap URLs after deployment.
- Check Core Web Vitals and mobile usability.
- Keep service-area wording truthful and update it whenever coverage changes.

# Full-stack contact form (Node + Express + Nodemailer)

This version includes a production-oriented contact API in `server/`.

## Email flow

When the contact form is successfully submitted:

1. An admin notification is sent to `integralwebsolution@gmail.com` containing the visitor's name, email, phone, locality, selected service and message. The visitor email is set as `Reply-To` so the admin can reply naturally.
2. A separate acknowledgement email is sent to the visitor's email address confirming that the enquiry was received. It does not claim that a booking or arrival time is confirmed.

The same Gmail account is configured as the sender through environment variables.

## Gmail App Password setup

Copy `.env.example` to `.env` and replace only the secret placeholder:

```env
MAIL_USER=integralwebsolution@gmail.com
MAIL_APP_PASSWORD=YOUR_REAL_GOOGLE_APP_PASSWORD
ADMIN_EMAILS=poojagasstoveservice@gmail.com,princekumarjha80@gmail.com
```

A Google App Password is a credential and must never be written into React source files or committed to Git. The password supplied in chat is masked in the working context, so this project intentionally leaves a clear secret placeholder rather than embedding an unknown or exposed value.

For Gmail, the Google account normally needs 2-Step Verification enabled before an App Password can be created.

## Development

Install all frontend and backend dependencies:

```bash
npm install
```

Run React/Vite and Express together:

```bash
npm run dev
```

Default local URLs:

- React: `http://localhost:5173`
- Express API: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

During local development, Vite proxies `/api` to `http://localhost:5000`, so `VITE_API_URL` can stay blank. This also makes the same frontend build work cleanly when Express serves the production site.

## Production with Node hosting / VPS

Set these values in the production environment:

```env
NODE_ENV=production
PORT=5000
VITE_API_URL=
ALLOWED_ORIGINS=https://poojagasstoveservice.com,https://www.poojagasstoveservice.com
MAIL_USER=integralwebsolution@gmail.com
MAIL_APP_PASSWORD=YOUR_REAL_GOOGLE_APP_PASSWORD
ADMIN_EMAILS=poojagasstoveservice@gmail.com,princekumarjha80@gmail.com
BUSINESS_NAME=Pooja Gas Stove Services
BUSINESS_PHONE=9166037352
```

Then run:

```bash
npm install
npm run build
npm start
```

In production the Express server serves the built `dist` website and the `/api/contact` endpoint from the same application. Keeping `VITE_API_URL` blank makes the browser call `/api/contact` on the current domain.

If you instead host the React `dist` folder on normal shared hosting and the Node API on a separate subdomain/server, set `VITE_API_URL` to that API origin before building, for example `https://api.example.com`, and add the website origin to `ALLOWED_ORIGINS`.

## Contact endpoint

`POST /api/contact`

Expected JSON:

```json
{
  "name": "Customer Name",
  "email": "customer@example.com",
  "phone": "9876543210",
  "locality": "Nalasopara",
  "service": "Gas Stove Repair",
  "message": "Burner is not igniting"
}
```

The endpoint validates required fields, limits repeated submissions, rejects oversized input and includes a hidden honeypot field for basic bot filtering.
