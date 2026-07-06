/* ==========================================================================
   AnimeHub – watch.js
   Videólejátszó: epizódlista renderelés + lejátszó vezérlők (szimulált)
   ========================================================================== */

/* ==========================================================================
   Epizódlista
   ========================================================================== */
function renderEpisodeList() {
  const list = document.getElementById("epList");
  if (!list) return;

  list.innerHTML = DATA.episodes
    .map(
      (ep) => `
      <a class="ep-item${ep.current ? " current" : ""}" href="watch.html">
        <div class="thumb">
          <img src="${ep.image}" alt="${ep.num}. epizód">
          ${ep.current ? `<span class="playing">${ICONS.play}</span>` : ""}
        </div>
        <div class="info">
          <div class="num">${ep.num}. epizód</div>
          <div class="name">${ep.title}</div>
        </div>
        <span class="dots">⋮</span>
      </a>`
    )
    .join("");

  // Az aktuális epizód látszódjon a lista közepén
  list.querySelector(".ep-item.current")?.scrollIntoView({ block: "center" });
}

/* ==========================================================================
   Lejátszó (szimulált lejátszás – videó forrás nélkül is működik)
   ========================================================================== */
const player = {
  duration: 23 * 60 + 55, // 23:55
  time: 14 * 60 + 35,     // 14:35-nél tartunk
  playing: true,
  timer: null,
};

const playPauseBtn = document.getElementById("playPause");
const seekEl = document.getElementById("seek");
const seekFill = document.getElementById("seekFill");
const seekKnob = document.getElementById("seekKnob");
const timeCurrent = document.getElementById("timeCurrent");
const timeTotal = document.getElementById("timeTotal");

const SVG_PLAY = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
const SVG_PAUSE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';

function updatePlayerUI() {
  const pct = (player.time / player.duration) * 100;
  if (seekFill) seekFill.style.width = pct + "%";
  if (seekKnob) seekKnob.style.left = pct + "%";
  if (timeCurrent) timeCurrent.textContent = formatTime(player.time);
  if (timeTotal) timeTotal.textContent = formatTime(player.duration);
  if (playPauseBtn) playPauseBtn.innerHTML = player.playing ? SVG_PAUSE : SVG_PLAY;
}

function startTicker() {
  clearInterval(player.timer);
  player.timer = setInterval(() => {
    if (!player.playing) return;
    player.time = Math.min(player.time + 1, player.duration);
    if (player.time >= player.duration) player.playing = false;
    updatePlayerUI();
  }, 1000);
}

function initPlayerControls() {
  if (!playPauseBtn) return;

  playPauseBtn.addEventListener("click", () => {
    player.playing = !player.playing;
    updatePlayerUI();
  });

  // Tekerés kattintással / húzással
  function seekTo(clientX) {
    const rect = seekEl.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    player.time = ratio * player.duration;
    updatePlayerUI();
  }

  seekEl?.addEventListener("pointerdown", (e) => {
    seekTo(e.clientX);
    const move = (ev) => seekTo(ev.clientX);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  });

  // -10 / +10 másodperc
  document.getElementById("back10")?.addEventListener("click", () => {
    player.time = Math.max(0, player.time - 10);
    updatePlayerUI();
  });
  document.getElementById("fwd10")?.addEventListener("click", () => {
    player.time = Math.min(player.duration, player.time + 10);
    updatePlayerUI();
  });

  // Hangerő csúszka színezése
  const volume = document.getElementById("volume");
  volume?.addEventListener("input", () => {
    const pct = volume.value;
    volume.style.background = `linear-gradient(90deg, var(--purple-2) ${pct}%, rgba(255,255,255,0.22) ${pct}%)`;
  });

  // Szóköz = lejátszás/szünet
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && document.activeElement.tagName !== "INPUT") {
      e.preventDefault();
      player.playing = !player.playing;
      updatePlayerUI();
    }
  });

  updatePlayerUI();
  startTicker();
}

/* ----- Indítás ----- */
document.addEventListener("DOMContentLoaded", () => {
  renderEpisodeList();
  initPlayerControls();
});
