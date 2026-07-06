/* ==========================================================================
   AnimeHub – team.js
   Csapat oldal: tagkártyák renderelése, szűrés fülekkel, keresés, rendezés
   ========================================================================== */

const teamState = {
  filter: "all",   // all | admin | translator | editor | other
  query: "",
  sort: "name",    // name | contribs
  page: 1,
  pageSize: 8,
};

/* ----- Tagkártya HTML ----- */
function memberCardHTML(m) {
  return `
    <article class="member-card">
      <div class="avatar"><img src="${m.avatar}" alt="${m.name}"></div>
      <h3>${m.name} <span style="color:${roleColor(m.roleClass)}">${ICONS.shield}</span></h3>
      <span class="role-badge ${m.roleClass}">${m.role}</span>
      <p class="desc">${m.desc}</p>
      <div class="member-stats">
        <span class="member-stat">${ICONS.comment} <strong>${m.comments}</strong> Hozzászólás</span>
        <span class="member-stat">${ICONS.edit} <strong>${m.contribs}</strong> Közreműködés</span>
      </div>
    </article>`;
}

/** A szerepkör-osztályhoz tartozó szín (a pajzs ikonhoz) */
function roleColor(roleClass) {
  const colors = {
    "role-founder": "#c084fc",
    "role-cofounder": "#a78bfa",
    "role-admin": "#818cf8",
    "role-translator": "#34d399",
    "role-editor": "#fbbf24",
    "role-lector": "#38bdf8",
    "role-coder": "#fb923c",
    "role-moderator": "#f472b6",
  };
  return colors[roleClass] || "#a78bfa";
}

/* ----- Szűrés + rendezés + lapozás + renderelés ----- */
function filteredMembers() {
  let members = DATA.members.slice();

  if (teamState.filter !== "all") {
    members = members.filter((m) => m.group === teamState.filter);
  }

  if (teamState.query) {
    const q = teamState.query.toLowerCase();
    members = members.filter(
      (m) => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q)
    );
  }

  members.sort((a, b) =>
    teamState.sort === "contribs"
      ? b.contribs - a.contribs
      : a.name.localeCompare(b.name, "hu")
  );

  return members;
}

function renderMembers() {
  const grid = document.getElementById("membersGrid");
  if (!grid) return;

  const members = filteredMembers();
  const pages = Math.max(1, Math.ceil(members.length / teamState.pageSize));
  teamState.page = Math.min(teamState.page, pages);

  const start = (teamState.page - 1) * teamState.pageSize;
  const pageItems = members.slice(start, start + teamState.pageSize);

  grid.innerHTML = pageItems.length
    ? pageItems.map(memberCardHTML).join("")
    : '<div class="empty-state">Nincs találat a keresésre. 🔍</div>';

  renderPagination(pages);
}

function renderPagination(pages) {
  const wrap = document.getElementById("pagination");
  if (!wrap) return;

  if (pages <= 1) { wrap.innerHTML = ""; return; }

  const prevDisabled = teamState.page === 1 ? " disabled" : "";
  const nextDisabled = teamState.page === pages ? " disabled" : "";

  wrap.innerHTML = `
    <button class="page-btn" data-nav="-1" aria-label="Előző oldal"${prevDisabled}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    ${Array.from({ length: pages }, (_, i) =>
      `<button class="page-btn${i + 1 === teamState.page ? " active" : ""}" data-page="${i + 1}">${i + 1}</button>`
    ).join("")}
    <button class="page-btn" data-nav="1" aria-label="Következő oldal"${nextDisabled}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>`;
}

/* ----- Vezérlők bekötése ----- */
function initTeamControls() {
  // Szűrő fülek (az .active állapotot a main.js kezeli)
  document.getElementById("teamTabs")?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    teamState.filter = btn.dataset.filter;
    teamState.page = 1;
    renderMembers();
  });

  // Keresés
  document.getElementById("teamSearch")?.addEventListener("input", (e) => {
    teamState.query = e.target.value.trim();
    teamState.page = 1;
    renderMembers();
  });

  // Rendezés váltása (név <-> közreműködés)
  const sortBtn = document.getElementById("teamSort");
  sortBtn?.addEventListener("click", () => {
    teamState.sort = teamState.sort === "name" ? "contribs" : "name";
    sortBtn.querySelector("span").textContent =
      teamState.sort === "name" ? "Rendezés: Név szerint" : "Rendezés: Közreműködés";
    renderMembers();
  });

  // Lapozó
  document.getElementById("pagination")?.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn || btn.disabled) return;

    if (btn.dataset.page) teamState.page = Number(btn.dataset.page);
    else if (btn.dataset.nav) teamState.page += Number(btn.dataset.nav);

    renderMembers();
    document.getElementById("membersGrid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* ----- Indítás ----- */
document.addEventListener("DOMContentLoaded", () => {
  renderMembers();
  initTeamControls();
});
