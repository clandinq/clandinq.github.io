# César Landín - professional website

The static site behind https://clandinq.github.io/. Plain HTML, CSS and JavaScript; there is no build step.

## File layout

```
index.html              Home: photo, contact icons and bio only
research.html           Research page: working papers + other work
data.html               Data page: dataset cards
cv.html                 CV page: embedded PDF + download button
assets/css/style.css    All styling (light/dark themes via CSS variables)
assets/js/main.js       Theme toggle, abstract toggles, thumbnail-effect switch
assets/img/             headshot.jpg, favicon.svg
assets/img/papers/      Square thumbnails for papers (transparent-background SVGs)
assets/img/data/        Square thumbnails for datasets (transparent-background SVGs)
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

- **Papers:** edit the cards under "Working Papers" in `research.html`. Each card has a title, authors, status badge, links, and a hidden abstract (the `id` in the abstract `<div>` must match the button's `aria-controls`).
- **Other work:** the placeholder cards under "Other Work" in `research.html` have no abstract toggle; replace their titles, descriptions and the disabled "Paper (coming soon)" pill with real content.
- **Datasets:** edit the cards in `data.html` (same card structure, with a `card-desc` paragraph). Current cards: Brazilian Randomized Municipality Audits and LLM-Coded Brazilian Municipal Audit Reports (both "Forthcoming", with disabled Documentation/Download pills).
- **Bio:** edit the `<section class="intro">` block at the top of `index.html` (photo, contact icons, affiliation, bio paragraph).
- **Nav:** the Home | Research | Data | CV nav is repeated on every page; keep it identical apart from `aria-current="page"` on the current page.

## Thumbnail hover effect

Set `data-thumb-effect` to `grayscale`, `zoom` or `accent` on the `<body>` of `research.html` and `data.html` (the pages with cards).

- `grayscale`: the image is grey on a neutral panel and turns to colour, on the card's tint, on hover/focus.
- `zoom`: the image stays in colour on the card's tint and zooms slightly on hover.
- `accent` (default): the image stays in colour; only the panel changes from neutral grey to the card's tint on hover/focus.

To preview any of them live without editing, add `?thumb=grayscale`, `?thumb=zoom` or `?thumb=accent` to the URL (e.g. `http://localhost:8000/?thumb=accent`). The choice persists while clicking between tabs.

The thumbnail SVGs have transparent backgrounds; the `.card-thumb` container supplies the background. Each `.card-thumb` carries an inline `style="--thumb-tint:#rrggbb"` (the colour shown on hover, or always in `zoom`). If it is missing, the tint falls back to a neutral grey. When adding a card, pick a light tint that suits the figure. In dark mode the tints stay light on purpose, so the figures remain visible.

## Replacing the dummy icons

Drop square images (about 250x250 or larger; SVG, PNG or JPG) into `assets/img/papers/` or `assets/img/data/`, then update the `src` of the matching `<img>` (and the card's `--thumb-tint`) in `research.html` or `data.html`. Use a transparent background so the tint shows through.

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

**Cache busting:** GitHub Pages lets browsers cache CSS/JS for 10 minutes. Whenever you change
`assets/css/style.css` or `assets/js/main.js`, bump the `?v=N` suffix on their `<link>`/`<script>` tags
in all four HTML files (e.g. `sed -i '' 's/?v=6"/?v=7"/g' *.html`), otherwise visitors may see new HTML with old styles.
