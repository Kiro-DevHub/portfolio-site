import { Reveal } from "@/components/Reveal";
import { ProcessTimeline } from "@/components/motion/ProcessTimeline";
import { processSteps } from "@/lib/site";

/**
 * Процесс — вертикальный таймлайн: узлы-номера соединены линией, которая
 * прогрессирует акцентом по скроллу, а активный шаг подсвечивается (см.
 * ProcessTimeline). Реальная последовательность, поэтому нумерация уместна.
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

        <ProcessTimeline steps={processSteps} />
      </div>
    </section>
  );
}
