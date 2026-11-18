# Technische Datenschutz-Dokumentation – Counter (Web-Edition)

Stand: 18.11.2026 · gehört zu `web/datenschutz/index.html` (öffentlich unter `https://counter.bf0.by0.link/datenschutz/`).
Diese Datei liegt außerhalb von `web/` und wird deshalb nicht ausgeliefert (siehe „Hosting“).

## Hosting und Auslieferung (ermittelt, nicht vollständig aus dem Repo ableitbar)

| Punkt | Befund | Beleg |
|---|---|---|
| Hoster | Vercel Inc., Projekt `counter-web` im Team `ruwens-projekte` (Git-Integration; Commit-Status „Vercel“ auf `main`) | GitHub Commit-Status für `62af8b1`: `target_url https://vercel.com/ruwens-projekte/counter-web/…`; Antwort-Header `server: Vercel`, `x-vercel-id`, `x-vercel-cache` |
| Root Directory | `web/` (kein Build-Schritt, statische Dateien) | `/app.js`, `/sw.js`, `/config.js` live identisch mit `web/…`; `/web/index.html`, `/brand/…`, `/src/…` → 404 |
| Produktiv-Domain | `counter.bf0.by0.link` | `curl -I` am 18.11.2026 → 200, `server: Vercel` |
| DNS / Proxy | `counter.bf0.by0.link` → CNAME `80aa868684f70bf9.vercel-dns-017.com` (A 216.198.79.65, 64.29.17.65). Zone `by0.link` hat Cloudflare-Nameserver, der Eintrag zeigt aber direkt auf Vercel: **kein Cloudflare-Proxy** (keine `cf-ray`-/`server: cloudflare`-Header) | DNS-Abfrage über dns.google am 18.11.2026; Header-Auswertung |
| http → https | `http://counter.bf0.by0.link/` → `308` nach `https://…/` durch Vercel | `curl -I http://…` |
| Weiterleitungen/Rewrites | keine `vercel.json`; Vercel nutzt `web/_redirects` **nicht** (`/github` → 404 `x-vercel-error: NOT_FOUND`) | `curl -I https://counter.bf0.by0.link/github` |
| Header-Datei | `web/_headers` ist Cloudflare-Pages-Format und wird auf Vercel **nicht angewendet**; die Datei wird nur als statische Datei ausgeliefert. Live gibt es also **keine CSP, keine Referrer-Policy, keine Permissions-Policy**; nur `strict-transport-security` und `access-control-allow-origin: *` (Vercel-Standard für statische Dateien) | `curl -I https://counter.bf0.by0.link/`, `curl https://counter.bf0.by0.link/_headers` |
| Functions/Middleware | keine (`api/`, `middleware.*` fehlen) | Repo-Inhalt |
| Vercel Web Analytics / Speed Insights | nicht eingebunden (kein `/_vercel/insights`- oder `/_vercel/speed-insights`-Skript, Live-HTML = `web/index.html`) | Live-Abgleich, Headless-Chromium |
| GitHub Pages | noch aktiv konfiguriert (`pages-build-deployment`), letzter Lauf 09.11.2026 fehlgeschlagen; `einfachruwen.github.io/Counter/` → 404. Wird von dieser Erklärung nicht erfasst | GitHub Actions/Deployments-API |
| Interne Dateien | `docs/`, `CLAUDE.md`, `src/`, `brand/`, `fastlane/` liegen außerhalb des Root Directory und werden nicht ausgeliefert → **keine `.vercelignore` nötig** | 404 auf `/brand/…`, `/src/…` |

## Verarbeitungen

| # | Verarbeitung | Daten | Fundstelle | Rechtsgrundlage | Speicherdauer | Beleg |
|---|---|---|---|---|---|---|
| 1 | Auslieferung durch Vercel, Request-Logs | IP, Zeit, Host, Pfad, Status, Referrer, User-Agent, aus IP abgeleiteter Ort | Hosting (s. o.) | Art. 6 Abs. 1 lit. f DSGVO | Dashboard: Hobby 1 h, Pro 1 Tag (Runtime Logs; statische Requests nur teilweise sichtbar). Vercel-intern: „minimum necessary period“, nicht konkret beziffert | vercel.com/docs/logs/runtime (Stand 28.08.2026), vercel.com/legal/privacy-notice (01.06.2026) |
| 2 | http→https-Weiterleitung | wie 1 | Vercel | wie 1 | wie 1 | `curl -I` |
| 3 | Drittlandübermittlung USA | wie 1 | – | Art. 45 DSGVO (EU-US DPF, Vercel „Active“, nächste Rezertifizierung 29.04.2027) | – | dataprivacyframework.gov/participant/6847; Vercel Privacy Notice, Abschnitt „Data Privacy Framework“ |
| 4 | localStorage `counter.web.v2` | Zählerstand, Stellen, Einstellungen (Design, Seniorenmodus, Tasten-/Schriftgröße, Vibration, Klickgeräusch, Wake Lock, Sprache), Ergebnisse (id, Wert, Stellen, frei wählbarer Name ≤ 60 Zeichen, ISO-Datum) | `web/app.js:10` (Schlüssel), `:170-201` (Defaults/sanitize), `:180` (lesen), `:212` (schreiben), `:735` (löschen über „Alle Daten löschen“), `:888` (Sync zwischen Tabs über `storage`-Event) | § 25 Abs. 2 Nr. 2 TDDDG; keine Übertragung | bis Nutzer löscht | Code; live: einziger Schlüssel `counter.web.v2` |
| 5 | Service Worker + Cache Storage (`counter-v2.0.3`) | App-Dateien, keine personenbezogenen Inhalte; Hintergrund-Aktualisierung → Requests an Vercel (#1) | `web/app.js:922-939` (Registrierung), `web/sw.js:3-9` (Cache/Assets), `:24-38` (stale-while-revalidate, nur same-origin GET) | § 25 Abs. 2 Nr. 2 TDDDG | bis Cache-Version wechselt oder Nutzer Website-Daten löscht | Code; live: SW-Scope `/`, Cache `counter-v2.0.2` (vor diesem PR) |
| 6 | Browsersprache | `navigator.languages` | `web/app.js:225` | lokal, keine Speicherung (nur explizite Wahl landet in #4) | – | Code |
| 7 | Geräte-APIs | Vibration (`:378`), Web Audio für Klick (`:383`), Wake Lock (`:790`), PWA-Install-Prompt (`:899`) | `web/app.js` | lokal, nichts übertragen | – | Code |
| 8 | CSV-Export | Ergebnisse als Blob-Download | `web/app.js:645-648` | lokal | – | Code |
| 9 | Schrift Roboto | selbst gehostet | `web/styles.css:4-6`, `web/fonts/` | keine Drittanbieter | – | Live: 0 Fremd-Requests |
| 10 | Externe Links (nur `<a href>`) | GitHub Repo/Issues/Profil, bf0.by0.link, fcrw.cc/imprint, Vercel Privacy Notice | `web/config.js:12-20`, gesetzt in `web/app.js:742-766`; `web/index.html:89-92,198-233,292-297`; `web/datenschutz/index.html` | – | – | Code |
| 11 | E-Mail-Kontakt | mailto auf Datenschutzseite | `web/datenschutz/index.html` (Abschnitte 1 und 9) | Art. 6 Abs. 1 lit. f | bis Anfrage erledigt | – |
| 12 | Formulare | „Zahl setzen“ (`index.html` `#set-form`) und Dialog (Ergebnisname) werden nur lokal verarbeitet: `e.preventDefault()` bzw. `method="dialog"`, kein Versand | `web/app.js:553-559`, `web/index.html` `<dialog>` | – | wie #4 | Code |

Nicht vorhanden (per `grep` und Headless-Chromium geprüft): Cookies, sessionStorage, IndexedDB, fetch/XHR/sendBeacon im App-Code (einziges `fetch` ist der Service Worker, nur same-origin), Analytics (kein Umami, kein Vercel Analytics/Speed Insights), iframes/Embeds, externe Skripte/Fonts/Bilder/CDNs. Live-Prüfung 18.11.2026 (1440 px, Hauptansicht + Einstellungen + Info + Ergebnisse): 10 Requests, 0 Fremd-Requests, 0 Cookies.

## Android-App (`src/`, Releases)

- Verteilt als `Counter.apk` über GitHub Releases v1.0, v1.1, v1.2 (2021) und über IzzyOnDroid (`dev.byzero.counter`, LastVersion v1.2, APK-Quelle GitHub). Release v1.5 hat kein APK.
- Geprüft mit androguard (v1.0 und v1.2): **keine Berechtigungen** (auch kein `INTERNET`), `allowBackup=true`, `usesCleartextTraffic=true`. `RequestNetwork`/OkHttp ist Sketchware-Boilerplate, `startRequestNetwork` wird nirgends aufgerufen; ohne `INTERNET` wäre Netzwerk ohnehin nicht möglich.
- Speicherung: `SharedPreferences("settings")` (`src/app/src/main/java/dev/byzero/counter/MainActivity.java:96`, `SettingsActivity.java:122`, `SetnumberActivity.java:80`).
- Links öffnen den Browser (`ACTION_VIEW`, `SettingsActivity.java:127-283`): github.com/byZeroOfficial/Counter, …/issues, byzero.dev (byzero.dev ist nicht mehr erreichbar; in alten APKs nicht änderbar).
- Entscheidung: Die App verarbeitet keine Daten außerhalb des Geräts; die Erklärung erwähnt sie in Abschnitt 7 nur informativ (Berechtigungen, lokale Speicherung, Android-Backup, Download über GitHub/IzzyOnDroid). Eine eigene App-Erklärung ist nicht nötig, solange keine neue APK mit Netzwerkzugriff erscheint.

## Rechtliches Gerüst der Erklärung

- Verantwortlicher: wie Impressum `https://fcrw.cc/imprint` (Geltungsbereich dort: focusonruwen.com, fcrw.cc, by0.link inkl. Subdomains) und zentrale Erklärung `https://focusonruwen.com/datenschutz/` (Stand 15.11.2026); beide nennen Ruwen Hohnholz, c/o Autorenglück #45094, Albert-Einstein-Str. 47, 02977 Hoyerswerda, info@focusonruwen.com.
- Betroffenenrechte Art. 15–18, 20; Widerspruch Art. 21 hervorgehoben; Beschwerde Art. 77 ohne konkrete Behörde.
- Keine automatisierte Entscheidung (Art. 22); keine Bereitstellungspflicht.
- Keine Einwilligungen → kein Widerruf nach Art. 7 Abs. 3 nötig, kein Cookie-Banner.

## Offene Punkte

1. **Vercel-Tarif / AVV:** Das Vercel-DPA gilt laut Vercel nur für Pro- und Enterprise-Kunden (vercel.com/legal/dpa, Abschnitt 1 und 4). Im Hobby-Tarif gibt es keinen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Erklärung formuliert deshalb neutral („verarbeitet Vercel“).
2. **Log-Aufbewahrung bei Vercel intern:** nicht konkret veröffentlicht.
3. **Aufsichtsbehörde:** offen (LfD Niedersachsen vs. LDI NRW); deshalb nur Art. 77 allgemein.
4. **`web/_headers` / `web/_redirects` wirken auf Vercel nicht.** Die gewünschte CSP und die alten Kurzlinks (`/github`, `/issue`, `/download`) sind live nicht aktiv. Für Vercel wäre eine `web/vercel.json` mit `headers`/`redirects` nötig. Datenschutzrechtlich ändert das nichts (keine Fremd-Requests; Browser-Standard-Referrer-Policy ist ohnehin `strict-origin-when-cross-origin`), sollte aber bewusst entschieden werden. Wird eine CSP aktiv, müssen `/datenschutz/` und alle Links weiter funktionieren (keine Inline-Skripte/-Styles auf der Seite).
5. **`web/README.md`** beschreibt noch Cloudflare Pages als Hoster.
6. **GitHub Pages** für das Repo ist noch aktiv (fehlschlagende Builds); ggf. in den Repo-Einstellungen abschalten.
7. **Zentrale Erklärung** auf focusonruwen.com nennt Counter nicht; ggf. dort auf `counter.bf0.by0.link/datenschutz/` verweisen.

## Pflege

Bei jeder Änderung, die Daten berührt, diese Datei **und** `web/datenschutz/index.html` (inkl. Stand-Datum) prüfen und anpassen. Siehe `CLAUDE.md`.
