import { techRows } from "@/lib/site";

/**
 * Лента технологий — визуальный вход в секцию «Навыки»: сначала весь стек
 * одним взглядом (широта), ниже сетка по направлениям (глубина). Отдельной
 * секцией не живёт: без «Навыков» рядом она дублировала бы их на расстоянии.
 *
 * Две дорожки едут навстречу с разной скоростью, hover по ленте паузит обе.
 * Чистый CSS, только translateX; при prefers-reduced-motion анимация снята и
 * дорожки стоят на начале списка (см. globals.css).
 *
 * ГЕОМЕТРИЯ — два независимых условия, оба про ширину ОДНОЙ копии (C):
 *
 *   1. Нет дублей в кадре:  C ≥ вьюпорт + ширина самого широкого чипа.
 *      Просто «C ≥ вьюпорт» — граничный случай, и его мало: на стыке копий
 *      чип успевает высунуться слева и справа одновременно, то есть попасть в
 *      кадр дважды. Запас на ширину чипа убирает и это. Отсюда длина techRows
 *      и шаг gap-6: при восьми пунктах C была ~920px и на FullHD один и тот же
 *      чип попадал в кадр трижды.
 *
 *   2. Нет пустоты за концом дорожки:  (COPIES - 1) × C ≥ ширина вьюпорта.
 *      Смещение за цикл равно ровно одной копии, значит перекрывать вьюпорт
 *      должен остаток.
 *
 * Сейчас C ≈ 2800px при 21 пункте: условие 1 держит вьюпорт до ~2600px,
 * условие 2 — до ~5600px.
 */
const COPIES = 3;

function Chip({ label, dup }: { label: string; dup?: boolean }) {
  return (
    <li
      aria-hidden={dup || undefined}
      className="flex shrink-0 items-center gap-2 rounded-sm border border-hair bg-surface px-5 py-2 font-mono text-[13px] leading-none text-fg-dim"
    >
      <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-accent" />
      {label}
    </li>
  );
}

function Row({
  items,
  variant,
}: {
  items: readonly string[];
  variant: "a" | "b";
}) {
  return (
    <ul className={`tech-row tech-row-${variant} flex w-max gap-6`}>
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
        <Row items={techRows.top} variant="a" />
        <Row items={techRows.bottom} variant="b" />
      </div>
    </div>
  );
}
