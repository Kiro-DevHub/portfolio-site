import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { flagshipCase, soonCases } from "@/lib/site";

/**
 * Кейсы: флагман MAISON в рамке браузера (слот под реальный скриншот) с тегом
 * Lighthouse + карточки «скоро». Якорь секции — рамка браузера.
 * TODO: заменить key-art внутри рамки на реальный скриншот MAISON.
 */
export function Cases() {
  return (
    <section id="cases" className="border-t border-hair">
      <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display-section text-fg">Кейсы</h2>
        </Reveal>

        {/* Флагман MAISON */}
        <Reveal delay={80}>
          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Рамка браузера-ссылка со слотом под скриншот. Hover [5]: подъём 4px,
                акцентная граница, скриншот внутри рамки увеличивается до 1.02. */}
            <Link
              href={`/case/${flagshipCase.slug}`}
              aria-label={`Открыть кейс ${flagshipCase.title}`}
              className="group block lg:col-span-7"
            >
              <div className="raise overflow-hidden rounded-lg border border-hair bg-surface transition-[transform,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-accent/60">
                <div className="flex items-center gap-3 border-b border-hair px-4 py-3">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="size-2.5 rounded-full bg-surface-2" />
                    <span className="size-2.5 rounded-full bg-surface-2" />
                    <span className="size-2.5 rounded-full bg-surface-2" />
                  </span>
                  <span className="ml-2 inline-flex items-center gap-1.5 rounded bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
                    <span aria-hidden="true">▲</span> maison
                  </span>
                </div>
                {/* Слот под реальный скриншот (пока брендовое key-art). Клип-рамка:
                    внутренний слой масштабируется на hover, overflow обрезает. */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(120% 90% at 30% 15%, rgba(49,208,179,0.14), transparent 58%)",
                      }}
                    />
                    <span className="relative text-4xl tracking-[0.18em] text-fg sm:text-6xl">
                      MAISON
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Описание */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              <div>
                <p className="t-label text-accent">Флагман</p>
                <h3 className="t-h3 mt-3 text-fg">{flagshipCase.title}</h3>
                <p className="t-body mt-3 text-fg-dim">{flagshipCase.summary}</p>
              </div>

              {/* Тег Lighthouse — 4 метрики */}
              {flagshipCase.lighthouse && (
                <div className="grid grid-cols-4 gap-2">
                  {flagshipCase.lighthouse.map((m) => (
                    <div
                      key={m.label}
                      className="raise rounded-lg border border-hair bg-surface p-3 text-center"
                    >
                      <div className="tnum font-mono text-xl text-accent">
                        {m.score}
                      </div>
                      <div className="t-label mt-1 text-muted">{m.label}</div>
                    </div>
                  ))}
                </div>
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
                href={`/case/${flagshipCase.slug}`}
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
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
