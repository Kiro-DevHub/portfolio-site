"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  /** Строка цены целиком, напр. «от 12 000 ₽» или «по ТЗ». */
  value: string;
  className?: string;
};

// Число внутри строки: от первой до последней цифры (внутренние пробелы-разделители
// сохраняем), либо одиночная цифра. Префикс/суффикс («от », « ₽») остаются как есть.
const NUM = /\d[\d\s ]*\d|\d/;

/**
 * Моушн [3]: цена «набегает» 0 → значение при входе в вьюпорт (ScrollTrigger, once).
 * Если цифр нет («по ТЗ») — рендер как есть. Стартовый DOM содержит финальное число,
 * поэтому без JS / при reduced-motion сразу видно правильное значение.
 */
export function CountUpPrice({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(NUM);
  const target = match ? parseInt(match[0].replace(/[\s ]/g, ""), 10) : null;

  useEffect(() => {
    const el = ref.current;
    if (!el || target === null || prefersReducedMotion()) return;
    const numEl = el.querySelector<HTMLElement>("[data-count]");
    if (!numEl) return;

    const fmt = (n: number) => Math.round(n).toLocaleString("ru-RU");
    const obj = { v: 0 };
    numEl.textContent = fmt(0); // старт с нуля перед входом в кадр
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: target,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: () => {
            numEl.textContent = fmt(obj.v);
          },
        }),
    });
    return () => st.kill();
  }, [target]);

  if (target === null || !match) {
    return <span className={className}>{value}</span>;
  }

  const before = value.slice(0, match.index);
  const after = value.slice((match.index ?? 0) + match[0].length);
  return (
    <span ref={ref} className={className}>
      {before}
      <span data-count>{target.toLocaleString("ru-RU")}</span>
      {after}
    </span>
  );
}
