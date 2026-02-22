# SchedAI Landing Page

This repository contains the SchedAI product landing page.
It is a static site focused on clear messaging, lead capture, and technical SEO.

## What This Project Includes

- Main landing page (`index.html`)
- Lead capture form with async submission (`js/script.js`)
- Thank-you page after signup (`thank-you.html`)
- Privacy and terms pages (`privacy.html`, `terms.html`)
- Technical SEO files (`robots.txt`, `sitemap.xml`)
- Responsive image assets for better performance

## Stack

- HTML
- CSS
- Vanilla JavaScript
- Google Analytics 4 (`gtag`)
- FormSubmit (for form delivery)
- Vercel (deployment)

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

## Run Locally

You can open `index.html` directly, but a local server is recommended.

### Option 1: VS Code Live Server

1. Install the Live Server extension.
2. Right-click `index.html`.
3. Click `Open with Live Server`.

### Option 2: Python

```bash
python -m http.server 8000
```

Then open: `http://localhost:8000`

## Configuration Notes

- GA4 is configured in `index.html` with measurement ID `G-525497869`.
- Form submissions are sent to `support@schedai.com`.
- Canonical and sitemap currently use `https://schedai.com/`. Update if your production domain changes.

## Deploy on Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Use framework preset `Other`.
4. Deploy.
5. Add a custom domain in `Settings -> Domains` when ready.

Vercel will auto-deploy new pushes to the connected branch.

## Final QA Checklist

- Submit the live form and confirm email delivery
- Confirm redirect to `thank-you.html`
- Check GA4 Realtime for conversion events
- Verify `robots.txt` and `sitemap.xml` are reachable
- Test mobile and desktop layout/behavior

## Git Workflow

```bash
git add .
git commit -m "Describe your change"
git push origin main
```
