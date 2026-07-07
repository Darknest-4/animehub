/* ==========================================================================
   AnimeHub – search.js
   Keresési eredmények: URL ?q= paraméter, fülek, találatok, jobb oszlop
   ========================================================================== */

const searchState = {
  query: new URLSearchParams(location.search).get("q") || "naruto",
  tab: "Összes",
};

const RECENT_KEY = "animehub-recent-searches";

/* ----- Szűrt találatok ----- */
function animeHits() {
  const q = searchState.query.toLowerCase();
  const hits = DATA.searchAnime.filter((a) => a.title.toLowerCase().includes(q));
  // Ha a keresés nem Naruto-s, a teljes katalógusból keresünk
  if (hits.length) return hits;
  return buildSearchIndex()
    .filter((a) => a.title.toLowerCase().includes(q))
    .map((a) => ({ ...a, type: "TV", year: "" }));
}

function episodeHits() {
  const q = searchState.query.toLowerCase();
  return "naruto".includes(q) || q.includes("naru")
    ? DATA.searchEpisodes
    : DATA.searchEpisodes.filter((e) => e.title.toLowerCase().includes(q));
}

/* ----- Renderelés ----- */
function renderSearchPage() {
  const anime = animeHits();
  const eps = episodeHits();

  document.getElementById("queryLabel").textContent = `„${searchState.query}"`;
  document.querySelector(".topbar .search input").value = searchState.query;

  /* Fül számlálók */
  const counts = {
    "Összes": anime.length + eps.length + 12 + 9,
    "Animék": anime.length,
    "Epizódok": eps.length ? 95 : 0,
    "Karakterek": 12,
    "Hírek": 9,
  };
  document.getElementById("resultTabs").innerHTML = Object.entries(counts)
    .map(
      ([name, c]) =>
        `<button class="result-tab${name === searchState.tab ? " active" : ""}" data-tab="${name}">${name} (${c})</button>`
    )
    .join("");

  /* Animék szekció */
  const showAnime = ["Összes", "Animék"].includes(searchState.tab);
  const animeSec = document.getElementById("animeSection");
  animeSec.hidden = !showAnime || !anime.length;
  document.getElementById("animeCards").innerHTML = anime
    .slice(0, 5)
    .map(
      (a) => `
      <a class="result-card" href="anime.html">
        <div class="card">
          <img src="${a.image}" alt="${a.title}">
          <span class="card-play">${ICONS.play}</span>
        </div>
        <h3>${a.title}</h3>
        <div class="meta">${a.type}${a.year ? " · " + a.year : ""} ${a.rating ? ratingHTML(a.rating) : ""}</div>
      </a>`
    )
    .join("");

  /* Epizódok szekció */
  const showEps = ["Összes", "Epizódok"].includes(searchState.tab);
  const epSec = document.getElementById("episodeSection");
  epSec.hidden = !showEps || !eps.length;
  document.getElementById("episodeList").innerHTML = eps
    .map(
      (e) => `
      <a class="ep-result" href="watch.html">
        <div class="thumb">
          <img src="${e.image}" alt="${e.title}">
          <span class="play">${ICONS.play}</span>
        </div>
        <div class="info">
          <div class="num">${e.ep}</div>
          <h4>${e.title}</h4>
        </div>
        <span class="date">${e.date}</span>
        <span class="type">TV</span>
      </a>`
    )
    .join("");

  /* Üres állapot */
  document.getElementById("noResults").hidden = !(animeSec.hidden && epSec.hidden);
}

/* ----- Jobb oszlop ----- */
function renderPopularSearches() {
  document.getElementById("popSearches").innerHTML = DATA.popularSearches
    .map(
      (s, i) => `
      <button class="pop-search-item" data-q="${s}">
        <span class="n">${i + 1}</span> ${s}
      </button>`
    )
    .join("");
}

function loadRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }
  catch (e) { return []; }
}

function saveRecent(list) {
  localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 6)));
}

function renderRecent() {
  let recent = loadRecent();
  if (!recent.length) {
    recent = ["naruto", "jujutsu kaisen season 2", "attack on titan final season", "one piece", "tokyo ghoul"];
    saveRecent(recent);
  }
  document.getElementById("recentChips").innerHTML = recent
    .map(
      (s) => `
      <span class="recent-chip" data-q="${s}">${s}
        <button class="x" data-remove="${s}" aria-label="Törlés">✕</button>
      </span>`
    )
    .join("");
}

function addRecent(q) {
  const list = loadRecent().filter((s) => s !== q);
  list.unshift(q);
  saveRecent(list);
  renderRecent();
}

/* ----- Vezérlők ----- */
function initSearchPage() {
  addRecent(searchState.query);
  renderSearchPage();
  renderPopularSearches();
  renderRecent();

  /* Fülek */
  document.getElementById("resultTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    searchState.tab = btn.dataset.tab;
    renderSearchPage();
  });

  /* Népszerű / legutóbbi keresés kattintás */
  function runQuery(q) {
    searchState.query = q;
    searchState.tab = "Összes";
    history.replaceState(null, "", `search.html?q=${encodeURIComponent(q)}`);
    addRecent(q);
    renderSearchPage();
  }

  document.getElementById("popSearches").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-q]");
    if (btn) runQuery(btn.dataset.q);
  });

  document.getElementById("recentChips").addEventListener("click", (e) => {
    const remove = e.target.closest("[data-remove]");
    if (remove) {
      saveRecent(loadRecent().filter((s) => s !== remove.dataset.remove));
      renderRecent();
      return;
    }
    const chip = e.target.closest("[data-q]");
    if (chip) runQuery(chip.dataset.q);
  });

  document.getElementById("clearRecent")?.addEventListener("click", () => {
    saveRecent([]);
    renderRecent();
  });

  /* A topbar keresőből is frissüljön az oldal */
  document.querySelector(".topbar .search input")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) runQuery(e.target.value.trim());
  });
}

document.addEventListener("DOMContentLoaded", initSearchPage);
