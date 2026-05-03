export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);

  const configuredPassword = context.env.ENGINEERING_STACK_PASSWORD;

  if (!configuredPassword) {
    return new Response(
      renderAccessError('Engineering stack access is not configured yet.', 'Set ENGINEERING_STACK_PASSWORD in Cloudflare Pages environment variables.'),
      {
        status: 503,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
          'x-robots-tag': 'noindex, nofollow, noarchive'
        }
      }
    );
  }

  if (request.method === 'POST') {
    const form = await request.formData();
    const password = String(form.get('password') || '');

    if (safeEqual(password, configuredPassword)) {
      const response = await context.next();
      const headers = new Headers(response.headers);
      headers.set('cache-control', 'private, no-store, no-cache, must-revalidate, max-age=0');
      headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
      headers.set('set-cookie', makeAccessCookie(request, configuredPassword));
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    return new Response(renderPasswordPage({ error: 'Incorrect password. Try again.' }), {
      status: 401,
      headers: secureHeaders()
    });
  }

  const cookie = request.headers.get('cookie') || '';
  const expectedToken = await makeToken(configuredPassword);

  if (cookie.includes(`orivo_stack_access=${expectedToken}`)) {
    const response = await context.next();
    const headers = new Headers(response.headers);
    headers.set('cache-control', 'private, no-store, no-cache, must-revalidate, max-age=0');
    headers.set('x-robots-tag', 'noindex, nofollow, noarchive');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }

  return new Response(renderPasswordPage({ error: '' }), {
    status: 401,
    headers: secureHeaders()
  });
}

function secureHeaders() {
  return {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
    'x-robots-tag': 'noindex, nofollow, noarchive',
    'referrer-policy': 'no-referrer',
    'x-content-type-options': 'nosniff'
  };
}

async function makeAccessCookie(request, password) {
  const token = await makeToken(password);
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `orivo_stack_access=${token}; Path=/engineering-stack.html; HttpOnly; SameSite=Lax${secure}; Max-Age=21600`;
}

async function makeToken(password) {
  const input = new TextEncoder().encode(`orivo-engineering-stack:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', input);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

function renderPasswordPage({ error }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Protected | Orivo Health Engineering Stack</title>
<meta name="robots" content="noindex,nofollow,noarchive">
<link rel="stylesheet" href="https://unpkg.com/@fontsource/dm-serif-display@5.0.16/index.css">
<link rel="stylesheet" href="https://unpkg.com/@fontsource/dm-sans@5.0.17/index.css">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--teal:#00C896;--teal-d:#009E75;--teal-lo:rgba(0,200,150,.1);--teal-b:rgba(0,200,150,.26);--w1:#F0F2FF;--w2:rgba(240,242,255,.72);--w3:rgba(240,242,255,.36);--w4:rgba(240,242,255,.06);--border:rgba(240,242,255,.1);--bg:#050A14;--bg2:#07101A;--serif:'DM Serif Display',Georgia,serif;--sans:'DM Sans','Helvetica Neue',Arial,sans-serif}
html,body{min-height:100vh;background:radial-gradient(ellipse at 70% 30%,rgba(0,200,150,.12),transparent 55%),linear-gradient(160deg,#07101A 0%,#050A14 100%);font-family:var(--sans);color:var(--w2)}
body{display:grid;place-items:center;padding:28px;overflow:hidden}
.card{width:min(440px,100%);background:rgba(5,10,20,.72);border:1px solid var(--border);box-shadow:0 28px 90px rgba(0,0,0,.55);backdrop-filter:blur(18px);border-radius:22px;padding:32px;position:relative;overflow:hidden}
.card:before{content:'';position:absolute;inset:-1px;background:linear-gradient(135deg,rgba(0,200,150,.18),transparent 35%,rgba(124,111,205,.12));pointer-events:none;opacity:.8}
.inner{position:relative;z-index:1}.brand{font-family:var(--serif);font-size:22px;color:var(--teal);letter-spacing:-.3px;margin-bottom:26px}.ey{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--teal);margin-bottom:10px}.h{font-family:var(--serif);font-size:34px;line-height:1.04;color:var(--w1);margin-bottom:12px}.sub{font-size:14px;line-height:1.65;color:var(--w3);margin-bottom:24px}.field{display:flex;flex-direction:column;gap:8px;margin-bottom:14px}label{font-size:12px;color:var(--w3)}input{width:100%;background:var(--w4);border:1px solid var(--border);border-radius:11px;padding:13px 14px;color:var(--w1);font:inherit;outline:none}input:focus{border-color:var(--teal-b);box-shadow:0 0 0 4px rgba(0,200,150,.08)}button{width:100%;border:0;border-radius:11px;background:var(--teal);color:#03100C;font-weight:800;padding:13px 18px;font:inherit;cursor:pointer;transition:.2s}button:hover{background:var(--teal-d);transform:translateY(-1px)}.err{min-height:20px;font-size:12px;color:#FF8A8A;margin:8px 0 4px}.note{margin-top:18px;padding-top:16px;border-top:1px solid var(--border);font-size:11px;line-height:1.5;color:var(--w3)}
</style>
</head>
<body>
  <main class="card">
    <div class="inner">
      <div class="brand">orivo health</div>
      <div class="ey">Restricted page</div>
      <h1 class="h">Engineering stack access</h1>
      <p class="sub">This page contains internal planning assumptions and should not be indexed or shared publicly.</p>
      <form method="post" autocomplete="off">
        <div class="field">
          <label for="password">Password</label>
          <input id="password" name="password" type="password" required autofocus>
        </div>
        <div class="err">${escapeHtml(error)}</div>
        <button type="submit">Unlock page</button>
      </form>
      <p class="note">Access expires after 6 hours on this browser. This protects the public page at the edge when deployed through Cloudflare Pages.</p>
    </div>
  </main>
</body>
</html>`;
}

function renderAccessError(title, body) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Configuration Needed</title><meta name="robots" content="noindex,nofollow"></head><body style="font-family:Arial,sans-serif;background:#050A14;color:#F0F2FF;padding:40px"><h1>${escapeHtml(title)}</h1><p>${escapeHtml(body)}</p></body></html>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\'': '&#39;', '"': '&quot;' }[char]));
}
