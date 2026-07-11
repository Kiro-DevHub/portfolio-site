import localFont from "next/font/local";

/**
 * Единственный сийм для шрифтов сайта.
 *
 * Файлы self-hosted (src/fonts/*.woff2) — никакого Google Fonts CDN ни в билде,
 * ни в рантайме. next/font/local хеширует и раздаёт их сам, инлайнит @font-face
 * и подставляет fallback-метрики (защита от layout shift).
 *
 * ВРЕМЕННЫЙ выбор семейств (Manrope + Cormorant, унаследованы от кейса MAISON) —
 * плейсхолдер до утверждения визуального направления на этапе дизайна. Чтобы
 * сменить шрифты, достаточно заменить файлы и правки в ЭТОМ файле; страницы и
 * стили тянут семейства через CSS-переменные --font-sans / --font-display.
 */

// Имена CSS-переменных намеренно привязаны к семействам (--font-manrope,
// --font-cormorant), а не к ролям (--font-sans). Роли задаёт тема в globals.css,
// маппингом --font-sans → var(--font-manrope). Так исключена самоссылка при
// смене шрифтов и роль отвязана от конкретного семейства.
export const fontSans = localFont({
  src: [
    { path: "../fonts/manrope-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/manrope-medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

export const fontDisplay = localFont({
  src: [
    { path: "../fonts/cormorant-medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/** Готовая строка классов для <html> — подключает обе переменные разом. */
export const fontVariables = `${fontSans.variable} ${fontDisplay.variable}`;
