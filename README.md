# Orivo homepage logo + font patch

This is a surgical patch. It does not replace the full homepage.

## What it does

- Uses the existing repo asset: `/logo.png`
- Removes the homepage's circle `O` text-logo treatment
- Keeps a fallback text logo if the image fails to load
- Adds Inter as the primary business UI font
- Lightens heavy UI font weights so the homepage feels more polished and less thick

## How to apply

1. Download `orivo_homepage_logo_font_patch.py`.
2. Put it in the root of `Rando2020/github.io`, next to `index.html`.
3. Run:

```bash
python3 orivo_homepage_logo_font_patch.py
```

4. Commit `index.html`.
5. Make sure `logo.png` remains in the repo root.

## Why this approach

This avoids another full rip-and-replace of `index.html`. It only changes logo rendering and typography.
