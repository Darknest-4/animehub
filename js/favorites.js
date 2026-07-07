/* ==========================================================================
   AnimeHub – favorites.js
   Kedvencek: rács szív gombbal (eltávolítás), szűrés, export, lista törlés
   ========================================================================== */

const favpState = {
  items: DATA.favoritesPage.slice(),
  filter: "Összes",
};

const FAVP_TABS = ["Összes", "Aktuális", "Befejezett", "Terveim között", "Felfüggesztett"];

/* ----- Rács ----- */
function filteredFavp() {
  return favpState.filter === "Összes"
    ? favpState.items
    : favpState.items.filter((f) => f.status === favpState.filter);
}

function renderFavp() {
  const items = filteredFavp();

  document.getElementById("favpCards").innerHTML = items.length
    ? items
        .map((f) => `
        <a class="favp-card" href="anime.html" data-title="${f.title}">
          <img src="${f.image}" alt="${f.title}">
          <span class="shade"></span>
          <button class="heart-btn" data-remove="${f.title}" aria-label="Eltávolítás a kedvencekből">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <span class="info">
            <h3>${f.title}</h3>
            <span class="years">${f.years}</span>
            ${ratingHTML(f.rating)}
          </span>
        </a>`)
        .join("")
    : '<div class="favp-empty">Nincs kedvenc ebben a kategóriában. 💔<br>Adj hozzá animéket a szív ikonnal!</div>';

  renderFavpStats();
}

function renderFavpTabs() {
  document.getElementById("favpTabs").innerHTML = FAVP_TABS
    .map(
      (t) => `<button class="favp-tab${t === favpState.filter ? " active" : ""}" data-tab="${t}">${t}</button>`
    )
    .join("");
}

/* ----- Statisztikák ----- */
function renderFavpStats() {
  const items = favpState.items;
  const count = items.length;
  const avg = count
    ? (items.reduce((a, f) => a + f.rating, 0) / count).toFixed(1)
    : "–";

  document.getElementById("favCount").textContent = count;
  document.getElementById("statCount").textContent = count;
  document.getElementById("statEps").textContent = (1248).toLocaleString("hu-HU");
  document.getElementById("statAvg").textContent = avg;
  document.getElementById("statHours").textContent = "456 óra";
}

/* ----- Vezérlők ----- */
function initFavoritesPage() {
  renderFavpTabs();
  renderFavp();

  /* Fülek */
  document.getElementById("favpTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    favpState.filter = btn.dataset.tab;
    renderFavpTabs();
    renderFavp();
  });

  /* Szív: eltávolítás a kedvencekből */
  document.getElementById("favpCards").addEventListener("click", (e) => {
    const heart = e.target.closest("[data-remove]");
    if (!heart) return;
    e.preventDefault();
    favpState.items = favpState.items.filter((f) => f.title !== heart.dataset.remove);
    renderFavp();
  });

  /* Lista exportálása JSON-ként */
  document.getElementById("exportList").addEventListener("click", () => {
    const blob = new Blob(
      [JSON.stringify(favpState.items, null, 2)],
      { type: "application/json" }
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "animehub-kedvencek.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  /* Lista törlése (megerősítéssel) */
  document.getElementById("clearList").addEventListener("click", () => {
    if (confirm("Biztosan törlöd az összes kedvencedet? Ez nem visszavonható.")) {
      favpState.items = [];
      renderFavp();
    }
  });
}

document.addEventListener("DOMContentLoaded", initFavoritesPage);
