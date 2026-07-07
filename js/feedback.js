/* ==========================================================================
   AnimeHub – feedback.js
   Visszajelzés: lista szavazással, szűrés, rendezés, új visszajelzés küldése
   ========================================================================== */

const fbState = {
  items: DATA.feedback.map((f) => ({ ...f, myVote: 0 })),
  filter: "Összes visszajelzés",
  sort: "Legújabb",     // Legújabb | Legnépszerűbb
  composerType: null,   // "Ötlet" | "Hiba" | "Vélemény"
};

const FB_TABS = ["Összes visszajelzés", "Ötletek", "Hibajelentések", "Vélemények"];
const FB_TYPE_OF_TAB = { "Ötletek": "Ötlet", "Hibajelentések": "Hiba", "Vélemények": "Vélemény" };

const STATUS_CLASS = {
  "Megvalósítás alatt": "s-progress",
  "Javítva": "s-fixed",
  "Megoldva": "s-done",
  "Tervezve": "s-planned",
  "Nyitott": "s-open",
};

const TAG_CLASS = { "Ötlet": "otlet", "Hiba": "hiba", "Vélemény": "velemeny" };

/* ----- Lista ----- */
function filteredFeedback() {
  let items = fbState.items.slice();

  const type = FB_TYPE_OF_TAB[fbState.filter];
  if (type) items = items.filter((f) => f.type === type);

  if (fbState.sort === "Legnépszerűbb") items.sort((a, b) => b.votes - a.votes);
  return items;
}

function renderFeedback() {
  const list = document.getElementById("fbList");
  if (!list) return;

  list.innerHTML = filteredFeedback()
    .map((f) => {
      const i = fbState.items.indexOf(f);
      return `
      <article class="fb-item" data-index="${i}">
        <div class="fb-vote">
          <button data-vote="1" class="${f.myVote === 1 ? "sel-up" : ""}" aria-label="Fel">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 8h-5v8h-6v-8H4z"/></svg>
          </button>
          <span class="num">${f.votes}</span>
          <button data-vote="-1" class="${f.myVote === -1 ? "sel-down" : ""}" aria-label="Le">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20l-8-8h5V4h6v8h5z"/></svg>
          </button>
        </div>
        <div class="fb-content">
          <div class="top">
            <span class="fb-tag ${TAG_CLASS[f.type]}">${f.type}</span>
            <h3>${f.title}</h3>
            <span class="fb-status ${STATUS_CLASS[f.status] || "s-open"}">${f.status}</span>
            <span class="dots">⋮</span>
          </div>
          <p class="body">${f.body}</p>
          <div class="foot">
            <span class="stat">${ICONS.comment} ${f.comments}</span>
            <span class="stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              ${f.likes}
            </span>
            <span class="who"><strong>${f.author}</strong>${f.when}</span>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

function renderFbTabs() {
  document.getElementById("fbTabs").innerHTML = FB_TABS
    .map(
      (t) => `<button class="fb-tab${t === fbState.filter ? " active" : ""}" data-tab="${t}">${t}</button>`
    )
    .join("");
}

/* ----- Jobb oszlop ----- */
function renderFbStats() {
  document.getElementById("fbStats").innerHTML = DATA.feedbackStats
    .map((s) => `<div class="stat-line">${s.label} <strong>${s.value}</strong></div>`)
    .join("");
}

function renderFbTags() {
  document.getElementById("fbTags").innerHTML = DATA.feedbackTags
    .map((t) => `<span class="tag-chip">${t.name} <span class="c">${t.count}</span></span>`)
    .join("");
}

/* ----- Új visszajelzés ----- */
function openComposer(type) {
  fbState.composerType = type;
  const composer = document.getElementById("fbComposer");
  composer.classList.add("open");
  document.getElementById("composerType").textContent = type;
  document.getElementById("fbTitle").focus();
  composer.scrollIntoView({ behavior: "smooth", block: "center" });
}

function submitFeedback() {
  const title = document.getElementById("fbTitle").value.trim();
  const body = document.getElementById("fbBody").value.trim();
  if (!title) { document.getElementById("fbTitle").focus(); return; }

  fbState.items.unshift({
    type: fbState.composerType || "Ötlet",
    title,
    body: body || "—",
    votes: 1, comments: 0, likes: 0,
    author: "Akatsuki", when: "most", status: "Nyitott", myVote: 1,
  });

  document.getElementById("fbTitle").value = "";
  document.getElementById("fbBody").value = "";
  document.getElementById("fbComposer").classList.remove("open");
  fbState.filter = "Összes visszajelzés";
  fbState.sort = "Legújabb";
  renderFbTabs();
  renderFeedback();
}

/* ----- Vezérlők ----- */
function initFeedback() {
  renderFbTabs();
  renderFeedback();
  renderFbStats();
  renderFbTags();

  /* Szavazás (fel/le, visszavonható) */
  document.getElementById("fbList").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-vote]");
    if (!btn) return;
    const item = fbState.items[Number(btn.closest(".fb-item").dataset.index)];
    const dir = Number(btn.dataset.vote);

    item.votes -= item.myVote;              // előző szavazat visszavonása
    item.myVote = item.myVote === dir ? 0 : dir;
    item.votes += item.myVote;
    renderFeedback();
  });

  /* Fülek */
  document.getElementById("fbTabs").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tab]");
    if (!btn) return;
    fbState.filter = btn.dataset.tab;
    renderFbTabs();
    renderFeedback();
  });

  /* Rendezés váltó */
  const sortBtn = document.getElementById("fbSort");
  sortBtn.addEventListener("click", () => {
    fbState.sort = fbState.sort === "Legújabb" ? "Legnépszerűbb" : "Legújabb";
    sortBtn.querySelector("span").textContent = fbState.sort;
    renderFeedback();
  });

  /* Új visszajelzés gombok (fenti kártyák + jobb oszlop) */
  document.querySelectorAll("[data-compose]").forEach((btn) =>
    btn.addEventListener("click", () => openComposer(btn.dataset.compose))
  );

  document.getElementById("fbSubmit").addEventListener("click", submitFeedback);
  document.getElementById("fbCancel").addEventListener("click", () =>
    document.getElementById("fbComposer").classList.remove("open")
  );
}

document.addEventListener("DOMContentLoaded", initFeedback);
