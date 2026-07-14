import { Reveal } from "@/components/Reveal";
import { SectionPath } from "@/components/SectionPath";
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
          <SectionPath path="~/about" />
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
              ответ читается быстрее и не выглядит дёшево. Содержимое — паспорт
              самого сайта (стек, сборка, зависимости), а не дубль футера/
              навыков. Lighthouse здесь сознательно нет: цифры живут в строке
              метрик ниже и на странице кейса — в терминале они были бы третьим
              повтором подряд. */}
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
              <div className="relative flex flex-col gap-4 px-5 py-6 font-mono text-xs">
                <div>
                  <p className="text-fg-dim">
                    <span className="text-accent">$</span> whoami
                  </p>
                  <p className="mt-1 text-fg">
                    Кирилл — full-stack, Ростов-на-Дону
                  </p>
                </div>
                <div>
                  <p className="text-fg-dim">
                    <span className="text-accent">$</span> cat this-site.json
                  </p>
                  <div className="mt-1 text-muted">{"{"}</div>
                  <div className="pl-4">
                    <span className="text-accent">&quot;stack&quot;</span>
                    <span className="text-muted">: </span>
                    <span className="text-fg">
                      &quot;Next.js 15 · TypeScript · Tailwind&quot;
                    </span>
                    <span className="text-muted">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-accent">&quot;build&quot;</span>
                    <span className="text-muted">: </span>
                    <span className="text-fg">&quot;static export&quot;</span>
                    <span className="text-muted">,</span>
                  </div>
                  {/* Именно "gsap", а не 0: он лежит в dependencies и уезжает в
                      бандл отдельным чанком. Ноль здесь был бы неправдой. */}
                  <div className="pl-4">
                    <span className="text-accent">&quot;deps&quot;</span>
                    <span className="text-muted">: </span>
                    <span className="text-fg">&quot;gsap&quot;</span>
                  </div>
                  <div className="text-muted">{"}"}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Строка метрик — только проверяемые цифры, без выдуманных «клиентов». */}
        <Reveal delay={60}>
          <p className="t-small mt-12 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-hair pt-6 font-mono text-muted">
            {about.metrics.map((metric, i) => (
              <span key={metric} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">·</span>}
                {metric}
              </span>
            ))}
          </p>
        </Reveal>

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
