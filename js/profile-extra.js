/* ==========================================================================
   AnimeHub – profile-extra.js
   A profil "Áttekintés" fülének bővítése: XP/szint, jelvények, aktivitási
   heatmap, kedvenc műfajok, legnézettebb animék, aktivitás-idővonal, extra
   statisztikák. MOCK adatból (js/mock.js), a meglévő profil-logikát nem érinti.
   ========================================================================== */
(function () {
  if (!window.MOCK || !MOCK.profile) return;
  const P = MOCK.profile;
  const AB = (p) => p || "";

  const heatmapHTML = () => {
    const cells = P.heatmap.map((v) => `<span class="hm-cell${v ? " l" + v : ""}"></span>`).join("");
    return `
      <div class="heatmap-wrap"><div class="heatmap">${cells}</div></div>
      <div class="hm-legend">Kevesebb <span class="hm-cell"></span><span class="hm-cell l1"></span><span class="hm-cell l2"></span><span class="hm-cell l3"></span><span class="hm-cell l4"></span> Több</div>`;
  };

  const tlIcon = { e: "▶", r: "★", v: "👑", a: "🏅" };

  function build() {
    const host = document.getElementById("panelOverview");
    if (!host) return;
    const wrap = document.createElement("div");
    wrap.id = "profileExtra";
    wrap.innerHTML = `
      <!-- XP / szint -->
      <section class="px-section" data-reveal>
        <h3><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Szint &amp; XP</h3>
        <div class="xp-card">
          <div class="xp-top">
            <div class="xp-badge">${P.level}</div>
            <div class="t"><h4>Szint ${P.level} · ${P.title}</h4><p>Következő szint: ${P.level + 1}</p></div>
            <div class="amt">${P.xp.toLocaleString("hu-HU")} / ${P.xpNext.toLocaleString("hu-HU")} XP</div>
          </div>
          <div class="xp-bar"><span style="width:${Math.round((P.xp / P.xpNext) * 100)}%"></span></div>
          <div class="xp-next">Jutalom a következő szinten: <b>${P.nextReward}</b></div>
        </div>
      </section>

      <!-- Jelvények -->
      <section class="px-section" data-reveal>
        <h3><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg> Jelvények <a class="link-more" href="achievements.html" style="margin-left:auto;font-size:13px">Összes</a></h3>
        <div class="badge-grid">
          ${P.badges.map((b) => `<div class="badge-item${b.unlocked ? "" : " locked"}"><span class="ic">${b.icon}</span><span>${b.name}</span></div>`).join("")}
        </div>
      </section>

      <!-- Heatmap -->
      <section class="px-section" data-reveal>
        <h3><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg> Aktivitási hőtérkép <span style="margin-left:auto;font-size:12.5px;color:var(--text-muted)">az elmúlt 1 év</span></h3>
        <div class="px-card">${heatmapHTML()}</div>
      </section>

      <div class="px-2col">
        <!-- Kedvenc műfajok -->
        <section class="px-section" data-reveal style="margin-top:0">
          <div class="px-card">
            <h4>🎭 Kedvenc műfajok</h4>
            <div class="genre-bars">
              ${P.genres.map((g) => `<div class="genre-bar"><div class="top"><span>${g.name}</span><b>${g.pct}%</b></div><div class="track"><span style="width:${g.pct}%"></span></div></div>`).join("")}
            </div>
          </div>
        </section>

        <!-- Legnézettebb -->
        <section class="px-section" data-reveal style="margin-top:0">
          <div class="px-card">
            <h4>🏆 Legnézettebb animék</h4>
            ${P.topWatched.map((t, i) => `<div class="tw-row"><span class="n">${i + 1}</span><img src="${AB(t.image)}" alt=""><span class="t">${t.title}</span><span class="h">${t.hours} óra</span></div>`).join("")}
          </div>
        </section>
      </div>

      <!-- Extra statisztikák -->
      <section class="px-section" data-reveal>
        <h3><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> Kiegészítő statisztikák</h3>
        <div class="px-stats">
          ${P.extraStats.map((s) => `<div class="px-stat"><div class="v">${s.v}</div><div class="l">${s.l}</div></div>`).join("")}
        </div>
      </section>

      <!-- Aktivitás idővonal -->
      <section class="px-section" data-reveal>
        <h3><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Aktivitási idővonal</h3>
        <div class="px-card"><div class="p-timeline">
          ${P.timeline.map((t) => `<div class="pt-item"><div class="tx">${tlIcon[t.type] || "•"} ${t.text}</div><div class="w">${t.when}</div></div>`).join("")}
        </div></div>
      </section>`;
    host.appendChild(wrap);
    if (window.FX) FX.initReveal(host);
  }

  document.addEventListener("DOMContentLoaded", build);
})();
