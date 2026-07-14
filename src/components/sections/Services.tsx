import { Reveal } from "@/components/Reveal";
import { SectionPath } from "@/components/SectionPath";
import { CountUpPrice } from "@/components/motion/CountUpPrice";
import { services } from "@/lib/site";

/**
 * Услуги — три равные карточки в ряд на десктопе, одной высоты (grid stretch
 * + h-full внутри). Третья, «под ключ», выделена мятной рамкой: она собирает
 * первые две, поэтому и стоит последней.
 *
 * Карточка — три зоны сверху вниз, разделённые волосками:
 *   шапка (номер → название → описание) на surface,
 *   «Входит» на surface-2 с flex-1,
 *   цена в подвале.
 * Зона «Входит» забирает весь остаток высоты СОБОЙ, а не воздухом: у короткого
 * списка панель просто выше изнутри. Так карточки выравниваются по низу без
 * дыры над ценой — раньше её оставлял mt-auto на цене.
 *
 * Номер здесь несёт смысл: услуги читаются по возрастанию объёма и цены,
 * 03 — сумма 01 и 02.
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

        <div className="dim-siblings mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 60} className="h-full">
              <article
                className={`raise flex h-full flex-col overflow-hidden rounded-lg border bg-surface transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/60 ${
                  service.featured ? "border-accent/40" : "border-hair"
                }`}
              >
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="t-label tnum text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {service.featured && (
                      <span className="t-label rounded-sm border border-accent/40 px-2 py-0.5 text-accent">
                        под ключ
                      </span>
                    )}
                  </div>
                  <h3 className="t-h3 mt-4 text-fg">{service.title}</h3>
                  <p className="t-body mt-3 text-fg-dim">
                    {service.description}
                  </p>
                </div>

                <div className="flex-1 border-t border-hair bg-surface-2 p-6 sm:p-7">
                  <p className="t-label text-muted">Входит</p>
                  <ul className="mt-4 flex flex-col gap-2.5">
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
                </div>

                <div className="border-t border-hair px-6 py-5 sm:px-7">
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
