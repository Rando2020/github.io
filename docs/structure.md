# Repository Structure

This repository is a static GitHub Pages site. The current live URLs depend on root-level HTML files, so the first cleanup should improve documentation and supporting assets without moving public pages.

## Current Safe Structure

```text
/
  index.html
  404.html
  *.html
  CNAME
  robots.txt
  README.md
  docs/
    claims-review.md
    orivo-motion-install.md
    upload-instructions.md
    structure.md
```

## Recommended Future Structure

```text
/
  index.html
  404.html
  CNAME
  robots.txt
  README.md

  assets/
    css/
      base.css
      nav.css
      pages.css
    js/
      orivo-motion.js
    images/
      logo.png
      favicon.svg
      og-image.svg

  docs/
    claims-review.md
    structure.md

  demos/
    patient-provider-demo.html
    walkthrough.html
    dual-pipeline.html
    etl-pipeline.html
    engineering-stack.html

  decks/
    pitch-deck.html
    pitch-deck-original.html
    orivo_pitch_deck_v2_calcom.html

  pages/
    privacy.html
    terms.html
    hipaa-notice.html
    accessibility.html
    why-invest.html
```

## Migration Order

1. Replace the stale root `README.md`.
2. Move operational notes into `docs/`.
3. Extract repeated CSS into `assets/css/`.
4. Extract common JavaScript into `assets/js/`.
5. Replace `shared-nav-snippet.html` with a real shared navigation include or small JavaScript renderer.
6. Only move public HTML pages after redirects or link updates are in place.

## GitHub Pages Notes

GitHub Pages can publish static files from the repository root, so no build step is required. Keeping the site build-free is fine while this is a prototype.

Avoid moving these files unless you are intentionally changing deployment settings:

- `index.html`
- `404.html`
- `CNAME`
- `robots.txt`

## Privacy And Claims Notes

This is a public repository and public website. `robots.txt` can discourage crawler indexing, but it does not provide access control.

Keep claims conservative until the underlying controls, legal review, and customer agreements support stronger wording.
