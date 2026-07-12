import localFont from "next/font/local";

/**
 * Единственный сийм для шрифтов сайта. Пара: Unbounded (заголовки) × Golos Text
 * (тело). Оба self-hosted через next/font/local — woff2 лежат рядом, в рантайме
 * запросов к CDN нет (разрешено CLAUDE.md).
 *
 * Начертания сведены к нужным: display 300 + 600, body 400 + 500. Каждый файл
 * несёт полную кириллицу И латиницу (сабсет latin+cyrillic, инстансированный
 * вес), поэтому латинские вставки (Telegram, React, PostgreSQL) не проваливаются
 * в системный фолбэк. Роли --font-sans / --font-display выставляет тема.
 */

/** Тело — Golos Text: 400 (обычный) и 500 (medium). */
export const fontBody = localFont({
  src: [
    { path: "./fonts/golos-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/golos-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-golos",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

/** Заголовки — Unbounded: 300 (лёгкий контраст) и 600 (основной вес display). */
export const fontDisplay = localFont({
  src: [
    { path: "./fonts/unbounded-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/unbounded-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-unbounded",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

/** Классы для <html> — подключают обе переменные гарнитур. */
export const fontVariables = `${fontBody.variable} ${fontDisplay.variable}`;
