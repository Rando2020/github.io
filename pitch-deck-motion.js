/*!
 * Orivo Pitch Deck Motion
 * Deck-specific choreography for pitch-deck.html.
 * Static GitHub Pages compatible. No dependencies. No network requests.
 */
(() => {
  "use strict";

  const STYLE_ID = "orivo-pitch-motion-style-v1";
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const css = `
.shell {
  perspective: 1400px;
}

.sw {
  background:
    radial-gradient(circle at var(--opm-x, 72%) var(--opm-y, 28%), rgba(0,200,150,.055), transparent 24rem),
    linear-gradient(160deg, rgba(6,12,24,.72), rgba(4,8,16,.96));
}

.slide {
  transform: translateY(18px) scale(.985);
  filter: blur(5px);
  transition:
    opacity .52s ease,
    transform .72s cubic-bezier(.2,.8,.2,1),
    filter .52s ease;
}

.slide.on {
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.slide::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background:
    radial-gradient(circle at 76% 22%, rgba(0,200,150,.13), transparent 24rem),
    radial-gradient(circle at 12% 86%, rgba(124,111,205,.10), transparent 22rem);
  transition: opacity .8s ease;
}

.slide.on::before {
  opacity: 1;
}

.slide > * {
  position: relative;
  z-index: 1;
}

.opm-stage {
  opacity: 0;
  transform: translateY(18px);
}

.slide.on .opm-stage {
  animation: opm-rise .72s cubic-bezier(.2,.8,.2,1) forwards;
  animation-delay: var(--opm-delay, 0ms);
}

@keyframes opm-rise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dot {
  position: relative;
}

.dot.on {
  box-shadow: 0 0 18px rgba(0,200,150,.28);
}

.dot.on::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 999px;
  border: 1px solid rgba(0,200,150,.28);
  animation: opm-dot-pulse 1.55s ease-out infinite;
}

@keyframes opm-dot-pulse {
  from {
    opacity: .8;
    transform: scale(.72);
  }
  to {
    opacity: 0;
    transform: scale(1.55);
  }
}

.pbar {
  height: 3px;
}

.pfill {
  box-shadow: 0 0 18px rgba(0,200,150,.42);
}

.ring {
  will-change: transform;
}

.slide.on .ring {
  animation-duration: calc(var(--dur, 50s) * .82);
}

.sc,
.step,
.pc,
.rh,
.mc,
.comp-card,
.phone-col,
.bs,
.founder-card {
  will-change: transform, box-shadow;
}

.slide.on .sc:hover,
.slide.on .step:hover,
.slide.on .pc:hover,
.slide.on .rh:hover,
.slide.on .mc:hover,
.slide.on .comp-card:hover,
.slide.on .phone-col:hover,
.slide.on .bs:hover {
  transform: translateY(-6px) scale(1.012);
  box-shadow: 0 24px 70px rgba(0,0,0,.36), 0 0 42px rgba(0,200,150,.075);
}

.sn,
.mn,
.bs-n,
.rh-arv {
  text-shadow: 0 0 24px rgba(0,200,150,.16);
}

.phone {
  transform-origin: center bottom;
}

.slide.on .phone {
  animation: opm-phone-float 4.8s ease-in-out infinite;
}

@keyframes opm-phone-float {
  0%, 100% { transform: translateY(0) rotate(-.4deg); }
  50% { transform: translateY(-8px) rotate(.4deg); }
}

.cal-overlay.open .cal-box {
  animation: opm-modal-in .34s cubic-bezier(.2,.8,.2,1) both;
}

@keyframes opm-modal-in {
  from {
    opacity: 0;
    transform: translateY(16px) scale(.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.opm-hint {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 60;
  color: rgba(240,242,255,.48);
  border: 1px solid rgba(240,242,255,.10);
  background: rgba(5,10,20,.68);
  backdrop-filter: blur(12px);
  border-radius: 999px;
  padding: 7px 11px;
  font: 11px/1.2 var(--sans, system-ui, sans-serif);
  pointer-events: none;
  opacity: 0;
  animation: opm-hint 5.2s ease 1.2s forwards;
}

@keyframes opm-hint {
  0%, 100% { opacity: 0; transform: translateY(8px); }
  15%, 78% { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .slide,
  .slide.on,
  .opm-stage,
  .slide.on .opm-stage,
  .slide.on .phone,
  .dot.on::after,
  .opm-hint {
    animation: none !important;
    transition: none !important;
    transform: none !important;
    filter: none !important;
    opacity: 1 !important;
  }
}
`;

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function stageSlide(slide) {
    const selectors = [
      ".ey",
      ".h1",
      ".h2",
      ".h3",
      ".body",
      ".pillrow",
      ".btn",
      ".btn-o",
      ".stats .sc",
      ".steps .step",
      ".prod-grid .pc",
      ".compare .comp-card",
      ".rmap .rh",
      ".metrics .mc",
      ".phone",
      ".sdoh-result",
      ".founder-card",
      ".phone-col",
      ".big-stat-row .bs",
      ".foot"
    ];

    let index = 0;
    selectors.forEach((selector) => {
      qsa(selector, slide).forEach((element) => {
        if (element.dataset.opmStaged) return;
        element.dataset.opmStaged = "true";
        element.classList.add("opm-stage");
        element.style.setProperty("--opm-delay", `${Math.min(index * 70, 560)}ms`);
        index += 1;
      });
    });
  }

  function restageActiveSlide() {
    const active = document.querySelector(".slide.on");
    if (!active || reduced) return;
    qsa(".opm-stage", active).forEach((element) => {
      element.style.animation = "none";
      element.offsetHeight;
      element.style.animation = "";
    });
  }

  function observeSlideChanges() {
    const deck = document.querySelector(".sw");
    if (!deck) return;
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === "class")) {
        restageActiveSlide();
      }
    });
    qsa(".slide").forEach((slide) => {
      observer.observe(slide, { attributes: true, attributeFilter: ["class"] });
    });
  }

  function addPointerGlow() {
    if (reduced) return;
    let raf = null;
    document.addEventListener("pointermove", (event) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--opm-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--opm-y", `${event.clientY}px`);
        raf = null;
      });
    }, { passive: true });
  }

  function addHint() {
    if (document.querySelector(".opm-hint") || reduced) return;
    const hint = document.createElement("div");
    hint.className = "opm-hint";
    hint.textContent = "Use arrow keys or swipe";
    document.body.appendChild(hint);
  }

  function init() {
    if (!document.querySelector(".shell .sw .slide")) return;
    injectStyles();
    qsa(".slide").forEach(stageSlide);
    observeSlideChanges();
    addPointerGlow();
    addHint();
    restageActiveSlide();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
