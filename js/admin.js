/* ==========================================================================
   AnimeHub – admin.js
   Admin panel: közös layout (sidebar + topbar), SVG grafikonok,
   és oldalankénti logika (dashboard, animék tábla, statisztika, beállítások).
   ========================================================================== */

const AI = {
  home:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  anime:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><circle cx="12" cy="12" r="3.5"/></svg>',
  episode: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/></svg>',
  list:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  folder:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
  building:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="15" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/><path d="M10 22v-4h4v4"/></svg>',
  tag:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  users:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  shield:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  ban:     '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
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
  search:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  bell:    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  moon:    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  edit:    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>',
  trash:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  eyeSm:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  plus:    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  cal:     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  back:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  ext:     '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
};

/* ==========================================================================
   Közös layout: sidebar + topbar
   ========================================================================== */
function renderAdminLayout() {
  const active = document.body.dataset.adminPage || "";

  const side = document.getElementById("adminSidebar");
  if (side) {
    side.innerHTML = `
      <a class="admin-brand" href="admin.html">
        <span class="mark">${AI.anime}</span>
        Anime<span style="color:var(--primary-light)">Hub</span> <span class="adm">Admin</span>
      </a>
      ${ADMIN.nav.map((sec) => `
        <div class="admin-nav-label">${sec.group}</div>
        ${sec.items.map((i) =>
          `<a class="admin-nav-item${i.page === active ? " active" : ""}" href="${i.href}">${AI[i.icon] || ""} ${i.label}</a>`
        ).join("")}
      `).join("")}
      <a class="admin-back" href="index.html">${AI.ext} Vissza a weboldalra</a>`;
  }

  const top = document.getElementById("adminTopbar");
  if (top) {
    top.innerHTML = `
      <div class="admin-search">
        ${AI.search}
        <input type="text" placeholder="Keresés animekre, felhasználókra, epizódokra...">
        <span class="kbd">Ctrl + K</span>
      </div>
      <div class="admin-topbar-actions">
        <button class="admin-icon-btn" aria-label="Téma">${AI.moon}</button>
        <button class="admin-icon-btn" aria-label="Értesítések">${AI.bell}<span class="badge-dot">3</span></button>
        <a class="admin-user" href="#">
          <img src="assets/img/avatar-sasuke.svg" alt="Admin">
          <div><div class="n">Admin</div><div class="r">Rendszergazda</div></div>
          <svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
      </div>`;
  }
}

/* ==========================================================================
   SVG grafikonok
   ========================================================================== */
function lineChartSVG(values, opts = {}) {
  const w = 640, h = 200, pad = 28;
  const max = Math.max(...values) * 1.1;
  const min = Math.min(...values) * 0.85;
  const stepX = (w - pad * 2) / (values.length - 1);
  const y = (v) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const pts = values.map((v, i) => [pad + i * stepX, y(v)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = `${line} L ${pts[pts.length - 1][0].toFixed(1)} ${h - pad} L ${pad} ${h - pad} Z`;
  const gridY = [0, 0.25, 0.5, 0.75, 1].map((t) => pad + t * (h - pad * 2));

  return `
    <div class="line-chart">
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
        <defs><linearGradient id="lcFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#8B5CF6" stop-opacity="0.35"/>
          <stop offset="1" stop-color="#8B5CF6" stop-opacity="0"/>
        </linearGradient></defs>
        ${gridY.map((gy) => `<line class="grid-line" x1="${pad}" y1="${gy}" x2="${w - pad}" y2="${gy}"/>`).join("")}
        <path class="area" d="${area}"/>
        <path class="line" d="${line}"/>
        ${pts.filter((_, i) => i % 2 === 0).map((p) => `<circle class="dot" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3"/>`).join("")}
      </svg>
    </div>`;
}

function donutSVG(segments) {
  const r = 60, c = 2 * Math.PI * r;
  let offset = 0;
  const arcs = segments.map((s) => {
    const len = (s.value / 100) * c;
    const dash = `${len} ${c - len}`;
    const el = `<circle cx="75" cy="75" r="${r}" fill="none" stroke="${s.color}" stroke-width="20" stroke-dasharray="${dash}" stroke-dashoffset="${-offset}"/>`;
    offset += len;
    return el;
  }).join("");

  return `
    <div class="donut-wrap">
      <div class="donut"><svg viewBox="0 0 150 150">${arcs}</svg></div>
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
    <div class="col">
      <div class="bar" style="height:${Math.round((v / max) * 100)}%"></div>
      <span class="m">${labels ? labels[i] : ""}</span>
    </div>`).join("")}</div>`;
}

const MONTHS_SHORT = ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sze", "Okt", "Nov", "Dec"];

/* ==========================================================================
   DASHBOARD
   ========================================================================== */
function initDashboard() {
  document.getElementById("statCards").innerHTML = ADMIN.dashStats.map((s) => `
    <div class="admin-card stat-card">
      <div class="top">
        <div><div class="lbl">${s.label}</div><div class="num">${s.value}</div></div>
        <span class="ic">${AI[s.icon] || AI.eye}</span>
      </div>
      <div class="trend">▲ ${s.trend} <span class="muted">az előző hónaphoz képest</span></div>
    </div>`).join("");

  document.getElementById("userGrowthChart").innerHTML = lineChartSVG(ADMIN.userGrowth);
  document.getElementById("viewsSourceChart").innerHTML = donutSVG(ADMIN.viewsSource);

  document.getElementById("activityList").innerHTML = ADMIN.activities.map((a) => `
    <div class="activity-row">
      <span class="ic ${a.type}">${{ u: AI.userplus, e: AI.episode, r: AI.ban, n: AI.news, v: AI.crown }[a.type] || AI.eye}</span>
      <div class="t"><h4>${a.title}</h4><p>${a.sub}</p></div>
      <span class="when">${a.when}</span>
    </div>`).join("");

  document.getElementById("latestAnimes").innerHTML = ADMIN.animes.slice(0, 5).map((a) => `
    <tr>
      <td><div class="title-cell"><img class="cover" style="width:34px;height:44px" src="${a.image}" alt=""><div><h4>${a.title}</h4></div></div></td>
      <td><span class="badge-status active">Folyamatban</span></td>
      <td>${a.eps}</td>
      <td>${a.created}</td>
      <td><button class="row-act">⋯</button></td>
    </tr>`).join("");

  document.getElementById("latestEpisodes").innerHTML = ADMIN.latestEpisodes.map((e) => `
    <tr>
      <td><div class="title-cell"><img class="cover" style="width:34px;height:44px" src="${e.image}" alt=""><div><h4>${e.anime}</h4></div></div></td>
      <td>${e.ep}</td>
      <td>${e.created}</td>
      <td><button class="row-act">⋯</button></td>
    </tr>`).join("");
}

/* ==========================================================================
   STATISZTIKA
   ========================================================================== */
function initStats() {
  document.getElementById("statCards").innerHTML = ADMIN.statCards.map((s) => `
    <div class="admin-card stat-card">
      <div class="top">
        <div><div class="lbl">${s.label}</div><div class="num">${s.value}</div></div>
        <span class="ic">${AI[s.icon] || AI.eye}</span>
      </div>
      <div class="trend">▲ ${s.trend} <span class="muted">az előző időszakhoz képest</span></div>
    </div>`).join("");

  document.getElementById("viewsTrendChart").innerHTML = lineChartSVG(ADMIN.viewsTrend);
  document.getElementById("devicesChart").innerHTML = donutSVG(ADMIN.devices);

  document.getElementById("countriesList").innerHTML = ADMIN.countries.map((c) => `
    <div class="row"><span class="flag">${c.flag}</span><span class="name">${c.name}</span><span class="val">${c.value}%</span></div>`).join("");

  const maxV = Math.max(...ADMIN.popularAnimes.map((a) => a.views));
  document.getElementById("popularBars").innerHTML = ADMIN.popularAnimes.map((a, i) => `
    <div class="rank-row">
      <span class="n">${i + 1}</span>
      <img src="${a.image}" alt="">
      <div class="info"><h4>${a.title}</h4><span class="rating">★ ${a.rating}</span></div>
      <div class="track"><span style="width:${Math.round((a.views / maxV) * 100)}%"></span></div>
      <span class="cnt">${a.views.toLocaleString("hu-HU")}</span>
    </div>`).join("");

  document.getElementById("watchHoursChart").innerHTML = barChartSVG(ADMIN.watchHours, MONTHS_SHORT);

  document.getElementById("revenueCards").innerHTML = ADMIN.revenue.map((r) => `
    <div class="admin-card stat-card">
      <div class="top">
        <div><div class="lbl">${r.label}</div><div class="num">${r.value}</div></div>
        <span class="ic">${AI[r.icon] || AI.dollar}</span>
      </div>
      <div class="trend">▲ ${r.trend} <span class="muted">az előző időszakhoz képest</span></div>
    </div>`).join("");
}

/* ==========================================================================
   ANIMÉK TÁBLA
   ========================================================================== */
const animeTableState = { query: "", page: 1, perPage: 10 };

function renderAnimeTable() {
  let list = ADMIN.animes.filter((a) => {
    const q = animeTableState.query.toLowerCase();
    return !q || a.title.toLowerCase().includes(q) || a.jp.includes(animeTableState.query);
  });

  document.getElementById("animeTableBody").innerHTML = list.map((a) => `
    <tr>
      <td><img class="cover" src="${a.image}" alt=""></td>
      <td><div class="title-cell"><div><h4>${a.title}</h4><div class="jp">${a.jp}</div></div></div></td>
      <td>${a.studio}</td>
      <td><div class="genre-tags">${a.genres.map((g) => `<span class="g">${g}</span>`).join("")}</div></td>
      <td>${a.year}</td>
      <td>${a.eps.toLocaleString("hu-HU")}</td>
      <td><span class="badge-status active">Aktív</span></td>
      <td>${a.created}</td>
      <td><div class="row-actions">
        <a class="row-act" href="admin-edit.html" title="Szerkesztés">${AI.edit}</a>
        <a class="row-act" href="anime.html?q=${encodeURIComponent(a.title)}" title="Megtekintés">${AI.eyeSm}</a>
        <button class="row-act del" title="Törlés">${AI.trash}</button>
      </div></td>
    </tr>`).join("") ||
    '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text-muted)">Nincs találat 🔍</td></tr>';

  document.getElementById("rowsInfo").textContent =
    `1–${Math.min(animeTableState.perPage, list.length)} / ${ADMIN.animeTotal}`;
}

function initAnimeTable() {
  renderAnimeTable();
  document.getElementById("animeSearch")?.addEventListener("input", (e) => {
    animeTableState.query = e.target.value.trim();
    renderAnimeTable();
  });
  document.getElementById("adminPagination")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".admin-page-btn[data-page]");
    if (!btn) return;
    document.querySelectorAll("#adminPagination .admin-page-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
}

/* ==========================================================================
   BEÁLLÍTÁSOK
   ========================================================================== */
function initSettings() {
  const bar = document.getElementById("settingsTabs");
  bar?.addEventListener("click", (e) => {
    const t = e.target.closest(".set-tab");
    if (!t) return;
    bar.querySelectorAll(".set-tab").forEach((x) => x.classList.remove("active"));
    t.classList.add("active");
  });

  // Kapcsolók
  document.addEventListener("click", (e) => {
    const sw = e.target.closest(".switch");
    if (sw) sw.classList.toggle("on");
  });

  // Jelszó megjelenítés
  document.querySelectorAll(".with-icon .eye").forEach((eye) => {
    eye.addEventListener("click", () => {
      const inp = eye.parentElement.querySelector("input");
      inp.type = inp.type === "password" ? "text" : "password";
    });
  });

  // Mentés visszajelzés
  document.getElementById("saveSettings")?.addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const orig = btn.innerHTML;
    btn.innerHTML = "Mentve ✓";
    setTimeout(() => (btn.innerHTML = orig), 1600);
  });
}

/* ==========================================================================
   ANIME SZERKESZTŐ
   ========================================================================== */
function initEditPage() {
  // Tag-input chipek kezelése
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

  document.getElementById("saveEdit")?.addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const orig = btn.innerHTML;
    btn.innerHTML = "Mentve ✓";
    setTimeout(() => (btn.innerHTML = orig), 1600);
  });
}

/* ==========================================================================
   Indítás – oldal szerint
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderAdminLayout();
  const page = document.body.dataset.adminPage;
  if (page === "dashboard") initDashboard();
  else if (page === "stats") initStats();
  else if (page === "animes") initAnimeTable();
  else if (page === "settings") initSettings();
  else if (page === "edit") initEditPage();

  // Ctrl+K fókusz a keresőre
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      document.querySelector(".admin-search input")?.focus();
    }
  });
});
