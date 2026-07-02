#!/usr/bin/env python3
"""
Orivo site patch — run from the repo root on your machine.

Does three things:
  1. index.html footer: removes Investors / Pitch deck / Careers links,
     adds "Pilot program" under Company.
  2. index.html nav (desktop + mobile): adds "Pilot program" link.
  3. Archives why-invest.html and pitch-deck.html into _archive/
     and injects <meta name="robots" content="noindex, nofollow"> into each.

Idempotent: safe to run twice. Validates every replacement before writing.
"""

import os
import shutil
import sys

FAILS = []


def replace_once(path: str, old: str, new: str, label: str) -> None:
    with open(path, encoding="utf-8") as f:
        html = f.read()
    count = html.count(old)
    if count == 0 and (not new or new in html):
        print(f"  ~ {label}: already applied, skipping")
        return
    if count != 1:
        FAILS.append(f"{label}: expected 1 match in {path}, found {count}")
        print(f"  ✗ {label}: expected 1 match, found {count} — NOT changed")
        return
    with open(path, "w", encoding="utf-8") as f:
        f.write(html.replace(old, new))
    print(f"  ✓ {label}")


# ── 1. Footer: strip investor links, add Pilot program ──────────────
print("index.html footer:")
OLD_COMPANY = (
    '<div class="foot-h">Company</div>'
    '<a href="/evidence.html">Evidence</a>'
    '<a href="/why-invest.html">Investors</a>'
    '<a href="/pitch-deck.html">Pitch deck</a>'
    '<a href="/careers.html">Careers</a>'
)
NEW_COMPANY = (
    '<div class="foot-h">Company</div>'
    '<a href="/evidence.html">Evidence</a>'
    '<a href="/pharmacy-pilot.html">Pilot program</a>'
)
replace_once("index.html", OLD_COMPANY, NEW_COMPANY, "footer Company column")

# ── 2. Nav: add Pilot program (desktop + mobile share the pattern) ──
def replace_n(path, old, new, expected, label):
    with open(path, encoding="utf-8") as f:
        html = f.read()
    if new in html:
        print(f"  ~ {label}: already applied, skipping")
        return
    count = html.count(old)
    if count != expected:
        FAILS.append(f"{label}: expected {expected} matches in {path}, found {count}")
        print(f"  ✗ {label}: expected {expected}, found {count} — NOT changed")
        return
    with open(path, "w", encoding="utf-8") as f:
        f.write(html.replace(old, new))
    print(f"  ✓ {label} ({count} occurrences)")


print("index.html nav:")
OLD_NAV = '<a href="/vision.html">Vision</a><a href="/evidence.html">Evidence</a>'
NEW_NAV = (
    '<a href="/pharmacy-pilot.html">Pilot program</a>'
    '<a href="/vision.html">Vision</a><a href="/evidence.html">Evidence</a>'
)
replace_n("index.html", OLD_NAV, NEW_NAV, 2, "nav Pilot link (desktop + mobile)")

# Remove the dead Careers link from the mobile menu.
replace_once(
    "index.html",
    '<a href="/careers.html">Careers</a>',
    "",
    "mobile menu dead Careers link removed",
)

# ── 3. Archive investor pages with noindex ──────────────────────────
print("archive:")
os.makedirs("_archive", exist_ok=True)
NOINDEX = '<meta name="robots" content="noindex, nofollow">'
for page in ("why-invest.html", "pitch-deck.html"):
    if not os.path.exists(page):
        if os.path.exists(f"_archive/{page}"):
            print(f"  ~ {page}: already archived, skipping")
        else:
            print(f"  ✗ {page}: not found anywhere")
            FAILS.append(f"{page} missing")
        continue
    with open(page, encoding="utf-8") as f:
        html = f.read()
    if NOINDEX not in html:
        if "<head>" in html:
            html = html.replace("<head>", f"<head>\n{NOINDEX}", 1)
        else:
            FAILS.append(f"{page}: no <head> tag found for noindex injection")
            print(f"  ✗ {page}: no <head> tag")
            continue
    with open(f"_archive/{page}", "w", encoding="utf-8") as f:
        f.write(html)
    os.remove(page)
    print(f"  ✓ {page} → _archive/{page} (+noindex)")

# ── result ───────────────────────────────────────────────────────────
print()
if FAILS:
    print("COMPLETED WITH ISSUES — review before committing:")
    for f in FAILS:
        print(" -", f)
    sys.exit(1)
print("All patches applied cleanly. Review with `git diff`, then commit.")
