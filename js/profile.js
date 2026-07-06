/* ==========================================================================
   AnimeHub – profile.js
   Profil: kedvencek, folytatás, aktivitás renderelése + oszlopdiagram
   ========================================================================== */

/* ----- Kedvenc animék ----- */
function renderFavorites() {
  const grid = document.getElementById("favGrid");
  if (!grid) return;

  grid.innerHTML = DATA.favorites
    .map(
      (a) => `
      <a class="fav-card" href="anime.html">
        <div class="card">
          <span class="rank-badge">${a.rank}</span>
          <img src="${a.image}" alt="${a.title}">
          <span class="card-play">${ICONS.play}</span>
        </div>
        <h3>${a.title}</h3>
        ${ratingHTML(a.rating)}
      </a>`
    )
    .join("");
}

/* ----- Folytatás alatt ----- */
function renderContinuing() {
  const list = document.getElementById("contList");
  if (!list) return;

  list.innerHTML = DATA.continuing
    .map(
      (a) => `
      <a class="cont-item" href="watch.html">
        <img src="${a.image}" alt="${a.title}">
        <div class="info">
          <h4>${a.title}</h4>
          <p>${a.ep}</p>
          <div class="progress"><span style="width:${a.progress}%"></span></div>
        </div>
        <span class="pct">${a.progress}%</span>
      </a>`
    )
    .join("");
}

/* ----- Legutóbbi aktivitás ----- */
function renderActivity() {
  const list = document.getElementById("activityList");
  if (!list) return;

  const icons = { play: ICONS.play, star: ICONS.star, save: ICONS.save };

  list.innerHTML = DATA.activity
    .map(
      (a) => `
      <div class="activity-item">
        <span class="ic">${icons[a.type] || ICONS.play}</span>
        <p>${a.text}</p>
        <span class="when">${a.when}</span>
      </div>`
    )
    .join("");
}

/* ==========================================================================
   Nézési statisztika – évváltó, oszlopdiagram tooltippel és kattintással
   ========================================================================== */
const chartState = {
  year: DATA.watchMinutes.defaultYear,
  selectedMonth: null,
};

function currentYearData() {
  return DATA.watchMinutes.years[chartState.year];
}

function renderChart() {
  const wrap = document.getElementById("chartBars");
  const tip = document.getElementById("chartTip");
  if (!wrap) return;

  const { months, highlight } = DATA.watchMinutes;
  const { values, trend } = currentYearData();
  const max = Math.max(...values);
  const total = values.reduce((a, b) => a + b, 0);

  /* Összesítő + évcímke frissítése */
  document.getElementById("yearLabel").textContent = chartState.year;
  document.getElementById("totalMinutes").innerHTML =
    `${total.toLocaleString("hu-HU")} <small>perc</small>`;
  document.getElementById("trendLabel").textContent = trend;

  wrap.innerHTML = values
    .map(
      (v, i) => `
      <div class="chart-col" data-index="${i}">
        <div class="bar${i === highlight && chartState.selectedMonth === null ? " hl" : ""}${i === chartState.selectedMonth ? " hl" : ""}" style="height:${Math.round((v / max) * 100)}%"></div>
        <span class="m">${months[i]}</span>
      </div>`
    )
    .join("");

  wrap.querySelectorAll(".chart-col").forEach((col) => {
    const i = Number(col.dataset.index);

    /* Tooltip hoverre */
    col.addEventListener("mouseenter", () => {
      tip.innerHTML = `<strong>${months[i]}</strong>${values[i]} perc`;
      tip.classList.add("show");
      const colRect = col.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      tip.style.left = colRect.left - wrapRect.left + colRect.width / 2 + "px";
      tip.style.top = col.querySelector(".bar").offsetTop + "px";
    });
    col.addEventListener("mouseleave", () => tip.classList.remove("show"));

    /* Kattintás: hónap részletei */
    col.addEventListener("click", () => {
      chartState.selectedMonth = i;
      const mins = values[i];
      const eps = Math.round(mins / 24);
      const share = Math.round((mins / total) * 100);
      document.getElementById("monthDetail").innerHTML =
        `<strong>${months[i]} ${chartState.year}</strong> · ${mins} perc · ~${eps} epizód · az éves nézés ${share}%-a`;
      renderChart();
    });
  });
}

function initYearPicker() {
  const years = Object.keys(DATA.watchMinutes.years).map(Number).sort();

  function step(dir) {
    const idx = years.indexOf(chartState.year) + dir;
    if (idx < 0 || idx >= years.length) return;
    chartState.year = years[idx];
    chartState.selectedMonth = null;
    document.getElementById("monthDetail").textContent = "Kattints egy oszlopra a részletekért!";
    renderChart();
  }

  document.getElementById("yearPrev")?.addEventListener("click", () => step(-1));
  document.getElementById("yearNext")?.addEventListener("click", () => step(1));
}

/* ==========================================================================
   Fülek: Áttekintés / Megnézett / Értékelések / Műsorlista / Kedvencek / Aktivitás
   ========================================================================== */
function posterGridHTML(items, subline) {
  return `
    <div class="fav-grid">
      ${items.map((a) => `
        <a class="fav-card" href="anime.html">
          <div class="card">
            <img src="${a.image}" alt="${a.title}">
            <span class="card-play">${ICONS.play}</span>
          </div>
          <h3>${a.title}</h3>
          ${subline ? `<div class="sub">${subline(a)}</div>` : (a.rating ? ratingHTML(a.rating) : "")}
        </a>`).join("")}
    </div>`;
}

function renderTab(name) {
  const overview = document.getElementById("panelOverview");
  const dyn = document.getElementById("panelDynamic");
  if (!overview || !dyn) return;

  if (name === "Áttekintés") {
    overview.hidden = false;
    dyn.hidden = true;
    return;
  }

  overview.hidden = true;
  dyn.hidden = false;

  const head = (title, count) => `
    <div class="section-head">
      <h2>${title}</h2>
      <span class="spacer"></span>
      <span class="tab-count">${count} elem</span>
    </div>`;

  if (name === "Megnézett") {
    dyn.innerHTML = head("Megnézett animék", DATA.popular.length) +
      posterGridHTML(DATA.popular, () => '<div class="watched-mark">✓ Megnézve</div>');
  } else if (name === "Értékelések") {
    dyn.innerHTML = head("Értékeléseim", DATA.myRatings.length) + `
      <div class="rating-list">
        ${DATA.myRatings.map((r) => `
          <a class="rating-row" href="anime.html">
            <img src="${r.image}" alt="${r.title}">
            <div class="t">
              <h4>${r.title}</h4>
              <p>${r.when}</p>
            </div>
            <span class="score">${ICONS.star} ${r.score}/10</span>
          </a>`).join("")}
      </div>`;
  } else if (name === "Műsorlista") {
    dyn.innerHTML = head("Műsorlistám", DATA.continuing.length) + `
      <div class="rating-list">
        ${DATA.continuing.map((c) => `
          <a class="rating-row" href="watch.html">
            <img src="${c.image}" alt="${c.title}">
            <div class="t">
              <h4>${c.title}</h4>
              <p>${c.ep}</p>
              <div class="progress" style="margin-top:8px"><span style="width:${c.progress}%"></span></div>
            </div>
            <span class="score">${c.progress}%</span>
          </a>`).join("")}
      </div>`;
  } else if (name === "Kedvencek") {
    dyn.innerHTML = head("Kedvenc animék", DATA.favorites.length) +
      posterGridHTML(DATA.favorites);
  } else if (name === "Aktivitás") {
    dyn.innerHTML = head("Legutóbbi aktivitás", DATA.activity.length) + `
      <div class="panel">
        ${DATA.activity.map((a) => `
          <div class="activity-item">
            <span class="ic">${{ play: ICONS.play, star: ICONS.star, save: ICONS.save }[a.type] || ICONS.play}</span>
            <p>${a.text}</p>
            <span class="when">${a.when}</span>
          </div>`).join("")}
      </div>`;
  }
}

function initProfileTabs() {
  const tabs = document.getElementById("profileTabs");
  if (!tabs) return;

  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tab]");
    if (btn) renderTab(btn.dataset.tab);
  });

  /* Statisztika kártyák kattintásra a megfelelő fülre ugranak */
  document.getElementById("statsRow")?.addEventListener("click", (e) => {
    const cell = e.target.closest(".stat-cell[data-goto]");
    if (!cell) return;
    const name = cell.dataset.goto;
    tabs.querySelectorAll("button").forEach((b) =>
      b.classList.toggle("active", b.dataset.tab === name)
    );
    renderTab(name);
    tabs.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}

/* ----- Indítás ----- */
document.addEventListener("DOMContentLoaded", () => {
  renderFavorites();
  renderContinuing();
  renderActivity();
  renderChart();
  initYearPicker();
  initProfileTabs();
});
