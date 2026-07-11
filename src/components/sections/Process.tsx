import { Reveal } from "@/components/Reveal";
import { processSteps } from "@/lib/site";

/**
 * Процесс работы — реальная последовательность, поэтому нумерация уместна.
 * Вертикальный список с mono-номерами и разреженными разделителями.
 */
export function Process() {
  return (
    <section id="process" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="max-w-[16ch] text-3xl font-medium tracking-tight text-fg sm:text-4xl">
            Как проходит работа
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line">
          {processSteps.map((step, i) => (
            <Reveal key={step.action} delay={i * 60}>
              <li className="flex gap-5 bg-surface p-6 sm:gap-8 sm:p-8">
                <span className="tnum font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-fg">{step.action}</h3>
                  <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-fg-dim">
                    {step.detail}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
