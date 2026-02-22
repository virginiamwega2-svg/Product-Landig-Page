# SchedAI Landing Page

This repository contains the marketing website for SchedAI.
It is a static landing page built for speed, clear messaging, and lead conversion.

## Highlights

- Focused product landing page (`index.html`)
- Lead capture form with async submission
- Dedicated post-signup page (`thank-you.html`)
- Privacy and Terms pages
- Core SEO setup (`robots.txt`, `sitemap.xml`, social metadata)
- Analytics event hooks ready for GA4
- Responsive image variants for better performance

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- AOS (Animate On Scroll)
- FormSubmit (form delivery)
- Google Analytics 4 (`gtag` integration with placeholder ID)

## Project Structure

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

## Local Development

You can open `index.html` directly, but running a local server is recommended.

### Option 1: VS Code Live Server

1. Install the **Live Server** extension.
2. Right-click `index.html`.
3. Select **Open with Live Server**.

### Option 2: Python HTTP Server

```bash
python -m http.server 8000
```

Open: `http://localhost:8000`

## Configuration

### GA4 Measurement ID

Update `index.html` and replace:

```html
G-REPLACE_MEASUREMENT_ID
```

with your real GA4 Measurement ID.

### Form Endpoint and Support Email

The form is currently configured for:

```text
support@schedai.com
```

If you change this address, update both form attributes in `index.html`:

- `action`
- `data-endpoint`

## Deployment (Vercel)

1. Push changes to GitHub.
2. Import this repository in Vercel.
3. Choose the framework preset: `Other`.
4. Deploy.
5. Optionally add a custom domain in `Settings -> Domains`.

Vercel will automatically redeploy on every push to the connected branch.

## Production Readiness Checklist

- Replace GA4 placeholder ID
- Confirm FormSubmit activation
- Verify `support@schedai.com` is monitored
- Test form flow end-to-end (`index.html` -> `thank-you.html`)
- Verify `privacy.html`, `terms.html`, `robots.txt`, and `sitemap.xml` in production
- Run mobile and desktop QA
- Run Lighthouse checks (performance, accessibility, SEO)

## Git Workflow

```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

## License

This is currently a private project.
Add a license before open-sourcing.
