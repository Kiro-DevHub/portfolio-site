import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionPath } from "@/components/SectionPath";
import { TelegramButton } from "@/components/TelegramButton";
import { BrowserFrame } from "@/components/BrowserFrame";
import { CaseHeader } from "@/components/case/CaseHeader";
import { CaseImage } from "@/components/case/CaseImage";
import { site } from "@/lib/site";
import type { CaseContent } from "@/content/cases/types";

const SHELL = "mx-auto max-w-[1100px] px-5 sm:px-8";

/** Ссылка «Открыть сайт ↗» на живой проект. */
function LiveLink({ href, className = "" }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 font-mono text-sm text-fg-dim transition-colors hover:text-accent ${className}`}
    >
      Открыть сайт
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
    </a>
  );
}

/**
 * Универсальный шаблон страницы кейса. Всё содержимое приходит из типизированного
 * CaseContent — новый кейс добавляется данными в src/content/cases, эту вёрстку
 * трогать не нужно. Стиль и токены — как на главной: navy, мята, Unbounded,
 * моно-детали и ~/path над заголовками.
 */
export function CaseLayout({ content }: { content: CaseContent }) {
  const year = new Date().getFullYear();

  return (
    <>
      <CaseHeader />
      <main>
        {/* ── Хиро ──────────────────────────────────────────────────────── */}
        <section className="border-b border-hair">
          <div className={`${SHELL} py-16 sm:py-24`}>
            <Reveal>
              <SectionPath path={content.path} />
              <h1 className="display-hero text-fg">
                {content.title}
                <span className="hero-caret" aria-hidden="true">
                  _
                </span>
              </h1>
              <p className="t-body mt-5 max-w-[56ch] text-fg-dim">{content.tagline}</p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {content.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-sm border border-hair px-2.5 py-1 font-mono text-[12px] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {content.liveUrl && <LiveLink href={content.liveUrl} className="mt-7" />}
            </Reveal>

            {/* Обложка в рамке браузера — как флагман в секции кейсов на главной. */}
            <Reveal delay={100}>
              <BrowserFrame label={content.slug} className="mt-12">
                <CaseImage image={content.cover} priority />
              </BrowserFrame>
            </Reveal>
          </div>
        </section>

        {/* ── Задача ────────────────────────────────────────────────────── */}
        <section className="border-b border-hair">
          <div className={`${SHELL} py-20 sm:py-28`}>
            <Reveal>
              <SectionPath path="~/задача" />
              <h2 className="display-section text-fg">Задача</h2>
              <p className="t-body measure mt-6 text-fg-dim">{content.problem.body}</p>
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-hair bg-hair sm:grid-cols-3">
                {content.problem.constraints.map((c, i) => (
                  <li key={i} className="flex flex-col gap-3 bg-surface p-6">
                    <span className="font-mono text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="t-small text-fg-dim">{c}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Решение ───────────────────────────────────────────────────── */}
        <section className="border-b border-hair">
          <div className={`${SHELL} py-20 sm:py-28`}>
            <Reveal>
              <SectionPath path="~/решение" />
              <h2 className="display-section text-fg">Решение</h2>
            </Reveal>
            <div className="dim-siblings mt-12 grid gap-4 sm:grid-cols-2">
              {content.solution.map((block, i) => (
                <Reveal key={block.title} delay={(i % 2) * 60}>
                  <article className="raise flex h-full flex-col gap-3 rounded-lg border border-hair bg-surface p-6 sm:p-7">
                    <span className="font-mono text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="t-h3 text-fg">{block.title}</h3>
                    <p className="t-small text-fg-dim">{block.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Результат ─────────────────────────────────────────────────── */}
        <section className="border-b border-hair">
          <div className={`${SHELL} py-20 sm:py-28`}>
            <Reveal>
              <SectionPath path="~/результат" />
              <h2 className="display-section text-fg">Результат</h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {content.results.lighthouse.map((m) => (
                  <div
                    key={m.label}
                    className="raise rounded-lg border border-hair bg-surface p-6 text-center"
                  >
                    <div className="tnum font-mono text-4xl text-accent sm:text-5xl">
                      {m.score}
                    </div>
                    <div className="t-label mt-2 text-muted">{m.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {content.results.stats.map((s) => (
                  <div
                    key={s.label}
                    className="raise rounded-lg border border-hair bg-surface p-6 sm:p-8"
                  >
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="price-xl text-fg">{s.value}</span>
                      {s.note && (
                        <span className="font-mono text-sm text-muted">{s.note}</span>
                      )}
                    </div>
                    <div className="t-small mt-2 text-fg-dim">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Галерея ───────────────────────────────────────────────────── */}
        <section className="border-b border-hair">
          <div className={`${SHELL} py-20 sm:py-28`}>
            <Reveal>
              <SectionPath path="~/работы" />
              <h2 className="display-section text-fg">Как выглядит сайт</h2>
              <p className="t-body mt-6 max-w-[52ch] text-fg-dim">
                Скриншоты живого сайта — от услуг и команды до карты проезда.
              </p>
            </Reveal>
            <Reveal delay={80}>
              {/* Масонри: у секций разная высота, columns раскладывает без дыр. */}
              <div className="mt-10 gap-4 sm:columns-2 [&>*]:mb-4">
                {content.gallery.map((img) => (
                  <figure
                    key={img.src}
                    className="break-inside-avoid overflow-hidden rounded-lg border border-hair bg-surface"
                  >
                    <CaseImage image={img} />
                    {img.caption && (
                      <figcaption className="border-t border-hair px-4 py-3 font-mono text-xs text-muted">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Что бы сделал иначе ───────────────────────────────────────── */}
        <section className="border-b border-hair">
          <div className={`${SHELL} py-20 sm:py-28`}>
            <Reveal>
              <SectionPath path="~/иначе" />
              <h2 className="display-section text-fg">Что бы сделал иначе</h2>
              <p className="t-body mt-6 max-w-[54ch] text-fg-dim">
                Честно про решения, которые не дожили до релиза, — и почему.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {content.notes.map((note, i) => (
                <Reveal key={note.title} delay={(i % 2) * 60}>
                  <article className="flex h-full flex-col gap-3 rounded-lg border border-dashed border-hair-strong bg-surface/50 p-6 sm:p-7">
                    <span className="font-mono text-sm text-muted" aria-hidden="true">
                      {"//"}
                    </span>
                    <h3 className="t-h3 text-fg">{note.title}</h3>
                    <p className="t-small text-fg-dim">{note.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA + подвал ──────────────────────────────────────────────── */}
        <section className="border-t border-line">
          <div className={`${SHELL} py-24 sm:py-32`}>
            <Reveal>
              <SectionPath path="~/дальше" />
              <h2 className="display-hero text-fg">{content.cta.heading}</h2>
              <p className="t-body mt-6 max-w-[52ch] text-fg-dim">{content.cta.body}</p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <TelegramButton size="lg" swapLabel className="glow-accent" />
                {content.liveUrl && <LiveLink href={content.liveUrl} />}
              </div>
            </Reveal>

            <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
              <Link href="/#cases" className="transition-colors hover:text-fg">
                ← все кейсы
              </Link>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-fg-dim">
                  <span className="online-dot" aria-hidden="true" />
                  на связи
                </span>
                <span>
                  {site.name}
                  <span className="text-accent">.</span>dev
                </span>
                <span>© {year}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
