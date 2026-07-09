/* ==========================================================================
   AnimeHub – watch-extra.js
   A lejátszó bővített funkciói (mock/frontend): skip intro/ending, következő
   epizód visszaszámláló, ambient/theatre/mini/PiP, képernyőkép + GIF, felirat-
   és hangbeállítás, gyorsbillentyűk, jegyzetek, könyvjelzők, Watch Party.
   Nem módosítja a meglévő watch.js lejátszót – csak új UI-t köt rá.
   ========================================================================== */
(function () {
  const $ = (id) => document.getElementById(id);
  const player = document.querySelector(".player");
  const video = $("video");
  const W = (window.MOCK && MOCK.watch) || {};

  const nowTs = () => {
    const t = video && video.currentTime ? video.currentTime : 875; // fallback 14:35
    const m = Math.floor(t / 60), s = Math.floor(t % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  /* ---- Skip Intro / Ending + countdown ---- */
  $("skipIntro")?.addEventListener("click", () => {
    if (video && video.duration) video.currentTime = Math.min(video.duration, (video.currentTime || 0) + 85);
    FX.toast("Intro átugorva ⏩");
    $("skipOverlay").innerHTML = `<button class="skip-btn" id="skipEnding">Ending átugrása <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4l10 8-10 8V4zm12 0h2v16h-2z"/></svg></button>`;
    $("skipEnding")?.addEventListener("click", () => { showCountdown(); $("skipOverlay").innerHTML = ""; });
  });

  let cdTimer = null;
  function showCountdown() {
    const box = $("nextCountdown"); if (!box) return;
    box.classList.add("show");
    let n = 10; $("cdSecs").textContent = n;
    cdTimer = setInterval(() => {
      n--; $("cdSecs").textContent = n;
      if (n <= 0) { clearInterval(cdTimer); box.classList.remove("show"); FX.toast("Következő epizód indul…"); }
    }, 1000);
  }
  $("cdCancel")?.addEventListener("click", () => { clearInterval(cdTimer); $("nextCountdown").classList.remove("show"); });
  $("cdPlay")?.addEventListener("click", () => { clearInterval(cdTimer); FX.toast("Következő epizód indul…"); $("nextCountdown").classList.remove("show"); });

  /* ---- Action bar ---- */
  const acts = {
    theatre(btn) { document.querySelector(".watch-main").classList.toggle("theatre"); btn.classList.toggle("on"); },
    ambient(btn) { player?.classList.toggle("ambient"); btn.classList.toggle("on"); },
    mini(btn) { toggleMini(btn); },
    pip(btn) {
      if (video && video.requestPictureInPicture && document.pictureInPictureEnabled) {
        (document.pictureInPictureElement ? document.exitPictureInPicture() : video.requestPictureInPicture().catch(() => FX.toast("PiP nem elérhető (nincs videó)", "warn")));
      } else FX.toast("Kép a képben: demó módban nem elérhető", "warn");
    },
    screenshot() {
      FX.modal(`<div class="set-modal"><h2>Képernyőkép</h2>
        <div style="border-radius:12px;overflow:hidden;border:1px solid var(--border)"><img src="assets/img/backdrop-sasuke.svg" style="width:100%;display:block" alt=""></div>
        <p style="font-size:12px;color:var(--text-muted);margin:12px 0">Rögzítve: ${nowTs()} · Naruto Shippuden 456. epizód</p>
        <div style="display:flex;gap:10px"><button class="btn-secondary" data-close style="flex:1">Bezárás</button><button class="btn-primary" data-close style="flex:1">Letöltés</button></div></div>`);
    },
    gif() {
      FX.modal(`<div class="set-modal"><h2>GIF készítő</h2>
        <div style="border-radius:12px;overflow:hidden;border:1px solid var(--border)"><img src="assets/img/backdrop-naruto.svg" style="width:100%;display:block" alt=""></div>
        <div class="set-field" style="margin-top:14px"><label>Hossz</label><div class="opts"><button>2 mp</button><button class="active">4 mp</button><button>6 mp</button></div></div>
        <div class="set-field"><label>Kezdés innen: ${nowTs()}</label></div>
        <div style="display:flex;gap:10px"><button class="btn-secondary" data-close style="flex:1">Mégse</button><button class="btn-primary" data-close style="flex:1">GIF létrehozása</button></div></div>`);
    },
    subtitle() { subtitleModal(); },
    audio() { audioModal(); },
    shortcuts() { shortcutsModal(); },
    party() { $('.wt-tab[data-tab="party"]')?.click?.(); switchTool("party"); document.querySelector(".watch-tools")?.scrollIntoView({ behavior: "smooth", block: "center" }); },
  };
  $("watchActions")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".wa-btn"); if (!btn) return;
    (acts[btn.dataset.act] || (() => {}))(btn);
  });

  /* ---- Mini player ---- */
  let mini;
  function toggleMini(btn) {
    if (mini) { mini.remove(); mini = null; btn.classList.remove("on"); return; }
    mini = document.createElement("div");
    mini.className = "mini-player show";
    mini.innerHTML = `
      <img src="assets/img/backdrop-sasuke.svg" alt="">
      <div class="mp-bar"><span class="t">Naruto Shippuden – 456.</span><button aria-label="Bezárás" id="miniClose">✕</button></div>
      <div class="mp-play"><span><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></div>`;
    document.body.appendChild(mini);
    btn.classList.add("on");
    $("miniClose").addEventListener("click", () => { mini.remove(); mini = null; btn.classList.remove("on"); });
  }

  /* ---- Modalok ---- */
  function subtitleModal() {
    const m = FX.modal(`<div class="set-modal"><h2>Felirat beállítások</h2>
      <div class="set-field"><label>Nyelv</label><div class="opts" data-grp="lang">${(W.subtitleTracks || ["Magyar"]).map((s, i) => `<button class="${i === 0 ? "active" : ""}">${s}</button>`).join("")}</div></div>
      <div class="set-field"><label>Méret</label><div class="opts" data-grp="size"><button>Kicsi</button><button class="active">Közepes</button><button>Nagy</button></div></div>
      <div class="set-field"><label>Szín</label><div class="opts" data-grp="color"><button class="active">Fehér</button><button>Sárga</button><button>Lila</button></div></div>
      <div class="set-field"><label>Háttér</label><div class="opts" data-grp="bg"><button>Nincs</button><button class="active">Áttetsző</button><button>Sötét</button></div></div>
      <div class="set-field"><label>Felirat késleltetés</label><div class="opts" data-grp="delay"><button>-0.5s</button><button class="active">0s</button><button>+0.5s</button></div></div>
      <div class="sub-preview"><span>Az igazi erő a szívben rejlik.</span></div>
      <button class="btn-primary" data-close style="width:100%;margin-top:16px">Mentés</button></div>`);
    m.el.querySelectorAll(".opts").forEach((g) => g.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      g.querySelectorAll("button").forEach((x) => x.classList.remove("active")); b.classList.add("active");
    }));
  }
  function audioModal() {
    const m = FX.modal(`<div class="set-modal"><h2>Hang &amp; nyelv</h2>
      <div class="set-field"><label>Hangsáv</label><div class="opts" data-grp="a">${(W.audioTracks || ["Japán"]).map((s, i) => `<button class="${i === 0 ? "active" : ""}">${s}</button>`).join("")}</div></div>
      <div class="set-field"><label>Minőség</label><div class="opts" data-grp="q">${(W.qualities || ["1080p"]).map((s, i) => `<button class="${i === 1 ? "active" : ""}">${s}</button>`).join("")}</div></div>
      <button class="btn-primary" data-close style="width:100%;margin-top:16px">Alkalmaz</button></div>`);
    m.el.querySelectorAll(".opts").forEach((g) => g.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      g.querySelectorAll("button").forEach((x) => x.classList.remove("active")); b.classList.add("active");
    }));
  }
  function shortcutsModal() {
    FX.modal(`<div class="set-modal"><h2>Gyorsbillentyűk</h2>
      <div class="sc-grid">${(W.shortcuts || []).map(([k, d]) => `<div class="k">${k}</div><div class="d">${d}</div>`).join("")}</div>
      <button class="btn-primary" data-close style="width:100%;margin-top:18px">Rendben</button></div>`);
  }

  /* ---- Watch tools tabs ---- */
  function switchTool(name) {
    document.querySelectorAll("#wtTabs .wt-tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
    document.querySelectorAll(".wt-panel").forEach((p) => (p.hidden = p.dataset.panel !== name));
  }
  $("wtTabs")?.addEventListener("click", (e) => { const t = e.target.closest(".wt-tab"); if (t) switchTool(t.dataset.tab); });

  /* ---- Jegyzetek ---- */
  const notes = [...(W.notes || [])];
  function renderNotes() {
    $("notesList").innerHTML = notes.map((n, i) => `
      <div class="tool-item"><span class="ts" data-seek="${n.t}">${n.t}</span><span class="tx">${n.text}</span><span class="del" data-del="${i}">✕</span></div>`).join("")
      || '<p style="color:var(--text-muted);font-size:13px">Még nincs jegyzet.</p>';
  }
  $("noteAdd")?.addEventListener("click", () => {
    const v = $("noteInput").value.trim(); if (!v) return;
    notes.unshift({ t: nowTs(), text: v }); $("noteInput").value = ""; renderNotes(); FX.toast("Jegyzet mentve");
  });

  /* ---- Könyvjelzők ---- */
  const bms = [...(W.bookmarks || [])];
  function renderBms() {
    $("bookmarksList").innerHTML = bms.map((b, i) => `
      <div class="tool-item"><span class="ts" data-seek="${b.t}">${b.t}</span><span class="tx">${b.label}</span><span class="del" data-del="${i}" data-bm>✕</span></div>`).join("")
      || '<p style="color:var(--text-muted);font-size:13px">Még nincs könyvjelző.</p>';
  }
  $("bmAdd")?.addEventListener("click", () => {
    const v = $("bmInput").value.trim() || "Könyvjelző";
    bms.unshift({ t: nowTs(), label: v }); $("bmInput").value = ""; renderBms(); FX.toast("Könyvjelző hozzáadva 🔖");
  });

  document.querySelector(".watch-tools")?.addEventListener("click", (e) => {
    const seek = e.target.closest("[data-seek]");
    if (seek && video && video.duration) {
      const [m, s] = seek.dataset.seek.split(":").map(Number);
      video.currentTime = m * 60 + s; FX.toast(`Ugrás: ${seek.dataset.seek}`);
    }
    const del = e.target.closest("[data-del]");
    if (del) {
      if (del.hasAttribute("data-bm")) { bms.splice(+del.dataset.del, 1); renderBms(); }
      else { notes.splice(+del.dataset.del, 1); renderNotes(); }
    }
  });

  /* ---- Watch Party ---- */
  function renderParty() {
    const p = W.party; if (!p) return;
    $("partyBox").innerHTML = `
      <div class="party-head">
        <div class="room"><div class="r">Szoba kód</div><div class="code">${p.room}</div></div>
        <div class="party-avatars">${p.participants.map((u) => `<img src="${u.avatar}" alt="${u.user}" title="${u.user}${u.host ? " (host)" : ""}">`).join("")}</div>
      </div>
      <div class="party-chat" id="partyChat">${p.chat.map((c) => `<div class="pc-msg"><span class="u">${c.user}:</span><span class="t">${c.text}</span><span class="w">${c.when}</span></div>`).join("")}</div>
      <div class="tool-add"><input type="text" id="partyMsg" placeholder="Írj az együttnézőknek…"><button class="btn-primary" id="partySend">Küldés</button></div>
      <div style="display:flex;gap:10px;margin-top:12px">
        <button class="btn-secondary" id="partyInvite" style="flex:1">Meghívó másolása</button>
        <button class="wa-btn" id="partyLeave" style="flex:1;justify-content:center">Kilépés</button>
      </div>`;
    $("partySend").addEventListener("click", () => {
      const v = $("partyMsg").value.trim(); if (!v) return;
      const now = new Date().toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" });
      $("partyChat").insertAdjacentHTML("beforeend", `<div class="pc-msg"><span class="u">Te:</span><span class="t">${v}</span><span class="w">${now}</span></div>`);
      $("partyMsg").value = ""; $("partyChat").scrollTop = $("partyChat").scrollHeight;
    });
    $("partyInvite").addEventListener("click", () => FX.toast("Meghívó link a vágólapra másolva"));
    $("partyLeave").addEventListener("click", () => FX.toast("Kiléptél a Watch Party-ból", "warn"));
  }

  document.addEventListener("DOMContentLoaded", () => { renderNotes(); renderBms(); renderParty(); });
})();
