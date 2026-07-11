import { Reveal } from "@/components/Reveal";
import { TelegramButton } from "@/components/TelegramButton";

/**
 * Хиро — тезис страницы: «не шаблон». Тип-ведущий, без фейковых скриншотов.
 * Дисциплина: eyebrow + заголовок (≤2 строк) + подзаголовок (≤20 слов) + CTA.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1200px] flex-col justify-center px-5 py-20 sm:px-8"
    >
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Full-stack разработчик
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h1 className="mt-5 max-w-[15ch] text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl">
          Не шаблон, а сайт под вашу задачу
        </h1>
      </Reveal>

      <Reveal delay={160}>
        <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-fg-dim">
          Сайты, Telegram-боты и базы данных под задачу бизнеса. Один
          исполнитель на весь проект, без конструкторов и готовых тем.
        </p>
      </Reveal>

      <Reveal delay={240}>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <TelegramButton />
          <a
            href="#cases"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line px-5 text-[15px] font-medium text-fg transition-colors duration-200 hover:border-accent/60 hover:text-accent"
          >
            Смотреть кейс
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
