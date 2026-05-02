# Orivo Motion Upload Patch

This package is intentionally tiny and safe.

It does **not** include or modify:
- `CNAME`
- DNS settings
- GitHub Pages settings
- existing homepage files
- clinical copy
- forms

It only adds one drop-in animation file:

```text
orivo-motion.js
```

## Upload

1. Go to your GitHub repo:
   `https://github.com/Rando2020/github.io`

2. Click:
   `Add file > Upload files`

3. Upload only:

```text
orivo-motion.js
```

4. Commit with:

```text
Add Orivo motion layer
```

## Activate on a page

For each page you want animated, edit the HTML file and add this line right before the closing `</body>` tag:

```html
<script src="/orivo-motion.js" defer></script>
```

Recommended first pages:

```text
index.html
patient-provider-demo.html
walkthrough.html
dual-pipeline.html
etl-pipeline.html
provider-login.html
engineering-stack.html
why-invest.html
```

## Example

At the very bottom of `index.html`, you should see something like:

```html
</body>
</html>
```

Change it to:

```html
<script src="/orivo-motion.js" defer></script>
</body>
</html>
```

## Test URLs

After committing, test:

```text
https://orivohealth.com/
https://orivohealth.com/patient-provider-demo.html
https://orivohealth.com/walkthrough.html
```

Hard refresh if needed:

```text
Ctrl + F5
```

## What the animation layer adds

- Hero glow/aura pulse
- Staggered hero entrance
- Scroll reveal animations
- Premium card hover depth
- Aevo-to-Vera flow line
- Mini homepage product pipeline
- Metric counter animation
- Button shimmer/microinteractions
- Reduced-motion accessibility safety
- Prototype safety banner on demo-like pages when needed

## Rollback

To remove it, delete this line from the HTML pages:

```html
<script src="/orivo-motion.js" defer></script>
```

You do not need to delete the JS file unless you want to.
