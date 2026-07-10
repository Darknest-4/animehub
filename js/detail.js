/* ==========================================================================
   AnimeHub – detail.js
   Karakter, Stúdió, Szinkronszínész, Franchise, AI Ajánlások, Watch Party.
   MOCK adatból (js/mock.js). Backendre cserélhető.
   ========================================================================== */
(function () {
  const $ = (id) => document.getElementById(id);
  const statRow = (arr) => arr.map(([v, l]) => `<div class="dp-stat"><div class="v">${v}</div><div class="l">${l}</div></div>`).join("");

  function initCharacter() {
    const c = MOCK.character;
    document.title = `${c.name} – Karakter | AnimeHub`;
    $("dpBanner").src = c.banner; $("dpAvatar").src = c.image;
    $("dpName").textContent = c.name; $("dpJp").textContent = c.jp;
    $("dpMeta").innerHTML = `${c.role} · <a href="anime.html?q=${encodeURIComponent(c.anime)}" style="color:var(--purple-2)">${c.anime}</a> · Hang: ${c.va}`;
    $("dpStats").innerHTML = statRow(c.stats);
    $("dpBio").textContent = c.bio;
    $("dpTraits").innerHTML = c.traits.map((t) => `<span>${t}</span>`).join("");
    $("dpVa").innerHTML = `<div class="role-card card-fx"><img src="${c.vaImg}" alt=""><div class="r"><h4>${c.va}</h4><p>Szinkronszínész</p></div><span class="tag main">Japán</span></div>`;
    $("dpAppearances").innerHTML = c.appearances.map((a) => `
      <a class="role-card card-fx" href="anime.html?q=${encodeURIComponent(a.title)}"><img src="${a.image}" alt=""><div class="r"><h4>${a.title}</h4><p>${a.role}</p></div></a>`).join("");
    $("dpGallery").innerHTML = c.gallery.map((g) => `<div class="shot" data-reveal><img src="${g}" alt=""></div>`).join("");
    FX.initReveal();
  }

  function initStudio() {
    const s = MOCK.studioPage;
    document.title = `${s.name} – Stúdió | AnimeHub`;
    $("stName").textContent = s.name; $("stJp").textContent = s.jp;
    $("stMeta").innerHTML = `Alapítva: ${s.founded} · ${s.country} · Elnök: ${s.president}`;
    $("stStats").innerHTML = statRow(s.stats);
    $("stDesc").textContent = s.desc;
    $("stTimeline").innerHTML = s.timeline.map((t) => `<div class="tl-item" data-reveal><div class="y">${t.year}</div><div class="e">${t.event}</div></div>`).join("");
    Skeleton.run($("stWorks"), (el) => {
      el.className = "rec-rail";
      el.innerHTML = s.works.map((w, i) => `
        <a class="rec-card img-zoom" href="anime.html?q=${encodeURIComponent(w.title)}" data-reveal data-reveal-delay="${(i % 6) * 40}">
          <div class="pic"><img src="${w.image}" alt=""><span class="sc">★ ${w.score}</span></div><h4>${w.title}</h4></a>`).join("");
    }, { type: "grid", count: 8, delay: 460 });
    FX.initReveal();
  }

  function initVa() {
    const v = MOCK.va;
    document.title = `${v.name} – Szinkronszínész | AnimeHub`;
    $("dpBanner").src = v.banner; $("dpAvatar").src = v.image;
    $("dpName").textContent = v.name; $("dpJp").textContent = v.jp;
    $("dpMeta").innerHTML = `Született: ${v.born} · ${v.from} · Ügynökség: ${v.agency}`;
    $("dpStats").innerHTML = statRow(v.stats);
    $("dpBio").textContent = v.bio;
    $("vaRoles").innerHTML = v.roles.map((r) => `
      <a class="role-card card-fx" href="anime.html?q=${encodeURIComponent(r.anime)}" data-reveal>
        <img src="${r.image}" alt=""><div class="r"><h4>${r.char}</h4><p>${r.anime}</p></div>
        <span class="tag ${r.main ? "main" : ""}">${r.main ? "Fő" : "Mellék"}</span></a>`).join("");
    FX.initReveal();
  }

  function initFranchise() {
    const f = MOCK.franchisePage;
    document.title = `${f.title} – Franchise | AnimeHub`;
    $("frBanner").src = f.banner;
    $("frTitle").textContent = f.title; $("frJp").textContent = f.jp;
    $("frDesc").textContent = f.desc;
    $("frStats").innerHTML = statRow(f.stats);
    $("frEntries").innerHTML = f.entries.map((e, i) => `
      <div class="fr-node${e.current ? " cur" : ""}" data-reveal="scale" data-reveal-delay="${i * 50}">
        <div class="pic"><img src="${e.image}" alt="">${e.current ? '<span class="now">Most</span>' : ""}</div>
        <h4>${e.title}</h4><p>${e.type} · ${e.year}${e.score ? " · ★ " + e.score : ""}</p></div>`).join("");
    FX.initReveal();
  }

  function initAiRecs() {
    const A = MOCK.aiRecs;
    $("aiBased").innerHTML = A.based.map((b) => `<span>${b}</span>`).join("");
    Skeleton.run($("aiList"), (el) => {
      el.className = "ai-list";
      el.innerHTML = A.items.map((r, i) => `
        <div class="ai-rec card-fx" data-reveal data-reveal-delay="${(i % 6) * 50}">
          <img src="${r.image}" alt="">
          <div class="c">
            <div class="top"><h3>${r.title}</h3><span class="sc">★ ${r.score}</span>
              <span class="match"><span class="ring"><span style="width:${r.match}%"></span></span>${r.match}% egyezés</span></div>
            <p class="why"><b>Miért ajánljuk:</b> ${r.reason}</p>
            <div class="acts"><a class="btn-primary sm" href="anime.html?q=${encodeURIComponent(r.title)}" style="height:36px;padding:0 16px;font-size:13px">Megnézem</a><button class="btn-secondary" style="height:36px;padding:0 14px;font-size:13px">Nem érdekel</button></div>
          </div>
        </div>`).join("");
    }, { type: "list", count: 5, delay: 600 });
    $("aiRefresh")?.addEventListener("click", () => { FX.toast("Új ajánlások generálása…"); initAiRecs(); });
  }

  function initWatchParty() {
    $("wpGrid").innerHTML = MOCK.parties.map((p, i) => `
      <div class="wp-card card-fx" data-reveal data-reveal-delay="${(i % 4) * 50}">
        <div class="top"><img src="${p.avatar}" alt=""><div><div class="h4">${p.host}</div><div class="r">Szoba: ${p.room}</div></div>
          <span class="live${p.live ? "" : " off"}">${p.live ? "ÉLŐ" : "Szünet"}</span></div>
        <div class="anime">${p.anime}</div>
        <div class="foot"><span class="watching">👥 ${p.watching} néző</span>
          <a class="btn-primary" href="watch.html" style="height:36px;padding:0 16px;font-size:13px">Csatlakozás</a></div>
      </div>`).join("");
    $("wpCreate")?.addEventListener("click", () => {
      FX.modal(`<div class="set-modal" style="padding:24px">
        <h2>Watch Party létrehozása</h2>
        <div class="field" style="margin-top:8px"><label style="display:block;font-size:12.5px;color:var(--text-soft);margin-bottom:7px">Anime</label><input type="text" value="Jujutsu Kaisen 2×18" style="width:100%;padding:11px 13px;color:var(--text);background:var(--bg-card-2);border:1px solid var(--border);border-radius:10px"></div>
        <div style="display:flex;gap:10px;margin-top:8px"><button class="btn-secondary" data-close style="flex:1">Mégse</button><button class="btn-primary" data-close style="flex:1">Létrehozás</button></div>
      </div>`);
    });
    FX.initReveal();
  }

  document.addEventListener("DOMContentLoaded", () => {
    ({ character: initCharacter, studio: initStudio, va: initVa, franchise: initFranchise, "ai-recs": initAiRecs, "watch-party": initWatchParty }[document.body.dataset.page] || (() => {}))();
  });
})();
