/* ==========================================================================
   AnimeHub – discover.js
   Az új "Felfedezés" oldalak logikája (Top Anime, Ranglista, Eredmények,
   Értesítések, Premium). Minden adat a MOCK rétegből jön (js/mock.js),
   skeleton loadinggal töltődik – később könnyen backendre cserélhető.
   ========================================================================== */

const img = (p) => p || "";
const medal = (r) => (r === 1 ? "🥇" : r === 2 ? "🥈" : r === 3 ? "🥉" : "");

/* ----- Top Anime ----- */
function renderTopAnime(el, list) {
  el.className = "top-grid";
  el.innerHTML = list.map((a, i) => `
    <a class="top-card card-fx img-zoom" href="anime.html?q=${encodeURIComponent(a.title)}" data-reveal data-reveal-delay="${(i % 6) * 50}">
      <div class="poster">
        <img src="${img(a.image)}" alt="${a.title}">
        <span class="rankbadge${a.rank <= 3 ? " g" + a.rank : ""}">${a.rank}</span>
        <span class="score">★ ${a.score.toFixed(2)}</span>
        <div class="grad"></div>
        <div class="meta">
          <h3>${a.title}</h3>
          <div class="tags">${a.genres.slice(0, 2).map((g) => `<span>${g}</span>`).join("")}</div>
          <div class="row"><span>${a.type} · ${a.eps} ep</span><span>${a.members} tag</span></div>
        </div>
      </div>
    </a>`).join("");
}

function initTopAnime() {
  const grid = document.getElementById("topGrid");
  let sort = "score";
  const render = () => {
    let list = [...MOCK.topAnime];
    if (sort === "members") list.sort((a, b) => parseFloat(b.members) - parseFloat(a.members));
    else if (sort === "year") list.sort((a, b) => b.year - a.year);
    else list.sort((a, b) => a.rank - b.rank);
    Skeleton.run(grid, (e) => renderTopAnime(e, list), { type: "grid", count: 12, delay: 500 });
  };
  render();
  document.getElementById("topSeg")?.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    document.querySelectorAll("#topSeg button").forEach((x) => x.classList.remove("active"));
    b.classList.add("active"); sort = b.dataset.sort; render();
  });
}

/* ----- Ranglista ----- */
function initLeaderboard() {
  const box = document.getElementById("lbWrap");
  Skeleton.run(box, (el) => {
    const top3 = MOCK.leaderboard.slice(0, 3);
    const rest = MOCK.leaderboard.slice(3);
    const order = [top3[1], top3[0], top3[2]];
    const cls = ["second", "first", "third"];
    el.innerHTML = `
      <div class="podium">
        ${order.map((u, i) => u ? `
          <div class="p ${cls[i]}" data-reveal data-reveal-delay="${i * 70}">
            <div class="medal">${medal(u.rank)}</div>
            <img src="${img(u.avatar)}" alt="">
            <h4>${u.user}</h4>
            <div class="lvl">Szint ${u.level}</div>
            <div class="xp">${u.xp.toLocaleString("hu-HU")} XP</div>
          </div>` : "").join("")}
      </div>
      <div class="lb-list">
        ${rest.map((u) => `
          <div class="lb-row card-fx" data-reveal>
            <span class="rk">${u.rank}</span>
            <img src="${img(u.avatar)}" alt="">
            <div class="u"><h4>${u.user}${u.vip ? '<span class="vip">VIP</span>' : ""}</h4><p>Szint ${u.level} · ${u.watched.toLocaleString("hu-HU")} anime megnézve</p></div>
            <span class="xp">${u.xp.toLocaleString("hu-HU")} XP</span>
          </div>`).join("")}
        <div class="lb-row me" data-reveal>
          <span class="rk">142</span>
          <img src="assets/img/avatar-akatsuki.svg" alt="">
          <div class="u"><h4>Akatsuki (Te)</h4><p>Szint 23 · 127 anime megnézve</p></div>
          <span class="xp">7 850 XP</span>
        </div>
      </div>`;
  }, { type: "list", count: 6, delay: 520 });
}

/* ----- Eredmények ----- */
function initAchievements() {
  const grid = document.getElementById("achGrid");
  const list = MOCK.achievements;
  const unlocked = list.filter((a) => a.unlocked).length;
  const sum = document.getElementById("achSummary");
  if (sum) sum.innerHTML = [
    ["Megszerezve", `${unlocked}/${list.length}`],
    ["Teljesítés", `${Math.round((unlocked / list.length) * 100)}%`],
    ["Jelenlegi szint", "23"],
    ["Összes XP", "7 850"],
  ].map(([l, n], i) => `<div class="ach-stat" data-reveal data-reveal-delay="${i * 50}"><div class="n">${n}</div><div class="l">${l}</div></div>`).join("");

  Skeleton.run(grid, (el) => {
    el.className = "ach-grid";
    el.innerHTML = list.map((a, i) => `
      <div class="ach-card card-fx tier-${a.tier}${a.unlocked ? "" : " locked"}" data-reveal data-reveal-delay="${(i % 4) * 50}">
        <div class="ic">${a.icon}</div>
        <div class="body">
          <h4>${a.name} <span class="tier">${a.tier}</span></h4>
          <p>${a.desc}</p>
          <div class="bar"><span style="width:${a.progress}%"></span></div>
          <div class="pct">${a.unlocked ? "✓ Megszerezve" : a.progress + "% teljesítve"}</div>
        </div>
      </div>`).join("");
  }, { type: "grid", count: 8, delay: 520 });
}

/* ----- Értesítések ----- */
const NOTIF_ICONS = {
  episode: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><circle cx="12" cy="12" r="3.5"/></svg>',
  system: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  achievement: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/></svg>',
};

function renderNotifs(el, list) {
  el.className = "notif-list";
  el.innerHTML = list.map((n, i) => {
    const isImg = n.image && (n.type === "reply" || n.type === "like" || n.type === "friend");
    const icon = isImg ? `<img src="${n.image}" alt="">` : (n.image && n.type === "episode" ? `<img src="${n.image}" alt="">` : (NOTIF_ICONS[n.type] || NOTIF_ICONS.system));
    return `
    <div class="notif${n.unread ? " unread" : ""}" data-reveal data-reveal-delay="${(i % 8) * 40}" data-id="${n.id}">
      <div class="ic t-${n.type}">${icon}</div>
      <div class="body"><h4>${n.title}</h4><p>${n.text}</p></div>
      <span class="when">${n.when}</span>
      ${n.unread ? '<span class="dot"></span>' : ""}
    </div>`;
  }).join("");
}

function initNotifications() {
  const box = document.getElementById("notifList");
  let filter = "all";
  const render = () => {
    let list = MOCK.notifications.filter((n) => filter === "all" || (filter === "unread" ? n.unread : n.type === filter));
    Skeleton.run(box, (el) => renderNotifs(el, list), { type: "list", count: 6, delay: 480 });
    const c = document.getElementById("unreadCount");
    if (c) c.textContent = MOCK.notifications.filter((n) => n.unread).length;
  };
  render();
  document.getElementById("notifSeg")?.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    document.querySelectorAll("#notifSeg button").forEach((x) => x.classList.remove("active"));
    b.classList.add("active"); filter = b.dataset.filter; render();
  });
  document.getElementById("markAllRead")?.addEventListener("click", () => {
    MOCK.notifications.forEach((n) => (n.unread = false));
    render(); FX.toast("Minden értesítés olvasottnak jelölve");
  });
  box.addEventListener("click", (e) => {
    const row = e.target.closest(".notif"); if (!row) return;
    row.classList.remove("unread");
    row.querySelector(".dot")?.remove();
    const n = MOCK.notifications.find((x) => x.id == row.dataset.id); if (n) n.unread = false;
    const c = document.getElementById("unreadCount");
    if (c) c.textContent = MOCK.notifications.filter((x) => x.unread).length;
  });
}

/* ----- Premium ----- */
const FEAT_ICON = {
  ad: "🚫", hd: "🎬", dl: "⬇", early: "⏱", sim: "📺", badge: "🏅", party: "🎉", support: "💬",
};
function cell(v) {
  if (v === true) return '<span class="yes">✓</span>';
  if (v === false) return '<span class="no">✕</span>';
  return v;
}
function initPremium() {
  document.getElementById("planGrid").innerHTML = MOCK.premiumPlans.map((p, i) => `
    <div class="plan${p.featured ? " featured" : ""}" data-reveal data-reveal-delay="${i * 70}">
      ${p.featured ? '<span class="badge-pop">Legnépszerűbb</span>' : ""}
      <h3>${p.name}</h3>
      <div class="price">${p.price} <span class="per">${p.period}</span></div>
      ${p.save ? `<span class="save">${p.save}</span>` : ""}
      <div class="note">${p.note}</div>
      <button class="btn-primary" style="width:100%" data-plan="${p.id}">${p.cta}</button>
    </div>`).join("");

  document.getElementById("featTable").innerHTML =
    `<div class="fr head"><span>Funkció</span><span class="c">Ingyenes</span><span class="c prem">Premium</span></div>` +
    MOCK.premiumFeatures.map((f) => `
      <div class="fr" data-reveal><span>${FEAT_ICON[f.icon] || ""} ${f.label}</span><span class="c">${cell(f.free)}</span><span class="c prem">${cell(f.prem)}</span></div>`).join("");

  // A dinamikusan beszúrt data-reveal elemek megfigyelése (nem Skeleton.run-on át)
  FX.initReveal();

  document.getElementById("planGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-plan]"); if (!b) return;
    const plan = MOCK.premiumPlans.find((p) => p.id === b.dataset.plan);
    FX.modal(`
      <div style="padding:26px">
        <div style="width:52px;height:52px;display:grid;place-items:center;color:#fff;background:var(--gradient-primary);border-radius:15px;box-shadow:0 0 24px var(--purple-glow);margin-bottom:16px">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5z"/></svg>
        </div>
        <h2 style="font-size:22px;font-weight:800">${plan.name} csomag</h2>
        <p style="color:var(--text-soft);margin-top:8px;font-size:14px">${plan.price} ${plan.period} — ${plan.note}</p>
        <p style="color:var(--text-muted);margin-top:14px;font-size:12.5px">Ez egy demó felület. A tényleges fizetés a backend integrációjakor lesz elérhető.</p>
        <div style="display:flex;gap:10px;margin-top:22px">
          <button class="btn-secondary" data-close style="flex:1">Mégse</button>
          <button class="btn-primary" data-close style="flex:1">Folytatás</button>
        </div>
      </div>`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  ({
    "top-anime": initTopAnime,
    leaderboard: initLeaderboard,
    achievements: initAchievements,
    notifications: initNotifications,
    premium: initPremium,
  }[document.body.dataset.page] || (() => {}))();
});
