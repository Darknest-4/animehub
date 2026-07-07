/* ==========================================================================
   AnimeHub – news.js
   Hírek: lista, kategória szűrés, kedvelés, jobb oszlop
   ========================================================================== */

const newsState = {
  category: "Összes hír",
  liked: new Set(),
};

const NEWS_TABS = ["Összes", "Bejelentések", "Anime hírek", "Iparági hírek", "Események"];

/* ----- Hírlista ----- */
function filteredNews() {
  if (newsState.category === "Összes hír" || newsState.category === "Összes") {
    return DATA.news;
  }
  return DATA.news.filter((n) => n.category === newsState.category);
}

function renderNews() {
  const list = document.getElementById("newsList");
  if (!list) return;

  list.innerHTML = filteredNews()
    .map((n) => {
      const i = DATA.news.indexOf(n);
      const liked = newsState.liked.has(i);
      return `
      <article class="news-card">
        <img src="${n.image}" alt="${n.title}">
        <div class="content">
          <div class="meta">
            <span class="news-badge">${n.badge}</span>
            <span class="when">${n.when}</span>
            <span class="dots">⋮</span>
          </div>
          <h2>${n.title}</h2>
          <p>${n.body}</p>
          <div class="foot">
            <button class="news-stat${liked ? " liked" : ""}" data-like="${i}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="${liked ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              ${n.likes}
            </button>
            <span class="news-stat">${ICONS.comment} ${n.comments}</span>
            <a class="read-more" href="#">Tovább olvasom ${ICONS.chevronRight}</a>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

/* ----- Fülek + kategóriák ----- */
function renderNewsTabs() {
  document.getElementById("newsTabs").innerHTML = NEWS_TABS
    .map((t) => {
      const active =
        (t === "Összes" && ["Összes hír", "Összes"].includes(newsState.category)) ||
        t === newsState.category;
      return `<button class="news-tab${active ? " active" : ""}" data-cat="${t}">${t}</button>`;
    })
    .join("");
}

function renderCategories() {
  const icons = {
    "Összes hír":    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0V9"/><line x1="12" y1="7" x2="17" y2="7"/><line x1="12" y1="11" x2="17" y2="11"/><line x1="7" y1="15" x2="17" y2="15"/></svg>',
    "Bejelentések":  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    "Anime hírek":   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><circle cx="12" cy="12" r="3.5"/></svg>',
    "Iparági hírek": '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M5 20V8l7-4 7 4v12"/><path d="M9 20v-6h6v6"/></svg>',
    "Események":     '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  };

  document.getElementById("catList").innerHTML = DATA.newsCategories
    .map(
      (c) => `
      <button class="cat-item${c.name === newsState.category ? " active" : ""}" data-cat="${c.name}">
        ${icons[c.name] || ""} ${c.name}
        <span class="count">${c.count}</span>
      </button>`
    )
    .join("");
}

function renderPopularNews() {
  const top = DATA.news.slice(0, 5);
  document.getElementById("popNews").innerHTML = top
    .map(
      (n, i) => `
      <a class="pop-news-item" href="#">
        <span class="n">${i + 1}</span>
        <img src="${n.image}" alt="${n.title}">
        <div class="info">
          <h4>${n.title}</h4>
          <div class="stat">
            <span>${n.when}</span>
            <span class="fire">🔥 ${n.likes}</span>
          </div>
        </div>
      </a>`
    )
    .join("");
}

/* ----- Vezérlők ----- */
function initNews() {
  renderNewsTabs();
  renderNews();
  renderCategories();
  renderPopularNews();

  function setCategory(cat) {
    newsState.category = cat === "Összes" ? "Összes hír" : cat;
    renderNewsTabs();
    renderCategories();
    renderNews();
  }

  document.getElementById("newsTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cat]");
    if (btn) setCategory(btn.dataset.cat);
  });

  document.getElementById("catList").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cat]");
    if (btn) setCategory(btn.dataset.cat);
  });

  /* Kedvelés */
  document.getElementById("newsList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-like]");
    if (!btn) return;
    const i = Number(btn.dataset.like);
    newsState.liked.has(i) ? newsState.liked.delete(i) : newsState.liked.add(i);
    renderNews();
  });
}

document.addEventListener("DOMContentLoaded", initNews);
