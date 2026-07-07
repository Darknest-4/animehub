/* ==========================================================================
   AnimeHub – community.js
   Közösség: bejegyzések, szavazás, közzététel, szűrők, jobb oszlop
   ========================================================================== */

const commState = {
  posts: DATA.communityPosts.map((p) => ({ ...p, voted: false })),
  filter: "Népszerű",
};

/* ----- Bejegyzések ----- */
function postHTML(p, index) {
  const pileAvatars = ["avatar-sakura", "avatar-kakashi", "avatar-gaara"]
    .map((a) => `<img src="assets/img/${a}.svg" alt="">`)
    .join("");

  return `
    <article class="post-card" data-index="${index}">
      <div class="post-head">
        <img src="${p.avatar}" alt="${p.author}">
        <div>
          <div class="a">${p.author}</div>
        </div>
        <span class="when">· ${p.when}</span>
        <span class="post-cat">${p.category}</span>
        <span class="dots">⋮</span>
      </div>
      <div class="post-body">
        <div class="post-text">
          <h3>${p.title}</h3>
          <p>${p.body}</p>
        </div>
        ${p.image ? `<img class="post-img" src="${p.image}" alt="">` : ""}
      </div>
      <div class="post-foot">
        <button class="vote-btn${p.voted ? " voted" : ""}" data-vote>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l8 8h-5v8h-6v-8H4z"/></svg>
          ${p.votes}
        </button>
        <button class="comment-btn">${ICONS.comment} ${p.comments}</button>
        <div class="facepile">${pileAvatars}<span class="plus">+${p.followers}</span></div>
      </div>
    </article>`;
}

function renderPosts() {
  const feed = document.getElementById("postFeed");
  if (!feed) return;

  let posts = commState.posts.slice();
  if (commState.filter === "Népszerű") posts.sort((a, b) => b.votes - a.votes);
  // "Friss": eredeti sorrend (legújabb elöl), "Követett": legtöbb követő
  if (commState.filter === "Követett") posts.sort((a, b) => b.followers - a.followers);

  feed.innerHTML = posts.map((p) => postHTML(p, commState.posts.indexOf(p))).join("");
}

/* ----- Jobb oszlop ----- */
function renderTopics() {
  document.getElementById("topicList").innerHTML = DATA.popularTopics
    .map(
      (t, i) => `
      <a class="topic-item" href="#">
        <span class="n">${i + 1}</span>
        <img src="${t.image}" alt="${t.title}">
        <div class="info">
          <span class="tag-mini">${t.tag}</span>
          <h4>${t.title}</h4>
          <p>${t.comments} hozzászólás</p>
        </div>
      </a>`
    )
    .join("");
}

function renderOnline() {
  const avatars = [
    "avatar-itachi", "avatar-sakura", "avatar-kakashi", "avatar-shikamaru",
    "avatar-hinata", "avatar-gaara", "avatar-neji", "avatar-kiba",
  ];
  document.getElementById("onlineRow").innerHTML =
    avatars.map((a) => `<span class="u"><img src="assets/img/${a}.svg" alt=""></span>`).join("") +
    '<span class="more">+1248</span>';
}

function renderRecommended() {
  document.getElementById("recList").innerHTML = DATA.recommendedCommunities
    .map(
      (c) => `
      <div class="rec-item">
        <a class="badge-logo" href="${c.link}">${c.name.slice(0, 2).toUpperCase()}</a>
        <a class="info" href="${c.link}">
          <h4>${c.name}</h4>
          <p>${c.members}</p>
        </a>
        <button class="join-btn">Csatlakozás</button>
      </div>`
    )
    .join("");
}

/* ----- Vezérlők ----- */
function initCommunity() {
  renderPosts();
  renderTopics();
  renderOnline();
  renderRecommended();

  /* Szavazás */
  document.getElementById("postFeed").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-vote]");
    if (!btn) return;
    const post = commState.posts[Number(btn.closest(".post-card").dataset.index)];
    post.voted = !post.voted;
    post.votes += post.voted ? 1 : -1;
    renderPosts();
  });

  /* Szűrő chipek */
  document.getElementById("feedFilters").addEventListener("click", (e) => {
    const chip = e.target.closest("button[data-filter]");
    if (!chip) return;
    commState.filter = chip.dataset.filter;
    document.querySelectorAll("#feedFilters .feed-chip").forEach((c) =>
      c.classList.toggle("active", c === chip)
    );
    renderPosts();
  });

  /* Közzététel */
  const input = document.getElementById("composerInput");
  document.getElementById("composerSubmit").addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) { input.focus(); return; }

    commState.posts.unshift({
      author: "Akatsuki",
      avatar: "assets/img/avatar-akatsuki.svg",
      when: "most",
      category: "Bejegyzés",
      title: text,
      body: "",
      votes: 0, comments: 0, followers: 0, voted: false,
    });
    input.value = "";
    commState.filter = "Friss";
    document.querySelectorAll("#feedFilters .feed-chip").forEach((c) =>
      c.classList.toggle("active", c.dataset.filter === "Friss")
    );
    renderPosts();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("composerSubmit").click();
  });

  /* Csatlakozás gombok */
  document.getElementById("recList").addEventListener("click", (e) => {
    const btn = e.target.closest(".join-btn");
    if (!btn) return;
    const joined = btn.classList.toggle("joined");
    btn.textContent = joined ? "Tag vagy ✓" : "Csatlakozás";
  });
}

document.addEventListener("DOMContentLoaded", initCommunity);
