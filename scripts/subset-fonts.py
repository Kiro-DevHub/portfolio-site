#!/usr/bin/env python3
"""Ужимает woff2 сайта до реально нужного набора символов.

Запускается РУКАМИ и только при замене файлов шрифтов — в сборку не входит:
в src/lib/fonts/ уже лежат готовые ужатые файлы, next/font/local берёт их как есть.

    pip install fonttools brotli
    python scripts/subset-fonts.py

Что выкидываем: latin-ext (диакритика европейских языков) и греческий — контент
сайта только русский плюс латинские названия («Telegram», «Next.js»), базовой
латиницы для них достаточно. Кириллица оставлена целиком: контент кейсов ещё
будет дописываться, ловить тофу на новой букве — не вариант.

Даёт ~70% на файл (283 KB -> 81 KB на все четыре начертания).

ВАЖНО: после прогона проверить, что ни один символ сайта не потерялся —
scripts/check-glyphs.py поднимает страницы и сверяет весь видимый текст с cmap.
"""
import sys
from pathlib import Path

try:
    from fontTools import subset
except ImportError:
    sys.exit("нужен fonttools: pip install fonttools brotli")

FONTS_DIR = Path(__file__).resolve().parent.parent / "src" / "lib" / "fonts"

# Кириллица целиком (0400-04FF) + базовая латиница + пунктуация, валюты, номер,
# стрелки и геометрия — всё, что встречается в тексте, набранном веб-шрифтом.
UNICODES = ",".join([
    "U+0020-007E",       # базовая латиница, цифры, знаки
    "U+00A0",            # неразрывный пробел
    "U+00A9",            # ©
    "U+00AB,U+00BB",     # « »
    "U+00B7",            # · — разделитель в строке метрик
    "U+00D7",            # ×
    "U+0400-04FF",       # кириллица целиком, включая ё
    "U+2010-2015",       # дефисы и тире
    "U+2018-201F",       # кавычки
    "U+2020-2022",       # † ‡ •
    "U+2026",            # …
    "U+2030",            # ‰
    "U+2039,U+203A",     # ‹ ›
    "U+20AC",            # €
    "U+20BD",            # ₽ (в этих гарнитурах его нет — берётся из фолбэка)
    "U+2116",            # №
    "U+2122",            # ™
    "U+2190-2193",       # ← ↑ → ↓
    "U+25A0-25FF",       # геометрические фигуры
])

FILES = ["golos-400.woff2", "golos-500.woff2", "unbounded-300.woff2", "unbounded-600.woff2"]

def main() -> int:
    total_before = total_after = 0
    for name in FILES:
        path = FONTS_DIR / name
        if not path.exists():
            print(f"✗ нет файла: {path}")
            return 1
        before = path.stat().st_size
        subset.main([
            str(path),
            f"--unicodes={UNICODES}",
            f"--output-file={path}",
            "--flavor=woff2",
            "--layout-features=*",
            "--no-hinting",
            "--desubroutinize",
        ])
        after = path.stat().st_size
        total_before += before
        total_after += after
        print(f"{name:<22} {before/1024:6.1f} KB -> {after/1024:6.1f} KB  (-{round((1-after/before)*100)}%)")

    print(f"\nИтого: {total_before/1024:.1f} KB -> {total_after/1024:.1f} KB "
          f"(экономия {(total_before-total_after)/1024:.1f} KB)")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
