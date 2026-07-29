// app.js
// Lê o data.js e monta as galerias, o carrossel do hero e a lightbox de fotos.
// Também cuida do menu mobile e das animações de entrada.
// Normalmente você não precisa editar este arquivo — só o data.js.

const galleryData = {
  retratos: siteData.retratos,
  casamentos: siteData.casamentos,
  paisagens: siteData.paisagens
};

const plusIcon = `<svg class="tile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderGallery(containerId, galleryKey, items, ratio, colorClass) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map((item, i) => {
    const inner = item.src
      ? `<img src="${item.src}" alt="${escapeHtml(item.alt || "")}" loading="lazy">`
      : `${plusIcon}<span class="tile-number">${String(i + 1).padStart(2, "0")}</span>`;
    return `
    <button type="button" class="photo-tile ${item.src ? "has-photo" : colorClass}" style="--ar:${ratio};" data-gallery="${galleryKey}" data-index="${i}" aria-label="Ver ${escapeHtml(item.alt || "foto")}">
      ${inner}
    </button>
  `;
  }).join("");
}

function renderAlbums(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map((a, i) => {
    const cover = a.cover ? `<img src="${a.cover}" alt="${escapeHtml(a.title)}" loading="lazy">` : "capa do álbum";
    const hasGallery = Array.isArray(a.photos) && a.photos.length > 0;
    if (hasGallery) galleryData[`album-${i}`] = a.photos;
    const coverEl = hasGallery
      ? `<button type="button" class="album-cover-btn" data-gallery="album-${i}" data-index="0" aria-label="Ver fotos de ${escapeHtml(a.title)}"><div class="album-cover">${cover}</div></button>`
      : `<div class="album-cover">${cover}</div>`;
    const linkEl = hasGallery
      ? `<button type="button" class="album-link" data-gallery="album-${i}" data-index="0">ver álbum →</button>`
      : `<a href="${a.link || "#"}" class="album-link">ver álbum →</a>`;
    return `<div class="album-card">${coverEl}<div class="album-body">
      <p class="album-title">${escapeHtml(a.title)}</p>
      <p class="album-desc">${escapeHtml(a.desc)}</p>
      ${linkEl}
    </div></div>`;
  }).join("");

  container.querySelectorAll("[data-gallery^='album-']").forEach((el) => {
    el.addEventListener("click", () => {
      openLightbox(el.dataset.gallery, Number(el.dataset.index), el);
    });
  });
}

function renderHeroCarousel(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container || !items.length) return;
  container.innerHTML = items.map((item) => {
    const media = item.src
      ? `<img src="${item.src}" alt="${escapeHtml(item.alt || "")}">`
      : `<div class="hero-ph">${escapeHtml(item.alt || "")}</div>`;
    return `<div class="hero-slide">${media}</div>`;
  }).join("");
}

function initHeroCarousel(items) {
  const track = document.getElementById("heroCarousel");
  const slides = track ? track.querySelectorAll(".hero-slide") : [];
  const counter = document.getElementById("heroCounter");
  const captionEl = document.getElementById("heroCaption");
  const progress = document.getElementById("heroProgress");
  const scrim = document.querySelector(".hero-scrim");
  const heroEl = document.querySelector(".hero");
  if (!slides.length) return;

  let current = 0;
  let timer;
  const duration = 6500;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function update() {
    if (counter) counter.textContent = `${String(current + 1).padStart(2, "0")} — ${String(slides.length).padStart(2, "0")}`;
    if (captionEl) captionEl.textContent = items[current].caption || "";
  }

  function show(index) {
    slides[current].classList.remove("active");
    current = index;
    slides[current].classList.add("active");
    update();
  }

  function next() { show((current + 1) % slides.length); }

  function startTimer() {
    clearTimeout(timer);
    if (progress) {
      progress.style.transition = "none";
      progress.style.width = "0%";
      requestAnimationFrame(() => {
        progress.style.transition = `width ${duration}ms linear`;
        progress.style.width = "100%";
      });
    }
    timer = setTimeout(() => { next(); startTimer(); }, duration);
  }

  update();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => { slides[0].classList.add("active"); });
  });

  if (slides.length > 1) {
    if (scrim) scrim.addEventListener("click", () => { next(); if (!reduced) startTimer(); });
    if (!reduced) {
      startTimer();
      if (heroEl) {
        heroEl.addEventListener("mouseenter", () => clearTimeout(timer));
        heroEl.addEventListener("mouseleave", startTimer);
      }
    }
  }
}

// Lightbox — abre a foto de verdade quando um bloco da grade é clicado
let lightboxState = { gallery: null, index: 0 };
let lastFocusedTile = null;

function renderLightboxContent() {
  const items = galleryData[lightboxState.gallery];
  const item = items[lightboxState.index];
  const mediaEl = document.getElementById("lightboxMedia");
  const captionEl = document.getElementById("lightboxCaption");
  mediaEl.innerHTML = item.src
    ? `<img src="${item.src}" alt="${escapeHtml(item.alt || "")}" loading="lazy">`
    : `<div class="lightbox-ph">${escapeHtml(item.alt || "")}</div>`;
  captionEl.textContent = item.caption || "";
}

function openLightbox(gallery, index, triggerEl) {
  lightboxState = { gallery, index };
  lastFocusedTile = triggerEl;
  renderLightboxContent();
  const lb = document.getElementById("lightbox");
  lb.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => { lb.classList.add("open"); });
  document.getElementById("lightboxClose").focus();
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  lb.classList.remove("open");
  document.body.style.overflow = "";
  const onEnd = () => {
    lb.setAttribute("hidden", "");
    lb.removeEventListener("transitionend", onEnd);
  };
  lb.addEventListener("transitionend", onEnd);
  if (lastFocusedTile) lastFocusedTile.focus();
}

function stepLightbox(delta) {
  const items = galleryData[lightboxState.gallery];
  lightboxState.index = (lightboxState.index + delta + items.length) % items.length;
  renderLightboxContent();
}

renderHeroCarousel("heroCarousel", siteData.destaques);
initHeroCarousel(siteData.destaques);

renderGallery("retratos-gallery", "retratos", siteData.retratos, "3/4", "tile-gold");
renderGallery("casamentos-gallery", "casamentos", siteData.casamentos, "4/3", "tile-rose");
renderGallery("paisagens-gallery", "paisagens", siteData.paisagens, "16/9", "tile-indigo");
renderAlbums("albuns-row", siteData.albuns);

document.querySelectorAll(".photo-tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    openLightbox(tile.dataset.gallery, Number(tile.dataset.index), tile);
  });
});

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click", () => stepLightbox(-1));
document.getElementById("lightboxNext").addEventListener("click", () => stepLightbox(1));
document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") closeLightbox();
});
document.addEventListener("keydown", (e) => {
  const lb = document.getElementById("lightbox");
  if (lb.hasAttribute("hidden")) return;
  if (e.key === "Escape") { closeLightbox(); return; }
  if (e.key === "ArrowLeft") { stepLightbox(-1); return; }
  if (e.key === "ArrowRight") { stepLightbox(1); return; }
  if (e.key === "Tab") {
    const focusables = lb.querySelectorAll("button");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealEls = document.querySelectorAll(".reveal");
revealEls.forEach((el) => el.classList.add("pre"));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("pre");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.remove("pre"));
}
