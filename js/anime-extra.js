/* ==========================================================================
   AnimeHub – anime-extra.js
   Az anime adatlap BŐVÍTETT szekciói (karakterek, franchise, galéria,
   trailer, OP/ED, ajánlott, stúdió, statisztika, production).
   MOCK adatból (js/mock.js), skeleton loadinggal. Független a Jikan
   betöltéstől, hogy ne törje a meglévő adatlap-logikát.
   ========================================================================== */
(function () {
  if (!window.MOCK || !MOCK.animeDetail) return;
  const D = MOCK.animeDetail;
  const $ = (id) => document.getElementById(id);

  function fillCharacters(el) {
    el.innerHTML = D.characters.map((c, i) => `
      <div class="char-card card-fx" data-reveal data-reveal-delay="${(i % 3) * 50}">
        <a class="side" href="character.html"><img src="${c.image}" alt=""><div><div class="nm">${c.name}</div><div class="rl">${c.role}</div></div></a>
        <a class="side va" href="va.html"><div><div class="nm">${c.va}</div><div class="rl">Szinkron</div></div><img src="${c.vaImg}" alt=""></a>
      </div>`).join("");
  }

  function fillFranchise(el) {
    el.innerHTML = D.franchise.map((f) => `
      <a class="fr-node${f.current ? " cur" : ""}" href="franchise.html" data-reveal="scale">
        <div class="pic"><img src="${f.image}" alt="">${f.current ? '<span class="now">Most</span>' : ""}</div>
        <h4>${f.title}</h4><p>${f.type} · ${f.year}</p>
      </a>`).join("");
  }

  function fillScreenshots(el) {
    el.innerHTML = D.screenshots.map((s, i) => `
      <div class="shot" data-reveal data-shot="${i}"><img src="${s}" alt="Képkocka"></div>`).join("");
    el.addEventListener("click", (e) => {
      const shot = e.target.closest(".shot"); if (!shot) return;
      const src = D.screenshots[+shot.dataset.shot];
      FX.modal(`<div style="padding:0"><img src="${src}" style="width:100%;display:block;border-radius:16px" alt=""></div>`);
    });
  }

  function fillTrailer(el) {
    el.innerHTML = `
      <div class="trailer-box" data-reveal>
        <img src="${D.trailer.thumb}" alt="">
        <div class="ov"><div class="play-big"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div></div>
      </div>`;
    el.querySelector(".trailer-box").addEventListener("click", () => {
      FX.modal(`
        <div style="padding:22px">
          <div style="aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#000;display:grid;place-items:center;color:var(--text-muted);position:relative">
            <img src="${D.trailer.thumb}" style="width:100%;height:100%;object-fit:cover;opacity:.5" alt="">
            <div style="position:absolute;text-align:center">
              <div style="width:60px;height:60px;margin:0 auto 10px;display:grid;place-items:center;color:#fff;background:var(--gradient-primary);border-radius:50%"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
              <p style="font-size:13px">${D.trailer.title}</p>
              <p style="font-size:11.5px;color:var(--text-muted);margin-top:4px">Demó – valódi videó a backend integrációkor</p>
            </div>
          </div>
          <button class="btn-secondary" data-close style="width:100%;margin-top:16px">Bezárás</button>
        </div>`);
    });
  }

  function fillThemes(el) {
    el.innerHTML = D.themes.map((t) => `
      <div class="theme-row" data-reveal>
        <span class="kind">${t.kind}${t.n}</span>
        <div class="info"><h4>${t.title}</h4><p>${t.artist} · ${t.eps}. rész</p></div>
        <button class="play" aria-label="Lejátszás"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button>
      </div>`).join("");
  }

  function fillRecommendations(el) {
    el.innerHTML = D.recommendations.map((r, i) => `
      <a class="rec-card img-zoom" href="anime.html?q=${encodeURIComponent(r.title)}" data-reveal data-reveal-delay="${(i % 6) * 40}">
        <div class="pic"><img src="${r.image}" alt=""><span class="sc">★ ${r.score}</span></div>
        <h4>${r.title}</h4>
      </a>`).join("");
  }

  function fillStudio() {
    const s = D.studio;
    $("axStudio").innerHTML = `
      <a class="top" href="studio.html" style="color:inherit">
        <div class="logo">${s.name.slice(0, 2).toUpperCase()}</div>
        <div><h4>${s.name}</h4><div class="sub">Alapítva: ${s.founded} · ${s.country}</div></div>
      </a>
      <p class="desc">${s.desc}</p>
      <div class="studio-stats">
        <div><b>${s.works}</b> produkció</div>
        <div><b>${s.founded}</b> óta</div>
      </div>`;
  }

  function fillStats() {
    $("axStats").innerHTML = D.stats.map((s) => `<div class="astat"><div class="v">${s.value}</div><div class="l">${s.label}</div></div>`).join("");
  }

  function fillProduction() {
    $("axProduction").innerHTML = D.production.map(([k, v]) => `<div class="r"><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Skeleton + mock betöltés a nagyobb blokkokra
    Skeleton.run($("axCharacters"), fillCharacters, { type: "list", count: 4, delay: 500 });
    Skeleton.run($("axScreenshots"), fillScreenshots, { type: "grid", count: 6, delay: 560 });
    Skeleton.run($("axRecommendations"), fillRecommendations, { type: "grid", count: 6, delay: 600 });
    // Kisebb blokkok azonnal (majd reveal)
    fillFranchise($("axFranchise"));
    fillTrailer($("axTrailer"));
    fillThemes($("axThemes"));
    fillStudio();
    fillStats();
    fillProduction();
    FX.initReveal();
  });
})();
