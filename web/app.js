/*
 * Counter – Web-Edition (Nostalgie – Revived)
 * Nachbau der Android-App "Counter" (2021, Sketchware) als Progressive Web App.
 * MIT License – © 2021–2026 byZero
 */
(() => {
  "use strict";

  const VERSION = "2.0.0";
  const STORAGE_KEY = "counter.web.v2";
  const CONFIG = Object.assign({
    author: "byZero", donateUrl: "", revivalUrl: "", sourceUrl: "", issuesUrl: "", websiteUrl: "", imprintUrl: ""
  }, window.COUNTER_CONFIG || {});

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ------------------------------------------------------------------ *
   * Texte (DE / EN)
   * ------------------------------------------------------------------ */
  const STRINGS = {
    de: {
      back: "Zurück", settings: "Einstellungen", resultsTitle: "Ergebnisse", results: "Gespeicherte Ergebnisse", saveResult: "Ergebnis speichern",
      exportCsv: "Als CSV exportieren", clearResults: "Alle Ergebnisse löschen",
      setCount: "Zahl setzen", plus: "Plus", minus: "Minus", reset: "RESET",
      kbdHint: "Tastatur: ↑ / + zählen · ↓ / − zurück · R Reset · S speichern",
      setHelp: "Tippe die Ziffern ein – oder füge eine ganze Zahl ein.", apply: "Übernehmen",
      secView: "Ansicht", theme: "Design", themeClassic: "Klassisch", themeBlack: "Black (Tim-Edition)",
      thanks: "Danke",
      thanksText: "An Tim Trayler – für ihn entstand 2022 die Black-Version, inklusive seiner schwarzen Statusleiste. Und an IzzySoft für die F-Droid-Metadaten.",
      revival: "Teil von „Back from Zero“ – alte Projekte, wieder zum Leben erweckt",
      seniorMode: "Seniorenmodus", seniorModeSub: "Größere Tasten und größere Schrift",
      btnSize: "Tastengröße", fontSize: "Schriftgröße der Tasten",
      sizeL: "Groß", sizeXL: "Sehr groß", sizeXXL: "Riesig",
      digits: "Anzahl der Stellen",
      secControl: "Bedienung", vibrate: "Vibration", vibrateSub: "Kurzes Feedback bei jedem Tippen",
      sound: "Klickgeräusch", soundSub: "Klackern wie bei einer echten Fallblattanzeige",
      wakeLock: "Bildschirm anlassen", wakeLockSub: "Verhindert, dass das Display beim Zählen ausgeht",
      language: "Sprache", langAuto: "Automatisch",
      secSupport: "Unterstützen", donate: "Spenden", donateSub: "Dir gefällt Counter? Spendier mir einen Kaffee ☕",
      secAbout: "Über Counter", appInfo: "App-Info", sourceCode: "Quellcode", reportIssue: "Problem melden", website: "Meine Website",
      install: "Als App installieren", installSub: "Counter auf dem Startbildschirm – funktioniert auch offline",
      secData: "Daten", wipe: "Alle Daten löschen", wipeSub: "Zähler, Ergebnisse und Einstellungen zurücksetzen",
      noResults: "Noch keine Ergebnisse gespeichert. Tippe auf dem Zähler oben auf das Lesezeichen, um den aktuellen Stand zu sichern.",
      tagline: "Ein Zähler im Rolodex-Design · Web-Edition",
      story: "Counter entstand 2021 als Android-App – gebaut mit Sketchware. Diese Web-Version holt das Original-Design zurück und bringt endlich die Funktionen mit, die damals auf der Ideenliste standen.",
      whatsNew: "Was ist neu", licenses: "Lizenzen", fullLicense: "Vollständigen Lizenztext anzeigen", imprint: "Impressum",
      madeWith: "Mit ❤️ gezählt – Nostalgie, revived.",
      versionWeb: (v) => `Version ${v} (Web)`,
      overflow: "Hast du wirklich so lange geklickt? :o",
      underflow: "Willkommen zurück :D",
      resetDone: "Zähler zurückgesetzt", undo: "Rückgängig",
      saveTitle: "Ergebnis speichern", saveText: (v) => `Aktueller Stand: ${v}`, namePlaceholder: (n) => `Ergebnis ${n}`,
      save: "Speichern", cancel: "Abbrechen", ok: "OK", saved: "Ergebnis gespeichert", show: "Anzeigen",
      renameTitle: "Umbenennen", rename: "Umbenennen", load: "In Zähler laden", del: "Löschen",
      loaded: (v) => `${v} in den Zähler geladen`, deleted: "Ergebnis gelöscht",
      clearTitle: "Alle Ergebnisse löschen?", clearText: "Das kann nicht rückgängig gemacht werden.", clear: "Löschen",
      wipeTitle: "Alle Daten löschen?", wipeText: "Zähler, gespeicherte Ergebnisse und Einstellungen werden auf diesem Gerät gelöscht.",
      wiped: "Alle Daten gelöscht", nothingToExport: "Keine Ergebnisse zum Exportieren",
      truncated: (v) => `Zu viele Stellen – Zähler steht jetzt auf ${v}`,
      setTo: (v) => `Zähler auf ${v} gesetzt`, digitLabel: (i, n) => `Stelle ${i} von ${n}`,
      storageWarn: "Speichern nicht möglich – privater Modus? Dein Stand geht beim Schließen verloren.",
      offlineReady: "Counter funktioniert jetzt auch offline", updateReady: "Neue Version verfügbar", reload: "Neu laden",
      csvHead: ["Name", "Wert", "Datum"],
      changelog: [
        ["2.0.0 · Web-Edition (2026)", [
          "Counter läuft jetzt im Browser – installierbar und offline nutzbar",
          "Ergebnisse speichern, umbenennen, wieder laden und als CSV exportieren",
          "Seniorenmodus: Tastengröße und Schriftgröße per Kästchen wählbar",
          "App-Info-Seite, Spenden-Button und Sprachwahl (Deutsch/English)",
          "3 bis 6 Stellen, echte Fallblatt-Animation, Taste gedrückt halten zum schnellen Zählen",
          "Tastatur-Steuerung, Vibration, Klickgeräusch und „Bildschirm anlassen“",
          "Reset mit „Rückgängig“",
          "Die Black-Version für Tim ist zurück – als Design zum Umschalten"
        ]],
        ["Fehlerbehebungen", [
          "Reset und Überlauf (9999 → 0) wurden falsch gespeichert, weil vor der Animation gesichert wurde",
          "Absturz bei leerer, negativer oder mehrstelliger Eingabe unter „Zahl setzen“",
          "Zurück-Navigation hat Bildschirme endlos übereinander gestapelt",
          "Seniorenmodus: die riesige Schrift passte nicht in die Tasten",
          "Hinweis „Loaded the state …“ erschien bei jedem Start",
          "Versionsanzeige zeigte v1.1 statt der aktuellen Version"
        ]],
        ["1.3 · Black-Version (2022)", [
          "Sonderversion für Tim: komplett schwarz, mit schwarzer Statusleiste von Tim Trayler"
        ]],
        ["1.x · Android (2021–2022)", [
          "Die Original-App, gebaut mit Sketchware: Zählen, Zahl setzen, Reset und Seniorenmodus"
        ]]
      ]
    },
    en: {
      back: "Back", settings: "Settings", resultsTitle: "Results", results: "Saved results", saveResult: "Save result",
      exportCsv: "Export as CSV", clearResults: "Delete all results",
      setCount: "Set count", plus: "Plus", minus: "Minus", reset: "RESET",
      kbdHint: "Keyboard: ↑ / + count · ↓ / − back · R reset · S save",
      setHelp: "Type the digits – or paste a whole number.", apply: "Apply",
      secView: "View", theme: "Theme", themeClassic: "Classic", themeBlack: "Black (Tim edition)",
      thanks: "Thanks",
      thanksText: "To Tim Trayler – the Black version was made for him in 2022, including his black status bar. And to IzzySoft for the F-Droid metadata.",
      revival: "Part of “Back from Zero” – old projects, brought back to life",
      seniorMode: "Senior mode", seniorModeSub: "Bigger buttons and bigger text",
      btnSize: "Button size", fontSize: "Button font size",
      sizeL: "Large", sizeXL: "Extra large", sizeXXL: "Huge",
      digits: "Number of digits",
      secControl: "Controls", vibrate: "Vibration", vibrateSub: "Short feedback on every tap",
      sound: "Click sound", soundSub: "Clacks like a real split-flap display",
      wakeLock: "Keep screen on", wakeLockSub: "Stops the display from turning off while counting",
      language: "Language", langAuto: "Automatic",
      secSupport: "Support", donate: "Donate", donateSub: "Enjoying Counter? Buy me a coffee ☕",
      secAbout: "About Counter", appInfo: "App info", sourceCode: "Source code", reportIssue: "Report an issue", website: "My website",
      install: "Install as app", installSub: "Counter on your home screen – works offline too",
      secData: "Data", wipe: "Delete all data", wipeSub: "Reset counter, results and settings",
      noResults: "No results saved yet. Tap the bookmark at the top of the counter to save the current count.",
      tagline: "A counter with flip clock design · Web edition",
      story: "Counter started in 2021 as an Android app built with Sketchware. This web version brings back the original design – plus the features that were on the idea list back then.",
      whatsNew: "What's new", licenses: "Licenses", fullLicense: "Show full license text", imprint: "Imprint",
      madeWith: "Counted with ❤️ – nostalgia, revived.",
      versionWeb: (v) => `Version ${v} (Web)`,
      overflow: "Did you really click for that long? :o",
      underflow: "Welcome back :D",
      resetDone: "Counter reset", undo: "Undo",
      saveTitle: "Save result", saveText: (v) => `Current count: ${v}`, namePlaceholder: (n) => `Result ${n}`,
      save: "Save", cancel: "Cancel", ok: "OK", saved: "Result saved", show: "Show",
      renameTitle: "Rename", rename: "Rename", load: "Load into counter", del: "Delete",
      loaded: (v) => `Loaded ${v} into the counter`, deleted: "Result deleted",
      clearTitle: "Delete all results?", clearText: "This cannot be undone.", clear: "Delete",
      wipeTitle: "Delete all data?", wipeText: "Counter, saved results and settings will be deleted on this device.",
      wiped: "All data deleted", nothingToExport: "No results to export",
      truncated: (v) => `Too many digits – counter is now at ${v}`,
      setTo: (v) => `Counter set to ${v}`, digitLabel: (i, n) => `Digit ${i} of ${n}`,
      storageWarn: "Can't save – private mode? Your count will be lost when you close the page.",
      offlineReady: "Counter now works offline", updateReady: "New version available", reload: "Reload",
      csvHead: ["Name", "Value", "Date"],
      changelog: [
        ["2.0.0 · Web edition (2026)", [
          "Counter now runs in the browser – installable and usable offline",
          "Save, rename, reload and export results as CSV",
          "Senior mode: pick button size and font size with checkboxes",
          "App info page, donate button and language choice (Deutsch/English)",
          "3 to 6 digits, real split-flap animation, hold a button to count fast",
          "Keyboard controls, vibration, click sound and “keep screen on”",
          "Reset with “Undo”",
          "The Black version for Tim is back – as a switchable theme"
        ]],
        ["Bug fixes", [
          "Reset and overflow (9999 → 0) were saved incorrectly because saving happened before the animation",
          "Crash on empty, negative or multi-digit input in “Set count”",
          "Back navigation stacked screens on top of each other forever",
          "Senior mode: the huge font didn't fit into the buttons",
          "“Loaded the state …” message popped up on every start",
          "Version info showed v1.1 instead of the current version"
        ]],
        ["1.3 · Black version (2022)", [
          "Special version for Tim: all black, with a black status bar by Tim Trayler"
        ]],
        ["1.x · Android (2021–2022)", [
          "The original app built with Sketchware: count, set count, reset and senior mode"
        ]]
      ]
    }
  };

  /* ------------------------------------------------------------------ *
   * Zustand & Speicher
   * ------------------------------------------------------------------ */
  const DEFAULTS = {
    value: 0, digits: 4,
    senior: false, btnSize: "xl", fontSize: "xl",
    vibrate: true, sound: false, wakeLock: false, lang: "auto", theme: "classic",
    results: []
  };
  let storageOk = true;

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return sanitize(raw ? JSON.parse(raw) : {});
    } catch (e) {
      storageOk = false;
      return sanitize({});
    }
  }
  function sanitize(s) {
    const out = Object.assign({}, DEFAULTS, s && typeof s === "object" ? s : {});
    out.digits = [3, 4, 5, 6].includes(+out.digits) ? +out.digits : 4;
    out.value = clampInt(out.value, 0, 10 ** out.digits - 1);
    if (!["l", "xl", "xxl"].includes(out.btnSize)) out.btnSize = DEFAULTS.btnSize;
    if (!["l", "xl", "xxl"].includes(out.fontSize)) out.fontSize = DEFAULTS.fontSize;
    if (!["auto", "de", "en"].includes(out.lang)) out.lang = "auto";
    if (!["classic", "black"].includes(out.theme)) out.theme = "classic";
    for (const k of ["senior", "vibrate", "sound", "wakeLock"]) out[k] = !!out[k];
    out.results = Array.isArray(out.results) ? out.results.filter(r => r && Number.isFinite(+r.value)).map(r => ({
      id: String(r.id || uid()), value: clampInt(r.value, 0, 999999), digits: [3, 4, 5, 6].includes(+r.digits) ? +r.digits : 4,
      name: String(r.name || "").slice(0, 60), date: String(r.date || new Date().toISOString())
    })) : [];
    return out;
  }
  function clampInt(v, min, max) {
    v = Math.trunc(Number(v));
    if (!Number.isFinite(v)) return min;
    return Math.min(max, Math.max(min, v));
  }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  let state = load();
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      storageOk = true;
    } catch (e) {
      if (storageOk) { storageOk = false; snackbar(t("storageWarn")); }
    }
  }

  /* ------------------------------------------------------------------ *
   * i18n
   * ------------------------------------------------------------------ */
  let lang = "de";
  function resolveLang() {
    if (state.lang !== "auto") return state.lang;
    const langs = navigator.languages || [navigator.language || "de"];
    for (const l of langs) {
      const code = String(l).slice(0, 2).toLowerCase();
      if (code === "de" || code === "en") return code;
    }
    return "en";
  }
  function t(key, ...args) {
    const v = (STRINGS[lang] && STRINGS[lang][key]) ?? STRINGS.de[key];
    return typeof v === "function" ? v(...args) : v;
  }
  function applyI18n() {
    lang = resolveLang();
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-label]").forEach(el => {
      const label = t(el.dataset.i18nLabel);
      el.setAttribute("aria-label", label);
      if (el.tagName === "BUTTON") el.title = label;
    });
    $("#settings-version").textContent = t("versionWeb", VERSION);
    $("#info-version").textContent = t("versionWeb", VERSION);
    renderChangelog();
    updateToolbar();
    updateFlapsLabel();
    if (currentView === "results") renderResults();
    if (currentView === "set") buildSetInputs();
  }
  function fmtNum(v) { return String(v); }
  function fmtDate(iso) {
    try {
      return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
    } catch (e) { return iso; }
  }

  /* ------------------------------------------------------------------ *
   * Fallblatt-Ziffer
   * ------------------------------------------------------------------ */
  class Flap {
    constructor(value) {
      this.el = document.createElement("span");
      this.el.className = "flap";
      this.el.innerHTML =
        '<span class="half top"><span></span></span>' +
        '<span class="half bottom"><span></span></span>' +
        '<span class="hinge"></span>';
      this.top = this.el.querySelector(".half.top span");
      this.bottom = this.el.querySelector(".half.bottom span");
      this.value = value;
      this.top.textContent = this.bottom.textContent = value;
      this.leaves = null;
    }
    finish() {
      if (!this.leaves) return;
      this.leaves.anims.forEach(a => a.cancel());
      this.leaves.els.forEach(e => e.remove());
      this.bottom.textContent = this.value;
      this.leaves = null;
    }
    set(value, duration) {
      if (value === this.value) return;
      this.finish();
      const old = this.value;
      this.value = value;
      this.top.textContent = value;
      if (reducedMotion.matches || !this.el.animate || duration <= 0) {
        this.bottom.textContent = value;
        return;
      }
      const leafTop = document.createElement("span");
      leafTop.className = "leaf top";
      leafTop.innerHTML = "<span></span>";
      leafTop.firstChild.textContent = old;
      const leafBottom = document.createElement("span");
      leafBottom.className = "leaf bottom";
      leafBottom.innerHTML = "<span></span>";
      leafBottom.firstChild.textContent = value;
      this.el.insertBefore(leafTop, this.el.querySelector(".hinge"));
      this.el.insertBefore(leafBottom, this.el.querySelector(".hinge"));
      const half = duration / 2;
      const a1 = leafTop.animate(
        [{ transform: "rotateX(0deg)", filter: "brightness(1)" }, { transform: "rotateX(-90deg)", filter: "brightness(.6)" }],
        { duration: half, easing: "ease-in", fill: "forwards" });
      const a2 = leafBottom.animate(
        [{ transform: "rotateX(90deg)", filter: "brightness(1.4)" }, { transform: "rotateX(0deg)", filter: "brightness(1)" }],
        { duration: half, delay: half, easing: "cubic-bezier(.2,.9,.3,1.2)", fill: "both" });
      this.leaves = { anims: [a1, a2], els: [leafTop, leafBottom] };
      a2.onfinish = () => { if (this.leaves && this.leaves.anims[1] === a2) this.finish(); };
    }
  }

  const flapsEl = $("#flaps");
  let flaps = [];
  let cascadeTimers = [];

  function buildFlaps() {
    cascadeTimers.forEach(clearTimeout); cascadeTimers = [];
    flapsEl.textContent = "";
    document.documentElement.style.setProperty("--n", state.digits);
    const str = pad(state.value);
    flaps = Array.from(str, d => new Flap(d));
    flaps.forEach(f => flapsEl.appendChild(f.el));
    updateFlapsLabel();
  }
  function pad(v) { return String(v).padStart(state.digits, "0"); }
  function updateFlapsLabel() {
    flapsEl.setAttribute("aria-label", `${state.value} – ${t("setCount")}`);
  }

  let flipDuration = 300;
  function renderValue(cascade) {
    cascadeTimers.forEach(clearTimeout); cascadeTimers = [];
    const str = pad(state.value);
    flaps.forEach((f, i) => {
      if (cascade && f.value !== str[i]) {
        // Wie im Original: Ziffern nacheinander im 100-ms-Takt, von links nach rechts
        cascadeTimers.push(setTimeout(() => f.set(str[i], flipDuration), i * 100));
      } else {
        f.set(str[i], flipDuration);
      }
    });
    updateFlapsLabel();
  }

  function setValue(v, opts = {}) {
    state.value = clampInt(v, 0, 10 ** state.digits - 1);
    save(); // Bugfix: Stand wird sofort gespeichert, nicht erst nach der Animation
    renderValue(!!opts.cascade);
  }

  function step(dir) {
    const max = 10 ** state.digits;
    let v = state.value + dir;
    let cascade = false;
    if (v >= max) { v = 0; cascade = true; snackbar(t("overflow")); }
    else if (v < 0) { v = max - 1; cascade = true; snackbar(t("underflow")); }
    setValue(v, { cascade });
    feedback();
  }

  function reset() {
    const prev = state.value;
    if (prev === 0) return;
    setValue(0, { cascade: true });
    feedback();
    snackbar(t("resetDone"), t("undo"), () => setValue(prev, { cascade: true }));
  }

  /* ------------------------------------------------------------------ *
   * Feedback: Vibration & Klickgeräusch
   * ------------------------------------------------------------------ */
  let audioCtx = null;
  function feedback() {
    if (state.vibrate && navigator.vibrate) { try { navigator.vibrate(8); } catch (e) { /* ignore */ } }
    if (state.sound) clack();
  }
  function clack() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const now = audioCtx.currentTime;
      const len = Math.floor(audioCtx.sampleRate * 0.03);
      const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      const src = audioCtx.createBufferSource();
      src.buffer = buf;
      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass"; filter.frequency.value = 2200; filter.Q.value = 1.2;
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.5, now);
      src.connect(filter).connect(gain).connect(audioCtx.destination);
      src.start(now);
    } catch (e) { /* kein Audio verfügbar */ }
  }

  /* ------------------------------------------------------------------ *
   * Plus/Minus mit "gedrückt halten"
   * ------------------------------------------------------------------ */
  function bindRepeat(btn, dir) {
    let holdTimer = null, repeatTimer = null, interval = 0, active = false;
    const stop = () => {
      active = false;
      clearTimeout(holdTimer); clearTimeout(repeatTimer);
      btn.classList.remove("is-pressed");
      flipDuration = 300;
    };
    const repeat = () => {
      if (!active) return;
      step(dir);
      interval = Math.max(45, interval * 0.88);
      flipDuration = Math.min(300, interval * 0.9);
      repeatTimer = setTimeout(repeat, interval);
    };
    btn.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      try { btn.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      active = true;
      btn.classList.add("is-pressed");
      step(dir);
      interval = 140;
      holdTimer = setTimeout(repeat, 450);
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(ev => btn.addEventListener(ev, stop));
    window.addEventListener("blur", stop);
    btn.addEventListener("contextmenu", e => e.preventDefault());
    // Tastatur-Aktivierung (Enter/Leertaste auf dem fokussierten Button)
    btn.addEventListener("click", (e) => { if (e.detail === 0) step(dir); });
  }

  /* ------------------------------------------------------------------ *
   * Navigation (Hash-Router mit echtem Zurück)
   * ------------------------------------------------------------------ */
  const VIEWS = {
    main: { title: () => "Counter", parent: null },
    set: { title: () => t("setCount"), parent: "main" },
    settings: { title: () => t("settings"), parent: "main" },
    results: { title: () => t("resultsTitle"), parent: "main" },
    info: { title: () => t("appInfo"), parent: "settings" }
  };
  let currentView = "main";

  function viewFromHash() {
    const name = (location.hash || "").replace(/^#\/?/, "");
    return VIEWS[name] ? name : "main";
  }
  function navigate(name) {
    if (name === currentView) return;
    const depth = (history.state && history.state.depth) || 0;
    history.pushState({ depth: depth + 1 }, "", name === "main" ? "#/" : "#/" + name);
    show(name);
  }
  function goBack() {
    const parent = VIEWS[currentView].parent;
    if (!parent) return;
    if (history.state && history.state.depth > 0) history.back();
    else {
      history.replaceState({ depth: 0 }, "", parent === "main" ? "#/" : "#/" + parent);
      show(parent);
    }
  }
  function show(name) {
    if (Date.now() - sbShownAt > 600) hideSnackbar();
    if (currentView === "set" && name !== "set") document.activeElement && document.activeElement.blur();
    currentView = name;
    $$(".view").forEach(v => { v.hidden = v.dataset.view !== name; });
    document.body.classList.toggle("has-fab", name === "main" || name === "settings");
    if (name === "set") buildSetInputs();
    if (name === "results") renderResults();
    updateToolbar();
    window.scrollTo(0, 0);
    updateWakeLock();
  }
  function updateToolbar() {
    const v = VIEWS[currentView];
    $("#tb-title").textContent = v.title();
    $("#tb-back").hidden = !v.parent;
    $("#tb-actions-main").hidden = currentView !== "main";
    $("#tb-actions-results").hidden = currentView !== "results";
    document.title = currentView === "main" ? "Counter" : `${v.title()} · Counter`;
  }

  /* ------------------------------------------------------------------ *
   * Zahl setzen
   * ------------------------------------------------------------------ */
  const setInputs = $("#set-inputs");
  function buildSetInputs() {
    setInputs.textContent = "";
    const str = pad(state.value);
    for (let i = 0; i < state.digits; i++) {
      const inp = document.createElement("input");
      inp.type = "text";
      inp.inputMode = "numeric";
      inp.pattern = "[0-9]";
      inp.maxLength = 1;
      inp.placeholder = "0";
      inp.value = str[i];
      inp.setAttribute("aria-label", t("digitLabel", i + 1, state.digits));
      setInputs.appendChild(inp);
    }
    requestAnimationFrame(() => { const f = setInputs.firstChild; if (f) { f.focus(); f.select(); } });
  }
  function distribute(digits, startIdx) {
    const inputs = $$("input", setInputs);
    // Ganze Zahl eingefügt → rechtsbündig verteilen
    if (digits.length >= inputs.length || startIdx === 0) {
      const s = digits.slice(-inputs.length).padStart(inputs.length, "0");
      inputs.forEach((inp, i) => { inp.value = s[i]; });
      inputs[inputs.length - 1].focus();
    } else {
      let i = startIdx;
      for (const d of digits) { if (i >= inputs.length) break; inputs[i++].value = d; }
      (inputs[Math.min(i, inputs.length - 1)]).focus();
    }
  }
  setInputs.addEventListener("input", (e) => {
    const inp = e.target;
    const inputs = $$("input", setInputs);
    const idx = inputs.indexOf(inp);
    const digits = inp.value.replace(/\D/g, "");
    if (digits.length > 1) { distribute(digits, idx); return; }
    inp.value = digits; // Bugfix: nur 0–9 erlaubt, kein Minus, keine Buchstaben
    if (digits && idx < inputs.length - 1) { inputs[idx + 1].focus(); inputs[idx + 1].select(); }
  });
  setInputs.addEventListener("paste", (e) => {
    const text = (e.clipboardData || window.clipboardData).getData("text") || "";
    const digits = text.replace(/\D/g, "");
    if (!digits) { e.preventDefault(); return; }
    e.preventDefault();
    distribute(digits, $$("input", setInputs).indexOf(e.target));
  });
  setInputs.addEventListener("keydown", (e) => {
    const inputs = $$("input", setInputs);
    const idx = inputs.indexOf(e.target);
    if (e.key === "Backspace" && !e.target.value && idx > 0) {
      e.preventDefault(); inputs[idx - 1].value = ""; inputs[idx - 1].focus();
    } else if (e.key === "ArrowLeft" && idx > 0) {
      e.preventDefault(); inputs[idx - 1].focus(); inputs[idx - 1].select();
    } else if (e.key === "ArrowRight" && idx < inputs.length - 1) {
      e.preventDefault(); inputs[idx + 1].focus(); inputs[idx + 1].select();
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const d = (parseInt(e.target.value || "0", 10) + (e.key === "ArrowUp" ? 1 : 9)) % 10;
      e.target.value = d; e.target.select();
    }
  });
  setInputs.addEventListener("focusin", (e) => { if (e.target.select) e.target.select(); });
  $("#set-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const str = $$("input", setInputs).map(i => (i.value.replace(/\D/g, "") || "0").slice(-1)).join("");
    const v = parseInt(str, 10) || 0; // Bugfix: leere Felder zählen als 0 statt abzustürzen
    goBack();
    setValue(v, { cascade: true });
  });

  /* ------------------------------------------------------------------ *
   * Ergebnisse
   * ------------------------------------------------------------------ */
  async function saveResult() {
    const n = state.results.length + 1;
    const name = await dialog({
      title: t("saveTitle"), text: t("saveText", pad(state.value)),
      input: { value: "", placeholder: t("namePlaceholder", n) }, ok: t("save")
    });
    if (name === null) return;
    state.results.unshift({ id: uid(), value: state.value, digits: state.digits, name: name.trim() || t("namePlaceholder", n), date: new Date().toISOString() });
    save();
    snackbar(t("saved"), t("show"), () => navigate("results"));
  }

  const resultsList = $("#results-list");
  function renderResults() {
    resultsList.textContent = "";
    $("#results-empty").hidden = state.results.length > 0;
    $("#btn-export").disabled = $("#btn-clear-results").disabled = !state.results.length;
    for (const r of state.results) {
      const li = document.createElement("li");
      li.className = "result";
      li.dataset.id = r.id;
      const val = document.createElement("div");
      val.className = "result-value";
      val.setAttribute("aria-hidden", "true");
      for (const d of String(r.value).padStart(r.digits, "0")) {
        const m = document.createElement("span"); m.className = "mini"; m.textContent = d; val.appendChild(m);
      }
      const txt = document.createElement("div");
      txt.className = "result-text";
      const nm = document.createElement("span"); nm.className = "result-name"; nm.textContent = r.name;
      const dt = document.createElement("span"); dt.className = "result-date"; dt.textContent = `${r.value} · ${fmtDate(r.date)}`;
      txt.append(nm, dt);
      const actions = document.createElement("div");
      actions.className = "result-actions";
      actions.append(
        iconButton("i-restore", t("load"), "load"),
        iconButton("i-edit", t("rename"), "rename"),
        iconButton("i-delete", t("del"), "delete"));
      li.append(val, txt, actions);
      resultsList.appendChild(li);
    }
  }
  function iconButton(icon, label, action) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "icon-btn"; b.dataset.action = action;
    b.title = label; b.setAttribute("aria-label", label);
    b.innerHTML = `<svg><use href="#${icon}"/></svg>`;
    return b;
  }
  resultsList.addEventListener("click", async (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const id = btn.closest(".result").dataset.id;
    const idx = state.results.findIndex(r => r.id === id);
    if (idx < 0) return;
    const r = state.results[idx];
    if (btn.dataset.action === "load") {
      const prevValue = state.value, prevDigits = state.digits;
      if (r.digits > state.digits) { state.digits = r.digits; buildFlaps(); syncSettingsUI(); }
      goBack();
      setValue(r.value, { cascade: true });
      snackbar(t("loaded", r.value), t("undo"), () => {
        if (state.digits !== prevDigits) { state.digits = prevDigits; state.value = prevValue; save(); buildFlaps(); syncSettingsUI(); }
        else setValue(prevValue, { cascade: true });
      });
    } else if (btn.dataset.action === "rename") {
      const name = await dialog({ title: t("renameTitle"), input: { value: r.name, placeholder: r.name }, ok: t("ok") });
      if (name === null || !name.trim()) return;
      r.name = name.trim(); save(); renderResults();
    } else if (btn.dataset.action === "delete") {
      state.results.splice(idx, 1); save(); renderResults();
      snackbar(t("deleted"), t("undo"), () => {
        state.results.splice(Math.min(idx, state.results.length), 0, r); save(); renderResults();
      });
    }
  });
  function exportCsv() {
    if (!state.results.length) { snackbar(t("nothingToExport")); return; }
    const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
    const rows = [t("csvHead").map(q).join(";")].concat(
      state.results.map(r => [q(r.name), r.value, q(fmtDate(r.date))].join(";")));
    const blob = new Blob(["﻿" + rows.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `counter-${lang === "de" ? "ergebnisse" : "results"}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
  async function clearResults() {
    if (!state.results.length) return;
    const ok = await dialog({ title: t("clearTitle"), text: t("clearText"), ok: t("clear") });
    if (ok === null) return;
    state.results = []; save(); renderResults();
  }

  /* ------------------------------------------------------------------ *
   * Einstellungen
   * ------------------------------------------------------------------ */
  function applyView() {
    const b = document.body.classList;
    ["senior", "btn-l", "btn-xl", "btn-xxl", "fs-l", "fs-xl", "fs-xxl"].forEach(c => b.remove(c));
    if (state.senior) b.add("senior", "btn-" + state.btnSize, "fs-" + state.fontSize);
    b.toggle("theme-black", state.theme === "black");
    const color = state.theme === "black" ? "#000000" : "#444444";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", color);
  }
  function syncSettingsUI() {
    $("#opt-senior").checked = state.senior;
    $("#opt-vibrate").checked = state.vibrate;
    $("#opt-sound").checked = state.sound;
    $("#opt-wakelock").checked = state.wakeLock;
    $("#senior-options").classList.toggle("is-disabled", !state.senior);
    $$("#senior-options .box").forEach(b => { b.tabIndex = state.senior ? 0 : -1; });
    $$(".boxes[data-setting]").forEach(group => {
      const cur = String(state[group.dataset.setting]);
      $$(".box", group).forEach(box => box.setAttribute("aria-checked", String(box.dataset.value === cur)));
    });
  }
  function bindSwitch(id, key, after) {
    $(id).addEventListener("change", (e) => { state[key] = e.target.checked; save(); syncSettingsUI(); after && after(); });
  }
  bindSwitch("#opt-senior", "senior", applyView);
  bindSwitch("#opt-vibrate", "vibrate", () => { if (state.vibrate) feedback(); });
  bindSwitch("#opt-sound", "sound", () => { if (state.sound) clack(); });
  bindSwitch("#opt-wakelock", "wakeLock", updateWakeLock);

  // Kästchen, die sich gegenseitig deaktivieren (Radio-Verhalten)
  $$(".boxes[data-setting]").forEach(group => {
    group.addEventListener("click", (e) => {
      const box = e.target.closest(".box");
      if (box) chooseBox(group, box);
    });
    group.addEventListener("keydown", (e) => {
      const boxes = $$(".box", group);
      const i = boxes.indexOf(document.activeElement);
      if (i < 0) return;
      let j = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % boxes.length;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i - 1 + boxes.length) % boxes.length;
      if (j !== null) { e.preventDefault(); boxes[j].focus(); chooseBox(group, boxes[j]); }
    });
  });
  function chooseBox(group, box) {
    const key = group.dataset.setting;
    const raw = box.dataset.value;
    if (key === "digits") {
      const n = +raw;
      if (n === state.digits) return;
      const prevValue = state.value, prevDigits = state.digits;
      state.digits = n;
      const max = 10 ** n - 1;
      if (state.value > max) {
        state.value = state.value % (10 ** n);
        snackbar(t("truncated", state.value), t("undo"), () => {
          state.digits = prevDigits; state.value = prevValue; save(); buildFlaps(); syncSettingsUI();
        });
      }
      save(); buildFlaps();
    } else {
      state[key] = raw;
      save();
      if (key === "lang") applyI18n();
      applyView();
    }
    syncSettingsUI();
  }

  $("#btn-wipe").addEventListener("click", async () => {
    const ok = await dialog({ title: t("wipeTitle"), text: t("wipeText"), ok: t("clear") });
    if (ok === null) return;
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    state = sanitize({});
    save();
    applyI18n(); applyView(); buildFlaps(); syncSettingsUI(); updateWakeLock();
    snackbar(t("wiped"));
  });

  function setupLinks() {
    const link = (sel, url, subSel) => {
      const el = $(sel);
      if (!url) { el.hidden = true; return; }
      el.href = url;
      if (subSel) $(subSel).textContent = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    };
    link("#link-donate", CONFIG.donateUrl);
    $("#sec-support").hidden = !CONFIG.donateUrl;
    link("#link-source", CONFIG.sourceUrl, "#link-source-sub");
    link("#link-issues", CONFIG.issuesUrl);
    link("#link-website", CONFIG.websiteUrl, "#link-website-sub");
    link("#info-source", CONFIG.sourceUrl);
    $("#info-imprint-wrap").hidden = !CONFIG.imprintUrl;
    if (CONFIG.imprintUrl) $("#info-imprint").href = CONFIG.imprintUrl;
    $("#info-author").textContent = CONFIG.author;
    if (CONFIG.revivalUrl) $("#info-revival").href = CONFIG.revivalUrl; else $("#info-revival").removeAttribute("href");
    if (!navigator.vibrate) $("#item-vibrate").hidden = true;
    if (!("wakeLock" in navigator)) $("#item-wakelock").hidden = true;
  }

  function renderChangelog() {
    const ul = $("#changelog");
    ul.textContent = "";
    for (const [title, items] of t("changelog")) {
      const h = document.createElement("li"); h.className = "ver"; h.textContent = title; ul.appendChild(h);
      for (const it of items) { const li = document.createElement("li"); li.textContent = it; ul.appendChild(li); }
    }
  }

  /* ------------------------------------------------------------------ *
   * Bildschirm anlassen (Wake Lock)
   * ------------------------------------------------------------------ */
  let wakeLock = null;
  async function updateWakeLock() {
    const want = state.wakeLock && currentView === "main" && document.visibilityState === "visible" && "wakeLock" in navigator;
    if (want && !wakeLock) {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", () => { wakeLock = null; });
      } catch (e) { wakeLock = null; }
    } else if (!want && wakeLock) {
      try { await wakeLock.release(); } catch (e) { /* ignore */ }
      wakeLock = null;
    }
  }
  document.addEventListener("visibilitychange", updateWakeLock);

  /* ------------------------------------------------------------------ *
   * Snackbar & Dialog
   * ------------------------------------------------------------------ */
  const sb = $("#snackbar"), sbText = $("#snackbar-text"), sbAction = $("#snackbar-action");
  let sbTimer = null, sbCallback = null, sbShownAt = 0;
  function snackbar(text, actionText = "", onAction = null, ms = 4000) {
    clearTimeout(sbTimer);
    sbText.textContent = text;
    sbAction.textContent = actionText || "";
    sbCallback = onAction;
    sb.classList.add("is-visible");
    sbShownAt = Date.now();
    sbTimer = setTimeout(hideSnackbar, actionText ? Math.max(ms, 5000) : ms);
  }
  function hideSnackbar() { sb.classList.remove("is-visible"); sbCallback = null; }
  sbAction.addEventListener("click", () => { const cb = sbCallback; hideSnackbar(); cb && cb(); });

  const dlg = $("#dialog");
  function dialog({ title, text = "", input = null, ok, cancel }) {
    return new Promise((resolve) => {
      if (typeof dlg.showModal !== "function") {
        if (input) { const v = window.prompt(title, input.value); resolve(v === null ? null : v); }
        else resolve(window.confirm(`${title}\n\n${text}`) ? "" : null);
        return;
      }
      $("#dialog-title").textContent = title;
      $("#dialog-text").textContent = text;
      const inp = $("#dialog-input");
      inp.hidden = !input;
      if (input) { inp.value = input.value || ""; inp.placeholder = input.placeholder || ""; }
      $("#dialog-ok").textContent = ok || t("ok");
      $("#dialog-cancel").textContent = cancel || t("cancel");
      dlg.returnValue = "";
      const onClose = () => {
        dlg.removeEventListener("close", onClose);
        resolve(dlg.returnValue === "ok" ? (input ? inp.value : "") : null);
      };
      dlg.addEventListener("close", onClose);
      dlg.showModal();
      if (input) { inp.focus(); inp.select(); } else $("#dialog-ok").focus();
    });
  }
  // Enter im Textfeld = Speichern
  $("#dialog-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); dlg.close("ok"); }
  });
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close("cancel"); });

  /* ------------------------------------------------------------------ *
   * Events
   * ------------------------------------------------------------------ */
  bindRepeat($("#btn-plus"), +1);
  bindRepeat($("#btn-minus"), -1);
  $("#btn-reset").addEventListener("click", reset);
  flapsEl.addEventListener("click", () => navigate("set"));
  $("#fab-settings").addEventListener("click", () => navigate("settings"));
  $("#fab-back").addEventListener("click", goBack);
  $("#tb-back").addEventListener("click", goBack);
  $("#btn-save").addEventListener("click", saveResult);
  $("#btn-results").addEventListener("click", () => navigate("results"));
  $("#btn-export").addEventListener("click", exportCsv);
  $("#btn-clear-results").addEventListener("click", clearResults);
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a) return;
    e.preventDefault();
    navigate(a.getAttribute("href").slice(2) || "main");
  });
  window.addEventListener("popstate", () => show(viewFromHash()));

  document.addEventListener("keydown", (e) => {
    if (dlg.open || e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    const typing = tag === "input" || tag === "textarea";
    if (e.key === "Escape" && currentView !== "main") { e.preventDefault(); goBack(); return; }
    if (currentView !== "main" || typing) return;
    const onButton = tag === "button";
    switch (e.key) {
      case "ArrowUp": case "+": case "=": e.preventDefault(); step(+1); break;
      case " ": if (!onButton) { e.preventDefault(); step(+1); } break;
      case "ArrowDown": case "-": case "_": e.preventDefault(); step(-1); break;
      case "r": case "R": e.preventDefault(); reset(); break;
      case "s": case "S": e.preventDefault(); saveResult(); break;
    }
  });

  // Mehrere Tabs: Stand synchron halten
  window.addEventListener("storage", (e) => {
    if (e.key !== STORAGE_KEY) return;
    const prevDigits = state.digits, prevLang = state.lang;
    state = load();
    if (state.digits !== prevDigits) buildFlaps(); else renderValue(false);
    if (state.lang !== prevLang) applyI18n();
    applyView(); syncSettingsUI();
    if (currentView === "results") renderResults();
  });

  // Installation als PWA
  let installPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); installPrompt = e; $("#btn-install").hidden = false;
  });
  $("#btn-install").addEventListener("click", async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    try { await installPrompt.userChoice; } catch (e) { /* ignore */ }
    installPrompt = null; $("#btn-install").hidden = true;
  });
  window.addEventListener("appinstalled", () => { $("#btn-install").hidden = true; });

  /* ------------------------------------------------------------------ *
   * Start
   * ------------------------------------------------------------------ */
  setupLinks();
  applyView();
  buildFlaps();
  syncSettingsUI();
  history.replaceState({ depth: 0 }, "", location.hash || "#/");
  show(viewFromHash());
  applyI18n();
  if (!storageOk) snackbar(t("storageWarn"));

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then((reg) => {
        reg.addEventListener("updatefound", () => {
          const nw = reg.installing;
          if (!nw) return;
          nw.addEventListener("statechange", () => {
            if (nw.state !== "installed") return;
            if (navigator.serviceWorker.controller) {
              snackbar(t("updateReady"), t("reload"), () => location.reload(), 10000);
            } else {
              snackbar(t("offlineReady"));
            }
          });
        });
      }).catch(() => { /* offline-Modus nicht verfügbar */ });
    });
  }
})();
