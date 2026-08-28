# Instructions for agents working in this repo

## Never run your own Hugo build while `hugo server` is running

The developer normally keeps a `hugo server -D --bind 127.0.0.1 --port 1313 --baseURL http://127.0.0.1:1313/` process running in a terminal while you work. Check for it first:

```
ps aux | grep "hugo server" | grep -v grep
```

If it's running, **do not** run `hugo`, `hugo build`, `hugo --gc`, `hugo --minify`, etc. as a separate one-shot build to "verify" your changes. That process and the live server both compile the same SCSS/asset pipeline into the same shared on-disk resource cache (`resources/_gen/`). Two Hugo processes writing to that cache at the same time can race — one can read the other's cache entry mid-write — which shows up to the developer as assets/CSS/images randomly 404ing in the browser even though nothing was deleted from `static/`. This has happened multiple times in this repo; don't reintroduce it.

**Instead, verify changes against the already-running server directly:**

```
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:1313/some/path/
curl -s http://127.0.0.1:1313/ | grep -o 'href="/css/main[^"]*"'
```

If no `hugo server` is running, it's fine to run a one-shot build (`hugo --minify --cleanDestinationDir`, no `--gc`) into `public/` to sanity-check output. If the developer asks you to check something visually and you have no way to render a browser, say so explicitly — don't assume a build succeeding means it looks right.

## CSS: watch specificity when adding a modifier class

This stylesheet (`assets/scss/main.scss`) is one long flat file with plain class selectors, most at equal specificity (one class + one element, e.g. `.project-card h3`). When adding an override for a new modifier class (e.g. `.project-card--highlight`), a same-specificity selector defined *later* in the file wins regardless of which one looks more "specific" to read. Concretely: `.project-card--highlight h3 { font-size: 3rem }` placed before `.project-card h3 { font-size: 1.08rem }` gets silently overridden by the latter.

Fix pattern used in this file: scope the modifier to its actual container so the selector has strictly more classes than anything it could collide with, e.g. `.project-grid--large .project-card--highlight h3` instead of bare `.project-card--highlight h3`. This also has the side benefit of preventing a modifier meant for one grid context (e.g. the `/projects/` list) from accidentally applying inside a different grid context that reuses the same card partial (e.g. the homepage's `.project-grid--featured` section) — that exact collision happened once already.

After adding or changing a rule like this, actually grep the compiled CSS to confirm the rule you expect is winning — don't just assume it compiled the way you wrote it:

```
grep -o "your-selector{[^}]*}" public/css/main.*.css
```

## Site baseURL / relURL gotcha

`hugo.toml` sets `baseURL = "https://loop.org.pl/"` (custom domain, served at root — `static/CNAME` holds this for GitHub Pages; the production workflow overrides `baseURL` at build time via `actions/configure-pages` regardless). The site previously lived at `https://marcinn.github.io/loop-homepage/`, under a `/loop-homepage/` path prefix — in templates, always pass **relative paths without a leading slash** through `relURL` (e.g. `"img/x.jpg" | relURL`, not `"/img/x.jpg" | relURL`). A leading slash causes Hugo's `relURL` to skip prepending the baseURL's path component — harmless now that the site is served at domain root with no path prefix, but it will silently break everything again if this site (or a copy of it) ever moves back under a subpath. This already caused one real bug (the footer's statute PDF link, and initially the `.project-card--highlight` image path) — keep following the no-leading-slash convention regardless.

For local screenshots referenced from Markdown body content (not just front matter), use the `{{< shot src="..." alt="..." caption="..." >}}` shortcode (`layouts/shortcodes/shot.html`) rather than raw `<img>` tags — it applies the same relURL handling automatically. Front-matter `image` fields go through `layouts/partials/project-card.html` and `layouts/projects/single.html`, which already branch on `hasPrefix ... "http"` so both local paths and external hotlinked URLs work.
