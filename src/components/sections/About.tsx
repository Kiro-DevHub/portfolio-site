import { Reveal } from "@/components/Reveal";
import { about } from "@/lib/site";

/**
 * Обо мне — асимметричный сплит: крупный абзац слева, портрет справа, три
 * факт-плашки на всю сетку снизу. Строго на дизайн-токенах: мятный акцент,
 * уровни поверхностей, моно-лейблы. Scroll-reveal как у остальных секций.
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

          {/* Слот под портрет. Точные размеры: 4:5, исходник 800×1000 (2× от
              400×500). aspect-ratio держит место — ноль сдвигов при подгрузке.
              TODO: заменить плейсхолдер на реальное фото (next/image, priority
              не нужен — ниже фолда). */}
          <Reveal delay={140} className="lg:col-span-5">
            <div className="raise relative aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-lg border border-hair bg-surface lg:ml-auto">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 70% 15%, rgba(49,208,179,0.12), transparent 60%)",
                }}
              />
              <span className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                фото 4:5
              </span>
            </div>
          </Reveal>
        </div>

        {/* Факт-плашки на всю сетку */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {about.facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 60}>
              <div className="raise flex h-full flex-col gap-2 rounded-lg border border-hair bg-surface p-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  {fact.label}
                </span>
                <span className="text-lg font-medium leading-snug text-fg">
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
