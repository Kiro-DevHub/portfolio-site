import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/site";

/** Услуги с ценами. Сетка 2×2 на десктопе, один столбец на мобилке. Цены — mono, tabular. */
export function Services() {
  return (
    <section id="services" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="max-w-[18ch] text-3xl font-medium tracking-tight text-fg sm:text-4xl">
            Что делаю и сколько это стоит
          </h2>
          <p className="mt-4 max-w-[52ch] text-fg-dim">
            Цены стартовые, финальная зависит от объёма. Точную смету называю
            после обсуждения задачи.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 60}>
              <article
                className={`flex h-full flex-col gap-3 p-6 sm:p-8 ${
                  service.featured ? "bg-surface-2" : "bg-surface"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="min-w-0 text-lg font-medium text-fg">{service.title}</h3>
                  {service.featured && (
                    <span className="shrink-0 rounded-sm border border-accent/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                      под ключ
                    </span>
                  )}
                </div>
                <p className="tnum font-mono text-xl text-accent">{service.price}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-dim">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
