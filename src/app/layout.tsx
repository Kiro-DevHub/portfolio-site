import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name}, ${site.role}`,
  description:
    "Full-stack разработка под задачу бизнеса: сайты, Telegram-боты, базы данных и интеграции. Не шаблоны с конструктора.",
};

export const viewport: Viewport = {
  themeColor: "#0b1018",
};

// Ставит .js на <html> до первой отрисовки: reveal-анимация прячет контент только
// при живом JS (см. globals.css). Без JS страница видна целиком.
const jsFlag = `document.documentElement.classList.add('js')`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-fg"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
