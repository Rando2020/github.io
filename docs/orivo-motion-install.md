# Orivo Motion Layer

`orivo-motion.js` is a drop-in animation layer for the static site.

## Current Location

The current public site keeps a root copy:

```text
/orivo-motion.js
```

Keep that file in place while any page may still reference it.

## Recommended Future Location

In a later cleanup, move the canonical copy to:

```text
/assets/js/orivo-motion.js
```

Then update each page reference from:

```html
<script src="/orivo-motion.js" defer></script>
```

to:

```html
<script src="/assets/js/orivo-motion.js" defer></script>
```

## What It Adds

- Hero glow/aura pulse
- Staggered hero entrance
- Scroll reveal animations
- Card hover depth
- Aevo-to-Vera flow line
- Mini homepage product pipeline
- Metric counter animation
- Button microinteractions
- Reduced-motion accessibility handling
- Prototype safety banner on demo-like pages when needed

## Rollback

Remove the script tag from the affected HTML page. Leave the JavaScript file in place until all references have been checked.
