import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { flagshipCase, soonCases } from "@/lib/site";

/**
 * Кейсы: флагман MAISON крупным блоком + карточки «скоро».
 * TODO: заменить брендовую key-art панель MAISON на реальный скриншот кейса.
 */
export function Cases() {
  return (
    <section id="cases" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight text-fg sm:text-4xl">
            Кейсы
          </h2>
        </Reveal>

        {/* Флагман MAISON */}
        <Reveal delay={80}>
          <Link
            href={`/case/${flagshipCase.slug}`}
            className="group mt-12 grid overflow-hidden rounded-lg border border-line transition-colors hover:border-accent/50 lg:grid-cols-[1.15fr_1fr]"
          >
            {/* Key-art панель (не скриншот): брендовое превью на тёмном фоне */}
            <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-surface lg:aspect-auto">
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(120% 80% at 30% 20%, rgba(217,182,118,0.14), transparent 60%)",
                }}
                aria-hidden="true"
              />
              <span className="relative text-4xl tracking-[0.15em] text-fg sm:text-5xl">
                MAISON
              </span>
            </div>

            {/* Описание */}
            <div className="flex flex-col gap-5 border-t border-line p-6 sm:p-8 lg:border-l lg:border-t-0">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  Флагман
                </p>
                <h3 className="mt-2 text-2xl font-medium text-fg">
                  {flagshipCase.title}
                </h3>
                <p className="mt-2 text-fg-dim">{flagshipCase.summary}</p>
              </div>

              {flagshipCase.facts && (
                <ul className="flex flex-wrap gap-2">
                  {flagshipCase.facts.map((fact) => (
                    <li
                      key={fact}
                      className="rounded-sm border border-line px-2.5 py-1 font-mono text-[12px] text-muted"
                    >
                      {fact}
                    </li>
                  ))}
                </ul>
              )}

              <span className="mt-auto inline-flex items-center gap-2 text-[15px] font-medium text-fg transition-colors group-hover:text-accent">
                Открыть кейс
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Карточки «скоро» */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {soonCases.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <article className="flex h-full flex-col gap-3 rounded-lg border border-dashed border-line p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-medium text-fg">{c.title}</h3>
                  <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted">
                    скоро
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-fg-dim">{c.summary}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
