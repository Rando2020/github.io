# Orivo animated HTML upload package

Upload these files to the root of your GitHub Pages repo: `Rando2020/github.io`.

## What this package does

This package adds the premium Orivo animation layer to the main public HTML pages by inserting this line before `</body>`:

```html
<script src="/orivo-motion.js?v=premium2" defer></script>
```

It also includes the upgraded `orivo-motion.js` file.

## Upload exactly this way

1. Unzip this package.
2. Open the extracted folder.
3. Select the files inside the folder, not the folder itself.
4. Upload them to the root of `https://github.com/Rando2020/github.io`.
5. Commit with: `Activate premium Orivo animations across site`.

## Do not touch

Do not delete, replace, or edit `CNAME`. This package intentionally does not include `CNAME`.

## Test after upload

Use cache-busted URLs:

- https://orivohealth.com/?v=premium2
- https://orivohealth.com/patient-provider-demo.html?v=premium2
- https://orivohealth.com/walkthrough.html?v=premium2
- https://orivohealth.com/dual-pipeline.html?v=premium2
- https://orivohealth.com/etl-pipeline.html?v=premium2

Hard refresh with Ctrl + F5 if the old version remains cached.
