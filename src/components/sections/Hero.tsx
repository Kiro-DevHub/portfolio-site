import { Reveal } from "@/components/Reveal";
import { TelegramButton } from "@/components/TelegramButton";

/** Слои full-stack как композиционный якорь справа: линии, типографика, глубина, акцент. */
const layers = [
  { n: "01", label: "Интерфейс" },
  { n: "02", label: "Логика" },
  { n: "03", label: "Данные" },
];

/**
 * Хиро — тезис «не шаблон». Композиция на 12 колонок: слева тезис, справа
 * якорь из слоёв. Глубина: радиальный свет + фоновая сетка, без WebGL.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-hair"
    >
      {/* Фоновая сетка (едва заметные вертикали) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "88px 100%",
          maskImage:
            "radial-gradient(120% 80% at 70% 10%, #000 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 70% 10%, #000 20%, transparent 75%)",
        }}
      />
      {/* Радиальный свет акцента, верх-право */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 82% 8%, rgba(49,208,179,0.13), transparent 55%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-[1200px] grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12">
        {/* Тезис */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
              Full-stack разработчик
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-hero mt-6 text-fg">
              Не шаблон,
              <br />
              <span className="weight-light text-fg-dim">а сайт под</span> вашу
              задачу
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-[48ch] text-lg leading-relaxed text-fg-dim">
              Сайты, Telegram-боты и базы данных под задачу бизнеса. Один
              исполнитель на весь проект, без конструкторов и готовых тем.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TelegramButton />
              <a
                href="#cases"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-hair-strong px-5 text-[15px] font-medium text-fg transition-colors duration-200 hover:border-accent/60 hover:text-accent"
              >
                Смотреть кейс
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Композиционный якорь: слои */}
        <Reveal delay={200} className="hidden lg:col-span-5 lg:block">
          <div className="relative mx-auto h-[360px] w-full max-w-[380px]">
            {layers.map((layer, i) => (
              <div
                key={layer.n}
                className={`raise absolute left-0 right-0 flex items-center justify-between rounded-lg border bg-surface/80 px-5 py-4 backdrop-blur-sm ${
                  i === 0
                    ? "border-l-2 border-l-accent border-y-hair border-r-hair glow-accent"
                    : "border-hair"
                }`}
                style={{
                  top: `${i * 96}px`,
                  transform: `translateX(${i * 28}px)`,
                  zIndex: layers.length - i,
                }}
              >
                <span className="text-base font-medium text-fg">
                  {layer.label}
                </span>
                <span className="font-mono text-sm text-accent">{layer.n}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
