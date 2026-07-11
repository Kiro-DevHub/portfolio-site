"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Задержка появления, мс — для лёгкого стаггера соседних элементов. */
  delay?: number;
};

/**
 * Дешёвый reveal на IntersectionObserver: добавляет класс .is-visible, когда
 * элемент входит во вьюпорт (один раз). Скрытие/анимацию задаёт globals.css и
 * гейтит по .js + prefers-reduced-motion — здесь только переключение класса.
 * Никакого WebGL и слушателей scroll.
 */
export function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
