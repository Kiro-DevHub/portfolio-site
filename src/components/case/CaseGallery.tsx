"use client";

import { useRef, useState } from "react";
import { CaseImage } from "@/components/case/CaseImage";
import { PhoneFrame } from "@/components/case/PhoneFrame";
import type { CaseImage as CaseImageData } from "@/content/cases/types";

/**
 * Галерея кейса с лайтбоксом. В сетке скриншот — превью, читать его там нельзя,
 * поэтому клик открывает картинку в натуральную величину (до 1400px — ровно тот
 * масштаб, в котором снят живой сайт).
 *
 * Лайтбокс — нативный <dialog>.showModal(): ESC, фокус-трап, inert фона и
 * ::backdrop уже в платформе, библиотека не нужна. Высокие скриншоты не ужимаем
 * по высоте (текст стал бы снова мелким) — их можно проскроллить внутри рамки.
 */
export function CaseGallery({
  images,
  device = "desktop",
}: {
  images: CaseImageData[];
  /** 'mobile' — сетка компактных телефонных карточек вместо масонри во всю ширину. */
  device?: "desktop" | "mobile";
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<CaseImageData | null>(null);

  function open(image: CaseImageData) {
    setActive(image);
    dialogRef.current?.showModal();
  }

  return (
    <>
      {device === "mobile" ? (
        // Мобильные скрины — ровная сетка, несколько экранов в ряд: масонри
        // на всю ширину растянуло бы узкий портретный кадр до нечитаемого.
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
          {images.map((img) => (
            <figure key={img.src} className="group mx-auto w-full max-w-[220px]">
              <button
                type="button"
                onClick={() => open(img)}
                aria-label={`Открыть скриншот: ${img.caption ?? img.alt}`}
                className="block w-full cursor-zoom-in text-left"
              >
                <PhoneFrame className="transition-colors group-hover:border-accent/60">
                  <CaseImage image={img} intrinsic />
                </PhoneFrame>
                <figcaption className="mt-2.5 flex items-center justify-between gap-2 px-1 font-mono text-xs text-muted">
                  {img.caption}
                  <span
                    aria-hidden="true"
                    className="text-fg-dim transition-colors group-hover:text-accent"
                  >
                    ⤢
                  </span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>
      ) : (
        // Масонри: у секций разная высота, columns раскладывает без дыр.
        <div className="gap-4 sm:columns-2 [&>*]:mb-4">
          {images.map((img) => (
            <figure
              key={img.src}
              className="break-inside-avoid overflow-hidden rounded-lg border border-hair bg-surface transition-colors hover:border-accent/60"
            >
              <button
                type="button"
                onClick={() => open(img)}
                aria-label={`Открыть скриншот: ${img.caption ?? img.alt}`}
                className="group block w-full cursor-zoom-in text-left"
              >
                <CaseImage image={img} />
                <figcaption className="flex items-center justify-between gap-3 border-t border-hair px-4 py-3 font-mono text-xs text-muted">
                  {img.caption}
                  <span
                    aria-hidden="true"
                    className="text-fg-dim transition-colors group-hover:text-accent"
                  >
                    развернуть ⤢
                  </span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        aria-label="Просмотр скриншота"
        className="m-0 h-full max-h-full w-full max-w-full bg-transparent p-0 backdrop:bg-bg/90"
      >
        {active && (
          <div
            // Клик мимо картинки закрывает; клик по самой картинке — нет.
            onClick={(e) => {
              if (e.target === e.currentTarget) dialogRef.current?.close();
            }}
            className="flex min-h-full items-start justify-center p-4 sm:p-8"
          >
            {device === "mobile" ? (
              <figure className="w-full max-w-[340px]">
                <PhoneFrame>
                  <CaseImage image={active} priority intrinsic className="max-h-[80vh]" />
                </PhoneFrame>
                <figcaption className="mt-4 text-center font-mono text-xs text-muted">
                  {active.caption}
                </figcaption>
              </figure>
            ) : (
              <figure className="max-h-[92vh] max-w-[min(1400px,100%)] overflow-auto rounded-lg border border-hair bg-surface">
                <CaseImage image={active} priority />
                <figcaption className="sticky bottom-0 border-t border-hair bg-surface px-4 py-3 font-mono text-xs text-muted">
                  {active.caption}
                </figcaption>
              </figure>
            )}

            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Закрыть просмотр"
              className="fixed right-4 top-4 inline-flex size-11 items-center justify-center rounded-lg border border-hair bg-surface font-mono text-fg transition-colors hover:border-accent/60 hover:text-accent sm:right-6 sm:top-6"
            >
              ✕
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
