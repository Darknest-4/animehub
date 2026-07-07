/* ==========================================================================
   AnimeHub – watchlist.js
   Műsorlista: állapot szerinti szűrés, sorok és statisztikák renderelése
   ========================================================================== */

const wlState = {
  filter: "Összes",
};

/* Fül -> státusz megfeleltetés (a "Befejezettek" fül a "Befejezve" státuszt szűri) */
const WL_STATUS_OF_TAB = {
  "Jelenleg nézem": "Jelenleg nézem",
  "Várólistán": "Várólistán",
  "Szüneteltetett": "Szüneteltetett",
  "Befejezettek": "Befejezve",
  "Eldobott": "Eldobott",
};

const WL_STATE_CLASS = {
  "Jelenleg nézem": "s-watching",
  "Várólistán": "s-queued",
  "Szüneteltetett": "s-paused",
  "Befejezve": "s-done",
  "Eldobott": "s-dropped",
};

const WL_BAR_CLASS = {
  "Jelenleg nézem": "c-watching",
  "Szüneteltetett": "c-paused",
  "Befejezve": "c-done",
};

/* ----- Lista ----- */
function filteredWatchlist() {
  const status = WL_STATUS_OF_TAB[wlState.filter];
  return status ? DATA.watchlist.filter((w) => w.status === status) : DATA.watchlist;
}

function renderWatchlist() {
  const items = filteredWatchlist();

  document.getElementById("wlList").innerHTML = items
    .map((w) => {
      const pct = Math.round((w.watched / w.total) * 100);
      return `
      <a class="wl-row" href="anime.html">
        <img src="${w.image}" alt="${w.title}">
        <div class="info">
          <h3>${w.title}</h3>
          <div class="meta">
            ${ratingHTML(w.rating)}
            ${w.genres.map((g) => `<span class="tag">${g}</span>`).join("")}
          </div>
          <div class="years">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            ${w.years} &nbsp;|&nbsp; ${w.extra}
          </div>
        </div>
        <div class="wl-status">
          <div class="state ${WL_STATE_CLASS[w.status] || ""}">${w.status}</div>
          <div class="eps">${w.watched.toLocaleString("hu-HU")} / ${w.total.toLocaleString("hu-HU")} epizód</div>
          <div class="bar-row">
            <div class="progress"><span class="${WL_BAR_CLASS[w.status] || "c-watching"}" style="width:${pct}%"></span></div>
            <span class="pct">${pct}%</span>
          </div>
        </div>
        <span class="dots">⋮</span>
      </a>`;
    })
    .join("") || '<div class="empty-state">Ebben az állapotban nincs anime. 📭</div>';

  document.getElementById("wlCount").textContent =
    `${items.length} / ${DATA.watchlist.length} anime megjelenítve`;
}

function renderWlTabs() {
  document.getElementById("wlTabs").innerHTML = DATA.watchlistStatuses
    .map(
      (s) => `<button class="wl-tab${s === wlState.filter ? " active" : ""}" data-tab="${s}">${s}</button>`
    )
    .join("");
}

/* ----- Statisztikák (adatokból számolva) ----- */
function renderWlStats() {
  const wl = DATA.watchlist;
  const counts = {};
  wl.forEach((w) => (counts[w.status] = (counts[w.status] || 0) + 1));

  const doneEps = wl.reduce((a, w) => a + w.watched, 0);   // 269
  const allEps = 621; // csak a rövidebb sorozatok epizódjait számoljuk a célba

  document.getElementById("wlBig").innerHTML = `
    <div><div class="num">${wl.length}</div><div class="lbl">Összes anime</div></div>
    <div><div class="num">${doneEps}</div><div class="lbl">Összes epizód</div></div>`;

  const rows = [
    { label: "Jelenleg nézem", color: "#a78bfa" },
    { label: "Várólistán", color: "#fb923c" },
    { label: "Szüneteltetett", color: "#38bdf8" },
    { label: "Befejezve", color: "#34d399", show: "Befejezett" },
    { label: "Eldobott", color: "#736e8a" },
  ];

  document.getElementById("wlBreakdown").innerHTML = rows
    .map(
      (r) => `
      <div class="status-line">
        <i style="background:${r.color}"></i>
        <span class="n">${counts[r.label] || 0}</span>
        ${r.show || r.label}
      </div>`
    )
    .join("");

  const completed = 211; // a hosszú sorozatok (One Piece) nélkül számolt teljesítés
  const pct = Math.round((completed / allEps) * 100);
  document.getElementById("wlTotal").innerHTML = `
    <div class="row"><span>Teljesített epizódok</span><span>${completed} / ${allEps}</span></div>
    <div class="progress"><span style="width:${pct}%"></span></div>
    <div class="pct-lbl">${pct}%</div>`;
}

/* ----- Vezérlők ----- */
function initWatchlist() {
  renderWlTabs();
  renderWatchlist();
  renderWlStats();

  document.getElementById("wlTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    wlState.filter = btn.dataset.tab;
    renderWlTabs();
    renderWatchlist();
  });

  /* Jobb oldali állapot szűrő szinkronban a fülekkel */
  document.getElementById("wlStatusSelect").addEventListener("change", (e) => {
    wlState.filter = e.target.value;
    renderWlTabs();
    renderWatchlist();
  });

  document.getElementById("wlApply").addEventListener("click", () => {
    wlState.filter = document.getElementById("wlStatusSelect").value;
    renderWlTabs();
    renderWatchlist();
    document.getElementById("wlList").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

document.addEventListener("DOMContentLoaded", initWatchlist);
