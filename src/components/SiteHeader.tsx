import { site } from "@/lib/site";
import { TelegramButton } from "@/components/TelegramButton";

const navLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#cases", label: "Кейсы" },
  { href: "#process", label: "Процесс" },
];

/** Шапка: одна строка на десктопе, высота ≤72px. На мобилке ссылки скрыты, CTA остаётся. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="font-mono text-sm tracking-tight text-fg">
          {site.name}
          <span className="text-accent">.</span>
          <span className="text-muted">dev</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-fg-dim transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <TelegramButton className="max-sm:px-4" />
      </div>
    </header>
  );
}
