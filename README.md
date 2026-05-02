# Orivo Health Public Site

Static marketing, investor, and prototype site for Orivo Health, hosted with GitHub Pages at https://orivohealth.com.

## What This Is

This repository contains a public prototype and investor-facing microsite. It is not a patient portal, health app, telehealth service, or live clinical system. Do not submit protected health information, medication details, symptoms, insurance details, credentials, API keys, or production secrets through this static site.

## Current Publishing Setup

- GitHub Pages publishes from the `main` branch root.
- Custom domain is configured through `CNAME`: `orivohealth.com`.
- Keep root-level HTML files in place unless you also update every inbound link and redirect.
- `robots.txt` discourages indexing, but it does not make the site private or confidential.

## Root File Map

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage |
| `404.html` | Branded error page |
| `demo.html` | Redirect or entry point for the canonical demo |
| `patient-provider-demo.html` | Main two-sided patient/provider demo |
| `provider-login.html` | Provider, pharmacy, and admin portal mockup |
| `pitch-deck.html` | Investor pitch deck |
| `pitch-deck-original.html` | Earlier pitch deck reference |
| `orivo_pitch_deck_v2_calcom.html` | Pitch deck variant with Cal.com flow |
| `why-invest.html` | Investor thesis and market case |
| `dual-pipeline.html` | Aevo + Vera pipeline explainer |
| `etl-pipeline.html` | Intelligence pipeline walkthrough |
| `engineering-stack.html` | Engineering stack overview |
| `walkthrough.html` | Product walkthrough |
| `privacy.html` | Public privacy notice |
| `terms.html` | Terms of use |
| `hipaa-notice.html` | PHI and clinical safety notice |
| `accessibility.html` | Accessibility statement |
| `shared-nav-snippet.html` | Legacy shared navigation snippet for manual reuse |
| `orivo-motion.js` | Legacy root copy of the motion layer, retained for existing page references |
| `logo.png`, `favicon.svg`, `og-image.svg` | Brand and social assets |
| `robots.txt` | Search crawler instructions |
| `CNAME` | GitHub Pages custom domain configuration |

## Supporting Documentation

Operational and review notes live in `docs/`:

| Path | Purpose |
| --- | --- |
| `docs/structure.md` | Repo organization guidance and next cleanup path |
| `docs/upload-instructions.md` | Historical upload notes |
| `docs/orivo-motion-install.md` | Motion layer install notes |
| `docs/claims-review.md` | Public-claims language guidance |

## Organization Notes

This site is intentionally still a simple static site. For the next cleanup pass, prefer extracting repeated CSS and navigation into shared assets before moving page URLs. A safe future structure would be:

```text
assets/
  css/
  js/
  images/
docs/
pages/
demos/
decks/
```

For now, root HTML files are preserved to avoid breaking public GitHub Pages URLs.

## Deployment

To deploy, commit changes to `main`. GitHub Pages should publish shortly after the commit.

Before publishing, check:

- Important pages still load from their current URLs.
- No page invites users to enter PHI into the static site.
- Claims around HIPAA, SOC 2, BAAs, ADE detection, adherence lift, or clinical performance are accurate and supportable.
- `CNAME` still contains only `orivohealth.com`.

## Safety Rules

- Do not commit PHI, patient data, real credentials, API keys, or production secrets.
- Do not add patient intake, symptom collection, insurance collection, or live clinical workflows to GitHub Pages.
- Do not describe the site as confidential unless access control actually exists.
- Use synthetic demo data only.
- Prefer `HIPAA-conscious`, `HIPAA-aligned target`, or `HIPAA-informed` until counsel and implemented controls support stronger language.

## Contact

hello@orivohealth.com
