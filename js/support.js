/* ==========================================================================
   AnimeHub – support.js
   Támogatás: GYIK harmonika, kapcsolat űrlap, karakter számláló
   ========================================================================== */

/* ----- GYIK ----- */
function renderFaq() {
  const wrap = document.getElementById("faqList");
  if (!wrap) return;

  wrap.innerHTML = DATA.faq
    .map(
      (f) => `
      <div class="faq-item">
        <button class="faq-q">
          ${f.q}
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`
    )
    .join("");

  wrap.addEventListener("click", (e) => {
    const q = e.target.closest(".faq-q");
    if (!q) return;

    const item = q.parentElement;
    const answer = item.querySelector(".faq-a");
    const isOpen = item.classList.contains("open");

    /* Egyszerre csak egy legyen nyitva */
    wrap.querySelectorAll(".faq-item.open").forEach((o) => {
      o.classList.remove("open");
      o.querySelector(".faq-a").style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
}

/* ----- Kapcsolat űrlap ----- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const message = document.getElementById("msgField");
  const counter = document.getElementById("charCount");

  message.addEventListener("input", () => {
    if (message.value.length > 1000) message.value = message.value.slice(0, 1000);
    counter.textContent = `${message.value.length} / 1000`;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("emailField");
    const success = document.getElementById("formSuccess");

    if (!form.reportValidity()) return;

    /* Demó: nincs backend – csak visszajelzést adunk */
    success.classList.add("show");
    success.textContent = `Köszönjük! Üzeneted megérkezett – hamarosan válaszolunk a(z) ${email.value} címre. ✉️`;
    form.reset();
    counter.textContent = "0 / 1000";
    setTimeout(() => success.classList.remove("show"), 6000);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFaq();
  initContactForm();
});
