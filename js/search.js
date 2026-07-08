/* ==========================================================================
   AnimeHub – search.js
   Keresési eredmények ÉLŐ adatokkal a Jikan API-ból.
   URL ?q= paraméter alapján keres; a találatok az anime.html?id=-re visznek.
   Ha nincs net, a demó adatokra esik vissza.
   ========================================================================== */

const searchState = {
  query: new URLSearchParams(location.search).get("q") || "naruto",
  tab: "Összes",
  results: [],   // Jikan találatok
  loading: false,
};

const RECENT_KEY = "animehub-recent-searches";

/* ----- Anime kártya ----- */
function searchAnimeCard(a) {
  const link = a.id ? `anime.html?id=${a.id}` : `anime.html?q=${encodeURIComponent(a.title)}`;
  return `
    <a class="result-card" href="${link}">
      <div class="card">
        <img src="${a.image || "assets/img/poster-naruto.svg"}" alt="${a.title}">
        <span class="card-play">${ICONS.play}</span>
      </div>
      <h3>${a.title}</h3>
      <div class="meta">${a.type || "TV"}${a.year ? " · " + a.year : ""} ${a.rating ? ratingHTML(a.rating) : ""}</div>
    </a>`;
}

/* ----- Renderelés ----- */
function renderSearchPage() {
  document.getElementById("queryLabel").textContent = `„${searchState.query}"`;
  const topInput = document.querySelector(".topbar .search input");
  if (topInput) topInput.value = searchState.query;

  const anime = searchState.results;
  const eps = episodeHits();

  /* Fül számlálók */
  const counts = {
    "Összes": anime.length + eps.length,
    "Animék": anime.length,
    "Epizódok": eps.length ? 95 : 0,
    "Karakterek": 12,
    "Hírek": 9,
  };
  document.getElementById("resultTabs").innerHTML = Object.entries(counts)
    .map(([name, c]) =>
      `<button class="result-tab${name === searchState.tab ? " active" : ""}" data-tab="${name}">${name} (${c})</button>`)
    .join("");

  /* Animék szekció */
  const showAnime = ["Összes", "Animék"].includes(searchState.tab);
  const animeSec = document.getElementById("animeSection");
  const cards = document.getElementById("animeCards");

  if (searchState.loading) {
    animeSec.hidden = false;
    cards.innerHTML = Array.from({ length: 5 }, () =>
      '<div class="result-card"><div class="card skeleton" style="aspect-ratio:2/3"></div></div>').join("");
  } else {
    animeSec.hidden = !showAnime || !anime.length;
    cards.innerHTML = anime.slice(0, 10).map(searchAnimeCard).join("");
  }

  /* Epizódok szekció (demó marad) */
  const showEps = ["Összes", "Epizódok"].includes(searchState.tab);
  const epSec = document.getElementById("episodeSection");
  epSec.hidden = !showEps || !eps.length;
  document.getElementById("episodeList").innerHTML = eps.map((e) => `
    <a class="ep-result" href="watch.html">
      <div class="thumb"><img src="${e.image}" alt="${e.title}"><span class="play">${ICONS.play}</span></div>
      <div class="info"><div class="num">${e.ep}</div><h4>${e.title}</h4></div>
      <span class="date">${e.date}</span>
      <span class="type">TV</span>
    </a>`).join("");

  document.getElementById("noResults").hidden =
    searchState.loading || !(animeSec.hidden && epSec.hidden);
}

function episodeHits() {
  const q = searchState.query.toLowerCase();
  return "naruto".includes(q) || q.includes("naru")
    ? DATA.searchEpisodes
    : DATA.searchEpisodes.filter((e) => e.title.toLowerCase().includes(q));
}

/* ----- Jikan lekérés ----- */
async function runSearch(query) {
  searchState.query = query;
  searchState.tab = "Összes";
  searchState.loading = true;
  history.replaceState(null, "", `search.html?q=${encodeURIComponent(query)}`);
  addRecent(query);
  renderSearchPage();

  try {
    searchState.results = await Jikan.search(query, 12);
  } catch (e) {
    // Nincs net -> demó katalógus
    const q = query.toLowerCase();
    searchState.results = (DATA.searchAnime || []).filter((a) => a.title.toLowerCase().includes(q));
    if (!searchState.results.length) {
      searchState.results = buildSearchIndex()
        .filter((a) => a.title.toLowerCase().includes(q))
        .map((a) => ({ ...a, type: "TV", year: "" }));
    }
  }
  searchState.loading = false;
  renderSearchPage();
}

/* ----- Jobb oszlop ----- */
function renderPopularSearches() {
  document.getElementById("popSearches").innerHTML = DATA.popularSearches
    .map((s, i) => `<button class="pop-search-item" data-q="${s}"><span class="n">${i + 1}</span> ${s}</button>`)
    .join("");
}

function loadRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }
  catch (e) { return []; }
}
function saveRecent(list) { localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 6))); }

function renderRecent() {
  let recent = loadRecent();
  if (!recent.length) {
    recent = ["naruto", "jujutsu kaisen", "attack on titan", "one piece", "frieren"];
    saveRecent(recent);
  }
  document.getElementById("recentChips").innerHTML = recent
    .map((s) => `<span class="recent-chip" data-q="${s}">${s}<button class="x" data-remove="${s}" aria-label="Törlés">✕</button></span>`)
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
  renderPopularSearches();
  renderRecent();
  runSearch(searchState.query);

  document.getElementById("resultTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    searchState.tab = btn.dataset.tab;
    renderSearchPage();
  });

  document.getElementById("popSearches").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-q]");
    if (btn) runSearch(btn.dataset.q);
  });

  document.getElementById("recentChips").addEventListener("click", (e) => {
    const remove = e.target.closest("[data-remove]");
    if (remove) {
      saveRecent(loadRecent().filter((s) => s !== remove.dataset.remove));
      renderRecent();
      return;
    }
    const chip = e.target.closest("[data-q]");
    if (chip) runSearch(chip.dataset.q);
  });

  document.getElementById("clearRecent")?.addEventListener("click", () => {
    saveRecent([]);
    renderRecent();
  });

  document.querySelector(".topbar .search input")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) runSearch(e.target.value.trim());
  });
}

document.addEventListener("DOMContentLoaded", initSearchPage);
