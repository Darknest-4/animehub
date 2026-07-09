/* ==========================================================================
   AnimeHub – admin.js
   Admin panel: közös layout (sidebar + topbar + mobil fiók), animált SVG
   grafikonok, és oldalankénti logika. Az admin/ mappán belül fut.
   ========================================================================== */

/* Asset alap: az admin/ egy szinttel beljebb van, a képek a gyökér assets/-ből */
const AB = (p) => (!p || /^(https?:|data:|\.\.\/)/.test(p) ? p : "../" + p);

const AI = {
  home:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  anime:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><circle cx="12" cy="12" r="3.5"/></svg>',
  episode: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><line x1="7" y1="4" x2="7" y2="20"/><line x1="17" y1="4" x2="17" y2="20"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',
  list:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  folder:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  building:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 6h.01M15 6h.01M9 10h.01M15 10h.01M10 22v-4h4v4"/></svg>',
  tag:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  users:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  shield:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  ban:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
  banSm:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
  news:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0V9"/><line x1="12" y1="7" x2="17" y2="7"/><line x1="12" y1="11" x2="17" y2="11"/><line x1="7" y1="15" x2="17" y2="15"/></svg>',
  file:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  mega:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
  settings:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  logs:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="14" y2="18"/></svg>',
  lock:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  save:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  eye:     '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  clock:   '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  userplus:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
  crown:   '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5z"/></svg>',
  dollar:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  ad:      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15V9l2 3 2-3v6"/><path d="M15 9h2M16 9v6"/></svg>',
  comment: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  flag:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  search:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  bell:    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  moon:    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  sun:     '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  edit:    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>',
  trash:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  eyeSm:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  dots:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="12" cy="19" r="1.7"/></svg>',
  plus:    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  cal:     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  back:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  ext:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  menu:    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  close:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  chevR:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  chevL:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  logout:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
};

/* ==========================================================================
   Közös layout: sidebar + topbar + mobil fiók
   ========================================================================== */
function sidebarHTML(active) {
  return `
    <a class="admin-brand" href="index.html">
      <span class="mark">${AI.anime}</span>
      Anime<span style="color:var(--primary-light)">Hub</span> <span class="adm">Admin</span>
    </a>
    ${ADMIN.nav.map((sec) => `
      <div class="admin-nav-label">${sec.group}</div>
      ${sec.items.map((i) =>
        `<a class="admin-nav-item${i.page === active ? " active" : ""}" href="${i.href}">${AI[i.icon] || ""} ${i.label}</a>`
      ).join("")}
    `).join("")}
    <a class="admin-back" href="../index.html">${AI.ext} Vissza a weboldalra</a>`;
}

function renderAdminLayout() {
  const active = document.body.dataset.adminPage || "";

  const side = document.getElementById("adminSidebar");
  if (side) side.innerHTML = sidebarHTML(active);

  const top = document.getElementById("adminTopbar");
  if (top) {
    top.innerHTML = `
      <button class="admin-hamburger" id="adminHamburger" aria-label="Menü">${AI.menu}</button>
      <div class="admin-search">
        ${AI.search}
        <input type="text" placeholder="Keresés animékre, felhasználókra, epizódokra...">
        <span class="kbd">Ctrl + K</span>
      </div>
      <div class="admin-topbar-actions">
        <button class="admin-icon-btn" id="themeToggle" aria-label="Téma">${AI.moon}</button>
        <div class="admin-pop-wrap">
          <button class="admin-icon-btn" id="bellBtn" aria-label="Értesítések">${AI.bell}<span class="badge-dot">3</span></button>
          <div class="admin-pop" id="bellPop">
            <div class="pop-head">Értesítések <span>3 új</span></div>
            <a class="pop-item"><span class="d e">${AI.episode}</span><div><h5>Új epizód feltöltve</h5><p>Jujutsu Kaisen 2×18 · 5 perce</p></div></a>
            <a class="pop-item"><span class="d r">${AI.flag}</span><div><h5>Új felhasználói jelentés</h5><p>kage_shadow · 12 perce</p></div></a>
            <a class="pop-item"><span class="d u">${AI.userplus}</span><div><h5>34 új regisztráció ma</h5><p>+18% az átlaghoz képest</p></div></a>
            <a class="pop-foot" href="moderation.html">Összes megtekintése</a>
          </div>
        </div>
        <div class="admin-pop-wrap">
          <button class="admin-user" id="userBtn">
            <img src="../assets/img/avatar-sasuke.svg" alt="Admin">
            <div><div class="n">Admin</div><div class="r">Rendszergazda</div></div>
            <svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="admin-pop right" id="userPop">
            <a class="pop-item sm" href="#">${AI.users} Profilom</a>
            <a class="pop-item sm" href="settings.html">${AI.settings} Beállítások</a>
            <a class="pop-item sm" href="../index.html">${AI.ext} Weboldal</a>
            <a class="pop-item sm danger" href="../index.html">${AI.logout} Kijelentkezés</a>
          </div>
        </div>
      </div>`;
  }

  // Mobil fiók (drawer)
  const drawer = document.createElement("div");
  drawer.className = "admin-drawer";
  drawer.id = "adminDrawer";
  drawer.innerHTML = `<div class="admin-drawer-panel">${sidebarHTML(active)}</div>`;
  document.body.appendChild(drawer);

  bindLayoutInteractions();
}

function bindLayoutInteractions() {
  const drawer = document.getElementById("adminDrawer");
  document.getElementById("adminHamburger")?.addEventListener("click", () => drawer.classList.add("open"));
  drawer?.addEventListener("click", (e) => { if (e.target === drawer) drawer.classList.remove("open"); });

  // Téma váltó (valódi világos/sötét admin téma, mentéssel)
  const applyTheme = (t) => {
    document.body.dataset.theme = t;
    const btn = document.getElementById("themeToggle");
    if (btn) btn.innerHTML = t === "light" ? AI.sun : AI.moon;
  };
  applyTheme(localStorage.getItem("animehub-admin-theme") || "dark");
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const next = document.body.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("animehub-admin-theme", next);
    applyTheme(next);
  });

  // Kapcsolók (globális, minden admin oldalon)
  document.addEventListener("click", (e) => {
    const sw = e.target.closest(".switch");
    if (sw) sw.classList.toggle("on");
  });

  // Popover-ek (értesítés + felhasználó)
  const toggles = [["bellBtn", "bellPop"], ["userBtn", "userPop"]];
  toggles.forEach(([b, p]) => {
    document.getElementById(b)?.addEventListener("click", (e) => {
      e.stopPropagation();
      const pop = document.getElementById(p);
      document.querySelectorAll(".admin-pop.show").forEach((x) => { if (x !== pop) x.classList.remove("show"); });
      pop?.classList.toggle("show");
    });
  });
  document.addEventListener("click", () => document.querySelectorAll(".admin-pop.show").forEach((x) => x.classList.remove("show")));

  // Ctrl+K
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      document.querySelector(".admin-search input")?.focus();
    }
    if (e.key === "Escape") drawer?.classList.remove("open");
  });
}

/* ==========================================================================
   Animált SVG grafikonok + tooltip
   ========================================================================== */
let _chartId = 0;

function chartTooltip() {
  let tip = document.getElementById("chartTip");
  if (!tip) {
    tip = document.createElement("div");
    tip.id = "chartTip";
    tip.className = "chart-tip";
    document.body.appendChild(tip);
  }
  return tip;
}

function lineChartSVG(values, opts = {}) {
  const w = 640, h = 210, padX = 34, padT = 18, padB = 30;
  const id = "lc" + _chartId++;
  const max = Math.max(...values) * 1.08;
  const min = Math.min(...values) * 0.9;
  const stepX = (w - padX * 2) / (values.length - 1);
  const y = (v) => padT + (h - padT - padB) - ((v - min) / (max - min)) * (h - padT - padB);
  const pts = values.map((v, i) => [padX + i * stepX, y(v)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = `${line} L ${pts[pts.length - 1][0].toFixed(1)} ${h - padB} L ${padX} ${h - padB} Z`;
  const gridY = [0, 0.25, 0.5, 0.75, 1].map((t) => padT + t * (h - padT - padB));
  const labels = opts.labels || [];

  return `
    <div class="line-chart" data-values='${JSON.stringify(values)}' data-labels='${JSON.stringify(labels)}'>
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
        <defs><linearGradient id="${id}Fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--primary)" stop-opacity="0.32"/>
          <stop offset="1" stop-color="var(--primary)" stop-opacity="0"/>
        </linearGradient></defs>
        ${gridY.map((gy) => `<line class="grid-line" x1="${padX}" y1="${gy.toFixed(1)}" x2="${w - padX}" y2="${gy.toFixed(1)}"/>`).join("")}
        <path class="area" d="${area}" style="fill:url(#${id}Fill)"/>
        <path class="line draw" d="${line}"/>
        <line class="hover-line" x1="0" y1="${padT}" x2="0" y2="${h - padB}" style="opacity:0"/>
        ${pts.map((p, i) => `<circle class="dot" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" data-i="${i}"/>`).join("")}
        ${labels.length ? pts.map((p, i) => (i % Math.ceil(labels.length / 7) === 0 ? `<text class="axis-label" x="${p[0].toFixed(1)}" y="${h - 8}" text-anchor="middle">${labels[i]}</text>` : "")).join("") : ""}
      </svg>
    </div>`;
}

function donutSVG(segments, centerLabel) {
  const r = 58, c = 2 * Math.PI * r;
  let offset = 0;
  const arcs = segments.map((s, i) => {
    const len = (s.value / 100) * c;
    const el = `<circle class="seg" style="--dash:${len.toFixed(2)};--gap:${(c - len).toFixed(2)};--off:${(-offset).toFixed(2)};--delay:${i * 0.12}s" cx="75" cy="75" r="${r}" fill="none" stroke="${s.color}" stroke-width="18" stroke-linecap="butt"/>`;
    offset += len;
    return el;
  }).join("");
  const total = centerLabel || segments.reduce((a, s) => a + s.value, 0).toFixed(0) + "%";

  return `
    <div class="donut-wrap">
      <div class="donut">
        <svg viewBox="0 0 150 150">${arcs}</svg>
        <div class="donut-center"><b>${total}</b><span>összesen</span></div>
      </div>
      <div class="donut-legend">
        ${segments.map((s) => `
          <div class="row">
            <span class="dot" style="background:${s.color}"></span>
            <span class="name">${s.name}</span>
            <span class="val">${s.value}%</span>
          </div>`).join("")}
      </div>
    </div>`;
}

function barChartSVG(values, labels) {
  const max = Math.max(...values);
  return `<div class="bar-chart">${values.map((v, i) => `
    <div class="col" data-val="${v.toLocaleString("hu-HU")}">
      <div class="bar" style="--h:${Math.round((v / max) * 100)}%;--delay:${i * 0.05}s"></div>
      <span class="m">${labels ? labels[i] : ""}</span>
    </div>`).join("")}</div>`;
}

const MONTHS_SHORT = ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sze", "Okt", "Nov", "Dec"];

/* Interaktív tooltipek a vonal- és oszlopdiagramokhoz */
function bindChartInteractions(root = document) {
  const tip = chartTooltip();

  root.querySelectorAll(".line-chart").forEach((chart) => {
    const svg = chart.querySelector("svg");
    const values = JSON.parse(chart.dataset.values || "[]");
    const labels = JSON.parse(chart.dataset.labels || "[]");
    const dots = [...chart.querySelectorAll(".dot")];
    const hoverLine = chart.querySelector(".hover-line");
    chart.addEventListener("mousemove", (e) => {
      const rect = svg.getBoundingClientRect();
      const rel = (e.clientX - rect.left) / rect.width;
      const idx = Math.max(0, Math.min(values.length - 1, Math.round(rel * (values.length - 1))));
      const dot = dots[idx];
      if (!dot) return;
      dots.forEach((d) => d.classList.remove("on"));
      dot.classList.add("on");
      const cx = +dot.getAttribute("cx");
      hoverLine.setAttribute("x1", cx); hoverLine.setAttribute("x2", cx); hoverLine.style.opacity = "1";
      tip.innerHTML = `<b>${values[idx].toLocaleString("hu-HU")}</b>${labels[idx] ? "<span>" + labels[idx] + "</span>" : ""}`;
      tip.style.opacity = "1";
      tip.style.left = e.clientX + "px";
      tip.style.top = e.clientY - 14 + "px";
    });
    chart.addEventListener("mouseleave", () => {
      tip.style.opacity = "0"; hoverLine.style.opacity = "0";
      dots.forEach((d) => d.classList.remove("on"));
    });
  });

  root.querySelectorAll(".bar-chart .col").forEach((col) => {
    col.addEventListener("mousemove", (e) => {
      tip.innerHTML = `<b>${col.dataset.val}</b>`;
      tip.style.opacity = "1";
      tip.style.left = e.clientX + "px";
      tip.style.top = e.clientY - 14 + "px";
    });
    col.addEventListener("mouseleave", () => (tip.style.opacity = "0"));
  });
}

/* ==========================================================================
   Kártya / sor sablonok
   ========================================================================== */
const statCard = (s, note) => `
  <div class="admin-card stat-card">
    <div class="top">
      <div><div class="lbl">${s.label}</div><div class="num">${s.value}</div></div>
      <span class="ic">${AI[s.icon] || AI.eye}</span>
    </div>
    <div class="trend${s.dir === "down" ? " down" : ""}">${s.dir === "down" ? "▼" : "▲"} ${s.trend} <span class="muted">${note || "az előző időszakhoz képest"}</span></div>
  </div>`;

/* ==========================================================================
   DASHBOARD
   ========================================================================== */
function initDashboard() {
  document.getElementById("statCards").innerHTML = ADMIN.dashStats.map((s) => statCard(s, "az előző hónaphoz képest")).join("");
  document.getElementById("userGrowthChart").innerHTML = lineChartSVG(ADMIN.userGrowth, { labels: ADMIN.userGrowth.map((_, i) => (i + 1) + ".") });
  document.getElementById("viewsSourceChart").innerHTML = donutSVG(ADMIN.viewsSource);

  document.getElementById("activityList").innerHTML = ADMIN.activities.map((a) => `
    <div class="activity-row">
      <span class="ic ${a.type}">${{ u: AI.userplus, e: AI.episode, r: AI.ban, n: AI.news, v: AI.crown }[a.type] || AI.eye}</span>
      <div class="t"><h4>${a.title}</h4><p>${a.sub}</p></div>
      <span class="when">${a.when}</span>
    </div>`).join("");

  document.getElementById("latestAnimes").innerHTML = ADMIN.animes.slice(0, 5).map((a) => `
    <tr>
      <td><div class="title-cell"><img class="cover" style="width:34px;height:44px" src="${AB(a.image)}" alt=""><div><h4>${a.title}</h4></div></div></td>
      <td><span class="badge-status active">Folyamatban</span></td>
      <td>${a.eps}</td>
      <td>${a.created}</td>
      <td><button class="row-act">${AI.dots}</button></td>
    </tr>`).join("");

  document.getElementById("latestEpisodes").innerHTML = ADMIN.latestEpisodes.map((e) => `
    <tr>
      <td><div class="title-cell"><img class="cover" style="width:34px;height:44px" src="${AB(e.image)}" alt=""><div><h4>${e.anime}</h4></div></div></td>
      <td>${e.ep}</td>
      <td>${e.created}</td>
      <td><button class="row-act">${AI.dots}</button></td>
    </tr>`).join("");

  bindChartInteractions();
}

/* ==========================================================================
   STATISZTIKA
   ========================================================================== */
function initStats() {
  document.getElementById("statCards").innerHTML = ADMIN.statCards.map((s) => statCard(s)).join("");
  document.getElementById("viewsTrendChart").innerHTML = lineChartSVG(ADMIN.viewsTrend, { labels: ADMIN.viewsTrend.map((_, i) => (i + 1) + ".") });
  document.getElementById("devicesChart").innerHTML = donutSVG(ADMIN.devices);

  document.getElementById("countriesList").innerHTML = ADMIN.countries.map((c) => `
    <div class="row"><span class="flag">${c.flag}</span><span class="name">${c.name}</span>
      <span class="mini-track"><span style="width:${c.value}%"></span></span>
      <span class="val">${c.value}%</span></div>`).join("");

  const maxV = Math.max(...ADMIN.popularAnimes.map((a) => a.views));
  document.getElementById("popularBars").innerHTML = ADMIN.popularAnimes.map((a, i) => `
    <div class="rank-row">
      <span class="n">${i + 1}</span>
      <img src="${AB(a.image)}" alt="">
      <div class="info"><h4>${a.title}</h4><span class="rating">★ ${a.rating}</span></div>
      <div class="track"><span style="width:${Math.round((a.views / maxV) * 100)}%"></span></div>
      <span class="cnt">${a.views.toLocaleString("hu-HU")}</span>
    </div>`).join("");

  document.getElementById("watchHoursChart").innerHTML = barChartSVG(ADMIN.watchHours, MONTHS_SHORT);
  document.getElementById("revenueCards").innerHTML = ADMIN.revenue.map((r) => statCard(r)).join("");

  // Mini-tab váltás a megtekintés-trendhez (napi/heti/havi)
  document.querySelectorAll(".mini-tabs").forEach((bar) => {
    bar.addEventListener("click", (e) => {
      const t = e.target.closest(".mini-tab");
      if (!t) return;
      bar.querySelectorAll(".mini-tab").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      const variants = {
        Napi: ADMIN.viewsTrend,
        Heti: ADMIN.viewsTrend.map((v) => Math.round(v * 6.8)),
        Havi: ADMIN.viewsTrend.map((v) => Math.round(v * 28)),
      };
      const vals = variants[t.textContent.trim()] || ADMIN.viewsTrend;
      document.getElementById("viewsTrendChart").innerHTML = lineChartSVG(vals, { labels: vals.map((_, i) => (i + 1) + ".") });
      bindChartInteractions();
    });
  });

  bindChartInteractions();
}

/* ==========================================================================
   ANIMÉK TÁBLA – valódi szűrés + lapozás
   ========================================================================== */
const animeState = { query: "", genre: "", studio: "", status: "", page: 1, perPage: 10 };

function filteredAnimes() {
  const q = animeState.query.toLowerCase();
  return ADMIN.animes.filter((a) =>
    (!q || a.title.toLowerCase().includes(q) || a.jp.includes(animeState.query)) &&
    (!animeState.genre || a.genres.includes(animeState.genre)) &&
    (!animeState.studio || a.studio === animeState.studio) &&
    (!animeState.status || a.status === animeState.status)
  );
}

function renderAnimeTable() {
  const list = filteredAnimes();
  const pages = Math.max(1, Math.ceil(list.length / animeState.perPage));
  if (animeState.page > pages) animeState.page = pages;
  const start = (animeState.page - 1) * animeState.perPage;
  const slice = list.slice(start, start + animeState.perPage);

  document.getElementById("animeTableBody").innerHTML = slice.map((a) => `
    <tr>
      <td><input type="checkbox" class="admin-check row-check"></td>
      <td><img class="cover" src="${AB(a.image)}" alt=""></td>
      <td><div class="title-cell"><div><h4>${a.title}</h4><div class="jp">${a.jp}</div></div></div></td>
      <td>${a.studio}</td>
      <td><div class="genre-tags">${a.genres.map((g) => `<span class="g">${g}</span>`).join("")}</div></td>
      <td>${a.year}</td>
      <td>${a.eps.toLocaleString("hu-HU")}</td>
      <td><span class="badge-status ${a.status}">${a.status === "active" ? "Aktív" : "Inaktív"}</span></td>
      <td>${a.created}</td>
      <td><div class="row-actions">
        <a class="row-act" href="edit.html" title="Szerkesztés">${AI.edit}</a>
        <a class="row-act" href="../anime.html?q=${encodeURIComponent(a.title)}" title="Megtekintés">${AI.eyeSm}</a>
        <button class="row-act del" title="Törlés" data-del="${a.title}">${AI.trash}</button>
      </div></td>
    </tr>`).join("") ||
    '<tr><td colspan="10" style="text-align:center;padding:40px;color:var(--text-muted)">Nincs találat 🔍</td></tr>';

  document.getElementById("rowsInfo").textContent =
    `${list.length ? start + 1 : 0}–${Math.min(start + animeState.perPage, list.length)} / ${list.length}`;

  document.getElementById("adminPagination").innerHTML = pagerHTML(animeState.page, pages);
}

function pagerHTML(page, pages) {
  const btns = [];
  btns.push(`<button class="admin-page-btn nav" data-goto="${page - 1}" ${page === 1 ? "disabled" : ""}>${AI.chevL}</button>`);
  const nums = new Set([1, pages, page, page - 1, page + 1]);
  let prev = 0;
  [...nums].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b).forEach((n) => {
    if (n - prev > 1) btns.push(`<button class="admin-page-btn dots" disabled>…</button>`);
    btns.push(`<button class="admin-page-btn${n === page ? " active" : ""}" data-goto="${n}">${n}</button>`);
    prev = n;
  });
  btns.push(`<button class="admin-page-btn nav" data-goto="${page + 1}" ${page === pages ? "disabled" : ""}>${AI.chevR}</button>`);
  return btns.join("");
}

function initAnimeTable() {
  renderAnimeTable();
  const rerender = () => { animeState.page = 1; renderAnimeTable(); };
  document.getElementById("animeSearch")?.addEventListener("input", (e) => { animeState.query = e.target.value.trim(); rerender(); });

  document.querySelectorAll(".table-toolbar .admin-select").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      const v = e.target.value;
      if (sel.dataset.filter === "genre") animeState.genre = v.startsWith("Minden") ? "" : v;
      if (sel.dataset.filter === "studio") animeState.studio = v.startsWith("Minden") ? "" : v;
      if (sel.dataset.filter === "status") animeState.status = v.includes("Aktív") ? "active" : v.includes("Inaktív") ? "inactive" : "";
      rerender();
    });
  });

  document.querySelector(".clear-filters")?.addEventListener("click", () => {
    animeState.query = animeState.genre = animeState.studio = animeState.status = "";
    document.getElementById("animeSearch").value = "";
    document.querySelectorAll(".table-toolbar .admin-select").forEach((s) => (s.selectedIndex = 0));
    rerender();
  });

  document.getElementById("perPageSelect")?.addEventListener("change", (e) => {
    animeState.perPage = parseInt(e.target.value, 10) || 10; rerender();
  });

  document.getElementById("adminPagination")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".admin-page-btn[data-goto]");
    if (!btn || btn.disabled) return;
    animeState.page = parseInt(btn.dataset.goto, 10);
    renderAnimeTable();
  });

  bindTableCommon(document.querySelector(".admin-table"));
}

/* Fejléc checkbox + törlés megerősítés (közös) */
function bindTableCommon(scope) {
  if (!scope) return;
  scope.closest("body").addEventListener("click", (e) => {
    const del = e.target.closest("[data-del]");
    if (del && confirm(`Biztosan törlöd: „${del.dataset.del}"?`)) {
      del.closest("tr").style.opacity = "0.4";
      del.closest("tr").querySelectorAll("input").forEach((i) => (i.disabled = true));
    }
    const master = e.target.closest("[data-check-all]");
    if (master) {
      const on = master.checked;
      scope.querySelectorAll(".row-check").forEach((c) => (c.checked = on));
      updateBulkCount(scope);
    }
    if (e.target.classList?.contains("row-check")) updateBulkCount(scope);
  });
}
function updateBulkCount(scope) {
  const n = scope.querySelectorAll(".row-check:checked").length;
  const el = document.getElementById("bulkCount");
  if (el) el.textContent = `${n} kiválasztva`;
}

/* ==========================================================================
   EPIZÓDOK KEZELÉSE
   ========================================================================== */
const epState = { query: "", tab: "episodes", page: 1, perPage: 10 };

function statusBadge(status) {
  const map = {
    published: ["active", "Publikálva"], draft: ["inactive", "Vázlat"],
    scheduled: ["pending", "Ütemezve"], approved: ["active", "Jóváhagyva"],
    hidden: ["inactive", "Elrejtve"], deleted: ["danger", "Törölve"],
  };
  const [cls, label] = map[status] || ["inactive", status];
  return `<span class="badge-status ${cls}">${label}</span>`;
}

function renderEpisodeTable() {
  const q = epState.query.toLowerCase();
  const list = ADMIN.episodes.filter((e) => !q || e.title.toLowerCase().includes(q) || String(e.n).includes(q));
  document.getElementById("episodeTableBody").innerHTML = list.map((e) => `
    <tr data-ep="${e.n}">
      <td><input type="checkbox" class="admin-check row-check"></td>
      <td class="num">${e.n}</td>
      <td><div class="title-cell"><img class="ep-thumb" src="${AB(e.thumb)}" alt=""><div><h4>${e.title}</h4><div class="jp">${e.jp}</div></div></div></td>
      <td>${e.season}</td>
      <td>${e.len}</td>
      <td>${e.date}</td>
      <td>${statusBadge(e.status)}</td>
      <td><div class="row-actions">
        <button class="row-act ep-edit" title="Szerkesztés">${AI.edit}</button>
        <button class="row-act" title="Megtekintés">${AI.eyeSm}</button>
        <button class="row-act" title="Több">${AI.dots}</button>
      </div></td>
    </tr>`).join("");
  document.getElementById("epTotal").textContent = `Összesen ${ADMIN.episodesTotal} epizód`;
}

function initEpisodes() {
  const a = ADMIN.episodeAnime;
  document.getElementById("epAnimePoster").src = AB(a.image);
  document.getElementById("epAnimeTitle").textContent = a.title;
  document.getElementById("epAnimeMeta").innerHTML =
    `${a.jp} · ${a.studio} · ${a.year} · ${a.seasons} évad · ${a.epsTotal} epizód`;
  renderEpisodeTable();

  document.getElementById("epSearch")?.addEventListener("input", (e) => { epState.query = e.target.value.trim(); renderEpisodeTable(); });

  // Fül váltás (Epizódok / Csoportok / Beállítások)
  document.getElementById("epTabs")?.addEventListener("click", (e) => {
    const t = e.target.closest(".ep-tab");
    if (!t) return;
    document.querySelectorAll("#epTabs .ep-tab").forEach((x) => x.classList.remove("active"));
    t.classList.add("active");
    document.querySelectorAll("[data-ep-panel]").forEach((p) => (p.hidden = p.dataset.epPanel !== t.dataset.tab));
  });

  // Sor kiválasztása → szerkesztő betöltése
  document.getElementById("episodeTableBody")?.addEventListener("click", (e) => {
    const row = e.target.closest("tr[data-ep]");
    if (!row) return;
    const ep = ADMIN.episodes.find((x) => x.n == row.dataset.ep);
    if (!ep) return;
    document.querySelectorAll("#episodeTableBody tr").forEach((r) => r.classList.remove("sel"));
    row.classList.add("sel");
    fillEpisodeEditor(ep);
    document.getElementById("epEditor")?.classList.add("open");
  });

  document.getElementById("epEditorClose")?.addEventListener("click", () =>
    document.getElementById("epEditor")?.classList.remove("open"));

  document.getElementById("epSave")?.addEventListener("click", (e) => saveFeedback(e.currentTarget, "Változtatások mentése"));

  bindTableCommon(document.querySelector(".admin-table"));
}

function fillEpisodeEditor(ep) {
  document.getElementById("epPrev").src = AB(ep.thumb);
  document.getElementById("epfNum").value = ep.n;
  document.getElementById("epfSeason").value = ep.season + ". évad";
  document.getElementById("epfTitle").value = ep.title;
  document.getElementById("epfJp").value = ep.jp;
  document.getElementById("epfDate").value = ep.date;
  document.getElementById("epfLen").value = ep.len;
}

/* ==========================================================================
   MODERÁCIÓ
   ========================================================================== */
const modState = { query: "", status: "", tab: "comments" };

function renderComments() {
  const q = modState.query.toLowerCase();
  const list = ADMIN.comments.filter((c) =>
    (!q || c.text.toLowerCase().includes(q) || c.user.toLowerCase().includes(q)) &&
    (!modState.status || c.status === modState.status));

  document.getElementById("commentRows").innerHTML = list.map((c) => `
    <tr>
      <td><input type="checkbox" class="admin-check row-check"></td>
      <td><div class="cmt">
        <img src="${AB(c.avatar)}" alt="">
        <div class="body">
          <div class="who"><a class="u">${c.user}</a>${c.vip ? '<span class="vip">VIP</span>' : ""}</div>
          <p class="txt">${c.text}</p>
          <span class="ref">${c.ref}</span>
        </div>
      </div></td>
      <td><span class="cmt-type">${AI.comment} ${c.type}</span></td>
      <td class="nowrap">${c.date}</td>
      <td>${statusBadge(c.status)}</td>
      <td><div class="row-actions">
        <button class="row-act" title="Megtekintés">${AI.eyeSm}</button>
        <button class="row-act" title="Több">${AI.dots}</button>
      </div></td>
    </tr>`).join("") ||
    '<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted)">Nincs találat 🔍</td></tr>';
}

function initModeration() {
  // Áttekintő kártyák (jobb sáv)
  document.getElementById("modOverview").innerHTML = ADMIN.modOverview.map((s) => `
    <div class="mod-ov-row">
      <span class="ic ${s.tone}">${AI[s.icon] || AI.comment}</span>
      <div class="t"><div class="v">${s.value}</div><div class="l">${s.label}</div></div>
      <span class="tr ${s.dir}">${s.dir === "up" ? "↑" : "↓"} ${s.trend.replace("-", "").replace("+", "")}</span>
    </div>`).join("");

  document.getElementById("reportedUsers").innerHTML = ADMIN.reportedUsers.map((u) => `
    <div class="rep-row">
      <img src="${AB(u.avatar)}" alt="">
      <div class="t"><h5>${u.user}</h5><p>${u.reports} jelentés</p></div>
      <button class="row-act">${AI.eyeSm}</button>
    </div>`).join("");

  renderComments();

  document.getElementById("commentSearch")?.addEventListener("input", (e) => { modState.query = e.target.value.trim(); renderComments(); });

  document.querySelectorAll("#modFilters .admin-select").forEach((sel) => {
    sel.addEventListener("change", (e) => {
      if (sel.dataset.filter === "status") {
        const v = e.target.value;
        modState.status = v.includes("Jóváhagyva") ? "approved" : v.includes("Elrejtve") ? "hidden" : v.includes("Törölve") ? "deleted" : "";
        renderComments();
      }
    });
  });

  // Fül váltás
  document.getElementById("modTabs")?.addEventListener("click", (e) => {
    const t = e.target.closest(".mod-tab");
    if (!t) return;
    document.querySelectorAll("#modTabs .mod-tab").forEach((x) => x.classList.remove("active"));
    t.classList.add("active");
    document.querySelectorAll("[data-mod-panel]").forEach((p) => (p.hidden = p.dataset.modPanel !== t.dataset.tab));
  });

  // Spam szűrő csúszka él
  const slider = document.getElementById("spamThreshold");
  slider?.addEventListener("input", (e) => {
    document.getElementById("spamThresholdVal").textContent = e.target.value + "%";
    e.target.style.setProperty("--fill", e.target.value + "%");
  });

  document.querySelector(".clear-filters")?.addEventListener("click", () => {
    modState.query = ""; modState.status = "";
    document.getElementById("commentSearch").value = "";
    document.querySelectorAll("#modFilters .admin-select").forEach((s) => (s.selectedIndex = 0));
    renderComments();
  });

  bindTableCommon(document.querySelector(".admin-table"));
}

/* ==========================================================================
   BEÁLLÍTÁSOK – valódi fül-panelek
   ========================================================================== */
function initSettings() {
  const bar = document.getElementById("settingsTabs");
  bar?.addEventListener("click", (e) => {
    const t = e.target.closest(".set-tab");
    if (!t) return;
    bar.querySelectorAll(".set-tab").forEach((x) => x.classList.remove("active"));
    t.classList.add("active");
    document.querySelectorAll("[data-set-panel]").forEach((p) => (p.hidden = p.dataset.setPanel !== t.dataset.tab));
    document.querySelector(".admin-content").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Jelszó megjelenítés
  document.querySelectorAll(".with-icon .eye").forEach((eye) => {
    eye.addEventListener("click", () => {
      const inp = eye.parentElement.querySelector("input");
      inp.type = inp.type === "password" ? "text" : "password";
    });
  });

  document.querySelectorAll("[data-save]").forEach((btn) =>
    btn.addEventListener("click", (e) => saveFeedback(e.currentTarget, btn.dataset.save)));
}

/* ==========================================================================
   ANIME SZERKESZTŐ
   ========================================================================== */
function initEditPage() {
  document.querySelectorAll(".tag-input").forEach((wrap) => {
    wrap.addEventListener("click", (e) => {
      const x = e.target.closest(".chip .x");
      if (x) { x.closest(".chip").remove(); return; }
      const add = e.target.closest(".add-tag");
      if (add) {
        const name = prompt("Új elem neve:");
        if (name) {
          const chip = document.createElement("span");
          chip.className = "chip";
          chip.innerHTML = `${name} <span class="x">✕</span>`;
          add.before(chip);
        }
      }
    });
  });
  document.getElementById("saveEdit")?.addEventListener("click", (e) => saveFeedback(e.currentTarget, "Mentés"));
}

/* Közös mentés-visszajelzés */
function saveFeedback(btn, original) {
  const orig = original ? btn.innerHTML : btn.innerHTML;
  btn.classList.add("saved");
  btn.innerHTML = "Mentve ✓";
  setTimeout(() => { btn.innerHTML = orig; btn.classList.remove("saved"); }, 1600);
}

/* ==========================================================================
   Indítás – oldal szerint
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderAdminLayout();
  const page = document.body.dataset.adminPage;
  ({
    dashboard: initDashboard,
    stats: initStats,
    animes: initAnimeTable,
    episodes: initEpisodes,
    moderation: initModeration,
    settings: initSettings,
    edit: initEditPage,
  }[page] || (() => {}))();
});
