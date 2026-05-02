<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Aevo - Investor Pitch Deck</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://unpkg.com/@fontsource/dm-serif-display@5.0.16/index.css">
<link rel="stylesheet" href="https://unpkg.com/@fontsource/dm-sans@5.0.17/index.css">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --teal:#00C896;--teal-d:#009E75;--teal-lo:rgba(0,200,150,.09);--teal-b:rgba(0,200,150,.22);
  --amber:#F5A623;--amber-lo:rgba(245,166,35,.09);--amber-b:rgba(245,166,35,.22);
  --coral:#FF6B6B;
  --w1:#F0F2FF;--w2:rgba(240,242,255,.7);--w3:rgba(240,242,255,.32);--w4:rgba(240,242,255,.06);
  --border:rgba(240,242,255,.08);--border2:rgba(240,242,255,.16);
  --ink:#050A14;
  --serif:'DM Serif Display','Palatino Linotype',Palatino,Georgia,serif;
  --sans:'DM Sans','Helvetica Neue',Helvetica,Arial,sans-serif;
}

html,body{height:100%;overflow:hidden;background:var(--ink);font-family:var(--sans)}

/* ── SHELL ── */
.shell{
  display:flex;flex-direction:column;
  height:100vh;max-width:1100px;margin:0 auto;
  background:#060C18;
  box-shadow:0 0 120px rgba(0,0,0,.9);
  position:relative;
}

/* ── TOPBAR ── */
.topbar{
  display:flex;align-items:center;justify-content:space-between;
  padding:12px 32px;
  background:rgba(4,8,18,.9);
  border-bottom:1px solid var(--border);
  flex-shrink:0;
  backdrop-filter:blur(10px);
  z-index:10;
}
.brand{
  font-family:var(--serif);font-size:20px;color:var(--teal);
  letter-spacing:-.4px;display:flex;align-items:baseline;gap:8px;
}
.brand-tagline{
  font-family:var(--sans);font-size:9px;letter-spacing:3px;
  text-transform:uppercase;color:var(--w3);
}
.nav-r{display:flex;align-items:center;gap:10px}
.dots{display:flex;gap:5px;align-items:center}
.dot{
  width:5px;height:5px;border-radius:50%;
  background:rgba(240,242,255,.15);cursor:pointer;
  transition:all .3s ease;border:none;padding:0;
}
.dot.on{width:20px;border-radius:2.5px;background:var(--teal)}
.snum{font-size:11px;color:var(--w3);min-width:38px;text-align:center}
.nbtn{
  background:none;border:1px solid rgba(240,242,255,.1);color:var(--w2);
  width:30px;height:30px;border-radius:7px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;font-size:13px;font-family:var(--sans);
}
.nbtn:hover{border-color:var(--teal);color:var(--teal)}
.pbar{height:2px;background:rgba(240,242,255,.05);flex-shrink:0}
.pfill{height:100%;background:var(--teal);transition:width .4s cubic-bezier(.4,0,.2,1)}

/* ── SLIDES ── */
.sw{flex:1;position:relative;overflow:hidden}
.slide{
  position:absolute;inset:0;
  padding:52px 60px;
  display:flex;flex-direction:column;
  opacity:0;pointer-events:none;
  transition:opacity .4s ease,transform .4s cubic-bezier(.4,0,.2,1);
  transform:translateY(14px);
  overflow-y:auto;
  overflow-x:hidden;
}
.slide.on{opacity:1;pointer-events:all;transform:translateY(0)}

/* Slide backgrounds */
.s1{background:radial-gradient(ellipse at 70% 40%,rgba(0,200,150,.07) 0%,transparent 65%),linear-gradient(160deg,#060C18 0%,#040810 100%)}
.s2{background:radial-gradient(ellipse at 30% 60%,rgba(255,107,107,.05) 0%,transparent 60%),linear-gradient(160deg,#07101E 0%,#050A16 100%)}
.s3{background:radial-gradient(ellipse at 60% 30%,rgba(0,200,150,.06) 0%,transparent 60%),linear-gradient(160deg,#06101C 0%,#040C18 100%)}
.s4{background:radial-gradient(ellipse at 40% 70%,rgba(74,158,255,.05) 0%,transparent 60%),linear-gradient(160deg,#070F1C 0%,#050B18 100%)}
.s5{background:radial-gradient(ellipse at 65% 45%,rgba(0,200,150,.06) 0%,transparent 60%),linear-gradient(160deg,#060E1A 0%,#040C16 100%)}
.s6{background:radial-gradient(ellipse at 35% 55%,rgba(167,139,250,.05) 0%,transparent 60%),linear-gradient(160deg,#070E1C 0%,#050B17 100%)}
.s7{background:radial-gradient(ellipse at 55% 35%,rgba(245,166,35,.05) 0%,transparent 60%),linear-gradient(160deg,#07101A 0%,#050C18 100%)}
.s8{background:radial-gradient(ellipse at 50% 50%,rgba(0,200,150,.08) 0%,transparent 60%),linear-gradient(160deg,#060C18 0%,#040810 100%)}

/* ── TYPE ── */
.ey{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:var(--teal);margin-bottom:14px}
.h1{font-family:var(--serif);font-size:58px;line-height:1.02;color:var(--w1);margin-bottom:18px}
.h2{font-family:var(--serif);font-size:42px;line-height:1.08;color:var(--w1);margin-bottom:14px}
.h3{font-family:var(--serif);font-size:26px;line-height:1.15;color:var(--w1);margin-bottom:10px}
.body{font-size:15px;line-height:1.7;color:var(--w2)}
.sm{font-size:12px;color:var(--w3);line-height:1.5}
.quote{
  font-family:var(--serif);font-size:22px;line-height:1.45;
  color:var(--w1);font-style:italic;
  border-left:3px solid var(--teal);padding-left:20px;
}

/* ── PILLS ── */
.pill{display:inline-flex;align-items:center;background:var(--teal-lo);border:1px solid var(--teal-b);color:var(--teal);padding:4px 12px;border-radius:100px;font-size:11px;letter-spacing:.2px}
.pill-a{background:var(--amber-lo);border-color:var(--amber-b);color:var(--amber)}
.pill-w{background:rgba(240,242,255,.06);border-color:rgba(240,242,255,.12);color:var(--w2)}
.pillrow{display:flex;gap:8px;flex-wrap:wrap;margin-top:20px}

/* ── BUTTONS ── */
.btn{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--teal);color:#030C0A;
  padding:11px 22px;border-radius:9px;font-size:13px;font-weight:600;
  border:none;cursor:pointer;font-family:var(--sans);margin-top:26px;
  transition:all .2s;letter-spacing:.2px;
}
.btn:hover{background:var(--teal-d);transform:translateY(-1px)}
.btn-o{
  display:inline-flex;align-items:center;gap:8px;
  background:transparent;color:var(--teal);
  border:1px solid rgba(0,200,150,.28);
  padding:10px 20px;border-radius:9px;font-size:13px;
  cursor:pointer;font-family:var(--sans);margin-top:26px;margin-left:10px;
  transition:all .2s;
}
.btn-o:hover{border-color:var(--teal);background:var(--teal-lo)}

/* ── DECORATIVE ELEMENTS ── */
.ring{
  position:absolute;border-radius:50%;
  border:1px solid rgba(0,200,150,.05);
  pointer-events:none;
  animation:spin var(--dur,50s) linear infinite var(--dir,normal);
}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}

.grid-bg{
  position:absolute;inset:0;pointer-events:none;opacity:.025;
  background-image:
    linear-gradient(rgba(0,200,150,1) 1px,transparent 1px),
    linear-gradient(90deg,rgba(0,200,150,1) 1px,transparent 1px);
  background-size:60px 60px;
}

/* ── STAT CARDS ── */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:28px}
.sc{
  background:var(--w4);border:1px solid var(--border);
  border-radius:14px;padding:24px 20px;
  transition:all .25s;
}
.sc:hover{border-color:rgba(0,200,150,.2);background:rgba(0,200,150,.04)}
.sn{font-family:var(--serif);font-size:46px;color:var(--teal);line-height:1;margin-bottom:8px}
.sl{font-size:13px;color:var(--w2);line-height:1.45}
.ss{font-size:10px;color:var(--w3);margin-top:5px}

/* ── THREE STEPS ── */
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:24px}
.step{
  background:var(--w4);border:1px solid var(--border);
  border-radius:14px;padding:26px 22px;
  position:relative;overflow:hidden;
  transition:all .25s;
}
.step:hover{border-color:rgba(0,200,150,.2)}
.step.hi{border-color:rgba(0,200,150,.22);background:rgba(0,200,150,.04)}
.step::after{
  content:attr(data-n);position:absolute;
  bottom:-14px;right:10px;
  font-family:var(--serif);font-size:96px;
  color:rgba(240,242,255,.025);line-height:1;pointer-events:none;
}
.step-ico{
  width:40px;height:40px;border-radius:10px;
  background:rgba(0,200,150,.1);border:1px solid rgba(0,200,150,.2);
  display:flex;align-items:center;justify-content:center;
  margin-bottom:14px;font-size:18px;
}
.step-t{font-size:15px;font-weight:500;color:var(--w1);margin-bottom:7px}

/* ── TWO COLUMN ── */
.two{display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:start;margin-top:18px}

/* ── PRODUCT CARDS ── */
.prod-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:28px}
.pc{
  background:var(--w4);border:1px solid var(--border);
  border-radius:12px;padding:18px 16px;
  transition:all .25s;cursor:default;
}
.pc:hover{background:rgba(240,242,255,.09);border-color:var(--border2);transform:translateY(-2px)}
.pc-dot{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:12px;font-size:14px}
.pc-name{font-size:13px;font-weight:600;color:var(--w1);margin-bottom:5px}
.pc-desc{font-size:11px;color:var(--w3);line-height:1.5}
.pc-tag{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;margin-top:8px}

/* ── SMS DEMO ── */
.phone{
  width:186px;background:#0E1520;
  border-radius:28px;border:1.5px solid rgba(240,242,255,.1);
  padding:10px;flex-shrink:0;
}
.notch{width:50px;height:7px;background:#1A2535;border-radius:3.5px;margin:0 auto 7px}
.ptop{
  background:#172030;border-radius:6px 6px 0 0;
  padding:8px 10px;display:flex;align-items:center;gap:7px;
  border-bottom:1px solid rgba(255,255,255,.05);
}
.pav{
  width:24px;height:24px;border-radius:50%;
  background:linear-gradient(135deg,#00C896,#0070CC);
  display:flex;align-items:center;justify-content:center;
  font-size:9px;font-weight:700;color:#fff;flex-shrink:0;
}
.pname{font-size:10.5px;color:var(--w1);font-weight:500}
.pstat{font-size:8px;color:var(--teal)}
.pmsgs{
  background:#0A1018;border-radius:0 0 6px 6px;
  padding:8px 7px;height:300px;
  display:flex;flex-direction:column;gap:5px;overflow:hidden;
}
.msg{
  padding:7px 10px;border-radius:11px;
  font-size:9.5px;line-height:1.48;max-width:92%;
  opacity:0;transform:translateY(5px);
  transition:opacity .35s ease,transform .35s ease;
}
.msg.show{opacity:1;transform:translateY(0)}
.mp{background:#1D2B3E;color:rgba(240,242,255,.83);align-self:flex-end;border-bottom-right-radius:3px}
.ma{background:rgba(0,200,150,.1);border:1px solid rgba(0,200,150,.18);color:rgba(240,242,255,.83);align-self:flex-start;border-bottom-left-radius:3px}
.ti{display:flex;gap:3px;padding:8px 10px;background:rgba(0,200,150,.08);border-radius:11px;border-bottom-left-radius:3px;width:36px;opacity:0;transition:opacity .3s;align-self:flex-start}
.ti.show{opacity:1}
.td{width:4px;height:4px;border-radius:50%;background:var(--teal);animation:tdp 1.2s ease-in-out infinite}
.td:nth-child(2){animation-delay:.2s}.td:nth-child(3){animation-delay:.4s}
@keyframes tdp{0%,60%,100%{opacity:.3;transform:scale(1)}30%{opacity:1;transform:scale(1.25)}}

/* ── SDOH CARD ── */
.sdoh-result{
  background:rgba(240,242,255,.04);
  border:1px solid rgba(0,200,150,.14);
  border-radius:13px;padding:18px;
  opacity:0;transition:opacity .5s ease;
}
.sdoh-result.show{opacity:1}
.sdoh-h{font-size:9px;text-transform:uppercase;letter-spacing:2px;color:var(--teal);margin-bottom:12px;padding-bottom:9px;border-bottom:1px solid rgba(0,200,150,.1)}
.srow{display:flex;gap:8px;margin-bottom:9px;align-items:flex-start}
.sdot{width:4px;height:4px;border-radius:50%;background:var(--teal);margin-top:4px;flex-shrink:0}
.stxt{color:var(--w2);line-height:1.45;font-size:11.5px}
.sflag{display:inline-flex;align-items:center;background:rgba(0,200,150,.08);border:1px solid rgba(0,200,150,.2);color:var(--teal);font-size:9.5px;padding:4px 10px;border-radius:5px;margin-top:8px}

/* ── ROADMAP ── */
.rmap{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:28px}
.rh{
  background:var(--w4);border:1px solid var(--border);
  border-radius:14px;padding:24px 20px;
  transition:all .25s;
}
.rh:hover{border-color:var(--border2);background:rgba(240,242,255,.09)}
.rh-badge{
  display:inline-flex;align-items:center;gap:6px;
  border:1px solid;border-radius:100px;
  padding:4px 12px 4px 8px;
  font-size:11px;margin-bottom:14px;
}
.rh-dot{width:6px;height:6px;border-radius:50%}
.rh-label{font-size:13px;font-weight:500;color:var(--w1);margin-bottom:8px}
.rh-body{font-size:12px;color:var(--w3);line-height:1.6}
.rh-prods{display:flex;flex-direction:column;gap:5px;margin-top:14px;padding-top:12px;border-top:1px solid var(--border)}
.rh-prod{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--w2)}
.rh-prod-dot{width:4px;height:4px;border-radius:50%;flex-shrink:0}
.rh-arv{font-family:var(--serif);font-size:26px;line-height:1;margin-top:14px}

/* ── METRICS ── */
.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:26px}
.mc{
  background:var(--w4);border:1px solid var(--border);
  border-radius:13px;padding:20px 16px;text-align:center;
  transition:all .25s;
}
.mc:hover{border-color:rgba(0,200,150,.2)}
.mc.hi{border-color:rgba(0,200,150,.24);background:rgba(0,200,150,.04)}
.mn{font-family:var(--serif);font-size:32px;color:var(--teal);margin-bottom:5px}
.ml{font-size:11px;color:var(--w3);line-height:1.45}

/* ── FOUNDER CARD ── */
.founder-card{
  background:rgba(240,242,255,.04);
  border:1px solid rgba(0,200,150,.14);
  border-radius:16px;padding:28px 32px;
  margin-top:28px;
}
.fc-quote{
  font-family:var(--serif);font-size:17px;
  color:var(--w1);line-height:1.6;font-style:italic;
  margin-bottom:18px;
}
.fc-creds{display:flex;flex-wrap:wrap;gap:8px}

/* ── COMPARE ── */
.compare{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:26px}
.comp-card{background:var(--w4);border:1px solid var(--border);border-radius:14px;padding:24px}
.comp-card.them{border-color:rgba(255,107,107,.15);background:rgba(255,107,107,.03)}
.comp-card.us{border-color:rgba(0,200,150,.2);background:rgba(0,200,150,.04)}
.comp-label{font-size:10px;letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;font-weight:500}
.comp-items{display:flex;flex-direction:column;gap:9px}
.ci{display:flex;gap:8px;font-size:13px;color:var(--w2);align-items:flex-start}
.ci-ico{font-size:12px;margin-top:1px;flex-shrink:0}

/* ── FOOT ── */
.foot{margin-top:auto;padding-top:20px;display:flex;justify-content:space-between;align-items:flex-end}

@media(max-width:700px){
  .slide{padding:28px 22px}
  .stats,.steps,.prod-grid,.rmap,.metrics,.compare{grid-template-columns:1fr}
  .two{grid-template-columns:1fr}
  .h1{font-size:38px}.h2{font-size:28px}
  .phone{display:none}
}
</style>
</head>
<body>
<div style="position:fixed;left:12px;bottom:12px;z-index:9999;max-width:380px;background:rgba(5,10,20,.92);border:1px solid rgba(0,200,150,.24);color:rgba(240,242,255,.72);font-family:Arial,sans-serif;font-size:11px;line-height:1.45;padding:10px 12px;border-radius:10px;box-shadow:0 8px 32px rgba(0,0,0,.35)">Prototype demo. Not medical advice. Not a live clinical system. No PHI should be entered on this static GitHub Pages site.</div>

<div class="shell">

<!-- Topbar -->
<div class="topbar">
  <div class="brand">aevo <span class="brand-tagline">care ai</span></div>
  <div class="nav-r">
    <div class="dots" id="dotsEl"></div>
    <span class="snum" id="snm">1 / 8</span>
    <button class="nbtn" onclick="prev()">&#8592;</button>
    <button class="nbtn" onclick="next()">&#8594;</button>
  </div>
</div>
<div class="pbar"><div class="pfill" id="pf" style="width:12.5%"></div></div>

<div class="sw">

<!-- ─── S1: COVER ─── -->
<div class="slide s1 on" id="s1">
  <div class="grid-bg"></div>
  <div class="ring" style="width:500px;height:500px;top:-160px;right:-140px;--dur:60s"></div>
  <div class="ring" style="width:300px;height:300px;top:-60px;right:-40px;--dur:35s;--dir:reverse"></div>

  <div style="max-width:600px;position:relative;z-index:1">
    <div class="ey">Pilot-Stage Preview &nbsp;·&nbsp; 2026</div>
    <div class="h1">Epic helps<br>providers.<br><span style="color:var(--teal)">Aevo helps<br>patients.</span></div>
    <div class="body" style="max-width:460px;margin-top:4px">An AI-assisted communication layer designed to help patients explain medication questions, access barriers, and safety concerns in plain language, then route the right context to the right care team.</div>
    <div class="pillrow">
      <span class="pill">SMS-native</span>
      <span class="pill">App-ready</span>
      <span class="pill pill-a">HIPAA-informed</span>
      <span class="pill pill-w">40+ languages</span>
    </div>
    <div>
      <button class="btn" onclick="next()">See the story &#8594;</button>
      <button class="btn-o" onclick="goTo(7)">View the ask &#8594;</button>
    </div>
  </div>

  <div style="position:absolute;right:60px;bottom:52px;opacity:.07;pointer-events:none">
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="92" stroke="#00C896" stroke-width=".7"/>
      <circle cx="100" cy="100" r="68" stroke="#00C896" stroke-width=".6"/>
      <circle cx="100" cy="100" r="44" stroke="#00C896" stroke-width=".5"/>
      <circle cx="100" cy="100" r="20" stroke="#00C896" stroke-width=".4"/>
      <circle cx="100" cy="100" r="5" fill="#00C896"/>
      <line x1="8" y1="100" x2="192" y2="100" stroke="#00C896" stroke-width=".5"/>
      <line x1="100" y1="8" x2="100" y2="192" stroke="#00C896" stroke-width=".5"/>
      <line x1="35" y1="35" x2="165" y2="165" stroke="#00C896" stroke-width=".4"/>
      <line x1="165" y1="35" x2="35" y2="165" stroke="#00C896" stroke-width=".4"/>
    </svg>
  </div>
</div>

<!-- ─── S2: FOUNDER STORY ─── -->
<div class="slide s2" id="s2">
  <div class="ey">Why we exist</div>
  <div class="h2" style="font-size:36px">Built from the front lines.</div>

  <div class="two" style="gap:42px">
    <div>
      <div class="body" style="max-width:460px">I stood at the pharmacy counter in underserved communities and watched patients arrive with 20 medications they couldn't name, leaving with instructions they didn't understand - feeling like a problem to be managed, not a person to be heard.</div>

      <div class="founder-card">
        <div class="fc-quote">"I've seen what no healthcare access looks like - from the counter of a CVS in an underserved neighborhood to clinics in Africa with Hope Without Borders. The gap isn't clinical. It's communication."</div>
        <div class="fc-creds">
          <span class="pill">Certified Pharm Tech - CVS</span>
          <span class="pill">Genetics degree</span>
          <span class="pill">EQUIPP + CMS Star Ratings</span>
          <span class="pill">PDC / PQA adherence programs</span>
          <span class="pill">Every top US healthcare company</span>
          <span class="pill pill-a">Hope Without Borders - Africa</span>
        </div>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:14px;padding-top:6px">
      <div style="background:var(--w4);border:1px solid var(--border);border-radius:13px;padding:20px">
        <div class="sm" style="color:var(--teal);letter-spacing:2px;text-transform:uppercase;font-size:9px;margin-bottom:10px">The pattern I kept seeing</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div class="ci"><span class="ci-ico">👁️</span><span>Patients with 20+ meds who didn't know what any of them were for</span></div>
          <div class="ci"><span class="ci-ico">🌍</span><span>Communities with zero access to the navigation systems that exist in their own insurance plan</span></div>
          <div class="ci"><span class="ci-ico">📋</span><span>Discharge instructions that confused more than they guided</span></div>
          <div class="ci"><span class="ci-ico">💔</span><span>Patients who stopped trusting the system - and stopped taking their medications</span></div>
        </div>
      </div>
      <div style="background:rgba(0,200,150,.05);border:1px solid var(--teal-b);border-radius:13px;padding:20px">
        <div class="sm" style="color:var(--teal);letter-spacing:2px;text-transform:uppercase;font-size:9px;margin-bottom:10px">The realization</div>
        <div class="body" style="font-size:14px">Providers had Epic. Payers had data platforms. Pharmacies had dispensing systems. <strong style="color:var(--w1)">Nobody had built anything for the patient.</strong></div>
      </div>
    </div>
  </div>

  <div class="foot">
    <div class="sm">Aevo is personal. The problem is structural. The solution is AI.</div>
    <button class="btn" onclick="next()" style="margin-top:0">The problem &#8594;</button>
  </div>
</div>

<!-- ─── S3: PROBLEM ─── -->
<div class="slide s3" id="s3">
  <div class="ey">The problem</div>
  <div class="h2">Care gets lost in<br>translation. Every day.</div>
  <div class="body" style="max-width:580px">Patients speak in plain language. Providers need structured clinical data. Between those two worlds sits confusion, non-adherence, avoidable ADEs, and a patient who feels unheard.</div>

  <div class="stats">
    <div class="sc">
      <div class="sn">50%</div>
      <div class="sl">of prescriptions are never filled or taken as directed</div>
      <div class="ss">NEHI, 2023</div>
    </div>
    <div class="sc">
      <div class="sn">125K</div>
      <div class="sl">preventable deaths per year from medication non-adherence</div>
      <div class="ss">Annals of Internal Medicine</div>
    </div>
    <div class="sc">
      <div class="sn">12%</div>
      <div class="sl">of patients fully understand their discharge care instructions</div>
      <div class="ss">JAMA, 2022</div>
    </div>
  </div>

  <div style="margin-top:24px;background:rgba(255,107,107,.05);border:1px solid rgba(255,107,107,.15);border-radius:14px;padding:22px 26px">
    <div class="sm" style="color:var(--coral);letter-spacing:2px;text-transform:uppercase;font-size:9px;margin-bottom:12px">The Medicare/Medicaid crisis</div>
    <div class="body" style="font-size:14px">The highest-risk patients - Medicare and Medicaid populations - are managing <strong style="color:var(--w1)">10 to 25+ medications</strong> across multiple prescribers who don't talk to each other. They don't know what they're taking, why they're taking it, or what their insurance actually covers. ADEs in this population cost CMS <strong style="color:var(--w1)">$3.5B annually</strong> in preventable spending.</div>
  </div>

  <div class="foot">
    <div class="sm">This isn't a clinical problem. It's a communication problem. AI can solve it.</div>
    <button class="btn" onclick="next()" style="margin-top:0">Our solution &#8594;</button>
  </div>
</div>

<!-- ─── S4: SOLUTION / HOW IT WORKS ─── -->
<div class="slide s4" id="s4">
  <div class="ey">How Aevo works</div>
  <div class="h2" style="font-size:34px">Listen. Translate. Connect.</div>
  <div class="body" style="max-width:560px">Three steps. SMS-first access. Plain-language support. Care-team context when it matters.</div>

  <div class="steps">
    <div class="step" data-n="1">
      <div class="step-ico">💬</div>
      <div class="step-t">Patient speaks naturally</div>
      <div class="sm" style="font-size:13px;color:var(--w2);line-height:1.55">Via SMS or the Aevo app. No forms, no portals, no jargon. Symptoms, questions, concerns, barriers - in their own words, in any language. We ask about their insurance and load what's available to them specifically.</div>
    </div>
    <div class="step hi" data-n="2">
      <div class="step-ico">🧠</div>
      <div class="step-t">AI translates, enriches &amp; connects</div>
      <div class="sm" style="font-size:13px;color:var(--w2);line-height:1.55">Extracts symptoms, flags urgency, checks medication history, identifies ADEs, surfaces SDoH barriers, and maps the patient to every resource their insurance and community actually provides - in under 4 seconds.</div>
    </div>
    <div class="step" data-n="3">
      <div class="step-ico">🤝</div>
      <div class="step-t">Patient is heard. Team can act.</div>
      <div class="sm" style="font-size:13px;color:var(--w2);line-height:1.55">The patient receives clear, plain-language responses with specific next steps. The care team receives a structured clinical brief. Both sides feel supported - not overwhelmed. The original patient voice is always preserved.</div>
    </div>
  </div>

  <div class="foot">
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <span class="pill">Multilingual</span>
      <span class="pill">Insurance-aware</span>
      <span class="pill">EHR integrated</span>
      <span class="pill">ADE detection</span>
      <span class="pill">SDoH navigation</span>
    </div>
    <button class="btn" onclick="next()" style="margin-top:0">See it live &#8594;</button>
  </div>
</div>

<!-- ─── S5: SDOH DEMO ─── -->
<div class="slide s5" id="s5">
  <div class="ey">Product demo &nbsp;·&nbsp; SDoH in action</div>
  <div class="h3" style="margin-bottom:6px">From "I can't make it" to a ride booked - in one text.</div>
  <div class="body" style="font-size:14px;max-width:500px;margin-bottom:20px">The most powerful thing Aevo does isn't translate clinical language. It's connect patients to resources they didn't know they had - through their insurance, their community, and one text message.</div>

  <div class="two" style="gap:28px">
    <div>
      <div class="sm" style="font-size:11px;margin-bottom:10px">Patient channel &nbsp;<span class="pill" style="font-size:10px;padding:3px 9px;vertical-align:middle">SMS</span></div>
      <div class="phone">
        <div class="notch"></div>
        <div class="ptop">
          <div class="pav">A</div>
          <div>
            <div class="pname">Aevo Health</div>
            <div class="pstat">&#9679; Always on</div>
          </div>
        </div>
        <div class="pmsgs" id="smsdemo">
          <div class="msg mp" id="d1">I can't make my appointment tomorrow - I don't have a ride and my daughter is working</div>
          <div class="ti" id="dt1"><div class="td"></div><div class="td"></div><div class="td"></div></div>
          <div class="msg ma" id="d2">I understand - let me check what's available for you. Can you confirm your insurance is still Medicaid through CareSource?</div>
          <div class="msg mp" id="d3">Yes that's right</div>
          <div class="ti" id="dt2"><div class="td"></div><div class="td"></div><div class="td"></div></div>
          <div class="msg ma" id="d4">Good news - your plan covers free rides to medical appointments. Call 1-800-977-3237 and mention your member ID. They can schedule for tomorrow morning. Want me to notify your care team you may need to reschedule?</div>
        </div>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="sm" style="font-size:11px;margin-bottom:0">What Aevo understood &nbsp;<span class="pill" style="font-size:10px;padding:3px 9px;vertical-align:middle">SDoH Z74.09</span></div>
      <div class="sdoh-result" id="sdohcard">
        <div class="sdoh-h">Aevo SDoH Detection - Transportation Barrier</div>
        <div class="srow"><div class="sdot"></div><div class="stxt"><strong style="color:var(--w1)">Z-code flagged:</strong> Z74.09 - Need for assistance with transportation to care</div></div>
        <div class="srow"><div class="sdot"></div><div class="stxt"><strong style="color:var(--w1)">Insurance loaded:</strong> Medicaid - CareSource Ohio (auto-detected from record)</div></div>
        <div class="srow"><div class="sdot"></div><div class="stxt"><strong style="color:var(--w1)">Benefit found:</strong> Non-Emergency Medical Transportation (NEMT) - covered, $0 copay</div></div>
        <div class="srow"><div class="sdot"></div><div class="stxt"><strong style="color:var(--w1)">Resource connected:</strong> CareSource NEMT line - 1-800-977-3237</div></div>
        <div class="srow"><div class="sdot"></div><div class="stxt"><strong style="color:var(--w1)">Care team notified:</strong> Appointment at-risk flag sent to Dr. Patel's dashboard</div></div>
        <div><span class="sflag">Z-code documented in EHR · Referral loop closed</span></div>
      </div>
      <div class="sm" style="font-size:12px;color:var(--w2);padding:14px 16px;background:rgba(0,200,150,.04);border:1px solid var(--teal-b);border-radius:9px">
        This patient didn't know their insurance covered rides. Their pharmacist didn't know either. Aevo knew - because we loaded their plan data and matched it to the barrier they described in plain language.
      </div>
    </div>
  </div>
</div>

<!-- ─── S6: PRODUCT SUITE ─── -->
<div class="slide s6" id="s6">
  <div class="ey">Product suite</div>
  <div class="h2" style="font-size:34px">Five products. One platform.</div>
  <div class="body" style="max-width:580px">Each product is independently valuable. Together they form a moat no one else can build - because they run on longitudinal, conversational patient data that compounds with every interaction.</div>

  <div class="prod-grid">
    <div class="pc">
      <div class="pc-dot" style="background:rgba(0,200,150,.12);border:1px solid rgba(0,200,150,.2)">💬</div>
      <div class="pc-name">Aevo Relay</div>
      <div class="pc-desc">Bidirectional patient ↔ clinical language translation via SMS and app</div>
      <div class="pc-tag" style="color:var(--teal)">H1 · Core</div>
    </div>
    <div class="pc">
      <div class="pc-dot" style="background:rgba(74,158,255,.12);border:1px solid rgba(74,158,255,.2)">💊</div>
      <div class="pc-name">Aevo Rx</div>
      <div class="pc-desc">Medication reconciliation - what patients actually take vs. what's prescribed</div>
      <div class="pc-tag" style="color:#4A9EFF">H1-H2</div>
    </div>
    <div class="pc">
      <div class="pc-dot" style="background:rgba(255,107,107,.1);border:1px solid rgba(255,107,107,.2)">🛡️</div>
      <div class="pc-name">Aevo Shield</div>
      <div class="pc-desc">ADE prevention + passive drug interaction monitoring + readmission risk</div>
      <div class="pc-tag" style="color:var(--coral)">H2</div>
    </div>
    <div class="pc">
      <div class="pc-dot" style="background:rgba(167,139,250,.1);border:1px solid rgba(167,139,250,.2)">📊</div>
      <div class="pc-name">Aevo Intel</div>
      <div class="pc-desc">SDoH capture, Z-code documentation, population health data for payers</div>
      <div class="pc-tag" style="color:#A78BFA">H3</div>
    </div>
    <div class="pc">
      <div class="pc-dot" style="background:rgba(232,184,75,.1);border:1px solid rgba(232,184,75,.2)">🔐</div>
      <div class="pc-name">Aevo Trust</div>
      <div class="pc-desc">Semantic consistency, AI drift detection, fraud signals, immutable audit trail</div>
      <div class="pc-tag" style="color:#E8B84B">H2-H3</div>
    </div>
  </div>

  <!-- Why not Epic -->
  <div class="compare" style="margin-top:22px">
    <div class="comp-card them">
      <div class="comp-label" style="color:var(--coral)">Epic + existing tools</div>
      <div class="comp-items">
        <div class="ci"><span class="ci-ico">✗</span>Built for providers and billing systems</div>
        <div class="ci"><span class="ci-ico">✗</span>Requires portal login, smartphone, digital literacy</div>
        <div class="ci"><span class="ci-ico">✗</span>Doesn't speak the patient's language - literally or figuratively</div>
        <div class="ci"><span class="ci-ico">✗</span>Doesn't know what insurance benefits the patient has</div>
        <div class="ci"><span class="ci-ico">✗</span>Doesn't surface SDoH barriers or connect resources</div>
      </div>
    </div>
    <div class="comp-card us">
      <div class="comp-label" style="color:var(--teal)">Aevo</div>
      <div class="comp-items">
        <div class="ci"><span class="ci-ico">✓</span>Built entirely for the patient's experience and understanding</div>
        <div class="ci"><span class="ci-ico">✓</span>Designed for SMS-first and multilingual workflows</div>
        <div class="ci"><span class="ci-ico">✓</span>Translates patient voice into clinical language - and back</div>
        <div class="ci"><span class="ci-ico">✓</span>Loads each patient's specific insurance benefits automatically</div>
        <div class="ci"><span class="ci-ico">✓</span>Detects and resolves SDoH barriers in real time</div>
      </div>
    </div>
  </div>

  <div class="foot">
    <div class="sm">Aevo doesn't compete with Epic. Aevo fills the gap Epic was never designed to fill.</div>
    <button class="btn" onclick="next()" style="margin-top:0">The roadmap &#8594;</button>
  </div>
</div>

<!-- ─── S7: ROADMAP ─── -->
<div class="slide s7" id="s7">
  <div class="ey">Product roadmap</div>
  <div class="h2" style="font-size:34px">Three horizons.<br>One compounding moat.</div>
  <div class="body" style="max-width:560px">Each horizon is independently fundable - and each one builds the data infrastructure the next one depends on. Start H1 with data pipeline running. Arrive at Series B with the dataset nobody else will ever have.</div>

  <div class="rmap">
    <div class="rh">
      <div class="rh-badge" style="color:var(--teal);border-color:var(--teal-b);background:var(--teal-lo)">
        <span class="rh-dot" style="background:var(--teal)"></span>H1 · Seed $2M
      </div>
      <div class="rh-label">The wedge</div>
      <div class="rh-body">Prove that conversational AI closes the gap between patient language and clinical action. Three health system / independent pharmacy pilots. 200+ patients each. HIPAA-aligned design target.</div>
      <div class="rh-prods">
        <div class="rh-prod"><span class="rh-prod-dot" style="background:var(--teal)"></span>Aevo Relay (SMS + app)</div>
        <div class="rh-prod"><span class="rh-prod-dot" style="background:var(--teal)"></span>Aevo Rx (medication reconciliation)</div>
        <div class="rh-prod"><span class="rh-prod-dot" style="background:var(--teal)"></span>HIPAA alignment / SOC 2 Type I readiness</div>
        <div class="rh-prod"><span class="rh-prod-dot" style="background:var(--teal)"></span>Epic + Cerner FHIR R4 read</div>
      </div>
      <div class="rh-arv" style="color:var(--teal)">$300K ARR</div>
      <div class="sm" style="margin-top:4px">target at close of seed</div>
    </div>
    <div class="rh" style="border-color:rgba(74,158,255,.15);background:rgba(74,158,255,.02)">
      <div class="rh-badge" style="color:#4A9EFF;border-color:rgba(74,158,255,.2);background:rgba(74,158,255,.08)">
        <span class="rh-dot" style="background:#4A9EFF"></span>H2 · Series A $8-12M
      </div>
      <div class="rh-label">The platform</div>
      <div class="rh-body">Provider-side product, ADE prevention, pharmacy distribution, and automated billing documentation. Land-and-expand inside health systems already running Relay pilots.</div>
      <div class="rh-prods">
        <div class="rh-prod"><span class="rh-prod-dot" style="background:#4A9EFF"></span>Aevo Brief (provider dashboard)</div>
        <div class="rh-prod"><span class="rh-prod-dot" style="background:#4A9EFF"></span>Aevo Shield (ADE prevention)</div>
        <div class="rh-prod"><span class="rh-prod-dot" style="background:#4A9EFF"></span>Aevo Trust (platform integrity)</div>
        <div class="rh-prod"><span class="rh-prod-dot" style="background:#4A9EFF"></span>SOC 2 Type II + HITRUST</div>
      </div>
      <div class="rh-arv" style="color:#4A9EFF">$3M ARR</div>
      <div class="sm" style="margin-top:4px">target at Series A close</div>
    </div>
    <div class="rh" style="border-color:rgba(167,139,250,.15);background:rgba(167,139,250,.02)">
      <div class="rh-badge" style="color:#A78BFA;border-color:rgba(167,139,250,.2);background:rgba(167,139,250,.08)">
        <span class="rh-dot" style="background:#A78BFA"></span>H3 · Series B $30M+
      </div>
      <div class="rh-label">The moat</div>
      <div class="rh-body">The data platform nobody else can build. 18+ months of real patient conversational health data, anonymized and structured, sold to payers. Voice modality. International expansion.</div>
      <div class="rh-prods">
        <div class="rh-prod"><span class="rh-prod-dot" style="background:#A78BFA"></span>Aevo Intel (population health data)</div>
        <div class="rh-prod"><span class="rh-prod-dot" style="background:#A78BFA"></span>Aevo Voice (IVR replacement)</div>
        <div class="rh-prod"><span class="rh-prod-dot" style="background:#A78BFA"></span>International (NHS, Canada, Africa)</div>
        <div class="rh-prod"><span class="rh-prod-dot" style="background:#A78BFA"></span>Platform licensing to payers + PBMs</div>
      </div>
      <div class="rh-arv" style="color:#A78BFA">$20M+ ARR</div>
      <div class="sm" style="margin-top:4px">target at Series B close</div>
    </div>
  </div>

  <div class="foot">
    <div class="sm">First pilot targets: independent pharmacy owners + healthcare companies running EQUIPP.</div>
    <button class="btn" onclick="next()" style="margin-top:0">The ask &#8594;</button>
  </div>
</div>

<!-- ─── S8: ASK / CTA ─── -->
<div class="slide s8" id="s8">
  <div class="ring" style="width:400px;height:400px;bottom:-140px;left:-100px;--dur:65s;--dir:reverse"></div>

  <div class="ey">Traction &amp; the ask</div>
  <div class="h2" style="font-size:36px">A once-in-a-decade<br>inflection point.</div>
  <div class="body" style="max-width:560px">Value-based care, AI-native tooling, and a Medicare population that is finally being failed loudly enough that payers and health systems are desperate to act. The window is now.</div>

  <div class="metrics">
    <div class="mc">
      <div class="mn">$48B</div>
      <div class="ml">Total addressable market - patient communication platforms (US)</div>
    </div>
    <div class="mc">
      <div class="mn">230M</div>
      <div class="ml">US patients managing chronic conditions requiring pharmacy coordination</div>
    </div>
    <div class="mc hi">
      <div class="mn">Target</div>
      <div class="ml">Medication adherence lift in early pilot - 200 patients, 90 days</div>
    </div>
    <div class="mc hi">
      <div class="mn">$2M</div>
      <div class="ml">Seed round - HIPAA alignment, 3 health system pilots, 18-month runway</div>
    </div>
  </div>

  <!-- Use of funds -->
  <div style="margin-top:22px;background:var(--w4);border:1px solid var(--border);border-radius:14px;padding:22px 26px">
    <div class="sm" style="color:var(--teal);letter-spacing:2.5px;text-transform:uppercase;font-size:9px;margin-bottom:14px">Use of $2M seed</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
      <div>
        <div style="font-family:var(--serif);font-size:22px;color:var(--teal);margin-bottom:4px">40%</div>
        <div class="sm" style="font-size:12px;color:var(--w2)">Product + engineering - Relay MVP and HIPAA-aligned infrastructure</div>
      </div>
      <div>
        <div style="font-family:var(--serif);font-size:22px;color:var(--teal);margin-bottom:4px">25%</div>
        <div class="sm" style="font-size:12px;color:var(--w2)">Compliance - SOC 2 Type I, BAA framework, Vanta, pen testing</div>
      </div>
      <div>
        <div style="font-family:var(--serif);font-size:22px;color:var(--teal);margin-bottom:4px">20%</div>
        <div class="sm" style="font-size:12px;color:var(--w2)">Pilot operations - onboarding, clinical review staff, EHR integrations</div>
      </div>
      <div>
        <div style="font-family:var(--serif);font-size:22px;color:var(--teal);margin-bottom:4px">15%</div>
        <div class="sm" style="font-size:12px;color:var(--w2)">Team - founding engineer, clinical advisor, legal</div>
      </div>
    </div>
  </div>

  <div class="foot">
    <div>
      <div class="sm" style="font-size:12px;margin-bottom:8px">Ready to put something in the patient's corner?</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn" onclick="goTo(0)" style="margin-top:0">Back to start</button>
        <button class="btn-o" onclick="goTo(1)" style="margin-top:0">Our story &#8594;</button>
      </div>
    </div>
    <div style="text-align:right">
      <div class="sm" style="font-size:11px;color:var(--w3)">aevo.health &nbsp;·&nbsp; hello@aevo.health</div>
      <div class="sm" style="font-size:11px;color:var(--w3);margin-top:3px">Prototype preview · 2026</div>
    </div>
  </div>
</div>

</div><!-- /sw -->
</div><!-- /shell -->

<script>
const N=8;
let c=0;
const slides=Array.from({length:N},(_,i)=>document.getElementById('s'+(i+1)));
const dotsEl=document.getElementById('dotsEl');
const pf=document.getElementById('pf');
const snm=document.getElementById('snm');

for(let i=0;i<N;i++){
  const d=document.createElement('button');
  d.className='dot'+(i===0?' on':'');
  d.onclick=()=>goTo(i);
  d.title='Slide '+(i+1);
  dotsEl.appendChild(d);
}

function goTo(n){
  if(n===c||n<0||n>=N)return;
  slides[c].classList.remove('on');
  c=n;
  slides[c].classList.add('on');
  document.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('on',i===c));
  pf.style.width=((c+1)/N*100)+'%';
  snm.textContent=(c+1)+' / '+N;
  if(c===4)startSDoHDemo();
}
function next(){goTo(c+1)}
function prev(){goTo(c-1)}

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key==='ArrowDown')next();
  if(e.key==='ArrowLeft'||e.key==='ArrowUp')prev();
});

let sdohGo=false;
function startSDoHDemo(){
  if(sdohGo)return; sdohGo=true;
  const seq=[
    {id:'d1',d:400},
    {id:'dt1',d:1100,ti:1},
    {id:'d2',d:2300,ht:'dt1'},
    {id:'d3',d:3200},
    {id:'dt2',d:4000,ti:1},
    {id:'d4',d:5300,ht:'dt2'}
  ];
  seq.forEach(({id,d,ti,ht})=>{
    setTimeout(()=>{
      if(ht)document.getElementById(ht).classList.remove('show');
      document.getElementById(id).classList.add('show');
    },d);
  });
  setTimeout(()=>{
    document.getElementById('sdohcard').classList.add('show');
  },6200);
}

// Touch swipe
let tx=0;
document.querySelector('.sw').addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
document.querySelector('.sw').addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-tx;
  if(Math.abs(dx)>50)dx<0?next():prev();
},{passive:true});
</script>
</body>
</html>
