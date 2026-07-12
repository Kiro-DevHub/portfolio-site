/**
 * Единая точка загрузки GSAP. Все моушн-компоненты импортируют gsap и ScrollTrigger
 * ТОЛЬКО отсюда — плагин регистрируется один раз (идемпотентно), без сторонних обвязок.
 * Guard по window: при статическом рендере (SSG) модуль вычисляется на сервере,
 * где ScrollTrigger трогать нельзя.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Единый признак «уважать prefers-reduced-motion» — гейт для всех анимаций. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger };
