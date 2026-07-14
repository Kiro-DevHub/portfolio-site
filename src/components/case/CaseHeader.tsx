import Link from "next/link";
import { site } from "@/lib/site";
import { TelegramButton } from "@/components/TelegramButton";

/**
 * Лёгкая шапка страницы кейса. Без скролл-спая главной (его секций тут нет):
 * логотип → на главную, возврат к кейсам и сквозная CTA в Telegram. Высота и
 * стекло — как у SiteHeader, чтобы страница читалась одним сайтом.
 */
export function CaseHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="font-mono text-sm tracking-tight text-fg">
          {site.brand}
          <span className="text-accent">.</span>
          <span className="text-muted">{site.brandTld}</span>
        </Link>
        <div className="flex items-center gap-5 sm:gap-6">
          <Link
            href="/#cases"
            className="hidden font-mono text-sm text-fg-dim transition-colors hover:text-fg sm:inline"
          >
            ← все кейсы
          </Link>
          <TelegramButton section="case_header" compact className="max-sm:px-4" />
        </div>
      </div>
    </header>
  );
}
