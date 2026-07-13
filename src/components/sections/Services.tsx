import { Reveal } from "@/components/Reveal";
import { CountUpPrice } from "@/components/motion/CountUpPrice";
import { services } from "@/lib/site";

/**
 * Услуги — широкие строки с огромной ценой справа (не сетка карточек).
 * Якорь секции: крупные цены (набегают count-up при входе в кадр). Акцент:
 * mono-нумерация, мятный край и подъём поверхности на hover.
 */
export function Services() {
  return (
    <section id="services" className="border-t border-hair">
      <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
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

        <div className="mt-16">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 60}>
              <div className="group relative border-t border-hair transition-colors duration-200 last:border-b hover:bg-surface/50">
                {/* Мятный край, выезжает на hover */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
                />
                <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-8 sm:py-10">
                  <span className="col-span-2 font-mono text-sm text-accent lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-10 lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-medium text-fg sm:text-2xl">
                        {service.title}
                      </h3>
                      {service.featured && (
                        <span className="rounded-sm border border-accent/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
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
