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
   Nézési statisztika – oszlopdiagram tooltippel
   ========================================================================== */
function renderChart() {
  const wrap = document.getElementById("chartBars");
  const tip = document.getElementById("chartTip");
  if (!wrap) return;

  const { months, values, highlight } = DATA.watchMinutes;
  const max = Math.max(...values);

  wrap.innerHTML = values
    .map(
      (v, i) => `
      <div class="chart-col" data-index="${i}">
        <div class="bar${i === highlight ? " hl" : ""}" style="height:${Math.round((v / max) * 100)}%"></div>
        <span class="m">${months[i]}</span>
      </div>`
    )
    .join("");

  // Tooltip mozgatása az oszlopok fölé
  wrap.querySelectorAll(".chart-col").forEach((col) => {
    col.addEventListener("mouseenter", () => {
      const i = Number(col.dataset.index);
      tip.innerHTML = `<strong>${months[i]}</strong>${values[i]} perc`;
      tip.classList.add("show");

      const colRect = col.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      const bar = col.querySelector(".bar");
      tip.style.left = colRect.left - wrapRect.left + colRect.width / 2 + "px";
      tip.style.top = bar.offsetTop + "px";
    });
    col.addEventListener("mouseleave", () => tip.classList.remove("show"));
  });
}

/* ----- Indítás ----- */
document.addEventListener("DOMContentLoaded", () => {
  renderFavorites();
  renderContinuing();
  renderActivity();
  renderChart();
});
