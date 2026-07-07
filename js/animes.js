/* ==========================================================================
   AnimeHub – animes.js
   Animék böngésző: műfaj szűrés, rendezés, szűrő panel, több betöltése
   ========================================================================== */

const browseState = {
  genre: "Összes",
  sort: "Népszerűség szerint", // vagy "Értékelés szerint"
  status: "Összes",
  minStars: 0,
  showAll: false,
};

/* ----- Kártyák ----- */
function browseCardHTML(a, isNew) {
  return `
    <a class="browse-card" href="anime.html">
      <img src="${a.image}" alt="${a.title}">
      <span class="shade"></span>
      ${isNew
        ? '<span class="new-badge">ÚJ</span>'
        : `<span class="rate">${ICONS.star} ${a.rating.toFixed(1)}</span>`}
      <span class="info">
        <span class="meta">${a.genre} · ${a.year}${a.eps ? " · " + a.eps : ""}</span>
        <h3>${a.title}</h3>
      </span>
    </a>`;
}

function filteredBrowse(list) {
  let items = list.slice();
  if (browseState.genre !== "Összes") {
    items = items.filter((a) => a.genre === browseState.genre);
  }
  if (browseState.minStars > 0) {
    items = items.filter((a) => !a.rating || a.rating >= 7 + browseState.minStars * 0.5);
  }
  if (browseState.sort === "Értékelés szerint") {
    items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }
  return items;
}

function renderBrowse() {
  const popular = filteredBrowse(DATA.browsePopular);
  const fresh = filteredBrowse(DATA.browseFresh);

  const popLimit = browseState.showAll ? popular.length : 6;
  document.getElementById("popularCards").innerHTML =
    popular.slice(0, popLimit).map((a) => browseCardHTML(a, false)).join("") ||
    '<div class="empty-state" style="grid-column:1/-1">Nincs találat ebben a műfajban. 😔</div>';

  document.getElementById("freshCards").innerHTML =
    fresh.slice(0, 6).map((a) => browseCardHTML(a, true)).join("") ||
    '<div class="empty-state" style="grid-column:1/-1">Nincs friss anime ebben a műfajban.</div>';

  document.getElementById("totalCount").textContent =
    `Összesen ${(1248).toLocaleString("hu-HU")} anime`;

  const moreBtn = document.getElementById("loadMore");
  moreBtn.style.display = browseState.showAll || popular.length <= 6 ? "none" : "";
}

function renderGenreTabs() {
  document.getElementById("genreTabs").innerHTML = DATA.browseGenres
    .map(
      (g) => `<button class="genre-tab${g === browseState.genre ? " active" : ""}" data-genre="${g}">${g}</button>`
    )
    .join("") + '<button class="genre-tab">Továbbiak ▾</button>';
}

/* ----- Top 5 (jobb oszlop) ----- */
function renderTopAnime() {
  document.getElementById("topAnimeList").innerHTML = DATA.topNow
    .map(
      (a, i) => `
      <a class="top-item" href="anime.html">
        <span class="rank">${i + 1}</span>
        <img src="${a.image}" alt="${a.title}">
        <div class="info">
          <h4>${a.title}</h4>
          ${ratingHTML(a.rating)}
        </div>
      </a>`
    )
    .join("");
}

/* ----- Vezérlők ----- */
function initBrowse() {
  renderGenreTabs();
  renderBrowse();
  renderTopAnime();

  document.getElementById("genreTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-genre]");
    if (!btn) return;
    browseState.genre = btn.dataset.genre;
    renderGenreTabs();
    renderBrowse();
  });

  /* Rendezés váltó */
  const sortBtn = document.getElementById("sortBtn");
  sortBtn.addEventListener("click", () => {
    browseState.sort = browseState.sort === "Népszerűség szerint" ? "Értékelés szerint" : "Népszerűség szerint";
    sortBtn.querySelector("span").textContent = browseState.sort;
    renderBrowse();
  });

  /* Több betöltése */
  document.getElementById("loadMore").addEventListener("click", () => {
    browseState.showAll = true;
    renderBrowse();
  });

  /* Állapot chipek (jobb oszlop) */
  document.getElementById("statusChips").addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    browseState.status = chip.textContent.trim();
    document.querySelectorAll("#statusChips .filter-chip").forEach((c) =>
      c.classList.toggle("active", c === chip)
    );
  });

  /* Csillag szűrő */
  const stars = document.querySelectorAll("#starFilter button");
  stars.forEach((s, i) =>
    s.addEventListener("click", () => {
      browseState.minStars = browseState.minStars === i + 1 ? 0 : i + 1;
      stars.forEach((b, j) => b.classList.toggle("on", j < browseState.minStars));
    })
  );

  /* Év csúszka címke */
  const range = document.getElementById("yearRange");
  range?.addEventListener("input", () => {
    document.getElementById("yearFrom").textContent = range.value;
  });

  /* Szűrés alkalmazása */
  document.getElementById("applyFilters").addEventListener("click", () => {
    browseState.showAll = true;
    renderBrowse();
    document.getElementById("popularCards").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

document.addEventListener("DOMContentLoaded", initBrowse);
