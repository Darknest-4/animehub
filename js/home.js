/* ==========================================================================
   AnimeHub – home.js
   Kezdőlap: hero carousel + kártyasorok és oldalsó panelek renderelése
   ========================================================================== */

/* ==========================================================================
   Hero carousel
   ========================================================================== */
function renderHero() {
  const hero = document.getElementById("hero");
  const dotsWrap = document.getElementById("heroDots");
  if (!hero || !dotsWrap) return;

  const slides = DATA.heroSlides;

  hero.insertAdjacentHTML(
    "afterbegin",
    slides
      .map(
        (s, i) => `
        <article class="hero-slide${i === 0 ? " active" : ""}">
          <img src="${s.image}" alt="${s.title}">
          <div class="hero-content">
            <span class="badge">Kiemelt</span>
            <h1>${s.title}</h1>
            <div class="hero-meta">
              ${ratingHTML(s.rating)}
              ${s.genres.map((g) => `<span>${g}</span>`).join('<span class="sep">·</span>')}
              <span class="sep">·</span><span>${s.year}</span>
            </div>
            <p class="hero-desc">${s.desc}</p>
            <div class="hero-actions">
              <a class="btn-primary" href="watch.html">${ICONS.play} Megnézem</a>
              <a class="btn-secondary" href="anime.html">Részletek</a>
            </div>
          </div>
        </article>`
      )
      .join("")
  );

  dotsWrap.innerHTML = slides
    .map((_, i) => `<button${i === 0 ? ' class="active"' : ""} aria-label="${i + 1}. dia"></button>`)
    .join("");

  const slideEls = hero.querySelectorAll(".hero-slide");
  const dotEls = dotsWrap.querySelectorAll("button");
  let current = 0;
  let timer;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slideEls.forEach((el, i) => el.classList.toggle("active", i === current));
    dotEls.forEach((el, i) => el.classList.toggle("active", i === current));
  }

  function restartAutoplay() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 6000);
  }

  dotEls.forEach((dot, i) =>
    dot.addEventListener("click", () => { goTo(i); restartAutoplay(); })
  );
  document.getElementById("heroPrev")?.addEventListener("click", () => { goTo(current - 1); restartAutoplay(); });
  document.getElementById("heroNext")?.addEventListener("click", () => { goTo(current + 1); restartAutoplay(); });

  restartAutoplay();
}

/* ==========================================================================
   Kártyasorok
   ========================================================================== */
function renderContinueRow() {
  const row = document.getElementById("continueRow");
  if (!row) return;

  row.innerHTML = DATA.continueWatching
    .map(
      (a) => `
      <a class="continue-item" href="watch.html">
        <div class="card">
          <img src="${a.image}" alt="${a.title}">
          <span class="card-play">${ICONS.play}</span>
          <div class="card-overlay">
            <h3>${a.title}</h3>
            <p>${a.ep}</p>
            <div class="progress"><span style="width:${a.progress}%"></span></div>
          </div>
        </div>
      </a>`
    )
    .join("");
}

function posterCardHTML(anime) {
  return `
    <a class="poster-card" href="anime.html">
      <div class="card">
        ${anime.isNew ? '<span class="badge badge-new">Új epizód</span>' : ""}
        <img src="${anime.image}" alt="${anime.title}">
        <span class="card-play">${ICONS.play}</span>
      </div>
      <div class="poster-foot">
        <h3>${anime.title}</h3>
        ${ratingHTML(anime.rating)}
      </div>
    </a>`;
}

function renderPosterRows() {
  const popular = document.getElementById("popularRow");
  const fresh = document.getElementById("freshRow");
  if (popular) popular.innerHTML = DATA.popular.map(posterCardHTML).join("");
  if (fresh) fresh.innerHTML = DATA.fresh.map(posterCardHTML).join("");
}

/* ==========================================================================
   Jobb oldali panelek
   ========================================================================== */
function renderTopNow() {
  const list = document.getElementById("topNowList");
  if (!list) return;

  list.innerHTML = DATA.topNow
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

function renderSchedule() {
  const list = document.getElementById("scheduleList");
  if (!list) return;

  list.innerHTML = DATA.schedule
    .map(
      (s) => `
      <a class="schedule-item" href="anime.html">
        <span class="time">${s.time}</span>
        <img src="${s.image}" alt="${s.title}">
        <div class="info">
          <h4>${s.title}</h4>
          <p>${s.ep}</p>
        </div>
        <span class="bell">${ICONS.bell}</span>
      </a>`
    )
    .join("");
}

/* ----- Indítás ----- */
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderContinueRow();
  renderPosterRows();
  renderTopNow();
  renderSchedule();
});
