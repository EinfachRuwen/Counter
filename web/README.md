# Counter – Web-Edition (Nostalgie – Revived)

Die Android-App *Counter* (2021, gebaut mit Sketchware) als Web-App – gleiches Flip-Clock-Design,
plus die Funktionen von der alten Ideenliste.

## Veröffentlichen auf Cloudflare Pages (über GitHub)

1. Cloudflare Dashboard → *Workers & Pages* → *Create* → *Pages* → **Connect to Git**
2. Repo `EinfachRuwen/Counter` wählen
3. Einstellungen:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** *(leer lassen)*
   - **Build output directory:** `web`
4. *Save and Deploy* – danach geht jeder Push auf `main` automatisch online,
   andere Branches bekommen eine eigene Vorschau-URL.
5. Eigene Domain (`counter.bf0.by0.link`) unter *Custom domains* eintragen.

## Anpassen

- **`config.js`** – Links: Spenden (`donateUrl`, leer = ausgeblendet), Quellcode, Issues, Website, Impressum.
- **`sw.js`** – nach Änderungen an Dateien `CACHE`-Version erhöhen, damit installierte Apps das Update bekommen.
- **`_redirects`** – alte Kurzlinks (`/github`, `/issue`, `/download`) aus der Android-App.
- **`_headers`** – Sicherheits- und Cache-Header.

## Lokal testen

```bash
cd web && python3 -m http.server 8000
```

Keine Abhängigkeiten, kein Build, keine externen Dienste (Schrift Roboto liegt lokal → DSGVO-freundlich).
Alle Daten bleiben im `localStorage` des Browsers.
