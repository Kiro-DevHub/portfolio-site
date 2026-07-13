import { Reveal } from "@/components/Reveal";
import { about } from "@/lib/site";

/**
 * Обо мне — асимметричный сплит: крупный абзац слева, карточка-терминал
 * справа, три факт-плашки на всю сетку снизу. Строго на дизайн-токенах:
 * мятный акцент, уровни поверхностей, моно-лейблы. Scroll-reveal как у
 * остальных секций.
 */
export function About() {
  return (
    <section id="about" className="border-t border-hair">
      <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display-section text-fg">Обо мне</h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Текст */}
          <Reveal delay={80} className="lg:col-span-7">
            <p className="measure t-body text-fg-dim">{about.paragraph}</p>
          </Reveal>

          {/* Карточка-терминал вместо фото-слота: те же токены, что и рамка
              браузера в кейсах (три точки, моно-регистр), свечение уровня
              остальных карточек секции. Без анимации печати — статичный
              ответ читается быстрее и не выглядит дёшево. */}
          <Reveal delay={140} className="lg:col-span-5">
            <div className="raise relative w-full max-w-[400px] overflow-hidden rounded-lg border border-hair bg-surface lg:ml-auto">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 70% 15%, rgba(49,208,179,0.12), transparent 60%)",
                }}
              />
              <div className="relative flex items-center gap-1.5 border-b border-hair px-4 py-3">
                <span className="size-2.5 rounded-full bg-surface-2" />
                <span className="size-2.5 rounded-full bg-surface-2" />
                <span className="size-2.5 rounded-full bg-surface-2" />
                <span className="ml-2 font-mono text-xs text-muted">
                  ~/kirill
                </span>
              </div>
              <div className="relative flex flex-col gap-3 px-5 py-6 font-mono text-sm">
                <p className="text-fg-dim">
                  <span className="text-accent">$</span> whoami
                </p>
                <p className="text-fg">
                  Кирилл — full-stack разработчик
                </p>
                <p className="text-fg-dim">Ростов-на-Дону · МСК</p>
                <p className="mt-2 flex items-center gap-2 text-fg-dim">
                  <span className="online-dot" aria-hidden="true" />
                  на связи
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Факт-плашки на всю сетку */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {about.facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 60}>
              <div className="raise flex h-full flex-col gap-2 rounded-lg border border-hair bg-surface p-6">
                <span className="t-label text-accent">{fact.label}</span>
                <span className="t-body font-medium leading-snug text-fg">
                  {fact.value}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
