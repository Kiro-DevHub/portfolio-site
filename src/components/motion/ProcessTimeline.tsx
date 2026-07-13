"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import type { ProcessStep } from "@/lib/site";

/**
 * Моушн [4]: вертикальный таймлайн. Линия-трек проходит за узлами-номерами;
 * акцентная заливка растёт по скроллу (scrub), а узел подсвечивается акцентом,
 * когда заливка до него дошла. Позиции узлов меряем через offsetTop — не зависит
 * от transform у Reveal. Без JS видна базовая линия и номера; reduced-motion —
 * заливка и подсветка сразу на 100%.
 */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!list || !track || !fill) return;

    const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node", list);
    if (nodes.length === 0) return;

    // Центр узла по вертикали относительно <ol>. Идём по цепочке offsetParent и
    // суммируем offsetTop: обёртка Reveal с transform/will-change сама становится
    // offsetParent, поэтому одного node.offsetTop недостаточно. offsetTop не зависит
    // от transform — измерение стабильно даже во время reveal.
    const topInList = (n: HTMLElement) => {
      let y = 0;
      let el: HTMLElement | null = n;
      while (el && el !== list) {
        y += el.offsetTop;
        el = el.offsetParent as HTMLElement | null;
      }
      return y;
    };
    const centerOf = (n: HTMLElement) => topInList(n) + n.offsetHeight / 2;
    let fractions: number[] = [];

    const measure = () => {
      const first = centerOf(nodes[0]);
      const last = centerOf(nodes[nodes.length - 1]);
      const height = Math.max(last - first, 1);
      gsap.set([track, fill], { top: first, height });
      fractions = nodes.map((n) => (centerOf(n) - first) / height);
    };

    if (prefersReducedMotion()) {
      measure();
      gsap.set(fill, { scaleY: 1 });
      nodes.forEach((n) => n.classList.add("is-active"));
      return;
    }

    measure();
    gsap.set(fill, { scaleY: 0, transformOrigin: "top" });
    const tween = gsap.to(fill, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: list,
        start: "top 75%",
        end: "bottom 75%",
        scrub: true,
        invalidateOnRefresh: true,
        onRefresh: measure,
        onUpdate: (self) => {
          const p = self.progress;
          for (let i = 0; i < nodes.length; i++) {
            nodes[i].classList.toggle("is-active", p + 0.001 >= fractions[i]);
          }
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <ol ref={listRef} className="relative mt-16 grid grid-cols-12">
      {/* Базовая линия трека */}
      <span
        ref={trackRef}
        aria-hidden="true"
        className="absolute left-[23px] w-0.5 bg-hair-strong"
      />
      {/* Акцентная заливка, растёт сверху вниз по скроллу */}
      <span
        ref={fillRef}
        aria-hidden="true"
        className="absolute left-[23px] w-0.5 origin-top scale-y-0 bg-accent"
      />
      {steps.map((step, i) => (
        <Reveal
          key={step.action}
          delay={i * 60}
          className="col-span-12 lg:col-span-10"
        >
          <li className="grid grid-cols-[auto_1fr] gap-6 pb-12 last:pb-0">
            <div className="flex flex-col items-center">
              <span className="timeline-node relative z-10 grid size-12 shrink-0 place-items-center rounded-full border border-hair bg-surface font-mono text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="pt-2.5">
              <h3 className="t-h3 text-fg">{step.action}</h3>
              <p className="t-body mt-2 max-w-[62ch] text-fg-dim">
                {step.detail}
              </p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
