<p align="center">
  <img src="web/icons/icon-192.png" alt="Counter: two flip clock cards showing 1 and 4" width="112" height="112">
</p>

<h1 align="center">Counter</h1>

<p align="center">
  A counter with flip clock design.<br>
  Built with Sketchware in 2021 by byZero at 13, back in 2026 as a web app.
</p>

<p align="center">
  <img src="brand/screenshots/web-classic.png" alt="Counter in the classic design" width="220">
  &nbsp;
  <img src="brand/screenshots/web-black.png" alt="Counter in the Black design" width="220">
</p>

## 🔁 The Counter Revival

The original design, plus what was on the idea list back then:

- **Saved results**, with names, CSV export and undo
- **Senior mode** with bigger buttons and font sizes
- **Info page**, donate button and German/English
- **Black theme** from the 2022 version for [Tim Trayler](https://github.com/TimTrayler)
- **Offline and installable**, no trackers, everything stays in your browser

The old Easter eggs are still in, and the bugs from 2021 are fixed. The full list is in the app under *Settings → App info*.

<details>
<summary><b>📖 The story</b></summary>

| When | What happened |
|---|---|
| **Oct 2021** | v1.0 to v1.2 for Android: count, reset, set your own number. |
| **Jan 2022** | v1.3, the [Black version](../../tree/black) for Tim. Tim adds the black status bar. |
| **Apr 2022** | v1.4 and v1.5. [IzzySoft](https://github.com/IzzySoft) adds the F-Droid metadata. |
| **Nov 2026** | The Revival: Counter runs again, in the browser. |

</details>

## 🌐 Run it

Plain HTML, CSS and JavaScript in [`web/`](web). No build step.

```bash
python3 -m http.server -d web
```

Deployed with **Cloudflare Pages** from `main`, build output directory `web`. Details in [`web/README.md`](web/README.md).

The original Android app is in [`src/`](src). Old APKs are on the [releases page](../../releases).

## ✨ Back from Zero

Old byZero projects, switched back on:

| Project | Revival |
|---|---|
| [ZeroBot](https://github.com/EinfachRuwen/ZeroBot) 🍩 | [zerobot.by0.link](https://zerobot.by0.link) |
| [WebsiteGenerator](https://github.com/WebsiteGenerator/WebsiteGenerator) | [Web version](https://websitegenerator.github.io/WebsiteGenerator/) |
| Counter | this repository |

## 📝 License

© 2021–2026 [byZero](https://github.com/EinfachRuwen) · [MIT](LICENSE)
