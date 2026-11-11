# César Landín - professional website

The static site behind https://clandinq.github.io/. Plain HTML, CSS and JavaScript; there is no build step.

## File layout

```
index.html              Research page: intro/bio + paper cards
data.html               Data page: dataset cards
cv.html                 CV page: embedded PDF + download button
assets/css/style.css    All styling (light/dark themes via CSS variables)
assets/js/main.js       Theme toggle, abstract toggles, thumbnail-effect switch
assets/img/             headshot.jpg, favicon.svg
assets/img/papers/      Square thumbnails for papers
assets/img/data/        Square thumbnails for datasets
assets/cv/              cesarlandin_cv.pdf (phone-free web version)
cv_source/              cesarlandin_cv_web.tex (LaTeX source of the web CV)
documentation/          reference_websites.txt (design references)
.nojekyll               Tells GitHub Pages to skip Jekyll processing
```

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Editing content

- **Papers:** edit the `<article class="card">` blocks in `index.html`. Each card has a title, authors, status badge, links, and a hidden abstract (the `id` in the abstract `<div>` must match the button's `aria-controls`).
- **Datasets:** edit the cards in `data.html` (same card structure, with a `card-desc` paragraph).
- **Bio:** edit the `<section class="intro">` block at the top of `index.html` (affiliation, bio paragraph, contact icons).

## Thumbnail hover effect

Set `data-thumb-effect="grayscale"` or `data-thumb-effect="zoom"` on the `<body>` of `index.html` and `data.html`.

- `grayscale`: thumbnails are grey and turn to colour on hover.
- `zoom`: thumbnails stay in colour and zoom slightly on hover.

To preview either live without editing, add `?thumb=zoom` or `?thumb=grayscale` to the URL (e.g. `http://localhost:8000/?thumb=zoom`). The choice persists while clicking between tabs.

## Replacing the dummy icons

Drop square images (about 250x250 or larger; SVG, PNG or JPG) into `assets/img/papers/` or `assets/img/data/`, then update the `src` of the matching `<img>` in `index.html` or `data.html`.

## Rebuilding the CV

The public CV must not contain a phone number.

1. Copy the new CV `.tex` over `cv_source/cesarlandin_cv_web.tex`, then delete the `\mobile{...}` line (and keep the "web version" comment at the top).
2. Compile (run from the project root):
   ```bash
   latexmk -pdf -outdir=/tmp/cvbuild cv_source/cesarlandin_cv_web.tex
   ```
3. Copy the PDF: `cp /tmp/cvbuild/cesarlandin_cv_web.pdf assets/cv/cesarlandin_cv.pdf`
4. Verify no phone number is present (this should print nothing):
   ```bash
   pdftotext assets/cv/cesarlandin_cv.pdf - | rg '\+1 '
   ```
5. Update the "Last updated" text in `cv.html`.

## Deploy

Commit and push to `main`. GitHub Pages serves from the root of the `main` branch.
