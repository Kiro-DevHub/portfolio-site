#!/usr/bin/env python3
"""Сверяет весь видимый текст сайта с cmap ужатых шрифтов.

Страховка к scripts/subset-fonts.py: сабсет режет глифы, и потерю легко не
заметить глазом — символ просто уедет в фолбэчный шрифт или в тофу. Скрипт
обходит собранные страницы, собирает текст в разрезе гарнитур и проверяет,
что каждый символ есть в соответствующем woff2.

    python scripts/subset-fonts.py
    npm run build && <сервер над out/ на 127.0.0.1:3000>
    python scripts/check-glyphs.py

Символы, которых нет в ИСХОДНЫХ гарнитурах (₽, →), отмечаются отдельно: их
рисует системный фолбэк, и сабсет тут ни при чём.
"""
import sys
from pathlib import Path

try:
    from fontTools.ttLib import TTFont
    from playwright.sync_api import sync_playwright
except ImportError:
    sys.exit("нужны fonttools и playwright: pip install fonttools brotli playwright")

BASE = "http://127.0.0.1:3000"
PAGES = ["/", "/case/maison", "/nope"]
FONTS_DIR = Path(__file__).resolve().parent.parent / "src" / "lib" / "fonts"

# Имя гарнитуры в computed style -> файлы, которые её рисуют.
FONT_MAP = {
    "fontDisplay": ["unbounded-300.woff2", "unbounded-600.woff2"],
    "fontBody": ["golos-400.woff2", "golos-500.woff2"],
}

# Символов нет в ИСХОДНЫХ гарнитурах (проверено на файлах до сабсета) — их всегда
# рисовал системный фолбэк. Сабсет к ним отношения не имеет, ругаться незачем.
# ₽ на странице цен рисуется не Golos'ом — если однажды поменяем гарнитуру на
# такую, где рубль есть, эту строку надо убрать.
KNOWN_FALLBACK = {0x20BD, 0x2192}

COLLECT = """() => {
  const out = {};
  for (const el of document.querySelectorAll('*')) {
    if (['SCRIPT','STYLE','NOSCRIPT'].includes(el.tagName)) continue;
    const fam = getComputedStyle(el).fontFamily.split(',')[0].replace(/"/g,'').trim();
    for (const c of el.childNodes) {
      if (c.nodeType === 3 && c.textContent.trim()) out[fam] = (out[fam] || '') + c.textContent;
    }
  }
  return out;
}"""


def main() -> int:
    collected: dict[str, set[str]] = {}
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        page = b.new_page(viewport={"width": 1440, "height": 900})
        for path in PAGES:
            page.goto(BASE + path, wait_until="networkidle")
            page.wait_for_timeout(600)
            for fam, txt in page.evaluate(COLLECT).items():
                collected.setdefault(fam, set()).update(txt)
        b.close()

    failed = False
    for fam, files in FONT_MAP.items():
        chars = {c for c in collected.get(fam, set()) if c.strip() and ord(c) > 32}
        if not chars:
            print(f"⚠ {fam}: на страницах не нашлось текста этой гарнитурой")
            continue
        for name in files:
            cmap = TTFont(FONTS_DIR / name).getBestCmap()
            missing = {c for c in chars if ord(c) not in cmap}
            # Отделяем «сабсет виноват» от «в гарнитуре их и не было».
            broke = sorted(c for c in missing if ord(c) not in KNOWN_FALLBACK)
            fallback = sorted(c for c in missing if ord(c) in KNOWN_FALLBACK)

            if broke:
                print(f"✗ {name:<22} сабсет вырезал: " +
                      " ".join(f"{m}(U+{ord(m):04X})" for m in broke))
                failed = True
            else:
                note = ""
                if fallback:
                    note = " (из фолбэка, в гарнитуре их нет: " + " ".join(fallback) + ")"
                print(f"✓ {name:<22} покрывает все {len(chars) - len(fallback)} символов{note}")

    if failed:
        print("\nСабсет режет символы, которые есть на страницах. Поправь UNICODES "
              "в scripts/subset-fonts.py и пересобери шрифты.")
        return 1
    print("\nВсе символы сайта покрыты.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
