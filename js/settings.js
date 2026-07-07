/* ==========================================================================
   AnimeHub – settings.js
   Beállítások: fülek, beállítás sorok renderelése, kapcsolók mentése
   ========================================================================== */

const SETTINGS_KEY = "animehub-settings";

const settingsState = {
  tab: "Fiók beállítások",
  values: loadSettings(),
};

function loadSettings() {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; }
  catch (e) { return {}; }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsState.values));
}

/* ----- Ikonkészlet a beállítás sorokhoz ----- */
const SETTING_ICONS = {
  lock:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  mail:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  trash:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  globe:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  clock:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  moon:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  zap:    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  image:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
  play:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/></svg>',
  cc:     '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M10 10.5c-.5-.6-1.2-1-2-1-1.4 0-2.5 1.1-2.5 2.5S6.6 14.5 8 14.5c.8 0 1.5-.4 2-1"/><path d="M18.5 10.5c-.5-.6-1.2-1-2-1-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c.8 0 1.5-.4 2-1"/></svg>',
  bell:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  users:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  news:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0V9"/><line x1="12" y1="7" x2="17" y2="7"/><line x1="12" y1="11" x2="17" y2="11"/><line x1="7" y1="15" x2="17" y2="15"/></svg>',
  eye:    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  shield: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  discord:'<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.78 13.78 0 0 0-.64 1.28 18.27 18.27 0 0 0-5.5 0 12.64 12.64 0 0 0-.64-1.28 19.74 19.74 0 0 0-4.93 1.51C.53 9.05-.32 13.58.1 18.06a19.9 19.9 0 0 0 6.04 3.03 14.65 14.65 0 0 0 1.23-2.03 12.8 12.8 0 0 1-1.95-.93c.16-.12.32-.24.48-.36a14.2 14.2 0 0 0 12.2 0c.16.13.32.25.48.36-.63.37-1.28.68-1.96.93a14.6 14.6 0 0 0 1.24 2.03 19.84 19.84 0 0 0 6.03-3.03c.5-5.2-.84-9.68-3.57-13.69z"/></svg>',
  google: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35 11.1H12v3.7h5.4c-.5 2.5-2.6 3.9-5.4 3.9a6 6 0 1 1 0-12c1.5 0 2.9.55 4 1.45l2.8-2.8A9.9 9.9 0 0 0 12 2a10 10 0 1 0 0 20c5.8 0 9.6-4.1 9.6-9.85 0-.36-.1-.7-.25-1.05z"/></svg>',
  x:      '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z"/></svg>',
  mal:    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M6 15V9l3 4 3-4v6"/><path d="M16 9h3M17.5 9v6"/></svg>',
};

/* ----- Kapcsoló érték olvasása/írása ----- */
function toggleValue(row) {
  const saved = settingsState.values[row.key];
  return saved === undefined ? !!row.default : !!saved;
}

/* ----- Renderelés ----- */
function renderSettingsTabs() {
  document.getElementById("settingsTabs").innerHTML = Object.keys(DATA.settingsTabs)
    .map(
      (name) =>
        `<button class="settings-tab${name === settingsState.tab ? " active" : ""}" data-tab="${name}">${name === "Értesítések" ? "🔔 " : ""}${name}</button>`
    )
    .join("");
}

function rowHTML(row) {
  const icon = `<span class="ic">${SETTING_ICONS[row.icon] || ""}</span>`;
  const text = `<div class="t"><h4>${row.title}</h4><p>${row.desc}</p></div>`;

  if (row.type === "toggle") {
    return `
      <div class="setting-row" data-toggle="${row.key}">
        ${icon}${text}
        <span class="switch${toggleValue(row) ? " on" : ""}"></span>
      </div>`;
  }

  if (row.type === "select") {
    const saved = settingsState.values[row.key];
    return `
      <div class="setting-row" style="cursor:default">
        ${icon}${text}
        <select data-select="${row.key}">
          ${row.options.map((o) => `<option${o === saved ? " selected" : ""}>${o}</option>`).join("")}
        </select>
      </div>`;
  }

  if (row.type === "connect") {
    const on = toggleValue(row);
    return `
      <div class="setting-row" style="cursor:default">
        ${icon}${text}
        <button class="connect-btn${on ? " connected" : ""}" data-connect="${row.key}">
          ${on ? "Csatlakoztatva ✓" : "Csatlakoztatás"}
        </button>
      </div>`;
  }

  /* link típus */
  return `
    <button class="setting-row${row.danger ? " danger" : ""}">
      ${icon}${text}
      <span class="chevron">${ICONS.chevronRight}</span>
    </button>`;
}

function renderSettingsBody() {
  const wrap = document.getElementById("settingsBody");
  const groups = DATA.settingsTabs[settingsState.tab] || [];

  wrap.innerHTML = groups
    .map(
      (g) => `
      <section class="settings-group">
        <h2>${g.group}</h2>
        ${g.rows.map(rowHTML).join("")}
      </section>`
    )
    .join("");

  /* A profil információk kártya csak a Fiók fülön látszik */
  document.getElementById("profileInfo").hidden = settingsState.tab !== "Fiók beállítások";
}

/* ----- Gyors beállítások (jobb oszlop) ----- */
const QUICK_SETTINGS = [
  { key: "dark",   icon: "moon",  title: "Sötét mód",              desc: "Kapcsold be vagy ki a sötét módot.", default: true },
  { key: "adult",  icon: "shield", title: "Felnőtt tartalom szűrése", desc: "Szűrd a felnőtt tartalmakat.", default: true },
  { key: "autoplay", icon: "play", title: "Automatikus lejátszás",  desc: "Következő epizód automatikus lejátszása.", default: false },
  { key: "haptic", icon: "zap",   title: "Haptikus visszajelzés",  desc: "Rezgés műveletekhez (ha elérhető).", default: true },
];

function renderQuickSettings() {
  document.getElementById("quickSettings").innerHTML = QUICK_SETTINGS
    .map(
      (q) => `
      <div class="quick-row">
        <span class="ic">${SETTING_ICONS[q.icon]}</span>
        <div class="t"><h4>${q.title}</h4><p>${q.desc}</p></div>
        <span class="switch${toggleValue(q) ? " on" : ""}" data-toggle="${q.key}"></span>
      </div>`
    )
    .join("");
}

/* ----- Vezérlők ----- */
function initSettings() {
  renderSettingsTabs();
  renderSettingsBody();
  renderQuickSettings();

  document.getElementById("settingsTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    settingsState.tab = btn.dataset.tab;
    renderSettingsTabs();
    renderSettingsBody();
  });

  /* Kapcsolók + csatlakoztatás + legördülők (delegálva az egész oldalra) */
  document.addEventListener("click", (e) => {
    const sw = e.target.closest(".switch[data-toggle], .setting-row[data-toggle]");
    if (sw) {
      const key = sw.dataset.toggle;
      const el = sw.classList.contains("switch") ? sw : sw.querySelector(".switch");
      const on = !el.classList.contains("on");
      el.classList.toggle("on", on);
      settingsState.values[key] = on;
      saveSettings();
      return;
    }

    const conn = e.target.closest("[data-connect]");
    if (conn) {
      const key = conn.dataset.connect;
      const on = !conn.classList.contains("connected");
      conn.classList.toggle("connected", on);
      conn.textContent = on ? "Csatlakoztatva ✓" : "Csatlakoztatás";
      settingsState.values[key] = on;
      saveSettings();
    }
  });

  document.addEventListener("change", (e) => {
    const sel = e.target.closest("select[data-select]");
    if (!sel) return;
    settingsState.values[sel.dataset.select] = sel.value;
    saveSettings();
  });
}

document.addEventListener("DOMContentLoaded", initSettings);
