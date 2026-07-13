import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/lib/site";

/**
 * Навыки — 4 колонки на surface-панелях: моно-лейбл категории + список строк
 * с тонкими разделителями. Первая строка каждой колонки — ключевая (ярче).
 * Токены те же: мятный акцент, уровни поверхностей, hairline-границы.
 */
export function Skills() {
  return (
    <section id="skills" className="border-t border-hair">
      <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="display-section text-fg">Навыки</h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 60}>
              <div className="raise flex h-full flex-col rounded-lg border border-hair bg-surface/60 p-6">
                <span className="t-label text-accent">{group.label}</span>
                <ul className="mt-4 divide-y divide-hair">
                  {group.items.map((item, j) => (
                    <li
                      key={item}
                      className={`t-small py-2.5 ${
                        j === 0 ? "text-fg" : "text-fg-dim"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
