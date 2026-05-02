/*!
 * Orivo Motion Layer v1.0
 * Drop-in animation layer for GitHub Pages.
 * Install: add <script src="/orivo-motion.js" defer></script> before </body>.
 * Does not collect data. Does not send network requests. Does not touch forms.
 */
(() => {
  "use strict";

  const MOTION_STYLE_ID = "orivo-motion-style-v1";
  const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const css = `
:root {
  --om-teal: var(--teal, #00C896);
  --om-vera: var(--vera, #7C6FCD);
  --om-amber: var(--amber, #F5A623);
  --om-coral: var(--coral, #FF6B6B);
  --om-w1: var(--w1, #F0F2FF);
  --om-w2: var(--w2, rgba(240,242,255,.72));
  --om-w3: var(--w3, rgba(240,242,255,.32));
  --om-w4: var(--w4, rgba(240,242,255,.06));
  --om-border: var(--border, rgba(240,242,255,.08));
  --om-teal-b: var(--teal-b, rgba(0,200,150,.22));
  --om-vera-b: var(--vera-b, rgba(124,111,205,.24));
}

body.orivo-motion-ready {
  background:
    radial-gradient(circle at 12% 10%, rgba(0,200,150,.045), transparent 28rem),
    radial-gradient(circle at 88% 24%, rgba(124,111,205,.04), transparent 24rem),
    var(--bg, #050A14);
}

body.orivo-motion-ready::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: .16;
  background-image:
    linear-gradient(rgba(0,200,150,.35) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124,111,205,.25) 1px, transparent 1px);
  background-size: 84px 84px;
  mask-image: radial-gradient(circle at 50% 10%, black 0%, transparent 68%);
}
body.orivo-motion-ready > * { position: relative; }

.orivo-hero-aura {
  position: absolute;
  width: min(46vw, 560px);
  height: min(46vw, 560px);
  min-width: 260px;
  min-height: 260px;
  right: clamp(-100px, 4vw, 40px);
  top: clamp(40px, 12vh, 160px);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(circle, rgba(0,200,150,.18) 0%, rgba(0,200,150,.055) 34%, transparent 68%),
    radial-gradient(circle, rgba(124,111,205,.14) 0%, transparent 64%);
  filter: blur(.4px);
  animation: orivo-aura-pulse 6.2s ease-in-out infinite;
}
.orivo-hero-aura::before,
.orivo-hero-aura::after {
  content: "";
  position: absolute;
  inset: 13%;
  border-radius: 50%;
  border: 1px solid rgba(0,200,150,.16);
  animation: orivo-ring-spin 32s linear infinite;
}
.orivo-hero-aura::after {
  inset: 28%;
  border-color: rgba(124,111,205,.18);
  animation-duration: 44s;
  animation-direction: reverse;
}
@keyframes orivo-aura-pulse { 0%, 100% { transform: scale(.94); opacity: .46; } 50% { transform: scale(1.06); opacity: .78; } }
@keyframes orivo-ring-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.orivo-enter {
  opacity: 0;
  transform: translateY(18px);
  animation: orivo-rise-in .78s cubic-bezier(.2,.8,.2,1) forwards;
}
.orivo-enter[data-om-delay="1"] { animation-delay: .07s; }
.orivo-enter[data-om-delay="2"] { animation-delay: .17s; }
.orivo-enter[data-om-delay="3"] { animation-delay: .29s; }
.orivo-enter[data-om-delay="4"] { animation-delay: .43s; }
.orivo-enter[data-om-delay="5"] { animation-delay: .59s; }
@keyframes orivo-rise-in { to { opacity: 1; transform: translateY(0); } }

.orivo-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity .68s ease,
    transform .68s cubic-bezier(.2,.8,.2,1),
    border-color .26s ease,
    background .26s ease,
    box-shadow .26s ease;
  will-change: opacity, transform;
}
.orivo-reveal.orivo-in { opacity: 1; transform: translateY(0); }
.orivo-delay-1 { transition-delay: .07s; }
.orivo-delay-2 { transition-delay: .14s; }
.orivo-delay-3 { transition-delay: .21s; }
.orivo-delay-4 { transition-delay: .28s; }

.orivo-motion-card {
  transform-style: preserve-3d;
  transition:
    transform .24s ease,
    border-color .24s ease,
    background .24s ease,
    box-shadow .24s ease,
    opacity .24s ease;
}
.orivo-motion-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 18px 48px rgba(0,0,0,.34),
    0 0 28px rgba(0,200,150,.055);
}
.orivo-motion-card.hi:hover,
.orivo-motion-card.priority:hover,
.orivo-motion-card.active:hover,
.orivo-motion-card.on:hover {
  box-shadow:
    0 22px 58px rgba(0,0,0,.38),
    0 0 38px rgba(0,200,150,.10);
}

.btn, .cta-btn, .run-btn, .submit-btn, .ctrl-run, .ctrl-btn, .nbtn, .cb, .ac-action, .pi-act, .sc-btn, .tab, .nl {
  position: relative;
  overflow: hidden;
}
.btn::after, .cta-btn::after, .run-btn::after, .submit-btn::after, .ctrl-run::after, .cb-run-aevo::after, .cb-run-vera::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-120%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent);
  transition: transform .62s ease;
  pointer-events: none;
}
.btn:hover::after, .cta-btn:hover::after, .run-btn:hover::after, .submit-btn:hover::after, .ctrl-run:hover::after, .cb-run-aevo:hover::after, .cb-run-vera:hover::after {
  transform: translateX(120%);
}

.orivo-flow-line {
  height: 2px;
  width: 100%;
  min-width: 180px;
  background: rgba(240,242,255,.075);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  margin: 20px 0;
}
.orivo-flow-line::after {
  content: "";
  position: absolute;
  inset: 0;
  width: 38%;
  background: linear-gradient(90deg, transparent, var(--om-teal), var(--om-vera), transparent);
  animation: orivo-flow-across 2.7s ease-in-out infinite;
}
@keyframes orivo-flow-across { from { transform: translateX(-115%); } to { transform: translateX(285%); } }

.orivo-mini-pipeline {
  display: grid;
  grid-template-columns: 1fr 38px 1fr 38px 1fr 38px 1fr;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
}
.orivo-mini-step {
  border: 1px solid var(--om-border);
  background: var(--om-w4);
  border-radius: 13px;
  padding: 14px 16px;
  font-size: 12px;
  color: var(--om-w3);
  line-height: 1.35;
  transition: all .42s ease;
}
.orivo-mini-step.orivo-active {
  color: var(--om-teal);
  border-color: var(--om-teal-b);
  background: rgba(0,200,150,.08);
  box-shadow: 0 0 26px rgba(0,200,150,.08);
}
.orivo-mini-link {
  height: 2px;
  background: linear-gradient(90deg, rgba(0,200,150,.08), rgba(124,111,205,.28));
  position: relative;
  overflow: hidden;
  border-radius: 999px;
}
.orivo-mini-link::after {
  content: "";
  position: absolute;
  inset: 0;
  width: 48%;
  background: linear-gradient(90deg, transparent, var(--om-teal), transparent);
  animation: orivo-flow-across 1.85s ease-in-out infinite;
}
.orivo-type-cursor::after { content: "▋"; color: var(--om-teal); margin-left: 2px; animation: orivo-blink 1s steps(2, start) infinite; }
@keyframes orivo-blink { 50% { opacity: 0; } }

.pfill, .cb-fill, .rgen-fill { position: relative; overflow: hidden; }
.pfill::after, .cb-fill::after, .rgen-fill::after {
  content: "";
  position: absolute;
  inset: 0;
  width: 34%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent);
  animation: orivo-progress-shimmer 2.2s ease-in-out infinite;
}
@keyframes orivo-progress-shimmer { from { transform: translateX(-120%); } to { transform: translateX(330%); } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
  .orivo-reveal, .orivo-enter { opacity: 1 !important; transform: none !important; }
}
@media (max-width: 820px) {
  .orivo-hero-aura { opacity: .38; right: -160px; top: 40px; }
  .orivo-mini-pipeline { grid-template-columns: 1fr; }
  .orivo-mini-link { width: 2px; height: 22px; justify-self: center; }
  .orivo-mini-link::after { width: 100%; height: 48%; animation: orivo-flow-down 1.55s ease-in-out infinite; }
  @keyframes orivo-flow-down { from { transform: translateY(-120%); } to { transform: translateY(330%); } }
}`;

  function injectStyles() {
    if (document.getElementById(MOTION_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = MOTION_STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function safeSelect(selector) {
    try { return Array.from(document.querySelectorAll(selector)); }
    catch { return []; }
  }

  function addHeroAura() {
    if (REDUCED) return;
    const hero = document.querySelector(".cover, .hero, .slide.s1, #s1, header");
    if (!hero || hero.querySelector(".orivo-hero-aura")) return;
    const computed = window.getComputedStyle(hero);
    if (computed.position === "static") hero.style.position = "relative";
    if (computed.overflow === "visible") hero.style.overflow = "hidden";
    const aura = document.createElement("div");
    aura.className = "orivo-hero-aura";
    hero.prepend(aura);
  }

  function applyHeroEntrance() {
    const hero = document.querySelector(".cover, .hero, .slide.s1, #s1, header");
    if (!hero || REDUCED) return;
    const targets = [".cv-eye", ".hero-eye", ".ey", ".cv-h", ".hero-h", ".h1", ".cv-thesis", ".lead", ".body", ".cv-sub", ".hero-sub", ".pillrow", ".cv-metrics", ".stats", ".btn", ".btn-o", ".cta-btn"];
    let count = 1;
    targets.forEach(sel => {
      hero.querySelectorAll(sel).forEach(el => {
        if (el.classList.contains("orivo-enter")) return;
        el.classList.add("orivo-enter");
        el.dataset.omDelay = String(Math.min(count, 5));
        count += 1;
      });
    });
  }

  function addRevealClasses() {
    const selectors = [".section", ".rc", ".mk", ".fg", ".fg-card", ".uof", ".risk", ".sc", ".step", ".pc", ".rh", ".mc", ".layer-block", ".tool-card", ".co-card", ".stage", ".alert-card", ".vera-panel", ".phv-section", ".patient-msg-wrap", ".phone-col", ".bs", ".comp-card", ".founder-card", ".market-grid", ".reasons"];
    let index = 0;
    safeSelect(selectors.join(",")).forEach(el => {
      if (!el.classList.contains("orivo-reveal")) {
        el.classList.add("orivo-reveal", `orivo-delay-${(index % 4) + 1}`);
        index += 1;
      }
      el.classList.add("orivo-motion-card");
    });
  }

  function observeReveals() {
    const targets = safeSelect(".orivo-reveal");
    if (!targets.length) return;
    if (REDUCED || !("IntersectionObserver" in window)) {
      targets.forEach(el => el.classList.add("orivo-in"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("orivo-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(el => observer.observe(el));
  }

  function addFlowLines() {
    if (REDUCED) return;
    const twoCol = document.querySelector(".ai-pillars, .phone-compare, .compare");
    if (twoCol && !twoCol.nextElementSibling?.classList?.contains("orivo-flow-line")) {
      const flow = document.createElement("div");
      flow.className = "orivo-flow-line";
      twoCol.insertAdjacentElement("afterend", flow);
    }
  }

  function addMiniPipelineToHomepage() {
    if (document.querySelector(".orivo-mini-pipeline")) return;
    const likelyHome = location.pathname === "/" || location.pathname.endsWith("/index.html") || document.title.toLowerCase().includes("orivo health");
    if (!likelyHome) return;
    const anchor = document.querySelector(".steps, .hero .body, .cover .cv-sub, #s1 .body");
    if (!anchor) return;
    const pipeline = document.createElement("div");
    pipeline.className = "orivo-mini-pipeline";
    pipeline.setAttribute("aria-label", "Orivo workflow animation");
    pipeline.innerHTML = `
      <div class="orivo-mini-step orivo-active">Patient concern received</div>
      <div class="orivo-mini-link"></div>
      <div class="orivo-mini-step">Aevo translates context</div>
      <div class="orivo-mini-link"></div>
      <div class="orivo-mini-step">Vera validates boundaries</div>
      <div class="orivo-mini-link"></div>
      <div class="orivo-mini-step">Pharmacist brief ready</div>`;
    if (anchor.classList.contains("steps")) anchor.insertAdjacentElement("beforebegin", pipeline);
    else anchor.insertAdjacentElement("afterend", pipeline);
    if (!REDUCED) {
      const steps = Array.from(pipeline.querySelectorAll(".orivo-mini-step"));
      let idx = 0;
      setInterval(() => {
        steps.forEach(step => step.classList.remove("orivo-active"));
        steps[idx].classList.add("orivo-active");
        idx = (idx + 1) % steps.length;
      }, 1400);
    }
  }

  function animateCounters() {
    const counters = safeSelect("[data-target].count, .count[data-target]");
    if (!counters.length || REDUCED) return;
    const runCounter = (el) => {
      const rawTarget = String(el.dataset.target || "").replace(/,/g, "");
      const target = parseFloat(rawTarget);
      if (Number.isNaN(target)) return;
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const decimals = Number.isInteger(target) ? 0 : 1;
      const duration = 1050;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.omDone) {
          entry.target.dataset.omDone = "true";
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .45 });
    counters.forEach(counter => observer.observe(counter));
  }

  function enrichExistingMetrics() {
    const metricSelectors = ".cvm-n, .sn, .mk-n, .fg-n, .mn, .bs-n, .co-n";
    safeSelect(metricSelectors).forEach(el => {
      if (el.dataset.target || el.classList.contains("count")) return;
      const txt = el.textContent.trim();
      const match = txt.match(/^(\$)?\s*([0-9]+(?:\.[0-9]+)?)\s*([BKMX×%]|M|K|B)?$/i);
      if (!match) return;
      el.classList.add("count");
      el.dataset.target = match[2];
      if (match[1]) el.dataset.prefix = match[1];
      if (match[3]) el.dataset.suffix = match[3];
      el.textContent = match[1] ? `${match[1]}0${match[3] || ""}` : `0${match[3] || ""}`;
    });
  }

  function addClinicalSafetyToast() {
    const isDemo = /demo|pipeline|provider|walkthrough|stack/i.test(location.pathname + " " + document.title);
    if (!isDemo) return;
    if (document.querySelector(".orivo-prototype-banner")) return;
    if (document.body.textContent.toLowerCase().includes("prototype") && document.body.textContent.toLowerCase().includes("not medical advice")) return;
    const banner = document.createElement("div");
    banner.className = "orivo-prototype-banner";
    banner.textContent = "Prototype preview. Do not enter PHI. Not medical advice or a live clinical system.";
    banner.style.cssText = `
      position: fixed;
      left: 14px;
      bottom: 14px;
      z-index: 9999;
      max-width: min(440px, calc(100vw - 28px));
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid rgba(245,166,35,.28);
      background: rgba(5,10,20,.88);
      color: rgba(240,242,255,.76);
      font: 12px/1.4 var(--sans, system-ui, sans-serif);
      backdrop-filter: blur(12px);
      box-shadow: 0 14px 42px rgba(0,0,0,.34);`;
    document.body.appendChild(banner);
  }

  function init() {
    injectStyles();
    document.body.classList.add("orivo-motion-ready");
    addHeroAura();
    applyHeroEntrance();
    addRevealClasses();
    observeReveals();
    addFlowLines();
    addMiniPipelineToHomepage();
    enrichExistingMetrics();
    animateCounters();
    addClinicalSafetyToast();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
