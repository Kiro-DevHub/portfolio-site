"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { TelegramButton } from "@/components/TelegramButton";

const navLinks = [
  { href: "#services", label: "Услуги", id: "services" },
  { href: "#cases", label: "Кейсы", id: "cases" },
  { href: "#about", label: "Обо мне", id: "about" },
  { href: "#skills", label: "Навыки", id: "skills" },
  { href: "#process", label: "Процесс", id: "process" },
];

/**
 * Шапка: одна строка на десктопе, высота 64px. Активная секция подсвечивается
 * акцентом (scroll-spy на IntersectionObserver — тонкая полоса-детектор у центра
 * вьюпорта, без слушателей scroll). На мобилке ссылки уезжают в выпадающее меню
 * (гамбургер), сквозная CTA остаётся видимой иконкой.
 */
export function SiteHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        // Активна первая по порядку документа секция, пересекающая полосу.
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Уход на десктоп закрывает мобильное меню (чтобы не осталось «висеть»).
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="font-mono text-sm tracking-tight text-fg">
          {site.name}
          <span className="text-accent">.</span>
          <span className="text-muted">dev</span>
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Основная навигация"
        >
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`text-sm transition-colors ${
                  isActive ? "text-accent" : "text-fg-dim hover:text-fg"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <TelegramButton section="header" compact className="max-sm:px-4" />
          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-lg border border-hair text-fg md:hidden"
          >
            {/* Гамбургер из трёх линий (CSS-примитив, не декоративный SVG):
                складывается в крест при открытии. Линии ездят через translate,
                а не через top: top — свойство раскладки, его анимация гоняет
                лейаут каждый кадр. */}
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                  open ? "translate-y-[5px] rotate-45" : "translate-y-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[5px] block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                  open ? "translate-y-[5px] -rotate-45" : "translate-y-[10px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Мобильное меню: выпадает под шапкой, закрывается по клику на пункт. */}
      <nav
        id="mobile-nav"
        aria-label="Мобильная навигация"
        className={`border-t border-hair bg-bg/95 backdrop-blur-md md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <ul className="mx-auto flex max-w-[1200px] flex-col px-5 py-2 sm:px-8">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={`block py-3 font-mono text-sm ${
                    isActive ? "text-accent" : "text-fg-dim"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
