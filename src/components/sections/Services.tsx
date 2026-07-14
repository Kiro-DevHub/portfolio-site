import { Reveal } from "@/components/Reveal";
import { SectionPath } from "@/components/SectionPath";
import { CountUpPrice } from "@/components/motion/CountUpPrice";
import { services } from "@/lib/site";

/**
 * Услуги — сетка карточек в две колонки: ведёт содержание, цена подписывает.
 * Внутри карточки одна иерархия сверху вниз: название → описание → чек-лист
 * «что входит» вертикальным списком (t-small вместо нечитаемого моно-12) →
 * цена внизу под волоском, средним кеглем в акценте.
 *
 * «Комплексная разработка» (featured) занимает обе колонки последней строкой:
 * ширина и есть акцент, мятная рамка с бейджем «под ключ» его закрепляет.
 * Hover (подъём + мятная граница) и приглушение соседей — как у остальных
 * карточек сайта.
 */
export function Services() {
  return (
    <section id="services" className="border-t border-hair">
      <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionPath path="~/services" />
          <h2 className="display-section text-fg">
            Что делаю
            <br />
            <span className="weight-light text-fg-dim">и сколько стоит</span>
          </h2>
          <p className="t-body mt-6 max-w-[52ch] text-fg-dim">
            Цены стартовые, финальная зависит от объёма. Точную смету называю
            после обсуждения задачи.
          </p>
        </Reveal>

        <div className="dim-siblings mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 60}
              className={service.featured ? "sm:col-span-2" : undefined}
            >
              <article
                className={`raise flex h-full flex-col rounded-lg border bg-surface p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/60 sm:p-8 ${
                  service.featured ? "border-accent/40" : "border-hair"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="t-h3 text-fg">{service.title}</h3>
                  {service.featured && (
                    <span className="t-label rounded-sm border border-accent/40 px-2 py-0.5 text-accent">
                      под ключ
                    </span>
                  )}
                </div>
                <p className="t-body mt-3 max-w-[52ch] text-fg-dim">
                  {service.description}
                </p>

                <p className="t-label mt-6 text-muted">Входит</p>
                {/* mb-8 задаёт минимальный зазор до цены, mt-auto на цене
                    добирает остаток — карточки в строке выравниваются по низу. */}
                <ul className="mb-8 mt-3 flex flex-col gap-2">
                  {service.includes.map((item) => (
                    <li key={item} className="t-small flex gap-3 text-fg-dim">
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] size-1 shrink-0 rounded-[1px] bg-accent/70"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-hair pt-5">
                  <CountUpPrice
                    value={service.price}
                    className="price-md text-accent"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
