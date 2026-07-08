/* Orivo light/dark theme system — pairs with orivo-theme.js
   Dark is the default (tokens defined per-page). This file overrides
   the shared token set when <html data-theme="light"> is set. */

[data-theme="light"]{
  --bg:#F5F8FC;
  --bg2:#EDF2F9;
  --panel:#FFFFFF;
  --border:rgba(10,20,38,.12);
  --border-hi:rgba(10,20,38,.20);
  --text:#0A1426;
  --dim:#42506E;
  --faint:#7A849E;
  --teal:#008A67;
  --teal-d:#00745A;
  --teal-lo:rgba(0,158,117,.10);
  --teal-b:rgba(0,138,103,.30);
  --blue:#1565C0;
  --amber:#9A6400;
  --amber-lo:rgba(245,166,35,.14);
  --amber-b:rgba(154,100,0,.32);
  --coral:#C43D3D;
  --coral-lo:rgba(255,107,107,.12);
  --coral-b:rgba(196,61,61,.30);
  --vera:#5B4EA8;
  --vera-lo:rgba(124,111,205,.12);
  --vera-b:rgba(91,78,168,.30);
}
[data-theme="light"] body{background:var(--bg);color:var(--text)}
[data-theme="light"] .nav{background:rgba(245,248,252,.88)}
[data-theme="light"] .hero,
[data-theme="light"] .cta-block{background:
  radial-gradient(820px 400px at 10% -10%, rgba(0,158,117,.10), transparent 60%),
  radial-gradient(720px 400px at 95% 0%, rgba(21,101,192,.08), transparent 60%),
  var(--bg)}
[data-theme="light"] .triage,
[data-theme="light"] .scorecard{background:#FFFFFF;box-shadow:0 18px 48px rgba(10,20,38,.10)}
[data-theme="light"] .nav-cta{color:#FFFFFF;background:var(--teal-d)}
[data-theme="light"] .btn-solid{color:#FFFFFF;background:var(--teal-d)}
[data-theme="light"] .msg-btn,[data-theme="light"] .rail,
[data-theme="light"] .commit,[data-theme="light"] .tag,
[data-theme="light"] .step-box{background:rgba(10,20,38,.03)}

/* toggle button (injected by orivo-theme.js) */
.theme-toggle{
  background:none;border:1px solid var(--border);color:var(--dim);
  width:34px;height:34px;border-radius:9px;cursor:pointer;font-size:15px;
  display:inline-flex;align-items:center;justify-content:center;
  transition:border-color .2s,color .2s;flex-shrink:0;
}
.theme-toggle:hover{border-color:var(--teal-b);color:var(--text)}
