/* ==========================================================================
   AnimeHub – anime.js
   Anime adatlap: évad fülek + epizódlista renderelése, kedvencek gomb
   ========================================================================== */

/* ----- Évad fülek + epizódok ----- */
function renderSeasonTabs(active) {
  const tabs = document.getElementById("seasonTabs");
  if (!tabs) return;

  const names = Object.keys(DATA.seasons);
  tabs.innerHTML = names
    .map((name, i) => {
      const btn = `<button class="season-tab${name === active ? " active" : ""}" data-season="${name}">${name}</button>`;
      // Az első két évad után "…" jelzi a kihagyott évadokat
      return i === 1 ? btn + '<span class="season-tab" style="pointer-events:none">…</span>' : btn;
    })
    .join("");
}

function renderEpisodes(seasonName) {
  const list = document.getElementById("episodeList");
  if (!list) return;

  const eps = DATA.seasons[seasonName] || [];

  list.innerHTML = eps
    .map((ep) => {
      // A 454-460 epizódokhoz van saját thumbnail, a többihez a 454-es kerül
      const thumb = ep.num >= 454 && ep.num <= 460
        ? `assets/img/thumb-ep${ep.num}.svg`
        : "assets/img/thumb-ep454.svg";

      return `
      <a class="episode-item${ep.watching ? " watching" : ""}" href="watch.html">
        <div class="episode-thumb">
          <img src="${thumb}" alt="${ep.num}. epizód">
          <span class="play"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
        </div>
        <div class="episode-info">
          <div class="num">${ep.num}. epizód</div>
          <h4>${ep.title}${ep.watching ? ' <span class="badge-now">Most nézed</span>' : ""}</h4>
        </div>
        <span class="duration">${ep.duration}</span>
      </a>`;
    })
    .join("");
}

function initSeasons() {
  const tabs = document.getElementById("seasonTabs");
  if (!tabs) return;

  let active = DATA.defaultSeason || Object.keys(DATA.seasons)[0];
  renderSeasonTabs(active);
  renderEpisodes(active);

  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-season]");
    if (!btn) return;
    active = btn.dataset.season;
    renderSeasonTabs(active);
    renderEpisodes(active);
  });
}

/* ----- Kedvencekhez gomb (mentett állapot localStorage-ban) ----- */
function initFavButton() {
  const btn = document.getElementById("favBtn");
  if (!btn) return;

  const KEY = "animehub-fav-naruto-shippuden";
  const label = btn.querySelector("span");

  function apply(saved) {
    label.textContent = saved ? "Kedvencekben ✓" : "Kedvencekhez";
    btn.style.borderColor = saved ? "var(--purple)" : "";
    btn.style.color = saved ? "var(--purple-2)" : "";
  }

  apply(localStorage.getItem(KEY) === "1");

  btn.addEventListener("click", () => {
    const saved = localStorage.getItem(KEY) === "1";
    localStorage.setItem(KEY, saved ? "0" : "1");
    apply(!saved);
  });
}

/* ----- Indítás ----- */
document.addEventListener("DOMContentLoaded", () => {
  initSeasons();
  initFavButton();
});
