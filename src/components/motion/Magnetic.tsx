"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  /** Максимальный сдвиг к курсору, px. */
  strength?: number;
  className?: string;
};

/**
 * Моушн [6]: магнитный hover. Обёртка тянется к курсору в пределах strength px и
 * пружиной возвращается на место. Через gsap.quickTo (motion values вне рендер-цикла
 * React, без useState). Единственный курсор-зависимый эффект — только для точного
 * указателя с hover; на тач-устройствах и при reduced-motion отключён.
 */
export function Magnetic({ children, strength = 8, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
    const clamp = gsap.utils.clamp(-1, 1);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
      const dy = clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
      xTo(dx * strength);
      yTo(dy * strength);
    };
    const reset = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [strength]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}
