import { technologies } from "@/lib/site";

/**
 * Лента технологий — визуальный вход в секцию «Навыки»: сначала весь стек
 * одним взглядом (широта), ниже сетка по направлениям (глубина). Отдельной
 * секцией не живёт: без «Навыков» рядом она дублировала бы их на расстоянии.
 *
 * Две дорожки едут навстречу с разной скоростью, hover по ленте паузит обе.
 * Чистый CSS, только translateX; при prefers-reduced-motion анимация снята и
 * дорожки стоят на начале списка (см. globals.css).
 */

/** Копий списка в дорожке. Смещение на одну копию = бесшовная петля, а остаток
 *  (4 копии) должен перекрывать вьюпорт — иначе на широком мониторе за концом
 *  дорожки появится пустота. 4 × ~880px ≈ 3500px, хватает и на ultrawide. */
const COPIES = 5;

/** Верхняя дорожка — клиент и приложение, нижняя — данные и инфраструктура.
 *  Порядок берём из site.ts, чтобы список технологий оставался в одном месте. */
const rowTop = technologies.slice(0, 8);
const rowBottom = technologies.slice(8);

function Chip({ label, dup }: { label: string; dup?: boolean }) {
  return (
    <li
      aria-hidden={dup || undefined}
      className="flex shrink-0 items-center gap-2 rounded-sm border border-hair bg-surface px-4 py-2 font-mono text-[13px] leading-none text-fg-dim"
    >
      <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-accent" />
      {label}
    </li>
  );
}

function Row({ items, variant }: { items: string[]; variant: "a" | "b" }) {
  return (
    <ul className={`tech-row tech-row-${variant} flex w-max gap-3`}>
      {Array.from({ length: COPIES }, (_, copy) =>
        items.map((label) => (
          <Chip key={`${copy}-${label}`} label={label} dup={copy > 0} />
        )),
      )}
    </ul>
  );
}

export function TechMarquee({ className }: { className?: string }) {
  return (
    <div className={`border-y border-hair py-6 sm:py-7 ${className ?? ""}`}>
      {/* Края растворяем маской, а не цветной подложкой: маска не зависит от
          фона секции и не добавляет слоя под ленту. Границы band'а лежат на
          внешней обёртке, поэтому маска их не съедает. */}
      <div className="tech-strip flex flex-col gap-3 overflow-hidden">
        <Row items={rowTop} variant="a" />
        <Row items={rowBottom} variant="b" />
      </div>
    </div>
  );
}
