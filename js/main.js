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
  initRowScrollers();
  initTabGroups();
  initImageSkeletons();
});
