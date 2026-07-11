import { Manrope } from "next/font/google";

/**
 * Единственный сийм для шрифтов сайта.
 *
 * Manrope как переменный шрифт через next/font/google: Next скачивает и
 * САМОХОСТИТ его на этапе билда (сабсет latin+cyrillic), в рантайме запросов к
 * Google Fonts CDN нет — это разрешено CLAUDE.md. Переменная ось даёт весь
 * диапазон весов (нужен контраст 300 ↔ 700/800), роль --font-sans задаёт тема.
 */
export const fontSans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

/** Классы для <html> — подключают переменную гарнитуры. */
export const fontVariables = fontSans.variable;
