import localFont from "next/font/local";

/**
 * Единственный сийм для шрифтов сайта.
 *
 * Направление «технический минимализм»: одна гарнитура — Manrope (self-hosted,
 * без Google Fonts CDN ни в билде, ни в рантайме). Иерархия строится размером и
 * весом (400 — текст, 500 — заголовки), а не второй гарнитурой. Роль моноширинного
 * (метки, цены, тех-детали) закрывает системный стек — см. --font-mono в globals.css,
 * файл шрифта под него не нужен.
 *
 * next/font/local хеширует и раздаёт woff2 сам, инлайнит @font-face и подставляет
 * fallback-метрики (защита от layout shift). Имя переменной привязано к гарнитуре
 * (--font-manrope), роль --font-sans задаёт тема в globals.css.
 */
export const fontSans = localFont({
  src: [
    { path: "../fonts/manrope-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/manrope-medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

/** Классы для <html> — подключают переменную гарнитуры. */
export const fontVariables = fontSans.variable;
