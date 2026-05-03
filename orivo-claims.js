/*!
 * Orivo Claims Annotation Layer v1.0
 * Static GitHub Pages compatible. No data collection. No network requests after loading.
 * Purpose: annotate public-facing research-backed claims with small evidence links.
 */
(() => {
  "use strict";

  const STYLE_ID = "orivo-claims-style-v1";
  const CLAIMS = [
    {
      id: "nonadherence-common",
      n: "1",
      href: "/evidence.html#nonadherence-common",
      title: "Medication nonadherence evidence",
      patterns: [
        "Medication nonadherence is common",
        "nonadherence is common"
      ]
    },
    {
      id: "nonadherence-deaths-costs",
      n: "2",
      href: "/evidence.html#nonadherence-deaths-costs",
      title: "Nonadherence mortality and cost evidence",
      patterns: [
        "125K preventable deaths per year from non-adherence",
        "125,000 preventable deaths",
        "125,000 deaths",
        "of prescriptions never taken as directed"
      ]
    },
    {
      id: "ade-costs",
      n: "3",
      href: "/evidence.html#ade-costs",
      title: "Adverse drug event cost evidence",
      patterns: [
        "$3.5B annual CMS spend on preventable ADEs",
        "$3.5B",
        "preventable ADEs",
        "adverse drug events"
      ]
    },
    {
      id: "health-literacy-12",
      n: "4",
      href: "/evidence.html#health-literacy-12",
      title: "Health literacy evidence",
      patterns: [
        "12% of patients understand discharge instructions",
        "12% of U.S. adults have proficient health literacy",
        "health literacy"
      ]
    },
    {
      id: "sms-cell-access",
      n: "5",
      href: "/evidence.html#sms-cell-access",
      title: "SMS and cellphone access evidence",
      patterns: [
        "No app",
        "No download",
        "SMS-first",
        "Works on any phone",
        "flip phones and feature phones"
      ]
    },
    {
      id: "health-app-abandonment",
      n: "6",
      href: "/evidence.html#health-app-abandonment",
      title: "Health app abandonment and retention evidence",
      patterns: [
        "Digital health often starts with an app",
        "Most health apps",
        "Requires smartphone, download, account creation",
        "digital health tools still assume downloads"
      ]
    },
    {
      id: "pdc-adherence",
      n: "7",
      href: "/evidence.html#pdc-adherence",
      title: "PDC adherence measurement evidence",
      patterns: [
        "PDC",
        "PQA adherence",
        "adherence tracking dashboard"
      ]
    },
    {
      id: "cms-star-ratings",
      n: "8",
      href: "/evidence.html#cms-star-ratings",
      title: "CMS Star Ratings adherence evidence",
      patterns: [
        "CMS Star Ratings",
        "Star Ratings",
        "Part D"
      ]
    },
    {
      id: "hrsn-sdoh",
      n: "9",
      href: "/evidence.html#hrsn-sdoh",
      title: "HRSN and social needs evidence",
      patterns: [
        "SDoH",
        "Transportation barrier",
        "transportation",
        "Z-code",
        "health-related social needs"
      ]
    },
    {
      id: "twilio-hipaa",
      n: "10",
      href: "/evidence.html#twilio-hipaa",
      title: "HIPAA-eligible messaging configuration evidence",
      patterns: [
        "HIPAA-eligible",
        "HIPAA Notice",
        "Do not enter PHI",
        "PHI"
      ]
    },
    {
      id: "rxnorm-normalization",
      n: "11",
      href: "/evidence.html#rxnorm-normalization",
      title: "RxNorm medication normalization evidence",
      patterns: [
        "RxNorm",
        "medication normalization",
        "Medication reconciliation"
      ]
    }
  ];

  const BLOCKED_TAGS = new Set(["A", "SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "BUTTON", "OPTION"]);
  const MAX_PER_CLAIM = 3;

  function injectStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
.orivo-cite{display:inline-flex;align-items:center;justify-content:center;margin-left:.28em;transform:translateY(-.08em);font-size:.66em;line-height:1;border:1px solid rgba(0,200,150,.34);background:rgba(0,200,150,.10);color:var(--teal,#00C896)!important;border-radius:999px;min-width:1.55em;height:1.55em;padding:0 .38em;text-decoration:none!important;font-weight:800;letter-spacing:.01em;vertical-align:super;box-shadow:0 0 16px rgba(0,200,150,.08)}
.orivo-cite:hover{background:rgba(0,200,150,.18);border-color:rgba(0,200,150,.60);text-decoration:none!important}
.orivo-evidence-chip-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
.orivo-evidence-chip{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(0,200,150,.24);background:rgba(0,200,150,.08);color:var(--teal,#00C896)!important;border-radius:999px;padding:6px 11px;font-size:11px;font-weight:800;text-decoration:none!important;letter-spacing:.2px}
.orivo-evidence-chip:hover{background:rgba(0,200,150,.14);border-color:rgba(0,200,150,.48);text-decoration:none!important}
.orivo-claim-boundary{border:1px solid rgba(245,166,35,.24);background:rgba(245,166,35,.075);color:rgba(240,242,255,.72);border-radius:14px;padding:12px 14px;font-size:12px;line-height:1.5;margin-top:18px;max-width:840px}
.orivo-claim-boundary a{color:var(--teal,#00C896)!important;font-weight:800;text-decoration:none}
.orivo-claim-boundary a:hover{text-decoration:underline}
`;
    document.head.appendChild(style);
  }

  function alreadyAnnotated(node){
    return node.parentElement && node.parentElement.querySelector && node.parentElement.querySelector(".orivo-cite");
  }

  function createCitation(claim){
    const a = document.createElement("a");
    a.className = "orivo-cite";
    a.href = claim.href;
    a.textContent = claim.n;
    a.title = claim.title;
    a.setAttribute("aria-label", `${claim.title}, source ${claim.n}`);
    return a;
  }

  function textNodes(root){
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if(!parent || BLOCKED_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
        if(parent.closest && parent.closest(".orivo-cite,.orivo-evidence-chip,.orivo-claim-boundary,footer")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    let node;
    while((node = walker.nextNode())) nodes.push(node);
    return nodes;
  }

  function annotateClaims(){
    if(location.pathname.endsWith("/evidence.html")) return;
    const nodes = textNodes(document.body);
    const counts = new Map();
    CLAIMS.forEach(claim => {
      counts.set(claim.id, 0);
      for(const pattern of claim.patterns){
        if(counts.get(claim.id) >= MAX_PER_CLAIM) break;
        const lowerPattern = pattern.toLowerCase();
        for(const node of nodes){
          if(counts.get(claim.id) >= MAX_PER_CLAIM) break;
          if(alreadyAnnotated(node)) continue;
          const value = node.nodeValue;
          if(!value || !value.toLowerCase().includes(lowerPattern)) continue;
          const parent = node.parentElement;
          if(!parent) continue;
          parent.appendChild(createCitation(claim));
          counts.set(claim.id, counts.get(claim.id) + 1);
        }
      }
    });
  }

  function addEvidenceChips(){
    const isHome = location.pathname === "/" || location.pathname.endsWith("index.html");
    if(!isHome) return;
    const investors = document.getElementById("investors") || Array.from(document.querySelectorAll("section")).find(s => /app|download|digital health/i.test(s.textContent));
    if(investors && !investors.querySelector(".orivo-evidence-chip-row")){
      const lead = investors.querySelector(".lead") || investors.querySelector("p");
      if(lead){
        const row = document.createElement("div");
        row.className = "orivo-evidence-chip-row";
        row.innerHTML = `
          <a class="orivo-evidence-chip" href="/evidence.html#sms-cell-access">SMS access evidence</a>
          <a class="orivo-evidence-chip" href="/evidence.html#health-app-abandonment">Health app retention evidence</a>
          <a class="orivo-evidence-chip" href="/evidence.html#health-literacy-12">Health literacy evidence</a>`;
        lead.insertAdjacentElement("afterend", row);
      }
    }
  }

  function addBoundary(){
    const isPublicClaimsPage = /index|pitch|why-invest|demo|walkthrough|pipeline|stack/i.test(location.pathname + " " + document.title);
    if(!isPublicClaimsPage || document.querySelector(".orivo-claim-boundary")) return;
    const main = document.querySelector("main") || document.body;
    const anchor = main.querySelector("section:last-of-type") || main.lastElementChild;
    if(!anchor) return;
    const div = document.createElement("div");
    div.className = "orivo-claim-boundary";
    div.innerHTML = `Research-backed market claims are cited in the <a href="/evidence.html">Evidence</a> page. Orivo is prototype-stage; statements describe product design intent unless explicitly labeled as validated pilot outcomes.`;
    anchor.appendChild(div);
  }

  function init(){
    injectStyles();
    annotateClaims();
    addEvidenceChips();
    addBoundary();
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true}); else init();
})();
