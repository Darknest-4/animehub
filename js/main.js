/* ==========================================================================
   AnimeHub – main.js
   Minden oldalon közös viselkedés + újrahasznált segédfüggvények.
   ========================================================================== */

/* ----- Közös SVG ikonok (renderelt kártyákhoz) ----- */
const ICONS = {
  star: '<svg class="star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
  play: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  bell: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  chevronRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  comment: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  edit: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  save: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  shield: '<svg class="shield" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
};

/* ----- Segédfüggvények ----- */

/** Értékelés (csillag + szám) HTML */
function ratingHTML(value) {
  return `<span class="rating">${ICONS.star} ${value.toFixed(1)}</span>`;
}

/** Másodperc -> "mm:ss" vagy "h:mm:ss" */
function formatTime(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}

/* ----- Kereső: "/" gyorsbillentyű ----- */
function initSearchShortcut() {
  const input = document.querySelector(".search input");
  if (!input) return;

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
    if (e.key === "Escape" && document.activeElement === input) {
      input.blur();
    }
  });
}

/* ==========================================================================
   Élő kereső – a DATA-ból épített indexben keres, találati listával
   ========================================================================== */
function buildSearchIndex() {
  const seen = new Map();
  const add = (item) => {
    if (item?.title && !seen.has(item.title)) {
      seen.set(item.title, { title: item.title, rating: item.rating, image: item.image });
    }
  };
  if (typeof DATA === "undefined") return [];
  [DATA.popular, DATA.fresh, DATA.topNow, DATA.favorites, DATA.continueWatching, DATA.continuing]
    .filter(Boolean)
    .forEach((list) => list.forEach(add));
  return [...seen.values()];
}

function initLiveSearch() {
  const search = document.querySelector(".topbar .search, .watch-topbar .search");
  const input = search?.querySelector("input");
  if (!search || !input) return;

  const index = buildSearchIndex();

  const box = document.createElement("div");
  box.className = "search-results";
  search.appendChild(box);

  function render(query) {
    const q = query.trim().toLowerCase();
    if (!q) { box.classList.remove("open"); return; }

    const hits = index.filter((a) => a.title.toLowerCase().includes(q)).slice(0, 6);
    box.innerHTML = hits.length
      ? hits.map((a) => `
          <a class="search-hit" href="anime.html">
            <img src="${a.image}" alt="${a.title}">
            <div class="t">
              <h4>${a.title}</h4>
              ${a.rating ? ratingHTML(a.rating) : ""}
            </div>
            <span class="go">${ICONS.chevronRight}</span>
          </a>`).join("")
      : '<div class="search-empty">Nincs találat 😔</div>';
    box.classList.add("open");
  }

  input.addEventListener("input", () => render(input.value));
  input.addEventListener("focus", () => render(input.value));
  document.addEventListener("click", (e) => {
    if (!search.contains(e.target)) box.classList.remove("open");
  });
}

/* ==========================================================================
   Fejléc lenyíló menük: értesítések + felhasználói menü
   ========================================================================== */
function initHeaderMenus() {
  const actions = document.querySelector(".topbar-actions");
  if (!actions) return;

  /* -- Értesítések -- */
  const bellBtn = actions.querySelector('[aria-label="Értesítések"]');
  const notifMenu = document.createElement("div");
  notifMenu.className = "menu-pop";
  const notifs = (typeof DATA !== "undefined" && DATA.notifications) || [];
  const notifIcons = { play: ICONS.play, star: ICONS.star, save: ICONS.save };
  notifMenu.innerHTML = `
    <div class="menu-head">Értesítések <span class="count">${notifs.length} új</span></div>
    ${notifs.map((n) => `
      <div class="notif-item">
        <span class="ic">${notifIcons[n.type] || ICONS.bell}</span>
        <p>${n.text}</p>
        <span class="when">${n.when}</span>
      </div>`).join("")}`;
  actions.appendChild(notifMenu);

  /* -- Felhasználói menü -- */
  const userChip = actions.querySelector(".user-chip");
  const userMenu = document.createElement("div");
  userMenu.className = "menu-pop";
  userMenu.innerHTML = `
    <div class="user-menu-head">
      <img src="assets/img/avatar-akatsuki.svg" alt="Akatsuki">
      <div>
        <div class="n">Akatsuki</div>
        <div class="h">@akatsuki · Szint 23</div>
      </div>
    </div>
    <a class="menu-item" href="profile.html">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      Profilom
    </a>
    <a class="menu-item" href="profile.html">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      Műsorlistám
    </a>
    <button class="menu-item">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      Beállítások
    </button>
    <div class="menu-sep"></div>
    <button class="menu-item danger">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      Kijelentkezés
    </button>`;
  actions.appendChild(userMenu);

  /* -- Nyitás / zárás -- */
  function toggle(menu, others) {
    others.forEach((m) => m.classList.remove("open"));
    menu.classList.toggle("open");
  }

  bellBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(notifMenu, [userMenu]);
  });

  userChip?.addEventListener("click", (e) => {
    e.preventDefault(); // ne navigáljon azonnal – a menüből lehet
    e.stopPropagation();
    toggle(userMenu, [notifMenu]);
  });

  document.addEventListener("click", (e) => {
    if (!actions.contains(e.target)) {
      notifMenu.classList.remove("open");
      userMenu.classList.remove("open");
    }
  });
}

/* ----- Vízszintes kártyasor görgetése nyilakkal ----- */
function initRowScrollers() {
  document.querySelectorAll("[data-scroll-row]").forEach((section) => {
    const row = section.querySelector(".row-scroll");
    const prev = section.querySelector("[data-prev]");
    const next = section.querySelector("[data-next]");
    if (!row) return;

    const step = () => Math.round(row.clientWidth * 0.8);
    prev?.addEventListener("click", () => row.scrollBy({ left: -step() }));
    next?.addEventListener("click", () => row.scrollBy({ left: step() }));
  });
}

/* ----- Fül-váltó (általános) -----
   A gombokon data-tab-group azonosítja a csoportot; csak az .active
   állapotot kezeli, a szűrést az oldal saját szkriptje végzi. */
function initTabGroups() {
  document.querySelectorAll("[data-tab-group]").forEach((group) => {
    group.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn || !group.contains(btn)) return;
      group.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

/* ----- Skeleton loader képekhez -----
   Amíg egy kép tölt, csillogó (shimmer) hátteret kap; betöltés után
   finoman beúszik. A dinamikusan cserélt src-re (images.js) is működik. */
function watchImage(img) {
  if (img.complete && img.naturalWidth > 0) return;

  img.classList.add("img-loading");
  const done = () => {
    img.classList.remove("img-loading");
    img.classList.add("img-fade");
  };
  img.addEventListener("load", done, { once: true });
  img.addEventListener("error", () => img.classList.remove("img-loading"), { once: true });
}

function initImageSkeletons() {
  document.querySelectorAll("img").forEach(watchImage);

  // Később hozzáadott képek (JS-ből renderelt listák) figyelése
  new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.tagName === "IMG") watchImage(node);
        else node.querySelectorAll?.("img").forEach(watchImage);
      });
    }
  }).observe(document.body, { childList: true, subtree: true });
}

/* ----- Indítás ----- */
document.addEventListener("DOMContentLoaded", () => {
  initSearchShortcut();
  initLiveSearch();
  initHeaderMenus();
  initRowScrollers();
  initTabGroups();
  initImageSkeletons();
});
