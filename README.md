# Orivo Health — Public Site

Static marketing and prototype site hosted on GitHub Pages at **[orivohealth.com](https://orivohealth.com)**.

---

## What this is

A public prototype and investor-facing microsite. It is not a patient portal, health app, or live clinical service. No PHI is collected or stored through this site.

---

## File map

| File | Purpose |
|---|---|
| `index.html` | Homepage |
| `pitch-deck.html` | Investor pitch deck (9 slides, animated) |
| `provider-login.html` | Provider / pharmacy / admin portal mockup |
| `demo.html` | Redirects to `patient-provider-demo.html` |
| `patient-provider-demo.html` | Two-sided patient + provider demo |
| `dual-pipeline.html` | Aevo + Vera AI pipeline explainer |
| `etl-pipeline.html` | Intelligence pipeline animated walkthrough |
| `engineering-stack.html` | Full engineering stack L0–L6 |
| `why-invest.html` | Investor thesis and market case |
| `privacy.html` | Public site privacy notice |
| `terms.html` | Terms of use |
| `hipaa-notice.html` | PHI and clinical safety notice |
| `accessibility.html` | Accessibility statement (WCAG 2.2 AA target) |
| `404.html` | Branded error page |
| `logo.png` | Orivo Health logo (transparent background) |
| `robots.txt` | Disallows all crawling (confidential prototype) |
| `CNAME` | Custom domain — do not edit |

---

## Deployment

This repo publishes from the `main` branch root via GitHub Pages.  
Custom domain: `orivohealth.com` (configured in repo Settings → Pages).  
HTTPS is enforced.

To deploy: commit changes to `main`. The site updates within ~30 seconds.

---

## What not to do

- **Do not commit PHI**, patient data, real credentials, API keys, or production secrets
- **Do not change `CNAME`** — breaking the custom domain requires DNS re-propagation
- **Do not add patient intake forms**, symptom collection, or insurance data collection to this static site
- Investor materials (`pitch-deck.html`, `why-invest.html`) are `noindex` via `robots.txt`

---

## Contact

hello@orivohealth.com · [orivohealth.com](https://orivohealth.com)
