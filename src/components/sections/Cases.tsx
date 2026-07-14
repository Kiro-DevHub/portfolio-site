import Image from "next/image";
import Link from "next/link";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Reveal } from "@/components/Reveal";
import { SectionPath } from "@/components/SectionPath";
import { casePath, flagshipCase, soonCases } from "@/lib/site";

/**
 * Кейсы: флагман MAISON в рамке браузера с реальным скриншотом (AVIF/WebP,
 * сконвертирован заранее скриптом scripts/optimize-images.mjs — на статике
 * серверного оптимизатора нет) + строкой итога и карточками «скоро».
 * Якорь секции — рамка браузера.
 */
export function Cases() {
  return (
    <section id="cases" className="border-t border-hair">
      <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionPath path="~/cases" />
          <h2 className="display-section text-fg">Кейсы</h2>
        </Reveal>

        {/* Флагман MAISON */}
        <Reveal delay={80}>
          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Рамка браузера-ссылка со слотом под скриншот. Hover [5]: подъём 4px,
                акцентная граница, скриншот внутри рамки увеличивается до 1.02. */}
            <Link
              href={casePath(flagshipCase.slug)}
              aria-label={`Открыть кейс ${flagshipCase.title}`}
              className="group block lg:col-span-7"
            >
              <BrowserFrame
                label="maison"
                className="raise transition-[transform,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-accent/60"
              >
                {/* Скриншот в клип-рамке: внутренний слой масштабируется на hover,
                    overflow обрезает. AVIF с фолбэком WebP через <picture> —
                    next/image в статике (images.unoptimized) сам не умеет
                    переключать форматы. */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                  <picture className="absolute inset-0 block transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                    <source
                      srcSet="/images/cases/maison.avif"
                      type="image/avif"
                    />
                    <source
                      srcSet="/images/cases/maison.webp"
                      type="image/webp"
                    />
                    <Image
                      src="/images/cases/maison.webp"
                      alt="Скриншот хиро-секции сайта MAISON"
                      width={1400}
                      height={875}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </picture>
                </div>
              </BrowserFrame>
            </Link>

            {/* Описание */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div>
                <p className="t-label text-accent">Флагман</p>
                <h3 className="t-h3 mt-3 text-fg">{flagshipCase.title}</h3>
                <p className="t-body mt-3 text-fg-dim">{flagshipCase.summary}</p>
              </div>

              {/* Итог одной моно-строкой: полные бейджи Lighthouse — на странице
                  кейса, здесь они дублировали соседние экраны. */}
              {flagshipCase.metric && (
                <p className="tnum font-mono text-sm text-accent">
                  {flagshipCase.metric}
                </p>
              )}

              {flagshipCase.facts && (
                <ul className="flex flex-wrap gap-2">
                  {flagshipCase.facts.map((fact) => (
                    <li
                      key={fact}
                      className="rounded-sm border border-hair px-2.5 py-1 font-mono text-[12px] text-muted"
                    >
                      {fact}
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href={casePath(flagshipCase.slug)}
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-fg transition-colors hover:text-accent"
              >
                Открыть кейс
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Карточки «скоро» */}
        <div className="dim-siblings mt-8 grid gap-6 sm:grid-cols-2">
          {soonCases.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <article className="raise flex h-full flex-col gap-3 rounded-lg border border-dashed border-hair-strong bg-surface/50 p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="t-h3 text-fg">{c.title}</h3>
                  <span className="t-label shrink-0 text-muted">скоро</span>
                </div>
                <p className="t-small text-fg-dim">{c.summary}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
