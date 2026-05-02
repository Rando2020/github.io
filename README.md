# Pitch Deck Animation Upgrade

This adds deck-specific animation polish on top of the existing global `orivo-motion.js` layer.

## Files

```text
pitch-deck-motion.js
```

## Install

Upload `pitch-deck-motion.js` to the repository root.

Then add this line to `pitch-deck.html` after the existing `orivo-motion.js` script and before `</body>`:

```html
<script src="/pitch-deck-motion.js?v=1" defer></script>
```

The bottom of `pitch-deck.html` should look like:

```html
<script src="/orivo-motion.js?v=premium2" defer></script>
<script src="/pitch-deck-motion.js?v=1" defer></script>
</body>
</html>
```

## What It Improves

- Smoother slide transitions with depth, blur, and scale
- Per-slide headline/card/stat staging every time a slide becomes active
- Premium progress bar glow
- Animated active slide dots
- Floating phone mockup motion
- Modal entrance animation
- Pointer glow across the deck surface
- Brief arrow-key/swipe hint
- Reduced-motion accessibility support

No data is collected and no external network calls are made.
