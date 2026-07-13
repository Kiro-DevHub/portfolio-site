import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { TelegramButton } from "@/components/TelegramButton";

/** Футер: финальный CTA в Telegram (тот же лейбл) + контактная строка. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-28 sm:px-8 sm:py-36">
        {/* Последний экран заказчика — бьёт в полную силу: заголовок уровня хиро
            (Unbounded), на всю ширину, крупная кнопка со свечением акцента. */}
        <Reveal>
          <h2 className="display-hero text-fg">Расскажите про задачу</h2>
          <p className="t-body mt-6 max-w-[52ch] text-fg-dim">
            Отвечу в Telegram, задам пару вопросов и назову смету со сроками.
            Обсудить идею ни к чему не обязывает.
          </p>
          <div className="mt-10">
            <TelegramButton size="lg" className="glow-accent" />
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            {site.name}
            <span className="text-accent">.</span>dev, {site.role}
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-fg-dim">
              <span className="online-dot" aria-hidden="true" />
              на связи
            </span>
            <span>© {year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
