# SchedAI Landing Page

Production-ready marketing landing page for **SchedAI**, built as a fast static site with lead capture, SEO essentials, analytics hooks, and Vercel deployment support.

## Overview

This project is a static website focused on conversion:

- Clear value proposition and pricing sections
- Lead capture form with AJAX submission
- Thank-you conversion page
- SEO basics (`canonical`, Open Graph, Twitter meta, `robots.txt`, `sitemap.xml`)
- Event tracking hooks for analytics
- Responsive, optimized image delivery

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- AOS (Animate On Scroll)
- FormSubmit (lead form endpoint)
- Google Analytics 4 (via `gtag`, ID placeholder included)

## Project Structure

```text
.
├── css/
│   └── style.css
├── images/
├── js/
│   └── script.js
├── index.html
├── thank-you.html
├── privacy.html
├── terms.html
├── robots.txt
└── sitemap.xml
```

## Local Development

Because this is a static site, you can open `index.html` directly in a browser.  
Recommended: use a local server for cleaner testing.

### Option 1: VS Code Live Server

1. Install **Live Server** extension.
2. Right-click `index.html`.
3. Click **Open with Live Server**.

### Option 2: Python HTTP server

```bash
python -m http.server 8000
```

Then open: `http://localhost:8000`

## Configuration

### 1. Analytics ID

In `index.html`, replace:

```html
G-REPLACE_MEASUREMENT_ID
```

with your real GA4 Measurement ID.

### 2. Lead Form Destination

The form is currently configured to send to:

```text
support@schedai.com
```

using FormSubmit.  
If you change support email, update both form `action` and `data-endpoint` in `index.html`.

## Deployment (Vercel)

1. Push code to GitHub.
2. Import repository in Vercel (`Framework: Other`).
3. Deploy.
4. Optionally add custom domain later in `Project Settings -> Domains`.

Vercel auto-deploys on every push to the connected branch.

## SEO and Indexing

Included:

- `robots.txt`
- `sitemap.xml`
- Canonical URL and social metadata

After deploying to production:

1. Submit `sitemap.xml` in Google Search Console.
2. Add Search Console site verification token (if required).
3. Verify social preview image rendering.

## Production Checklist

- Replace GA4 placeholder ID
- Confirm FormSubmit activation email is completed
- Verify `support@schedai.com` inbox monitoring
- Test full form flow (`index.html` -> `thank-you.html`)
- Validate links, privacy/terms pages, and mobile layout
- Run Lighthouse performance and accessibility checks

## Git Workflow

```bash
git add .
git commit -m "Describe update"
git push origin main
```

## License

Private project. Update this section with your preferred license before open-sourcing.

