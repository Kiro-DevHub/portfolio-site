"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { TelegramButton } from "@/components/TelegramButton";

/** Слои full-stack как композиционный якорь справа: линии, типографика, глубина, акцент.
    desc раскрывается на hover/фокусе, клик по карточке ведёт к секции услуг. */
const layers = [
  { n: "01", label: "Интерфейс", desc: "React, адаптив, скорость" },
  { n: "02", label: "Логика", desc: "Node.js, Python, боты" },
  { n: "03", label: "Данные", desc: "PostgreSQL, схемы, миграции" },
];

// useLayoutEffect на клиенте (прячем стартовые состояния до пейнта — без FOUC),
// useEffect как SSR-безопасный фолбэк.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Хиро — тезис «не шаблон». Композиция на 12 колонок: слева тезис, справа
 * якорь из слоёв. Глубина: радиальный свет + фоновая сетка, без WebGL.
 * Моушн [1]: построчный reveal заголовка из-под маски со stagger, затем fade
 * подзаголовка, кнопок и якоря. Прячем стартовые состояния через gsap.set —
 * если JS не отработает, контент виден; GSAP просыпается на возврате вкладки.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      // Стартовые (скрытые) состояния — синхронно, до пейнта.
      gsap.set([q(".hero-eyebrow"), q(".hero-sub"), q(".hero-cta")], {
        opacity: 0,
        y: 16,
      });
      gsap.set(q(".hero-anchor"), { opacity: 0, x: 24 });
      gsap.set(q(".hero-line-inner"), { yPercent: 110 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(q(".hero-eyebrow"), { opacity: 1, y: 0, duration: 0.5 })
        .to(
          q(".hero-line-inner"),
          { yPercent: 0, duration: 0.8, stagger: 0.12, ease: "power4.out" },
          "-=0.15",
        )
        .to(q(".hero-sub"), { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
        .to(q(".hero-cta"), { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
        .to(q(".hero-anchor"), { opacity: 1, x: 0, duration: 0.7 }, "-=0.55");
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative overflow-hidden border-b border-hair"
    >
      {/* Фоновая сетка (едва заметные вертикали) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "88px 100%",
          maskImage:
            "radial-gradient(120% 80% at 70% 10%, #000 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 70% 10%, #000 20%, transparent 75%)",
        }}
      />
      {/* Радиальный свет акцента, верх-право */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 82% 8%, rgba(49,208,179,0.13), transparent 55%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-[1200px] grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12">
        {/* Тезис */}
        <div className="lg:col-span-7">
          <p className="hero-eyebrow t-label text-muted">
            Full-stack разработчик
          </p>
          <h1 className="display-hero mt-6 text-fg">
            <span className="hero-line">
              <span className="hero-line-inner">Не шаблон,</span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner weight-light text-fg-dim">
                а сайт под
              </span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner">вашу задачу</span>
            </span>
          </h1>
          <p className="hero-sub t-body mt-7 max-w-[48ch] text-fg-dim">
            Сайты, Telegram-боты и базы данных под задачу бизнеса. Один
            исполнитель на весь проект, без конструкторов и готовых тем.
          </p>
          <div className="hero-cta mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TelegramButton />
            <a
              href="#cases"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-hair-strong px-5 text-[15px] font-medium text-fg transition-colors duration-200 hover:border-accent/60 hover:text-accent"
            >
              Смотреть кейс
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Композиционный якорь: слои */}
        <div className="hero-anchor hidden lg:col-span-5 lg:block">
          {/* Ширина карточки = 100% − 56px, а нижние сдвинуты на +28/+56px вправо:
              правый край самой смещённой («Данные») ровно совпадает с контейнером —
              больше не обрезается краем секции. */}
          <div className="relative mx-auto h-[360px] w-full max-w-[400px]">
            {layers.map((layer, i) => (
              <a
                key={layer.n}
                href="#services"
                aria-label={`${layer.label}: ${layer.desc}. Перейти к услугам`}
                className={`group raise absolute left-0 block w-[calc(100%-56px)] rounded-lg border bg-surface/80 px-5 py-4 backdrop-blur-sm transition-colors duration-300 hover:border-accent/50 focus-visible:border-accent/50 ${
                  i === 0
                    ? "border-l-2 border-l-accent border-y-hair border-r-hair glow-accent"
                    : "border-hair"
                }`}
                style={{
                  top: `${i * 96}px`,
                  transform: `translateX(${i * 28}px)`,
                  zIndex: layers.length - i,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-fg">
                    {layer.label}
                  </span>
                  <span className="font-mono text-sm text-accent">
                    {layer.n}
                  </span>
                </div>
                {/* Строка описания: grid-rows 0fr→1fr плавно раскрывает высоту */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="t-small mt-2 text-fg-dim">{layer.desc}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
