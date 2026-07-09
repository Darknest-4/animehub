/* ==========================================================================
   AnimeHub – effects.js
   Újrahasznosítható prémium effekt-réteg (minden oldalon betöltve).
   - FX: oldalátmenet, ripple, reveal-on-scroll, dropdown, modal, toast
   - Skeleton: skeleton loading generátorok (nem spinner)
   Minden opt-in (osztály / data-attribútum), így nem töri a meglévő UI-t.
   A háttéradatok külön (js/mock.js) – ez a réteg csak a felület/animáció.
   ========================================================================== */

const FX = {
  /* ---- Oldalbetöltési átmenet + kilépő fade belső linkeknél ---- */
  initPageTransition() {
    document.body.classList.add("fx-page");
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || a.target === "_blank" || a.hasAttribute("download")) return;
      if (/^(#|mailto:|tel:|javascript:)/.test(href) || /^https?:\/\//.test(href)) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      document.body.classList.add("fx-leaving");
      setTimeout(() => (window.location.href = href), 200);
    });
    window.addEventListener("pageshow", (e) => { if (e.persisted) document.body.classList.remove("fx-leaving"); });
  },

  /* ---- Ripple gombokon ---- */
  initRipple() {
    const sel = ".btn, .btn-primary, .btn-secondary, .watch-btn, .admin-btn, [data-ripple]";
    document.addEventListener("pointerdown", (e) => {
      const el = e.target.closest(sel);
      if (!el) return;
      el.classList.add("fx-ripple");
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const span = document.createElement("span");
      span.className = "ripple";
      span.style.width = span.style.height = size + "px";
      span.style.left = e.clientX - r.left - size / 2 + "px";
      span.style.top = e.clientY - r.top - size / 2 + "px";
      el.appendChild(span);
      setTimeout(() => span.remove(), 600);
    });
  },

  /* ---- Reveal on scroll ---- */
  initReveal(root = document) {
    const els = root.querySelectorAll("[data-reveal]:not(.revealed)");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("revealed")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const d = en.target.dataset.revealDelay;
          if (d) en.target.style.transitionDelay = d + "ms";
          en.target.classList.add("revealed");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
  },

  /* ---- Modal ---- */
  modal(contentHTML, opts = {}) {
    const overlay = document.createElement("div");
    overlay.className = "fx-modal-overlay";
    overlay.innerHTML = `<div class="fx-modal" role="dialog" aria-modal="true">${contentHTML}</div>`;
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => overlay.classList.add("open"));
    const close = () => {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
      setTimeout(() => overlay.remove(), 280);
      opts.onClose && opts.onClose();
    };
    overlay.addEventListener("click", (e) => { if (e.target === overlay || e.target.closest("[data-close]")) close(); });
    document.addEventListener("keydown", function esc(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); } });
    return { close, el: overlay };
  },

  /* ---- Toast ---- */
  toast(msg, tone = "ok") {
    let host = document.getElementById("fxToasts");
    if (!host) {
      host = document.createElement("div");
      host.id = "fxToasts";
      host.style.cssText = "position:fixed;z-index:600;right:18px;bottom:18px;display:flex;flex-direction:column;gap:10px;max-width:320px";
      document.body.appendChild(host);
    }
    const t = document.createElement("div");
    const color = tone === "err" ? "var(--danger,#EF4444)" : tone === "warn" ? "var(--warning,#F59E0B)" : "var(--primary-light,#A855F7)";
    t.className = "fx-slide-up";
    t.style.cssText = `display:flex;align-items:center;gap:10px;padding:13px 16px;font-size:13.5px;font-weight:600;color:var(--text,#fff);background:var(--bg-card,#181824);border:1px solid var(--border,#2a2a3a);border-left:3px solid ${color};border-radius:12px;box-shadow:0 12px 34px rgba(0,0,0,.45)`;
    t.textContent = msg;
    host.appendChild(t);
    setTimeout(() => { t.style.transition = "opacity .3s, transform .3s"; t.style.opacity = "0"; t.style.transform = "translateX(20px)"; setTimeout(() => t.remove(), 300); }, 2600);
  },
};

/* ==========================================================================
   Skeleton loading generátorok
   ========================================================================== */
const Skeleton = {
  posterCard() {
    return `<div class="sk-card"><div class="skeleton sk-poster"></div><div class="skeleton sk-line lg"></div><div class="skeleton sk-line sm"></div></div>`;
  },
  grid(el, count = 10) {
    if (!el) return;
    el.classList.add("sk-grid");
    el.innerHTML = Array.from({ length: count }, () => this.posterCard()).join("");
  },
  listRow() {
    return `<div class="sk-row"><div class="skeleton sk-avatar"></div><div class="sk-lines"><div class="skeleton sk-line lg"></div><div class="skeleton sk-line sm"></div></div></div>`;
  },
  list(el, count = 6) {
    if (!el) return;
    el.innerHTML = `<div style="display:flex;flex-direction:column;gap:12px">${Array.from({ length: count }, () => this.listRow()).join("")}</div>`;
  },
  banner(el) { if (el) el.innerHTML = `<div class="skeleton sk-banner"></div>`; },
  lines(el, count = 3) { if (el) el.innerHTML = Array.from({ length: count }, (_, i) => `<div class="skeleton sk-line ${i === count - 1 ? "sm" : ""}"></div>`).join(""); },
  /* Segéd: skeletonos betöltés szimulációja mock adathoz */
  run(el, renderFn, { type = "grid", count = 10, delay = 550 } = {}) {
    if (!el) return;
    this[type] ? this[type](el, count) : this.grid(el, count);
    setTimeout(() => { el.classList.remove("sk-grid"); renderFn(el); FX.initReveal(el); }, delay);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  FX.initPageTransition();
  FX.initRipple();
  FX.initReveal();
});

if (typeof window !== "undefined") { window.FX = FX; window.Skeleton = Skeleton; }
