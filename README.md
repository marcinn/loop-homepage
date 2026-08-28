# LOOP — Hugo

Landing i serwis LOOP — Laboratorium Otwartego Oprogramowania i Prototypów.

## Struktura

- `content/projects/` — dedykowany typ treści Hugo dla projektów; repozytorium, technologie, screen, status i opcjonalny `budget_id` są w front matter.
- `data/budgets.json` — aktualne wartości budżetów projektów, docelowo do zastąpienia danymi z webservice.
- `content/blog/` — blog.
- `content/misja.md`, `content/kontakt.md` — strony statyczne.
- `static/downloads/statut-loop-mock.pdf` — demonstracyjny PDF statutu.
- `static/js/donations.js` — klient darowizn PayU.
- `assets/scss/main.scss` — SCSS oparty o Bulma 1.x.

## Uruchomienie

Wymagania: Hugo Extended, Node.js.

```bash
make runserver
```

Jeśli port `1313` jest zajęty:

```bash
make runserver PORT=1314
```

Alternatywnie:

```bash
npm install
npm run dev
```

Build produkcyjny:

```bash
make build
```

Alternatywnie:

```bash
npm run build
```

## Płatności

Hugo nie może przechowywać sekretów PayU. `client_secret` musi pozostać na backendzie. Frontend zna jedynie adres własnego endpointu tworzącego płatność. Szczegóły: `docs/payment-integration.md`. Minimalny przykład endpointu znajduje się w `backend-example/server.mjs`.

## Screeny

Wersja demo korzysta z publicznych URL-i źródłowych. Przed wdrożeniem produkcyjnym najlepiej pobrać własne screeny projektów lokalnie. Lista źródeł: `docs/image-sources.md`.


## GitHub Pages

Repozytorium jest przygotowane do publikacji przez GitHub Actions. Workflow `.github/workflows/pages.yml` buduje Hugo Extended i publikuje katalog `public/` przez oficjalne GitHub Pages Actions. `baseURL` w workflow jest pobierany z `actions/configure-pages`, więc projekt automatycznie buduje się pod aktualnie skonfigurowaną domeną — obecnie własną, `https://loop.org.pl/` (plik `static/CNAME` utrwala to ustawienie; wcześniej strona działała pod `https://marcinn.github.io/loop-homepage/`).

Po pierwszym pushu ustaw w repozytorium **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Pierwszy push z lokalnego shella

Jeśli repozytorium jest puste i masz już skonfigurowane uwierzytelnienie GitHub (`gh auth login`, credential helper albo SSH), możesz uruchomić:

```bash
./publish-github.sh
```

Skrypt inicjuje repozytorium Git, ustawia `origin` na `marcinn/loop-homepage`, tworzy pierwszy commit i wysyła gałąź `master`.
