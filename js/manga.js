/* ==========================================================================
   AnimeHub – manga.js
   Manga lista, adatlap és olvasó logikája. MOCK adatból (js/mock.js),
   skeleton loadinggal. Backendre cserélhető.
   ========================================================================== */
(function () {
  const $ = (id) => document.getElementById(id);
  const qs = new URLSearchParams(location.search);

  /* ----- Manga lista ----- */
  function initMangaList() {
    const grid = $("mangaGrid");
    let genre = "";
    const render = () => {
      const list = MOCK.manga.filter((m) => !genre || m.genres.includes(genre));
      Skeleton.run(grid, (el) => {
        el.className = "manga-grid";
        el.innerHTML = list.map((m, i) => `
          <a class="manga-card card-fx img-zoom" href="manga.html?id=${m.id}" data-reveal data-reveal-delay="${(i % 6) * 45}">
            <div class="cov"><img src="${m.cover}" alt=""><span class="sc">★ ${m.score}</span><span class="st">${m.status}</span></div>
            <div class="b"><h3>${m.title}</h3><div class="au">${m.author}</div><div class="ch">${m.chapters} fejezet</div></div>
          </a>`).join("");
      }, { type: "grid", count: 8, delay: 480 });
    };
    render();
    $("mangaGenres")?.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      document.querySelectorAll("#mangaGenres button").forEach((x) => x.classList.remove("active"));
      b.classList.add("active"); genre = b.dataset.genre || ""; render();
    });
  }

  /* ----- Manga adatlap ----- */
  function initMangaDetail() {
    const m = MOCK.manga.find((x) => x.id === qs.get("id")) || MOCK.manga[0];
    const D = MOCK.mangaDetail;
    document.title = `${m.title} – Manga | AnimeHub`;
    $("mdCover").src = m.cover;
    $("mdTitle").textContent = m.title;
    $("mdJp").textContent = m.jp;
    $("mdBy").textContent = "Írta: " + m.author + " · " + m.year;
    $("mdBadges").innerHTML = m.genres.map((g) => `<span class="g">${g}</span>`).join("");
    $("mdStats").innerHTML = [
      ["★ " + m.score, "Értékelés"], [m.chapters, "Fejezet"], [D.volumes, "Kötet"], [m.status, "Állapot"],
    ].map(([v, l]) => `<div class="s"><div class="v">${v}</div><div class="l">${l}</div></div>`).join("");
    $("mdSynopsis").textContent = D.synopsis;
    $("mdMeta").innerHTML = [
      ["Megjelenés", D.published], ["Magazin", D.serialization], ["Célközönség", D.demographic], ["Szerző", m.author],
    ].map(([k, v]) => `<div class="r"><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    $("readFirst").href = `reader.html?id=${m.id}&ch=1`;
    $("readCont").href = `reader.html?id=${m.id}&ch=370`;

    Skeleton.run($("chapterList"), (el) => {
      el.className = "chapter-list";
      el.innerHTML = D.chapters.map((c) => `
        <a class="chapter-row${c.read ? " read" : ""}" href="reader.html?id=${m.id}&ch=${c.n}" data-reveal>
          <span class="n">#${c.n}</span>
          <div class="info"><div>${c.title}</div><div class="d">${c.date}</div></div>
          ${c.read ? '<span class="read-tag">✓ Olvasva</span>' : ""}
          <span class="go"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
        </a>`).join("");
    }, { type: "list", count: 6, delay: 480 });

    $("mdCharacters").innerHTML = D.characters.map((c) => `
      <div class="char-card card-fx" data-reveal><div class="side"><img src="${c.image}" alt=""><div><div class="nm">${c.name}</div><div class="rl">${c.role}</div></div></div></div>`).join("");
    FX.initReveal();
  }

  /* ----- Manga olvasó ----- */
  function initReader() {
    const m = MOCK.manga.find((x) => x.id === qs.get("id")) || MOCK.manga[0];
    const ch = qs.get("ch") || "1";
    $("rdTitle").textContent = m.title;
    $("rdChapter").textContent = `${ch}. fejezet`;
    const stage = $("readerStage");
    const flow = $("readerFlow");
    flow.innerHTML = MOCK.readerPages.map((p) => `<div class="reader-page" data-reveal><img src="${p.img}" alt="${p.n}. oldal"></div>`).join("");
    FX.initReveal();

    $("rdMode")?.addEventListener("change", (e) => {
      stage.classList.toggle("mode-double", e.target.value === "double");
    });
    $("rdFit")?.addEventListener("change", (e) => {
      stage.style.maxWidth = e.target.value === "full" ? "100%" : e.target.value === "double" ? "1200px" : "820px";
    });
    const nav = (delta) => { const n = Math.max(1, (+ch) + delta); location.href = `reader.html?id=${m.id}&ch=${n}`; };
    $("rdPrev")?.addEventListener("click", () => nav(-1));
    $("rdNext")?.addEventListener("click", () => nav(1));
    $("rdPrevBig")?.addEventListener("click", () => nav(-1));
    $("rdNextBig")?.addEventListener("click", () => nav(1));
  }

  document.addEventListener("DOMContentLoaded", () => {
    ({ "manga-list": initMangaList, "manga-detail": initMangaDetail, reader: initReader }[document.body.dataset.page] || (() => {}))();
  });
})();
