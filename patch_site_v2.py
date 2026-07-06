#!/usr/bin/env python3
"""
Orivo site patch v2 — run from the repo root AFTER patch_site.py.

Does two things:
  1. Archives etl-pipeline.html into _archive/ with a noindex tag
     (the page is an orphan — nothing on the site links to it — and its
     simulated integrations are replaced by the rewritten dual-pipeline.html).
  2. walkthrough.html nav: replaces the dead pitch-deck link
     (archived by patch_site.py) with a link to the pilot program page.

Idempotent: safe to run twice.
NOTE: the rewritten dual-pipeline.html and engineering-stack.html are
full-file replacements — just copy them over the old files before committing.
"""

import os
import sys

FAILS = []


def replace_once(path: str, old: str, new: str, label: str) -> None:
    if not os.path.exists(path):
        FAILS.append(f"{label}: {path} not found")
        print(f"  ✗ {label}: {path} not found")
        return
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


# ── 1. Archive etl-pipeline.html with noindex ────────────────────────
print("archive:")
os.makedirs("_archive", exist_ok=True)
NOINDEX = '<meta name="robots" content="noindex, nofollow">'
page = "etl-pipeline.html"
if not os.path.exists(page):
    if os.path.exists(f"_archive/{page}"):
        print(f"  ~ {page}: already archived, skipping")
    else:
        print(f"  ✗ {page}: not found anywhere")
        FAILS.append(f"{page} missing")
else:
    with open(page, encoding="utf-8") as f:
        html = f.read()
    if NOINDEX not in html:
        if "<head>" in html:
            html = html.replace("<head>", f"<head>\n{NOINDEX}", 1)
        else:
            FAILS.append(f"{page}: no <head> tag found")
            print(f"  ✗ {page}: no <head> tag")
            sys.exit(1)
    with open(f"_archive/{page}", "w", encoding="utf-8") as f:
        f.write(html)
    os.remove(page)
    print(f"  ✓ {page} → _archive/{page} (+noindex)")

# ── 2. walkthrough.html: fix dead Deck link ──────────────────────────
print("walkthrough.html nav:")
replace_once(
    "walkthrough.html",
    '<a href="/pitch-deck.html">Deck</a>',
    '<a href="/pharmacy-pilot.html">Pilot</a>',
    "Deck link → Pilot program",
)

print()
if FAILS:
    print("COMPLETED WITH ISSUES — review before committing:")
    for f in FAILS:
        print(" -", f)
    sys.exit(1)
print("All patches applied cleanly. Copy the rewritten dual-pipeline.html")
print("and engineering-stack.html over the old files, review `git diff`, commit.")
