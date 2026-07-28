import Image from "next/image";
import Link from "next/link";
import { BrowserFrame } from "@/components/BrowserFrame";
import { Reveal } from "@/components/Reveal";
import { SectionPath } from "@/components/SectionPath";
import { casePath, gridCases, soonCases } from "@/lib/site";

/**
 * Кейсы: равные карточки в сетке 2 колонки (скриншот в рамке браузера,
 * AVIF/WebP заранее сконвертированы scripts/optimize-images.mjs — на статике
 * серверного оптимизатора нет) + компактная строка «скоро» под сеткой.
 */
export function Cases() {
  return (
    <section id="cases" className="border-t border-hair">
      <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionPath path="~/cases" />
          <h2 className="display-section text-fg">Кейсы</h2>
        </Reveal>

        <div className="dim-siblings mt-16 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {gridCases.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}>
              {/* Рамка браузера-ссылка со слотом под скриншот. Hover: подъём 4px,
                  акцентная граница, скриншот внутри рамки увеличивается до 1.02. */}
              <Link
                href={casePath(c.slug)}
                aria-label={`Открыть кейс ${c.title}`}
                className="group flex h-full flex-col"
              >
                <BrowserFrame
                  label={c.slug}
                  className="raise flex h-full flex-col transition-[transform,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-accent/60"
                >
                  <div className="relative aspect-video overflow-hidden bg-surface-2">
                    <picture className="absolute inset-0 block transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                      <source srcSet={`/images/cases/${c.slug}.avif`} type="image/avif" />
                      <source srcSet={`/images/cases/${c.slug}.webp`} type="image/webp" />
                      <Image
                        src={`/images/cases/${c.slug}.webp`}
                        alt={`Скриншот проекта ${c.title}`}
                        width={1400}
                        height={788}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </picture>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div>
                      <h3 className="t-h3 text-fg">{c.title}</h3>
                      <p className="t-small mt-2 text-fg-dim">{c.summary}</p>
                    </div>

                    {c.metric && (
                      <p className="tnum font-mono text-xs text-accent">{c.metric}</p>
                    )}

                    {c.facts && (
                      <ul className="flex flex-wrap gap-2">
                        {c.facts.map((fact) => (
                          <li
                            key={fact}
                            className="rounded-sm border border-hair px-2.5 py-1 font-mono text-[12px] text-muted"
                          >
                            {fact}
                          </li>
                        ))}
                      </ul>
                    )}

                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[15px] font-medium text-fg transition-colors group-hover:text-accent">
                      Открыть кейс
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </BrowserFrame>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Направления в работе — компактная строка, не карточка. */}
        {soonCases.length > 0 && (
          <div className="mt-6 flex flex-col gap-2">
            {soonCases.map((c) => (
              <p
                key={c.slug}
                className="flex items-center gap-3 border-t border-hair py-4 text-[15px] text-fg-dim"
              >
                <span className="text-fg">{c.title}</span>
                <span className="t-label text-muted">скоро</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
