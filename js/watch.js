/* ==========================================================================
   AnimeHub – watch.js
   Igazi videólejátszó: <video> elem + saját vezérlők, epizódváltás,
   minőség/sebesség menük, CC, teljes képernyő, kép a képben.

   A videó forrása: CONFIG.videoSrc (js/data.js) – cseréld saját fájlra.
   Ha a videó nem érhető el (pl. nincs net), a vezérlők akkor is működnek
   egy szimulált idővonalon, hogy az oldal ne törjön el.
   ========================================================================== */

/* ----- Állapot ----- */
const playerState = {
  epIndex: DATA.episodes.findIndex((e) => e.current),
  ccOn: true,
  bigFont: false,
  hasVideo: false,     // sikerült-e betölteni a valódi videót
  simTime: 0,          // szimulált idő, ha nincs videó
  simDuration: 23 * 60 + 55,
  simPlaying: false,
  simTimer: null,
};

/* ----- Elemek ----- */
const video = document.getElementById("video");
const playPauseBtn = document.getElementById("playPause");
const seekEl = document.getElementById("seek");
const seekFill = document.getElementById("seekFill");
const seekKnob = document.getElementById("seekKnob");
const timeCurrent = document.getElementById("timeCurrent");
const timeTotal = document.getElementById("timeTotal");
const subtitleEl = document.getElementById("subtitle");

const SVG_PLAY = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
const SVG_PAUSE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';

/* ----- Idő / állapot lekérdezés (videó vagy szimuláció) ----- */
const getTime = () => (playerState.hasVideo ? video.currentTime : playerState.simTime);
const getDuration = () => (playerState.hasVideo && video.duration ? video.duration : playerState.simDuration);
const isPlaying = () => (playerState.hasVideo ? !video.paused : playerState.simPlaying);

function seekTo(seconds) {
  const t = Math.min(getDuration(), Math.max(0, seconds));
  if (playerState.hasVideo) video.currentTime = t;
  else playerState.simTime = t;
  updateUI();
}

function togglePlay() {
  if (playerState.hasVideo) {
    video.paused ? video.play() : video.pause();
  } else {
    playerState.simPlaying = !playerState.simPlaying;
  }
  updateUI();
}

/* ----- UI frissítés ----- */
function updateUI() {
  const t = getTime();
  const d = getDuration();
  const pct = d ? (t / d) * 100 : 0;

  if (seekFill) seekFill.style.width = pct + "%";
  if (seekKnob) seekKnob.style.left = pct + "%";
  if (timeCurrent) timeCurrent.textContent = formatTime(t);
  if (timeTotal) timeTotal.textContent = formatTime(d);
  if (playPauseBtn) playPauseBtn.innerHTML = isPlaying() ? SVG_PAUSE : SVG_PLAY;

  updateSubtitle(t);
}

/* ----- Felirat (CC) ----- */
function updateSubtitle(t) {
  if (!subtitleEl) return;

  if (!playerState.ccOn) {
    subtitleEl.style.display = "none";
    return;
  }
  subtitleEl.style.display = "";

  // Az időhöz tartozó feliratsor (a sorok ciklikusan ismétlődnek)
  const subs = DATA.subtitles;
  const cycle = subs[subs.length - 1].end;
  const tc = t % cycle;
  const line = subs.find((s) => tc >= s.start && tc < s.end);
  subtitleEl.innerHTML = (line ? line.text : subs[0].text).replace(/\n/g, "<br>");
  subtitleEl.style.fontSize = playerState.bigFont ? "24px" : "";
}

/* ==========================================================================
   Videó betöltése
   ========================================================================== */
function initVideo() {
  if (!video) return;

  /* Források listája – régi (cache-elt) data.js esetén is működjön */
  const sources =
    (typeof CONFIG !== "undefined" && (CONFIG.videoSources || [CONFIG.videoSrc]).filter(Boolean)) || [];
  let srcIndex = 0;

  if (!sources.length) {
    video.style.display = "none";
    return;
  }

  video.src = sources[srcIndex];

  video.addEventListener("loadedmetadata", () => {
    playerState.hasVideo = true;
    video.style.display = "";
    clearInterval(playerState.simTimer);
    updateUI();
  });

  video.addEventListener("timeupdate", updateUI);
  video.addEventListener("play", updateUI);
  video.addEventListener("pause", updateUI);

  video.addEventListener("error", () => {
    // Következő forrás próbálása; ha egyik sem megy → szimulált mód + placeholder
    srcIndex += 1;
    if (srcIndex < sources.length) {
      console.warn("Videóforrás nem érhető el, próbálom a következőt:", sources[srcIndex]);
      video.src = sources[srcIndex];
      video.load();
      return;
    }
    playerState.hasVideo = false;
    video.style.display = "none";
    console.warn("Egyik videóforrás sem tölthető be, szimulált lejátszás fut.");
  });

  // Kattintás a videóra = lejátszás/szünet
  video.addEventListener("click", togglePlay);

  // Szimulált időzítő (amíg/ha nincs videó)
  playerState.simTimer = setInterval(() => {
    if (playerState.hasVideo || !playerState.simPlaying) return;
    playerState.simTime = Math.min(playerState.simTime + 1, playerState.simDuration);
    if (playerState.simTime >= playerState.simDuration) playerState.simPlaying = false;
    updateUI();
  }, 1000);
}

/* ==========================================================================
   Vezérlők
   ========================================================================== */
function initControls() {
  playPauseBtn?.addEventListener("click", togglePlay);

  /* Tekerés kattintással / húzással */
  function seekFromPointer(clientX) {
    const rect = seekEl.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    seekTo(ratio * getDuration());
  }

  seekEl?.addEventListener("pointerdown", (e) => {
    seekFromPointer(e.clientX);
    const move = (ev) => seekFromPointer(ev.clientX);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  });

  /* ±10 másodperc, előző epizód */
  document.getElementById("back10")?.addEventListener("click", () => seekTo(getTime() - 10));
  document.getElementById("fwd10")?.addEventListener("click", () => seekTo(getTime() + 10));
  document.getElementById("prevEp")?.addEventListener("click", () => switchEpisode(playerState.epIndex - 1));

  /* Hangerő */
  const volume = document.getElementById("volume");
  function applyVolume() {
    const pct = Number(volume.value);
    if (video) video.volume = pct / 100;
    volume.style.background = `linear-gradient(90deg, var(--purple-2) ${pct}%, rgba(255,255,255,0.22) ${pct}%)`;
  }
  volume?.addEventListener("input", applyVolume);
  if (volume) applyVolume();

  /* CC be/ki + betűméret */
  const ccBtn = document.getElementById("ccBtn");
  ccBtn?.addEventListener("click", () => {
    playerState.ccOn = !playerState.ccOn;
    ccBtn.classList.toggle("active", playerState.ccOn);
    updateUI();
  });
  ccBtn?.classList.toggle("active", playerState.ccOn);

  const fontBtn = document.getElementById("fontBtn");
  fontBtn?.addEventListener("click", () => {
    playerState.bigFont = !playerState.bigFont;
    fontBtn.classList.toggle("active", playerState.bigFont);
    updateUI();
  });

  /* Minőség menü (UI választó – egyetlen forrás fut alatta) */
  initPlayerMenu("qualityBtn", "qualityMenu", ["1080p", "720p", "480p", "360p"], "1080p", (v) => {
    document.getElementById("qualityLabel").textContent = v;
  });

  /* Sebesség menü – a videó lejátszási sebességét állítja */
  initPlayerMenu("speedBtn", "speedMenu", ["0.5x", "0.75x", "1x", "1.25x", "1.5x", "2x"], "1x", (v) => {
    document.getElementById("speedLabel").textContent = v;
    if (video) video.playbackRate = parseFloat(v);
  });

  /* Teljes képernyő */
  document.getElementById("fsBtn")?.addEventListener("click", () => {
    const player = document.querySelector(".player");
    if (document.fullscreenElement) document.exitFullscreen();
    else player?.requestFullscreen?.();
  });

  /* Kép a képben */
  document.getElementById("pipBtn")?.addEventListener("click", async () => {
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else if (playerState.hasVideo) await video.requestPictureInPicture();
    } catch (e) { /* nem támogatott – nem gond */ }
  });

  /* Billentyűk: szóköz = play/pause, nyilak = tekerés */
  document.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
    if (e.code === "Space") { e.preventDefault(); togglePlay(); }
    if (e.code === "ArrowLeft") seekTo(getTime() - 5);
    if (e.code === "ArrowRight") seekTo(getTime() + 5);
  });
}

/* Kis lenyíló menü a lejátszó pill gombjaihoz */
function initPlayerMenu(btnId, menuId, options, selected, onSelect) {
  const btn = document.getElementById(btnId);
  const menu = document.getElementById(menuId);
  if (!btn || !menu) return;

  menu.innerHTML = options
    .map((o) => `<button data-v="${o}"${o === selected ? ' class="sel"' : ""}>${o}</button>`)
    .join("");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".player-menu.open").forEach((m) => m !== menu && m.classList.remove("open"));
    menu.classList.toggle("open");
  });

  menu.addEventListener("click", (e) => {
    const opt = e.target.closest("button[data-v]");
    if (!opt) return;
    menu.querySelectorAll("button").forEach((b) => b.classList.remove("sel"));
    opt.classList.add("sel");
    menu.classList.remove("open");
    onSelect(opt.dataset.v);
  });

  document.addEventListener("click", () => menu.classList.remove("open"));
}

/* ==========================================================================
   Epizódlista + epizódváltás
   ========================================================================== */
function renderEpisodeList() {
  const list = document.getElementById("epList");
  if (!list) return;

  list.innerHTML = DATA.episodes
    .map(
      (ep, i) => `
      <button class="ep-item${i === playerState.epIndex ? " current" : ""}" data-index="${i}">
        <div class="thumb">
          <img src="${ep.image}" alt="${ep.num}. epizód">
          ${i === playerState.epIndex ? `<span class="playing">${ICONS.play}</span>` : ""}
        </div>
        <div class="info">
          <div class="num">${ep.num}. epizód</div>
          <div class="name">${ep.title}</div>
        </div>
        <span class="dots">⋮</span>
      </button>`
    )
    .join("");

  // Az aktuális epizód a lista közepére – csak a listát görgetjük
  const current = list.querySelector(".ep-item.current");
  if (current) {
    list.scrollTop = current.offsetTop - list.clientHeight / 2 + current.clientHeight / 2;
  }
}

function switchEpisode(index) {
  if (index < 0 || index >= DATA.episodes.length) return;
  playerState.epIndex = index;

  const ep = DATA.episodes[index];
  const next = DATA.episodes[index + 1];

  /* Címek frissítése */
  document.getElementById("playerEpTitle").textContent = `${ep.num}. epizód – ${ep.title}`;
  document.title = `Naruto Shippuden – ${ep.num}. epizód | KATSU`;

  /* Következő epizód sáv + kártya */
  const nextBar = document.querySelector(".ep-next-bar .label p");
  if (nextBar) nextBar.textContent = next ? `${next.num}. epizód` : "Nincs több epizód";
  const nextCard = document.querySelector(".next-episode .title");
  if (nextCard && next) nextCard.textContent = `${next.num}. epizód – ${next.title}`;

  /* Lista újrarenderelése + videó újraindítása */
  renderEpisodeList();
  seekTo(0);
  if (playerState.hasVideo) video.play();
  else playerState.simPlaying = true;
  updateUI();
}

function initEpisodeClicks() {
  document.getElementById("epList")?.addEventListener("click", (e) => {
    const item = e.target.closest(".ep-item[data-index]");
    if (item) switchEpisode(Number(item.dataset.index));
  });

  document.getElementById("nextEpBtn")?.addEventListener("click", () => {
    switchEpisode(playerState.epIndex + 1);
  });
}

/* ----- Indítás ----- */
document.addEventListener("DOMContentLoaded", () => {
  renderEpisodeList();
  initVideo();
  initControls();
  initEpisodeClicks();
  updateUI();
});
