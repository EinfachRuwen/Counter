# CLAUDE.md

Counter: `web/` is the web edition (plain HTML/CSS/JS PWA, no build step, no dependencies), deployed on Vercel with `web/` as root directory (live: counter.bf0.by0.link). `src/` is the original 2021 Android app (Sketchware), `fastlane/` its F-Droid/IzzyOnDroid metadata, `brand/` images for the README. Keep the web edition as it is: no frameworks, no trackers, no third-party requests, fonts self-hosted, all user data in `localStorage` only. Commit messages: short, imperative, capitalised (e.g. "Link to the Back from Zero hub at bf0.by0.link").

## Datenschutz

- The privacy policy lives at `web/datenschutz/index.html` (served at `/datenschutz/`); the technical record is `docs/PRIVACY-TECHNICAL.md`.
- **Whenever a change touches personal data or the browser** (new external resource, script, font, image or embed; analytics incl. Vercel Web Analytics/Speed Insights; cookies, localStorage keys or stored fields, sessionStorage, IndexedDB, service worker or cache; fetch/beacon; forms, mailto or new links; response headers, `vercel.json`, `_headers`/`_redirects`; hosting, domains, redirects or rewrites; Vercel functions/middleware; a new Android release or new Android permissions), check both files and update them in the same change, including the "Stand" date and the file:line references.
- `/datenschutz/` must stay directly reachable: no catch-all rewrite or 404 handling may swallow it. It is in the service worker's `ASSETS` (`web/sw.js`); bump `CACHE` whenever files change.
- Impressum (`https://fcrw.cc/imprint`) and `/datenschutz/` must stay linked from the counter view (small links bottom left), the settings ("Über Counter") and the app info page. Links are configured in `web/config.js` (`imprintUrl`, `privacyUrl`).
- `docs/` and this file sit outside `web/` and are therefore not deployed; no `.vercelignore` needed as long as the Vercel root directory stays `web/`.
