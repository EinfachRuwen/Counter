<p align="center">
  <img src="web/icons/icon-192.png" alt="Counter: two flip clock cards showing 1 and 4" width="112" height="112">
</p>

<h1 align="center">Counter</h1>

<p align="center">
  <b>“A counter with flip clock design.”</b><br>
  An Android app from 2021, built with Sketchware by byZero at the age of 13. Back in 2026 as a web app.
</p>

<p align="center">
  <img alt="Version 2.0" src="https://img.shields.io/badge/web-v2.0-616161?style=for-the-badge&labelColor=212121">
  <img alt="PWA: offline and installable" src="https://img.shields.io/badge/PWA-offline%20%26%20installable-444444?style=for-the-badge&labelColor=212121">
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-F44336?style=for-the-badge&labelColor=212121"></a>
</p>

<p align="center">
  <img src="brand/screenshots/web-classic.png" alt="Counter in the classic design" width="220">
  &nbsp;
  <img src="brand/screenshots/web-black.png" alt="Counter in the Black design" width="220">
  &nbsp;
  <img src="brand/screenshots/web-classic-settings.png" alt="Counter settings" width="220">
</p>

---

## 🔁 The Counter Revival

Counter is back, in your browser, in the original design: four flip cards, `+`, `−` and `RESET` on the
same grey `#444444`. No Play Store, no APK, nothing to install (though you can, as an app).

Back then, the idea list was a lot longer than what made it into the app. The Revival finally builds it:

- **Saved results.** Save the current count with a name, load it again, rename it, delete it or export everything as CSV.
- **A real senior mode.** Pick button size and font size with checkboxes that untick each other, like the idea list said.
  The old senior mode set the `+` and `−` text to 80sp inside 50dp buttons, so it never fit.
- **An info page** like in WhatsApp or Hauk: logo, version, changelog, thanks and licenses.
- **A donate button**, configured in [`web/config.js`](web/config.js).
- **The Black version** for Tim is back as a theme ([more below](#-the-black-version)).
- **The original Easter eggs are still in.** Count past 9999 and you get *“Did you really click for that long? :o”*,
  go below 0 and it says *“Welcome back :D”*. The digits still cascade from left to right in 100 ms steps.

Plus a few things that weren’t even on the list: a real split-flap animation, 3 to 6 digits, hold a button to count fast,
keyboard controls, vibration, a click sound, “keep screen on”, offline support, German and English.
No trackers and no external services. The Roboto font ships with the app, and everything stays in your browser.

### Bugs from 2021, fixed

| Bug | What happened |
|---|---|
| Reset and overflow didn’t save correctly | The state was saved *before* the cascading animation had set the digits, so the old value came back after a restart. |
| “Set count” could crash the app | Empty, negative or multi-digit input went straight into `Double.parseDouble()`. |
| Back stacked screens forever | Settings and “Set count” started a new main screen instead of going back. |
| Toast on every start | *“Loaded the state from the local storage”* popped up every time you opened the app. |
| Wrong version | The settings said `v1.1`, long after `v1.5` was out. |

## 📖 The story

| When | What happened |
|---|---|
| **18 Oct 2021** | *Initial commit.* **v1.0** and **v1.1** on the same day: count, reset and a flip clock design built from Sketchware blocks. A small site on `counter.byzero.dev` links to the source and the APK. |
| **20 Oct 2021** | **v1.2:** *“Counter – Update – Set Number”*. Tap the digits to set the count yourself. |
| **27 Oct 2021** | [ImgBot](https://imgbot.net) shrinks the images ([pull request 2](https://github.com/EinfachRuwen/Counter/pull/2)). |
| **31 Jan 2022** | **v1.3, the Black version:** *“Adding a Black Version for Tim”*. [Tim Trayler](https://github.com/TimTrayler) adds the black status bar ([pull request 3](https://github.com/EinfachRuwen/Counter/pull/3)). |
| **2 Apr 2022** | **v1.4:** [IzzySoft](https://github.com/IzzySoft) adds the fastlane metadata for F-Droid and IzzyOnDroid ([pull request 5](https://github.com/EinfachRuwen/Counter/pull/5)). |
| **27 Apr 2022** | **v1.5**, the last Android release. |
| **Nov 2026** | **The Revival.** Counter runs again, this time in the browser. |

## 🖤 The Black version

In January 2022, Counter got a special all-black version for **[Tim Trayler](https://github.com/TimTrayler)**
(tag `BLACK`, branch [`black`](../../tree/black)). Tim sent the black status bar himself.
The Revival brings it back under *Settings → Design → Black (Tim edition)*, with the exact colors from the branch:
`#000000` background, `#373737` buttons and `#101010` settings. Thanks, Tim!

## 🌐 Run it yourself

The web app lives in [`web/`](web). It is plain HTML, CSS and JavaScript, with no build step and no dependencies.

```bash
python3 -m http.server -d web
```

Then open `http://localhost:8000`.

**Cloudflare Pages:** connect this repository, set the production branch to `main`, leave the build command empty
and set the **build output directory to `web`**. Every push to `main` goes live. The old short links from the app
(`/github`, `/issue`, `/download`) keep working through [`web/_redirects`](web/_redirects).
More in [`web/README.md`](web/README.md).

## 🗂 What’s in this repository

| Path | Content |
|---|---|
| [`web/`](web) | The Revival: the web app, deployed on Cloudflare Pages |
| [`src/`](src) | The original Android app, exported from Sketchware (2021–2022) |
| [`fastlane/`](fastlane) | Store texts and screenshots of the Android app (F-Droid / IzzyOnDroid) |
| [`brand/`](brand) | Logo, banner and screenshots |
| Branch [`black`](../../tree/black) | The Black version for Tim (v1.3) |

Old APKs are on the [releases page](../../releases).

## ✨ Back from Zero

Counter is one of the old byZero projects that are getting switched back on:

| Project | From | Revival |
|---|---|---|
| **[ZeroBot](https://github.com/EinfachRuwen/ZeroBot)** 🍩 | A Discord bot from 2021 | A playable time capsule at [zerobot.by0.link](https://zerobot.by0.link) |
| **[WebsiteGenerator](https://github.com/WebsiteGenerator/WebsiteGenerator)** | A Python terminal generator for personal websites | A [web version](https://websitegenerator.github.io/WebsiteGenerator/) that runs in your browser |
| **Counter** | An Android app built with Sketchware (2021) | The web app in this repository |

## 📝 License

Copyright © 2021–2026 [byZero](https://github.com/EinfachRuwen).
This project is licensed under the [MIT License](LICENSE). The Roboto font is licensed under the Apache License 2.0.
