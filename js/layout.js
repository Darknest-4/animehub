/* ==========================================================================
   AnimeHub – layout.js
   Közös topbar + sidebar renderelése, hogy ne legyen ismétlődő HTML.
   Használat: <body data-page="home"> … <header id="appTopbar"></header>
              <aside id="appSidebar" class="sidebar"></aside>
   A data-page értéke jelöli ki az aktív menüpontot.
   ========================================================================== */

const LAYOUT_ICONS = {
  home:     '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  anime:    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><circle cx="12" cy="12" r="3.5"/></svg>',
  list:     '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  calendar: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  users:    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  news:     '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0V9"/><line x1="12" y1="7" x2="17" y2="7"/><line x1="12" y1="11" x2="17" y2="11"/><line x1="7" y1="15" x2="17" y2="15"/></svg>',
  heart:    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  clock:    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  check:    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/></svg>',
  star:     '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  settings: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  help:     '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  feedback: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg>',
  crown:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm14 3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1h14v1z"/></svg>',
  bell:     '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  search:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  playMini: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  playCircle: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/></svg>',
  user:     '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  menu:     '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  trophy:   '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  trending: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  award:    '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
};

/* ----- Topbar ----- */
function layoutTopbarHTML() {
  return `
    <button class="btn-icon menu-toggle" aria-label="Menü">
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
    <a class="logo" href="index.html">
      <span>Anime<span class="logo-accent">Hub</span></span>
    </a>

    <div class="search">
      ${LAYOUT_ICONS.search}
      <input type="text" placeholder="Keresés anime címre..." aria-label="Keresés">
      <span class="search-key">/</span>
    </div>

    <div class="topbar-actions">
      <a class="btn-icon search-mini" href="search.html" aria-label="Keresés">${LAYOUT_ICONS.search}</a>
      <a class="btn-premium" href="premium.html">${LAYOUT_ICONS.crown} <span>Prémium előfizetés</span></a>
      <a class="btn-icon" href="notifications.html" aria-label="Értesítések">${LAYOUT_ICONS.bell}<span class="dot"></span></a>
      <a class="user-chip" href="profile.html">
        <img src="assets/img/avatar-akatsuki.svg" alt="Akatsuki">
        <span class="name">Akatsuki</span>
        <svg class="chevron" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </a>
    </div>`;
}

/* ----- Sidebar ----- */
function layoutSidebarHTML(activePage, extra) {
  const item = (page, href, icon, label) =>
    `<a class="nav-item${page === activePage ? " active" : ""}" href="${href}">${LAYOUT_ICONS[icon]} ${label}</a>`;

  const premiumCard = `
    <div class="premium-card">
      <div class="crown">${LAYOUT_ICONS.crown}</div>
      <h4>Prémium tagság</h4>
      <p>Hirdetésmentes élmény, exkluzív tartalmak és még sok más!</p>
      <button class="btn-primary" style="width:100%">Tudj meg többet</button>
    </div>`;

  const continueMini = `
    <div class="panel continue-mini">
      <h5>Folytasd nézésed</h5>
      <a class="row" href="watch.html">
        <div class="thumb">
          <img src="assets/img/thumb-ep456.svg" alt="Naruto Shippuden">
          <span class="play">${LAYOUT_ICONS.playMini}</span>
        </div>
        <div class="info">
          <h6>Naruto Shippuden</h6>
          <p>456. epizód</p>
          <p>23:09 / 23:55</p>
        </div>
      </a>
      <div class="progress"><span style="width:96%"></span></div>
    </div>`;

  return `
    ${item("home", "index.html", "home", "Kezdőlap")}
    ${item("anime", "animes.html", "anime", "Animék")}
    ${item("watchlist", "watchlist.html", "list", "Műsorlista")}
    ${item("schedule", "schedule.html", "calendar", "Ütemező")}
    ${item("community", "community.html", "users", "Közösség")}
    ${item("news", "news.html", "news", "Hírek")}

    <div class="sidebar-label">Felfedezés</div>
    ${item("manga-list", "manga-list.html", "list", "Manga")}
    ${item("top-anime", "top-anime.html", "trending", "Top Anime")}
    ${item("leaderboard", "leaderboard.html", "trophy", "Ranglista")}
    ${item("achievements", "achievements.html", "award", "Eredmények")}
    ${item("notifications", "notifications.html", "bell", "Értesítések")}
    ${item("premium", "premium.html", "crown", "Premium")}

    <div class="sidebar-label">Gyűjteményed</div>
    ${item("favorites", "favorites.html", "heart", "Kedvencek")}
    ${item("watch-later", "#", "clock", "Megnézendő")}
    ${item("watched", "#", "check", "Megnézett")}
    ${item("ratings", "#", "star", "Értékelések")}

    <div class="sidebar-label">Egyéb</div>
    ${item("settings", "settings.html", "settings", "Beállítások")}
    ${item("support", "support.html", "help", "Támogatás")}
    ${item("feedback", "feedback.html", "feedback", "Visszajelzés")}

    ${extra === "continue" ? continueMini : premiumCard}`;
}

/* ----- Mobil alsó navigáció (lebegő, lekerekített sáv) -----
   4 fő oldal + "Több" gomb, ami felugró rácsban adja a maradék oldalakat,
   így telefonon is minden oldal elérhető. */
const BOTTOM_NAV_ITEMS = [
  { page: "home",      href: "index.html",     icon: "home",     label: "Kezdőlap" },
  { page: "anime",     href: "animes.html",    icon: "anime",    label: "Animék" },
  { page: "schedule",  href: "schedule.html",  icon: "calendar", label: "Ütemező" },
  { page: "community", href: "community.html", icon: "users",    label: "Közösség" },
];

const MORE_SHEET_ITEMS = [
  { page: "manga-list",   href: "manga-list.html",   icon: "list",     label: "Manga" },
  { page: "top-anime",    href: "top-anime.html",    icon: "trending", label: "Top Anime" },
  { page: "leaderboard",  href: "leaderboard.html",  icon: "trophy",   label: "Ranglista" },
  { page: "achievements", href: "achievements.html", icon: "award",    label: "Eredmények" },
  { page: "notifications", href: "notifications.html", icon: "bell",   label: "Értesítések" },
  { page: "premium",      href: "premium.html",      icon: "crown",    label: "Premium" },
  { page: "watch",     href: "watch.html",     icon: "playCircle", label: "Lejátszó" },
  { page: "watchlist", href: "watchlist.html", icon: "list",       label: "Műsorlista" },
  { page: "favorites", href: "favorites.html", icon: "heart",      label: "Kedvencek" },
  { page: "news",      href: "news.html",      icon: "news",       label: "Hírek" },
  { page: "profile",   href: "profile.html",   icon: "user",       label: "Profil" },
  { page: "search",    href: "search.html",    icon: "search",     label: "Keresés" },
  { page: "team",      href: "team.html",      icon: "users",      label: "Csapat" },
  { page: "support",   href: "support.html",   icon: "help",       label: "Támogatás" },
  { page: "settings",  href: "settings.html",  icon: "settings",   label: "Beállítások" },
  { page: "feedback",  href: "feedback.html",  icon: "feedback",   label: "Visszajelzés" },
];

function layoutBottomNavHTML(activePage) {
  const moreActive = MORE_SHEET_ITEMS.some((i) => i.page === activePage);

  return BOTTOM_NAV_ITEMS
    .map(
      (i) => `
      <a href="${i.href}"${i.page === activePage ? ' class="active"' : ""}>
        ${LAYOUT_ICONS[i.icon]}
        <span>${i.label}</span>
      </a>`
    )
    .join("") + `
    <button id="bottomNavMore"${moreActive ? ' class="active"' : ""}>
      ${LAYOUT_ICONS.menu}
      <span>Több</span>
    </button>`;
}

function layoutMoreSheetHTML(activePage) {
  return MORE_SHEET_ITEMS
    .map(
      (i) => `
      <a href="${i.href}"${i.page === activePage ? ' class="active"' : ""}>
        ${LAYOUT_ICONS[i.icon]}
        <span>${i.label}</span>
      </a>`
    )
    .join("");
}

/* ----- Renderelés (a többi szkript előtt fusson le) ----- */
document.addEventListener("DOMContentLoaded", () => {
  const topbar = document.getElementById("appTopbar");
  const sidebar = document.getElementById("appSidebar");
  const page = document.body.dataset.page || "";
  const extra = document.body.dataset.sidebarExtra || "";

  if (topbar) topbar.innerHTML = layoutTopbarHTML();
  if (sidebar) sidebar.innerHTML = layoutSidebarHTML(page, extra);

  // Alsó mobil nav minden oldalra
  const bottomNav = document.createElement("nav");
  bottomNav.className = "bottom-nav";
  bottomNav.innerHTML = layoutBottomNavHTML(page);
  document.body.appendChild(bottomNav);

  // "Több" felugró menü
  const moreSheet = document.createElement("div");
  moreSheet.className = "more-sheet";
  moreSheet.innerHTML = layoutMoreSheetHTML(page);
  document.body.appendChild(moreSheet);

  const moreBtn = document.getElementById("bottomNavMore");
  moreBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    moreSheet.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    if (!moreSheet.contains(e.target)) moreSheet.classList.remove("open");
  });

  // Mobil oldalsó fiók: a teljes sidebar menü hamburgerre nyílik
  const overlay = document.createElement("div");
  overlay.className = "drawer-overlay";
  document.body.appendChild(overlay);

  const drawer = document.createElement("aside");
  drawer.className = "mobile-drawer";
  drawer.innerHTML = `
    <div class="drawer-head">
      <a class="logo" href="index.html"><span>Anime<span class="logo-accent">Hub</span></span></a>
      <button class="btn-icon drawer-close" aria-label="Bezárás">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    ${layoutSidebarHTML(page, extra)}`;
  document.body.appendChild(drawer);

  function toggleDrawer(open) {
    drawer.classList.toggle("open", open);
    overlay.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  document.querySelectorAll(".menu-toggle").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDrawer(!drawer.classList.contains("open"));
    })
  );
  overlay.addEventListener("click", () => toggleDrawer(false));
  drawer.querySelector(".drawer-close").addEventListener("click", () => toggleDrawer(false));
});
