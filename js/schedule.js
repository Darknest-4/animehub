/* ==========================================================================
   AnimeHub – schedule.js
   Ütemező: heti rács, naptár, következő epizódok
   ========================================================================== */

/* ----- Heti rács ----- */
function renderWeek() {
  const table = document.getElementById("weekTable");
  if (!table) return;

  const head = `
    <div class="week-row week-head">
      <div>Idő</div>
      ${DATA.weekDays
        .map(
          (d) => `
          <div class="day${d.today ? " today" : ""}">
            ${d.name}
            <div class="d">${d.date}</div>
          </div>`
        )
        .join("")}
    </div>`;

  const rows = Object.entries(DATA.weekSchedule)
    .map(([time, events]) => {
      const cells = Array.from({ length: 7 }, (_, day) => {
        const ev = events.find((e) => e.day === day);
        if (!ev) return "<div></div>";
        return `
          <div>
            <button class="sched-event${ev.highlight ? " highlight" : ""}" data-bell>
              <img src="${ev.image}" alt="${ev.title}">
              <div class="t">
                <h5>${ev.title}</h5>
                <div class="ep">${ev.ep}</div>
                <div class="foot">
                  <span>${ev.time}</span>
                  <span class="bell">${ICONS.bell}</span>
                </div>
              </div>
            </button>
          </div>`;
      }).join("");

      return `<div class="week-row"><div class="time-cell">${time}</div>${cells}</div>`;
    })
    .join("");

  table.innerHTML = `<div class="week-inner">${head}${rows}</div>`;

  /* Harang: értesítés be/ki jelzés */
  table.addEventListener("click", (e) => {
    const ev = e.target.closest(".sched-event");
    if (ev) ev.classList.toggle("highlight");
  });
}

/* ----- Naptár ----- */
function renderCalendar() {
  const grid = document.getElementById("calGrid");
  if (!grid) return;

  const c = DATA.calendar;
  const dows = ["H", "K", "Sze", "Cs", "P", "Szo", "V"];
  let html = dows.map((d) => `<div class="dow">${d}</div>`).join("");

  /* Előző hónap napjai */
  c.prevMonthDays.forEach((d) => (html += `<div class="cal-day dim">${d}</div>`));

  /* Aktuális hónap */
  for (let d = 1; d <= c.daysInMonth; d++) {
    const cls = [
      "cal-day",
      d === c.today ? "today" : "",
      c.hasEpisode.includes(d) && d !== c.today ? "has-ep" : "",
    ].filter(Boolean).join(" ");
    html += `<div class="${cls}">${d}</div>`;
  }

  /* Következő hónap eleje (7-tel osztható rácsig) */
  const used = c.prevMonthDays.length + c.daysInMonth;
  const trailing = (7 - (used % 7)) % 7;
  for (let d = 1; d <= trailing; d++) html += `<div class="cal-day dim">${d}</div>`;

  grid.innerHTML = html;
}

/* ----- Következő epizódok ----- */
function renderUpcoming(items) {
  const list = document.getElementById("upcomingList");
  if (!list) return;

  const data = items || DATA.upcomingEpisodes;
  list.innerHTML = data
    .map((u) => {
      const link = u.id ? `anime.html?id=${u.id}` : "watch.html";
      return `
      <a class="next-ep-item" href="${link}">
        <img src="${u.image}" alt="${u.title}">
        <div class="info">
          <h4>${u.title}</h4>
          <p>${u.ep}</p>
        </div>
        <div class="when"><strong>${u.when}</strong>${u.time}</div>
      </a>`;
    })
    .join("");
}

/* ----- Élő menetrend a Jikan-ból (mai nap) ----- */
function loadLiveSchedule() {
  if (typeof Jikan === "undefined") return;
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = days[new Date().getDay()];

  Jikan.schedule(today).then((list) => {
    if (!list.length) return;
    const items = list.slice(0, 6).map((a) => ({
      id: a.id,
      title: a.title,
      ep: a.eps ? `${a.eps} epizód` : "Új epizód",
      when: "Ma",
      time: a.airing ? "Ma" : "",
      image: a.image,
    }));
    renderUpcoming(items);
  }).catch(() => {});
}

/* ----- Hét léptetés (dátumcímke frissítése) ----- */
function initWeekNav() {
  const weeks = [
    "2024. május 13. – május 19.",
    "2024. május 20. – május 26.",
    "2024. május 27. – június 2.",
  ];
  let index = 1;

  const label = document.getElementById("weekLabel");
  document.getElementById("weekPrev")?.addEventListener("click", () => {
    index = Math.max(0, index - 1);
    label.textContent = weeks[index];
  });
  document.getElementById("weekNext")?.addEventListener("click", () => {
    index = Math.min(weeks.length - 1, index + 1);
    label.textContent = weeks[index];
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderWeek();
  renderCalendar();
  renderUpcoming();
  loadLiveSchedule();
  initWeekNav();
});
