import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { TelegramButton } from "@/components/TelegramButton";

/** Футер: финальный CTA в Telegram (тот же лейбл) + контактная строка. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <h2 className="max-w-[18ch] text-3xl font-medium tracking-tight text-fg sm:text-4xl">
            Расскажите про задачу
          </h2>
          <p className="mt-4 max-w-[52ch] text-fg-dim">
            Отвечу в Telegram, задам пару вопросов и назову смету со сроками.
            Обсудить идею ни к чему не обязывает.
          </p>
          <div className="mt-8">
            <TelegramButton />
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
