import { site } from "@/lib/site";
import { Magnetic } from "@/components/motion/Magnetic";

// Официальный бренд-знак Telegram (Simple Icons). Не декоративный SVG — логотип.
function TelegramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

type Props = {
  /** Секция сайта, из которой ушёл клик — utm_medium для отслеживания источника. */
  section: "header" | "hero" | "footer" | "case_header" | "case_cta";
  variant?: "primary" | "ghost";
  /** lg — крупный вариант для финального CTA-экрана. */
  size?: "md" | "lg";
  /** На мобилке (<sm) прячет лейбл — остаётся только иконка (компактная шапка). */
  compact?: boolean;
  /**
   * На hover меняет лейбл на командный «$ open telegram» (моно). Только для
   * главной кнопки в хиро и финальной CTA — не для всех. Ширина не скачет: обе
   * подписи лежат в одной grid-ячейке, кнопка равна более широкой из них.
   */
  swapLabel?: boolean;
  className?: string;
};

/**
 * Сквозной CTA в Telegram. Лейбл один и тот же везде (site.ctaLabel) — без дубля
 * интента. Высота ≥44px (тач), видимый фокус — из globals.css.
 */
export function TelegramButton({
  section,
  variant = "primary",
  size = "md",
  compact = false,
  swapLabel = false,
  className = "",
}: Props) {
  const href = `${site.telegramUrl}?utm_source=site&utm_medium=${section}`;
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 active:translate-y-px";
  const sizing =
    size === "lg"
      ? "min-h-14 gap-2.5 px-7 text-base"
      : "min-h-11 gap-2 px-5 text-[15px]";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-fg hover:bg-accent-strong"
      : "border border-line text-fg hover:border-accent/60 hover:text-accent";

  // Обе подписи в одной grid-ячейке → ширина кнопки стабильна, кросс-фейд по
  // opacity. Командный лейбл aria-hidden: доступное имя остаётся русским.
  const label = swapLabel ? (
    <span className="grid place-items-center">
      <span className="col-start-1 row-start-1 transition-opacity duration-200 group-hover:opacity-0">
        {site.ctaLabel}
      </span>
      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 font-mono opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        $ open telegram
      </span>
    </span>
  ) : (
    <span className={compact ? "max-sm:hidden" : undefined}>
      {site.ctaLabel}
    </span>
  );

  return (
    <Magnetic>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={compact ? site.ctaLabel : undefined}
        className={`${base} ${sizing} ${styles} ${swapLabel ? "group" : ""} ${className}`}
      >
        <TelegramGlyph className={size === "lg" ? "size-5" : "size-[18px]"} />
        {label}
      </a>
    </Magnetic>
  );
}
