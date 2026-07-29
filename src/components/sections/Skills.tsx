import { Reveal } from "@/components/Reveal";
import { SectionPath } from "@/components/SectionPath";
import { TechMarquee } from "@/components/TechMarquee";
import { skillGroups } from "@/lib/site";

/**
 * Навыки — два уровня подряд: лента-чипы на всю ширину (весь стек одним
 * взглядом) и под ней 4 колонки по направлениям (моно-лейбл категории + список
 * строк с тонкими разделителями, первая строка ярче). Раньше лента висела
 * отдельной секцией между «Кейсами» и «Обо мне» и дублировала эту сетку через
 * две секции — теперь это вход в неё.
 *
 * Контейнер 1200px здесь не на секции, а на шапке и сетке по отдельности:
 * ленте нужна вся ширина, иначе она читается не как лента, а как обрезанный
 * список.
 */
export function Skills() {
  return (
    <section id="skills" className="border-t border-hair py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <SectionPath path="~/skills" />
          <h2 className="display-section text-fg">Навыки</h2>
          <p className="measure t-body mt-4 text-fg-dim">
            Технологии, на которых собираю проекты.
          </p>
        </Reveal>
      </div>

      <TechMarquee className="mt-12 sm:mt-14" />

      <div className="mx-auto mt-14 max-w-[1200px] px-5 sm:mt-16 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
