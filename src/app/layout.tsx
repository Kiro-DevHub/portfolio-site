import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

const homeTitle = "Кирилл — full-stack разработчик на фрилансе в Ростове-на-Дону";
const homeDescription =
  "Full-stack разработчик из Ростова-на-Дону: закажите сайт под задачу бизнеса или Telegram-бота под ключ. Вёрстка, серверная логика, база данных — без конструкторов и агентств.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: `%s · ${site.name} — full-stack разработчик`,
  },
  description: homeDescription,
  openGraph: {
    type: "website",
    locale: site.ogLocale,
    url: site.url,
    siteName: site.ogSiteName,
    title: homeTitle,
    description: homeDescription,
    images: [{ ...site.ogImage, alt: homeTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [site.ogImage.url],
  },
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
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/_next/static/media/b7b70529995c26c0-s.p.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/_next/static/media/7cded29a2b1647c1-s.p.woff2"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        {/* Цель — #main, который есть на каждой странице. Раньше вела на #top:
            он живёт только в хиро главной, поэтому на кейсе и 404 ссылка
            указывала в никуда. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-fg"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
