import Link from "next/link";
import { cases } from "@/lib/site";

/**
 * Главная — каркас с секциями-заглушками в согласованном порядке.
 * Наполнение и дизайн секций — на следующих этапах.
 */
export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      {/* 1. Хиро: «это не шаблон» + живой фрагмент кейса MAISON */}
      <section id="hero" className="border-b border-line pb-16">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">
          Full-stack разработчик
        </p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-fg">
          Сайты, которые не выглядят как шаблон
        </h1>
        <p className="mt-4 max-w-xl text-fg-dim">
          [заглушка хиро] Здесь будет заголовок про кастомность и живой фрагмент
          кейса MAISON как доказательство.
        </p>
      </section>

      {/* 2. Услуги с ценами */}
      <section id="services" className="border-b border-line py-16">
        <h2 className="font-display text-3xl text-fg">Услуги и цены</h2>
        <p className="mt-2 text-muted">[заглушка: лендинг, боты, БД, комплекс]</p>
      </section>

      {/* 3. Короткий блок доверия: стек навыков + опыт */}
      <section id="about" className="border-b border-line py-16">
        <h2 className="font-display text-3xl text-fg">Стек и опыт</h2>
        <p className="mt-2 text-muted">
          [заглушка: React / Next.js, Telegram-боты, БД, интеграции]
        </p>
      </section>

      {/* 4. Кейсы */}
      <section id="cases" className="border-b border-line py-16">
        <h2 className="font-display text-3xl text-fg">Кейсы</h2>
        <ul className="mt-4 space-y-2">
          {cases.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/case/${c.slug}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {c.title}
              </Link>
              <span className="text-muted"> — {c.summary}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Процесс работы */}
      <section id="process" className="border-b border-line py-16">
        <h2 className="font-display text-3xl text-fg">Как я работаю</h2>
        <p className="mt-2 text-muted">[заглушка: этапы, сроки, коммуникация]</p>
      </section>

      {/* 6. Контакты */}
      <section id="contact" className="py-16">
        <h2 className="font-display text-3xl text-fg">Контакты</h2>
        <p className="mt-2 text-muted">[заглушка: Telegram — основной канал]</p>
      </section>
    </main>
  );
}
