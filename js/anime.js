/* ==========================================================================
   AnimeHub – anime.js
   Dinamikus anime adatlap: a Jikan API-ból tölti be az adatokat az URL
   ?id=<mal_id> vagy ?q=<cím> paramétere alapján.
   Ha nincs paraméter / nincs net, a demó (Naruto) tartalom marad.
   ========================================================================== */

const animeState = {
  id: null,
  title: "Naruto Shippuden",
  episodes: [],     // Jikan epizódok
  epsPerSeason: 24, // "évadokra" bontáshoz
  activeSeason: 0,
};

/* ----- Segéd: nagy szám rövidítése (134243 -> 134.2K) ----- */
function shortNum(n) {
  if (!n) return "0";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return String(n);
}

/* ==========================================================================
   Adatlap feltöltése
   ========================================================================== */
function fillAnime(a) {
  animeState.id = a.id;
  animeState.title = a.title;

  document.title = `${a.title} – AnimeHub`;
  setText("bcTitle", a.title);
  setText("animeTitle", a.title);
  setText("animeJp", a.jpTitle);
  setText("animeScore", a.rating ? a.rating.toFixed(1) : "–");
  setText("animeVotes", a.votes ? `${shortNum(a.votes)} értékelés` : "Nincs értékelés");
  setText("animeDesc", a.synopsis || "Nincs elérhető leírás ehhez az animéhez.");

  if (a.image) setImg("animePoster", a.image, a.title);
  if (a.backdrop) setImg("animeBackdrop", a.backdrop, "");
  else if (a.image) setImg("animeBackdrop", a.image, "");

  /* Címkék a hero-ban */
  const tags = [];
  if (a.ageRating) tags.push(a.ageRating);
  if (a.year) tags.push(String(a.year));
  a.genres.slice(0, 4).forEach((g) => tags.push(g));
  setHTML("animeTags", tags.map((t) => `<span class="tag">${t}</span>`).join(""));

  /* Adatok táblázat */
  const meta = [
    ["Eredeti cím", a.jpTitle || a.title],
    ["Epizódok", a.eps || "—"],
    ["Stúdió", a.studio],
    ["Hossz", a.duration || "—"],
    ["Forrás", a.source],
    ["Típus", a.type],
    ["Sugárzás", a.aired || "—"],
    ["Státusz", a.status],
  ];
  setHTML("animeMeta", meta.map(([dt, dd]) =>
    `<div class="meta-row"><dt>${dt}</dt><dd>${dd}</dd></div>`).join(""));

  /* Műfajok */
  setHTML("animeGenres", a.genres.length
    ? a.genres.map((g) => `<span class="tag">${g}</span>`).join("")
    : '<span class="tag">—</span>');

  /* Jobb oszlop: értékelés / státusz / népszerűség */
  setText("scoreValue", a.rating ? a.rating.toFixed(1) : "–");
  setText("scoreCount", a.votes ? `${shortNum(a.votes)} értékelés` : "Nincs értékelés");
  setText("animeStatus", a.status);
  setText("animeEpsCount", a.eps ? `${a.eps} epizód` : (a.airing ? "Folyamatban" : "—"));
  setText("animeRank", a.rank ? `#${a.rank}` : "–");

  /* Watch gomb visz az azonosítóval a lejátszóra */
  const watch = document.getElementById("watchBtn");
  if (watch) watch.href = `watch.html?id=${a.id}`;

  /* Kedvenc gomb az adott animéhez kötve */
  initFavButton(a.id, a.title);

  /* Státusz pötty szín a fut/befejezett alapján */
  const stateEl = document.getElementById("animeStatus");
  if (stateEl) stateEl.style.setProperty("--dot", a.airing ? "var(--info)" : "var(--success)");
}

/* ----- Értékelés eloszlás (statistics) ----- */
function fillScoreBars(stats) {
  const scores = stats?.scores;
  if (!scores) return;

  // Jikan 1..10 skálán ad, mi 5 sávra vonjuk össze (9-10, 7-8, 5-6, 3-4, 1-2)
  const buckets = [0, 0, 0, 0, 0];
  let total = 0;
  scores.forEach((s) => {
    total += s.votes;
    const b = Math.min(4, Math.floor((10 - s.score) / 2));
    buckets[b] += s.votes;
  });
  if (!total) return;

  const labels = [5, 4, 3, 2, 1];
  setHTML("scoreBars", buckets.map((v, i) => {
    const pct = Math.round((v / total) * 100);
    return `<div class="score-bar"><span class="label">${labels[i]}<span class="star">★</span></span><div class="progress"><span style="width:${pct}%"></span></div><span class="pct">${pct}%</span></div>`;
  }).join(""));
}

/* ----- Kapcsolódó animék ----- */
function fillRelated(relations) {
  const list = document.getElementById("relatedList");
  if (!list) return;

  const items = [];
  (relations || []).forEach((rel) => {
    rel.entry.forEach((e) => {
      if (e.type === "anime" && items.length < 4) {
        items.push({ id: e.mal_id, title: e.name, kind: rel.relation });
      }
    });
  });

  if (!items.length) { list.innerHTML = '<p style="font-size:13px;color:var(--text-muted)">Nincs kapcsolódó anime.</p>'; return; }

  list.innerHTML = items.map((r) => `
    <a class="related-item" href="anime.html?id=${r.id}">
      <img src="assets/img/poster-naruto.svg" alt="${r.title}" data-jikan-poster="${r.id}">
      <div class="info">
        <h4>${r.title}</h4>
        <p>${r.kind}</p>
      </div>
      <span class="chevron"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
    </a>`).join("");

  // Kapcsolódó poszterek utólagos betöltése (kis késleltetéssel a rate limit miatt)
  items.forEach((r, i) => {
    setTimeout(() => {
      Jikan.full(r.id).then((full) => {
        const img = list.querySelector(`[data-jikan-poster="${r.id}"]`);
        const url = full?.images?.jpg?.large_image_url;
        if (img && url) { img.src = url; if (typeof watchImage === "function") watchImage(img); }
      }).catch(() => {});
    }, 500 * (i + 1));
  });
}

/* ==========================================================================
   Évad fülek + epizódlista (Jikan epizódokból)
   ========================================================================== */
function renderSeasons() {
  const tabs = document.getElementById("seasonTabs");
  const list = document.getElementById("episodeList");
  if (!tabs || !list) return;

  const eps = animeState.episodes;
  if (!eps.length) {
    tabs.innerHTML = "";
    list.innerHTML = '<p style="font-size:13.5px;color:var(--text-muted);padding:8px 2px">Ehhez az animéhez nem érhető el epizódlista.</p>';
    return;
  }

  const per = animeState.epsPerSeason;
  const seasonCount = Math.ceil(eps.length / per);

  tabs.innerHTML = Array.from({ length: seasonCount }, (_, i) =>
    `<button class="season-tab${i === animeState.activeSeason ? " active" : ""}" data-season="${i}">${i + 1}. rész</button>`
  ).join("");

  const start = animeState.activeSeason * per;
  const slice = eps.slice(start, start + per);

  list.innerHTML = slice.map((ep) => {
    const dur = ep.duration ? `${Math.round(ep.duration / 60)}:00` : "23:55";
    return `
    <a class="episode-item${ep.mal_id === 1 ? " watching" : ""}" href="watch.html?id=${animeState.id}&ep=${ep.mal_id}">
      <div class="episode-thumb">
        <img src="assets/img/thumb-ep454.svg" alt="${ep.mal_id}. epizód">
        <span class="play"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
      </div>
      <div class="episode-info">
        <div class="num">${ep.mal_id}. epizód</div>
        <h4>${ep.title || ep.title_romanji || "Epizód"}${ep.filler ? ' <span class="badge-now">Filler</span>' : ""}</h4>
      </div>
      <span class="duration">${dur}</span>
    </a>`;
  }).join("");
}

function initSeasonTabs() {
  const tabs = document.getElementById("seasonTabs");
  tabs?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-season]");
    if (!btn) return;
    animeState.activeSeason = Number(btn.dataset.season);
    renderSeasons();
  });
}

/* ==========================================================================
   Kedvencekhez gomb (animénként mentve)
   ========================================================================== */
function initFavButton(id, title) {
  const btn = document.getElementById("favBtn");
  if (!btn) return;
  const KEY = `animehub-fav-${id}`;
  const label = btn.querySelector("span");

  function apply(saved) {
    label.textContent = saved ? "Kedvencekben ✓" : "Kedvencekhez";
    btn.style.borderColor = saved ? "var(--primary)" : "";
    btn.style.color = saved ? "var(--primary-light)" : "";
  }
  apply(localStorage.getItem(KEY) === "1");

  btn.onclick = () => {
    const saved = localStorage.getItem(KEY) === "1";
    localStorage.setItem(KEY, saved ? "0" : "1");
    apply(!saved);
  };
}

/* ----- Megosztás gombok ----- */
function initShare() {
  document.querySelectorAll("[data-share]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = location.href;
      const title = animeState.title;
      const targets = {
        discord: "https://discord.com/",
        reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
        x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      };
      const t = btn.dataset.share;
      if (t === "copy") {
        navigator.clipboard?.writeText(url);
        btn.style.color = "var(--success)";
        setTimeout(() => (btn.style.color = ""), 1200);
      } else if (targets[t]) {
        window.open(targets[t], "_blank", "noopener");
      }
    });
  });
}

/* ==========================================================================
   Betöltés a Jikan-ból
   ========================================================================== */
async function loadAnime() {
  const params = new URLSearchParams(location.search);
  let id = params.get("id");
  const q = params.get("q");

  // Cím alapján keresés -> első találat id-ja
  if (!id && q) {
    try {
      const hits = await Jikan.search(q, 1);
      if (hits[0]) id = hits[0].id;
    } catch (e) { /* marad a demó */ }
  }

  // Nincs paraméter: alap a Naruto Shippuden (MAL 1735)
  if (!id) id = 1735;

  try {
    const full = await Jikan.full(id);
    if (!full) throw new Error("üres válasz");
    fillAnime(mapAnime(full));
    fillRelated(full.relations);

    // Epizódok + statisztika párhuzamosan (sorba állítva a modulban)
    Jikan.episodes(id).then((eps) => {
      animeState.episodes = eps || [];
      if (!animeState.episodes.length) renderDemoEpisodes();
      else renderSeasons();
    }).catch(renderDemoEpisodes);

    Jikan.statistics(id).then(fillScoreBars).catch(() => {});
  } catch (e) {
    console.warn("Anime adatlap betöltés sikertelen, demó tartalom marad:", e.message);
    renderDemoEpisodes();
  }
}

/* ----- Demó epizódlista (offline / API-hiba esetén) ----- */
function renderDemoEpisodes() {
  animeState.episodes = (DATA.episodes || []).map((e) => ({
    mal_id: e.num, title: e.title, duration: 1435,
  }));
  animeState.epsPerSeason = 50;
  renderSeasons();
}

/* ----- Kis DOM segédek ----- */
function setText(id, v) { const el = document.getElementById(id); if (el) el.textContent = v; }
function setHTML(id, v) { const el = document.getElementById(id); if (el) el.innerHTML = v; }
function setImg(id, src, alt) {
  const el = document.getElementById(id);
  if (!el) return;
  el.src = src;
  if (alt) el.alt = alt;
  if (typeof watchImage === "function") watchImage(el);
}

/* ----- Indítás ----- */
document.addEventListener("DOMContentLoaded", () => {
  initSeasonTabs();
  initShare();
  loadAnime();
});
