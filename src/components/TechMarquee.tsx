import { technologies } from "@/lib/site";

/**
 * Моушн [7]: бегущая строка технологий между кейсами и процессом. Две копии списка
 * едут влево бесконечно (CSS), пауза на hover. Чистый CSS — без JS. При reduced-motion
 * анимация гасится глобальным reset (строка статична). Вторая копия — aria-hidden.
 */
export function TechMarquee() {
  const Item = ({ label, dup }: { label: string; dup?: boolean }) => (
    <li
      className="flex items-center gap-8 whitespace-nowrap px-8"
      aria-hidden={dup || undefined}
    >
      <span className="font-mono text-sm text-fg-dim">{label}</span>
      <span aria-hidden="true" className="text-accent/60">
        /
      </span>
    </li>
  );

  return (
    <section
      aria-label="Технологии, с которыми работаю"
      className="marquee relative overflow-hidden border-t border-hair py-5"
    >
      {/* Мягкие края — растворяем строку у границ секции. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, var(--color-bg), transparent 8%, transparent 92%, var(--color-bg))",
        }}
      />
      <ul className="marquee-track flex w-max">
        {technologies.map((t) => (
          <Item key={t} label={t} />
        ))}
        {/* Вторая копия для бесшовной петли */}
        {technologies.map((t) => (
          <Item key={`dup-${t}`} label={t} dup />
        ))}
      </ul>
    </section>
  );
}
