# Orivo Premium Animation Install

This package upgrades the Orivo site animation layer without touching `CNAME`.

## Files in this package

- `orivo-motion.js`
- `ANIMATION_SCRIPT_TAG.html`
- `ORIVO_PREMIUM_ANIMATION_INSTALL.md`

## Upload

Upload `orivo-motion.js` to the repo root, replacing the existing file if GitHub asks.

Final path:

```text
github.io/orivo-motion.js
```

## Activate on pages

Add this line immediately before `</body>` on every page you want animated:

```html
<script src="/orivo-motion.js" defer></script>
```

Start with:

```text
index.html
patient-provider-demo.html
walkthrough.html
dual-pipeline.html
etl-pipeline.html
provider-login.html
engineering-stack.html
why-invest.html
pitch-deck.html
evidence.html
```

## Do not touch

Do not edit or replace `CNAME`.

It must remain:

```text
orivohealth.com
```

## Test URLs

```text
https://orivohealth.com/
https://orivohealth.com/patient-provider-demo.html
https://orivohealth.com/walkthrough.html
https://orivohealth.com/dual-pipeline.html
```

Hard refresh after upload:

```text
Ctrl + F5
```

## What the animation layer adds

- Hero signal aura
- Soft orbit rings
- Scroll reveals
- Premium card hover depth
- CTA shimmer
- Aevo to Vera flow line
- Mini workflow pipeline
- Animated counters
- Pointer spotlight
- Prototype safety banner for demo pages when needed
- Reduced-motion accessibility support
