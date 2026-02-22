# SchedAI Landing Page

This repo contains the marketing site for SchedAI.
It is a static landing page designed for fast load times, clear messaging, and lead capture.

## What Is Included

- Product landing page (`index.html`)
- Lead form with async submit flow
- Thank-you conversion page (`thank-you.html`)
- Privacy and terms pages
- SEO essentials (`robots.txt`, `sitemap.xml`, social meta tags)
- Basic analytics event hooks
- Responsive image variants for better performance

## Stack

- HTML
- CSS
- Vanilla JavaScript
- AOS (scroll animations)
- FormSubmit (form handling)
- Google Analytics 4 (`gtag` placeholder in place)

## Project Layout

```text
.
|- css/
|  |- style.css
|- images/
|- js/
|  |- script.js
|- index.html
|- thank-you.html
|- privacy.html
|- terms.html
|- robots.txt
|- sitemap.xml
|- service-worker.js
```

## Run Locally

You can open `index.html` directly, but using a local server is better for testing.

Option 1: VS Code Live Server

1. Install the Live Server extension.
2. Right-click `index.html`.
3. Click `Open with Live Server`.

Option 2: Python

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Required Configuration

1. GA4 Measurement ID
- In `index.html`, replace `G-REPLACE_MEASUREMENT_ID` with your real ID.

2. Support email / form endpoint
- The form is configured for `support@schedai.com`.
- If this changes, update both `action` and `data-endpoint` in `index.html`.

## Deploy on Vercel

1. Push to GitHub.
2. Import this repo in Vercel.
3. Use framework preset `Other`.
4. Deploy.
5. Add custom domain later in `Settings -> Domains` (optional at first).

Vercel auto-deploys on new pushes to the connected branch.

## Deployment Checklist

- GA4 ID replaced
- FormSubmit activation confirmed
- `support@schedai.com` inbox monitored
- Form flow tested end-to-end (`index.html` -> `thank-you.html`)
- `privacy.html`, `terms.html`, `robots.txt`, and `sitemap.xml` reachable in production
- Mobile and desktop QA completed
- Lighthouse checks run (performance, accessibility, SEO)

## Git Workflow

```bash
git add .
git commit -m "Your change summary"
git push origin main
```

## License

Private project for now. Add a license if you plan to open-source this repository.
