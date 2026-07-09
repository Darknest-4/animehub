/* ==========================================================================
   AnimeHub – library.js
   Szezonális, Top Manga, Előzmények, Letöltések, Üzenetek oldalak.
   MOCK adatból, skeleton loadinggal. Backendre cserélhető.
   ========================================================================== */
(function () {
  const $ = (id) => document.getElementById(id);

  /* Szezonális */
  function initSeasonal() {
    const grid = $("seasonalGrid");
    Skeleton.run(grid, (el) => {
      el.className = "top-grid";
      el.innerHTML = MOCK.seasonal.items.map((a, i) => `
        <a class="top-card card-fx img-zoom" href="anime.html?q=${encodeURIComponent(a.title)}" data-reveal data-reveal-delay="${(i % 6) * 45}">
          <div class="poster">
            <img src="${a.image}" alt="">
            ${a.newEp ? `<span class="newep">${a.newEp} új rész</span>` : ""}
            <span class="score">★ ${a.score.toFixed(2)}</span>
            <div class="grad"></div>
            <div class="meta"><h3>${a.title}</h3><div class="row"><span class="season-badge">${a.day}</span><span>${a.eps} ep</span></div></div>
          </div>
        </a>`).join("");
    }, { type: "grid", count: 10, delay: 480 });
    $("seasonSeg")?.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      document.querySelectorAll("#seasonSeg button").forEach((x) => x.classList.remove("active"));
      b.classList.add("active"); FX.toast(b.textContent + " szezon betöltve");
    });
  }

  /* Top Manga */
  function initTopManga() {
    const grid = $("topMangaGrid");
    Skeleton.run(grid, (el) => {
      el.className = "manga-grid";
      const list = [...MOCK.manga].sort((a, b) => b.score - a.score);
      el.innerHTML = list.map((m, i) => `
        <a class="manga-card card-fx img-zoom" href="manga.html?id=${m.id}" data-reveal data-reveal-delay="${(i % 6) * 45}">
          <div class="cov"><img src="${m.cover}" alt=""><span class="sc">★ ${m.score}</span><span class="st">#${i + 1}</span></div>
          <div class="b"><h3>${m.title}</h3><div class="au">${m.author}</div><div class="ch">${m.chapters} fejezet</div></div>
        </a>`).join("");
    }, { type: "grid", count: 8, delay: 460 });
  }

  /* Előzmények */
  function initHistory() {
    const box = $("historyList");
    Skeleton.run(box, (el) => {
      el.className = "row-list";
      el.innerHTML = MOCK.history.map((h) => `
        <div class="media-row" data-reveal>
          <img src="${h.image}" alt="">
          <div class="m"><h4>${h.title}</h4><p>${h.ep} · ${h.when}</p><div class="prog"><span style="width:${h.progress}%"></span></div></div>
          <div class="side"><div class="w">${h.progress}%</div><span class="badge ${h.progress === 100 ? "ok" : "dl"}">${h.progress === 100 ? "Befejezve" : "Folytatás"}</span></div>
          <a class="act" href="watch.html" aria-label="Lejátszás"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></a>
        </div>`).join("");
    }, { type: "list", count: 5, delay: 460 });
    $("clearHistory")?.addEventListener("click", () => { box.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px">Az előzmények törölve. 🗑</p>'; FX.toast("Előzmények törölve"); });
  }

  /* Letöltések */
  function initDownloads() {
    const box = $("downloadsList");
    const st = { kész: "ok", letöltés: "dl", várakozik: "wait" };
    const lbl = { kész: "Kész", letöltés: "Letöltés…", várakozik: "Várakozik" };
    Skeleton.run(box, (el) => {
      el.className = "row-list";
      el.innerHTML = MOCK.downloads.map((d) => `
        <div class="media-row" data-reveal>
          <img src="${d.image}" alt="">
          <div class="m"><h4>${d.title}</h4><p>${d.ep} · ${d.quality} · ${d.size}</p>${d.status !== "kész" ? `<div class="prog"><span style="width:${d.progress}%"></span></div>` : ""}</div>
          <div class="side"><span class="badge ${st[d.status]}">${lbl[d.status]}</span></div>
          <a class="act" href="${d.status === "kész" ? "watch.html" : "#"}" aria-label="Művelet">${d.status === "kész" ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>' : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>'}</a>
        </div>`).join("");
    }, { type: "list", count: 4, delay: 460 });
  }

  /* Üzenetek */
  function initMessages() {
    const M = MOCK.messages;
    $("convList").innerHTML = M.conversations.map((c, i) => `
      <div class="conv${i === 0 ? " active" : ""}" data-id="${c.id}">
        <div class="av"><img src="${c.avatar}" alt="">${c.online ? '<span class="on"></span>' : ""}</div>
        <div class="c"><h4>${c.user}<span class="w">${c.when}</span></h4><p>${c.last}</p></div>
        ${c.unread ? `<span class="unread">${c.unread}</span>` : ""}
      </div>`).join("");

    const renderThread = (conv) => {
      $("threadHead").innerHTML = `<img src="${conv.avatar}" alt=""><div><h4>${conv.user}</h4><p>${conv.online ? "Online" : "Offline"}</p></div>`;
      $("threadBody").innerHTML = M.thread.map((m) => `<div class="bubble ${m.me ? "me" : "them"}">${m.text}<span class="w">${m.when}</span></div>`).join("");
      $("threadBody").scrollTop = $("threadBody").scrollHeight;
    };
    renderThread(M.conversations[0]);

    $("convList").addEventListener("click", (e) => {
      const c = e.target.closest(".conv"); if (!c) return;
      document.querySelectorAll(".conv").forEach((x) => x.classList.remove("active"));
      c.classList.add("active"); c.querySelector(".unread")?.remove();
      renderThread(M.conversations.find((x) => x.id == c.dataset.id));
    });
    const send = () => {
      const v = $("msgInput").value.trim(); if (!v) return;
      const now = new Date().toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" });
      $("threadBody").insertAdjacentHTML("beforeend", `<div class="bubble me">${v}<span class="w">${now}</span></div>`);
      $("msgInput").value = ""; $("threadBody").scrollTop = $("threadBody").scrollHeight;
    };
    $("msgSend")?.addEventListener("click", send);
    $("msgInput")?.addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });
  }

  document.addEventListener("DOMContentLoaded", () => {
    ({ seasonal: initSeasonal, "top-manga": initTopManga, history: initHistory, downloads: initDownloads, messages: initMessages }[document.body.dataset.page] || (() => {}))();
  });
})();
