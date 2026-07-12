import { Reveal } from "@/components/Reveal";
import { processSteps } from "@/lib/site";

/**
 * Процесс — вертикальный таймлайн: коралловые узлы-номера соединены линией.
 * Реальная последовательность, поэтому нумерация уместна. Якорь секции — таймлайн.
 */
export function Process() {
  return (
    <section id="process" className="border-t border-hair">
      <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display-section text-fg">
            Как проходит
            <br />
            <span className="weight-light text-fg-dim">работа</span>
          </h2>
        </Reveal>

        <ol className="mt-16 max-w-[760px]">
          {processSteps.map((step, i) => (
            <Reveal key={step.action} delay={i * 60}>
              <li className="grid grid-cols-[auto_1fr] gap-6 pb-12 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="raise grid size-12 shrink-0 place-items-center rounded-full border border-hair bg-surface font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < processSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mt-2 w-px flex-1 bg-hair-strong"
                    />
                  )}
                </div>
                <div className="pt-2.5">
                  <h3 className="text-xl font-medium text-fg sm:text-2xl">
                    {step.action}
                  </h3>
                  <p className="mt-2 max-w-[58ch] leading-relaxed text-fg-dim">
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
