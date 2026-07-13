import { Reveal } from "@/components/Reveal";
import { SectionPath } from "@/components/SectionPath";
import { CountUpPrice } from "@/components/motion/CountUpPrice";
import { services } from "@/lib/site";

/**
 * Услуги — широкие строки с огромной ценой справа (не сетка карточек).
 * Якорь секции: крупные цены (набегают count-up при входе в кадр). Акцент:
 * mono-нумерация и подъём поверхности на hover. Highlight «под ключ» —
 * только мятная цена + бейдж, без рамки (левый акцентный край на hover
 * перекрывал номер строки).
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

        <div className="dim-siblings mt-16">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 60}>
              <div className="group relative border-t border-hair transition-colors duration-200 last:border-b hover:bg-surface/50">
                <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-8 sm:py-10">
                  <span className="col-span-2 font-mono text-sm text-accent lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-10 lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="t-h3 text-fg">{service.title}</h3>
                      {service.featured && (
                        <span className="t-label rounded-sm border border-accent/40 px-2 py-0.5 text-accent">
                          под ключ
                        </span>
                      )}
                    </div>
                    <p className="t-body mt-2 max-w-[52ch] text-fg-dim">
                      {service.description}
                    </p>
                  </div>
                  <div className="col-span-12 lg:col-span-4 lg:text-right">
                    <CountUpPrice
                      value={service.price}
                      className={`price-xl ${
                        service.featured ? "text-accent" : "text-fg"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
