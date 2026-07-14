import { Reveal } from "@/components/Reveal";
import { SectionPath } from "@/components/SectionPath";
import { site } from "@/lib/site";
import { TelegramButton } from "@/components/TelegramButton";
import { LocalTime } from "@/components/LocalTime";

// Официальный бренд-знак GitHub (Simple Icons) — логотип, не декоративная иконка.
function GitHubGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/** Футер: финальный CTA в Telegram (тот же лейбл) + контактная строка. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 py-28 sm:px-8 sm:py-36">
        {/* Последний экран заказчика — бьёт в полную силу: заголовок уровня хиро
            (Unbounded), на всю ширину, крупная кнопка со свечением акцента. */}
        <Reveal>
          <SectionPath path="~/contact" />
          <h2 className="display-hero text-fg">Расскажите про задачу</h2>
          <p className="t-body mt-6 max-w-[52ch] text-fg-dim">
            Отвечу в Telegram, задам пару вопросов и назову смету со сроками.
            Обсудить идею ни к чему не обязывает.
          </p>
          <div className="mt-10">
            <TelegramButton section="footer" size="lg" swapLabel className="glow-accent" />
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            {site.brand}
            <span className="text-accent">.</span>
            {site.brandTld}, {site.role}
          </span>
          {/* GitHub — второй канал после Telegram, поэтому стоит здесь мелкой
              моно-ссылкой, а не кнопкой: главный CTA экрана остаётся один.
              flex-wrap — на узких экранах строка из четырёх пунктов переносится,
              а не выдавливает время за край. */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-fg"
            >
              <GitHubGlyph className="size-4" />
              github
            </a>
            <span className="flex items-center gap-2 text-fg-dim">
              <span className="online-dot" aria-hidden="true" />
              на связи
            </span>
            <LocalTime />
            <span>© {year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
