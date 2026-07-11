import type { Metadata } from "next";
import Link from "next/link";
import { cases, templateCaseSlugs } from "@/lib/site";

// Статический экспорт: заранее перечисляем слаги, которые рендерит шаблон.
// Флагман MAISON обслуживается собственной страницей /case/maison, поэтому в
// шаблон он не попадает. Пока не-флагманских кейсов нет — массив пуст, и роут
// «спит» до появления первого кейса из site.ts.
export function generateStaticParams() {
  return templateCaseSlugs.map((slug) => ({ slug }));
}

// Неизвестные слаги → 404 (обязательно для output: 'export').
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = cases.find((c) => c.slug === slug);
  return { title: study ? `Кейс: ${study.title}` : "Кейс", description: study?.summary };
}

/**
 * Шаблон под будущие кейсы (дашборд, API, Telegram-бот). Один макет — много
 * кейсов, данные приходят из site.ts по слагу.
 */
export default async function CaseTemplatePage({ params }: Props) {
  const { slug } = await params;
  // Слаг гарантированно из templateCaseSlugs (dynamicParams=false). Данных в
  // site.ts может ещё не быть (демо-слаг) — тогда показываем заглушку шаблона.
  const study = cases.find((c) => c.slug === slug);

  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <Link href="/" className="text-sm text-muted hover:text-fg">
        ← На главную
      </Link>
      <h1 className="mt-6 font-display text-5xl text-fg">
        {study ? study.title : "Шаблон кейса"}
      </h1>
      <p className="mt-4 max-w-xl text-fg-dim">
        {study
          ? study.summary
          : "[заглушка шаблона] Сюда встанет разбор кейса из site.ts по слагу."}
      </p>
    </main>
  );
}
