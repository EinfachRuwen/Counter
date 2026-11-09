# Counter – Web-Edition (Nostalgie – Revived)

Die Android-App *Counter* (2021, gebaut mit Sketchware) als Web-App – gleiches Flip-Clock-Design,
plus die Funktionen von der alten Ideenliste.

## Veröffentlichen auf Cloudflare Pages

**Variante A – ZIP hochladen:** Cloudflare Dashboard → *Workers & Pages* → *Create* → *Pages* →
*Upload assets* → den **Inhalt** dieses Ordners (bzw. die ZIP) hochladen.

**Variante B – mit GitHub verbinden:** *Connect to Git* → dieses Repo wählen →
Framework preset: *None*, Build command: leer, **Build output directory: `web`**.
Danach wird jeder Push automatisch veröffentlicht.

Eigene Domain (z. B. `counter.byzero.dev`) unter *Custom domains* eintragen.

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
