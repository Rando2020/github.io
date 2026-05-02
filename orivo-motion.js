/*!
 * Orivo Motion Layer v2.0 Premium
 * Static GitHub Pages compatible. No dependencies. No network requests. No data collection.
 * Install: add <script src="/orivo-motion.js" defer></script> before </body>.
 */
(() => {
  "use strict";

  const STYLE_ID = "orivo-motion-premium-style-v2";
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const css = `
:root{
  --om-teal:var(--teal,#00C896);
  --om-teal-d:var(--teal-d,#009E75);
  --om-vera:var(--vera,#7C6FCD);
  --om-amber:var(--amber,#F5A623);
  --om-coral:var(--coral,#FF6B6B);
  --om-bg:var(--bg,#050A14);
  --om-bg2:var(--bg2,#07101D);
  --om-w1:var(--w1,#F0F2FF);
  --om-w2:var(--w2,rgba(240,242,255,.76));
  --om-w3:var(--w3,rgba(240,242,255,.48));
  --om-w4:var(--w4,rgba(240,242,255,.07));
  --om-border:var(--border,rgba(240,242,255,.10));
  --om-teal-b:var(--teal-b,rgba(0,200,150,.24));
  --om-vera-b:var(--vera-b,rgba(124,111,205,.24));
}

html{scroll-behavior:smooth}
body.orivo-motion-premium{
  background:
    radial-gradient(circle at 12% 8%,rgba(0,200,150,.055),transparent 30rem),
    radial-gradient(circle at 88% 18%,rgba(124,111,205,.055),transparent 28rem),
    var(--om-bg)!important;
}
body.orivo-motion-premium::before{
  content:"";
  position:fixed;
  inset:0;
  pointer-events:none;
  z-index:0;
  opacity:.13;
  background-image:
    linear-gradient(rgba(0,200,150,.28) 1px,transparent 1px),
    linear-gradient(90deg,rgba(124,111,205,.18) 1px,transparent 1px);
  background-size:92px 92px;
  mask-image:radial-gradient(circle at 50% 8%,#000 0%,transparent 72%);
}
body.orivo-motion-premium > *{position:relative}

/* Hero aura */
.orivo-hero-aura{
  position:absolute;
  width:min(48vw,620px);
  height:min(48vw,620px);
  min-width:280px;
  min-height:280px;
  right:clamp(-160px,2vw,30px);
  top:clamp(24px,12vh,150px);
  pointer-events:none;
  border-radius:50%;
  z-index:0;
  background:
    radial-gradient(circle,rgba(0,200,150,.20) 0%,rgba(0,200,150,.06) 34%,transparent 69%),
    radial-gradient(circle,rgba(124,111,205,.15) 0%,transparent 65%);
  filter:blur(.4px);
  animation:om-aura 7s ease-in-out infinite;
}
.orivo-hero-aura::before,.orivo-hero-aura::after{
  content:"";
  position:absolute;
  inset:10%;
  border-radius:50%;
  border:1px solid rgba(0,200,150,.16);
  border-top-color:rgba(240,242,255,.12);
  animation:om-spin 42s linear infinite;
}
.orivo-hero-aura::after{
  inset:26%;
  border-color:rgba(124,111,205,.18);
  border-bottom-color:rgba(0,200,150,.18);
  animation-duration:58s;
  animation-direction:reverse;
}
@keyframes om-aura{0%,100%{transform:scale(.94);opacity:.48}50%{transform:scale(1.065);opacity:.78}}
@keyframes om-spin{to{transform:rotate(360deg)}}

/* Entrance and scroll reveals */
.om-enter{opacity:0;transform:translateY(18px);animation:om-rise .75s cubic-bezier(.2,.8,.2,1) forwards}
.om-enter[data-om-delay="1"]{animation-delay:.06s}.om-enter[data-om-delay="2"]{animation-delay:.16s}.om-enter[data-om-delay="3"]{animation-delay:.28s}.om-enter[data-om-delay="4"]{animation-delay:.42s}.om-enter[data-om-delay="5"]{animation-delay:.58s}
@keyframes om-rise{to{opacity:1;transform:translateY(0)}}
.om-reveal{opacity:0;transform:translateY(24px);transition:opacity .72s ease,transform .72s cubic-bezier(.2,.8,.2,1),box-shadow .26s ease,border-color .26s ease,background .26s ease;will-change:opacity,transform}
.om-reveal.om-in{opacity:1;transform:translateY(0)}
.om-delay-1{transition-delay:.06s}.om-delay-2{transition-delay:.12s}.om-delay-3{transition-delay:.18s}.om-delay-4{transition-delay:.24s}

/* Premium cards */
.om-card{transform-style:preserve-3d;transition:transform .26s ease,box-shadow .26s ease,border-color .26s ease,background .26s ease!important;will-change:transform}
.om-card:hover{transform:translateY(-5px);box-shadow:0 22px 58px rgba(0,0,0,.34),0 0 34px rgba(0,200,150,.07)!important}
.om-card:hover::before{opacity:1}
.om-card::before{content:"";position:absolute;inset:-1px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .28s ease;background:linear-gradient(135deg,rgba(0,200,150,.14),transparent 32%,rgba(124,111,205,.12));mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;padding:1px}

/* Magnetic CTAs */
.btn,.cta-btn,.run-btn,.submit-btn,.ctrl-run,.ctrl-btn,.nbtn,.demo-link,.login-link,.cal-opt,.resource-card,a.card{position:relative;overflow:hidden}
.btn::after,.cta-btn::after,.run-btn::after,.submit-btn::after,.ctrl-run::after,.demo-link::after,.cal-opt::after{
  content:"";position:absolute;inset:0;transform:translateX(-125%);background:linear-gradient(90deg,transparent,rgba(255,255,255,.27),transparent);transition:transform .72s ease;pointer-events:none
}
.btn:hover::after,.cta-btn:hover::after,.run-btn:hover::after,.submit-btn:hover::after,.ctrl-run:hover::after,.demo-link:hover::after,.cal-opt:hover::after{transform:translateX(125%)}

/* Aevo to Vera flow */
.om-flow-line{height:2px;width:100%;min-width:180px;background:rgba(240,242,255,.075);border-radius:999px;overflow:hidden;position:relative;margin:22px 0}
.om-flow-line::after{content:"";position:absolute;inset:0;width:38%;background:linear-gradient(90deg,transparent,var(--om-teal),var(--om-vera),transparent);animation:om-flow 2.85s ease-in-out infinite}
@keyframes om-flow{from{transform:translateX(-115%)}to{transform:translateX(285%)}}

/* Mini product pipeline */
.om-mini-pipeline{display:grid;grid-template-columns:1fr 38px 1fr 38px 1fr 38px 1fr;align-items:center;gap:8px;margin-top:28px;margin-bottom:6px}
.om-mini-step{border:1px solid var(--om-border);background:rgba(240,242,255,.055);border-radius:14px;padding:14px 16px;font-size:12px;color:var(--om-w3);line-height:1.35;transition:all .42s ease;box-shadow:inset 0 1px 0 rgba(255,255,255,.025)}
.om-mini-step.om-active{color:var(--om-teal);border-color:var(--om-teal-b);background:rgba(0,200,150,.085);box-shadow:0 0 28px rgba(0,200,150,.085)}
.om-mini-link{height:2px;background:linear-gradient(90deg,rgba(0,200,150,.08),rgba(124,111,205,.28));position:relative;overflow:hidden;border-radius:999px}
.om-mini-link::after{content:"";position:absolute;inset:0;width:48%;background:linear-gradient(90deg,transparent,var(--om-teal),transparent);animation:om-flow 1.9s ease-in-out infinite}

/* Text highlight gradient */
.om-gradient-text{background:linear-gradient(90deg,var(--om-teal),#74F4D0,var(--om-vera));-webkit-background-clip:text;background-clip:text;color:transparent!important}

/* Progress shimmer */
.pfill,.cb-fill,.rgen-fill{position:relative;overflow:hidden}
.pfill::after,.cb-fill::after,.rgen-fill::after{content:"";position:absolute;inset:0;width:34%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);animation:om-progress 2.2s ease-in-out infinite}
@keyframes om-progress{from{transform:translateX(-120%)}to{transform:translateX(330%)}}

/* Floating safety chip on demo pages */
.om-prototype-banner{position:fixed;left:14px;bottom:14px;z-index:9999;max-width:min(460px,calc(100vw - 28px));padding:10px 14px;border-radius:11px;border:1px solid rgba(245,166,35,.28);background:rgba(5,10,20,.88);color:rgba(240,242,255,.76);font:12px/1.4 var(--sans,system-ui,sans-serif);backdrop-filter:blur(12px);box-shadow:0 14px 42px rgba(0,0,0,.34)}

/* Pointer spotlight */
.om-spotlight{position:fixed;inset:0;pointer-events:none;z-index:1;background:radial-gradient(500px circle at var(--om-x,50%) var(--om-y,20%),rgba(0,200,150,.045),transparent 42%);opacity:.75;transition:opacity .2s ease}

@media(max-width:820px){.orivo-hero-aura{opacity:.36;right:-190px;top:40px}.om-mini-pipeline{grid-template-columns:1fr}.om-mini-link{width:2px;height:22px;justify-self:center}.om-mini-link::after{width:100%;height:48%;animation:om-flow-down 1.55s ease-in-out infinite}@keyframes om-flow-down{from{transform:translateY(-120%)}to{transform:translateY(330%)}}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}.om-reveal,.om-enter{opacity:1!important;transform:none!important}.om-spotlight,.orivo-hero-aura{display:none!important}}
`;

  function injectStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement("style");
    style.id=STYLE_ID;
    style.textContent=css;
    document.head.appendChild(style);
  }

  function qsa(sel,root=document){try{return Array.from(root.querySelectorAll(sel));}catch{return[];}}
  function first(sel){try{return document.querySelector(sel);}catch{return null;}}

  function addHeroAura(){
    if(reduced) return;
    const hero=first(".hero,.cover,.slide.s1,#s1,main section:first-of-type,header");
    if(!hero || hero.querySelector(".orivo-hero-aura")) return;
    const cs=getComputedStyle(hero);
    if(cs.position==="static") hero.style.position="relative";
    if(cs.overflow==="visible") hero.style.overflow="hidden";
    const aura=document.createElement("div");
    aura.className="orivo-hero-aura";
    hero.prepend(aura);
  }

  function heroEntrance(){
    if(reduced) return;
    const hero=first(".hero,.cover,.slide.s1,#s1,main section:first-of-type,header");
    if(!hero) return;
    const selectors=[".ey",".cv-eye",".hero-eye",".h1",".cv-h",".hero-h","h1",".lead",".body",".cv-thesis",".cv-sub",".hero-actions",".pillrow",".hero-pills",".stats",".cv-metrics",".phone-wrap",".phone",".btn",".btn-o"];
    let i=1;
    selectors.forEach(sel=>qsa(sel,hero).slice(0,4).forEach(el=>{
      if(el.classList.contains("om-enter")) return;
      el.classList.add("om-enter");
      el.dataset.omDelay=String(Math.min(i,5));
      i++;
    }));
  }

  function revealSetup(){
    const selectors=["section",".block",".section",".card",".stat",".step",".resource-card",".prod-icon",".prod-name",".prod-desc",".pc",".rc",".mk",".fg-card",".tool-card",".stage",".alert-card",".vera-panel",".phone-col",".comp-card",".founder-card",".market-grid",".reasons",".metric",".mc",".rh",".bs"];
    let i=0;
    qsa(selectors.join(",")).forEach(el=>{
      if(!el.classList.contains("om-reveal")) el.classList.add("om-reveal",`om-delay-${(i%4)+1}`);
      const tag=el.tagName.toLowerCase();
      if(!["section","body","main"].includes(tag)) el.classList.add("om-card");
      i++;
    });
  }

  function observeReveals(){
    const targets=qsa(".om-reveal");
    if(!targets.length) return;
    if(reduced || !("IntersectionObserver" in window)){
      targets.forEach(el=>el.classList.add("om-in"));
      return;
    }
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.classList.add("om-in");observer.unobserve(entry.target);}
      });
    },{threshold:.11,rootMargin:"0px 0px -8% 0px"});
    targets.forEach(el=>observer.observe(el));
  }

  function addFlowLines(){
    if(reduced) return;
    qsa(".ai-pillars,.phone-compare,.compare,.split,.two").slice(0,2).forEach(el=>{
      if(el.nextElementSibling && el.nextElementSibling.classList && el.nextElementSibling.classList.contains("om-flow-line")) return;
      const flow=document.createElement("div");
      flow.className="om-flow-line";
      el.insertAdjacentElement("afterend",flow);
    });
  }

  function addMiniPipeline(){
    if(first(".om-mini-pipeline")) return;
    const path=location.pathname;
    const isHome=path==="/" || path.endsWith("index.html") || path==="";
    if(!isHome) return;
    const anchor=first(".hero-actions,.steps,.hero .lead,.cover .cv-sub,#s1 .body");
    if(!anchor) return;
    const pipeline=document.createElement("div");
    pipeline.className="om-mini-pipeline";
    pipeline.setAttribute("aria-label","Orivo workflow animation");
    pipeline.innerHTML=`
      <div class="om-mini-step om-active">Patient concern received</div>
      <div class="om-mini-link"></div>
      <div class="om-mini-step">Aevo translates context</div>
      <div class="om-mini-link"></div>
      <div class="om-mini-step">Vera validates boundaries</div>
      <div class="om-mini-link"></div>
      <div class="om-mini-step">Pharmacist brief ready</div>`;
    anchor.insertAdjacentElement("afterend",pipeline);
    if(!reduced){
      const steps=qsa(".om-mini-step",pipeline);let idx=0;
      setInterval(()=>{steps.forEach(s=>s.classList.remove("om-active"));steps[idx].classList.add("om-active");idx=(idx+1)%steps.length;},1450);
    }
  }

  function animateCounters(){
    const metricSel=".stat-n,.sn,.mk-n,.fg-n,.mn,.bs-n,.co-n,.cvm-n";
    const counters=qsa(metricSel).filter(el=>/\d/.test(el.textContent.trim()));
    counters.forEach(el=>{
      if(el.dataset.omTarget) return;
      const txt=el.textContent.trim();
      const match=txt.match(/^(\$)?\s*([0-9]+(?:\.[0-9]+)?)\s*([BKMX×%])?$/i);
      if(!match) return;
      el.dataset.omTarget=match[2];
      el.dataset.omPrefix=match[1]||"";
      el.dataset.omSuffix=match[3]||"";
      el.textContent=`${el.dataset.omPrefix}0${el.dataset.omSuffix}`;
    });
    const run=(el)=>{
      const target=parseFloat(el.dataset.omTarget);if(Number.isNaN(target))return;
      const prefix=el.dataset.omPrefix||"";const suffix=el.dataset.omSuffix||"";const decimals=Number.isInteger(target)?0:1;const start=performance.now();const dur=1150;
      const tick=(now)=>{const p=Math.min((now-start)/dur,1);const eased=1-Math.pow(1-p,3);el.textContent=`${prefix}${(target*eased).toFixed(decimals)}${suffix}`;if(p<1)requestAnimationFrame(tick);else el.textContent=`${prefix}${target.toFixed(decimals)}${suffix}`;};
      requestAnimationFrame(tick);
    };
    const targets=qsa("[data-om-target]");
    if(reduced || !("IntersectionObserver" in window)){targets.forEach(run);return;}
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&!e.target.dataset.omDone){e.target.dataset.omDone="1";run(e.target);io.unobserve(e.target);}}),{threshold:.45});
    targets.forEach(el=>io.observe(el));
  }

  function spotlight(){
    if(reduced || first(".om-spotlight")) return;
    const s=document.createElement("div");s.className="om-spotlight";document.body.appendChild(s);
    let raf=null;
    document.addEventListener("pointermove",e=>{
      if(raf) return;
      raf=requestAnimationFrame(()=>{document.documentElement.style.setProperty("--om-x",`${e.clientX}px`);document.documentElement.style.setProperty("--om-y",`${e.clientY}px`);raf=null;});
    },{passive:true});
  }

  function gradientKeyWords(){
    qsa(".h1 span,.hero h1 span,.cv-h span,h1 span").forEach(el=>el.classList.add("om-gradient-text"));
  }

  function safetyBanner(){
    const text=document.body.textContent.toLowerCase();
    const isDemo=/demo|pipeline|provider|walkthrough|stack/i.test(location.pathname+" "+document.title);
    if(!isDemo || first(".om-prototype-banner")) return;
    if(text.includes("not medical advice") || text.includes("do not enter phi")) return;
    const b=document.createElement("div");b.className="om-prototype-banner";b.textContent="Prototype preview. Do not enter PHI. Not medical advice or a live clinical system.";document.body.appendChild(b);
  }

  function init(){
    injectStyles();
    document.body.classList.add("orivo-motion-premium");
    addHeroAura();
    heroEntrance();
    revealSetup();
    observeReveals();
    addFlowLines();
    addMiniPipeline();
    animateCounters();
    spotlight();
    gradientKeyWords();
    safetyBanner();
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init,{once:true}); else init();
})();
